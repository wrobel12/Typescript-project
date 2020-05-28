"use strict";
// load columns and notes from storage at the beginning
window.onload = function () {
    loadColumns();
};
// manage interaction from user for creating new column
var newColumnManager = /** @class */ (function () {
    function newColumnManager(givenInputId, givenButtonId) {
        var _this = this;
        this.inputId = givenInputId;
        this.buttonId = givenButtonId;
        this.input = document.getElementById(this.inputId);
        this.button = document.getElementById(this.buttonId);
        this.button.addEventListener('click', function (e) { return _this.addColumn(); });
        this.button.addEventListener('click', function (e) { return _this.clearArea(); });
    }
    newColumnManager.prototype.addColumn = function () {
        var title = this.input.value;
        this.column = new Column(title);
        this.column.createNewColumn();
    };
    newColumnManager.prototype.clearArea = function () {
        this.input.value = "Title";
    };
    return newColumnManager;
}());
// get columns from storage and load then on the page
function loadColumns() {
    var listOfColumns = JSON.parse(localStorage.getItem('columns'));
    var html = "";
    if (listOfColumns !== null) {
        listOfColumns.forEach(function (element, index) {
            html += "\n              <div class=\"card border-primary mb-3\" style=\"max-width: 18rem; height: 600px;\" id=\"newNote\">\n              <div class=\"card-header\">\n              <button type=\"button\" class=\"btn btn-outline-success\" id=\"" + index + "\" onclick=\"addTask(this.id)\" data-toggle=\"modal\" data-target=\"#exampleModal\">+</button>\n              <button type=\"button\" class=\"btn btn-outline-danger\" id=\"" + index + "\" onclick=\"deleteColumn(this.id)\">X</button>\n              <h5 class=\"card-title\" id=\"noteTitle\">" + element.title + "</h5>\n              </div>\n              <div class=\"card-body text-primary\" ondrop=\"drop(event)\" ondragover=\"allowDrop(event)\" id=\"" + index + "\">\n              </div>\n              </div> ";
            var columnSpace = document.getElementById("notes");
            var newDiv = document.createElement("div");
            newDiv.innerHTML = html;
            columnSpace.appendChild(newDiv);
            html = "";
            element.notes.forEach(function (elem, index) {
                var renderTask = "\n\n                <div class=\"form-group\" style=\"margin: 10px\" id=\"" + elem.id + "\" draggable=\"true\" ondragstart=\"drag(event, this.title)\">\n                <textarea class=\"form-control\" id=\"\" rows=\"3\">" + elem.title + "</textarea>\n              </div> ";
                var element = document.getElementById(elem.parentId);
                var parent = element.parentElement.parentElement;
                var newDiv = document.createElement("div");
                newDiv.innerHTML = renderTask;
                parent.appendChild(newDiv);
                renderTask = "";
            });
        });
    }
}
var Note = /** @class */ (function () {
    function Note(givenValue, givenIndex, givenId) {
        this.title = givenValue;
        this.parentId = givenIndex;
        this.id = givenId;
    }
    return Note;
}());
var Column = /** @class */ (function () {
    function Column(givenTitle) {
        this.title = givenTitle;
        this.notes = [];
    }
    Column.prototype.createNewColumn = function () {
        // create new column object with given title
        this.column = new Column(this.title);
        // get columns from storage
        var array = localStorage.getItem("columns");
        var newListOfColumns;
        if (array == null) {
            newListOfColumns = this.column;
        }
        else {
            newListOfColumns = JSON.parse(array);
        }
        var columsArray = Array.from(newListOfColumns);
        columsArray.push(this.column);
        localStorage.setItem('columns', JSON.stringify(columsArray));
        var columnSpace = document.getElementById("notes");
        columnSpace.innerHTML = "";
        loadColumns();
    };
    return Column;
}());
// delete whole column (wth all tasks)
function deleteColumn(index) {
    var array = localStorage.getItem("columns");
    var columnObj = JSON.parse(array);
    columnObj.splice(index, 1);
    localStorage.setItem("columns", JSON.stringify(columnObj));
    var columnSpace = document.getElementById("notes");
    columnSpace.innerHTML = "";
    loadColumns();
}
// create new task
function addTask(index) {
    var modal = "\n\n    <div class=\"modal fade\" id=\"exampleModal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"exampleModalLabel\" aria-hidden=\"true\">\n    <div class=\"modal-dialog modal-dialog-centered\">\n      <div class=\"modal-content\">\n        <div class=\"modal-header\">\n          <h5 class=\"modal-title\" id=\"exampleModalLabel\">This is your fabulous task</h5>\n          <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">\n            <span aria-hidden=\"true\">&times;</span>\n          </button>\n        </div>\n        <div class=\"modal-body\">\n          <div class=\"form-group\" style=\"margin: 10px\">\n            <textarea class=\"form-control\" id=\"taskDetails\" rows=\"3\"></textarea>\n          </div>\n        </div>\n        <div class=\"modal-footer\">\n          <button type=\"button\" class=\"btn btn-secondary\" data-dismiss=\"modal\">Close</button>\n          <button type=\"button\" class=\"btn btn-primary\" id=\"newTask\" data-dismiss=\"modal\" onclick=\"getTaskInformation(" + index + ")\">Save changes</button>\n        </div>\n      </div>\n    </div>\n  </div> ";
    var modalElement = document.getElementById(index);
    var parent = modalElement.parentElement.parentElement.parentElement;
    var div = document.createElement("div");
    div.innerHTML = modal;
    parent.appendChild(div);
}
function getTaskInformation(index) {
    var taskDetails = document.getElementById('taskDetails').value;
    var newNoteId = new Date().getTime();
    var note = new Note(taskDetails, index, newNoteId);
    var array = localStorage.getItem("columns");
    var newListOfColumns = JSON.parse(array);
    newListOfColumns[index].notes.push(note);
    localStorage.setItem('columns', JSON.stringify(newListOfColumns));
    console.log("taskDetails", taskDetails);
    console.log("note title", note.title);
    var html = "\n\n    <div class=\"form-group\" style=\"margin: 10px\" id=\"" + newNoteId + "\" draggable=\"true\" ondragstart=\"drag(event)\">\n    <textarea class=\"form-control\" id=\"\" rows=\"3\">" + taskDetails + "</textarea>\n    </div> ";
    var task = document.getElementById(index);
    var parent = task.parentElement.parentElement;
    var newDiv = document.createElement("div");
    newDiv.innerHTML = html;
    parent.appendChild(newDiv);
    document.getElementById('taskDetails').value = "";
}
function allowDrop(ev) {
    ev.preventDefault();
}
function drag(ev) {
    ev.dataTransfer.setData("id", ev.target.id);
    // ev.dataTransfer.setData("parentId", ev.target.parentId);
    var task = document.getElementById(ev.target.id);
    var parent = task.parentElement.parentElement;
    console.log("Parent:", parent);
    console.log("ParenitId:", parent.id);
}
function drop(ev) {
    ev.preventDefault();
    var elementId = ev.dataTransfer.getData("id");
    ev.target.appendChild(document.getElementById(elementId));
    console.log(ev.target.id);
    // let note = new Note(title, ev.target.id, data);
    var array = localStorage.getItem("columns");
    var newListOfColumns = JSON.parse(array);
    var column = newListOfColumns[ev.target.id];
    column.notes.map(function (element) {
        if (element.id == elementId) {
            element.parentId = ev.target.id;
        }
        console.log("Element from store after change", element);
        return element;
    });
    localStorage.setItem('columns', JSON.stringify(newListOfColumns));
    //  newListOfColumns[ev.target.id].notes.push(note);
    //  console.log(newListOfColumns[ev.target.id]);
    //  console.log(data);
    //  loadColumns();
}
//# sourceMappingURL=index.js.map