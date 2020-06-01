import { addTask } from "./Task";
import { deleteColumn } from "./Column";
// get columns from storage and load them on the page
export function loadColumns() {
    let storage = localStorage.getItem('columns');
    console.log("Po load");
    console.log(storage);
    let listOfColumns;
    if (storage) {
        storage = JSON.parse(storage);
        listOfColumns = Array.from(storage);
    }
    //   let storage:string = JSON.parse(localStorage.getItem('columns'));
    let html = "";
    if (listOfColumns !== null) {
        listOfColumns.forEach(function (element, index) {
            html += `
              <div class="card border-primary mb-3" style="max-width: 18rem; height: 600px;" id="newNote">
              <div class="card-header">
              <button type="button" class="btn btn-outline-success" id="${index}" data-toggle="modal" data-target="#exampleModal">+</button>
              <button type="button" class="btn btn-outline-danger" id="${index}">X</button>
              <h5 class="card-title" id="noteTitle">${element.title}</h5>
              </div>
              <div class="card-body text-primary" ondrop="drop(event)" ondragover="allowDrop(event)" id="${index}">
              </div>
              </div> `;
            addNewHtmlColumn(html);
            // let deleteButton:HTMLCollectionOf<Element>|null = document.getElementsByClassName("btn-outline-success")
            let deleteButton = document.getElementsByClassName("btn-outline-danger");
            let addTaskButton = document.getElementsByClassName("btn-outline-success");
            // protection against null value
            Array.from(deleteButton).forEach(element => {
                element.addEventListener('click', (e) => deleteColumn(index));
            });
            Array.from(addTaskButton).forEach(element => {
                element.addEventListener('click', (e) => addTask(index));
            });
            // if(addTaskButton) {
            //     addTaskButton.addEventListener('click', (e) => addTask(index));
            // }
            console.log(deleteButton);
            html = "";
            element.notes.forEach(function (elem, index) {
                let renderTask = `

                <div class="form-group" style="margin: 10px" id="${elem.id}" draggable="true" ondragstart="drag(event)">
                <textarea class="form-control" id="" rows="3">${elem.title}</textarea>
              </div> `;
                addNewHtmlTask(elem.parentId, renderTask);
                renderTask = "";
            });
        });
    }
}
function addNewHtmlColumn(html) {
    let columnSpace = document.getElementById("notes");
    let newDiv = document.createElement("div");
    newDiv.innerHTML = html;
    if (columnSpace) {
        columnSpace.appendChild(newDiv);
    }
}
function addNewHtmlTask(elementId, html) {
    let element = document.getElementById(elementId.toString());
    if (element) {
        let parent = element.parentElement.parentElement;
        let newDiv = document.createElement("div");
        newDiv.innerHTML = html;
        parent.appendChild(newDiv);
    }
}
//# sourceMappingURL=loadColumnsFromStorage.js.map