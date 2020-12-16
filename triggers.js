function parseTriggers(triggerWiki) {
  let arr = triggerWiki.split(`\n`);
  let triggersArr = [];
  let eating = false;
  let n = 0;
  let o = {};
  let objs = [];
  let next = {};
  for (let i = 0 ; i < arr.length; i++) {
    if (n === 0) {
      objs.push({})
    }
    if (arr[i].includes("<p>")) {
      arr[i] = arr[i].replace("<p>", "");
    }
    if (arr[i].includes("</p>")) {
      arr[i] = arr[i].replace("</p>", "");
    }
    if (arr[i].includes("<tr>")) {
      arr[i] = arr[i].replace("<tr>", "")
    }
    if (arr[i].includes("<td>")) {
      arr[i] = arr[i].replace("<td>", "")
      arr[i] = arr[i].replace("<td>", "")
      if (n === 0) {
        objs[objs.length - 1].name = arr[i]
      } else if (n === 1) {
        objs[objs.length - 1].description = arr[i]
      } else if (n === 2) {
        objs[objs.length - 1].usage = arr[i]
      } else if (n === 3) {
        objs[objs.length - 1].traits = arr[i]
      } else if (n === 4) {
        objs[objs.length - 1].supportedScopes = arr[i]
      } else if (n === 5) {
        objs[objs.length - 1].supportedTargets = arr[i]
      }
      n += 1;
    }

    if (arr[i].includes("</tr>")) {
      arr[i] = arr[i].replace("</tr>", "")
      n = 0;
      if (objs[objs.length - 1].name.includes("any")) {

      } else {
        triggersArr.push(objs[objs.length - 1]);
      }

    }
  }
  triggersArr.sort((a, b) => (a.name > b.name) ? 1 : -1)
  let t = ""
  for (let i = 0; i < triggersArr.length; i++) {
      t += `
      <div class="component-edit-input tooltip">
        <div class="scope-trigger-edit-input-label">
          ${triggersArr[i].name}
        </div>

        <div class="component-edit-input-label">
          <span class="tooltiptext">${triggersArr[i].description}\n\nUsage:\n\n${triggersArr[i].usage}\n\nSupported Scopes:\n\n${triggersArr[i].supportedScopes}\n\nSupported Targets:\n\n${triggersArr[i].supportedTargets}</span>
          <input class="component-option" name="scope_trigger_${triggersArr[i].name}" id="scope_trigger_${triggersArr[i].name}" placeholder="${triggersArr[i].traits}">
        </div>
      </div>
      <hr>
      `
  }
  document.getElementById("trigger-input-list").innerHTML = t;
  /*
  t += "</select></div>"
  */
  let st = "";
  for (let i = 0; i < triggersArr.length; i++) {
    st += `
    <div class="component-edit-input tooltip">
      <div class="scope-trigger-edit-input-label">
        ${triggersArr[i].name}
      </div>

      <div class="component-edit-input-label">
        <span class="tooltiptext">${triggersArr[i].description}\n\nUsage:\n\n${triggersArr[i].usage}\n\nSupported Scopes:\n\n${triggersArr[i].supportedScopes}\n\nSupported Targets:\n\n${triggersArr[i].supportedTargets}</span>
        <input class="scope-trigger-selection" name="scope_trigger_${triggersArr[i].name}" id="scope_trigger_${triggersArr[i].name}" placeholder="${triggersArr[i].traits}">
      </div>
    </div>
    <hr>
    `
  }
  document.getElementById("scope-triggers-inner-box").innerHTML = st;

  return triggersArr;
}


let triggerT = `
<tr>
<td>any_dynasty_member
</td>
<td>Iterate through all dynasty members
</td>
<td>any_dynasty_member = { &lt;count=num/all&gt; / &lt;percent=fixed_point&gt; &lt;triggers&gt; }
</td>
<td>
</td>
<td>dynasty
</td>
<td>character
</td></tr>
<tr>
<td>blood_legacy_track_perks
</td>
<td>How many legacies in the Blood legacy track does this dynasty have?
</td>
<td>
</td>
<td>&lt;, &lt;=, =,&#160;!=, &gt;, &gt;=
</td>
<td>dynasty
</td>
<td>
</td></tr>
<tr>
<td>dynasty_can_unlock_relevant_perk
</td>
<td>Can the scoped dynasty unlock a 'relevant' legacy? Relevant meaning one that isn't the first in its track unless the dynasty has no partially filled tracks
</td>
<td>
</td>
<td>yes/no
</td>
<td>dynasty
</td>
<td>
</td></tr>
<tr>
<td>dynasty_prestige
</td>
<td>Does the dynasty have the required prestige?
</td>
<td>
</td>
<td>&lt;, &lt;=, =,&#160;!=, &gt;, &gt;=
</td>
<td>dynasty
</td>
<td>
</td></tr>
<tr>
<td>dynasty_prestige_level
</td>
<td>Does the dynasty have the required level of splendor?
</td>
<td>
</td>
<td>&lt;, &lt;=, =,&#160;!=, &gt;, &gt;=
</td>
<td>dynasty
</td>
<td>
</td></tr>
<tr>
<td>erudition_legacy_track_perks
</td>
<td>How many legacies in the Erudition legacy track does this dynasty have?
</td>
<td>
</td>
<td>&lt;, &lt;=, =,&#160;!=, &gt;, &gt;=
</td>
<td>dynasty
</td>
<td>
</td></tr>
<tr>
<td>glory_legacy_track_perks
</td>
<td>How many legacies in the Glory legacy track does this dynasty have?
</td>
<td>
</td>
<td>&lt;, &lt;=, =,&#160;!=, &gt;, &gt;=
</td>
<td>dynasty
</td>
<td>
</td></tr>
<tr>
<td>guile_legacy_track_perks
</td>
<td>How many legacies in the Guile legacy track does this dynasty have?
</td>
<td>
</td>
<td>&lt;, &lt;=, =,&#160;!=, &gt;, &gt;=
</td>
<td>dynasty
</td>
<td>
</td></tr>
<tr>
<td>has_dynasty_modifier
</td>
<td>Does the scoped dynasty have a given modifier?
</td>
<td>has_dynasty_modifier = name
</td>
<td>
</td>
<td>dynasty
</td>
<td>
</td></tr>
<tr>
<td>has_dynasty_modifier_duration_remaining
</td>
<td>Does the scoped dynasty have the duration remaining on a given modifier?
</td>
<td>has_dynasty_modifier_duration_remaining = name
</td>
<td>
</td>
<td>dynasty
</td>
<td>
</td></tr>
<tr>
<td>has_dynasty_perk
</td>
<td>Does the dynasty have this legacy?
</td>
<td>has_dynasty_perk = key
</td>
<td>
</td>
<td>dynasty
</td>
<td>
</td></tr>
<tr>
<td>kin_legacy_track_perks
</td>
<td>How many legacies in the Kin legacy track does this dynasty have?
</td>
<td>
</td>
<td>&lt;, &lt;=, =,&#160;!=, &gt;, &gt;=
</td>
<td>dynasty
</td>
<td>
</td></tr>
<tr>
<td>law_legacy_track_perks
</td>
<td>How many legacies in the Law legacy track does this dynasty have?
</td>
<td>
</td>
<td>&lt;, &lt;=, =,&#160;!=, &gt;, &gt;=
</td>
<td>dynasty
</td>
<td>
</td></tr>
<tr>
<td>warfare_legacy_track_perks
</td>
<td>How many legacies in the Warfare legacy track does this dynasty have?
</td>
<td>
</td>
<td>&lt;, &lt;=, =,&#160;!=, &gt;, &gt;=
</td>
<td>dynasty
</td>
<td>
</td></tr>
<tr>
<td>compare_value
</td>
<td>Compare the scoped value.
</td>
<td>var:variable_name = { compare_value &lt; 4 }
</td>
<td>&lt;, &lt;=, =,&#160;!=, &gt;, &gt;=
</td>
<td>value
</td>
<td>
</td></tr>
<tr>
<td>any_house_member
</td>
<td>Iterate through all house members
</td>
<td>any_house_member = { &lt;count=num/all&gt; / &lt;percent=fixed_point&gt; &lt;triggers&gt; }
</td>
<td>
</td>
<td>dynasty house
</td>
<td>character
</td></tr>
<tr>
<td>has_house_modifier
</td>
<td>Does the scoped house have a given modifier?
</td>
<td>has_house_modifier = name
</td>
<td>
</td>
<td>dynasty house
</td>
<td>
</td></tr>
<tr>
<td>has_house_modifier_duration_remaining
</td>
<td>Does the scoped house have the duration remaining on a given modifier?
</td>
<td>has_house_modifier_duration_remaining = name
</td>
<td>
</td>
<td>dynasty house
</td>
<td>
</td></tr>
<tr>
<td>any_faith
</td>
<td>Iterate through all faiths within a religion
</td>
<td>any_faith = { &lt;count=num/all&gt; / &lt;percent=fixed_point&gt; &lt;triggers&gt; }
</td>
<td>
</td>
<td>religion
</td>
<td>faith
</td></tr>
<tr>
<td>is_in_family
</td>
<td>Is the scoped faith in a given religious family?
</td>
<td>is_in_family = rf_abrahamic
</td>
<td>
</td>
<td>religion
</td>
<td>
</td></tr>
<tr>
<td>any_scheme_agent
</td>
<td>Iterate through all agents in the scheme
</td>
<td>any_scheme_agent = { &lt;count=num/all&gt; / &lt;percent=fixed_point&gt; &lt;triggers&gt; }
</td>
<td>
</td>
<td>scheme
</td>
<td>character
</td></tr>
<tr>
<td>has_scheme_modifier
</td>
<td>Is the scheme currently affected by the specified modifier?
</td>
<td>has_scheme_modifier = X
</td>
<td>
</td>
<td>scheme
</td>
<td>
</td></tr>
<tr>
<td>is_hostile
</td>
<td>Is the scoped scheme a hostile scheme?
</td>
<td>is_hostile = bool
</td>
<td>yes/no
</td>
<td>scheme
</td>
<td>
</td></tr>
<tr>
<td>is_scheme_agent_exposed
</td>
<td>Is the target character an exposed agent in the scope scheme?
</td>
<td>
</td>
<td>character target
</td>
<td>scheme
</td>
<td>
</td></tr>
<tr>
<td>is_scheme_exposed
</td>
<td>Is the scheme exposed?
</td>
<td>
</td>
<td>yes/no
</td>
<td>scheme
</td>
<td>
</td></tr>
<tr>
<td>scheme_duration_days
</td>
<td>The number of days since the scheme was started
</td>
<td>
</td>
<td>&lt;, &lt;=, =,&#160;!=, &gt;, &gt;=
</td>
<td>scheme
</td>
<td>
</td></tr>
<tr>
<td>scheme_is_character_agent
</td>
<td>Is the target character part of this scheme?
</td>
<td>
</td>
<td>character target
</td>
<td>scheme
</td>
<td>
</td></tr>
<tr>
<td>scheme_monthly_progress
</td>
<td>Monthly scheme progress in&#160;% (i.e. 50 equals 50%)
</td>
<td>
</td>
<td>&lt;, &lt;=, =,&#160;!=, &gt;, &gt;=
</td>
<td>scheme
</td>
<td>
</td></tr>
<tr>
<td>scheme_number_of_agents
</td>
<td>The number of agents in a scheme
</td>
<td>
</td>
<td>&lt;, &lt;=, =,&#160;!=, &gt;, &gt;=
</td>
<td>scheme
</td>
<td>
</td></tr>
<tr>
<td>scheme_number_of_exposed_agents
</td>
<td>The number of exposed agents in a scheme
</td>
<td>
</td>
<td>&lt;, &lt;=, =,&#160;!=, &gt;, &gt;=
</td>
<td>scheme
</td>
<td>
</td></tr>
<tr>
<td>scheme_power
</td>
<td>Scheme power
</td>
<td>
</td>
<td>&lt;, &lt;=, =,&#160;!=, &gt;, &gt;=
</td>
<td>scheme
</td>
<td>
</td></tr>
<tr>
<td>scheme_power_resistance_difference
</td>
<td>Scheme power minus scheme resistance
</td>
<td>
</td>
<td>&lt;, &lt;=, =,&#160;!=, &gt;, &gt;=
</td>
<td>scheme
</td>
<td>
</td></tr>
<tr>
<td>scheme_power_resistance_ratio
</td>
<td>Scheme power/resistance ratio. Set to ±10000 if resistance is zero and power is positive/negative (0 if both power and resistance are 0)
</td>
<td>
</td>
<td>&lt;, &lt;=, =,&#160;!=, &gt;, &gt;=
</td>
<td>scheme
</td>
<td>
</td></tr>
<tr>
<td>scheme_progress
</td>
<td>Scheme progress (0 - 10 (defined))
</td>
<td>
</td>
<td>&lt;, &lt;=, =,&#160;!=, &gt;, &gt;=
</td>
<td>scheme
</td>
<td>
</td></tr>
<tr>
<td>scheme_resistance
</td>
<td>Scheme resistance
</td>
<td>
</td>
<td>&lt;, &lt;=, =,&#160;!=, &gt;, &gt;=
</td>
<td>scheme
</td>
<td>
</td></tr>
<tr>
<td>scheme_secrecy
</td>
<td>Scheme secrecy
</td>
<td>
</td>
<td>&lt;, &lt;=, =,&#160;!=, &gt;, &gt;=
</td>
<td>scheme
</td>
<td>
</td></tr>
<tr>
<td>scheme_skill
</td>
<td>Is the scheme currently affected by the specified modifier?
</td>
<td>has_scheme_modifier = X
</td>
<td>
</td>
<td>scheme
</td>
<td>
</td></tr>
<tr>
<td>scheme_success_chance
</td>
<td>Scheme success chance
</td>
<td>
</td>
<td>&lt;, &lt;=, =,&#160;!=, &gt;, &gt;=
</td>
<td>scheme
</td>
<td>
</td></tr>
<tr>
<td>scheme_type
</td>
<td>Is the scheme of the specified type?
</td>
<td>scheme_type = X
</td>
<td>
</td>
<td>scheme
</td>
<td>
</td></tr>
<tr>
<td>active_de_jure_drift_progress
</td>
<td>
</td>
<td>task_current_value = scope:county.active_de_jure_drift_progress
</td>
<td>&lt;, &lt;=, =,&#160;!=, &gt;, &gt;=
</td>
<td>landed title
</td>
<td>
</td></tr>
<tr>
<td>any_claimant
</td>
<td>Iterate through all claimants to title. parameters: explicit = yes/no/all - default yes
</td>
<td>any_claimant = { &lt;count=num/all&gt; / &lt;percent=fixed_point&gt; &lt;triggers&gt; }
</td>
<td>
</td>
<td>landed title
</td>
<td>character
</td></tr>
<tr>
<td>any_connected_county
</td>
<td>Iterate through all counties connected to this one. Is based on top liege
</td>
<td>any/every/whatever_connected_county = {
<p>	max_naval_distance = 500
	allow_one_county_land_gap = yes
any_connected_county = { &lt;count=num/all&gt; / &lt;percent=fixed_point&gt; &lt;triggers&gt; }
</p>
</td>
<td>
</td>
<td>landed title
</td>
<td>landed title
</td></tr>
<tr>
<td>any_county_province
</td>
<td>Iterate through all baronies in a county
</td>
<td>any_county_province = { &lt;count=num/all&gt; / &lt;percent=fixed_point&gt; &lt;triggers&gt; }
</td>
<td>
</td>
<td>landed title
</td>
<td>province
</td></tr>
<tr>
<td>any_de_jure_county_holder
</td>
<td>Iterate through all characters directly holding counties within this de jure title
</td>
<td>any_de_jure_county_holder = { &lt;count=num/all&gt; / &lt;percent=fixed_point&gt; &lt;triggers&gt; }
</td>
<td>
</td>
<td>landed title
</td>
<td>character
</td></tr>
<tr>
<td>any_de_jure_top_liege
</td>
<td>Iterate through all top lieges of the counts within this de jure title
</td>
<td>any_de_jure_top_liege = { &lt;count=num/all&gt; / &lt;percent=fixed_point&gt; &lt;triggers&gt; }
</td>
<td>
</td>
<td>landed title
</td>
<td>character
</td></tr>
<tr>
<td>any_dejure_vassal_title_holder
</td>
<td>Iterate through all the vassal holders of the title
</td>
<td>any_dejure_vassal_title_holder = { &lt;count=num/all&gt; / &lt;percent=fixed_point&gt; &lt;triggers&gt; }
</td>
<td>
</td>
<td>landed title
</td>
<td>character
</td></tr>
<tr>
<td>any_election_candidate
</td>
<td>Iterate through all characters who are valid candidates in an election for a title
</td>
<td>any_election_candidate = { &lt;count=num/all&gt; / &lt;percent=fixed_point&gt; &lt;triggers&gt; }
</td>
<td>
</td>
<td>landed title
</td>
<td>character
</td></tr>
<tr>
<td>any_elector
</td>
<td>Iterate through all characters who are valid electors in an election for a title
</td>
<td>any_elector = { &lt;count=num/all&gt; / &lt;percent=fixed_point&gt; &lt;triggers&gt; }
</td>
<td>
</td>
<td>landed title
</td>
<td>character
</td></tr>
<tr>
<td>any_in_de_facto_hierarchy
</td>
<td>Iterate through the title itself, all de facto vassals, and below. The continue trigger specifies whether to recursively iterate through the vassal's vassals
</td>
<td>continue is unrelated to the limit; if the limit is met it is added to the list, but its vassals will get checked even if the limit isn't met as long as the 'continue' trigger is
<p>..._de_jure_vassal_and_below = { continue = { conditions } }
any_in_de_facto_hierarchy = { &lt;count=num/all&gt; / &lt;percent=fixed_point&gt; &lt;triggers&gt; }
</p>
</td>
<td>
</td>
<td>landed title
</td>
<td>landed title
</td></tr>
<tr>
<td>any_in_de_jure_hierarchy
</td>
<td>Iterate through the title itself, all de jure vassals, and below. The continue trigger specifies whether to recursively iterate through the vassal's vassal
</td>
<td>This is unrelated to the limit; if the limit is met it is added to the list, but its vassals will get checked even if the limit isn't met as long as the 'continue' trigger is
<p>..._de_jure_vassal_and_below = { continue = { conditions } }
any_in_de_jure_hierarchy = { &lt;count=num/all&gt; / &lt;percent=fixed_point&gt; &lt;triggers&gt; }
</p>
</td>
<td>
</td>
<td>landed title
</td>
<td>landed title
</td></tr>
<tr>
<td>any_neighboring_county
</td>
<td>Iterate through all neighboring counties. Can only be used in county scope
</td>
<td>any_neighboring_county = { &lt;count=num/all&gt; / &lt;percent=fixed_point&gt; &lt;triggers&gt; }
</td>
<td>
</td>
<td>landed title
</td>
<td>landed title
</td></tr>
<tr>
<td>any_this_title_or_de_jure_above
</td>
<td>Iterate through this title and all its de jure liege titles
</td>
<td>any_this_title_or_de_jure_above = { &lt;count=num/all&gt; / &lt;percent=fixed_point&gt; &lt;triggers&gt; }
</td>
<td>
</td>
<td>landed title
</td>
<td>landed title
</td></tr>
<tr>
<td>any_title_heir
</td>
<td>Line of succession for the scoped title
</td>
<td>any_title_heir = { &lt;count=num/all&gt; / &lt;percent=fixed_point&gt; &lt;triggers&gt; }
</td>
<td>
</td>
<td>landed title
</td>
<td>character
</td></tr>
<tr>
<td>any_title_joined_faction
</td>
<td>Iterate through all factions joined the scope landed title
</td>
<td>any_title_joined_faction = { &lt;count=num/all&gt; / &lt;percent=fixed_point&gt; &lt;triggers&gt; }
</td>
<td>
</td>
<td>landed title
</td>
<td>faction
</td></tr>
<tr>
<td>any_title_to_title_neighboring_and_across_water_barony
</td>
<td>Scopes from a title to a neighboring barony (incl. across water, looking through the de jure lieges)
</td>
<td>any_title_to_title_neighboring_and_across_water_barony = { &lt;count=num/all&gt; / &lt;percent=fixed_point&gt; &lt;triggers&gt; }
</td>
<td>
</td>
<td>landed title
</td>
<td>landed title
</td></tr>
<tr>
<td>any_title_to_title_neighboring_and_across_water_county
</td>
<td>Scopes from a title to a neighboring county (incl. across water, looking through the de jure lieges)
</td>
<td>any_title_to_title_neighboring_and_across_water_county = { &lt;count=num/all&gt; / &lt;percent=fixed_point&gt; &lt;triggers&gt; }
</td>
<td>
</td>
<td>landed title
</td>
<td>landed title
</td></tr>
<tr>
<td>any_title_to_title_neighboring_and_across_water_duchy
</td>
<td>Scopes from a title to a neighboring duchy (incl. across water, looking through the de jure lieges)
</td>
<td>any_title_to_title_neighboring_and_across_water_duchy = { &lt;count=num/all&gt; / &lt;percent=fixed_point&gt; &lt;triggers&gt; }
</td>
<td>
</td>
<td>landed title
</td>
<td>landed title
</td></tr>
<tr>
<td>any_title_to_title_neighboring_and_across_water_empire
</td>
<td>Scopes from a title to a neighboring empire (incl. across water, looking through the de jure lieges)
</td>
<td>any_title_to_title_neighboring_and_across_water_empire = { &lt;count=num/all&gt; / &lt;percent=fixed_point&gt; &lt;triggers&gt; }
</td>
<td>
</td>
<td>landed title
</td>
<td>landed title
</td></tr>
<tr>
<td>any_title_to_title_neighboring_and_across_water_kingdom
</td>
<td>Scopes from a title to a neighboring kingdom (incl. across water, looking through the de jure lieges)
</td>
<td>any_title_to_title_neighboring_and_across_water_kingdom = { &lt;count=num/all&gt; / &lt;percent=fixed_point&gt; &lt;triggers&gt; }
</td>
<td>
</td>
<td>landed title
</td>
<td>landed title
</td></tr>
<tr>
<td>any_title_to_title_neighboring_barony
</td>
<td>Scopes from a title to a neighboring barony (looking through the de jure lieges)
</td>
<td>any_title_to_title_neighboring_barony = { &lt;count=num/all&gt; / &lt;percent=fixed_point&gt; &lt;triggers&gt; }
</td>
<td>
</td>
<td>landed title
</td>
<td>landed title
</td></tr>
<tr>
<td>any_title_to_title_neighboring_county
</td>
<td>Scopes from a title to a neighboring county (looking through the de jure lieges)
</td>
<td>any_title_to_title_neighboring_county = { &lt;count=num/all&gt; / &lt;percent=fixed_point&gt; &lt;triggers&gt; }
</td>
<td>
</td>
<td>landed title
</td>
<td>landed title
</td></tr>
<tr>
<td>any_title_to_title_neighboring_duchy
</td>
<td>Scopes from a title to a neighboring duchy (looking through the de jure lieges)
</td>
<td>any_title_to_title_neighboring_duchy = { &lt;count=num/all&gt; / &lt;percent=fixed_point&gt; &lt;triggers&gt; }
</td>
<td>
</td>
<td>landed title
</td>
<td>landed title
</td></tr>
<tr>
<td>any_title_to_title_neighboring_empire
</td>
<td>Scopes from a title to a neighboring empire (looking through the de jure lieges)
</td>
<td>any_title_to_title_neighboring_empire = { &lt;count=num/all&gt; / &lt;percent=fixed_point&gt; &lt;triggers&gt; }
</td>
<td>
</td>
<td>landed title
</td>
<td>landed title
</td></tr>
<tr>
<td>any_title_to_title_neighboring_kingdom
</td>
<td>Scopes from a title to a neighboring kingdom (looking through the de jure lieges)
</td>
<td>any_title_to_title_neighboring_kingdom = { &lt;count=num/all&gt; / &lt;percent=fixed_point&gt; &lt;triggers&gt; }
</td>
<td>
</td>
<td>landed title
</td>
<td>landed title
</td></tr>
<tr>
<td>can_be_leased_out
</td>
<td>Can the scoped title be leased out?
</td>
<td>
</td>
<td>yes/no
</td>
<td>landed title
</td>
<td>
</td></tr>
<tr>
<td>can_title_create_faction
</td>
<td>Can the title create the faction of the specified type against the specified character?
</td>
<td>can_title_create_faction = { type = X target = Y }
</td>
<td>
</td>
<td>landed title
</td>
<td>
</td></tr>
<tr>
<td>can_title_join_faction
</td>
<td>Can the the scoped title join the faction?
</td>
<td>can_title_join_faction = faction
</td>
<td>
</td>
<td>landed title
</td>
<td>
</td></tr>
<tr>
<td>county_control
</td>
<td>Does the county title have the required county control?
</td>
<td>
</td>
<td>&lt;, &lt;=, =,&#160;!=, &gt;, &gt;=
</td>
<td>landed title
</td>
<td>
</td></tr>
<tr>
<td>county_control_rate
</td>
<td>How much county control is the county gaining each month?
</td>
<td>
</td>
<td>&lt;, &lt;=, =,&#160;!=, &gt;, &gt;=
</td>
<td>landed title
</td>
<td>
</td></tr>
<tr>
<td>county_control_rate_modifier
</td>
<td>What's the multiplier to the control gain rate? E.g., if there's just a +20% modifier, this would return 1.2
</td>
<td>
</td>
<td>&lt;, &lt;=, =,&#160;!=, &gt;, &gt;=
</td>
<td>landed title
</td>
<td>
</td></tr>
<tr>
<td>county_holder_opinion
</td>
<td>Compares the county's opinion of its holder
</td>
<td>
</td>
<td>&lt;, &lt;=, =,&#160;!=, &gt;, &gt;=
</td>
<td>landed title
</td>
<td>
</td></tr>
<tr>
<td>county_opinion
</td>
<td>Compares the county's opinion of the current count
</td>
<td>
</td>
<td>&lt;, &lt;=, =,&#160;!=, &gt;, &gt;=
</td>
<td>landed title
</td>
<td>
</td></tr>
<tr>
<td>county_opinion_target
</td>
<td>Compares the county's opinion of the target character to the specified value
</td>
<td>county_opinion_target = { target = X value &gt;/&lt;/= Y }
</td>
<td>
</td>
<td>landed title
</td>
<td>
</td></tr>
<tr>
<td>de_jure_drift_progress
</td>
<td>Compare drift progress towards target with value
</td>
<td>&lt;drifting_title&gt; = { de_jure_drift_progress = {     target = &lt;drift_target_title&gt;    value &gt; 50 } }
</td>
<td>
</td>
<td>landed title
</td>
<td>
</td></tr>
<tr>
<td>de_jure_drifting_towards
</td>
<td>Is the scoped landed title de jure drifting toward another title?
</td>
<td>&lt;drifting_title&gt; = { de_jure_drifting_towards = &lt;drift_target_title&gt; }
</td>
<td>landed title scope
</td>
<td>landed title
</td>
<td>landed title
</td></tr>
<tr>
<td>development_level
</td>
<td>Does the county title have the required county development level?
</td>
<td>
</td>
<td>&lt;, &lt;=, =,&#160;!=, &gt;, &gt;=
</td>
<td>landed title
</td>
<td>
</td></tr>
<tr>
<td>development_rate
</td>
<td>How much development progress is the county gaining each month?
</td>
<td>
</td>
<td>&lt;, &lt;=, =,&#160;!=, &gt;, &gt;=
</td>
<td>landed title
</td>
<td>
</td></tr>
<tr>
<td>development_rate_modifier
</td>
<td>What's the multiplier to the development progress?
</td>
<td>
</td>
<td>&lt;, &lt;=, =,&#160;!=, &gt;, &gt;=
</td>
<td>landed title
</td>
<td>
</td></tr>
<tr>
<td>development_towards_level_increase
</td>
<td>Does the county title have the required progress towards the next level of development? E.g., if level 1 is 100, level 2 is 300 (these are set in defines), and current total is 150, this would return 50
</td>
<td>
</td>
<td>&lt;, &lt;=, =,&#160;!=, &gt;, &gt;=
</td>
<td>landed title
</td>
<td>
</td></tr>
<tr>
<td>has_character_nominiated
</td>
<td>Has the target character nominated a successor for the scoped title?
</td>
<td>
</td>
<td>character target
</td>
<td>landed title
</td>
<td>
</td></tr>
<tr>
<td>has_county_modifier
</td>
<td>Does the scoped county have a given modifier?
</td>
<td>has_county_modifier = name
</td>
<td>
</td>
<td>landed title
</td>
<td>
</td></tr>
<tr>
<td>has_county_modifier_duration_remaining
</td>
<td>Does the scoped county have the duration remaining on a given modifier?
</td>
<td>has_county_modifier_duration_remaining = name
</td>
<td>
</td>
<td>landed title
</td>
<td>
</td></tr>
<tr>
<td>has_disabled_building
</td>
<td>Is the scoped landed title connected to a holding that contains at least one disabled building?
</td>
<td>
</td>
<td>yes/no
</td>
<td>landed title
</td>
<td>
</td></tr>
<tr>
<td>has_holy_site_flag
</td>
<td>Does the barony have a holy site with the given flag?
</td>
<td>has_holy_site_flag = some_flag
</td>
<td>
</td>
<td>landed title
</td>
<td>
</td></tr>
<tr>
<td>has_order_of_succession
</td>
<td>Does the scoped title have a given succession type?
</td>
<td>has_order_of_succession = election
</td>
<td>
</td>
<td>landed title
</td>
<td>
</td></tr>
<tr>
<td>has_revokable_lease
</td>
<td>Is the title under a lease that can be revoked manually?
</td>
<td>
</td>
<td>yes/no
</td>
<td>landed title
</td>
<td>
</td></tr>
<tr>
<td>has_title_law
</td>
<td>Does the scoped title have the given title-specific law?
</td>
<td>
</td>
<td>
</td>
<td>landed title
</td>
<td>
</td></tr>
<tr>
<td>has_title_law_flag
</td>
<td>Does the scoped title have a title-specific law with the given flag?
</td>
<td>
</td>
<td>
</td>
<td>landed title
</td>
<td>
</td></tr>
<tr>
<td>has_wrong_holding_type
</td>
<td>Is the scope landed title connected to a holding that cannot be governed by the current lessee or holder?
</td>
<td>
</td>
<td>yes/no
</td>
<td>landed title
</td>
<td>
</td></tr>
<tr>
<td>is_capital_barony
</td>
<td>Is title in the scope a capital barony?
</td>
<td>
</td>
<td>yes/no
</td>
<td>landed title
</td>
<td>
</td></tr>
<tr>
<td>is_coastal_county
</td>
<td>Is the county coastal?
</td>
<td>
</td>
<td>yes/no
</td>
<td>landed title
</td>
<td>
</td></tr>
<tr>
<td>is_connected_to
</td>
<td>Is the county connected to the other county? Is based on top liege
</td>
<td>is_connected_to = {
<p>	max_naval_distance = 500
	allow_one_county_land_gap = yes
	target = some other county
}
</p>
</td>
<td>
</td>
<td>landed title
</td>
<td>
</td></tr>
<tr>
<td>is_contested
</td>
<td>Is the scope landed title contested in any war?
</td>
<td>
</td>
<td>yes/no
</td>
<td>landed title
</td>
<td>
</td></tr>
<tr>
<td>is_de_facto_liege_or_above_target
</td>
<td>Is the title de facto liege or above the target title?
</td>
<td>
</td>
<td>landed title target
</td>
<td>landed title
</td>
<td>
</td></tr>
<tr>
<td>is_de_jure_liege_or_above_target
</td>
<td>Is the title de jure liege or above the target title?
</td>
<td>
</td>
<td>landed title target
</td>
<td>landed title
</td>
<td>
</td></tr>
<tr>
<td>is_holy_order
</td>
<td>Is the scope landed title a holy order?
</td>
<td>
</td>
<td>yes/no
</td>
<td>landed title
</td>
<td>
</td></tr>
<tr>
<td>is_holy_site
</td>
<td>Is the barony a holy site of any faith?
</td>
<td>is_holy_site = yes
</td>
<td>yes/no
</td>
<td>landed title
</td>
<td>
</td></tr>
<tr>
<td>is_holy_site_controlled_by
</td>
<td>Does the target character control a holy site of the scoped object?
</td>
<td>is_holy_site_controlled_by = root
</td>
<td>character scope
</td>
<td>landed title
</td>
<td>character
</td></tr>
<tr>
<td>is_holy_site_of
</td>
<td>Is the barony a holy site of the given faith?
</td>
<td>is_holy_site_of = catholic
</td>
<td>
</td>
<td>landed title
</td>
<td>
</td></tr>
<tr>
<td>is_landless_type_title
</td>
<td>Is this title considered a landless type title?
</td>
<td>
</td>
<td>yes/no
</td>
<td>landed title
</td>
<td>
</td></tr>
<tr>
<td>is_leased_out
</td>
<td>Is the scoped title leased out?
</td>
<td>
</td>
<td>yes/no
</td>
<td>landed title
</td>
<td>
</td></tr>
<tr>
<td>is_mercenary_company
</td>
<td>Is the scope landed title a mercenary company?
</td>
<td>
</td>
<td>yes/no
</td>
<td>landed title
</td>
<td>
</td></tr>
<tr>
<td>is_neighbor_to_realm
</td>
<td>Is this landed title adjacent to the character's realm?
</td>
<td>is_neighbor_to_realm = character
</td>
<td>character scope
</td>
<td>landed title
</td>
<td>character
</td></tr>
<tr>
<td>is_target_of_council_task
</td>
<td>Is the county currently affected by the specified council task? Needs to be in a county title scope
</td>
<td>
</td>
<td>
</td>
<td>landed title
</td>
<td>
</td></tr>
<tr>
<td>is_title_created
</td>
<td>Is title in the scope created?
</td>
<td>
</td>
<td>yes/no
</td>
<td>landed title
</td>
<td>
</td></tr>
<tr>
<td>is_titular
</td>
<td>Is this title titular (has no de jure counties in it, and is not a barony/county)?
</td>
<td>
</td>
<td>yes/no
</td>
<td>landed title
</td>
<td>
</td></tr>
<tr>
<td>is_under_holy_order_lease
</td>
<td>Is the scoped title leased out to any holy order?
</td>
<td>
</td>
<td>yes/no
</td>
<td>landed title
</td>
<td>
</td></tr>
<tr>
<td>place_in_line_of_succession
</td>
<td>What place in line of succession does the character hold?
</td>
<td>
</td>
<td>
</td>
<td>landed title
</td>
<td>
</td></tr>
<tr>
<td>recent_history
</td>
<td>Does the scope title have a history entry of the specified type in recent history?
</td>
<td>recent_history = { type = X days/months/years = Y }
<p>The type can be omitted, all history types are considered then
Possible types:
</p>
<ul><li>conquest</li>
<li>conquest_holy_war</li>
<li>conquest_claim</li>
<li>conquest_populist</li>
<li>election</li>
<li>inheritance</li>
<li>abdication</li>
<li>created</li>
<li>destroyed</li>
<li>usurped</li>
<li>granted</li>
<li>revoked</li>
<li>independency</li>
<li>leased_out</li>
<li>lease_revoked</li>
<li>returned</li>
<li>faction_demand</li></ul>
</td>
<td>
</td>
<td>landed title
</td>
<td>
</td></tr>
<tr>
<td>target_is_de_facto_liege_or_above
</td>
<td>Is the target title de facto liege or above?
</td>
<td>
</td>
<td>landed title target
</td>
<td>landed title
</td>
<td>
</td></tr>
<tr>
<td>target_is_de_jure_liege_or_above
</td>
<td>Is the target title de jure liege or above?
</td>
<td>
</td>
<td>landed title target
</td>
<td>landed title
</td>
<td>
</td></tr>
<tr>
<td>tier
</td>
<td>What tier is the scoped title? Use the script values please, not raw numbers
</td>
<td>The tiers are
<ol><li>tier_barony</li>
<li>tier_county</li>
<li>tier_duchy</li>
<li>tier_kingdom</li>
<li>tier_empire</li></ol>
</td>
<td>&lt;, &lt;=, =,&#160;!=, &gt;, &gt;=
</td>
<td>landed title
</td>
<td>
</td></tr>
<tr>
<td>title_create_faction_type_chance
</td>
<td>Check if the chance to create a faction against a target of the scope landed title is is true against the scripted value
</td>
<td>title_create_faction_type_chance = {
<pre>   type = faction_type #An ongoing faction
   target = target_character
   value &lt;|&lt;=|&gt;=|&gt; 0
</pre>
<p>}
</p>
</td>
<td>
</td>
<td>landed title
</td>
<td>
</td></tr>
<tr>
<td>title_is_a_faction_member
</td>
<td>Is the scope title a member of a faction?
</td>
<td>
</td>
<td>yes/no
</td>
<td>landed title
</td>
<td>
</td></tr>
<tr>
<td>title_join_faction_chance
</td>
<td>Check if the chance of the scope landed title to join the faction against the scripted value
</td>
<td>title_join_faction_chance = {
<pre>   faction = faction_target #An ongoing faction
   value &lt;|&lt;=|&gt;=|&gt; 0
</pre>
<p>}
</p>
</td>
<td>
</td>
<td>landed title
</td>
<td>
</td></tr>
<tr>
<td>title_will_leave_sub_realm_on_succession
</td>
<td>Will the title leave the sub-realm of the character on the right-hand-side upon succession? That is, is the first heir in someone outside the sub-realm, and the highest tier title they'll inherit from the person holding the title is not higher than their current tier
</td>
<td>
</td>
<td>character target
</td>
<td>landed title
</td>
<td>
</td></tr>
<tr>
<td>story_type
</td>
<td>Is the story in scope of this type?
</td>
<td>
</td>
<td>
</td>
<td>story cycle
</td>
<td>
</td></tr>
<tr>
<td>can_get_innovation_from
</td>
<td>Get random applicable innovation from another culture
</td>
<td>
</td>
<td>
</td>
<td>culture
</td>
<td>
</td></tr>
<tr>
<td>has_all_innovations
</td>
<td>Has the culture discovered all innovations matching the filter?
</td>
<td>has_all_innovations = {
<p>	with_flag = flag_name # innovation matches if it has the flag; optional
	without_flag = flag_name # innovation matches if it does not have the flag; optional
	culture_era = era_key # innovation matches if it is from the era; optional
}
</p>
</td>
<td>
</td>
<td>culture
</td>
<td>
</td></tr>
<tr>
<td>has_cultural_era_or_later
</td>
<td>Has this culture achieved specified era?
</td>
<td>&lt;culture&gt; = { has_cultural_era_or_later = culture_era_early_medieval }
</td>
<td>
</td>
<td>culture
</td>
<td>
</td></tr>
<tr>
<td>has_graphical_culture
</td>
<td>Does the culture (or its culture group) have this graphical culture?
</td>
<td>&lt;culture&gt; = { has_graphical_culture = celticgfx }
</td>
<td>
</td>
<td>culture
</td>
<td>
</td></tr>
<tr>
<td>has_innovation
</td>
<td>Have the culture discovered this innovation?
</td>
<td>
</td>
<td>
</td>
<td>culture
</td>
<td>
</td></tr>
<tr>
<td>mercenary_company_expiration_days
</td>
<td>How many days are left in the mercenary contract. 0 if not hired.
</td>
<td>
</td>
<td>&lt;, &lt;=, =,&#160;!=, &gt;, &gt;=
</td>
<td>mercenary company
</td>
<td>
</td></tr>
<tr>
<td>age
</td>
<td>Compare character age
</td>
<td>
</td>
<td>&lt;, &lt;=, =,&#160;!=, &gt;, &gt;=
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>ai_boldness
</td>
<td>AI boldness
</td>
<td>
</td>
<td>&lt;, &lt;=, =,&#160;!=, &gt;, &gt;=
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>ai_compassion
</td>
<td>AI compassion
</td>
<td>
</td>
<td>&lt;, &lt;=, =,&#160;!=, &gt;, &gt;=
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>ai_diplomacy_stance
</td>
<td>The AI's diplomatic view of the target character
</td>
<td>ai_diplomacy_stance = {
<pre>   target = target_character
   stance = neutral/threat/enemy/friend
</pre>
<p>}
</p>
</td>
<td>
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>ai_energy
</td>
<td>AI energy
</td>
<td>
</td>
<td>&lt;, &lt;=, =,&#160;!=, &gt;, &gt;=
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>ai_greed
</td>
<td>AI greed
</td>
<td>
</td>
<td>&lt;, &lt;=, =,&#160;!=, &gt;, &gt;=
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>ai_honor
</td>
<td>AI honor
</td>
<td>
</td>
<td>&lt;, &lt;=, =,&#160;!=, &gt;, &gt;=
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>ai_rationality
</td>
<td>AI rationality
</td>
<td>
</td>
<td>&lt;, &lt;=, =,&#160;!=, &gt;, &gt;=
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>ai_sociability
</td>
<td>AI sociability
</td>
<td>
</td>
<td>&lt;, &lt;=, =,&#160;!=, &gt;, &gt;=
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>ai_values_divergence
</td>
<td>Compare AI values between characters
</td>
<td>target = other character value &gt;/&lt;/= sum of differences in ai values
</td>
<td>
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>ai_vengefulness
</td>
<td>AI vengefulness
</td>
<td>
</td>
<td>&lt;, &lt;=, =,&#160;!=, &gt;, &gt;=
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>ai_zeal
</td>
<td>AI zeal
</td>
<td>
</td>
<td>&lt;, &lt;=, =,&#160;!=, &gt;, &gt;=
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>allowed_concubines
</td>
<td>Can the scope owner have concubines?
</td>
<td>
</td>
<td>yes/no
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>allowed_more_concubines
</td>
<td>Can the scope owner have more concubines?
</td>
<td>
</td>
<td>yes/no
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>allowed_more_spouses
</td>
<td>Can the scope owner have more spouses?
</td>
<td>
</td>
<td>yes/no
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>any_alert_creatable_title
</td>
<td>Iterate through all titles that can be created by the character. (only for alerts)
</td>
<td>any_alert_creatable_title = { &lt;count=num/all&gt; / &lt;percent=fixed_point&gt; &lt;triggers&gt; }
</td>
<td>
</td>
<td>character
</td>
<td>landed title
</td></tr>
<tr>
<td>any_alert_usurpable_title
</td>
<td>Iterate through all titles that can be usurped by the character. (only for alerts)
</td>
<td>any_alert_usurpable_title = { &lt;count=num/all&gt; / &lt;percent=fixed_point&gt; &lt;triggers&gt; }
</td>
<td>
</td>
<td>character
</td>
<td>landed title
</td></tr>
<tr>
<td>any_ally
</td>
<td>Iterate through all allies
</td>
<td>any_ally = { &lt;count=num/all&gt; / &lt;percent=fixed_point&gt; &lt;triggers&gt; }
</td>
<td>
</td>
<td>character
</td>
<td>character
</td></tr>
<tr>
<td>any_ancestor
</td>
<td>Iterate through all the ancestors of the scope character up to 5 generations
</td>
<td>any_ancestor = { &lt;count=num/all&gt; / &lt;percent=fixed_point&gt; &lt;triggers&gt; }
</td>
<td>
</td>
<td>character
</td>
<td>character
</td></tr>
<tr>
<td>any_army
</td>
<td>Iterate through all armies
</td>
<td>any_army = { &lt;count=num/all&gt; / &lt;percent=fixed_point&gt; &lt;triggers&gt; }
</td>
<td>
</td>
<td>character
</td>
<td>army
</td></tr>
<tr>
<td>any_character_to_title_neighboring_and_across_water_barony
</td>
<td>Scopes from a character to a neighboring barony (incl. across water, looking through the de jure lieges)
</td>
<td>any_character_to_title_neighboring_and_across_water_barony = { &lt;count=num/all&gt; / &lt;percent=fixed_point&gt; &lt;triggers&gt; }
</td>
<td>
</td>
<td>character
</td>
<td>landed title
</td></tr>
<tr>
<td>any_character_to_title_neighboring_and_across_water_county
</td>
<td>Scopes from a character to a neighboring county (incl. across water, looking through the de jure lieges)
</td>
<td>any_character_to_title_neighboring_and_across_water_county = { &lt;count=num/all&gt; / &lt;percent=fixed_point&gt; &lt;triggers&gt; }
</td>
<td>
</td>
<td>character
</td>
<td>landed title
</td></tr>
<tr>
<td>any_character_to_title_neighboring_and_across_water_duchy
</td>
<td>Scopes from a character to a neighboring duchy (incl. across water, looking through the de jure lieges)
</td>
<td>any_character_to_title_neighboring_and_across_water_duchy = { &lt;count=num/all&gt; / &lt;percent=fixed_point&gt; &lt;triggers&gt; }
</td>
<td>
</td>
<td>character
</td>
<td>landed title
</td></tr>
<tr>
<td>any_character_to_title_neighboring_and_across_water_empire
</td>
<td>Scopes from a character to a neighboring empire (incl. across water, looking through the de jure lieges)
</td>
<td>any_character_to_title_neighboring_and_across_water_empire = { &lt;count=num/all&gt; / &lt;percent=fixed_point&gt; &lt;triggers&gt; }
</td>
<td>
</td>
<td>character
</td>
<td>landed title
</td></tr>
<tr>
<td>any_character_to_title_neighboring_and_across_water_kingdom
</td>
<td>Scopes from a character to a neighboring kingdom (incl. across water, looking through the de jure lieges)
</td>
<td>any_character_to_title_neighboring_and_across_water_kingdom = { &lt;count=num/all&gt; / &lt;percent=fixed_point&gt; &lt;triggers&gt; }
</td>
<td>
</td>
<td>character
</td>
<td>landed title
</td></tr>
<tr>
<td>any_character_to_title_neighboring_barony
</td>
<td>Scopes from a character to a neighboring barony (looking through the de jure lieges)
</td>
<td>any_character_to_title_neighboring_barony = { &lt;count=num/all&gt; / &lt;percent=fixed_point&gt; &lt;triggers&gt; }
</td>
<td>
</td>
<td>character
</td>
<td>landed title
</td></tr>
<tr>
<td>any_character_to_title_neighboring_county
</td>
<td>Scopes from a character to a neighboring county (looking through the de jure lieges)
</td>
<td>any_character_to_title_neighboring_county = { &lt;count=num/all&gt; / &lt;percent=fixed_point&gt; &lt;triggers&gt; }
</td>
<td>
</td>
<td>character
</td>
<td>landed title
</td></tr>
<tr>
<td>any_character_to_title_neighboring_duchy
</td>
<td>Scopes from a character to a neighboring duchy (looking through the de jure lieges)
</td>
<td>any_character_to_title_neighboring_duchy = { &lt;count=num/all&gt; / &lt;percent=fixed_point&gt; &lt;triggers&gt; }
</td>
<td>
</td>
<td>character
</td>
<td>landed title
</td></tr>
<tr>
<td>any_character_to_title_neighboring_empire
</td>
<td>Scopes from a character to a neighboring empire (looking through the de jure lieges)
</td>
<td>any_character_to_title_neighboring_empire = { &lt;count=num/all&gt; / &lt;percent=fixed_point&gt; &lt;triggers&gt; }
</td>
<td>
</td>
<td>character
</td>
<td>landed title
</td></tr>
<tr>
<td>any_character_to_title_neighboring_kingdom
</td>
<td>Scopes from a character to a neighboring kingdom (looking through the de jure lieges)
</td>
<td>any_character_to_title_neighboring_kingdom = { &lt;count=num/all&gt; / &lt;percent=fixed_point&gt; &lt;triggers&gt; }
</td>
<td>
</td>
<td>character
</td>
<td>landed title
</td></tr>
<tr>
<td>any_character_war
</td>
<td>Wars of the scoped character
</td>
<td>any_character_war = { &lt;count=num/all&gt; / &lt;percent=fixed_point&gt; &lt;triggers&gt; }
</td>
<td>
</td>
<td>character
</td>
<td>war
</td></tr>
<tr>
<td>any_child
</td>
<td>Iterate through all children
</td>
<td>any_child = { &lt;count=num/all&gt; / &lt;percent=fixed_point&gt; &lt;triggers&gt; }
</td>
<td>
</td>
<td>character
</td>
<td>character
</td></tr>
<tr>
<td>any_claim
</td>
<td>Iterate through the titles of all claims held by a character; parameters: explicit = yes/no/all pressed = yes/no/all
</td>
<td>any_claim = { &lt;count=num/all&gt; / &lt;percent=fixed_point&gt; &lt;triggers&gt; }
</td>
<td>
</td>
<td>character
</td>
<td>landed title
</td></tr>
<tr>
<td>any_close_family_member
</td>
<td>Iterate through all the close family [father, mother, siblings, children, grandparents]
</td>
<td>any_close_family_member = { &lt;count=num/all&gt; / &lt;percent=fixed_point&gt; &lt;triggers&gt; }
</td>
<td>
</td>
<td>character
</td>
<td>character
</td></tr>
<tr>
<td>any_close_or_extended_family_member
</td>
<td>Iterate through all the close and extended relatives [father, mother, siblings, children, grandparents, uncles/aunts, nephew/niece, cousins]
</td>
<td>any_close_or_extended_family_member = { &lt;count=num/all&gt; / &lt;percent=fixed_point&gt; &lt;triggers&gt; }
</td>
<td>
</td>
<td>character
</td>
<td>character
</td></tr>
<tr>
<td>any_concubine
</td>
<td>Iterate through all concubines
</td>
<td>any_concubine = { &lt;count=num/all&gt; / &lt;percent=fixed_point&gt; &lt;triggers&gt; }
</td>
<td>
</td>
<td>character
</td>
<td>character
</td></tr>
<tr>
<td>any_consort
</td>
<td>Iterate through all consorts (concubines and spouses)
</td>
<td>any_consort = { &lt;count=num/all&gt; / &lt;percent=fixed_point&gt; &lt;triggers&gt; }
</td>
<td>
</td>
<td>character
</td>
<td>character
</td></tr>
<tr>
<td>any_councillor
</td>
<td>Iterate through all councillors
</td>
<td>any_councillor = { &lt;count=num/all&gt; / &lt;percent=fixed_point&gt; &lt;triggers&gt; }
</td>
<td>
</td>
<td>character
</td>
<td>character
</td></tr>
<tr>
<td>any_courtier
</td>
<td>Iterate through all courtiers
</td>
<td>any_courtier = { &lt;count=num/all&gt; / &lt;percent=fixed_point&gt; &lt;triggers&gt; }
</td>
<td>
</td>
<td>character
</td>
<td>character
</td></tr>
<tr>
<td>any_courtier_away
</td>
<td>Iterate through all courtiers that are away
</td>
<td>any_courtier_away = { &lt;count=num/all&gt; / &lt;percent=fixed_point&gt; &lt;triggers&gt; }
</td>
<td>
</td>
<td>character
</td>
<td>character
</td></tr>
<tr>
<td>any_courtier_or_guest
</td>
<td>Iterate through all courtiers and guests (pool and foreign court guests)
</td>
<td>any_courtier_or_guest = { &lt;count=num/all&gt; / &lt;percent=fixed_point&gt; &lt;triggers&gt; }
</td>
<td>
</td>
<td>character
</td>
<td>character
</td></tr>
<tr>
<td>any_de_jure_claim
</td>
<td>Iterate through all de jure claims for a character
</td>
<td>any_de_jure_claim = { &lt;count=num/all&gt; / &lt;percent=fixed_point&gt; &lt;triggers&gt; }
</td>
<td>
</td>
<td>character
</td>
<td>landed title
</td></tr>
<tr>
<td>any_diplomacy_councillor
</td>
<td>Iterate through all diplomacy-based councillors
</td>
<td>any_diplomacy_councillor = { &lt;count=num/all&gt; / &lt;percent=fixed_point&gt; &lt;triggers&gt; }
</td>
<td>
</td>
<td>character
</td>
<td>character
</td></tr>
<tr>
<td>any_directly_owned_province
</td>
<td>Iterate through all directly owned provinces
</td>
<td>any_directly_owned_province = { &lt;count=num/all&gt; / &lt;percent=fixed_point&gt; &lt;triggers&gt; }
</td>
<td>
</td>
<td>character
</td>
<td>province
</td></tr>
<tr>
<td>any_election_title
</td>
<td>Iterate through all titles the scoped character can vote on
</td>
<td>any_election_title = { &lt;count=num/all&gt; / &lt;percent=fixed_point&gt; &lt;triggers&gt; }
</td>
<td>
</td>
<td>character
</td>
<td>landed title
</td></tr>
<tr>
<td>any_extended_family_member
</td>
<td>Iterate through all the extended family [uncles/aunts, nephew/niece, cousins]
</td>
<td>any_extended_family_member = { &lt;count=num/all&gt; / &lt;percent=fixed_point&gt; &lt;triggers&gt; }
</td>
<td>
</td>
<td>character
</td>
<td>character
</td></tr>
<tr>
<td>any_foreign_court_guest
</td>
<td>Iterate through all guests visiting from another court (in contrast to pool_guest they have a liege)
</td>
<td>any_foreign_court_guest = { &lt;count=num/all&gt; / &lt;percent=fixed_point&gt; &lt;triggers&gt; }
</td>
<td>
</td>
<td>character
</td>
<td>character
</td></tr>
<tr>
<td>any_former_concubine
</td>
<td>Iterate through all former concubines. Not persisted past death
</td>
<td>any_former_concubine = { &lt;count=num/all&gt; / &lt;percent=fixed_point&gt; &lt;triggers&gt; }
</td>
<td>
</td>
<td>character
</td>
<td>character
</td></tr>
<tr>
<td>any_former_concubinist
</td>
<td>Iterate through all former concubinists. Not persisted past death
</td>
<td>any_former_concubinist = { &lt;count=num/all&gt; / &lt;percent=fixed_point&gt; &lt;triggers&gt; }
</td>
<td>
</td>
<td>character
</td>
<td>character
</td></tr>
<tr>
<td>any_former_spouse
</td>
<td>Iterate through all former spouses
</td>
<td>any_former_spouse = { &lt;count=num/all&gt; / &lt;percent=fixed_point&gt; &lt;triggers&gt; }
</td>
<td>
</td>
<td>character
</td>
<td>character
</td></tr>
<tr>
<td>any_general_councillor
</td>
<td>Iterate through all councillors that are not related to a skill
</td>
<td>any_general_councillor = { &lt;count=num/all&gt; / &lt;percent=fixed_point&gt; &lt;triggers&gt; }
</td>
<td>
</td>
<td>character
</td>
<td>character
</td></tr>
<tr>
<td>any_heir
</td>
<td>Heirs of the scoped character
</td>
<td>any_heir = { &lt;count=num/all&gt; / &lt;percent=fixed_point&gt; &lt;triggers&gt; }
</td>
<td>
</td>
<td>character
</td>
<td>character
</td></tr>
<tr>
<td>any_heir_title
</td>
<td>Iterate through all landed titles character is heir to
</td>
<td>any_heir_title = { &lt;count=num/all&gt; / &lt;percent=fixed_point&gt; &lt;triggers&gt; }
</td>
<td>
</td>
<td>character
</td>
<td>landed title
</td></tr>
<tr>
<td>any_heir_to_title
</td>
<td>Iterate through all titles the scoped character is heir to
</td>
<td>any_heir_to_title = { &lt;count=num/all&gt; / &lt;percent=fixed_point&gt; &lt;triggers&gt; }
</td>
<td>
</td>
<td>character
</td>
<td>landed title
</td></tr>
<tr>
<td>any_held_title
</td>
<td>Iterate through all held landed titles
</td>
<td>any_held_title = { &lt;count=num/all&gt; / &lt;percent=fixed_point&gt; &lt;triggers&gt; }
</td>
<td>
</td>
<td>character
</td>
<td>landed title
</td></tr>
<tr>
<td>any_hired_mercenary
</td>
<td>Iterate through all hired mercenary companies
</td>
<td>any_hired_mercenary = { &lt;count=num/all&gt; / &lt;percent=fixed_point&gt; &lt;triggers&gt; }
</td>
<td>
</td>
<td>character
</td>
<td>mercenary company
</td></tr>
<tr>
<td>any_hooked_character
</td>
<td>Iterate through all characters this character has a hook on
</td>
<td>any_hooked_character = { &lt;count=num/all&gt; / &lt;percent=fixed_point&gt; &lt;triggers&gt; }
</td>
<td>
</td>
<td>character
</td>
<td>character
</td></tr>
<tr>
<td>any_hostile_raider
</td>
<td>Iterate through anyone the character is hostile to due to their top liege's realm having been raided
</td>
<td>any_hostile_raider = { &lt;count=num/all&gt; / &lt;percent=fixed_point&gt; &lt;triggers&gt; }
</td>
<td>
</td>
<td>character
</td>
<td>character
</td></tr>
<tr>
<td>any_intrigue_councillor
</td>
<td>Iterate through all intrigue-based councillors
</td>
<td>any_intrigue_councillor = { &lt;count=num/all&gt; / &lt;percent=fixed_point&gt; &lt;triggers&gt; }
</td>
<td>
</td>
<td>character
</td>
<td>character
</td></tr>
<tr>
<td>any_knight
</td>
<td>Iterate through all knights
</td>
<td>any_knight = { &lt;count=num/all&gt; / &lt;percent=fixed_point&gt; &lt;triggers&gt; }
</td>
<td>
</td>
<td>character
</td>
<td>character
</td></tr>
<tr>
<td>any_known_secret
</td>
<td>Iterate through all secrets known by the character
</td>
<td>any_known_secret = { &lt;count=num/all&gt; / &lt;percent=fixed_point&gt; &lt;triggers&gt; }
</td>
<td>
</td>
<td>character
</td>
<td>secret
</td></tr>
<tr>
<td>any_learning_councillor
</td>
<td>Iterate through all learning-based councillors
</td>
<td>any_learning_councillor = { &lt;count=num/all&gt; / &lt;percent=fixed_point&gt; &lt;triggers&gt; }
</td>
<td>
</td>
<td>character
</td>
<td>character
</td></tr>
<tr>
<td>any_liege_or_above
</td>
<td>Iterate through all lieges above a character (skipping the character themselves)
</td>
<td>any_liege_or_above = { &lt;count=num/all&gt; / &lt;percent=fixed_point&gt; &lt;triggers&gt; }
</td>
<td>
</td>
<td>character
</td>
<td>character
</td></tr>
<tr>
<td>any_martial_councillor
</td>
<td>Iterate through all martial-based councillors
</td>
<td>any_martial_councillor = { &lt;count=num/all&gt; / &lt;percent=fixed_point&gt; &lt;triggers&gt; }
</td>
<td>
</td>
<td>character
</td>
<td>character
</td></tr>
<tr>
<td>any_neighboring_and_across_water_realm_same_rank_owner
</td>
<td>A sub-realm or realm bordering the scope character's realm (including across water) that has the same rank as the scoped character (look for lieges of the owner of the land if necessary)
</td>
<td>any_neighboring_and_across_water_realm_same_rank_owner = { &lt;count=num/all&gt; / &lt;percent=fixed_point&gt; &lt;triggers&gt; }
</td>
<td>
</td>
<td>character
</td>
<td>character
</td></tr>
<tr>
<td>any_neighboring_and_across_water_top_liege_realm
</td>
<td>A realm with a different top liege neighboring the realm of the scoped character's top liege (including across water); switches to the realm's top title. Can be based on borders a day or two out of date
</td>
<td>any_neighboring_and_across_water_top_liege_realm = { &lt;count=num/all&gt; / &lt;percent=fixed_point&gt; &lt;triggers&gt; }
</td>
<td>
</td>
<td>character
</td>
<td>landed title
</td></tr>
<tr>
<td>any_neighboring_and_across_water_top_liege_realm_owner
</td>
<td>A realm with a different top liege neighboring the realm of the scope character's top liege (including across water); switches to the holder of the realm. Can be based on borders a day or two out of date
</td>
<td>any_neighboring_and_across_water_top_liege_realm_owner = { &lt;count=num/all&gt; / &lt;percent=fixed_point&gt; &lt;triggers&gt; }
</td>
<td>
</td>
<td>character
</td>
<td>character
</td></tr>
<tr>
<td>any_neighboring_realm_same_rank_owner
</td>
<td>A sub-realm or realm bordering the scope character's realm and has the same rank as the scope character (look for lieges of he owner of the land if necessary)
</td>
<td>any_neighboring_realm_same_rank_owner = { &lt;count=num/all&gt; / &lt;percent=fixed_point&gt; &lt;triggers&gt; }
</td>
<td>
</td>
<td>character
</td>
<td>character
</td></tr>
<tr>
<td>any_neighboring_top_liege_realm
</td>
<td>A realm with a different top liege neighboring the realm of the scope character's top liege; switches to the realm's top title. Can be based on borders a day or two out of date
</td>
<td>any_neighboring_top_liege_realm = { &lt;count=num/all&gt; / &lt;percent=fixed_point&gt; &lt;triggers&gt; }
</td>
<td>
</td>
<td>character
</td>
<td>landed title
</td></tr>
<tr>
<td>any_neighboring_top_liege_realm_owner
</td>
<td>A realm with a different top liege neighboring the realm of the scope character's top liege; switches to the holder of the realm. Can be based on borders a day or two out of date
</td>
<td>any_neighboring_top_liege_realm_owner = { &lt;count=num/all&gt; / &lt;percent=fixed_point&gt; &lt;triggers&gt; }
</td>
<td>
</td>
<td>character
</td>
<td>character
</td></tr>
<tr>
<td>any_owned_story
</td>
<td>Iterate through all owned stories for a character
</td>
<td>any_owned_story = { &lt;count=num/all&gt; / &lt;percent=fixed_point&gt; &lt;triggers&gt; }
</td>
<td>
</td>
<td>character
</td>
<td>story cycle
</td></tr>
<tr>
<td>any_parent
</td>
<td>Iterate through all (both) parents
</td>
<td>any_parent = { &lt;count=num/all&gt; / &lt;percent=fixed_point&gt; &lt;triggers&gt; }
</td>
<td>
</td>
<td>character
</td>
<td>character
</td></tr>
<tr>
<td>any_patroned_holy_order
</td>
<td>Iterate through all holy orders that the scoped character is a patron of
</td>
<td>any_patroned_holy_order = { &lt;count=num/all&gt; / &lt;percent=fixed_point&gt; &lt;triggers&gt; }
</td>
<td>
</td>
<td>character
</td>
<td>holy order
</td></tr>
<tr>
<td>any_pinned_character
</td>
<td>Iterate through characters this player has pinned
</td>
<td>any_pinned_character = { &lt;count=num/all&gt; / &lt;percent=fixed_point&gt; &lt;triggers&gt; }
</td>
<td>
</td>
<td>character
</td>
<td>character
</td></tr>
<tr>
<td>any_pinning_character
</td>
<td>Iterate through characters whose player has this character pinned
</td>
<td>any_pinning_character = { &lt;count=num/all&gt; / &lt;percent=fixed_point&gt; &lt;triggers&gt; }
</td>
<td>
</td>
<td>character
</td>
<td>character
</td></tr>
<tr>
<td>any_player_heir
</td>
<td>Iterate through player heirs, capped at the first 10
</td>
<td>any_player_heir = { &lt;count=num/all&gt; / &lt;percent=fixed_point&gt; &lt;triggers&gt; }
</td>
<td>
</td>
<td>character
</td>
<td>character
</td></tr>
<tr>
<td>any_pool_guest
</td>
<td>Iterate through all guests visiting the court from the pool (in contrast to foreign_court_guest they don't have a liege)
</td>
<td>any_pool_guest = { &lt;count=num/all&gt; / &lt;percent=fixed_point&gt; &lt;triggers&gt; }
</td>
<td>
</td>
<td>character
</td>
<td>character
</td></tr>
<tr>
<td>any_potential_marriage_option
</td>
<td>Iterate through all potential selectable marriage or betrothal options
</td>
<td>any_potential_marriage_option = { &lt;count=num/all&gt; / &lt;percent=fixed_point&gt; &lt;triggers&gt; }
</td>
<td>
</td>
<td>character
</td>
<td>character
</td></tr>
<tr>
<td>any_pretender_title
</td>
<td>Iterate through all landed titles character is pretender to
</td>
<td>any_pretender_title = { &lt;count=num/all&gt; / &lt;percent=fixed_point&gt; &lt;triggers&gt; }
</td>
<td>
</td>
<td>character
</td>
<td>landed title
</td></tr>
<tr>
<td>any_primary_war_enemy
</td>
<td>Iterate through all primary war enemies
</td>
<td>any_primary_war_enemy = { &lt;count=num/all&gt; / &lt;percent=fixed_point&gt; &lt;triggers&gt; }
</td>
<td>
</td>
<td>character
</td>
<td>character
</td></tr>
<tr>
<td>any_prisoner
</td>
<td>Iterate through all prisoners in the scoped character's dungeon
</td>
<td>any_prisoner = { &lt;count=num/all&gt; / &lt;percent=fixed_point&gt; &lt;triggers&gt; }
</td>
<td>
</td>
<td>character
</td>
<td>character
</td></tr>
<tr>
<td>any_prowess_councillor
</td>
<td>Iterate through all prowess-based councillors
</td>
<td>any_prowess_councillor = { &lt;count=num/all&gt; / &lt;percent=fixed_point&gt; &lt;triggers&gt; }
</td>
<td>
</td>
<td>character
</td>
<td>character
</td></tr>
<tr>
<td>any_raid_target
</td>
<td>Iterate through anyone the character is hostile to due to having raided them. Only returns top lieges
</td>
<td>any_raid_target = { &lt;count=num/all&gt; / &lt;percent=fixed_point&gt; &lt;triggers&gt; }
</td>
<td>
</td>
<td>character
</td>
<td>character
</td></tr>
<tr>
<td>any_realm_county
</td>
<td>Iterate through all counties in the realm. Based on top liege
</td>
<td>any_realm_county = { &lt;count=num/all&gt; / &lt;percent=fixed_point&gt; &lt;triggers&gt; }
</td>
<td>
</td>
<td>character
</td>
<td>landed title
</td></tr>
<tr>
<td>any_realm_de_jure_duchy
</td>
<td>Iterate through all de jure duchies that have at least one county in the realm. Based on top liege
</td>
<td>any_realm_de_jure_duchy = { &lt;count=num/all&gt; / &lt;percent=fixed_point&gt; &lt;triggers&gt; }
</td>
<td>
</td>
<td>character
</td>
<td>landed title
</td></tr>
<tr>
<td>any_realm_de_jure_empire
</td>
<td>Iterate through all de jures empire that have at least one county in the realm. Based on top liege
</td>
<td>any_realm_de_jure_empire = { &lt;count=num/all&gt; / &lt;percent=fixed_point&gt; &lt;triggers&gt; }
</td>
<td>
</td>
<td>character
</td>
<td>landed title
</td></tr>
<tr>
<td>any_realm_de_jure_kingdom
</td>
<td>Iterate through all de jure kingdom that have at least one county in the realm. Based on top liege
</td>
<td>any_realm_de_jure_kingdom = { &lt;count=num/all&gt; / &lt;percent=fixed_point&gt; &lt;triggers&gt; }
</td>
<td>
</td>
<td>character
</td>
<td>landed title
</td></tr>
<tr>
<td>any_realm_province
</td>
<td>Iterate through all realm provinces [baronies?] of a character
</td>
<td>any_realm_province = { &lt;count=num/all&gt; / &lt;percent=fixed_point&gt; &lt;triggers&gt; }
</td>
<td>
</td>
<td>character
</td>
<td>province
</td></tr>
<tr>
<td>any_relation
</td>
<td>Iterate through scripted relations of a given type or multiple types. If someone is multiple relations they will only be in the list once
</td>
<td>any_relation = { &lt;count=num/all&gt; / &lt;percent=fixed_point&gt; &lt;triggers&gt; }
</td>
<td>
</td>
<td>character
</td>
<td>character
</td></tr>
<tr>
<td>any_scheme
</td>
<td>Iterate through all schemes owned by the character
</td>
<td>any_scheme = { &lt;count=num/all&gt; / &lt;percent=fixed_point&gt; &lt;triggers&gt; }
</td>
<td>
</td>
<td>character
</td>
<td>scheme
</td></tr>
<tr>
<td>any_secret
</td>
<td>Iterate through all secrets of the character
</td>
<td>any_secret = { &lt;count=num/all&gt; / &lt;percent=fixed_point&gt; &lt;triggers&gt; }
</td>
<td>
</td>
<td>character
</td>
<td>secret
</td></tr>
<tr>
<td>any_sibling
</td>
<td>Iterate through all siblings
</td>
<td>any_sibling = { &lt;count=num/all&gt; / &lt;percent=fixed_point&gt; &lt;triggers&gt; }
</td>
<td>
</td>
<td>character
</td>
<td>character
</td></tr>
<tr>
<td>any_spouse
</td>
<td>Iterate through all spouses
</td>
<td>any_spouse = { &lt;count=num/all&gt; / &lt;percent=fixed_point&gt; &lt;triggers&gt; }
</td>
<td>
</td>
<td>character
</td>
<td>character
</td></tr>
<tr>
<td>any_spouse_candidate
</td>
<td>Iterate through all the spouse candidates of a character. WARNING: THIS IS VERY SLOW DO NOT DO IT OFTEN.
</td>
<td>any_spouse_candidate = { &lt;count=num/all&gt; / &lt;percent=fixed_point&gt; &lt;triggers&gt; }
</td>
<td>
</td>
<td>character
</td>
<td>character
</td></tr>
<tr>
<td>any_stewardship_councillor
</td>
<td>Iterate through all stewardship-based councillors
</td>
<td>any_stewardship_councillor = { &lt;count=num/all&gt; / &lt;percent=fixed_point&gt; &lt;triggers&gt; }
</td>
<td>
</td>
<td>character
</td>
<td>character
</td></tr>
<tr>
<td>any_sub_realm_barony
</td>
<td>Iterate through all baronies in sub-realm
</td>
<td>any_sub_realm_barony = { &lt;count=num/all&gt; / &lt;percent=fixed_point&gt; &lt;triggers&gt; }
</td>
<td>
</td>
<td>character
</td>
<td>landed title
</td></tr>
<tr>
<td>any_sub_realm_county
</td>
<td>Iterate through all counties in sub-realm
</td>
<td>any_sub_realm_county = { &lt;count=num/all&gt; / &lt;percent=fixed_point&gt; &lt;triggers&gt; }
</td>
<td>
</td>
<td>character
</td>
<td>landed title
</td></tr>
<tr>
<td>any_sub_realm_duchy
</td>
<td>Iterate through all duchies in sub-realm
</td>
<td>any_sub_realm_duchy = { &lt;count=num/all&gt; / &lt;percent=fixed_point&gt; &lt;triggers&gt; }
</td>
<td>
</td>
<td>character
</td>
<td>landed title
</td></tr>
<tr>
<td>any_sub_realm_empire
</td>
<td>Iterate through all empires in sub-realm
</td>
<td>any_sub_realm_empire = { &lt;count=num/all&gt; / &lt;percent=fixed_point&gt; &lt;triggers&gt; }
</td>
<td>
</td>
<td>character
</td>
<td>landed title
</td></tr>
<tr>
<td>any_sub_realm_kingdom
</td>
<td>Iterate through all kingdoms in sub-realm
</td>
<td>any_sub_realm_kingdom = { &lt;count=num/all&gt; / &lt;percent=fixed_point&gt; &lt;triggers&gt; }
</td>
<td>
</td>
<td>character
</td>
<td>landed title
</td></tr>
<tr>
<td>any_sub_realm_title
</td>
<td>Iterate through all titles in sub-realm
</td>
<td>any_sub_realm_title = { &lt;count=num/all&gt; / &lt;percent=fixed_point&gt; &lt;triggers&gt; }
</td>
<td>
</td>
<td>character
</td>
<td>landed title
</td></tr>
<tr>
<td>any_targeting_faction
</td>
<td>Iterate through all factions targeting the scoped character
</td>
<td>any_targeting_faction = { &lt;count=num/all&gt; / &lt;percent=fixed_point&gt; &lt;triggers&gt; }
</td>
<td>
</td>
<td>character
</td>
<td>faction
</td></tr>
<tr>
<td>any_targeting_scheme
</td>
<td>Iterate through all schemes targeting the character
</td>
<td>any_targeting_scheme = { &lt;count=num/all&gt; / &lt;percent=fixed_point&gt; &lt;triggers&gt; }
</td>
<td>
</td>
<td>character
</td>
<td>scheme
</td></tr>
<tr>
<td>any_targeting_secret
</td>
<td>Iterate through all secrets that target the specified scope
</td>
<td>any_targeting_secret = { &lt;count=num/all&gt; / &lt;percent=fixed_point&gt; &lt;triggers&gt; }
</td>
<td>
</td>
<td>character
</td>
<td>secret
</td></tr>
<tr>
<td>any_traveling_family_member
</td>
<td>Iterate though all characters that should travel with the scoped one (when moving between courts for instance); includes the scoped character
</td>
<td>any_traveling_family_member = { &lt;count=num/all&gt; / &lt;percent=fixed_point&gt; &lt;triggers&gt; }
</td>
<td>
</td>
<td>character
</td>
<td>character
</td></tr>
<tr>
<td>any_truce_holder
</td>
<td>Iterate through all characters that have a truce with this character
</td>
<td>any_truce_holder = { &lt;count=num/all&gt; / &lt;percent=fixed_point&gt; &lt;triggers&gt; }
</td>
<td>
</td>
<td>character
</td>
<td>character
</td></tr>
<tr>
<td>any_truce_target
</td>
<td>Iterate through all characters this character has a truce with
</td>
<td>any_truce_target = { &lt;count=num/all&gt; / &lt;percent=fixed_point&gt; &lt;triggers&gt; }
</td>
<td>
</td>
<td>character
</td>
<td>character
</td></tr>
<tr>
<td>any_unspent_known_secret
</td>
<td>Iterate through all unspent (not revealed/blackmailed) secrets known by the character
</td>
<td>any_unspent_known_secret = { &lt;count=num/all&gt; / &lt;percent=fixed_point&gt; &lt;triggers&gt; }
</td>
<td>
</td>
<td>character
</td>
<td>secret
</td></tr>
<tr>
<td>any_vassal
</td>
<td>Iterate through all DIRECT vassals
</td>
<td>any_vassal = { &lt;count=num/all&gt; / &lt;percent=fixed_point&gt; &lt;triggers&gt; }
</td>
<td>
</td>
<td>character
</td>
<td>character
</td></tr>
<tr>
<td>any_vassal_or_below
</td>
<td>Iterate through ALL vassals, not just direct vassals
</td>
<td>any_vassal_or_below = { &lt;count=num/all&gt; / &lt;percent=fixed_point&gt; &lt;triggers&gt; }
</td>
<td>
</td>
<td>character
</td>
<td>character
</td></tr>
<tr>
<td>any_war_ally
</td>
<td>Iterate through all direct war allies
</td>
<td>any_war_ally = { &lt;count=num/all&gt; / &lt;percent=fixed_point&gt; &lt;triggers&gt; }
</td>
<td>
</td>
<td>character
</td>
<td>character
</td></tr>
<tr>
<td>any_war_enemy
</td>
<td>Iterate through all direct war enemies
</td>
<td>any_war_enemy = { &lt;count=num/all&gt; / &lt;percent=fixed_point&gt; &lt;triggers&gt; }
</td>
<td>
</td>
<td>character
</td>
<td>character
</td></tr>
<tr>
<td>attraction
</td>
<td>Attraction value for the scoped character
</td>
<td>
</td>
<td>&lt;, &lt;=, =,&#160;!=, &gt;, &gt;=
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>base_weight
</td>
<td>Base weight of the scoped character
</td>
<td>base_weight &gt; 10
</td>
<td>&lt;, &lt;=, =,&#160;!=, &gt;, &gt;=
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>can_add_hook
</td>
<td>Will trying to hook the target character override the current hook? (if no current hook, always returns true)
</td>
<td>can_add_hook = {
<p>target = &lt;character&gt;
type = &lt;hook type&gt;
days/months/year = whatever (optional; will use the duration from the type if not provided)
}
</p>
</td>
<td>
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>can_attack_in_hierarchy
</td>
<td>Can the scope character attack the given character based on their liege-vassal relations?
</td>
<td>
</td>
<td>character target
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>can_be_child_of
</td>
<td>Would the target character have been able to have children at the time of the scoped character's birth? Only age is taken into account
</td>
<td>
</td>
<td>character target
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>can_be_parent_of
</td>
<td>Would the scoped character have been able to have children at the time of the target character's birth? Only age is taken into account
</td>
<td>
</td>
<td>character target
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>can_create_faction
</td>
<td>Can the character create the faction of the specified type against the specified character?
</td>
<td>can_create_faction = { type = X target = Y }
</td>
<td>
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>can_execute_decision
</td>
<td>Is the scoped character able to execute the given decision?
</td>
<td>
</td>
<td>
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>can_have_children
</td>
<td>Can the character have children? Only checks hard blocks from traits, not fertility
</td>
<td>can_have_children = yes/no
</td>
<td>yes/no
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>can_join_activities
</td>
<td>Can the character join activities?
</td>
<td>
</td>
<td>yes/no
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>can_join_faction
</td>
<td>Can the scope character join the faction?
</td>
<td>can_join_faction = faction
</td>
<td>
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>can_join_or_create_faction_against
</td>
<td>Can the scope character create if join a faction against the target?
</td>
<td>can_join_or_create_faction_against = scope:faction_target
<p>can_join_or_create_faction_against = {
	who = scope:faction_target
	faction = faction_key # optional
	check_in_a_faction = no # default: yes
}
</p>
</td>
<td>character target
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>can_start_scheme
</td>
<td>Can the character start the given scheme against the given character?
</td>
<td>can_start_scheme = { type = X target = Y }
</td>
<td>
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>character_has_commander_trait_scope_does_not
</td>
<td>Does the character have a commander trait that the scope does not?
</td>
<td>
</td>
<td>character target
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>character_is_land_realm_neighbor
</td>
<td>Is the scoped character a realm neighbor of the target? Meaning they're independent or have the same liege, and border your realm.
</td>
<td>
</td>
<td>character target
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>character_is_realm_neighbor
</td>
<td>Is the scoped character a realm neighbor of the target? Meaning they're independent or has the same liege, and border your realm. Including across two sea zones
</td>
<td>
</td>
<td>character target
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>completely_controls
</td>
<td>Coes the character control all counties and baronies inside de jure title (no hostile occupation either)?
</td>
<td>
</td>
<td>landed title scope
</td>
<td>character
</td>
<td>landed title
</td></tr>
<tr>
<td>completely_controls_region
</td>
<td>Does the character control all counties and baronies inside the specified region (no hostile occupation either)?
</td>
<td>
</td>
<td>
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>council_task_monthly_progress
</td>
<td>Is the scoped character's monthly progress on their assigned council task this big?
</td>
<td>
</td>
<td>&lt;, &lt;=, =,&#160;!=, &gt;, &gt;=
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>create_faction_type_chance
</td>
<td>Check if the chance to create a faction against a target of the scope character is is true against the scripted value
</td>
<td>create_faction_type_chance = {
<pre>   type = faction_type #An ongoing faction
   target = target_character
   value &lt;|&lt;=|&gt;=|&gt; 0
</pre>
<p>}
</p>
</td>
<td>
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>current_weight
</td>
<td>Current weight of the scoped character
</td>
<td>current_weight &gt; 10
</td>
<td>&lt;, &lt;=, =,&#160;!=, &gt;, &gt;=
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>current_weight_for_portrait
</td>
<td>Current weight of the scoped character as a value for portraits scaled between 0.0 and 1.0
</td>
<td>current_weight_for_portrait &gt; 0.1
</td>
<td>&lt;, &lt;=, =,&#160;!=, &gt;, &gt;=
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>days_in_prison
</td>
<td>Number of days the character has been imprisoned for (0 if not imprisoned)
</td>
<td>
</td>
<td>&lt;, &lt;=, =,&#160;!=, &gt;, &gt;=
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>days_of_continuous_peace
</td>
<td>Number of days the character has been at peace (0 if at war). Raids count as 'not peace'
</td>
<td>
</td>
<td>&lt;, &lt;=, =,&#160;!=, &gt;, &gt;=
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>days_of_continuous_war
</td>
<td>Number of days the character has been at war (0 if at peace)
</td>
<td>
</td>
<td>&lt;, &lt;=, =,&#160;!=, &gt;, &gt;=
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>death_reason
</td>
<td>Does the scoped character have the given death reason?
</td>
<td>death_reason = death_natural_causes
</td>
<td>
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>diplomacy
</td>
<td>Does the character have the required diplomacy skill level?
</td>
<td>
</td>
<td>&lt;, &lt;=, =,&#160;!=, &gt;, &gt;=
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>diplomacy_diff
</td>
<td>Does the character have the required diplomacy skill level difference against target?
</td>
<td>diplomacy = { target = character value &lt;= script_value abs = yes/no(optional, default no) }
</td>
<td>&lt;, &lt;=, =,&#160;!=, &gt;, &gt;=
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>diplomacy_for_portrait
</td>
<td>Diplomacy skill scaled between 0.0 and 1.0 for portraits
</td>
<td>
</td>
<td>&lt;, &lt;=, =,&#160;!=, &gt;, &gt;=
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>diplomacy_lifestyle_perk_points
</td>
<td>How many diplomacy perk points does the character have available?
</td>
<td>
</td>
<td>&lt;, &lt;=, =,&#160;!=, &gt;, &gt;=
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>diplomacy_lifestyle_perks
</td>
<td>How many diplomacy perks does the character have?
</td>
<td>
</td>
<td>&lt;, &lt;=, =,&#160;!=, &gt;, &gt;=
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>diplomacy_lifestyle_xp
</td>
<td>How much diplomacy lifestyle experience does the character have?
</td>
<td>
</td>
<td>&lt;, &lt;=, =,&#160;!=, &gt;, &gt;=
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>does_ai_liege_in_vassal_contract_desire_obligation_change
</td>
<td>Does the AI liege in a vassal contract desire changing an obligation level?
</td>
<td>
</td>
<td>yes/no
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>does_ai_vassal_in_vassal_contract_desire_obligation_change
</td>
<td>Does the AI vassal in a vassal contract desire changing an obligation level?
</td>
<td>
</td>
<td>yes/no
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>domain_limit
</td>
<td>Is the scoped character's domain limit this big?
</td>
<td>
</td>
<td>&lt;, &lt;=, =,&#160;!=, &gt;, &gt;=
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>domain_limit_available
</td>
<td>Is there this much space left in the character's domain limit? Negative values also work for checking characters that are above their limit
</td>
<td>
</td>
<td>&lt;, &lt;=, =,&#160;!=, &gt;, &gt;=
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>domain_limit_percentage
</td>
<td>Is the scoped character's domain this big in comparison to their limit?
</td>
<td>
</td>
<td>&lt;, &lt;=, =,&#160;!=, &gt;, &gt;=
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>domain_size
</td>
<td>Is the scoped character's domain this big?
</td>
<td>
</td>
<td>&lt;, &lt;=, =,&#160;!=, &gt;, &gt;=
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>dread
</td>
<td>Does the character have the required dread?
</td>
<td>
</td>
<td>&lt;, &lt;=, =,&#160;!=, &gt;, &gt;=
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>dread_modified_ai_boldness
</td>
<td>AI boldness modified by the dread of the specified character
</td>
<td>dread_modified_ai_boldness = {
<p>	character = root	# the character whose dread is affecting the target character
	value &gt;= 5
}
</p>
</td>
<td>
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>effective_age
</td>
<td>Age of character. If immortal, age they became immortal at
</td>
<td>
</td>
<td>&lt;, &lt;=, =,&#160;!=, &gt;, &gt;=
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>fertility
</td>
<td>Does the character have the required fertility?
</td>
<td>
</td>
<td>&lt;, &lt;=, =,&#160;!=, &gt;, &gt;=
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>focus_progress
</td>
<td>Does the character have this much focus progress?
</td>
<td>
</td>
<td>&lt;, &lt;=, =,&#160;!=, &gt;, &gt;=
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>gold
</td>
<td>GHoes the character have the required gold?
</td>
<td>
</td>
<td>&lt;, &lt;=, =,&#160;!=, &gt;, &gt;=
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>government_allows
</td>
<td>Checks if the government of the character allows something
</td>
<td>
</td>
<td>
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>government_disallows
</td>
<td>Checks if the government of the character disallows something
</td>
<td>
</td>
<td>
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>government_has_flag
</td>
<td>Checks if the government of the character has a specific flag
</td>
<td>
</td>
<td>
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>has_any_cb_on
</td>
<td>Does the scope character have any casus belli on the target character?
</td>
<td>
</td>
<td>character target
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>has_any_display_cb_on
</td>
<td>Does the scope character have any casus belli on the target character that should be displayed? (Allowed to fail valid_to_start_display_regardless)
</td>
<td>
</td>
<td>character target
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>has_any_focus
</td>
<td>Does the character have any focus set?
</td>
<td>
</td>
<td>yes/no
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>has_any_nickname
</td>
<td>Does the scope character have a nickname?
</td>
<td>
</td>
<td>yes/no
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>has_any_scripted_relation
</td>
<td>Does the scope character have any scripted relation with the target character?
</td>
<td>
</td>
<td>character target
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>has_any_secret_relation
</td>
<td>Does the scope character have any secret relationship with the target character?
</td>
<td>
</td>
<td>character target
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>has_any_secrets
</td>
<td>Does the character have any secrets?
</td>
<td>
</td>
<td>yes/no
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>has_bad_nickname
</td>
<td>Does the scope character have a bad nickname?
</td>
<td>
</td>
<td>yes/no
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>has_banish_reason
</td>
<td>Does the character have the banish reason towards the target?
</td>
<td>
</td>
<td>character target
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>has_cb_on
</td>
<td>Does the scoped character have the specified casus belli on the taget character? Invalid target returns false
</td>
<td>has_cb_on = { target = X casus_belli/cb = Y }
</td>
<td>
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>has_character_flag
</td>
<td>Does the character have this flag?
</td>
<td>
</td>
<td>
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>has_character_modifier
</td>
<td>Does the scoped character have a given modifier?
</td>
<td>has_character_modifier = name
</td>
<td>
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>has_character_modifier_duration_remaining
</td>
<td>Does the scoped character have the duration remaining on a given modifier?
</td>
<td>has_character_modifier_duration_remaining = name
</td>
<td>
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>has_claim_on
</td>
<td>Does the character have a claim on the target title?
</td>
<td>
</td>
<td>landed title target
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>has_council_position
</td>
<td>Does the scoped character have the given position?
</td>
<td>
</td>
<td>
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>has_councillor_for_skill
</td>
<td>Does the scoped character have a councillor for the specified skill?
</td>
<td>has_councillor_for_skill = X, where X is a skill name or 'general'
</td>
<td>
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>has_culture
</td>
<td>Does the character have this culture?
</td>
<td>
</td>
<td>
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>has_culture_group
</td>
<td>Is the character's culture in this culture group?
</td>
<td>has_culture_group = culture_group:east_slavic_group
</td>
<td>culture group scope
</td>
<td>character
</td>
<td>culture group
</td></tr>
<tr>
<td>has_de_jure_claim_on
</td>
<td>Does the scope character have a de jure claim against the target?
</td>
<td>
</td>
<td>character target
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>has_disable_non_aggression_pacts
</td>
<td>Does the character have disabled non-aggression pacts with the target?
</td>
<td>
</td>
<td>character target
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>has_divorce_reason
</td>
<td>Does the character have the divorce reason towards the target?
</td>
<td>
</td>
<td>character target
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>has_dread_level_towards
</td>
<td>How scared is the scope character of the target? 0 = not intimidated, 1 = intimidated, 2 = terrified.
</td>
<td>has_dread_level_towards = {
<p>target = X
level &gt;/&lt;/&gt;=/&lt;=/= Y
}
</p>
</td>
<td>
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>has_dynasty
</td>
<td>Does the character have a valid dynasty?
</td>
<td>
</td>
<td>yes/no
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>has_election_vote_of
</td>
<td>Is the target character voting for the scoped character in the election of the target title
</td>
<td>has_election_vote_of = { who = scope:actor title = primary_title }
</td>
<td>
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>has_execute_reason
</td>
<td>Does the character have the execute reason towards the target?
</td>
<td>
</td>
<td>character target
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>has_faith
</td>
<td>Does the character have this faith?
</td>
<td>has_faith = faith:baltic_pagan
</td>
<td>faith scope
</td>
<td>character
</td>
<td>faith
</td></tr>
<tr>
<td>has_father
</td>
<td>does the character have a valid living father?
</td>
<td>
</td>
<td>yes/no
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>has_focus
</td>
<td>Does the character have this focus?
</td>
<td>
</td>
<td>
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>has_free_council_slot
</td>
<td>Does the scope character have a council position to fill? (ignoring automatically filled positions)
</td>
<td>
</td>
<td>yes/no
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>has_gene
</td>
<td>Does the character have the specified gene template? Only works for morph genes. An interface trigger, can only be used in specific places
</td>
<td>has_gene = { category = X template = Y }
</td>
<td>
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>has_government
</td>
<td>Checks if the character has a specific government type
</td>
<td>has_government = X
<p>Where X is any government type (e.g. feudal_government, clan_government, tribal_government, etc.)
</p>
</td>
<td>
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>has_had_focus_for_days
</td>
<td>Has the character had a focus for the given amount of time?
</td>
<td>
</td>
<td>&lt;, &lt;=, =,&#160;!=, &gt;, &gt;=
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>has_hook
</td>
<td>Does the character have a hook on the target?
</td>
<td>has_hook = &lt;character&gt;
</td>
<td>character scope
</td>
<td>character
</td>
<td>character
</td></tr>
<tr>
<td>has_hook_from_secret
</td>
<td>Does the character have a hook based on the target's secret?
</td>
<td>has_hook_from_secret = scope:saved_secret
</td>
<td>
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>has_hook_of_type
</td>
<td>Does the character have a hook on the target of the given type?
</td>
<td>has_hook_of_type = { target = X type = Y }
</td>
<td>
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>has_imprisonment_reason
</td>
<td>Does the character have an imprisonment reason towards the target?
</td>
<td>
</td>
<td>character target
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>has_inactive_trait
</td>
<td>Does the character have this trait or a trait of this trait group amongst their inactive traits?
</td>
<td>
</td>
<td>
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>has_lifestyle
</td>
<td>Does the character have this lifestyle?
</td>
<td>
</td>
<td>
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>has_mother
</td>
<td>Does the character have a valid living mother?
</td>
<td>
</td>
<td>yes/no
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>has_nickname
</td>
<td>Does the character have this nickname?
</td>
<td>
</td>
<td>
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>has_non_aggression_pact
</td>
<td>Does the character have a non-aggression pact with the target?
</td>
<td>
</td>
<td>character target
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>has_non_interference
</td>
<td>Does the character have the non-interference reason towards the target?
</td>
<td>
</td>
<td>character target
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>has_opinion_modifier
</td>
<td>&lt;=|=|&gt;=|&gt; X* or *value = { MIN MAX }* inclusive)
</td>
<td>
</td>
<td>
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>has_opposite_relation
</td>
<td>Does the scoped character have an opposite relationship of the relation value with the target character? target = , relation =
</td>
<td>
</td>
<td>
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>has_owned_scheme
</td>
<td>Does this character own a scheme?
</td>
<td>
</td>
<td>yes/no
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>has_pending_interaction_of_type
</td>
<td>Does the character have a pending interaction of the type? Only works if the scope is player-controlled.
</td>
<td>Example: has_pending_interaction = interaction_key
</td>
<td>
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>has_perk
</td>
<td>Does the character have this perk?
</td>
<td>
</td>
<td>
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>has_primary_title
</td>
<td>Does the character has specific title as his primary title?
</td>
<td>
</td>
<td>landed title scope
</td>
<td>character
</td>
<td>landed title
</td></tr>
<tr>
<td>has_raid_immunity_against
</td>
<td>Is the scoped character's (top-liege) realm immune to raiding by the target due to having defeated their raid army?
</td>
<td>has_raid_immunity_against = scope:character
</td>
<td>character scope
</td>
<td>character
</td>
<td>character
</td></tr>
<tr>
<td>has_raised_armies
</td>
<td>Does the character have raised or gathering armies?
</td>
<td>
</td>
<td>yes/no
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>has_realm_law
</td>
<td>Does the scoped character have the given realm law?
</td>
<td>
</td>
<td>
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>has_realm_law_flag
</td>
<td>Does the scoped character have a law with the given flag?
</td>
<td>
</td>
<td>
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>has_relation_best_friend
</td>
<td>Checks for a scripted relationship with a target character
</td>
<td>
</td>
<td>character target
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>has_relation_bully
</td>
<td>Checks for a scripted relationship with a target character
</td>
<td>
</td>
<td>character target
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>has_relation_court_physician
</td>
<td>Checks for a scripted relationship with a target character
</td>
<td>
</td>
<td>character target
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>has_relation_crush
</td>
<td>Checks for a scripted relationship with a target character
</td>
<td>
</td>
<td>character target
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>has_relation_flag
</td>
<td>Does the scope character have a specific flag on a relation with the target character? target = , relation = , flag =
</td>
<td>
</td>
<td>
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>has_relation_friend
</td>
<td>Checks for a scripted relationship with a target character
</td>
<td>
</td>
<td>character target
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>has_relation_guardian
</td>
<td>Checks for a scripted relationship with a target character
</td>
<td>
</td>
<td>character target
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>has_relation_intrigue_mentor
</td>
<td>Checks for a scripted relationship with a target character
</td>
<td>
</td>
<td>character target
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>has_relation_intrigue_student
</td>
<td>Checks for a scripted relationship with a target character
</td>
<td>
</td>
<td>character target
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>has_relation_lover
</td>
<td>Checks for a scripted relationship with a target character
</td>
<td>
</td>
<td>character target
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>has_relation_mentor
</td>
<td>Checks for a scripted relationship with a target character
</td>
<td>
</td>
<td>character target
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>has_relation_nemesis
</td>
<td>Checks for a scripted relationship with a target character
</td>
<td>
</td>
<td>character target
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>has_relation_oaf
</td>
<td>Checks for a scripted relationship with a target character
</td>
<td>
</td>
<td>character target
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>has_relation_potential_friend
</td>
<td>Checks for a scripted relationship with a target character
</td>
<td>
</td>
<td>character target
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>has_relation_potential_lover
</td>
<td>Checks for a scripted relationship with a target character
</td>
<td>
</td>
<td>character target
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>has_relation_potential_rival
</td>
<td>Checks for a scripted relationship with a target character
</td>
<td>
</td>
<td>character target
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>has_relation_rival
</td>
<td>Checks for a scripted relationship with a target character
</td>
<td>
</td>
<td>character target
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>has_relation_soldier_friend
</td>
<td>Checks for a scripted relationship with a target character
</td>
<td>
</td>
<td>character target
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>has_relation_soulmate
</td>
<td>Checks for a scripted relationship with a target character
</td>
<td>
</td>
<td>character target
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>has_relation_student
</td>
<td>Checks for a scripted relationship with a target character
</td>
<td>
</td>
<td>character target
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>has_relation_victim
</td>
<td>Checks for a scripted relationship with a target character
</td>
<td>
</td>
<td>character target
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>has_relation_ward
</td>
<td>Checks for a scripted relationship with a target character
</td>
<td>
</td>
<td>character target
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>has_religion
</td>
<td>Does the character have this religion?
</td>
<td>has_religion = religion:buddhism_religion
</td>
<td>religion scope
</td>
<td>character
</td>
<td>religion
</td></tr>
<tr>
<td>has_revoke_title_reason
</td>
<td>Does the character have the revoke title reason towards the target?
</td>
<td>
</td>
<td>character target
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>has_same_culture_as
</td>
<td>Does the character have the same culture as the target?
</td>
<td>
</td>
<td>character target
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>has_same_culture_group_as
</td>
<td>Does the character have the same culture group as the target?
</td>
<td>
</td>
<td>character target
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>has_same_focus_as
</td>
<td>Does the character have the same focus as the other?
</td>
<td>
</td>
<td>character target
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>has_same_government
</td>
<td>Checks if the character has the same government type as another character
</td>
<td>
</td>
<td>character target
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>has_secret_relation_best_friend
</td>
<td>Checks for a secret scripted relationship with a target character
</td>
<td>
</td>
<td>character target
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>has_secret_relation_bully
</td>
<td>Checks for a secret scripted relationship with a target character
</td>
<td>
</td>
<td>character target
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>has_secret_relation_court_physician
</td>
<td>Checks for a secret scripted relationship with a target character
</td>
<td>
</td>
<td>character target
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>has_secret_relation_crush
</td>
<td>Checks for a secret scripted relationship with a target character
</td>
<td>
</td>
<td>character target
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>has_secret_relation_friend
</td>
<td>Checks for a secret scripted relationship with a target character
</td>
<td>
</td>
<td>character target
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>has_secret_relation_guardian
</td>
<td>Checks for a secret scripted relationship with a target character
</td>
<td>
</td>
<td>character target
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>has_secret_relation_intrigue_mentor
</td>
<td>Checks for a secret scripted relationship with a target character
</td>
<td>
</td>
<td>character target
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>has_secret_relation_intrigue_student
</td>
<td>Checks for a secret scripted relationship with a target character
</td>
<td>
</td>
<td>character target
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>has_secret_relation_lover
</td>
<td>Checks for a secret scripted relationship with a target character
</td>
<td>
</td>
<td>character target
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>has_secret_relation_mentor
</td>
<td>Checks for a secret scripted relationship with a target character
</td>
<td>
</td>
<td>character target
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>has_secret_relation_nemesis
</td>
<td>Checks for a secret scripted relationship with a target character
</td>
<td>
</td>
<td>character target
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>has_secret_relation_oaf
</td>
<td>Checks for a secret scripted relationship with a target character
</td>
<td>
</td>
<td>character target
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>has_secret_relation_potential_friend
</td>
<td>Checks for a secret scripted relationship with a target character
</td>
<td>
</td>
<td>character target
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>has_secret_relation_potential_lover
</td>
<td>Checks for a secret scripted relationship with a target character
</td>
<td>
</td>
<td>character target
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>has_secret_relation_potential_rival
</td>
<td>Checks for a secret scripted relationship with a target character
</td>
<td>
</td>
<td>character target
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>has_secret_relation_rival
</td>
<td>Checks for a secret scripted relationship with a target character
</td>
<td>
</td>
<td>character target
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>has_secret_relation_soldier_friend
</td>
<td>Checks for a secret scripted relationship with a target character
</td>
<td>
</td>
<td>character target
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>has_secret_relation_soulmate
</td>
<td>Checks for a secret scripted relationship with a target character
</td>
<td>
</td>
<td>character target
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>has_secret_relation_student
</td>
<td>Checks for a secret scripted relationship with a target character
</td>
<td>
</td>
<td>character target
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>has_secret_relation_victim
</td>
<td>Checks for a secret scripted relationship with a target character
</td>
<td>
</td>
<td>character target
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>has_secret_relation_ward
</td>
<td>Checks for a secret scripted relationship with a target character
</td>
<td>
</td>
<td>character target
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>has_sexuality
</td>
<td>Does the character's sexuality match the scripted? (heterosexual, homosexual, bisexual, asexual, none). Characters that have yet to get a sexuality (children) have none set.
</td>
<td>
</td>
<td>
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>has_strong_claim_on
</td>
<td>Does the character have a pressed claim on the target title?
</td>
<td>
</td>
<td>landed title target
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>has_strong_hook
</td>
<td>Does the character have a strong hook on the target?
</td>
<td>has_strong_hook = &lt;character&gt;
</td>
<td>character scope
</td>
<td>character
</td>
<td>character
</td></tr>
<tr>
<td>has_strong_usable_hook
</td>
<td>Does the character have a strong hook on the target that is not on cooldown?
</td>
<td>has_strong_usable_hook = &lt;character&gt;
</td>
<td>character scope
</td>
<td>character
</td>
<td>character
</td></tr>
<tr>
<td>has_targeting_faction
</td>
<td>Is there a faction targeting the scoped character?
</td>
<td>
</td>
<td>yes/no
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>has_title
</td>
<td>Does the character hold the title?
</td>
<td>
</td>
<td>landed title scope
</td>
<td>character
</td>
<td>landed title
</td></tr>
<tr>
<td>has_trait
</td>
<td>Does the character have this trait or a trait of this trait group?
</td>
<td>
</td>
<td>
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>has_trait_rank
</td>
<td>Compare the trait rank of a character to a value or other character.
</td>
<td>has_trait_rank = {
<pre> trait = TRAIT_GROUP
 rank &lt;=&gt; number (can be script value) # need only one of rank or character
 character &lt;=&gt; character target # need only one of rank or character
</pre>
<p>}
Note that not having the trait and having rank 0 count as the same thing. rank &lt; X on its own will therefore return true for a character that does not have the trait.
</p>
</td>
<td>
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>has_trait_with_flag
</td>
<td>Does the scope character have a trait with a certain flag?
</td>
<td>has_trait_with_flag = can_not_marry
</td>
<td>
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>has_truce
</td>
<td>Does the scope character have a truce with the target character? Truces are one way, which means we ask if the scope character can't attack the target character
</td>
<td>
</td>
<td>character target
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>has_usable_hook
</td>
<td>Does the character have a hook on the target that isn't on cooldown
</td>
<td>has_usable_hook = &lt;character&gt;
</td>
<td>character scope
</td>
<td>character
</td>
<td>character
</td></tr>
<tr>
<td>has_weak_claim_on
</td>
<td>Does the character have an unpressed claim on the target title?
</td>
<td>
</td>
<td>landed title target
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>has_weak_hook
</td>
<td>Does the character have a weak hook on the target? A strong hook will *not* count.
</td>
<td>has_weak_hook = &lt;character&gt;
</td>
<td>character scope
</td>
<td>character
</td>
<td>character
</td></tr>
<tr>
<td>health
</td>
<td>Does the character have the required health?
</td>
<td>
</td>
<td>&lt;, &lt;=, =,&#160;!=, &gt;, &gt;=
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>highest_held_title_tier
</td>
<td>What is the highest held landed title tier of the character?
</td>
<td>
</td>
<td>&lt;, &lt;=, =,&#160;!=, &gt;, &gt;=
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>highest_skill
</td>
<td>Is the skill the highest skill (excluding prowess) of the character? True if tied for highest
</td>
<td>
</td>
<td>
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>holds_landed_title
</td>
<td>Is the scope character landed (holds a county or barony)?
</td>
<td>
</td>
<td>yes/no
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>important_action_is_valid_but_invisible
</td>
<td>Is there an important action available to the character, but they dismissed it?
</td>
<td>important_action_is_valid_but_invisible = important_action_key
</td>
<td>
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>important_action_is_visible
</td>
<td>Is there an important action shown to the character?
</td>
<td>important_action_is_visible = important_action_key
</td>
<td>
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>in_activity_type
</td>
<td>Is the character in an activity of the specified type?
</td>
<td>
</td>
<td>
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>in_activity_with
</td>
<td>Is the character in the same activity?
</td>
<td>
</td>
<td>character target
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>in_diplomatic_range
</td>
<td>Are the scoped character and the target character within each other's diplomatic range?
</td>
<td>
</td>
<td>character target
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>intrigue
</td>
<td>Does the character have the required intrigue skill level?
</td>
<td>
</td>
<td>&lt;, &lt;=, =,&#160;!=, &gt;, &gt;=
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>intrigue_diff
</td>
<td>Does the character have the required intrigue skill level difference against target?
</td>
<td>intrigue = { target = character value &lt;= script_value abs = yes/no(optional, default no) }
</td>
<td>&lt;, &lt;=, =,&#160;!=, &gt;, &gt;=
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>intrigue_for_portrait
</td>
<td>Intrigue skill scaled between 0.0 and 1.0 for portraits
</td>
<td>
</td>
<td>&lt;, &lt;=, =,&#160;!=, &gt;, &gt;=
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>intrigue_lifestyle_perk_points
</td>
<td>How many intrigue perk points does the character have available?
</td>
<td>
</td>
<td>&lt;, &lt;=, =,&#160;!=, &gt;, &gt;=
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>intrigue_lifestyle_perks
</td>
<td>How many intrigue perks does the character have?
</td>
<td>
</td>
<td>&lt;, &lt;=, =,&#160;!=, &gt;, &gt;=
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>intrigue_lifestyle_xp
</td>
<td>How much intrigue lifestyle experience does the character have?
</td>
<td>
</td>
<td>&lt;, &lt;=, =,&#160;!=, &gt;, &gt;=
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>is_a_faction_leader
</td>
<td>Is the scoped character a leader of a faction?
</td>
<td>
</td>
<td>yes/no
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>is_a_faction_member
</td>
<td>Is the scoped character a member of a faction?
</td>
<td>
</td>
<td>yes/no
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>is_adult
</td>
<td>Is the scoped character adult?
</td>
<td>
</td>
<td>yes/no
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>is_agent_exposed_in_scheme
</td>
<td>Is the scoped character an exposed agent in the target scheme?
</td>
<td>
</td>
<td>
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>is_ai
</td>
<td>Is the character played by AI?
</td>
<td>
</td>
<td>yes/no
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>is_alive
</td>
<td>Is the character alive?
</td>
<td>
</td>
<td>yes/no
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>is_allied_in_war
</td>
<td>Is the scoped character allied to the target character in a war?
</td>
<td>
</td>
<td>character target
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>is_allied_to
</td>
<td>Is the scoped character allied to the target character?
</td>
<td>
</td>
<td>character target
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>is_at_home
</td>
<td>Is the character at home?
</td>
<td>
</td>
<td>yes/no
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>is_at_location
</td>
<td>Is the character currently in the target province?
</td>
<td>
</td>
<td>province target
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>is_at_same_location
</td>
<td>Is the character currently in the same province as the target character?
</td>
<td>
</td>
<td>character target
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>is_at_war
</td>
<td>Is the character at war? Does not consider lieges' wars
</td>
<td>
</td>
<td>yes/no
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>is_at_war_as_attacker
</td>
<td>Is the character at war as an attacker? Does not consider lieges' wars
</td>
<td>
</td>
<td>yes/no
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>is_at_war_as_defender
</td>
<td>Is the character at war as a defender? Does not consider lieges' wars
</td>
<td>
</td>
<td>yes/no
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>is_at_war_with
</td>
<td>Is the character at war with the target? Does not consider lieges' wars
</td>
<td>
</td>
<td>character target
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>is_at_war_with_liege
</td>
<td>Is the character at war with their liege?
</td>
<td>
</td>
<td>yes/no
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>is_attacker_in_war
</td>
<td>Is the scope character in the target war as an attacker?
</td>
<td>
</td>
<td>
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>is_attracted_to_gender_of
</td>
<td>Does the sexuality of the scope character make them attracted to the target character?
</td>
<td>
</td>
<td>character target
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>is_attracted_to_men
</td>
<td>Is the character attracted to men?
</td>
<td>
</td>
<td>yes/no
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>is_attracted_to_women
</td>
<td>Is the character attracted to women?
</td>
<td>
</td>
<td>yes/no
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>is_away_from_court
</td>
<td>Is the character away from the court?
</td>
<td>
</td>
<td>yes/no
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>is_betrothed
</td>
<td>Is the scope character betrothed?
</td>
<td>
</td>
<td>yes/no
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>is_causing_raid_hostility_towards
</td>
<td>Is the scoped character making the target hostile due to having raided their (top-liege's) realm?
</td>
<td>is_causing_raid_hostility_towards = scope:character
</td>
<td>character scope
</td>
<td>character
</td>
<td>character
</td></tr>
<tr>
<td>is_character_interaction_potentially_accepted
</td>
<td>Is the character interaction specified available and potentially accepted for the target character?
</td>
<td>is_character_interaction_potentially_accepted = {
<pre>   recipient = character
   interaction = interaction_name
</pre>
<p>}
</p>
</td>
<td>
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>is_character_interaction_shown
</td>
<td>Is the character interaction specified shown for the target character?
</td>
<td>is_character_interaction_shown = {
<pre>   recipient = character
   interaction = interaction_name
</pre>
<p>}
</p>
</td>
<td>
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>is_character_interaction_valid
</td>
<td>Is the character interaction specified valid (shown and usable) for the target character?
</td>
<td>is_character_interaction_valid = {
<pre>   recipient = character
   interaction = interaction_name
</pre>
<p>}
</p>
</td>
<td>
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>is_character_window_main_character
</td>
<td>Does the local player have knowledge about the secret?
</td>
<td>An interface trigger, can only be used in specific places
</td>
<td>yes/no
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>is_child_of
</td>
<td>Is the character a child of the target character?
</td>
<td>
</td>
<td>character target
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>is_claimant
</td>
<td>Is the character a claimant to any landed titles?
</td>
<td>
</td>
<td>yes/no
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>is_clergy
</td>
<td>Is the scoped character clergy?
</td>
<td>
</td>
<td>yes/no
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>is_close_family_of
</td>
<td>Is the character a close family [parents, children, siblings, grandparents, grandchildren] of the target character?
</td>
<td>
</td>
<td>character target
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>is_close_or_extended_family_of
</td>
<td>Is the character a close or extended family [parents, children, siblings, grandparents, grandchildren, cousins, uncles, aunts, nephews, nieces] of the target character?
</td>
<td>
</td>
<td>character target
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>is_commanding_army
</td>
<td>Is the character commanding an army?
</td>
<td>
</td>
<td>yes/no
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>is_concubine
</td>
<td>Is the scoped character a concubine?
</td>
<td>
</td>
<td>yes/no
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>is_concubine_of
</td>
<td>Is the target character a concubine of the scoped character?
</td>
<td>
</td>
<td>character target
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>is_consort_of
</td>
<td>Is the character a spouse or concubine of the target character?
</td>
<td>
</td>
<td>character target
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>is_councillor
</td>
<td>Is the scoped character a councillor?
</td>
<td>
</td>
<td>yes/no
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>is_councillor_of
</td>
<td>Is the scoped character a councillor for the specified character?
</td>
<td>
</td>
<td>character target
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>is_courtier
</td>
<td>Is the scope character a courtier?
</td>
<td>
</td>
<td>yes/no
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>is_courtier_of
</td>
<td>Is the scoped character a courtier of the target character?
</td>
<td>
</td>
<td>character target
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>is_cousin_of
</td>
<td>Is the character a cousin of the target character?
</td>
<td>
</td>
<td>character target
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>is_defender_in_war
</td>
<td>Is the scoped character in the target war as a defender?
</td>
<td>
</td>
<td>
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>is_employer_of
</td>
<td>Is the target character a courtier of the scope character?
</td>
<td>
</td>
<td>character target
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>is_extended_family_of
</td>
<td>Is the character extended family [cousins, uncles, aunts, nephews, nieces] of the target character?
</td>
<td>
</td>
<td>character target
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>is_female
</td>
<td>Is the scoped character female?
</td>
<td>
</td>
<td>yes/no
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>is_forbidden_from_scheme
</td>
<td>Is the scoped character forbidden from joining the target scheme?
</td>
<td>
</td>
<td>
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>is_forced_into_faction
</td>
<td>Is the scope character forced to be part of a faction?
</td>
<td>
</td>
<td>yes/no
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>is_forced_into_scheme
</td>
<td>Checks if the scope character is forced into the target scheme
</td>
<td>
</td>
<td>
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>is_foreign_court_guest
</td>
<td>Is the character a guest from another a court? In contrast to is_pool_guest the character has a liege
</td>
<td>
</td>
<td>yes/no
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>is_foreign_court_guest_of
</td>
<td>Is the character a guest from another a court, visiting the target character's court? In contrast to is_pool_guest_of the character has a liege
</td>
<td>
</td>
<td>character target
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>is_foreign_court_or_pool_guest
</td>
<td>Is the character a guest? (is_pool_guest or is_foreign_court_guest)
</td>
<td>
</td>
<td>yes/no
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>is_foreign_court_or_pool_guest_of
</td>
<td>Is the character a guest? (is_pool_guest_of or is_foreign_court_guest_of)
</td>
<td>
</td>
<td>character target
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>is_grandchild_of
</td>
<td>Is the character a grandchild of the target character?
</td>
<td>
</td>
<td>character target
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>is_grandparent_of
</td>
<td>Is the character a grandparent of the target character?
</td>
<td>
</td>
<td>character target
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>is_great_grandchild_of
</td>
<td>Is the character a great grandchild of the target character?
</td>
<td>
</td>
<td>character target
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>is_great_grandparent_of
</td>
<td>Is the character a great grandparent of the target character?
</td>
<td>
</td>
<td>character target
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>is_heir_of
</td>
<td>Is the character an heir of the target [placeholder]?
</td>
<td>
</td>
<td>character target
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>is_immortal
</td>
<td>Is the character immortal?
</td>
<td>
</td>
<td>yes/no
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>is_imprisoned
</td>
<td>is the character imprisoned?
</td>
<td>
</td>
<td>yes/no
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>is_imprisoned_by
</td>
<td>Is the scope character imprisoned by the target character?
</td>
<td>is_imprisoned_by = TARGET
</td>
<td>character target
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>is_in_an_activity
</td>
<td>Checks whether the character is currently in, or has joined an activity
</td>
<td>
</td>
<td>yes/no
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>is_in_army
</td>
<td>Is the character in an army (a commander or a knight)?
</td>
<td>
</td>
<td>yes/no
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>is_in_civil_war
</td>
<td>Is the character at war with their liege, or one or more of their vassals?
</td>
<td>
</td>
<td>yes/no
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>is_in_ongoing_great_holy_war
</td>
<td>Is the character in an ongoing (i.e. the war has started) great holy war?
</td>
<td>
</td>
<td>yes/no
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>is_in_pool_at
</td>
<td>Is the character in the pool the target province is a part of
</td>
<td>
</td>
<td>province target
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>is_in_prison_type
</td>
<td>Is the character imprisoned in a prison of the specified type? Accepts any static modifier (see also imprison effect).
</td>
<td>is_in_prison_type = house_arrest
</td>
<td>
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>is_in_target_activity
</td>
<td>Is the scope character participating in the target activity?
</td>
<td>
</td>
<td>
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>is_in_the_same_court_as
</td>
<td>Is the character in the same court as the target character (they have the same court owner or one is a courtier of the other)?
</td>
<td>
</td>
<td>character target
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>is_in_the_same_court_as_or_guest
</td>
<td>Is the character in the same court as the target character (they have the same court owner or one is a courtier of the other)? Includes guests in the court.
</td>
<td>
</td>
<td>character target
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>is_incapable
</td>
<td>Is the character incapable?
</td>
<td>
</td>
<td>yes/no
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>is_independent_ruler
</td>
<td>Is the character an independent ruler?
</td>
<td>
</td>
<td>yes/no
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>is_knight
</td>
<td>Is the scoped character a knight?
</td>
<td>
</td>
<td>yes/no
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>is_knight_of
</td>
<td>Is the scoped character a knight of the target character?
</td>
<td>
</td>
<td>character target
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>is_landed
</td>
<td>Is the scoped character landed (holds a county or barony)?
</td>
<td>
</td>
<td>yes/no
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>is_leader_in_war
</td>
<td>Is the scoped character leading one of the sides in the target war?
</td>
<td>
</td>
<td>
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>is_leading_faction_type
</td>
<td>Is the character leading a faction of the specified type?
</td>
<td>
</td>
<td>
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>is_liege_or_above_of
</td>
<td>Is the scope character a liege or above of the target character?
</td>
<td>
</td>
<td>character target
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>is_local_player
</td>
<td>Is the character the local player?
</td>
<td>An interface trigger, can only be used in specific places
</td>
<td>yes/no
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>is_lowborn
</td>
<td>Is the character lowborn?
</td>
<td>
</td>
<td>yes/no
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>is_male
</td>
<td>Is the scope character male?
</td>
<td>
</td>
<td>yes/no
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>is_married
</td>
<td>Is the scope character married?
</td>
<td>
</td>
<td>yes/no
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>is_nibling_of
</td>
<td>Is the character a nibling (niece/nephew) of the target character?
</td>
<td>
</td>
<td>character target
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>is_normal_councillor
</td>
<td>Is the scoped character a regular councillor?
</td>
<td>
</td>
<td>yes/no
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>is_obedient
</td>
<td>Is the character obedient towards the target?
</td>
<td>
</td>
<td>character target
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>is_overriding_designated_winner
</td>
<td>Is the scoped character overriding the winner in the GHW they're pledged to (will put their beneficiary on the throne if they're top participant)?
</td>
<td>
</td>
<td>yes/no
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>is_parent_of
</td>
<td>Is the character a parent of the target character?
</td>
<td>
</td>
<td>character target
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>is_participant_in_war
</td>
<td>Is the scope character participating in the target war as an attacker or defender?
</td>
<td>
</td>
<td>
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>is_performing_council_task
</td>
<td>Is the scoped character performing the given task?
</td>
<td>
</td>
<td>
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>is_player_heir_of
</td>
<td>Is the scope character the player heir of the target character?
</td>
<td>
</td>
<td>character target
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>is_pledged_ghw_attacker
</td>
<td>Is the scoped character a pledged attacker in the current GHW? (it's an error to check this if there's no GHW around)
</td>
<td>
</td>
<td>yes/no
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>is_pool_character
</td>
<td>Is the character in the pool? (not a ruler, courtier or guest at any court)
</td>
<td>
</td>
<td>yes/no
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>is_pool_guest
</td>
<td>Is the character a guest from the pool? In contrast to is_foreign_court_guest the character has no liege
</td>
<td>
</td>
<td>yes/no
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>is_pool_guest_of
</td>
<td>Is the character a guest from the pool, visiting the target character's court? In contrast to is_foreign_court_guest_of the character has no liege
</td>
<td>
</td>
<td>character target
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>is_powerful_vassal
</td>
<td>Is the character a powerful vassal?
</td>
<td>
</td>
<td>yes/no
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>is_powerful_vassal_of
</td>
<td>Is the character a powerful vassal of the target?
</td>
<td>
</td>
<td>character target
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>is_pregnant
</td>
<td>Is the character pregnant?
</td>
<td>
</td>
<td>yes/no
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>is_primary_heir_of
</td>
<td>Is the character the heir of the target's primary title?
</td>
<td>
</td>
<td>character target
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>is_ruler
</td>
<td>Is the scope character a ruler (holds any title)?
</td>
<td>
</td>
<td>yes/no
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>is_scheming_against
</td>
<td>Checks whether the scope character is an owner or an owner agent in a scheme against the target. There are 3 possible ways to use it:
</td>
<td>
<ul><li>is_scheming_against = { target = X type = Y } limits to schemes of type Y</li>
<li>is_scheming_against = { target = X scheme_skill = Y } limits to schemes of Y skill category</li>
<li>is_scheming_against = { target = X } considers all schemes</li></ul>
</td>
<td>
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>is_sibling_of
</td>
<td>Is the character a sibling of the target character?
</td>
<td>
</td>
<td>character target
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>is_special_councillor
</td>
<td>Is the scoped character a special councillor?
</td>
<td>
</td>
<td>yes/no
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>is_spouse_of
</td>
<td>Is the character a spouse of the target character, and are both alive?
</td>
<td>
</td>
<td>character target
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>is_spouse_of_even_if_dead
</td>
<td>Is the character a spouse of the target character, even if one or both are dead?
</td>
<td>
</td>
<td>character target
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>is_theocratic_lessee
</td>
<td>Is the scope character a theocratic lessee (bishop)?
</td>
<td>
</td>
<td>yes/no
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>is_twin_of
</td>
<td>Is the character a twin of the target character?
</td>
<td>
</td>
<td>character target
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>is_unborn_child_of_concubine
</td>
<td>Is the unborn a child of a concubine?
</td>
<td>
</td>
<td>yes/no
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>is_unborn_known_bastard
</td>
<td>Is the unborn a known bastard?
</td>
<td>
</td>
<td>yes/no
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>is_uncle_or_aunt_of
</td>
<td>Is the character an uncle or aunt of the target character?
</td>
<td>
</td>
<td>character target
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>is_valid_as_agent_in_scheme
</td>
<td>Is the scope character suitable as an agent for the target scheme?
</td>
<td>
</td>
<td>
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>is_vassal_of
</td>
<td>Is the character a direct vassal of the target character?
</td>
<td>
</td>
<td>character target
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>is_vassal_or_below_of
</td>
<td>Is the scoped character a vassal or below of the target character?
</td>
<td>
</td>
<td>character target
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>is_visibly_fertile
</td>
<td>Is the scoped character visibly fertile, that is: not too old if a woman, not too young and has no traits blocking having children
</td>
<td>
</td>
<td>yes/no
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>join_faction_chance
</td>
<td>Check the chance of the scope character to join the faction against the scripted value
</td>
<td>join_faction_chance = {
<pre>   faction = faction_target #An ongoing faction
   value &lt;|&lt;=|&gt;=|&gt; 0
</pre>
<p>}
</p>
</td>
<td>
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>join_scheme_chance
</td>
<td>Check if the chance of the scope character to join the scheme is between the given range (being min and max exclusive)
</td>
<td>join_scheme_chance = {
<pre>   scheme = scheme_target #An ongoing scheme
   max = 0
   min = -10
</pre>
<p>}
</p>
</td>
<td>
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>learning
</td>
<td>Does the character have the required learning skill level?
</td>
<td>
</td>
<td>&lt;, &lt;=, =,&#160;!=, &gt;, &gt;=
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>learning_diff
</td>
<td>Does the character have the required learning skill level difference against target?
</td>
<td>learning = { target = character value &lt;= script_value abs = yes/no(optional, default no) }
</td>
<td>&lt;, &lt;=, =,&#160;!=, &gt;, &gt;=
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>learning_for_portrait
</td>
<td>Learning skill scaled between 0.0 and 1.0 for portraits
</td>
<td>
</td>
<td>&lt;, &lt;=, =,&#160;!=, &gt;, &gt;=
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>learning_lifestyle_perk_points
</td>
<td>How many learning lifestyle perk points does the character have available?
</td>
<td>
</td>
<td>&lt;, &lt;=, =,&#160;!=, &gt;, &gt;=
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>learning_lifestyle_perks
</td>
<td>How many learning lifestyle perks does the character have?
</td>
<td>
</td>
<td>&lt;, &lt;=, =,&#160;!=, &gt;, &gt;=
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>learning_lifestyle_xp
</td>
<td>How much learning lifestyle experience does the character have?
</td>
<td>
</td>
<td>&lt;, &lt;=, =,&#160;!=, &gt;, &gt;=
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>long_term_gold
</td>
<td>Does the character have the required gold? (AI category long term)
</td>
<td>
</td>
<td>&lt;, &lt;=, =,&#160;!=, &gt;, &gt;=
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>martial
</td>
<td>Does the character have the required martial skill level?
</td>
<td>
</td>
<td>&lt;, &lt;=, =,&#160;!=, &gt;, &gt;=
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>martial_diff
</td>
<td>Does the character have the required martial skill level difference against target?
</td>
<td>martial = { target = character value &lt;= script_value abs = yes/no(optional, default no) }
</td>
<td>&lt;, &lt;=, =,&#160;!=, &gt;, &gt;=
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>martial_for_portrait
</td>
<td>Martial skill scaled between 0.0 and 1.0 for portraits
</td>
<td>
</td>
<td>&lt;, &lt;=, =,&#160;!=, &gt;, &gt;=
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>martial_lifestyle_perk_points
</td>
<td>How many martial perk points does the character have available?
</td>
<td>
</td>
<td>&lt;, &lt;=, =,&#160;!=, &gt;, &gt;=
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>martial_lifestyle_perks
</td>
<td>How many martial lifestyle perks does the character have?
</td>
<td>
</td>
<td>&lt;, &lt;=, =,&#160;!=, &gt;, &gt;=
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>martial_lifestyle_xp
</td>
<td>How much martial lifestyle experience does the character have?
</td>
<td>
</td>
<td>&lt;, &lt;=, =,&#160;!=, &gt;, &gt;=
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>matrilinear_betrothal
</td>
<td>Is this character's betrothal matrilinear? False if there's no betrothal.
</td>
<td>
</td>
<td>yes/no
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>matrilinear_marriage
</td>
<td>Is the marriage with the spouse matrilinear?
</td>
<td>
</td>
<td>yes/no
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>max_military_strength
</td>
<td>Is the scoped character's max military strength this big?
</td>
<td>
</td>
<td>&lt;, &lt;=, =,&#160;!=, &gt;, &gt;=
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>max_number_maa_soldiers_of_base_type
</td>
<td>Does the scope character have value amount of max soldiers of men at arms of the base type?
</td>
<td>
</td>
<td>&lt;, &lt;=, =,&#160;!=, &gt;, &gt;=
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>max_number_maa_soldiers_of_type
</td>
<td>Does the scope character have value amount of max soldiers of men at arms of the type?
</td>
<td>
</td>
<td>&lt;, &lt;=, =,&#160;!=, &gt;, &gt;=
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>max_number_of_concubines
</td>
<td>The maximum number of concubines a character can have
</td>
<td>max_number_of_concubines &gt; 2
</td>
<td>&lt;, &lt;=, =,&#160;!=, &gt;, &gt;=
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>max_number_of_knights
</td>
<td>Check how many knights the scoped character can potentially have
</td>
<td>
</td>
<td>&lt;, &lt;=, =,&#160;!=, &gt;, &gt;=
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>missing_unique_ancestors
</td>
<td>The amount of missing unique ancestors from the character's real father and mother
</td>
<td>Traverses the family tree for NDefines::NChildbirth::INBREEDING_ANCESTOR_GENERATIONS amount of generations. By default this means that we're traversing 62 ancestors and report the number of duplicates we find.
<p>calc_missing_unique_ancestors &gt; 10
</p>
</td>
<td>&lt;, &lt;=, =,&#160;!=, &gt;, &gt;=
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>monthly_character_balance
</td>
<td>Is the scoped character's monthly balance this big?
</td>
<td>
</td>
<td>&lt;, &lt;=, =,&#160;!=, &gt;, &gt;=
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>monthly_character_expenses
</td>
<td>Is the scoped character's monthly expenses this big?
</td>
<td>
</td>
<td>&lt;, &lt;=, =,&#160;!=, &gt;, &gt;=
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>monthly_character_income
</td>
<td>Is the scoped character's monthly income this big?
</td>
<td>
</td>
<td>&lt;, &lt;=, =,&#160;!=, &gt;, &gt;=
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>num_of_bad_genetic_traits
</td>
<td>Compare the number of bad genetic traits
</td>
<td>&lt;charater&gt; = { num_of_bad_genetic_traits = 0 }
</td>
<td>&lt;, &lt;=, =,&#160;!=, &gt;, &gt;=
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>num_of_good_genetic_traits
</td>
<td>Compare the number of good genetic traits
</td>
<td>&lt;charater&gt; = { num_of_good_genetic_traits &gt;= 2 }
</td>
<td>&lt;, &lt;=, =,&#160;!=, &gt;, &gt;=
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>num_of_relation_best_friend
</td>
<td>Compares the number of scripted relations a character has of the type
</td>
<td>
</td>
<td>&lt;, &lt;=, =,&#160;!=, &gt;, &gt;=
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>num_of_relation_bully
</td>
<td>Compares the number of scripted relations a character has of the type
</td>
<td>
</td>
<td>&lt;, &lt;=, =,&#160;!=, &gt;, &gt;=
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>num_of_relation_court_physician
</td>
<td>Compares the number of scripted relations a character has of the type
</td>
<td>
</td>
<td>&lt;, &lt;=, =,&#160;!=, &gt;, &gt;=
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>num_of_relation_crush
</td>
<td>Compares the number of scripted relations a character has of the type
</td>
<td>
</td>
<td>&lt;, &lt;=, =,&#160;!=, &gt;, &gt;=
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>num_of_relation_friend
</td>
<td>Compares the number of scripted relations a character has of the type
</td>
<td>
</td>
<td>&lt;, &lt;=, =,&#160;!=, &gt;, &gt;=
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>num_of_relation_guardian
</td>
<td>Compares the number of scripted relations a character has of the type
</td>
<td>
</td>
<td>&lt;, &lt;=, =,&#160;!=, &gt;, &gt;=
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>num_of_relation_intrigue_mentor
</td>
<td>Compares the number of scripted relations a character has of the type
</td>
<td>
</td>
<td>&lt;, &lt;=, =,&#160;!=, &gt;, &gt;=
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>num_of_relation_intrigue_student
</td>
<td>Compares the number of scripted relations a character has of the type
</td>
<td>
</td>
<td>&lt;, &lt;=, =,&#160;!=, &gt;, &gt;=
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>num_of_relation_lover
</td>
<td>Compares the number of scripted relations a character has of the type
</td>
<td>
</td>
<td>&lt;, &lt;=, =,&#160;!=, &gt;, &gt;=
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>num_of_relation_mentor
</td>
<td>Compares the number of scripted relations a character has of the type
</td>
<td>
</td>
<td>&lt;, &lt;=, =,&#160;!=, &gt;, &gt;=
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>num_of_relation_nemesis
</td>
<td>Compares the number of scripted relations a character has of the type
</td>
<td>
</td>
<td>&lt;, &lt;=, =,&#160;!=, &gt;, &gt;=
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>num_of_relation_oaf
</td>
<td>Compares the number of scripted relations a character has of the type
</td>
<td>
</td>
<td>&lt;, &lt;=, =,&#160;!=, &gt;, &gt;=
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>num_of_relation_potential_friend
</td>
<td>Compares the number of scripted relations a character has of the type
</td>
<td>
</td>
<td>&lt;, &lt;=, =,&#160;!=, &gt;, &gt;=
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>num_of_relation_potential_lover
</td>
<td>Compares the number of scripted relations a character has of the type
</td>
<td>
</td>
<td>&lt;, &lt;=, =,&#160;!=, &gt;, &gt;=
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>num_of_relation_potential_rival
</td>
<td>Compares the number of scripted relations a character has of the type
</td>
<td>
</td>
<td>&lt;, &lt;=, =,&#160;!=, &gt;, &gt;=
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>num_of_relation_rival
</td>
<td>Compares the number of scripted relations a character has of the type
</td>
<td>
</td>
<td>&lt;, &lt;=, =,&#160;!=, &gt;, &gt;=
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>num_of_relation_soldier_friend
</td>
<td>Compares the number of scripted relations a character has of the type
</td>
<td>
</td>
<td>&lt;, &lt;=, =,&#160;!=, &gt;, &gt;=
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>num_of_relation_soulmate
</td>
<td>Compares the number of scripted relations a character has of the type
</td>
<td>
</td>
<td>&lt;, &lt;=, =,&#160;!=, &gt;, &gt;=
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>num_of_relation_student
</td>
<td>Compares the number of scripted relations a character has of the type
</td>
<td>
</td>
<td>&lt;, &lt;=, =,&#160;!=, &gt;, &gt;=
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>num_of_relation_victim
</td>
<td>Compares the number of scripted relations a character has of the type
</td>
<td>
</td>
<td>&lt;, &lt;=, =,&#160;!=, &gt;, &gt;=
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>num_of_relation_ward
</td>
<td>Compares the number of scripted relations a character has of the type
</td>
<td>
</td>
<td>&lt;, &lt;=, =,&#160;!=, &gt;, &gt;=
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>num_sinful_traits
</td>
<td>Does the scoped character have this many virtuous traits?
</td>
<td>
<ul><li>num_virtous_traits &gt; 5</li>
<li>num_virtous_traits = { value &gt; 5 faith = scope:faith } to base it on what a specific faith considers virtuous</li></ul>
</td>
<td>&lt;, &lt;=, =,&#160;!=, &gt;, &gt;=
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>num_virtuous_traits
</td>
<td>Does the scoped character have this many virtuous traits?
</td>
<td>
<ul><li>num_virtous_traits &gt; 5</li>
<li>num_virtous_traits = { value &gt; 5 faith = scope:faith } to base it on what a specific faith considers virtuous</li></ul>
</td>
<td>&lt;, &lt;=, =,&#160;!=, &gt;, &gt;=
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>number_maa_regiments_of_base_type
</td>
<td>Does the scoped character have value amount of men at arms of the base type?
</td>
<td>
</td>
<td>&lt;, &lt;=, =,&#160;!=, &gt;, &gt;=
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>number_maa_regiments_of_type
</td>
<td>Does the scoped character have value amount of men at arms of the type?
</td>
<td>
</td>
<td>&lt;, &lt;=, =,&#160;!=, &gt;, &gt;=
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>number_maa_soldiers_of_base_type
</td>
<td>Does the scoped character have value amount of soldiers of men at arms of the base type?
</td>
<td>
</td>
<td>&lt;, &lt;=, =,&#160;!=, &gt;, &gt;=
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>number_maa_soldiers_of_type
</td>
<td>Does the scoped character have value amount of soldiers of men at arms of the type?
</td>
<td>
</td>
<td>&lt;, &lt;=, =,&#160;!=, &gt;, &gt;=
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>number_of_commander_traits
</td>
<td>Does the character have this many commander traits?
</td>
<td>
</td>
<td>&lt;, &lt;=, =,&#160;!=, &gt;, &gt;=
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>number_of_commander_traits_in_common
</td>
<td>Does the character and the target have a number of commander traits in common?
</td>
<td>number_of_personality_traits_in_common = { target = X value &gt;/&lt;/&gt;=/&lt;= Y }
</td>
<td>
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>number_of_concubines
</td>
<td>The number of concubines the scoped character has
</td>
<td>number_of_concubines &gt; 2
</td>
<td>&lt;, &lt;=, =,&#160;!=, &gt;, &gt;=
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>number_of_desired_concubines
</td>
<td>The number of fertile concubines the scoped character should have to not get penalties
</td>
<td>number_of_desired_concubines &gt; 2
</td>
<td>&lt;, &lt;=, =,&#160;!=, &gt;, &gt;=
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>number_of_election_votes
</td>
<td>Check the number of votes the scoped character has in the target title
</td>
<td>number_of_election_votes = { title = scope:actor.primary_title value = 0 }
</td>
<td>&lt;, &lt;=, =,&#160;!=, &gt;, &gt;=
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>number_of_fertile_concubines
</td>
<td>The number of visibly fertile concubines the scoped character has
</td>
<td>number_of_fertile_concubines &gt; 2
</td>
<td>&lt;, &lt;=, =,&#160;!=, &gt;, &gt;=
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>number_of_knights
</td>
<td>Check how many knights the scoped character has at the moment
</td>
<td>
</td>
<td>&lt;, &lt;=, =,&#160;!=, &gt;, &gt;=
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>number_of_lifestyle_traits
</td>
<td>Does the character have this many lifestyle traits?
</td>
<td>
</td>
<td>&lt;, &lt;=, =,&#160;!=, &gt;, &gt;=
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>number_of_maa_regiments
</td>
<td>The number of men at arms the scoped character has
</td>
<td>
</td>
<td>&lt;, &lt;=, =,&#160;!=, &gt;, &gt;=
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>number_of_opposing_personality_traits
</td>
<td>Does the character and the target have a number of opposing personality traits?
</td>
<td>number_of_opposing_personality_traits = { target = X value &gt;/&lt;/&gt;=/&lt;= Y }
</td>
<td>
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>number_of_opposing_traits
</td>
<td>Does the character and the target have a number of opposing traits?
</td>
<td>number_of_opposing_traits = { target = X value &gt;/&lt;/&gt;=/&lt;= Y }
</td>
<td>
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>number_of_personality_traits
</td>
<td>Does the character have this many personality traits?
</td>
<td>
</td>
<td>&lt;, &lt;=, =,&#160;!=, &gt;, &gt;=
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>number_of_personality_traits_in_common
</td>
<td>Does the character and the target have a number of personality traits in common?
</td>
<td>number_of_personality_traits_in_common = { target = X value &gt;/&lt;/&gt;=/&lt;= Y }
</td>
<td>
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>number_of_powerful_vassals
</td>
<td>Does the character have a specified number of powerful vassals?
</td>
<td>
</td>
<td>&lt;, &lt;=, =,&#160;!=, &gt;, &gt;=
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>number_of_traits
</td>
<td>Does the character have this many traits?
</td>
<td>
</td>
<td>&lt;, &lt;=, =,&#160;!=, &gt;, &gt;=
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>number_of_traits_in_common
</td>
<td>Does the character and the target have a number of traits in common?
</td>
<td>number_of_traits_in_common = { target = X value &gt;/&lt;/&gt;=/&lt;= Y }
</td>
<td>
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>opinion
</td>
<td>Is the character's opinion of the target greater or equal than the value?
</td>
<td>opinion = { target = X [*value &gt;/&lt;/&gt;=/&lt;= Y* or *value = { min max }*  }
</td>
<td>
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>owns_a_story
</td>
<td>Ćhecks whether the scope character is the owner of any currently active story
</td>
<td>
</td>
<td>yes/no
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>owns_an_activity
</td>
<td>Checks whether the scope character is the owner of any currently active activity
</td>
<td>
</td>
<td>yes/no
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>owns_story_of_type
</td>
<td>Does the character own a story of this type?
</td>
<td>
</td>
<td>
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>patrilinear_betrothal
</td>
<td>Is this character's betrothal patrilinear? False if there's no betrothal.
</td>
<td>
</td>
<td>yes/no
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>patrilinear_marriage
</td>
<td>Is the marriage with the spouse patrilinear?
</td>
<td>
</td>
<td>yes/no
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>perk_points
</td>
<td>Does the character have this many perk points across all lifestyles combined?
</td>
<td>
</td>
<td>&lt;, &lt;=, =,&#160;!=, &gt;, &gt;=
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>perk_points_assigned
</td>
<td>Does the character have this many perks across all lifestyles combined?
</td>
<td>
</td>
<td>&lt;, &lt;=, =,&#160;!=, &gt;, &gt;=
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>perks_in_tree
</td>
<td>Does the character have this many perk points assigned to this tree? perks_in_tree = { tree = tree_key value &gt; 5 }
</td>
<td>
</td>
<td>&lt;, &lt;=, =,&#160;!=, &gt;, &gt;=
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>piety
</td>
<td>Does the character have the required piety?
</td>
<td>
</td>
<td>&lt;, &lt;=, =,&#160;!=, &gt;, &gt;=
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>piety_level
</td>
<td>Does the character have the required devotion level?
</td>
<td>
</td>
<td>&lt;, &lt;=, =,&#160;!=, &gt;, &gt;=
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>player_heir_position
</td>
<td>Check where the target character is in the scoped character's player heir list.
</td>
<td>player_heir_position = { target = scope:actor position = 0 }
</td>
<td>&lt;, &lt;=, =,&#160;!=, &gt;, &gt;=
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>pregnancy_days
</td>
<td>How long has the character been pregnant? Counts from impregnation, not reveal
</td>
<td>
</td>
<td>&lt;, &lt;=, =,&#160;!=, &gt;, &gt;=
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>prestige
</td>
<td>Does the character have the required prestige?
</td>
<td>
</td>
<td>&lt;, &lt;=, =,&#160;!=, &gt;, &gt;=
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>prestige_level
</td>
<td>Does the character have the required fame level?
</td>
<td>
</td>
<td>&lt;, &lt;=, =,&#160;!=, &gt;, &gt;=
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>prowess
</td>
<td>Does the character have the required prowess skill level?
</td>
<td>
</td>
<td>&lt;, &lt;=, =,&#160;!=, &gt;, &gt;=
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>prowess_diff
</td>
<td>Does the character have the required prowess skill level difference against target?
</td>
<td>prowess = { target = character value &lt;= script_value abs = yes/no(optional, default no) }
</td>
<td>&lt;, &lt;=, =,&#160;!=, &gt;, &gt;=
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>prowess_for_portrait
</td>
<td>Prowess skill scaled between 0.0 and 1.0 for portraits
</td>
<td>
</td>
<td>&lt;, &lt;=, =,&#160;!=, &gt;, &gt;=
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>ransom_cost
</td>
<td>What is the ransom cost of the character?
</td>
<td>
</td>
<td>&lt;, &lt;=, =,&#160;!=, &gt;, &gt;=
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>realm_size
</td>
<td>Is the scoped character's top liege's realm this big (# of counties)?
</td>
<td>
</td>
<td>&lt;, &lt;=, =,&#160;!=, &gt;, &gt;=
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>realm_to_title_distance_squared
</td>
<td>Is the character's realm within this distance of the title? Distance is in pixels, squared for performance reasons.
</td>
<td>realm_to_title_distance_squared = { title = some_title value &gt; 10000 }
</td>
<td>&lt;, &lt;=, =,&#160;!=, &gt;, &gt;=
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>reverse_has_opinion_modifier
</td>
<td>&lt;=|=|&gt;=|&gt; X* or *value = { MIN MAX }* inclusive)
</td>
<td>
</td>
<td>
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>reverse_opinion
</td>
<td>What is the target character's opinion of the scope character? opinion = { target = X value &gt;/&lt;/&gt;=/&lt;= Y }
</td>
<td>
</td>
<td>
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>scriptedtests_can_marry_character
</td>
<td>Can the character marry the target character?
</td>
<td>
</td>
<td>character target
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>scriptedtests_dread_base
</td>
<td>Does the character have the specified natural dread?
</td>
<td>
</td>
<td>&lt;, &lt;=, =,&#160;!=, &gt;, &gt;=
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>scriptedtests_gold_income
</td>
<td>Does the character have the specified tax income?
</td>
<td>
</td>
<td>&lt;, &lt;=, =,&#160;!=, &gt;, &gt;=
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>scriptedtests_piety_income
</td>
<td>does the character have the specified piety income?
</td>
<td>
</td>
<td>&lt;, &lt;=, =,&#160;!=, &gt;, &gt;=
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>sex_opposite_of
</td>
<td>Are the scope character and the target character of opposite sex?
</td>
<td>
</td>
<td>character target
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>sex_same_as
</td>
<td>Are the scope character and the target character of the same sex?
</td>
<td>
</td>
<td>character target
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>short_term_gold
</td>
<td>Does the character have the required gold? (AI category short term)
</td>
<td>
</td>
<td>&lt;, &lt;=, =,&#160;!=, &gt;, &gt;=
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>should_show_disturbing_portrait_modifiers
</td>
<td>Is the character the local player?
</td>
<td>An interface trigger, can only be used in specific places
</td>
<td>yes/no
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>stewardship
</td>
<td>Does the character have the required stewardship skill level?
</td>
<td>
</td>
<td>&lt;, &lt;=, =,&#160;!=, &gt;, &gt;=
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>stewardship_diff
</td>
<td>Does the character have the required stewardship skill level difference against target?
</td>
<td>stewardship = { target = character value &lt;= script_value abs = yes/no(optional, default no) }
</td>
<td>&lt;, &lt;=, =,&#160;!=, &gt;, &gt;=
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>stewardship_for_portrait
</td>
<td>Stewardship skill scaled between 0.0 and 1.0 for portraits
</td>
<td>
</td>
<td>&lt;, &lt;=, =,&#160;!=, &gt;, &gt;=
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>stewardship_lifestyle_perk_points
</td>
<td>How many perk points available does the character have?
</td>
<td>
</td>
<td>&lt;, &lt;=, =,&#160;!=, &gt;, &gt;=
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>stewardship_lifestyle_perks
</td>
<td>How many perks from this lifestyle does the character have?
</td>
<td>
</td>
<td>&lt;, &lt;=, =,&#160;!=, &gt;, &gt;=
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>stewardship_lifestyle_xp
</td>
<td>How many stewardship perk points does the character have available?
</td>
<td>
</td>
<td>&lt;, &lt;=, =,&#160;!=, &gt;, &gt;=
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>stress
</td>
<td>Does the character have the required stress?
</td>
<td>
</td>
<td>&lt;, &lt;=, =,&#160;!=, &gt;, &gt;=
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>stress_level
</td>
<td>Does the character have the required stress level?
</td>
<td>
</td>
<td>&lt;, &lt;=, =,&#160;!=, &gt;, &gt;=
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>sub_realm_size
</td>
<td>Is the scoped character's sub-realm this big (# of counties)?
</td>
<td>
</td>
<td>&lt;, &lt;=, =,&#160;!=, &gt;, &gt;=
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>target_is_liege_or_above
</td>
<td>Is the target character the liege or above the scoped character?
</td>
<td>
</td>
<td>character target
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>target_is_same_character_or_above
</td>
<td>Is the target character the scoped character or above them in the vassal hierarchy?
</td>
<td>
</td>
<td>character target
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>target_is_vassal_or_below
</td>
<td>Is the target character a vassal or below of the scope character?
</td>
<td>
</td>
<td>character target
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>target_weight
</td>
<td>Target weight of the scoped character
</td>
<td>target_weight &gt; 10
</td>
<td>&lt;, &lt;=, =,&#160;!=, &gt;, &gt;=
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>tier_difference
</td>
<td>What is the difference in highest held title tier between the scoped character and the target character? (-5 to 5)
</td>
<td>For example, this is true:
<p>scope:a_baron = {
</p>
<pre>   tier_difference = {
       target = scope:a_king
       value = -3
   }
</pre>
<p>}
</p>
</td>
<td>
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>time_in_prison
</td>
<td>How long has the character been imprisoned? time_in_prison = { days/months/years =,&gt;,&lt; X }
</td>
<td>
</td>
<td>
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>time_in_prison_type
</td>
<td>How long has the character been imprisoned with the current imprisonment type? time_in_prison_type = { days/months/years =,&gt;,&lt; X }
</td>
<td>
</td>
<td>
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>trait_compatibility
</td>
<td>target = other character value &gt;/&lt;/= sum of trait compatibility values
</td>
<td>
</td>
<td>
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>tyranny
</td>
<td>Does the character have the required tyranny?
</td>
<td>
</td>
<td>&lt;, &lt;=, =,&#160;!=, &gt;, &gt;=
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>vassal_contract_has_flag
</td>
<td>Do any of the current active obligations in the scoped character's vassal contract have the given flag?
</td>
<td>
</td>
<td>
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>vassal_contract_has_modifiable_obligations
</td>
<td>Can the scoped character's contract be modified at all? That is: they have one, they use obligation levels, and are count or above
</td>
<td>
</td>
<td>yes/no
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>vassal_contract_is_blocked_from_modification
</td>
<td>Has the scoped character's contract been blocked from modification by script via 'set_vassal_contract_modification_blocked'?
</td>
<td>
</td>
<td>yes/no
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>vassal_contract_obligation_level_can_be_decreased
</td>
<td>Can the obligation level of the scoped character's vassal contract be decreased?
</td>
<td>
</td>
<td>
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>vassal_contract_obligation_level_can_be_increased
</td>
<td>Can the obligation level of the scoped character's vassal contract be increased?
</td>
<td>
</td>
<td>
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>vassal_count
</td>
<td>Does the scoped character have this many vassals (excluding barons)?
</td>
<td>
</td>
<td>&lt;, &lt;=, =,&#160;!=, &gt;, &gt;=
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>vassal_limit
</td>
<td>Is the scoped character's vassal limit this big?
</td>
<td>
</td>
<td>&lt;, &lt;=, =,&#160;!=, &gt;, &gt;=
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>vassal_limit_available
</td>
<td>Is there this much space left in the character's vassal limit? Negative values also work for checking characters that are above their limit
</td>
<td>
</td>
<td>&lt;, &lt;=, =,&#160;!=, &gt;, &gt;=
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>vassal_limit_percentage
</td>
<td>Is the scoped character's vassal count this big in comparison to their limit?
</td>
<td>
</td>
<td>&lt;, &lt;=, =,&#160;!=, &gt;, &gt;=
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>yearly_character_balance
</td>
<td>Is the scoped character's yearly balance this big?
</td>
<td>
</td>
<td>&lt;, &lt;=, =,&#160;!=, &gt;, &gt;=
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>yearly_character_expenses
</td>
<td>Is the scoped character's yearly expenses this big?
</td>
<td>
</td>
<td>&lt;, &lt;=, =,&#160;!=, &gt;, &gt;=
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>yearly_character_income
</td>
<td>Is the scoped character's yearly income this big?
</td>
<td>
</td>
<td>&lt;, &lt;=, =,&#160;!=, &gt;, &gt;=
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>yields_alliance
</td>
<td>Checks if the character would get an alliance with the target character through such a marriage.
</td>
<td>
</td>
<td>
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>any_faction_county_member
</td>
<td>Iterate through all faction county members
</td>
<td>any_faction_county_member = { &lt;count=num/all&gt; / &lt;percent=fixed_point&gt; &lt;triggers&gt; }
</td>
<td>
</td>
<td>faction
</td>
<td>landed title
</td></tr>
<tr>
<td>any_faction_member
</td>
<td>Iterate through all faction character members
</td>
<td>any_faction_member = { &lt;count=num/all&gt; / &lt;percent=fixed_point&gt; &lt;triggers&gt; }
</td>
<td>
</td>
<td>faction
</td>
<td>character
</td></tr>
<tr>
<td>average_faction_opinion
</td>
<td>Average opinion of all the characters of the faction scope target
</td>
<td>
</td>
<td>&lt;, &lt;=, =,&#160;!=, &gt;, &gt;=
</td>
<td>faction
</td>
<td>
</td></tr>
<tr>
<td>average_faction_opinion_not_powerful_vassal
</td>
<td>Average opinion of the character that are <i>not</i> powerful vassals of the faction scope target
</td>
<td>
</td>
<td>&lt;, &lt;=, =,&#160;!=, &gt;, &gt;=
</td>
<td>faction
</td>
<td>
</td></tr>
<tr>
<td>average_faction_opinion_powerful_vassal
</td>
<td>Average opinion of the character that are powerful vassals of the faction scope target
</td>
<td>
</td>
<td>&lt;, &lt;=, =,&#160;!=, &gt;, &gt;=
</td>
<td>faction
</td>
<td>
</td></tr>
<tr>
<td>faction_can_press_demands
</td>
<td>Can the scoped faction press demands?
</td>
<td>
</td>
<td>yes/no
</td>
<td>faction
</td>
<td>
</td></tr>
<tr>
<td>faction_discontent
</td>
<td>Current discontent of the faction
</td>
<td>
</td>
<td>&lt;, &lt;=, =,&#160;!=, &gt;, &gt;=
</td>
<td>faction
</td>
<td>
</td></tr>
<tr>
<td>faction_is_at_war
</td>
<td>Is the scoped faction at war?
</td>
<td>
</td>
<td>yes/no
</td>
<td>faction
</td>
<td>
</td></tr>
<tr>
<td>faction_is_type
</td>
<td>Is the faction of this type?
</td>
<td>
</td>
<td>
</td>
<td>faction
</td>
<td>
</td></tr>
<tr>
<td>faction_power
</td>
<td>Current power of the faction
</td>
<td>
</td>
<td>&lt;, &lt;=, =,&#160;!=, &gt;, &gt;=
</td>
<td>faction
</td>
<td>
</td></tr>
<tr>
<td>faction_power_threshold
</td>
<td>Current power threshold of the faction
</td>
<td>
</td>
<td>&lt;, &lt;=, =,&#160;!=, &gt;, &gt;=
</td>
<td>faction
</td>
<td>
</td></tr>
<tr>
<td>has_special_character
</td>
<td>Does the faction have a special character assigned?
</td>
<td>
</td>
<td>yes/no
</td>
<td>faction
</td>
<td>
</td></tr>
<tr>
<td>has_special_title
</td>
<td>Does the faction have a special title assigned?
</td>
<td>
</td>
<td>yes/no
</td>
<td>faction
</td>
<td>
</td></tr>
<tr>
<td>number_of_faction_members_in_council
</td>
<td>Current number of faction members in faction
</td>
<td>
</td>
<td>&lt;, &lt;=, =,&#160;!=, &gt;, &gt;=
</td>
<td>faction
</td>
<td>
</td></tr>
<tr>
<td>any_war_attacker
</td>
<td>Iterate through all attackers in the war
</td>
<td>any_war_attacker = { &lt;count=num/all&gt; / &lt;percent=fixed_point&gt; &lt;triggers&gt; }
</td>
<td>
</td>
<td>war
</td>
<td>character
</td></tr>
<tr>
<td>any_war_defender
</td>
<td>Iterate through all defenders in the war
</td>
<td>any_war_defender = { &lt;count=num/all&gt; / &lt;percent=fixed_point&gt; &lt;triggers&gt; }
</td>
<td>
</td>
<td>war
</td>
<td>character
</td></tr>
<tr>
<td>any_war_participant
</td>
<td>Iterate through all participants in the war
</td>
<td>any_war_participant = { &lt;count=num/all&gt; / &lt;percent=fixed_point&gt; &lt;triggers&gt; }
</td>
<td>
</td>
<td>war
</td>
<td>character
</td></tr>
<tr>
<td>attacker_war_score
</td>
<td>Compares the attacker war score
</td>
<td>
</td>
<td>&lt;, &lt;=, =,&#160;!=, &gt;, &gt;=
</td>
<td>war
</td>
<td>
</td></tr>
<tr>
<td>days_since_max_war_score
</td>
<td>Number of days since the war score has been at max (+100 or −100). Returns -1 if the war score is not +100 or −100
</td>
<td>
</td>
<td>&lt;, &lt;=, =,&#160;!=, &gt;, &gt;=
</td>
<td>war
</td>
<td>
</td></tr>
<tr>
<td>defender_war_score
</td>
<td>Compares the defender war score
</td>
<td>
</td>
<td>&lt;, &lt;=, =,&#160;!=, &gt;, &gt;=
</td>
<td>war
</td>
<td>
</td></tr>
<tr>
<td>has_valid_casus_belli
</td>
<td>Does the war interaction still have a valid casus belli? (Those should be automatically removed on daily tick, but can exist for a tick)
</td>
<td>
</td>
<td>yes/no
</td>
<td>war
</td>
<td>
</td></tr>
<tr>
<td>is_attacker
</td>
<td>Is the target character in the scope war as an attacker?
</td>
<td>
</td>
<td>character target
</td>
<td>war
</td>
<td>
</td></tr>
<tr>
<td>is_civil_war
</td>
<td>Check if the scope war is a civil war or not
</td>
<td>
</td>
<td>yes/no
</td>
<td>war
</td>
<td>
</td></tr>
<tr>
<td>is_defender
</td>
<td>Is the target character in the scoped war as a defender?
</td>
<td>
</td>
<td>character target
</td>
<td>war
</td>
<td>
</td></tr>
<tr>
<td>is_participant
</td>
<td>Is the target character participating in the scope war as either an attacker or defender?
</td>
<td>
</td>
<td>character target
</td>
<td>war
</td>
<td>
</td></tr>
<tr>
<td>is_war_leader
</td>
<td>Is the target character leading one of the sides in the scoped war?
</td>
<td>
</td>
<td>character target
</td>
<td>war
</td>
<td>
</td></tr>
<tr>
<td>is_white_peace_possible
</td>
<td>Check if the scoped war's CB allows white peace (is_white_peace_possible = yes)
</td>
<td>
</td>
<td>yes/no
</td>
<td>war
</td>
<td>
</td></tr>
<tr>
<td>using_cb
</td>
<td>Is the scope war using the specified CB?
</td>
<td>using_cb = religious_war
</td>
<td>
</td>
<td>war
</td>
<td>
</td></tr>
<tr>
<td>war_contribution
</td>
<td>Checks how much a character has contributed to the scoped war
</td>
<td>war_contribution = {
<p>target = some character
value &gt; 5
}
</p>
</td>
<td>
</td>
<td>war
</td>
<td>
</td></tr>
<tr>
<td>war_days
</td>
<td>Compares the number of days the war has gone on for
</td>
<td>
</td>
<td>&lt;, &lt;=, =,&#160;!=, &gt;, &gt;=
</td>
<td>war
</td>
<td>
</td></tr>
<tr>
<td>was_called
</td>
<td>Has the target character been called to the scope war already?
</td>
<td>
</td>
<td>character target
</td>
<td>war
</td>
<td>
</td></tr>
<tr>
<td>any_defensive_great_holy_wars
</td>
<td>Iterate through all great holy wars this faith is defending against
</td>
<td>any_defensive_great_holy_wars = { &lt;count=num/all&gt; / &lt;percent=fixed_point&gt; &lt;triggers&gt; }
</td>
<td>
</td>
<td>faith
</td>
<td>great holy war
</td></tr>
<tr>
<td>any_faith_holy_order
</td>
<td>Iterate through all holy orders of the faith
</td>
<td>any_faith_holy_order = { &lt;count=num/all&gt; / &lt;percent=fixed_point&gt; &lt;triggers&gt; }
</td>
<td>
</td>
<td>faith
</td>
<td>holy order
</td></tr>
<tr>
<td>any_holy_site
</td>
<td>Iterate through all holy site baronies of a faith
</td>
<td>any_holy_site = { &lt;count=num/all&gt; / &lt;percent=fixed_point&gt; &lt;triggers&gt; }
</td>
<td>
</td>
<td>faith
</td>
<td>landed title
</td></tr>
<tr>
<td>controls_holy_site
</td>
<td>Does the faith control a holy site? controls_holy_site = key_of_holy_site
</td>
<td>
</td>
<td>
</td>
<td>faith
</td>
<td>
</td></tr>
<tr>
<td>controls_holy_site_with_flag
</td>
<td>Does the faith control a holy site with the given flag? controls_holy_site_with_flag = some flag
</td>
<td>
</td>
<td>
</td>
<td>faith
</td>
<td>
</td></tr>
<tr>
<td>estimated_faith_strength
</td>
<td>How strong is the scoped faith? *Expensive*, if you're gonna use the value repeatedly, save it to a scope first! This is scaled by a factor of 1000, so '1' means 1000 men. This is due to the cap of ~2 million, which would be too low in many cases
</td>
<td>
</td>
<td>&lt;, &lt;=, =,&#160;!=, &gt;, &gt;=
</td>
<td>faith
</td>
<td>
</td></tr>
<tr>
<td>faith_hostility_level
</td>
<td>What is the faith's hostility level towards the target faith?
</td>
<td>faith_hostility_level { target = scope:some_faith value &gt; 1 }
<p>The levels are
</p>
<ul><li>0 righteous</li>
<li>1 astray</li>
<li>2 hostile</li>
<li>3 evil</li></ul>
</td>
<td>&lt;, &lt;=, =,&#160;!=, &gt;, &gt;=
</td>
<td>faith
</td>
<td>
</td></tr>
<tr>
<td>faith_hostility_level_comparison
</td>
<td>Compares the scoped faith's hostility level towards two other faiths.
</td>
<td>faith_hostility_level_comparison { faith1 &gt; faith2 }
</td>
<td>
</td>
<td>faith
</td>
<td>
</td></tr>
<tr>
<td>fervor
</td>
<td>What is the faith's fervor?
</td>
<td>
</td>
<td>&lt;, &lt;=, =,&#160;!=, &gt;, &gt;=
</td>
<td>faith
</td>
<td>
</td></tr>
<tr>
<td>has_allowed_gender_for_clergy
</td>
<td>Is the target character of the allowed gender to be clergy of the faith?
</td>
<td>
</td>
<td>character target
</td>
<td>faith
</td>
<td>
</td></tr>
<tr>
<td>has_doctrine
</td>
<td>Does the given faith have the given doctrine?
</td>
<td>has_doctrine = doctrine_key
</td>
<td>
</td>
<td>faith
</td>
<td>
</td></tr>
<tr>
<td>has_doctrine_parameter
</td>
<td>Does the given faith have the given doctrine parameter? Can only check for bool parameters.
</td>
<td>has_doctrine_parameter = parameter_key
</td>
<td>
</td>
<td>faith
</td>
<td>
</td></tr>
<tr>
<td>has_dominant_ruling_gender
</td>
<td>Is the target character's gender of the dominant gender of the faith? True if there's no dominant gender
</td>
<td>
</td>
<td>character target
</td>
<td>faith
</td>
<td>
</td></tr>
<tr>
<td>has_graphical_faith
</td>
<td>Does the faith have this graphical faith?
</td>
<td>&lt;faith&gt; = { has_graphical_faith = orthodoxgfx }
</td>
<td>
</td>
<td>faith
</td>
<td>
</td></tr>
<tr>
<td>has_icon
</td>
<td>Does the faith have the given icon?
</td>
<td>has_icon = some_cool_custom_icon
</td>
<td>
</td>
<td>faith
</td>
<td>
</td></tr>
<tr>
<td>has_preferred_gender_for_clergy
</td>
<td>Is the target character of the preferred gender to be clergy of the faith?
</td>
<td>
</td>
<td>character target
</td>
<td>faith
</td>
<td>
</td></tr>
<tr>
<td>holy_sites_controlled
</td>
<td>How many holy sites does the faith control?
</td>
<td>holy_sites_controlled &gt; 1
</td>
<td>&lt;, &lt;=, =,&#160;!=, &gt;, &gt;=
</td>
<td>faith
</td>
<td>
</td></tr>
<tr>
<td>num_character_followers
</td>
<td>How many characters follow the scoped faith?
</td>
<td>num_character_followers &gt; 0
</td>
<td>&lt;, &lt;=, =,&#160;!=, &gt;, &gt;=
</td>
<td>faith
</td>
<td>
</td></tr>
<tr>
<td>num_county_followers
</td>
<td>How many counties follow the scoped faith?
</td>
<td>num_county_followers &gt; 0
</td>
<td>&lt;, &lt;=, =,&#160;!=, &gt;, &gt;=
</td>
<td>faith
</td>
<td>
</td></tr>
<tr>
<td>religion_tag
</td>
<td>Checks the tag of the religion of the current faith
</td>
<td>religion_tag = christianity_religion
</td>
<td>
</td>
<td>faith
</td>
<td>
</td></tr>
<tr>
<td>trait_is_sin
</td>
<td>Does the scoped faith consider the given trait sinful?
</td>
<td>trait_is_sin = lustful
</td>
<td>
</td>
<td>faith
</td>
<td>
</td></tr>
<tr>
<td>trait_is_virtue
</td>
<td>Does the scoped faith consider the given trait virtuous?
</td>
<td>trait_is_virtue = lustful
</td>
<td>
</td>
<td>faith
</td>
<td>
</td></tr>
<tr>
<td>any_secret_knower
</td>
<td>Iterate through all characters who know the scoped secret
</td>
<td>any_secret_knower = { &lt;count=num/all&gt; / &lt;percent=fixed_point&gt; &lt;triggers&gt; }
</td>
<td>
</td>
<td>secret
</td>
<td>character
</td></tr>
<tr>
<td>any_secret_participant
</td>
<td>Iterate through participants in a secret
</td>
<td>any_secret_participant = { &lt;count=num/all&gt; / &lt;percent=fixed_point&gt; &lt;triggers&gt; }
</td>
<td>
</td>
<td>secret
</td>
<td>character
</td></tr>
<tr>
<td>can_be_exposed_by
</td>
<td>Can the scope secret be exposed by the target character?
</td>
<td>can_be_exposed_by = target
</td>
<td>character target
</td>
<td>secret
</td>
<td>
</td></tr>
<tr>
<td>is_criminal_for
</td>
<td>Is this secret criminal for the target participant?
</td>
<td>is_criminal_for = &lt;character&gt;
</td>
<td>character scope
</td>
<td>secret
</td>
<td>character
</td></tr>
<tr>
<td>is_known_by
</td>
<td>Is the scoped secret known by the target character?
</td>
<td>
</td>
<td>character target
</td>
<td>secret
</td>
<td>
</td></tr>
<tr>
<td>is_shunned_for
</td>
<td>Is this secret shunned for the target participant?
</td>
<td>is_shunned_for = &lt;character&gt;
</td>
<td>character scope
</td>
<td>secret
</td>
<td>character
</td></tr>
<tr>
<td>is_shunned_or_criminal_for
</td>
<td>Is this secret shunned or criminal for the target participant?
</td>
<td>is_shunned_or_illegal_for = &lt;character&gt;
</td>
<td>character scope
</td>
<td>secret
</td>
<td>character
</td></tr>
<tr>
<td>is_spent_by
</td>
<td>Has the scoped secret been spent by the target character?
</td>
<td>is_spent_by = target
</td>
<td>character target
</td>
<td>secret
</td>
<td>
</td></tr>
<tr>
<td>local_player_knows_this_secret
</td>
<td>Does the local player know about the secret?
</td>
<td>An interface trigger, can only be used in specific places
</td>
<td>yes/no
</td>
<td>secret
</td>
<td>
</td></tr>
<tr>
<td>same_secret_type_as
</td>
<td>Is the scoped secret of the same type as the target secret?
</td>
<td>same_secret_type_as = scope:some_secret
</td>
<td>
</td>
<td>secret
</td>
<td>
</td></tr>
<tr>
<td>secret_type
</td>
<td>Is the scoped secret of the specified type?
</td>
<td>
</td>
<td>
</td>
<td>secret
</td>
<td>
</td></tr>
<tr>
<td>available_loot
</td>
<td>How much gold is available to loot for raiding armies?
</td>
<td>available_loot &gt;= 7
</td>
<td>&lt;, &lt;=, =,&#160;!=, &gt;, &gt;=
</td>
<td>province
</td>
<td>
</td></tr>
<tr>
<td>building_slots
</td>
<td>How many building slots exist (including occupied ones)?
</td>
<td>building_slots &gt; 3
</td>
<td>&lt;, &lt;=, =,&#160;!=, &gt;, &gt;=
</td>
<td>province
</td>
<td>
</td></tr>
<tr>
<td>combined_building_level
</td>
<td>How many levels of normal buildings are there? Duchy and such buildings do not count. Building under construction does not count. The capital building does count
</td>
<td>combined_building_level &gt; 10
</td>
<td>&lt;, &lt;=, =,&#160;!=, &gt;, &gt;=
</td>
<td>province
</td>
<td>
</td></tr>
<tr>
<td>fort_level
</td>
<td>Compares the fort level of a province
</td>
<td>
</td>
<td>&lt;, &lt;=, =,&#160;!=, &gt;, &gt;=
</td>
<td>province
</td>
<td>
</td></tr>
<tr>
<td>free_building_slots
</td>
<td>How many free building slots exist? A building under construction is considered to be taking a slot
</td>
<td>free_building_slots &gt; 3
</td>
<td>&lt;, &lt;=, =,&#160;!=, &gt;, &gt;=
</td>
<td>province
</td>
<td>
</td></tr>
<tr>
<td>geographical_region
</td>
<td>Checks if a province is in a certain geographical region
</td>
<td>
</td>
<td>
</td>
<td>province
</td>
<td>
</td></tr>
<tr>
<td>has_building
</td>
<td>Does the scoped province have a particular building?
</td>
<td>has_building = temple_01
</td>
<td>
</td>
<td>province
</td>
<td>
</td></tr>
<tr>
<td>has_building_or_higher
</td>
<td>Does the scoped province have a particular building or one of its upgrades?
</td>
<td>has_building_or_higher = temple_01
</td>
<td>
</td>
<td>province
</td>
<td>
</td></tr>
<tr>
<td>has_building_with_flag
</td>
<td>Does the scoped province have a building with a certain flag?
</td>
<td>
<ul><li>has_building_with_flag = { flag = temple count &gt;= 2 }</li>
<li>has_building_with_flag = temple # count &gt;= 1</li></ul>
</td>
<td>
</td>
<td>province
</td>
<td>
</td></tr>
<tr>
<td>has_construction_with_flag
</td>
<td>Does the scoped province have a construction of a building with the specified flag?
</td>
<td>has_construction_with_flag = temple
</td>
<td>
</td>
<td>province
</td>
<td>
</td></tr>
<tr>
<td>has_free_building_slot
</td>
<td>Does the scoped province have a free building slot?
</td>
<td>has_free_building_slot = yes
</td>
<td>yes/no
</td>
<td>province
</td>
<td>
</td></tr>
<tr>
<td>has_holding_type
</td>
<td>Does the scope province have a holding of particular type?
</td>
<td>has_holding_type = castle_holding
</td>
<td>
</td>
<td>province
</td>
<td>
</td></tr>
<tr>
<td>has_ongoing_construction
</td>
<td>Does the scoped province have a construction ongoing?
</td>
<td>has_ongoing_construction = yes
</td>
<td>yes/no
</td>
<td>province
</td>
<td>
</td></tr>
<tr>
<td>has_province_modifier
</td>
<td>Does the scoped province have a given modifier?
</td>
<td>has_province_modifier = name
</td>
<td>
</td>
<td>province
</td>
<td>
</td></tr>
<tr>
<td>has_province_modifier_duration_remaining
</td>
<td>Does the scoped province have the duration remaining on a given modifier?
</td>
<td>has_province_modifier_duration_remaining = name
</td>
<td>
</td>
<td>province
</td>
<td>
</td></tr>
<tr>
<td>has_special_building
</td>
<td>Does the province (holding) have a special building?
</td>
<td>
</td>
<td>yes/no
</td>
<td>province
</td>
<td>
</td></tr>
<tr>
<td>has_special_building_slot
</td>
<td>Does the province (holding) have a special building slot?
</td>
<td>
</td>
<td>yes/no
</td>
<td>province
</td>
<td>
</td></tr>
<tr>
<td>is_coastal
</td>
<td>is the province a coastal province?
</td>
<td>
</td>
<td>yes/no
</td>
<td>province
</td>
<td>
</td></tr>
<tr>
<td>is_county_capital
</td>
<td>Is the province the county capital?
</td>
<td>
</td>
<td>yes/no
</td>
<td>province
</td>
<td>
</td></tr>
<tr>
<td>monthly_income
</td>
<td>Check the income of the scoped province
</td>
<td>monthly_income &gt; 10
</td>
<td>&lt;, &lt;=, =,&#160;!=, &gt;, &gt;=
</td>
<td>province
</td>
<td>
</td></tr>
<tr>
<td>num_buildings
</td>
<td>How many normal buildings are there? Duchy and such buildings do not count. A building under construction does count
</td>
<td>num_buildings &gt; 3
</td>
<td>&lt;, &lt;=, =,&#160;!=, &gt;, &gt;=
</td>
<td>province
</td>
<td>
</td></tr>
<tr>
<td>number_of_characters_in_pool
</td>
<td>Check the number of characters in the pool the scoped province is a part of
</td>
<td>
</td>
<td>&lt;, &lt;=, =,&#160;!=, &gt;, &gt;=
</td>
<td>province
</td>
<td>
</td></tr>
<tr>
<td>terrain
</td>
<td>Checks if a province is of a specific terrain type
</td>
<td>
</td>
<td>
</td>
<td>province
</td>
<td>
</td></tr>
<tr>
<td>any_leased_title
</td>
<td>Iterate through all titles leased to the scoped holy order
</td>
<td>any_leased_title = { &lt;count=num/all&gt; / &lt;percent=fixed_point&gt; &lt;triggers&gt; }
</td>
<td>
</td>
<td>holy order
</td>
<td>landed title
</td></tr>
<tr>
<td>num_leased_titles
</td>
<td>How many holdings the holy order has under lease
</td>
<td>
</td>
<td>&lt;, &lt;=, =,&#160;!=, &gt;, &gt;=
</td>
<td>holy order
</td>
<td>
</td></tr>
<tr>
<td>activity_has_been_activated
</td>
<td>Is the activity activated?
</td>
<td>
</td>
<td>yes/no
</td>
<td>activity
</td>
<td>
</td></tr>
<tr>
<td>any_activity_declined
</td>
<td>Iterate through all characters who declined an activity invite to a specific activity
</td>
<td>any_activity_declined = { &lt;count=num/all&gt; / &lt;percent=fixed_point&gt; &lt;triggers&gt; }
</td>
<td>
</td>
<td>activity
</td>
<td>character
</td></tr>
<tr>
<td>any_activity_invited
</td>
<td>Iterate through all characters who have unanswered invites to a specific activity
</td>
<td>any_activity_invited = { &lt;count=num/all&gt; / &lt;percent=fixed_point&gt; &lt;triggers&gt; }
</td>
<td>
</td>
<td>activity
</td>
<td>character
</td></tr>
<tr>
<td>any_participant
</td>
<td>Iterate through all participants in an activity
</td>
<td>any_participant = { &lt;count=num/all&gt; / &lt;percent=fixed_point&gt; &lt;triggers&gt; }
</td>
<td>
</td>
<td>activity
</td>
<td>character
</td></tr>
<tr>
<td>is_target_participating
</td>
<td>Is the target character participating in the scoped activity?
</td>
<td>
</td>
<td>character target
</td>
<td>activity
</td>
<td>
</td></tr>
<tr>
<td>number_of_participants
</td>
<td>The number of activity participants (including the owner)
</td>
<td>
</td>
<td>&lt;, &lt;=, =,&#160;!=, &gt;, &gt;=
</td>
<td>activity
</td>
<td>
</td></tr>
<tr>
<td>any_target_title
</td>
<td>Iterate through all casus belli's target titles
</td>
<td>any_target_title = { &lt;count=num/all&gt; / &lt;percent=fixed_point&gt; &lt;triggers&gt; }
</td>
<td>
</td>
<td>casus belli
</td>
<td>landed title
</td></tr>
<tr>
<td>army_is_moving
</td>
<td>Is this army moving?
</td>
<td>
</td>
<td>yes/no
</td>
<td>army
</td>
<td>
</td></tr>
<tr>
<td>army_max_size
</td>
<td>What is this army's max size?
</td>
<td>
</td>
<td>&lt;, &lt;=, =,&#160;!=, &gt;, &gt;=
</td>
<td>army
</td>
<td>
</td></tr>
<tr>
<td>army_size
</td>
<td>what size is this army?
</td>
<td>
</td>
<td>&lt;, &lt;=, =,&#160;!=, &gt;, &gt;=
</td>
<td>army
</td>
<td>
</td></tr>
<tr>
<td>is_army_in_combat
</td>
<td>Is the scoped army in combat?
</td>
<td>
</td>
<td>yes/no
</td>
<td>army
</td>
<td>
</td></tr>
<tr>
<td>is_army_in_raid
</td>
<td>Is the scoped army in a raid (this includes a raid interrupted by combat)?
</td>
<td>
</td>
<td>yes/no
</td>
<td>army
</td>
<td>
</td></tr>
<tr>
<td>is_army_in_siege
</td>
<td>Is the scoped army in a siege (this includes a siege interrupted by combat)?
</td>
<td>
</td>
<td>yes/no
</td>
<td>army
</td>
<td>
</td></tr>
<tr>
<td>is_army_in_siege_relevant_for
</td>
<td>Is the scoped army in a siege that is relevant to the target character?
</td>
<td>is_army_in_siege_relevant_for = scope:character
</td>
<td>character scope
</td>
<td>army
</td>
<td>character
</td></tr>
<tr>
<td>is_raid_army
</td>
<td>Is the scoped army a raid army?
</td>
<td>
</td>
<td>yes/no
</td>
<td>army
</td>
<td>
</td></tr>
<tr>
<td>raid_loot
</td>
<td>How much raid loot is the army carrying?
</td>
<td>
</td>
<td>&lt;, &lt;=, =,&#160;!=, &gt;, &gt;=
</td>
<td>army
</td>
<td>
</td></tr>
<tr>
<td>building_garrison
</td>
<td>The amount of garrison in a county or province from buildings
</td>
<td>levies &gt; 100
</td>
<td>&lt;, &lt;=, =,&#160;!=, &gt;, &gt;=
</td>
<td>landed title, province
</td>
<td>
</td></tr>
<tr>
<td>building_levies
</td>
<td>The amount of levies in a county or province from buildings
</td>
<td>levies &gt; 100
</td>
<td>&lt;, &lt;=, =,&#160;!=, &gt;, &gt;=
</td>
<td>landed title, province
</td>
<td>
</td></tr>
<tr>
<td>squared_distance
</td>
<td>How far away is the province/barony/county from the target? Measured in map pixels. Squared for performance reasons (square root is expensive). squared_distance = { target = some province/barony/county value &gt; 10000 }
</td>
<td>
</td>
<td>&lt;, &lt;=, =,&#160;!=, &gt;, &gt;=
</td>
<td>landed title, province
</td>
<td>
</td></tr>
<tr>
<td>add_to_temporary_list
</td>
<td>Saves a temporary target for use during the trigger execution
</td>
<td>This is used to build lists in triggers.
<p>If used within an any-trigger, placement within the trigger is quite important. The game will iterate through every instance of the any-trigger until it finds a single instance that fulfills the requirements, and then it will stop.
In order to add every instance of a scope that fulfills certain conditions, use "count = all" while also placing this "effect" at the very end of the any-trigger (so that every condition is evaluated for every iteration).
</p>
</td>
<td>
</td>
<td>none
</td>
<td>
</td></tr>
<tr>
<td>all_false
</td>
<td>True if all children are false (equivalent to NOR)
</td>
<td>
</td>
<td>
</td>
<td>none
</td>
<td>
</td></tr>
<tr>
<td>always
</td>
<td>Always the same value
</td>
<td>always = yes is true, always = no is false
</td>
<td>yes/no
</td>
<td>none
</td>
<td>
</td></tr>
<tr>
<td>and
</td>
<td>True if all children are true (this is the default for most lists of triggers).
</td>
<td>
</td>
<td>
</td>
<td>none
</td>
<td>
</td></tr>
<tr>
<td>any_barony
</td>
<td>Iterate through all baronies in the game
</td>
<td>any_barony = { &lt;count=num/all&gt; / &lt;percent=fixed_point&gt; &lt;triggers&gt; }
</td>
<td>
</td>
<td>none
</td>
<td>landed title
</td></tr>
<tr>
<td>any_county
</td>
<td>Iterate through all counties in the game
</td>
<td>any_county = { &lt;count=num/all&gt; / &lt;percent=fixed_point&gt; &lt;triggers&gt; }
</td>
<td>
</td>
<td>none
</td>
<td>landed title
</td></tr>
<tr>
<td>any_county_in_region
</td>
<td>Iterate through all counties in the region. Put 'region = region_name' inside it
</td>
<td>any_county_in_region = { &lt;count=num/all&gt; / &lt;percent=fixed_point&gt; &lt;triggers&gt; }
</td>
<td>
</td>
<td>none
</td>
<td>landed title
</td></tr>
<tr>
<td>any_duchy
</td>
<td>Iterate through all duchies in the game
</td>
<td>any_duchy = { &lt;count=num/all&gt; / &lt;percent=fixed_point&gt; &lt;triggers&gt; }
</td>
<td>
</td>
<td>none
</td>
<td>landed title
</td></tr>
<tr>
<td>any_empire
</td>
<td>Iterate through all empires in the game
</td>
<td>any_empire = { &lt;count=num/all&gt; / &lt;percent=fixed_point&gt; &lt;triggers&gt; }
</td>
<td>
</td>
<td>none
</td>
<td>landed title
</td></tr>
<tr>
<td>any_false
</td>
<td>True if any child is false (equivalent to NAND)
</td>
<td>
</td>
<td>
</td>
<td>none
</td>
<td>
</td></tr>
<tr>
<td>any_in_global_list
</td>
<td>Iterate through all items in global list. list = name or variable = name
</td>
<td>any_in_global_list = { &lt;count=num/all&gt; / &lt;percent=fixed_point&gt; &lt;triggers&gt; }
</td>
<td>
</td>
<td>none
</td>
<td>
</td></tr>
<tr>
<td>any_in_list
</td>
<td>Iterate through all items in list. list = name or variable = name
</td>
<td>any_in_list = { &lt;count=num/all&gt; / &lt;percent=fixed_point&gt; &lt;triggers&gt; }
</td>
<td>
</td>
<td>none
</td>
<td>
</td></tr>
<tr>
<td>any_in_local_list
</td>
<td>Iterate through all items in local list. list = name or variable = name
</td>
<td>any_in_local_list = { &lt;count=num/all&gt; / &lt;percent=fixed_point&gt; &lt;triggers&gt; }
</td>
<td>
</td>
<td>none
</td>
<td>
</td></tr>
<tr>
<td>any_independent_ruler
</td>
<td>Iterate through independent rulers of count tier or above
</td>
<td>any_independent_ruler = { &lt;count=num/all&gt; / &lt;percent=fixed_point&gt; &lt;triggers&gt; }
</td>
<td>
</td>
<td>none
</td>
<td>character
</td></tr>
<tr>
<td>any_kingdom
</td>
<td>Iterate through all kingdoms in the game
</td>
<td>any_kingdom = { &lt;count=num/all&gt; / &lt;percent=fixed_point&gt; &lt;triggers&gt; }
</td>
<td>
</td>
<td>none
</td>
<td>landed title
</td></tr>
<tr>
<td>any_living_character
</td>
<td>Iterate through all living characters
</td>
<td>any_living_character = { &lt;count=num/all&gt; / &lt;percent=fixed_point&gt; &lt;triggers&gt; }
</td>
<td>
</td>
<td>none
</td>
<td>character
</td></tr>
<tr>
<td>any_player
</td>
<td>Iterate through all player characters
</td>
<td>any_player = { &lt;count=num/all&gt; / &lt;percent=fixed_point&gt; &lt;triggers&gt; }
</td>
<td>
</td>
<td>none
</td>
<td>character
</td></tr>
<tr>
<td>any_pool_character
</td>
<td>Iterate through all characters in the pool of the given province
</td>
<td>any_pool_character = { &lt;count=num/all&gt; / &lt;percent=fixed_point&gt; &lt;triggers&gt; }
</td>
<td>
</td>
<td>none
</td>
<td>character
</td></tr>
<tr>
<td>any_province
</td>
<td>Iterate through all provinces (skips non-land and impassable provinces)
</td>
<td>any_province = { &lt;count=num/all&gt; / &lt;percent=fixed_point&gt; &lt;triggers&gt; }
</td>
<td>
</td>
<td>none
</td>
<td>province
</td></tr>
<tr>
<td>any_religion_global
</td>
<td>Iterate through all religions in the game
</td>
<td>any_religion_global = { &lt;count=num/all&gt; / &lt;percent=fixed_point&gt; &lt;triggers&gt; }
</td>
<td>
</td>
<td>none
</td>
<td>religion
</td></tr>
<tr>
<td>any_ruler
</td>
<td>Iterate through all rulers of count tier or above
</td>
<td>any_ruler = { &lt;count=num/all&gt; / &lt;percent=fixed_point&gt; &lt;triggers&gt; }
</td>
<td>
</td>
<td>none
</td>
<td>character
</td></tr>
<tr>
<td>assert_if
</td>
<td>Conditionally cause an assert during run time
</td>
<td>assert_if = { limit = { X } text = Y }, where X is a trigger and Y is an optional string
</td>
<td>
</td>
<td>none
</td>
<td>
</td></tr>
<tr>
<td>assert_read
</td>
<td>Conditionally cause an assert during read time
</td>
<td>assert_read = X, where X is yes or the string to be printed in the assert
</td>
<td>
</td>
<td>none
</td>
<td>
</td></tr>
<tr>
<td>calc_true_if
</td>
<td>Returns true if the specified number of sub-triggers return true
</td>
<td>calc_true_if = { amount = 2 &lt;trigger&gt; &lt;trigger&gt; &lt;trigger&gt; }
</td>
<td>
</td>
<td>none
</td>
<td>
</td></tr>
<tr>
<td>can_start_tutorial_lesson
</td>
<td>Can the specified tutorial lesson be started?
</td>
<td>can_start_tutorial_lesson = reactive_advice_succession
<p>An interface trigger, can only be used in specific places
</p>
</td>
<td>
</td>
<td>none
</td>
<td>
</td></tr>
<tr>
<td>current_computer_date
</td>
<td>Compare the current computer date.
</td>
<td>An interface trigger, can only be used in specific places
</td>
<td>&lt;, =, &gt; valid date
</td>
<td>none
</td>
<td>
</td></tr>
<tr>
<td>current_computer_date_day
</td>
<td>Compare the current computer day.
</td>
<td>An interface trigger, can only be used in specific places
</td>
<td>&lt;, &lt;=, =,&#160;!=, &gt;, &gt;=
</td>
<td>none
</td>
<td>
</td></tr>
<tr>
<td>current_computer_date_month
</td>
<td>Compare the current computer month.
</td>
<td>An interface trigger, can only be used in specific places
</td>
<td>&lt;, &lt;=, =,&#160;!=, &gt;, &gt;=
</td>
<td>none
</td>
<td>
</td></tr>
<tr>
<td>current_computer_date_year
</td>
<td>Compare the current computer year.
</td>
<td>An interface trigger, can only be used in specific places
</td>
<td>&lt;, &lt;=, =,&#160;!=, &gt;, &gt;=
</td>
<td>none
</td>
<td>
</td></tr>
<tr>
<td>current_date
</td>
<td>Compare the current ingame date.
</td>
<td>
</td>
<td>&lt;, =, &gt; valid date
</td>
<td>none
</td>
<td>
</td></tr>
<tr>
<td>current_month
</td>
<td>Compare the current ingame month (1..12)
</td>
<td>
</td>
<td>&lt;, &lt;=, =,&#160;!=, &gt;, &gt;=
</td>
<td>none
</td>
<td>
</td></tr>
<tr>
<td>current_tooltip_depth
</td>
<td>What is number of tooltips open rigth now?
</td>
<td>An interface trigger, can only be used in specific places
</td>
<td>&lt;, &lt;=, =,&#160;!=, &gt;, &gt;=
</td>
<td>none
</td>
<td>
</td></tr>
<tr>
<td>custom_description
</td>
<td>Wraps triggers that get a custom description instead of the auto-generated one
</td>
<td>custom_description = {
<p>	text = &lt;trigger_localization_key&gt;
	subject = &lt;optional subject scope&gt; #defaults to current scope
	object = &lt;optional object scope&gt;
	value = &lt;optional script value&gt;
	... triggers ...
}
</p>
</td>
<td>
</td>
<td>none
</td>
<td>
</td></tr>
<tr>
<td>custom_tooltip
</td>
<td>Replaces the tooltips for the enclosed triggers with a custom text
</td>
<td>custom_tooltip = {
<p>	text = &lt;text&gt;
	&lt;trigger&gt;
}
</p>
</td>
<td>
</td>
<td>none
</td>
<td>
</td></tr>
<tr>
<td>debug_only
</td>
<td>Checks if the game is in debug mode or not.
</td>
<td>
</td>
<td>yes/no
</td>
<td>none
</td>
<td>
</td></tr>
<tr>
<td>exists
</td>
<td>Checks whether the specified socope target exists (check for not being the null object)
</td>
<td>exists = from.owner.var:cool_var.mother
</td>
<td>
</td>
<td>none
</td>
<td>
</td></tr>
<tr>
<td>game_start_date
</td>
<td>Compare the date of the bookmarked game launched.
</td>
<td>
</td>
<td>&lt;, =, &gt; valid date
</td>
<td>none
</td>
<td>
</td></tr>
<tr>
<td>global_variable_list_size
</td>
<td>Checks the size of a variable list
</td>
<td>variable_list_size = { name = X value &gt;= Y }
<ul><li>X is the name of the variable</li>
<li>Y is a script value or number</li></ul>
</td>
<td>
</td>
<td>none
</td>
<td>
</td></tr>
<tr>
<td>has_dlc
</td>
<td>Does the host have this DLC?
</td>
<td>
</td>
<td>
</td>
<td>none
</td>
<td>
</td></tr>
<tr>
<td>has_game_rule
</td>
<td>Is the given game rule setting enabled?
</td>
<td>has_game_rule = faster_conversion
</td>
<td>
</td>
<td>none
</td>
<td>
</td></tr>
<tr>
<td>has_global_variable
</td>
<td>Checks whether the current scope has the specified variable set
</td>
<td>has_variable = name
</td>
<td>
</td>
<td>none
</td>
<td>
</td></tr>
<tr>
<td>has_global_variable_list
</td>
<td>Checks whether the current scope has the specified variable list set
</td>
<td>has_variable_list = name
</td>
<td>
</td>
<td>none
</td>
<td>
</td></tr>
<tr>
<td>has_local_variable
</td>
<td>Checks whether the current scope has the specified variable set
</td>
<td>has_variable = name
</td>
<td>
</td>
<td>none
</td>
<td>
</td></tr>
<tr>
<td>has_local_variable_list
</td>
<td>Checks whether the current scope has the specified variable list set
</td>
<td>has_variable_list = name
</td>
<td>
</td>
<td>none
</td>
<td>
</td></tr>
<tr>
<td>has_map_mode
</td>
<td>Checks if the current map mode is the specified one
</td>
<td>has_map_mode = realms
<p>An interface trigger, can only be used in specific places
</p>
</td>
<td>
</td>
<td>none
</td>
<td>
</td></tr>
<tr>
<td>has_multiple_players
</td>
<td>Does the game have at least two players currently connected?
</td>
<td>
</td>
<td>yes/no
</td>
<td>none
</td>
<td>
</td></tr>
<tr>
<td>has_variable
</td>
<td>Checks whether the current scope has the specified variable set
</td>
<td>has_variable = name
</td>
<td>
</td>
<td>none
</td>
<td>
</td></tr>
<tr>
<td>has_variable_list
</td>
<td>Checks whether the current scope has the specified variable list set
</td>
<td>has_variable_list = name
</td>
<td>
</td>
<td>none
</td>
<td>
</td></tr>
<tr>
<td>has_war_result_message_with_outcome
</td>
<td>Is there a war result message with the specified outcome?
</td>
<td>has_war_result_message_with_outcome = victory/defeat/white_peace/invalidated/any
<p>An interface trigger, can only be used in specific places
</p>
</td>
<td>
</td>
<td>none
</td>
<td>
</td></tr>
<tr>
<td>is_bad_nickname
</td>
<td>Is the nickname bad?
</td>
<td>
</td>
<td>
</td>
<td>none
</td>
<td>
</td></tr>
<tr>
<td>is_frontend_character_selected
</td>
<td>is the specified front end character selected (also can be used with "= yes" and "= no")?
</td>
<td>An interface trigger, can only be used in specific places
</td>
<td>
</td>
<td>none
</td>
<td>
</td></tr>
<tr>
<td>is_game_view_open
</td>
<td>is the specified in-game view open?
</td>
<td>An interface trigger, can only be used in specific places
</td>
<td>
</td>
<td>none
</td>
<td>
</td></tr>
<tr>
<td>is_gamestate_tutorial_active
</td>
<td>Is the gamestate tutorial active? See save_progress_in_gamestate in tutorial_lesson_chains documentation.
</td>
<td>An interface trigger, can only be used in specific places
</td>
<td>yes/no
</td>
<td>none
</td>
<td>
</td></tr>
<tr>
<td>is_in_list
</td>
<td>Checks if a target in in a list
</td>
<td>
</td>
<td>
</td>
<td>none
</td>
<td>
</td></tr>
<tr>
<td>is_player_selected
</td>
<td>is the player playing a character?
</td>
<td>An interface trigger, can only be used in specific places
</td>
<td>yes/no
</td>
<td>none
</td>
<td>
</td></tr>
<tr>
<td>is_target_in_global_variable_list
</td>
<td>Checks if a target is in a variable list
</td>
<td>is_target_in_variable_list = { name = X target = Y }
<ul><li>X is the name of the variable</li>
<li>Y is an event target</li></ul>
</td>
<td>
</td>
<td>none
</td>
<td>
</td></tr>
<tr>
<td>is_target_in_local_variable_list
</td>
<td>Checks if a target is in a variable list
</td>
<td>is_target_in_variable_list = { name = X target = Y }
<ul><li>X is the name of the variable</li>
<li>Y is an event target</li></ul>
</td>
<td>
</td>
<td>none
</td>
<td>
</td></tr>
<tr>
<td>is_target_in_variable_list
</td>
<td>Checks if a target is in a variable list
</td>
<td>is_target_in_variable_list = { name = X target = Y }
<ul><li>X is the name of the variable</li>
<li>Y is an event target</li></ul>
</td>
<td>
</td>
<td>none
</td>
<td>
</td></tr>
<tr>
<td>is_tooltip_with_name_open
</td>
<td>Is the tooltip with the specified name open?
</td>
<td>An interface trigger, can only be used in specific places
</td>
<td>
</td>
<td>none
</td>
<td>
</td></tr>
<tr>
<td>is_tutorial_active
</td>
<td>Is the tutorial active?
</td>
<td>An interface trigger, can only be used in specific places
</td>
<td>yes/no
</td>
<td>none
</td>
<td>
</td></tr>
<tr>
<td>is_tutorial_lesson_active
</td>
<td>Is this the current tutorial lesson?
</td>
<td>is_tutorial_lesson_active = reactive_advice_succession
<p>An interface trigger, can only be used in specific places
</p>
</td>
<td>
</td>
<td>none
</td>
<td>
</td></tr>
<tr>
<td>is_tutorial_lesson_chain_completed
</td>
<td>Has the tutorial lesson chain with the specified key been finished?
</td>
<td>An interface trigger, can only be used in specific places
</td>
<td>
</td>
<td>none
</td>
<td>
</td></tr>
<tr>
<td>is_tutorial_lesson_completed
</td>
<td>has the tutorial lesson with the specified name been finished?
</td>
<td>An interface trigger, can only be used in specific places
</td>
<td>
</td>
<td>none
</td>
<td>
</td></tr>
<tr>
<td>is_tutorial_lesson_step_completed
</td>
<td>Has the tutorial lesson step been finished?
</td>
<td>is_tutorial_lesson_step_completed = lesson_key:step_key
<p>An interface trigger, can only be used in specific places
</p>
</td>
<td>
</td>
<td>none
</td>
<td>
</td></tr>
<tr>
<td>is_war_overview_tab_open
</td>
<td>is the war overview open at a specified tab (victory, defeat, white_peace)?
</td>
<td>An interface trigger, can only be used in specific places
</td>
<td>
</td>
<td>none
</td>
<td>
</td></tr>
<tr>
<td>is_widget_open
</td>
<td>is the widget with the specified name open?
</td>
<td>Separting strings with dots will search for specific children of children e.g. appa.foo vs baz.foo
<p>An interface trigger, can only be used in specific places
</p>
</td>
<td>
</td>
<td>none
</td>
<td>
</td></tr>
<tr>
<td>list_size
</td>
<td>Checks the size of a list
</td>
<td>list_size = { name = X value &gt;= Y }
<ul><li>X is the name of the list</li>
<li>Y is a script value</li></ul>
</td>
<td>&lt;, &lt;=, =,&#160;!=, &gt;, &gt;=
</td>
<td>none
</td>
<td>
</td></tr>
<tr>
<td>local_variable_list_size
</td>
<td>Checks the size of a variable list
</td>
<td>variable_list_size = { name = X value &gt;= Y }
<ul><li>X is the name of the variable</li>
<li>Y is a script value or number</li></ul>
</td>
<td>
</td>
<td>none
</td>
<td>
</td></tr>
<tr>
<td>monarchs_journey_unlock
</td>
<td>
</td>
<td>An interface trigger, can only be used in specific places
</td>
<td>
</td>
<td>none
</td>
<td>
</td></tr>
<tr>
<td>nand
</td>
<td>a negated AND trigger
</td>
<td>
</td>
<td>
</td>
<td>none
</td>
<td>
</td></tr>
<tr>
<td>nor
</td>
<td>a negated OR trigger
</td>
<td>
</td>
<td>
</td>
<td>none
</td>
<td>
</td></tr>
<tr>
<td>not
</td>
<td>Negates content of trigger
</td>
<td>
</td>
<td>
</td>
<td>none
</td>
<td>
</td></tr>
<tr>
<td>or
</td>
<td>True if any of the children is true
</td>
<td>
</td>
<td>
</td>
<td>none
</td>
<td>
</td></tr>
<tr>
<td>release_only
</td>
<td>Checks if the game is in release mode or not.
</td>
<td>
</td>
<td>yes/no
</td>
<td>none
</td>
<td>
</td></tr>
<tr>
<td>save_temporary_scope_as
</td>
<td>Saves a temporary target for use during the trigger execution
</td>
<td>
</td>
<td>
</td>
<td>none
</td>
<td>
</td></tr>
<tr>
<td>save_temporary_scope_value_as
</td>
<td>Saves a numerical or bool value as an arbitrarily-named temporary target to be referenced later in the same effect
</td>
<td>save_temporary_scope_value_as = { name = &lt;string&gt; value = x }
</td>
<td>
</td>
<td>none
</td>
<td>
</td></tr>
<tr>
<td>scripted_tests
</td>
<td>Checks if the game is currently running scripted tests.
</td>
<td>
</td>
<td>yes/no
</td>
<td>none
</td>
<td>
</td></tr>
<tr>
<td>switch
</td>
<td>Switch on a trigger for the evaluation of another trigger with an optional fallback trigger.
</td>
<td>switch = {
<p>	trigger = simple_assign_trigger
	case_1 = { &lt;triggers&gt; }
	case_2 = { &lt;triggers&gt; }
	case_n = { &lt;triggers&gt; }
	fallback = { &lt;triggers&gt; }
</p>
</td>
<td>
</td>
<td>none
</td>
<td>
</td></tr>
<tr>
<td>time_of_year
</td>
<td>Check if the current date is within the bounds
</td>
<td>time_of_year = {
<pre>   min = 11.1 # default: beginning of year
   max = 2.29 # default: end of year
</pre>
<p>}
Dates are formatted as "&lt;month&gt;.&lt;day&gt;" or just "&lt;month&gt;".
The check includes the min and max dates.
min can be larger than max, in this case we wrap around to the next year (i.e., February is between October and March).
</p>
</td>
<td>
</td>
<td>none
</td>
<td>
</td></tr>
<tr>
<td>trigger_else
</td>
<td>Evaluates the triggers if the display_triggers of preceding 'trigger_if' or 'trigger_else_if' is not mettrigger_if = { limit = { &lt;display_triggers&gt; } &lt;triggers&gt; }
</td>
<td>trigger_else = { &lt;triggers&gt; }
</td>
<td>
</td>
<td>none
</td>
<td>
</td></tr>
<tr>
<td>trigger_else_if
</td>
<td>Evaluates the enclosed triggers if the display_triggers of the preceding trigger_if or trigger_else_if is not met and its own display_trigger of the limit is mettrigger_if = { limit = { &lt;display_triggers&gt; } &lt;triggers&gt; }
</td>
<td>trigger_else_if = { limit = { &lt;display_triggers&gt; } &lt;triggers&gt; }
</td>
<td>
</td>
<td>none
</td>
<td>
</td></tr>
<tr>
<td>trigger_if
</td>
<td>Evaluates the triggers if the display_triggers of the limit are met
</td>
<td>trigger_if = { limit = { &lt;display_triggers&gt; } &lt;triggers&gt; }
</td>
<td>
</td>
<td>none
</td>
<td>
</td></tr>
<tr>
<td>variable_list_size
</td>
<td>Checks the size of a variable list
</td>
<td>variable_list_size = { name = X value &gt;= Y }
<ul><li>X is the name of the variable</li>
<li>Y is a script value or number</li></ul>
</td>
<td>
</td>
<td>none
</td>
<td>
</td></tr>
<tr>
<td>weighted_calc_true_if
</td>
<td>Returns true if the sum of weights of fulfilled sub-triggers amount to the specified sum
</td>
<td>weighted_calc_true_if = { amount = 10 5 = { &lt;trigger&gt; } 15 = { &lt;trigger&gt; } 7 = { &lt;trigger&gt; } }
</td>
<td>
</td>
<td>none
</td>
<td>
</td></tr>
<tr>
<td>years_from_game_start
</td>
<td>How many years it has been since the start of the game
</td>
<td>years_from_game_start &gt; 5
</td>
<td>&lt;, &lt;=, =,&#160;!=, &gt;, &gt;=
</td>
<td>none
</td>
<td>
</td></tr>
<tr>
<td>in_color_list
</td>
<td>Check if the scoped color is part of the given color list
</td>
<td>
</td>
<td>
</td>
<td>color
</td>
<td>
</td></tr>
<tr>
<td>is_color
</td>
<td>Check if the scoped color is the same as another color. The right hand side can be either a hex, rgb, or hsv color,  or a named color, or another color scope.
</td>
<td>
</td>
<td>
</td>
<td>color
</td>
<td>
</td></tr>
<tr>
<td>any_side_commander
</td>
<td>Iterate through all commanders (the commanders of every army on the side, not just the one leading the battle)
</td>
<td>any_side_commander = { &lt;count=num/all&gt; / &lt;percent=fixed_point&gt; &lt;triggers&gt; }
</td>
<td>
</td>
<td>combat side
</td>
<td>character
</td></tr>
<tr>
<td>any_side_knight
</td>
<td>Iterate through all knights
</td>
<td>any_side_knight = { &lt;count=num/all&gt; / &lt;percent=fixed_point&gt; &lt;triggers&gt; }
</td>
<td>
</td>
<td>combat side
</td>
<td>character
</td></tr>
<tr>
<td>has_maa_of_type
</td>
<td>Does this combat side have at least one regiment of men at arms of the given type?
</td>
<td>has_maa_of_type = onager
</td>
<td>
</td>
<td>combat side
</td>
<td>
</td></tr>
<tr>
<td>is_combat_side_attacker
</td>
<td>Was the combat side the attacker?
</td>
<td>
</td>
<td>yes/no
</td>
<td>combat side
</td>
<td>
</td></tr>
<tr>
<td>is_combat_side_pursuing
</td>
<td>Is this side the winner of the combat?
</td>
<td>
</td>
<td>yes/no
</td>
<td>combat side
</td>
<td>
</td></tr>
<tr>
<td>is_combat_side_retreating
</td>
<td>Is this side defeated in the combat?
</td>
<td>
</td>
<td>yes/no
</td>
<td>combat side
</td>
<td>
</td></tr>
<tr>
<td>side_soldiers
</td>
<td>How many soldiers does this side have still fighting?
</td>
<td>
</td>
<td>&lt;, &lt;=, =,&#160;!=, &gt;, &gt;=
</td>
<td>combat side
</td>
<td>
</td></tr>
<tr>
<td>side_strength
</td>
<td>How strong is this side (based on soldiers still fighting)? Scaled down by a factor of 1000 so it doesn't get too large to do math on
</td>
<td>
</td>
<td>&lt;, &lt;=, =,&#160;!=, &gt;, &gt;=
</td>
<td>combat side
</td>
<td>
</td></tr>
<tr>
<td>any_pledged_attacker
</td>
<td>Iterate through all pledged attackers within a great holy war
</td>
<td>any_pledged_attacker = { &lt;count=num/all&gt; / &lt;percent=fixed_point&gt; &lt;triggers&gt; }
</td>
<td>
</td>
<td>great holy war
</td>
<td>character
</td></tr>
<tr>
<td>any_pledged_defender
</td>
<td>Iterate through all pledged defenders within a great holy war
</td>
<td>any_pledged_defender = { &lt;count=num/all&gt; / &lt;percent=fixed_point&gt; &lt;triggers&gt; }
</td>
<td>
</td>
<td>great holy war
</td>
<td>character
</td></tr>
<tr>
<td>days_until_ghw_launch
</td>
<td>How many days is it until the given GHW launches?
</td>
<td>
</td>
<td>&lt;, &lt;=, =,&#160;!=, &gt;, &gt;=
</td>
<td>great holy war
</td>
<td>
</td></tr>
<tr>
<td>ghw_attackers_strength
</td>
<td>What is the max (if all levies were fully reinforced) military strength of the pledged attackers in the given hreat holy war?
</td>
<td>
</td>
<td>&lt;, &lt;=, =,&#160;!=, &gt;, &gt;=
</td>
<td>great holy war
</td>
<td>
</td></tr>
<tr>
<td>ghw_defenders_strength
</td>
<td>What is the max (if all levies were fully reinforced) military strength of the pledged defenders in the given great holy war?
</td>
<td>
</td>
<td>&lt;, &lt;=, =,&#160;!=, &gt;, &gt;=
</td>
<td>great holy war
</td>
<td>
</td></tr>
<tr>
<td>has_forced_defender
</td>
<td>Is the target character forced to be a defender in the given great holy war?
</td>
<td>
</td>
<td>character scope
</td>
<td>great holy war
</td>
<td>character
</td></tr>
<tr>
<td>has_pledged_attacker
</td>
<td>Is the target character pledged as an attacker in the given great holy war?
</td>
<td>
</td>
<td>character scope
</td>
<td>great holy war
</td>
<td>character
</td></tr>
<tr>
<td>has_pledged_defender
</td>
<td>Is the target character pledged as a defender in the given great holy war?
</td>
<td>
</td>
<td>character scope
</td>
<td>great holy war
</td>
<td>character
</td></tr>
<tr>
<td>is_directed_ghw
</td>
<td>Is the scoped GHW a directed GHW?
</td>
<td>
</td>
<td>yes/no
</td>
<td>great holy war
</td>
<td>
</td></tr>
<tr>
<td>war_chest_gold
</td>
<td>How much gold is in the great holy war's war chest?
</td>
<td>
</td>
<td>&lt;, &lt;=, =,&#160;!=, &gt;, &gt;=
</td>
<td>great holy war
</td>
<td>
</td></tr>
<tr>
<td>war_chest_piety
</td>
<td>How much piety is in the great holy war's war chest?
</td>
<td>
</td>
<td>&lt;, &lt;=, =,&#160;!=, &gt;, &gt;=
</td>
<td>great holy war
</td>
<td>
</td></tr>
<tr>
<td>war_chest_prestige
</td>
<td>How much prestige is in the great holy war's war chest?
</td>
<td>
</td>
<td>&lt;, &lt;=, =,&#160;!=, &gt;, &gt;=
</td>
<td>great holy war
</td>
<td>
</td></tr>
`


let globalTriggersArray = parseTriggers(triggerT);
globalTriggersArray = removeDuplicates(globalTriggersArray);
