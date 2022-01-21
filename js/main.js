//DOM ist index.html und JS ist Manipulierung davon
const todoColumn = {
  name: 'Todo',
  items: []
};
/*div erstellt
Funktion, die ein Parameter entgegen nimmt
Funktion erzeugt ein Div mit der Klasse task und dem text aus dem Parameter
*/
function createTaskelement (text){
  const element = document.createElement('div');
  const deleteButton = document.createElement('button');
  element.className = 'task';
  element.innerText = text;
  element.appendChild(deleteButton);
  deleteButton.innerText = '\u2715';
  deleteButton.className = "delete-button";
  deleteButton.addEventListener('click',function(){
    const taskElement = this.parentElement;
    const columnElement = taskElement.parentElement;
    columnElement.removeChild(taskElement);
  });
  return element;
}
/*div verwenden
Das Element mit der Id columntodo im DOM finden
Im Element ein neues Kind hinzufuegen
Das, was die Funktion von oben erstellt, wir als Kind in die Columntodo gehaengt
*/
const todoColumnelement = document.getElementById('column-todo');
//todoColumnelement.appendChild(createTaskelement('waschen'));
/*forschleife benutzen, fuer jedes Item wird aufgefuehrt was in der Klammer ist
bei jedem Durchgang wird in der Variable item der Wert des Strings beschrieben.
 */
for(const item of todoColumn.items){
  todoColumnelement.appendChild(createTaskelement(item));
}
//button holen + Eventlistener (ein Ereignis was immer zu bestimmten zeitpunkten passiert)
function handleButtonclick(name){
  return function (){
    const input = document.getElementById('input-' + name);
  if(input.value.trim().length > 0){
    document.getElementById('column-' + name).appendChild(createTaskelement(input.value));
  input.value = '';
  }}
}
document.getElementById('button-todo').addEventListener('click',handleButtonclick('todo'));
document.getElementById('button-doing').addEventListener('click',handleButtonclick('doing'));
document.getElementById('button-done').addEventListener('click',handleButtonclick('done'));
