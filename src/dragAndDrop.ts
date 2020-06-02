  
  import { Task } from "./Task"
  import { loadColumns } from "./loadColumnsFromStorage"
  import { Column } from "./Column"
  
 
  export function allowDrop(ev):void {
    ev.preventDefault()
  }

  export function drag(ev):void {
    ev.dataTransfer.setData("id", ev.target.id)
  }

  export function drop(ev):void {
    ev.preventDefault()
    let elementId:number = ev.dataTransfer.getData("id")
    ev.target.appendChild(document.getElementById(elementId.toString()))

    let title:string = ""

    let array:string|null = localStorage.getItem("columns")
    if(array) {
    let newListOfColumns:Array<Column>|null = JSON.parse(array)

    newListOfColumns!.forEach(elem => {      
      elem.notes.forEach((element) => {
        if (element.id == elementId) {         
          title = element.title
          elem.notes = elem.notes.filter(element => element.title != title)
        }       
      })    
    });

    let task:Task = new Task(title, ev.target.id, elementId)
    newListOfColumns![ev.target.id].notes.push(task)
    localStorage.setItem('columns', JSON.stringify(newListOfColumns))
  }

    let columnSpace:HTMLElement|null = document.getElementById("notes")
    if(columnSpace) {
    columnSpace.innerHTML = ""
    }
    loadColumns()
  }
















  

