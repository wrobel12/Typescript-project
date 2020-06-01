import { Column } from "./Column";
// initialization of HTML element which be responsible for
// entering new column name and submiting it
export class newColumnManager {
    constructor(givenInputId, givenButtonId) {
        this.inputId = givenInputId;
        this.buttonId = givenButtonId;
        this.input = document.getElementById(this.inputId);
        this.button = document.getElementById(this.buttonId);
        // protection against null value
        if (this.button) {
            this.button.addEventListener('click', (e) => this.addColumn());
            this.button.addEventListener('click', (e) => this.clearArea());
        }
    }
    addColumn() {
        let title = this.input.value;
        this.column = new Column(title);
        this.column.createNewColumn();
    }
    clearArea() {
        this.input.value = "Title";
    }
}
//# sourceMappingURL=newColumnManager.js.map