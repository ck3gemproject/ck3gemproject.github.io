function processEffectsWiki(wikipedia) {
  let arr = wikipedia.split(`\n`);

  let n = 0;
  let objectArr = [];
  let o = {
    effectName: ``,
    description: ``,
    usage: ``,
    supportedScopes: ``,
    supportedTargets: ``,
    usedFromScope: '',
    valueType: ``,
    example: ``,
    category: ``,
  };
  let eating = false;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].includes("<td>")) {
      arr[i] = arr[i].replace("<td>", "");
      arr[i] = arr[i].replace("<td>", "");
      eating = true;
    }
    if (eating === true) {
      if (n === 0) {
        o.effectName += `${arr[i]}`
      } else if (n === 1) {
        o.description += `${arr[i]}`
      } else if (n === 2) {
        o.usedFromScope += `${arr[i]}`
      } else if (n === 3) {
        o.valueType += `${arr[i]}`
      } else if (n === 4) {
        o.description += `${arr[i]}`
      } else if (n === 5) {
        o.example += `${arr[i]}`
      } else if (n === 6) {
        o.category += `${arr[i]}`
      }
    }
    if (arr[i].includes("</td>")) {
      n += 1;
    }

    if (arr[i].includes("</tr>")) {
      eating = false;
      n = 0;
      o.code = o.usage;
      if (o.effectName !== "") {
        objectArr.push(o);
      }
      o = {
        effectName: ``,
        description: ``,
        usage: ``,
        supportedScopes: ``,
        supportedTargets: ``,
        usedFromScope: '',
        valueType: ``,
        example: ``,
        category: ``,
      };
    }
  }
  for (let i = 0; i < objectArr.length; i++) {
    for (let prop in objectArr[i]) {
      objectArr[i][prop] = objectArr[i][prop].replace("</tr>", "");
      objectArr[i][prop] = objectArr[i][prop].replace("</td>", "")
    }
  }
  let t = ""
  let optionHTML = "";
  let afterHTML = "";
  for (let i = 0; i < objectArr.length; i++) {

      t += `
      <div class="component-edit-input tooltip">
        <div class="component-edit-input-label">
          ${objectArr[i].effectName}
        </div>

        <div class="component-edit-input-label">
          <span class="tooltiptext">${objectArr[i].description}\nExample:\n${objectArr[i].example}\nUsed from Scope: ${objectArr[i].usedFromScope}\nTakes Value Type: ${objectArr[i].valueType}\nCategory: ${objectArr[i].category}</span>
          <input class="component-option" name="immediate_${objectArr[i].effectName}" id="immediate_${objectArr[i].effectName}" placeholder="${objectArr[i].valueType}">
        </div>
      </div>
      `

      afterHTML += `
      <div class="component-edit-input tooltip">
        <div class="component-edit-input-label">
          ${objectArr[i].effectName}
        </div>

        <div class="component-edit-input-label">
          <span class="tooltiptext">${objectArr[i].description}\nExample:\n${objectArr[i].example}\nUsed from Scope: ${objectArr[i].usedFromScope}\nTakes Value Type: ${objectArr[i].valueType}\nCategory: ${objectArr[i].category}</span>
          <input class="component-option" name="after_${objectArr[i].effectName}" id="after_${objectArr[i].effectName}" placeholder="${objectArr[i].valueType}">
        </div>
      </div>
      `

      optionHTML += `
      <div class="component-edit-input tooltip">
        <div class="component-edit-input-label">
          ${objectArr[i].effectName}
        </div>

        <div class="component-edit-input-label">
          <span class="tooltiptext">${objectArr[i].description}\nExample:\n${objectArr[i].example}\nUsed from Scope: ${objectArr[i].usedFromScope}\nTakes Value Type: ${objectArr[i].valueType}\nCategory: ${objectArr[i].category}</span>
          <input class="component-option" name="option_${objectArr[i].effectName}" id="option_${objectArr[i].effectName}" placeholder="${objectArr[i].valueType}">
        </div>
      </div>
      `

  }
  GID("immediate-block").innerHTML += t;
  GID("after-block").innerHTML += afterHTML;
  GID("options-block").innerHTML += optionHTML;
  return objectArr;
}

let effectsWiki = `

<!DOCTYPE html>
<html class="client-nojs" lang="en" dir="ltr">
<head>
<meta charset="UTF-8"/>
<title>Commands - CK3 Wiki</title>
<script>document.documentElement.className = document.documentElement.className.replace( /(^|\s)client-nojs(\s|$)/, "$1client-js$2" );</script>
<script>(window.RLQ=window.RLQ||[]).push(function(){mw.config.set({"wgCanonicalNamespace":"","wgCanonicalSpecialPageName":false,"wgNamespaceNumber":0,"wgPageName":"Commands","wgTitle":"Commands","wgCurRevisionId":10018,"wgRevisionId":10018,"wgArticleId":1302,"wgIsArticle":true,"wgIsRedirect":false,"wgAction":"view","wgUserName":null,"wgUserGroups":["*"],"wgCategories":["Potentially outdated","1.0","To be merged","Modding"],"wgBreakFrames":false,"wgPageContentLanguage":"en","wgPageContentModel":"wikitext","wgSeparatorTransformTable":["",""],"wgDigitTransformTable":["",""],"wgDefaultDateFormat":"dmy","wgMonthNames":["","January","February","March","April","May","June","July","August","September","October","November","December"],"wgMonthNamesShort":["","Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],"wgRelevantPageName":"Commands","wgRelevantArticleId":1302,"wgRequestId":"8f95ad6864867ed7c620c01f","wgCSPNonce":false,"wgIsProbablyEditable":true,"wgRelevantPageIsProbablyEditable":true,"wgRestrictionEdit":[],"wgRestrictionMove":[],"wgMFExpandAllSectionsUserOption":true,"wgMFEnableFontChanger":true,"wgMFDisplayWikibaseDescriptions":{"search":false,"nearby":false,"watchlist":false,"tagline":false},"wgMediaViewerOnClick":true,"wgMediaViewerEnabledByDefault":true,"wgWikiEditorEnabledModules":[],"wgCategoryTreePageCategoryOptions":"{\"mode\":0,\"hideprefix\":20,\"showcount\":true,\"namespaces\":false}"});mw.loader.state({"site.styles":"ready","noscript":"ready","user.styles":"ready","user":"ready","user.options":"ready","user.tokens":"loading","mediawiki.legacy.shared":"ready","mediawiki.legacy.commonPrint":"ready","mediawiki.skinning.interface":"ready","skins.vector.styles":"ready"});mw.loader.implement("user.tokens@0tffind",function($,jQuery,require,module){/*@nomin*/mw.user.tokens.set({"editToken":"+\\","patrolToken":"+\\","watchToken":"+\\","csrfToken":"+\\"});
});RLPAGEMODULES=["site","mediawiki.page.startup","mediawiki.user","mediawiki.page.ready","jquery.tablesorter","mediawiki.searchSuggest","mmv.head","mmv.bootstrap.autostart","ext.lazyload","skins.vector.js"];mw.loader.load(RLPAGEMODULES);});</script>
<link rel="stylesheet" href="/load.php?debug=false&amp;lang=en&amp;modules=mediawiki.legacy.commonPrint%2Cshared%7Cmediawiki.skinning.interface%7Cskins.vector.styles&amp;only=styles&amp;skin=vector"/>
<script async="" src="/load.php?debug=false&amp;lang=en&amp;modules=startup&amp;only=scripts&amp;skin=vector"></script>
<meta name="ResourceLoaderDynamicStyles" content=""/>
<link rel="stylesheet" href="/load.php?debug=false&amp;lang=en&amp;modules=site.styles&amp;only=styles&amp;skin=vector"/>
<meta name="generator" content="MediaWiki 1.32.0"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=yes"/>
<link rel="alternate" type="application/x-wiki" title="Edit" href="/index.php?title=Commands&amp;action=edit"/>
<link rel="edit" title="Edit" href="/index.php?title=Commands&amp;action=edit"/>
<link rel="shortcut icon" href="/favicon.ico"/>
<link rel="search" type="application/opensearchdescription+xml" href="/opensearch_desc.php" title="CK3 Wiki (en)"/>
<link rel="EditURI" type="application/rsd+xml" href="https://ck3.paradoxwikis.com/api.php?action=rsd"/>
<link rel="license" href="https://central.paradoxwikis.com/Central:Copyrights"/>
<link rel="alternate" type="application/atom+xml" title="CK3 Wiki Atom feed" href="/index.php?title=Special:RecentChanges&amp;feed=atom"/>
<!--[if lt IE 9]><script src="/load.php?debug=false&amp;lang=en&amp;modules=html5shiv&amp;only=scripts&amp;skin=vector&amp;sync=1"></script><![endif]-->
</head>
<body class="mediawiki ltr sitedir-ltr mw-hide-empty-elt ns-0 ns-subject page-Commands rootpage-Commands skin-vector action-view">
        <div class="pdx_mainNavBar ts-container" id="mw-header-container">
            <div class="ts-inner" id="mw-header">
                <div class="pd_menuTrigger">
                    <div class="p-nav-menuTrigger">
                        <div class="menu-icon">
                            <div class="menu-icon__bar"></div>
                            <div class="menu-icon__bar"></div>
                            <div class="menu-icon__bar"></div>
                        </div>
                        <i class="pd-logo-icon uix_logoIcon"></i>
                    </div>
                    <div class="pd_nav">
                        <div 0="class" 1="header-menu__navigation content">
                            <div 0="class" 1="navigation-menu nav-active" id="header-menu">
                                <div class="navigation-menu__list">
                                    <div class="navigation-menu__section">
                                        <div class="navigation-menu__section-items-container">
                                            <a class="navigation-menu__section-item" href="https://forum.paradoxplaza.com/forum/forums/">Forum list</a>
                                            <a class="navigation-menu__section-item" href="https://forum.paradoxplaza.com/forum/threads/trending">Trending</a>
                                            <a class="navigation-menu__section-item" href="https://forum.paradoxplaza.com/forum/threads/latest">Latest</a>
                                            <a class="navigation-menu__section-item" href="https://forum.paradoxplaza.com/forum/threads/newest">New posts</a>
                                        </div>
                                    </div>
                                    <div class="content-asset">
                                        <div class="navigation-menu__section">
                                            <div class="navigation-menu__section-title">Paradox</div>
                                            <div class="navigation-menu__section-items-container">
                                                <div class="navigation-menu__section-items-container">
                                                    <a class="navigation-menu__section-item" href="https://www.paradoxplaza.com/">Store</a>
                                                    <a class="navigation-menu__section-item" href="https://mods.paradoxplaza.com/">Mods</a>
                                                    <a class="navigation-menu__section-item" href="https://forum.paradoxplaza.com/forum/forums/">Forum</a>
                                                    <a class="navigation-menu__section-item" href="https://play.paradoxplaza.com/">Launcher</a>
                                                    <a class="navigation-menu__section-item" href="https://pdxcon.paradoxplaza.com/?utm_source=pdxplaza-owned&amp;utm_medium=web-owned&amp;utm_content=topmenu-banner&amp;utm_campaign=pc18_pdxcon_20190412_cawe_ann">PDXCON 2019</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="p-header-logo p-header-logo--image">
                        <a class="uix_logo" href="/">
                            <div class="uix_logo--text">
                                <span>Paradox Wikis</span>
                            </div>
                        </a>
                    </div>
                </div>

                <div class="pdx_siteToggle pdx_hasDropdown">
                    <div class="pdx_siteToggle__trigger pdx_dropdownTrigger"><span><div class="mw-parser-output"><p>CK3 Wiki
</p></div></span><i></i></div>
                    <div class="pdx_dropdown pdx_dropdown--extraLarge">
                        <div class="pdx_gameChanger">
                            <div class="pdx_gameChanger__title">Active Wikis</div>
                            <div class="pdx_dropdown__menuList pdx_dropdown__menuList pdx_dropdown__menuList--columns">
                                <a href="https://aowplanetfall.paradoxwikis.com/AoW_Planetfall_Wiki" class="pdx_menu__link pdx_gameChanger--planetfall">AoW: Planetfall</a>
                                <a href="https://skylines.paradoxwikis.com/Cities:_Skylines_Wiki" class="pdx_menu__link pdx_gameChanger--skylines">Cities: Skylines</a>
                                <a href="https://ck3.paradoxwikis.com/Crusader_Kings_III_Wiki" class="pdx_menu__link pdx_gameChanger--ck3">Crusader Kings 3</a>
                                <a href="https://ck2.paradoxwikis.com/Crusader_Kings_II_Wiki" class="pdx_menu__link pdx_gameChanger--ck2">Crusader Kings 2</a>
                                <a href="https://eu4.paradoxwikis.com/Europa_Universalis_4_Wiki" class="pdx_menu__link pdx_gameChanger--eu4">Europa Universalis 4</a>
                                <a href="https://hoi4.paradoxwikis.com/Hearts_of_Iron_4_Wiki" class="pdx_menu__link pdx_gameChanger--hi4">Hearts of Iron 4</a>
                                <a href="https://imperator.paradoxwikis.com/Imperator_Wiki" class="pdx_menu__link pdx_gameChanger--improme">Imperator: Rome</a>
                                <a href="https://prisonarchitect.paradoxwikis.com/" class="pdx_menu__link pdx_gameChanger--architect">Prison Architect</a>
                                <a href="https://stellaris.paradoxwikis.com/Stellaris_Wiki" class="pdx_menu__link pdx_gameChanger--stellaris">Stellaris</a>
                                <a href="https://survivingmars.paradoxwikis.com/Surviving_Mars_Wiki" class="pdx_menu__link pdx_gameChanger--mars">Surviving Mars</a>
                                <a href="https://sta.paradoxwikis.com/Surviving_The_Aftermath_Wiki" class="pdx_menu__link pdx_gameChanger--aftermath">Surviving the Aftermath</a>
                            </div>
                            <div class="pdx_gameChanger__title">Legacy Wikis</div>
                            <div class="pdx_dropdown__menuList pdx_dropdown__menuList pdx_dropdown__menuList--columns">
                                <a href="https://aod.paradoxwikis.com/Main_Page" class="pdx_menu__link pdx_gameChanger--arsenal">Arsenal of Democracy</a>
                                <a href="https://eu2.paradoxwikis.com/Main_Page" class="pdx_menu__link pdx_gameChanger--eu2">Europa Universalis 2</a>
                                <a href="https://eu3.paradoxwikis.com/Europa_Universalis_3_Wiki" class="pdx_menu__link pdx_gameChanger--eu3">Europa Universalis 3</a>
                                <a href="https://eurome.paradoxwikis.com/Europa_Universalis:_Rome_Wiki" class="pdx_menu__link pdx_gameChanger--eurome">Europa Universalis: Rome</a>
                                <a href="https://hoi2.paradoxwikis.com/Main_Page" class="pdx_menu__link pdx_gameChanger--hi2">Hearts of Iron 2</a>
                                <a href="https://hoi3.paradoxwikis.com/Hearts_of_Iron_3_Wiki" class="pdx_menu__link pdx_gameChanger--hi3">Hearts of Iron 3</a>
                                <a href="https://steeldivision.paradoxwikis.com/Steel_Division_Wiki" class="pdx_menu__link pdx_gameChanger--steel">Steel Division</a>
                                <a href="https://tyranny.paradoxwikis.com/Tyranny_Wiki" class="pdx_menu__link pdx_gameChanger--tyranny">Tyranny</a>
                                <a href="https://vic1.paradoxwikis.com/Main_Page" class="pdx_menu__link pdx_gameChanger--vic1">Victoria 1</a>
                                <a href="https://vic2.paradoxwikis.com/Victoria_2_Wiki" class="pdx_menu__link pdx_gameChanger--vic2">Victoria 2</a>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="pdx_mainNavBar__opposite">
                    <div id="p-search" role="search">
						<h3>
							<label for="searchInput">Search</label>
                        </h3>
                        <i class="pdx_searchTrigger"></i>
						<form action="/index.php" id="searchform">
							<div id="simpleSearch">
								<input type="search" name="search" placeholder="Search in Wiki" title="Search CK3 Wiki [f]" accesskey="f" id="searchInput"/><input type="hidden" value="Special:Search" name="title"/><input type="submit" name="fulltext" value="Search" title="Search the pages for this text" id="mw-searchButton" class="searchButton mw-fallbackSearchButton"/><input type="submit" name="go" value="Go" title="Go to a page with this exact name if it exists" id="searchButton" class="searchButton"/>							</div>
                        </form>
                    </div>

                    <div id="p-personal" role="navigation" class="" aria-labelledby="p-personal-label">
                        <h3 id="p-personal-label">Personal tools</h3>
                        <div class="pdx_hasDropdown">
                            <a class="pdx_dropdownTrigger">Log in</a><div class="pdx_dropdown"><ul><li id="pt-anontalk"><a href="/Special:MyTalk" title="Discussion about edits from this IP address [n]" accesskey="n">Talk</a></li><li id="pt-anoncontribs"><a href="/Special:MyContributions" title="A list of edits made from this IP address [y]" accesskey="y">Contributions</a></li><li id="pt-login"><a href="/index.php?title=Special:UserLogin&amp;returnto=Commands" title="You are encouraged to log in; however, it is not mandatory [o]" accesskey="o">Log in</a></li></ul></div>
                        </div>
                    </div>
                </div>
			</div>
        </div>

		<div id="mw-page-base" class="noprint"></div>
        <div id="mw-head-base" class="noprint"></div>
        <div class="pdx_contentWrapper">
            <div id="mw-navigation">
                <h2>Navigation menu</h2>
                <div id="mw-head">
                                        					                    <div id="left-navigation">
                        					<div id="p-namespaces" role="navigation" class="vectorTabs" aria-labelledby="p-namespaces-label">
						<h3 id="p-namespaces-label">Namespaces</h3>
						<ul>
							<li id="ca-nstab-main" class="selected"><span><a href="/Commands" title="View the content page [c]" accesskey="c">Page</a></span></li><li id="ca-talk"><span><a href="/Talk:Commands" rel="discussion" title="Discussion about the content page [t]" accesskey="t">Discussion</a></span></li>						</ul>
					</div>
										<div id="p-variants" role="navigation" class="vectorMenu emptyPortlet" aria-labelledby="p-variants-label">
												<input type="checkbox" class="vectorMenuCheckbox" aria-labelledby="p-variants-label" />
						<h3 id="p-variants-label">
							<span>Variants</span>
						</h3>
						<div class="menu">
							<ul>
															</ul>
						</div>
					</div>
					                    </div>
                    <div id="right-navigation">
                        					<div id="p-views" role="navigation" class="vectorTabs" aria-labelledby="p-views-label">
						<h3 id="p-views-label">Views</h3>
						<ul>
							<li id="ca-view" class="collapsible selected"><span><a href="/Commands">Read</a></span></li><li id="ca-edit" class="collapsible"><span><a href="/index.php?title=Commands&amp;action=edit" title="Edit this page [e]" accesskey="e">Edit</a></span></li><li id="ca-history" class="collapsible"><span><a href="/index.php?title=Commands&amp;action=history" title="Past revisions of this page [h]" accesskey="h">View history</a></span></li>						</ul>
					</div>
										<div id="p-cactions" role="navigation" class="vectorMenu emptyPortlet" aria-labelledby="p-cactions-label">
						<input type="checkbox" class="vectorMenuCheckbox" aria-labelledby="p-cactions-label" />
						<h3 id="p-cactions-label"><span>More</span></h3>
						<div class="menu">
							<ul>
															</ul>
						</div>
					</div>
					                    					                    </div>
                </div>
                <div id="mw-panel">
                    <div id="p-logo" role="banner"><a class="mw-wiki-logo" href="/Crusader_Kings_III_Wiki"  title="Visit the main page"></a></div>
                    		<div class="portal" role="navigation" id="p-navigation" aria-labelledby="p-navigation-label">
			<h3 id="p-navigation-label">Navigation</h3>
			<div class="body">
								<ul>
					<li id="n-mainpage-description"><a href="/Crusader_Kings_III_Wiki" title="Visit the main page [z]" accesskey="z">Crusader Kings III Wiki</a></li><li id="n-Style-guidelines"><a href="/Crusader_Kings_III_Wiki:Style">Style guidelines</a></li><li id="n-recentchanges"><a href="/Special:RecentChanges" title="A list of recent changes in the wiki [r]" accesskey="r">Recent changes</a></li><li id="n-randompage"><a href="/Special:Random" title="Load a random page [x]" accesskey="x">Random page</a></li>				</ul>
							</div>
		</div>
			<div class="portal" role="navigation" id="p-Paradox_links" aria-labelledby="p-Paradox_links-label">
			<h3 id="p-Paradox_links-label">Paradox links</h3>
			<div class="body">
								<ul>
					<li id="n---Wikis"><a href="https://paradoxwikis.com/" rel="nofollow">- Wikis</a></li><li id="n---Forums"><a href="https://forum.paradoxplaza.com/forum/index.php?forums/crusader-kings-iii.1059/" rel="nofollow">- Forums</a></li><li id="n---Mods"><a href="https://mods.paradoxplaza.com/games/ck3?orderBy=desc&amp;sortBy=best" rel="nofollow">- Mods</a></li><li id="n---Store"><a href="https://www.paradoxplaza.com/crusader-kings-all/?utm_source=pdxwiki-owned&amp;utm_medium=social-owned&amp;utm_content=link&amp;utm_campaign=crki3_ck_20201105_past_noty" rel="nofollow">- Store</a></li>				</ul>
							</div>
		</div>
			<div class="portal" role="navigation" id="p-tb" aria-labelledby="p-tb-label">
			<h3 id="p-tb-label">Tools</h3>
			<div class="body">
								<ul>
					<li id="t-whatlinkshere"><a href="/Special:WhatLinksHere/Commands" title="A list of all wiki pages that link here [j]" accesskey="j">What links here</a></li><li id="t-recentchangeslinked"><a href="/Special:RecentChangesLinked/Commands" rel="nofollow" title="Recent changes in pages linked from this page [k]" accesskey="k">Related changes</a></li><li id="t-specialpages"><a href="/Special:SpecialPages" title="A list of all special pages [q]" accesskey="q">Special pages</a></li><li id="t-print"><a href="/index.php?title=Commands&amp;printable=yes" rel="alternate" title="Printable version of this page [p]" accesskey="p">Printable version</a></li><li id="t-permalink"><a href="/index.php?title=Commands&amp;oldid=10018" title="Permanent link to this revision of the page">Permanent link</a></li><li id="t-info"><a href="/index.php?title=Commands&amp;action=info" title="More information about this page">Page information</a></li>				</ul>
							</div>
		</div>
			<div class="portal" role="navigation" id="p-" aria-labelledby="p--label">
			<h3 id="p--label"></h3>
			<div class="body">
				<div style = "margin-left:-2em;width:160px"><a href="https://www.paradoxplaza.com/empire-of-sin/ESES01GSK0000001-MASTER.html?utm_source=pdxwiki-owned&utm_medium=social-owned&utm_content=banner&utm_campaign=emsi_emsi_20201116_ste_pre"><img src="https://central.paradoxwikis.com/images/b/b9/Ad_EoS_pre.png" style="margin-left:auto;margin-right:auto; display:block"></a></div>			</div>
		</div>
	                </div>
            </div>
            <div id="content" class="mw-body" role="main">
                <a id="top"></a>
                <div id="siteNotice" class="mw-body-content"><div id="localNotice" lang="en" dir="ltr"><div class="mw-parser-output"><h4><span class="mw-headline" id="We_are_conducting_a_survey_to_learn_how_we_can_improve_the_Paradox_Wikis_experience_for_our_users._Please_take_the_time_to_fill_the_Survey"><div class="header" style="background:#85221b; border: 2px solid #20303B; border-radius: 6px; color: white; padding: 3px;"><img alt="Event trigger.png" src="https://central.paradoxwikis.com/images/3/35/Event_trigger.png" width="24" height="24" data-file-width="18" data-file-height="18" data-url="https://central.paradoxwikis.com/images/3/35/Event_trigger.png" loading="lazy" /> <b>We are conducting a survey to learn how we can improve the Paradox Wikis experience for our users. Please take the time to fill the <a rel="nofollow" class="external text" href="https://www.surveymonkey.com/r/8DQBHCF">Survey</a></b> <img alt="Event trigger.png" src="https://central.paradoxwikis.com/images/3/35/Event_trigger.png" width="24" height="24" data-file-width="18" data-file-height="18" data-url="https://central.paradoxwikis.com/images/3/35/Event_trigger.png" loading="lazy" /></div></span></h4>
</div></div></div><div class="mw-indicators mw-body-content">
</div>
<h1 id="firstHeading" class="firstHeading" lang="en">Commands</h1>                <div id="bodyContent" class="mw-body-content">
                    <div id="siteSub" class="noprint">From CK3 Wiki</div>                    <div id="contentSub"></div>
                    <div id="jump-to-nav"></div>                    <a class="mw-jump-link" href="#mw-head">Jump to navigation</a>
                    <a class="mw-jump-link" href="#p-search">Jump to search</a>
                    <div id="mw-content-text" lang="en" dir="ltr" class="mw-content-ltr"><link rel="stylesheet" href="https://d25yha10orzq01.cloudfront.net/cookie-widget/cookie-widget.css" media="all"><script src="//d25yha10orzq01.cloudfront.net/cookie-widget/cookie-widget_new_v2.js?v=125" defer></script><div class="mw-parser-output"><div class="eu4box metadata ambox ambox-content mbox-text" style="float:right; clear:right; width:330px; font-size:80%;">
<p>Please help with verifying or updating older sections of this article.<br />At least some were last verified for <a href="/CK3_Wiki:Versioning" class="mw-redirect" title="CK3 Wiki:Versioning">version</a> 1.0.
</p>
</div>
<table class="metadata plainlinks ambox ambox-move" style="">
<tbody><tr>
<td class="mbox-image"><div style="width: 52px;">
  <img alt="Merge-arrows.gif" src="https://central.paradoxwikis.com/images/8/8b/Merge-arrows.gif" width="50" height="20" data-file-width="50" data-file-height="20" data-url="https://central.paradoxwikis.com/images/8/8b/Merge-arrows.gif" loading="lazy" /></div></td>
<td class="mbox-text" style=""> <b><a rel="nofollow" class="external text" href="https://ck3.paradoxwikis.com/index.php?title=Commands&amp;action=edit">This</a> article is a candidate to be <a href="/Template:Merge" title="Template:Merge">merged</a> with <a href="/Effects" title="Effects">Effects</a>.</b><br /> <small>Please help to improve the wiki by taking part in the <a href="/Talk:Commands" title="Talk:Commands">discussion</a> of the proposed merger.</small> </td>
</tr>
</tbody></table>
<p><b>Commands</b> or <b>effects</b> are used in <a href="/Scripting" title="Scripting">scripting</a> to alter the target that was selected with <a href="/Scopes" title="Scopes">scopes</a> and <a href="/Conditions" class="mw-redirect" title="Conditions">conditions</a>.
</p><p>They appear in:
</p>
<ul><li>command blocks (the <i>immediate</i> and <i>option</i> sections of <a href="/index.php?title=Events&amp;action=edit&amp;redlink=1" class="new" title="Events (page does not exist)">events</a>, or similar: effect, creation_effect, gain_effect, success, ...)</li>
<li><a href="/Scripted_effect" class="mw-redirect" title="Scripted effect">scripted effects</a>, which can be used to group commands into re-usable macro.</li></ul>
<p>(Scripting) commands are different from <a href="/Console_commands" title="Console commands">console commands</a>, though some console commands have a scripting equivalent.
</p><p>Available commands depend on the current <a href="/Scope" class="mw-redirect" title="Scope">scope</a> type.
</p>
<h2><span class="mw-headline" id="List_of_Commands">List of Commands</span><span class="mw-editsection"><span class="mw-editsection-bracket">[</span><a href="/index.php?title=Commands&amp;action=edit&amp;section=1" title="Edit section: List of Commands">edit</a><span class="mw-editsection-bracket">]</span></span></h2>
<table class="wikitable sortable">

<tbody><tr>
<th>Command
</th>
<th>Used in vanilla
</th>
<th>Used from scope
</th>
<th>Value type
</th>
<th>Description
</th>
<th>Example
</th>
<th>Category
</th></tr>
<tr>
<td>add_dynasty_modifier
</td>
<td>
</td>
<td>dynasty
</td>
<td>
</td>
<td>Adds a modifier to a dynasty.
</td>
<td>add_dynasty_modifier = name<br />add_dynasty_modifier = { modifier = name days/weeks/months/years = int }
</td>
<td>Modifiers
</td></tr>

<tr>
<td>add_dynasty_perk
</td>
<td>
</td>
<td>dynasty
</td>
<td>key
</td>
<td>Adds dynasty perk.
</td>
<td>add_dynasty_perk = key
</td>
<td>Lifestyles
</td></tr>

<tr>
<td>add_dynasty_prestige
</td>
<td>
</td>
<td>dynasty
</td>
<td>int
</td>
<td>Adds dynasty prestige.
</td>
<td>
</td>
<td>Dynasty
</td></tr>

<tr>
<td>add_dynasty_prestige_level
</td>
<td>
</td>
<td>dynasty
</td>
<td>
</td>
<td>Adds dynasty prestige levels.
</td>
<td>
</td>
<td>Dynasty
</td></tr>

<tr>
<td>remove_all_dynasty_modifier_instances
</td>
<td>
</td>
<td>dynasty
</td>
<td>modifier
</td>
<td>Remove all instances of a modifier from a dynasty.
</td>
<td>remove_all_dynasty_modifier_instances = name
</td>
<td>Modifiers
</td></tr>

<tr>
<td>remove_dynasty_modifier
</td>
<td>
</td>
<td>dynasty
</td>
<td>modifier
</td>
<td>Remove a modifier from a dynasty.
</td>
<td>remove_dynasty_modifier = name
</td>
<td>Modifiers
</td></tr>

<tr>
<td>add_house_modifier
</td>
<td>
</td>
<td>dynasty/house
</td>
<td>modifier
</td>
<td>Add a modifier to a house.
</td>
<td>add_house_modifier = name
</td>
<td>Modifiers
</td></tr>

<tr>
<td>remove_all_house_modifier_instances
</td>
<td>
</td>
<td>dynasty/house
</td>
<td>modifier
</td>
<td>Remove all instances of a modifier from a house.
</td>
<td>remove_all_house_modifier_instances = name
</td>
<td>Modifiers
</td></tr>

<tr>
<td>remove_house_modifier
</td>
<td>
</td>
<td>dynasty/house
</td>
<td>modifier
</td>
<td>Remove a modifier from a house.
</td>
<td>remove_house_modifier = name
</td>
<td>Modifiers
</td></tr>

<tr>
<td>add_scheme_modifier
</td>
<td>
</td>
<td>scheme
</td>
<td>modifier for "type" and int for "days"
</td>
<td>Adds the specified scheme modifier.<br />
</td>
<td>add_scheme_modifier = { type = X days = Y }<br />(Days are optional, the modifier will expire in Y days if specified)
</td>
<td>Modifiers
</td></tr>

<tr>
<td>add_scheme_progress
</td>
<td>
</td>
<td>scheme
</td>
<td>int
</td>
<td>Add progress to the scope scheme. (Progress is in 0.0 - 100.0 range)
</td>
<td>add_scheme_progress = X
</td>
<td>Schemes
</td></tr>

<tr>
<td>end_scheme
</td>
<td>
</td>
<td>scheme
</td>
<td>bool
</td>
<td>Ends a specific scheme and removes it without any other effect.
</td>
<td>end_scheme = yes
</td>
<td>Schemes
</td></tr>

<tr>
<td>expose_scheme
</td>
<td>
</td>
<td>scheme
</td>
<td>
</td>
<td>Exposes the scheme to the defender
</td>
<td>
</td>
<td>Schemes
</td></tr>

<tr>
<td>expose_scheme_agent
</td>
<td>
</td>
<td>scheme
</td>
<td>character
</td>
<td>Exposes the target character as an agent of the current scheme.
</td>
<td>
</td>
<td>Schemes
</td></tr>

<tr>
<td>remove_scheme_modifier
</td>
<td>
</td>
<td>scheme
</td>
<td>modifier
</td>
<td>Removes the specified scheme modifier.
</td>
<td>
</td>
<td>Modifiers
</td></tr>

<tr>
<td>scheme_freeze_days
</td>
<td>
</td>
<td>scheme
</td>
<td>int
</td>
<td>freezes the scheme for X days (0 unfreezes the scheme)
</td>
<td>scheme_freeze_days = X
</td>
<td>Schemes
</td></tr>

<tr>
<td>add_county_modifier
</td>
<td>
</td>
<td>landed title
</td>
<td>modifier/int
</td>
<td>Add a modifier to a county.
</td>
<td>add_county_modifier = name<br />add_county_modifier = { modifier = name days/weeks/months/years = int }
</td>
<td>Modifiers
</td></tr>

<tr>
<td>change_county_control
</td>
<td>
</td>
<td>landed title
</td>
<td>int
</td>
<td>Changes the county control of a title. If the title has higher tier than county, the effect will propagate down to all counties below it.
</td>
<td>
</td>
<td>Control
</td></tr>

<tr>
<td>change_de_jure_drift_progress
</td>
<td>
</td>
<td>landed title
</td>
<td>title/int
</td>
<td>Change the progress of de jure drift of a title.
</td>
<td>&lt;drifting_title&gt; = { change_de_jure_drift_progress = { target = &lt;drift_target_title&gt;  values = &lt;progress_change_value&gt; } }
</td>
<td>Title
</td></tr>

<tr>
<td>change_development_level
</td>
<td>
</td>
<td>landed title
</td>
<td>int
</td>
<td>Changes the development level of a title. If the title has higher tier than county, the effect will propagate down to all counties below it.
</td>
<td>
</td>
<td>Title
</td></tr>

<tr>
<td>change_development_progress
</td>
<td>
</td>
<td>landed title
</td>
<td>int
</td>
<td>Changes the development progress of a title. If the title has higher tier than county, the effect will propagate down to all counties below it.
</td>
<td>
</td>
<td>Development
</td></tr>

<tr>
<td>change_development_progress_with_overflow
</td>
<td>
</td>
<td>landed title
</td>
<td>int
</td>
<td>Changes the development progress of a title. If the title has higher tier than county, the effect will propagate down to all counties below it. Will overflow, so adding +100 to a county with 50 progress left will increase the level by 1 and result in 50 progress towards the next level.
</td>
<td>
</td>
<td>Development
</td></tr>

<tr>
<td>clear_title_laws
</td>
<td>
</td>
<td>landed title
</td>
<td>bool
</td>
<td>Remove all title laws from the scoped title. DOES NOT apply law removal costs and effects.
</td>
<td>clear_title_laws = yes
</td>
<td>Laws
</td></tr>

<tr>
<td>clear_title_laws_effects
</td>
<td>
</td>
<td>landed title
</td>
<td>bool
</td>
<td>Remove all title laws from the scoped title. DOES apply law removal costs and effects.
</td>
<td>clear_title_laws_effects = yes
</td>
<td>Laws
</td></tr>

<tr>
<td>copy_title_history
</td>
<td>
</td>
<td>landed title
</td>
<td>title
</td>
<td>Copy title history from another title.
</td>
<td>copy_title_history = source_title
</td>
<td>Titles
</td></tr>

<tr>
<td>remove_all_county_modifier_instances
</td>
<td>
</td>
<td>landed title
</td>
<td>modifier
</td>
<td>Remove all instances of a modifier from a county.
</td>
<td>remove_all_county_modifier_instances = name
</td>
<td>Modifiers
</td></tr>

<tr>
<td>remove_county_modifier
</td>
<td>
</td>
<td>landed title
</td>
<td>modifier
</td>
<td>Remove a modifier from a county.
</td>
<td>remove_county_modifier = name
</td>
<td>Modifiers
</td></tr>

<tr>
<td>reset_title_name
</td>
<td>
</td>
<td>landed title
</td>
<td>bool
</td>
<td>Sets the name and adjective of the scoped title back to being based on its key. Won't cause the prefix to change.
</td>
<td>reset_title_name = yes
</td>
<td>Title
</td></tr>

<tr>
<td>reset_title_prefix
</td>
<td>
</td>
<td>landed title
</td>
<td>bool
</td>
<td>Sets the prefix of the scoped title back to being based on its key. Won't cause its adjective or name to change.
</td>
<td>reset_title_prefix = yes
</td>
<td>Title
</td></tr>

<tr>
<td>revoke_lease
</td>
<td>
</td>
<td>landed title
</td>
<td>bool
</td>
<td>Revoke the lease of the scoped title.
</td>
<td>revoke_lease = yes
</td>
<td>Title
</td></tr>

<tr>
<td>set_always_follows_primary_heir
</td>
<td>
</td>
<td>landed title
</td>
<td>bool
</td>
<td>Sets if the title should always go to the primary heir in partition succession.
</td>
<td>set_always_follows_primary_heir = yes
</td>
<td>Title
</td></tr>

<tr>
<td>set_capital_county
</td>
<td>
</td>
<td>landed title
</td>
<td>title
</td>
<td>Sets the capital county of the title to the target county.
</td>
<td>set_capital_county = &lt;some county title&gt;
</td>
<td>Title
</td></tr>

<tr>
<td>set_color_from_title
</td>
<td>
</td>
<td>landed title
</td>
<td>title
</td>
<td>Sets the color of the title to the same as the target title (shifted very slightly to not be identical).
</td>
<td>set_color_from_title = &lt;some title&gt;
</td>
<td>Title
</td></tr>

<tr>
<td>set_county_culture
</td>
<td>
</td>
<td>landed title
</td>
<td>culture/title
</td>
<td>Sets the culture of a county.
</td>
<td>set_county_culture = english/root.character_culture
</td>
<td>Title
</td></tr>

<tr>
<td>set_county_faith
</td>
<td>
</td>
<td>landed title
</td>
<td>faith
</td>
<td>Changes what faith a county has.
</td>
<td>
</td>
<td>Title
</td></tr>

<tr>
<td>set_de_jure_liege_title
</td>
<td>
</td>
<td>landed title
</td>
<td>title
</td>
<td>Set a new DeJure liege title.
</td>
<td>set_de_jure_liege_title = new_de_jure_liege
</td>
<td>Title
</td></tr>

<tr>
<td>set_definitive_form
</td>
<td>
</td>
<td>landed title
</td>
<td>bool
</td>
<td>Sets if the title should use a definitive form name (no 'Kingdom of').
</td>
<td>set_definitive_form = yes
</td>
<td>Title
</td></tr>

<tr>
<td>set_delete_on_destroy
</td>
<td>
</td>
<td>landed title
</td>
<td>bool
</td>
<td>Sets if the title should be deleted from the gamestate completely when it is destroyed.
</td>
<td>set_delete_on_destroy = yes
</td>
<td>Title
</td></tr>

<tr>
<td>set_destroy_if_invalid_heir
</td>
<td>
</td>
<td>landed title
</td>
<td>bool
</td>
<td>Sets if the title should be destroyed on succession if there's no heir matching its restrictions.
</td>
<td>set_destroy_if_invalid_heir = yes
</td>
<td>Title
</td></tr>

<tr>
<td>set_destroy_on_succession
</td>
<td>
</td>
<td>landed title
</td>
<td>bool
</td>
<td>Sets if the title should be destroyed on succession.
</td>
<td>set_destroy_on_succession = yes
</td>
<td>Title
</td></tr>

<tr>
<td>set_landless_title
</td>
<td>
</td>
<td>landed title
</td>
<td>bool
</td>
<td>Sets if the title is landless (can be held by rulers with no land)
</td>
<td>set_landless_title = yes
</td>
<td>Title
</td></tr>

<tr>
<td>set_no_automatic_claims
</td>
<td>
</td>
<td>landed title
</td>
<td>bool
</td>
<td>Sets if the title should disallow automatic claims (meaning claims will only be added by script, and by pressed claims being inherited).
</td>
<td>set_no_automatic_claims = yes
</td>
<td>Title
</td></tr>

<tr>
<td>set_title_name
</td>
<td>
</td>
<td>landed title
</td>
<td>key
</td>
<td>sets the name (localization key) of the scoped title. The adjective will be constructed by adding '_adj' to the localisation key. Won't cause the prefix to change.
</td>
<td>set_title_name = TEST_NAME_PLEASE_IGNORE
</td>
<td>Title
</td></tr>

<tr>
<td>set_title_prefix
</td>
<td>
</td>
<td>landed title
</td>
<td>key
</td>
<td>sets the prefix of the scoped title. Won't cause its name or adjective to change.
</td>
<td>set_title_prefix = PREFIX_THE
</td>
<td>Title
</td></tr>

<tr>
<td>title_create_faction
</td>
<td>
</td>
<td>landed title
</td>
<td>faction<br />character/title
</td>
<td>The scoped landed title creates a faction of the specified type against the specified target.
</td>
<td>title_create_faction = { type = X target = Y }
</td>
<td>Factions
</td></tr>

<tr>
<td>title_join_faction
</td>
<td>
</td>
<td>landed title
</td>
<td>faction
</td>
<td>The landed title in the scope joins the assigned faction.
</td>
<td>
</td>
<td>Factions
</td></tr>

<tr>
<td>title_leave_faction
</td>
<td>
</td>
<td>landed title
</td>
<td>faction
</td>
<td>The title in the scope leaves the assigned faction
</td>
<td>
</td>
<td>Factions
</td></tr>

<tr>
<td>end_story
</td>
<td>
</td>
<td>story cycle
</td>
<td>
</td>
<td>Ends a story and executes it's on_end effect, the story can no longer be accessed after this.
</td>
<td>
</td>
<td>Stories
</td></tr>

<tr>
<td>make_story_owner
</td>
<td>
</td>
<td>story cycle
</td>
<td>character
</td>
<td>Makes the character the new owner of the story.
</td>
<td>make_story_owner = character_target
</td>
<td>Stories
</td></tr>

<tr>
<td>add_innovation
</td>
<td>
</td>
<td>culture
</td>
<td>innovation
</td>
<td>Add innovation to a culture.
</td>
<td>
</td>
<td>Innovations
</td></tr>

<tr>
<td>add_random_innovation
</td>
<td>
</td>
<td>culture
</td>
<td>innovation/bool
</td>
<td>Add random available innovation
</td>
<td>&lt;culture&gt; = { add_random_innovation = culture_group_military/culture_group_civic/culture_group_regional/yes }
</td>
<td>Innovations
</td></tr>

<tr>
<td>get_all_innovations_from
</td>
<td>
</td>
<td>culture
</td>
<td>culture
</td>
<td>Discover all innovations from the target culture.
</td>
<td>get_all_innovations_from = &lt;culture&gt;
</td>
<td>Innovations
</td></tr>

<tr>
<td>get_random_innovation_from
</td>
<td>
</td>
<td>culture
</td>
<td>
</td>
<td>Get random available innovation from another culture.
</td>
<td>
</td>
<td>Innovations
</td></tr>

<tr>
<td>add_character_flag
</td>
<td>
</td>
<td>character
</td>
<td>flag
</td>
<td>Adds a character flag.
</td>
<td>add_character_flag = X<br />add_character_flag = { flag = X days/weeks/years = Y } X is the name of the flag and Y is a value or value interval "{ min max }".
</td>
<td>Flags
</td></tr>

<tr>
<td>add_character_modifier
</td>
<td>
</td>
<td>character
</td>
<td>modifier/int
</td>
<td>Add a modifier to a character.
</td>
<td>add_character_modifier = name<br />add_character_modifier = { modifier = name days/weeks/months/years = int }
</td>
<td>Modifiers
</td></tr>

<tr>
<td>add_courtier
</td>
<td>
</td>
<td>character
</td>
<td>character
</td>
<td>Add the target character to the scope character's court.(It doesn't work)
</td>
<td>
</td>
<td>Characters
</td></tr>

<tr>
<td>add_diplomacy_lifestyle_perk_points
</td>
<td>
</td>
<td>character
</td>
<td>int
</td>
<td>Adds lifestyle per points to the given character.
</td>
<td>
</td>
<td>Lifestyles
</td></tr>

<tr>
<td>add_diplomacy_lifestyle_xp
</td>
<td>
</td>
<td>character
</td>
<td>int
</td>
<td>Adds lifestyle XP to the given character.
</td>
<td>
</td>
<td>Lifestyles
</td></tr>

<tr>
<td>add_dread
</td>
<td>
</td>
<td>character
</td>
<td>int
</td>
<td>Adds (or removes) dread to a character.
</td>
<td>
</td>
<td>Characters
</td></tr>

<tr>
<td>add_gold
</td>
<td>
</td>
<td>character
</td>
<td>
</td>
<td>Adds gold to a character.
</td>
<td>
</td>
<td>Characters
</td></tr>

<tr>
<td>add_hook
</td>
<td>
</td>
<td>character
</td>
<td>hook/character/secret/int
</td>
<td>Adds a hook on a character. Does send a toast to the player if it's involved.
</td>
<td>add_hook = { type = X, target = Y, secret = Z, days/months/years = W  }<br />days/months/years optional (taken from hook type otherwise) and can be a value or an interval, secret required for hook types that require it.
</td>
<td>Hooks and Secrets
</td></tr>

<tr>
<td>add_hook_no_toast
</td>
<td>
</td>
<td>character
</td>
<td>hook/character/secret/int
</td>
<td>Adds a hook on a character. Does NOT send a toast to the player.
</td>
<td>add_hook = { type = X, target = Y, secret = Z, days/months/years = W  }<br />days/months/years optional (taken from hook type otherwise) and can be a value or an interval, secret required for hook types that require it.
</td>
<td>Hooks and Secrets
</td></tr>

<tr>
<td>add_intrigue_lifestyle_perk_points
</td>
<td>
</td>
<td>character
</td>
<td>int
</td>
<td>Adds lifestyle per points to the given character.
</td>
<td>
</td>
<td>Lifestyles
</td></tr>

<tr>
<td>add_intrigue_lifestyle_xp
</td>
<td>
</td>
<td>character
</td>
<td>int
</td>
<td>Adds lifestyle XP to the given character.
</td>
<td>
</td>
<td>Lifestyles
</td></tr>

<tr>
<td>add_joined_faction_discontent
</td>
<td>
</td>
<td>character
</td>
<td>int
</td>
<td>Adds (or subtracts) discontent to the factions the scope character is in.
</td>
<td>add_joined_faction_discontent = X
</td>
<td>Factions
</td></tr>

<tr>
<td>add_knows_of_killer
</td>
<td>
</td>
<td>character
</td>
<td>character
</td>
<td>Adds the right hand side character as knowing of the killer of the scoped object.
</td>
<td>dead_person = { add_knows_of_killer = root }
</td>
<td>Characters
</td></tr>

<tr>
<td>add_learning_lifestyle_perk_points
</td>
<td>
</td>
<td>character
</td>
<td>int
</td>
<td>Adds lifestyle per points to the given character.
</td>
<td>
</td>
<td>Lifestyles
</td></tr>

<tr>
<td>add_learning_lifestyle_xp
</td>
<td>
</td>
<td>character
</td>
<td>int
</td>
<td>Adds lifestyle XP to the given character
</td>
<td>
</td>
<td>Lifestyles
</td></tr>

<tr>
<td>add_martial_lifestyle_perk_points
</td>
<td>
</td>
<td>character
</td>
<td>int
</td>
<td>Adds lifestyle per points to the given character.
</td>
<td>
</td>
<td>Lifestyles
</td></tr>

<tr>
<td>add_martial_lifestyle_xp
</td>
<td>
</td>
<td>character
</td>
<td>int
</td>
<td>Adds lifestyle XP to the given character.
</td>
<td>
</td>
<td>Lifestyles
</td></tr>

<tr>
<td>add_opinion
</td>
<td>
</td>
<td>character
</td>
<td>modifier/int/character
</td>
<td>Adds a temporary opinion modifier.
</td>
<td>add_opinion = { modifier = X days/months/years = Y target = Z }
</td>
<td>Characters
</td></tr>

<tr>
<td>add_perk
</td>
<td>
</td>
<td>
</td>
<td>character
</td>
<td>Adds the perk for this character
</td>
<td>
</td>
<td>Lifestyles
</td></tr>

<tr>
<td>add_piety
</td>
<td>
</td>
<td>character
</td>
<td>
</td>
<td>Gives (or takes) piety to a character.
</td>
<td>
</td>
<td>Characters
</td></tr>

<tr>
<td>add_piety_experience
</td>
<td>
</td>
<td>character
</td>
<td>
</td>
<td>Gives (or takes) piety experience to a character.
</td>
<td>
</td>
<td>Characters
</td></tr>

<tr>
<td>add_piety_level
</td>
<td>
</td>
<td>character
</td>
<td>
</td>
<td>Increases (or decreases) the piety level of a character.
</td>
<td>
</td>
<td>Characters
</td></tr>

<tr>
<td>add_pressed_claim
</td>
<td>
</td>
<td>character
</td>
<td>landed title
</td>
<td>Gives a pressed claim to a character.
</td>
<td>
</td>
<td>Title
</td></tr>

<tr>
<td>add_prestige
</td>
<td>
</td>
<td>character
</td>
<td>
</td>
<td>Gives (or takes) prestige to a character.
</td>
<td>
</td>
<td>Characters
</td></tr>

<tr>
<td>add_prestige_experience
</td>
<td>
</td>
<td>character
</td>
<td>
</td>
<td>Gives (or takes) prestige experience to a character.
</td>
<td>
</td>
<td>Characters
</td></tr>

<tr>
<td>add_prestige_level
</td>
<td>
</td>
<td>character
</td>
<td>
</td>
<td>Increases (or decreases) the prestige level of a character.
</td>
<td>
</td>
<td>Characters
</td></tr>

<tr>
<td>add_realm_law
</td>
<td>
</td>
<td>character
</td>
<td>
</td>
<td>Adds the given law to the scoped character.
</td>
<td>
</td>
<td>Laws
</td></tr>

<tr>
<td>add_realm_law_skip_effects
</td>
<td>
</td>
<td>character
</td>
<td>
</td>
<td>Adds the given law to the scoped character. Skips the cost and the pass effect, and the revoke effects of the current law.
</td>
<td>
</td>
<td>Laws
</td></tr>

<tr>
<td>add_relation_flag
</td>
<td>
</td>
<td>character
</td>
<td>
</td>
<td>Adds a flag to an existing relation.
</td>
<td>add_relation_flag = { relation = scripted_relation flag = flag_name (declared in the relation's script) target = other_character }
</td>
<td>Flags
</td></tr>

<tr>
<td>add_scheme_cooldown
</td>
<td>
</td>
<td>character
</td>
<td>character/scheme/int
</td>
<td>Sets a scheme cooldown for the scoped character.
</td>
<td>&lt;scoped_character&gt; = { target=target_character type=scheme_type days/weeks/months/years = duration }
</td>
<td>Hooks and Schemes
</td></tr>

<tr>
<td>add_secret
</td>
<td>
</td>
<td>character
</td>
<td>secret/character
</td>
<td>Adds a secret.<br />Note that if you create a Secret in the immediate effect, the tooltips for other effects run in that Secret's scope (such as reveal_to) are likely to be displayed incorrectly, or not to be displayed at all. This is due to the game generating the tooltip before it actually has a Secret that exists to work off of. Test rigorously and use custom tooltips if necessary. Creating a Secret in the immediate and then running effects on it in an event option should produce perfectly normal tooltips.
</td>
<td>add_secret = { type = X target = Y }
</td>
<td>Hooks and Secrets
</td></tr>

<tr>
<td>add_stewardship_lifestyle_perk_points
</td>
<td>
</td>
<td>character
</td>
<td>int
</td>
<td>Adds lifestyle per points to the given character.
</td>
<td>
</td>
<td>Lifestyles
</td></tr>

<tr>
<td>add_stewardship_lifestyle_xp
</td>
<td>
</td>
<td>character
</td>
<td>int
</td>
<td>Adds lifestyle XP to the given character.
</td>
<td>
</td>
<td>Lifestyles
</td></tr>

<tr>
<td>add_stress
</td>
<td>
</td>
<td>character
</td>
<td>int
</td>
<td>Increases (or decreases) stress of a character.
</td>
<td>
</td>
<td>Characters
</td></tr>

<tr>
<td>add_targeting_factions_discontent
</td>
<td>
</td>
<td>character
</td>
<td>int
</td>
<td>Adds (or subtracts) discontent to all the factions that are targeting the scope character.
</td>
<td>add_targeting_factions_discontent = X
</td>
<td>Factions
</td></tr>

<tr>
<td>add_to_scheme
</td>
<td>
</td>
<td>character
</td>
<td>cheme
</td>
<td>Adds a character as an agent to the scheme.
</td>
<td>
</td>
<td>Hooks and Schemes
</td></tr>

<tr>
<td>add_trait
</td>
<td>
</td>
<td>character
</td>
<td>
</td>
<td>Adds a trait to a character (the trait will not be added and no tooltip will be shown if the character isn't eligible for the trait, i.e. when already having the trait, having an opposing trait, not fulfilling the trait's is_potential trigger or being outside of the trait's range).
</td>
<td>
</td>
<td>Characters
</td></tr>

<tr>
<td>add_trait_force_tooltip
</td>
<td>
</td>
<td>character
</td>
<td>
</td>
<td>Adds a trait to a character (if the add_trait effect would not add the trait - i.e. when already having the trait, having an opposing trait, not fulfilling the trait's is_potential trigger or being outside of the trait's range - a tooltip will be shown but the trait will not be added).
</td>
<td>
</td>
<td>Characters
</td></tr>

<tr>
<td>add_truce_both_ways
</td>
<td>
</td>
<td>character
</td>
<td>character/string/bool/war result
</td>
<td>Sets the both-way truce against the specified character.<br />'character' specifies the target character<br />'override' says whether it should replace the previous truce even if shorter<br />'years / months / days' sets the duration of the truce<br />'result' specifies the result from the scope character's point of view ('white_peace' by default)<br />'casus_belli' sets the casus belli scope that caused the truce, mutually exclusive with 'name'<br />'name' sets a custom description. Dynamic description with the current scope<br />'war' sets the war that caused the truce, mutually exclusive with 'casus_belli'
</td>
<td>add_truce_both_ways = { character = X years/months/days = Y override = yes/no result = victory/defeat/white_peace casus_belli/war = Z }
</td>
<td>Characters
</td></tr>

<tr>
<td>add_truce_one_way
</td>
<td>
</td>
<td>character
</td>
<td>character/string/bool/war result
</td>
<td>Sets the truce against the specified character.<br />'character' specifies the target character<br />'override' says whether it should replace the previous truce even if shorter<br />'years / months / days' sets the duration of the truce<br />'result' specifies the result from the scope character's point of view ('white_peace' by default)<br />'casus_belli' sets the casus belli scope that caused the truce, mutually exclusive with 'name'<br />'name' sets a custom description. Dynamic description with the current scope<br />'war' sets the war that caused the truce, mutually exclusive with 'casus_belli'
</td>
<td>add_truce_one_way = { character = X years/months/days = Y override = yes/no result = victory/defeat/white_peace casus_belli/war = Z }
</td>
<td>Characters
</td></tr>

<tr>
<td>add_tyranny
</td>
<td>
</td>
<td>character
</td>
<td>int
</td>
<td>Adds (or removes) tyranny to (or from) a character.
</td>
<td>
</td>
<td>Characters
</td></tr>

<tr>
<td>add_unpressed_claim
</td>
<td>
</td>
<td>character
</td>
<td>landed title
</td>
<td>Gives an unpressed claim to a character.
</td>
<td>
</td>
<td>Titles
</td></tr>

<tr>
<td>add_visiting_courtier
</td>
<td>
</td>
<td>character
</td>
<td>character
</td>
<td>Add the target character as the scope character's guest.(It doesn't work)
</td>
<td>
</td>
<td>Characters
</td></tr>

<tr>
<td>allow_alliance
</td>
<td>
</td>
<td>character
</td>
<td>character
</td>
<td>Allows (previously broken) alliance with the target character.
</td>
<td>
</td>
<td>Characters
</td></tr>

<tr>
<td>allow_in_scheme
</td>
<td>
</td>
<td>
</td>
<td>character
</td>
<td>Allow the character to join the scheme as an agent.
</td>
<td>
</td>
<td>Hooks and Schemes
</td></tr>

<tr>
<td>apply_ai_vassal_obligation_liege_most_desired
</td>
<td>
</td>
<td>character
</td>
<td>
</td>
<td>Apply the new level for the most desired AI obligation level the liege in the contract wants
</td>
<td>
</td>
<td>Laws
</td></tr>

<tr>
<td>apply_ai_vassal_obligation_vassal_most_desired
</td>
<td>
</td>
<td>character
</td>
<td>
</td>
<td>Apply the new level for the most desired AI obligation level the vassal in the contract wants.
</td>
<td>
</td>
<td>Laws
</td></tr>

<tr>
<td>assign_council_task
</td>
<td>
</td>
<td>character
</td>
<td>
</td>
<td>Assigns the target character to the council task.
</td>
<td>assign_council_task = { council_task = council_task_scope target = character_taking_the_position fire_on_actions = yes/no }
</td>
<td>Jobs
</td></tr>

<tr>
<td>assign_councillor_type
</td>
<td>
</td>
<td>character
</td>
<td>
</td>
<td>Assigns the target character to the first available council position of the type available.
</td>
<td>assign_councillor_type = { type = council_position_type_key target = character_taking_the_position fire_on_actions = yes/no }
</td>
<td>Jobs
</td></tr>

<tr>
<td>banish
</td>
<td>
</td>
<td>character
</td>
<td>
</td>
<td>The character gets banished.
</td>
<td>
</td>
<td>Characters
</td></tr>

<tr>
<td>becomes_independent
</td>
<td>
</td>
<td>character
</td>
<td>
</td>
<td>Becomes and independent ruler.
</td>
<td>becomes_independent = { change = 'previously created title_and_vassal_change' }
</td>
<td>Vassalage
</td></tr>

<tr>
<td>break_alliance
</td>
<td>
</td>
<td>character
</td>
<td>character
</td>
<td>Breaks the alliance with the target character.
</td>
<td>
</td>
<td>Relations
</td></tr>

<tr>
<td>cancel_truce_both_ways
</td>
<td>
</td>
<td>character
</td>
<td>character
</td>
<td>Ends the truce against the specified character, and theirs against the scoped character.
</td>
<td>cancel_truce_both_ways = scope:character
</td>
<td>Relations
</td></tr>

<tr>
<td>cancel_truce_one_way
</td>
<td>
</td>
<td>character
</td>
<td>character
</td>
<td>Ends the truce against the specified character.
</td>
<td>cancel_truce_one_way = scope:character
</td>
<td>Relations
</td></tr>

<tr>
<td>change_current_weight
</td>
<td>
</td>
<td>character
</td>
<td>int
</td>
<td>Change the current weight of the scoped character
</td>
<td>change_current_weight = 20
</td>
<td>Characters
</td></tr>

<tr>
<td>change_first_name
</td>
<td>
</td>
<td>character
</td>
<td>key/character
</td>
<td>Change the first name of a character.
</td>
<td>change_first_name = &lt;localization_key&gt;<br />change_first_name = scope:name/var:name<br />change_first_name = { template_character = scope:character }
</td>
<td>Characters
</td></tr>

<tr>
<td>change_government
</td>
<td>
</td>
<td>character
</td>
<td>key
</td>
<td>Changes the government of a character.
</td>
<td>
</td>
<td>Characters
</td></tr>

<tr>
<td>change_liege
</td>
<td>
</td>
<td>character
</td>
<td>
</td>
<td>Adds a liege change.
</td>
<td>change_liege = { liege = 'Character that should become the new liege' change = 'previously created title_and_vassal_change'}
</td>
<td>Vassalage
</td></tr>

<tr>
<td>change_prison_type
</td>
<td>
</td>
<td>character
</td>
<td>key
</td>
<td>Changes the charater's prison type. Scoped character is the prisoner. Accepts any static modifier (see also improson effect).
</td>
<td>change_prison_type = house_arrest
</td>
<td>Characters
</td></tr>

<tr>
<td>change_target_weight
</td>
<td>
</td>
<td>character
</td>
<td>int
</td>
<td>Change the target weight of the scoped character.
</td>
<td>change_target_weight = 20
</td>
<td>Characters
</td></tr>

<tr>
<td>clear_forced_vote
</td>
<td>
</td>
<td>character
</td>
<td>bool
</td>
<td>clear_forced_vote = yes
</td>
<td>
</td>
<td>Characters
</td></tr>

<tr>
<td>consume_banish_reasons
</td>
<td>
</td>
<td>character
</td>
<td>character
</td>
<td>'Consume' all banish reasons that the scoped character has on the target character. Until they get a new reason, they cannot banish the target again.
</td>
<td>
</td>
<td>Characters
</td></tr>

<tr>
<td>consume_divorce_reasons
</td>
<td>
</td>
<td>character
</td>
<td>character
</td>
<td>'Consume' all divorce reason that the scoped character has on the target character. Until they get a new reason, they cannot divorce the target again.
</td>
<td>
</td>
<td>Characters
</td></tr>

<tr>
<td>consume_execute_reasons
</td>
<td>
</td>
<td>character
</td>
<td>character
</td>
<td>'Consume' all execute reasons that the scoped character has on the target character. Until they get a new reason, they cannot execute the target again.
</td>
<td>
</td>
<td>Characters
</td></tr>

<tr>
<td>consume_imprisonment_reasons
</td>
<td>
</td>
<td>character
</td>
<td>character
</td>
<td>'Consume' all imprisonment reasons that the scoped character has on the target character. Until they get a new reason, they cannot imprison the target again.
</td>
<td>
</td>
<td>Characters
</td></tr>

<tr>
<td>consume_revoke_title_reason
</td>
<td>
</td>
<td>character
</td>
<td>character
</td>
<td>'Consume' 1 revoke title reason that the scoped character has on the target character.
</td>
<td>
</td>
<td>Characters
</td></tr>

<tr>
<td>copy_inheritable_appearance_from
</td>
<td>
</td>
<td>character
</td>
<td>character
</td>
<td>Copies the inheritable appearance attributes (inheritable genes in the character's DNA string) from the target character to the scoped character.
</td>
<td>
</td>
<td>Titles
</td></tr>

<tr>
<td>create_alliance
</td>
<td>
</td>
<td>character
</td>
<td>character
</td>
<td>Create an alliance between the scoped character and the target. The allied through characters determine who gets checked against for if the alliance should persist or not.
</td>
<td>create_alliance = scope<br />create_alliance = { target = scope allied_through_owner = scope allied_through_target = scope }
</td>
<td>Relations
</td></tr>

<tr>
<td>create_cadet_branch
</td>
<td>
</td>
<td>character
</td>
<td>bool
</td>
<td>The scope character creates a cadet branch of the house he is in.
</td>
<td>
</td>
<td>Characters
</td></tr>

<tr>
<td>create_faction
</td>
<td>
</td>
<td>key/character
</td>
<td>
</td>
<td>The scoped character creates a faction of the specified type against the specified target.
</td>
<td>create_faction = { type = X target = Y }
</td>
<td>Factions
</td></tr>

<tr>
<td>create_story
</td>
<td>
</td>
<td>character
</td>
<td>key/character
</td>
<td>Creates and initializes a story cycle with the current character as owner.
</td>
<td>create_story = story_type<br />create_story = { type = story_type save_scope_as/save_temporary_scope_as = scope_name # optional way to get a reference to the new story }
</td>
<td>Stories
</td></tr>

<tr>
<td>death
</td>
<td>
</td>
<td>character
</td>
<td>character/key
</td>
<td>Kills a character. Where X is a character and Y is one of the death reason keys. Or death = natural which will pick a natural death reason to kill the character from.
</td>
<td>death = { killer = X death_reason = Y }
</td>
<td>Characters
</td></tr>

<tr>
<td>depose
</td>
<td>
</td>
<td>character
</td>
<td>bool
</td>
<td>The character gets deposed.
</td>
<td>
</td>
<td>Vassalage
</td></tr>

<tr>
<td>destroy_title
</td>
<td>
</td>
<td>character
</td>
<td>title
</td>
<td>Destroys a title.
</td>
<td>
</td>
<td>Titles
</td></tr>

<tr>
<td>end_pregnancy
</td>
<td>
</td>
<td>character
</td>
<td>
</td>
<td>End a pregnancy
</td>
<td>
</td>
<td>Characters
</td></tr>

<tr>
<td>execute_decision
</td>
<td>
</td>
<td>character
</td>
<td>
</td>
<td>Execute the specified decision for the scoped character
</td>
<td>
</td>
<td>Characters
</td></tr>

<tr>
<td>finish_council_task
</td>
<td>
</td>
<td>character
</td>
<td>
</td>
<td>The councillor finish the current assigned task successfully.
</td>
<td>
</td>
<td>Jobs
</td></tr>

<tr>
<td>fire_councillor
</td>
<td>
</td>
<td>character
</td>
<td>character
</td>
<td>The scope character fires the target character form teh council.
</td>
<td>
</td>
<td>Jobs
</td></tr>

<tr>
<td>forbid_from_scheme
</td>
<td>
</td>
<td>character
</td>
<td>
</td>
<td>Forbid the scope character from joining the target scheme as an agent (and kick the character out if already in the scheme)
</td>
<td>
</td>
<td>Hooks and Schemes
</td></tr>

<tr>
<td>force_add_to_scheme
</td>
<td>
</td>
<td>character
</td>
<td>key/int
</td>
<td>Adds a character as an agent to the scheme and forces them to stay.
</td>
<td>force_add_to_scheme = { scheme = target_Scheme days/months/years = duration }
</td>
<td>Hooks and Schemes
</td></tr>

<tr>
<td>force_vote_as
</td>
<td>
</td>
<td>character
</td>
<td>
</td>
<td>Forces the character to vote the same as the target.
</td>
<td>force_vote_as = { target = someone days/months/years = x }
</td>
<td>Characters
</td></tr>

<tr>
<td>get_title
</td>
<td>
</td>
<td>character
</td>
<td>title
</td>
<td>Gives a title to a character.
</td>
<td>
</td>
<td>Titles
</td></tr>

<tr>
<td>give_nickname
</td>
<td>
</td>
<td>character
</td>
<td>key
</td>
<td>Give a nickname to this character.
</td>
<td>
</td>
<td>Characters
</td></tr>

<tr>
<td>join_faction
</td>
<td>
</td>
<td>character
</td>
<td>
</td>
<td>The character in the scope joins the assigned faction.
</td>
<td>
</td>
<td>Factions
</td></tr>

<tr>
<td>join_faction_forced
</td>
<td>
</td>
<td>character
</td>
<td>key/character/int
</td>
<td>The character in the scope is forced to join a faction by a character for a defined time.
</td>
<td>join_faction_forced = { faction = X forced_by = Y days/months/years = duration }
</td>
<td>Factions
</td></tr>

<tr>
<td>join_faction_skip_check
</td>
<td>
</td>
<td>character
</td>
<td>
</td>
<td>The character in the scope joins the assigned faction skiping the can_character_join trigger.
</td>
<td>
</td>
<td>Factions
</td></tr>

<tr>
<td>leave_faction
</td>
<td>
</td>
<td>character
</td>
<td>
</td>
<td>The charcter in the scope leaves the assigned faction.
</td>
<td>
</td>
<td>Factions
</td></tr>

<tr>
<td>make_claim_strong
</td>
<td>
</td>
<td>character
</td>
<td>title
</td>
<td>Makes a claim strong (character adds the claim if not having it already).
</td>
<td>
</td>
<td>Titles
</td></tr>

<tr>
<td>make_claim_weak
</td>
<td>
</td>
<td>character
</td>
<td>title
</td>
<td>Makes a claim weak (character adds the claim if not having it already).
</td>
<td>
</td>
<td>Titles
</td></tr>

<tr>
<td>make_concubine
</td>
<td>
</td>
<td>character
</td>
<td>character
</td>
<td>Makes the target character a concubine of the scope character, the target should not be imprisoned.
</td>
<td>
</td>
<td>Characters
</td></tr>

<tr>
<td>make_pregnant
</td>
<td>
</td>
<td>character
</td>
<td>character/int/bool
</td>
<td>Makes a character pregnant.
</td>
<td>make_pregnant = { father= 'the real father' number_of_children= X known_bastard=yes/no }
</td>
<td>Characters
</td></tr>

<tr>
<td>make_trait_active
</td>
<td>
</td>
<td>character
</td>
<td>
</td>
<td>Activates an inactive trait. Tooltip will not be shown if the character cannot have the trait.
</td>
<td>
</td>
<td>Characters
</td></tr>

<tr>
<td>make_trait_active_force_tooltip
</td>
<td>
</td>
<td>character
</td>
<td>
</td>
<td>Activates an inactive trait. Tooltip will be shown even if the character cannot have the trait.
</td>
<td>
</td>
<td>Characters
</td></tr>

<tr>
<td>make_trait_inactive
</td>
<td>
</td>
<td>character
</td>
<td>
</td>
<td>Makes a current trait of a character inactive. Tooltip will not be shown if the character doesn't have the trait.
</td>
<td>
</td>
<td>Characters
</td></tr>

<tr>
<td>make_trait_inactive_force_tooltip
</td>
<td>
</td>
<td>character
</td>
<td>
</td>
<td>Makes a current trait of a character inactive. Tooltip will be shown even if the character doesn't have the trait.
</td>
<td>
</td>
<td>Characters
</td></tr>

<tr>
<td>make_unprunable
</td>
<td>
</td>
<td>character
</td>
<td>
</td>
<td>The scope character will no longer be prunable after their death. Use with care, as this will make everyone related to them unprunable too. So you should only use this if someone absolutely *needs* to stick around several years after their death.
</td>
<td>make_unprunable = yes
</td>
<td>Characters
</td></tr>

<tr>
<td>marry
</td>
<td>
</td>
<td>character
</td>
<td>character
</td>
<td>Marries the scoped character to the target character.
</td>
<td>marry = target
</td>
<td>Characters
</td></tr>

<tr>
<td>marry_matrilineal
</td>
<td>
</td>
<td>character
</td>
<td>character
</td>
<td>Marries the scoped character to the target character matrilineally
</td>
<td>marry_matrilineal = target
</td>
<td>Characters
</td></tr>

<tr>
<td>move_to_pool
</td>
<td>
</td>
<td>character
</td>
<td>bool
</td>
<td>The scoped character (courtier or guest) leaves their current court and moves into the pool.
</td>
<td>scope:guest = { move_to_pool = yes }
</td>
<td>Characters
</td></tr>

<tr>
<td>move_to_pool_at
</td>
<td>
</td>
<td>character
</td>
<td>province
</td>
<td>The scoped character (courtier/guest/pool character) leaves their current court (if any) and moves into the pool of the specified province
</td>
<td>scope:guest = { move_to_pool_at = scope:some_province }
</td>
<td>Characters
</td></tr>

<tr>
<td>pay_long_term_gold
</td>
<td>
</td>
<td>character
</td>
<td>character/int
</td>
<td>The scope character pays gold to the target character. (AI budget category long term).
</td>
<td>pay_gold = { target = X gold = Y }
</td>
<td>Characters
</td></tr>

<tr>
<td>pay_short_term_gold
</td>
<td>
</td>
<td>character
</td>
<td>
</td>
<td>The scope character pays gold to the target character. (AI budget category short term).
</td>
<td>pay_gold = { target = X gold = Y }
</td>
<td>Characters
</td></tr>

<tr>
<td>pay_short_term_income
</td>
<td>
</td>
<td>character
</td>
<td>character/int
</td>
<td>The scope character immediately pays gold corresponding to their income to the target character. (AI budget short term).
</td>
<td>pay_income = { target = X days/months/years = Y }
</td>
<td>Characters
</td></tr>

<tr>
<td>play_music_cue
</td>
<td>
</td>
<td>character
</td>
<td>
</td>
<td>Plays the specified music cue.
</td>
<td>
</td>
<td>Music
</td></tr>

<tr>
<td>recalculate_scripted_relation
</td>
<td>
</td>
<td>character
</td>
<td>
</td>
<td>Recalculates the effect of a scripted relation.
</td>
<td>recalculate_scripted_relation = friend
</td>
<td>Relations
</td></tr>

<tr>
<td>recruit_courtier
</td>
<td>
</td>
<td>character
</td>
<td>character
</td>
<td>Recruits the target to become a courtier.(It doesn't work)
</td>
<td>scope:liege = { recruit_courtier = scope:new_courtier }
</td>
<td>Characters
</td></tr>

<tr>
<td>refund_all_perks
</td>
<td>
</td>
<td>character
</td>
<td>bool
</td>
<td>Refunds all perks of the character.
</td>
<td>refund_all_perks = yes
</td>
<td>Lifestyles
</td></tr>

<tr>
<td>refund_perks
</td>
<td>
</td>
<td>character
</td>
<td>key
</td>
<td>Refunds all perks of the RHS lifestyle.
</td>
<td>refund_perks = intrigue_lifestyle
</td>
<td>Lifestyles
</td></tr>

<tr>
<td>release_from_prison
</td>
<td>
</td>
<td>character
</td>
<td>bool
</td>
<td>Releases the character from the prison.
</td>
<td>release_from_prison = yes
</td>
<td>Characters
</td></tr>

<tr>
<td>remove_all_character_modifier_instances
</td>
<td>
</td>
<td>character
</td>
<td>modifier
</td>
<td>Remove all instances of a modifier from a character
</td>
<td>remove_all_character_modifier_instances = name
</td>
<td>Modifiers
</td></tr>

<tr>
<td>remove_character_flag
</td>
<td>
</td>
<td>character
</td>
<td>flag
</td>
<td>Removes a character flag.
</td>
<td>
</td>
<td>Flags
</td></tr>

<tr>
<td>remove_character_modifier
</td>
<td>
</td>
<td>character
</td>
<td>modifier
</td>
<td>Remove a modifier from a character.
</td>
<td>remove_character_modifier = name
</td>
<td>Modifiers
</td></tr>

<tr>
<td>remove_claim
</td>
<td>
</td>
<td>character
</td>
<td>landed title
</td>
<td>Removes an explicit (not from a living parent/grand parent) claim.
</td>
<td>
</td>
<td>Title
</td></tr>

<tr>
<td>remove_concubine
</td>
<td>
</td>
<td>character
</td>
<td>character
</td>
<td>Removes the target character as a concubine of the scope character.
</td>
<td>
</td>
<td>Relations
</td></tr>

<tr>
<td>remove_courtier_or_guest
</td>
<td>
</td>
<td>character
</td>
<td>character
</td>
<td>Removes the target character (guest or courtier) from the scope character's court.
</td>
<td>scope:host = { remove_courtier_or_guest = scope:guest }<br />scope:host = {<br />remove_courtier_or_guest = {<br />character = scope:guest<br />new_location = scope:some_province # optionally specify a new location<br />}<br />}
</td>
<td>Characters
</td></tr>

<tr>
<td>remove_decision_cooldown
</td>
<td>
</td>
<td>character
</td>
<td>key
</td>
<td>Remove the cooldown on taking a decision for the scoped character.
</td>
<td>remove_decision_cooldown = decision_name
</td>
<td>Decisions
</td></tr>

<tr>
<td>remove_hook
</td>
<td>
</td>
<td>character
</td>
<td>character/hook_type
</td>
<td>Removes a hook on a character. If type is specified, the hook will only be removed if it is of that type.
</td>
<td>remove_hook = { target = X, type = Y }
</td>
<td>Hooks and Schemes
</td></tr>

<tr>
<td>remove_interaction_cooldown
</td>
<td>
</td>
<td>character
</td>
<td>interaction
</td>
<td>Remove the cooldown on using an interaction for the scoped character.
</td>
<td>remove_interaction_cooldown = interaction_name
</td>
<td>Interactions
</td></tr>

<tr>
<td>remove_interaction_cooldown_against
</td>
<td>
</td>
<td>character
</td>
<td>interaction/character
</td>
<td>Remove the cooldown on using an interaction against the target character for the scoped character.
</td>
<td>remove_interaction_cooldown_against = { interaction = interaction_name target = character }
</td>
<td>Interactions
</td></tr>

<tr>
<td>remove_long_term_gold
</td>
<td>
</td>
<td>character
</td>
<td>
</td>
<td>Removes gold from a character (AI's long term budget).
</td>
<td>
</td>
<td>Characters
</td></tr>

<tr>
<td>remove_nickname
</td>
<td>
</td>
<td>character
</td>
<td>bool
</td>
<td>Removes any nickname from the current character.
</td>
<td>
</td>
<td>Characters
</td></tr>

<tr>
<td>remove_opinion
</td>
<td>
</td>
<td>character
</td>
<td>character/modifier/bool
</td>
<td>Removes a temporary opinion modifier. Where X is a character, Y is the opinion modifier, Z tells whether to remove all instances of the modifier or just one.
</td>
<td>remove_opinion = { target = X modifier = Y single = Z (no by default) }
</td>
<td>Modifiers
</td></tr>

<tr>
<td>remove_perk
</td>
<td>
</td>
<td>character
</td>
<td>
</td>
<td>Remove the perk for this character
</td>
<td>
</td>
<td>Characters
</td></tr>

<tr>
<td>remove_realm_law
</td>
<td>
</td>
<td>character
</td>
<td>law
</td>
<td>Removes the given law from the scoped character. This will leave the law group empty, so only do this if you're getting rid of a law group.
</td>
<td>
</td>
<td>Laws
</td></tr>

<tr>
<td>remove_relation_best_friend
</td>
<td>
</td>
<td>character
</td>
<td>character
</td>
<td>Removes scripted relationship.
</td>
<td>
</td>
<td>Relations
</td></tr>

<tr>
<td>remove_relation_bully
</td>
<td>
</td>
<td>character
</td>
<td>character
</td>
<td>Removes scripted relationship.
</td>
<td>
</td>
<td>Relations
</td></tr>

<tr>
<td>remove_relation_court_physician
</td>
<td>
</td>
<td>character
</td>
<td>character
</td>
<td>Removes scripted relationship.
</td>
<td>
</td>
<td>Relations
</td></tr>

<tr>
<td>remove_relation_crush
</td>
<td>
</td>
<td>character
</td>
<td>character
</td>
<td>Removes scripted relationship.
</td>
<td>
</td>
<td>Relations
</td></tr>

<tr>
<td>remove_relation_flag
</td>
<td>
</td>
<td>flag/character/relation
</td>
<td>Removed a flag from an existing relation.
</td>
<td>
</td>
<td>remove_relation_flag = { flag = flag_name (declared in scripted_relation) target = other_character relation = scripted_relation }
</td>
<td>Flags
</td></tr>

<tr>
<td>remove_relation_friend
</td>
<td>
</td>
<td>character
</td>
<td>character
</td>
<td>Removes scripted relationship.
</td>
<td>
</td>
<td>Relations
</td></tr>

<tr>
<td>remove_relation_guardian
</td>
<td>
</td>
<td>character
</td>
<td>character
</td>
<td>Removes scripted relationship
</td>
<td>
</td>
<td>Relations
</td></tr>

<tr>
<td>remove_relation_intrigue_mentor
</td>
<td>
</td>
<td>character
</td>
<td>character
</td>
<td>Removes scripted relationship.
</td>
<td>
</td>
<td>Relations
</td></tr>

<tr>
<td>remove_relation_intrigue_student
</td>
<td>
</td>
<td>character
</td>
<td>character
</td>
<td>Removes scripted relationship.
</td>
<td>
</td>
<td>Relations
</td></tr>

<tr>
<td>remove_relation_lover
</td>
<td>
</td>
<td>character
</td>
<td>character
</td>
<td>Removes scripted relationship.
</td>
<td>
</td>
<td>Relations
</td></tr>

<tr>
<td>remove_relation_mentor
</td>
<td>
</td>
<td>character
</td>
<td>character
</td>
<td>Removes scripted relationship.
</td>
<td>
</td>
<td>Relations
</td></tr>

<tr>
<td>remove_relation_nemesis
</td>
<td>
</td>
<td>character
</td>
<td>character
</td>
<td>Removes scripted relationship.
</td>
<td>
</td>
<td>Relations
</td></tr>

<tr>
<td>remove_relation_oaf
</td>
<td>
</td>
<td>character
</td>
<td>character
</td>
<td>Removes scripted relationship
</td>
<td>
</td>
<td>Relations
</td></tr>

<tr>
<td>remove_relation_potential_friend
</td>
<td>
</td>
<td>character
</td>
<td>character
</td>
<td>Removes scripted relationship.
</td>
<td>
</td>
<td>Relations
</td></tr>

<tr>
<td>remove_relation_potential_lover
</td>
<td>
</td>
<td>character
</td>
<td>character
</td>
<td>Removes scripted relationship.
</td>
<td>
</td>
<td>Relations
</td></tr>

<tr>
<td>remove_relation_potential_rival
</td>
<td>
</td>
<td>character
</td>
<td>character
</td>
<td>Removes scripted relationship.
</td>
<td>
</td>
<td>Relations
</td></tr>

<tr>
<td>remove_relation_rival
</td>
<td>
</td>
<td>character
</td>
<td>character
</td>
<td>Removes scripted relationship.
</td>
<td>
</td>
<td>Relations
</td></tr>

<tr>
<td>remove_relation_soldier_friend
</td>
<td>
</td>
<td>character
</td>
<td>character
</td>
<td>Removes scripted relationship.
</td>
<td>
</td>
<td>Relations
</td></tr>

<tr>
<td>remove_relation_soulmate
</td>
<td>
</td>
<td>character
</td>
<td>character
</td>
<td>Removes scripted relationship.
</td>
<td>
</td>
<td>Relations
</td></tr>

<tr>
<td>remove_relation_student
</td>
<td>
</td>
<td>character
</td>
<td>character
</td>
<td>Removes scripted relationship.
</td>
<td>
</td>
<td>Relations
</td></tr>

<tr>
<td>remove_relation_victim
</td>
<td>
</td>
<td>character
</td>
<td>character
</td>
<td>Removes scripted relationship.
</td>
<td>
</td>
<td>Relations
</td></tr>

<tr>
<td>remove_relation_ward
</td>
<td>
</td>
<td>character
</td>
<td>character
</td>
<td>Removes scripted relationship.
</td>
<td>
</td>
<td>Relations
</td></tr>

<tr>
<td>remove_scheme_cooldown_against
</td>
<td>
</td>
<td>character
</td>
<td>scheme/character
</td>
<td>Remove the cooldown on using a scheme against the target character for the scoped character
</td>
<td>remove_scheme_cooldown_against = { scheme = scheme_name target = character }
</td>
<td>Hooks and Schemes
</td></tr>

<tr>
<td>remove_short_term_gold
</td>
<td>
</td>
<td>character
</td>
<td>
</td>
<td>Removes gold from a character (AI's short term budget).
</td>
<td>
</td>
<td>Characters
</td></tr>

<tr>
<td>remove_trait
</td>
<td>
</td>
<td>character
</td>
<td>
</td>
<td>Removes a trait from a character. Tooltip will not be shown if the character doesn't have the trait.
</td>
<td>
</td>
<td>Characters
</td></tr>

<tr>
<td>remove_trait_force_tooltip
</td>
<td>
</td>
<td>character
</td>
<td>
</td>
<td>Removes a trait from a character. Tooltip will be shown even if the character doesn't have the trait.
</td>
<td>
</td>
<td>Characters
</td></tr>

<tr>
<td>reset_beneficiary
</td>
<td>
</td>
<td>character
</td>
<td>bool
</td>
<td>The target character stops having a beneficiary.
</td>
<td>reset_beneficiary = yes
</td>
<td>Holy Wars
</td></tr>

<tr>
<td>return_to_court
</td>
<td>
</td>
<td>character
</td>
<td>
</td>
<td>Returns the scope character to the employers court.
</td>
<td>
</td>
<td>Characters
</td></tr>

<tr>
<td>reverse_add_opinion
</td>
<td>
</td>
<td>character
</td>
<td>modifier/int/character
</td>
<td>Adds a temporary reverse opinion modifier. X is a scripted modifier name. Y can be a value or a range "{ A B }" If no timeout are specified, the modifier's scripted default timeout will be used.
</td>
<td>reverse_add_opinion = { modifier = X days/months/years = Y target = Z }
</td>
<td>Modifiers
</td></tr>

<tr>
<td>scriptedtests_recalculate_character_modifier
</td>
<td>
</td>
<td>character
</td>
<td>
</td>
<td>Recalculates the modifier of the scoped character.
</td>
<td>
</td>
<td>Modifiers
</td></tr>

<tr>
<td>scriptedtests_recalculate_succession
</td>
<td>
</td>
<td>character
</td>
<td>
</td>
<td>Recalculates the line of succession of the scoped character.
</td>
<td>
</td>
<td>Succession
</td></tr>

<tr>
<td>send_interface_message
</td>
<td>
</td>
<td>character
</td>
<td>
</td>
<td>Sends a message to the player playing the character in the scope and then executes any effects inside.<br />For the message text and tooltip, $EFFECT$ contains the text description of the effects in the past tense and $DESC$ contains the text from the desc field.
</td>
<td>send_interface_message = {<br />type = message_type # default: send_interface_message<br />title = LOCALIZATION # optional, otherwise takes it from the message type<br />desc = LOCALIZATION # optional, otherwise takes it from the message type<br />tooltip = LOCALIZATION # optional, otherwise takes it from the message type<br />left_icon = scope:recipient # optional, character or title<br />right_icon = scope:the_title # optional, character or title<br />goto = scope:the_title # optional, character, barony title, province will add a goto button<br /># optional effects...<br />add_dread = 5<br />scope:someone = { add_gold = 5 }<br />}
</td>
<td>Notifications
</td></tr>

<tr>
<td>send_interface_toast
</td>
<td>
</td>
<td>character
</td>
<td>
</td>
<td>Sends a message to the player playing the character in the scope and then executes any effects inside.<br />For the message text and tooltip, $EFFECT$ contains the text description of the effects in the past tense.<br />And $DESC$ contains the text from the desc field.
</td>
<td>send_interface_toast = {<br />type = message_type # default: send_interface_toast<br />title = LOCALIZATION # optional, otherwise takes it from the message type<br />desc = LOCALIZATION # optional, otherwise takes it from the message type<br />left_icon = scope:recipient # optional, character or title<br />right_icon = scope<br />goto = scope:the_title # optional, character, barony title, province will add a goto button<br /># optional effects...<br />add_dread = 5<br />scope:someone = { add_gold = 5 }<br />}
</td>
<td>Notifications
</td></tr>

<tr>
<td>set_absolute_country_control
</td>
<td>
</td>
<td>character
</td>
<td>
</td>
<td>Sets if this character has absolute country control.
</td>
<td>
</td>
<td>Control
</td></tr>

<tr>
<td>unlock_character_movement
</td>
<td>
</td>
<td>
</td>
<td>bool/character
</td>
<td>
</td>
<td>
</td>
<td>Characters
</td></tr>

<tr>
<td>set_beneficiary
</td>
<td>
</td>
<td>character
</td>
<td>character
</td>
<td>The target character becomes the beneficiary of the scoped character.
</td>
<td>set_beneficiary = some character
</td>
<td>Holy Wars
</td></tr>

<tr>
<td>set_character_faith
</td>
<td>
</td>
<td>character
</td>
<td>faith
</td>
<td>Changes what faith a character has executing the effects for it. For history setup use 'set_character_faith_history' instead.
</td>
<td>
</td>
<td>Characters
</td></tr>

<tr>
<td>set_character_faith_history
</td>
<td>
</td>
<td>character
</td>
<td>faith
</td>
<td>Changes what faith a character has NOT executing the effects for it. USE ONLY IN HISOTRY SETUP!
</td>
<td>
</td>
<td>Characters
</td></tr>

<tr>
<td>set_character_faith_with_conversion
</td>
<td>
</td>
<td>character
</td>
<td>faith
</td>
<td>Changes what faith a character has, as if they used the faith-view interaction (minus the piety cost). So vassals who'd accept will get converted, as will capitals
</td>
<td>
</td>
<td>Characters
</td></tr>

<tr>
<td>set_child_of_concubine_on_pregnancy
</td>
<td>
</td>
<td>character
</td>
<td>
</td>
<td>Sets the child to be (or not be) a child of a concubine during pregnancy
</td>
<td>
</td>
<td>Characters
</td></tr>

<tr>
<td>set_council_task
</td>
<td>
</td>
<td>character
</td>
<td>key/character
</td>
<td>Sets the task of the scope councillor
</td>
<td>set_council_task = { task_type = council_position_type_key target = for_targeted_tasks  }
</td>
<td>Jobs
</td></tr>

<tr>
<td>set_culture
</td>
<td>
</td>
<td>character
</td>
<td>culture
</td>
<td>Set the culture for this character
</td>
<td>
</td>
<td>Characters
</td></tr>

<tr>
<td>set_culture_same_as
</td>
<td>
</td>
<td>character
</td>
<td>character
</td>
<td>Sets the culture of the character to be the same as the culture of the target.
</td>
<td>
</td>
<td>Characters
</td></tr>

<tr>
<td>set_death_reason
</td>
<td>
</td>
<td>character
</td>
<td>
</td>
<td>Sets the death reason and the killer of a dead character.
</td>
<td>set_death_reason = { killer = X death_reason = Y }, both parameters are optional
</td>
<td>Characters
</td></tr>

<tr>
<td>set_default_education
</td>
<td>
</td>
<td>
</td>
<td>character
</td>
<td>Sets the default education focus for this character.
</td>
<td>
</td>
<td>Lifestyles
</td></tr>

<tr>
<td>set_designated_heir
</td>
<td>
</td>
<td>character
</td>
<td>character
</td>
<td>Sets the given character as designated heir.
</td>
<td>
</td>
<td>Succession
</td></tr>

<tr>
<td>set_employer
</td>
<td>
</td>
<td>character
</td>
<td>character
</td>
<td>Add the scope character to the target character's court.
</td>
<td>
</td>
<td>Characters
</td></tr>

<tr>
<td>set_father
</td>
<td>
</td>
<td>character
</td>
<td>character
</td>
<td>Sets the father of a character.
</td>
<td>
</td>
<td>Characters
</td></tr>

<tr>
<td>set_focus
</td>
<td>
</td>
<td>character
</td>
<td>
</td>
<td>Set the focus for this character
</td>
<td>
</td>
<td>Lifestyles
</td></tr>

<tr>
<td>set_house
</td>
<td>
</td>
<td>character
</td>
<td>dynasty house
</td>
<td>Sets the dynasty house of the character.
</td>
<td>
</td>
<td>Characters
</td></tr>

<tr>
<td>set_immortal_age
</td>
<td>
</td>
<td>character
</td>
<td>int
</td>
<td>Changes what age the character became immortal at. Only works if already immortal.
</td>
<td>set_immortal_age = 20
</td>
<td>Characters
</td></tr>

<tr>
<td>set_killer_public
</td>
<td>
</td>
<td>character
</td>
<td>
</td>
<td>Sets the scoped character's killer as being publicly known
</td>
<td>set_killer_public = bool
</td>
<td>Hooks and Schemes
</td></tr>

<tr>
<td>set_known_bastard_on_pregnancy
</td>
<td>
</td>
<td>character
</td>
<td>
</td>
<td>Sets the child to a known or unknown bastard during pregnancy.
</td>
<td>
</td>
<td>Characters
</td></tr>

<tr>
<td>set_num_pregnancy_children
</td>
<td>
</td>
<td>character
</td>
<td>int
</td>
<td>Set the number of children
</td>
<td>
</td>
<td>Characters
</td></tr>

<tr>
<td>set_override_designated_winner
</td>
<td>
</td>
<td>character
</td>
<td>bool
</td>
<td>The scoped character will put their beneficiary on the throne if they're the #1 participant if this is called with 'yes'. Call with 'no' to turn it off again.
</td>
<td>set_override_designate_winner = yes
</td>
<td>Holy Wars
</td></tr>

<tr>
<td>set_player_character
</td>
<td>
</td>
<td>character
</td>
<td>character
</td>
<td>The scope character's player will now play as the target character. Scope must be player-controlled. Target cannot be player-controlled.
</td>
<td>
</td>
<td>Characters
</td></tr>

<tr>
<td>set_pregnancy_assumed_father
</td>
<td>
</td>
<td>character
</td>
<td>character
</td>
<td>Set the assumed father of the pregnancy.
</td>
<td>
</td>
<td>Characters
</td></tr>

<tr>
<td>set_primary_spouse
</td>
<td>
</td>
<td>character
</td>
<td>character
</td>
<td>Set the primary spouse of a character.
</td>
<td>set_primary_spouse = scope
</td>
<td>Characters
</td></tr>

<tr>
<td>set_primary_title_to
</td>
<td>
</td>
<td>character
</td>
<td>landed title
</td>
<td>Sets the primary title for a character.
</td>
<td>set_primary_title_to = &lt;title&gt;
</td>
<td>Titles
</td></tr>

<tr>
<td>set_real_father
</td>
<td>
</td>
<td>character
</td>
<td>character
</td>
<td>Changes the real father of the character scope.
</td>
<td>
</td>
<td>Characters
</td></tr>

<tr>
<td>set_realm_capital
</td>
<td>
</td>
<td>character
</td>
<td>landed title
</td>
<td>Set a new realm capital
</td>
<td>character = { set_realm_capital = new_title }
</td>
<td>Realm
</td></tr>

<tr>
<td>set_relation_best_friend
</td>
<td>
</td>
<td>character
</td>
<td>character
</td>
<td>Sets scripted relationship.
</td>
<td>
</td>
<td>Relations
</td></tr>

<tr>
<td>set_relation_bully
</td>
<td>
</td>
<td>character
</td>
<td>character
</td>
<td>Sets scripted relationship.
</td>
<td>
</td>
<td>Relations
</td></tr>

<tr>
<td>set_relation_court_physician
</td>
<td>
</td>
<td>character
</td>
<td>character
</td>
<td>Sets scripted relationship.
</td>
<td>
</td>
<td>Relations
</td></tr>

<tr>
<td>set_relation_crush
</td>
<td>
</td>
<td>character
</td>
<td>character
</td>
<td>Sets scripted relationship.
</td>
<td>
</td>
<td>Relations
</td></tr>

<tr>
<td>set_relation_friend
</td>
<td>
</td>
<td>character
</td>
<td>character
</td>
<td>Sets scripted relationship.
</td>
<td>
</td>
<td>Relations
</td></tr>

<tr>
<td>set_relation_guardian
</td>
<td>
</td>
<td>character
</td>
<td>character
</td>
<td>Sets scripted relationship.
</td>
<td>
</td>
<td>Relations
</td></tr>

<tr>
<td>set_relation_intrigue_mentor
</td>
<td>
</td>
<td>character
</td>
<td>character
</td>
<td>Sets scripted relationship.
</td>
<td>
</td>
<td>Relations
</td></tr>

<tr>
<td>set_relation_intrigue_student
</td>
<td>
</td>
<td>character
</td>
<td>character
</td>
<td>Sets scripted relationship.
</td>
<td>
</td>
<td>Relations
</td></tr>

<tr>
<td>set_relation_lover
</td>
<td>
</td>
<td>character
</td>
<td>character
</td>
<td>Sets scripted relationship.
</td>
<td>
</td>
<td>Relations
</td></tr>

<tr>
<td>set_relation_mentor
</td>
<td>
</td>
<td>character
</td>
<td>character
</td>
<td>Sets scripted relationship.
</td>
<td>
</td>
<td>Relations
</td></tr>

<tr>
<td>set_relation_nemesis
</td>
<td>
</td>
<td>character
</td>
<td>character
</td>
<td>Sets scripted relationship.
</td>
<td>
</td>
<td>Relations
</td></tr>

<tr>
<td>set_relation_oaf
</td>
<td>
</td>
<td>character
</td>
<td>character
</td>
<td>Sets scripted relationship.
</td>
<td>
</td>
<td>Relations
</td></tr>

<tr>
<td>set_relation_potential_friend
</td>
<td>
</td>
<td>character
</td>
<td>character
</td>
<td>Sets scripted relationship.
</td>
<td>
</td>
<td>Relations
</td></tr>

<tr>
<td>set_relation_potential_lover
</td>
<td>
</td>
<td>character
</td>
<td>character
</td>
<td>Sets scripted relationship.
</td>
<td>
</td>
<td>Relations
</td></tr>

<tr>
<td>set_relation_potential_rival
</td>
<td>
</td>
<td>character
</td>
<td>character
</td>
<td>Sets scripted relationship.
</td>
<td>
</td>
<td>Relations
</td></tr>

<tr>
<td>set_relation_rival
</td>
<td>
</td>
<td>character
</td>
<td>character
</td>
<td>Sets scripted relationship.
</td>
<td>
</td>
<td>Relations
</td></tr>

<tr>
<td>set_relation_soldier_friend
</td>
<td>
</td>
<td>character
</td>
<td>character
</td>
<td>Sets scripted relationship.
</td>
<td>
</td>
<td>Relations
</td></tr>

<tr>
<td>set_relation_soulmate
</td>
<td>
</td>
<td>character
</td>
<td>character
</td>
<td>Sets scripted relationship.
</td>
<td>
</td>
<td>Relations
</td></tr>

<tr>
<td>set_relation_student
</td>
<td>
</td>
<td>character
</td>
<td>character
</td>
<td>Sets scripted relationship.
</td>
<td>
</td>
<td>Relations
</td></tr>

<tr>
<td>set_relation_victim
</td>
<td>
</td>
<td>character
</td>
<td>character
</td>
<td>Sets scripted relationship.
</td>
<td>
</td>
<td>Relations
</td></tr>

<tr>
<td>set_relation_ward
</td>
<td>
</td>
<td>character
</td>
<td>character
</td>
<td>Sets scripted relationship.
</td>
<td>
</td>
<td>Relations
</td></tr>

<tr>
<td>set_sexuality
</td>
<td>
</td>
<td>character
</td>
<td>
</td>
<td>Sets the sexuality of the character
</td>
<td>
</td>
<td>Characters
</td></tr>

<tr>
<td>set_to_lowborn
</td>
<td>
</td>
<td>character
</td>
<td>
</td>
<td>Set the character to lowborn.
</td>
<td>
</td>
<td>Characters
</td></tr>

<tr>
<td>set_vassal_contract_modification_blocked
</td>
<td>
</td>
<td>character
</td>
<td>
</td>
<td>Blocks the vassal contract from being modified with regards to being checked by 'vassal_contract_is_blocked_from_modification'
</td>
<td>
</td>
<td>Vassalage
</td></tr>

<tr>
<td>spawn_army
</td>
<td>
</td>
<td>character
</td>
<td>
</td>
<td>Spawns an army for this character. If the character is not at war, the regiments will be created, but the army will not be spawned.
</td>
<td>spawn_army = {<br />levies = int/script value # optional, number of men<br />men_at_arms = { # optional, multiple can be specified. Need either levies or MAA<br />type = key<br />men/stacks = int/script value<br />}<br />location = province<br />origin = province # optional, location used if not set. This is used for where to base bonuses and the like on<br />war = war # optional. If set, the stack will disband after the war ends<br />inheritable = yes/no # Default: yes<br />uses_supply = yes/no # Default: yes<br />army = army # optional. If set, the stack will merge into this army<br />save_scope_as/save_temporary_scope_as = new_army # optional way to get a reference to the new army. Note this might not be set if the army wasn't spawned (e.g. if the character is not at war)<br />name = description # gives the troops a specific name that shows up in interfaces<br />}
</td>
<td>Armies
</td></tr>

<tr>
<td>start_default_task
</td>
<td>
</td>
<td>character
</td>
<td>
</td>
<td>Force the Councillor to revert to the default task. Any relevant percentage progress will be lost (even if the councillor was performing the default task already).
</td>
<td>
</td>
<td>Jobs
</td></tr>

<tr>
<td>start_scheme
</td>
<td>
</td>
<td>character
</td>
<td>
</td>
<td>
</td>
<td>starts a scheme  = { type = X target = Y }
</td>
<td>Hooks and Schemes
</td></tr>

<tr>
<td>start_war
</td>
<td>
</td>
<td>character
</td>
<td>
</td>
<td>Starts a war. X is a casus belli type, Y is the target character, Z i the (optional) claimant, W1, W2.... are targeted titles.
</td>
<td>start_war = { casus_belli/cb = X target = Y claimant = Z target_title = W1 target_title = W2 ... }
</td>
<td>Wars
</td></tr>

<tr>
<td>stress_impact
</td>
<td>
</td>
<td>character
</td>
<td>
</td>
<td>Stress impact according to specified traits (trait = value), use base = value for a base value that's always added.
</td>
<td>stress_impact = { sadistic = medium_stress_impact_loss }<br />stress_impact = { compassionate = medium_stress_impact_gain }
</td>
<td>Characters
</td></tr>

<tr>
<td>use_hook
</td>
<td>
</td>
<td>character
</td>
<td>character
</td>
<td>Uses a hook a character has (removes if weak, puts on cooldown if strong).
</td>
<td>use_hook = some_character
</td>
<td>Hooks and Schemes
</td></tr>

<tr>
<td>vassal_contract_decrease_obligation_level
</td>
<td>
</td>
<td>character
</td>
<td>
</td>
<td>Decrease the obligation level of the scoped character's vassal contract.
</td>
<td>
</td>
<td>Vassalage
</td></tr>

<tr>
<td>vassal_contract_increase_obligation_level
</td>
<td>
</td>
<td>character
</td>
<td>
</td>
<td>Increase the obligation level of the scoped character's vassal contract.
</td>
<td>
</td>
<td>Vassalage
</td></tr>

<tr>
<td>vassal_contract_set_obligation_level
</td>
<td>
</td>
<td>character
</td>
<td>
</td>
<td>Change the obligation level of the scoped character's vassal contract.
</td>
<td>vassal_contract_set_obligation_level = { type = name level = 1 } # index to obligation level<br />vassal_contract_set_obligation_level = { type = name level = feudal_obligation_low }
</td>
<td>Vassalage
</td></tr>

<tr>
<td>visit_court_of
</td>
<td>
</td>
<td>character
</td>
<td>character
</td>
<td>Add the scope character as the target character's guest.
</td>
<td>
</td>
<td>Characters
</td></tr>

<tr>
<td>add_faction_discontent
</td>
<td>
</td>
<td>faction
</td>
<td>
</td>
<td>Adds (or subtracts) discontent to the scope faction.
</td>
<td>add_faction_discontent = X
</td>
<td>Factions
</td></tr>

<tr>
<td>destroy_faction
</td>
<td>
</td>
<td>faction
</td>
<td>
</td>
<td>The scope faction is destroyed.
</td>
<td>destroy_faction = yes
</td>
<td>Factions
</td></tr>

<tr>
<td>faction_remove_war
</td>
<td>
</td>
<td>faction
</td>
<td>
</td>
<td>Removes the war currently associated with the faction.
</td>
<td>faction_remove_war = yes
</td>
<td>Factions
</td></tr>

<tr>
<td>faction_start_war
</td>
<td>
</td>
<td>faction
</td>
<td>
</td>
<td>The scope faction starts the war agains their target.
</td>
<td>faction_start_war = {<br />title = [optional]<br />}
</td>
<td>Factions
</td></tr>

<tr>
<td>remove_special_character
</td>
<td>
</td>
<td>faction
</td>
<td>
</td>
<td>Removes the special character for the scope faction
</td>
<td>
</td>
<td>Factions
</td></tr>

<tr>
<td>remove_special_title
</td>
<td>
</td>
<td>faction
</td>
<td>
</td>
<td>Removes the special character for the scope faction.
</td>
<td>
</td>
<td>Factions
</td></tr>

<tr>
<td>set_special_character
</td>
<td>
</td>
<td>faction
</td>
<td>character
</td>
<td>Sets the special character for the scope faction.
</td>
<td>
</td>
<td>Factions
</td></tr>

<tr>
<td>set_special_title
</td>
<td>
</td>
<td>faction
</td>
<td>landed title
</td>
<td>Sets the special title for the scope faction
</td>
<td>
</td>
<td>Factions
</td></tr>

<tr>
<td>add_attacker
</td>
<td>
</td>
<td>war
</td>
<td>character
</td>
<td>Adds the target character to the scope war as an attacker.
</td>
<td>
</td>
<td>Wars
</td></tr>

<tr>
<td>add_defender
</td>
<td>
</td>
<td>war
</td>
<td>character
</td>
<td>Adds the target character to the scope war as a defender.
</td>
<td>
</td>
<td>Wars
</td></tr>

<tr>
<td>end_war
</td>
<td>
</td>
<td>war
</td>
<td>
</td>
<td>Ends the war with the specified winner.
</td>
<td>end_war = attacker/defender/white_peace
</td>
<td>Wars
</td></tr>

<tr>
<td>remove_participant
</td>
<td>
</td>
<td>war
</td>
<td>character
</td>
<td>Removes the target character from the scope war.
</td>
<td>
</td>
<td>Wars
</td></tr>

<tr>
<td>set_called_to
</td>
<td>
</td>
<td>war
</td>
<td>character
</td>
<td>Sets the target character as already called to the scope war.
</td>
<td>
</td>
<td>Wars
</td></tr>

<tr>
<td>set_casus_belli
</td>
<td>
</td>
<td>war
</td>
<td>
</td>
<td>Sets the casus belli of the scope war.
</td>
<td>
</td>
<td>Wars
</td></tr>

<tr>
<td>activate_holy_site
</td>
<td>
</td>
<td>faith
</td>
<td>
</td>
<td>Activate an inactive holy site.
</td>
<td>&lt;faith_scope&gt; = { activate_holy_site = &lt;holy_site_name&gt; }
</td>
<td>Faiths
</td></tr>

<tr>
<td>add_doctrine
</td>
<td>
</td>
<td>faith
</td>
<td>doctrines
</td>
<td>Add doctrine to faith.
</td>
<td>&lt;faith_scope&gt; = { add_doctrine = &lt;doctrine_name&gt; }
</td>
<td>Faiths
</td></tr>

<tr>
<td>change_fervor
</td>
<td>
</td>
<td>faith
</td>
<td>int
</td>
<td>Changes the fervor of the faith by the given value.
</td>
<td>change_fervor = script value
</td>
<td>Faiths
</td></tr>

<tr>
<td>remove_doctrine
</td>
<td>
</td>
<td>faith
</td>
<td>doctrines
</td>
<td>Remove doctrine from faith.
</td>
<td>&lt;faith_scope&gt; = { remove_doctrine = &lt;doctrine_name&gt; }
</td>
<td>Faiths
</td></tr>

<tr>
<td>remove_religious_head_title
</td>
<td>
</td>
<td>faith
</td>
<td>bool
</td>
<td>Removes the religious head title of the faith.
</td>
<td>remove_religious_head_title = yes
</td>
<td>Faiths
</td></tr>

<tr>
<td>set_religious_head_title
</td>
<td>
</td>
<td>faith
</td>
<td>landed title
</td>
<td>Sets the religious head title of the faith to the given title.
</td>
<td>set_religious_head_title = scope
</td>
<td>Faiths
</td></tr>

<tr>
<td>start_great_holy_war
</td>
<td>
</td>
<td>faith
</td>
<td>
</td>
<td>Starts a great holy war.
</td>
<td>start_great_holy_war = {<br />target_character = someone<br />target_title = some<br />titledelay = script value# Number of days until the war should<br />startwar = some war # Optional. Will make this a directed GHW instead of undirected, and tie it to this specific war<br />}
</td>
<td>Faiths
</td></tr>

<tr>
<td>set_add_claim_on_loss
</td>
<td>
</td>
<td>title/vassal change
</td>
<td>
</td>
<td>If set, any title losses will result in claims being added to the previous holder.
</td>
<td>
</td>
<td>Titles
</td></tr>

<tr>
<td>set_title_and_vassal_change_type
</td>
<td>
</td>
<td>title/vassal change
</td>
<td>conquest, conquest_holy_war, conquest_claim, conquest_populist, inheritance, abdication, destroyed, created, usurped, granted, revoked, election, independency, returned, leased_out, lease_revoked, faction_demand
</td>
<td>Sets the type of change.
</td>
<td>
</td>
<td>Titles
</td></tr>

<tr>
<td>add_secret_participant
</td>
<td>
</td>
<td>secret
</td>
<td>character
</td>
<td>Adds an participant to the secret.
</td>
<td>
</td>
<td>Hooks and Schemes
</td></tr>

<tr>
<td>disable_exposure_by
</td>
<td>
</td>
<td>secret
</td>
<td>character
</td>
<td>Forbids the target character from exposing the secret
</td>
<td>disable_exposure_by = target_character
</td>
<td>Hooks and Schemes
</td></tr>
</tbody></table>
<div style="clear: both;"></div>
<div style="padding: 2px; border: 1px solid #aaa; text-align: center; border-collapse: collapse; font-size: 100%;">
<div style="height: 1.6em; font-weight: bold; font-size: 105%; background-color: #efefef;"><b><a href="/Modding" title="Modding">Modding</a></b></div>
<div style="font-size:0.9em;">
<table style="font-size: 11px; margin: 0px 0px -2px -2px; width: 100%;">

<tbody><tr>
<td style="width: 15%; background: #EDEDED; font-weight: bold; text-align: right; padding: 2px 5px;">Documentation
</td>
<td style="text-align: left; padding: 2px 5px;"><a href="/Effects" title="Effects">Effects</a> • <a href="/Triggers" title="Triggers">Triggers</a> • <a href="/Modifier_list" title="Modifier list">Modifiers</a> • <a href="/Scopes" title="Scopes">Scopes</a> • <a href="/index.php?title=Variables&amp;action=edit&amp;redlink=1" class="new" title="Variables (page does not exist)">Variables</a> • <a href="/index.php?title=Data_types&amp;action=edit&amp;redlink=1" class="new" title="Data types (page does not exist)">Data types</a> • <a href="/Localization" title="Localization">Localization</a> • <a href="/index.php?title=Customizable_localization&amp;action=edit&amp;redlink=1" class="new" title="Customizable localization (page does not exist)">Customizable localization</a>
</td></tr></tbody></table>
<table style="font-size: 11px; margin: 0px 0px -2px -2px; width: 100%;">

<tbody><tr>
<td style="width: 15%; background: #EDEDED; font-weight: bold; text-align: right; padding: 2px 5px;">Scripting
</td>
<td style="text-align: left; padding: 2px 5px;"><a href="/index.php?title=AI_modding&amp;action=edit&amp;redlink=1" class="new" title="AI modding (page does not exist)">AI</a> • <a href="/Bookmarks_modding" title="Bookmarks modding">Bookmarks</a> • <a href="/Characters_modding" title="Characters modding">Characters</a> • <a class="mw-selflink selflink">Commands</a> • <a href="/index.php?title=Council_modding&amp;action=edit&amp;redlink=1" class="new" title="Council modding (page does not exist)">Council</a> • <a href="/Culture_modding" title="Culture modding">Culture</a> • <a href="/Decisions_modding" title="Decisions modding">Decisions</a> • <a href="/Dynasties_modding" title="Dynasties modding">Dynasties</a> • <a href="/Event_modding" title="Event modding">Events</a> • <a href="/index.php?title=Governments_modding&amp;action=edit&amp;redlink=1" class="new" title="Governments modding (page does not exist)">Governments</a> • <a href="/History_modding" title="History modding">History</a> • <a href="/index.php?title=Holdings_modding&amp;action=edit&amp;redlink=1" class="new" title="Holdings modding (page does not exist)">Holdings</a> • <a href="/index.php?title=Lifestyles_modding&amp;action=edit&amp;redlink=1" class="new" title="Lifestyles modding (page does not exist)">Lifestyles</a> • <a href="/index.php?title=Regiments_modding&amp;action=edit&amp;redlink=1" class="new" title="Regiments modding (page does not exist)">Regiments</a> • <a href="/Religions_modding" title="Religions modding">Religions</a> • <a href="/index.php?title=Story_cycles_modding&amp;action=edit&amp;redlink=1" class="new" title="Story cycles modding (page does not exist)">Story cycles</a> • <a href="/Title_modding" title="Title modding">Titles</a> • <a href="/Trait_modding" title="Trait modding">Traits</a>
</td></tr></tbody></table>
<table style="font-size: 11px; margin: 0px 0px -2px -2px; width: 100%;">

<tbody><tr>
<td style="width: 15%; background: #EDEDED; font-weight: bold; text-align: right; padding: 2px 5px;">Map
</td>
<td style="text-align: left; padding: 2px 5px;"><a href="/Map_modding" title="Map modding">Map</a> • <a href="/index.php?title=Terrain_modding&amp;action=edit&amp;redlink=1" class="new" title="Terrain modding (page does not exist)">Terrain</a>
</td></tr></tbody></table>
<table style="font-size: 11px; margin: 0px 0px -2px -2px; width: 100%;">

<tbody><tr>
<td style="width: 15%; background: #EDEDED; font-weight: bold; text-align: right; padding: 2px 5px;">Graphics
</td>
<td style="text-align: left; padding: 2px 5px;"><a href="/3D_models" title="3D models">3D models</a> • <a href="/Exporters" title="Exporters">Exporters</a> • <a href="/Interface" title="Interface">Interface</a> • <a href="/Coat_of_arms_modding" title="Coat of arms modding">Coat of arms</a> • <a href="/index.php?title=Graphical_assets&amp;action=edit&amp;redlink=1" class="new" title="Graphical assets (page does not exist)">Graphical assets</a> • <a href="/index.php?title=Fonts&amp;action=edit&amp;redlink=1" class="new" title="Fonts (page does not exist)">Fonts</a> • <a href="/index.php?title=Particles&amp;action=edit&amp;redlink=1" class="new" title="Particles (page does not exist)">Particles</a> • <a href="/index.php?title=Shaders&amp;action=edit&amp;redlink=1" class="new" title="Shaders (page does not exist)">Shaders</a> • <a href="/index.php?title=Unit_models&amp;action=edit&amp;redlink=1" class="new" title="Unit models (page does not exist)">Unit models</a>
</td></tr></tbody></table>
<table style="font-size: 11px; margin: 0px 0px -2px -2px; width: 100%;">

<tbody><tr>
<td style="width: 15%; background: #EDEDED; font-weight: bold; text-align: right; padding: 2px 5px;">Audio
</td>
<td style="text-align: left; padding: 2px 5px;"><a href="/index.php?title=Music_modding&amp;action=edit&amp;redlink=1" class="new" title="Music modding (page does not exist)">Music</a> • <a href="/index.php?title=Sound_modding&amp;action=edit&amp;redlink=1" class="new" title="Sound modding (page does not exist)">Sound</a>
</td></tr></tbody></table>
<table style="font-size: 11px; margin: 0px 0px -2px -2px; width: 100%;">

<tbody><tr>
<td style="width: 15%; background: #EDEDED; font-weight: bold; text-align: right; padding: 2px 5px;">Other
</td>
<td style="text-align: left; padding: 2px 5px;"><a href="/Console_commands" title="Console commands">Console commands</a> • <a href="/Checksum" class="mw-redirect" title="Checksum">Checksum</a> • <a href="/Mod_structure" title="Mod structure">Mod structure</a> • <a href="/index.php?title=Mod_troubleshooting&amp;action=edit&amp;redlink=1" class="new" title="Mod troubleshooting (page does not exist)">Troubleshooting</a>
</td></tr></tbody></table>
</div></div>

<!--
NewPP limit report
Cached time: 20201130023318
Cache expiry: 86400
Dynamic content: false
CPU time usage: 0.084 seconds
Real time usage: 0.091 seconds
Preprocessor visited node count: 178/1000000
Preprocessor generated node count: 1235/1000000
Post‐expand include size: 11619/2097152 bytes
Template argument size: 4854/2097152 bytes
Highest expansion depth: 8/40
Expensive parser function count: 0/100
Unstrip recursion depth: 0/20
Unstrip post‐expand size: 0/5000000 bytes
-->
<!--
Transclusion expansion time report (%,ms,calls,template)
100.00%   17.581      1 -total
 43.01%    7.562      1 Template:Merge
 41.84%    7.356      1 Template:Modding_navbox
 31.85%    5.599      1 Template:Navbox
 31.18%    5.482      1 Template:Ambox
 18.56%    3.263      1 Template:Ambox/core
 13.56%    2.384      1 Template:Version
 10.93%    1.922      6 Template:Navboxgroup
  7.87%    1.383      1 Template:Clear
-->

<!-- Saved in parser cache with key wiki_ck3-wmckiii_beta_:pcache:idhash:1302-0!canonical and timestamp 20201130023317 and revision id 10018
 -->
</div></div>                        <div class="printfooter">
                            Retrieved from "<a dir="ltr" href="https://ck3.paradoxwikis.com/index.php?title=Commands&amp;oldid=10018">https://ck3.paradoxwikis.com/index.php?title=Commands&amp;oldid=10018</a>"                        </div>
                    <div id="catlinks" class="catlinks" data-mw="interface"><div id="mw-normal-catlinks" class="mw-normal-catlinks"><a href="/Special:Categories" title="Special:Categories">Categories</a>: <ul><li><a href="/Category:Potentially_outdated" title="Category:Potentially outdated">Potentially outdated</a></li><li><a href="/Category:1.0" title="Category:1.0">1.0</a></li><li><a href="/Category:To_be_merged" title="Category:To be merged">To be merged</a></li><li><a href="/Category:Modding" title="Category:Modding">Modding</a></li></ul></div></div>                    <div class="visualClear"></div>
                                    </div>
            </div>
        </div>
				<div id="footer" role="contentinfo">
						<ul id="footer-info">
								<li id="footer-info-lastmod"> This page was last edited on 18 October 2020, at 19:26.</li>
								<li id="footer-info-copyright">Content is available under <a href="https://central.paradoxwikis.com/Central:Copyrights" class="extiw" title="central:Central:Copyrights">Attribution-ShareAlike 3.0</a> unless otherwise noted.</li>
							</ul>
						<ul id="footer-places">
								<li id="footer-places-about"><a href="https://central.paradoxwikis.com/Central:About" class="extiw" title="central:Central:About">About CK3 Wiki</a></li>
								<li id="footer-places-mainpage"><a href="/Crusader_Kings_III_Wiki" title="Crusader Kings III Wiki">Crusader Kings III Wiki</a></li>
								<li id="footer-places-paradoxwiki"><a href="https://paradoxwikis.com/" class="extiw" title="paradoxwiki:">Paradox Wikis</a></li>
								<li id="footer-places-legal_pp"><a href="https://legal.paradoxplaza.com/privacy?locale=en">Privacy Policy</a></li>
								<li id="footer-places-mobileview"><a href="https://ck3.paradoxwikis.com/index.php?title=Commands&amp;mobileaction=toggle_view_mobile" class="noprint stopMobileRedirectToggle">Mobile view</a></li>
							</ul>
										<ul id="footer-icons" class="noprint">
										<li id="footer-copyrightico">
						<a href="https://creativecommons.org/licenses/by-sa/3.0/"><img src="https://licensebuttons.net/l/by-sa/3.0/88x31.png" alt="Attribution-ShareAlike 3.0" width="88" height="31"/></a>					</li>
										<li id="footer-poweredbyico">
						<a href="//www.mediawiki.org/"><img src="/resources/assets/poweredby_mediawiki_88x31.png" alt="Powered by MediaWiki" srcset="/resources/assets/poweredby_mediawiki_132x47.png 1.5x, /resources/assets/poweredby_mediawiki_176x62.png 2x" width="88" height="31"/></a>					</li>
									</ul>
						<div style="clear: both;"></div>
		</div>

<script>(window.RLQ=window.RLQ||[]).push(function(){mw.config.set({"wgPageParseReport":{"limitreport":{"cputime":"0.084","walltime":"0.091","ppvisitednodes":{"value":178,"limit":1000000},"ppgeneratednodes":{"value":1235,"limit":1000000},"postexpandincludesize":{"value":11619,"limit":2097152},"templateargumentsize":{"value":4854,"limit":2097152},"expansiondepth":{"value":8,"limit":40},"expensivefunctioncount":{"value":0,"limit":100},"unstrip-depth":{"value":0,"limit":20},"unstrip-size":{"value":0,"limit":5000000},"timingprofile":["100.00%   17.581      1 -total"," 43.01%    7.562      1 Template:Merge"," 41.84%    7.356      1 Template:Modding_navbox"," 31.85%    5.599      1 Template:Navbox"," 31.18%    5.482      1 Template:Ambox"," 18.56%    3.263      1 Template:Ambox/core"," 13.56%    2.384      1 Template:Version"," 10.93%    1.922      6 Template:Navboxgroup","  7.87%    1.383      1 Template:Clear"]},"cachereport":{"timestamp":"20201130023318","ttl":86400,"transientcontent":false}}});});</script>
<!-- Google Tag Manager (added by extension GoogleTagManager) -->
<noscript><iframe src="//www.googletagmanager.com/ns.html?id=GTM-5QW7SS"
height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'//www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-5QW7SS');</script>
<!-- End Google Tag Manager -->
<script>(window.RLQ=window.RLQ||[]).push(function(){mw.config.set({"wgBackendResponseTime":50});});</script>
		<div class="footer pdx_footer"><div class="footer-container content grid ts-inner"><div class="footer__logo footer-item"><div class="content-asset"><div class="footer__logo-image"><img src="https://www.paradoxplaza.com/on/demandware.static/Sites-Paradox_US-Site/-/en_US/images/footer-master-logo.png"/></div></div></div><div class="footer__games footer-item"><div class="content-asset"><div class="footer_section_title">Games</div><ul class="footer__menu"><li class="footer__menu_link"><a href="https://www.paradoxplaza.com/games/" title="Browse">Browse</a></li><li class="footer__menu_link"><a href="https://www.paradoxplaza.com/new-releases/" title="New Releases">New Releases</a></li><li class="footer__menu_link"><a href="https://www.paradoxplaza.com/coming-soon/" title="Coming Soon">Coming Soon</a></li><li class="footer__menu_link"><a href="https://www.paradoxplaza.com/on-sale/" title="On Sale">On Sale</a></li><li class="footer__menu_link"><a href="https://play.paradoxplaza.com/" title="Paradox Launcher">Play on Paradox technology</a></li></ul></div></div><div class="footer__community footer-item"><div class="content-asset"><div class="footer_section_title">Community</div><ul class="footer__menu"><li class="footer__menu_link"><a href="https://forum.paradoxplaza.com/forum/index.php" title="Paradox Forums">Paradox Forums</a></li><li class="footer__menu_link"><a href="https://paradoxwikis.com/" title="Paradox Wikis">Paradox Wikis</a></li><li class="footer__menu_link"><a href="https://www.paradoxplaza.com/support-static-info-ca.html" title="Support">Support</a></li><li class="footer__menu_link"><a href="http://merch.paradoxplaza.com/" title="Merch">Merch</a></li></ul></div></div><div class="footer__about footer-item"><div class="content-asset"><div class="footer_section_title">About</div><ul class="footer__menu"><li class="footer__menu_link"><a href="https://www.paradoxplaza.com/news" title="News">News</a></li><li class="footer__menu_link"><a href="https://www.paradoxplaza.com/about-us-static-info-ca.html" title="About us">About us</a></li><li class="footer__menu_link"><a href="http://career.paradoxplaza.com/" title="Careers">Careers</a></li><li class="footer__menu_link"><a href="https://www.paradoxplaza.com/playtest-static-info-ca.html" title="Join our playtests">Join our playtests</a></li><li class="footer__menu_link"><a href="https://www.paradoxplaza.com/press-static-info-ca.html" title="Media contact">Media contact</a></li></ul></div></div><div class="footer__socialmedia footer-item"><div class="content-asset"><div class="footer_section_title">Social Media</div><ul class="footer__socialmedia-icons"><li class="footer__social-icon"><a href="https://www.facebook.com/ParadoxInteractive" target="_blank"><span class="icon icon-facebook-with-circle"></span></a></li><li class="footer__social-icon"><a href="https://twitter.com/PdxInteractive" target="_blank"><span class="icon icon-twitter-with-circle"></span></a></li><li class="footer__social-icon"><a href="https://www.youtube.com/user/Paradoxplaza" target="_blank"><span class="icon icon-youtube-with-circle"></span></a></li><li class="footer__social-icon"><a href="https://www.twitch.tv/paradoxinteractive" target="_blank"><span class="icon icon-twitch-with-circle"></span></a></li><li class="footer__social-icon"><a href="https://www.instagram.com/explore/locations/241319129/paradox-interactive/" target="_blank"><span class="icon icon-instagram-with-circle"></span></a></li><li class="footer__social-icon"><a href="https://open.spotify.com/artist/75N2nC2KNgaQ1e6bGs0wyc" target="_blank"><span class="icon icon-spotify-with-circle"></span></a></li></ul></div><div class="hide-for-small"><div class="content-asset"><ul class="footer__menu"><li class="footer__menu_link-small"><a href="https://legal.paradoxplaza.com/" title="Terms &amp; Policies">Terms & Policies</a></li><li class="footer__menu_link-small"><a href="https://www.paradoxplaza.com/legal-static-info-ca.html" title="Legal Information">Legal Information</a></li><li class="footer__menu_link-small"><a href="https://ec.europa.eu/consumers/odr/main/index.cfm?event=main.home.chooseLanguage" title="EU Online Dispute Resolution">EU Online Dispute Resolution</a></li><li class="footer__menu_link-small"><a href="https://www.paradoxplaza.com/faq-static-info-ca.html" title="Frequently Asked Questions">Frequently Asked Questions</a></li><li class="footer__menu_link-small"><a href="http://www.paradoxinteractive.com/" title="Paradox Interactive corporate website">Paradox Interactive corporate website</a></li></ul></div></div></div><div class="footer__legal footer-item show-for-small"><div class="content-asset"><ul class="footer__menu"><li class="footer__menu_link-small"><a href="https://legal.paradoxplaza.com/" title="Terms &amp; Policies">Terms & Policies</a></li><li class="footer__menu_link-small"><a href="https://www.paradoxplaza.com/legal-static-info-ca.html" title="Legal Information">Legal Information</a></li><li class="footer__menu_link-small"><a href="https://ec.europa.eu/consumers/odr/main/index.cfm?event=main.home.chooseLanguage" title="EU Online Dispute Resolution">EU Online Dispute Resolution</a></li><li class="footer__menu_link-small"><a href="https://www.paradoxplaza.com/faq-static-info-ca.html" title="Frequently Asked Questions">Frequently Asked Questions</a></li><li class="footer__menu_link-small"><a href="http://www.paradoxinteractive.com/" title="Paradox Interactive corporate website">Paradox Interactive corporate website</a></li></ul></div></div></div></div>
	</body>
</html>

`

var globalEffectsArray = processEffectsWiki(effectsWiki)
globalEffectsArray = removeDuplicates(globalEffectsArray);
