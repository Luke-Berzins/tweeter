/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function() {
  // Test / driver code (temporary). Eventually will get this from the server.
  const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png"
        ,
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ]

const renderTweets = function(tweets) {
  for (const twit of tweets) {
    $('#tweets-container').prepend(createTweetElement(twit));
  }
}

const createTweetElement = function(tweet) {
  const userImage = tweet["user"]["avatars"]
  const tweetUser = tweet["user"]["name"]
  const tweetHandle = tweet["user"]["handle"]
  const tweetContent = tweet["content"]["text"]
  const tweetAge = new Date(tweet["created_at"]).toLocaleString();
  let $tweet = `
  <article class="tweets-body" >
    <header class="tweets-header">
      <div class="left-name">
        <img id="tweet-photo" src="${userImage}"> 
        <span class="username"><strong>${tweetUser}</strong></span>
      </div>

        <span class="end-element">${tweetHandle}</span>
     </header>
          <span id="tweet-content">${tweetContent}</span>

    <hr class="lineBreak">
     <footer class="tweets-footer">
        <span>Posted <div id="age-of-tweet">${tweetAge}</div></span>
        <div class="tweet-buttons">
        <i class="fas fa-flag"></i>
        <i class="fas fa-retweet"></i>
        <i class="fas fa-heart" ></i>
        </div>
      </footer>
    </article>`
  return $tweet;
}

renderTweets(data)
});