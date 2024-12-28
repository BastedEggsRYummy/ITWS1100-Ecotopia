$(document).ready(function() {
  // Get the pathname from the URL
  const pathname = window.location.pathname;
  // Split the pathname by '/'
  const pathParts = pathname.split('/');
  // Get the last part of the path which should be the business ID
  const businessId = pathParts[pathParts.length - 1].split('.')[0];



  // Make an AJAX request to fetch data from businesses.json
  $.ajax({
    type: "GET",
    url: "../resources/businesses.json",
    dataType: "json",
    success: function(responseData, status) {
      // Find the business data based on the business ID
      const business = responseData.businesses.find(b => b.id === businessId);

      // Populate the HTML elements with the fetched data
      $('#businessName').text(business.name);
      $('#businessGreenRatingtext').html(`Green Rating ` + `<h1 id="businessGreenRating">` + business.greenrating + `</h1>`);
      $('#handle').text(business.handle);
      $('#category').text(business.category);
      $('#address').text(business.address);
      $('#description').text(business.description);
      $('#wasteManagement').html(business.subratings['Waste Management']);
      $('#ethicalSourcing').html(business.subratings['Ethical Sourcing']);

      // Populate similar companies
      const similarCompaniesList = $('#similarCompanies');
      business.companies.forEach(company => {
        const listItem = $('<li>').html(`<b>${company.name}</b> <i>(${company.handle})</i>&nbsp; <b>${company.greenrating}</b>`);
        similarCompaniesList.append(listItem);
      });

      // Set the business image
      $('#businessImage').attr('src', '../'+business.image);
    },
    error: function(msg) {
      // Handle errors
      alert("There was a problem: " + msg.status + " " + msg.statusText);
    }
  });


  // Handle form submission
  $('#reviewForm').on('submit', function(e) {
    e.preventDefault();

    const greenRating = parseFloat($('#greenRating').val());
    const wasteManagementRating = parseFloat($('#wasteManagementRating').val());
    const ethicalSourcingRating = parseFloat($('#ethicalSourcingRating').val());
    const reviewText = $('#reviewText').val();

    // Validate ratings are between 0 and 5
    if (
        greenRating < 0 || greenRating > 5 ||
        wasteManagementRating < 0 || wasteManagementRating > 5 ||
        ethicalSourcingRating < 0 || ethicalSourcingRating > 5
    ) {
        // Display an error message and stop the form submission
        alert('Please enter ratings between 0 and 5.');
        return;
    }

    const newReview = {
        businessName: $('#businessName').text(),
        businessType: $('#category').text(),
        text: reviewText,
        time: '0 seconds ago',
        greenrating: greenRating,
        subratings: {
            'Waste Management': wasteManagementRating,
            'Ethical Sourcing': ethicalSourcingRating
        },
        likes: 0,
        replies: 0,
        saves: 0
    };

    // Clear form fields
    $('#greenRating').val('');
    $('#wasteManagementRating').val('');
    $('#ethicalSourcingRating').val('');
    $('#reviewText').val('');

    alert('Your review has been submitted successfully!');
    


});

});
