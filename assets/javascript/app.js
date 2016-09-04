 // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDGTncnIHRull__Yir9rcAeymPrEjC5nKY",
    authDomain: "good-news-api-search.firebaseapp.com",
    databaseURL: "https://good-news-api-search.firebaseio.com",
    storageBucket: "good-news-api-search.appspot.com",
  };
  firebase.initializeApp(config);

  var searchTerm = 'feelgood';

// $.ajax(
//     "https://www.reddit.com/subreddits/search.json",
//     {
//         data: { q: searchTerm },
//         success: function(responseData) {
//             if (responseData.data.children.length > 0) {
//                 console.log('# of results: ' + responseData.data.children.length);
//                 $.each(responseData.data.children, function(idx, searchResult) {
//                     console.log("--- Title of Subreddit: " + searchResult.data.title);
//                     console.log(searchResult);
//                     console.log("https://www.reddit.com" + searchResult.data.url);
//                     $('.goodNews').append("https://www.reddit.com" + searchResult.data.url + '<br>');
//                 });
//             } else {
//                 console.log("No subreddits match the search query!");
//             }
//         },
//         error: function() {
//             alert("Something didn't work!");
//         }
//     }
// );



// $(function(){
//   $('#domainform').on('submit', function(event){
//     event.preventDefault();
//     $('#content').html('<p>Loading...</p>');
    
//     var domain = $('#s').val();
//     var newdomain = domain.replace(/\//g, ''); // remove all slashes
//     var requrl = "http://www.reddit.com/domain/";
    
//     var fullurl = requrl + domain + ".json";

// $.getJSON(fullurl, function(json){
// 	var listing = json.data.children;
//     var html = '<ul class="linklist">\n';

//   for(var i=0, l=listing.length; i<l; i++) {
//     var obj = listing[i].data;

//     var votes     = obj.score;
//     var title     = obj.title;
//     var subtime   = obj.created_utc;
//     var thumb     = obj.thumbnail;
//     var subrdt    = "/r/"+obj.subreddit;
//     var redditurl = "http://www.reddit.com"+obj.permalink;
//     var subrdturl = "http://www.reddit.com/r/"+obj.subreddit+"/";
//     var exturl    = obj.url;
	
//     var timeago = timeSince(subtime);

//     if(obj.thumbnail === 'default' || obj.thumbnail === 'nsfw' || obj.thumbnail === '')
//       thumb = 'img/default-thumb.png';
  
//     html += '<li class="clearfix">\n';
//     html += '<img src="'+thumb+'" class="thumbimg">\n';
//     html += '<div class="linkdetails"><h2>'+title+'</h2>\n';
//     html += '<p class="subrdt">posted to <a href="'+subrdturl+'" target="_blank">'+subrdt+'</a> '+timeago+'</p>';
//     html += '<p><a href="'+exturl+'" class="blubtn" target="_blank">visit link</a> - <a href="'+redditurl+'" class="blubtn" target="_blank">view on reddit</a></p>';
//     html += '</div></li>\n';
//   } // end for{} loop
//   htmlOutput(html);

//   }); // end getJSON()
// }); // end .on(submit) listener


//   function htmlOutput(html) {
//     html += '</ul>';
    
//     $('#content').html(html);
//     //console.log(html);
//   }

// function timeSince(date) {
//     var seconds = Math.floor(((new Date().getTime()/1000) - date))

//     var interval = Math.floor(seconds / 31536000);

//     if (interval >= 1) {
//       if(interval == 1) return interval + " year ago";
//       else 
//         return interval + " years ago";
//     }
//     interval = Math.floor(seconds / 2592000);
//     if (interval >= 1) {
//       if(interval == 1) return interval + " month ago";
//       else
//         return interval + " months ago";
//     }
//     interval = Math.floor(seconds / 86400);
//     if (interval >= 1) {
//       if(interval == 1) return interval + " day ago";
//       else
//         return interval + " days ago";
//     }
//     interval = Math.floor(seconds / 3600);
//     if (interval >= 1) {
//       if(interval == 1) return interval + " hour ago";
//       else
//         return interval + " hours ago";
//     }
//     interval = Math.floor(seconds / 60);
//     if (interval >= 1) {
//       if(interval == 1) return interval + " minute ago";
//       else
//         return interval + " minutes ago";
//     }
//     return Math.floor(seconds) + " seconds ago";
//   };


    