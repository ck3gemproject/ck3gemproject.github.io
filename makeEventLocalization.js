function makeEventLocalization(e) {

  let normNum = normalizeNumber(locCreationCounter);
  let eLocalization = "";


  if (e.title) {
      eLocalization += `${p(1)}${namespace}.${normNum}.t: "${e.title}"${ep()}`
  } else {
      //eLocalization += `${p(1)}${namespace}.${normNum}.t: "Just Another GEM EVENT"${ep()}`
  }

  let locCounter = 0;
  for (let i = 0; i < e.loc.length; i++) {
    let arr = e.loc[i];
    for (let j = 0; j < arr.length; j++) {
      if (arr[j].loc === "") {
      } else {
        eLocalization += `${p(1)}${namespace}.${normalizeNumber(locCreationCounter)}.loc_${locCounter}.desc: "${arr[j].loc}"${ep()}`
        locCounter += 1;
      }
    }
  }

  let tipCounter = 0;

  //tt keeps immediate and after from creating multiple tooltips for same effects

  let tt = "";
  for (let i = 0; i < e.immediateEffects.length; i++) {
    if (e.immediateEffects[i].tooltip) {
      if (tt.length > 0) {
        tt += `; ${e.immediateEffects[i].tooltip}`
      } else {
        tt += e.immediateEffects[i].tooltip
      }

    }
  }
  if (tt.length > 0) {
    eLocalization += `${p(1)}${namespace}.${normNum}_${tipCounter}_tip: "${tt}"${ep()}`
    tipCounter += 1
  }

  for (let i = 0; i < e.options.length; i++) {
    eLocalization += `${p(1)}${namespace}.${normNum}.${optionLetterArray[i]}: "${e.options[i].text}"${ep()}`
    if (e.options[i].tooltip) {
      eLocalization += `${p(1)}${namespace}.${normNum}_${tipCounter}_tip: "${e.options[i].tooltip}"${ep()}`
      tipCounter += 1;
    }
  }

  tt = "";
  for (let i = 0; i < e.afterEffects.length; i++) {
    if (e.afterEffects[i].tooltip) {
      if (tt.length > 0) {
        tt += `; ${e.afterEffects[i].tooltip}`
      } else {
        tt += e.afterEffects[i].tooltip
      }
    }
    if (tt.length > 0) {
      eLocalization += `${p(1)}${namespace}.${normNum}_${tipCounter}_tip: "${tt}"${ep()}`
      tipCounter += 1
    }
  }

  locCreationCounter += 1;
  return eLocalization;
}
