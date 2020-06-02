"use strict";
exports.__esModule = true;
exports.loadColumns = void 0;
var Task_1 = require("./Task");
var Column_1 = require("./Column");
var dragAndDrop_1 = require("./dragAndDrop");
// get columns from storage and load them on the page
function loadColumns() {
    var listOfColumns = JSON.parse(localStorage.getItem('columns') || '{}');
    var columnId = 0;
    var html = "";
    if (listOfColumns !== null) {
        listOfColumns.forEach(function (element, index) {
            html += "\n              <div class=\"card border-primary mb-3\" style=\"max-width: 18rem; height: 600px;\" id=\"newNote\">\n              <div class=\"card-header\">\n              <button type=\"button\" class=\"btn btn-outline-success\" id=\"" + index + "\" data-toggle=\"modal\" data-target=\"#exampleModal\">+</button>\n              <button type=\"button\" class=\"btn btn-outline-danger\" id=\"" + index + "\">X</button>\n              <h5 class=\"card-title\" id=\"noteTitle\">" + element.title + "</h5>\n              </div>\n              <div class=\"card-body text-primary\" id=\"" + index + "\">\n              </div>\n              </div> ";
            addNewHtmlColumn(html);
            columnId = index;
            var deleteButton = document.getElementsByClassName("btn-outline-danger");
            deleteButton[index].addEventListener('click', function (e) { return Column_1.deleteColumn(index); });
            var addTaskButton = document.getElementsByClassName("btn-outline-success");
            addTaskButton[index].addEventListener('click', function (e) { return Task_1.addTask(index); });
            var columnBody = document.getElementsByClassName("card-body");
            columnBody[index].addEventListener("dragover", function (e) { return dragAndDrop_1.allowDrop(event); });
            columnBody[index].addEventListener("drop", function (e) { return dragAndDrop_1.drop(event); });
            html = "";
            element.notes.forEach(function (elem, index) {
                var renderTask = "\n\n                <div class=\"form-group\" style=\"margin: 10px\" id=\"" + elem.id + "\" draggable=\"true\">\n                <textarea class=\"form-control\" id=\"\" rows=\"3\">" + elem.title + "</textarea>\n              </div> ";
                console.log(columnId);
                elem.parentId = columnId;
                addNewHtmlTask(elem.parentId, renderTask);
                var taskForm = document.getElementById(elem.id.toString());
                taskForm.addEventListener("dragstart", function (e) { return dragAndDrop_1.drag(event); });
                renderTask = "";
            });
        });
    }
}
exports.loadColumns = loadColumns;
// add column to html
function addNewHtmlColumn(html) {
    var columnSpace = document.getElementById("notes");
    var newDiv = document.createElement("div");
    newDiv.innerHTML = html;
    if (columnSpace) {
        columnSpace.appendChild(newDiv);
    }
}
// add task to html
function addNewHtmlTask(elementId, html) {
    var element = document.getElementById(elementId.toString());
    if (element) {
        var parent_1 = element.parentElement.parentElement;
        var newDiv = document.createElement("div");
        newDiv.innerHTML = html;
        parent_1.appendChild(newDiv);
    }
}
