let generator = {};
generator.globalGridsArr = [];
generator.gridStack = [];
generator.currentGridIndex = 0;
function createGrid(num, num2) {
  let t = "<table>"
  for (let i = num; i > -1; i--) {
    t += "<tr>"
    for (let j = 0; j < num2; j++) {
      t += `<td class=event-map-cell id=x${j}y${i}></td>`
    }
    t += "</tr>"
  }
  t += "</table>"
  return t;
}

function clearTable() {
  GID("event-map").innerHTML = "";
}

function buildEventGrid(num, num2) {
  let arr = [
  ]
  for (let i = 0; i < num; i++) {
    arr.push([])
    for (let j = 0; j < num2; j++) {
      arr[i].push(
        {
          x: j,
          y: i,
          components: [

          ],
          start: [

          ]
        }
      )
    }
  }
  let gridName
  if (generator.globalGridsArr.length === 0) {
    gridName = "Main";
  } else {
    gridName = "";
  }

  let eventGrid = {
    current: {
      x: 0,
      y: 0,
      cell: 0
    },
    grid: arr,
    start: [],
    gridName: gridName,
  }
  return eventGrid;
}

function setupGrid() {
  let cells = document.getElementsByClassName("event-map-cell");
  for (let i = 0; i < cells.length; i++) {
    let rx = /x(\d+)/
    let ry = /y(\d+)/
    let x = cells[i].id.match(rx)[1];
    let y = cells[i].id.match(ry)[1];
    let m = currentGrid().grid[y][x];
    refreshGrid();
    cells[i].style.background = "white";

    cells[i].onclick = function() {
      refreshGrid();
      /*
      alert(`x: ${m.x} y: ${m.y} type: ${m.type}`)
      */
      cells[currentGrid().current.cell].style.background = "white"
      refreshGrid();
      cells[i].style.background = "#3498db"
      currentGrid().current.cell = i;
      currentGrid().current.x = x;
      currentGrid().current.y = y
      GID("component-creation").innerHTML = fillComponentList();
      makeClickableComponentList();
    }
  }
}

function clearGrid() {
  GID("map").innerHTML = createGrid(18, 100);
  setupGrid();
}

function refreshGrid() {

  let cells = document.getElementsByClassName("event-map-cell");
  for (let i = 0; i < currentGrid().grid.length; i++) {
    for (let j = 0; j < currentGrid().grid[i].length; j++) {
      if (currentGrid().grid[i][j].components.length > 0) {
        let justLoc = true;
        for (let n = 0; n < currentGrid().grid[i][j].components.length; n++) {
          let c = currentGrid().grid[i][j].components[n]
          if (c.tags.length > 0 || c.hasTags.length > 0 || c.doesNotHaveTags.length > 0) {
            GID(`x${j}y${i}`).style.background = "green";
          } else {
            GID(`x${j}y${i}`).style.background = "green";
          }
        }
      }
    }
  }
}

function refillGridSelect() {
  /*
  let t = "";
  t += `<select class=full-select id="select-grid-options">`
  let presets = [];
  t += `<optgroup label="User Defined Grids">`
  for (let i = 0; i < generator.globalGridsArr.length; i++) {
    if (generator.globalGridsArr[i].preset) {
      presets.push(`<option value="${generator.globalGridsArr[i].gridName}">${generator.globalGridsArr[i].gridName}</option>`)
    } else {
      t += `<option value="${generator.globalGridsArr[i].gridName}">${generator.globalGridsArr[i].gridName}</option>`
    }
  }
  t += `</optgroup>`
  if (presets.length > 0) {
    t += `<optgroup label="Preset Grids">`
  }
  for (let i = 0; i < presets.length; i++) {
    t += presets[i];
  }
  if (presets.length > 0) {
    t += `</optgroup>`
  }
  */

  //ABOVE COMMENTED OUT IS SEPARATING OUT PRESETS AND USER DEFINED, BUT BUGGY BECAUSE IT MESSES WITH selected index and array lineup
  let t = "";
  t += `<select class=full-select id="select-grid-options">`
  for (let i = 0; i < generator.globalGridsArr.length; i++) {
    t += `<option value="${generator.globalGridsArr[i].gridName}">${generator.globalGridsArr[i].gridName}</option>`
  }
  t += "</select>"
  GID("select-grid").innerHTML = t;
}


function drawEventMap() {
  GID("event-map").innerHTML = "<div id=select-grid></div>"
  let t = "";
  t += `<select class=full-select id="select-grid-options">`
  for (let i = 0; i < generator.globalGridsArr.length; i++) {
    t += `<option value="${generator.globalGridsArr[i].gridName}">${generator.globalGridsArr[i].gridName}</option>`
  }
  t += "</select>"
  GID("select-grid").innerHTML = t;
  GID("select-grid-options").value = generator.globalGridsArr[generator.currentGridIndex].gridName
  GID("select-grid-options").onchange = function() {
    generator.currentGridIndex = GID("select-grid-options").selectedIndex;
    clearGrid();
    refreshGrid();
  }
  GID("event-map").innerHTML += "<div class='grid-buttons' id='add-grid-button'>Add Grid</div><div class='grid-buttons' id='delete-grid-button'>Delete Grid</div>"
  GID("event-map").innerHTML += `<div id="map">${createGrid(18, 100)}</div>`

  //ADD GRID
  GID("add-grid-button").onclick = function() {

    let gridName = prompt("What would you like to name the grid?")
    if (gridName.length > 0) {
      generator.globalGridsArr.push(buildEventGrid(20, 100))
      generator.globalGridsArr[generator.globalGridsArr.length - 1].gridName = gridName;
      refillGridSelect();
      GID("select-grid-options").value = generator.globalGridsArr[generator.currentGridIndex].gridName
      GID("select-grid").onchange = function() {
        generator.currentGridIndex = GID("select-grid-options").selectedIndex;
        clearGrid();
        refreshGrid();
      }
      setupGrid();
    }
  }
  //DELETE GRID
  GID("delete-grid-button").onclick = function() {
    generator.globalGridsArr.splice(generator.currentGridIndex, 1);
    refillGridSelect();
    GID("select-grid").innerHTML = t;

    setupGrid();
  }
}

function currentGrid() {
  return generator.globalGridsArr[generator.currentGridIndex]
}

generator.globalGridsArr.push(buildEventGrid(20, 100));
drawEventMap();


let eventGrid = generator.globalGridsArr[0];
generator.currentGridIndex = 0;

setupGrid();
