import { Column } from "./column"
import { Task, addTask } from "./task"
import { deleteColumn } from "./column"
import { drag, allowDrop, drop } from "./dragAndDrop"


// get columns from storage and load them on the page

export function loadColumns():void {

let listOfColumns:Array<Column> = JSON.parse(localStorage.getItem('columns') || '{}');
let columnId = 0;
  
  let html: string = "";
        
        if (listOfColumns !== null) {
        
          listOfColumns.forEach(function(element:Column, index:number): void {
            
        

              html += `
              <div class="card border-primary mb-3" style="max-width: 18rem; height: 600px;" id="newNote">
              <div class="card-header">
              <button type="button" class="btn btn-outline-success" id="${index}" data-toggle="modal" data-target="#exampleModal">+</button>
              <button type="button" class="btn btn-outline-danger" id="${index}">X</button>
              <h5 class="card-title" id="noteTitle">${element.title}</h5>
              </div>
              <div class="card-body text-primary" id="${index}">
              </div>
              </div> `;

              

              addNewHtmlColumn(html)

              columnId = index;
            let deleteButton = <HTMLCollectionOf<Element>>document.getElementsByClassName("btn-outline-danger")
            deleteButton[index].addEventListener('click', (e) => deleteColumn(index));
            let addTaskButton = <HTMLCollectionOf<Element>>document.getElementsByClassName("btn-outline-success");
            addTaskButton[index].addEventListener('click', (e) => addTask(index));
            let columnBody = <HTMLCollectionOf<Element>>document.getElementsByClassName("card-body")
            columnBody[index].addEventListener("dragover", (e) => allowDrop(event))
            columnBody[index].addEventListener("drop", (e) => drop(event));


              html = "";

              element.notes.forEach(function(elem:Task, index:number):void {

                let renderTask = `

                <div class="form-group" style="margin: 10px" id="${elem.id}" draggable="true">
                <textarea class="form-control" id="" rows="3">${elem.title}</textarea>
              </div> `;

                console.log(columnId)
              elem.parentId = columnId;
                addNewHtmlTask(elem.parentId, renderTask);

                let taskForm = document.getElementById(elem.id.toString());
                taskForm!.addEventListener("dragstart", (e) => drag(event));

                renderTask = "";
              });


  });

}
 
 
}

// add column to html
function addNewHtmlColumn(html:string):void {
    let columnSpace:HTMLElement|null = document.getElementById("notes")
    let newDiv:HTMLElement = document.createElement("div");
    newDiv.innerHTML = html;
  
    if(columnSpace) {
    columnSpace.appendChild(newDiv)
    }

  }
  
// add task to html
  function addNewHtmlTask(elementId:number, html:string):void {
    let element:HTMLElement|null = document.getElementById(elementId.toString());
    if(element) {
    let parent:HTMLElement = element.parentElement!.parentElement!
    let newDiv:HTMLElement = document.createElement("div");
    newDiv.innerHTML = html;
  
    parent.appendChild(newDiv);
    }
  }
