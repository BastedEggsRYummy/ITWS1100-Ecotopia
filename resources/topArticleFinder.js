


const tagCategoriesToImage = {
  //Recycling of Waste Matierials
  "Recycling" : "recycling icon.png",

  //Global Warming
  "Global Warming" : "global warming.jpg",

  //Chemicals
  "Chemicals" : "chemicals.jpg",

  //Factories and Manufacturing
  "Factories and Manufacturing" : "factories.png",

  //Waste Materials and Disposal
  "Waste Materials and Disposal" : "waste.jpg",

  //United States
  "United States" : "UnitedStates.jpg",

  //Air Pollution
  "Air Pollution" : "air pollution.jpg",

  //Forests and Forestry
  "Forests and Forestry" : "forests.jpg",

  //Argiculture and Farming
  "Agriculture and Farming" : "farming.webp",
  
  //Oil
  "Oil" : "oil.jpg",

  //Research NEED THIS
  "Research" : "research.jpg",

  //Plastics
  "Plastics" : "plastics.jpg",

  //Food
  "Food" : "food.png",

  //Art
  "Art" : "art.jpg",

  //Automobiles
  "Automobiles" : "car.jpg"
  };


var tagstoCategories = {
  //Recycling of Waste Matierials
  "Recycling" : "Recycling of Waste Matierials",

  //Global Warming
  "Global Warming" : "Global Warming",
  "Greenhouse Gas Emissions" : "Global Warming",

  //Chemicals
  "Chemicals" : "Chemicals",

  //Factories and Manufacturing
  "Factories" : "Factories and Manufacturing",
  "Manufacturing" : "Factories and Manufacturing",

  //Waste Materials and Disposal
  "Waste Materials" : "Waste Materials and Disposal",
  "Disposal" : "Waste Materials and Disposal",

  //United States
  "United States" : "United States",

  //Air Pollution
  "Air Pollution" : "Air Pollution",

  //Forests and Forestry
  "Forests" : "Forests and Forestry",
  "Forestry" : "Forests and Forestry",

  //Argiculture and Farming
  "Argiculture" : "Argiculture and Farming",
  "Farming" : "Argiculture and Farming",
  
  //Oil
  "Oil" : "Oil",

  //Research
  "Research" : "Research",

  //Plastics
  "Plastics" : "Plastics",

  //Food
  "Food" : "Food",

  //Art
  "Art" : "Art",

  //Automobiles
  "Automobiles" : "Automobiles",
  "Cars" : "Automobiles",
  "Trucks" : "Automobiles",
  };

function isIn(item, array){
  console.log(array);
  for(var i = 0; i < array.length; i++){
    console.log(array[i].toLowerCase(), item);
    if(array[i].toLowerCase().includes(item.toLowerCase())){
      console.log("true");
      return true;
    }
  };
  return false;
}

function downloadArticles(){
  var allArticleData = [];
  $.ajax({
    type: "GET",
    url: "resources/testfeed.xml", //Real RSS Feed https://rss.nytimes.com/services/xml/rss/nyt/Climate.xml
    dataType: "xml",
    success: function(data, status){
    $(data).find("item").each(function () { // or "item" or whatever suits your feed
        var articleData = $(this);
        var article = {
          title: articleData.find("title").text(),
          pubDate: articleData.find("pubDate").text(),
          description: articleData.find("description").text(),
          link: articleData.find("link").text(),
          categories: []
        }
        articleData.find("category").each(function () {
          article.categories.push($(this).text());
        });
        allArticleData.push(article);
    });
  localStorage.setItem('articleFeedData', JSON.stringify(allArticleData));
  }, error: function(msg) {
    // there was a problem
    alert("There was a problem: " + msg.status + " " + msg.statusText);
  }
  });
}

function displayArticles(selectedTag, articlesToShow){
  const allArticles = JSON.parse(localStorage.getItem('articleFeedData'));

  //articlesToShow = 100;

  var output = "<div class=\"articles\">";  
  allArticles.forEach(function (item, index){

    if(articlesToShow > 0){
      if(selectedTag == "" || isIn(selectedTag, item.categories)){
        output += '<a target="_blank" href='+ item.link + '><div class="article"><div class="article-content"><ul><li class="article-title">'
        output += item.title;
        output += '</li><li class="time-posted">';
        output += item.pubDate;
        output += '</li></ul><p>';
        output += item.description;
        output += '</p></div><div class = "article-tags">';

        //Add tags
        var usedIcons = [];
        item.categories.forEach( function(itemCategories, categoryIndex) {
          for(const category in tagCategoriesToImage){
            if(category.includes(itemCategories)){
              if(!(usedIcons.includes(tagCategoriesToImage[category]))){
                output += '<div class="article-tag"><img src="resources/images/article tags/';
                output += tagCategoriesToImage[category];
                output += '" alt="Tag Picture"></div>';
                usedIcons.push(tagCategoriesToImage[category]);
                }
            }
          }
        });
        output += '</div></div></a>';
        articlesToShow--;
        console.log(articlesToShow);
      }
    }
  });
  output += "</div>";
  $('#top-articles').html(output);
  console.log("DISPLAY DONE");
}

$(document).ready(function() {
  downloadArticles();
  var myTag = "a";
  var numArticles = $(document).height() / 500;
  displayArticles(myTag, numArticles);
});

$(function(){
  var keys = Object.keys(tagstoCategories);
  $( "#search-bar-text" ).autocomplete({
    source: keys
  });
});

function updateArticles(formObj){
  var myTag = $("#search-bar-text").val();
  var numArticles = $(document).height() / 500;
  displayArticles(myTag, numArticles);
  return false;
}




//});