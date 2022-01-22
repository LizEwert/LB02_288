//data die alles beinhält
//ZEIGEN in 2.1 objekt literal 2.2 und 2.3 hier wird es angelegt für das programm, noch leer, in zeile 41 gefüllt.
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
  deleteButton.className = "delete-button";
  deleteButton.addEventListener('click', function () {
    const taskElement = this.parentElement;
    const columnElement = taskElement.parentElement;
    columnElement.removeChild(taskElement);
    //holt den namen von dem was ich loeschen will und die ersten 7 zeichen werden verworfen. neu hinzugefuegte sachen die geloescht wurden tauchen nicht im JSON auf.
    const columnName = columnElement.id.substring(7);
    const deleteIndex = data[columnName].indexOf(text);
    //2.1 da wird das object literal vom anfang geloescht.
    delete data[columnName][deleteIndex];
  });
  return element;
}
/*
Der + button wird mit der function handlebuttonclick angefragt. Hier haben wir eine function in einer function. Der input von dem Balken, wo wir etwas reinschreiben
wird mit getelementbyid angefragt. davor gibt es noch eine konstante input, die wir später nutzen. Nun weil die inputfelder im html alle gleich anfangen,
kann ich sie mit input- in einem string und name alle gleichzeitig anfragen.
Ich schliesse noch ein if an, weil ich nicht möchte dass ein task feld kreirt wird wenn nichts reingeschrieben wurde, also muss die length grösse als 0 sein.
Das trim ist dafür da, dass nicht nur leerzeichen eingefügt werden können.
Anschliessend wird in der column, welche ich auch mit getelementbyid anfrage, ein child (taskelement) mit seinem input value, dem wir bedingungen gegeben haben, angefügt.
 */
//ZEIGEN DOM manipulieren 1.1 und 1.2 nd 1.3 element wird gesucht, element gepullt und mit appendchild wird es manipuliert, funktionsweise (wenn ich auf den button drück)
// im elements zeigen, am besten etwas hinzufügen dann sieht man es im DOM tree.
function handleButtonclick(name) {
  return function () {
    const input = document.getElementById('input-' + name);
    if (input.value.trim().length > 0) {
      document.getElementById('column-' + name).appendChild(createTaskelement(input.value));
      data[name].push(input.value) // 2.1 hier wird das ins object literal hinzugefügt
      console.log(data); // 2.2. + 2.3 in der console zeigen, und etwas hinzuf[gen, da is das objekt und der hinzugefuegte task.
      input.value = '';
    }
  }
}

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
  /*JSON string in blob konvertieren (blob =
  dateiähnliche Menge unveränderlicher Roh-Daten, die nicht notwendigerweise native JavaScript-Daten enthalten.*/
  //3.1 weil meine daten als js objekt abgelegt werden, koennen diese eins zu eins im download bereit gestellt werden.
  //aus meinen data objekt wird ein blob erstellt um es dem nutzer als download ojekt zur verfuegung zu stellen. (stringify ist dazu da, dass es ein JSON wird, null, 2 formatiert es schoener)
  //3.2 auf den download button druecken damit etwas passiert, console aufmachen fuer keine fehler.
  const blob1 = new Blob([JSON.stringify(data,null,2)], { type: "text/plain;charset=utf-8" });
  //Check the Browser. isIE ist speziell für Internet Explorer
  const isIE = !!document.documentMode;
  if (isIE) {
    window.navigator.msSaveBlob(blob1, "kanban.json");
  } else {
    const url = window.URL || window.webkitURL;
    link = url.createObjectURL(blob1);
    const a = document.createElement("a");
    a.download = "kanban.json";
    a.href = link;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
}
document.getElementById('download-button').addEventListener('click', JSONdownload);
