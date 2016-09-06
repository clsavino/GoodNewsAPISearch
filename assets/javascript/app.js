 // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDGTncnIHRull__Yir9rcAeymPrEjC5nKY",
    authDomain: "good-news-api-search.firebaseapp.com",
    databaseURL: "https://good-news-api-search.firebaseio.com",
    storageBucket: "good-news-api-search.appspot.com",
  };
  firebase.initializeApp(config);

  var searchTerm = 'good news';

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
//                     $('.goodNews').append(searchResult.data.title);
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

    