"use strict";
exports.__esModule = true;
exports.deleteColumn = exports.Column = void 0;
var loadColumnsFromStorage_1 = require("./loadColumnsFromStorage");
// initialization of column, updating local storage of new ones and possibility to delete one
var Column = /** @class */ (function () {
    function Column(givenTitle) {
        this.title = givenTitle;
        this.notes = [];
    }
    Column.prototype.createNewColumn = function () {
        // create new column object with given title
        this.column = new Column(this.title);
        this.updateLocalStorage();
        var columnSpace = document.getElementById("notes");
        if (columnSpace) {
            columnSpace.innerHTML = "";
        }
        loadColumnsFromStorage_1.loadColumns();
    };
    Column.prototype.updateLocalStorage = function () {
        var array = localStorage.getItem("columns");
        var newListOfColumns;
        if (array == null) {
            newListOfColumns = this.column;
        }
        else {
            newListOfColumns = JSON.parse(array);
        }
        var columsArray = Array.from(newListOfColumns);
        if (this.column) {
            columsArray.push(this.column);
        }
        localStorage.setItem('columns', JSON.stringify(columsArray));
    };
    return Column;
}());
exports.Column = Column;
function deleteColumn(index) {
    var array = localStorage.getItem("columns");
    var columnObj;
    if (array) {
        columnObj = JSON.parse(array);
        columnObj.splice(index, 1);
    }
    localStorage.setItem("columns", JSON.stringify(columnObj));
    var columnSpace = document.getElementById("notes");
    if (columnSpace) {
        columnSpace.innerHTML = "";
    }
    loadColumnsFromStorage_1.loadColumns();
}
exports.deleteColumn = deleteColumn;
