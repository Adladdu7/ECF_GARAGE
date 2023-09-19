$(document).ready(function () {

    // Fonction pour gérer la soumission du formulaire de connexion via AJAX
    function handleLogin(event) {
      event.preventDefault(); // Empêcher le comportement par défaut de soumission du formulaire
      var formData = $('#loginForm').serialize(); // Sérialiser les données du formulaire
      $.ajax({
        url: '/api/login', // Votre point d'API pour la connexion
        type: 'POST',
        data: formData, // Envoyer les données du formulaire sérialisées
        success: function (response) {
          if (response.success) {
            console.log('Connexion réussie');
            // Rediriger vers la page de succès
            window.location.href = '/profile';
          } else {
            // Afficher un message d'erreur
            $('#error-message').text('Adresse e-mail ou mot de passe incorrect.');
            console.log('Échec de la connexion');
          }
        },
        error: function (xhr, status, error) {
          console.log('Erreur lors de la connexion :', error);
          $('#error-message').text('Une erreur s\'est produite lors de la connexion.');
        }
      });
    }
  
    // Ajouter un écouteur d'événements pour la soumission du formulaire de connexion
    $('#loginForm').submit(handleLogin);
  });
  