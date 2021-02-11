$(document).ready(function() {

//Appending date and time and formatting it using moment.js
$("#currentDay").text(moment().format('MMMM Do YYYY, h:mm:ss a'));

var savedTasks = JSON.parse(localStorage.getItem("savedTasks")) || [];

//Creating an array for hours of the day
var hoursOfDay = ["7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19"];
var displayContent = $("#displayContent");

for (var i = 0; i < hoursOfDay.length; i++) {

// Creating a new row 
    var createRow = $("<div>");

    createRow.addClass("row");
    createRow.data("hour", hoursOfDay[i])
// Creating a new column for the hour
    var hourCol = $("<div>");

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

// Color coding the tasks for past/present/future 
if (parseInt(hoursOfDay[i]) === moment().hour()) {
    taskColumn.addClass("present");
} else if (parseInt(hoursOfDay[i]) < moment().hour()) {
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



//When the user clicks "save", the new task will be saved to local storage
// $(".saveBtn").on("click", function() {
//     console.log($(this).parent());
//     console.log($(this).siblings("input"));


// var savedTasks = JSON.parse(localStorage.getItem("savedTasks")) || [];
// var filteredSavedTasks = savedTasks.filter(function(element) {
//     return element.hour !== $(this).parent().data("hour")

// });

// var savedTasksStorage = {
//     hour: $(this).parent().data("hour"),
//     task: $(this).siblings("input").val(),
// }

// filteredSavedTasks.push(savedTasksStorage);
// localStorage.setItem("savedTasks", JSON.stringify(filteredSavedTasks));

// })

$(".saveBtn").on("click", function(){
    console.log("You clicked save!")
    var dayInput = $(this).siblings(".description").val();
    var setHour = $(this).parent().attr("id");
    console.log(dayInput, setHour)
    localStorage.setItem(setHour, dayInput);
    // This will refresh the page when the save button is clicked, updating the time and the planner text.
    location.reload();

});

});

$("#hr-1 .description").val(localStorage.getItem("hr-1"));
$("#hr-2 .description").val(localStorage.getItem("hr-2"));
$("#hr-3 .description").val(localStorage.getItem("hr-3"));
$("#hr-4 .description").val(localStorage.getItem("hr-4"));
$("#hr-5 .description").val(localStorage.getItem("hr-5"));
$("#hr-6 .description").val(localStorage.getItem("hr-6"));
$("#hr-7 .description").val(localStorage.getItem("hr-7"));
$("#hr-8 .description").val(localStorage.getItem("hr-8"));
$("#hr-9 .description").val(localStorage.getItem("hr-9"));
