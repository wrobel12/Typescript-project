import { Task } from "./Task";
import { loadColumns } from "./loadColumnsFromStorage";
// load columns and notes from storage at the beginning
// window.onload = function(): void {
//   loadColumns();
// };
// manage interaction from user for creating new column
//   export class newColumnManager {
//     inputId:string;
//     buttonId:string;
//     column:Column|undefined;
//     input:HTMLInputElement;
//     button:HTMLElement|null;
//     constructor(givenInputId:string, givenButtonId:string) {
//       console.log("Hi")
//       this.inputId = givenInputId;
//       this.buttonId = givenButtonId;
//       this.input = (<HTMLInputElement>document.getElementById(this.inputId));
//       this.button = document.getElementById(this.buttonId);
//       if(this.button) {
//       this.button.addEventListener('click', (e) => this.addColumn())
//       this.button.addEventListener('click', (e) => this.clearArea());
//       }
//   }
//   addColumn(): void {
//     let title:string = this.input.value;
//     this.column = new Column(title)
//     this.column.createNewColumn()
// }
//    clearArea(): void {
//      this.input.value = "Title"
// }
//   }
//   export function addNewHtmlColumn(html:string): void {
//     let columnSpace:HTMLElement|null = document.getElementById("notes")
//     let newDiv:HTMLElement = document.createElement("div");
//     newDiv.innerHTML = html;
//     if(columnSpace) {
//     columnSpace.appendChild(newDiv)
//     }
//   }
//   export function addNewHtmlTask(elementId:number, html:string): void {
//     let element:HTMLElement|null = document.getElementById(elementId.toString());
//     if(element) {
//     let parent:HTMLElement = element.parentElement!.parentElement!
//     let newDiv:HTMLElement = document.createElement("div");
//     newDiv.innerHTML = html;
//     parent.appendChild(newDiv);
//     }
//   }
// // get columns from storage and load then on the page
// export function loadColumns() :void {
//   let listOfColumns:Array<Column> = JSON.parse(localStorage.getItem('columns') || '{}');
//   let html: string = "";
//         if (listOfColumns !== null) {
//           listOfColumns.forEach(function(element:Column, index:number): void {
//               html += `
//               <div class="card border-primary mb-3" style="max-width: 18rem; height: 600px;" id="newNote">
//               <div class="card-header">
//               <button type="button" class="btn btn-outline-success" id="${index}" onclick="addTask(this.id)" data-toggle="modal" data-target="#exampleModal">+</button>
//               <button type="button" class="btn btn-outline-danger" id="${index}" onclick="deleteColumn(this.id)">X</button>
//               <h5 class="card-title" id="noteTitle">${element.title}</h5>
//               </div>
//               <div class="card-body text-primary" ondrop="drop(event)" ondragover="allowDrop(event)" id="${index}">
//               </div>
//               </div> `;
//               addNewHtmlColumn(html)
//               html = "";
//               element.notes.forEach(function(elem:Note, index:number):void {
//                 let renderTask = `
//                 <div class="form-group" style="margin: 10px" id="${elem.id}" draggable="true" ondragstart="drag(event)">
//                 <textarea class="form-control" id="" rows="3">${elem.title}</textarea>
//               </div> `;
//                 addNewHtmlTask(elem.parentId, renderTask);
//                 renderTask = "";
//               });
//   });
// }
// }
// export class Note {
//   title:string
//   id:number
//   parentId:number
//   constructor(givenValue:string, givenIndex:number, givenId:number) {
//     this.title = givenValue;
//     this.parentId = givenIndex;
//     this.id = givenId;
// }
//   } 
// export class Column {
//     title:string;
//     column:Column|undefined;
//     columnList:Array<Column>|undefined;
//     notes:Array<Note>;
//     constructor(givenTitle:string) {
//         this.title = givenTitle;
//         this.notes = [];
//     }
//     createNewColumn(): void {
//         // create new column object with given title
//         this.column = new Column(this.title)
//         this.updateLocalStorage()
//         let columnSpace:HTMLElement|null = document.getElementById("notes")
//         if(columnSpace) {
//         columnSpace.innerHTML = "";
//         }
//         loadColumns();
//     }
//     updateLocalStorage(): void {
//       let array: string|null = localStorage.getItem("columns");
//       let newListOfColumns;
//       if (array == null) {
//         newListOfColumns = this.column;
//         } else {
//           newListOfColumns = JSON.parse(array);
//         }
//        let columsArray:Array<Column> = Array.from(newListOfColumns);
//        if(this.column) {
//        columsArray.push(this.column)
//        }
//       localStorage.setItem('columns', JSON.stringify(columsArray))
//     }
// }
// delete whole column (wth all tasks)
// export function deleteColumn(index:number):void {
//   let array:string|null = localStorage.getItem("columns");
//   let columnObj:Array<string>|null;
//   if(array) {
//   columnObj = JSON.parse(array)
//   columnObj!.splice(index, 1);
//   }
//   localStorage.setItem("columns", JSON.stringify(columnObj!));
//   let columnSpace: HTMLElement|null = document.getElementById("notes")
//   if(columnSpace) {
//   columnSpace.innerHTML = "";
//   }
//   loadColumns();
// }
// create new task
//   export function addTask(index:string):void {
//     let modal:string = `
//     <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
//     <div class="modal-dialog modal-dialog-centered">
//       <div class="modal-content">
//         <div class="modal-header">
//           <h5 class="modal-title" id="exampleModalLabel">This is your fabulous task</h5>
//           <button type="button" class="close" data-dismiss="modal" aria-label="Close">
//             <span aria-hidden="true">&times;</span>
//           </button>
//         </div>
//         <div class="modal-body">
//           <div class="form-group" style="margin: 10px">
//             <textarea class="form-control" id="taskDetails" rows="3"></textarea>
//           </div>
//         </div>
//         <div class="modal-footer">
//           <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
//           <button type="button" class="btn btn-primary" id="newTask" data-dismiss="modal" onclick="getTaskInformation(${index})">Save changes</button>
//         </div>
//       </div>
//     </div>
//   </div> `;
// let modalElement:HTMLElement|null = document.getElementById(index);
// if(modalElement) {
// let parent:HTMLElement = modalElement.parentElement!.parentElement!.parentElement!
// let div:HTMLElement = document.createElement("div");
// div.innerHTML = modal;
// parent.appendChild(div);
// }
//   }
//   export function getTaskInformation(index) {
//     let taskDetails:string = (<HTMLTextAreaElement>document.getElementById('taskDetails')).value;
//     let newNoteId:number = new Date().getTime();
//     let note = new Task(taskDetails, index, newNoteId);
//     let array: string|null = localStorage.getItem("columns");
//     let newListOfColumns:Array<Column>;
//     if(array) {
//     newListOfColumns = JSON.parse(array)
//     newListOfColumns[index].notes.push(note);
//     localStorage.setItem('columns', JSON.stringify(newListOfColumns))
//     }
//     let html:string = `
//     <div class="form-group" style="margin: 10px" id="${newNoteId}" draggable="true" ondragstart="drag(event)">
//     <textarea class="form-control" id="" rows="3">${taskDetails}</textarea>
//     </div> `;
//     let task:HTMLElement|null = document.getElementById(index);
//     if(task) {
//     let parent:HTMLElement = task.parentElement!.parentElement!
//     let newDiv:HTMLElement = document.createElement("div");
//     newDiv.innerHTML = html;
//     parent.appendChild(newDiv);
//     }
//     (<HTMLTextAreaElement>document.getElementById('taskDetails')).value = "";
//   }
export function allowDrop(ev) {
    ev.preventDefault();
}
export function drag(ev) {
    ev.dataTransfer.setData("id", ev.target.id);
    // ev.dataTransfer.setData("oldParentId", )
    // let task:HTMLElement = document.getElementById(ev.target.id);
    // let p = task.parentElement.parentElement
    // console.log(ev.target.parentId)
}
export function drop(ev) {
    ev.preventDefault();
    var elementId = ev.dataTransfer.getData("id");
    ev.target.appendChild(document.getElementById(elementId));
    let title = "";
    let array = localStorage.getItem("columns");
    if (array) {
        let newListOfColumns = JSON.parse(array);
        newListOfColumns.forEach(elem => {
            elem.notes.forEach((element) => {
                console.log("Element", element);
                if (element.id == elementId) {
                    title = element.title;
                    elem.notes = elem.notes.filter(element => element.title != title);
                }
            });
        });
        let note = new Task(title, ev.target.id, elementId);
        newListOfColumns[ev.target.id].notes.push(note);
        localStorage.setItem('columns', JSON.stringify(newListOfColumns));
    }
    let columnSpace = document.getElementById("notes");
    if (columnSpace) {
        columnSpace.innerHTML = "";
    }
    loadColumns();
}
//# sourceMappingURL=index.js.map