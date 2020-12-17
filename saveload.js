function saveGrid(name) {
  let n = prompt("What name should this generator be saved under?")
  if (n) {
    generator.globalScopes = globalScopes;
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
  globalScopes = generator.globalScopes;
  scopeCounter = 0;
  GID("scopes-div-inner").innerHTML = "";
  for (let n = 0; n < globalScopes.length; n++) {
    GID("scopes-div-inner").innerHTML += createScope(scopeCounter);
    fillScopeSelects();
    scopeCounter += 1;
    for (let j = 0; j < scopeCounter; j++) {
      for (let i = 1; i < 5; i++) {
        GID(`add-triggers-scope-id${j}-char${i}`).onclick = function () {
          selectedScope = j;
          selectedChar = i;
          GID("main-page").style.display = "none";
          GID("scope-triggers-box").style.display = "block";
          setScopeTriggersSaveButton(selectedScope, selectedChar);
        }
      }
    }
    let scopeSelects = document.getElementsByClassName("scope-select");
    for (let i = 0; i < scopeSelects.length; i++) {
      scopeSelects[i].onchange = function() {
        setScopes();
      }
    }
  }
  setScopes();
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
