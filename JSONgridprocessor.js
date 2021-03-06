function processJSONgrid(gridName) {
  gridName = gridName.replace(/\n/g, "\\n")
  let g = JSON.parse(gridName);
  if (g) {
    g.preset = true;
    generator.globalGridsArr.push(g);
  }
}

/*
processJSONgrid(tagSeasonGrid);
processJSONgrid(setRandomMegaRegion)
processJSONgrid(setmonth);
processJSONgrid(setregion);
processJSONgrid(setbackground);
processJSONgrid(setonaction)
processJSONgrid(setlpanimation);
processJSONgrid(setothercharacter);
processJSONgrid(endothercharacter);
*/
refillGridSelect();

GID("select-grid-options").onchange = function() {
  generator.currentGridIndex = GID("select-grid-options").selectedIndex;
  clearGrid();
  refreshGrid();
}
