//in data die task reinlegen
//ZEIGEN in 2.1 objekt literal 2.2 und 2.3
const data = {todo: [], doing: [], done: []};

/*div erstellt
Funktion, die ein Parameter entgegen nimmt
Funktion erzeugt ein Div mit der Klasse task und dem text aus dem Parameter
*/
function createTaskelement(text) {
  const element = document.createElement('div');
  const deleteButton = document.createElement('button');
  element.className = 'task';
  element.innerText = text;
  element.appendChild(deleteButton);
  deleteButton.innerText = '\u2715';
  //ZEIGEN in 2.1 KLasse
  deleteButton.className = "delete-button";
  deleteButton.addEventListener('click', function () {
    const taskElement = this.parentElement;
    const columnElement = taskElement.parentElement;
    columnElement.removeChild(taskElement);
  });
  return element;
}
/*div verwenden
Das Element mit der Id columntodo im DOM finden
Im Element ein neues Kind hinzufuegen
Das, was die Funktion von oben erstellt, wird als Kind in die Columntodo gehaengt
*/
const todoColumnelement = document.getElementById('column-todo');
//todoColumnelement.appendChild(createTaskelement('waschen'));
/*forschleife benutzen, fuer jedes Item wird aufgefuehrt was in der Klammer ist
bei jedem Durchgang wird in der Variable item der Wert des Strings beschrieben.
 */
/*for(const item of todoColumn.items){
  todoColumnelement.appendChild(createTaskelement(item));
}*/

//button holen + Eventlistener (ein Ereignis was immer zu bestimmten zeitpunkten passiert)
function handleButtonclick(name) {
  return function () {
    const input = document.getElementById('input-' + name);
    if (input.value.trim().length > 0) {
      document.getElementById('column-' + name).appendChild(createTaskelement(input.value));
      data[name].push(input.value)
      input.value = '';
    }
  }
}
//ZEIGEN DOM manipulieren 1.1 und 1.2 nd 1.3
document.getElementById('button-todo').addEventListener('click', handleButtonclick('todo'));
document.getElementById('button-doing').addEventListener('click', handleButtonclick('doing'));
document.getElementById('button-done').addEventListener('click', handleButtonclick('done'));

//downloaden: JSON.stringify(data,null,2)
//googeln: javascript download textfile

function JSONdownload() {
  //Ein JSON array bauen, welches die Tasks drin hat. bei erstem array war: new Array()
  const tasks = [];
  tasks.push(["todo", "doing", "done"]);
  tasks.push([1, "waschen"]);
  tasks.push([2, "kochen"]);
  tasks.push([3, "putzen"]);

  //JSON array in string konvertieren.
  let json = JSON.stringify(tasks);

  /*JSON string in blob konvertieren (blob =
  dateiähnliche Menge unveränderlicher Roh-Daten, die nicht notwendigerweise native JavaScript-Daten enthalten.*/
  json = [json];
  const blob1 = new Blob(json, { type: "text/plain;charset=utf-8" });

  //Check the Browser. vor !! war noch: false ||... was heisst isIE?
  const isIE = !!document.documentMode;
  if (isIE) {
    window.navigator.msSaveBlob(blob1, "kanban.txt");
  } else {
    const url = window.URL || window.webkitURL;
    link = url.createObjectURL(blob1);
    const a = document.createElement("a");
    a.download = "kanban.txt";
    a.href = link;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
}
