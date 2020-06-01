import { newColumnManager } from "./src/newColumnManager"
import { loadColumns } from "./src/loadColumnsFromStorage"

window.onload = function(): void {
    loadColumns();
  };

let columnManager = new newColumnManager("createNewColumnInput", "createNewColumnButton")
