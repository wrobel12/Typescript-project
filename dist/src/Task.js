import { loadColumns } from "./loadColumnsFromStorage";
// initialization of task, user interaction that is connected with it (by triggering modal)
// and getting task information to update storage and page
export class Task {
    constructor(givenValue, givenIndex, givenId) {
        this.title = givenValue;
        this.parentId = givenIndex;
        this.id = givenId;
    }
}
export function addTask(index) {
    console.log("Column id in addTask", index);
    let id = new Date().getTime();
    let modal = `
  
      <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">This is your fabulous task</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="form-group" style="margin: 10px">
              <textarea class="form-control" id="taskDetails" rows="3"></textarea>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary" id="${id}" data-dismiss="modal">Save changes</button>
          </div>
        </div>
      </div>
    </div> `;
    let modalElement = document.getElementById(index.toString());
    if (modalElement) {
        let parent = modalElement.parentElement.parentElement;
        let div = document.createElement("div");
        div.innerHTML = modal;
        parent.appendChild(div);
        console.log("Column id submitTaskButton", index);
        let submitTaskButton = document.getElementById(id.toString());
        // protection against null value
        if (submitTaskButton) {
            submitTaskButton.addEventListener('click', (e) => getTaskInformation(index));
        }
    }
}
function getTaskInformation(index) {
    console.log("ParentId of task", index);
    let taskDetails = document.getElementById('taskDetails').value;
    let newNoteId = new Date().getTime();
    let note = new Task(taskDetails, index, newNoteId);
    let array = localStorage.getItem("columns");
    let newListOfColumns;
    if (array) {
        newListOfColumns = JSON.parse(array);
        newListOfColumns[index].notes.push(note);
        localStorage.setItem('columns', JSON.stringify(newListOfColumns));
    }
    // let html:string = `
    // <div class="form-group" style="margin: 10px" id="${newNoteId}" draggable="true">
    // <textarea class="form-control" id="" rows="3">${taskDetails}</textarea>
    // </div> `;
    // let task:HTMLElement|null = document.getElementById(index);
    // if(task) {
    // let parent:HTMLElement = task.parentElement!.parentElement!
    // let newDiv:HTMLElement = document.createElement("div");
    // newDiv.innerHTML = html;
    // parent.appendChild(newDiv);
    // let taskForm = document.getElementById(newNoteId.toString());
    // taskForm!.addEventListener("dragstart", (e) => drag(event));
    document.getElementById('taskDetails').value = "";
    let columnSpace = document.getElementById("notes");
    if (columnSpace) {
        columnSpace.innerHTML = "";
    }
    loadColumns();
}
//# sourceMappingURL=task.js.map