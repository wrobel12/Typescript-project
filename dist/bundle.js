!function(t){var e={};function n(o){if(e[o])return e[o].exports;var l=e[o]={i:o,l:!1,exports:{}};return t[o].call(l.exports,l,l.exports,n),l.l=!0,l.exports}n.m=t,n.c=e,n.d=function(t,e,o){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:o})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var l in t)n.d(o,l,function(e){return t[e]}.bind(null,l));return o},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=0)}([function(t,e,n){"use strict";n.r(e);class o{constructor(t,e,n){this.title=t,this.parentId=e,this.id=n}}function l(t){console.log("Column id in addTask",t);let e=(new Date).getTime(),n=`\n  \n      <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">\n      <div class="modal-dialog modal-dialog-centered">\n        <div class="modal-content">\n          <div class="modal-header">\n            <h5 class="modal-title" id="exampleModalLabel">This is your fabulous task</h5>\n            <button type="button" class="close" data-dismiss="modal" aria-label="Close">\n              <span aria-hidden="true">&times;</span>\n            </button>\n          </div>\n          <div class="modal-body">\n            <div class="form-group" style="margin: 10px">\n              <textarea class="form-control" id="taskDetails" rows="3"></textarea>\n            </div>\n          </div>\n          <div class="modal-footer">\n            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>\n            <button type="button" class="btn btn-primary" id="${e}" data-dismiss="modal">Save changes</button>\n          </div>\n        </div>\n      </div>\n    </div> `,l=document.getElementById(t.toString());if(l){let i=l.parentElement.parentElement,d=document.createElement("div");d.innerHTML=n,i.appendChild(d),console.log("Column id submitTaskButton",t);let s=document.getElementById(e.toString());s&&s.addEventListener("click",e=>function(t){console.log("ParentId of task",t);let e,n=document.getElementById("taskDetails").value,l=(new Date).getTime(),i=new o(n,t,l),d=localStorage.getItem("columns");d&&(e=JSON.parse(d),e[t].notes.push(i),localStorage.setItem("columns",JSON.stringify(e)));document.getElementById("taskDetails").value="";let s=document.getElementById("notes");s&&(s.innerHTML="");a()}(t))}}function a(){let t=JSON.parse(localStorage.getItem("columns")||"{}"),e=0,n="";null!==t&&t.forEach((function(t,i){n+=`\n              <div class="card border-primary mb-3" style="max-width: 18rem; height: 600px;" id="newNote">\n              <div class="card-header">\n              <button type="button" class="btn btn-outline-success" id="${i}" data-toggle="modal" data-target="#exampleModal">+</button>\n              <button type="button" class="btn btn-outline-danger" id="${i}">X</button>\n              <h5 class="card-title" id="noteTitle">${t.title}</h5>\n              </div>\n              <div class="card-body text-primary" id="${i}">\n              </div>\n              </div> `,function(t){let e=document.getElementById("notes"),n=document.createElement("div");n.innerHTML=t,e&&e.appendChild(n)}(n),e=i,document.getElementsByClassName("btn-outline-danger")[i].addEventListener("click",t=>function(t){let e,n=localStorage.getItem("columns");n&&(e=JSON.parse(n),e.splice(t,1));localStorage.setItem("columns",JSON.stringify(e));let o=document.getElementById("notes");o&&(o.innerHTML="");a()}(i)),document.getElementsByClassName("btn-outline-success")[i].addEventListener("click",t=>l(i));let d=document.getElementsByClassName("card-body");d[i].addEventListener("dragover",t=>{return e=event,console.log("Allow"),void e.preventDefault();var e}),d[i].addEventListener("drop",t=>function(t){t.preventDefault();var e=t.dataTransfer.getData("id");t.target.appendChild(document.getElementById(e));let n="",l=localStorage.getItem("columns");if(l){let a=JSON.parse(l);a.forEach(t=>{t.notes.forEach(o=>{console.log("Element",o),o.id==e&&(n=o.title,t.notes=t.notes.filter(t=>t.title!=n))})});let i=new o(n,t.target.id,e);a[t.target.id].notes.push(i),localStorage.setItem("columns",JSON.stringify(a))}let i=document.getElementById("notes");i&&(i.innerHTML=""),a()}(event)),n="",t.notes.forEach((function(t,n){let o=`\n\n                <div class="form-group" style="margin: 10px" id="${t.id}" draggable="true">\n                <textarea class="form-control" id="" rows="3">${t.title}</textarea>\n              </div> `;console.log(e),t.parentId=e,function(t,e){let n=document.getElementById(t.toString());if(n){let t=n.parentElement.parentElement,o=document.createElement("div");o.innerHTML=e,t.appendChild(o)}}(t.parentId,o),document.getElementById(t.id.toString()).addEventListener("dragstart",t=>{var e;(e=event).dataTransfer.setData("id",e.target.id)}),o=""}))}))}class i{constructor(t){this.title=t,this.notes=[]}createNewColumn(){this.column=new i(this.title),this.updateLocalStorage();let t=document.getElementById("notes");t&&(t.innerHTML=""),a()}updateLocalStorage(){let t,e=localStorage.getItem("columns");t=null==e?this.column:JSON.parse(e);let n=Array.from(t);this.column&&n.push(this.column),localStorage.setItem("columns",JSON.stringify(n))}}window.onload=function(){a()};new class{constructor(t,e){this.inputId=t,this.buttonId=e,this.input=document.getElementById(this.inputId),this.button=document.getElementById(this.buttonId),this.button&&(this.button.addEventListener("click",t=>this.addColumn()),this.button.addEventListener("click",t=>this.clearArea()))}addColumn(){let t=this.input.value;this.column=new i(t),this.column.createNewColumn()}clearArea(){this.input.value="Title"}}("createNewColumnInput","createNewColumnButton")}]);