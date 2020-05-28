  // load columns and notes from storage at the beginning

  window.onload = function(): void {
    loadColumns();
  };
  
  
  // manage interaction from user for creating new column
  
  class newColumnManager {
    inputId:string;
    buttonId:string;
    column:Column;
    input:HTMLInputElement;
    button:HTMLElement;
  
    constructor(givenInputId:string, givenButtonId:string) {
      this.inputId = givenInputId;
      this.buttonId = givenButtonId;


      this.input = (<HTMLInputElement>document.getElementById(this.inputId));

      
      this.button = document.getElementById(this.buttonId);
      this.button.addEventListener('click', (e) => this.addColumn())
      this.button.addEventListener('click', (e) => this.clearArea());


  }

  addColumn(): void {
    let title:string = this.input.value;
    this.column = new Column(title)
    this.column.createNewColumn()
}

   clearArea(): void {
     this.input.value = "Title"
}

  }


// get columns from storage and load then on the page

function loadColumns() :void {
  let listOfColumns = JSON.parse(localStorage.getItem('columns'));
  let html: string = "";
        
        if (listOfColumns !== null) {
        
          listOfColumns.forEach(function(element, index:number): void {
        

              html += `
              <div class="card border-primary mb-3" style="max-width: 18rem; height: 600px;" id="newNote">
              <div class="card-header">
              <button type="button" class="btn btn-outline-success" id="${index}" onclick="addTask(this.id)" data-toggle="modal" data-target="#exampleModal">+</button>
              <button type="button" class="btn btn-outline-danger" id="${index}" onclick="deleteColumn(this.id)">X</button>
              <h5 class="card-title" id="noteTitle">${element.title}</h5>
              </div>
              <div class="card-body text-primary" ondrop="drop(event)" ondragover="allowDrop(event)" id="${index}">
              </div>
              </div> `;

              
                  
              let columnSpace:HTMLElement = document.getElementById("notes")
              let newDiv:HTMLElement = document.createElement("div");
              newDiv.innerHTML = html;
            
              columnSpace.appendChild(newDiv)

              html = "";

              element.notes.forEach(function(elem, index:number):void {

                let renderTask = `

                <div class="form-group" style="margin: 10px" id="${elem.id}" draggable="true" ondragstart="drag(event, this.title)">
                <textarea class="form-control" id="" rows="3">${elem.title}</textarea>
              </div> `;
            
            
                let element:HTMLElement = document.getElementById(elem.parentId);
                let parent:HTMLElement = element.parentElement.parentElement
                let newDiv:HTMLElement = document.createElement("div");
                newDiv.innerHTML = renderTask;
              
                parent.appendChild(newDiv);

                renderTask = "";
              });


  });

}
 
 
}

class Note {
  title:string
  id:number
  parentId:number

  constructor(givenValue:string, givenIndex:number, givenId) {
    this.title = givenValue;
    this.parentId = givenIndex;
    this.id = givenId;
}
}


class Column {
    title:string;
    column:Column;
    columnList:Array<Column>;
    notes:Array<Note>;

    constructor(givenTitle:string) {
        this.title = givenTitle;
        this.notes = [];
    }

    createNewColumn(): void {

        // create new column object with given title
        this.column = new Column(this.title)

        // get columns from storage
        let array: string = localStorage.getItem("columns");

        let newListOfColumns;
       
        if (array == null) {
          newListOfColumns = this.column;
          } else {
            newListOfColumns = JSON.parse(array);
          }

         
         let columsArray:Array<Column> = Array.from(newListOfColumns);
         columsArray.push(this.column)


        localStorage.setItem('columns', JSON.stringify(columsArray))

        let columnSpace:HTMLElement = document.getElementById("notes")
        columnSpace.innerHTML = "";

        loadColumns();
      
    }


}

// delete whole column (wth all tasks)

  function deleteColumn(index:number):void {
      
    let array:string = localStorage.getItem("columns");
    let columnObj:Array<string> = JSON.parse(array);
    columnObj.splice(index, 1);
    localStorage.setItem("columns", JSON.stringify(columnObj));

    let columnSpace: HTMLElement = document.getElementById("notes")
    columnSpace.innerHTML = "";

    loadColumns();


  }


  // create new task
  
  function addTask(index:string):void {

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
          <button type="button" class="btn btn-primary" id="newTask" data-dismiss="modal" onclick="getTaskInformation(${index})">Save changes</button>
        </div>
      </div>
    </div>
  </div> `;


let modalElement:HTMLElement = document.getElementById(index);
let parent:HTMLElement = modalElement.parentElement.parentElement.parentElement;
let div:HTMLElement = document.createElement("div");

div.innerHTML = modal;
parent.appendChild(div);
      
  }


  function getTaskInformation(index) {
    
    let taskDetails:string = (<HTMLTextAreaElement>document.getElementById('taskDetails')).value;
    let newNoteId:number = new Date().getTime();
    let note = new Note(taskDetails, index, newNoteId);
    let array: string = localStorage.getItem("columns");
    let newListOfColumns = JSON.parse(array)
    
    newListOfColumns[index].notes.push(note);
    localStorage.setItem('columns', JSON.stringify(newListOfColumns))

    console.log("taskDetails", taskDetails);
    console.log("note title", note.title)

    let html:string = `

    <div class="form-group" style="margin: 10px" id="${newNoteId}" draggable="true" ondragstart="drag(event)">
    <textarea class="form-control" id="" rows="3">${taskDetails}</textarea>
    </div> `;


    let task:HTMLElement = document.getElementById(index);
    let parent:HTMLElement = task.parentElement.parentElement
    let newDiv:HTMLElement = document.createElement("div");
    newDiv.innerHTML = html;
  
    parent.appendChild(newDiv);

    (<HTMLTextAreaElement>document.getElementById('taskDetails')).value = "";
  }

  function allowDrop(ev):void {
    ev.preventDefault();
  }

  function drag(ev):void {
    ev.dataTransfer.setData("id", ev.target.id);
    // ev.dataTransfer.setData("parentId", ev.target.parentId);

    let task:HTMLElement = document.getElementById(ev.target.id);
    let parent:HTMLElement = task.parentElement.parentElement
    console.log("Parent:", parent)
    console.log("ParenitId:", parent.id)
  }

  function drop(ev):void {
    ev.preventDefault();
    var elementId = ev.dataTransfer.getData("id");
    ev.target.appendChild(document.getElementById(elementId));

    console.log(ev.target.id)

    // let note = new Note(title, ev.target.id, data);


    let array:string = localStorage.getItem("columns");

    let newListOfColumns = JSON.parse(array)

    let column:Column= newListOfColumns[ev.target.id]


    column.notes.map((element) => {
      if (element.id == elementId) {
        element.parentId = ev.target.id
      }
      console.log("Element from store after change", element);
      return element
    })

      localStorage.setItem('columns', JSON.stringify(newListOfColumns))

  //  newListOfColumns[ev.target.id].notes.push(note);

  //  console.log(newListOfColumns[ev.target.id]);
  //  console.log(data);

 

  //  loadColumns();

  }
















  

