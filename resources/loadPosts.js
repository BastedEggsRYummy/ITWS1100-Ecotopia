$(document).ready(function() {

$.ajax({
  type: "GET",
  url: "resources/posts.json",
  dataType: "json",
  success: function(responseData, status){
    var output = "";  
    var postsToShow = 100;
    var postsCurrentlyShown = 0;
    $.each(responseData.posts, function() {
      if(postsToShow > 0){
        output += '<div class="post"><div class="user-avatar"><img src="';
        output += 'resources/images/navigation bar/examplepfp.jpg';
        output += '" alt="User Avatar"></div><div class="post-content"><ul><li class="displayname">';
        output += this.displayName;
        output += '</li><li class="username">';
        output += this.username;
        output += '</li><li class="time-posted">';
        output += this.timePosted;
        output += '</li></ul><p>';
        output += this.postContent;
        output += '</p></div></div>';
        postsToShow--;
        postsCurrentlyShown++;
      }
    });
    output += "</div>";
    $('#all-posts').html(output);
  }, error: function(msg) {
    // there was a problem
    alert("There was a problem: " + msg.status + " " + msg.statusText);
  }
});  
  const $textarea = $("#create-post-content");

  function adjustTextareaHeight() {
    $textarea.css("height", "auto");
    $textarea.css("height", $textarea.prop("scrollHeight") + "px"); // Set height to scroll height
  }

  $textarea.on("input", adjustTextareaHeight);

  adjustTextareaHeight();

});


function addNewPost(formObj){
  var postContent = $(formObj).find("#create-post-content").val();
  //alert(postContent);
  if(postContent == ""){
    return false;
  }
  var currenthtml = $(document).find("#all-posts").html();

  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

  output = "";
  output += '<div class="post"><div class="user-avatar"><img src="';
  output += 'resources/images/navigation bar/examplepfp.jpg';
  output += '" alt="User Avatar"></div><div class="post-content"><ul><li class="displayname">';
  output += loggedInUser.username;
  output += '</li><li class="username">';
  output += loggedInUser.firstname + " " + loggedInUser.lastname;
  output += '</li><li class="time-posted">';
  output += "0 minutes ago";
  output += '</li></ul><p>';
  output += postContent;
  output += '</p></div></div>';
  output += "</div>";

  //updateArticles(postsCurrentlyShown);

  $('#all-posts').html(output + currenthtml);
  $(formObj).find("#create-post-content").val("");
  return false;
}