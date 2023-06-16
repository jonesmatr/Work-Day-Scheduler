$(function () {
  // Add a listener for click events on the save button
  $(".saveBtn").on("click", function () {
    var timeBlockId = $(this).parent().attr("id"); // Get the id of the time-block
    var userInput = $(this).siblings(".description").val(); // Get the user input from the textarea
    localStorage.setItem(timeBlockId, userInput); // Save the user input in local storage
  });

  // Apply the past, present, or future class to each time block.
  var currentTime = dayjs(); // Get the current time

  // Loop through each time block
  $(".time-block").each(function () {
    var timeBlockId = $(this).attr("id");
    var timeBlockHour = parseInt(timeBlockId.split("-")[1]); // Extract the hour from the time-block id
    var timeBlockTime = currentTime.set("hour", timeBlockHour).startOf("hour");

    // Compare the time block time to the current time and apply the appropriate class
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
  var currentDate = dayjs().format("dddd, MMMM D");
  $("#currentDay").text(currentDate);
});