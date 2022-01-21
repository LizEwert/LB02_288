//in data die task reinlegen??? was macht das eigentlich
//ZEIGEN in 2.1 objekt literal 2.2 und 2.3
const data = {todo: [], doing: [], done: []};
/*
Hier wird ein div (task) und ein Button (löschknopf) erstellt.
SIDEINFO: Ich kreire ein div, welches man im html nicht  sieht. Dieses div dient dazu die Tasks, die eine klasse haben (also die weissen boxen) zu manipulieren.
Es ist eine function, die ein taskelement erstellt mit text drin, und einen Parameter entgegen nimmt.
SIDEINFO: Der delete button wird als kind an den task(parent) rangehängt. Mit einem Eventlistener wird das kindelement per 'click' aus dem parent(column) vom parent(task) gelöscht.
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
/*
Hier wird das div effektiv verwendet
Das Element mit der Id columntodo wird im DOM gefunden
*/
const todoColumnelement = document.getElementById('column-todo');
/*
Der + button wird mit der function handlebuttonclick angefragt. Hier haben wir eine function in einer function. Der input von dem Balken, wo wir etwas reinschreiben
wird mit getelementbyid angefragt. davor gibt es noch eine konstante input, die wir später nutzen. Nun weil die inputfelder im html alle gleich anfangen,
kann ich sie mit input- in einem string und name alle gleichzeitig anfragen.
Ich schliesse noch ein if an, weil ich nicht möchte dass ein task feld kreirt wird wenn nichts reingeschrieben wurde, also muss die length grösse als 0 sein.
Das trim ist dafür da, dass nicht nur leerzeichen eingefügt werden können.
Anschliessend wird in der column, welche ich auch mit getelementbyid anfrage, ein child (taskelement) mit seinem input value, dem wir bedingungen gegeben haben, angefügt.
 */
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
/*
Mit dem Eventlistener machen wir wieder das selbe wie vorhin. Das spezifische event also 'click' und 'handleclickbutton' passieren gliechzeitig, wenn man clickt passiert das,
was in handleclick steht. Die buttons aus den 3 spalten werden wieder angefragt damit das event ausgeführt werden kann.
 */
document.getElementById('button-todo').addEventListener('click', handleButtonclick('todo'));
document.getElementById('button-doing').addEventListener('click', handleButtonclick('doing'));
document.getElementById('button-done').addEventListener('click', handleButtonclick('done'));
//downloaden: JSON.stringify(data,null,2) check ich nicht
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
