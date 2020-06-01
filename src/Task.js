"use strict";
exports.__esModule = true;
exports.addTask = exports.Task = void 0;
var index_1 = require("./index");
var Task = /** @class */ (function () {
    function Task(givenValue, givenIndex, givenId) {
        this.title = givenValue;
        this.parentId = givenIndex;
        this.id = givenId;
    }
    return Task;
}());
exports.Task = Task;
function addTask(index) {
    var id = new Date().getTime();
    var modal = "\n  \n      <div class=\"modal fade\" id=\"exampleModal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"exampleModalLabel\" aria-hidden=\"true\">\n      <div class=\"modal-dialog modal-dialog-centered\">\n        <div class=\"modal-content\">\n          <div class=\"modal-header\">\n            <h5 class=\"modal-title\" id=\"exampleModalLabel\">This is your fabulous task</h5>\n            <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">\n              <span aria-hidden=\"true\">&times;</span>\n            </button>\n          </div>\n          <div class=\"modal-body\">\n            <div class=\"form-group\" style=\"margin: 10px\">\n              <textarea class=\"form-control\" id=\"taskDetails\" rows=\"3\"></textarea>\n            </div>\n          </div>\n          <div class=\"modal-footer\">\n            <button type=\"button\" class=\"btn btn-secondary\" data-dismiss=\"modal\">Close</button>\n            <button type=\"button\" class=\"btn btn-primary\" id=\"" + id + "\" data-dismiss=\"modal\">Save changes</button>\n          </div>\n        </div>\n      </div>\n    </div> ";
    var modalElement = document.getElementById(index.toString());
    if (modalElement) {
        var parent_1 = modalElement.parentElement.parentElement;
        var div = document.createElement("div");
        div.innerHTML = modal;
        parent_1.appendChild(div);
        var submitTaskButton = document.getElementById(id.toString());
        console.log("submit", submitTaskButton);
        // protection against null value
        if (submitTaskButton) {
            console.log("he?");
            submitTaskButton.addEventListener('click', function (e) { return getTaskInformation(index); });
        }
    }
}
exports.addTask = addTask;
function getTaskInformation(index) {
    var taskDetails = document.getElementById('taskDetails').value;
    var newNoteId = new Date().getTime();
    var note = new Task(taskDetails, index, newNoteId);
    console.log(note);
    var array = localStorage.getItem("columns");
    var newListOfColumns;
    if (array) {
        newListOfColumns = JSON.parse(array);
        newListOfColumns[index].notes.push(note);
        localStorage.setItem('columns', JSON.stringify(newListOfColumns));
    }
    var html = "\n  \n      <div class=\"form-group\" style=\"margin: 10px\" id=\"" + newNoteId + "\" draggable=\"true\" ondragstart=\"" + index_1.drag(event) + "\">\n      <textarea class=\"form-control\" id=\"\" rows=\"3\">" + taskDetails + "</textarea>\n      </div> ";
    var task = document.getElementById(index);
    if (task) {
        var parent_2 = task.parentElement.parentElement;
        var newDiv = document.createElement("div");
        newDiv.innerHTML = html;
        parent_2.appendChild(newDiv);
    }
    document.getElementById('taskDetails').value = "";
}
