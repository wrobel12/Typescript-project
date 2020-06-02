import { newColumnManager } from "./src/newColumnManager";
import { loadColumns } from "./src/loadColumnsFromStorage";
// load columns from storage
window.onload = function () {
    loadColumns();
};
// initialization of 'column manager' to start whole interaction
let columnManager = new newColumnManager("createNewColumnInput", "createNewColumnButton");
//# sourceMappingURL=App.js.map