$(document).ready(function() {
  // Get the pathname from the URL
  const pathname = window.location.pathname;
  // Split the pathname by '/'
  const pathParts = pathname.split('/');
  // Get the last part of the path which should be the business ID
  const businessUsername = pathParts[pathParts.length - 1].split('.')[0];

  function getSubratingEmoji(subrating) {
    var subrating2 = subrating.toLowerCase()
        if (subrating2 == 'waste management'){
            return '🌳';
          }
        else if (subrating2 == 'ethical sourcing'){
          return '⚖️';
        }
        else{
          return '♻️';
        }
}

  // Make an AJAX request to fetch data from businesses.json
  $.ajax({
    type: "GET",
    url: "../../Login%20Pages/user.json",
    dataType: "json",
    success: function(responseData, status) {
      // Find the business data based on the business ID
      const user = responseData.userInfo.find(u => u.username === businessUsername);
      console.log(user.firstname)

      // Populate the HTML elements with the fetched data
      var fullName = user.firstname + ' ' + user.lastname;
      $('#name').text(fullName);
      $('#username').text('@' + user.username);
      $('#personImage').attr('src', '../' + user.image);

      $('#email').text(user.email);

      const reviewsContainer = $('#reviews');
      user.reviews.forEach(review => {
          const reviewElement = $('<div class="review">');
          reviewElement.append(`<h3 class="reviewtitlefirstname">${user.firstname}</h3> @<p class="reviewtitleusername">${user.username}</p>`);
          reviewElement.append('&nbsp;&nbsp;' + '●' + '&nbsp;&nbsp;');
          reviewElement.append(`<p class="reviewtitleusername">${review.time}</p>`);
          
          reviewElement.append(`<p>${user.firstname} reviewed <b>${review.businessName}</b> ${review.businessType}</p>`);
          const stars = '★'.repeat(Math.floor(review.greenrating));
          reviewElement.append(`<p>${review.greenrating} ${stars}</p>`);
          reviewElement.append(`<p>${review.text}</p>`);


          reviewElement.append('<h4>Subratings:</h4>');
          const subratingsList = $('<ul>');
          Object.entries(review.subratings).forEach(([subrating, rating]) => {
              const subratingStars = '★'.repeat(Math.floor(rating));
              subratingsList.append(`<li>${getSubratingEmoji(subrating)} ${subrating}: ${rating} ${subratingStars}</li>`);
          });
          reviewElement.append(subratingsList);

          reviewsContainer.append(reviewElement);
});


    },
    error: function(msg) {
      // Handle errors
      alert("There was a problem: " + msg.status + " " + msg.statusText);
    }
  });
});
