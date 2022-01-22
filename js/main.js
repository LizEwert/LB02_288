//data die alles beinhält 2.1, 2.2, 2.3
const data = {todo: [], doing: [], done: []};
/*
Hier wird ein div (task) und ein Button (löschknopf) erstellt.
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
    const columnName = columnElement.id.substring(7);
    const deleteIndex = data[columnName].indexOf(text);
    //2.1
    delete data[columnName][deleteIndex];
  });
  return element;
}
//1.1 und 1.2 und 1.3
function handleButtonclick(name) {
  return function () {
    const input = document.getElementById('input-' + name);
    if (input.value.trim().length > 0) {
      document.getElementById('column-' + name).appendChild(createTaskelement(input.value));
      data[name].push(input.value) // 2.1
      console.log(data); // 2.2. + 2.3
      input.value = '';
    }
  }
}
document.getElementById('button-todo').addEventListener('click', handleButtonclick('todo'));
document.getElementById('button-doing').addEventListener('click', handleButtonclick('doing'));
document.getElementById('button-done').addEventListener('click', handleButtonclick('done'));
function JSONdownload() {
  //3.1 , 3.2, 3.3
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
