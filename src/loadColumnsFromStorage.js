"use strict";
exports.__esModule = true;
exports.loadColumns = void 0;
var Task_1 = require("./Task");
var Column_1 = require("./Column");
var index_1 = require("./index");
// get columns from storage and load them on the page
function loadColumns() {
    var storage = localStorage.getItem('columns');
    console.log("Po load");
    console.log(storage);
    var listOfColumns;
    if (storage) {
        storage = JSON.parse(storage);
        listOfColumns = Array.from(storage);
    }
    //   let storage:string = JSON.parse(localStorage.getItem('columns'));
    var html = "";
    if (listOfColumns !== null) {
        listOfColumns.forEach(function (element, index) {
            html += "\n              <div class=\"card border-primary mb-3\" style=\"max-width: 18rem; height: 600px;\" id=\"newNote\">\n              <div class=\"card-header\">\n              <button type=\"button\" class=\"btn btn-outline-success\" id=\"" + index + "\" data-toggle=\"modal\" data-target=\"#exampleModal\">+</button>\n              <button type=\"button\" class=\"btn btn-outline-danger\" id=\"" + index + "\">X</button>\n              <h5 class=\"card-title\" id=\"noteTitle\">" + element.title + "</h5>\n              </div>\n              <div class=\"card-body text-primary\" id=\"" + index + "\">\n              </div>\n              </div> ";
            addNewHtmlColumn(html);
            // let deleteButton:HTMLCollectionOf<Element>|null = document.getElementsByClassName("btn-outline-success")
            var deleteButton = document.getElementsByClassName("btn-outline-danger");
            var addTaskButton = document.getElementsByClassName("btn-outline-success");
            // protection against null value
            Array.from(deleteButton).forEach(function (element) {
                element.addEventListener('click', function (e) { return Column_1.deleteColumn(index); });
            });
            Array.from(addTaskButton).forEach(function (element) {
                element.addEventListener('click', function (e) { return Task_1.addTask(index); });
            });
            var columnBody = document.getElementById(index.toString());
            columnBody.addEventListener("ondragover", function (e) { return index_1.allowDrop; });
            columnBody.addEventListener("ondrop", function (e) { return index_1.drop(event); });
            // if(addTaskButton) {
            //     addTaskButton.addEventListener('click', (e) => addTask(index));
            // }
            html = "";
            element.notes.forEach(function (elem, index) {
                var renderTask = "\n\n                <div class=\"form-group\" style=\"margin: 10px\" id=\"" + elem.id + "\" draggable=\"true\">\n                <textarea class=\"form-control\" id=\"\" rows=\"3\">" + elem.title + "</textarea>\n              </div> ";
                addNewHtmlTask(elem.parentId, renderTask);
                var taskForm = document.getElementById(elem.id.toString());
                taskForm.addEventListener("dragstart", function (e) { return index_1.drag(event); });
                renderTask = "";
            });
        });
    }
}
exports.loadColumns = loadColumns;
function addNewHtmlColumn(html) {
    var columnSpace = document.getElementById("notes");
    var newDiv = document.createElement("div");
    newDiv.innerHTML = html;
    if (columnSpace) {
        columnSpace.appendChild(newDiv);
    }
}
function addNewHtmlTask(elementId, html) {
    var element = document.getElementById(elementId.toString());
    if (element) {
        var parent_1 = element.parentElement.parentElement;
        var newDiv = document.createElement("div");
        newDiv.innerHTML = html;
        parent_1.appendChild(newDiv);
    }
}
