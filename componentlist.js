/*
  NOTE: LOOK TO SETGAMETAGS TO ENSURE REGULAR EXPRESSIONS MATCH COMPONENT OPTION ENTRY POSSIBILITIES IF BUG WITH COMPONENT OPTIONS NOT FILLING AGAIN. THIS IS A RECURRING ERROR WHEN I CHANGE INPUT POSSIBILITIES
*/

function fillComponentList() {
  let x = currentGrid().current.x;
  let y = currentGrid().current.y;
  let t = "";
  for (let i = 0; i < currentGrid().grid[y][x].components.length; i++) {
    t += `<p class="clickable-cell-component-list">`;

    if (currentGrid().grid[y][x].components[i].loc) {
      t += ` [loc: ${currentGrid().grid[y][x].components[i].loc}]`
    }

    if (currentGrid().grid[y][x].components[i].tags) {
      t += ` [set: ${currentGrid().grid[y][x].components[i].tags}]`
    }
    if (currentGrid().grid[y][x].components[i].hasTags) {
      t += ` [has: ${currentGrid().grid[y][x].components[i].hasTags}]`
    }
    if (currentGrid().grid[y][x].components[i].doesNotHaveTags) {
      t += ` [not: ${currentGrid().grid[y][x].components[i].doesNotHaveTags}]`
    }
    if (currentGrid().grid[y][x].components[i].removeTags) {
      t += ` [remove: ${currentGrid().grid[y][x].components[i].removeTags}]`
    }

    if (currentGrid().grid[y][x].components[i].travel) {
      t += ` [travel: ${currentGrid().grid[y][x].components[i].travel}]`
    }

    if (currentGrid().grid[y][x].components[i].gameTags) {
      t += ` [gameTags: ${currentGrid().grid[y][x].components[i].gameTags}]`
    }

    if (currentGrid().grid[y][x].components[i].options[0] && currentGrid().grid[y][x].components[i].options[0].text) {
      t += `[option: ${currentGrid().grid[y][x].components[i].options[0].text}]`
    }

    if (currentGrid().grid[y][x].components[i].options[0] && currentGrid().grid[y][x].components[i].options[0].next) {
      t += ` [option triggers event to: ${currentGrid().grid[y][x].components[i].options[0].next}]`
    }

    if (currentGrid().grid[y][x].components[i].immediateEffects.length > 0) {
      t += ` [changes immediate: yes]`
    }

    if (currentGrid().grid[y][x].components[i].afterEffects.length > 0) {
      t += ` [changes after: yes]`
    }

    if (currentGrid().grid[y][x].components[i].runGrid) {
      t += ` [run grid: ${currentGrid().grid[y][x].components[i].runGrid}]`
    }

    if (currentGrid().grid[y][x].components[i].variables.length > 0) {
      t += ` [variables: ${currentGrid().grid[y][x].components[i].variables}]`
    }


    t += "</p>"

  }

  return t;
}

GID("create-component-button").onclick = function() {
  let x = currentGrid().current.x;
  let y = currentGrid().current.y;
  let loc = GID("localization-entry").value;
  let tags = GID("tag-entry").value;
  if (tags.includes("START")) {
    currentGrid().start.push([x, y])
  }
  let hasTags = GID("tag-check").value;
  let doesNotHaveTags = GID("tag-not-check").value;
  let removeTags = GID("tag-removal").value;
  let travel = GID("tag-travel").value;
  let runGrid = GID("run-grid").value;
  let variables = GID("variable-entry").value;
  let probability = GID("component-probability").value;
  if (probability.value === "") {
    probability.value = 100
  }
  currentGrid().grid[y][x].components.push({
    loc: loc,
    locTriggers: [],
    tags: tags,
    hasTags: hasTags,
    doesNotHaveTags: doesNotHaveTags,
    removeTags: removeTags,
    travel: travel,
    gameTags: "",
    runGrid: runGrid,
    probability: probability,
    variables: variables,
    immediateEffects: [],
    afterEffects: [],
    options: [],
  })

  GID("component-creation").innerHTML = fillComponentList();
  makeClickableComponentList();
  refreshGrid();
  GID("localization-entry").value = "";
  GID("tag-entry").value = "";
  GID("tag-check").value = "";
  GID("tag-not-check").value = "";
  GID("tag-travel").value = ""
  GID("tag-removal").value = "";
  GID("run-grid").value = "";
  GID("variable-entry").value = "";
  //generate();

}

function makeClickableComponentList() {
  let x = currentGrid().current.x;
  let y = currentGrid().current.y;
  let cellComponentList = document.getElementsByClassName("clickable-cell-component-list");
  for (let i = 0; i < cellComponentList.length; i++) {
    let currX = x;
    let currY = y;
    cellComponentList[i].onclick = function() {
      let comp = currentGrid().grid[currY][currX].components[i]
      setGameTags(comp);
      //HERE YOU CAN ADD TO CHANGE COMPONENTS
      GID("component-entry").style.display = "none"
      GID("component-edit").style.display = "block"
      GID("localization-edit").value = comp.loc
      GID("travel-edit").value = comp.travel
      GID("set-edit").value = comp.tags;
      GID("has-edit").value = comp.hasTags;
      GID("remove-edit").value = comp.removeTags;
      GID("not-edit").value = comp.doesNotHaveTags;
      GID("run-grid-edit").value = comp.runGrid;
      GID("component-probability-edit").value = comp.probability;
      GID("variable-edit").value = comp.variables;
      GID("settings-block").style.display = "block";
      GID("options-block").style.display = "none";
      GID("trigger-block").style.display = "none";
      GID("immediate-block").style.display = "none";
      GID("after-block").style.display = "none";

      fillScopeSelects();

      if (comp.freestyleTrigger) {
        GID("freestyle-trigger").value = comp.freestyleTrigger
      }

      //REFILL APPROPRIATE IMMEDIATE EFFECTS FOR COMPONENT
      if (comp.immediateFreestyle && comp.immediateFreestyle.code) {
        GID("immediate1").value = comp.immediateFreestyle.code;
      }
      if (comp.immediateFreestyle && comp.immediateFreestyle.tooltip) {
        GID("immediatetooltip1").value = comp.immediateFreestyle.tooltip
      }
      if (comp.immediateEffects) {

      }

      //REPLACE APPROPRIATE AFTER Effects

      if (comp.afterFreestyle && comp.afterFreestyle.code) {
        GID("after1").value = comp.afterFreestyle.code;
      }
      if (comp.afterFreestyle && comp.afterFreestyle.tooltip) {
        GID("aftertooltip1").value = comp.afterFreestyle.tooltip
      }
      if (comp.afterEffects) {

      }

      //REPLACE APPROPRIATE OPTIONS

      if (comp.options) {
        if (comp.options[0]) {

          GID("option1text").value = comp.freestyleOptionText
          GID("option1tooltip").value = comp.freestyleOptionTooltip
          GID("option1code").value = comp.freestyleOptionCode[0]
          GID("option1next").value = comp.options[0].next;
          GID("option1nextdays").value = comp.options[0].nextDays;
        }
      }

      GID("select-delete-component-button").onclick = function() {
        currentGrid().grid[currY][currX].components.splice(i, 1);
        GID("component-edit").style.display = "none";
        GID("component-entry").style.display = "block";
        GID("component-creation").innerHTML = fillComponentList();
        makeClickableComponentList();
      }
      GID("select-save-component-button").onclick = function() {
        saveComponentEdits(comp);
        GID("component-edit").style.display = "none";
        GID("component-entry").style.display = "block";
        GID("component-edit-form").reset();
        GID("component-creation").innerHTML = fillComponentList();
        if (comp.tags.includes("START")) {
          currentGrid().start.push([currX, currY])
        }
        makeClickableComponentList();
      };
    }
  }
}


function saveComponentEdits(comp) {
  comp.triggers = [];
  let onActions = GID("on-action-select").value;
  if (onActions !== "unspecified") {
    comp.onAction = onActions
  }

  let theme = GID("theme").value;
  if (theme !== "unspecified") {
    comp.theme = theme
  }

  let lp = GID("left-portrait").value;
  let lpAnimation = GID("left-portrait-animation").value;
  let rp = GID("right-portrait").value;
  let rpAnimation = GID("right-portrait-animation").value;
  let llp = GID("lower-left-portrait").value;
  let lcp = GID("lower-center-portrait").value;
  let lrp = GID("lower-right-portrait").value;

  if (lp) {
    comp.leftPortrait = lp;
  }
  if (lpAnimation) {
    comp.leftPortraitAnimation = lpAnimation;
  }

  if (rp) {
    comp.rightPortrait = rp;
  }

  if (rpAnimation) {
    comp.rightPortraitAnimation = rpAnimation;
  }

  if (llp) {
    comp.lowerLeftPortrait = llp;
  }

  if (lcp) {
    comp.lowerCenterPortrait = lcp;
  }

  if (lrp) {
    comp.lowerRightPortrait = lrp;
  }

  let backgroundOverride = GID("override-background").value;
  if (backgroundOverride !== "unspecified") {
    comp.backgroundOverride = backgroundOverride
  }


  comp.loc = GID("localization-edit").value;
  comp.locTriggers = [];
  comp.travel = GID("travel-edit").value;
  comp.tags = GID("set-edit").value;
  getGameTags(comp)
  comp.hasTags = GID("has-edit").value;
  comp.removeTags = GID("remove-edit").value;
  comp.doesNotHaveTags = GID("not-edit").value;
  comp.runGrid = GID("run-grid-edit").value;
  comp.probability = GID("component-probability-edit").value;
  comp.variables = GID("variable-edit").value;

  let title = GID("eventTitle").value;
  if (title.length > 0)  {
    comp.title = title;
  }

  let onAction = GID("on-action-select").value;
  if (onAction !== "unspecified") {
    comp.onAction = onAction
  }

  let immediateSelectedScope = "";
  let cs = "";
  try {
    cs = GID("immediate-scope-select").value;
    if (cs === "unspecified") {
      cs = "";
    }
  } catch {
    cs = "";
  }
  if (cs.length === 0) {

  } else {
    immediateSelectedScope = cs;
  }

  let aes = "";
  let afterSelectedScope = "";
  try {
    aes = GID("after-scope-select").value;
    if (aes === "unspecified") {
      aes = "";
    }
  } catch {
    aes = "";
  }
  if (aes.length === 0) {

  } else {
    afterSelectedScope = aes;
  }

  let os = "";
  let optionsSelectedScope = "";
  try {
    os = GID("options-scope-select").value;
    if (os === "unspecified") {
      os = "";
    }
  } catch {
    os = "";
  }
  if (os.length === 0) {

  } else {
    optionsSelectedScope = os;
  }


  comp.immediateEffects = [];
  let tt = GID("immediatetooltip1").value;
  let c = GID("immediate1").value;
  if (c) {
    let ie1 = {
      tooltip: tt,
      code: [],
      triggers: [],
    }
    ie1.code.push(c);
    if (immediateSelectedScope !== "") {
      ie1.scopeNumber = immediateSelectedScope
    }
    //check for empty string to prevent creation of triggers on empty effects
    if (ie1.code && ie1.code.length > 0 && ie1.code[0] !== "") {
      comp.immediateFreestyle = ie1;
      comp.immediateEffects.push(ie1)
    }
  }

  comp.afterEffects = [];
  let ttt = GID("aftertooltip1").value;
  let cc = GID("after1").value;
  if (cc) {
    let ae1 = {
      tooltip: ttt,
      code: [],
      triggers: [],
    }
    ae1.code.push(cc);
    if (afterSelectedScope !== "") {
      ae1.scopeNumber = afterSelectedScope
    }


    if (ae1.code && ae1.code.length > 0 && ae1.code[0] !== "") {
      comp.afterFreestyle = ae1;
      comp.afterEffects.push(ae1);


    }


  }



  comp.options = [];

  let o1 = {
    text: GID("option1text").value,
    code: [GID("option1code").value],
    tooltip: GID("option1tooltip").value,
    triggers: [],
    aiBaseChance: GID("ai-base-chance").value,
    aiBoldnessMod: GID("ai-boldness-mod").value,
    aiCompassionMod: GID("ai-compassion-mod").value,
    aiHonorMod: GID("ai-honor-mod").value,
    aiEnergyMod: GID("ai-energy-mod").value,
    aiGreedMod: GID("ai-greed-mod").value,
    aiRationalityMod: GID("ai-rationality-mod").value,
    aiSociabilityMod: GID("ai-sociability-mod").value,
    aiVengefulnessMod: GID("ai-vengefulness-mod").value,
    aiZealMod: GID("ai-zeal-mod").value,
    next: GID("option1next").value,
    nextDays: GID("option1nextdays").value,
    triggeredEvents: [],
  }
  
  if (optionsSelectedScope !== "") {
    o1.scopeNumber = optionsSelectedScope
  }
  comp.freestyleOptionCode = o1.code;
  comp.freestyleOptionTooltip = o1.tooltip;
  comp.freestyleOptionText = o1.text

  for (let i = 0; i < globalEffectsArray.length; i++) {

    let v;
    try {
      v = GID(`immediate_${globalEffectsArray[i].effectName}`).value;
    } catch {
      v = "";
    }
    if (v && v.length > 0) {
      //comp.immediateEffects[0].code += `${globalEffectsArray[i].effectName} = ${v}` (This would allow you to avoid double counting triggers, but you need to learn how to avoid running together the code)

      comp.immediateEffects.push({
        tooltip: ``,
        code: `${globalEffectsArray[i].effectName} = ${v}`,
        triggers: [],
        scopeNumber: immediateSelectedScope,
      })

    }



    let av;
    try {
      av = GID(`after_${globalEffectsArray[i].effectName}`).value;
    } catch {
      av = "";
    }
    if (av && av.length > 0) {
      comp.afterEffects.push({
        tooltip: ``,
        code: `${globalEffectsArray[i].effectName} = ${av}`,
        triggers: [],
        scopeNumber: afterSelectedScope,
      })
    }

    let ov;
    try {
      ov = GID(`option_${globalEffectsArray[i].effectName}`).value;
    } catch {
      ov = "";
    }
    if (ov && ov.length > 0) {
      //PLACEHOLDER FOR CODE
      o1.code.push(`${globalEffectsArray[i].effectName} = ${ov}`);
    }

  }

  if (o1.text) {comp.options.push(o1)}
  /*
  if (o2.text) {comp.options.push(o2)}
  if (o3.text) {comp.options.push(o3)}
  if (o4.text) {comp.options.push(o4)}
  if (o5.text) {comp.options.push(o5)}
  */



  //place triggers on whatever has been selected or, if nothing is selected, on the event

  let freestyleTrigger = GID("freestyle-trigger").value
  comp.freestyleTrigger = GID("freestyle-trigger").value;
  let additionalTriggers = saveAdditionalTriggers(comp);

  if (comp.loc.length > 0) { //Note that this is checking that the localization string length > 0 (i.e., loc exists)
    if (freestyleTrigger) {
      comp.locTriggers.push(freestyleTrigger);
    }
    for (let i = 0; i < additionalTriggers.length; i++) {
      comp.locTriggers.push(additionalTriggers[i])
    }
  }
  //NEED TO WORK ON THIS
  if (comp.immediateEffects.length === 0 && comp.options.length === 0 && comp.afterEffects.length === 0) {
    // add triggers to trigger if effects and options do not exist
    for (let i = 0; i < globalTriggersArray.length; i++) {

      let v;
      try {
        v = GID(`scope_trigger_${globalTriggersArray[i].name}`).value;
      } catch {
        v = "";
      }
      if (v && v.length > 0 && comp.loc && comp.tags === "" && comp.hasTags === "" && comp.doesNotHaveTags === "" && comp.removeTags === "" && comp.immediateEffects && comp.immediateEffects.length === 0 && comp.afterEffects && comp.afterEffects.length === 0 && comp.options && comp.options.length === 0) {
        let o = {};
        let commaSeparatedArray = v.split(", ");
        for (let n = 0; n < commaSeparatedArray.length; n++) {
          let t = "";
          let firstCharacter = commaSeparatedArray[n].split("")[0]
          let secondCharacter = commaSeparatedArray[n].split("")[1]
          if (secondCharacter === "=") {
            firstCharacter = `${firstCharacter}${secondCharacter}`
          }
          if (firstCharacter === "<=" || firstCharacter === "<" || firstCharacter === "!=" || firstCharacter === ">" || firstCharacter === ">=") {
            t = `${globalTriggersArray[i].name} ${commaSeparatedArray[n]}`
          } else {
            t = `${globalTriggersArray[i].name} = ${commaSeparatedArray[n]}`
          }
          comp.locTriggers.push(t)
        }
      } else if (v && v.length > 0) {
        let o = {};
        let commaSeparatedArray = v.split(", ");
        for (let n = 0; n < commaSeparatedArray.length; n++) {
          let t = "";
          let firstCharacter = commaSeparatedArray[n].split("")[0]
          let secondCharacter = commaSeparatedArray[n].split("")[1]
          if (secondCharacter === "=") {
            firstCharacter = `${firstCharacter}${secondCharacter}`
          }
          if (firstCharacter === "<=" || firstCharacter === "<" || firstCharacter === "!=" || firstCharacter === ">" || firstCharacter === ">=") {
            t = `${globalTriggersArray[i].name} ${commaSeparatedArray[n]}`
          } else {
            t = `${globalTriggersArray[i].name} = ${commaSeparatedArray[n]}`
          }
          comp.triggers.push(t)
        }

        /*
        let thisTrigger = `${globalTriggersArray[i].name} = ${v}`
        comp.triggers.push(thisTrigger)
        */

      }

    }
  } else {
    //add triggers to immediate, options, and after if exist
    for (let i = 0; i < globalTriggersArray.length; i++) {
      let v;
      try {
        v = GID(`scope_trigger_${globalTriggersArray[i].name}`).value;
      } catch {
        v = "";
      }
      if (v && v.length > 0) {
        //comp.immediateEffects[0].code += `${globalEffectsArray[i].effectName} = ${v}` (This would allow you to avoid double counting triggers, but you need to learn how to avoid running together the code)
        /*
        let t = "";
        let firstCharacter = v.split("")[0]
        let secondCharacter = v.split("")[1]
        if (secondCharacter === "=") {
          firstCharacter = `${firstCharacter}${secondCharacter}`
        }
        if (firstCharacter === "<=" || firstCharacter === "<" || firstCharacter === "!=" || firstCharacter === ">" || firstCharacter === ">=") {
          t = `${globalTriggersArray[i].name} ${v}`
        } else {
          t = `${globalTriggersArray[i].name} = ${v}`
        }
        */

        let commaSeparatedArray = v.split(",");
        for (let n = 0; n < commaSeparatedArray.length; n++) {
          let t = "";
          let firstCharacter = commaSeparatedArray[n].split("")[0]
          let secondCharacter = commaSeparatedArray[n].split("")[1]
          if (secondCharacter === "=") {
            firstCharacter = `${firstCharacter}${secondCharacter}`
          }
          if (firstCharacter === "<=" || firstCharacter === "<" || firstCharacter === "!=" || firstCharacter === ">" || firstCharacter === ">=") {
            t = `${globalTriggersArray[i].name} ${commaSeparatedArray[n]}`
          } else {
            t = `${globalTriggersArray[i].name} = ${commaSeparatedArray[n]}`
          }

          if (comp.immediateEffects.length > 0 && comp.immediateEffects[0] !== "") {
            for (let j = 0; j < comp.immediateEffects.length; j++) {
              comp.immediateEffects[j].triggers.push(t);
            }
          }

          if (comp.options.length > 0 && comp.options[0] !== "") {
            for (let j = 0; j < comp.options.length; j++) {
              comp.options[j].triggers.push(t);
            }
          }
          if (comp.afterEffects.length > 0 && comp.afterEffects[0] !== "") {
            for (let j = 0; j < comp.afterEffects.length; j++) {
              comp.afterEffects[j].push(t);
            }
          }
        }
      }
    }
  }


  if (comp.immediateEffects.length > 0) {
    for (let i = 0; i < comp.immediateEffects.length; i++) {
      if (freestyleTrigger) {
        comp.immediateEffects[i].triggers.push(freestyleTrigger)
      }
      /*
      for (let j = 0; j < additionalTriggers.length; j++) {
        comp.immediateEffects[i].triggers.push(additionalTriggers[j])
      }
      */
    }
  }

  if (comp.options.length > 0) {
    for (let i = 0; i < comp.options.length; i++) {
      if (freestyleTrigger) {
        comp.options[i].triggers.push(freestyleTrigger)
      }
      /*
      for (let j = 0; j < additionalTriggers.length; j++) {
        comp.options[i].triggers.push(additionalTriggers[j])
      }
      */
    }
  }
  if (comp.afterEffects.length > 0) {
    for (let i = 0; i < comp.afterEffects.length; i++) {
      if (freestyleTrigger) {
        comp.afterEffects[i].triggers.push(freestyleTrigger)
      }
      /*
      for (let j = 0; j < additionalTriggers.length; j++) {
        comp.afterEffects[i].triggers.push(additionalTriggers[j])
      }
      */
    }
  }

  //&& comp.locTriggers.length === 0
  if (comp.immediateEffects.length === 0 && comp.options.length === 0 && comp.afterEffects.length === 0 && comp.locTriggers.length === 0) {
    if (freestyleTrigger) {
      comp.triggers.push(freestyleTrigger)
    }
    for (let j = 0; j < additionalTriggers.length; j++) {
      comp.triggers.push(additionalTriggers[j])
    }
  }
}

function setGameTags(c) {
  let tags = c.gameTags;
  let regex = /\([\w\s\:\d\-\_\.\<\>\!\=\{\}]+\)/gi
  let idRegex = /\(([\w\s\_\-\.\<\>\!\=\{\}]+)\:\s([\w\s\_\-\d\.\<\>\!\=\{\}\:]+)/i
  let res = tags.match(regex);
  if (res) {
    for (let i = 0; i < res.length; i++) {
      let m = res[i].match(idRegex)

      GID(`${m[1]}`).value = m[2]
    }
  }

}

function getGameTags(c) {
  c.gameTags = "";
  let els = document.getElementsByClassName("component-option");
  let arr = [];
  for (let i = 0; i < els.length; i++) {
    let o = {
      d: els[i].id,
      t: els[i].value
    }
    setNewTag(c, o)
    els[i].selectedIndex = 0;
  }
}

function setNewTag(c, tag) {
  if (tag.t !== "unspecified" && tag.t.length > 0) {
    if (c.gameTags.length === 0) {
      c.gameTags += `(${tag.d}: ${tag.t})`
    } else {
      c.gameTags += `, (${tag.d}: ${tag.t})`
    }
  }
}

GID("select-immediate-button").onclick = function() {
  GID("immediate-block").style.display = "block";
  GID("settings-block").style.display = "none";
  GID("trigger-block").style.display = "none";
  GID("options-block").style.display = "none";
  GID("after-block").style.display = "none";
  GID("scopes-div").style.display = "none";
}

GID("select-scopes-button").onclick = function() {
  GID("immediate-block").style.display = "none";
  GID("settings-block").style.display = "none";
  GID("trigger-block").style.display = "none";
  GID("options-block").style.display = "none";
  GID("after-block").style.display = "none";
  GID("scopes-div").style.display = "block";
}

GID("select-trigger-button").onclick = function() {
  GID("trigger-block").style.display = "block";
  GID("settings-block").style.display = "none";
  GID("immediate-block").style.display = "none";
  GID("options-block").style.display = "none";
  GID("after-block").style.display = "none";
  GID("scopes-div").style.display = "none";
}

GID("select-options-button").onclick = function() {
  GID("options-block").style.display = "block";
  GID("settings-block").style.display = "none";
  GID("trigger-block").style.display = "none";
  GID("immediate-block").style.display = "none";
  GID("after-block").style.display = "none";
  GID("scopes-div").style.display = "none";
}

GID("select-after-button").onclick = function() {
  GID("after-block").style.display = "block";
  GID("settings-block").style.display = "none";
  GID("options-block").style.display = "none";
  GID("trigger-block").style.display = "none";
  GID("immediate-block").style.display = "none";
  GID("scopes-div").style.display = "none";
}

GID("select-settings-button").onclick = function() {
  GID("settings-block").style.display = "block";
  GID("options-block").style.display = "none";
  GID("trigger-block").style.display = "none";
  GID("immediate-block").style.display = "none";
  GID("after-block").style.display = "none";
  GID("scopes-div").style.display = "none";
}

function saveAdditionalTriggers(c) {
  let additionalTriggers = [];
  let rx = /\(([\-\w\d\s]+\:\s([\-\w\d\s]+))\)/gi
  let rxGroup = /([\w\s\d\-]+)\:\s([\-\w\s\d]+)/i
  let arr = c.gameTags.match(rx)
  if (arr && arr.length) {
    let erTriggers = ""
    let actor1Triggers = ""
    let actor2Triggers = ""
    let actor3Triggers = ""
    let actor4Triggers = ""
    for (let i = 0; i < arr.length; i++) {
      let res = arr[i].match(rxGroup);
      let triggerType = res[1];
      let selection = res[2];

      //EVENT RECIPIENT TRIGGERS



      if (triggerType === "season") {
        additionalTriggers.push(setSeason(selection));
      } else if (triggerType === "month") {
        additionalTriggers.push(setMonth(selection));
      } else if (triggerType === "region") {
        additionalTriggers.push(setRegion(selection))
      } else if (triggerType === "county-culture") {
        additionalTriggers.push(setCountyCultureGroup(selection));
      } else if (triggerType === "county-development") {
        additionalTriggers.push(setCountyDevelopent(selection));
      } else if (triggerType === "ERhighestheldtitletier") {
        erTriggers += `highest_held_tier = ${selection}`
      } else if (triggerType === "ERage") {
        erTriggers += `age = ${selection}`
      }
    }

    if (erTriggers.length > 0) {
      erTriggers = `scope:eventRecipient = {${erTriggers}}`
      additionalTriggers.push(erTriggers);
    }
    if (actor2Triggers) {
      actor2Triggers = `scope:actor1 = {${actor1Triggers}}`
      additionalTriggers.push(actor1Triggers);
    }
    if (actor2Triggers) {
      actor2Triggers = `scope:actor2 = {${actor2Triggers}}`
      additionalTriggers.push(actor2Triggers);
    }
    if (actor3Triggers) {
      actor3Triggers = `scope:actor3 = {${actor3Triggers}}`
      additionalTriggers.push(actor3Triggers);
    }
    if (actor4Triggers) {
      actor4Triggers = `scope:actor4 = {${actor4Triggers}}`
      additionalTriggers.push(actor4Triggers);
    }
  }
  return additionalTriggers;
}

function setSeason(s) {
  if (s === "spring") {
    return `
      time_of_year = {
        min = 3.1
        max = 5.31
      }
    `
  } else if (s === "summer") {
    return `
      time_of_year = {
        min = 6.1
        max = 8.31
      }
    `
  } else if (s === "fall") {
    return `
      time_of_year = {
        min = 9.1
        max = 11.30
      }
    `
  } else if (s === "winter") {
    return `
      time_of_year = {
        min = 12.1
        max = 2.28
      }
    `
  }
}

function setMonth(m) {
  if (m === "january") {
    return `current_month = 1`
  } else if (m === "february") {
    return `current_month = 2`
  } else if (m === "march") {
    return `current_month = 3`
  } else if (m === "april") {
    return `current_month = 4`
  } else if (m === "may") {
    return `current_month = 5`
  } else if (m === "june") {
    return `current_month = 6`
  } else if (m === "july") {
    return `current_month = 7`
  } else if (m === "august") {
    return `current_month = 8`
  } else if (m === "september") {
    return `current_month = 9`
  } else if (m === "october") {
    return `current_month = 10`
  } else if (m === "november") {
    return `current_month = 11`
  } else if (m === "december") {
    return `current_month = 12`
  }
}

function setRegion(r) {
  return `
  root = {
    location = {
      geographical_region = ${r}
    }
  }
  `
}

function setCountyCultureGroup(c) {
  return `
  root = {
    location = {
      has_culture_group = culture_group:${c}
    }
  }`
}

function setCountyDevelopment(c) {
  return `
  root = {
    location = {
      development_level = ${c}
    }
  }
  `
}
