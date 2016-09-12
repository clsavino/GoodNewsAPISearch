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
var selected_size = 240;
var idArray = [];
var owner = '';
var email ='';
var pageNum = 1;
var babyAnimalsPageNum = 1;
var puppiesPageNum = 1;
var kittensPageNum = 1;
var monkeysPageNum = 1;

// Load news stories so they appear on page load
var searchTerm = 'UpliftingNews';
newsResults();

// Load animal photos so they appear on page load
apiurl = "https://api.flickr.com/services/rest/?method=flickr.photos.search&tags=cute,animal,babies,-pork,-blood,-people,-puppies,-funny,-beanie,-barbie,-toys,-kiss,-sl,-alge,-design,-sylvanian,-blackandwhite,-goldeneye,-fabric,-spoonflower&tag_mode=all&sort=interestingness-desc&page=1&api_key=ef8008d23cf0b8eb80c8d4e1e8b4d49c&per_page=150&format=json&nojsoncallback=1";
photoResults();

//create on change function for news dropdownbox 
 $("#newsChoice").on("change", function(){
        var option1 = $(this).val();
        switch(option1) {
            case "uplifting":
                searchTerm = "UpliftingNews";
            break;
            case "goodnews":
                searchTerm = "goodnews";
            break;
            case "funnynews":
                searchTerm = "offbeat";
            break;
            case "feelgood":
                searchTerm = "feelgood";
            break;
            case "newsbloopers":
                searchTerm = "newsbloopers";
            break;
            case "cutenews":
                searchTerm = "aww";
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
                $.each(responseData.data.children, function(idx, searchResult) {
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
                if (babyAnimalsPageNum > 4 ) {
                    babyAnimalsPageNum = 1;
                }
                pictag="&tags=cute,animal,babies,-pork,-blood,-people,-puppies,-funny,-beanie,-barbie,-toys,-kiss,-sl,-pig,-design,-sylvanian,-blackandwhite,-goldeneye,-fabric,-spoonflower";
                apiurl = "https://api.flickr.com/services/rest/?method=flickr.photos.search" + pictag + "&tag_mode=all&sort=interestingness-desc&page=" + babyAnimalsPageNum + "&api_key=ef8008d23cf0b8eb80c8d4e1e8b4d49c&per_page=200&format=json&nojsoncallback=1";
                babyAnimalsPageNum++;
            break;
            case "puppies":
                if (puppiesPageNum > 4 ) {
                    puppiesPageNum = 1;
                }
                picTag="&tags=cute,animal,puppies,-design,-people,-barbie,-toys,-diy,-human,-sl,-gacha,-sylvanian,-blackandwhite,-monochrome";
                apiurl = "https://api.flickr.com/services/rest/?method=flickr.photos.search" + picTag + "&tag_mode=all&sort=interestingness-desc&page=" + puppiesPageNum + "&api_key=ef8008d23cf0b8eb80c8d4e1e8b4d49c&per_page=200&format=json&nojsoncallback=1";
                puppiesPageNum++;
            break;
            case "kittens":
                if (kittensPageNum > 4 ) {
                    kittensPageNum = 1;
                }
                picTag="&tags=cute,animal,kittens,-people,-design,-barbie,-blackandwhite,-monochrome-toys,-sylvanian,";                
                apiurl = "https://api.flickr.com/services/rest/?method=flickr.photos.search" + picTag + "&tag_mode=all&sort=interestingness-desc&page=" + kittensPageNum + "&api_key=ef8008d23cf0b8eb80c8d4e1e8b4d49c&per_page=200&format=json&nojsoncallback=1";
                kittensPageNum++;
            break;
            case "monkeys":
                if (monkeysPageNum > 2 ) {
                    monkeysPageNum = 1;
                }
                picTag="&tags=cute,animal,monkeys,-rat,-people,-painting,-art,-dog,-giraffes,-bird,-duck,-fun,-cake,-hand,-textile,-spoonflower,-design,-phallus,-sunset,-city";
                apiurl = "https://api.flickr.com/services/rest/?method=flickr.photos.search" + picTag + "&tag_mode=all&sort=interestingness-desc&page=" + monkeysPageNum + "&api_key=ef8008d23cf0b8eb80c8d4e1e8b4d49c&per_page=200&format=json&nojsoncallback=1";
                monkeysPageNum++;
            break;
        }       
        $("#results").html('');
        photoResults();
    });

function photoResults() {
    // get a json object from the Flickr API
    $.getJSON(apiurl,function(json){
        $results = json.photos;
        idArray = [];
        // for each photo get the photo info 
        // Check to see if this owner has a photo in the array already
        // if not use the photo, else don't use it
        // this removes the chance of redundant photos by same photographer
        $.each(json.photos.photo,function(i,myresult){
            
            if (idArray.indexOf(myresult.owner) === -1) {
                // this owner not in array so push owner's id into array
                owner = myresult.owner;
                idArray.push(owner);
                // get all the sizes of that photo by using its id (myresult.id)
                apiurl_size = "https://api.flickr.com/services/rest/?method=flickr.photos.getSizes&api_key=ef8008d23cf0b8eb80c8d4e1e8b4d49c&photo_id=" + myresult.id + "&format=json&nojsoncallback=1";
                // checking to see if the photo has the specified width of 240px
                //if it does, store image in photoArray and prepend it on the page in #results
                $.getJSON(apiurl_size,function(size){
                    if (size.sizes.size[3].width == selected_size) {
                        photoSource = size.sizes.size[3].source;
                        $("#results").append('<p><a href="' + size.sizes.size[3].url + '"target="_blank"><img class="fgPhotos" src="'+ photoSource + '"/></a></p>');
                    }
                });  // end of .getJSON          
            } //end of if idArray          
        });  //end of .each()
    }); 
} // end of photoResults()

/*
function startCarousel() {
    // could use $(this) to get index of and start there
    //var selectedImg = $(this).attr();
    for (var i = 0; i < 26; i++) {

        var $imgDiv = $('<div>');
        $imgDiv.addClass('item');
        if (i = 0) {
            $imgDiv.addClass('active');
        }
        var $img = $('<img>');       
        $img.addClass('carImg');
        $img.attr('src', carouselArray[i]);
        $imgDiv.append($img);
        console.log('imgDiv ', $imgDiv);
        $("#carItems").append($imgDiv);
    }

}

$(document).on('click', '#fgPhotos', startCarousel);
*/
}); //end of  $(document).ready(function()