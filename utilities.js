let eventsList = []
let spacesOnly = /^\s+$/
let creationCounter = 1;
let locCreationCounter = 1;
let namespace = "gem"
let onActionDelay = "30";
let eventCodeArr = [];
let eventLocalizationArr = [];
let eventOnActionArr = [];
let copiedCell = [];

function removeDuplicates(arr) {
  return arr.filter((value, index) => arr.indexOf(value) === index)
}

//need to put all settings in an object;

function getGridByName(name) {
  for (let i = 0; i < eventGridArr.length; i++) {
    if (generator.globalGridsArr[i].name === name) {
      return generator.globalGridsArr[i];
    }
  }
}

function includeHTML() {
  var z, i, elmnt, file, xhttp;
  /* Loop through a collection of all HTML elements: */
  z = document.getElementsByTagName("*");
  for (i = 0; i < z.length; i++) {
    elmnt = z[i];
    /*search for elements with a certain atrribute:*/
    file = elmnt.getAttribute("w3-include-html");
    if (file) {
      /* Make an HTTP request using the attribute value as the file name: */
      xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4) {
          if (this.status == 200) {elmnt.innerHTML = this.responseText;}
          if (this.status == 404) {elmnt.innerHTML = "Page not found.";}
          /* Remove the attribute, and call this function once more: */
          elmnt.removeAttribute("w3-include-html");
          includeHTML();
        }
      }
      xhttp.open("GET", file, true);
      xhttp.send();
      /* Exit the function: */
      return;
    }
  }
}

includeHTML()

function GID(el) {
  return document.getElementById(el);
}

function normalizeNumber(num) {
  if (num < 10) {
    return `000${num}`
  } else if (num < 100) {
    return `00${num}`
  } else if (num < 1000) {
    return `0${num}`
  } else {
    return num;
  }
}

function p(num) {
  let t = ""
  for (let i = 0; i < num; i++) {
    t += "&nbsp&nbsp";
  }
  return t
}

function ep() {
  return "</br>"
}

function getRandomInt(min, max) {
  //inclusive on both sides
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randFromArray(arr) {
  return arr[getRandomInt(0, arr.length - 1)]
}

function fillScopeSelects() {
  for (let i = 0; i < globalScopes.length; i++) {
    let char1 = GID(`scope-select-id${i}-char1`);
    if (char1) {
      char1.value = globalScopes[i].char1.code;
    }
    let char2 = GID(`scope-select-id${i}-char2`);
    if (char2) {
      char2.value = globalScopes[i].char2.code;
    }
    let char3 = GID(`scope-select-id${i}-char3`);
    if (char3) {
      char3.value = globalScopes[i].char3.code;
    }
    let char4 = GID(`scope-select-id${i}-char4`);
    if (char4) {
      char4.value = globalScopes[i].char4.code;
    }
  }
}

const optionLetterArray = [
  "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"
]



//on_actions setup
let quarterly_playable_pulse = [];
let random_yearly_playable_pulse = [];
let yearly_playable_pulse = [];
let yearly_pool_pulse = [];
let three_year_playable_pulse = [];
let random_yearly_everyone_pulse = [];
let five_year_playable_pulse = [];
let five_year_everyone_pulse = [];
let on_weight_changed = [];
let on_leave_court = [];
let on_guest_ready_to_move_to_pool = [];
let on_guest_arrived_from_pool = [];
let on_siege_completion = [];
let on_war_won_attacker = [];
let on_pregnancy_mother = [];
let on_release_from_prison = [];
let on_death = [];
let on_army_enter_province = [];
let on_join_court = [];
let on_fired_from_council = [];
let on_title_gain = [];
let on_character_culture_change = [];
let on_birth_child = [];
let on_commander_combat_pulse = [];
let on_faith_created = [];
let on_character_faith_change = [];
let on_courtier_decided_to_move_to_pool = [];
let on_birthday = [];
let on_faith_conversion = [];
let on_explicit_claim_gain = [];
let on_courtier_ready_to_move_to_pool = [];
let on_imprison = [];
let on_birth_mother = [];
let on_join_war_as_secondary = [];
let on_explicit_claim_lost = [];
let on_leave_council = [];
let on_marriage = [];
let on_great_holy_war_recipient_replaced = [];
let on_game_start = [];

function resetOnActions() {
  quarterly_playable_pulse = [];
  random_yearly_playable_pulse = [];
  yearly_playable_pulse = [];
  yearly_pool_pulse = [];
  three_year_playable_pulse = [];
  random_yearly_everyone_pulse = [];
  five_year_playable_pulse = [];
  five_year_everyone_pulse = [];
  on_weight_changed = [];
  on_leave_court = [];
  on_guest_ready_to_move_to_pool = [];
  on_guest_arrived_from_pool = [];
  on_siege_completion = [];
  on_war_won_attacker = [];
  on_pregnancy_mother = [];
  on_release_from_prison = [];
  on_death = [];
  on_army_enter_province = [];
  on_join_court = [];
  on_fired_from_council = [];
  on_title_gain = [];
  on_character_culture_change = [];
  on_birth_child = [];
  on_commander_combat_pulse = [];
  on_faith_created = [];
  on_character_faith_change = [];
  on_courtier_decided_to_move_to_pool = [];
  on_birthday = [];
  on_faith_conversion = [];
  on_explicit_claim_gain = [];
  on_courtier_ready_to_move_to_pool = [];
  on_imprison = [];
  on_birth_mother = [];
  on_join_war_as_secondary = [];
  on_explicit_claim_lost = [];
  on_leave_council = [];
  on_marriage = [];
  on_great_holy_war_recipient_replaced = [];
  on_game_start = [];
}

function buildOnActions(eventArr) {
  resetOnActions();
  for (let i = 0; i < eventArr.length; i++) {
    if (eventArr[i].onAction === "quarterly_playable_pulse") {
      let n = i + 1;
      quarterly_playable_pulse.push(`${eventArr[i].factor} = ${namespace}.${normalizeNumber(n)}`)
    }

    if (eventArr[i].onAction === "random_yearly_playable_pulse") {
      let n = i + 1;
      random_yearly_playable_pulse.push(`${eventArr[i].factor} = ${namespace}.${normalizeNumber(n)}`)
    }

    if (eventArr[i].onAction === "yearly_playable_pulse") {
      let n = i + 1;
      yearly_playable_pulse.push(`${eventArr[i].factor} = ${namespace}.${normalizeNumber(n)}`)
    }

    if (eventArr[i].onAction === "yearly_pool_pulse") {
      let n = i + 1;
      yearly_pool_pulse.push(`${eventArr[i].factor} = ${namespace}.${normalizeNumber(n)}`)
    }

    if (eventArr[i].onAction === "three_year_playable_pulse") {
      let n = i + 1;
      three_year_playable_pulse.push(`${eventArr[i].factor} = ${namespace}.${normalizeNumber(n)}`)
    }

    if (eventArr[i].onAction === "random_yearly_everyone_pulse") {
      let n = i + 1;
      random_yearly_everyone_pulse.push(`${eventArr[i].factor} = ${namespace}.${normalizeNumber(n)}`)
    }

    if (eventArr[i].onAction === "five_year_playable_pulse") {
      let n = i + 1;
      five_year_playable_pulse.push(`${eventArr[i].factor} = ${namespace}.${normalizeNumber(n)}`)
    }

    if (eventArr[i].onAction === "five_year_everyone_pulse") {
      let n = i + 1;
      five_year_everyone_pulse.push(`${eventArr[i].factor} = ${namespace}.${normalizeNumber(n)}`)
    }

    if (eventArr[i].onAction === "on_weight_changed") {
      let n = i + 1;
      on_weight_changed.push(`${eventArr[i].factor} = ${namespace}.${normalizeNumber(n)}`)
    }

    if (eventArr[i].onAction === "on_leave_court") {
      let n = i + 1;
      on_leave_court.push(`${eventArr[i].factor} = ${namespace}.${normalizeNumber(n)}`)
    }

    if (eventArr[i].onAction === "on_guest_ready_to_move_to_pool") {
      let n = i + 1;
      on_guest_ready_to_move_to_pool.push(`${eventArr[i].factor} = ${namespace}.${normalizeNumber(n)}`)
    }

    if (eventArr[i].onAction === "on_guest_arrived_from_pool") {
      let n = i + 1;
      on_guest_arrived_from_pool.push(`${eventArr[i].factor} = ${namespace}.${normalizeNumber(n)}`)
    }

    if (eventArr[i].onAction === "on_siege_completion") {
      let n = i + 1;
      on_siege_completion.push(`${eventArr[i].factor} = ${namespace}.${normalizeNumber(n)}`)
    }


    if (eventArr[i].onAction === "on_war_won_attacker") {
      let n = i + 1;
      on_war_won_attacker.push(`${eventArr[i].factor} = ${namespace}.${normalizeNumber(n)}`)
    }

    if (eventArr[i].onAction === "on_pregnancy_mother") {
      let n = i + 1;
      on_pregnancy_mother.push(`${eventArr[i].factor} = ${namespace}.${normalizeNumber(n)}`)
    }

    if (eventArr[i].onAction === "on_release_from_prison") {
      let n = i + 1;
      on_release_from_prison.push(`${eventArr[i].factor} = ${namespace}.${normalizeNumber(n)}`)
    }


    if (eventArr[i].onAction === "on_death") {
      let n = i + 1;
      on_death.push(`${eventArr[i].factor} = ${namespace}.${normalizeNumber(n)}`)
    }

    if (eventArr[i].onAction === "on_army_enter_province") {
      let n = i + 1;
      on_army_enter_province.push(`${eventArr[i].factor} = ${namespace}.${normalizeNumber(n)}`)
    }

    if (eventArr[i].onAction === "on_join_court") {
      let n = i + 1;
      on_join_court.push(`${eventArr[i].factor} = ${namespace}.${normalizeNumber(n)}`)
    }


    if (eventArr[i].onAction === "on_fired_from_council") {
      let n = i + 1;
      on_fired_from_council.push(`${eventArr[i].factor} = ${namespace}.${normalizeNumber(n)}`)
    }

    if (eventArr[i].onAction === "on_title_gain") {
      let n = i + 1;
      on_title_gain.push(`${eventArr[i].factor} = ${namespace}.${normalizeNumber(n)}`)
    }

    if (eventArr[i].onAction === "on_character_culture_change") {
      let n = i + 1;
      on_character_culture_change.push(`${eventArr[i].factor} = ${namespace}.${normalizeNumber(n)}`)
    }


    if (eventArr[i].onAction === "on_birth_child") {
      let n = i + 1;
      on_birth_child.push(`${eventArr[i].factor} = ${namespace}.${normalizeNumber(n)}`)
    }

    if (eventArr[i].onAction === "on_commander_combat_pulse") {
      let n = i + 1;
      on_commander_combat_pulse.push(`${eventArr[i].factor} = ${namespace}.${normalizeNumber(n)}`)
    }

    if (eventArr[i].onAction === "on_faith_created") {
      let n = i + 1;
      on_faith_created.push(`${eventArr[i].factor} = ${namespace}.${normalizeNumber(n)}`)
    }

    if (eventArr[i].onAction === "on_character_faith_change") {
      let n = i + 1;
      on_character_faith_change.push(`${eventArr[i].factor} = ${namespace}.${normalizeNumber(n)}`)
    }

    if (eventArr[i].onAction === "on_courtier_decided_to_move_to_pool") {
      let n = i + 1;
      on_courtier_decided_to_move_to_pool.push(`${eventArr[i].factor} = ${namespace}.${normalizeNumber(n)}`)
    }

    if (eventArr[i].onAction === "on_birthday") {
      let n = i + 1;
      on_birthday.push(`${eventArr[i].factor} = ${namespace}.${normalizeNumber(n)}`)
    }

    if (eventArr[i].onAction === "on_faith_conversion") {
      let n = i + 1;
      on_faith_conversion.push(`${eventArr[i].factor} = ${namespace}.${normalizeNumber(n)}`)
    }

    if (eventArr[i].onAction === "on_explicit_claim_gain") {
      let n = i + 1;
      on_explicit_claim_gain.push(`${eventArr[i].factor} = ${namespace}.${normalizeNumber(n)}`)
    }

    if (eventArr[i].onAction === "on_courtier_ready_to_move_to_pool") {
      let n = i + 1;
      on_courtier_ready_to_move_to_pool.push(`${eventArr[i].factor} = ${namespace}.${normalizeNumber(n)}`)
    }

    if (eventArr[i].onAction === "on_imprison") {
      let n = i + 1;
      on_imprison.push(`${eventArr[i].factor} = ${namespace}.${normalizeNumber(n)}`)
    }

    if (eventArr[i].onAction === "on_birth_mother") {
      let n = i + 1;
      on_birth_mother.push(`${eventArr[i].factor} = ${namespace}.${normalizeNumber(n)}`)
    }

    if (eventArr[i].onAction === "on_join_war_as_secondary") {
      let n = i + 1;
      on_join_war_as_secondary.push(`${eventArr[i].factor} = ${namespace}.${normalizeNumber(n)}`)
    }

    if (eventArr[i].onAction === "on_explicit_claim_lost") {
      let n = i + 1;
      on_explicit_claim_lost.push(`${eventArr[i].factor} = ${namespace}.${normalizeNumber(n)}`)
    }

    if (eventArr[i].onAction === "on_leave_council") {
      let n = i + 1;
      on_leave_council.push(`${eventArr[i].factor} = ${namespace}.${normalizeNumber(n)}`)
    }

    if (eventArr[i].onAction === "on_marriage") {
      let n = i + 1;
      on_marriage.push(`${eventArr[i].factor} = ${namespace}.${normalizeNumber(n)}`)
    }

    if (eventArr[i].onAction === "on_great_holy_war_recipient_replaced") {
      let n = i + 1;
      on_great_holy_war_recipient_replaced.push(`${eventArr[i].factor} = ${namespace}.${normalizeNumber(n)}`)
    }

    if (eventArr[i].onAction === "on_game_start") {
      let n = i + 1;
      on_game_start.push(`${eventArr[i].factor} = ${namespace}.${normalizeNumber(n)}`)
    }

  }
}


GID("copy-cell-button").onclick = function() {
  let x = currentGrid().current.x;
  let y = currentGrid().current.y;
  copiedCell = _.cloneDeep(currentGrid().grid[y][x]);
}

GID("paste-cell-button").onclick = function() {
  let x = currentGrid().current.x;
  let y = currentGrid().current.y;
  currentGrid().grid[y][x] = _.cloneDeep(copiedCell);
}


GID("on-action-button").onclick = function() {
  GID("code-box").style.display = "none";
  GID("bars").style.display = "none";
  GID("localization-box").style.display = "none";
  GID("json-placeholder").style.display = "none";
  GID("on-action-box").style.display = "block";
  GID("generator-settings-box").style.display = "none";
  let t = "";
  buildOnActions(globalEventsList);

  if (on_game_start.length > 0) {
    t += `${p()}on_game_start = {${ep()}`
    t += `${p(2)}on_actions = {${ep()}`
    t += `${p(4)}delay = { days = ${onActionDelay}}${ep()}`
    t += `${p(4)}GEM_EVENTS_on_game_start${ep()}`
    t += `${p(2)}}${ep()}`
    t += `${p()}}${ep()}`

    t += `${p()}GEM_EVENTS_on_game_start = {${ep()}`
    t += `${p(2)}random_events = {${ep()}`
    for (let i = 0; i < on_game_start.length; i++) {
      t += `${p(4)}${on_game_start[i]}${ep()}`
    }
    t += `${p(2)}}${ep()}`
    t += `${p()}}${ep()}`
  }

  if (quarterly_playable_pulse.length > 0) {
    t += `${p()}quarterly_playable_pulse = {${ep()}`
    t += `${p(2)}on_actions = {${ep()}`
    t += `${p(4)}delay = { days = ${onActionDelay}}${ep()}`
    t += `${p(4)}GEM_EVENTS_quarterly_pulse${ep()}`
    t += `${p(2)}}${ep()}`
    t += `${p()}}${ep()}`

    t += `${p()}GEM_EVENTS_quarterly_pulse = {${ep()}`
    t += `${p(2)}random_events = {${ep()}`
    for (let i = 0; i < quarterly_playable_pulse.length; i++) {
      t += `${p(4)}${quarterly_playable_pulse[i]}${ep()}`
    }
    t += `${p(2)}}${ep()}`
    t += `${p()}}${ep()}`
  }

  if (random_yearly_playable_pulse.length > 0) {
    t += `${p()}random_yearly_playable_pulse = {${ep()}`
    t += `${p(2)}on_actions = {${ep()}`
    t += `${p(4)}delay = { days = ${onActionDelay}}${ep()}`
    t += `${p(4)}GEM_EVENTS_random_yearly_playable_pulse${ep()}`
    t += `${p(2)}}${ep()}`
    t += `${p()}}${ep()}`

    t += `${p()}GEM_EVENTS_random_yearly_playable_pulse = {${ep()}`
    t += `${p(2)}random_events = {${ep()}`
    for (let i = 0; i < random_yearly_playable_pulse.length; i++) {
      t += `${p(4)}${random_yearly_playable_pulse[i]}${ep()}`
    }
    t += `${p(2)}}${ep()}`
    t+= `${p()}}${ep()}`
  }

  if (yearly_playable_pulse.length > 0) {
    t += `${p()}yearly_playable_pulse = {${ep()}`
    t += `${p(2)}on_actions = {${ep()}`
    t += `${p(4)}delay = { days = ${onActionDelay}}${ep()}`
    t += `${p(4)}GEM_EVENTS_yearly_playable_pulse${ep()}`
    t += `${p(2)}}${ep()}`
    t += `${p()}}${ep()}`

    t += `${p()}GEM_EVENTS_yearly_playable_pulse = {${ep()}`
    t += `${p(2)}random_events = {${ep()}`
    for (let i = 0; i < yearly_playable_pulse.length; i++) {
      t += `${p(4)}${yearly_playable_pulse[i]}${ep()}`
    }
    t += `${p(2)}}${ep()}`
    t+= `${p()}}${ep()}`
  }

  if (yearly_pool_pulse.length > 0) {
    t += `${p()}yearly_pool_pulse = {${ep()}`
    t += `${p(2)}on_actions = {${ep()}`
    t += `${p(4)}delay = { days = ${onActionDelay}}${ep()}`
    t += `${p(4)}GEM_EVENTS_yearly_pool_pulse${ep()}`
    t += `${p(2)}}${ep()}`
    t += `${p()}}${ep()}`

    t += `${p()}GEM_EVENTS_yearly_pool_pulse = {${ep()}`
    t += `${p(2)}random_events = {${ep()}`
    for (let i = 0; i < yearly_pool_pulse.length; i++) {
      t += `${p(4)}${yearly_pool_pulse[i]}${ep()}`
    }
    t += `${p(2)}}${ep()}`
    t+= `${p()}}${ep()}`
  }

  if (three_year_playable_pulse.length > 0) {
    t += `${p()}three_year_playable_pulse = {${ep()}`
    t += `${p(2)}on_actions = {${ep()}`
    t += `${p(4)}delay = { days = ${onActionDelay}}${ep()}`
    t += `${p(4)}GEM_EVENTS_three_year_playable_pulse${ep()}`
    t += `${p(2)}}${ep()}`
    t += `${p()}}${ep()}`

    t += `${p()}GEM_EVENTS_three_year_playable_pulse = {${ep()}`
    t += `${p(2)}random_events = {${ep()}`
    for (let i = 0; i < three_year_playable_pulse.length; i++) {
      t += `${p(4)}${three_year_playable_pulse[i]}${ep()}`
    }
    t += `${p(2)}}${ep()}`
    t+= `${p()}}${ep()}`
  }

  if (random_yearly_everyone_pulse.length > 0) {
    t += `${p()}random_yearly_everyone_pulse = {${ep()}`
    t += `${p(2)}on_actions = {${ep()}`
    t += `${p(4)}delay = { days = ${onActionDelay}}${ep()}`
    t += `${p(4)}GEM_EVENTS_random_yearly_everyone_pulse${ep()}`
    t += `${p(2)}}${ep()}`
    t += `${p()}}${ep()}`

    t += `${p()}GEM_EVENTS_random_yearly_everyone_pulse = {${ep()}`
    t += `${p(2)}random_events = {${ep()}`
    for (let i = 0; i < random_yearly_everyone_pulse.length; i++) {
      t += `${p(4)}${random_yearly_everyone_pulse[i]}${ep()}`
    }
    t += `${p(2)}}${ep()}`
    t+= `${p()}}${ep()}`
  }

  if (five_year_playable_pulse.length > 0) {
    t += `${p()}five_year_playable_pulse = {${ep()}`
    t += `${p(2)}on_actions = {${ep()}`
    t += `${p(4)}delay = { days = ${onActionDelay}}${ep()}`
    t += `${p(4)}GEM_EVENTS_five_year_playable_pulse${ep()}`
    t += `${p(2)}}${ep()}`
    t += `${p()}}${ep()}`

    t += `${p()}GEM_EVENTS_five_year_playable_pulse = {${ep()}`
    t += `${p(2)}random_events = {${ep()}`
    for (let i = 0; i < five_year_playable_pulse.length; i++) {
      t += `${p(4)}${five_year_playable_pulse[i]}${ep()}`
    }
    t += `${p(2)}}${ep()}`
    t+= `${p()}}${ep()}`
  }

  if (five_year_everyone_pulse.length > 0) {
    t += `${p()}five_year_everyone_pulse = {${ep()}`
    t += `${p(2)}on_actions = {${ep()}`
    t += `${p(4)}delay = { days = ${onActionDelay}}${ep()}`
    t += `${p(4)}GEM_EVENTS_five_year_everyone_pulse${ep()}`
    t += `${p(2)}}${ep()}`
    t += `${p()}}${ep()}`

    t += `${p()}GEM_EVENTS_five_year_everyone_pulse = {${ep()}`
    t += `${p(2)}random_events = {${ep()}`
    for (let i = 0; i < five_year_everyone_pulse.length; i++) {
      t += `${p(4)}${five_year_everyone_pulse[i]}${ep()}`
    }
    t += `${p(2)}}${ep()}`
    t+= `${p()}}${ep()}`
  }

  if (on_weight_changed.length > 0) {
    t += `${p()}on_weight_changed = {${ep()}`
    t += `${p(2)}on_actions = {${ep()}`
    t += `${p(4)}delay = { days = ${onActionDelay}}${ep()}`
    t += `${p(4)}GEM_EVENTS_on_weight_changed${ep()}`
    t += `${p(2)}}${ep()}`
    t += `${p()}}${ep()}`

    t += `${p()}GEM_EVENTS_on_weight_changed = {${ep()}`
    t += `${p(2)}random_events = {${ep()}`
    for (let i = 0; i < on_weight_changed.length; i++) {
      t += `${p(4)}${on_weight_changed[i]}${ep()}`
    }
    t += `${p(2)}}${ep()}`
    t+= `${p()}}${ep()}`
  }

  if (on_leave_court.length > 0) {
    t += `${p()}on_leave_court = {${ep()}`
    t += `${p(2)}on_actions = {${ep()}`
    t += `${p(4)}delay = { days = ${onActionDelay}}${ep()}`
    t += `${p(4)}GEM_EVENTS_on_leave_court${ep()}`
    t += `${p(2)}}${ep()}`
    t += `${p()}}${ep()}`

    t += `${p()}GEM_EVENTS_on_leave_court = {${ep()}`
    t += `${p(2)}random_events = {${ep()}`
    for (let i = 0; i < on_leave_court.length; i++) {
      t += `${p(4)}${on_leave_court[i]}${ep()}`
    }
    t += `${p(2)}}${ep()}`
    t+= `${p()}}${ep()}`
  }


  if (on_guest_ready_to_move_to_pool.length > 0) {
    t += `${p()}on_guest_ready_to_move_to_pool = {${ep()}`
    t += `${p(2)}on_actions = {${ep()}`
    t += `${p(4)}delay = { days = ${onActionDelay}}${ep()}`
    t += `${p(4)}GEM_EVENTS_on_guest_ready_to_move_to_pool${ep()}`
    t += `${p(2)}}${ep()}`
    t += `${p()}}${ep()}`

    t += `${p()}GEM_EVENTS_on_guest_ready_to_move_to_pool = {${ep()}`
    t += `${p(2)}random_events = {${ep()}`
    for (let i = 0; i < on_guest_ready_to_move_to_pool.length; i++) {
      t += `${p(4)}${on_guest_ready_to_move_to_pool[i]}${ep()}`
    }
    t += `${p(2)}}${ep()}`
    t+= `${p()}}${ep()}`
  }

  if (on_guest_arrived_from_pool.length > 0) {
    t += `${p()}on_guest_arrived_from_pool = {${ep()}`
    t += `${p(2)}on_actions = {${ep()}`
    t += `${p(4)}delay = { days = ${onActionDelay}}${ep()}`
    t += `${p(4)}GEM_EVENTS_on_guest_arrived_from_pool${ep()}`
    t += `${p(2)}}${ep()}`
    t += `${p()}}${ep()}`

    t += `${p()}GEM_EVENTS_on_guest_arrived_from_pool = {${ep()}`
    t += `${p(2)}random_events = {${ep()}`
    for (let i = 0; i < on_guest_arrived_from_pool.length; i++) {
      t += `${p(4)}${on_guest_arrived_from_pool[i]}${ep()}`
    }
    t += `${p(2)}}${ep()}`
    t+= `${p()}}${ep()}`
  }


  if (on_siege_completion.length > 0) {
    t += `${p()}on_siege_completion = {${ep()}`
    t += `${p(2)}on_actions = {${ep()}`
    t += `${p(4)}delay = { days = ${onActionDelay}}${ep()}`
    t += `${p(4)}GEM_EVENTS_on_siege_completion${ep()}`
    t += `${p(2)}}${ep()}`
    t += `${p()}}${ep()}`

    t += `${p()}GEM_EVENTS_on_siege_completion = {${ep()}`
    t += `${p(2)}random_events = {${ep()}`
    for (let i = 0; i < on_siege_completion.length; i++) {
      t += `${p(4)}${on_siege_completion[i]}${ep()}`
    }
    t += `${p(2)}}${ep()}`
    t+= `${p()}}${ep()}`
  }


  if (on_war_won_attacker.length > 0) {
    t += `${p()}on_war_won_attacker = {${ep()}`
    t += `${p(2)}on_actions = {${ep()}`
    t += `${p(4)}delay = { days = ${onActionDelay}}${ep()}`
    t += `${p(4)}GEM_EVENTS_on_war_won_attacker${ep()}`
    t += `${p(2)}}${ep()}`
    t += `${p()}}${ep()}`

    t += `${p()}GEM_EVENTS_on_war_won_attacker = {${ep()}`
    t += `${p(2)}random_events = {${ep()}`
    for (let i = 0; i < on_war_won_attacker.length; i++) {
      t += `${p(4)}${on_war_won_attacker[i]}${ep()}`
    }
    t += `${p(2)}}${ep()}`
    t+= `${p()}}${ep()}`
  }

  if (on_pregnancy_mother.length > 0) {
    t += `${p()}on_pregnancy_mother = {${ep()}`
    t += `${p(2)}on_actions = {${ep()}`
    t += `${p(4)}delay = { days = ${onActionDelay}}${ep()}`
    t += `${p(4)}GEM_EVENTS_on_pregnancy_mother${ep()}`
    t += `${p(2)}}${ep()}`
    t += `${p()}}${ep()}`

    t += `${p()}GEM_EVENTS_on_pregnancy_mother = {${ep()}`
    t += `${p(2)}random_events = {${ep()}`
    for (let i = 0; i < on_pregnancy_mother.length; i++) {
      t += `${p(4)}${on_pregnancy_mother[i]}${ep()}`
    }
    t += `${p(2)}}${ep()}`
    t+= `${p()}}${ep()}`
  }

  if (on_release_from_prison.length > 0) {
    t += `${p()}on_release_from_prison = {${ep()}`
    t += `${p(2)}on_actions = {${ep()}`
    t += `${p(4)}delay = { days = ${onActionDelay}}${ep()}`
    t += `${p(4)}GEM_EVENTS_on_release_from_prison${ep()}`
    t += `${p(2)}}${ep()}`
    t += `${p()}}${ep()}`

    t += `${p()}GEM_EVENTS_on_release_from_prison = {${ep()}`
    t += `${p(2)}random_events = {${ep()}`
    for (let i = 0; i < on_release_from_prison.length; i++) {
      t += `${p(4)}${on_release_from_prison[i]}${ep()}`
    }
    t += `${p(2)}}${ep()}`
    t+= `${p()}}${ep()}`
  }

  if (on_death.length > 0) {
    t += `${p()}on_death = {${ep()}`
    t += `${p(2)}on_actions = {${ep()}`
    t += `${p(4)}delay = { days = ${onActionDelay}}${ep()}`
    t += `${p(4)}GEM_EVENTS_on_death${ep()}`
    t += `${p(2)}}${ep()}`
    t += `${p()}}${ep()}`

    t += `${p()}GEM_EVENTS_on_death = {${ep()}`
    t += `${p(2)}random_events = {${ep()}`
    for (let i = 0; i < on_death.length; i++) {
      t += `${p(4)}${on_death[i]}${ep()}`
    }
    t += `${p(2)}}${ep()}`
    t+= `${p()}}${ep()}`
  }

  if (on_army_enter_province.length > 0) {
    t += `${p()}on_army_enter_province = {${ep()}`
    t += `${p(2)}on_actions = {${ep()}`
    t += `${p(4)}delay = { days = ${onActionDelay}}${ep()}`
    t += `${p(4)}GEM_EVENTS_on_army_enter_province${ep()}`
    t += `${p(2)}}${ep()}`
    t += `${p()}}${ep()}`

    t += `${p()}GEM_EVENTS_on_army_enter_province = {${ep()}`
    t += `${p(2)}random_events = {${ep()}`
    for (let i = 0; i < on_army_enter_province.length; i++) {
      t += `${p(4)}${on_army_enter_province[i]}${ep()}`
    }
    t += `${p(2)}}${ep()}`
    t+= `${p()}}${ep()}`
  }

  if (on_join_court.length > 0) {
    t += `${p()}on_join_court = {${ep()}`
    t += `${p(2)}on_actions = {${ep()}`
    t += `${p(4)}delay = { days = ${onActionDelay}}${ep()}`
    t += `${p(4)}GEM_EVENTS_on_join_court${ep()}`
    t += `${p(2)}}${ep()}`
    t += `${p()}}${ep()}`

    t += `${p()}GEM_EVENTS_on_join_court = {${ep()}`
    t += `${p(2)}random_events = {${ep()}`
    for (let i = 0; i < on_join_court.length; i++) {
      t += `${p(4)}${on_join_court[i]}${ep()}`
    }
    t += `${p(2)}}${ep()}`
    t+= `${p()}}${ep()}`
  }

  if (on_fired_from_council.length > 0) {
    t += `${p()}on_fired_from_council = {${ep()}`
    t += `${p(2)}on_actions = {${ep()}`
    t += `${p(4)}delay = { days = ${onActionDelay}}${ep()}`
    t += `${p(4)}GEM_EVENTS_on_fired_from_council${ep()}`
    t += `${p(2)}}${ep()}`
    t += `${p()}}${ep()}`

    t += `${p()}GEM_EVENTS_on_fired_from_council = {${ep()}`
    t += `${p(2)}random_events = {${ep()}`
    for (let i = 0; i < on_fired_from_council.length; i++) {
      t += `${p(4)}${on_fired_from_council[i]}${ep()}`
    }
    t += `${p(2)}}${ep()}`
    t+= `${p()}}${ep()}`
  }

  if (on_title_gain.length > 0) {
    t += `${p()}on_title_gain = {${ep()}`
    t += `${p(2)}on_actions = {${ep()}`
    t += `${p(4)}delay = { days = ${onActionDelay}}${ep()}`
    t += `${p(4)}GEM_EVENTS_on_title_gain${ep()}`
    t += `${p(2)}}${ep()}`
    t += `${p()}}${ep()}`

    t += `${p()}GEM_EVENTS_on_title_gain = {${ep()}`
    t += `${p(2)}random_events = {${ep()}`
    for (let i = 0; i < on_title_gain.length; i++) {
      t += `${p(4)}${on_title_gain[i]}${ep()}`
    }
    t += `${p(2)}}${ep()}`
    t+= `${p()}}${ep()}`
  }

  if (on_character_culture_change.length > 0) {
    t += `${p()}on_character_culture_change = {${ep()}`
    t += `${p(2)}on_actions = {${ep()}`
    t += `${p(4)}delay = { days = ${onActionDelay}}${ep()}`
    t += `${p(4)}GEM_EVENTS_on_character_culture_change${ep()}`
    t += `${p(2)}}${ep()}`
    t += `${p()}}${ep()}`

    t += `${p()}GEM_EVENTS_on_character_culture_change = {${ep()}`
    t += `${p(2)}random_events = {${ep()}`
    for (let i = 0; i < on_character_culture_change.length; i++) {
      t += `${p(4)}${on_character_culture_change[i]}${ep()}`
    }
    t += `${p(2)}}${ep()}`
    t+= `${p()}}${ep()}`
  }

  if (on_birth_child.length > 0) {
    t += `${p()}on_birth_child = {${ep()}`
    t += `${p(2)}on_actions = {${ep()}`
    t += `${p(4)}delay = { days = ${onActionDelay}}${ep()}`
    t += `${p(4)}GEM_EVENTS_on_birth_child${ep()}`
    t += `${p(2)}}${ep()}`
    t += `${p()}}${ep()}`

    t += `${p()}GEM_EVENTS_on_birth_child = {${ep()}`
    t += `${p(2)}random_events = {${ep()}`
    for (let i = 0; i < on_birth_child.length; i++) {
      t += `${p(4)}${on_birth_child[i]}${ep()}`
    }
    t += `${p(2)}}${ep()}`
    t+= `${p()}}${ep()}`
  }

  if (on_commander_combat_pulse.length > 0) {
    t += `${p()}on_commander_combat_pulse = {${ep()}`
    t += `${p(2)}on_actions = {${ep()}`
    t += `${p(4)}delay = { days = ${onActionDelay}}${ep()}`
    t += `${p(4)}GEM_EVENTS_on_commander_combat_pulse${ep()}`
    t += `${p(2)}}${ep()}`
    t += `${p()}}${ep()}`

    t += `${p()}GEM_EVENTS_on_commander_combat_pulse = {${ep()}`
    t += `${p(2)}random_events = {${ep()}`
    for (let i = 0; i < on_commander_combat_pulse.length; i++) {
      t += `${p(4)}${on_commander_combat_pulse[i]}${ep()}`
    }
    t += `${p(2)}}${ep()}`
    t+= `${p()}}${ep()}`
  }

  if (on_faith_created.length > 0) {
    t += `${p()}on_faith_created = {${ep()}`
    t += `${p(2)}on_actions = {${ep()}`
    t += `${p(4)}delay = { days = ${onActionDelay}}${ep()}`
    t += `${p(4)}GEM_EVENTS_on_faith_created${ep()}`
    t += `${p(2)}}${ep()}`
    t += `${p()}}${ep()}`

    t += `${p()}GEM_EVENTS_on_faith_created = {${ep()}`
    t += `${p(2)}random_events = {${ep()}`
    for (let i = 0; i < on_faith_created.length; i++) {
      t += `${p(4)}${on_faith_created[i]}${ep()}`
    }
    t += `${p(2)}}${ep()}`
    t+= `${p()}}${ep()}`
  }

  if (on_character_faith_change.length > 0) {
    t += `${p()}on_character_faith_change = {${ep()}`
    t += `${p(2)}on_actions = {${ep()}`
    t += `${p(4)}delay = { days = ${onActionDelay}}${ep()}`
    t += `${p(4)}GEM_EVENTS_on_character_faith_change${ep()}`
    t += `${p(2)}}${ep()}`
    t += `${p()}}${ep()}`

    t += `${p()}GEM_EVENTS_on_character_faith_change = {${ep()}`
    t += `${p(2)}random_events = {${ep()}`
    for (let i = 0; i < on_character_faith_change.length; i++) {
      t += `${p(4)}${on_character_faith_change[i]}${ep()}`
    }
    t += `${p(2)}}${ep()}`
    t+= `${p()}}${ep()}`
  }

  if (on_courtier_decided_to_move_to_pool.length > 0) {
    t += `${p()}on_courtier_decided_to_move_to_pool = {${ep()}`
    t += `${p(2)}on_actions = {${ep()}`
    t += `${p(4)}delay = { days = ${onActionDelay}}${ep()}`
    t += `${p(4)}GEM_EVENTS_on_courtier_decided_to_move_to_pool${ep()}`
    t += `${p(2)}}${ep()}`
    t += `${p()}}${ep()}`

    t += `${p()}GEM_EVENTS_on_courtier_decided_to_move_to_pool = {${ep()}`
    t += `${p(2)}random_events = {${ep()}`
    for (let i = 0; i < on_courtier_decided_to_move_to_pool.length; i++) {
      t += `${p(4)}${on_courtier_decided_to_move_to_pool[i]}${ep()}`
    }
    t += `${p(2)}}${ep()}`
    t+= `${p()}}${ep()}`
  }

  if (on_birthday.length > 0) {
    t += `${p()}on_birthday = {${ep()}`
    t += `${p(2)}on_actions = {${ep()}`
    t += `${p(4)}delay = { days = ${onActionDelay}}${ep()}`
    t += `${p(4)}GEM_EVENTS_on_birthday${ep()}`
    t += `${p(2)}}${ep()}`
    t += `${p()}}${ep()}`

    t += `${p()}GEM_EVENTS_on_birthday = {${ep()}`
    t += `${p(2)}random_events = {${ep()}`
    for (let i = 0; i < on_birthday.length; i++) {
      t += `${p(4)}${on_birthday[i]}${ep()}`
    }
    t += `${p(2)}}${ep()}`
    t+= `${p()}}${ep()}`
  }

  if (on_faith_conversion.length > 0) {
    t += `${p()}on_faith_conversion = {${ep()}`
    t += `${p(2)}on_actions = {${ep()}`
    t += `${p(4)}delay = { days = ${onActionDelay}}${ep()}`
    t += `${p(4)}GEM_EVENTS_on_faith_conversion${ep()}`
    t += `${p(2)}}${ep()}`
    t += `${p()}}${ep()}`

    t += `${p()}GEM_EVENTS_on_faith_conversion = {${ep()}`
    t += `${p(2)}random_events = {${ep()}`
    for (let i = 0; i < on_faith_conversion.length; i++) {
      t += `${p(4)}${on_faith_conversion[i]}${ep()}`
    }
    t += `${p(2)}}${ep()}`
    t+= `${p()}}${ep()}`
  }

  if (on_explicit_claim_gain.length > 0) {
    t += `${p()}on_explicit_claim_gain = {${ep()}`
    t += `${p(2)}on_actions = {${ep()}`
    t += `${p(4)}delay = { days = ${onActionDelay}}${ep()}`
    t += `${p(4)}GEM_EVENTS_on_explicit_claim_gain${ep()}`
    t += `${p(2)}}${ep()}`
    t += `${p()}}${ep()}`

    t += `${p()}GEM_EVENTS_on_explicit_claim_gain = {${ep()}`
    t += `${p(2)}random_events = {${ep()}`
    for (let i = 0; i < on_explicit_claim_gain.length; i++) {
      t += `${p(4)}${on_explicit_claim_gain[i]}${ep()}`
    }
    t += `${p(2)}}${ep()}`
    t+= `${p()}}${ep()}`
  }

  if (on_courtier_ready_to_move_to_pool.length > 0) {
    t += `${p()}on_courtier_ready_to_move_to_pool = {${ep()}`
    t += `${p(2)}on_actions = {${ep()}`
    t += `${p(4)}delay = { days = ${onActionDelay}}${ep()}`
    t += `${p(4)}GEM_EVENTS_on_courtier_ready_to_move_to_pool${ep()}`
    t += `${p(2)}}${ep()}`
    t += `${p()}}${ep()}`

    t += `${p()}GEM_EVENTS_on_courtier_ready_to_move_to_pool = {${ep()}`
    t += `${p(2)}random_events = {${ep()}`
    for (let i = 0; i < on_courtier_ready_to_move_to_pool.length; i++) {
      t += `${p(4)}${on_courtier_ready_to_move_to_pool[i]}${ep()}`
    }
    t += `${p(2)}}${ep()}`
    t+= `${p()}}${ep()}`
  }
  if (on_imprison.length > 0) {
    t += `${p()}on_imprison = {${ep()}`
    t += `${p(2)}on_actions = {${ep()}`
    t += `${p(4)}delay = { days = ${onActionDelay}}${ep()}`
    t += `${p(4)}GEM_EVENTS_on_imprison${ep()}`
    t += `${p(2)}}${ep()}`
    t += `${p()}}${ep()}`

    t += `${p()}GEM_EVENTS_on_imprison = {${ep()}`
    t += `${p(2)}random_events = {${ep()}`
    for (let i = 0; i < on_imprison.length; i++) {
      t += `${p(4)}${on_imprison[i]}${ep()}`
    }
    t += `${p(2)}}${ep()}`
    t+= `${p()}}${ep()}`
  }

  if (on_birth_mother.length > 0) {
    t += `${p()}on_birth_mother = {${ep()}`
    t += `${p(2)}on_actions = {${ep()}`
    t += `${p(4)}delay = { days = ${onActionDelay}}${ep()}`
    t += `${p(4)}GEM_EVENTS_on_birth_mother${ep()}`
    t += `${p(2)}}${ep()}`
    t += `${p()}}${ep()}`

    t += `${p()}GEM_EVENTS_on_birth_mother = {${ep()}`
    t += `${p(2)}random_events = {${ep()}`
    for (let i = 0; i < on_birth_mother.length; i++) {
      t += `${p(4)}${on_birth_mother[i]}${ep()}`
    }
    t += `${p(2)}}${ep()}`
    t+= `${p()}}${ep()}`
  }

  if (on_join_war_as_secondary.length > 0) {
    t += `${p()}on_join_war_as_secondary = {${ep()}`
    t += `${p(2)}on_actions = {${ep()}`
    t += `${p(4)}delay = { days = ${onActionDelay}}${ep()}`
    t += `${p(4)}GEM_EVENTS_on_join_war_as_secondary${ep()}`
    t += `${p(2)}}${ep()}`
    t += `${p()}}${ep()}`

    t += `${p()}GEM_EVENTS_on_join_war_as_secondary = {${ep()}`
    t += `${p(2)}random_events = {${ep()}`
    for (let i = 0; i < on_join_war_as_secondary.length; i++) {
      t += `${p(4)}${on_join_war_as_secondary[i]}${ep()}`
    }
    t += `${p(2)}}${ep()}`
    t+= `${p()}}${ep()}`
  }

  if (on_explicit_claim_lost.length > 0) {
    t += `${p()}on_explicit_claim_lost = {${ep()}`
    t += `${p(2)}on_actions = {${ep()}`
    t += `${p(4)}delay = { days = ${onActionDelay}}${ep()}`
    t += `${p(4)}GEM_EVENTS_on_explicit_claim_lost${ep()}`
    t += `${p(2)}}${ep()}`
    t += `${p()}}${ep()}`

    t += `${p()}GEM_EVENTS_on_explicit_claim_lost = {${ep()}`
    t += `${p(2)}random_events = {${ep()}`
    for (let i = 0; i < on_explicit_claim_lost.length; i++) {
      t += `${p(4)}${on_explicit_claim_lost[i]}${ep()}`
    }
    t += `${p(2)}}${ep()}`
    t+= `${p()}}${ep()}`
  }

  if (on_leave_council.length > 0) {
    t += `${p()}on_leave_council = {${ep()}`
    t += `${p(2)}on_actions = {${ep()}`
    t += `${p(4)}delay = { days = ${onActionDelay}}${ep()}`
    t += `${p(4)}GEM_EVENTS_on_leave_council${ep()}`
    t += `${p(2)}}${ep()}`
    t += `${p()}}${ep()}`

    t += `${p()}GEM_EVENTS_on_leave_council = {${ep()}`
    t += `${p(2)}random_events = {${ep()}`
    for (let i = 0; i < on_leave_council.length; i++) {
      t += `${p(4)}${on_leave_council[i]}${ep()}`
    }
    t += `${p(2)}}${ep()}`
    t+= `${p()}}${ep()}`
  }

  if (on_marriage.length > 0) {
    t += `${p()}on_marriage = {${ep()}`
    t += `${p(2)}on_actions = {${ep()}`
    t += `${p(4)}delay = { days = ${onActionDelay}}${ep()}`
    t += `${p(4)}GEM_EVENTS_on_marriage${ep()}`
    t += `${p(2)}}${ep()}`
    t += `${p()}}${ep()}`

    t += `${p()}GEM_EVENTS_on_marriage = {${ep()}`
    t += `${p(2)}random_events = {${ep()}`
    for (let i = 0; i < on_marriage.length; i++) {
      t += `${p(4)}${on_marriage[i]}${ep()}`
    }
    t += `${p(2)}}${ep()}`
    t+= `${p()}}${ep()}`
  }

  if (on_great_holy_war_recipient_replaced.length > 0) {
    t += `${p()}on_great_holy_war_recipient_replaced = {${ep()}`
    t += `${p(2)}on_actions = {${ep()}`
    t += `${p(4)}delay = { days = ${onActionDelay}}${ep()}`
    t += `${p(4)}GEM_EVENTS_on_great_holy_war_recipient_replaced${ep()}`
    t += `${p(2)}}${ep()}`
    t += `${p()}}${ep()}`

    t += `${p()}GEM_EVENTS_on_great_holy_war_recipient_replaced = {${ep()}`
    t += `${p(2)}random_events = {${ep()}`
    for (let i = 0; i < on_great_holy_war_recipient_replaced.length; i++) {
      t += `${p(4)}${on_great_holy_war_recipient_replaced[i]}${ep()}`
    }
    t += `${p(2)}}${ep()}`
    t+= `${p()}}${ep()}`
  }
  for (let i = 0; i < oaa.length; i++) {
    t += `${p()}${oaa[i].name} = {${ep()}`
    t += `${p(2)}random_events = {${ep()}`
    for (let j = 0; j < oaa[i].eventList.length; j++) {
      let num = normalizeNumber(oaa[i].eventList[j])
      t += `${p(4)}100 = ${namespace}.${num}${ep()}`
    }
    t += `${p(2)}}${ep()}`
    t += `${p()}}${ep()}`
  }
  let othert = t;
  othert = othert.replace(/\&nbsp/gi, " ")
  othert = othert.replace(/\<\/br\>/gi, "\n")
  var data = new Blob([othert], {type: 'text/plain'})
  var url = window.URL.createObjectURL(data);
  let link = `<a id="on-action-download-link" download="${namespace}_on_action.txt" href="">Download as Text File</a></br></br>`
  GID("on-action-box").innerHTML = `${link}<br>${t}`;
  document.getElementById('on-action-download-link').href = url
}

function showFileCode(el) {

  for (let i = 0; i < globalFileList.length; i++) {
    let t = "";
    let currentIndent = 0;
    let currentArr = globalFileList[i].code.split(/\n|<\/br>/);
    for (let n = 0; n < currentArr.length; n++) {
      currentArr[n] = currentArr[n].replace(/^\s+/, "")
      if (currentArr[n].includes("{")) {
        t += `${p(currentIndent)}${currentArr[n]}${ep()}`;
        currentIndent += 1;
      } else if (currentArr[n].includes("}")) {
        currentIndent -= 1;
        t += `${p(currentIndent)}${currentArr[n]}${ep()}`;
      } else {
        t += `${p(currentIndent)}${currentArr[n]}${ep()}`;
      }
    }
    if (t.length === 0) {
      t = globalFileList[i].code;
    }

    t = t.replace(/\<\/br\>/gi, "\n")
    t = t.replace(/\&nbsp/gi, " ")
    var data = new Blob([t], {type: 'text/plain'})
    var url = window.URL.createObjectURL(data);
    let link = `<a id="${globalFileList[i].fileName}-download-link" download="${globalFileList[i].fileName}.txt" href="">Download ${globalFileList[i].fileName} as Text File</a></br></br>`
    el.innerHTML += `${link}<br>`;
    document.getElementById(`${globalFileList[i].fileName}-download-link`).href = url
  }
}
//end on actions

GID("event-code-button").onclick = function() {
  let t = "";
  for (let i = 0; i < eventCodeArr.length; i++) {
    t += eventCodeArr[i];
  }
  GID("code-box").style.display = "block";
  GID("code-box").innerHTML = "";
  GID("code-box").innerHTML += `<a id="code-download-link" download="${namespace}_events.txt" href="">Download Event Code as Text File</a></br></br>`
  showFileCode(GID("code-box"))
  GID("code-box").innerHTML += `${t}`;
  GID("bars").style.display = "none";
  GID("localization-box").style.display = "none";
  GID("json-placeholder").style.display = "none";
  GID("on-action-box").style.display = "none";
  GID("generator-settings-box").style.display = "none";
  t = t.replace(/\&nbsp/gi, " ")
  t = t.replace(/\<\/br\>/gi, "\n")
  var data = new Blob([t], {type: 'text/plain'})
  var url = window.URL.createObjectURL(data);
  document.getElementById('code-download-link').href = url
}

GID("creator-button").onclick = function() {
  GID("code-box").style.display = "none";
  GID("bars").style.display = "grid";
  GID("localization-box").style.display = "none";
  GID("json-placeholder").style.display = "none";
  GID("on-action-box").style.display = "none";
  GID("generator-settings-box").style.display = "none";
}

GID("generator-settings-button").onclick = function() {
  GID("code-box").style.display = "none";
  GID("bars").style.display = "none";
  GID("localization-box").style.display = "none";
  GID("json-placeholder").style.display = "none";
  GID("on-action-box").style.display = "none";
  GID("generator-settings-box").style.display = "block";
}


GID("event-localization-button").onclick = function() {
  GID("bars").style.display = "none";
  let t = "";

  for (let i = 0; i < eventLocalizationArr.length; i++) {
    if (i === 0) {
      t += `${p(0)}l_english:${ep()}`
    }
    t += eventLocalizationArr[i];
  }
  GID("bars").style.display = "none";
  GID("localization-box").style.display = "block";
  GID("code-box").style.display = "none";
  GID("json-placeholder").style.display = "none";
  GID("on-action-box").style.display = "none";
  GID("generator-settings-box").style.display = "none";
  GID("localization-box").innerHTML = `<a id="localization-download-link" download="${namespace}_l_english.yml" href="">Download as YML File</a></br></br>${t}`
  t = `\ufeff${t}` //ensures UTF-8-BOM encoding of YML
  t = t.replace(/\&nbsp/gi, " ")
  t = t.replace(/\<\/br\>/gi, "\n")
  var data = new Blob([t], {type: 'text/yml'})
  var url = window.URL.createObjectURL(data);
  document.getElementById('localization-download-link').href = url

}

GID("export-grid-to-JSON-button").onclick = function() {
  let j = JSON.stringify(currentGrid());
  GID("json-placeholder").innerHTML = j;
  GID("json-placeholder").style.display = "block";
  GID("bars").style.display = "none";
  GID("localization-box").style.display = "none";
  GID("code-box").style.display = "none";
  GID("on-action-box").style.display = "none";
  GID("generator-settings-box").style.display = "none";

  //BELOW ALLOWS WHOLE GENERATOR TO BE EXPORTED - see which one we like better or do both
  /*
  let j = JSON.stringify(generator);
  GID("json-placeholder").innerHTML = j;
  GID("json-placeholder").style.display = "block";
  GID("bars").style.display = "none";
  GID("localization-box").style.display = "none";
  GID("code-box").style.display = "none";
  GID("on-action-box").style.display = "none";
  GID("generator-settings-box").style.display = "none";
  */
}

GID("generate-button").onclick = function() {
  let num = prompt("How many events?")
  runGenerationMachine(num);
  GID("json-placeholder").innerHTML = JSON.stringify(generator);
  GID("json-placeholder").style.display = "none";
  let t = "";
  for (let i = 0; i < eventCodeArr.length; i++) {
    t += eventCodeArr[i];
  }
  GID("code-box").innerHTML = t;
}

GID("save-generator-settings").onclick = function() {
  namespace = GID("namespace-entry").value;
  onActionDelay = GID("on-action-delay-entry").value;
}


//needs to work on each text area
document.querySelector("textarea").addEventListener('keydown',function(e) {
    if(e.keyCode === 9) { // tab was pressed
        // get caret position/selection
        var start = this.selectionStart;
        var end = this.selectionEnd;

        var target = e.target;
        var value = target.value;

        // set textarea value to: text before caret + tab + text after caret
        target.value = value.substring(0, start)
                    + `  `
                    + value.substring(end);

        // put caret at right position again (add one for the tab)
        this.selectionStart = this.selectionEnd = start + 1;

        // prevent the focus lose
        e.preventDefault();
    }
},false);
