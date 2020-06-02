import { Task } from "./Task";
import { loadColumns } from "./loadColumnsFromStorage";
export function allowDrop(ev) {
    ev.preventDefault();
}
export function drag(ev) {
    ev.dataTransfer.setData("id", ev.target.id);
}
export function drop(ev) {
    ev.preventDefault();
    let elementId = ev.dataTransfer.getData("id");
    ev.target.appendChild(document.getElementById(elementId.toString()));
    let title = "";
    let array = localStorage.getItem("columns");
    if (array) {
        let newListOfColumns = JSON.parse(array);
        newListOfColumns.forEach(elem => {
            elem.notes.forEach((element) => {
                if (element.id == elementId) {
                    title = element.title;
                    elem.notes = elem.notes.filter(element => element.title != title);
                }
            });
        });
        let task = new Task(title, ev.target.id, elementId);
        newListOfColumns[ev.target.id].notes.push(task);
        localStorage.setItem('columns', JSON.stringify(newListOfColumns));
    }
    let columnSpace = document.getElementById("notes");
    if (columnSpace) {
        columnSpace.innerHTML = "";
    }
    loadColumns();
}
//# sourceMappingURL=dragAndDrop.js.map