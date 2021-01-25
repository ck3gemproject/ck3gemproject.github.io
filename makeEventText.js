let globalOnActionArray = [];

function makeEventCode(e) {
  let nextCounter = creationCounter;

  let normNum = normalizeNumber(creationCounter);
  let n = `${namespace}.${normNum}`
  let eText = `${p(0)}${n} = {${ep()}`
  eText += `${p(1)}type = ${e.type || "character_event"}${ep()}`

  //TITLES

  eText += `${p(1)}title = ${namespace}.${normalizeNumber(creationCounter)}.t${ep()}`

  if (e.theme) {
      eText += `${p(1)}theme = ${e.theme}${ep()}`
  }

  if (e.backgroundOverride) {
    eText += `${p(1)}override_background = { event_background = ${e.backgroundOverride} }${ep()}`
  }




  //PORTRAITS
  if (e.leftPortrait) {
    eText += `${p(1)}left_portrait = {${ep()}`
    eText += `${p(2)}character = ${e.leftPortrait}${ep()}`
    if (e.leftPortraitAnimation && e.leftPortraitAnimation !== "unspecified") {
      eText += `${p(2)}animation = ${e.leftPortraitAnimation}${ep()}`
    }
    eText += `${p(1)}}${ep()}`
  }

  if (e.rightPortrait) {
    eText += `${p(1)}right_portrait = {${ep()}`
    eText += `${p(2)}character = ${e.rightPortrait}${ep()}`
    if (e.rightPortraitAnimation  && e.rightPortraitAnimation !== "unspecified") {
      eText += `${p(2)}animation = ${e.rightPortraitAnimation}${ep()}`
    }
    eText += `${p(1)}}${ep()}`
  }

  if (e.lowerLeftPortrait) {
    eText += `${p(1)}lower_left_portrait = ${e.lowerLeftPortrait}${ep()}`
  }

  if (e.lowerCenterPortrait) {
    eText += `${p(1)}lower_center_portrait = ${e.lowerCenterPortrait}${ep()}`
  }

  if (e.lowerRightPortrait) {
    eText += `${p(1)}lower_left_portrait = ${e.lowerRightPortrait}${ep()}`
  }




  //TRIGGERS
  let currentIndent = 1;
  eText += `${p(currentIndent)}trigger = {${ep()}`
  currentIndent += 1;

  for (let si = 0; si < globalScopes.length; si++) {
    if (globalScopes[si].triggerCode) {
      for (let j = 0; j < globalScopes[si].triggerCode.length; j++) {
        globalScopes[si].triggerCode[j] = globalScopes[si].triggerCode[j].replace("scope_trigger_", "");
        globalScopes[si].triggerCode[j] = globalScopes[si].triggerCode[j].replace("random", "any")
        if (globalScopes[si].triggerCode[j].includes("{")) {
          eText += `${p(currentIndent)}${globalScopes[si].triggerCode[j]}${ep()}`
          currentIndent += 1;
        } else if (globalScopes[si].triggerCode[j].includes("}")){
          currentIndent -= 1;
          eText += `${p(currentIndent)}${globalScopes[si].triggerCode[j]}${ep()}`
        } else if (globalScopes[si].triggerCode[j].includes("save_scope_as")) {
          eText += `${p(currentIndent)}${globalScopes[si].triggerCode[j]}${ep()}`
        } else {
          eText += `${p(currentIndent)}${globalScopes[si].triggerCode[j]}${ep()}`
        }
      }
    }
  }

  for (let i = 0; i < e.triggers.length; i++) {
    let currentTrigger = e.triggers[i]
    let currentArr = currentTrigger.split(`\n`);
    for (let n = 0; n < currentArr.length; n++) {
      currentArr[n] = currentArr[n].replace(/^\s+/, "")
      if (currentArr[n].includes("{")) {
        eText += `${p(currentIndent)}${currentArr[n]}${ep()}`;
        currentIndent += 1;
      } else if (currentArr[n].includes("}")) {
        currentIndent -= 1;
        eText += `${p(currentIndent)}${currentArr[n]}${ep()}`;
      } else {
        eText += `${p(currentIndent)}${currentArr[n]}${ep()}`;
      }
    }
    /*if (typeof(e.triggers[i]) === "string") {
      eText += `${p(2)}${e.triggers[i]}${ep()}`
    } else {
      let lineArr = e.triggers[i];
      let indentLevel = 2;
      if (e.triggers[i] && e.triggers[i].length > 0) {
        for (let j = 0; j < e.triggers[i].length; j++) {
          if (lineArr[j].includes("}")) {
            indentLevel -= 1;
          }
          eText += `${p(indentLevel)}${lineArr[j]}${ep()}`
          if (lineArr[j].includes("{")) {
            indentLevel += 1;
          }
        }
      }
    }*/
  }
  eText += `${p(1)}}${ep()}`

  let tipCounter = 0;



  //DESCRIPTIONS
  if (e.loc.length === 0) {

  } else if (e.loc.length === 1) {
    eText += `${p(1)}desc = ${namespace}.${normalizeNumber(creationCounter)}.desc${ep()}`
  } else {


      //FIX DESCRIPTIONS ISSUE HERE

      let locCounter = 0;
      currentIndent = 1;
      eText += `${p(currentIndent)}desc = {${ep()}`
      currentIndent += 1;
      for (let i = 0; i < e.loc.length; i++) {

        let arr = e.loc[i];
        if (arr.length === 0) {

        } else if (arr.length === 1) {
          eText += `${p(currentIndent)}desc = ${namespace}.${normalizeNumber(creationCounter)}.loc_${locCounter}.desc${ep()}`
          locCounter += 1;
          /*if (arr[0].loc.match(spacesOnly)) {

          } else {

          }*/
        } else {
          eText += `${p(currentIndent)}random_valid = {${ep()}`
          currentIndent += 1;



          for (let j = 0; j < arr.length; j++) {
            eText += `${p(currentIndent)}triggered_desc = {${ep()}`
            currentIndent += 1;
            eText += `${p(currentIndent)}trigger = {${ep()}`
            currentIndent += 1;
            let c = arr[j];
            for (let j = 0; j < c.locTriggers.length; j++) {
              let currentTrigger = c.locTriggers[j];
              let currentArr = currentTrigger.split(`\n`);
              for (let n = 0; n < currentArr.length; n++) {
                currentArr[n] = currentArr[n].replace(/^\s+/, "")
                if (currentArr[n].includes("{")) {
                  eText += `${p(currentIndent)}${currentArr[n]}${ep()}`;
                  currentIndent += 1;
                } else if (currentArr[n].includes("}")) {
                  currentIndent -= 1;
                  eText += `${p(currentIndent)}${currentArr[n]}${ep()}`;
                } else {
                  eText += `${p(currentIndent)}${currentArr[n]}${ep()}`;
                }
              }
            }

            currentIndent -= 1;
            eText += `${p(currentIndent)}}${ep()}`
            eText += `${p(currentIndent)}desc = ${namespace}.${normalizeNumber(creationCounter)}.loc_${locCounter}.desc${ep()}`
            currentIndent -= 1;
            eText += `${p(currentIndent)}}${ep()}`
            locCounter += 1;
          }
          currentIndent -= 1;
          eText += `${p(currentIndent)}}${ep()}`

        }
      }

    }
    currentIndent -= 1;
    eText += `${p(currentIndent)}}${ep()}`



    //IMMEDIATE

    eText += `${p(1)}immediate = {${ep()}`
    currentIndent = 2;
    for (let si = 0; si < globalScopes.length; si++) {
      if (globalScopes[si].code) {
        for (let j = 0; j < globalScopes[si].code.length; j++) {
          globalScopes[si].code[j] = globalScopes[si].code[j].replace("scope_trigger_", "")
          if (globalScopes[si].code[j].includes("{")) {
            eText += `${p(currentIndent)}${globalScopes[si].code[j]}${ep()}`
            currentIndent += 1;
          } else if (globalScopes[si].code[j].includes("}")){
            currentIndent -= 1;
            eText += `${p(currentIndent)}${globalScopes[si].code[j]}${ep()}`
          } else if (globalScopes[si].code[j].includes("save_scope_as")) {
            eText += `${p(currentIndent)}${globalScopes[si].code[j]}${ep()}`
          } else {
            eText += `${p(currentIndent)}${globalScopes[si].code[j]}${ep()}`
          }
        }
      }
    }
    let tt = false
    for (let i = 0; i < e.immediateEffects.length; i++) {
      if (e.immediateEffects[i].tooltip.length > 0) {
        tt = true;
      }
      if (e.immediateEffects[i].scopeNumber && e.immediateEffects[i].scopeNumber !== "") {
        eText += `${p(currentIndent)}scope:scope${e.immediateEffects[i].scopeNumber} = {${ep()}`
        currentIndent += 1;
      }
      if (e.immediateEffects[i].triggers.length > 0) {
        eText += `${p(currentIndent)}if = {${ep()}`
        currentIndent += 1;
        eText += `${p(currentIndent)}limit = {${ep()}`
        currentIndent += 1;
        for (let j = 0; j < e.immediateEffects[i].triggers.length; j++) {
          let currentTrigger = e.immediateEffects[i].triggers[j];
          let currentArr = currentTrigger.split(`\n`);
          for (let n = 0; n < currentArr.length; n++) {
            currentArr[n] = currentArr[n].replace(/^\s+/, "")
            if (currentArr[n].includes("{")) {
              eText += `${p(currentIndent)}${currentArr[n]}${ep()}`;
              currentIndent += 1;
            } else if (currentArr[n].includes("}")) {
              currentIndent -= 1;
              eText += `${p(currentIndent)}${currentArr[n]}${ep()}`;
            } else {
              eText += `${p(currentIndent)}${currentArr[n]}${ep()}`;
            }
          }
        }
        currentIndent -= 1
        eText += `${p(currentIndent)}}${ep()}`
        if (tt === true) {
          eText += `${p(currentIndent)}custom_tooltip = ${namespace}.${normNum}_${tipCounter}_tip${ep()}`
          tipCounter += 1;
        }
        eText += `${p(currentIndent)}${e.immediateEffects[i].code}${ep()}`;

      } else {
        if (tt === true) {
          eText += `${p(currentIndent)}custom_tooltip = ${namespace}.${normNum}_${tipCounter}_tip${ep()}`
          tipCounter += 1;
        }
        eText += `${p(currentIndent)}${e.immediateEffects[i].code}${ep()}`;
      }
      //end scope
      if (e.immediateEffects[i].scopeNumber && e.immediateEffects[i].scopeNumber !== "") {
        currentIndent -= 1
        eText += `${p(currentIndent)}}${ep()}`
      }
    }
    //end immediate
    currentIndent -= 1;
    eText += `${p(currentIndent)}}${ep()}`




  //OPTIONS
  let optionCounter = 0;
  if (e.options.length) {
    let updater = creationCounter;
    for (let i = 0; i < e.options.length; i++) {
      eText += `${p(1)}option = {${ep()}`
      eText += `${p(2)}name = ${namespace}.${normNum}.${optionLetterArray[optionCounter]}${ep()}`
      optionCounter += 1;
      eText += `${p(2)}trigger = {${ep()}`
      let currentIndent = 3
      for (let j = 0; j < e.options[i].triggers.length; j++) {
        let currentTrigger = e.options[i].triggers[j];
        let currentArr = currentTrigger.split(`\n`);
        for (let n = 0; n < currentArr.length; n++) {
          currentArr[n] = currentArr[n].replace(/^\s+/, "")
          if (currentArr[n].includes("{")) {
            eText += `${p(currentIndent)}${currentArr[n]}${ep()}`;
            currentIndent += 1;
          } else if (currentArr[n].includes("}")) {
            currentIndent -= 1;
            eText += `${p(currentIndent)}${currentArr[n]}${ep()}`;
          } else {
            eText += `${p(currentIndent)}${currentArr[n]}${ep()}`;
          }
        }


        //starts here
        //eText += `${p(3)}${e.options[i].triggers[j]}${ep()}`;
      }
      currentIndent = 2
      eText += `${p(currentIndent)}}${ep()}`
      if (e.options[i].nextStartList) {
        for (let q = 0; q < e.options[i].nextStartList.length; q++) {
          eText += `${p(currentIndent)}trigger_event = {${ep()}`
          currentIndent += 1;
          nextCounter += 1;
          updater += q;
          updater += 1;
          eText += `${p(currentIndent)}id = ${namespace}.${normalizeNumber(updater)}${ep()}`
          if (e.options[i].nextDays) {
            eText += `${p(currentIndent)}days = ${e.options[i].nextDays || 1}${ep()}`
          }
          currentIndent -= 1;
          eText += `${p(currentIndent)}}${ep()}`
        }
      }

      if (e.options[i].onActionStartList && e.options[i].onActionStartList.length > 0) {
        eText += `${p(currentIndent)}trigger_event = {${ep()}`
        currentIndent += 1;
        //eText += `${p(currentIndent)}on_action = ${namespace}_on_action_${normalizeNumber(globalOnActionArray.length + 1)}${ep()}`
        let rand = getRandomInt(0, e.options[i].onActionStartList.length - 1);
        eText += `${p(currentIndent)}on_action = onAction${e.options[i].onActionStartList[rand][2]}X${e.options[i].onActionStartList[rand][0]}Y${e.options[i].onActionStartList[rand][1]}${ep()}`
        if (e.options[i].nextDays) {
          eText += `${p(currentIndent)}days = ${e.options[i].nextDays || 1}${ep()}`
        }
        currentIndent -= 1;
        eText += `${p(currentIndent)}}${ep()}`
      }

      if (e.options[i].tooltip) {
        eText += `${p(currentIndent)}custom_tooltip = ${namespace}.${normNum}_${tipCounter}_tip${ep()}`
        tipCounter += 1;
        if (e.options[i].scopeNumber && e.options[i].scopeNumber !== "") {
          eText += `${p(currentIndent)}scope:scope${e.options[i].scopeNumber} = {${ep()}`
          currentIndent += 1;
        }
        for (let z = 0; z < e.options[i].code.length; z++) {
          eText += `${p(currentIndent)}${e.options[i].code[z]}${ep()}`;
        }
        if (e.options[i].scopeNumber && e.options[i].scopeNumber !== "") {
          currentIndent -= 1
          eText += `${p(currentIndent)}}${ep()}`
        }
      } else {
        currentIndent = 2;
        if (e.options[i].scopeNumber && e.options[i].scopeNumber !== "") {
          eText += `${p(currentIndent)}scope:scope${e.options[i].scopeNumber} = {${ep()}`
          currentIndent += 1;
        }
        for (let z = 0; z < e.options[i].code.length; z++) {
          let currentOption = e.options[i].code[z];
          let currentArr = currentOption.split(`\n`);

          for (let n = 0; n < currentArr.length; n++) {
            currentArr[n] = currentArr[n].replace(/^\s+/, "")
            if (currentArr[n].includes("{")) {
              eText += `${p(currentIndent)}${currentArr[n]}${ep()}`;
              currentIndent += 1;
            } else if (currentArr[n].includes("}")) {
              currentIndent -= 1;
              eText += `${p(currentIndent)}${currentArr[n]}${ep()}`;
            } else {
              eText += `${p(currentIndent)}${currentArr[n]}${ep()}`;
            }
          }
          //eText += `${p(2)}${e.options[i].code[z]}${ep()}`
        }
        if (e.options[i].scopeNumber && e.options[i].scopeNumber !== "") {
          currentIndent -= 1
          eText += `${p(currentIndent)}}${ep()}`
        }
      }

      if (e.options[i].aiBaseChance && e.options[i].aiBaseChance !== "") {
        eText += `${p(2)}ai_chance = {${ep()}`
        eText += `${p(3)}base = ${e.options[i].aiBaseChance}${ep()}`
        eText += `${p(3)}ai_value_modifier = {${ep()}`
        if (e.options[i].aiBoldnessMod && e.options[i].aiBoldnessMod !== "") {
          eText += `${p(4)}ai_boldness = ${e.options[i].aiBoldnessMod}${ep()}`
        }
        if (e.options[i].aiCompassionMod && e.options[i].aiCompassionMod !== "") {
          eText += `${p(4)}ai_compassion = ${e.options[i].aiCompassionMod}${ep()}`
        }
        if (e.options[i].aiHonorMod && e.options[i].aiHonorMod !== "") {
          eText += `${p(4)}ai_honor = ${e.options[i].aiHonorMod}${ep()}`
        }
        if (e.options[i].aiEnergyMod && e.options[i].aiEnergyMod !== "") {
          eText += `${p(4)}ai_energy = ${e.options[i].aiEnergyMod}${ep()}`
        }
        if (e.options[i].aiGreedMod && e.options[i].aiGreedMod !== "") {
          eText += `${p(4)}ai_greed = ${e.options[i].aiGreedMod}${ep()}`
        }
        if (e.options[i].aiRationalityMod && e.options[i].aiRationalityMod !== "") {
          eText += `${p(4)}ai_rationality = ${e.options[i].aiRationalityMod}${ep()}`
        }
        if (e.options[i].aiSociabilityMod && e.options[i].aiSociabilityMod !== "") {
          eText += `${p(4)}ai_sociability = ${e.options[i].aiSociabilityMod}${ep()}`
        }
        if (e.options[i].aiVengefulnessMod && e.options[i].aiVengefulnessMod !== "") {
          eText += `${p(4)}ai_vengefulness = ${e.options[i].aiVengefulnessMod}${ep()}`
        }
        if (e.options[i].aiZealMod && e.options[i].aiZealMod !== "") {
          eText += `${p(4)}ai_zeal = ${e.options[i].aiZealMod}${ep()}`
        }
        eText += `${p(3)}}${ep()}`
        eText += `${p(2)}}${ep()}`
      }

      eText += `${p(1)}}${ep()}`
    }
  }

  //ADD Default OK Option


  if (optionCounter === 0) {
    eText += `${p(1)}option = {${ep()}`
    eText += `${p(2)}name = OK # default when not entered${ep()}`
    eText += `${p(1)}}${ep()}`
  }


  //AFTER

  eText += `${p(1)}after = {${ep()}`
  currentIndent = 2;
  tt = false
  for (let i = 0; i < e.afterEffects.length; i++) {
    if (e.afterEffects[i].tooltip.length > 0) {
      tt = true;
    }
    if (e.afterEffects[i].scopeNumber && e.afterEffects[i].scopeNumber !== "") {
      eText += `${p(currentIndent)}scope:scope${e.afterEffects[i].scopeNumber} = {${ep()}`
      currentIndent += 1;
    }
    if (e.afterEffects[i].triggers.length > 0) {
      eText += `${p(currentIndent)}if = {${ep()}`
      currentIndent += 1
      eText += `${p(currentIndent)}limit = {${ep()}`
      currentIndent += 1;
      for (let j = 0; j < e.afterEffects[i].triggers.length; j++) {
        let currentTrigger = e.afterEffects[i].triggers[j];
        let currentArr = currentTrigger.split(`\n`);
        for (let n = 0; n < currentArr.length; n++) {
          currentArr[n] = currentArr[n].replace(/^\s+/, "")
          if (currentArr[n].includes("{")) {
            eText += `${p(currentIndent)}${currentArr[n]}${ep()}`;
            currentIndent += 1;
          } else if (currentArr[n].includes("}")) {
            currentIndent -= 1;
            eText += `${p(currentIndent)}${currentArr[n]}${ep()}`;
          } else {
            eText += `${p(currentIndent)}${currentArr[n]}${ep()}`;
          }
        }
      }
      currentIndent -= 1;
      eText += `${p(currentIndent)}}${ep()}`
      if (tt === true) {
        eText += `${p(currentIndent)}custom_tooltip = ${namespace}.${normNum}_${tipCounter}_tip${ep()}`
        tipCounter += 1;
      }
      eText += `${p(currentIndent)}${e.afterEffects[i].code}${ep()}`;
    } else {
      if (tt === true) {
        eText += `${p(currentIndent)}custom_tooltip = ${namespace}.${normNum}_${tipCounter}_tip${ep()}`
        tipCounter += 1;
      }
      eText += `${p(currentIndent)}${e.afterEffects[i].code}${ep()}`;
    }
    //end scope
    if (e.afterEffects[i].scopeNumber && e.afterEffects[i].scopeNumber !== "") {
      currentIndent -= 1
      eText += `${p(currentIndent)}}${ep()}`
    }
  }
  //end after
  currentIndent -= 1;
  eText += `${p(currentIndent)}}${ep()}`


  //final bracket
  eText += `${p(0)}}${ep()}`
  eventCodeArr.push(eText);
  makeEventLocalization(e);
  creationCounter += 1;

  for (let i = 0; i < e.options.length; i++) {
    for (let j = 0; j < e.options[i].nextStartList.length; j++) {
      let nextE = generate(e.options[i].nextStartList[j]);

      makeEventCode(nextE)
      eventsList.push(nextE);
    }
  }
  for (let i = 0; i < e.options.length; i++) {
    if (e.options[i].onActionStartList && e.options[i].onActionStartList.length > 0) {
      for (let j = 0; j < e.options[i].onActionStartList.length; j++) {
        let o = {};
        o.name = `onAction${e.options[i].onActionStartList[j][2]}X${e.options[i].onActionStartList[j][0]}Y${e.options[i].onActionStartList[j][1]}`
        o.x = e.options[i].onActionStartList[j][0]
        o.y = e.options[i].onActionStartList[j][1];
        o.varObjArr = e.varObjArr;
        let exists = false;
        for (let x = 0; x < globalOnActionArray.length; x++) {
          if (globalOnActionArray[x].name === o.name) {
            exists = true;
          }
        }
        if (exists === false) {
          globalOnActionArray.push(o);
        }
      }
      /*
      let t = "";
      let num = globalOnActionArray.length + 1;
      t += `${p(0)}${namespace}_on_action_${normalizeNumber(num)} = {${ep()}`
      t += `${p(2)}random_events = {${ep()}`
      for (let j = 0; j < e.options[i].onActionStartList.length; j++) {
        //100 works as default but needs to be modifiable
        //stack dies out for some reason here
        for (let x = 0; x < 5; x++) {
          let nextE = generate(e.options[i].onActionStartList[j]);
          makeEventCode(nextE);
          eventsList.push(nextE);
          t += `${p(4)}100 = ${namespace}.${normalizeNumber(creationCounter - 1)}${ep()}`;
        }
      }
      t += `${p(2)}}${ep()}`
      t += `${p(0)}}${ep()}`
      globalOnActionArray.push(t)
      */
    }
  }
  console.log(globalOnActionArray);
}
