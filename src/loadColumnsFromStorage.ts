import { Column } from "./Column"
import { Task, addTask } from "./Task"
import { deleteColumn } from "./Column"
import { drag, allowDrop, drop } from "./index"


// get columns from storage and load them on the page

export function loadColumns():void {
    let storage = localStorage.getItem('columns');
    console.log("Po load")
    console.log(storage)
    let listOfColumns;
    if(storage) {
        storage = JSON.parse(storage)
        listOfColumns = Array.from(storage!);
    }
//   let storage:string = JSON.parse(localStorage.getItem('columns'));
  
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

               
            // let deleteButton:HTMLCollectionOf<Element>|null = document.getElementsByClassName("btn-outline-success")
            let deleteButton = <HTMLCollectionOf<Element>>document.getElementsByClassName("btn-outline-danger")
            let addTaskButton = <HTMLCollectionOf<Element>>document.getElementsByClassName("btn-outline-success");
            // protection against null value
            Array.from(deleteButton).forEach(element => {
                element.addEventListener('click', (e) => deleteColumn(index));
            });

            Array.from(addTaskButton).forEach(element => {
                element.addEventListener('click', (e) => addTask(index));
            });

            let columnBody = document.getElementById(index.toString())
            columnBody!.addEventListener("ondragover", (e) => allowDrop)
            columnBody!.addEventListener("ondrop", (e) => drop(event));

            // if(addTaskButton) {
            //     addTaskButton.addEventListener('click', (e) => addTask(index));
            // }

  

              html = "";

              element.notes.forEach(function(elem:Task, index:number):void {

                let renderTask = `

                <div class="form-group" style="margin: 10px" id="${elem.id}" draggable="true">
                <textarea class="form-control" id="" rows="3">${elem.title}</textarea>
              </div> `;

            
                addNewHtmlTask(elem.parentId, renderTask);

                let taskForm = document.getElementById(elem.id.toString());
                taskForm!.addEventListener("dragstart", (e) => drag(event));

                renderTask = "";
              });


  });

}
 
 
}

function addNewHtmlColumn(html:string):void {
    let columnSpace:HTMLElement|null = document.getElementById("notes")
    let newDiv:HTMLElement = document.createElement("div");
    newDiv.innerHTML = html;
  
    if(columnSpace) {
    columnSpace.appendChild(newDiv)
    }

  }
  

  function addNewHtmlTask(elementId:number, html:string):void {
    let element:HTMLElement|null = document.getElementById(elementId.toString());
    if(element) {
    let parent:HTMLElement = element.parentElement!.parentElement!
    let newDiv:HTMLElement = document.createElement("div");
    newDiv.innerHTML = html;
  
    parent.appendChild(newDiv);
    }
  }
