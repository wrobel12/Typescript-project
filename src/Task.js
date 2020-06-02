"use strict";
exports.__esModule = true;
exports.addTask = exports.Task = void 0;
var loadColumnsFromStorage_1 = require("./loadColumnsFromStorage");
// initialization of task, user interaction that is connected with it (by triggering modal)
// and getting task information to update storage and page
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
    console.log("Column id in addTask", index);
    var id = new Date().getTime();
    var modal = "\n  \n      <div class=\"modal fade\" id=\"exampleModal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"exampleModalLabel\" aria-hidden=\"true\">\n      <div class=\"modal-dialog modal-dialog-centered\">\n        <div class=\"modal-content\">\n          <div class=\"modal-header\">\n            <h5 class=\"modal-title\" id=\"exampleModalLabel\">This is your fabulous task</h5>\n            <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">\n              <span aria-hidden=\"true\">&times;</span>\n            </button>\n          </div>\n          <div class=\"modal-body\">\n            <div class=\"form-group\" style=\"margin: 10px\">\n              <textarea class=\"form-control\" id=\"taskDetails\" rows=\"3\"></textarea>\n            </div>\n          </div>\n          <div class=\"modal-footer\">\n            <button type=\"button\" class=\"btn btn-secondary\" data-dismiss=\"modal\">Close</button>\n            <button type=\"button\" class=\"btn btn-primary\" id=\"" + id + "\" data-dismiss=\"modal\">Save changes</button>\n          </div>\n        </div>\n      </div>\n    </div> ";
    var modalElement = document.getElementById(index.toString());
    if (modalElement) {
        var parent_1 = modalElement.parentElement.parentElement;
        var div = document.createElement("div");
        div.innerHTML = modal;
        parent_1.appendChild(div);
        console.log("Column id submitTaskButton", index);
        var submitTaskButton = document.getElementById(id.toString());
        // protection against null value
        if (submitTaskButton) {
            submitTaskButton.addEventListener('click', function (e) { return getTaskInformation(index); });
        }
    }
}
exports.addTask = addTask;
function getTaskInformation(index) {
    console.log("ParentId of task", index);
    var taskDetails = document.getElementById('taskDetails').value;
    var newNoteId = new Date().getTime();
    var note = new Task(taskDetails, index, newNoteId);
    var array = localStorage.getItem("columns");
    var newListOfColumns;
    if (array) {
        newListOfColumns = JSON.parse(array);
        newListOfColumns[index].notes.push(note);
        localStorage.setItem('columns', JSON.stringify(newListOfColumns));
    }
    // let html:string = `
    // <div class="form-group" style="margin: 10px" id="${newNoteId}" draggable="true">
    // <textarea class="form-control" id="" rows="3">${taskDetails}</textarea>
    // </div> `;
    // let task:HTMLElement|null = document.getElementById(index);
    // if(task) {
    // let parent:HTMLElement = task.parentElement!.parentElement!
    // let newDiv:HTMLElement = document.createElement("div");
    // newDiv.innerHTML = html;
    // parent.appendChild(newDiv);
    // let taskForm = document.getElementById(newNoteId.toString());
    // taskForm!.addEventListener("dragstart", (e) => drag(event));
    document.getElementById('taskDetails').value = "";
    var columnSpace = document.getElementById("notes");
    if (columnSpace) {
        columnSpace.innerHTML = "";
    }
    loadColumnsFromStorage_1.loadColumns();
}
