// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // TODO: Add code to display the current date in the header of the page.
});

$(function () {
  // Add a listener for click events on the save button
  $(".saveBtn").on("click", function () {
    var timeBlockId = $(this).parent().attr("id"); // Get the id of the time-block
    var userInput = $(this).siblings(".description").val(); // Get the user input from the textarea
    localStorage.setItem(timeBlockId, userInput); // Save the user input in local storage
  });

  // Apply the past, present, or future class to each time block.
  var currentTime = dayjs(); // Get the current time

  $(".time-block").each(function () {
    var timeBlockId = $(this).attr("id");
    var timeBlockHour = parseInt(timeBlockId.split("-")[1]); // Extract the hour from the time-block id
    var timeBlockTime = currentTime.set("hour", timeBlockHour).startOf("hour");
  
    if (timeBlockTime.isSame(currentTime, "hour")) {
      $(this).removeClass("past future").addClass("present");
    } else if (timeBlockTime.isBefore(currentTime)) {
      $(this).removeClass("present future").addClass("past");
    } else {
      $(this).removeClass("past present").addClass("future");
    }
  });
  
  


  // Get user input from localStorage and set the values of textarea elements
  $(".time-block").each(function () {
    var timeBlockId = $(this).attr("id");
    var userInput = localStorage.getItem(timeBlockId);
    $(this).find(".description").val(userInput);
  });

  // Display the current date in the header of the page
  var currentDate = dayjs().format("MMMM DD, YYYY");
  $("#currentDay").text(currentDate);
});
