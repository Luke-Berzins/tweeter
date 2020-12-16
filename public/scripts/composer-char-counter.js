$(document).ready(function() {
  $("#tweet-text").on('click', function() {

    console.log(this); //The this keyword is a reference to the button
  });
  

  $(".tweets-body").hover(function() {
    $(this).toggleClass("mouse-on-tweet")
    $(".end-element").toggle("end-element");
  })



 
  $("#tweet-text").keydown(function() {
    if (event.keyCode == 13) {
      event.preventDefault();
    }
    let maxLength= 140;
    let textlen = maxLength - $(this).val().length;
    $($( ".tweeting" ).children(".counter")).text(textlen);
    if (textlen < 0) {
      $( ".tweeting" ).children(".counter").addClass("over-limit");
    } else {
      $( ".tweeting" ).children(".counter").removeClass("over-limit");
    }
  });
  
});
