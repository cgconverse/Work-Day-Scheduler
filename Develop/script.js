$(document).ready(function() {
//Appending date and time and formatting it using moment.js
$("#currentDay").text.moment().format('MMMM Do YYYY, h:mm:ss a');

//Saving date and time to local storage
var savedTasks = JSON.parse(localStorage.getItem("savedTasks")) || [];

//Creating an array for hours of the day
var hoursOfDay = ["7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19"];
var displayContent = $("#displayContent");

for (var i = 0; i < hoursOfDay.length; i++) {
// Creating a new row 
    var createRow = $("<div>");
//giving it a class of "row"
    createRow.addClass("row");
    createRow.data("hour", hoursOfDay[i])
// Creating a new column for the hour
    var hourCol = $("<div>");
// adding class to make it mobile reponsive
    hourCol.addClass("col-md-2 col-sm-3 time-block");

// Creating an if/else statement to determine if it's AM or PM
    if(hoursOfDay[i] === 12) {
        hourCol.text("12pm") 
    } else if (hoursOfDay[i] > 12) {
        hourCol.text(parseInt(hoursOfDay[i] - 12) + "pm");
    } else {
        hourCol.text(parseInt(hoursOfDay[i]) + "am")
    }

// Creating a column for the tasks
    var taskColumn = $("<input>");
    console.log(savedTasks);
    savedTasks.forEach(function(element) {
        console.log(element);
        if(element.hour === hoursOfDay[i]) {
            taskColumn.val(element.task)
        }
    });

    taskColumn.addClass("col-md-9 col-sm-6 textarea");
}

// Organizing the tasks by past/present/future 
if (parseInt(hoursOfDay[i]) === moment().hour()) {
    taskColumn.addClass("present");
} else if (parseInt(hoursOfDay[i] < moment().hour()) {
    taskColumn.addClass("past");
} else {
    taskColumn.addClass("future");
}

// Here we add a new column for the buttons
var newColumn = $("<button>");
newColumn.addClass("col-md-1 col-sm-3 addBtn");
newColumn.text("Add");

//Displays the task
createRow.append(hourCol, taskColumn, newColumn);
displayContent.append(createRow);

});

//When the user clicks "save", the new task will be saved to local storage
$(".addBtn").on("click", function() {
    console.log($(this).parent());
    console.log($(this).siblings("input"));
})
