function processJSONgrid(gridName) {
  gridName = gridName.replace(/\n/g, "\\n")
  let g = JSON.parse(gridName);
  if (g) {
    g.preset = true;
    generator.globalGridsArr.push(g);
  }
}


processJSONgrid(tagSeasonGrid);
processJSONgrid(setRandomMegaRegion)
processJSONgrid(setTerrainFromMegaRegion)
processJSONgrid(randomTriggerGenerator)
processJSONgrid(setRandomMonth)
processJSONgrid(britannia)
processJSONgrid(setRandomEra);
refillGridSelect();

GID("select-grid-options").onchange = function() {
  generator.currentGridIndex = GID("select-grid-options").selectedIndex;
  clearGrid();
  refreshGrid();
}
