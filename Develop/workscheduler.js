$(document).ready(function() {
//Appending date and time and formatting it using moment.js
$("#currentDay").text.moment().format('MMMM Do YYYY, h:mm:ss a');

//Saving date and time to local storage
var savedTasks = JSON.parse(localStorage.getItem("savedTasks")) || [];

//Creating an array for hours of the day
var hoursOfDay = ["7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19"];
var displayContent = $("#displayContent");

for (var i = 0; i < hoursOfDay.length; i++) {

    var createRow = $("<div>");
    createRow.addClass("row");
    createRow.data("hour", hoursOfDay[i])

    var hourCol = $("<div>");
    hourCol.addClass("col-md-2 col-sm-3 time-block");
    
}









})

