/**
    File: index.js
    Name: Chris Olah
    Github Username: Colah2122
    Date: 11/28/2022
    Email: christopher_olah@student.uml.edu
    Information: GUI Homework 4 Part 1 javascript and jQuery. This file 
        contains the javascript for the inputted values and display 
        an accurate multiplication table, along with providing jquery
        and identifying user input errors and providing helpful
        and guideful error messages as a response. 
**/

// Declare values for use from index.html
var min_column;
var max_column;
var min_row;
var max_row;
const table = document.getElementById("table");
const user_Values = document.querySelector('.user_Values');
const minimum_Column_Message = document.getElementById("minimum_Column_Message");
const maximum_Column_Message = document.getElementById("maximum_Column_Message");
const minimum_Row_Message = document.getElementById("minimum_Row_Message");
const maximum_Row_Message = document.getElementById("maximum_Row_Message");


// Creates the HTML table and fills it with correct calculations
function create_table(min_column, max_column, min_row, max_row) {
    var values = "";
    values += "<center><table>";
    values +="<tr><th id = \"space\"><center>x</center></th>"
    for (var a = min_column; a <= max_column; a++) {
        values +="<th id=\"row\"><center>" + a + "</center></th>";
    }
    values += "</tr>";
    for (var i = min_row; i <= max_row; i++) {
        values += "<tr>";
        values += "<th id=\"row\"><center>" + i + "</center></th>"
        for (var j = min_column; j <= max_column; j++) {
          values += "<td><center>" + i * j + "</center></td>";
        }
        values += "</tr>";
    }

    values += "</table></center>";
    return values;
}

// User values are checked to be valid and give error message on where the inputs are wrong if necessary
$(function() {
    // verify function that gives error message if column/row values are in wrong order (min above max/max above min)
    jQuery.validator.addMethod("verify", function(value, element, params) {
          var n1 = parseInt(value);
          var n2 = parseInt($('input[name="' + params[0] +'"]').val());
          if (isNaN(n1) || isNaN(n2)) {
              return true;
          }
          if (params[2]) {
              return n1 <= n2;
          } 
          else {
              return n1 >= n2;
          }
    }, "<p>Mininum {1} value has to be <= maximum {1} value. Please adjust your input to make min value less than max value. </p>");
    
    // verify_range function to assure range is correct
    jQuery.validator.addMethod("verify_range", function(value, element, params) {
          var n1 = parseInt(value);
          var n2 = parseInt($('input[name="' + params[0] +'"]').val());
          if (isNaN(n1) || isNaN(n2)) {
              return true;
          }
          if (params[2]) {
              return Math.abs(n2 - n1) <= 100;
          } else {
              return Math.abs(n1 - n2) <= 100;
          }
    },"<p>{1} range must be within 100 </p><p> between min and max values. Please adjust either your min and/or max values.</p>");
    // validates that user input for values are in fact numbers and are usable for calculation
    $("#user_Values").validate({
        rules: {
            min_column : {
                required: true,
                number: true,
                verify: ['max_column', 'Column', true],
                verify_range: ['max_column', 'Column', true]
            },
            max_column : {
                required: true,
                number: true,
                verify: ['min_column', 'Column', false],
                verify_range: ['min_column', 'Column', false]
            },
            min_row : {
                required: true,
                number: true,
                verify: ['max_row', 'Row', true],
                verify_range: ['max_row', 'Row', true]
            },
            max_row : {
                required: true,
                number: true,
                verify: ['min_row', 'Row', false],
                verify_range: ['min_row', 'Row', false]
            }
        },
        messages: {
            min_column: {
                required: "<p>Please enter a number</p>",
                number: "<p>Value has to be a number</p><p>No symbols or letters are accepted</p>"
            },
            max_column: {
                required: "<p>Please enter a number</p>",
                number: "<p>Value has to be a number</p><p>No symbols or letters are accepted</p>"
            },
            min_row: {
                required: "<p>Please enter a number</p>",
                number: "<p>Value has to be a number</p><p>No symbols or letters are accepted</p>"
            },
            max_row: {
                required: "<p>Please enter a number</p>",
                number: "<p>Value has to be a number</p><p>No symbols or letters are accepted</p>"
            }
        },
        // Designate error messages to correct location
        errorPlacement: function(error, element) {
            if (element.attr("name") == "min_column") {
                error.appendTo($("#minimum_Column_Message"));
            } else if (element.attr("name") == "max_column") {
                error.appendTo($("#maximum_Column_Message"));
            } else if (element.attr("name") == "min_row") {
                error.appendTo($("#minimum_Row_Message"));
            } else if (element.attr("name") == "max_row") {
                error.appendTo($("#maximum_Row_Message"));
            }
        },
        // Rounds off decimal values
        submitHandler: function(form, e) {
            e.preventDefault();
            min_column = Math.round(document.getElementById("min_column").value);
            max_column = Math.round(document.getElementById("max_column").value);
            min_row = Math.round(document.getElementById("min_row").value);
            max_row = Math.round(document.getElementById("max_row").value);
            text.innerHTML = "<p>Please be aware all decimal numbers will be rounded to whole numbers.</p>";
            table.innerHTML = create_table(min_column, max_column, min_row, max_row);
        }
    })
});