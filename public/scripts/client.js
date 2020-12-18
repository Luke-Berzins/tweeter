$(document).ready(function() {
  const escape =  function(str) {
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };
  const renderTweets = function(tweets) {
    for (const twit of tweets) {
      $('#tweets-container').prepend(createTweetElement(twit));
    }
  };

  const timePassed = (timePosted) => {
    let current = Date.now();
    let time = current - timePosted;
    const seconds = Math.floor(time / 1000);
    const minutes = Math.floor(time / (1000 * 60));
    const hours = Math.floor(time / (1000 * 60 * 60));
    const days = Math.floor(time / (1000 * 60 * 60 * 24));
    const months = Math.floor(time / (1000 * 60 * 60 * 24 * 31));
    const years = Math.floor(time / (1000 * 60 * 60 * 24 * 12));
    if (seconds < 60) {
      return seconds + " seconds";
    } else if (minutes < 60) {
      return minutes + " minutes";
    } else if (hours < 24) {
      return hours + " hours";
    } else if (days < 31) {
      return days + " days";
    } else if (months < 12) {
      return months + " months";
    } else {
      return years + " years";
    }
  };


  const createTweetElement = function(tweet) {
    const userImage = tweet["user"]["avatars"];
    const tweetUser = escape(tweet["user"]["name"]);
    const tweetHandle = escape(tweet["user"]["handle"]);
    const tweetContent = escape(tweet["content"]["text"]);
    const tweetAge = timePassed(tweet["created_at"]);
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
        <span>Posted <div id="age-of-tweet">${tweetAge} ago</div></span>
        <div class="tweet-buttons">
        <i id="flag-tweet" class="fas fa-flag"></i>
        <i id="re-tweet" class="fas fa-retweet"></i>
        <i id="heart-tweet" class="fas fa-heart" ></i>
        </div>
      </footer>
    </article>`;
    return $tweet;
  };

  const loadTweets = function() {
    $.ajax('tweets', {
      method: 'GET'
    })
      .then(function(tweets) {
        $('#tweets-container').empty();
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
      }).then(function() {
        $("#tweet-text").val('');
        $(".tweeting").children(".counter").text("140");
        loadTweets();
      });
    }
  });
});