$(document).ready(function () {
    $.ajax({
      url: '/api/random_vehicle',
      method: 'GET',
      dataType: 'json',
      data: { count: 3 },
      success: function (vehicles) {
        const vehiclesListElement = $('#vehiclesList');
        const infoListElement = $('#infoList');
  
        vehicles.forEach(vehicle => {
          const vehicleElement = $(`
            <div class="vehicle">
                <img src="${vehicle[6]}" alt="${vehicle[1]} ${vehicle[2]}">
                <button class="info-button">Infos</button>
                <div class="vehicle-info">
                    <h3>${vehicle[1]} ${vehicle[2]}</h3>
                    <p>Marque : ${vehicle[1]}</p>
                    <p>Modèle : ${vehicle[2]}</p>
                    <p>Prix : ${vehicle[3]}</p>
                    <p>Année : ${vehicle[4]}</p>
                    <p>Kilométrage : ${vehicle[5]}</p>
                    <p>Référence : ${vehicle[0]}</p>
                </div>
            </div>
          `);
  
          vehiclesListElement.append(vehicleElement);
  
          // Masquer les informations sur le véhicule initialement
          vehicleElement.find('.vehicle-info').hide();
        });
  
        $('.info-button').click(function () {
          const vehicleInfo = $(this).siblings('.vehicle-info');
          vehicleInfo.toggle();
          $('.vehicle-info').not(vehicleInfo).hide();
  
          if ($('.vehicle-info:visible').length > 0) {
            $('#infoList').show();
          } else {
            $('#infoList').hide();
          }
        });
      },
      error: function (error) {
        console.error('Erreur lors de la récupération des véhicules aléatoires :', error);
        // Gérer l'affichage de l'erreur ici
      }
    });
  
    const ratingInputs = document.querySelectorAll('.rating-input');
    const ratingValue = document.querySelector('#rating-value');
  
    ratingInputs.forEach(input => {
      input.addEventListener('click', function () {
        ratingValue.textContent = this.value;
      });
    });
  });
  