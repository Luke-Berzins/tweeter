$(document).ready(function() {
const escape =  function(str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

  
const renderTweets = function(tweets) {
  for (const twit of tweets) {
    $('#tweets-container').prepend(createTweetElement(twit));
  }
}

const createTweetElement = function(tweet) {
  const userImage = tweet["user"]["avatars"]
  const tweetUser = escape(tweet["user"]["name"])
  const tweetHandle = escape(tweet["user"]["handle"])
  const tweetContent = escape(tweet["content"]["text"]);
  const tweetAge = new Date(tweet["created_at"]).toLocaleString();
  let $tweet = `
  <article class="tweets-body" >
    <header class="tweets-header">
      <div class="left-name">
        <img id="tweet-photo" src="${userImage}"> 
        <span class="username"><strong>${tweetUser}</strong></span>
      </div>

        <span id="handle" class="end-element">${tweetHandle}</span>
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

 const loadTweets = function() {
$.ajax('tweets', { 
  method: 'GET'
  })
  .then(function (tweets) {
    renderTweets(tweets);
  });
};
loadTweets();


$("#tweet-form").on("submit", function(event) {
  event.preventDefault();
  let tweetContent = $("#tweet-text").val();
  let tweetSize = tweetContent.length;
  if (tweetSize > 140) {
    $("#size-error").removeClass("error-message");
    $("#size-error").text("Too Long");
  } else if (tweetSize === 0) {
    $("#size-error").removeClass("error-message");
    $("#size-error").text("Error no content");
  } else {
    $("#size-error").addClass("error-message");
    $.ajax({
      method: "POST",
      url: "/tweets",
      data: {text: tweetContent}
    }).then(function () {
      $("#tweet-text").val('')
      loadTweets();
    });
    loadTweets();
  } 
})
});