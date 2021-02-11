$(document).ready(function() {
    //This displays the current date and time at the top of the page
    $("#currentDay").text(moment().format("MMMM Do YYYY, h:mma"));

    //Save objects to local storage 
    var savedTodos = JSON.parse(localStorage.getItem("savedTodos")) || [];


    // Created an array for work hours
    var workHours = ["7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19"];
    var mainDisplay = $("#displayContent");

    for (var i = 0; i < workHours.length; i++) {

        //This creates a new row
        var newRow = $("<div>");
        newRow.addClass("row");
        newRow.data("hour", workHours[i])

        //This creates a column for the hour 
        var hourColumn = $("<div>");
        hourColumn.addClass("col-md-2 col-sm-3 time-block");
        
        //Determine if the hour is am or pm
        if (workHours[i] == 12) {
            hourColumn.text("12 pm")
        } else if (workHours[i] > 12) {
            hourColumn.text(parseInt(workHours[i] - 12) + "pm");
        } else {
            hourColumn.text(parseInt(workHours[i]) + "am");
        }

        //To-dos will go into a column 
        var toDoCol = $("<input>");
        console.log(savedTodos);
        savedTodos.forEach(function(element) {
            console.log(element);
            if (element.hour == workHours[i]) {
                toDoCol.val(element.todo)
            }
        });
        toDoCol.addClass("col-md-9 col-sm-6 textarea");

        //Color coding for past, present, future
        if (parseInt(workHours[i]) === moment().hour()) {
            toDoCol.addClass("present");
        } else if (parseInt(workHours[i]) < moment().hour()) {
            toDoCol.addClass("past");
        } else {
            toDoCol.addClass("future");
        }

        //Creating a column for the "save" button
        var newColSave = $("<button>");
        newColSave.addClass("col-md-1 col-sm-3 addBtn");
        newColSave.text("Add");

        //Appending each column and row to the screen 
        newRow.append(hourColumn, toDoCol, newColSave);
        mainDisplay.append(newRow);
    };

    //When the "save" button is clicked, the new to-do will be saved to local storage
    $(".addBtn").on("click", function() {
        console.log($(this).parent());
        console.log($(this).siblings("input"));

        //If true= stays in the array &  If false= removed from the array
        var savedTodos = JSON.parse(localStorage.getItem("savedTodos")) || [];
        var filteredSavedTodos = savedTodos.filter(function(element) {
            return element.hour !== $(this).parent().data("hour")
        });
        var savedTodosStorage = {
            hour: $(this).parent().data("hour"),
            todo: $(this).siblings("input").val(),
        }
        filteredSavedTodos.push(savedTodosStorage);
        localStorage.setItem("savedTodos", JSON.stringify(filteredSavedTodos));
    })
})