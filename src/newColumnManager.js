"use strict";
exports.__esModule = true;
exports.newColumnManager = void 0;
var Column_1 = require("./Column");
// initialization of HTML element which be responsible for
// entering new column name and submiting it
var newColumnManager = /** @class */ (function () {
    function newColumnManager(givenInputId, givenButtonId) {
        var _this = this;
        this.inputId = givenInputId;
        this.buttonId = givenButtonId;
        this.input = document.getElementById(this.inputId);
        this.button = document.getElementById(this.buttonId);
        // protection against null value
        if (this.button) {
            this.button.addEventListener('click', function (e) { return _this.addColumn(); });
            this.button.addEventListener('click', function (e) { return _this.clearArea(); });
        }
    }
    // submit and create new column
    newColumnManager.prototype.addColumn = function () {
        var title = this.input.value;
        this.column = new Column_1.Column(title);
        this.column.createNewColumn();
    };
    // clean input value
    newColumnManager.prototype.clearArea = function () {
        this.input.value = "Title";
    };
    return newColumnManager;
}());
exports.newColumnManager = newColumnManager;
