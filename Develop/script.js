$(document).ready(function() {
    //Current date and time 
    $("#currentDay").text(moment().format("MMMM Do YYYY, h:mma"));

    //Save objects that include both date and time to local storage 
    var savedTodos = JSON.parse(localStorage.getItem("savedTodos")) || [];


    // Work hours array
    var workHours = ["7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19"];
    var mainDisplay = $("#displayContent");

    for (var i = 0; i < workHours.length; i++) {

        //Create row
        var newRow = $("<div>");
        newRow.addClass("row");
        newRow.data("hour", workHours[i])

        //Hour 
        var hourColumn = $("<div>");
        hourColumn.addClass("col-md-2 col-sm-3 time-block");
        //Time with am/pm
        if (workHours[i] == 12) {
            hourColumn.text("12 pm")
        } else if (workHours[i] > 12) {
            hourColumn.text(parseInt(workHours[i] - 12) + "pm");
        } else {
            hourColumn.text(parseInt(workHours[i]) + "am");
        }

        //Column for To-do items 
        var toDoCol = $("<input>");
        console.log(savedTodos);
        savedTodos.forEach(function(element) {
            console.log(element);
            if (element.hour == workHours[i]) {
                toDoCol.val(element.todo)
            }
        });
        toDoCol.addClass("col-md-9 col-sm-6 textarea");

        //Color change for past, present, and future
        if (parseInt(workHours[i]) === moment().hour()) {
            toDoCol.addClass("present");
        } else if (parseInt(workHours[i]) < moment().hour()) {
            toDoCol.addClass("past");
        } else {
            toDoCol.addClass("future");
        }

        //Add button column
        var newColSave = $("<button>");
        newColSave.addClass("col-md-1 col-sm-3 addBtn");
        newColSave.text("Add");

        //Append to screen 
        newRow.append(hourColumn, toDoCol, newColSave);
        mainDisplay.append(newRow);
    };

    //Click save to save event into local storage
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