// Function to search for businesses
function search() {
    const searchInput = document.getElementById("searchInput").value.toLowerCase();
    const searchResults = document.getElementById("searchResults");
    searchResults.innerHTML = "";
  
    // Fetch data from businesses.json using AJAX
    $.ajax({
      type: "GET",
      url: "resources/businesses.json", 
      dataType: "json",
      success: function(responseData, status) {
        // Filter businesses based on search input
        const filteredBusinesses = responseData.businesses.filter(business =>
          business.name.toLowerCase().includes(searchInput) || business.category.toLowerCase().includes(searchInput)
        );
  
        filteredBusinesses.sort((a, b) => b.greenrating - a.greenrating);

        // Display search results
        if (filteredBusinesses.length === 0) {
          searchResults.innerHTML = "No results found.";
        } else {
          filteredBusinesses.forEach(business => {
            const businessLink = document.createElement("a");
            businessLink.href = `businessPages/${business.id}.html`; // Assuming business profiles are named with their IDs
            businessLink.textContent = business.name + ' (' + business.greenrating + ')';
            businessLink.classList.add('dynamically-added');
            searchResults.appendChild(businessLink);
            searchResults.appendChild(document.createElement("br"));
          });
        }
      },
      error: function(msg) {
        // Handle error if data retrieval fails
        searchResults.innerHTML = "Error retrieving data.";
      }
    });
  }
  