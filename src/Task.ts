import { Column } from "./Column"
import { drag } from "./index"

export class Task {
    title:string
    id:number
    parentId:number
  
    constructor(givenValue:string, givenIndex:number, givenId:number) {
      this.title = givenValue;
      this.parentId = givenIndex;
      this.id = givenId;
  }
  
    }

  
    export function addTask(index:number):void {

      let id = new Date().getTime();

      let modal:string = `
  
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

 
  
  
  let modalElement:HTMLElement|null = document.getElementById(index.toString());
  if(modalElement) {
  let parent:HTMLElement = modalElement.parentElement!.parentElement!
  let div:HTMLElement = document.createElement("div");
  
  div.innerHTML = modal;
  parent.appendChild(div);

  let submitTaskButton:HTMLElement|null = document.getElementById(id.toString());
  console.log("submit", submitTaskButton)
  // protection against null value
  if(submitTaskButton) {
    console.log("he?")
    submitTaskButton.addEventListener('click', (e) => getTaskInformation(index));
  }
  }
        
    }
  
  
  
  
    function getTaskInformation(index) {

      let taskDetails:string = (<HTMLTextAreaElement>document.getElementById('taskDetails')).value;
      let newNoteId:number = new Date().getTime();
      let note = new Task(taskDetails, index, newNoteId);
      console.log(note)
      let array: string|null = localStorage.getItem("columns");
      let newListOfColumns:Array<Column>;
      if(array) {
      newListOfColumns = JSON.parse(array)
      newListOfColumns[index].notes.push(note);
      localStorage.setItem('columns', JSON.stringify(newListOfColumns))
      }
    
  
      let html:string = `
  
      <div class="form-group" style="margin: 10px" id="${newNoteId}" draggable="true" ondragstart="${drag(event)}">
      <textarea class="form-control" id="" rows="3">${taskDetails}</textarea>
      </div> `;
  
  
      let task:HTMLElement|null = document.getElementById(index);
      if(task) {
      let parent:HTMLElement = task.parentElement!.parentElement!
      let newDiv:HTMLElement = document.createElement("div");
      newDiv.innerHTML = html;
    
      parent.appendChild(newDiv);
      }
      (<HTMLTextAreaElement>document.getElementById('taskDetails')).value = "";
    }