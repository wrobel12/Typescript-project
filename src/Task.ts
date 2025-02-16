import { Column } from "./Column"
import { loadColumns } from "./loadColumnsFromStorage"


// initialization of task, user interaction that is connected with it (by triggering modal)
// and getting task information to update storage and page
export class Task {
    title:string
    id:number
    parentId:number
  
    constructor(givenValue:string, givenIndex:number, givenId:number) {
      this.title = givenValue
      this.parentId = givenIndex
      this.id = givenId
  }  
}

    export function addTask(index:number):void {

      let id:number = new Date().getTime();
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
    </div> `

  let modalElement:HTMLElement|null = document.getElementById(index.toString())
  if(modalElement) {
  let parent:HTMLElement = modalElement.parentElement!.parentElement!
  let div:HTMLElement = document.createElement("div")
  
  div.innerHTML = modal
  parent.appendChild(div)

  let submitTaskButton:HTMLElement|null = document.getElementById(id.toString())
  if(submitTaskButton) {
    submitTaskButton.addEventListener('click', (e) => getTaskInformation(index))
    }
  }
}
   
    function getTaskInformation(index) {

      let taskDetails:string = (<HTMLTextAreaElement>document.getElementById('taskDetails')).value
      let newNoteId:number = new Date().getTime()
      let task:Task = new Task(taskDetails, index, newNoteId)
      let array: string|null = localStorage.getItem("columns")
      let newListOfColumns:Array<Column>
      if(array) {
      newListOfColumns = JSON.parse(array)
      newListOfColumns[index].notes.push(task)
      localStorage.setItem('columns', JSON.stringify(newListOfColumns))
      }
  
      (<HTMLTextAreaElement>document.getElementById('taskDetails')).value = ""

      let columnSpace: HTMLElement|null = document.getElementById("notes")
        if(columnSpace) {
          columnSpace.innerHTML = ""
          }
        loadColumns()
    }