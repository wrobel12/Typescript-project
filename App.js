"use strict";
exports.__esModule = true;
var newColumnManager_1 = require("./src/newColumnManager");
var loadColumnsFromStorage_1 = require("./src/loadColumnsFromStorage");
// load columns from storage
window.onload = function () {
    loadColumnsFromStorage_1.loadColumns();
};
// initialization of 'column manager' to start whole interaction
var columnManager = new newColumnManager_1.newColumnManager("createNewColumnInput", "createNewColumnButton");
