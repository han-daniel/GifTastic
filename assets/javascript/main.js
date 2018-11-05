var giphy = {
  searchValue: "",
  animals: [
            "Dog", "Giraffe", "Chicken", "Cat", "Fish", "Parakeet", "Lizard", "Rabbit", "Tiger", "Hedgehog", "Gorilla", "Panda", "Husky", "Beagle", "Pug", "German Shepherd", "Hamster", "Guinea Pig", "Corgi", "Rhino", "Frog"]
}

function initialize() {
  for(i=0; i < giphy.animals.length; i++){
    console.log(giphy.animals[i]);
    $("#topics").append("<button class='btn-primary topic-btn'>" + giphy.animals[i] + "</button>")
  };
};

function search() {
  $("#giphy-space").html("");
  giphy.searchValue = $("#search").val().trim();
  var queryURL= "https://api.giphy.com/v1/gifs/search?q="+ giphy.searchValue +"&api_key=dc6zaTOxFJmzC&limit=15";

  $.ajax({
    url: queryURL,
    method: 'GET',
  }).done((response) => {
    console.log(response);
    for(i = 0; i < response.data.length; i++){
      $("#giphy-space").append("<div class= 'gif-div'>Rating: " + response.data[i].rating.toUpperCase() + "<br>" + "<img data-name= " + response.data[i].images.original.url + " src= " + response.data[i].images.original_still.url + " class= 'gif-img'></div>");
    };
  });
  giphy.animals= [];
  giphy.animals.push(giphy.searchValue);
  $("#search").val("")
  initialize();
};

function topicButton () {
  $("#giphy-space").html("");
  var topicButtonValue = $(this).text();
  var queryURL= "https://api.giphy.com/v1/gifs/search?q="+ topicButtonValue +"&api_key=dc6zaTOxFJmzC&limit=15";
  $.ajax({
    url: queryURL,
    method: 'GET'
  }).done((response) => {
    console.log(response);
    for(i = 0; i < response.data.length; i++){
      $("#giphy-space").append("<div class= 'gif-div'>Rating: " + response.data[i].rating.toUpperCase() + "<br>" + "<img data-name= " + response.data[i].images.original.url + " src= " + response.data[i].images.original_still.url + " class= 'gif-img'></div>");
    };
  });
};

function imageChange() {
    var temporary = $(this).attr("data-name");
    $(this).attr("data-name", $(this).attr("src"));
    $(this).attr("src", temporary);
  };

initialize(); 
$("#search-btn").on("click", search);
$(document).on("click", ".topic-btn", topicButton);
$(document).on("click", ".gif-img", imageChange);
