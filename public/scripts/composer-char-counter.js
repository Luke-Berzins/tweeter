$(document).ready(function() {

  $(".writeTweet").click(function() {
    $("#new-tweet-form").slideToggle("fast");
    $("#tweet-text").focus();
  });
  
  $("#tweet-text").keyup(function() {
    let maxLength = 140;
    let textlen = maxLength - $(this).val().length;
    $(".tweeting").children(".counter").text(textlen);
    if (textlen < 0) {
      // display a error, error type specified through the composer script
      $(".tweeting").children(".counter").addClass("over-limit");
    } else {
      $(".tweeting").children(".counter").removeClass("over-limit");
    }
  });
});
