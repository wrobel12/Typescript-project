!function(e){var t={};function n(o){if(t[o])return t[o].exports;var l=t[o]={i:o,l:!1,exports:{}};return e[o].call(l.exports,l,l.exports,n),l.l=!0,l.exports}n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var l in e)n.d(o,l,function(t){return e[t]}.bind(null,l));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){"use strict";n.r(t);class o{constructor(e,t,n){this.title=e,this.parentId=t,this.id=n}}function l(e){let t=document.getElementById(e.toString());if(t){let n=t.parentElement.parentElement,l=document.createElement("div");l.innerHTML='\n  \n      <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">\n      <div class="modal-dialog modal-dialog-centered">\n        <div class="modal-content">\n          <div class="modal-header">\n            <h5 class="modal-title" id="exampleModalLabel">This is your fabulous task</h5>\n            <button type="button" class="close" data-dismiss="modal" aria-label="Close">\n              <span aria-hidden="true">&times;</span>\n            </button>\n          </div>\n          <div class="modal-body">\n            <div class="form-group" style="margin: 10px">\n              <textarea class="form-control" id="taskDetails" rows="3"></textarea>\n            </div>\n          </div>\n          <div class="modal-footer">\n            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>\n            <button type="button" class="btn btn-primary" id="newTask" data-dismiss="modal">Save changes</button>\n          </div>\n        </div>\n      </div>\n    </div> ',n.appendChild(l);let a=document.getElementById("newTask");console.log("submit",a),a&&a.addEventListener("click",t=>function(e){let t=document.getElementById("taskDetails").value,n=(new Date).getTime(),l=new o(t,e,n);console.log(l);let a,r=localStorage.getItem("columns");r&&(a=JSON.parse(r),a[e].notes.push(l),localStorage.setItem("columns",JSON.stringify(a)));let i=`\n  \n      <div class="form-group" style="margin: 10px" id="${n}" draggable="true" ondragstart="drag(event)">\n      <textarea class="form-control" id="" rows="3">${t}</textarea>\n      </div> `,s=document.getElementById(e);if(s){let e=s.parentElement.parentElement,t=document.createElement("div");t.innerHTML=i,e.appendChild(t)}document.getElementById("taskDetails").value=""}(e))}}function a(){let e,t=localStorage.getItem("columns");console.log("Po load"),console.log(t),t&&(t=JSON.parse(t),e=Array.from(t));let n="";null!==e&&e.forEach((function(e,t){n+=`\n              <div class="card border-primary mb-3" style="max-width: 18rem; height: 600px;" id="newNote">\n              <div class="card-header">\n              <button type="button" class="btn btn-outline-success" id="${t}" data-toggle="modal" data-target="#exampleModal">+</button>\n              <button type="button" class="btn btn-outline-danger" id="${t}">X</button>\n              <h5 class="card-title" id="noteTitle">${e.title}</h5>\n              </div>\n              <div class="card-body text-primary" ondrop="drop(event)" ondragover="allowDrop(event)" id="${t}">\n              </div>\n              </div> `,function(e){let t=document.getElementById("notes"),n=document.createElement("div");n.innerHTML=e,t&&t.appendChild(n)}(n);let o=document.getElementsByClassName("btn-outline-danger"),r=document.getElementsByClassName("btn-outline-success");Array.from(o).forEach(e=>{e.addEventListener("click",e=>function(e){console.log("deeletee");let t,n=localStorage.getItem("columns");n&&(t=JSON.parse(n),t.splice(e,1));localStorage.setItem("columns",JSON.stringify(t));let o=document.getElementById("notes");o&&(o.innerHTML="");a()}(t))}),Array.from(r).forEach(e=>{e.addEventListener("click",e=>l(t))}),console.log(o),n="",e.notes.forEach((function(e,t){let n=`\n\n                <div class="form-group" style="margin: 10px" id="${e.id}" draggable="true" ondragstart="drag(event)">\n                <textarea class="form-control" id="" rows="3">${e.title}</textarea>\n              </div> `;!function(e,t){let n=document.getElementById(e.toString());if(n){let e=n.parentElement.parentElement,o=document.createElement("div");o.innerHTML=t,e.appendChild(o)}}(e.parentId,n),n=""}))}))}class r{constructor(e){this.title=e,this.notes=[]}createNewColumn(){this.column=new r(this.title),this.updateLocalStorage();let e=document.getElementById("notes");e&&(e.innerHTML=""),a()}updateLocalStorage(){let e,t=localStorage.getItem("columns");console.log(t),e=null==t?this.column:JSON.parse(t);let n=Array.from(e);this.column&&n.push(this.column),console.log("Nowa kolumna",this.column),localStorage.setItem("columns",JSON.stringify(n));let o=localStorage.getItem("columns");console.log("Nowy storage",o)}}window.onload=function(){a()};new class{constructor(e,t){this.inputId=e,this.buttonId=t,this.input=document.getElementById(this.inputId),this.button=document.getElementById(this.buttonId),this.button&&(this.button.addEventListener("click",e=>this.addColumn()),this.button.addEventListener("click",e=>this.clearArea()))}addColumn(){let e=this.input.value;this.column=new r(e),this.column.createNewColumn()}clearArea(){this.input.value="Title"}}("createNewColumnInput","createNewColumnButton")}]);