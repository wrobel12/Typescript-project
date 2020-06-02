import { Task } from "./Task"
import { loadColumns } from "./loadColumnsFromStorage"



// initialization of column, updating local storage of new ones and possibility to delete one

export class Column {
    title:string;
    column:Column|undefined;
    columnList:Array<Column>|undefined;
    notes:Array<Task>;

    constructor(givenTitle:string) {
        this.title = givenTitle;
        this.notes = [];
    }

    createNewColumn():void {

        // create new column object with given title
        this.column = new Column(this.title)

        this.updateLocalStorage()

        let columnSpace:HTMLElement|null = document.getElementById("notes")
        if(columnSpace) {
        columnSpace.innerHTML = ""
        }
        loadColumns()
    }

    updateLocalStorage():void {
      let array: string|null = localStorage.getItem("columns")
      let newListOfColumns
     
      if (array == null) {
        newListOfColumns = this.column
        } else {
          newListOfColumns = JSON.parse(array)
        }
       
       let columsArray:Array<Column> = Array.from(newListOfColumns)
       if(this.column) {
       columsArray.push(this.column)
       }

      localStorage.setItem('columns', JSON.stringify(columsArray))
    }
}

export function deleteColumn(index:number):void {

    let array:string|null = localStorage.getItem("columns")
    let columnObj:Array<string>|null
    if(array) {
    columnObj = JSON.parse(array)
    columnObj!.splice(index, 1)
    }
    localStorage.setItem("columns", JSON.stringify(columnObj!))

    let columnSpace: HTMLElement|null = document.getElementById("notes")
    if(columnSpace) {
    columnSpace.innerHTML = ""
    }
    loadColumns()
  }