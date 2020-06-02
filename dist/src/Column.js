import { loadColumns } from "./loadColumnsFromStorage";
// initialization of column, updating local storage of new ones and possibility to delete one
export class Column {
    constructor(givenTitle) {
        this.title = givenTitle;
        this.notes = [];
    }
    createNewColumn() {
        // create new column object with given title
        this.column = new Column(this.title);
        this.updateLocalStorage();
        let columnSpace = document.getElementById("notes");
        if (columnSpace) {
            columnSpace.innerHTML = "";
        }
        loadColumns();
    }
    updateLocalStorage() {
        let array = localStorage.getItem("columns");
        let newListOfColumns;
        if (array == null) {
            newListOfColumns = this.column;
        }
        else {
            newListOfColumns = JSON.parse(array);
        }
        let columsArray = Array.from(newListOfColumns);
        if (this.column) {
            columsArray.push(this.column);
        }
        localStorage.setItem('columns', JSON.stringify(columsArray));
    }
}
export function deleteColumn(index) {
    let array = localStorage.getItem("columns");
    let columnObj;
    if (array) {
        columnObj = JSON.parse(array);
        columnObj.splice(index, 1);
    }
    localStorage.setItem("columns", JSON.stringify(columnObj));
    let columnSpace = document.getElementById("notes");
    if (columnSpace) {
        columnSpace.innerHTML = "";
    }
    loadColumns();
}
//# sourceMappingURL=column.js.map