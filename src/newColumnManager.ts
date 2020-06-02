import { Column } from "./Column"


// initialization of HTML element which be responsible for
// entering new column name and submiting it

export class newColumnManager {
    inputId:string;
    buttonId:string;
    column:Column|undefined;
    input:HTMLInputElement;
    button:HTMLElement|null;
  
    constructor(givenInputId:string, givenButtonId:string) {
      
      this.inputId = givenInputId;
      this.buttonId = givenButtonId;
      this.input = (<HTMLInputElement>document.getElementById(this.inputId));

      
      this.button = document.getElementById(this.buttonId);
      // protection against null value
      if(this.button) {
      this.button.addEventListener('click', (e) => this.addColumn())
      this.button.addEventListener('click', (e) => this.clearArea());
      
      }


  }
  // submit and create new column
  addColumn():void {
    let title:string = this.input.value;
    this.column = new Column(title)
    this.column.createNewColumn()
}
// clean input value
   clearArea():void {
     this.input.value = "Title"
}

  }

