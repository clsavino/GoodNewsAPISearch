 $(document).ready(function(){
 // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDGTncnIHRull__Yir9rcAeymPrEjC5nKY",
    authDomain: "good-news-api-search.firebaseapp.com",
    databaseURL: "https://good-news-api-search.firebaseio.com",
    storageBucket: "good-news-api-search.appspot.com",
  };
  firebase.initializeApp(config);
var database = firebase.database(); 

var apiurl,apiurl_size,myresult,size,selected_size,picTag;
var selected_size = 150;
var idArray = [];
var owner = '';
var email ='';
var pageNum = 1;
var numPhotos = 0;

// Load news stories so they appear on page load
var searchTerm = 'UpliftingNews';
newsResults();

// Load animal photos so they appear on page load
apiurl = "https://api.flickr.com/services/rest/?method=flickr.photos.search&tags=cute,animal,babies,-pig,-puppies,-kittens,-blood,-people,-beanie,-barbie,-toys,-toy,-sl,-alge,-design,-sylvanian,-blackandwhite,-goldeneye,-fabric,-spoonflower&tag_mode=all&sort=interestingness-desc&page=1&api_key=ef8008d23cf0b8eb80c8d4e1e8b4d49c&per_page=50&format=json&nojsoncallback=1";

photoResults();

//create on change function for news dropdownbox 
 $("#newsChoice").on("change", function(){
        var option1 = $(this).val();
        console.log('option1 ', option1);
        switch(option1) {
            case "uplifting":
                searchTerm = "UpliftingNews";
            break;
            case "goodnews":
                searchTerm = "goodnews";
            break;
            case "feelgood":
                searchTerm = "feelgood";
            break;
        }
        //clears div
        $("#newsLinks").html('');
        newsResults(); 
 });

//wraps function around ajax call appending news results into div
function newsResults(){
$.ajax(
    "https://www.reddit.com//r/" + searchTerm + ".json",
    {
        // data: { q: searchTerm },
        success: function(responseData) {
            if (responseData.data.children.length > 0) {
                console.log('# of results: ' + responseData.data.children.length);
                $.each(responseData.data.children, function(idx, searchResult) {
                    console.log("--- Title of Subreddit: " + searchResult.data.title);
                    console.log(searchResult);
                    console.log("URL: " + searchResult.data.url);
                    var title = searchResult.data.title;
                    if (searchResult.data.thumbnail != "self" && searchResult.data.thumbnail != "default") {
                        $('#newsLinks').prepend('<div class="redditResult text-center"><div class="redditImage"><a href="' + searchResult.data.url + '" target="_blank">' + '<img src="' + searchResult.data.thumbnail + '"/></a></div>' + '<div class="redditLink"><a class="LINK" href="' + searchResult.data.url + '" target="_blank">' + title + '</a></div></div>' + '<br>');
                    };
                });
            } else {
                throw new Error("No subreddits match the search query!");
            }
        },
        error: function() {
            $("#wells").append("<strong>Warning!!!</strong>Something didn't work!");
        }
    })
};

//  Button for adding a Subscriber
$("#emailBtn").on("click", function(event){
    event.preventDefault();
    // Grabs user input
    email = $("#emailInput").val().trim();  
    // Push email entered into database
    database.ref().push({
        email: email,       
    })
    // Clears the text-box
    $("#emailInput").val("");
    //Prevents moving to new page
    return false;
});

    $("#photoChoice").on("change", function(){
        var option = $(this).val();
        switch(option) {
            case "babyAnimals":
                pictag="&tags=cute,animal,babies,-blood,-people,-puppies,-kitten,-beanie,-barbie,-toys,-toy,-sl,-alge,-design,-sylvanian,-blackandwhite,-monochrome,-goldeneye,-fabric,-spoonflower";
                pageNum++;
                console.log('pageNum' , pageNum);
                apiurl = "https://api.flickr.com/services/rest/?method=flickr.photos.search" + picTag + "&tag_mode=all&sort=interestingness-desc&page=" + pageNum + "&api_key=ef8008d23cf0b8eb80c8d4e1e8b4d49c&per_page=50&format=json&nojsoncallback=1";
            break;
            case "puppies":
                picTag="&tags=cute,animal,puppies,-design,-people,-barbie,-toys,-diy,-human,-sl,-gacha,-sylvanian,-blackandwhite,-monochrome";
                pageNum++;
                apiurl = "https://api.flickr.com/services/rest/?method=flickr.photos.search" + picTag + "&tag_mode=all&sort=interestingness-desc&page=" + pageNum + "&api_key=ef8008d23cf0b8eb80c8d4e1e8b4d49c&per_page=50&format=json&nojsoncallback=1";
            break;
            case "kittens":
                picTag="&tags=cute,animal,kittens,-people,-design,-barbie,-blackandwhite,-monochrome-toys,-sylvanian,";
                pageNum++;
                apiurl = "https://api.flickr.com/services/rest/?method=flickr.photos.search" + picTag + "&tag_mode=all&sort=interestingness-desc&page=" + pageNum + "&api_key=ef8008d23cf0b8eb80c8d4e1e8b4d49c&per_page=50&format=json&nojsoncallback=1";
            break;
            case "monkeys":
                picTag="&tags=cute,animal,monkeys,-people,-dog,-giraffes,-bird,-duck,-fun,-black,-blackandwhite,-textile,-spoonflower,-monochrome,-design,-phallus";
                apiurl = "https://api.flickr.com/services/rest/?method=flickr.photos.search" + picTag + "&tag_mode=all&sort=interestingness-desc&page=" + pageNum + "&api_key=ef8008d23cf0b8eb80c8d4e1e8b4d49c&per_page=50&format=json&nojsoncallback=1";
            break;
        }       
        $("#results").html('');
        photoResults();
    });

function photoResults() {
    // get a json object from the Flickr API
    $.getJSON(apiurl,function(json){
        $results = json.photos;
        console.log('json object ', $results);
        // for each photo get the photo info 
        // Check to see if this owner has a photo in the array already
        // if not use the photo, else don't use it
        // this removes the chance of redundant photos by same photographer
        $.each(json.photos.photo,function(i,myresult){
                numPhotos = 1;
                if (idArray.indexOf(myresult.owner) === -1) {
                    // this owner not in array so push owner's id into array
                    owner = myresult.owner;
                    idArray.push(owner);
                    // get all the sizes of that photo by using its id (myresult.id)
                    apiurl_size = "https://api.flickr.com/services/rest/?method=flickr.photos.getSizes&api_key=ef8008d23cf0b8eb80c8d4e1e8b4d49c&photo_id=" + myresult.id + "&format=json&nojsoncallback=1";
                    // checking to see if the photo has the specified width of 150px
                    //if it does  prepend it on the page in #results
                    $.getJSON(apiurl_size,function(size){
                        if (size.sizes.size[1].width == selected_size) {
                            photoSource = size.sizes.size[1].source;
                            console.log('size.sizes.size[1].source', photoSource);
                            numPhotos ++;
                            console.log('numPhotos', numPhotos);
                            $("#results").prepend('<p><a href="'+ size.sizes.size[1].url + '" target="_blank"><img src="'+ size.sizes.size[1].source +'"/></a></p>');
                        }
                    });           
                }
            
        });
    }); 
} // end of photoResults()

}); //end of  $(document).ready(function()