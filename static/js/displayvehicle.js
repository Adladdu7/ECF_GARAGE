$(document).ready(function () {
    // Fonction pour charger les véhicules via AJAX
    function loadVehicles() {
        $.ajax({
            url: '/api/vehicles',
            type: 'GET',
            success: function (data) {
                var vehiclesList = $('#vehiclesList');
                vehiclesList.empty();
                data.forEach(function (vehicle) {
                    var listItem = $('<div class="vehicle">');
                    listItem.append('<h2>' + vehicle.make + ' ' + vehicle.model + '</h2>');
                    listItem.append('<p>Prix : ' + vehicle.price + '€</p>');
                    listItem.append('<p>Année : ' + vehicle.year + '</p>');
                    listItem.append('<p>Kilométrage : ' + vehicle.kilometers + ' km</p>');
                    listItem.append('<p>Références : ' + vehicle.id + '</p>');
                    listItem.append('<img src="' + vehicle.img + '" alt="' + vehicle.make + ' ' + vehicle.model + '">');

                    vehiclesList.append(listItem);
                });
            },
            error: function (xhr, status, error) {
                console.log('Erreur lors du chargement des véhicules :', error);
            }
        });
    }

    // Fonction pour filtrer les véhicules via AJAX
    function filterVehicles(event) {
        event.preventDefault();
        var formData = $('#filterForm').serialize();
        $.ajax({
            url: '/api/filter_vehicles', // Votre point d'accès API pour le filtrage des véhicules
            type: 'POST',
            data: formData,
            success: function (data) {
                var vehiclesList = $('#vehiclesList');
                vehiclesList.empty();
                data.forEach(function (vehicle) {
                    var listItem = $('<div class="vehicle">');
                    listItem.append('<h2>' + vehicle.make + ' ' + vehicle.model + '</h2>');
                    listItem.append('<p>Prix : ' + vehicle.price + '€</p>');
                    listItem.append('<p>Année : ' + vehicle.year + '</p>');
                    listItem.append('<p>Kilométrage : ' + vehicle.kilometers + ' km</p>');
                    listItem.append('<p>Références : ' + vehicle.id + '</p>');
                    listItem.append('<img src="' + vehicle.img + '" alt="' + vehicle.make + ' ' + vehicle.model + '">');
                    vehiclesList.append(listItem);
                });
            },
            error: function (xhr, status, error) {
                console.log('Erreur lors du filtrage des véhicules :', error);
            }
        });
    }

    // Charger les véhicules lors du chargement de la page
    loadVehicles();

    // Ajouter un écouteur d'événements pour la soumission du formulaire de filtrage
    $('#filterForm').submit(filterVehicles);

    // Masquer initialement la liste d'informations
    $('#infoList').hide();

    // Gérer le clic sur le bouton d'informations
    $('.info-button').click(function () {
        // Basculer la visibilité des informations sur le véhicule
        var vehicleInfo = $(this).siblings('.vehicle-info');
        vehicleInfo.toggle();

        // Masquer la liste d'informations si d'autres informations sur les véhicules sont affichées
        $('.vehicle-info').not(vehicleInfo).hide();

        // Basculer la visibilité de la liste d'informations en fonction de la visibilité des informations sur les véhicules
        if ($('.vehicle-info:visible').length > 0) {
            $('#infoList').show();
        } else {
            $('#infoList').hide();
        }
    });
});
