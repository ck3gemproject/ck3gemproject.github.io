let workingEventArr = [];
let newEventArr = [];

function runGenerationMachine(num) {
  let namespace = GID("namespace-entry").value;
  workingEventArr = [];
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
}

function getGridByName(name) {
  for (let i = 0; i < generator.globalGridsArr.length; i++) {
    if (generator.globalGridsArr[i].gridName === name) {
      return generator.globalGridsArr[i]
    }
  }
}

function getRandomSubgridStart(gridObject) {
  console.log(gridObject)
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
        if (eventHasRequiredTags(currentComponent, e) === true  && eventDoesNotHaveTags(currentComponent, e) === true) {
          timeoutPreventer = 0;
          addComponentToEvent(loc, currentComponent, e, currentCell)
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
            console.log(currentComponent.runGrid)
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

function doMath(num1, operator, num2) {
  num1 = parseInt(num1);
  num2 = parseInt(num2);
  if (operator === "+=") {
    return num1 + num2;
  } else if (operator === "-=") {
    return num1 - num2;
  } else if (operator === "=") {
    return num2;
  }
}

function variableCheck(c, e) {
  let componentVariables = [];
  let eventVariables = [];
  if (e.variables.length === 0) {

  } else if (e.variables.length === 1) {
    eventVariables.push(e.variables);
  } else {
    console.log(e.variables);
    eventVariables = e.variables.split(",")
    for (let i = 0; i < eventVariables.length; i++) {
        eventVariables[i] = eventVariables[i].trim();
    }
  }
  if (c.variables.length === 0) {

  } else if (c.variables.length === 1) {
    componentVariables.push(c.variables);
  } else {
    componentVariables = c.variables.split(",")
    for (let i = 0; i < componentVariables.length; i++) {
        componentVariables[i] = componentVariables[i].trim();
    }
  }
  let equalityChecks = true;
  console.log(componentVariables);
  console.log(eventVariables);
  if (componentVariables.length > 0) {
    console.log(componentVariables);
    for (let i = 0; i < componentVariables.length; i++) {
      let varName = componentVariables[i].match(/\w+/)[0]
      let varOperation = componentVariables[i].match(/[\=\+\-]+/)[0]
      console.log(varOperation);
      console.log(eventVariables);
      let varNumber = componentVariables[i].match(/\d+/)[0]

      if (eventVariables.length === 0) {
        let newNumber = doMath(0, varOperation, varNumber);
        e.variables += `${varName} = ${newNumber}`
      } else {
        for (let j = 0; j < eventVariables.length; j++) {
          let eVarName = eventVariables[j].match(/\w+/)[0]
          let eVarNumber = eventVariables[j].match(/\d+/)[0];
          console.log(eVarNumber);
          if (varOperation === "===") {
            console.log(varName);
            console.log(eVarName);
            console.log(varNumber);
            console.log(eVarNumber);
            if (varName === eVarName) {
              if (varNumber !== eVarNumber) {
                equalityChecks = false;
              }
            }
          } else if (varName === eVarName) {
            let newNumber = doMath(eVarNumber, varOperation, varNumber)
            eventVariables[j].replace(/\d+/, newNumber)
          } else if (varName !== eVarName) {
            let newNumber = doMath(0, varOperation, varNumber)
            if (eventVariables.length === 0) {
              e.variables += `${varName} = ${newNumber}`
            } else {
              e.variables += `, ${varName} = ${newNumber}`
            }
          }
        }
      }
    }
  }
  return equalityChecks;
}

function generate(input) {
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
          addComponentToEvent(loc, currentComponent, e, currentCell)
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
  return e;
}


function removeSetTags(currentComponent,e) {
  if (currentComponent.removeTags) {
    let arr = currentComponent.removeTags.split(",");
    for (let i = 0; i < arr.length; i++) {
      e.tags.replace(arr[i], "")
    }
  }
}


function eventHasRequiredTags(currentComponent, e) {
  if (currentComponent.hasTags) {
    let arr1 = currentComponent.hasTags.split(",")
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
    if (currentComponent.doesNotHaveTags.includes(",")) {
      arr = currentComponent.doesNotHaveTags.split(",");
    } else {
      arr.push(currentComponent.doesNotHaveTags)
    }
    if (e.tags.includes(",")) {
      arr2 = e.tags.split(",");
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

function addComponentToEvent(loc, currentComponent, e, currentCell) {




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
    e.title = currentComponent.title
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
      e.immediateEffects.push(currentComponent.immediateEffects[i])
    }
  }

  if (currentComponent.options.length > 0) {
    for (let m = 0; m < currentComponent.options.length; m++) {
      e.options.push(currentComponent.options[m])
    }
    console.log(currentComponent.options);
    console.log(e.options);
    let currentOption = e.options[e.options.length - 1]
    console.log(currentOption);
    currentOption.nextStartList = [];
    let nextArr = currentOption.next.split(",");
    for (let j = 0; j < nextArr.length; j++) {
      if (nextArr[j] === "NW") {
        currentOption.nextStartList.push([currentCell.x - 1, currentCell.y + 1])
      }
      if (nextArr[j] === "N") {
        currentOption.nextStartList.push([currentCell.x, currentCell.y + 1])
      }
      if (nextArr[j] === "NE") {
        currentOption.nextStartList.push([currentCell.x + 1, currentCell.y + 1])
      }
      if (nextArr[j] === "E") {
        currentOption.nextStartList.push([currentCell.x + 1, currentCell.y])
      }
      if (nextArr[j] === "SE") {
        currentOption.nextStartList.push([currentCell.x + 1, currentCell.y - 1])
      }
      if (nextArr[j] === "S") {
        currentOption.nextStartList.push([currentCell.x, currentCell.y - 1]);
      }
      if (nextArr[j] === "SW") {
        currentOption.nextStartList.push([currentCell.x - 1, currentCell.y - 1])
      }
      if (nextArr[j] === "W") {
        currentOption.nextStartList.push([currentCell.x - 1, currentCell.y])
      }
    }
  }

  if (currentComponent.afterEffects) {
    for (let i = 0; i < currentComponent.afterEffects.length; i++) {
      e.afterEffects.push(currentComponent.afterEffects[i])
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
      if (c.loc && c.tags === "" && c.variables && c.variables === "" && c.hasTags === "" && c.doesNotHaveTags === "" && c.removeTags === "" && c.immediateEffects && c.immediateEffects.length === 0 && c.afterEffects && c.afterEffects.length === 0 && c.options && c.options.length === 0) {

      } else {
        justLoc = false;
      }
    }
  }
  return justLoc || false;
}

function getTravelProbabilities(neighbors, component) {
  let probabilities = [];
  console.log(component);
  let t = component.travel.split(", ");
  console.log(t);
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
  console.log(probabilities);
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
  console.log(allowable);
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
    if (e.loc.loc) {
      o.loc = ` ${c.loc}`;
    } else {
      o.loc = `${c.loc}`
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

function getAllComponentLocs(cell, e) {
  let arr = [];
  for (let i = 0; i < cell.components.length; i++) {
    let o = {};
    if (e.loc.loc) {
      o.loc = ` ${cell.components[i].loc}`;
    } else {
      o.loc = `${cell.components[i].loc}`;
    }

    o.locTriggers = cell.components[i].locTriggers;
    arr.push(o)
  }
  return arr;
}
