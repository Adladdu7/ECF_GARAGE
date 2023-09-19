$(document).ready(function () {
    const searchInput = $("#searchInput");
    const searchResults = $("#searchResults");

    // Masquer initialement le conteneur searchResults
    searchResults.hide();

    searchInput.on("input", function () {
        const searchTerm = searchInput.val();

        if (searchTerm.trim() !== "") {
            console.log("Envoi d'une requête AJAX pour le terme de recherche :", searchTerm);
            // Effectuer une requête AJAX vers le serveur pour obtenir des résultats filtrés
            $.ajax({
                url: "/api/filter_vehicles",
                method: "POST",
                data: { ref: searchTerm },
                success: function (data) {
                    console.log("Données récupérées avec succès :", data);
                    searchResults.empty();

                    if (data.length > 0) {
                        searchResults.show(); // Afficher le conteneur des résultats de recherche

                        data.forEach(function (vehicle) {
                            var listItem = $('<div class="vehicle">'); // Utiliser la classe searchResultItem
                            listItem.append('<h2>' + vehicle.make + ' ' + vehicle.model + '</h2>');
                            listItem.append('<p>' + vehicle.id + '</p>');
                            listItem.append('<img src="' + vehicle.img + '" alt="' + vehicle.make + ' ' + vehicle.model + '">');
                            searchResults.append(listItem);
                        });
                    } else {
                        // Masquer le conteneur des résultats de recherche en l'absence de résultats de recherche
                        searchResults.hide();
                    }
                },
                error: function (xhr, status, error) {
                    console.log('Erreur lors du filtrage des véhicules :', error);
                }
            });
        } else {
            // Masquer le conteneur des résultats de recherche lorsque la recherche est vide
            searchResults.hide();
        }
    });
});
