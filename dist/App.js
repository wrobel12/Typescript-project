import { newColumnManager } from "./src/newColumnManager";
import { loadColumns } from "./src/loadColumnsFromStorage";
window.onload = function () {
    loadColumns();
};
let columnManager = new newColumnManager("createNewColumnInput", "createNewColumnButton");
//# sourceMappingURL=App.js.map