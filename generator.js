let workingEventArr = [];
let newEventArr = [];
let buildWorld = false;
let globalFileList = [];

let globalVariables = [];
console.log("REMEMBER - SPLITTING ON @ NOW. Update documentation.")

function runGenerationMachine(num) {
  let namespace = GID("namespace-entry").value;
  workingEventArr = [];

  if (buildWorld === true) {

  } else {
    for (let i = 0; i < num; i++) {
      workingEventArr.push(generate());
    }
    for (let i = 0; i < workingEventArr.length; i++) {
      let currentEvent = workingEventArr[i];
      //makeEventLocalization(currentEvent)
      if (eventCodeArr.length === 0) {
        eventCodeArr.push(`${p(0)}namespace = ${namespace}${ep()}${ep()}`)
      }
      makeEventCode(currentEvent);
      eventsList.push(currentEvent);
    }

    for (let i = 0; i < globalOnActionArray.length; i++) {
      console.log(globalOnActionArray[i])
      let vArr = globalOnActionArray[i].varObjArr;
      let coords = [globalOnActionArray[i].x, globalOnActionArray[i].y]
      console.log(coords);
      for (let z = 0; z < 100; z++) {
        let nextE = generate(coords, vArr);
        makeEventCode(nextE);
        eventsList.push(nextE);
        globalOnActionArray[i].eventList.push(creationCounter);
      }
    }
    console.log(globalOnActionArray)
  }
  console.log(globalFileList);
}

function getGridByName(name) {
  for (let i = 0; i < generator.globalGridsArr.length; i++) {
    if (generator.globalGridsArr[i].gridName === name) {
      return generator.globalGridsArr[i]
    }
  }
}

function getRandomSubgridStart(gridObject) {

    let n = gridObject.start.length - 1;
    return gridObject.start[getRandomInt(0, n)]
}

function generateSubgrid(gridObject, e) {
  generator.currentGridIndex = GID("select-grid-options").selectedIndex;
  let start = getRandomSubgridStart(gridObject)
  if (start) {
    let y = parseInt(start[1]);
    let x = parseInt(start[0]);
    let currentCell = gridObject.grid[y][x];
    let currentX = x;
    let currentY = y;
    let timeoutPreventer = 0;
    let loop = true
    while (loop === true) {
      let currentComponent = {};
      let loc = "";

      if (currentCell && currentCell.components && currentCell.components.length > 0) {
        //push all localization for localization cell or single loc for branching cell

        if (isLocalizationCell(currentCell)) {
          loc = getAllComponentLocs(currentCell, e);
          currentComponent = getComponentFrom(currentCell); //had to change where you could set travel for just first because it was screwing up on_actions
        } else {
          currentComponent = getComponentFrom(currentCell);
          loc = getLocFromComponent(currentComponent, e)
        }


        //check has tags
        if (eventHasRequiredTags(currentComponent, e) === true  && eventDoesNotHaveTags(currentComponent, e) === true && variableCheck(currentComponent, e) === true) {
          timeoutPreventer = 0;
          addComponentToEvent(loc, currentComponent, e, currentCell, gridObject.gridName)
          removeSetTags(currentComponent, e);

          //MOVE ON
          let neighbors = getNeighbors(currentCell, gridObject);
          let allowableNeighbors = getAllowableNeighbors(neighbors, currentComponent)
          let travelProbabilities = getTravelProbabilities(neighbors, currentComponent)
          let travelCounter = 0;
          for (let i = 0; i < travelProbabilities.length; i++) {
            travelProbabilities[i].min = travelCounter;
            travelProbabilities[i].max = travelCounter + parseInt(travelProbabilities[i].probability);
            travelCounter += parseInt(travelProbabilities[i].probability);
          }
          let randCell = getRandomInt(0, travelCounter);
          let canTravel = false;
          for (let i = 0; i < travelProbabilities.length; i++) {
            if (randCell >= travelProbabilities[i].min && randCell <= travelProbabilities[i].max) {
              currentCell = getCell(travelProbabilities[i].travel, neighbors)
              canTravel = true;
            }
          }

          if (currentComponent.runGrid && currentComponent.runGrid !== "") {

            let g = generateSubgrid(getGridByName(currentComponent.runGrid), e);
          }
          if (canTravel === false) {
              loop = false
          }

        } else {
          timeoutPreventer += 1;
        }
      } else {
        loop = false
      }

      if (timeoutPreventer === 100) {
        loop = false
      }

      if (loop === false) {
        finalCell = currentCell;
      }

    }
  }
}

function isNumeric(str) {
  if (typeof str != "string") return false // we only process strings!
  return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
         !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
}

function doMath(num1, operator, num2) {
  if (operator === "=") {
    return num2;
  } else {
    if (isNumeric(num1) && isNumeric(num2)) {
      num1 = parseInt(num1);
      num2 = parseInt(num2);
    }
    if (operator === "+=") {
      return num1 + num2;
    } else if (operator === "-=") {
      return num1 - num2;
    } else if (operator === "=") {
      return num2;
    }
  }
}

function compare(v, o, nv) {
  v = `${v}`;
  nv = `${nv}`
  if (v.match(/\d+/) || nv.match(/\d+/)) {
    v = parseInt(v);
    nv = parseInt(nv);
  }
  if (o === "===") {
    if (v === nv) {
      return true;
    } else {
      return false;
    }
  }
  if (o === ">") {
    if (v > nv) {
      return true
    } else {
      return false;
    }
  }
  if (o === ">=") {
    if (v >= nv) {
      return true
    } else {
      return false;
    }
  }
  if (o === "<") {
    if (v < nv) {
      return true;
    } else {
      return false
    }
  }
  if (o === "<=") {
    if (v <= nv) {
      return true;
    } else {
      return false;
    }
  }

  if (o === "!==") {
    if (v !== nv) {
      return true;
    } else {
      return false;
    }
  }
}

function variableCheck(c, e) {
  let equalityChecks = true;
  let workingArr = [];
  for (let i = 0; i < c.varObjArr.length; i++) {
    let name = c.varObjArr[i].name
    name = replaceVariable(e, name);
    name = replaceFunction(e, name);
    let op = c.varObjArr[i].operation;
    let value = c.varObjArr[i].value;
    value = replaceVariable(e, value);
    value = replaceFunction(e, value)
    let exists = false;
    if (e.varObjArr.length === 0 && (op === "===" || op === "<" || op === ">" || op === ">=" || op === "<=")) {
      //can't compare if doesn't exist
      equalityChecks = false;
    } else if (e.varObjArr.length === 0 && op === "!==") {
      equalityChecks = true;
    } else if (e.varObjArr.length === 0 && (op === "+=" || op === "-=")) {
      let newValue = doMath(0, op, value);
      let o = {};
      o.name = name;
      o.value = newValue;
      e.varObjArr.push(o);
      exists = true;
    } else {
      for (let j = 0; j < e.varObjArr.length; j++) {
        let eName = e.varObjArr[j].name;
        if (eName === name) {
          exists = true;
          if (op === "===" || op === "<" || op === ">" || op === ">=" || op === "<=" || op === "!==") {
            console.log(e.varObjArr);
            equalityChecks = compare(e.varObjArr[j].value, op, value)
          } else {
            let newValue = doMath(e.varObjArr[j].value, op, value);
            e.varObjArr[j].value = newValue;
          }
        }
      }
      if (exists === false) {
        if (op === "===" || op === "<" || op === ">" || op === ">=" || op === "<=") {
          equalityChecks = false;
        } else if (op === "!==") {
          equalityChecks = true;
        } else {
          let newValue = doMath(0, op, value);
          let o = {};
          o.name = name;
          o.value = newValue;
          e.varObjArr.push(o)
        }
      }
    }
  }
  return equalityChecks;
}

function generate(input, varArr) {
  console.log(currentGrid().gridName);
  let e = {};
  let start = input || getRandomStart();
  if (start) {
    let y = parseInt(start[1]);
    let x = parseInt(start[0]);
    let loop = true;
    let finalCell = {};
     //the e object is what steps through the generator and accumulates
    e.scopes = [];
    e.loc = [];
    e.immediateEffects = [];
    e.options = [];
    e.afterEffects = [];
    e.afterEffects = [];
    e.triggers = [];
    e.tags = [];
    e.doesNotHaveTags = [];
    e.runStack = []
    e.variables = [];
    if (varArr) {
      e.varObjArr = varArr;
    } else {
      e.varObjArr = globalVariables;
    }

    e.factor = 100;
    let currentCell = currentGrid().grid[y][x];
    generator.currentX = x;
    generator.currentY = y;
    let timeoutPreventer = 0;
    while (loop === true) {
      let currentComponent = {};
      let loc = "";

      if (currentCell && currentCell.components && currentCell.components.length > 0) {
        //push all localization for localization cell or single loc for branching cell

        if (isLocalizationCell(currentCell)) {
          loc = getAllComponentLocs(currentCell, e);
          currentComponent = getComponentFrom(currentCell); //had to change where you could set travel for just first because it was screwing up on_actions
        } else {
          currentComponent = getComponentFrom(currentCell);
          loc = getLocFromComponent(currentComponent, e)
        }


        //check has tags
        if (eventHasRequiredTags(currentComponent, e) === true  && eventDoesNotHaveTags(currentComponent, e) === true && variableCheck(currentComponent, e) === true) {
          timeoutPreventer = 0;
          addComponentToEvent(loc, currentComponent, e, currentCell, currentGrid().gridName)
          removeSetTags(currentComponent, e);

          //MOVE ON
          let cg = currentGrid();
          let neighbors = getNeighbors(currentCell, cg);
          let allowableNeighbors = getAllowableNeighbors(neighbors, currentComponent)
          let travelProbabilities = getTravelProbabilities(neighbors, currentComponent)
          let travelCounter = 0;
          for (let i = 0; i < travelProbabilities.length; i++) {
            travelProbabilities[i].min = travelCounter;
            travelProbabilities[i].max = travelCounter + parseInt(travelProbabilities[i].probability);
            travelCounter += parseInt(travelProbabilities[i].probability);
          }
          let randCell = getRandomInt(0, travelCounter);
          let canTravel = false;
          for (let i = 0; i < travelProbabilities.length; i++) {
            if (randCell >= travelProbabilities[i].min && randCell <= travelProbabilities[i].max) {
              currentCell = getCell(travelProbabilities[i].travel, neighbors)
              canTravel = true;
            }
          }

          if (currentComponent.runGrid && currentComponent.runGrid !== "") {
            let g = generateSubgrid(getGridByName(currentComponent.runGrid), e);
          }
          if (canTravel === false) {
              loop = false
          }

        } else {
          timeoutPreventer += 1;
        }
      } else {
        loop = false
      }


      if (timeoutPreventer === 100) {
        loop = false
      }


      if (loop === false) {
        finalCell = currentCell;
      }

    }
  } else {
    alert("You need to place a START tag before generation.")
  }
  globalVariables = e.varObjArr;
  console.log(globalVariables);
  return e;
}


function removeSetTags(currentComponent,e) {
  if (currentComponent.removeTags) {
    let arr = currentComponent.removeTags.split("@");
    for (let i = 0; i < arr.length; i++) {
      e.tags.replace(arr[i], "")
    }
  }
}


function eventHasRequiredTags(currentComponent, e) {
  if (currentComponent.hasTags) {
    let arr1 = currentComponent.hasTags.split("@")
    for (let i = 0; i < arr1.length; i++) {
      if (e.tags.includes(arr1[i])) {

      } else {
        return false;
      }
    }
  }
  return true;
}

function eventDoesNotHaveTags(currentComponent, e) {
  if (currentComponent.doesNotHaveTags.length > 0 && e.tags.length > 0) {
    let arr = [];
    let arr2 = [];
    if (currentComponent.doesNotHaveTags.includes("@")) {
      arr = currentComponent.doesNotHaveTags.split("@");
    } else {
      arr.push(currentComponent.doesNotHaveTags)
    }
    if (e.tags.includes("@")) {
      arr2 = e.tags.split("@");
    } else {
      arr2.push(e.tags);
    }
    for (let i = 0; i < arr.length; i++) {
      arr[i] = arr[i].trim();
    }
    for (let i = 0; i < arr2.length; i++) {
      arr2[i] = arr2[i].trim();
    }
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr2.length; j++) {
        if (arr[i] === arr2[j]) {
          return false;
        }
      }
    }
    return true;
  }
  return true;
}

function addCodeToFileList(name, code) {
  let exists = false;
  for (let i = 0; i < globalFileList.length; i++) {
    if (globalFileList[i].fileName === name) {
      exists = true;
      globalFileList[i].code += `</br>${code}`;
    }
  }
  if (exists === false) {
    globalFileList.push(
      {
        fileName: name,
        code: code
      }
    )
  }
}

function addComponentToEvent(loc, currentComponent, e, currentCell, gridName) {



  if (currentComponent.fileName && currentComponent.fileCode) {
    addCodeToFileList(currentComponent.fileName, currentComponent.fileCode)
  }


  if (currentComponent.leftPortrait) {
    e.leftPortrait = currentComponent.leftPortrait;
  }

  if (currentComponent.leftPortraitAnimation && currentComponent.leftPortraitAnimation !== "unspecified") {
    e.leftPortraitAnimation = currentComponent.leftPortraitAnimation
  }

  if (currentComponent.rightPortrait) {
    e.rightPortrait = currentComponent.rightPortrait
  }

  if (currentComponent.rightPortraitAnimation && currentComponent.rightPortraitAnimation !== "unspecified") {
    e.rightPortraitAnimation = currentComponent.rightPortraitAnimation;
  }

  if (currentComponent.lowerLeftPortrait) {
    e.lowerLeftPortrait = currentComponent.lowerLeftPortrait
  }

  if (currentComponent.lowerCenterPortrait) {
    e.lowerCenterPortrait = currentComponent.lowerCenterPortrait
  }

  if (currentComponent.lowerRightPortrait) {
    e.lowerRightPortrait = currentComponent.lowerRightPortrait
  }

  if (currentComponent.onAction) {
    e.onAction = currentComponent.onAction;
  }

  if (currentComponent.theme) {
    e.theme = currentComponent.theme;
  }
  if (currentComponent.title) {
    e.title = replaceVariable(e, currentComponent.title)
    e.title = replaceFunction(e, e.title);
  }
  if (currentComponent.backgroundOverride) {
    e.backgroundOverride = currentComponent.backgroundOverride
  }


  //This makes sure that all loc is combined if not a triggered desc
  if (loc.length === 1) {
    let last = e.loc[e.loc.length - 1];
    if (last && last.length === 1 && last[0].locTriggers.length === 0 && currentComponent.locTriggers.length === 0) {
      last[0].loc += ` ${loc[0].loc}`;
    } else {
      e.loc.push(loc)
    }
  } else {
    e.loc.push(loc);
  }


  if (currentComponent.tags) {
    if (e.tags.length = 0) {
      e.tags += currentComponent.tags
    } else {
      e.tags += `, ${currentComponent.tags}`
    }

  }

  if (currentComponent.immediateEffects) {
    for (let i = 0; i < currentComponent.immediateEffects.length; i++) {
      e.immediateEffects.push(_.cloneDeep(currentComponent.immediateEffects[i]))
      let lastEffect = e.immediateEffects.length - 1;
      let o = e.immediateEffects[lastEffect]
      if (o.tooltip) {
        o.tooltip = replaceVariable(e, o.tooltip);
        o.tooltip = replaceFunction(e, o.tooltip);
      }
      if (o.code.length > 0) {
        for (let z = 0; z < o.code.length; z++) {
          o.code[z] = replaceVariable(e, o.code[z])
          o.code[z] = replaceFunction(e, o.code[z])
        }
      }
    }
  }

  if (currentComponent.options.length > 0) {
    for (let m = 0; m < currentComponent.options.length; m++) {
      let o = _.cloneDeep(currentComponent.options[m]);
      e.options.push(o)
      console.log(o);
      o.text = replaceVariable(e, o.text);
      o.text = replaceFunction(e, o.text);
      o.tooltip = replaceVariable(e, o.tooltip);
      o.tooltip = replaceFunction(e, o.tooltip);
      for (let z = 0; z < o.code.length; z++) {
        o.code[z] = replaceVariable(e, o.code[z]);
        o.code[z] = replaceFunction(e, o.code[z]);
      }
      o.nextDays = replaceVariable(e, o.nextDays);
      o.nextDays = replaceFunction(e, o.nextDays);
    }


    let currentOption = e.options[e.options.length - 1]

    currentOption.nextStartList = [];
    let nextArr = currentOption.next.split("@");
    if (gridName) {

    } else {
      gridName = currentGrid().gridName
    }
    for (let j = 0; j < nextArr.length; j++) {
      if (nextArr[j] === "NW") {
        currentOption.nextStartList.push([currentCell.x - 1, currentCell.y + 1], gridName)
      }
      if (nextArr[j] === "N") {
        currentOption.nextStartList.push([currentCell.x, currentCell.y + 1, gridName])
      }
      if (nextArr[j] === "NE") {
        currentOption.nextStartList.push([currentCell.x + 1, currentCell.y + 1, gridName])
      }
      if (nextArr[j] === "E") {
        currentOption.nextStartList.push([currentCell.x + 1, currentCell.y, gridName])
      }
      if (nextArr[j] === "SE") {
        currentOption.nextStartList.push([currentCell.x + 1, currentCell.y - 1, gridName])
      }
      if (nextArr[j] === "S") {
        currentOption.nextStartList.push([currentCell.x, currentCell.y - 1, gridName]);
      }
      if (nextArr[j] === "SW") {
        currentOption.nextStartList.push([currentCell.x - 1, currentCell.y - 1, gridName])
      }
      if (nextArr[j] === "W") {
        currentOption.nextStartList.push([currentCell.x - 1, currentCell.y, gridName])
      }
    }
    currentOption.onActionStartList = [];
    let nextOnActions = currentOption.onActions.split("@");
    for (let j = 0; j < nextOnActions.length; j++) {
      nextOnActions[j] = nextOnActions[j].trim();
      if (nextOnActions[j] === "NW") {
        currentOption.onActionStartList.push([currentCell.x - 1, currentCell.y + 1, gridName])
      }
      if (nextOnActions[j] === "N") {
        currentOption.onActionStartList.push([currentCell.x, currentCell.y + 1, gridName])
      }
      if (nextOnActions[j] === "NE") {
        currentOption.onActionStartList.push([currentCell.x + 1, currentCell.y + 1, gridName])
      }
      if (nextOnActions[j] === "E") {
        currentOption.onActionStartList.push([currentCell.x + 1, currentCell.y, gridName])
      }
      if (nextOnActions[j] === "SE") {
        currentOption.onActionStartList.push([currentCell.x + 1, currentCell.y - 1, gridName])
      }
      if (nextOnActions[j] === "S") {
        currentOption.onActionStartList.push([currentCell.x, currentCell.y - 1, gridName]);
      }
      if (nextOnActions[j] === "SW") {
        currentOption.onActionStartList.push([currentCell.x - 1, currentCell.y - 1, gridName])
      }
      if (nextOnActions[j] === "W") {
        currentOption.onActionStartList.push([currentCell.x - 1, currentCell.y, gridName])
      }
    }
  }

  if (currentComponent.afterEffects) {
    for (let i = 0; i < currentComponent.afterEffects.length; i++) {
      e.afterEffects.push(_.cloneDeep(currentComponent.afterEffects[i]))
      let lastEffect = e.afterEffects.length - 1
      let o = e.afterEffects[lastEffect]
      if (o.tooltip) {
        o.tooltip = replaceVariable(e, o.tooltip);
        o.tooltip = replaceFunction(e, o.tooltip);
      }
      if (o.code.length > 0) {
        for (let z = 0; z < o.code.length; z++) {
          o.code[z] = replaceVariable(e, o.code[z])
          o.code[z] = replaceFunction(e, o.code[z])
        }
      }
    }
  }

  if (currentComponent.triggers) {
    for (let i = 0; i < currentComponent.triggers.length; i++) {
      e.triggers.push(currentComponent.triggers[i])
    }
  }
}

function getRandomStart() {
  return currentGrid().start[getRandomInt(0, currentGrid().start.length - 1)]
}

function checkHas(e, c) {
  let stepperHasTags = true;
  for (let i = 0; i < c.hasTags.length; i++) {
    let testTag = c.hasTags[i];
    if (e.tags.includes(testTag)) {

    } else {
      stepperHasTags = false;
    }
  }
  return stepperHasTags;
}

function getNewTags(e, component) {

}

function checkTags(cell, destination) {

}

function cellExists(y, x, grid) {
 if (grid.grid[y] && grid.grid[y][x]) {
   return true;
 } else {
   return false;
 }
}

function getNeighbors(currentCell, grid) {
  grid = grid || currentGrid();
  //need to fix problem with edge of map (check for edges)
  let nw, north, ne, east, west, southwest, south, southeast
  if (cellExists(currentCell.y + 1, currentCell.x - 1, grid)) {
    nw = grid.grid[currentCell.y + 1][currentCell.x - 1]
  } else {
    nw = "";
  }

  if (cellExists(currentCell.y + 1, currentCell.x, grid)) {
    north = grid.grid[currentCell.y + 1][currentCell.x]
  } else {
    north = "";
  }

  if (cellExists(currentCell.y + 1, currentCell.x + 1, grid)) {
    ne = grid.grid[currentCell.y + 1][currentCell.x + 1]
  } else {
    ne = "";
  }

  if (cellExists(currentCell.y, currentCell.x + 1, grid)) {
    east = grid.grid[currentCell.y][currentCell.x + 1]
  } else {
    east = "";
  }

  if (cellExists(currentCell.y, currentCell.x - 1, grid)) {
    west = grid.grid[currentCell.y][currentCell.x - 1]
  } else {
    west = ""
  }

  if (cellExists(currentCell.y - 1, currentCell.x - 1, grid)) {
    southwest = grid.grid[currentCell.y - 1][currentCell.x - 1]
  } else {
    southwest = "";
  }

  if (cellExists(currentCell.y - 1, currentCell.x, grid)) {
    south = grid.grid[currentCell.y - 1][currentCell.x]
  } else {
    south = "";
  }

  if (cellExists(currentCell.y - 1, currentCell.x + 1, grid)) {
    southeast = grid.grid[currentCell.y - 1][currentCell.x + 1]
  } else {
    southeast = "";
  }


  let n = {
    northwest: nw,
    north: north,
    northeast: ne,
    east: east,
    west: west,
    southwest: southwest,
    south: south,
    southeast: southeast
  }
  return n;
}

function isLocalizationCell(cell) {
  let justLoc = true;
  if (cell.components.length > 0) {
    for (let i = 0; i < cell.components.length; i++) {
      let c = cell.components[i];
      //need to check for immediate, etc.
      //c.immediateEffects && c.immediateEffects.length === 0 && c.afterEffects && c.afterEffects.length === 0 && c.options && c.options.length === 0
      if (c.loc && c.tags.length === 0 && c.variables && c.variables.length === 0 && c.hasTags.length === 0 && c.doesNotHaveTags.length === 0 && c.removeTags.length === 0 && c.immediateEffects && c.immediateEffects.length === 0 && c.afterEffects && c.afterEffects.length === 0 && c.options && c.options.length === 0) {

      } else {
        justLoc = false;
      }
    }
  }
  return justLoc || false;
}

function getTravelProbabilities(neighbors, component) {
  let probabilities = [];

  let t = component.travel.split(", ");

  let regex = /(\w+)\((\d+)\)/
  for (let i = 0; i < t.length; i++) {
    let o = {};
    let arr = t[i].match(regex);
    if (arr) {
      o.travel = arr[1],
      o.probability = arr[2];
      probabilities.push(o);
    } else {
      o.travel = t[i];
      o.probability = 100;
      probabilities.push(o);
    }
  }

  return probabilities;
}

function getCell(t, neighbors, currentX, currentY) {
  if (neighbors.northwest !== "") {
    if (t.includes("NW") && hasComponents(neighbors.northwest)) {
      generator.currentX -= 1;
      generator.currentY += 1;
      return neighbors.northwest;
    }
  }

  if (neighbors.northeast !== "") {
    if (t.includes("NE") && hasComponents(neighbors.northeast)) {
      generator.currentY += 1;
      generator.currentX += 1;
      return neighbors.northeast;
    }
  }

  if (neighbors.southeast !== "") {
    if (t.includes("SE") && hasComponents(neighbors.southeast)) {
      generator.currentX += 1;
      generator.currentY -= 1;
      return neighbors.southeast
    }
  }

  if (neighbors.southwest !== "") {
    if (t.includes("SW") && hasComponents(neighbors.southwest)) {
      generator.currentY -= 1;
      generator.currentX -= 1;
      return neighbors.southwest
    }
  }

  if (neighbors.north !== "") {
    if (t.includes("N") && hasComponents(neighbors.north)) {
      generator.currentY += 1;
      return neighbors.north;
    }
  }



  if (neighbors.east !== "") {
    if (t.includes("E") && hasComponents(neighbors.east)) {
      generator.currentX += 1
      return neighbors.east
    }
  }

  if (neighbors.south !== "") {
    if (t.includes("S") && hasComponents(neighbors.south)) {
      generator.currentY -= 1;
      return neighbors.south
    }
  }

  if (neighbors.west !== "") {
    if (t.includes("W") && hasComponents(neighbors.west)) {
      generator.currentX -= 1;
      return neighbors.west
    }
  }
}

function getAllowableNeighbors(neighbors, component) {
  let allowable = [];
  let t = component.travel.split(", ")
  if (neighbors.northwest !== "") {
    if (t.includes("NW") && hasComponents(neighbors.northwest)) {
      allowable.push(neighbors.northwest);
    }
  }

  if (neighbors.northeast !== "") {
    if (t.includes("NE") && hasComponents(neighbors.northeast)) {
      allowable.push(neighbors.northeast);
    }
  }

  if (neighbors.southeast !== "") {
    if (t.includes("SE") && hasComponents(neighbors.southeast)) {
      allowable.push(neighbors.southeast)
    }
  }

  if (neighbors.north !== "") {
    if (t.includes("N") && hasComponents(neighbors.north)) {
      allowable.push(neighbors.north);
    }
  }

  if (neighbors.southwest !== "") {
    if (t.includes("SW") && hasComponents(neighbors.southwest)) {
      allowable.push(neighbors.southwest)
    }
  }

  if (neighbors.east !== "") {
    if (t.includes("E") && hasComponents(neighbors.east)) {
      allowable.push(neighbors.east);
    }
  }

  if (neighbors.south !== "") {
    if (t.includes("S") && hasComponents(neighbors.south)) {
      allowable.push(neighbors.south);
    }
  }

  if (neighbors.west !== "") {
    if (t.includes("W") && hasComponents(neighbors.west)) {
      allowable.push(neighbors.west)
    }
  }

  return allowable;
}

function getComponentFrom(cell) {
  let components = cell.components;
  let probabilityTracker = 0;
  let probabilityArr = [];
  for (let i = 0; i < components.length; i++) {
    let probOfI = components[i].probability || 100
    let pr = parseInt(probOfI) + parseInt(probabilityTracker)
    let o = {
      min: probabilityTracker,
      max: pr
    }
    probabilityTracker += parseInt(probOfI);
    probabilityArr.push(o);
  }
  let rand = getRandomInt(0, probabilityTracker);
  for (let i = 0; i < probabilityArr.length; i++) {
    if (rand >= probabilityArr[i].min && rand <= probabilityArr[i].max) {
      return components[i]
    }
  }
  //return components[rand]
}

function hasComponents(cell) {
  if (cell.components && cell.components.length > 0) {
    return true;
  } else {
    return false;
  }
}

function getLocFromComponent(c, e) {
  let arr = [];
  if (c.loc) {
    let o = {};
    let l = c.loc;
    l = replaceVariable(e, l);
    l = replaceFunction(e, l);
    if (e.loc.loc) {
      o.loc = ` ${l}`; //extra space
    } else {
      o.loc = `${l}`
    }

    //Do not want triggered localization mixed with tags, etc...?
    o.locTriggers = c.locTriggers
    arr.push(o);
  }
  return arr;
}


function getLocTriggers(component) {
  // add
  return [];
}

function replaceVariable(e, localization) {
  let regex = /\$[\w\s\.]+\$/g;
  let l = localization;
  if (l && l.length > 0) {
    let matches = l.match(regex);
    console.log(matches);
    if (matches) {
      for (let j = 0; j < matches.length; j++) {

        let noDollars = matches[j].replace(/\$/g, "")
        for (let n = 0; n <  e.varObjArr.length; n++) {
          console.log(noDollars);
          console.log(e.varObjArr)
          console.log(e.varObjArr[n].name)
          if (noDollars && e.varObjArr[n].name === noDollars) {
            l = l.replace(matches[j], e.varObjArr[n].value)
          }
        }
      }
    }
  }
  return l;
}

function replaceFunction(e, localization) {
  let regex = /\![\w\s]+\([\w\s,]+\)\!/
  let parseRegEx = /\!([\w\s]+)\(([\w\s,]+)\)\!/
  let l = localization;
  if (l && l.length > 0) {
    let matches = l.match(regex);
    console.log(matches);
    if (matches) {
      for (let j = 0; j < matches.length; j++) {
        let parseArr = matches[j].match(parseRegEx);
        let f = parseArr[1];
        let p = parseArr[2];
        if (p.includes(",")) {
          p = p.split(",");
        } else {
          p = [`${p}`]
        }
        for (let i = 0; i < p.length; i++) {
          p[i] = p[i].trim();
        }
        l = applyFunctions(matches[j], f, p, l);
      }
    }
  }
  return l;
}

function applyFunctions(m, f, p, l) {
  console.log(l);
  if (f.includes("getRandomInt")) {
    console.log(p);
    let n1 = parseInt(p[0]);
    let n2 = parseInt(p[1])
    let num = `${getRandomInt(n1, n2)}`
    l = l.replace(m, num)
  }

  return l
}

function getAllComponentLocs(cell, e) {
  let arr = [];
  for (let i = 0; i < cell.components.length; i++) {
    let o = {};
    //replacement method for variable names
    let l = replaceVariable(e, cell.components[i].loc)
    l = replaceFunction(e, l);
    //adding component loc to object loc
    if (e.loc.loc) {
      o.loc = ` ${l}`;
    } else {
      o.loc = `${l}`;
    }

    o.locTriggers = cell.components[i].locTriggers;
    arr.push(o)
  }
  return arr;
}
