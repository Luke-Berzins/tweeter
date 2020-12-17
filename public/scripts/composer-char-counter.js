$(document).ready(function() {
  
  $("#tweet-text").keyup(function() {
    if (event.keyCode == 13) {
      event.preventDefault();
    }
    let maxLength= 140;
    let textlen = maxLength - $(this).val().length;
    $( ".tweeting" ).children(".counter").text(textlen);
    if (textlen < 0) {
      $( ".tweeting" ).children(".counter").addClass("over-limit");
    } else {
      $( ".tweeting" ).children(".counter").removeClass("over-limit");
    }
  });
  
});
