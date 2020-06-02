"use strict";
exports.__esModule = true;
exports.drop = exports.drag = exports.allowDrop = void 0;
var Task_1 = require("./Task");
var loadColumnsFromStorage_1 = require("./loadColumnsFromStorage");
function allowDrop(ev) {
    ev.preventDefault();
}
exports.allowDrop = allowDrop;
function drag(ev) {
    ev.dataTransfer.setData("id", ev.target.id);
}
exports.drag = drag;
function drop(ev) {
    ev.preventDefault();
    var elementId = ev.dataTransfer.getData("id");
    ev.target.appendChild(document.getElementById(elementId.toString()));
    var title = "";
    var array = localStorage.getItem("columns");
    if (array) {
        var newListOfColumns = JSON.parse(array);
        newListOfColumns.forEach(function (elem) {
            elem.notes.forEach(function (element) {
                if (element.id == elementId) {
                    title = element.title;
                    elem.notes = elem.notes.filter(function (element) { return element.title != title; });
                }
            });
        });
        var task = new Task_1.Task(title, ev.target.id, elementId);
        newListOfColumns[ev.target.id].notes.push(task);
        localStorage.setItem('columns', JSON.stringify(newListOfColumns));
    }
    var columnSpace = document.getElementById("notes");
    if (columnSpace) {
        columnSpace.innerHTML = "";
    }
    loadColumnsFromStorage_1.loadColumns();
}
exports.drop = drop;
