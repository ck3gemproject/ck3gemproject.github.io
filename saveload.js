function saveGrid(name) {
  let n = prompt("What name should this generator be saved under?")
  if (n) {
    localStorage.setItem(n, JSON.stringify(generator));
  }
}

function loadGrid(name) {
  let n = prompt("What generator would you like to load?")
  if (n) {
    let g = JSON.parse(localStorage.getItem(n));
    return g;
  }

}

GID("save-grid-button").onclick = function() {
  saveGrid(eventGrid);
}

GID("load-grid-button").onclick = function() {
  generator = loadGrid()
  clearGrid();
  refreshGrid();
  let t = "";
  for (let i = 0; i < generator.globalGridsArr.length; i++) {
    t += `<option value="${generator.globalGridsArr[i].gridName}">${generator.globalGridsArr[i].gridName}</option>`
  }
  GID("select-grid-options").innerHTML = t;
  GID("select-grid-options").onchange = function() {
    generator.currentGridIndex = GID("select-grid-options").selectedIndex;
    clearGrid();
    refreshGrid();
  }
}
