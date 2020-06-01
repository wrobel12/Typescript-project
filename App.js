"use strict";
exports.__esModule = true;
var newColumnManager_1 = require("./src/newColumnManager");
var loadColumnsFromStorage_1 = require("./src/loadColumnsFromStorage");
window.onload = function () {
    loadColumnsFromStorage_1.loadColumns();
};
var columnManager = new newColumnManager_1.newColumnManager("createNewColumnInput", "createNewColumnButton");
