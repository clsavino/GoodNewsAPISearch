 $(document).ready(function(){
 // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDGTncnIHRull__Yir9rcAeymPrEjC5nKY",
    authDomain: "good-news-api-search.firebaseapp.com",
    databaseURL: "https://good-news-api-search.firebaseio.com",
    storageBucket: "good-news-api-search.appspot.com",
  };
  firebase.initializeApp(config);

  var searchTerm = 'UpliftingNews';

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
                    $('#redditNews').append('<a href="' + searchResult.data.url + '">' + '<img src="' + searchResult.data.thumbnail + '"/>' + title + '</a>' + '<br>');
                });
            } else {
                console.log("No subreddits match the search query!");
            }
        },
        error: function() {
            alert("Something didn't work!");
        }
    }
);
var database = firebase.database(); 

var apiurl,apiurl_size,myresult,size,selected_size,picTag;
var selected_size = 150;
var idArray = [];
var owner = '';
var email ='';
var pageNum = 0;

// &per_page sets how many photos to get

//  Button for adding a User
$("#emailBtn").on("click", function(event){
	event.preventDefault();
	// Grabs user input
	email = $("#emailInput").val().trim();
	console.log('email ', email);	
/*
	// Creates local "temporary" object for holding user data
	var newUser = {
		name:  email,
	}
	// Uploads user data to the database
	database.ref().push(newUser);
*/

	// Code for the push
	database.ref().push({
		email: email,		
	})

	// Clears the text-box
	$("#emailInput").val("");

	//Prevents moving to new page
	return false;
});

// $(document).ready(function(){
// 	$("#babyAnimals").click(function(){
// 		picTag="&tags=cute,animal,babies,-people,-puppies,-kitten,-beanie,-barbie,-toys,-sl,-sylvanian,-blackandwhite,-monochrome,-goldeneye";
// 		pageNum++;
// 		console.log('pageNum' , pageNum);
// 		apiurl = "https://api.flickr.com/services/rest/?method=flickr.photos.search" + picTag + "&tag_mode=all&sort=interestingness-desc&page=" + pageNum + "&api_key=ef8008d23cf0b8eb80c8d4e1e8b4d49c&per_page=50&format=json&nojsoncallback=1";
// 		displayPhotos();
// 	})
// });

// $(document).ready(function(){
// 	$("#puppies").click(function(){
// 		picTag="&tags=cute,animal,puppies,-people,-barbie,-toys,-diy,-sylvanian,-blackandwhite,-monochrome";
// 		pageNum++;
// 		apiurl = "https://api.flickr.com/services/rest/?method=flickr.photos.search" + picTag + "&tag_mode=all&sort=interestingness-desc&page=" + pageNum + "&api_key=ef8008d23cf0b8eb80c8d4e1e8b4d49c&per_page=50&format=json&nojsoncallback=1";
// 		displayPhotos();
// 	})
// });

// $(document).ready(function(){
// 	$("#kittens").click(function(){
// 		picTag="&tags=cute,animal,kittens,-people,-barbie,-blackandwhite,-monochrome-toys,-sylvanian,";
// 		pageNum++;
// 		apiurl = "https://api.flickr.com/services/rest/?method=flickr.photos.search" + picTag + "&tag_mode=all&sort=interestingness-desc&page=" + pageNum + "&api_key=ef8008d23cf0b8eb80c8d4e1e8b4d49c&per_page=50&format=json&nojsoncallback=1";
// 		displayPhotos();
// 	})
// });

// $(document).ready(function(){
// 	$("#monkeys").click(function(){
// 		picTag="&tags=cute,animal,monkeys,-giraffes,-people,-dog,-bird,-duck,-fun,-textile,-black,-spoonflower,-blackandwhite,-monochrome";
// 		pageNum++;
// 		apiurl = "https://api.flickr.com/services/rest/?method=flickr.photos.search" + picTag + "&tag_mode=all&sort=interestingness-desc&page=" + pageNum + "&api_key=ef8008d23cf0b8eb80c8d4e1e8b4d49c&per_page=50&format=json&nojsoncallback=1";
// 		displayPhotos();
// 	})
// });

// $(document).ready(function(){
// 	$("#reset").click(function(){
// 		$("#results").html('');
// 	})
// });

// function displayPhotos() {
// 	// get a json object from the Flickr API
// 	$.getJSON(apiurl,function(json){
// 		// all photos requested
// 		$results = json.photos;
// 		console.log('json object ', $results);

// 		// for each photo get the photo info and use its id to get the right size
// 		$.each(json.photos.photo,function(i,myresult){
// 			//console.log('myresult ', myresult);
// 			//console.log('owner id ', myresult.owner);
// 			// Check to see if this owner has a photo on the page already
// 			// if not use photo else don't use it
// 			if (idArray.indexOf(myresult.owner) === -1) {
// 				// this owner not in array of owners - continue
// 				// push owner's id into array
// 				owner = myresult.owner;
// 				idArray.push(owner);
// 				//console.log('idArray ', idArray);
// 				// get all the sizes of that photo by using its id (myresult.id)
// 				apiurl_size = "https://api.flickr.com/services/rest/?method=flickr.photos.getSizes&api_key=ef8008d23cf0b8eb80c8d4e1e8b4d49c&photo_id=" + myresult.id + "&format=json&nojsoncallback=1";

// 				// get object of the photo in the selected size
// 				$.getJSON(apiurl_size,function(size){
// 					//console.log('size[3] ', size.sizes.size[3]);
// 					// checking to see if the photo has the specified width of 240px
// 					if (size.sizes.size[3].width == selected_size) {
// 						//if it does  prepend it on the page in #results
// 						$("#results").prepend('<p><a href="'+ size.sizes.size[3].url +'" target="_blank"><img src="'+ size.sizes.size[3].source +'"/></a></p>');
// 					};

// 				});// end of .getJSON
// 			};//end of if (idArray.indexOf(myresult.owner)

// 		});

// 	});
// }
//     


// $(document).ready(function(){
    $("#photoChoice").on("change", function(){
        var option = $(this).val();
        switch(option) {
            case "babyAnimals":
                picTag="&tags=cute,animal,babies,-people,-puppies,-kitten,-beanie,-barbie,-toys,-sl,-sylvanian,-blackandwhite,-monochrome,-goldeneye";
                pageNum++;
                console.log('pageNum' , pageNum);
                apiurl = "https://api.flickr.com/services/rest/?method=flickr.photos.search" + picTag + "&tag_mode=all&sort=interestingness-desc&page=" + pageNum + "&api_key=ef8008d23cf0b8eb80c8d4e1e8b4d49c&per_page=50&format=json&nojsoncallback=1";
            break;
            case "puppies":
                picTag="&tags=cute,animal,puppies,-people,-barbie,-toys,-diy,-sylvanian,-blackandwhite,-monochrome";
                pageNum++;
                apiurl = "https://api.flickr.com/services/rest/?method=flickr.photos.search" + picTag + "&tag_mode=all&sort=interestingness-desc&page=" + pageNum + "&api_key=ef8008d23cf0b8eb80c8d4e1e8b4d49c&per_page=50&format=json&nojsoncallback=1";
            break;
            case "kittens":
                picTag="&tags=cute,animal,kittens,-people,-barbie,-blackandwhite,-monochrome-toys,-sylvanian,";
                pageNum++;
                apiurl = "https://api.flickr.com/services/rest/?method=flickr.photos.search" + picTag + "&tag_mode=all&sort=interestingness-desc&page=" + pageNum + "&api_key=ef8008d23cf0b8eb80c8d4e1e8b4d49c&per_page=50&format=json&nojsoncallback=1";
            break;
            case "monkeys":
                picTag="&tags=cute,animal,monkeys,-people,-dog,-giraffes,-bird,-duck,-fun,-black,-blackandwhite,-textile,-spoonflower,-monochrome,-phallus";
                apiurl = "https://api.flickr.com/services/rest/?method=flickr.photos.search" + picTag + "&tag_mode=all&sort=interestingness-desc&page=" + pageNum + "&api_key=ef8008d23cf0b8eb80c8d4e1e8b4d49c&per_page=50&format=json&nojsoncallback=1";
            break;
            case "pandas":
                picTag="&tags=cute,pandas,animal,-girl,-people,-portrait,-toys,-pattern,-design,-fun,-Chengdu,-shirt,-monochrome";
                pageNum++;
                if (pageNum > 17) {
                    pagenum = 1;
                };
                apiurl = "https://api.flickr.com/services/rest/?method=flickr.photos.search" + picTag + "&tag_mode=all&sort=interestingness-desc&page=" + pageNum + "&api_key=ef8008d23cf0b8eb80c8d4e1e8b4d49c&per_page=50&format=json&nojsoncallback=1";
                break;
        }
        
        $("#results").html('');
        resultsShown();
    });
    //$("#reset").click(function(){
    //  $("#subSection").html('');
    //});

    // $("#button").click(function(){
function resultsShown() {
        // get a json object from the Flickr API
    $.getJSON(apiurl,function(json){
        // all photos requested
        $results = json.photos;
        console.log('json object ', $results);

        // for each photo get the photo info and use its id to get the right size
        $.each(json.photos.photo,function(i,myresult){
            //console.log('myresult ', myresult);
            //console.log('owner id ', myresult.owner);
            // Check to see if this owner has a photo on the page already
            // if not use photo else don't use it
            if (idArray.indexOf(myresult.owner) === -1) {
                // this owner not in array of owners - continue
                // push owner's id into array
                owner = myresult.owner;
                idArray.push(owner);
                //console.log('idArray ', idArray);
                // get all the sizes of that photo by using its id (myresult.id)
                apiurl_size = "https://api.flickr.com/services/rest/?method=flickr.photos.getSizes&api_key=ef8008d23cf0b8eb80c8d4e1e8b4d49c&photo_id=" + myresult.id + "&format=json&nojsoncallback=1";

                // get object of the photo in the selected size
                $.getJSON(apiurl_size,function(size){

                    console.log('size[] ', size.sizes.size);
                    // checking to see if the photo has the specified width of 240px
                    if (size.sizes.size[1].width == selected_size) {
                        //if it does  prepend it on the page in #results
                            $("#results").prepend('<p><a href="'+ size.sizes.size[1].url + '" target="_blank"><img src="'+ size.sizes.size[1].source +'"/></a></p>');
                    };
                }); //end of .getJSON(apiurl_size,function(size)               
            };//end of if (idArray.indexOf(myresult.owner)
        });// end of .each(json.photos.photo,function(i,myresult)
    }); // end of .getJSON(apiurl,function(json)
} // end of resultsShown()

}); //end of  $(document).ready(function()