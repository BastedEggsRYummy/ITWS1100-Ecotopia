// Function to search for businesses
function search() {
    const searchInput = document.getElementById("searchInput").value.toLowerCase();
    const searchResults = document.getElementById("searchResults");
    searchResults.innerHTML = "";
  
    // Fetch data from businesses.json using AJAX
    $.ajax({
      type: "GET",
      url: "../Login%20Pages/user.json", 
      dataType: "json",
      success: function(responseData, status) {
        // Filter businesses based on search input
        const filteredUsers = responseData.userInfo.filter(userInfo => 
          userInfo.username.toLowerCase().includes(searchInput) || userInfo.firstname.toLowerCase().includes(searchInput) || userInfo.lastname.toLowerCase().includes(searchInput) || (userInfo.firstname.toLowerCase() + ' ' + userInfo.lastname.toLowerCase()).includes(searchInput)
        );
  
        // Display search results
        if (filteredUsers.length === 0) {
          searchResults.innerHTML = "No results found.";
        } else {
          filteredUsers.forEach(userInfo => {
            const userLink = document.createElement("a");
            userLink.href = `userPages/${userInfo.username}.html`; // Assuming user profiles are named with their usernames
            userLink.textContent = userInfo.firstname + ' ' + userInfo.lastname + ' (' + userInfo.username + ')';
            userLink.classList.add('dynamically-added');
            searchResults.appendChild(userLink);
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
  