let globalEffectsList = [

]

function parseWikipedia(wikipedia) {
  let entryRegEx = /\<tr\>[\w\s\d\{\}\<\>\,\_\-\=\+]+<\/tr>/gi
  let entryRegEx2 = /\<td\>[\w\s\d\n\{\}\<\>\,\.\!\_\-\=\+\\\/\'\"\&]+<\/td>/gi
  let arr = wikipedia.split(`\n`);
  let n = 0;
  let objectArr = [];
  let o = {
    effectName: ``,
    description: ``,
    usage: ``,
    supportedScopes: ``,
    supportedTargets: ``,
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
        o.usage += `${arr[i]}`
      } else if (n === 3) {
        o.supportedScopes += `${arr[i]}`
      } else if (n === 4) {
        o.supportedTargets += `${arr[i]}`
      }
    }
    if (arr[i].includes("</td>")) {
      n += 1;
    }

    if (arr[i].includes("</tr>")) {
      eating = false;
      n = 0;
      o.code = o.usage;
      if (o.effectName.includes("every") || o.effectName.includes("ordered") || o.effectName.includes("random") ) {

      } else {
        objectArr.push(o);
      }
      o = {
        effectName: ``,
        description: ``,
        usage: ``,
        supportedScopes: ``,
        supportedTargets: ``,
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
  for (let i = 0; i < objectArr.length; i++) {

      t += `
      <div class="component-edit-input tooltip">
        <div class="component-edit-input-label">
          ${objectArr[i].effectName}
        </div>

        <div class="component-edit-input-label">
          <span class="tooltiptext">${objectArr[i].description}\nExample:\n${objectArr[i].usage}\nSupported Scopes: ${objectArr[i].supportedScopes}\nSupported targets: ${objectArr[i].supportedTargets}</span>
          <input class="component-option" name=""${objectArr[i].effectName}" id="${objectArr[i].effectName}">
        </div>
      </div>
      `

  }
  GID("immediate-block").innerHTML += t;
  return objectArr;

  /*
  let newObjects = [];
  let n = 0;
  let o = {};
  o.unfiltered = [];
  for (let i = 0; i < arr.length; i++) {
    o.unfiltered.push(arr[i])
    n += 1;
    if (n === 4) {
      newObjects.push(o);
      n = 0;
      o = {
        unfiltered: []
      };
    }
    console.log(newObjects);
  }
  */
}



let wikipedia = `

<!DOCTYPE html>
<html class="client-nojs" lang="en" dir="ltr">
<head>
<meta charset="UTF-8"/>
<title>Effects - CK3 Wiki</title>
<script>document.documentElement.className = document.documentElement.className.replace( /(^|\s)client-nojs(\s|$)/, "$1client-js$2" );</script>
<script>(window.RLQ=window.RLQ||[]).push(function(){mw.config.set({"wgCanonicalNamespace":"","wgCanonicalSpecialPageName":false,"wgNamespaceNumber":0,"wgPageName":"Effects","wgTitle":"Effects","wgCurRevisionId":10088,"wgRevisionId":10088,"wgArticleId":1277,"wgIsArticle":true,"wgIsRedirect":false,"wgAction":"view","wgUserName":null,"wgUserGroups":["*"],"wgCategories":["Potentially outdated","1.0","Modding"],"wgBreakFrames":false,"wgPageContentLanguage":"en","wgPageContentModel":"wikitext","wgSeparatorTransformTable":["",""],"wgDigitTransformTable":["",""],"wgDefaultDateFormat":"dmy","wgMonthNames":["","January","February","March","April","May","June","July","August","September","October","November","December"],"wgMonthNamesShort":["","Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],"wgRelevantPageName":"Effects","wgRelevantArticleId":1277,"wgRequestId":"988afbedc80d5eabfce5cc11","wgCSPNonce":false,"wgIsProbablyEditable":true,"wgRelevantPageIsProbablyEditable":true,"wgRestrictionEdit":[],"wgRestrictionMove":[],"wgMFExpandAllSectionsUserOption":true,"wgMFEnableFontChanger":true,"wgMFDisplayWikibaseDescriptions":{"search":false,"nearby":false,"watchlist":false,"tagline":false},"wgMediaViewerOnClick":true,"wgMediaViewerEnabledByDefault":true,"wgWikiEditorEnabledModules":[],"wgCategoryTreePageCategoryOptions":"{\"mode\":0,\"hideprefix\":20,\"showcount\":true,\"namespaces\":false}"});mw.loader.state({"site.styles":"ready","noscript":"ready","user.styles":"ready","user":"ready","user.options":"ready","user.tokens":"loading","mediawiki.legacy.shared":"ready","mediawiki.legacy.commonPrint":"ready","mediawiki.toc.styles":"ready","mediawiki.skinning.interface":"ready","skins.vector.styles":"ready"});mw.loader.implement("user.tokens@0tffind",function($,jQuery,require,module){/*@nomin*/mw.user.tokens.set({"editToken":"+\\","patrolToken":"+\\","watchToken":"+\\","csrfToken":"+\\"});
});RLPAGEMODULES=["site","mediawiki.page.startup","mediawiki.user","mediawiki.page.ready","jquery.tablesorter","mediawiki.toc","mediawiki.searchSuggest","ext.lazyload","skins.vector.js"];mw.loader.load(RLPAGEMODULES);});</script>
<link rel="stylesheet" href="/load.php?debug=false&amp;lang=en&amp;modules=mediawiki.legacy.commonPrint%2Cshared%7Cmediawiki.skinning.interface%7Cmediawiki.toc.styles%7Cskins.vector.styles&amp;only=styles&amp;skin=vector"/>
<script async="" src="/load.php?debug=false&amp;lang=en&amp;modules=startup&amp;only=scripts&amp;skin=vector"></script>
<meta name="ResourceLoaderDynamicStyles" content=""/>
<link rel="stylesheet" href="/load.php?debug=false&amp;lang=en&amp;modules=site.styles&amp;only=styles&amp;skin=vector"/>
<meta name="generator" content="MediaWiki 1.32.0"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=yes"/>
<link rel="alternate" type="application/x-wiki" title="Edit" href="/index.php?title=Effects&amp;action=edit"/>
<link rel="edit" title="Edit" href="/index.php?title=Effects&amp;action=edit"/>
<link rel="shortcut icon" href="/favicon.ico"/>
<link rel="search" type="application/opensearchdescription+xml" href="/opensearch_desc.php" title="CK3 Wiki (en)"/>
<link rel="EditURI" type="application/rsd+xml" href="https://ck3.paradoxwikis.com/api.php?action=rsd"/>
<link rel="license" href="https://central.paradoxwikis.com/Central:Copyrights"/>
<link rel="alternate" type="application/atom+xml" title="CK3 Wiki Atom feed" href="/index.php?title=Special:RecentChanges&amp;feed=atom"/>
<!--[if lt IE 9]><script src="/load.php?debug=false&amp;lang=en&amp;modules=html5shiv&amp;only=scripts&amp;skin=vector&amp;sync=1"></script><![endif]-->
</head>
<body class="mediawiki ltr sitedir-ltr mw-hide-empty-elt ns-0 ns-subject page-Effects rootpage-Effects skin-vector action-view">
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
                            <a class="pdx_dropdownTrigger">Log in</a><div class="pdx_dropdown"><ul><li id="pt-anontalk"><a href="/Special:MyTalk" title="Discussion about edits from this IP address [n]" accesskey="n">Talk</a></li><li id="pt-anoncontribs"><a href="/Special:MyContributions" title="A list of edits made from this IP address [y]" accesskey="y">Contributions</a></li><li id="pt-login"><a href="/index.php?title=Special:UserLogin&amp;returnto=Effects" title="You are encouraged to log in; however, it is not mandatory [o]" accesskey="o">Log in</a></li></ul></div>
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
							<li id="ca-nstab-main" class="selected"><span><a href="/Effects" title="View the content page [c]" accesskey="c">Page</a></span></li><li id="ca-talk" class="new"><span><a href="/index.php?title=Talk:Effects&amp;action=edit&amp;redlink=1" rel="discussion" title="Discussion about the content page (page does not exist) [t]" accesskey="t">Discussion</a></span></li>						</ul>
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
							<li id="ca-view" class="collapsible selected"><span><a href="/Effects">Read</a></span></li><li id="ca-edit" class="collapsible"><span><a href="/index.php?title=Effects&amp;action=edit" title="Edit this page [e]" accesskey="e">Edit</a></span></li><li id="ca-history" class="collapsible"><span><a href="/index.php?title=Effects&amp;action=history" title="Past revisions of this page [h]" accesskey="h">View history</a></span></li>						</ul>
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
					<li id="t-whatlinkshere"><a href="/Special:WhatLinksHere/Effects" title="A list of all wiki pages that link here [j]" accesskey="j">What links here</a></li><li id="t-recentchangeslinked"><a href="/Special:RecentChangesLinked/Effects" rel="nofollow" title="Recent changes in pages linked from this page [k]" accesskey="k">Related changes</a></li><li id="t-specialpages"><a href="/Special:SpecialPages" title="A list of all special pages [q]" accesskey="q">Special pages</a></li><li id="t-print"><a href="/index.php?title=Effects&amp;printable=yes" rel="alternate" title="Printable version of this page [p]" accesskey="p">Printable version</a></li><li id="t-permalink"><a href="/index.php?title=Effects&amp;oldid=10088" title="Permanent link to this revision of the page">Permanent link</a></li><li id="t-info"><a href="/index.php?title=Effects&amp;action=info" title="More information about this page">Page information</a></li>				</ul>
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
<h1 id="firstHeading" class="firstHeading" lang="en">Effects</h1>                <div id="bodyContent" class="mw-body-content">
                    <div id="siteSub" class="noprint">From CK3 Wiki</div>                    <div id="contentSub"></div>
                    <div id="jump-to-nav"></div>                    <a class="mw-jump-link" href="#mw-head">Jump to navigation</a>
                    <a class="mw-jump-link" href="#p-search">Jump to search</a>
                    <div id="mw-content-text" lang="en" dir="ltr" class="mw-content-ltr"><link rel="stylesheet" href="https://d25yha10orzq01.cloudfront.net/cookie-widget/cookie-widget.css" media="all"><script src="//d25yha10orzq01.cloudfront.net/cookie-widget/cookie-widget_new_v2.js?v=125" defer></script><div class="mw-parser-output"><div class="eu4box metadata ambox ambox-content mbox-text" style="float:right; clear:right; width:330px; font-size:80%;">
<p>Please help with verifying or updating older sections of this article.<br />At least some were last verified for <a href="/CK3_Wiki:Versioning" class="mw-redirect" title="CK3 Wiki:Versioning">version</a> 1.0.
</p>
</div>
<p><b>Effects</b>, also known as <b>commands</b>, are using in <a href="/Scripting" title="Scripting">scripting</a> to alter the target that was selected via <a href="/Scope" class="mw-redirect" title="Scope">scopes</a> and <a href="/Condition" class="mw-redirect" title="Condition">conditions</a>. They are also able to iterate through lists. They appear in command blocks, such as the <i>immediate</i> and <i>option</i> sections of <a href="/Event_modding" title="Event modding">events</a>, as well as in <a href="/Scripted_effect" class="mw-redirect" title="Scripted effect">scripted effects</a> which can group commands into reusable macros. Scripting commands are different from <a href="/Console_commands" title="Console commands">console commands</a>, though there may be equivalents between the two. Available effects depend on the current scope.
</p>
<div id="toc" class="toc"><input type="checkbox" role="button" id="toctogglecheckbox" class="toctogglecheckbox" style="display:none" /><div class="toctitle" lang="en" dir="ltr"><h2>Contents</h2><span class="toctogglespan"><label class="toctogglelabel" for="toctogglecheckbox"></label></span></div>
<ul>
<li class="toclevel-1 tocsection-1"><a href="#List_of_effects"><span class="tocnumber">1</span> <span class="toctext">List of effects</span></a>
<ul>
<li class="toclevel-2 tocsection-2"><a href="#From_war_scope"><span class="tocnumber">1.1</span> <span class="toctext">From war scope</span></a></li>
<li class="toclevel-2 tocsection-3"><a href="#From_story_cycle_scope"><span class="tocnumber">1.2</span> <span class="toctext">From story cycle scope</span></a></li>
<li class="toclevel-2 tocsection-4"><a href="#From_secret_scope"><span class="tocnumber">1.3</span> <span class="toctext">From secret scope</span></a></li>
<li class="toclevel-2 tocsection-5"><a href="#From_scheme_scope"><span class="tocnumber">1.4</span> <span class="toctext">From scheme scope</span></a></li>
<li class="toclevel-2 tocsection-6"><a href="#From_religion_scope"><span class="tocnumber">1.5</span> <span class="toctext">From religion scope</span></a></li>
<li class="toclevel-2 tocsection-7"><a href="#From_province_scope"><span class="tocnumber">1.6</span> <span class="toctext">From province scope</span></a></li>
<li class="toclevel-2 tocsection-8"><a href="#From_landed_title_scope"><span class="tocnumber">1.7</span> <span class="toctext">From landed title scope</span></a></li>
<li class="toclevel-2 tocsection-9"><a href="#From_holy_order_scope"><span class="tocnumber">1.8</span> <span class="toctext">From holy order scope</span></a></li>
<li class="toclevel-2 tocsection-10"><a href="#From_dynasty_scope"><span class="tocnumber">1.9</span> <span class="toctext">From dynasty scope</span></a></li>
<li class="toclevel-2 tocsection-11"><a href="#From_dynasty_house_scope"><span class="tocnumber">1.10</span> <span class="toctext">From dynasty house scope</span></a></li>
<li class="toclevel-2 tocsection-12"><a href="#From_culture_scope"><span class="tocnumber">1.11</span> <span class="toctext">From culture scope</span></a></li>
<li class="toclevel-2 tocsection-13"><a href="#From_character_scope"><span class="tocnumber">1.12</span> <span class="toctext">From character scope</span></a>
<ul>
<li class="toclevel-3 tocsection-14"><a href="#Standard"><span class="tocnumber">1.12.1</span> <span class="toctext">Standard</span></a></li>
<li class="toclevel-3 tocsection-15"><a href="#Beginning_with_.27every.27"><span class="tocnumber">1.12.2</span> <span class="toctext">Beginning with 'every'</span></a></li>
<li class="toclevel-3 tocsection-16"><a href="#Beginning_with_.27ordered.27"><span class="tocnumber">1.12.3</span> <span class="toctext">Beginning with 'ordered'</span></a></li>
<li class="toclevel-3 tocsection-17"><a href="#Beginning_with_.27random.27"><span class="tocnumber">1.12.4</span> <span class="toctext">Beginning with 'random'</span></a></li>
</ul>
</li>
<li class="toclevel-2 tocsection-18"><a href="#From_faction_scope"><span class="tocnumber">1.13</span> <span class="toctext">From faction scope</span></a></li>
<li class="toclevel-2 tocsection-19"><a href="#From_faith_scope"><span class="tocnumber">1.14</span> <span class="toctext">From faith scope</span></a></li>
<li class="toclevel-2 tocsection-20"><a href="#From_activity_scope"><span class="tocnumber">1.15</span> <span class="toctext">From activity scope</span></a></li>
<li class="toclevel-2 tocsection-21"><a href="#From_army_scope"><span class="tocnumber">1.16</span> <span class="toctext">From army scope</span></a></li>
<li class="toclevel-2 tocsection-22"><a href="#From_great_holy_war_scope"><span class="tocnumber">1.17</span> <span class="toctext">From great holy war scope</span></a></li>
<li class="toclevel-2 tocsection-23"><a href="#From_combat_side_scope"><span class="tocnumber">1.18</span> <span class="toctext">From combat side scope</span></a></li>
<li class="toclevel-2 tocsection-24"><a href="#From_casus_belli_scope"><span class="tocnumber">1.19</span> <span class="toctext">From casus belli scope</span></a></li>
<li class="toclevel-2 tocsection-25"><a href="#Shared.2Fother"><span class="tocnumber">1.20</span> <span class="toctext">Shared/other</span></a></li>
</ul>
</li>
</ul>
</div>

<h2><span class="mw-headline" id="List_of_effects">List of effects</span><span class="mw-editsection"><span class="mw-editsection-bracket">[</span><a href="/index.php?title=Effects&amp;action=edit&amp;section=1" title="Edit section: List of effects">edit</a><span class="mw-editsection-bracket">]</span></span></h2>
<p>Note that this list has been generated programmatically from the output of the "script_docs" console command. Using script_docs, effects supported from multiple scopes are given as being supported from "none" scope only, but this is probably not the case.
</p>
<h3><span class="mw-headline" id="From_war_scope">From war scope</span><span class="mw-editsection"><span class="mw-editsection-bracket">[</span><a href="/index.php?title=Effects&amp;action=edit&amp;section=2" title="Edit section: From war scope">edit</a><span class="mw-editsection-bracket">]</span></span></h3>
<p>The following effects are only usable in the war scope.
</p>
<table class="wikitable sortable" width="100%">
<tbody><tr>
<th width="15%">Name
</th>
<th width="15%">Description
</th>
<th width="25%">Usage
</th>
<th width="20%">Supported scopes
</th>
<th width="20%">Supported targets
</th></tr>
<tr>
<td>add_attacker
</td>
<td>adds the target character to the scope war as an attacker
</td>
<td>Unspecified
</td>
<td>war
</td>
<td>character
</td></tr>
<tr>
<td>add_defender
</td>
<td>adds the target character to the scope war as a defender
</td>
<td>Unspecified
</td>
<td>war
</td>
<td>character
</td></tr>
<tr>
<td>end_war
</td>
<td>ends the war with the specified winner, end_war = attacker/defender/white_peace
</td>
<td>Unspecified
</td>
<td>war
</td>
<td>
</td></tr>
<tr>
<td>every_war_attacker
</td>
<td>Iterate through all attackers in the war
</td>
<td>every_war_attacker = { limit = { &lt;triggers&gt; } &lt;effects&gt; }
</td>
<td>war
</td>
<td>character
</td></tr>
<tr>
<td>every_war_defender
</td>
<td>Iterate through all defenders in the war
</td>
<td>every_war_defender = { limit = { &lt;triggers&gt; } &lt;effects&gt; }
</td>
<td>war
</td>
<td>character
</td></tr>
<tr>
<td>every_war_participant
</td>
<td>Iterate through all participants in the war
</td>
<td>every_war_participant = { limit = { &lt;triggers&gt; } &lt;effects&gt; }
</td>
<td>war
</td>
<td>character
</td></tr>
<tr>
<td>ordered_war_attacker
</td>
<td>Iterate through all attackers in the war
</td>
<td>ordered_war_attacker = {
<p>limit = { &lt;triggers&gt; }
order_by = script_value
position = int
min = int
max = script_value
check_range_bounds = no # If you don't want an error logged if the list is smaller than the min/max
&lt;effects&gt; }
</p>
</td>
<td>war
</td>
<td>character
</td></tr>
<tr>
<td>ordered_war_defender
</td>
<td>Iterate through all defenders in the war
</td>
<td>ordered_war_defender = {
<p>limit = { &lt;triggers&gt; }
order_by = script_value
position = int
min = int
max = script_value
check_range_bounds = no # If you don't want an error logged if the list is smaller than the min/max
&lt;effects&gt; }
</p>
</td>
<td>war
</td>
<td>character
</td></tr>
<tr>
<td>ordered_war_participant
</td>
<td>Iterate through all participants in the war
</td>
<td>ordered_war_participant = {
<p>limit = { &lt;triggers&gt; }
order_by = script_value
position = int
min = int
max = script_value
check_range_bounds = no # If you don't want an error logged if the list is smaller than the min/max
&lt;effects&gt; }
</p>
</td>
<td>war
</td>
<td>character
</td></tr>
<tr>
<td>random_war_attacker
</td>
<td>Iterate through all attackers in the war
</td>
<td>random_war_attacker = { limit = { &lt;triggers&gt; } (optional) weight = { mtth } &lt;effects&gt; }
</td>
<td>war
</td>
<td>character
</td></tr>
<tr>
<td>random_war_defender
</td>
<td>Iterate through all defenders in the war
</td>
<td>random_war_defender = { limit = { &lt;triggers&gt; } (optional) weight = { mtth } &lt;effects&gt; }
</td>
<td>war
</td>
<td>character
</td></tr>
<tr>
<td>random_war_participant
</td>
<td>Iterate through all participants in the war
</td>
<td>random_war_participant = { limit = { &lt;triggers&gt; } (optional) weight = { mtth } &lt;effects&gt; }
</td>
<td>war
</td>
<td>character
</td></tr>
<tr>
<td>remove_participant
</td>
<td>removes the target character from the scope war
</td>
<td>Unspecified
</td>
<td>war
</td>
<td>character
</td></tr>
<tr>
<td>set_called_to
</td>
<td>sets the target character as already called to the scope war
</td>
<td>Unspecified
</td>
<td>war
</td>
<td>character
</td></tr>
<tr>
<td>set_casus_belli
</td>
<td>sets the casus belli of the scope war
</td>
<td>Unspecified
</td>
<td>war
</td>
<td>
</td></tr></tbody></table>
<h3><span class="mw-headline" id="From_story_cycle_scope">From story cycle scope</span><span class="mw-editsection"><span class="mw-editsection-bracket">[</span><a href="/index.php?title=Effects&amp;action=edit&amp;section=3" title="Edit section: From story cycle scope">edit</a><span class="mw-editsection-bracket">]</span></span></h3>
<p>The following effects are only usable in the story cycle scope.
</p>
<table class="wikitable sortable" width="100%">
<tbody><tr>
<th width="15%">Name
</th>
<th width="15%">Description
</th>
<th width="25%">Usage
</th>
<th width="20%">Supported scopes
</th>
<th width="20%">Supported targets
</th></tr>
<tr>
<td>end_story
</td>
<td>Ends a story and executes it's on_end effect, the story can no longer be accessed after this
</td>
<td>Unspecified
</td>
<td>story cycle
</td>
<td>
</td></tr>
<tr>
<td>make_story_owner
</td>
<td>makes the character the new owner of the story
</td>
<td>make_story_owner = character_target
</td>
<td>story cycle
</td>
<td>character
</td></tr></tbody></table>
<h3><span class="mw-headline" id="From_secret_scope">From secret scope</span><span class="mw-editsection"><span class="mw-editsection-bracket">[</span><a href="/index.php?title=Effects&amp;action=edit&amp;section=4" title="Edit section: From secret scope">edit</a><span class="mw-editsection-bracket">]</span></span></h3>
<p>The following effects are only usable in the secret scope.
</p>
<table class="wikitable sortable" width="100%">
<tbody><tr>
<th width="15%">Name
</th>
<th width="15%">Description
</th>
<th width="25%">Usage
</th>
<th width="20%">Supported scopes
</th>
<th width="20%">Supported targets
</th></tr>
<tr>
<td>add_secret_participant
</td>
<td>Adds an participant to the secret
</td>
<td>Unspecified
</td>
<td>secret
</td>
<td>character
</td></tr>
<tr>
<td>disable_exposure_by
</td>
<td>Forbids the target character from exposing the secret
</td>
<td>disable_exposure_by = target_character
</td>
<td>secret
</td>
<td>character
</td></tr>
<tr>
<td>every_secret_knower
</td>
<td>Iterate through all characters who know the secret
</td>
<td>every_secret_knower = { limit = { &lt;triggers&gt; } &lt;effects&gt; }
</td>
<td>secret
</td>
<td>character
</td></tr>
<tr>
<td>every_secret_participant
</td>
<td>Iterate through participants in a secret
</td>
<td>every_secret_participant = { limit = { &lt;triggers&gt; } &lt;effects&gt; }
</td>
<td>secret
</td>
<td>character
</td></tr>
<tr>
<td>expose_secret
</td>
<td>Exposes the scope secret
</td>
<td>Unspecified
</td>
<td>secret
</td>
<td>character
</td></tr>
<tr>
<td>ordered_secret_knower
</td>
<td>Iterate through all characters who know the secret
</td>
<td>ordered_secret_knower = {
<p>limit = { &lt;triggers&gt; }
order_by = script_value
position = int
min = int
max = script_value
check_range_bounds = no # If you don't want an error logged if the list is smaller than the min/max
&lt;effects&gt; }
</p>
</td>
<td>secret
</td>
<td>character
</td></tr>
<tr>
<td>ordered_secret_participant
</td>
<td>Iterate through participants in a secret
</td>
<td>ordered_secret_participant = {
<p>limit = { &lt;triggers&gt; }
order_by = script_value
position = int
min = int
max = script_value
check_range_bounds = no # If you don't want an error logged if the list is smaller than the min/max
&lt;effects&gt; }
</p>
</td>
<td>secret
</td>
<td>character
</td></tr>
<tr>
<td>random_secret_knower
</td>
<td>Iterate through all characters who know the secret
</td>
<td>random_secret_knower = { limit = { &lt;triggers&gt; } (optional) weight = { mtth } &lt;effects&gt; }
</td>
<td>secret
</td>
<td>character
</td></tr>
<tr>
<td>random_secret_participant
</td>
<td>Iterate through participants in a secret
</td>
<td>random_secret_participant = { limit = { &lt;triggers&gt; } (optional) weight = { mtth } &lt;effects&gt; }
</td>
<td>secret
</td>
<td>character
</td></tr>
<tr>
<td>remove_secret
</td>
<td>Removes the scope secret
</td>
<td>Unspecified
</td>
<td>secret
</td>
<td>
</td></tr>
<tr>
<td>reveal_to
</td>
<td>Reveals the scope secret to the target character
</td>
<td>Unspecified
</td>
<td>secret
</td>
<td>character
</td></tr>
<tr>
<td>set_secret_owner
</td>
<td>Sets a new owner for the secret
</td>
<td>Unspecified
</td>
<td>secret
</td>
<td>character
</td></tr>
<tr>
<td>spend_by
</td>
<td>Spends the scope secret
</td>
<td>spend_by = target_character
</td>
<td>secret
</td>
<td>character
</td></tr></tbody></table>
<h3><span class="mw-headline" id="From_scheme_scope">From scheme scope</span><span class="mw-editsection"><span class="mw-editsection-bracket">[</span><a href="/index.php?title=Effects&amp;action=edit&amp;section=5" title="Edit section: From scheme scope">edit</a><span class="mw-editsection-bracket">]</span></span></h3>
<p>The following effects are only usable in the scheme scope.
</p>
<table class="wikitable sortable" width="100%">
<tbody><tr>
<th width="15%">Name
</th>
<th width="15%">Description
</th>
<th width="25%">Usage
</th>
<th width="20%">Supported scopes
</th>
<th width="20%">Supported targets
</th></tr>
<tr>
<td>add_scheme_modifier
</td>
<td>adds the specified scheme modifier, add_scheme_modifier = { type = X days = Y } (days are optional, the modifier will expire in Y days if specified)
</td>
<td>Unspecified
</td>
<td>scheme
</td>
<td>
</td></tr>
<tr>
<td>add_scheme_progress
</td>
<td>Add progress to the scope scheme. (progress is in 0.0 - 100.0 range)
</td>
<td>Unspecified
</td>
<td>scheme
</td>
<td>
</td></tr>
<tr>
<td>end_scheme
</td>
<td>Ends a specific scheme and removes it without any other effect
</td>
<td>Unspecified
</td>
<td>scheme
</td>
<td>
</td></tr>
<tr>
<td>every_scheme_agent
</td>
<td>Iterate through all agents in the scheme
</td>
<td>every_scheme_agent = { limit = { &lt;triggers&gt; } &lt;effects&gt; }
</td>
<td>scheme
</td>
<td>character
</td></tr>
<tr>
<td>expose_scheme
</td>
<td>Exposes the scheme to the defender
</td>
<td>Unspecified
</td>
<td>scheme
</td>
<td>
</td></tr>
<tr>
<td>expose_scheme_agent
</td>
<td>Exposes the target character as an agent of the current scheme
</td>
<td>Unspecified
</td>
<td>scheme
</td>
<td>character
</td></tr>
<tr>
<td>ordered_scheme_agent
</td>
<td>Iterate through all agents in the scheme
</td>
<td>ordered_scheme_agent = {
<p>limit = { &lt;triggers&gt; }
order_by = script_value
position = int
min = int
max = script_value
check_range_bounds = no # If you don't want an error logged if the list is smaller than the min/max
&lt;effects&gt; }
</p>
</td>
<td>scheme
</td>
<td>character
</td></tr>
<tr>
<td>random_scheme_agent
</td>
<td>Iterate through all agents in the scheme
</td>
<td>random_scheme_agent = { limit = { &lt;triggers&gt; } (optional) weight = { mtth } &lt;effects&gt; }
</td>
<td>scheme
</td>
<td>character
</td></tr>
<tr>
<td>remove_scheme_modifier
</td>
<td>removes the specified scheme modifier
</td>
<td>Unspecified
</td>
<td>scheme
</td>
<td>
</td></tr>
<tr>
<td>scheme_freeze_days
</td>
<td>scheme_freeze_days = X freezes the scheme for X days (0 unfreezes the scheme)
</td>
<td>Unspecified
</td>
<td>scheme
</td>
<td>
</td></tr></tbody></table>
<h3><span class="mw-headline" id="From_religion_scope">From religion scope</span><span class="mw-editsection"><span class="mw-editsection-bracket">[</span><a href="/index.php?title=Effects&amp;action=edit&amp;section=6" title="Edit section: From religion scope">edit</a><span class="mw-editsection-bracket">]</span></span></h3>
<p>The following effects are only usable in the religion scope.
</p>
<table class="wikitable sortable" width="100%">
<tbody><tr>
<th width="15%">Name
</th>
<th width="15%">Description
</th>
<th width="25%">Usage
</th>
<th width="20%">Supported scopes
</th>
<th width="20%">Supported targets
</th></tr>
<tr>
<td>every_faith
</td>
<td>Iterate through all faiths within a religion
</td>
<td>every_faith = { limit = { &lt;triggers&gt; } &lt;effects&gt; }
</td>
<td>religion
</td>
<td>faith
</td></tr>
<tr>
<td>ordered_faith
</td>
<td>Iterate through all faiths within a religion
</td>
<td>ordered_faith = {
<p>limit = { &lt;triggers&gt; }
order_by = script_value
position = int
min = int
max = script_value
check_range_bounds = no # If you don't want an error logged if the list is smaller than the min/max
&lt;effects&gt; }
</p>
</td>
<td>religion
</td>
<td>faith
</td></tr>
<tr>
<td>random_faith
</td>
<td>Iterate through all faiths within a religion
</td>
<td>random_faith = { limit = { &lt;triggers&gt; } (optional) weight = { mtth } &lt;effects&gt; }
</td>
<td>religion
</td>
<td>faith
</td></tr></tbody></table>
<h3><span class="mw-headline" id="From_province_scope">From province scope</span><span class="mw-editsection"><span class="mw-editsection-bracket">[</span><a href="/index.php?title=Effects&amp;action=edit&amp;section=7" title="Edit section: From province scope">edit</a><span class="mw-editsection-bracket">]</span></span></h3>
<p>The following effects are only usable in the province scope.
</p>
<table class="wikitable sortable" width="100%">
<tbody><tr>
<th width="15%">Name
</th>
<th width="15%">Description
</th>
<th width="25%">Usage
</th>
<th width="20%">Supported scopes
</th>
<th width="20%">Supported targets
</th></tr>
<tr>
<td>add_building
</td>
<td>Add building to the province&lt;province&gt; = { add_building = &lt;building_name&gt; }
</td>
<td>Unspecified
</td>
<td>province
</td>
<td>
</td></tr>
<tr>
<td>add_building_slot
</td>
<td>Add building slot to the province
</td>
<td>Unspecified
</td>
<td>province
</td>
<td>
</td></tr>
<tr>
<td>add_province_modifier
</td>
<td>Add a modifier to a province
</td>
<td>add_province_modifier = name
<p>add_province_modifier = { modifier = name days/weeks/months/years = int }
</p>
</td>
<td>province
</td>
<td>
</td></tr>
<tr>
<td>add_special_building
</td>
<td>Add a special building to the province (will also add/change a special slot if needed)
</td>
<td>Unspecified
</td>
<td>province
</td>
<td>
</td></tr>
<tr>
<td>add_special_building_slot
</td>
<td>Add a special building slot to the province&lt;province&gt; = { add_special_building_slot = &lt;building_name&gt; }
</td>
<td>Unspecified
</td>
<td>province
</td>
<td>
</td></tr>
<tr>
<td>refill_garrison
</td>
<td>The scoped province gets its garrison refilled. refill_levy = yes/no
</td>
<td>Unspecified
</td>
<td>province
</td>
<td>
</td></tr>
<tr>
<td>refill_levy
</td>
<td>The scoped province gets its levy refilled
</td>
<td>refill_levy = yes/no
</td>
<td>province
</td>
<td>
</td></tr>
<tr>
<td>remove_all_province_modifier_instances
</td>
<td>Remove all instances of a modifier from a province
</td>
<td>remove_all_province_modifier_instances = name
</td>
<td>province
</td>
<td>
</td></tr>
<tr>
<td>remove_province_modifier
</td>
<td>Remove a modifier from a province
</td>
<td>remove_province_modifier = name
</td>
<td>province
</td>
<td>
</td></tr>
<tr>
<td>set_holding_type
</td>
<td>Changes the scoped province's holding to another type, removing all buildings that are invalid for the new holding. This might also allow to construct a new holding in an empty province, but it is untested.
</td>
<td>set_holding_type = holding_typr
</td>
<td>province
</td>
<td>
</td></tr>
<tr>
<td>spawn_activity
</td>
<td>spawns an activity, spawn_activity = { owner = X type = Y days/months/years = Z }, Z is expiration time can be a value or an inclusive "{A B}" interval from which the value will be picked
</td>
<td>Unspecified
</td>
<td>province
</td>
<td>
</td></tr></tbody></table>
<h3><span class="mw-headline" id="From_landed_title_scope">From landed title scope</span><span class="mw-editsection"><span class="mw-editsection-bracket">[</span><a href="/index.php?title=Effects&amp;action=edit&amp;section=8" title="Edit section: From landed title scope">edit</a><span class="mw-editsection-bracket">]</span></span></h3>
<p>The following effects are only usable in the landed title scope.
</p>
<table class="wikitable sortable" width="100%">
<tbody><tr>
<th width="15%">Name
</th>
<th width="15%">Description
</th>
<th width="25%">Usage
</th>
<th width="20%">Supported scopes
</th>
<th width="20%">Supported targets
</th></tr>
<tr>
<td>add_county_modifier
</td>
<td>Add a modifier to a county
</td>
<td>add_county_modifier = name
<p>add_county_modifier = { modifier = name days/weeks/months/years = int }
</p>
</td>
<td>landed title
</td>
<td>
</td></tr>
<tr>
<td>change_county_control
</td>
<td>Changes the county control of a title. If the title has higher tier than county, the effect will propagate down to all counties below it.
</td>
<td>Unspecified
</td>
<td>landed title
</td>
<td>
</td></tr>
<tr>
<td>change_de_jure_drift_progress
</td>
<td>Change the progress of de jure drift of a title&lt;drifting_title&gt; = { change_de_jure_drift_progress = {    target = &lt;drift_target_title&gt;    values = &lt;progress_change_value&gt; } }
</td>
<td>Unspecified
</td>
<td>landed title
</td>
<td>
</td></tr>
<tr>
<td>change_development_level
</td>
<td>Changes the development level of a title. If the title has higher tier than county, the effect will propagate down to all counties below it.
</td>
<td>Unspecified
</td>
<td>landed title
</td>
<td>
</td></tr>
<tr>
<td>change_development_progress
</td>
<td>Changes the development progress of a title. If the title has higher tier than county, the effect will propagate down to all counties below it.
</td>
<td>Unspecified
</td>
<td>landed title
</td>
<td>
</td></tr>
<tr>
<td>change_development_progress_with_overflow
</td>
<td>Changes the development progress of a title. If the title has higher tier than county, the effect will propagate down to all counties below it. Will overflow, so adding +100 to a county with 50 progress left will increase the level by 1 and result in 50 progress towards the next level
</td>
<td>Unspecified
</td>
<td>landed title
</td>
<td>
</td></tr>
<tr>
<td>clear_title_laws
</td>
<td>remove all title laws from the scoped title. DOES NOT apply law removal costs and effects.
</td>
<td>clear_title_laws = yes
</td>
<td>landed title
</td>
<td>
</td></tr>
<tr>
<td>clear_title_laws_effects
</td>
<td>remove all title laws from the scoped title. DOES apply law removal costs and effects.
</td>
<td>clear_title_laws_effects = yes
</td>
<td>landed title
</td>
<td>
</td></tr>
<tr>
<td>copy_title_history
</td>
<td>Copy title history from another title
</td>
<td>copy_title_history = source_title
</td>
<td>landed title
</td>
<td>landed title
</td></tr>
<tr>
<td>every_claimant
</td>
<td>Iterate through all claimants to title. parameters: explicit = yes/no/all - default yes
</td>
<td>every_claimant = { limit = { &lt;triggers&gt; } &lt;effects&gt; }
</td>
<td>landed title
</td>
<td>character
</td></tr>
<tr>
<td>every_connected_county
</td>
<td>Iterate through all counties connected to this one. Is based on top liege
</td>
<td>every_connected_county = {
<p>max_naval_distance = 500
allow_one_county_land_gap = yes
every_connected_county = { limit = { &lt;triggers&gt; } &lt;effects&gt; }
</p>
</td>
<td>landed title
</td>
<td>landed title
</td></tr>
<tr>
<td>every_county_province
</td>
<td>Iterate through all provinces in a county
</td>
<td>every_county_province = { limit = { &lt;triggers&gt; } &lt;effects&gt; }
</td>
<td>landed title
</td>
<td>province
</td></tr>
<tr>
<td>every_de_jure_county_holder
</td>
<td>Iterate through all characters directly holding counties within this dejure title
</td>
<td>every_de_jure_county_holder = { limit = { &lt;triggers&gt; } &lt;effects&gt; }
</td>
<td>landed title
</td>
<td>character
</td></tr>
<tr>
<td>every_de_jure_top_liege
</td>
<td>Iterate through all top lieges of the counts within this dejure title
</td>
<td>every_de_jure_top_liege = { limit = { &lt;triggers&gt; } &lt;effects&gt; }
</td>
<td>landed title
</td>
<td>character
</td></tr>
<tr>
<td>every_dejure_vassal_title_holder
</td>
<td>Iterate through all the vassal holders of the title
</td>
<td>every_dejure_vassal_title_holder = { limit = { &lt;triggers&gt; } &lt;effects&gt; }
</td>
<td>landed title
</td>
<td>character
</td></tr>
<tr>
<td>every_election_candidate
</td>
<td>Iterate through all characters who are valid candidates in an election for a title
</td>
<td>every_election_candidate = { limit = { &lt;triggers&gt; } &lt;effects&gt; }
</td>
<td>landed title
</td>
<td>character
</td></tr>
<tr>
<td>every_elector
</td>
<td>Iterate through all characters who are valid electors in an election for a title
</td>
<td>every_elector = { limit = { &lt;triggers&gt; } &lt;effects&gt; }
</td>
<td>landed title
</td>
<td>character
</td></tr>
<tr>
<td>every_in_de_facto_hierarchy
</td>
<td>Iterate through the title itself, all de facto vassals, and below. The continue trigger specifies whether to recursively iterate through the vassal's vassal
<p>This is unrelated to the limit; if the limit is met it is added to the list, but its vassals will get checked even if the limit isn't met as long as the 'continue' trigger is ..._de_jure_vassal_and_below = { continue = { conditions } }
</p>
</td>
<td>every_in_de_facto_hierarchy = { limit = { &lt;triggers&gt; } &lt;effects&gt; }
</td>
<td>landed title
</td>
<td>landed title
</td></tr>
<tr>
<td>every_in_de_jure_hierarchy
</td>
<td>Iterate through the title itself, all de jure vassals, and below. The continue trigger specifies whether to recursively iterate through the vassal's vassal
<p>This is unrelated to the limit; if the limit is met it is added to the list, but its vassals will get checked even if the limit isn't met as long as the 'continue' trigger is ..._de_jure_vassal_and_below = { continue = { conditions } }
</p>
</td>
<td>every_in_de_jure_hierarchy = { limit = { &lt;triggers&gt; } &lt;effects&gt; }
</td>
<td>landed title
</td>
<td>landed title
</td></tr>
<tr>
<td>every_neighboring_county
</td>
<td>Iterate through all neighboring counties. Can only be used in county scope
</td>
<td>every_neighboring_county = { limit = { &lt;triggers&gt; } &lt;effects&gt; }
</td>
<td>landed title
</td>
<td>landed title
</td></tr>
<tr>
<td>every_this_title_or_de_jure_above
</td>
<td>Iterate through this title and all its dejure liege titles
</td>
<td>every_this_title_or_de_jure_above = { limit = { &lt;triggers&gt; } &lt;effects&gt; }
</td>
<td>landed title
</td>
<td>landed title
</td></tr>
<tr>
<td>every_title_heir
</td>
<td>Line of succession for the scoped title
</td>
<td>every_title_heir = { limit = { &lt;triggers&gt; } &lt;effects&gt; }
</td>
<td>landed title
</td>
<td>character
</td></tr>
<tr>
<td>every_title_joined_faction
</td>
<td>Iterate through all factions joined the scope landed title
</td>
<td>every_title_joined_faction = { limit = { &lt;triggers&gt; } &lt;effects&gt; }
</td>
<td>landed title
</td>
<td>faction
</td></tr>
<tr>
<td>every_title_to_title_neighboring_and_across_water_barony
</td>
<td>Scopes from a title to a neighboring barony (incl. across water, looking trough the de Jure lieges)
</td>
<td>every_title_to_title_neighboring_and_across_water_barony = { limit = { &lt;triggers&gt; } &lt;effects&gt; }
</td>
<td>landed title
</td>
<td>landed title
</td></tr>
<tr>
<td>every_title_to_title_neighboring_and_across_water_county
</td>
<td>Scopes from a title to a neighboring county (incl. across water, looking trough the de Jure lieges)
</td>
<td>every_title_to_title_neighboring_and_across_water_county = { limit = { &lt;triggers&gt; } &lt;effects&gt; }
</td>
<td>landed title
</td>
<td>landed title
</td></tr>
<tr>
<td>every_title_to_title_neighboring_and_across_water_duchy
</td>
<td>Scopes from a title to a neighboring duchy (incl. across water, looking trough the de Jure lieges)
</td>
<td>every_title_to_title_neighboring_and_across_water_duchy = { limit = { &lt;triggers&gt; } &lt;effects&gt; }
</td>
<td>landed title
</td>
<td>landed title
</td></tr>
<tr>
<td>every_title_to_title_neighboring_and_across_water_empire
</td>
<td>Scopes from a title to a neighboring empire (incl. across water, looking trough the de Jure lieges)
</td>
<td>every_title_to_title_neighboring_and_across_water_empire = { limit = { &lt;triggers&gt; } &lt;effects&gt; }
</td>
<td>landed title
</td>
<td>landed title
</td></tr>
<tr>
<td>every_title_to_title_neighboring_and_across_water_kingdom
</td>
<td>Scopes from a title to a neighboring kingdom (incl. across water, looking trough the de Jure lieges)
</td>
<td>every_title_to_title_neighboring_and_across_water_kingdom = { limit = { &lt;triggers&gt; } &lt;effects&gt; }
</td>
<td>landed title
</td>
<td>landed title
</td></tr>
<tr>
<td>every_title_to_title_neighboring_barony
</td>
<td>Scopes from a title to a neighboring barony (looking trough the de Jure lieges)
</td>
<td>every_title_to_title_neighboring_barony = { limit = { &lt;triggers&gt; } &lt;effects&gt; }
</td>
<td>landed title
</td>
<td>landed title
</td></tr>
<tr>
<td>every_title_to_title_neighboring_county
</td>
<td>Scopes from a title to a neighboring county (looking trough the de Jure lieges)
</td>
<td>every_title_to_title_neighboring_county = { limit = { &lt;triggers&gt; } &lt;effects&gt; }
</td>
<td>landed title
</td>
<td>landed title
</td></tr>
<tr>
<td>every_title_to_title_neighboring_duchy
</td>
<td>Scopes from a title to a neighboring duchy (looking trough the de Jure lieges)
</td>
<td>every_title_to_title_neighboring_duchy = { limit = { &lt;triggers&gt; } &lt;effects&gt; }
</td>
<td>landed title
</td>
<td>landed title
</td></tr>
<tr>
<td>every_title_to_title_neighboring_empire
</td>
<td>Scopes from a title to a neighboring empire (looking trough the de Jure lieges)
</td>
<td>every_title_to_title_neighboring_empire = { limit = { &lt;triggers&gt; } &lt;effects&gt; }
</td>
<td>landed title
</td>
<td>landed title
</td></tr>
<tr>
<td>every_title_to_title_neighboring_kingdom
</td>
<td>Scopes from a title to a neighboring kingdom (looking trough the de Jure lieges)
</td>
<td>every_title_to_title_neighboring_kingdom = { limit = { &lt;triggers&gt; } &lt;effects&gt; }
</td>
<td>landed title
</td>
<td>landed title
</td></tr>
<tr>
<td>lease_out_to
</td>
<td>Lease out the scoped title
</td>
<td>lease_out_to = scope:a_holy_order
</td>
<td>landed title
</td>
<td>
</td></tr>
<tr>
<td>ordered_claimant
</td>
<td>Iterate through all claimants to title. parameters: explicit = yes/no/all - default yes
</td>
<td>ordered_claimant = {
<p>limit = { &lt;triggers&gt; }
order_by = script_value
position = int
min = int
max = script_value
check_range_bounds = no # If you don't want an error logged if the list is smaller than the min/max
&lt;effects&gt; }
</p>
</td>
<td>landed title
</td>
<td>character
</td></tr>
<tr>
<td>ordered_connected_county
</td>
<td>Iterate through all counties connected to this one. Is based on top liege
</td>
<td>ordered_connected_county = {
<p>max_naval_distance = 500
allow_one_county_land_gap = yes
}
ordered_connected_county = {
limit = { &lt;triggers&gt; }
order_by = script_value
position = int
min = int
max = script_value
check_range_bounds = no # If you don't want an error logged if the list is smaller than the min/max
&lt;effects&gt; }
</p>
</td>
<td>landed title
</td>
<td>landed title
</td></tr>
<tr>
<td>ordered_county_province
</td>
<td>Iterate through all provinces in a county
</td>
<td>ordered_county_province = {
<p>limit = { &lt;triggers&gt; }
order_by = script_value
position = int
min = int
max = script_value
check_range_bounds = no # If you don't want an error logged if the list is smaller than the min/max
&lt;effects&gt; }
</p>
</td>
<td>landed title
</td>
<td>province
</td></tr>
<tr>
<td>ordered_de_jure_county_holder
</td>
<td>Iterate through all characters directly holding counties within this dejure title
</td>
<td>ordered_de_jure_county_holder = {
<p>limit = { &lt;triggers&gt; }
order_by = script_value
position = int
min = int
max = script_value
check_range_bounds = no # If you don't want an error logged if the list is smaller than the min/max
&lt;effects&gt; }
</p>
</td>
<td>landed title
</td>
<td>character
</td></tr>
<tr>
<td>ordered_de_jure_top_liege
</td>
<td>Iterate through all top lieges of the counts within this dejure title
</td>
<td>ordered_de_jure_top_liege = {
<p>limit = { &lt;triggers&gt; }
order_by = script_value
position = int
min = int
max = script_value
check_range_bounds = no # If you don't want an error logged if the list is smaller than the min/max
&lt;effects&gt; }
</p>
</td>
<td>landed title
</td>
<td>character
</td></tr>
<tr>
<td>ordered_dejure_vassal_title_holder
</td>
<td>Iterate through all the vassal holders of the title
</td>
<td>ordered_dejure_vassal_title_holder = {
<p>limit = { &lt;triggers&gt; }
order_by = script_value
position = int
min = int
max = script_value
check_range_bounds = no # If you don't want an error logged if the list is smaller than the min/max
&lt;effects&gt; }
</p>
</td>
<td>landed title
</td>
<td>character
</td></tr>
<tr>
<td>ordered_election_candidate
</td>
<td>Iterate through all characters who are valid candidates in an election for a title
</td>
<td>ordered_election_candidate = {
<p>limit = { &lt;triggers&gt; }
order_by = script_value
position = int
min = int
max = script_value
check_range_bounds = no # If you don't want an error logged if the list is smaller than the min/max
&lt;effects&gt; }
</p>
</td>
<td>landed title
</td>
<td>character
</td></tr>
<tr>
<td>ordered_elector
</td>
<td>Iterate through all characters who are valid electors in an election for a title
</td>
<td>ordered_elector = {
<p>limit = { &lt;triggers&gt; }
order_by = script_value
position = int
min = int
max = script_value
check_range_bounds = no # If you don't want an error logged if the list is smaller than the min/max
&lt;effects&gt; }
</p>
</td>
<td>landed title
</td>
<td>character
</td></tr>
<tr>
<td>ordered_in_de_facto_hierarchy
</td>
<td>Iterate through the title itself, all de facto vassals, and below. The continue trigger specifies whether to recursively iterate through the vassal's vassal
<p>This is unrelated to the limit; if the limit is met it is added to the list, but its vassals will get checked even if the limit isn't met as long as the 'continue' trigger is
..._de_jure_vassal_and_below = { continue = { conditions } }
</p>
</td>
<td>ordered_in_de_facto_hierarchy = {
<p>limit = { &lt;triggers&gt; }
order_by = script_value
position = int
min = int
max = script_value
check_range_bounds = no # If you don't want an error logged if the list is smaller than the min/max
&lt;effects&gt; }
</p>
</td>
<td>landed title
</td>
<td>landed title
</td></tr>
<tr>
<td>ordered_in_de_jure_hierarchy
</td>
<td>Iterate through the title itself, all de jure vassals, and below. The continue trigger specifies whether to recursively iterate through the vassal's vassal
<p>This is unrelated to the limit; if the limit is met it is added to the list, but its vassals will get checked even if the limit isn't met as long as the 'continue' trigger is
..._de_jure_vassal_and_below = { continue = { conditions } }
</p>
</td>
<td>ordered_in_de_jure_hierarchy = {
<p>limit = { &lt;triggers&gt; }
order_by = script_value
position = int
min = int
max = script_value
check_range_bounds = no # If you don't want an error logged if the list is smaller than the min/max
&lt;effects&gt; }
</p>
</td>
<td>landed title
</td>
<td>landed title
</td></tr>
<tr>
<td>ordered_neighboring_county
</td>
<td>Iterate through all neighboring counties. Can only be used in county scope
</td>
<td>ordered_neighboring_county = {
<p>limit = { &lt;triggers&gt; }
order_by = script_value
position = int
min = int
max = script_value
check_range_bounds = no # If you don't want an error logged if the list is smaller than the min/max
&lt;effects&gt; }
</p>
</td>
<td>landed title
</td>
<td>landed title
</td></tr>
<tr>
<td>ordered_this_title_or_de_jure_above
</td>
<td>Iterate through this title and all its dejure liege titles
</td>
<td>ordered_this_title_or_de_jure_above = {
<p>limit = { &lt;triggers&gt; }
order_by = script_value
position = int
min = int
max = script_value
check_range_bounds = no # If you don't want an error logged if the list is smaller than the min/max
&lt;effects&gt; }
</p>
</td>
<td>landed title
</td>
<td>landed title
</td></tr>
<tr>
<td>ordered_title_heir
</td>
<td>Line of succession for the scoped title
</td>
<td>ordered_title_heir = {
<p>limit = { &lt;triggers&gt; }
order_by = script_value
position = int
min = int
max = script_value
check_range_bounds = no # If you don't want an error logged if the list is smaller than the min/max
&lt;effects&gt; }
</p>
</td>
<td>landed title
</td>
<td>character
</td></tr>
<tr>
<td>ordered_title_joined_faction
</td>
<td>Iterate through all factions joined the scope landed title
</td>
<td>ordered_title_joined_faction = {
<p>limit = { &lt;triggers&gt; }
order_by = script_value
position = int
min = int
max = script_value
check_range_bounds = no # If you don't want an error logged if the list is smaller than the min/max
&lt;effects&gt; }
</p>
</td>
<td>landed title
</td>
<td>faction
</td></tr>
<tr>
<td>ordered_title_to_title_neighboring_and_across_water_barony
</td>
<td>Scopes from a title to a neighboring barony (incl. across water, looking trough the de Jure lieges)
</td>
<td>ordered_title_to_title_neighboring_and_across_water_barony = {
<p>limit = { &lt;triggers&gt; }
order_by = script_value
position = int
min = int
max = script_value
check_range_bounds = no # If you don't want an error logged if the list is smaller than the min/max
&lt;effects&gt; }
</p>
</td>
<td>landed title
</td>
<td>landed title
</td></tr>
<tr>
<td>ordered_title_to_title_neighboring_and_across_water_county
</td>
<td>Scopes from a title to a neighboring county (incl. across water, looking trough the de Jure lieges)
</td>
<td>ordered_title_to_title_neighboring_and_across_water_county = {
<p>limit = { &lt;triggers&gt; }
order_by = script_value
position = int
min = int
max = script_value
check_range_bounds = no # If you don't want an error logged if the list is smaller than the min/max
&lt;effects&gt; }
</p>
</td>
<td>landed title
</td>
<td>landed title
</td></tr>
<tr>
<td>ordered_title_to_title_neighboring_and_across_water_duchy
</td>
<td>Scopes from a title to a neighboring duchy (incl. across water, looking trough the de Jure lieges)
</td>
<td>ordered_title_to_title_neighboring_and_across_water_duchy = {
<p>limit = { &lt;triggers&gt; }
order_by = script_value
position = int
min = int
max = script_value
check_range_bounds = no # If you don't want an error logged if the list is smaller than the min/max
&lt;effects&gt; }
</p>
</td>
<td>landed title
</td>
<td>landed title
</td></tr>
<tr>
<td>ordered_title_to_title_neighboring_and_across_water_empire
</td>
<td>Scopes from a title to a neighboring empire (incl. across water, looking trough the de Jure lieges)
</td>
<td>ordered_title_to_title_neighboring_and_across_water_empire = {
<p>limit = { &lt;triggers&gt; }
order_by = script_value
position = int
min = int
max = script_value
check_range_bounds = no # If you don't want an error logged if the list is smaller than the min/max
&lt;effects&gt; }
</p>
</td>
<td>landed title
</td>
<td>landed title
</td></tr>
<tr>
<td>ordered_title_to_title_neighboring_and_across_water_kingdom
</td>
<td>Scopes from a title to a neighboring kingdom (incl. across water, looking trough the de Jure lieges)
</td>
<td>ordered_title_to_title_neighboring_and_across_water_kingdom = {
<p>limit = { &lt;triggers&gt; }
order_by = script_value
position = int
min = int
max = script_value
check_range_bounds = no # If you don't want an error logged if the list is smaller than the min/max
&lt;effects&gt; }
</p>
</td>
<td>landed title
</td>
<td>landed title
</td></tr>
<tr>
<td>ordered_title_to_title_neighboring_barony
</td>
<td>Scopes from a title to a neighboring barony (looking trough the de Jure lieges)
</td>
<td>ordered_title_to_title_neighboring_barony = {
<p>limit = { &lt;triggers&gt; }
order_by = script_value
position = int
min = int
max = script_value
check_range_bounds = no # If you don't want an error logged if the list is smaller than the min/max
&lt;effects&gt; }
</p>
</td>
<td>landed title
</td>
<td>landed title
</td></tr>
<tr>
<td>ordered_title_to_title_neighboring_county
</td>
<td>Scopes from a title to a neighboring county (looking trough the de Jure lieges)
</td>
<td>ordered_title_to_title_neighboring_county = {
<p>limit = { &lt;triggers&gt; }
order_by = script_value
position = int
min = int
max = script_value
check_range_bounds = no # If you don't want an error logged if the list is smaller than the min/max
&lt;effects&gt; }
</p>
</td>
<td>landed title
</td>
<td>landed title
</td></tr>
<tr>
<td>ordered_title_to_title_neighboring_duchy
</td>
<td>Scopes from a title to a neighboring duchy (looking trough the de Jure lieges)
</td>
<td>ordered_title_to_title_neighboring_duchy = {
<p>limit = { &lt;triggers&gt; }
order_by = script_value
position = int
min = int
max = script_value
check_range_bounds = no # If you don't want an error logged if the list is smaller than the min/max
&lt;effects&gt; }
</p>
</td>
<td>landed title
</td>
<td>landed title
</td></tr>
<tr>
<td>ordered_title_to_title_neighboring_empire
</td>
<td>Scopes from a title to a neighboring empire (looking trough the de Jure lieges)
</td>
<td>ordered_title_to_title_neighboring_empire = {
<p>limit = { &lt;triggers&gt; }
order_by = script_value
position = int
min = int
max = script_value
check_range_bounds = no # If you don't want an error logged if the list is smaller than the min/max
&lt;effects&gt; }
</p>
</td>
<td>landed title
</td>
<td>landed title
</td></tr>
<tr>
<td>ordered_title_to_title_neighboring_kingdom
</td>
<td>Scopes from a title to a neighboring kingdom (looking trough the de Jure lieges)
</td>
<td>ordered_title_to_title_neighboring_kingdom = {
<p>limit = { &lt;triggers&gt; }
order_by = script_value
position = int
min = int
max = script_value
check_range_bounds = no # If you don't want an error logged if the list is smaller than the min/max
&lt;effects&gt; }
</p>
</td>
<td>landed title
</td>
<td>landed title
</td></tr>
<tr>
<td>random_claimant
</td>
<td>Iterate through all claimants to title. parameters: explicit = yes/no/all - default yes
</td>
<td>random_claimant = { limit = { &lt;triggers&gt; } (optional) weight = { mtth } &lt;effects&gt; }
</td>
<td>landed title
</td>
<td>character
</td></tr>
<tr>
<td>random_connected_county
</td>
<td>Iterate through all counties connected to this one. Is based on top liege
<p>random_connected_county = {
max_naval_distance = 500
allow_one_county_land_gap = yes
}
</p>
</td>
<td>random_connected_county = { limit = { &lt;triggers&gt; } (optional) weight = { mtth } &lt;effects&gt; }
</td>
<td>landed title
</td>
<td>landed title
</td></tr>
<tr>
<td>random_county_province
</td>
<td>Iterate through all provinces in a county
</td>
<td>random_county_province = { limit = { &lt;triggers&gt; } (optional) weight = { mtth } &lt;effects&gt; }
</td>
<td>landed title
</td>
<td>province
</td></tr>
<tr>
<td>random_de_jure_county_holder
</td>
<td>Iterate through all characters directly holding counties within this dejure title
</td>
<td>random_de_jure_county_holder = { limit = { &lt;triggers&gt; } (optional) weight = { mtth } &lt;effects&gt; }
</td>
<td>landed title
</td>
<td>character
</td></tr>
<tr>
<td>random_de_jure_top_liege
</td>
<td>Iterate through all top lieges of the counts within this dejure title
</td>
<td>random_de_jure_top_liege = { limit = { &lt;triggers&gt; } (optional) weight = { mtth } &lt;effects&gt; }
</td>
<td>landed title
</td>
<td>character
</td></tr>
<tr>
<td>random_dejure_vassal_title_holder
</td>
<td>Iterate through all the vassal holders of the title
</td>
<td>random_dejure_vassal_title_holder = { limit = { &lt;triggers&gt; } (optional) weight = { mtth } &lt;effects&gt; }
</td>
<td>landed title
</td>
<td>character
</td></tr>
<tr>
<td>random_election_candidate
</td>
<td>Iterate through all characters who are valid candidates in an election for a title
</td>
<td>random_election_candidate = { limit = { &lt;triggers&gt; } (optional) weight = { mtth } &lt;effects&gt; }
</td>
<td>landed title
</td>
<td>character
</td></tr>
<tr>
<td>random_elector
</td>
<td>Iterate through all characters who are valid electors in an election for a title
</td>
<td>random_elector = { limit = { &lt;triggers&gt; } (optional) weight = { mtth } &lt;effects&gt; }
</td>
<td>landed title
</td>
<td>character
</td></tr>
<tr>
<td>random_in_de_facto_hierarchy
</td>
<td>Iterate through the title itself, all de facto vassals, and below. The continue trigger specifies whether to recursively iterate through the vassal's vassal
<p>This is unrelated to the limit; if the limit is met it is added to the list, but its vassals will get checked even if the limit isn't met as long as the 'continue' trigger is
..._de_jure_vassal_and_below = { continue = { conditions } }
</p>
</td>
<td>random_in_de_facto_hierarchy = { limit = { &lt;triggers&gt; } (optional) weight = { mtth } &lt;effects&gt; }
</td>
<td>landed title
</td>
<td>landed title
</td>
<td>
</td></tr>
<tr>
<td>random_in_de_jure_hierarchy
</td>
<td>Iterate through the title itself, all de jure vassals, and below. The continue trigger specifies whether to recursively iterate through the vassal's vassal
<p>This is unrelated to the limit; if the limit is met it is added to the list, but its vassals will get checked even if the limit isn't met as long as the 'continue' trigger is
..._de_jure_vassal_and_below = { continue = { conditions } }
</p>
</td>
<td>random_in_de_jure_hierarchy = { limit = { &lt;triggers&gt; } (optional) weight = { mtth } &lt;effects&gt; }
</td>
<td>landed title
</td>
<td>landed title
</td></tr>
<tr>
<td>random_neighboring_county
</td>
<td>Iterate through all neighboring counties. Can only be used in county scope
</td>
<td>random_neighboring_county = { limit = { &lt;triggers&gt; } (optional) weight = { mtth } &lt;effects&gt; }
</td>
<td>landed title
</td>
<td>landed title
</td></tr>
<tr>
<td>random_this_title_or_de_jure_above
</td>
<td>Iterate through this title and all its dejure liege titles
</td>
<td>random_this_title_or_de_jure_above = { limit = { &lt;triggers&gt; } (optional) weight = { mtth } &lt;effects&gt; }
</td>
<td>landed title
</td>
<td>landed title
</td></tr>
<tr>
<td>random_title_heir
</td>
<td>Line of succession for the scoped title
</td>
<td>random_title_heir = { limit = { &lt;triggers&gt; } (optional) weight = { mtth } &lt;effects&gt; }
</td>
<td>landed title
</td>
<td>character
</td></tr>
<tr>
<td>random_title_joined_faction
</td>
<td>Iterate through all factions joined the scope landed title
</td>
<td>random_title_joined_faction = { limit = { &lt;triggers&gt; } (optional) weight = { mtth } &lt;effects&gt; }
</td>
<td>landed title
</td>
<td>faction
</td></tr>
<tr>
<td>random_title_to_title_neighboring_and_across_water_barony
</td>
<td>Scopes from a title to a neighboring barony (incl. across water, looking trough the de Jure lieges)
</td>
<td>random_title_to_title_neighboring_and_across_water_barony = { limit = { &lt;triggers&gt; } (optional) weight = { mtth } &lt;effects&gt; }
</td>
<td>landed title
</td>
<td>landed title
</td></tr>
<tr>
<td>random_title_to_title_neighboring_and_across_water_county
</td>
<td>Scopes from a title to a neighboring county (incl. across water, looking trough the de Jure lieges)
</td>
<td>random_title_to_title_neighboring_and_across_water_county = { limit = { &lt;triggers&gt; } (optional) weight = { mtth } &lt;effects&gt; }
</td>
<td>landed title
</td>
<td>landed title
</td></tr>
<tr>
<td>random_title_to_title_neighboring_and_across_water_duchy
</td>
<td>Scopes from a title to a neighboring duchy (incl. across water, looking trough the de Jure lieges)
</td>
<td>random_title_to_title_neighboring_and_across_water_duchy = { limit = { &lt;triggers&gt; } (optional) weight = { mtth } &lt;effects&gt; }
</td>
<td>landed title
</td>
<td>landed title
</td></tr>
<tr>
<td>random_title_to_title_neighboring_and_across_water_empire
</td>
<td>Scopes from a title to a neighboring empire (incl. across water, looking trough the de Jure lieges)
</td>
<td>random_title_to_title_neighboring_and_across_water_empire = { limit = { &lt;triggers&gt; } (optional) weight = { mtth } &lt;effects&gt; }
</td>
<td>landed title
</td>
<td>landed title
</td></tr>
<tr>
<td>random_title_to_title_neighboring_and_across_water_kingdom
</td>
<td>Scopes from a title to a neighboring kingdom (incl. across water, looking trough the de Jure lieges)
</td>
<td>random_title_to_title_neighboring_and_across_water_kingdom = { limit = { &lt;triggers&gt; } (optional) weight = { mtth } &lt;effects&gt; }
</td>
<td>landed title
</td>
<td>landed title
</td></tr>
<tr>
<td>random_title_to_title_neighboring_barony
</td>
<td>Scopes from a title to a neighboring barony (looking trough the de Jure lieges)
</td>
<td>random_title_to_title_neighboring_barony = { limit = { &lt;triggers&gt; } (optional) weight = { mtth } &lt;effects&gt; }
</td>
<td>landed title
</td>
<td>landed title
</td></tr>
<tr>
<td>random_title_to_title_neighboring_county
</td>
<td>Scopes from a title to a neighboring county (looking trough the de Jure lieges)
</td>
<td>random_title_to_title_neighboring_county = { limit = { &lt;triggers&gt; } (optional) weight = { mtth } &lt;effects&gt; }
</td>
<td>landed title
</td>
<td>landed title
</td></tr>
<tr>
<td>random_title_to_title_neighboring_duchy
</td>
<td>Scopes from a title to a neighboring duchy (looking trough the de Jure lieges)
</td>
<td>random_title_to_title_neighboring_duchy = { limit = { &lt;triggers&gt; } (optional) weight = { mtth } &lt;effects&gt; }
</td>
<td>landed title
</td>
<td>landed title
</td></tr>
<tr>
<td>random_title_to_title_neighboring_empire
</td>
<td>Scopes from a title to a neighboring empire (looking trough the de Jure lieges)
</td>
<td>random_title_to_title_neighboring_empire = { limit = { &lt;triggers&gt; } (optional) weight = { mtth } &lt;effects&gt; }
</td>
<td>landed title
</td>
<td>landed title
</td></tr>
<tr>
<td>random_title_to_title_neighboring_kingdom
</td>
<td>Scopes from a title to a neighboring kingdom (looking trough the de Jure lieges)
</td>
<td>random_title_to_title_neighboring_kingdom = { limit = { &lt;triggers&gt; } (optional) weight = { mtth } &lt;effects&gt; }
</td>
<td>landed title
</td>
<td>landed title
</td></tr>
<tr>
<td>remove_all_county_modifier_instances
</td>
<td>Remove all instances of a modifier from a county
</td>
<td>remove_all_county_modifier_instances = name
</td>
<td>landed title
</td>
<td>
</td></tr>
<tr>
<td>remove_county_modifier
</td>
<td>Remove a modifier from a county
</td>
<td>remove_county_modifier = name
</td>
<td>landed title
</td>
<td>
</td></tr>
<tr>
<td>reset_title_name
</td>
<td>Sets the name and adjective of the scoped title back to being based on its key. Won't cause the prefix to change
</td>
<td>reset_title_name = yes
</td>
<td>landed title
</td>
<td>
</td></tr>
<tr>
<td>reset_title_prefix
</td>
<td>Sets the prefix of the scoped title back to being based on its key. Won't cause its adjective or name to change
</td>
<td>reset_title_prefix = yes
</td>
<td>landed title
</td>
<td>
</td></tr>
<tr>
<td>revoke_lease
</td>
<td>Revoke the lease of the scoped title
</td>
<td>revoke_lease = yes
</td>
<td>landed title
</td>
<td>
</td></tr>
<tr>
<td>set_always_follows_primary_heir
</td>
<td>Sets if the title should always go to the primary heir in partition succession
</td>
<td>set_always_follows_primary_heir = yes
</td>
<td>landed title
</td>
<td>
</td></tr>
<tr>
<td>set_capital_county
</td>
<td>Sets the capital county of the title to the target county
</td>
<td>set_capital_county = &lt;some county title&gt;
</td>
<td>landed title
</td>
<td>landed title
</td></tr>
<tr>
<td>set_color_from_title
</td>
<td>Sets the color of the title to the same as the target title (shifted very slightly to not be identical)
</td>
<td>set_color_from_title = &lt;some title&gt;
</td>
<td>landed title
</td>
<td>landed title
</td></tr>
<tr>
<td>set_county_culture
</td>
<td>Sets the culture of a county
</td>
<td>set_county_culture = english/root.character_culture
</td>
<td>landed title
</td>
<td>
</td></tr>
<tr>
<td>set_county_faith
</td>
<td>Changes what faith a county has
</td>
<td>Unspecified
</td>
<td>landed title
</td>
<td>
</td></tr>
<tr>
<td>set_de_jure_liege_title
</td>
<td>Set a new DeJure liege title
</td>
<td>set_de_jure_liege_title = new_de_jure_liege
</td>
<td>landed title
</td>
<td>landed title
</td></tr>
<tr>
<td>set_definitive_form
</td>
<td>Sets if the title should use a definitive form name (no 'Kingdom of')
</td>
<td>set_definitive_form = yes
</td>
<td>landed title
</td>
<td>
</td></tr>
<tr>
<td>set_delete_on_destroy
</td>
<td>Sets if the title should be deleted from the gamestate completely when it is destroyed
</td>
<td>set_delete_on_destroy = yes
</td>
<td>landed title
</td>
<td>
</td></tr>
<tr>
<td>set_destroy_if_invalid_heir
</td>
<td>Sets if the title should be destroyed on succession if there's no heir matching its restrictions
</td>
<td>set_destroy_if_invalid_heir = yes
</td>
<td>landed title
</td>
<td>
</td></tr>
<tr>
<td>set_destroy_on_succession
</td>
<td>Sets if the title should be destroyed on succession
</td>
<td>set_destroy_on_succession = yes
</td>
<td>landed title
</td>
<td>
</td></tr>
<tr>
<td>set_landless_title
</td>
<td>Sets if the title is landless (can be held by rulers with no land)
</td>
<td>set_landless_title = yes
</td>
<td>landed title
</td>
<td>
</td></tr>
<tr>
<td>set_no_automatic_claims
</td>
<td>Sets if the title should disallow automatic claims (meaning claims will only be added by script, and by pressed claims being inherited).
</td>
<td>set_no_automatic_claims = yes
</td>
<td>landed title
</td>
<td>
</td></tr>
<tr>
<td>set_title_name
</td>
<td>sets the name (localization key) of the scoped title. The adjective will be constructed by adding '_adj' to the localisation key. Won't cause the prefix to change
</td>
<td>set_title_name = TEST_NAME_PLEASE_IGNORE
</td>
<td>landed title
</td>
<td>
</td></tr>
<tr>
<td>set_title_prefix
</td>
<td>sets the prefix of the scoped title. Won't cause its name or adjective to change
</td>
<td>set_title_prefix = PREFIX_THE
</td>
<td>landed title
</td>
<td>
</td></tr>
<tr>
<td>title_create_faction
</td>
<td>the scoped landed title creates a faction of the specified type against the specified target, title_create_faction = { type = X target = Y }
</td>
<td>Unspecified
</td>
<td>landed title
</td>
<td>
</td></tr>
<tr>
<td>title_join_faction
</td>
<td>the landed title in the scope joins the assigned faction
</td>
<td>Unspecified
</td>
<td>landed title
</td>
<td>
</td></tr>
<tr>
<td>title_leave_faction
</td>
<td>the title in the scope leaves the assigned faction
</td>
<td>Unspecified
</td>
<td>landed title
</td>
<td>
</td></tr></tbody></table>
<h3><span class="mw-headline" id="From_holy_order_scope">From holy order scope</span><span class="mw-editsection"><span class="mw-editsection-bracket">[</span><a href="/index.php?title=Effects&amp;action=edit&amp;section=9" title="Edit section: From holy order scope">edit</a><span class="mw-editsection-bracket">]</span></span></h3>
<p>The following effects are only usable in the holy order scope.
</p>
<table class="wikitable sortable" width="100%">
<tbody><tr>
<th width="15%">Name
</th>
<th width="15%">Description
</th>
<th width="25%">Usage
</th>
<th width="20%">Supported scopes
</th>
<th width="20%">Supported targets
</th></tr>
<tr>
<td>every_leased_title
</td>
<td>Iterate through all titles leased to a holy order
</td>
<td>every_leased_title = { limit = { &lt;triggers&gt; } &lt;effects&gt; }
</td>
<td>holy order
</td>
<td>landed title
</td></tr>
<tr>
<td>ordered_leased_title
</td>
<td>Iterate through all titles leased to a holy order
</td>
<td>ordered_leased_title = {
<p>limit = { &lt;triggers&gt; }
order_by = script_value
position = int
min = int
max = script_value
check_range_bounds = no # If you don't want an error logged if the list is smaller than the min/max
&lt;effects&gt; }
</p>
</td>
<td>holy order
</td>
<td>landed title
</td></tr>
<tr>
<td>random_leased_title
</td>
<td>Iterate through all titles leased to a holy order
</td>
<td>random_leased_title = { limit = { &lt;triggers&gt; } (optional) weight = { mtth } &lt;effects&gt; }
</td>
<td>holy order
</td>
<td>landed title
</td></tr></tbody></table>
<h3><span class="mw-headline" id="From_dynasty_scope">From dynasty scope</span><span class="mw-editsection"><span class="mw-editsection-bracket">[</span><a href="/index.php?title=Effects&amp;action=edit&amp;section=10" title="Edit section: From dynasty scope">edit</a><span class="mw-editsection-bracket">]</span></span></h3>
<p>The following effects are only usable in the dynasty scope.
</p>
<table class="wikitable sortable" width="100%">
<tbody><tr>
<th width="15%">Name
</th>
<th width="15%">Description
</th>
<th width="25%">Usage
</th>
<th width="20%">Supported scopes
</th>
<th width="20%">Supported targets
</th></tr>
<tr>
<td>add_dynasty_modifier
</td>
<td>Add a modifier to a dynasty
</td>
<td>add_dynasty_modifier = name
<p>add_dynasty_modifier = { modifier = name days/weeks/months/years = int }
</p>
</td>
<td>dynasty
</td>
<td>
</td></tr>
<tr>
<td>add_dynasty_perk
</td>
<td>Adds dynasty perk
</td>
<td>add_dynasty_perk = key
</td>
<td>dynasty
</td>
<td>
</td></tr>
<tr>
<td>add_dynasty_prestige
</td>
<td>adds dynasty prestige
</td>
<td>Unspecified
</td>
<td>dynasty
</td>
<td>
</td></tr>
<tr>
<td>add_dynasty_prestige_level
</td>
<td>adds dynasty prestige levels
</td>
<td>Unspecified
</td>
<td>dynasty
</td>
<td>
</td></tr>
<tr>
<td>every_dynasty_member
</td>
<td>Iterate through all dynasty members
</td>
<td>every_dynasty_member = { limit = { &lt;triggers&gt; } &lt;effects&gt; }
</td>
<td>dynasty
</td>
<td>character
</td></tr>
<tr>
<td>ordered_dynasty_member
</td>
<td>Iterate through all dynasty members
</td>
<td>ordered_dynasty_member = {
<p>limit = { &lt;triggers&gt; }
order_by = script_value
position = int
min = int
max = script_value
check_range_bounds = no # If you don't want an error logged if the list is smaller than the min/max
&lt;effects&gt; }
</p>
</td>
<td>dynasty
</td>
<td>character
</td></tr>
<tr>
<td>random_dynasty_member
</td>
<td>Iterate through all dynasty members
</td>
<td>random_dynasty_member = { limit = { &lt;triggers&gt; } (optional) weight = { mtth } &lt;effects&gt; }
</td>
<td>dynasty
</td>
<td>character
</td></tr>
<tr>
<td>remove_all_dynasty_modifier_instances
</td>
<td>Remove all instances of a modifier from a dynasty
</td>
<td>remove_all_dynasty_modifier_instances = name
</td>
<td>dynasty
</td>
<td>
</td></tr>
<tr>
<td>remove_dynasty_modifier
</td>
<td>Remove a modifier from a dynasty
</td>
<td>remove_dynasty_modifier = name
</td>
<td>dynasty
</td>
<td>
</td></tr></tbody></table>
<h3><span class="mw-headline" id="From_dynasty_house_scope">From dynasty house scope</span><span class="mw-editsection"><span class="mw-editsection-bracket">[</span><a href="/index.php?title=Effects&amp;action=edit&amp;section=11" title="Edit section: From dynasty house scope">edit</a><span class="mw-editsection-bracket">]</span></span></h3>
<p>The following effects are only usable in the dynasty house scope.
</p>
<table class="wikitable sortable" width="100%">
<tbody><tr>
<th width="15%">Name
</th>
<th width="15%">Description
</th>
<th width="25%">Usage
</th>
<th width="20%">Supported scopes
</th>
<th width="20%">Supported targets
</th></tr>
<tr>
<td>add_house_modifier
</td>
<td>Add a modifier to a house
</td>
<td>add_house_modifier = name
<p>add_house_modifier = { modifier = name days/weeks/months/years = int }
</p>
</td>
<td>dynasty house
</td>
<td>
</td></tr>
<tr>
<td>every_house_member
</td>
<td>Iterate through all house members
</td>
<td>every_house_member = { limit = { &lt;triggers&gt; } &lt;effects&gt; }
</td>
<td>dynasty house
</td>
<td>character
</td></tr>
<tr>
<td>ordered_house_member
</td>
<td>Iterate through all house members
</td>
<td>ordered_house_member = {
<p>limit = { &lt;triggers&gt; }
order_by = script_value
position = int
min = int
max = script_value
check_range_bounds = no # If you don't want an error logged if the list is smaller than the min/max
&lt;effects&gt; }
</p>
</td>
<td>dynasty house
</td>
<td>character
</td></tr>
<tr>
<td>random_house_member
</td>
<td>Iterate through all house members
</td>
<td>random_house_member = { limit = { &lt;triggers&gt; } (optional) weight = { mtth } &lt;effects&gt; }
</td>
<td>dynasty house
</td>
<td>character
</td></tr>
<tr>
<td>remove_all_house_modifier_instances
</td>
<td>Remove all instances of a modifier from a house
</td>
<td>remove_all_house_modifier_instances = name
</td>
<td>dynasty house
</td>
<td>
</td></tr>
<tr>
<td>remove_house_modifier
</td>
<td>Remove a modifier from a house
</td>
<td>remove_house_modifier = name
</td>
<td>dynasty house
</td>
<td>
</td></tr></tbody></table>
<h3><span class="mw-headline" id="From_culture_scope">From culture scope</span><span class="mw-editsection"><span class="mw-editsection-bracket">[</span><a href="/index.php?title=Effects&amp;action=edit&amp;section=12" title="Edit section: From culture scope">edit</a><span class="mw-editsection-bracket">]</span></span></h3>
<p>The following effects are only usable in the culture scope.
</p>
<table class="wikitable sortable" width="100%">
<tbody><tr>
<th width="15%">Name
</th>
<th width="15%">Description
</th>
<th width="25%">Usage
</th>
<th width="20%">Supported scopes
</th>
<th width="20%">Supported targets
</th></tr>
<tr>
<td>add_innovation
</td>
<td>Add innovation to a culture
</td>
<td>Unspecified
</td>
<td>culture
</td>
<td>
</td></tr>
<tr>
<td>add_random_innovation
</td>
<td>Add random available innovation&lt;culture&gt; = { add_random_innovation = culture_group_military/culture_group_civic/culture_group_regional/yes }
</td>
<td>Unspecified
</td>
<td>culture
</td>
<td>
</td></tr>
<tr>
<td>get_all_innovations_from
</td>
<td>Discover all innovations from the target culture
</td>
<td>get_all_innovations_from = &lt;culture&gt;
</td>
<td>culture
</td>
<td>culture
</td></tr>
<tr>
<td>get_random_innovation_from
</td>
<td>Get random available innovation from another culture
</td>
<td>Unspecified
</td>
<td>culture
</td>
<td>
</td></tr></tbody></table>
<h3><span class="mw-headline" id="From_character_scope">From character scope</span><span class="mw-editsection"><span class="mw-editsection-bracket">[</span><a href="/index.php?title=Effects&amp;action=edit&amp;section=13" title="Edit section: From character scope">edit</a><span class="mw-editsection-bracket">]</span></span></h3>
<p>The following effects are only usable in the character scope.
</p>
<h4><span class="mw-headline" id="Standard">Standard</span><span class="mw-editsection"><span class="mw-editsection-bracket">[</span><a href="/index.php?title=Effects&amp;action=edit&amp;section=14" title="Edit section: Standard">edit</a><span class="mw-editsection-bracket">]</span></span></h4>
<table class="wikitable sortable" width="100%">
<tbody><tr>
<th width="15%">Name
</th>
<th width="15%">Description
</th>
<th width="25%">Usage
</th>
<th width="20%">Supported scopes
</th>
<th width="20%">Supported targets
</th></tr>
<tr>
<td>add_character_flag
</td>
<td>Adds a character flag. X is the name of the flag and Y is a value or value interval "{ min max }".
</td>
<td>add_character_flag = { flag = X [days/weeks/years = Y] }
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>add_character_modifier
</td>
<td>Add a modifier to a character
</td>
<td>add_character_modifier = name
<p>add_character_modifier = { modifier = name days/weeks/months/years = int }
</p>
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>add_courtier
</td>
<td>Add the target character to the scope character's court
</td>
<td>Unspecified
</td>
<td>character
</td>
<td>character
</td></tr>
<tr>
<td>add_diplomacy_lifestyle_perk_points
</td>
<td>Adds lifestyle per points to the given character
</td>
<td>Unspecified
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>add_diplomacy_lifestyle_xp
</td>
<td>Adds lifestyle XP to the given character. Can be used with lifestyles not currently focused on.
</td>
<td>add_diplomacy_lifestyle_xp = int
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>add_dread
</td>
<td>adds (or removes) dread to a character
</td>
<td>Unspecified
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>add_gold
</td>
<td>adds gold to a character
</td>
<td>Unspecified
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>add_hook
</td>
<td>Adds a hook on a character. Note: days/months/years optional (taken from hook type otherwise) and can be a value or an interval, secret required for hook types that require it. Does send a toast to the player if it's involved.
</td>
<td>add_hook = { type = X, target = Y, secret = Z, days/months/years = W  }
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>add_hook_no_toast
</td>
<td>Adds a hook on a character. Note: days/months/years optional (taken from hook type otherwise) and can be a value or an interval, secret required for hook types that require it. Does NOT send a toast to the player.
</td>
<td>add_hook = { type = X, target = Y, secret = Z, days/months/years = W  }
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>add_intrigue_lifestyle_perk_points
</td>
<td>Adds lifestyle per points to the given character
</td>
<td>Unspecified
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>add_intrigue_lifestyle_xp
</td>
<td>Adds lifestyle XP to the given character
</td>
<td>Unspecified
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>add_joined_faction_discontent
</td>
<td>add_joined_faction_discontent = X adds (or subtracts) discontent to the factions the scope character is in
</td>
<td>Unspecified
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>add_knows_of_killer
</td>
<td>Adds the right hand side character as knowing of the killer of the scoped object
</td>
<td>dead_person = { add_knows_of_killer = root }
</td>
<td>character
</td>
<td>character
</td></tr>
<tr>
<td>add_learning_lifestyle_perk_points
</td>
<td>Adds lifestyle per points to the given character
</td>
<td>Unspecified
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>add_learning_lifestyle_xp
</td>
<td>Adds lifestyle XP to the given character
</td>
<td>Unspecified
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>add_martial_lifestyle_perk_points
</td>
<td>Adds lifestyle per points to the given character
</td>
<td>Unspecified
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>add_martial_lifestyle_xp
</td>
<td>Adds lifestyle XP to the given character
</td>
<td>Unspecified
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>add_opinion
</td>
<td>Adds a temporary opinion modifier. X is a scripted modifier name. Y can be a value or a range "{ A B }" If no timeout are specified, the modifier's scripted default timeout will be used.
</td>
<td>add_opinion = { modifier = X days/months/years = Y target = Z }
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>add_perk
</td>
<td>Adds the perk for this character
</td>
<td>Unspecified
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>add_piety
</td>
<td>gives (or takes) piety to a character
</td>
<td>Unspecified
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>add_piety_experience
</td>
<td>gives (or takes) piety experience to a character
</td>
<td>Unspecified
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>add_piety_level
</td>
<td>increases (or decreases) the piety level of a character
</td>
<td>Unspecified
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>add_pressed_claim
</td>
<td>gives a pressed claim to a character
</td>
<td>Unspecified
</td>
<td>character
</td>
<td>landed title
</td></tr>
<tr>
<td>add_prestige
</td>
<td>gives (or takes) prestige to a character
</td>
<td>Unspecified
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>add_prestige_experience
</td>
<td>gives (or takes) prestige experience to a character
</td>
<td>Unspecified
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>add_prestige_level
</td>
<td>increases (or decreases) the prestige level of a character
</td>
<td>Unspecified
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>add_realm_law
</td>
<td>Adds the given law to the scoped character
</td>
<td>Unspecified
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>add_realm_law_skip_effects
</td>
<td>Adds the given law to the scoped character. Skips the cost and the pass effect, and the revoke effects of the current law
</td>
<td>Unspecified
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>add_scheme_cooldown
</td>
<td>Sets a scheme cooldown for the scope character towards = { target=target_character type=scheme_type days/weeks/months/years = duration }
</td>
<td>Unspecified
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>add_secret
</td>
<td>Adds a secret
</td>
<td>add_secret = { type = X target = Y }
<p>Note that if you create a Secret in the immediate effect, the tooltips for other effects run in that Secret's scope (such as reveal_to) are likely to be displayed incorrectly, or not to be displayed at all. This is due to the game generating the tooltip before it actually has a Secret that exists to work off of.
Test rigorously and use custom tooltips if necessary. Creating a Secret in the immediate and then running effects on it in an event option should produce perfectly normal tooltips.
</p>
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>add_stewardship_lifestyle_perk_points
</td>
<td>Adds lifestyle per points to the given character
</td>
<td>Unspecified
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>add_stewardship_lifestyle_xp
</td>
<td>Adds lifestyle XP to the given character
</td>
<td>Unspecified
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>add_stress
</td>
<td>Increases stress of a character. Negative values decrease stress.
</td>
<td>Unspecified
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>add_targeting_factions_discontent
</td>
<td>add_targeting_factions_discontent = X adds (or subtracts) discontent to all the factions that are targeting the scope character
</td>
<td>Unspecified
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>add_to_scheme
</td>
<td>Adds a character as an agent to the scheme
</td>
<td>Unspecified
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>add_trait
</td>
<td>Adds a trait to a character (the trait will not be added and no tooltip will be shown if the character isn't eligible for the trait, i.e. when already having the trait, having an opposing trait, not fulfilling the trait's is_potential trigger or being outside of the trait's range)
</td>
<td>Unspecified
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>add_trait_force_tooltip
</td>
<td>Adds a trait to a character (if the add_trait effect would not add the trait - i.e. when already having the trait, having an opposing trait, not fulfilling the trait's is_potential trigger or being outside of the trait's range - a tooltip will be shown but the trait will not be added)
</td>
<td>Unspecified
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>add_truce_both_ways
</td>
<td>Sets the both-way truce against the specified character
<p>'character' specifies the target character
'override' says whether it should replace the previous truce even if shorter
'years / months / days' sets the duration of the truce
'result' specifies the result from the scope character's point of view ('white_peace' by default)
'casus_belli' sets the casus belli scope that caused the truce, mutually exclusive with 'name'
'name' sets a custom description. Dynamic description with the current scope
'war' sets the war that caused the truce, mutually exclusive with 'casus_belli'
</p>
</td>
<td>add_truce_both_ways = { character = X years/months/days = Y override = yes/no result = victory/defeat/white_peace casus_belli/war = Z }
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>add_truce_one_way
</td>
<td>Sets the truce against the specified character
<p>'character' specifies the target character
'override' says whether it should replace the previous truce even if shorter
'years / months / days' sets the duration of the truce
'result' specifies the result from the scope character's point of view ('white_peace' by default)
'casus_belli' sets the casus belli scope that caused the truce, mutually exclusive with 'name'
'name' sets a custom description. Dynamic description with the current scope
</p>
</td>
<td>add_truce_one_way = { character = X years/months/days = Y override = yes/no result = victory/defeat/white_peace casus_belli/war = Z }
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>add_tyranny
</td>
<td>adds (or removes) tyranny to (or from) a character
</td>
<td>Unspecified
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>add_unpressed_claim
</td>
<td>gives an unpressed claim to a character
</td>
<td>Unspecified
</td>
<td>character
</td>
<td>landed title
</td></tr>
<tr>
<td>add_visiting_courtier
</td>
<td>Add the target character as the scope character's guest
</td>
<td>Unspecified
</td>
<td>character
</td>
<td>character
</td></tr>
<tr>
<td>allow_alliance
</td>
<td>Allows (previously broken) alliance with the target character
</td>
<td>Unspecified
</td>
<td>character
</td>
<td>character
</td></tr>
<tr>
<td>allow_in_scheme
</td>
<td>Allow the character to join the scheme as an agent
</td>
<td>Unspecified
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>apply_ai_vassal_obligation_liege_most_desired
</td>
<td>Apply the new level for the most desired AI obligation level the liege in the contract wants
</td>
<td>Unspecified
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>apply_ai_vassal_obligation_vassal_most_desired
</td>
<td>Apply the new level for the most desired AI obligation level the vassal in the contract wants
</td>
<td>Unspecified
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>assign_council_task
</td>
<td>Assigns the target character to the council task
</td>
<td>
<pre>assign_council_task = {
    council_task = council_task_scope
    target = character_taking_the_position
    fire_on_actions = [yes]
}
</pre>
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>assign_councillor_type
</td>
<td>Assigns the target character to the first available council position of the type available. { type = council_position_type_key target = character_taking_the_position fire_on_actions = [yes] }
</td>
<td>Unspecified
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>banish
</td>
<td>The character gets banished.
</td>
<td>Unspecified
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>becomes_independent
</td>
<td>becomes and independent ruler
</td>
<td>becomes_independent = { change = 'previously created title_and_vassal_change'
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>break_alliance
</td>
<td>Breaks the alliance with the target character
</td>
<td>Unspecified
</td>
<td>character
</td>
<td>character
</td></tr>
<tr>
<td>cancel_truce_both_ways
</td>
<td>Ends the truce against the specified character, and theirs against the scoped character.
</td>
<td>cancel_truce_both_ways = scope:character
</td>
<td>character
</td>
<td>character
</td></tr>
<tr>
<td>cancel_truce_one_way
</td>
<td>Ends the truce against the specified character.
</td>
<td>cancel_truce_one_way = scope:character
</td>
<td>character
</td>
<td>character
</td></tr>
<tr>
<td>change_current_weight
</td>
<td>Change the current weight of the scoped character
</td>
<td>change_current_weight = 20
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>change_first_name
</td>
<td>Change the first name of a character
</td>
<td>change_first_name = &lt;localization_key&gt;
<p>change_first_name = scope:name/var:name # containing a flag with a localization key
change_first_name = { template_character = scope:character } # copy name from the template character
</p>
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>change_government
</td>
<td>changes the government of a character
</td>
<td>Unspecified
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>change_liege
</td>
<td>= { liege = 'Character that should become the new liege' change = 'previously created title_and_vassal_change', adds a liege change
</td>
<td>Unspecified
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>change_prison_type
</td>
<td>Changes the charater's prison type. Scoped character is the prisoner. Accepts any static modifier (see also improson effect).
</td>
<td>change_prison_type = house_arrest
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>change_target_weight
</td>
<td>Change the target weight of the scoped character
</td>
<td>change_target_weight = 20
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>clear_forced_vote
</td>
<td>Clears forced voting
</td>
<td>clear_forced_vote = yes
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>consume_banish_reasons
</td>
<td>'Consume' all banish reasons that the scoped character has on the target character. Until they get a new reason, they cannot banish the target again.
</td>
<td>Unspecified
</td>
<td>character
</td>
<td>character
</td></tr>
<tr>
<td>consume_divorce_reasons
</td>
<td>'Consume' all divorce reason that the scoped character has on the target character. Until they get a new reason, they cannot divorce the target again.
</td>
<td>Unspecified
</td>
<td>character
</td>
<td>character
</td></tr>
<tr>
<td>consume_execute_reasons
</td>
<td>'Consume' all execute reasons that the scoped character has on the target character. Until they get a new reason, they cannot execute the target again.
</td>
<td>Unspecified
</td>
<td>character
</td>
<td>character
</td></tr>
<tr>
<td>consume_imprisonment_reasons
</td>
<td>'Consume' all imprisonment reasons that the scoped character has on the target character. Until they get a new reason, they cannot imprison the target again.
</td>
<td>Unspecified
</td>
<td>character
</td>
<td>character
</td></tr>
<tr>
<td>consume_revoke_title_reason
</td>
<td>'Consume' 1 revoke title reason that the scoped character has on the target character.
</td>
<td>Unspecified
</td>
<td>character
</td>
<td>character
</td></tr>
<tr>
<td>copy_inheritable_appearance_from
</td>
<td>copies the inheritable appearance attributes (inheritable genes in the character's DNA string) from the target character to the scoped character
</td>
<td>Unspecified
</td>
<td>character
</td>
<td>character
</td></tr>
<tr>
<td>create_alliance
</td>
<td>Create an alliance between the scoped character and the target. The allied through characters determine who gets checked against for if the alliance should persist or not.
</td>
<td>
<pre>create_alliance = {
	target = scope
	allied_through_owner = scope
	allied_through_target = scope
}
</pre>
<p>OR as a short hand use just the target to use the owner and target as the allied through characters
create_alliance = scope
</p>
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>create_cadet_branch
</td>
<td scope="">no]
</td>
<td>Unspecified
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>create_faction
</td>
<td>the scoped character creates a faction of the specified type against the specified target, create_faction = { type = X target = Y }
</td>
<td>Unspecified
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>create_story
</td>
<td>Creates and initializes a story cycle with the current character as owner
</td>
<td>create_story = story_type<br /><pre>create_story = {
	type = story_type
	save_scope_as/save_temporary_scope_as = scope_name # optional way to get a reference to the new story
}
</pre>
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>death
</td>
<td>kills a character, death = { killer = X death_reason = Y }, X is a character and Y is one of the death reason keys. Or death = natural which will pick a natural death reason to kill the character from.
</td>
<td>Unspecified
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>depose
</td>
<td>The character gets deposed.
</td>
<td>Unspecified
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>destroy_title
</td>
<td>Destroys a title
</td>
<td>Unspecified
</td>
<td>character
</td>
<td>landed title
</td></tr>
<tr>
<td>end_pregnancy
</td>
<td>end a pregnancy
</td>
<td>Unspecified
</td>
<td>character
</td>
<td>
</td></tr>

<tr>
<td>execute_decision
</td>
<td>Execute the specified decision for the scoped character
</td>
<td>Unspecified
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>finish_council_task
</td>
<td>The councillor finish the current assigned task successfully.
</td>
<td>Unspecified
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>fire_councillor
</td>
<td>The scope character fires the target character form teh council.
</td>
<td>Unspecified
</td>
<td>character
</td>
<td>character
</td></tr>
<tr>
<td>forbid_from_scheme
</td>
<td>Forbid the scope character from joining the target scheme as an agent (and kick the character out if already in the scheme)
</td>
<td>Unspecified
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>force_add_to_scheme
</td>
<td>Adds a character as an agent to the scheme and forces them to stay
</td>
<td>
<pre>force_add_to_scheme = {
    scheme = target_Scheme
    days/months/years = duration
}
</pre>
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>force_vote_as
</td>
<td>Forces the character to vote the same as the target
</td>
<td>force_vote_as = { target = someone days/months/years = x }
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>get_title
</td>
<td>gives a title to a character
</td>
<td>Unspecified
</td>
<td>character
</td>
<td>landed title
</td></tr>
<tr>
<td>give_nickname
</td>
<td>Give a nickname to this character
</td>
<td>Unspecified
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>imprison
</td>
<td>Imprisons the target character as this character's prisoner, imprison = { target = X reason = Y type = Z }, X is a character, Y is a flag, Z is a static modifier
</td>
<td>Unspecified
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>join_faction
</td>
<td>the character in the scope joins the assigned faction
</td>
<td>Unspecified
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>join_faction_forced
</td>
<td>The character in the scope is forced to join a faction by a character for a defined time
</td>
<td><pre>join_faction_forced = {
    faction = X
    forced_by = Y
    days/months/years = duration
}
</pre>
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>join_faction_skip_check
</td>
<td>the character in the scope joins the assigned faction skiping the can_character_join trigger
</td>
<td>Unspecified
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>leave_faction
</td>
<td>the charcter in the scope leaves the assigned faction
</td>
<td>Unspecified
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>make_claim_strong
</td>
<td>makes a claim strong (character adds the claim if not having it already)
</td>
<td>Unspecified
</td>
<td>character
</td>
<td>landed title
</td></tr>
<tr>
<td>make_claim_weak
</td>
<td>makes a claim weak (character adds the claim if not having it already)
</td>
<td>Unspecified
</td>
<td>character
</td>
<td>landed title
</td></tr>
<tr>
<td>make_concubine
</td>
<td>Makes the target character a concubine of the scope character, the target should not be imprisoned
</td>
<td>Unspecified
</td>
<td>character
</td>
<td>character
</td></tr>
<tr>
<td>make_pregnant
</td>
<td>makes a character pregnant
</td>
<td>make_pregnant = {
<pre>father = 'the real father'
number_of_children = X
known_bastard = yes/no
</pre>
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>make_trait_active
</td>
<td>Activates an inactive trait. Tooltip will not be shown if the character cannot have the trait.
</td>
<td>Unspecified
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>make_trait_active_force_tooltip
</td>
<td>Activates an inactive trait. Tooltip will be shown even if the character cannot have the trait.
</td>
<td>Unspecified
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>make_trait_inactive
</td>
<td>Makes a current trait of a character inactive. Tooltip will not be shown if the character doesn't have the trait. NOTE: If the character doesn't currently have the trait, it will be added to the character!
</td>
<td>Unspecified
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>make_trait_inactive_force_tooltip
</td>
<td>Makes a current trait of a character inactive. Tooltip will be shown even if the character doesn't have the trait. NOTE: If the character doesn't currently have the trait, it will be added to the character!
</td>
<td>Unspecified
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>make_unprunable
</td>
<td>The scope character will no longer be prunable after their death. Use with care, as this will make everyone related to them unprunable too. So you should only use this if someone absolutely *needs* to stick around several years after their death. Example: make_unprunable = yes
</td>
<td>Unspecified
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>marry
</td>
<td>Marries the scoped character to the target character
</td>
<td>marry = target
</td>
<td>character
</td>
<td>character
</td></tr>
<tr>
<td>marry_matrilineal
</td>
<td>Marries the scoped character to the target character matrilineally
</td>
<td>marry_matrilineal = target
</td>
<td>character
</td>
<td>character
</td></tr>
<tr>
<td>move_to_pool
</td>
<td>The scoped character (courtier or guest) leaves their current court and moves into the pool
</td>
<td>scope:guest = { move_to_pool = yes }
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>move_to_pool_at
</td>
<td>The scoped character (courtier/guest/pool character) leaves their current court (if any) and moves into the pool of the specified province
</td>
<td>scope:guest = { move_to_pool_at = scope:some_province }
</td>
<td>character
</td>
<td>province
</td></tr>
<tr>
<td>pay_long_term_gold
</td>
<td>the scope character pays gold to the target character, pay_gold = { target = X gold = Y } (AI budget category long term)
</td>
<td>Unspecified
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>pay_long_term_income
</td>
<td>the scope character immediately pays gold corresponding to their income to the target character, pay_income = { target = X days/months/years = Y } (AI budget long term)
</td>
<td>Unspecified
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>pay_short_term_gold
</td>
<td>the scope character pays gold to the target character, pay_gold = { target = X gold = Y } (AI budget category short term)
</td>
<td>Unspecified
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>pay_short_term_income
</td>
<td>the scope character immediately pays gold corresponding to their income to the target character, pay_income = { target = X days/months/years = Y } (AI budget short term)
</td>
<td>Unspecified
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>play_music_cue
</td>
<td>Plays the specified music cue.
</td>
<td>Unspecified
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>recalculate_scripted_relation
</td>
<td>Recalculates the effect of a scripted relation
</td>
<td>recalculate_scripted_relation= friend
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>recruit_courtier
</td>
<td>Recruits the target to become a courtier.
</td>
<td>scope:liege = { recruit_courtier = scope:new_courtier }
</td>
<td>character
</td>
<td>character
</td></tr>
<tr>
<td>refund_all_perks
</td>
<td>Refunds all perks of the character. Example: refund_all_perks = yes
</td>
<td>Unspecified
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>refund_perks
</td>
<td>Refunds all perks of the RHS lifestyle. Example: refund_perks = intrigue_lifestyle
</td>
<td>Unspecified
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>release_from_prison
</td>
<td>releases the character from the prison, imprison = X, X is a boolean value
</td>
<td>Unspecified
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>remove_all_character_modifier_instances
</td>
<td>Remove all instances of a modifier from a character
</td>
<td>remove_all_character_modifier_instances = name
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>remove_character_flag
</td>
<td>removes a character flag
</td>
<td>Unspecified
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>remove_character_modifier
</td>
<td>Remove a modifier from a character
</td>
<td>remove_character_modifier = name
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>remove_claim
</td>
<td>removes an explicit (not from a living parent/grand parent) claim
</td>
<td>Unspecified
</td>
<td>character
</td>
<td>landed title
</td></tr>
<tr>
<td>remove_concubine
</td>
<td>Removes the target character as a concubine of the scope character
</td>
<td>Unspecified
</td>
<td>character
</td>
<td>character
</td></tr>
<tr>
<td>remove_courtier_or_guest
</td>
<td>Removes the target character (guest or courtier) from the scope character's court
</td>
<td>scope:host = { remove_courtier_or_guest = scope:guest } # move to pool, staying in same province
<p>scope:host = {
	remove_courtier_or_guest = {
		character = scope:guest
		new_location = scope:some_province # optionally specify a new location
	}
}
</p>
</td>
<td>character
</td>
<td>character
</td></tr>
<tr>
<td>remove_decision_cooldown
</td>
<td>Remove the cooldown on taking a decision for the scoped character
</td>
<td>remove_decision_cooldown = decision_name
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>remove_hook
</td>
<td>Removes a hook on a character, remove_hook = { target = X, type = Y }, if type is specified, the hook will only be removed if it is of that type
</td>
<td>Unspecified
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>remove_interaction_cooldown
</td>
<td>Remove the cooldown on using an interaction for the scoped character
</td>
<td>remove_interaction_cooldown = interaction_name
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>remove_interaction_cooldown_against
</td>
<td>Remove the cooldown on using an interaction against the target character for the scoped character
</td>
<td>remove_interaction_cooldown_against = { interaction = interaction_name target = character }
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>remove_long_term_gold
</td>
<td>removes gold from a character (AI's long term budget)
</td>
<td>Unspecified
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>remove_nickname
</td>
<td>no]
</td>
<td>Unspecified
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>remove_opinion
</td>
<td>Removes a temporary opinion modifier, remove_opinion = { target = X modifier = Y single = Z (no by default) } X is a character, Y is the opinion modifier, Z tells whether to remove all instances of the modifier or just one
</td>
<td>Unspecified
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>remove_perk
</td>
<td>Remove the perk for this character
</td>
<td>Unspecified
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>remove_realm_law
</td>
<td>Removes the given law from the scoped character. This will leave the law group empty, so only do this if you're getting rid of a law group
</td>
<td>Unspecified
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>remove_relation_best_friend
</td>
<td>Removes scripted relationship
</td>
<td>Unspecified
</td>
<td>character
</td>
<td>character
</td></tr>
<tr>
<td>remove_relation_bully
</td>
<td>Removes scripted relationship
</td>
<td>Unspecified
</td>
<td>character
</td>
<td>character
</td></tr>
<tr>
<td>remove_relation_court_physician
</td>
<td>Removes scripted relationship
</td>
<td>Unspecified
</td>
<td>character
</td>
<td>character
</td></tr>
<tr>
<td>remove_relation_crush
</td>
<td>Removes scripted relationship
</td>
<td>Unspecified
</td>
<td>character
</td>
<td>character
</td></tr>
<tr>
<td>remove_relation_flag
</td>
<td>Removed a flag from an existing relation flag = flag_name (declared in scripted_relation) target = other_character relation = scripted_relation
</td>
<td>Unspecified
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>remove_relation_friend
</td>
<td>Removes scripted relationship
</td>
<td>Unspecified
</td>
<td>character
</td>
<td>character
</td></tr>
<tr>
<td>remove_relation_guardian
</td>
<td>Removes scripted relationship
</td>
<td>Unspecified
</td>
<td>character
</td>
<td>character
</td></tr>
<tr>
<td>remove_relation_intrigue_mentor
</td>
<td>Removes scripted relationship
</td>
<td>Unspecified
</td>
<td>character
</td>
<td>character
</td></tr>
<tr>
<td>remove_relation_intrigue_student
</td>
<td>Removes scripted relationship
</td>
<td>Unspecified
</td>
<td>character
</td>
<td>character
</td></tr>
<tr>
<td>remove_relation_lover
</td>
<td>Removes scripted relationship
</td>
<td>Unspecified
</td>
<td>character
</td>
<td>character
</td></tr>
<tr>
<td>remove_relation_mentor
</td>
<td>Removes scripted relationship
</td>
<td>Unspecified
</td>
<td>character
</td>
<td>character
</td></tr>
<tr>
<td>remove_relation_nemesis
</td>
<td>Removes scripted relationship
</td>
<td>Unspecified
</td>
<td>character
</td>
<td>character
</td></tr>
<tr>
<td>remove_relation_oaf
</td>
<td>Removes scripted relationship
</td>
<td>Unspecified
</td>
<td>character
</td>
<td>character
</td></tr>
<tr>
<td>remove_relation_potential_friend
</td>
<td>Removes scripted relationship
</td>
<td>Unspecified
</td>
<td>character
</td>
<td>character
</td></tr>
<tr>
<td>remove_relation_potential_lover
</td>
<td>Removes scripted relationship
</td>
<td>Unspecified
</td>
<td>character
</td>
<td>character
</td></tr>
<tr>
<td>remove_relation_potential_rival
</td>
<td>Removes scripted relationship
</td>
<td>Unspecified
</td>
<td>character
</td>
<td>character
</td></tr>
<tr>
<td>remove_relation_rival
</td>
<td>Removes scripted relationship
</td>
<td>Unspecified
</td>
<td>character
</td>
<td>character
</td></tr>
<tr>
<td>remove_relation_soldier_friend
</td>
<td>Removes scripted relationship
</td>
<td>Unspecified
</td>
<td>character
</td>
<td>character
</td></tr>
<tr>
<td>remove_relation_soulmate
</td>
<td>Removes scripted relationship
</td>
<td>Unspecified
</td>
<td>character
</td>
<td>character
</td></tr>
<tr>
<td>remove_relation_student
</td>
<td>Removes scripted relationship
</td>
<td>Unspecified
</td>
<td>character
</td>
<td>character
</td></tr>
<tr>
<td>remove_relation_victim
</td>
<td>Removes scripted relationship
</td>
<td>Unspecified
</td>
<td>character
</td>
<td>character
</td></tr>
<tr>
<td>remove_relation_ward
</td>
<td>Removes scripted relationship
</td>
<td>Unspecified
</td>
<td>character
</td>
<td>character
</td></tr>
<tr>
<td>remove_scheme_cooldown_against
</td>
<td>Remove the cooldown on using a scheme against the target character for the scoped character
</td>
<td>remove_scheme_cooldown_against = { scheme = scheme_name target = character }
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>remove_short_term_gold
</td>
<td>removes gold from a character (AI's short term budget)
</td>
<td>Unspecified
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>remove_trait
</td>
<td>Removes a trait from a character. Tooltip will not be shown if the character doesn't have the trait.
</td>
<td>Unspecified
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>remove_trait_force_tooltip
</td>
<td>Removes a trait from a character. Tooltip will be shown even if the character doesn't have the trait.
</td>
<td>Unspecified
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>reset_beneficiary
</td>
<td>The target character stops having a beneficiary
</td>
<td>reset_beneficiary = yes
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>return_to_court
</td>
<td>Returns the scope character to the employers court.
</td>
<td>Unspecified
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>reverse_add_opinion
</td>
<td>Adds a temporary reverse opinion modifier. X is a scripted modifier name. Y can be a value or a range "{ A B }" If no timeout are specified, the modifier's scripted default timeout will be used.
</td>
<td>reverse_add_opinion = { modifier = X days/months/years = Y target = Z }
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>scriptedtests_recalculate_character_modifier
</td>
<td>Recalculates the modifier of the scoped character
</td>
<td>Unspecified
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>scriptedtests_recalculate_succession
</td>
<td>Recalculates the line of succession of the scoped character
</td>
<td>Unspecified
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>send_interface_message
</td>
<td>Sends a message to the player playing the character in the scope and then executes any effects inside.
<p>For the message text and tooltip, $EFFECT$ contains the text description of the effects in the past tense.
And $DESC$ contains the text from the desc field.
</p>
</td>
<td>
<pre>send_interface_message = {
	type = message_type # default: send_interface_message
	title = LOCALIZATION # optional, otherwise takes it from the message type
	desc = LOCALIZATION # optional, otherwise takes it from the message type
	tooltip = LOCALIZATION # optional, otherwise takes it from the message type
	left_icon = scope:recipient # optional, character or title
	right_icon = scope:the_title # optional, character or title
	goto = scope:the_title # optional, character, barony title, province will add a goto button
	# optional effects...
	add_dread = 5
	scope:someone = { add_gold = 5 }
}
</pre>
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>send_interface_toast
</td>
<td>Sends a message to the player playing the character in the scope and then executes any effects inside.
<p>For the message text and tooltip, $EFFECT$ contains the text description of the effects in the past tense.
And $DESC$ contains the text from the desc field.
</p>
</td>
<td>
<pre>send_interface_toast = {
	type = message_type # default: send_interface_toast
	title = LOCALIZATION # optional, otherwise takes it from the message type
	desc = LOCALIZATION # optional, otherwise takes it from the message type
	tooltip = LOCALIZATION # optional, otherwise takes it from the message type
	left_icon = scope:recipient # optional, character or title
	right_icon = scope:the_title # optional, character or title
	goto = scope:the_title # optional, character, barony title, province will add a goto button
	# optional effects...
	add_dread = 5
	scope:someone = { add_gold = 5 }
}
</pre>
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>set_absolute_country_control
</td>
<td>Sets if this character has absolute country control, unlock_character_movement = yes/no/boolean event target
</td>
<td>Unspecified
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>set_beneficiary
</td>
<td>The target character becomes the beneficiary of the scoped character. set_beneficiary = some character
</td>
<td>Unspecified
</td>
<td>character
</td>
<td>character
</td></tr>
<tr>
<td>set_character_faith
</td>
<td>Changes what faith a character has executing the effects for it. For history setup use 'set_character_faith_history' instead.
</td>
<td>Unspecified
</td>
<td>character
</td>
<td>faith
</td></tr>
<tr>
<td>set_character_faith_history
</td>
<td>Changes what faith a character has NOT executing the effects for it. USE ONLY IN HISOTRY SETUP!
</td>
<td>Unspecified
</td>
<td>character
</td>
<td>faith
</td></tr>
<tr>
<td>set_character_faith_with_conversion
</td>
<td>Changes what faith a character has, as if they used the faith-view interaction (minus the piety cost). So vassals who'd accept will get converted, as will capitals
</td>
<td>set_character_faith_with_conversion = faith:&lt;religion&gt;
</td>
<td>character
</td>
<td>faith
</td></tr>
<tr>
<td>set_child_of_concubine_on_pregnancy
</td>
<td>Sets the child to be (or not be) a child of a concubine during pregnancy
</td>
<td>Unspecified
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>set_council_task
</td>
<td>Sets the task of the scope councillor { task_type = council_position_type_key target = for_targeted_tasks  }
</td>
<td>Unspecified
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>set_culture
</td>
<td>Set the culture for this character
</td>
<td>Unspecified
</td>
<td>character
</td>
<td>culture
</td></tr>
<tr>
<td>set_culture_same_as
</td>
<td>Sets the culture of the character to be the same as the culture of the target
</td>
<td>Unspecified
</td>
<td>character
</td>
<td>character
</td></tr>
<tr>
<td>set_death_reason
</td>
<td>sets the death reason and the killer of a dead character, set_death_reason = { killer = X death_reason = Y }, both parameters are optional
</td>
<td>Unspecified
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>set_default_education
</td>
<td>Set the default education focus for this character
</td>
<td>Unspecified
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>set_designated_heir
</td>
<td>Sets the given character as designated heir
</td>
<td>Unspecified
</td>
<td>character
</td>
<td>character
</td></tr>
<tr>
<td>set_employer
</td>
<td>Add the scope character to the target character's court
</td>
<td>Unspecified
</td>
<td>character
</td>
<td>character
</td></tr>
<tr>
<td>set_father
</td>
<td>sets the father of a character
</td>
<td>Unspecified
</td>
<td>character
</td>
<td>character
</td></tr>
<tr>
<td>set_focus
</td>
<td>Set the focus for this character
</td>
<td>Unspecified
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>set_house
</td>
<td>Sets the dynasty house of the character
</td>
<td>Unspecified
</td>
<td>character
</td>
<td>dynasty house
</td></tr>
<tr>
<td>set_immortal_age
</td>
<td>Changes what age the character became immortal at. Only works if already immortal
</td>
<td>set_immortal_age = 20
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>set_killer_public
</td>
<td>Sets the scoped character's killer as being publicly known
</td>
<td>set_killer_public = bool
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>set_known_bastard_on_pregnancy
</td>
<td>Sets the child to a known or unknown bastard during pregnancy
</td>
<td>Unspecified
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>set_num_pregnancy_children
</td>
<td>Set the number of children
</td>
<td>Unspecified
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>set_override_designated_winner
</td>
<td>The scoped character will put their beneficiary on the throne if they're the #1 participant if this is called with 'yes'. Call with 'no' to turn it off again. set_override_designate_winner = yes/no
</td>
<td>Unspecified
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>set_player_character
</td>
<td>The scope character's player will now play as the target character. Scope must be player-controlled. Target cannot be player-controlled. Example: make_unprunable = yes
</td>
<td>Unspecified
</td>
<td>character
</td>
<td>character
</td></tr>
<tr>
<td>set_pregnancy_assumed_father
</td>
<td>Set the assumed father of the pregnancy
</td>
<td>Unspecified
</td>
<td>character
</td>
<td>character
</td></tr>
<tr>
<td>set_primary_spouse
</td>
<td>Set the primary spouse of a character
</td>
<td>set_primary_spouse = scope
</td>
<td>character
</td>
<td>character
</td></tr>
<tr>
<td>set_primary_title_to
</td>
<td>Sets the primary title for a character
</td>
<td>set_primary_title_to = &lt;title&gt;
</td>
<td>character
</td>
<td>landed title
</td></tr>
<tr>
<td>set_real_father
</td>
<td>Changes the real father of the character scope
</td>
<td>Unspecified
</td>
<td>character
</td>
<td>character
</td></tr>
<tr>
<td>set_realm_capital
</td>
<td>Set a new realm capital
</td>
<td>character = { set_realm_capital = new_title }
</td>
<td>character
</td>
<td>landed title
</td></tr>
<tr>
<td>set_relation_best_friend
</td>
<td>Sets scripted relationship
</td>
<td>Unspecified
</td>
<td>character
</td>
<td>character
</td></tr>
<tr>
<td>set_relation_bully
</td>
<td>Sets scripted relationship
</td>
<td>Unspecified
</td>
<td>character
</td>
<td>character
</td></tr>
<tr>
<td>set_relation_court_physician
</td>
<td>Sets scripted relationship
</td>
<td>Unspecified
</td>
<td>character
</td>
<td>character
</td></tr>
<tr>
<td>set_relation_crush
</td>
<td>Sets scripted relationship
</td>
<td>Unspecified
</td>
<td>character
</td>
<td>character
</td></tr>
<tr>
<td>set_relation_friend
</td>
<td>Sets scripted relationship
</td>
<td>Unspecified
</td>
<td>character
</td>
<td>character
</td></tr>
<tr>
<td>set_relation_guardian
</td>
<td>Sets scripted relationship
</td>
<td>Unspecified
</td>
<td>character
</td>
<td>character
</td></tr>
<tr>
<td>set_relation_intrigue_mentor
</td>
<td>Sets scripted relationship
</td>
<td>Unspecified
</td>
<td>character
</td>
<td>character
</td></tr>
<tr>
<td>set_relation_intrigue_student
</td>
<td>Sets scripted relationship
</td>
<td>Unspecified
</td>
<td>character
</td>
<td>character
</td></tr>
<tr>
<td>set_relation_lover
</td>
<td>Sets scripted relationship
</td>
<td>Unspecified
</td>
<td>character
</td>
<td>character
</td></tr>
<tr>
<td>set_relation_mentor
</td>
<td>Sets scripted relationship
</td>
<td>Unspecified
</td>
<td>character
</td>
<td>character
</td></tr>
<tr>
<td>set_relation_nemesis
</td>
<td>Sets scripted relationship
</td>
<td>Unspecified
</td>
<td>character
</td>
<td>character
</td></tr>
<tr>
<td>set_relation_oaf
</td>
<td>Sets scripted relationship
</td>
<td>Unspecified
</td>
<td>character
</td>
<td>character
</td></tr>
<tr>
<td>set_relation_potential_friend
</td>
<td>Sets scripted relationship
</td>
<td>Unspecified
</td>
<td>character
</td>
<td>character
</td></tr>
<tr>
<td>set_relation_potential_lover
</td>
<td>Sets scripted relationship
</td>
<td>Unspecified
</td>
<td>character
</td>
<td>character
</td></tr>
<tr>
<td>set_relation_potential_rival
</td>
<td>Sets scripted relationship
</td>
<td>Unspecified
</td>
<td>character
</td>
<td>character
</td></tr>
<tr>
<td>set_relation_rival
</td>
<td>Sets scripted relationship
</td>
<td>Unspecified
</td>
<td>character
</td>
<td>character
</td></tr>
<tr>
<td>set_relation_soldier_friend
</td>
<td>Sets scripted relationship
</td>
<td>Unspecified
</td>
<td>character
</td>
<td>character
</td></tr>
<tr>
<td>set_relation_soulmate
</td>
<td>Sets scripted relationship
</td>
<td>Unspecified
</td>
<td>character
</td>
<td>character
</td></tr>
<tr>
<td>set_relation_student
</td>
<td>Sets scripted relationship
</td>
<td>Unspecified
</td>
<td>character
</td>
<td>character
</td></tr>
<tr>
<td>set_relation_victim
</td>
<td>Sets scripted relationship
</td>
<td>Unspecified
</td>
<td>character
</td>
<td>character
</td></tr>
<tr>
<td>set_relation_ward
</td>
<td>Sets scripted relationship
</td>
<td>Unspecified
</td>
<td>character
</td>
<td>character
</td></tr>
<tr>
<td>set_sexuality
</td>
<td>Sets the sexuality of the character
</td>
<td>Unspecified
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>set_to_lowborn
</td>
<td>Set the character to lowborn
</td>
<td>Unspecified
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>set_vassal_contract_modification_blocked
</td>
<td>Blocks the vassal contract from being modified with regards to being checked by 'vassal_contract_is_blocked_from_modification'
</td>
<td>Unspecified
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>spawn_army
</td>
<td>Spawns an army for this character. If the character is not at war, the regiments will be created, but the army will not be spawned.
</td>
<td>
<pre>spawn_army = {
	levies = int/script value # optional, number of men
	men_at_arms = { # optional, multiple can be specified. Need either levies or MAA
        type = key
        men/stacks = int/script value
    }
	location = province
	origin = province # optional, location used if not set. This is used for where to base bonuses and the like on
	war = war # optional. If set, the stack will disband after the war ends
	inheritable = yes/no # Default: yes
	uses_supply = yes/no # Default: yes
	army = army # optional. If set, the stack will merge into this army
    save_scope_as/save_temporary_scope_as = new_army # optional way to get a reference to the new army. Note this might not be set if the army wasn't spawned (e.g. if the character is not at war)
    name = description # gives the troops a specific name that shows up in interfaces
}
</pre>
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>start_default_task
</td>
<td>Force the Councillor to revert to the default task. Any relevant percentage progress will be lost (even if the councillor was performing the default task already).
</td>
<td>Unspecified
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>start_scheme
</td>
<td>starts a scheme  = { type = X target = Y }
</td>
<td>Unspecified
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>start_war
</td>
<td>Starts a war. X is a casus belli type, Y is the target character, Z i the (optional) claimant, W1, W2.... are targeted titles. If there are no title targets, the effect will pick one of possible title targets.
</td>
<td>start_war = { casus_belli/cb = X target = Y claimant = Z target_title = W1 target_title = W2 ... }
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>stress_impact
</td>
<td>Stress impact according to specified traits (trait = value), use base = value for a base value that's always added
</td>
<td>Unspecified
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>use_hook
</td>
<td>Uses a hook a character has (removes if weak, puts on cooldown if strong)
</td>
<td>use_hook = some_character
</td>
<td>character
</td>
<td>character
</td></tr>
<tr>
<td>vassal_contract_decrease_obligation_level
</td>
<td>decrease the obligation level of the scoped character's vassal contract
</td>
<td>Unspecified
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>vassal_contract_increase_obligation_level
</td>
<td>increase the obligation level of the scoped character's vassal contract
</td>
<td>Unspecified
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>vassal_contract_set_obligation_level
</td>
<td>change the obligation level of the scoped character's vassal contract
</td>
<td>vassal_contract_set_obligation_level = { type = name level = 1 } # index to obligation level
<p>vassal_contract_set_obligation_level = { type = name level = feudal_obligation_low }
</p>
</td>
<td>character
</td>
<td>
</td></tr>
<tr>
<td>visit_court_of
</td>
<td>Add the scope character as the target character's guest
</td>
<td>Unspecified
</td>
<td>character
</td>
<td>character
</td></tr></tbody></table>
<h4><span id="Beginning_with_'every'"></span><span class="mw-headline" id="Beginning_with_.27every.27">Beginning with 'every'</span><span class="mw-editsection"><span class="mw-editsection-bracket">[</span><a href="/index.php?title=Effects&amp;action=edit&amp;section=15" title="Edit section: Beginning with &#039;every&#039;">edit</a><span class="mw-editsection-bracket">]</span></span></h4>
<table class="wikitable sortable" width="100%">
<tbody><tr>
<th width="15%">Name
</th>
<th width="15%">Description
</th>
<th width="25%">Usage
</th>
<th width="20%">Supported scopes
</th>
<th width="20%">Supported targets
</th></tr>
<tr>
<td>every_alert_creatable_title
</td>
<td>Iterate through all titles that can be created by the character. (only for alerts)
</td>
<td>every_alert_creatable_title = { limit = { &lt;triggers&gt; } &lt;effects&gt; }
</td>
<td>character
</td>
<td>landed title
</td></tr>
<tr>
<td>every_alert_usurpable_title
</td>
<td>Iterate through all titles that can be usurped by the character. (only for alerts)
</td>
<td>every_alert_usurpable_title = { limit = { &lt;triggers&gt; } &lt;effects&gt; }
</td>
<td>character
</td>
<td>landed title
</td></tr>
<tr>
<td>every_ally
</td>
<td>Iterate through all allies
</td>
<td>every_ally = { limit = { &lt;triggers&gt; } &lt;effects&gt; }
</td>
<td>character
</td>
<td>character
</td></tr>
<tr>
<td>every_ancestor
</td>
<td>Iterate through all the ancestors of the scope character up to 5 generations
</td>
<td>every_ancestor = { limit = { &lt;triggers&gt; } &lt;effects&gt; }
</td>
<td>character
</td>
<td>character
</td></tr>
<tr>
<td>every_army
</td>
<td>Iterate through all armies
</td>
<td>every_army = { limit = { &lt;triggers&gt; } &lt;effects&gt; }
</td>
<td>character
</td>
<td>army
</td></tr>
<tr>
<td>every_character_to_title_neighboring_and_across_water_barony
</td>
<td>Scopes from a character to a neighboring barony (incl. across water, looking trough the de Jure lieges)
</td>
<td>every_character_to_title_neighboring_and_across_water_barony = { limit = { &lt;triggers&gt; } &lt;effects&gt; }
</td>
<td>character
</td>
<td>landed title
</td></tr>
<tr>
<td>every_character_to_title_neighboring_and_across_water_county
</td>
<td>Scopes from a character to a neighboring county (incl. across water, looking trough the de Jure lieges)
</td>
<td>every_character_to_title_neighboring_and_across_water_county = { limit = { &lt;triggers&gt; } &lt;effects&gt; }
</td>
<td>character
</td>
<td>landed title
</td></tr>
<tr>
<td>every_character_to_title_neighboring_and_across_water_duchy
</td>
<td>Scopes from a character to a neighboring duchy (incl. across water, looking trough the de Jure lieges)
</td>
<td>every_character_to_title_neighboring_and_across_water_duchy = { limit = { &lt;triggers&gt; } &lt;effects&gt; }
</td>
<td>character
</td>
<td>landed title
</td></tr>
<tr>
<td>every_character_to_title_neighboring_and_across_water_empire
</td>
<td>Scopes from a character to a neighboring empire (incl. across water, looking trough the de Jure lieges)
</td>
<td>every_character_to_title_neighboring_and_across_water_empire = { limit = { &lt;triggers&gt; } &lt;effects&gt; }
</td>
<td>character
</td>
<td>landed title
</td></tr>
<tr>
<td>every_character_to_title_neighboring_and_across_water_kingdom
</td>
<td>Scopes from a character to a neighboring kingdom (incl. across water, looking trough the de Jure lieges)
</td>
<td>every_character_to_title_neighboring_and_across_water_kingdom = { limit = { &lt;triggers&gt; } &lt;effects&gt; }
</td>
<td>character
</td>
<td>landed title
</td></tr>
<tr>
<td>every_character_to_title_neighboring_barony
</td>
<td>Scopes from a character to a neighboring barony (looking trough the de Jure lieges)
</td>
<td>every_character_to_title_neighboring_barony = { limit = { &lt;triggers&gt; } &lt;effects&gt; }
</td>
<td>character
</td>
<td>landed title
</td></tr>
<tr>
<td>every_character_to_title_neighboring_county
</td>
<td>Scopes from a character to a neighboring county (looking trough the de Jure lieges)
</td>
<td>every_character_to_title_neighboring_county = { limit = { &lt;triggers&gt; } &lt;effects&gt; }
</td>
<td>character
</td>
<td>landed title
</td></tr>
<tr>
<td>every_character_to_title_neighboring_duchy
</td>
<td>Scopes from a character to a neighboring duchy (looking trough the de Jure lieges)
</td>
<td>every_character_to_title_neighboring_duchy = { limit = { &lt;triggers&gt; } &lt;effects&gt; }
</td>
<td>character
</td>
<td>landed title
</td></tr>
<tr>
<td>every_character_to_title_neighboring_empire
</td>
<td>Scopes from a character to a neighboring empire (looking trough the de Jure lieges)
</td>
<td>every_character_to_title_neighboring_empire = { limit = { &lt;triggers&gt; } &lt;effects&gt; }
</td>
<td>character
</td>
<td>landed title
</td></tr>
<tr>
<td>every_character_to_title_neighboring_kingdom
</td>
<td>Scopes from a character to a neighboring kingdom (looking trough the de Jure lieges)
</td>
<td>every_character_to_title_neighboring_kingdom = { limit = { &lt;triggers&gt; } &lt;effects&gt; }
</td>
<td>character
</td>
<td>landed title
</td></tr>
<tr>
<td>every_character_war
</td>
<td>Wars of the scoped character
</td>
<td>every_character_war = { limit = { &lt;triggers&gt; } &lt;effects&gt; }
</td>
<td>character
</td>
<td>war
</td></tr>
<tr>
<td>every_child
</td>
<td>Iterate through all children
</td>
<td>every_child = { limit = { &lt;triggers&gt; } &lt;effects&gt; }
</td>
<td>character
</td>
<td>character
</td></tr>
<tr>
<td>every_claim
</td>
<td>Iterate through the titles of all claims held by a character; parameters: explicit = yes/no/all pressed = yes/no/all
</td>
<td>every_claim = { limit = { &lt;triggers&gt; } &lt;effects&gt; }
</td>
<td>character
</td>
<td>landed title
</td></tr>
<tr>
<td>every_close_family_member
</td>
<td>Iterate through all the close family [father, mother, siblings, children, grandparents]
</td>
<td>every_close_family_member = { limit = { &lt;triggers&gt; } &lt;effects&gt; }
</td>
<td>character
</td>
<td>character
</td></tr>
<tr>
<td>every_close_or_extended_family_member
</td>
<td>Iterate through all the close and extended relatives [father, mother, siblings, children, grandparents, uncles/aunts, nephew/niece, cousins]
</td>
<td>every_close_or_extended_family_member = { limit = { &lt;triggers&gt; } &lt;effects&gt; }
</td>
<td>character
</td>
<td>character
</td></tr>
<tr>
<td>every_concubine
</td>
<td>Iterate through all concubines
</td>
<td>every_concubine = { limit = { &lt;triggers&gt; } &lt;effects&gt; }
</td>
<td>character
</td>
<td>character
</td></tr>
<tr>
<td>every_consort
</td>
<td>Iterate through all consorts (concubines and spouses)
</td>
<td>every_consort = { limit = { &lt;triggers&gt; } &lt;effects&gt; }
</td>
<td>character
</td>
<td>character
</td></tr>
<tr>
<td>every_councillor
</td>
<td>Iterate through all councillors
</td>
<td>every_councillor = { limit = { &lt;triggers&gt; } &lt;effects&gt; }
</td>
<td>character
</td>
<td>character
</td></tr>
<tr>
<td>every_courtier
</td>
<td>Iterate through all courtiers
</td>
<td>every_courtier = { limit = { &lt;triggers&gt; } &lt;effects&gt; }
</td>
<td>character
</td>
<td>character
</td></tr>
<tr>
<td>every_courtier_away
</td>
<td>Iterate through all courtiers that are away
</td>
<td>every_courtier_away = { limit = { &lt;triggers&gt; } &lt;effects&gt; }
</td>
<td>character
</td>
<td>character
</td></tr>
<tr>
<td>every_courtier_or_guest
</td>
<td>Iterate through all courtiers and guests (pool and foreign court guests)
</td>
<td>every_courtier_or_guest = { limit = { &lt;triggers&gt; } &lt;effects&gt; }
</td>
<td>character
</td>
<td>character
</td></tr>
<tr>
<td>every_de_jure_claim
</td>
<td>Iterate through all de jure claims for a character
</td>
<td>every_de_jure_claim = { limit = { &lt;triggers&gt; } &lt;effects&gt; }
</td>
<td>character
</td>
<td>landed title
</td></tr>
<tr>
<td>every_diplomacy_councillor
</td>
<td>Iterate through all diplomacy-based councillors
</td>
<td>every_diplomacy_councillor = { limit = { &lt;triggers&gt; } &lt;effects&gt; }
</td>
<td>character
</td>
<td>character
</td></tr>
<tr>
<td>every_directly_owned_province
</td>
<td>Iterate through all directly owned provinces
</td>
<td>every_directly_owned_province = { limit = { &lt;triggers&gt; } &lt;effects&gt; }
</td>
<td>character
</td>
<td>province
</td></tr>
<tr>
<td>every_election_title
</td>
<td>Iterate through all titles the scoped character can vote on
</td>
<td>every_election_title = { limit = { &lt;triggers&gt; } &lt;effects&gt; }
</td>
<td>character
</td>
<td>landed title
</td></tr>
<tr>
<td>every_extended_family_member
</td>
<td>Iterate through all the extended family [uncles/aunts, nephew/niece, cousins]
</td>
<td>every_extended_family_member = { limit = { &lt;triggers&gt; } &lt;effects&gt; }
</td>
<td>character
</td>
<td>character
</td></tr>
<tr>
<td>every_foreign_court_guest
</td>
<td>Iterate through all guests visiting from another court (in contrast to pool_guest they have a liege)
</td>
<td>every_foreign_court_guest = { limit = { &lt;triggers&gt; } &lt;effects&gt; }
</td>
<td>character
</td>
<td>character
</td></tr>
<tr>
<td>every_former_concubine
</td>
<td>Iterate through all former concubines. Not persisted past death
</td>
<td>every_former_concubine = { limit = { &lt;triggers&gt; } &lt;effects&gt; }
</td>
<td>character
</td>
<td>character
</td></tr>
<tr>
<td>every_former_concubinist
</td>
<td>Iterate through all former concubinists. Not persisted past death
</td>
<td>every_former_concubinist = { limit = { &lt;triggers&gt; } &lt;effects&gt; }
</td>
<td>character
</td>
<td>character
</td></tr>
<tr>
<td>every_former_spouse
</td>
<td>Iterate through all former spouses
</td>
<td>every_former_spouse = { limit = { &lt;triggers&gt; } &lt;effects&gt; }
</td>
<td>character
</td>
<td>character
</td></tr>
<tr>
<td>every_general_councillor
</td>
<td>Iterate through all councillors that are not related to a skill
</td>
<td>every_general_councillor = { limit = { &lt;triggers&gt; } &lt;effects&gt; }
</td>
<td>character
</td>
<td>character
</td></tr>
<tr>
<td>every_heir
</td>
<td>Heirs of the scoped character
</td>
<td>every_heir = { limit = { &lt;triggers&gt; } &lt;effects&gt; }
</td>
<td>character
</td>
<td>character
</td></tr>
<tr>
<td>every_heir_title
</td>
<td>Iterate through all landed titles character is heir to
</td>
<td>every_heir_title = { limit = { &lt;triggers&gt; } &lt;effects&gt; }
</td>
<td>character
</td>
<td>landed title
</td></tr>
<tr>
<td>every_heir_to_title
</td>
<td>Iterate through all titles the scoped character is heir to
</td>
<td>every_heir_to_title = { limit = { &lt;triggers&gt; } &lt;effects&gt; }
</td>
<td>character
</td>
<td>landed title
</td></tr>
<tr>
<td>every_held_title
</td>
<td>Iterate through all held landed titles
</td>
<td>every_held_title = { limit = { &lt;triggers&gt; } &lt;effects&gt; }
</td>
<td>character
</td>
<td>landed title
</td></tr>
<tr>
<td>every_hired_mercenary
</td>
<td>Iterate through all hired mercenary companies
</td>
<td>every_hired_mercenary = { limit = { &lt;triggers&gt; } &lt;effects&gt; }
</td>
<td>character
</td>
<td>mercenary company
</td></tr>
<tr>
<td>every_hooked_character
</td>
<td>Iterate through all characters this character has a hook on
</td>
<td>every_hooked_character = { limit = { &lt;triggers&gt; } &lt;effects&gt; }
</td>
<td>character
</td>
<td>character
</td></tr>
<tr>
<td>every_hostile_raider
</td>
<td>Iterate through anyone the character is hostile to due to their top-liege's realm having been raided
</td>
<td>every_hostile_raider = { limit = { &lt;triggers&gt; } &lt;effects&gt; }
</td>
<td>character
</td>
<td>character
</td></tr>
<tr>
<td>every_intrigue_councillor
</td>
<td>Iterate through all intrigue-based councillors
</td>
<td>every_intrigue_councillor = { limit = { &lt;triggers&gt; } &lt;effects&gt; }
</td>
<td>character
</td>
<td>character
</td></tr>
<tr>
<td>every_knight
</td>
<td>Iterate through all knights
</td>
<td>every_knight = { limit = { &lt;triggers&gt; } &lt;effects&gt; }
</td>
<td>character
</td>
<td>character
</td></tr>
<tr>
<td>every_known_secret
</td>
<td>Iterate through all secrets known by the character
</td>
<td>every_known_secret = { limit = { &lt;triggers&gt; } &lt;effects&gt; }
</td>
<td>character
</td>
<td>secret
</td></tr>
<tr>
<td>every_learning_councillor
</td>
<td>Iterate through all learning-based councillors
</td>
<td>every_learning_councillor = { limit = { &lt;triggers&gt; } &lt;effects&gt; }
</td>
<td>character
</td>
<td>character
</td></tr>
<tr>
<td>every_liege_or_above
</td>
<td>Iterate through all lieges above a character (skipping the character themselves)
</td>
<td>every_liege_or_above = { limit = { &lt;triggers&gt; } &lt;effects&gt; }
</td>
<td>character
</td>
<td>character
</td></tr>
<tr>
<td>every_martial_councillor
</td>
<td>Iterate through all martial-based councillors
</td>
<td>every_martial_councillor = { limit = { &lt;triggers&gt; } &lt;effects&gt; }
</td>
<td>character
</td>
<td>character
</td></tr>
<tr>
<td>every_neighboring_and_across_water_realm_same_rank_owner
</td>
<td>A sub-realm or realm bordering the scope character's realm (including across water) and has the same rank as the scope character (look for lieges of he owner of the land if necessary)
</td>
<td>every_neighboring_and_across_water_realm_same_rank_owner = { limit = { &lt;triggers&gt; } &lt;effects&gt; }
</td>
<td>character
</td>
<td>character
</td></tr>
<tr>
<td>every_neighboring_and_across_water_top_liege_realm
</td>
<td>A realm with a different top liege neighboring the realm of the scope character's top liege (including across water); switches to the realm's top title. Can be based on borders a day or two out of date
</td>
<td>every_neighboring_and_across_water_top_liege_realm = { limit = { &lt;triggers&gt; } &lt;effects&gt; }
</td>
<td>character
</td>
<td>landed title
</td></tr>
<tr>
<td>every_neighboring_and_across_water_top_liege_realm_owner
</td>
<td>A realm with a different top liege neighboring the realm of the scope character's top liege (including across water); switches to the holder of the realm. Can be based on borders a day or two out of date
</td>
<td>every_neighboring_and_across_water_top_liege_realm_owner = { limit = { &lt;triggers&gt; } &lt;effects&gt; }
</td>
<td>character
</td>
<td>character
</td></tr>
<tr>
<td>every_neighboring_realm_same_rank_owner
</td>
<td>A sub-realm or realm bordering the scope character's realm and has the same rank as the scope character (look for lieges of he owner of the land if necessary)
</td>
<td>every_neighboring_realm_same_rank_owner = { limit = { &lt;triggers&gt; } &lt;effects&gt; }
</td>
<td>character
</td>
<td>character
</td></tr>
<tr>
<td>every_neighboring_top_liege_realm
</td>
<td>A realm with a different top liege neighboring the realm of the scope character's top liege; switches to the realm's top title. Can be based on borders a day or two out of date
</td>
<td>every_neighboring_top_liege_realm = { limit = { &lt;triggers&gt; } &lt;effects&gt; }
</td>
<td>character
</td>
<td>landed title
</td></tr>
<tr>
<td>every_neighboring_top_liege_realm_owner
</td>
<td>A realm with a different top liege neighboring the realm of the scope character's top liege; switches to the holder of the realm. Can be based on borders a day or two out of date
</td>
<td>every_neighboring_top_liege_realm_owner = { limit = { &lt;triggers&gt; } &lt;effects&gt; }
</td>
<td>character
</td>
<td>character
</td></tr>
<tr>
<td>every_owned_story
</td>
<td>Iterate through all owned stories for a character
</td>
<td>every_owned_story = { limit = { &lt;triggers&gt; } &lt;effects&gt; }
</td>
<td>character
</td>
<td>story cycle
</td></tr>
<tr>
<td>every_parent
</td>
<td>Iterate through all (both) parents
</td>
<td>every_parent = { limit = { &lt;triggers&gt; } &lt;effects&gt; }
</td>
<td>character
</td>
<td>character
</td></tr>
<tr>
<td>every_patroned_holy_order
</td>
<td>Iterate through all holy orders that the scoped character is a patron of
</td>
<td>every_patroned_holy_order = { limit = { &lt;triggers&gt; } &lt;effects&gt; }
</td>
<td>character
</td>
<td>holy order
</td></tr>
<tr>
<td>every_pinned_character
</td>
<td>Iterate through characters this player has pinned
</td>
<td>every_pinned_character = { limit = { &lt;triggers&gt; } &lt;effects&gt; }
</td>
<td>character
</td>
<td>character
</td></tr>
<tr>
<td>every_pinning_character
</td>
<td>Iterate through characters whose player has this character pinned
</td>
<td>every_pinning_character = { limit = { &lt;triggers&gt; } &lt;effects&gt; }
</td>
<td>character
</td>
<td>character
</td></tr>
<tr>
<td>every_player_heir
</td>
<td>Iterate through player heirs, capped at the first 10
</td>
<td>every_player_heir = { limit = { &lt;triggers&gt; } &lt;effects&gt; }
</td>
<td>character
</td>
<td>character
</td></tr>
<tr>
<td>every_pool_guest
</td>
<td>Iterate through all guests visiting the court from the pool (in contrast to foreign_court_guest they don't have a liege)
</td>
<td>every_pool_guest = { limit = { &lt;triggers&gt; } &lt;effects&gt; }
</td>
<td>character
</td>
<td>character
</td></tr>
<tr>
<td>every_potential_marriage_option
</td>
<td>Iterate through all potential selectable marriage or betrohed options
</td>
<td>every_potential_marriage_option = { limit = { &lt;triggers&gt; } &lt;effects&gt; }
</td>
<td>character
</td>
<td>character
</td></tr>
<tr>
<td>every_pretender_title
</td>
<td>Iterate through all landed titles character is pretender to
</td>
<td>every_pretender_title = { limit = { &lt;triggers&gt; } &lt;effects&gt; }
</td>
<td>character
</td>
<td>landed title
</td></tr>
<tr>
<td>every_primary_war_enemy
</td>
<td>Iterate through all primary war enemies
</td>
<td>every_primary_war_enemy = { limit = { &lt;triggers&gt; } &lt;effects&gt; }
</td>
<td>character
</td>
<td>character
</td></tr>
<tr>
<td>every_prisoner
</td>
<td>Iterate through all prisoners
</td>
<td>every_prisoner = { limit = { &lt;triggers&gt; } &lt;effects&gt; }
</td>
<td>character
</td>
<td>character
</td></tr>
<tr>
<td>every_prowess_councillor
</td>
<td>Iterate through all prowess-based councillors
</td>
<td>every_prowess_councillor = { limit = { &lt;triggers&gt; } &lt;effects&gt; }
</td>
<td>character
</td>
<td>character
</td></tr>
<tr>
<td>every_raid_target
</td>
<td>Iterate through anyone the character is hostile to due to having raided them. Only returns top lieges
</td>
<td>every_raid_target = { limit = { &lt;triggers&gt; } &lt;effects&gt; }
</td>
<td>character
</td>
<td>character
</td></tr>
<tr>
<td>every_realm_county
</td>
<td>Iterate through all counties in the realm. Based on top liege
</td>
<td>every_realm_county = { limit = { &lt;triggers&gt; } &lt;effects&gt; }
</td>
<td>character
</td>
<td>landed title
</td></tr>
<tr>
<td>every_realm_de_jure_duchy
</td>
<td>Iterate through all de jure duchies that have at least one county in the realm. Based on top liege
</td>
<td>every_realm_de_jure_duchy = { limit = { &lt;triggers&gt; } &lt;effects&gt; }
</td>
<td>character
</td>
<td>landed title
</td></tr>
<tr>
<td>every_realm_de_jure_empire
</td>
<td>Iterate through all de jure empire that have at least one county in the realm. Based on top liege
</td>
<td>every_realm_de_jure_empire = { limit = { &lt;triggers&gt; } &lt;effects&gt; }
</td>
<td>character
</td>
<td>landed title
</td></tr>
<tr>
<td>every_realm_de_jure_kingdom
</td>
<td>Iterate through all de jure kingdom that have at least one county in the realm. Based on top liege
</td>
<td>every_realm_de_jure_kingdom = { limit = { &lt;triggers&gt; } &lt;effects&gt; }
</td>
<td>character
</td>
<td>landed title
</td></tr>
<tr>
<td>every_realm_province
</td>
<td>Iterate through all realm provinces of a character
</td>
<td>every_realm_province = { limit = { &lt;triggers&gt; } &lt;effects&gt; }
</td>
<td>character
</td>
<td>province
</td></tr>
<tr>
<td>every_relation
</td>
<td>Iterate through scripted relations of a given type or multiple types, if someone is multiple relations they will only be in the list once
</td>
<td>every_relation = { limit = { &lt;triggers&gt; } &lt;effects&gt; }
</td>
<td>character
</td>
<td>character
</td></tr>
<tr>
<td>every_scheme
</td>
<td>Iterate through all schemes owned by the character
</td>
<td>every_scheme = { limit = { &lt;triggers&gt; } &lt;effects&gt; }
</td>
<td>character
</td>
<td>scheme
</td></tr>
<tr>
<td>every_secret
</td>
<td>Iterate through all secrets of the character
</td>
<td>every_secret = { limit = { &lt;triggers&gt; } &lt;effects&gt; }
</td>
<td>character
</td>
<td>secret
</td></tr>
<tr>
<td>every_sibling
</td>
<td>Iterate through all siblings
</td>
<td>every_sibling = { limit = { &lt;triggers&gt; } &lt;effects&gt; }
</td>
<td>character
</td>
<td>character
</td></tr>
<tr>
<td>every_spouse
</td>
<td>Iterate through all spouses
</td>
<td>every_spouse = { limit = { &lt;triggers&gt; } &lt;effects&gt; }
</td>
<td>character
</td>
<td>character
</td></tr>
<tr>
<td>every_spouse_candidate
</td>
<td>Iterate through all the spouse candidates of a character. WARNING: THIS IS VERY SLOW DO NOT DO IT OFTEN.
</td>
<td>every_spouse_candidate = { limit = { &lt;triggers&gt; } &lt;effects&gt; }
</td>
<td>character
</td>
<td>character
</td></tr>
<tr>
<td>every_stewardship_councillor
</td>
<td>Iterate through all stewardship-based councillors
</td>
<td>every_stewardship_councillor = { limit = { &lt;triggers&gt; } &lt;effects&gt; }
</td>
<td>character
</td>
<td>character
</td></tr>
<tr>
<td>every_sub_realm_barony
</td>
<td>Iterate through all baronies in sub-realm
</td>
<td>every_sub_realm_barony = { limit = { &lt;triggers&gt; } &lt;effects&gt; }
</td>
<td>character
</td>
<td>landed title
</td></tr>
<tr>
<td>every_sub_realm_county
</td>
<td>Iterate through all counties in sub-realm
</td>
<td>every_sub_realm_county = { limit = { &lt;triggers&gt; } &lt;effects&gt; }
</td>
<td>character
</td>
<td>landed title
</td></tr>
<tr>
<td>every_sub_realm_duchy
</td>
<td>Iterate through all duchies in sub-realm
</td>
<td>every_sub_realm_duchy = { limit = { &lt;triggers&gt; } &lt;effects&gt; }
</td>
<td>character
</td>
<td>landed title
</td></tr>
<tr>
<td>every_sub_realm_empire
</td>
<td>Iterate through all empires in sub-realm
</td>
<td>every_sub_realm_empire = { limit = { &lt;triggers&gt; } &lt;effects&gt; }
</td>
<td>character
</td>
<td>landed title
</td></tr>
<tr>
<td>every_sub_realm_kingdom
</td>
<td>Iterate through all kingdoms in sub-realm
</td>
<td>every_sub_realm_kingdom = { limit = { &lt;triggers&gt; } &lt;effects&gt; }
</td>
<td>character
</td>
<td>landed title
</td></tr>
<tr>
<td>every_sub_realm_title
</td>
<td>Iterate through all titles in sub-realm
</td>
<td>every_sub_realm_title = { limit = { &lt;triggers&gt; } &lt;effects&gt; }
</td>
<td>character
</td>
<td>landed title
</td></tr>
<tr>
<td>every_targeting_faction
</td>
<td>Iterate through all factions targeting the scope character
</td>
<td>every_targeting_faction = { limit = { &lt;triggers&gt; } &lt;effects&gt; }
</td>
<td>character
</td>
<td>faction
</td></tr>
<tr>
<td>every_targeting_scheme
</td>
<td>Iterate through all schemes targeting the character
</td>
<td>every_targeting_scheme = { limit = { &lt;triggers&gt; } &lt;effects&gt; }
</td>
<td>character
</td>
<td>scheme
</td></tr>
<tr>
<td>every_targeting_secret
</td>
<td>Iterate through all secrets that target the specified scope
</td>
<td>every_targeting_secret = { limit = { &lt;triggers&gt; } &lt;effects&gt; }
</td>
<td>character
</td>
<td>secret
</td></tr>
<tr>
<td>every_traveling_family_member
</td>
<td>Iterate though all characters that should travel with the scoped one (when moving between courts for instance); includes the scoped character
</td>
<td>every_traveling_family_member = { limit = { &lt;triggers&gt; } &lt;effects&gt; }
</td>
<td>character
</td>
<td>character
</td></tr>
<tr>
<td>every_truce_holder
</td>
<td>Iterate through all characters that have a truce on this character
</td>
<td>every_truce_holder = { limit = { &lt;triggers&gt; } &lt;effects&gt; }
</td>
<td>character
</td>
<td>character
</td></tr>
<tr>
<td>every_truce_target
</td>
<td>Iterate through all characters this character has a truce on
</td>
<td>every_truce_target = { limit = { &lt;triggers&gt; } &lt;effects&gt; }
</td>
<td>character
</td>
<td>character
</td></tr>
<tr>
<td>every_unspent_known_secret
</td>
<td>Iterate through all unspent secrets known by the character
</td>
<td>every_unspent_known_secret = { limit = { &lt;triggers&gt; } &lt;effects&gt; }
</td>
<td>character
</td>
<td>secret
</td></tr>
<tr>
<td>every_vassal
</td>
<td>Iterate through all DIRECT vassals
</td>
<td>every_vassal = { limit = { &lt;triggers&gt; } &lt;effects&gt; }
</td>
<td>character
</td>
<td>character
</td></tr>
<tr>
<td>every_vassal_or_below
</td>
<td>Iterate through ALL vassals, not just direct vassals
</td>
<td>every_vassal_or_below = { limit = { &lt;triggers&gt; } &lt;effects&gt; }
</td>
<td>character
</td>
<td>character
</td></tr>
<tr>
<td>every_war_ally
</td>
<td>Iterate through all direct war allies
</td>
<td>every_war_ally = { limit = { &lt;triggers&gt; } &lt;effects&gt; }
</td>
<td>character
</td>
<td>character
</td></tr>
<tr>
<td>every_war_enemy
</td>
<td>Iterate through all direct war enemies
</td>
<td>every_war_enemy = { limit = { &lt;triggers&gt; } &lt;effects&gt; }
</td>
<td>character
</td>
<td>character
</td></tr></tbody></table>
<h4><span id="Beginning_with_'ordered'"></span><span class="mw-headline" id="Beginning_with_.27ordered.27">Beginning with 'ordered'</span><span class="mw-editsection"><span class="mw-editsection-bracket">[</span><a href="/index.php?title=Effects&amp;action=edit&amp;section=16" title="Edit section: Beginning with &#039;ordered&#039;">edit</a><span class="mw-editsection-bracket">]</span></span></h4>
<table class="wikitable sortable" width="100%">
<tbody><tr>
<th width="15%">Name
</th>
<th width="15%">Description
</th>
<th width="25%">Usage
</th>
<th width="20%">Supported scopes
</th>
<th width="20%">Supported targets
</th></tr>
<tr>
<td>ordered_alert_creatable_title
</td>
<td>Iterate through all titles that can be created by the character. (only for alerts)
</td>
<td>ordered_alert_creatable_title = {
<p>limit = { &lt;triggers&gt; }
order_by = script_value
position = int
min = int
max = script_value
check_range_bounds = no # If you don't want an error logged if the list is smaller than the min/max
&lt;effects&gt; }
</p>
</td>
<td>character
</td>
<td>landed title
</td></tr>
<tr>
<td>ordered_alert_usurpable_title
</td>
<td>Iterate through all titles that can be usurped by the character. (only for alerts)
</td>
<td>ordered_alert_usurpable_title = {
<p>limit = { &lt;triggers&gt; }
order_by = script_value
position = int
min = int
max = script_value
check_range_bounds = no # If you don't want an error logged if the list is smaller than the min/max
&lt;effects&gt; }
</p>
</td>
<td>character
</td>
<td>landed title
</td></tr>
<tr>
<td>ordered_ally
</td>
<td>Iterate through all allies
</td>
<td>ordered_ally = {
<p>limit = { &lt;triggers&gt; }
order_by = script_value
position = int
min = int
max = script_value
check_range_bounds = no # If you don't want an error logged if the list is smaller than the min/max
&lt;effects&gt; }
</p>
</td>
<td>character
</td>
<td>character
</td></tr>
<tr>
<td>ordered_ancestor
</td>
<td>Iterate through all the ancestors of the scope character up to 5 generations
</td>
<td>ordered_ancestor = {
<p>limit = { &lt;triggers&gt; }
order_by = script_value
position = int
min = int
max = script_value
check_range_bounds = no # If you don't want an error logged if the list is smaller than the min/max
&lt;effects&gt; }
</p>
</td>
<td>character
</td>
<td>character
</td></tr>
<tr>
<td>ordered_army
</td>
<td>Iterate through all armies
</td>
<td>ordered_army = {
<p>limit = { &lt;triggers&gt; }
order_by = script_value
position = int
min = int
max = script_value
check_range_bounds = no # If you don't want an error logged if the list is smaller than the min/max
&lt;effects&gt; }
</p>
</td>
<td>character
</td>
<td>army
</td></tr>
<tr>
<td>ordered_character_to_title_neighboring_and_across_water_barony
</td>
<td>Scopes from a character to a neighboring barony (incl. across water, looking trough the de Jure lieges)
</td>
<td>ordered_character_to_title_neighboring_and_across_water_barony = {
<p>limit = { &lt;triggers&gt; }
order_by = script_value
position = int
min = int
max = script_value
check_range_bounds = no # If you don't want an error logged if the list is smaller than the min/max
&lt;effects&gt; }
</p>
</td>
<td>character
</td>
<td>landed title
</td></tr>
<tr>
<td>ordered_character_to_title_neighboring_and_across_water_county
</td>
<td>Scopes from a character to a neighboring county (incl. across water, looking trough the de Jure lieges)
</td>
<td>ordered_character_to_title_neighboring_and_across_water_county = {
<p>limit = { &lt;triggers&gt; }
order_by = script_value
position = int
min = int
max = script_value
check_range_bounds = no # If you don't want an error logged if the list is smaller than the min/max
&lt;effects&gt; }
</p>
</td>
<td>character
</td>
<td>landed title
</td></tr>
<tr>
<td>ordered_character_to_title_neighboring_and_across_water_duchy
</td>
<td>Scopes from a character to a neighboring duchy (incl. across water, looking trough the de Jure lieges)
</td>
<td>ordered_character_to_title_neighboring_and_across_water_duchy = {
<p>limit = { &lt;triggers&gt; }
order_by = script_value
position = int
min = int
max = script_value
check_range_bounds = no # If you don't want an error logged if the list is smaller than the min/max
&lt;effects&gt; }
</p>
</td>
<td>character
</td>
<td>landed title
</td></tr>
<tr>
<td>ordered_character_to_title_neighboring_and_across_water_empire
</td>
<td>Scopes from a character to a neighboring empire (incl. across water, looking trough the de Jure lieges)
</td>
<td>ordered_character_to_title_neighboring_and_across_water_empire = {
<p>limit = { &lt;triggers&gt; }
order_by = script_value
position = int
min = int
max = script_value
check_range_bounds = no # If you don't want an error logged if the list is smaller than the min/max
&lt;effects&gt; }
</p>
</td>
<td>character
</td>
<td>landed title
</td></tr>
<tr>
<td>ordered_character_to_title_neighboring_and_across_water_kingdom
</td>
<td>Scopes from a character to a neighboring kingdom (incl. across water, looking trough the de Jure lieges)
</td>
<td>ordered_character_to_title_neighboring_and_across_water_kingdom = {
<p>limit = { &lt;triggers&gt; }
order_by = script_value
position = int
min = int
max = script_value
check_range_bounds = no # If you don't want an error logged if the list is smaller than the min/max
&lt;effects&gt; }
</p>
</td>
<td>character
</td>
<td>landed title
</td></tr>
<tr>
<td>ordered_character_to_title_neighboring_barony
</td>
<td>Scopes from a character to a neighboring barony (looking trough the de Jure lieges)
</td>
<td>ordered_character_to_title_neighboring_barony = {
<p>limit = { &lt;triggers&gt; }
order_by = script_value
position = int
min = int
max = script_value
check_range_bounds = no # If you don't want an error logged if the list is smaller than the min/max
&lt;effects&gt; }
</p>
</td>
<td>character
</td>
<td>landed title
</td></tr>
<tr>
<td>ordered_character_to_title_neighboring_county
</td>
<td>Scopes from a character to a neighboring county (looking trough the de Jure lieges)
</td>
<td>ordered_character_to_title_neighboring_county = {
<p>limit = { &lt;triggers&gt; }
order_by = script_value
position = int
min = int
max = script_value
check_range_bounds = no # If you don't want an error logged if the list is smaller than the min/max
&lt;effects&gt; }
</p>
</td>
<td>character
</td>
<td>landed title
</td></tr>
<tr>
<td>ordered_character_to_title_neighboring_duchy
</td>
<td>Scopes from a character to a neighboring duchy (looking trough the de Jure lieges)
</td>
<td>ordered_character_to_title_neighboring_duchy = {
<p>limit = { &lt;triggers&gt; }
order_by = script_value
position = int
min = int
max = script_value
check_range_bounds = no # If you don't want an error logged if the list is smaller than the min/max
&lt;effects&gt; }
</p>
</td>
<td>character
</td>
<td>landed title
</td></tr>
<tr>
<td>ordered_character_to_title_neighboring_empire
</td>
<td>Scopes from a character to a neighboring empire (looking trough the de Jure lieges)
</td>
<td>ordered_character_to_title_neighboring_empire = {
<p>limit = { &lt;triggers&gt; }
order_by = script_value
position = int
min = int
max = script_value
check_range_bounds = no # If you don't want an error logged if the list is smaller than the min/max
&lt;effects&gt; }
</p>
</td>
<td>character
</td>
<td>landed title
</td></tr>
<tr>
<td>ordered_character_to_title_neighboring_kingdom
</td>
<td>Scopes from a character to a neighboring kingdom (looking trough the de Jure lieges)
</td>
<td>ordered_character_to_title_neighboring_kingdom = {
<p>limit = { &lt;triggers&gt; }
order_by = script_value
position = int
min = int
max = script_value
check_range_bounds = no # If you don't want an error logged if the list is smaller than the min/max
&lt;effects&gt; }
</p>
</td>
<td>character
</td>
<td>landed title
</td></tr>
<tr>
<td>ordered_character_war
</td>
<td>Wars of the scoped character
</td>
<td>ordered_character_war = {
<p>limit = { &lt;triggers&gt; }
order_by = script_value
position = int
min = int
max = script_value
check_range_bounds = no # If you don't want an error logged if the list is smaller than the min/max
&lt;effects&gt; }
</p>
</td>
<td>character
</td>
<td>war
</td></tr>
<tr>
<td>ordered_child
</td>
<td>Iterate through all children
</td>
<td>ordered_child = {
<p>limit = { &lt;triggers&gt; }
order_by = script_value
position = int
min = int
max = script_value
check_range_bounds = no # If you don't want an error logged if the list is smaller than the min/max
&lt;effects&gt; }
</p>
</td>
<td>character
</td>
<td>character
</td></tr>
<tr>
<td>ordered_claim
</td>
<td>Iterate through the titles of all claims held by a character; parameters: explicit = yes/no/all pressed = yes/no/all
</td>
<td>ordered_claim = {
<p>limit = { &lt;triggers&gt; }
order_by = script_value
position = int
min = int
max = script_value
check_range_bounds = no # If you don't want an error logged if the list is smaller than the min/max
&lt;effects&gt; }
</p>
</td>
<td>character
</td>
<td>landed title
</td></tr>
<tr>
<td>ordered_close_family_member
</td>
<td>Iterate through all the close family [father, mother, siblings, children, grandparents]
</td>
<td>ordered_close_family_member = {
<p>limit = { &lt;triggers&gt; }
order_by = script_value
position = int
min = int
max = script_value
check_range_bounds = no # If you don't want an error logged if the list is smaller than the min/max
&lt;effects&gt; }
</p>
</td>
<td>character
</td>
<td>character
</td></tr>
<tr>
<td>ordered_close_or_extended_family_member
</td>
<td>Iterate through all the close and extended relatives [father, mother, siblings, children, grandparents, uncles/aunts, nephew/niece, cousins]
</td>
<td>ordered_close_or_extended_family_member = {
<p>limit = { &lt;triggers&gt; }
order_by = script_value
position = int
min = int
max = script_value
check_range_bounds = no # If you don't want an error logged if the list is smaller than the min/max
&lt;effects&gt; }
</p>
</td>
<td>character
</td>
<td>character
</td></tr>
<tr>
<td>ordered_concubine
</td>
<td>Iterate through all concubines
</td>
<td>ordered_concubine = {
<p>limit = { &lt;triggers&gt; }
order_by = script_value
position = int
min = int
max = script_value
check_range_bounds = no # If you don't want an error logged if the list is smaller than the min/max
&lt;effects&gt; }
</p>
</td>
<td>character
</td>
<td>character
</td></tr>
<tr>
<td>ordered_consort
</td>
<td>Iterate through all consorts (concubines and spouses)
</td>
<td>ordered_consort = {
<p>limit = { &lt;triggers&gt; }
order_by = script_value
position = int
min = int
max = script_value
check_range_bounds = no # If you don't want an error logged if the list is smaller than the min/max
&lt;effects&gt; }
</p>
</td>
<td>character
</td>
<td>character
</td></tr>
<tr>
<td>ordered_councillor
</td>
<td>Iterate through all councillors
</td>
<td>ordered_councillor = {
<p>limit = { &lt;triggers&gt; }
order_by = script_value
position = int
min = int
max = script_value
check_range_bounds = no # If you don't want an error logged if the list is smaller than the min/max
&lt;effects&gt; }
</p>
</td>
<td>character
</td>
<td>character
</td></tr>
<tr>
<td>ordered_courtier
</td>
<td>Iterate through all courtiers
</td>
<td>ordered_courtier = {
<p>limit = { &lt;triggers&gt; }
order_by = script_value
position = int
min = int
max = script_value
check_range_bounds = no # If you don't want an error logged if the list is smaller than the min/max
&lt;effects&gt; }
</p>
</td>
<td>character
</td>
<td>character
</td></tr>
<tr>
<td>ordered_courtier_away
</td>
<td>Iterate through all courtiers that are away
</td>
<td>ordered_courtier_away = {
<p>limit = { &lt;triggers&gt; }
order_by = script_value
position = int
min = int
max = script_value
check_range_bounds = no # If you don't want an error logged if the list is smaller than the min/max
&lt;effects&gt; }
</p>
</td>
<td>character
</td>
<td>character
</td></tr>
<tr>
<td>ordered_courtier_or_guest
</td>
<td>Iterate through all courtiers and guests (pool and foreign court guests)
</td>
<td>ordered_courtier_or_guest = {
<p>limit = { &lt;triggers&gt; }
order_by = script_value
position = int
min = int
max = script_value
check_range_bounds = no # If you don't want an error logged if the list is smaller than the min/max
&lt;effects&gt; }
</p>
</td>
<td>character
</td>
<td>character
</td></tr>
<tr>
<td>ordered_de_jure_claim
</td>
<td>Iterate through all de jure claims for a character
</td>
<td>ordered_de_jure_claim = {
<p>limit = { &lt;triggers&gt; }
order_by = script_value
position = int
min = int
max = script_value
check_range_bounds = no # If you don't want an error logged if the list is smaller than the min/max
&lt;effects&gt; }
</p>
</td>
<td>character
</td>
<td>landed title
</td></tr>
<tr>
<td>ordered_diplomacy_councillor
</td>
<td>Iterate through all diplomacy-based councillors
</td>
<td>ordered_diplomacy_councillor = {
<p>limit = { &lt;triggers&gt; }
order_by = script_value
position = int
min = int
max = script_value
check_range_bounds = no # If you don't want an error logged if the list is smaller than the min/max
&lt;effects&gt; }
</p>
</td>
<td>character
</td>
<td>character
</td></tr>
<tr>
<td>ordered_directly_owned_province
</td>
<td>Iterate through all directly owned provinces
</td>
<td>ordered_directly_owned_province = {
<p>limit = { &lt;triggers&gt; }
order_by = script_value
position = int
min = int
max = script_value
check_range_bounds = no # If you don't want an error logged if the list is smaller than the min/max
&lt;effects&gt; }
</p>
</td>
<td>character
</td>
<td>province
</td></tr>
<tr>
<td>ordered_election_title
</td>
<td>Iterate through all titles the scoped character can vote on
</td>
<td>ordered_election_title = {
<p>limit = { &lt;triggers&gt; }
order_by = script_value
position = int
min = int
max = script_value
check_range_bounds = no # If you don't want an error logged if the list is smaller than the min/max
&lt;effects&gt; }
</p>
</td>
<td>character
</td>
<td>landed title
</td></tr>
<tr>
<td>ordered_extended_family_member
</td>
<td>Iterate through all the extended family [uncles/aunts, nephew/niece, cousins]
</td>
<td>ordered_extended_family_member = {
<p>limit = { &lt;triggers&gt; }
order_by = script_value
position = int
min = int
max = script_value
check_range_bounds = no # If you don't want an error logged if the list is smaller than the min/max
&lt;effects&gt; }
</p>
</td>
<td>character
</td>
<td>character
</td></tr>
<tr>
<td>ordered_foreign_court_guest
</td>
<td>Iterate through all guests visiting from another court (in contrast to pool_guest they have a liege)
</td>
<td>ordered_foreign_court_guest = {
<p>limit = { &lt;triggers&gt; }
order_by = script_value
position = int
min = int
max = script_value
check_range_bounds = no # If you don't want an error logged if the list is smaller than the min/max
&lt;effects&gt; }
</p>
</td>
<td>character
</td>
<td>character
</td></tr>
<tr>
<td>ordered_former_concubine
</td>
<td>Iterate through all former concubines. Not persisted past death
</td>
<td>ordered_former_concubine = {
<p>limit = { &lt;triggers&gt; }
order_by = script_value
position = int
min = int
max = script_value
check_range_bounds = no # If you don't want an error logged if the list is smaller than the min/max
&lt;effects&gt; }
</p>
</td>
<td>character
</td>
<td>character
</td></tr>
<tr>
<td>ordered_former_concubinist
</td>
<td>Iterate through all former concubinists. Not persisted past death
</td>
<td>ordered_former_concubinist = {
<p>limit = { &lt;triggers&gt; }
order_by = script_value
position = int
min = int
max = script_value
check_range_bounds = no # If you don't want an error logged if the list is smaller than the min/max
&lt;effects&gt; }
</p>
</td>
<td>character
</td>
<td>character
</td></tr>
<tr>
<td>ordered_former_spouse
</td>
<td>Iterate through all former spouses
</td>
<td>ordered_former_spouse = {
<p>limit = { &lt;triggers&gt; }
order_by = script_value
position = int
min = int
max = script_value
check_range_bounds = no # If you don't want an error logged if the list is smaller than the min/max
&lt;effects&gt; }
</p>
</td>
<td>character
</td>
<td>character
</td></tr>
<tr>
<td>ordered_general_councillor
</td>
<td>Iterate through all councillors that are not related to a skill
</td>
<td>ordered_general_councillor = {
<p>limit = { &lt;triggers&gt; }
order_by = script_value
position = int
min = int
max = script_value
check_range_bounds = no # If you don't want an error logged if the list is smaller than the min/max
&lt;effects&gt; }
</p>
</td>
<td>character
</td>
<td>character
</td></tr>
<tr>
<td>ordered_heir
</td>
<td>Heirs of the scoped character
</td>
<td>ordered_heir = {
<p>limit = { &lt;triggers&gt; }
order_by = script_value
position = int
min = int
max = script_value
check_range_bounds = no # If you don't want an error logged if the list is smaller than the min/max
&lt;effects&gt; }
</p>
</td>
<td>character
</td>
<td>character
</td></tr>
<tr>
<td>ordered_heir_title
</td>
<td>Iterate through all landed titles character is heir to
</td>
<td>ordered_heir_title = {
<p>limit = { &lt;triggers&gt; }
order_by = script_value
position = int
min = int
max = script_value
check_range_bounds = no # If you don't want an error logged if the list is smaller than the min/max
&lt;effects&gt; }
</p>
</td>
<td>character
</td>
<td>landed title
</td></tr>
<tr>
<td>ordered_heir_to_title
</td>
<td>Iterate through all titles the scoped character is heir to
</td>
<td>ordered_heir_to_title = {
<p>limit = { &lt;triggers&gt; }
order_by = script_value
position = int
min = int
max = script_value
check_range_bounds = no # If you don't want an error logged if the list is smaller than the min/max
&lt;effects&gt; }
</p>
</td>
<td>character
</td>
<td>landed title
</td></tr>
<tr>
<td>ordered_held_title
</td>
<td>Iterate through all held landed titles
</td>
<td>ordered_held_title = {
<p>limit = { &lt;triggers&gt; }
order_by = script_value
position = int
min = int
max = script_value
check_range_bounds = no # If you don't want an error logged if the list is smaller than the min/max
&lt;effects&gt; }
</p>
</td>
<td>character
</td>
<td>landed title
</td></tr>
<tr>
<td>ordered_hired_mercenary
</td>
<td>Iterate through all hired mercenary companies
</td>
<td>ordered_hired_mercenary = {
<p>limit = { &lt;triggers&gt; }
order_by = script_value
position = int
min = int
max = script_value
check_range_bounds = no # If you don't want an error logged if the list is smaller than the min/max
&lt;effects&gt; }
</p>
</td>
<td>character
</td>
<td>mercenary company
</td></tr>
<tr>
<td>ordered_hooked_character
</td>
<td>Iterate through all characters this character has a hook on
</td>
<td>ordered_hooked_character = {
<p>limit = { &lt;triggers&gt; }
order_by = script_value
position = int
min = int
max = script_value
check_range_bounds = no # If you don't want an error logged if the list is smaller than the min/max
&lt;effects&gt; }
</p>
</td>
<td>character
</td>
<td>character
</td></tr>
<tr>
<td>ordered_hostile_raider
</td>
<td>Iterate through anyone the character is hostile to due to their top-liege's realm having been raided
</td>
<td>ordered_hostile_raider = {
<p>limit = { &lt;triggers&gt; }
order_by = script_value
position = int
min = int
max = script_value
check_range_bounds = no # If you don't want an error logged if the list is smaller than the min/max
&lt;effects&gt; }
</p>
</td>
<td>character
</td>
<td>character
</td></tr>
<tr>
<td>ordered_intrigue_councillor
</td>
<td>Iterate through all intrigue-based councillors
</td>
<td>ordered_intrigue_councillor = {
<p>limit = { &lt;triggers&gt; }
order_by = script_value
position = int
min = int
max = script_value
check_range_bounds = no # If you don't want an error logged if the list is smaller than the min/max
&lt;effects&gt; }
</p>
</td>
<td>character
</td>
<td>character
</td></tr>
<tr>
<td>ordered_knight
</td>
<td>Iterate through all knights
</td>
<td>ordered_knight = {
<p>limit = { &lt;triggers&gt; }
order_by = script_value
position = int
min = int
max = script_value
check_range_bounds = no # If you don't want an error logged if the list is smaller than the min/max
&lt;effects&gt; }
</p>
</td>
<td>character
</td>
<td>character
</td></tr>
<tr>
<td>ordered_known_secret
</td>
<td>Iterate through all secrets known by the character
</td>
<td>ordered_known_secret = {
<p>limit = { &lt;triggers&gt; }
order_by = script_value
position = int
min = int
max = script_value
check_range_bounds = no # If you don't want an error logged if the list is smaller than the min/max
&lt;effects&gt; }
</p>
</td>
<td>character
</td>
<td>secret
</td></tr>
<tr>
<td>ordered_learning_councillor
</td>
<td>Iterate through all learning-based councillors
</td>
<td>ordered_learning_councillor = {
<p>limit = { &lt;triggers&gt; }
order_by = script_value
position = int
min = int
max = script_value
check_range_bounds = no # If you don't want an error logged if the list is smaller than the min/max
&lt;effects&gt; }
</p>
</td>
<td>character
</td>
<td>character
</td></tr>
<tr>
<td>ordered_liege_or_above
</td>
<td>Iterate through all lieges above a character (skipping the character themselves)
</td>
<td>ordered_liege_or_above = {
<p>limit = { &lt;triggers&gt; }
order_by = script_value
position = int
min = int
max = script_value
check_range_bounds = no # If you don't want an error logged if the list is smaller than the min/max
&lt;effects&gt; }
</p>
</td>
<td>character
</td>
<td>character
</td></tr>
<tr>
<td>ordered_martial_councillor
</td>
<td>Iterate through all martial-based councillors
</td>
<td>ordered_martial_councillor = {
<p>limit = { &lt;triggers&gt; }
order_by = script_value
position = int
min = int
max = script_value
check_range_bounds = no # If you don't want an error logged if the list is smaller than the min/max
&lt;effects&gt; }
</p>
</td>
<td>character
</td>
<td>character
</td></tr>
<tr>
<td>ordered_neighboring_and_across_water_realm_same_rank_owner
</td>
<td>A sub-realm or realm bordering the scope character's realm (including across water) and has the same rank as the scope character (look for lieges of he owner of the land if necessary)
</td>
<td>ordered_neighboring_and_across_water_realm_same_rank_owner = {
<p>limit = { &lt;triggers&gt; }
order_by = script_value
position = int
min = int
max = script_value
check_range_bounds = no # If you don't want an error logged if the list is smaller than the min/max
&lt;effects&gt; }
</p>
</td>
<td>character
</td>
<td>character
</td></tr>
<tr>
<td>ordered_neighboring_and_across_water_top_liege_realm
</td>
<td>A realm with a different top liege neighboring the realm of the scope character's top liege (including across water); switches to the realm's top title. Can be based on borders a day or two out of date
</td>
<td>ordered_neighboring_and_across_water_top_liege_realm = {
<p>limit = { &lt;triggers&gt; }
order_by = script_value
position = int
min = int
max = script_value
check_range_bounds = no # If you don't want an error logged if the list is smaller than the min/max
&lt;effects&gt; }
</p>
</td>
<td>character
</td>
<td>landed title
</td></tr>
<tr>
<td>ordered_neighboring_and_across_water_top_liege_realm_owner
</td>
<td>A realm with a different top liege neighboring the realm of the scope character's top liege (including across water); switches to the holder of the realm. Can be based on borders a day or two out of date
</td>
<td>ordered_neighboring_and_across_water_top_liege_realm_owner = {
<p>limit = { &lt;triggers&gt; }
order_by = script_value
position = int
min = int
max = script_value
check_range_bounds = no # If you don't want an error logged if the list is smaller than the min/max
&lt;effects&gt; }
</p>
</td>
<td>character
</td>
<td>character
</td></tr>
<tr>
<td>ordered_neighboring_realm_same_rank_owner
</td>
<td>A sub-realm or realm bordering the scope character's realm and has the same rank as the scope character (look for lieges of he owner of the land if necessary)
</td>
<td>ordered_neighboring_realm_same_rank_owner = {
<p>limit = { &lt;triggers&gt; }
order_by = script_value
position = int
min = int
max = script_value
check_range_bounds = no # If you don't want an error logged if the list is smaller than the min/max
&lt;effects&gt; }
</p>
</td>
<td>character
</td>
<td>character
</td></tr>
<tr>
<td>ordered_neighboring_top_liege_realm
</td>
<td>A realm with a different top liege neighboring the realm of the scope character's top liege; switches to the realm's top title. Can be based on borders a day or two out of date
</td>
<td>ordered_neighboring_top_liege_realm = {
<p>limit = { &lt;triggers&gt; }
order_by = script_value
position = int
min = int
max = script_value
check_range_bounds = no # If you don't want an error logged if the list is smaller than the min/max
&lt;effects&gt; }
</p>
</td>
<td>character
</td>
<td>landed title
</td></tr>
<tr>
<td>ordered_neighboring_top_liege_realm_owner
</td>
<td>A realm with a different top liege neighboring the realm of the scope character's top liege; switches to the holder of the realm. Can be based on borders a day or two out of date
</td>
<td>ordered_neighboring_top_liege_realm_owner = {
<p>limit = { &lt;triggers&gt; }
order_by = script_value
position = int
min = int
max = script_value
check_range_bounds = no # If you don't want an error logged if the list is smaller than the min/max
&lt;effects&gt; }
</p>
</td>
<td>character
</td>
<td>character
</td></tr>
<tr>
<td>ordered_owned_story
</td>
<td>Iterate through all owned stories for a character
</td>
<td>ordered_owned_story = {
<p>limit = { &lt;triggers&gt; }
order_by = script_value
position = int
min = int
max = script_value
check_range_bounds = no # If you don't want an error logged if the list is smaller than the min/max
&lt;effects&gt; }
</p>
</td>
<td>character
</td>
<td>story cycle
</td></tr>
<tr>
<td>ordered_parent
</td>
<td>Iterate through all (both) parents
</td>
<td>ordered_parent = {
<p>limit = { &lt;triggers&gt; }
order_by = script_value
position = int
min = int
max = script_value
check_range_bounds = no # If you don't want an error logged if the list is smaller than the min/max
&lt;effects&gt; }
</p>
</td>
<td>character
</td>
<td>character
</td></tr>
<tr>
<td>ordered_patroned_holy_order
</td>
<td>Iterate through all holy orders that the scoped character is a patron of
</td>
<td>ordered_patroned_holy_order = {
<p>limit = { &lt;triggers&gt; }
order_by = script_value
position = int
min = int
max = script_value
check_range_bounds = no # If you don't want an error logged if the list is smaller than the min/max
&lt;effects&gt; }
</p>
</td>
<td>character
</td>
<td>holy order
</td></tr>
<tr>
<td>ordered_pinned_character
</td>
<td>Iterate through characters this player has pinned
</td>
<td>ordered_pinned_character = {
<p>limit = { &lt;triggers&gt; }
order_by = script_value
position = int
min = int
max = script_value
check_range_bounds = no # If you don't want an error logged if the list is smaller than the min/max
&lt;effects&gt; }
</p>
</td>
<td>character
</td>
<td>character
</td></tr>
<tr>
<td>ordered_pinning_character
</td>
<td>Iterate through characters whose player has this character pinned
</td>
<td>ordered_pinning_character = {
<p>limit = { &lt;triggers&gt; }
order_by = script_value
position = int
min = int
max = script_value
check_range_bounds = no # If you don't want an error logged if the list is smaller than the min/max
&lt;effects&gt; }
</p>
</td>
<td>character
</td>
<td>character
</td></tr>
<tr>
<td>ordered_player_heir
</td>
<td>Iterate through player heirs, capped at the first 10
</td>
<td>ordered_player_heir = {
<p>limit = { &lt;triggers&gt; }
order_by = script_value
position = int
min = int
max = script_value
check_range_bounds = no # If you don't want an error logged if the list is smaller than the min/max
&lt;effects&gt; }
</p>
</td>
<td>character
</td>
<td>character
</td></tr>
<tr>
<td>ordered_pool_guest
</td>
<td>Iterate through all guests visiting the court from the pool (in contrast to foreign_court_guest they don't have a liege)
</td>
<td>ordered_pool_guest = {
<p>limit = { &lt;triggers&gt; }
order_by = script_value
position = int
min = int
max = script_value
check_range_bounds = no # If you don't want an error logged if the list is smaller than the min/max
&lt;effects&gt; }
</p>
</td>
<td>character
</td>
<td>character
</td></tr>
<tr>
<td>ordered_potential_marriage_option
</td>
<td>Iterate through all potential selectable marriage or betrohed options
</td>
<td>ordered_potential_marriage_option = {
<p>limit = { &lt;triggers&gt; }
order_by = script_value
position = int
min = int
max = script_value
check_range_bounds = no # If you don't want an error logged if the list is smaller than the min/max
&lt;effects&gt; }
</p>
</td>
<td>character
</td>
<td>character
</td></tr>
<tr>
<td>ordered_pretender_title
</td>
<td>Iterate through all landed titles character is pretender to
</td>
<td>ordered_pretender_title = {
<p>limit = { &lt;triggers&gt; }
order_by = script_value
position = int
min = int
max = script_value
check_range_bounds = no # If you don't want an error logged if the list is smaller than the min/max
&lt;effects&gt; }
</p>
</td>
<td>character
</td>
<td>landed title
</td></tr>
<tr>
<td>ordered_primary_war_enemy
</td>
<td>Iterate through all primary war enemies
</td>
<td>ordered_primary_war_enemy = {
<p>limit = { &lt;triggers&gt; }
order_by = script_value
position = int
min = int
max = script_value
check_range_bounds = no # If you don't want an error logged if the list is smaller than the min/max
&lt;effects&gt; }
</p>
</td>
<td>character
</td>
<td>character
</td></tr>
<tr>
<td>ordered_prisoner
</td>
<td>Iterate through all prisoners
</td>
<td>ordered_prisoner = {
<p>limit = { &lt;triggers&gt; }
order_by = script_value
position = int
min = int
max = script_value
check_range_bounds = no # If you don't want an error logged if the list is smaller than the min/max
&lt;effects&gt; }
</p>
</td>
<td>character
</td>
<td>character
</td></tr>
<tr>
<td>ordered_prowess_councillor
</td>
<td>Iterate through all prowess-based councillors
</td>
<td>ordered_prowess_councillor = {
<p>limit = { &lt;triggers&gt; }
order_by = script_value
position = int
min = int
max = script_value
check_range_bounds = no # If you don't want an error logged if the list is smaller than the min/max
&lt;effects&gt; }
</p>
</td>
<td>character
</td>
<td>character
</td></tr>
<tr>
<td>ordered_raid_target
</td>
<td>Iterate through anyone the character is hostile to due to having raided them. Only returns top lieges
</td>
<td>ordered_raid_target = {
<p>limit = { &lt;triggers&gt; }
order_by = script_value
position = int
min = int
max = script_value
check_range_bounds = no # If you don't want an error logged if the list is smaller than the min/max
&lt;effects&gt; }
</p>
</td>
<td>character
</td>
<td>character
</td></tr>
<tr>
<td>ordered_realm_county
</td>
<td>Iterate through all counties in the realm. Based on top liege
</td>
<td>ordered_realm_county = {
<p>limit = { &lt;triggers&gt; }
order_by = script_value
position = int
min = int
max = script_value
check_range_bounds = no # If you don't want an error logged if the list is smaller than the min/max
&lt;effects&gt; }
</p>
</td>
<td>character
</td>
<td>landed title
</td></tr>
<tr>
<td>ordered_realm_de_jure_duchy
</td>
<td>Iterate through all de jure duchies that have at least one county in the realm. Based on top liege
</td>
<td>ordered_realm_de_jure_duchy = {
<p>limit = { &lt;triggers&gt; }
order_by = script_value
position = int
min = int
max = script_value
check_range_bounds = no # If you don't want an error logged if the list is smaller than the min/max
&lt;effects&gt; }
</p>
</td>
<td>character
</td>
<td>landed title
</td></tr>
<tr>
<td>ordered_realm_de_jure_empire
</td>
<td>Iterate through all de jure empire that have at least one county in the realm. Based on top liege
</td>
<td>ordered_realm_de_jure_empire = {
<p>limit = { &lt;triggers&gt; }
order_by = script_value
position = int
min = int
max = script_value
check_range_bounds = no # If you don't want an error logged if the list is smaller than the min/max
&lt;effects&gt; }
</p>
</td>
<td>character
</td>
<td>landed title
</td></tr>
<tr>
<td>ordered_realm_de_jure_kingdom
</td>
<td>Iterate through all de jure kingdom that have at least one county in the realm. Based on top liege
</td>
<td><pre>ordered_realm_de_jure_kingdom = {
	limit = { &lt;triggers&gt; }
	order_by = script_value
	position = int
	min = int
	max = script_value
	check_range_bounds = no # If you don't want an error logged if the list is smaller than the min/max
	&lt;effects&gt;
}
</pre>
</td>
<td>character
</td>
<td>landed title
</td></tr>
<tr>
<td>ordered_realm_province
</td>
<td>Iterate through all realm provinces of a character
</td>
<td>ordered_realm_province = {
<p>limit = { &lt;triggers&gt; }
order_by = script_value
position = int
min = int
max = script_value
check_range_bounds = no # If you don't want an error logged if the list is smaller than the min/max
&lt;effects&gt; }
</p>
</td>
<td>character
</td>
<td>province
</td></tr>
<tr>
<td>ordered_relation
</td>
<td>Iterate through scripted relations of a given type or multiple types, if someone is multiple relations they will only be in the list once
</td>
<td>ordered_relation = {
<p>limit = { &lt;triggers&gt; }
order_by = script_value
position = int
min = int
max = script_value
check_range_bounds = no # If you don't want an error logged if the list is smaller than the min/max
&lt;effects&gt; }
</p>
</td>
<td>character
</td>
<td>character
</td></tr>
<tr>
<td>ordered_scheme
</td>
<td>Iterate through all schemes owned by the character
</td>
<td>ordered_scheme = {
<p>limit = { &lt;triggers&gt; }
order_by = script_value
position = int
min = int
max = script_value
check_range_bounds = no # If you don't want an error logged if the list is smaller than the min/max
&lt;effects&gt; }
</p>
</td>
<td>character
</td>
<td>scheme
</td></tr>
<tr>
<td>ordered_secret
</td>
<td>Iterate through all secrets of the character
</td>
<td>ordered_secret = {
<p>limit = { &lt;triggers&gt; }
order_by = script_value
position = int
min = int
max = script_value
check_range_bounds = no # If you don't want an error logged if the list is smaller than the min/max
&lt;effects&gt; }
</p>
</td>
<td>character
</td>
<td>secret
</td></tr>
<tr>
<td>ordered_sibling
</td>
<td>Iterate through all siblings
</td>
<td>ordered_sibling = {
<p>limit = { &lt;triggers&gt; }
order_by = script_value
position = int
min = int
max = script_value
check_range_bounds = no # If you don't want an error logged if the list is smaller than the min/max
&lt;effects&gt; }
</p>
</td>
<td>character
</td>
<td>character
</td></tr>
<tr>
<td>ordered_spouse
</td>
<td>Iterate through all spouses
</td>
<td>ordered_spouse = {
<p>limit = { &lt;triggers&gt; }
order_by = script_value
position = int
min = int
max = script_value
check_range_bounds = no # If you don't want an error logged if the list is smaller than the min/max
&lt;effects&gt; }
</p>
</td>
<td>character
</td>
<td>character
</td></tr>
<tr>
<td>ordered_spouse_candidate
</td>
<td>Iterate through all the spouse candidates of a character. WARNING: THIS IS VERY SLOW DO NOT DO IT OFTEN.
</td>
<td>ordered_spouse_candidate = {
<p>limit = { &lt;triggers&gt; }
order_by = script_value
position = int
min = int
max = script_value
check_range_bounds = no # If you don't want an error logged if the list is smaller than the min/max
&lt;effects&gt; }
</p>
</td>
<td>character
</td>
<td>character
</td></tr>
<tr>
<td>ordered_stewardship_councillor
</td>
<td>Iterate through all stewardship-based councillors
</td>
<td>ordered_stewardship_councillor = {
<p>limit = { &lt;triggers&gt; }
order_by = script_value
position = int
min = int
max = script_value
check_range_bounds = no # If you don't want an error logged if the list is smaller than the min/max
&lt;effects&gt; }
</p>
</td>
<td>character
</td>
<td>character
</td></tr>
<tr>
<td>ordered_sub_realm_barony
</td>
<td>Iterate through all baronies in sub-realm
</td>
<td>ordered_sub_realm_barony = {
<p>limit = { &lt;triggers&gt; }
order_by = script_value
position = int
min = int
max = script_value
check_range_bounds = no # If you don't want an error logged if the list is smaller than the min/max
&lt;effects&gt; }
</p>
</td>
<td>character
</td>
<td>landed title
</td></tr>
<tr>
<td>ordered_sub_realm_county
</td>
<td>Iterate through all counties in sub-realm
</td>
<td>ordered_sub_realm_county = {
<p>limit = { &lt;triggers&gt; }
order_by = script_value
position = int
min = int
max = script_value
check_range_bounds = no # If you don't want an error logged if the list is smaller than the min/max
&lt;effects&gt; }
</p>
</td>
<td>character
</td>
<td>landed title
</td></tr>
<tr>
<td>ordered_sub_realm_duchy
</td>
<td>Iterate through all duchies in sub-realm
</td>
<td>ordered_sub_realm_duchy = {
<p>limit = { &lt;triggers&gt; }
order_by = script_value
position = int
min = int
max = script_value
check_range_bounds = no # If you don't want an error logged if the list is smaller than the min/max
&lt;effects&gt; }
</p>
</td>
<td>character
</td>
<td>landed title
</td></tr>
<tr>
<td>ordered_sub_realm_empire
</td>
<td>Iterate through all empires in sub-realm
</td>
<td>ordered_sub_realm_empire = {
<p>limit = { &lt;triggers&gt; }
order_by = script_value
position = int
min = int
max = script_value
check_range_bounds = no # If you don't want an error logged if the list is smaller than the min/max
&lt;effects&gt; }
</p>
</td>
<td>character
</td>
<td>landed title
</td></tr>
<tr>
<td>ordered_sub_realm_kingdom
</td>
<td>Iterate through all kingdoms in sub-realm
</td>
<td>ordered_sub_realm_kingdom = {
<p>limit = { &lt;triggers&gt; }
order_by = script_value
position = int
min = int
max = script_value
check_range_bounds = no # If you don't want an error logged if the list is smaller than the min/max
&lt;effects&gt; }
</p>
</td>
<td>character
</td>
<td>landed title
</td></tr>
<tr>
<td>ordered_sub_realm_title
</td>
<td>Iterate through all titles in sub-realm
</td>
<td>ordered_sub_realm_title = {
<p>limit = { &lt;triggers&gt; }
order_by = script_value
position = int
min = int
max = script_value
check_range_bounds = no # If you don't want an error logged if the list is smaller than the min/max
&lt;effects&gt; }
</p>
</td>
<td>character
</td>
<td>landed title
</td></tr>
<tr>
<td>ordered_targeting_faction
</td>
<td>Iterate through all factions targeting the scope character
</td>
<td>ordered_targeting_faction = {
<p>limit = { &lt;triggers&gt; }
order_by = script_value
position = int
min = int
max = script_value
check_range_bounds = no # If you don't want an error logged if the list is smaller than the min/max
&lt;effects&gt; }
</p>
</td>
<td>character
</td>
<td>faction
</td></tr>
<tr>
<td>ordered_targeting_scheme
</td>
<td>Iterate through all schemes targeting the character
</td>
<td>ordered_targeting_scheme = {
<p>limit = { &lt;triggers&gt; }
order_by = script_value
position = int
min = int
max = script_value
check_range_bounds = no # If you don't want an error logged if the list is smaller than the min/max
&lt;effects&gt; }
</p>
</td>
<td>character
</td>
<td>scheme
</td></tr>
<tr>
<td>ordered_targeting_secret
</td>
<td>Iterate through all secrets that target the specified scope
</td>
<td>ordered_targeting_secret = {
<p>limit = { &lt;triggers&gt; }
order_by = script_value
position = int
min = int
max = script_value
check_range_bounds = no # If you don't want an error logged if the list is smaller than the min/max
&lt;effects&gt; }
</p>
</td>
<td>character
</td>
<td>secret
</td></tr>
<tr>
<td>ordered_traveling_family_member
</td>
<td>Iterate though all characters that should travel with the scoped one (when moving between courts for instance); includes the scoped character
</td>
<td>ordered_traveling_family_member = {
<p>limit = { &lt;triggers&gt; }
order_by = script_value
position = int
min = int
max = script_value
check_range_bounds = no # If you don't want an error logged if the list is smaller than the min/max
&lt;effects&gt; }
</p>
</td>
<td>character
</td>
<td>character
</td></tr>
<tr>
<td>ordered_truce_holder
</td>
<td>Iterate through all characters that have a truce on this character
</td>
<td>ordered_truce_holder = {
<p>limit = { &lt;triggers&gt; }
order_by = script_value
position = int
min = int
max = script_value
check_range_bounds = no # If you don't want an error logged if the list is smaller than the min/max
&lt;effects&gt; }
</p>
</td>
<td>character
</td>
<td>character
</td></tr>
<tr>
<td>ordered_truce_target
</td>
<td>Iterate through all characters this character has a truce on
</td>
<td>ordered_truce_target = {
<p>limit = { &lt;triggers&gt; }
order_by = script_value
position = int
min = int
max = script_value
check_range_bounds = no # If you don't want an error logged if the list is smaller than the min/max
&lt;effects&gt; }
</p>
</td>
<td>character
</td>
<td>character
</td></tr>
<tr>
<td>ordered_unspent_known_secret
</td>
<td>Iterate through all unspent secrets known by the character
</td>
<td>ordered_unspent_known_secret = {
<p>limit = { &lt;triggers&gt; }
order_by = script_value
position = int
min = int
max = script_value
check_range_bounds = no # If you don't want an error logged if the list is smaller than the min/max
&lt;effects&gt; }
</p>
</td>
<td>character
</td>
<td>secret
</td></tr>
<tr>
<td>ordered_vassal
</td>
<td>Iterate through all DIRECT vassals
</td>
<td>ordered_vassal = {
<p>limit = { &lt;triggers&gt; }
order_by = script_value
position = int
min = int
max = script_value
check_range_bounds = no # If you don't want an error logged if the list is smaller than the min/max
&lt;effects&gt; }
</p>
</td>
<td>character
</td>
<td>character
</td></tr>
<tr>
<td>ordered_vassal_or_below
</td>
<td>Iterate through ALL vassals, not just direct vassals
</td>
<td>ordered_vassal_or_below = {
<p>limit = { &lt;triggers&gt; }
order_by = script_value
position = int
min = int
max = script_value
check_range_bounds = no # If you don't want an error logged if the list is smaller than the min/max
&lt;effects&gt; }
</p>
</td>
<td>character
</td>
<td>character
</td></tr>
<tr>
<td>ordered_war_ally
</td>
<td>Iterate through all direct war allies
</td>
<td>ordered_war_ally = {
<p>limit = { &lt;triggers&gt; }
order_by = script_value
position = int
min = int
max = script_value
check_range_bounds = no # If you don't want an error logged if the list is smaller than the min/max
&lt;effects&gt; }
</p>
</td>
<td>character
</td>
<td>character
</td></tr>
<tr>
<td>ordered_war_enemy
</td>
<td>Iterate through all direct war enemies
</td>
<td>ordered_war_enemy = {
<p>limit = { &lt;triggers&gt; }
order_by = script_value
position = int
min = int
max = script_value
check_range_bounds = no # If you don't want an error logged if the list is smaller than the min/max
&lt;effects&gt; }
</p>
</td>
<td>character
</td>
<td>character
</td></tr></tbody></table>
<h4><span id="Beginning_with_'random'"></span><span class="mw-headline" id="Beginning_with_.27random.27">Beginning with 'random'</span><span class="mw-editsection"><span class="mw-editsection-bracket">[</span><a href="/index.php?title=Effects&amp;action=edit&amp;section=17" title="Edit section: Beginning with &#039;random&#039;">edit</a><span class="mw-editsection-bracket">]</span></span></h4>
<table class="wikitable sortable" width="100%">
<tbody><tr>
<th width="15%">Name
</th>
<th width="15%">Description
</th>
<th width="25%">Usage
</th>
<th width="20%">Supported scopes
</th>
<th width="20%">Supported targets
</th></tr>
<tr>
<td>random_alert_creatable_title
</td>
<td>Iterate through all titles that can be created by the character. (only for alerts)
</td>
<td>random_alert_creatable_title = { limit = { &lt;triggers&gt; } (optional) weight = { mtth } &lt;effects&gt; }
</td>
<td>character
</td>
<td>landed title
</td></tr>
<tr>
<td>random_alert_usurpable_title
</td>
<td>Iterate through all titles that can be usurped by the character. (only for alerts)
</td>
<td>random_alert_usurpable_title = { limit = { &lt;triggers&gt; } (optional) weight = { mtth } &lt;effects&gt; }
</td>
<td>character
</td>
<td>landed title
</td></tr>
<tr>
<td>random_ally
</td>
<td>Iterate through all allies
</td>
<td>random_ally = { limit = { &lt;triggers&gt; } (optional) weight = { mtth } &lt;effects&gt; }
</td>
<td>character
</td>
<td>character
</td></tr>
<tr>
<td>random_ancestor
</td>
<td>Iterate through all the ancestors of the scope character up to 5 generations
</td>
<td>random_ancestor = { limit = { &lt;triggers&gt; } (optional) weight = { mtth } &lt;effects&gt; }
</td>
<td>character
</td>
<td>character
</td></tr>
<tr>
<td>random_army
</td>
<td>Iterate through all armies
</td>
<td>random_army = { limit = { &lt;triggers&gt; } (optional) weight = { mtth } &lt;effects&gt; }
</td>
<td>character
</td>
<td>army
</td></tr>
<tr>
<td>random_character_to_title_neighboring_and_across_water_barony
</td>
<td>Scopes from a character to a neighboring barony (incl. across water, looking trough the de Jure lieges)
</td>
<td>random_character_to_title_neighboring_and_across_water_barony = { limit = { &lt;triggers&gt; } (optional) weight = { mtth } &lt;effects&gt; }
</td>
<td>character
</td>
<td>landed title
</td></tr>
<tr>
<td>random_character_to_title_neighboring_and_across_water_county
</td>
<td>Scopes from a character to a neighboring county (incl. across water, looking trough the de Jure lieges)
</td>
<td>random_character_to_title_neighboring_and_across_water_county = { limit = { &lt;triggers&gt; } (optional) weight = { mtth } &lt;effects&gt; }
</td>
<td>character
</td>
<td>landed title
</td></tr>
<tr>
<td>random_character_to_title_neighboring_and_across_water_duchy
</td>
<td>Scopes from a character to a neighboring duchy (incl. across water, looking trough the de Jure lieges)
</td>
<td>random_character_to_title_neighboring_and_across_water_duchy = { limit = { &lt;triggers&gt; } (optional) weight = { mtth } &lt;effects&gt; }
</td>
<td>character
</td>
<td>landed title
</td></tr>
<tr>
<td>random_character_to_title_neighboring_and_across_water_empire
</td>
<td>Scopes from a character to a neighboring empire (incl. across water, looking trough the de Jure lieges)
</td>
<td>random_character_to_title_neighboring_and_across_water_empire = { limit = { &lt;triggers&gt; } (optional) weight = { mtth } &lt;effects&gt; }
</td>
<td>character
</td>
<td>landed title
</td></tr>
<tr>
<td>random_character_to_title_neighboring_and_across_water_kingdom
</td>
<td>Scopes from a character to a neighboring kingdom (incl. across water, looking trough the de Jure lieges)
</td>
<td>random_character_to_title_neighboring_and_across_water_kingdom = { limit = { &lt;triggers&gt; } (optional) weight = { mtth } &lt;effects&gt; }
</td>
<td>character
</td>
<td>landed title
</td></tr>
<tr>
<td>random_character_to_title_neighboring_barony
</td>
<td>Scopes from a character to a neighboring barony (looking trough the de Jure lieges)
</td>
<td>random_character_to_title_neighboring_barony = { limit = { &lt;triggers&gt; } (optional) weight = { mtth } &lt;effects&gt; }
</td>
<td>character
</td>
<td>landed title
</td></tr>
<tr>
<td>random_character_to_title_neighboring_county
</td>
<td>Scopes from a character to a neighboring county (looking trough the de Jure lieges)
</td>
<td>random_character_to_title_neighboring_county = { limit = { &lt;triggers&gt; } (optional) weight = { mtth } &lt;effects&gt; }
</td>
<td>character
</td>
<td>landed title
</td></tr>
<tr>
<td>random_character_to_title_neighboring_duchy
</td>
<td>Scopes from a character to a neighboring duchy (looking trough the de Jure lieges)
</td>
<td>random_character_to_title_neighboring_duchy = { limit = { &lt;triggers&gt; } (optional) weight = { mtth } &lt;effects&gt; }
</td>
<td>character
</td>
<td>landed title
</td></tr>
<tr>
<td>random_character_to_title_neighboring_empire
</td>
<td>Scopes from a character to a neighboring empire (looking trough the de Jure lieges)
</td>
<td>random_character_to_title_neighboring_empire = { limit = { &lt;triggers&gt; } (optional) weight = { mtth } &lt;effects&gt; }
</td>
<td>character
</td>
<td>landed title
</td></tr>
<tr>
<td>random_character_to_title_neighboring_kingdom
</td>
<td>Scopes from a character to a neighboring kingdom (looking trough the de Jure lieges)
</td>
<td>random_character_to_title_neighboring_kingdom = { limit = { &lt;triggers&gt; } (optional) weight = { mtth } &lt;effects&gt; }
</td>
<td>character
</td>
<td>landed title
</td></tr>
<tr>
<td>random_character_war
</td>
<td>Wars of the scoped character
</td>
<td>random_character_war = { limit = { &lt;triggers&gt; } (optional) weight = { mtth } &lt;effects&gt; }
</td>
<td>character
</td>
<td>war
</td></tr>
<tr>
<td>random_child
</td>
<td>Iterate through all children
</td>
<td>random_child = { limit = { &lt;triggers&gt; } (optional) weight = { mtth } &lt;effects&gt; }
</td>
<td>character
</td>
<td>character
</td></tr>
<tr>
<td>random_claim
</td>
<td>Iterate through the titles of all claims held by a character; parameters: explicit = yes/no/all pressed = yes/no/all
</td>
<td>random_claim = { limit = { &lt;triggers&gt; } (optional) weight = { mtth } &lt;effects&gt; }
</td>
<td>character
</td>
<td>landed title
</td></tr>
<tr>
<td>random_close_family_member
</td>
<td>Iterate through all the close family [father, mother, siblings, children, grandparents]
</td>
<td>random_close_family_member = { limit = { &lt;triggers&gt; } (optional) weight = { mtth } &lt;effects&gt; }
</td>
<td>character
</td>
<td>character
</td></tr>
<tr>
<td>random_close_or_extended_family_member
</td>
<td>Iterate through all the close and extended relatives [father, mother, siblings, children, grandparents, uncles/aunts, nephew/niece, cousins]
</td>
<td>random_close_or_extended_family_member = { limit = { &lt;triggers&gt; } (optional) weight = { mtth } &lt;effects&gt; }
</td>
<td>character
</td>
<td>character
</td></tr>
<tr>
<td>random_concubine
</td>
<td>Iterate through all concubines
</td>
<td>random_concubine = { limit = { &lt;triggers&gt; } (optional) weight = { mtth } &lt;effects&gt; }
</td>
<td>character
</td>
<td>character
</td></tr>
<tr>
<td>random_consort
</td>
<td>Iterate through all consorts (concubines and spouses)
</td>
<td>random_consort = { limit = { &lt;triggers&gt; } (optional) weight = { mtth } &lt;effects&gt; }
</td>
<td>character
</td>
<td>character
</td></tr>
<tr>
<td>random_councillor
</td>
<td>Iterate through all councillors
</td>
<td>random_councillor = { limit = { &lt;triggers&gt; } (optional) weight = { mtth } &lt;effects&gt; }
</td>
<td>character
</td>
<td>character
</td></tr>
<tr>
<td>random_courtier
</td>
<td>Iterate through all courtiers
</td>
<td>random_courtier = { limit = { &lt;triggers&gt; } (optional) weight = { mtth } &lt;effects&gt; }
</td>
<td>character
</td>
<td>character
</td></tr>
<tr>
<td>random_courtier_away
</td>
<td>Iterate through all courtiers that are away
</td>
<td>random_courtier_away = { limit = { &lt;triggers&gt; } (optional) weight = { mtth } &lt;effects&gt; }
</td>
<td>character
</td>
<td>character
</td></tr>
<tr>
<td>random_courtier_or_guest
</td>
<td>Iterate through all courtiers and guests (pool and foreign court guests)
</td>
<td>random_courtier_or_guest = { limit = { &lt;triggers&gt; } (optional) weight = { mtth } &lt;effects&gt; }
</td>
<td>character
</td>
<td>character
</td></tr>
<tr>
<td>random_de_jure_claim
</td>
<td>Iterate through all de jure claims for a character
</td>
<td>random_de_jure_claim = { limit = { &lt;triggers&gt; } (optional) weight = { mtth } &lt;effects&gt; }
</td>
<td>character
</td>
<td>landed title
</td></tr>
<tr>
<td>random_diplomacy_councillor
</td>
<td>Iterate through all diplomacy-based councillors
</td>
<td>random_diplomacy_councillor = { limit = { &lt;triggers&gt; } (optional) weight = { mtth } &lt;effects&gt; }
</td>
<td>character
</td>
<td>character
</td></tr>
<tr>
<td>random_directly_owned_province
</td>
<td>Iterate through all directly owned provinces
</td>
<td>random_directly_owned_province = { limit = { &lt;triggers&gt; } (optional) weight = { mtth } &lt;effects&gt; }
</td>
<td>character
</td>
<td>province
</td></tr>
<tr>
<td>random_election_title
</td>
<td>Iterate through all titles the scoped character can vote on
</td>
<td>random_election_title = { limit = { &lt;triggers&gt; } (optional) weight = { mtth } &lt;effects&gt; }
</td>
<td>character
</td>
<td>landed title
</td></tr>
<tr>
<td>random_extended_family_member
</td>
<td>Iterate through all the extended family [uncles/aunts, nephew/niece, cousins]
</td>
<td>random_extended_family_member = { limit = { &lt;triggers&gt; } (optional) weight = { mtth } &lt;effects&gt; }
</td>
<td>character
</td>
<td>character
</td></tr>
<tr>
<td>random_foreign_court_guest
</td>
<td>Iterate through all guests visiting from another court (in contrast to pool_guest they have a liege)
</td>
<td>random_foreign_court_guest = { limit = { &lt;triggers&gt; } (optional) weight = { mtth } &lt;effects&gt; }
</td>
<td>character
</td>
<td>character
</td></tr>
<tr>
<td>random_former_concubine
</td>
<td>Iterate through all former concubines. Not persisted past death
</td>
<td>random_former_concubine = { limit = { &lt;triggers&gt; } (optional) weight = { mtth } &lt;effects&gt; }
</td>
<td>character
</td>
<td>character
</td></tr>
<tr>
<td>random_former_concubinist
</td>
<td>Iterate through all former concubinists. Not persisted past death
</td>
<td>random_former_concubinist = { limit = { &lt;triggers&gt; } (optional) weight = { mtth } &lt;effects&gt; }
</td>
<td>character
</td>
<td>character
</td></tr>
<tr>
<td>random_former_spouse
</td>
<td>Iterate through all former spouses
</td>
<td>random_former_spouse = { limit = { &lt;triggers&gt; } (optional) weight = { mtth } &lt;effects&gt; }
</td>
<td>character
</td>
<td>character
</td></tr>
<tr>
<td>random_general_councillor
</td>
<td>Iterate through all councillors that are not related to a skill
</td>
<td>random_general_councillor = { limit = { &lt;triggers&gt; } (optional) weight = { mtth } &lt;effects&gt; }
</td>
<td>character
</td>
<td>character
</td></tr>
<tr>
<td>random_heir
</td>
<td>Heirs of the scoped character
</td>
<td>random_heir = { limit = { &lt;triggers&gt; } (optional) weight = { mtth } &lt;effects&gt; }
</td>
<td>character
</td>
<td>character
</td></tr>
<tr>
<td>random_heir_title
</td>
<td>Iterate through all landed titles character is heir to
</td>
<td>random_heir_title = { limit = { &lt;triggers&gt; } (optional) weight = { mtth } &lt;effects&gt; }
</td>
<td>character
</td>
<td>landed title
</td></tr>
<tr>
<td>random_heir_to_title
</td>
<td>Iterate through all titles the scoped character is heir to
</td>
<td>random_heir_to_title = { limit = { &lt;triggers&gt; } (optional) weight = { mtth } &lt;effects&gt; }
</td>
<td>character
</td>
<td>landed title
</td></tr>
<tr>
<td>random_held_title
</td>
<td>Iterate through all held landed titles
</td>
<td>random_held_title = { limit = { &lt;triggers&gt; } (optional) weight = { mtth } &lt;effects&gt; }
</td>
<td>character
</td>
<td>landed title
</td></tr>
<tr>
<td>random_hired_mercenary
</td>
<td>Iterate through all hired mercenary companies
</td>
<td>random_hired_mercenary = { limit = { &lt;triggers&gt; } (optional) weight = { mtth } &lt;effects&gt; }
</td>
<td>character
</td>
<td>mercenary company
</td></tr>
<tr>
<td>random_hooked_character
</td>
<td>Iterate through all characters this character has a hook on
</td>
<td>random_hooked_character = { limit = { &lt;triggers&gt; } (optional) weight = { mtth } &lt;effects&gt; }
</td>
<td>character
</td>
<td>character
</td></tr>
<tr>
<td>random_hostile_raider
</td>
<td>Iterate through anyone the character is hostile to due to their top-liege's realm having been raided
</td>
<td>random_hostile_raider = { limit = { &lt;triggers&gt; } (optional) weight = { mtth } &lt;effects&gt; }
</td>
<td>character
</td>
<td>character
</td></tr>
<tr>
<td>random_intrigue_councillor
</td>
<td>Iterate through all intrigue-based councillors
</td>
<td>random_intrigue_councillor = { limit = { &lt;triggers&gt; } (optional) weight = { mtth } &lt;effects&gt; }
</td>
<td>character
</td>
<td>character
</td></tr>
<tr>
<td>random_knight
</td>
<td>Iterate through all knights
</td>
<td>random_knight = { limit = { &lt;triggers&gt; } (optional) weight = { mtth } &lt;effects&gt; }
</td>
<td>character
</td>
<td>character
</td></tr>
<tr>
<td>random_known_secret
</td>
<td>Iterate through all secrets known by the character
</td>
<td>random_known_secret = { limit = { &lt;triggers&gt; } (optional) weight = { mtth } &lt;effects&gt; }
</td>
<td>character
</td>
<td>secret
</td></tr>
<tr>
<td>random_learning_councillor
</td>
<td>Iterate through all learning-based councillors
</td>
<td>random_learning_councillor = { limit = { &lt;triggers&gt; } (optional) weight = { mtth } &lt;effects&gt; }
</td>
<td>character
</td>
<td>character
</td></tr>
<tr>
<td>random_liege_or_above
</td>
<td>Iterate through all lieges above a character (skipping the character themselves)
</td>
<td>random_liege_or_above = { limit = { &lt;triggers&gt; } (optional) weight = { mtth } &lt;effects&gt; }
</td>
<td>character
</td>
<td>character
</td></tr>
<tr>
<td>random_martial_councillor
</td>
<td>Iterate through all martial-based councillors
</td>
<td>random_martial_councillor = { limit = { &lt;triggers&gt; } (optional) weight = { mtth } &lt;effects&gt; }
</td>
<td>character
</td>
<td>character
</td></tr>
<tr>
<td>random_neighboring_and_across_water_realm_same_rank_owner
</td>
<td>A sub-realm or realm bordering the scope character's realm (including across water) and has the same rank as the scope character (look for lieges of he owner of the land if necessary)
</td>
<td>random_neighboring_and_across_water_realm_same_rank_owner = { limit = { &lt;triggers&gt; } (optional) weight = { mtth } &lt;effects&gt; }
</td>
<td>character
</td>
<td>character
</td></tr>
<tr>
<td>random_neighboring_and_across_water_top_liege_realm
</td>
<td>A realm with a different top liege neighboring the realm of the scope character's top liege (including across water); switches to the realm's top title. Can be based on borders a day or two out of date
</td>
<td>random_neighboring_and_across_water_top_liege_realm = { limit = { &lt;triggers&gt; } (optional) weight = { mtth } &lt;effects&gt; }
</td>
<td>character
</td>
<td>landed title
</td></tr>
<tr>
<td>random_neighboring_and_across_water_top_liege_realm_owner
</td>
<td>A realm with a different top liege neighboring the realm of the scope character's top liege (including across water); switches to the holder of the realm. Can be based on borders a day or two out of date
</td>
<td>random_neighboring_and_across_water_top_liege_realm_owner = { limit = { &lt;triggers&gt; } (optional) weight = { mtth } &lt;effects&gt; }
</td>
<td>character
</td>
<td>character
</td></tr>
<tr>
<td>random_neighboring_realm_same_rank_owner
</td>
<td>A sub-realm or realm bordering the scope character's realm and has the same rank as the scope character (look for lieges of he owner of the land if necessary)
</td>
<td>random_neighboring_realm_same_rank_owner = { limit = { &lt;triggers&gt; } (optional) weight = { mtth } &lt;effects&gt; }
</td>
<td>character
</td>
<td>character
</td></tr>
<tr>
<td>random_neighboring_top_liege_realm
</td>
<td>A realm with a different top liege neighboring the realm of the scope character's top liege; switches to the realm's top title. Can be based on borders a day or two out of date
</td>
<td>random_neighboring_top_liege_realm = { limit = { &lt;triggers&gt; } (optional) weight = { mtth } &lt;effects&gt; }
</td>
<td>character
</td>
<td>landed title
</td></tr>
<tr>
<td>random_neighboring_top_liege_realm_owner
</td>
<td>A realm with a different top liege neighboring the realm of the scope character's top liege; switches to the holder of the realm. Can be based on borders a day or two out of date
</td>
<td>random_neighboring_top_liege_realm_owner = { limit = { &lt;triggers&gt; } (optional) weight = { mtth } &lt;effects&gt; }
</td>
<td>character
</td>
<td>character
</td></tr>
<tr>
<td>random_owned_story
</td>
<td>Iterate through all owned stories for a character
</td>
<td>random_owned_story = { limit = { &lt;triggers&gt; } (optional) weight = { mtth } &lt;effects&gt; }
</td>
<td>character
</td>
<td>story cycle
</td></tr>
<tr>
<td>random_parent
</td>
<td>Iterate through all (both) parents
</td>
<td>random_parent = { limit = { &lt;triggers&gt; } (optional) weight = { mtth } &lt;effects&gt; }
</td>
<td>character
</td>
<td>character
</td></tr>
<tr>
<td>random_patroned_holy_order
</td>
<td>Iterate through all holy orders that the scoped character is a patron of
</td>
<td>random_patroned_holy_order = { limit = { &lt;triggers&gt; } (optional) weight = { mtth } &lt;effects&gt; }
</td>
<td>character
</td>
<td>holy order
</td></tr>
<tr>
<td>random_pinned_character
</td>
<td>Iterate through characters this player has pinned
</td>
<td>random_pinned_character = { limit = { &lt;triggers&gt; } (optional) weight = { mtth } &lt;effects&gt; }
</td>
<td>character
</td>
<td>character
</td></tr>
<tr>
<td>random_pinning_character
</td>
<td>Iterate through characters whose player has this character pinned
</td>
<td>random_pinning_character = { limit = { &lt;triggers&gt; } (optional) weight = { mtth } &lt;effects&gt; }
</td>
<td>character
</td>
<td>character
</td></tr>
<tr>
<td>random_player_heir
</td>
<td>Iterate through player heirs, capped at the first 10
</td>
<td>random_player_heir = { limit = { &lt;triggers&gt; } (optional) weight = { mtth } &lt;effects&gt; }
</td>
<td>character
</td>
<td>character
</td></tr>
<tr>
<td>random_pool_guest
</td>
<td>Iterate through all guests visiting the court from the pool (in contrast to foreign_court_guest they don't have a liege)
</td>
<td>random_pool_guest = { limit = { &lt;triggers&gt; } (optional) weight = { mtth } &lt;effects&gt; }
</td>
<td>character
</td>
<td>character
</td></tr>
<tr>
<td>random_potential_marriage_option
</td>
<td>Iterate through all potential selectable marriage or betrohed options
</td>
<td>random_potential_marriage_option = { limit = { &lt;triggers&gt; } (optional) weight = { mtth } &lt;effects&gt; }
</td>
<td>character
</td>
<td>character
</td></tr>
<tr>
<td>random_pretender_title
</td>
<td>Iterate through all landed titles character is pretender to
</td>
<td>random_pretender_title = { limit = { &lt;triggers&gt; } (optional) weight = { mtth } &lt;effects&gt; }
</td>
<td>character
</td>
<td>landed title
</td></tr>
<tr>
<td>random_primary_war_enemy
</td>
<td>Iterate through all primary war enemies
</td>
<td>random_primary_war_enemy = { limit = { &lt;triggers&gt; } (optional) weight = { mtth } &lt;effects&gt; }
</td>
<td>character
</td>
<td>character
</td></tr>
<tr>
<td>random_prisoner
</td>
<td>Iterate through all prisoners
</td>
<td>random_prisoner = { limit = { &lt;triggers&gt; } (optional) weight = { mtth } &lt;effects&gt; }
</td>
<td>character
</td>
<td>character
</td></tr>
<tr>
<td>random_prowess_councillor
</td>
<td>Iterate through all prowess-based councillors
</td>
<td>random_prowess_councillor = { limit = { &lt;triggers&gt; } (optional) weight = { mtth } &lt;effects&gt; }
</td>
<td>character
</td>
<td>character
</td></tr>
<tr>
<td>random_raid_target
</td>
<td>Iterate through anyone the character is hostile to due to having raided them. Only returns top lieges
</td>
<td>random_raid_target = { limit = { &lt;triggers&gt; } (optional) weight = { mtth } &lt;effects&gt; }
</td>
<td>character
</td>
<td>character
</td></tr>
<tr>
<td>random_realm_county
</td>
<td>Iterate through all counties in the realm. Based on top liege
</td>
<td>random_realm_county = { limit = { &lt;triggers&gt; } (optional) weight = { mtth } &lt;effects&gt; }
</td>
<td>character
</td>
<td>landed title
</td></tr>
<tr>
<td>random_realm_de_jure_duchy
</td>
<td>Iterate through all de jure duchies that have at least one county in the realm. Based on top liege
</td>
<td>random_realm_de_jure_duchy = { limit = { &lt;triggers&gt; } (optional) weight = { mtth } &lt;effects&gt; }
</td>
<td>character
</td>
<td>landed title
</td></tr>
<tr>
<td>random_realm_de_jure_empire
</td>
<td>Iterate through all de jure empire that have at least one county in the realm. Based on top liege
</td>
<td>random_realm_de_jure_empire = { limit = { &lt;triggers&gt; } (optional) weight = { mtth } &lt;effects&gt; }
</td>
<td>character
</td>
<td>landed title
</td></tr>
<tr>
<td>random_realm_de_jure_kingdom
</td>
<td>Iterate through all de jure kingdom that have at least one county in the realm. Based on top liege
</td>
<td>random_realm_de_jure_kingdom = { limit = { &lt;triggers&gt; } (optional) weight = { mtth } &lt;effects&gt; }
</td>
<td>character
</td>
<td>landed title
</td></tr>
<tr>
<td>random_realm_province
</td>
<td>Iterate through all realm provinces of a character
</td>
<td>random_realm_province = { limit = { &lt;triggers&gt; } (optional) weight = { mtth } &lt;effects&gt; }
</td>
<td>character
</td>
<td>province
</td></tr>
<tr>
<td>random_relation
</td>
<td>Iterate through scripted relations of a given type or multiple types, if someone is multiple relations they will only be in the list once
</td>
<td>random_relation = { limit = { &lt;triggers&gt; } (optional) weight = { mtth } &lt;effects&gt; }
</td>
<td>character
</td>
<td>character
</td></tr>
<tr>
<td>random_scheme
</td>
<td>Iterate through all schemes owned by the character
</td>
<td>random_scheme = { limit = { &lt;triggers&gt; } (optional) weight = { mtth } &lt;effects&gt; }
</td>
<td>character
</td>
<td>scheme
</td></tr>
<tr>
<td>random_secret
</td>
<td>Iterate through all secrets of the character
</td>
<td>random_secret = { limit = { &lt;triggers&gt; } (optional) weight = { mtth } &lt;effects&gt; }
</td>
<td>character
</td>
<td>secret
</td></tr>
<tr>
<td>random_sibling
</td>
<td>Iterate through all siblings
</td>
<td>random_sibling = { limit = { &lt;triggers&gt; } (optional) weight = { mtth } &lt;effects&gt; }
</td>
<td>character
</td>
<td>character
</td></tr>
<tr>
<td>random_spouse
</td>
<td>Iterate through all spouses
</td>
<td>random_spouse = { limit = { &lt;triggers&gt; } (optional) weight = { mtth } &lt;effects&gt; }
</td>
<td>character
</td>
<td>character
</td></tr>
<tr>
<td>random_spouse_candidate
</td>
<td>Iterate through all the spouse candidates of a character. WARNING: THIS IS VERY SLOW DO NOT DO IT OFTEN.
</td>
<td>random_spouse_candidate = { limit = { &lt;triggers&gt; } (optional) weight = { mtth } &lt;effects&gt; }
</td>
<td>character
</td>
<td>character
</td></tr>
<tr>
<td>random_stewardship_councillor
</td>
<td>Iterate through all stewardship-based councillors
</td>
<td>random_stewardship_councillor = { limit = { &lt;triggers&gt; } (optional) weight = { mtth } &lt;effects&gt; }
</td>
<td>character
</td>
<td>character
</td></tr>
<tr>
<td>random_sub_realm_barony
</td>
<td>Iterate through all baronies in sub-realm
</td>
<td>random_sub_realm_barony = { limit = { &lt;triggers&gt; } (optional) weight = { mtth } &lt;effects&gt; }
</td>
<td>character
</td>
<td>landed title
</td></tr>
<tr>
<td>random_sub_realm_county
</td>
<td>Iterate through all counties in sub-realm
</td>
<td>random_sub_realm_county = { limit = { &lt;triggers&gt; } (optional) weight = { mtth } &lt;effects&gt; }
</td>
<td>character
</td>
<td>landed title
</td></tr>
<tr>
<td>random_sub_realm_duchy
</td>
<td>Iterate through all duchies in sub-realm
</td>
<td>random_sub_realm_duchy = { limit = { &lt;triggers&gt; } (optional) weight = { mtth } &lt;effects&gt; }
</td>
<td>character
</td>
<td>landed title
</td></tr>
<tr>
<td>random_sub_realm_empire
</td>
<td>Iterate through all empires in sub-realm
</td>
<td>random_sub_realm_empire = { limit = { &lt;triggers&gt; } (optional) weight = { mtth } &lt;effects&gt; }
</td>
<td>character
</td>
<td>landed title
</td></tr>
<tr>
<td>random_sub_realm_kingdom
</td>
<td>Iterate through all kingdoms in sub-realm
</td>
<td>random_sub_realm_kingdom = { limit = { &lt;triggers&gt; } (optional) weight = { mtth } &lt;effects&gt; }
</td>
<td>character
</td>
<td>landed title
</td></tr>
<tr>
<td>random_sub_realm_title
</td>
<td>Iterate through all titles in sub-realm
</td>
<td>random_sub_realm_title = { limit = { &lt;triggers&gt; } (optional) weight = { mtth } &lt;effects&gt; }
</td>
<td>character
</td>
<td>landed title
</td></tr>
<tr>
<td>random_targeting_faction
</td>
<td>Iterate through all factions targeting the scope character
</td>
<td>random_targeting_faction = { limit = { &lt;triggers&gt; } (optional) weight = { mtth } &lt;effects&gt; }
</td>
<td>character
</td>
<td>faction
</td></tr>
<tr>
<td>random_targeting_scheme
</td>
<td>Iterate through all schemes targeting the character
</td>
<td>random_targeting_scheme = { limit = { &lt;triggers&gt; } (optional) weight = { mtth } &lt;effects&gt; }
</td>
<td>character
</td>
<td>scheme
</td></tr>
<tr>
<td>random_targeting_secret
</td>
<td>Iterate through all secrets that target the specified scope
</td>
<td>random_targeting_secret = { limit = { &lt;triggers&gt; } (optional) weight = { mtth } &lt;effects&gt; }
</td>
<td>character
</td>
<td>secret
</td></tr>
<tr>
<td>random_traveling_family_member
</td>
<td>Iterate though all characters that should travel with the scoped one (when moving between courts for instance); includes the scoped character
</td>
<td>random_traveling_family_member = { limit = { &lt;triggers&gt; } (optional) weight = { mtth } &lt;effects&gt; }
</td>
<td>character
</td>
<td>character
</td></tr>
<tr>
<td>random_truce_holder
</td>
<td>Iterate through all characters that have a truce on this character
</td>
<td>random_truce_holder = { limit = { &lt;triggers&gt; } (optional) weight = { mtth } &lt;effects&gt; }
</td>
<td>character
</td>
<td>character
</td></tr>
<tr>
<td>random_truce_target
</td>
<td>Iterate through all characters this character has a truce on
</td>
<td>random_truce_target = { limit = { &lt;triggers&gt; } (optional) weight = { mtth } &lt;effects&gt; }
</td>
<td>character
</td>
<td>character
</td></tr>
<tr>
<td>random_unspent_known_secret
</td>
<td>Iterate through all unspent secrets known by the character
</td>
<td>random_unspent_known_secret = { limit = { &lt;triggers&gt; } (optional) weight = { mtth } &lt;effects&gt; }
</td>
<td>character
</td>
<td>secret
</td></tr>
<tr>
<td>random_vassal
</td>
<td>Iterate through all DIRECT vassals
</td>
<td>random_vassal = { limit = { &lt;triggers&gt; } (optional) weight = { mtth } &lt;effects&gt; }
</td>
<td>character
</td>
<td>character
</td></tr>
<tr>
<td>random_vassal_or_below
</td>
<td>Iterate through ALL vassals, not just direct vassals
</td>
<td>random_vassal_or_below = { limit = { &lt;triggers&gt; } (optional) weight = { mtth } &lt;effects&gt; }
</td>
<td>character
</td>
<td>character
</td></tr>
<tr>
<td>random_war_ally
</td>
<td>Iterate through all direct war allies
</td>
<td>random_war_ally = { limit = { &lt;triggers&gt; } (optional) weight = { mtth } &lt;effects&gt; }
</td>
<td>character
</td>
<td>character
</td></tr>
<tr>
<td>random_war_enemy
</td>
<td>Iterate through all direct war enemies
</td>
<td>random_war_enemy = { limit = { &lt;triggers&gt; } (optional) weight = { mtth } &lt;effects&gt; }
</td>
<td>character
</td>
<td>character
</td></tr></tbody></table>
<h3><span class="mw-headline" id="From_faction_scope">From faction scope</span><span class="mw-editsection"><span class="mw-editsection-bracket">[</span><a href="/index.php?title=Effects&amp;action=edit&amp;section=18" title="Edit section: From faction scope">edit</a><span class="mw-editsection-bracket">]</span></span></h3>
<p>The following effects are only usable in the faction scope.
</p>
<table class="wikitable sortable" width="100%">
<tbody><tr>
<th width="15%">Name
</th>
<th width="15%">Description
</th>
<th width="25%">Usage
</th>
<th width="20%">Supported scopes
</th>
<th width="20%">Supported targets
</th></tr>
<tr>
<td>add_faction_discontent
</td>
<td>add_faction_discontent = X adds (or subtracts) discontent to the scope faction
</td>
<td>Unspecified
</td>
<td>faction
</td>
<td>
</td></tr>
<tr>
<td>destroy_faction
</td>
<td scope="">no]
</td>
<td>Unspecified
</td>
<td>faction
</td>
<td>
</td></tr>
<tr>
<td>every_faction_county_member
</td>
<td>Iterate through all faction county members
</td>
<td>every_faction_county_member = { limit = { &lt;triggers&gt; } &lt;effects&gt; }
</td>
<td>faction
</td>
<td>landed title
</td></tr>
<tr>
<td>every_faction_member
</td>
<td>Iterate through all faction character members
</td>
<td>every_faction_member = { limit = { &lt;triggers&gt; } &lt;effects&gt; }
</td>
<td>faction
</td>
<td>character
</td></tr>
<tr>
<td>faction_remove_war
</td>
<td>Removes the war currently associated with the faction
</td>
<td>faction_remove_war = yes
</td>
<td>faction
</td>
<td>
</td></tr>
<tr>
<td>faction_start_war
</td>
<td>The scope faction starts the war agains their target.
</td>
<td>faction_start_war = {
<pre>   title = [optional]
</pre>
<p>}
</p>
</td>
<td>faction
</td></tr>
<tr>
<td>ordered_faction_county_member
</td>
<td>Iterate through all faction county members
</td>
<td>ordered_faction_county_member = {
<p>limit = { &lt;triggers&gt; }
order_by = script_value
position = int
min = int
max = script_value
check_range_bounds = no # If you don't want an error logged if the list is smaller than the min/max
&lt;effects&gt; }
</p>
</td>
<td>faction
</td>
<td>landed title
</td></tr>
<tr>
<td>ordered_faction_member
</td>
<td>Iterate through all faction character members
</td>
<td>ordered_faction_member = {
<p>limit = { &lt;triggers&gt; }
order_by = script_value
position = int
min = int
max = script_value
check_range_bounds = no # If you don't want an error logged if the list is smaller than the min/max
&lt;effects&gt; }
</p>
</td>
<td>faction
</td>
<td>character
</td></tr>
<tr>
<td>random_faction_county_member
</td>
<td>Iterate through all faction county members
</td>
<td>random_faction_county_member = { limit = { &lt;triggers&gt; } (optional) weight = { mtth } &lt;effects&gt; }
</td>
<td>faction
</td>
<td>landed title
</td></tr>
<tr>
<td>random_faction_member
</td>
<td>Iterate through all faction character members
</td>
<td>random_faction_member = { limit = { &lt;triggers&gt; } (optional) weight = { mtth } &lt;effects&gt; }
</td>
<td>faction
</td>
<td>character
</td></tr>
<tr>
<td>remove_special_character
</td>
<td>Removes the special character for the scope faction
</td>
<td>Unspecified
</td>
<td>faction
</td>
<td>
</td></tr>
<tr>
<td>remove_special_title
</td>
<td>Removes the special character for the scope faction
</td>
<td>Unspecified
</td>
<td>faction
</td>
<td>
</td></tr>
<tr>
<td>set_special_character
</td>
<td>Sets the special character for the scope faction
</td>
<td>Unspecified
</td>
<td>faction
</td>
<td>character
</td></tr>
<tr>
<td>set_special_title
</td>
<td>Sets the special title for the scope faction
</td>
<td>Unspecified
</td>
<td>faction
</td>
<td>landed title
</td></tr></tbody></table>
<h3><span class="mw-headline" id="From_faith_scope">From faith scope</span><span class="mw-editsection"><span class="mw-editsection-bracket">[</span><a href="/index.php?title=Effects&amp;action=edit&amp;section=19" title="Edit section: From faith scope">edit</a><span class="mw-editsection-bracket">]</span></span></h3>
<p>The following effects are only usable in the faith scope.
</p>
<table class="wikitable sortable" width="100%">
<tbody><tr>
<th width="15%">Name
</th>
<th width="15%">Description
</th>
<th width="25%">Usage
</th>
<th width="20%">Supported scopes
</th>
<th width="20%">Supported targets
</th></tr>
<tr>
<td>activate_holy_site
</td>
<td>Activate an inactive holy site&lt;faith_scope&gt; = { activate_holy_site = &lt;holy_site_name&gt; }
</td>
<td>Unspecified
</td>
<td>faith
</td>
<td>
</td></tr>
<tr>
<td>add_doctrine
</td>
<td>Add doctrine to faith&lt;faith_scope&gt; = { add_doctrine = &lt;doctrine_name&gt; }
</td>
<td>Unspecified
</td>
<td>faith
</td>
<td>
</td></tr>
<tr>
<td>change_fervor
</td>
<td>Changes the fervor of the faith by the given value
</td>
<td>change_fervor = script value
</td>
<td>faith
</td>
<td>
</td></tr>
<tr>
<td>every_defensive_great_holy_wars
</td>
<td>Iterate through all great holy wars this faith is defending against
</td>
<td>every_defensive_great_holy_wars = { limit = { &lt;triggers&gt; } &lt;effects&gt; }
</td>
<td>faith
</td>
<td>great holy war
</td></tr>
<tr>
<td>every_faith_holy_order
</td>
<td>Iterate through all holy orders of the faith
</td>
<td>every_faith_holy_order = { limit = { &lt;triggers&gt; } &lt;effects&gt; }
</td>
<td>faith
</td>
<td>holy order
</td></tr>
<tr>
<td>every_holy_site
</td>
<td>Iterate through all holy site baronies of a faith
</td>
<td>every_holy_site = { limit = { &lt;triggers&gt; } &lt;effects&gt; }
</td>
<td>faith
</td>
<td>landed title
</td></tr>
<tr>
<td>ordered_defensive_great_holy_wars
</td>
<td>Iterate through all great holy wars this faith is defending against
</td>
<td>ordered_defensive_great_holy_wars = {
<p>limit = { &lt;triggers&gt; }
order_by = script_value
position = int
min = int
max = script_value
check_range_bounds = no # If you don't want an error logged if the list is smaller than the min/max
&lt;effects&gt; }
</p>
</td>
<td>faith
</td>
<td>great holy war
</td></tr>
<tr>
<td>ordered_faith_holy_order
</td>
<td>Iterate through all holy orders of the faith
</td>
<td>ordered_faith_holy_order = {
<p>limit = { &lt;triggers&gt; }
order_by = script_value
position = int
min = int
max = script_value
check_range_bounds = no # If you don't want an error logged if the list is smaller than the min/max
&lt;effects&gt; }
</p>
</td>
<td>faith
</td>
<td>holy order
</td></tr>
<tr>
<td>ordered_holy_site
</td>
<td>Iterate through all holy site baronies of a faith
</td>
<td>ordered_holy_site = {
<p>limit = { &lt;triggers&gt; }
order_by = script_value
position = int
min = int
max = script_value
check_range_bounds = no # If you don't want an error logged if the list is smaller than the min/max
&lt;effects&gt; }
</p>
</td>
<td>faith
</td>
<td>landed title
</td></tr>
<tr>
<td>random_defensive_great_holy_wars
</td>
<td>Iterate through all great holy wars this faith is defending against
</td>
<td>random_defensive_great_holy_wars = { limit = { &lt;triggers&gt; } (optional) weight = { mtth } &lt;effects&gt; }
</td>
<td>faith
</td>
<td>great holy war
</td></tr>
<tr>
<td>random_faith_holy_order
</td>
<td>Iterate through all holy orders of the faith
</td>
<td>random_faith_holy_order = { limit = { &lt;triggers&gt; } (optional) weight = { mtth } &lt;effects&gt; }
</td>
<td>faith
</td>
<td>holy order
</td></tr>
<tr>
<td>random_holy_site
</td>
<td>Iterate through all holy site baronies of a faith
</td>
<td>random_holy_site = { limit = { &lt;triggers&gt; } (optional) weight = { mtth } &lt;effects&gt; }
</td>
<td>faith
</td>
<td>landed title
</td></tr>
<tr>
<td>remove_doctrine
</td>
<td>Remove doctrine from faith&lt;faith_scope&gt; = { remove_doctrine = &lt;doctrine_name&gt; }
</td>
<td>Unspecified
</td>
<td>faith
</td>
<td>
</td></tr>
<tr>
<td>remove_religious_head_title
</td>
<td>Removes the religious head title of the faith
</td>
<td>remove_religious_head_title = yes
</td>
<td>faith
</td>
<td>
</td></tr>
<tr>
<td>set_religious_head_title
</td>
<td>Sets the religious head title of the faith to the given title.
</td>
<td>set_religious_head_title = scope
</td>
<td>faith
</td>
<td>landed title
</td></tr>
<tr>
<td>start_great_holy_war
</td>
<td>Starts a great holy war.
</td>
<td>start_great_holy_war = {target_character = someonetarget_title = some titledelay = script value # Number of days until the war should startwar = some war # Optional. Will make this a directed GHW instead of undirected, and tie it to this specific war}
</td>
<td>faith
</td>
<td>
</td></tr></tbody></table>
<p><br />
</p>
<h3><span class="mw-headline" id="From_activity_scope">From activity scope</span><span class="mw-editsection"><span class="mw-editsection-bracket">[</span><a href="/index.php?title=Effects&amp;action=edit&amp;section=20" title="Edit section: From activity scope">edit</a><span class="mw-editsection-bracket">]</span></span></h3>
<p>The following effects are only usable in the activity scope.
</p>
<table class="wikitable sortable" width="100%">
<tbody><tr>
<th width="15%">Name
</th>
<th width="15%">Description
</th>
<th width="25%">Usage
</th>
<th width="20%">Supported scopes
</th>
<th width="20%">Supported targets
</th></tr>
<tr>
<td>accept_invitation_for_character
</td>
<td>accept a characters invitation to the activity
</td>
<td>Unspecified
</td>
<td>activity
</td>
<td>character
</td></tr>
<tr>
<td>decline_invitation_for_character
</td>
<td>decline a characters invitation to the activity
</td>
<td>Unspecified
</td>
<td>activity
</td>
<td>character
</td></tr>
<tr>
<td>every_activity_declined
</td>
<td>Iterate through all characters who declined an activity invite to a specific activity
</td>
<td>every_activity_declined = { limit = { &lt;triggers&gt; } &lt;effects&gt; }
</td>
<td>activity
</td>
<td>character
</td></tr>
<tr>
<td>every_activity_invited
</td>
<td>Iterate through all characters who have unanswered invites to a specific activity
</td>
<td>every_activity_invited = { limit = { &lt;triggers&gt; } &lt;effects&gt; }
</td>
<td>activity
</td>
<td>character
</td></tr>
<tr>
<td>every_participant
</td>
<td>Iterate through all participants in an activity
</td>
<td>every_participant = { limit = { &lt;triggers&gt; } &lt;effects&gt; }
</td>
<td>activity
</td>
<td>character
</td></tr>
<tr>
<td>invite_character_to_activity
</td>
<td>invite a character to the activity
</td>
<td>Unspecified
</td>
<td>activity
</td>
<td>character
</td></tr>
<tr>
<td>ordered_activity_declined
</td>
<td>Iterate through all characters who declined an activity invite to a specific activity
</td>
<td>ordered_activity_declined = {
<p>limit = { &lt;triggers&gt; }
order_by = script_value
position = int
min = int
max = script_value
check_range_bounds = no # If you don't want an error logged if the list is smaller than the min/max
&lt;effects&gt; }
</p>
</td>
<td>activity
</td>
<td>character
</td></tr>
<tr>
<td>ordered_activity_invited
</td>
<td>Iterate through all characters who have unanswered invites to a specific activity
</td>
<td>ordered_activity_invited = {
<p>limit = { &lt;triggers&gt; }
order_by = script_value
position = int
min = int
max = script_value
check_range_bounds = no # If you don't want an error logged if the list is smaller than the min/max
&lt;effects&gt; }
</p>
</td>
<td>activity
</td>
<td>character
</td></tr>
<tr>
<td>ordered_participant
</td>
<td>Iterate through all participants in an activity
</td>
<td>ordered_participant = {
<p>limit = { &lt;triggers&gt; }
order_by = script_value
position = int
min = int
max = script_value
check_range_bounds = no # If you don't want an error logged if the list is smaller than the min/max
&lt;effects&gt; }
</p>
</td>
<td>activity
</td>
<td>character
</td></tr>
<tr>
<td>random_activity_declined
</td>
<td>Iterate through all characters who declined an activity invite to a specific activity
</td>
<td>random_activity_declined = { limit = { &lt;triggers&gt; } (optional) weight = { mtth } &lt;effects&gt; }
</td>
<td>activity
</td>
<td>character
</td></tr>
<tr>
<td>random_activity_invited
</td>
<td>Iterate through all characters who have unanswered invites to a specific activity
</td>
<td>random_activity_invited = { limit = { &lt;triggers&gt; } (optional) weight = { mtth } &lt;effects&gt; }
</td>
<td>activity
</td>
<td>character
</td></tr>
<tr>
<td>random_participant
</td>
<td>Iterate through all participants in an activity
</td>
<td>random_participant = { limit = { &lt;triggers&gt; } (optional) weight = { mtth } &lt;effects&gt; }
</td>
<td>activity
</td>
<td>character
</td></tr></tbody></table>
<h3><span class="mw-headline" id="From_army_scope">From army scope</span><span class="mw-editsection"><span class="mw-editsection-bracket">[</span><a href="/index.php?title=Effects&amp;action=edit&amp;section=21" title="Edit section: From army scope">edit</a><span class="mw-editsection-bracket">]</span></span></h3>
<p>The following effects are only usable in the army scope.
</p>
<table class="wikitable sortable" width="100%">
<tbody><tr>
<th width="15%">Name
</th>
<th width="15%">Description
</th>
<th width="25%">Usage
</th>
<th width="20%">Supported scopes
</th>
<th width="20%">Supported targets
</th></tr>
<tr>
<td>assign_commander
</td>
<td>Assign a commander for the scoped army
</td>
<td>assign_commander = scope:a_character
</td>
<td>army
</td>
<td>character
</td></tr>
<tr>
<td>remove_commander
</td>
<td>Removes the currently assigned commander from the scoped army
</td>
<td>remove_commander = yes
</td>
<td>army
</td>
<td>
</td></tr></tbody></table>
<h3><span class="mw-headline" id="From_great_holy_war_scope">From great holy war scope</span><span class="mw-editsection"><span class="mw-editsection-bracket">[</span><a href="/index.php?title=Effects&amp;action=edit&amp;section=22" title="Edit section: From great holy war scope">edit</a><span class="mw-editsection-bracket">]</span></span></h3>
<p>The following effects are only usable in the great holy war scope.
</p>
<table class="wikitable sortable" width="100%">
<tbody><tr>
<th width="15%">Name
</th>
<th width="15%">Description
</th>
<th width="25%">Usage
</th>
<th width="20%">Supported scopes
</th>
<th width="20%">Supported targets
</th></tr>
<tr>
<td>change_war_chest_gold
</td>
<td>Changes the amount of gold in the war chest by the given amount
</td>
<td>change_war_chest_gold = script value
</td>
<td>great holy war
</td>
<td>
</td></tr>
<tr>
<td>change_war_chest_piety
</td>
<td>Changes the amount of piety in the war chest by the given amount
</td>
<td>change_war_chest_piety = script value
</td>
<td>great holy war
</td>
<td>
</td></tr>
<tr>
<td>change_war_chest_prestige
</td>
<td>Changes the amount of prestige in the war chest by the given amount
</td>
<td>change_war_chest_prestige = script value
</td>
<td>great holy war
</td>
<td>
</td></tr>
<tr>
<td>divide_war_chest
</td>
<td>The scoped GHW gives out its war-chest in full or in part.
</td>
<td>divide_war_chest = {
<p>	defenders = yes (default to attackers instead)
	faction = script value (default 1 for 100%)
	gold = no (default = yes)
	piety = no (default = yes)
	prestige = no (default = yes)
}
</p>
</td>
<td>great holy war
</td>
<td>
</td></tr>
<tr>
<td>do_ghw_title_handout
</td>
<td>Hands out titles in the target kingdom to the GHW attacker beneficiaries.
</td>
<td>do_ghw_title_handout = scope:title_and_vassal_change
</td>
<td>great holy war
</td>
<td>title and vassal change
</td></tr>
<tr>
<td>every_pledged_attacker
</td>
<td>Iterate through all pledged attackers within a great holy war
</td>
<td>every_pledged_attacker = { limit = { &lt;triggers&gt; } &lt;effects&gt; }
</td>
<td>great holy war
</td>
<td>character
</td></tr>
<tr>
<td>every_pledged_defender
</td>
<td>Iterate through all pledged defenders within a great holy war
</td>
<td>every_pledged_defender = { limit = { &lt;triggers&gt; } &lt;effects&gt; }
</td>
<td>great holy war
</td>
<td>character
</td></tr>
<tr>
<td>ordered_pledged_attacker
</td>
<td>Iterate through all pledged attackers within a great holy war
</td>
<td>ordered_pledged_attacker = {
<p>limit = { &lt;triggers&gt; }
order_by = script_value
position = int
min = int
max = script_value
check_range_bounds = no # If you don't want an error logged if the list is smaller than the min/max
&lt;effects&gt; }
</p>
</td>
<td>great holy war
</td>
<td>character
</td></tr>
<tr>
<td>ordered_pledged_defender
</td>
<td>Iterate through all pledged defenders within a great holy war
</td>
<td>ordered_pledged_defender = {
<p>limit = { &lt;triggers&gt; }
order_by = script_value
position = int
min = int
max = script_value
check_range_bounds = no # If you don't want an error logged if the list is smaller than the min/max
&lt;effects&gt; }
</p>
</td>
<td>great holy war
</td>
<td>character
</td></tr>
<tr>
<td>pledge_attacker
</td>
<td>The target character pledges themselves as an attacker in the GHW. Must be of the same faith as the GHW declarer. pledge_attacker = some character
</td>
<td>Unspecified
</td>
<td>great holy war
</td>
<td>character
</td></tr>
<tr>
<td>pledge_defender
</td>
<td>The target character pledges themselves as a defender in the GHW. Must be of the same faith as the GHW target.
</td>
<td>pledge_defender = some character
</td>
<td>great holy war
</td>
<td>character
</td></tr>
<tr>
<td>random_pledged_attacker
</td>
<td>Iterate through all pledged attackers within a great holy war
</td>
<td>random_pledged_attacker = { limit = { &lt;triggers&gt; } (optional) weight = { mtth } &lt;effects&gt; }
</td>
<td>great holy war
</td>
<td>character
</td></tr>
<tr>
<td>random_pledged_defender
</td>
<td>Iterate through all pledged defenders within a great holy war
</td>
<td>random_pledged_defender = { limit = { &lt;triggers&gt; } (optional) weight = { mtth } &lt;effects&gt; }
</td>
<td>great holy war
</td>
<td>character
</td></tr>
<tr>
<td>reset_designated_winner
</td>
<td>The GHW stops having a designated winner
</td>
<td>reset_designated_winner = yes
</td>
<td>great holy war
</td>
<td>
</td></tr>
<tr>
<td>set_designated_winner
</td>
<td>The target character becomes the designated winner of the GHW.
</td>
<td>set_designated_winner = some character
</td>
<td>great holy war
</td>
<td>character
</td></tr>
<tr>
<td>set_great_holy_war_target
</td>
<td>Sets the target of the great holy war.
</td>
<td>set_great_holy_war_target = { target_character = someone target_title = some title }
</td>
<td>great holy war
</td>
<td>
</td></tr>
<tr>
<td>set_war_declarer
</td>
<td>The target character becomes the character that should declare war instead of the religious head
</td>
<td>set_war_declarer = some character
</td>
<td>great holy war
</td>
<td>character
</td></tr>
<tr>
<td>start_ghw_war
</td>
<td>Starts the GHW war
</td>
<td>start_ghw_war = undirected_great_holy_war
</td>
<td>great holy war
</td>
<td>
</td></tr>
<tr>
<td>unpledge_attacker
</td>
<td>The target character removes their pledge as an attacker in the GHW. unpledge_attacker = some character
</td>
<td>Unspecified
</td>
<td>great holy war
</td>
<td>character
</td></tr>
<tr>
<td>unpledge_defender
</td>
<td>The target character removes their pledge as a defender in the GHW
</td>
<td>unpledge_defender = some character
</td>
<td>great holy war
</td>
<td>character
</td></tr></tbody></table>
<h3><span class="mw-headline" id="From_combat_side_scope">From combat side scope</span><span class="mw-editsection"><span class="mw-editsection-bracket">[</span><a href="/index.php?title=Effects&amp;action=edit&amp;section=23" title="Edit section: From combat side scope">edit</a><span class="mw-editsection-bracket">]</span></span></h3>
<p>The following effects are only usable in the combat side scope.
</p>
<table class="wikitable sortable" width="100%">
<tbody><tr>
<th width="15%">Name
</th>
<th width="15%">Description
</th>
<th width="25%">Usage
</th>
<th width="20%">Supported scopes
</th>
<th width="20%">Supported targets
</th></tr>
<tr>
<td>battle_event
</td>
<td>Makes a battle event show up in combat, and the combat result summary. The key is used for loc, with '_friendly' or '_enemy' appended. If this side is not the player's side, the two portraits get flipped
</td>
<td>battle_event = { left_portrait = someone right_portrait = someone key = string }
</td>
<td>combat side
</td>
<td>
</td></tr>
<tr>
<td>every_side_commander
</td>
<td>Iterate through all commanders (the commanders of every army on the side, not just the one leading the battle)
</td>
<td>every_side_commander = { limit = { &lt;triggers&gt; } &lt;effects&gt; }
</td>
<td>combat side
</td>
<td>character
</td></tr>
<tr>
<td>every_side_knight
</td>
<td>Iterate through all knights
</td>
<td>every_side_knight = { limit = { &lt;triggers&gt; } &lt;effects&gt; }
</td>
<td>combat side
</td>
<td>character
</td></tr>
<tr>
<td>lose_combat
</td>
<td>ends the combat as the losing side (doesn't end the combat if evaluated to false)
</td>
<td>Unspecified
</td>
<td>combat side
</td>
<td>
</td></tr>
<tr>
<td>ordered_side_commander
</td>
<td>Iterate through all commanders (the commanders of every army on the side, not just the one leading the battle)
</td>
<td>ordered_side_commander = {
<p>limit = { &lt;triggers&gt; }
order_by = script_value
position = int
min = int
max = script_value
check_range_bounds = no # If you don't want an error logged if the list is smaller than the min/max
&lt;effects&gt; }
</p>
</td>
<td>combat side
</td>
<td>character
</td></tr>
<tr>
<td>ordered_side_knight
</td>
<td>Iterate through all knights
</td>
<td>ordered_side_knight = {
<p>limit = { &lt;triggers&gt; }
order_by = script_value
position = int
min = int
max = script_value
check_range_bounds = no # If you don't want an error logged if the list is smaller than the min/max
&lt;effects&gt; }
</p>
</td>
<td>combat side
</td>
<td>character
</td></tr>
<tr>
<td>random_side_commander
</td>
<td>Iterate through all commanders (the commanders of every army on the side, not just the one leading the battle)
</td>
<td>random_side_commander = { limit = { &lt;triggers&gt; } (optional) weight = { mtth } &lt;effects&gt; }
</td>
<td>combat side
</td>
<td>character
</td></tr>
<tr>
<td>random_side_knight
</td>
<td>Iterate through all knights
</td>
<td>random_side_knight = { limit = { &lt;triggers&gt; } (optional) weight = { mtth } &lt;effects&gt; }
</td>
<td>combat side
</td>
<td>character
</td></tr>
<tr>
<td>win_combat
</td>
<td>ends the combat as the winning side (doesn't end the combat if evaluated to false)
</td>
<td>Unspecified
</td>
<td>combat side
</td>
<td>
</td></tr></tbody></table>
<h3><span class="mw-headline" id="From_casus_belli_scope">From casus belli scope</span><span class="mw-editsection"><span class="mw-editsection-bracket">[</span><a href="/index.php?title=Effects&amp;action=edit&amp;section=24" title="Edit section: From casus belli scope">edit</a><span class="mw-editsection-bracket">]</span></span></h3>
<p>The following effects are only usable in the casus belli scope.
</p>
<table class="wikitable sortable" width="100%">
<tbody><tr>
<th width="15%">Name
</th>
<th width="15%">Description
</th>
<th width="25%">Usage
</th>
<th width="20%">Supported scopes
</th>
<th width="20%">Supported targets
</th></tr>
<tr>
<td>add_from_contribution_attackers
</td>
<td>Adds prestige, gold and piety based on contribution to allied attackers. parameters: prestige, gold, piety.
</td>
<td>Unspecified
</td>
<td>casus belli
</td>
<td>
</td></tr>
<tr>
<td>add_from_contribution_defenders
</td>
<td>Adds prestige, gold and piety based on contribution to allied defenders. parameters: prestige, gold, piety.
</td>
<td>Unspecified
</td>
<td>casus belli
</td>
<td>
</td></tr>
<tr>
<td>every_target_title
</td>
<td>Iterate through all casus belli's target titles
</td>
<td>every_target_title = { limit = { &lt;triggers&gt; } &lt;effects&gt; }
</td>
<td>casus belli
</td>
<td>landed title
</td></tr>
<tr>
<td>ordered_target_title
</td>
<td>Iterate through all casus belli's target titles
</td>
<td>ordered_target_title = {
<p>limit = { &lt;triggers&gt; }
order_by = script_value
position = int
min = int
max = script_value
check_range_bounds = no # If you don't want an error logged if the list is smaller than the min/max
&lt;effects&gt; }
</p>
</td>
<td>casus belli
</td>
<td>landed title
</td></tr>
<tr>
<td>random_target_title
</td>
<td>Iterate through all casus belli's target titles
</td>
<td>random_target_title = { limit = { &lt;triggers&gt; } (optional) weight = { mtth } &lt;effects&gt; }
</td>
<td>casus belli
</td>
<td>landed title
</td></tr></tbody></table>
<h3><span id="Shared/other"></span><span class="mw-headline" id="Shared.2Fother">Shared/other</span><span class="mw-editsection"><span class="mw-editsection-bracket">[</span><a href="/index.php?title=Effects&amp;action=edit&amp;section=25" title="Edit section: Shared/other">edit</a><span class="mw-editsection-bracket">]</span></span></h3>
<table class="wikitable sortable" width="100%">
<tbody><tr>
<th width="15%">Name
</th>
<th width="15%">Description
</th>
<th width="25%">Usage
</th>
<th width="20%">Supported scopes
</th>
<th width="20%">Supported targets
</th></tr>
<tr>
<td>add_relation_flag
</td>
<td>Adds a flag to an existing relation
</td>
<td><pre>add_relation_flag = {
  relation = scripted_relation
  flag = flag_name (declared in the relation's script)
  target = other_character
}
</pre>
</td>
<td>
</td>
<td>character
</td></tr>
<tr>
<td>set_add_claim_on_loss
</td>
<td>if set, any title losses will result in claims being added to the previous holder
</td>
<td>Unspecified
</td>
<td>title and vassal change
</td>
<td>
</td></tr>
<tr>
<td>set_title_and_vassal_change_type
</td>
<td>Sets the type of change. Valid types: conquest, conquest_holy_war, conquest_claim, conquest_populist, inheritance, abdication, destroyed, created, usurped, granted, revoked, election, independency, returned, leased_out, lease_revoked, faction_demand,
</td>
<td>set_title_and_vassal_change_type = [type]
</td>
<td>title and vassal change
</td>
<td>
</td></tr>
<tr>
<td>generate_coa
</td>
<td>Generates a coat of arms for the scoped landed title, dynasty or house
</td>
<td>generate_coa = yes
</td>
<td>landed title, dynasty, dynasty house
</td>
<td>
</td></tr>
<tr>
<td>reset_coa
</td>
<td>Rest the coat of arms for the scoped landed title, dynasty or house to its template
</td>
<td>reset_coa = yes
</td>
<td>landed title, dynasty, dynasty house
</td>
<td>
</td></tr>
<tr>
<td>set_coa
</td>
<td>Sets the coat of arms of a landed title, dynasty, or house to the right hand side coat of arms or that of an object of the same type
</td>
<td>set_coa = k_england
<p>set_coa = scope:new_coa
</p>
</td>
<td>landed title, dynasty, dynasty house
</td>
<td>
</td></tr>
<tr>
<td>add_diplomacy_skill
</td>
<td>Adds diplomacy skill
</td>
<td>Unspecified
</td>
<td>none
</td>
<td>
</td></tr>
<tr>
<td>add_focus_progress
</td>
<td>Adds focus progress
</td>
<td>Unspecified
</td>
<td>none
</td>
<td>
</td></tr>
<tr>
<td>add_internal_flag
</td>
<td>adds effect to be read internally (no effect in the gamestate)
</td>
<td>Unspecified
</td>
<td>none
</td>
<td>
</td></tr>
<tr>
<td>add_intrigue_skill
</td>
<td>Adds intrigue skill
</td>
<td>Unspecified
</td>
<td>none
</td>
<td>
</td></tr>
<tr>
<td>add_learning_skill
</td>
<td>Adds learning skill
</td>
<td>Unspecified
</td>
<td>none
</td>
<td>
</td></tr>
<tr>
<td>add_martial_skill
</td>
<td>Adds martial skill
</td>
<td>Unspecified
</td>
<td>none
</td>
<td>
</td></tr>
<tr>
<td>add_prowess_skill
</td>
<td>Adds prowess skill
</td>
<td>Unspecified
</td>
<td>none
</td>
<td>
</td></tr>
<tr>
<td>add_stewardship_skill
</td>
<td>Adds stewardship skill
</td>
<td>Unspecified
</td>
<td>none
</td>
<td>
</td></tr>
<tr>
<td>add_title_law
</td>
<td>add law to scoped title, overriding any current law from the same group. DOES NOT apply law change costs and effects.
</td>
<td>add_title_law = princely_elective_succession_law
</td>
<td>none
</td>
<td>
</td></tr>
<tr>
<td>add_title_law_effects
</td>
<td>Add law to scoped title, overriding any current law from the same group. DOES apply law change costs and effects.
</td>
<td>Unspecified
</td>
<td>none
</td>
<td>
</td></tr>
<tr>
<td>add_to_global_variable_list
</td>
<td>Adds the event target to a variable list. X is the name of the variable. Y is an event target.
</td>
<td>add_to_variable_list = { name = X target = Y }
</td>
<td>none
</td>
<td>
</td></tr>
<tr>
<td>add_to_list
</td>
<td>Adds the current scope to an arbitrarily-named list (or creates the list if not already present) to be referenced later in the (unbroken) event chain
</td>
<td>add_to_list = &lt;string&gt; NOTE, if adding a permanent target to a temporary list, the whole list becomes permanent
</td>
<td>none
</td>
<td>
</td></tr>
<tr>
<td>add_to_local_variable_list
</td>
<td>Adds the event target to a variable list. X is the name of the variable. Y is an event target.
</td>
<td>add_to_variable_list = { name = X target = Y }
</td>
<td>none
</td>
<td>
</td></tr>
<tr>
<td>add_to_temporary_list
</td>
<td>Adds the current scope to an arbitrarily-named list (or creates the list if not already present) to be referenced later in the same effect
</td>
<td>add_to_temporary_list = &lt;string&gt; NOTE, if adding a temporary target to a permanent list, the list will stay permanent
</td>
<td>none
</td>
<td>
</td></tr>
<tr>
<td>add_to_variable_list
</td>
<td>Adds the event target to a variable list. X is the name of the variable. Y is an event target.
</td>
<td>add_to_variable_list = { name = X target = Y }
</td>
<td>none
</td>
<td>
</td></tr>
<tr>
<td>assert_if
</td>
<td>Conditionally cause an assert during run time, X is a trigger and Y is an optional string
</td>
<td>assert_if = { limit = { X } text = Y }
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
<td>assert_read = X, X is yes or the string to be printed in the assert
</td>
<td>none
</td>
<td>
</td></tr>
<tr>
<td>break_betrothal
</td>
<td>Breaks the betrothal between the scope character to the target character
</td>
<td>break_betrothal = target
</td>
<td>none
</td>
<td>character
</td></tr>
<tr>
<td>break_if
</td>
<td>conditionally break execution of effects, break_if = { X }, X is a trigger
</td>
<td>Unspecified
</td>
<td>none
</td>
<td>
</td></tr>
<tr>
<td>change_global_variable
</td>
<td>Changes the value or a numeric variable
<p>Where X is the name of the numeric variable to modify
Where the valid operations are add, subtract, multiply, divide and modulo
Y is a fixed point value, script value or event target of a value type
</p>
</td>
<td>change_variable = { name = X operation = Y }
</td>
<td>none
</td>
<td>
</td></tr>
<tr>
<td>change_local_variable
</td>
<td>Changes the value or a numeric variable
<p>Where X is the name of the numeric variable to modify
Where the valid operations are add, subtract, multiply, divide and modulo
Y is a fixed point value, script value or event target of a value type
</p>
</td>
<td>change_variable = { name = X operation = Y }
</td>
<td>none
</td>
<td>
</td></tr>
<tr>
<td>change_title_holder
</td>
<td>Changes Title Holder.
<p>holder = 'Character that should get the title'
change = 'previously created title_and_vassal_change', adds a title change, will not transfer vassalstake_baronies = yes # Optional; if set, will cause baronies to be taken (rather than vassalized) as well if this title is a countygovernment_base = character # Optional, if the character getting the title was unlanded, their new government will be based on the government of government_base. If no government_base is specified, the government will be based on holder's government.
</p>
</td>
<td>change_title_holder = {
<p>	holder =
	change =
}
</p>
</td>
<td>none
</td>
<td>
</td></tr>
<tr>
<td>change_title_holder_include_vassals
</td>
<td>Changes Title Holder.
<p>holder = 'Character that should get the title'
change = 'previously created title_and_vassal_change', adds a title change, will transfer vassalstake_baronies = yes # Optional; if set, will cause baronies to be taken (rather than vassalized) as well if this title is a countygovernment_base = character # Optional, if the character getting the title was unlanded, their new government will be based on the government of government_base. If no government_base is specified, the government will be based on holder's government.
</p>
</td>
<td>change_title_holder_include_vassals = {
<p>	holder =
	change =
}
</p>
</td>
<td>none
</td>
<td>
</td></tr>
<tr>
<td>change_trait_rank
</td>
<td>Changes the trait rank = { trait = trait_group rank = change max = maximum new rank }
</td>
<td>Unspecified
</td>
<td>none
</td>
<td>
</td></tr>
<tr>
<td>change_variable
</td>
<td>Changes the value or a numeric variable
<p>Where X is the name of the numeric variable to modify
Where the valid operations are add, subtract, multiply, divide and modulo
Y is a fixed point value, script value or event target of a value type
</p>
</td>
<td>change_variable = { name = X operation = Y }
</td>
<td>none
</td>
<td>
</td></tr>
<tr>
<td>clamp_global_variable
</td>
<td>Clamps a variable the specified max and min
<p>Where X is the name of the variable
Where Y and Z are script values
</p>
</td>
<td>clamp_variable = { name = X max = Y min = Z }
</td>
<td>none
</td>
<td>
</td></tr>
<tr>
<td>clamp_local_variable
</td>
<td>Clamps a variable the specified max and min
<p>Where X is the name of the variable
Where Y and Z are script values
</p>
</td>
<td>clamp_variable = { name = X max = Y min = Z }
</td>
<td>none
</td>
<td>
</td></tr>
<tr>
<td>clamp_variable
</td>
<td>Clamps a variable the specified max and min
<p>Where X is the name of the variable
Where Y and Z are script values
</p>
</td>
<td>clamp_variable = { name = X max = Y min = Z }
</td>
<td>none
</td>
<td>
</td></tr>
<tr>
<td>clear_global_variable_list
</td>
<td>Empties the list
</td>
<td>clear_global_variable_list = variable_name
</td>
<td>none
</td>
<td>
</td></tr>
<tr>
<td>clear_local_variable_list
</td>
<td>Empties the list
</td>
<td>clear_local_variable_list = variable_name
</td>
<td>none
</td>
<td>
</td></tr>
<tr>
<td>clear_saved_scope
</td>
<td>Clears a saved scope from the top scope
</td>
<td>clear_saved_scope = cool_scope
</td>
<td>none
</td>
<td>
</td></tr>
<tr>
<td>clear_variable_list
</td>
<td>Empties the list
</td>
<td>clear_variable_list = variable_name
</td>
<td>none
</td>
<td>
</td></tr>
<tr>
<td>close_all_views
</td>
<td>Closes all views
</td>
<td>close_all_views = yes
</td>
<td>none
</td>
<td>
</td></tr>
<tr>
<td>close_view
</td>
<td>Tries to close the defined view. Take care to set player if effect is executed not through UI but through synchronized code. Else all the window will open for all players.
</td>
<td>close_view = {
<pre>   view = &lt;view name&gt;
   player = scope:character # optional, else closes for all players who execute the effect
</pre>
<p>}
close_view = &lt;view name&gt;
</p>
</td>
<td>none
</td>
<td>
</td></tr>
<tr>
<td>complete_activity
</td>
<td>completes the activity, complete_activity = yes ends the activity and runs the on_complete effect, complete_activity = no ends the activity without running the effect
</td>
<td>Unspecified
</td>
<td>none
</td>
<td>
</td></tr>
<tr>
<td>create_betrothal
</td>
<td>Betroth the scope character to the target character, create_betrothal = target (at least one of the characters need to not be adult)
</td>
<td>Unspecified
</td>
<td>none
</td>
<td>character
</td></tr>
<tr>
<td>create_betrothal_matrilineal
</td>
<td>Betroth the scope character to the target character matrilineally, create_betrothal_matrilineal = target (at least one of the characters need to not be adult)
</td>
<td>Unspecified
</td>
<td>none
</td>
<td>character
</td></tr>
<tr>
<td>create_character
</td>
<td>Creates a character
</td>
<td>
<pre>create_character = {
	save_event_target_as = flag #save the character as an event target
	save_temporary_event_target_as = flag #save the character as a temporary event target
	name = &lt;name&gt;
	age = &lt;age&gt;
	gender = male/female/character scope
	gender_female_chance = script_value #Range (0..100)
	opposite_gender = character scope
	trait = &lt;trait id&gt;#add this trait
	random_traits_list = {
		count = { 1 5 }
		traitID = { some triggers }
		traitID = { some triggers }
	} #A number of traits specified by count (1 if not specified) will be picked from the traits that have their triggers met. Scopes are the same as where create_character is used. More than one grouping like this can be defined
	random_traits = yes/no
	health = &lt;health&gt;
	fertility = &lt;fertility&gt;
	mother = &lt;character&gt;
	father = &lt;character&gt;
	real_father = &lt;character&gt; #(should only be set if the real father is not the same as father=)
	employer = &lt;character&gt; #will end up in this court, will become a pool character unless specified or father/mother is landed
	location = &lt;character&gt; #pool province; mutually exclusive with employer
	template_character =
	#faith, culture and dynasty are set from 1. template_character 2. father 3. mother 4. employer (not employer for dynasty) unless specified directly
	faith = faith tag OR a faith scope
	random_faith = { catholic = { some triggers } cathar = { some triggers } } # Random one where the triggers are met will be picked. Scopes are the same as where create_character is used
	random_faith_in_religion = religion tag OR a faith scope (there's no religion scope)
	culture = culture name OR a culture scope
	random_culture = { norse = { some triggers } norwegian = { some triggers } } #Random one where the triggers are met will be picked. Scopes are the same as where create_character is used
	random_culture_in_group = culture group name OR a culture scope (there's no group scope)
	dynasty_house = dynasty house name OR a dynasty house scope
	dynasty = generate/inherit/none - What to do if dynasty_house is not specified. generate by default.
	martial/diplomacy/intrigue...  =  will get random unless specified
	after_creation = { some effects } run after character is created. Scope starts off in the character, with the scope it was created in as PREV, and the same top scope and saved targets etc.
}
</pre>
</td>
<td>none
</td>
<td>
</td></tr>
<tr>
<td>create_dynamic_title
</td>
<td>Creates a dynamic title. The title will be saved to (scope:new_title) usage:
</td>
<td>create_dynamic_title = {
<p>	tier = &lt;tier&gt;
	name = key/dynamic description	adjective = key/dynamic description (optional; name used if not specified), use generate_coa for generate title icon }
</p>
</td>
<td>none
</td>
<td>
</td></tr>
<tr>
<td>create_holy_order
</td>
<td>Create a new holy order
</td>
<td>create_holy_order = {
<pre>   leader = scope:a_character
   capital = scope:a_barony_title
   save_scope_as/save_temporary_scope_as = new_holy_order # optional way to get a reference to the new holy order
</pre>
<p>}
</p>
</td>
<td>none
</td>
<td>
</td></tr>
<tr>
<td>create_title_and_vassal_change
</td>
<td>starts a title and vassal change and saves it as a temporary event target
</td>
<td>Unspecified
</td>
<td>none
</td>
<td>
</td></tr>
<tr>
<td>custom_description
</td>
<td>Wraps effects that get a custom description instead of the auto-generated one
</td>
<td>custom_description = {
<p>	text = &lt;effect_localization_key&gt;
	subject = &lt;optional subject scope&gt; #defaults to current scope
	object = &lt;optional object scope&gt;
	value = &lt;optional script value&gt;
	... effects ...
}
</p>
</td>
<td>none
</td>
<td>
</td></tr>
<tr>
<td>custom_description_no_bullet
</td>
<td>Wraps effects that get a custom description instead of the auto-generated one. Also ensures no bullet point appears
</td>
<td>custom_description_no_bullet = {
<p>	text = &lt;effect_localization_key&gt;
	subject = &lt;optional subject scope&gt; #defaults to current scope
	object = &lt;optional object scope&gt;
	value = &lt;optional script value&gt;
	... effects ...
}
</p>
</td>
<td>none
</td>
<td>
</td></tr>
<tr>
<td>custom_label
</td>
<td>just a tooltip, the scope as object (for grouping, localization)
</td>
<td>Unspecified
</td>
<td>none
</td>
<td>
</td></tr>
<tr>
<td>custom_tooltip
</td>
<td>just a tooltip, the scope as subject (for grouping, localization)
</td>
<td>Unspecified
</td>
<td>none
</td>
<td>
</td></tr>
<tr>
<td>debug_log
</td>
<td>Log a string to the debug log when this effect executes, debug_log = message, the message can be a localization string with ROOT, SCOPE and PREV available
</td>
<td>Unspecified
</td>
<td>none
</td>
<td>
</td></tr>
<tr>
<td>debug_log_date
</td>
<td>Logs the current date to the debug.log
</td>
<td>Unspecified
</td>
<td>none
</td>
<td>
</td></tr>
<tr>
<td>debug_log_scopes
</td>
<td>Log the current scope to the debug log when this effect executes yes = full scope info, no=only current scope
</td>
<td>Unspecified
</td>
<td>none
</td>
<td>
</td></tr>
<tr>
<td>divorce
</td>
<td>Divorces the scope character from the target character.
</td>
<td>divorce = target
</td>
<td>none
</td>
<td>character
</td></tr>
<tr>
<td>duel
</td>
<td>duel effect that selects an effect based on comparing specified skill of a character to a value or another character's skill. Alternatively, the compare value can be scripted completely
<p>Where X is the skill to compare, Y is the target character (requires skill to be set) or integer value Z (works with or without the skill), the rest of the effect is the same as random_list
If the skill is unspecified, the effect needs a value Z (which can use scripted math) which it will then use as the duel vlue directly
If localization = W is specified, the effect localization W will be used (entry in effect_localization database, not a localization key directly)
The skill difference (or scripted duel value) is available as scope:duel_value inside the outcome entries, the duel target is accessible as scope:duel_target
Valid skill, target, combinations: skill + target, skill + value, only value
Since there is now no automatic weighting, we should be using weight numbers in a comparable range to the scope:duel_value value. Since that will always be between -20 and 20 (unless you do something very unusual), and typically in a more narrow range than that, we should stick to those ranges.
Only use larger weights if you want the duel_value to have a smaller impact on the weighting, and only use smaller weights if you want the duel_value to have a huge impact on the weighting.
In addition, it is fully possible for the compare_modifier to reduce the weight to 0, which would mean that it will not be possible to happen at all. I've requested code support to make it so that we can define min and max values for weights, but until further notice we should use ranges that are guaranteed to not hit 0, or include min values in the compare_modifier itself.
Lastly, remember that if you want the outcome of a duel to scale linearly from (almost) 0% to (almost) 100%, the duel_value should be applied 50% to the good outcome, and -50% to the bad outcome. If you only apply it on one side, you will retain a (presumably significant) chunk of chance for the other outcome.
</p>
</td>
<td>duel = {
<pre>   skill = X
   target = Y
   value = Z
   localization = W
   ... random list body
</pre>
<p>}
</p>
</td>
<td>none
</td>
<td>
</td></tr>
<tr>
<td>every_barony
</td>
<td>Iterate through all baronies in the game
</td>
<td>every_barony = { limit = { &lt;triggers&gt; } &lt;effects&gt; }
</td>
<td>none
</td>
<td>landed title
</td></tr>
<tr>
<td>every_county
</td>
<td>Iterate through all counties in the game
</td>
<td>every_county = { limit = { &lt;triggers&gt; } &lt;effects&gt; }
</td>
<td>none
</td>
<td>landed title
</td></tr>
<tr>
<td>every_county_in_region
</td>
<td>Iterate through all counties in the region. Put 'region = region_name' inside it
</td>
<td>every_county_in_region = { limit = { &lt;triggers&gt; } &lt;effects&gt; }
</td>
<td>none
</td>
<td>landed title
</td></tr>
<tr>
<td>every_duchy
</td>
<td>Iterate through all duchies in the game
</td>
<td>every_duchy = { limit = { &lt;triggers&gt; } &lt;effects&gt; }
</td>
<td>none
</td>
<td>landed title
</td></tr>
<tr>
<td>every_empire
</td>
<td>Iterate through all empires in the game
</td>
<td>every_empire = { limit = { &lt;triggers&gt; } &lt;effects&gt; }
</td>
<td>none
</td>
<td>landed title
</td></tr>
<tr>
<td>every_in_global_list
</td>
<td>Iterate through all items in global list. list = name or variable = name
</td>
<td>every_in_global_list = { limit = { &lt;triggers&gt; } &lt;effects&gt; }
</td>
<td>none
</td>
<td>
</td></tr>
<tr>
<td>every_in_list
</td>
<td>Iterate through all items in list. list = name or variable = name
</td>
<td>every_in_list = { limit = { &lt;triggers&gt; } &lt;effects&gt; }
</td>
<td>none
</td>
<td>
</td></tr>
<tr>
<td>every_in_local_list
</td>
<td>Iterate through all items in local list. list = name or variable = name
</td>
<td>every_in_local_list = { limit = { &lt;triggers&gt; } &lt;effects&gt; }
</td>
<td>none
</td>
<td>
</td></tr>
<tr>
<td>every_independent_ruler
</td>
<td>Independent rulers list with a COUNT tier o above
</td>
<td>every_independent_ruler = { limit = { &lt;triggers&gt; } &lt;effects&gt; }
</td>
<td>none
</td>
<td>character
</td></tr>
<tr>
<td>every_kingdom
</td>
<td>Iterate through all kingdoms in the game
</td>
<td>every_kingdom = { limit = { &lt;triggers&gt; } &lt;effects&gt; }
</td>
<td>none
</td>
<td>landed title
</td></tr>
<tr>
<td>every_living_character
</td>
<td>Iterate through all living characters
</td>
<td>every_living_character = { limit = { &lt;triggers&gt; } &lt;effects&gt; }
</td>
<td>none
</td>
<td>character
</td></tr>
<tr>
<td>every_player
</td>
<td>Iterate through all player characters
</td>
<td>every_player = { limit = { &lt;triggers&gt; } &lt;effects&gt; }
</td>
<td>none
</td>
<td>character
</td></tr>
<tr>
<td>every_pool_character
</td>
<td>Iterate through all characters in the pool of the given province
</td>
<td>every_pool_character = { limit = { &lt;triggers&gt; } &lt;effects&gt; }
</td>
<td>none
</td>
<td>character
</td></tr>
<tr>
<td>every_province
</td>
<td>Iterate through all provinces (skips non-land and impassable provinces)
</td>
<td>every_province = { limit = { &lt;triggers&gt; } &lt;effects&gt; }
</td>
<td>none
</td>
<td>province
</td></tr>
<tr>
<td>every_religion_global
</td>
<td>Iterate through all religions in the game
</td>
<td>every_religion_global = { limit = { &lt;triggers&gt; } &lt;effects&gt; }
</td>
<td>none
</td>
<td>religion
</td></tr>
<tr>
<td>every_ruler
</td>
<td>Rulers list with a COUNT tier o above
</td>
<td>every_ruler = { limit = { &lt;triggers&gt; } &lt;effects&gt; }
</td>
<td>none
</td>
<td>character
</td></tr>
<tr>
<td>hidden_effect
</td>
<td>Effect not shown in tooltips
</td>
<td>Unspecified
</td>
<td>none
</td>
<td>
</td></tr>
<tr>
<td>multiply_focus_progress
</td>
<td>Multiplies focus progress
</td>
<td>Unspecified
</td>
<td>none
</td>
<td>
</td></tr>
<tr>
<td>open_interaction_window
</td>
<td>Tries to open the defined view.
</td>
<td>open_interaction_window = {
<p>interaction = interaction_key - the interaction object key to open
redirect = [yes|no] - yes by default, redirect the actor and recipients ( only works if secondary_actor and secondary_recipient are not setup or are invalid)
actor = character_actor - must be defined, must coincide with the current player
recipient = character_actor - must be defined
secondary_actor = character_secontary_actor - optional
secondary_recipient = character_secondary_recipient - optional
</p>
</td>
<td>none
</td>
<td>
</td></tr>
<tr>
<td>open_view
</td>
<td>Tries to open the defined view without scope data.
<p>Take care to set player if effect is executed not through UI but through synchronized code. Else all the window will open for all players.
</p>
</td>
<td>
<pre>open_view = {
    view = &lt;view name&gt;
    view_message = &lt;view specific instruction&gt; # optional
    player = scope:character # optional, else shows for all players who execute the effect
}
</pre>
<p>simplified: open_view = &lt;view name&gt;
</p>
</td>
<td>none
</td>
<td>
</td></tr>
<tr>
<td>open_view_data
</td>
<td>Tries to open the defined view with scope data.
<p>Take care to set player if effect is executed not through UI but through synchronized code. Else all the window will open for all players.
</p>
</td>
<td>
<pre>open_view_data = {
    view = &lt;view name&gt;
    view_message = &lt;view specific instruction&gt; # optional
    player = scope:character # optional, else shows for all players who execute the effect
}
</pre>
<p>open_view_data = &lt;view name&gt;
for example: scope:faith = { open_view_data = faith_conversion }
</p>
</td>
<td>none
</td>
<td>
</td></tr>
<tr>
<td>ordered_barony
</td>
<td>Iterate through all baronies in the game
</td>
<td>ordered_barony = {
<p>limit = { &lt;triggers&gt; }
order_by = script_value
position = int
min = int
max = script_value
check_range_bounds = no # If you don't want an error logged if the list is smaller than the min/max
&lt;effects&gt; }
</p>
</td>
<td>none
</td>
<td>landed title
</td></tr>
<tr>
<td>ordered_county
</td>
<td>Iterate through all counties in the game
</td>
<td>ordered_county = {
<p>limit = { &lt;triggers&gt; }
order_by = script_value
position = int
min = int
max = script_value
check_range_bounds = no # If you don't want an error logged if the list is smaller than the min/max
&lt;effects&gt; }
</p>
</td>
<td>none
</td>
<td>landed title
</td></tr>
<tr>
<td>ordered_county_in_region
</td>
<td>Iterate through all counties in the region. Put 'region = region_name' inside it
</td>
<td>ordered_county_in_region = {
<p>limit = { &lt;triggers&gt; }
order_by = script_value
position = int
min = int
max = script_value
check_range_bounds = no # If you don't want an error logged if the list is smaller than the min/max
&lt;effects&gt; }
</p>
</td>
<td>none
</td>
<td>landed title
</td></tr>
<tr>
<td>ordered_duchy
</td>
<td>Iterate through all duchies in the game
</td>
<td>ordered_duchy = {
<p>limit = { &lt;triggers&gt; }
order_by = script_value
position = int
min = int
max = script_value
check_range_bounds = no # If you don't want an error logged if the list is smaller than the min/max
&lt;effects&gt; }
</p>
</td>
<td>none
</td>
<td>landed title
</td></tr>
<tr>
<td>ordered_empire
</td>
<td>Iterate through all empires in the game
</td>
<td>ordered_empire = {
<p>limit = { &lt;triggers&gt; }
order_by = script_value
position = int
min = int
max = script_value
check_range_bounds = no # If you don't want an error logged if the list is smaller than the min/max
&lt;effects&gt; }
</p>
</td>
<td>none
</td>
<td>landed title
</td></tr>
<tr>
<td>ordered_in_global_list
</td>
<td>Iterate through all items in global list. list = name or variable = name
</td>
<td>ordered_in_global_list = {
<p>limit = { &lt;triggers&gt; }
order_by = script_value
position = int
min = int
max = script_value
check_range_bounds = no # If you don't want an error logged if the list is smaller than the min/max
&lt;effects&gt; }
</p>
</td>
<td>none
</td>
<td>
</td></tr>
<tr>
<td>ordered_in_list
</td>
<td>Iterate through all items in list. list = name or variable = name
</td>
<td>ordered_in_list = {
<p>limit = { &lt;triggers&gt; }
order_by = script_value
position = int
min = int
max = script_value
check_range_bounds = no # If you don't want an error logged if the list is smaller than the min/max
&lt;effects&gt; }
</p>
</td>
<td>none
</td>
<td>
</td></tr>
<tr>
<td>ordered_in_local_list
</td>
<td>Iterate through all items in local list. list = name or variable = name
</td>
<td>ordered_in_local_list = {
<p>limit = { &lt;triggers&gt; }
order_by = script_value
position = int
min = int
max = script_value
check_range_bounds = no # If you don't want an error logged if the list is smaller than the min/max
&lt;effects&gt; }
</p>
</td>
<td>none
</td>
<td>
</td></tr>
<tr>
<td>ordered_independent_ruler
</td>
<td>Independent rulers list with a COUNT tier o above
</td>
<td>ordered_independent_ruler = {
<p>limit = { &lt;triggers&gt; }
order_by = script_value
position = int
min = int
max = script_value
check_range_bounds = no # If you don't want an error logged if the list is smaller than the min/max
&lt;effects&gt; }
</p>
</td>
<td>none
</td>
<td>character
</td></tr>
<tr>
<td>ordered_kingdom
</td>
<td>Iterate through all kingdoms in the game
</td>
<td>ordered_kingdom = {
<p>limit = { &lt;triggers&gt; }
order_by = script_value
position = int
min = int
max = script_value
check_range_bounds = no # If you don't want an error logged if the list is smaller than the min/max
&lt;effects&gt; }
</p>
</td>
<td>none
</td>
<td>landed title
</td></tr>
<tr>
<td>ordered_living_character
</td>
<td>Iterate through all living characters
</td>
<td>ordered_living_character = {
<p>limit = { &lt;triggers&gt; }
order_by = script_value
position = int
min = int
max = script_value
check_range_bounds = no # If you don't want an error logged if the list is smaller than the min/max
&lt;effects&gt; }
</p>
</td>
<td>none
</td>
<td>character
</td></tr>
<tr>
<td>ordered_player
</td>
<td>Iterate through all player characters
</td>
<td>ordered_player = {
<p>limit = { &lt;triggers&gt; }
order_by = script_value
position = int
min = int
max = script_value
check_range_bounds = no # If you don't want an error logged if the list is smaller than the min/max
&lt;effects&gt; }
</p>
</td>
<td>none
</td>
<td>character
</td></tr>
<tr>
<td>ordered_pool_character
</td>
<td>Iterate through all characters in the pool of the given province
</td>
<td>ordered_pool_character = {
<p>limit = { &lt;triggers&gt; }
order_by = script_value
position = int
min = int
max = script_value
check_range_bounds = no # If you don't want an error logged if the list is smaller than the min/max
&lt;effects&gt; }
</p>
</td>
<td>none
</td>
<td>character
</td></tr>
<tr>
<td>ordered_province
</td>
<td>Iterate through all provinces (skips non-land and impassable provinces)
</td>
<td>ordered_province = {
<p>limit = { &lt;triggers&gt; }
order_by = script_value
position = int
min = int
max = script_value
check_range_bounds = no # If you don't want an error logged if the list is smaller than the min/max
&lt;effects&gt; }
</p>
</td>
<td>none
</td>
<td>province
</td></tr>
<tr>
<td>ordered_religion_global
</td>
<td>Iterate through all religions in the game
</td>
<td>ordered_religion_global = {
<p>limit = { &lt;triggers&gt; }
order_by = script_value
position = int
min = int
max = script_value
check_range_bounds = no # If you don't want an error logged if the list is smaller than the min/max
&lt;effects&gt; }
</p>
</td>
<td>none
</td>
<td>religion
</td></tr>
<tr>
<td>ordered_ruler
</td>
<td>Rulers list with a COUNT tier o above
</td>
<td>ordered_ruler = {
<p>limit = { &lt;triggers&gt; }
order_by = script_value
position = int
min = int
max = script_value
check_range_bounds = no # If you don't want an error logged if the list is smaller than the min/max
&lt;effects&gt; }
</p>
</td>
<td>none
</td>
<td>character
</td></tr>
<tr>
<td>pan_camera_to_province
</td>
<td>Pans the camera to the specified province
</td>
<td>pan_camera_to_province = scope:army.location
</td>
<td>none
</td>
<td>province
</td></tr>
<tr>
<td>pan_camera_to_title
</td>
<td>Pans the camera to the specified title
</td>
<td>pan_camera_to_title = capital_barony
</td>
<td>none
</td>
<td>landed title
</td></tr>
<tr>
<td>random
</td>
<td>A random effect. X is a chance of the enclosed effects being fired and can be modified by optional value modifier list (AKA MTTH) Y
</td>
<td>random = { chance = X modifier = Y effects... }
</td>
<td>none
</td>
<td>
</td></tr>
<tr>
<td>random_barony
</td>
<td>Iterate through all baronies in the game
</td>
<td>random_barony = { limit = { &lt;triggers&gt; } (optional) weight = { mtth } &lt;effects&gt; }
</td>
<td>none
</td>
<td>landed title
</td></tr>
<tr>
<td>random_county
</td>
<td>Iterate through all counties in the game
</td>
<td>random_county = { limit = { &lt;triggers&gt; } (optional) weight = { mtth } &lt;effects&gt; }
</td>
<td>none
</td>
<td>landed title
</td></tr>
<tr>
<td>random_county_in_region
</td>
<td>Iterate through all counties in the region. Put 'region = region_name' inside it
</td>
<td>random_county_in_region = { limit = { &lt;triggers&gt; } (optional) weight = { mtth } &lt;effects&gt; }
</td>
<td>none
</td>
<td>landed title
</td></tr>
<tr>
<td>random_duchy
</td>
<td>Iterate through all duchies in the game
</td>
<td>random_duchy = { limit = { &lt;triggers&gt; } (optional) weight = { mtth } &lt;effects&gt; }
</td>
<td>none
</td>
<td>landed title
</td></tr>
<tr>
<td>random_empire
</td>
<td>Iterate through all empires in the game
</td>
<td>random_empire = { limit = { &lt;triggers&gt; } (optional) weight = { mtth } &lt;effects&gt; }
</td>
<td>none
</td>
<td>landed title
</td></tr>
<tr>
<td>random_in_global_list
</td>
<td>Iterate through all items in global list. list = name or variable = name
</td>
<td>random_in_global_list = { limit = { &lt;triggers&gt; } (optional) weight = { mtth } &lt;effects&gt; }
</td>
<td>none
</td>
<td>
</td></tr>
<tr>
<td>random_in_list
</td>
<td>Iterate through all items in list. list = name or variable = name
</td>
<td>random_in_list = { limit = { &lt;triggers&gt; } (optional) weight = { mtth } &lt;effects&gt; }
</td>
<td>none
</td>
<td>
</td></tr>
<tr>
<td>random_in_local_list
</td>
<td>Iterate through all items in local list. list = name or variable = name
</td>
<td>random_in_local_list = { limit = { &lt;triggers&gt; } (optional) weight = { mtth } &lt;effects&gt; }
</td>
<td>none
</td>
<td>
</td></tr>
<tr>
<td>random_independent_ruler
</td>
<td>Independent rulers list with a COUNT tier o above
</td>
<td>random_independent_ruler = { limit = { &lt;triggers&gt; } (optional) weight = { mtth } &lt;effects&gt; }
</td>
<td>none
</td>
<td>character
</td></tr>
<tr>
<td>random_kingdom
</td>
<td>Iterate through all kingdoms in the game
</td>
<td>random_kingdom = { limit = { &lt;triggers&gt; } (optional) weight = { mtth } &lt;effects&gt; }
</td>
<td>none
</td>
<td>landed title
</td></tr>
<tr>
<td>random_list
</td>
<td>a random list effect
</td>
<td>random_list = { X1 = { trigger = { enables/disable this effect} modifier/compare_modifier/opinion_modifier = Y1 effect1 } X2 = { trigger = { enables/disable this effect} modifier/compare_modifier/opinion_modifier = Y2 effect2 } ... }
<p>Selects one effect from the list and fires it. The effects are weighted by numbers X1, X2... (the higher the number, the higher the chance of the effect being picked).
The chances can be modified by optional value modifier lists Y1, Y2... (AKA MTTH)
</p>
</td>
<td>none
</td>
<td>
</td></tr>
<tr>
<td>random_living_character
</td>
<td>Iterate through all living characters
</td>
<td>random_living_character = { limit = { &lt;triggers&gt; } (optional) weight = { mtth } &lt;effects&gt; }
</td>
<td>none
</td>
<td>character
</td></tr>
<tr>
<td>random_log_scopes
</td>
<td>Log the current scope to the random log when this effect executes. Only use temprorarily for debugging purposes as it can introduce localized strings into the random log. yes = full scope info, no=only current scope
</td>
<td>Unspecified
</td>
<td>none
</td>
<td>
</td></tr>
<tr>
<td>random_player
</td>
<td>Iterate through all player characters
</td>
<td>random_player = { limit = { &lt;triggers&gt; } (optional) weight = { mtth } &lt;effects&gt; }
</td>
<td>none
</td>
<td>character
</td></tr>
<tr>
<td>random_pool_character
</td>
<td>Iterate through all characters in the pool of the given province
</td>
<td>random_pool_character = { limit = { &lt;triggers&gt; } (optional) weight = { mtth } &lt;effects&gt; }
</td>
<td>none
</td>
<td>character
</td></tr>
<tr>
<td>random_province
</td>
<td>Iterate through all provinces (skips non-land and impassable provinces)
</td>
<td>random_province = { limit = { &lt;triggers&gt; } (optional) weight = { mtth } &lt;effects&gt; }
</td>
<td>none
</td>
<td>province
</td></tr>
<tr>
<td>random_religion_global
</td>
<td>Iterate through all religions in the game
</td>
<td>random_religion_global = { limit = { &lt;triggers&gt; } (optional) weight = { mtth } &lt;effects&gt; }
</td>
<td>none
</td>
<td>religion
</td></tr>
<tr>
<td>random_ruler
</td>
<td>Rulers list with a COUNT tier o above
</td>
<td>random_ruler = { limit = { &lt;triggers&gt; } (optional) weight = { mtth } &lt;effects&gt; }
</td>
<td>none
</td>
<td>character
</td></tr>
<tr>
<td>remove_from_list
</td>
<td>Removes the current scope from a named list remove_from_list = &lt;string&gt;
</td>
<td>Unspecified
</td>
<td>none
</td>
<td>
</td></tr>
<tr>
<td>remove_global_variable
</td>
<td>Removes a variable
</td>
<td>remove_global_variable = variable_name
</td>
<td>none
</td>
<td>
</td></tr>
<tr>
<td>remove_list_global_variable
</td>
<td>Removes the target from a variable list
<p>Where X is the name of the variable
Y is an event target
</p>
</td>
<td>remove_list_global_variable = { name = X target = Y }
</td>
<td>none
</td>
<td>
</td></tr>
<tr>
<td>remove_list_local_variable
</td>
<td>Removes the target from a variable list
<p>Where X is the name of the variable
Y is an event target
</p>
</td>
<td>remove_list_local_variable = { name = X target = Y }
</td>
<td>none
</td>
<td>
</td></tr>
<tr>
<td>remove_list_variable
</td>
<td>Removes the target from a variable list
<p>Where X is the name of the variable
Y is an event target
</p>
</td>
<td>remove_list_variable = { name = X target = Y }
</td>
<td>none
</td>
<td>
</td></tr>
<tr>
<td>remove_title_law
</td>
<td>remove law from scoped title. This will leave the law group empty, so only do this if you're getting rid of a law group. DOES NOT apply law removal costs and effects.
</td>
<td>remove_title_law = princely_elective_succession_law
</td>
<td>none
</td>
<td>
</td></tr>
<tr>
<td>remove_variable
</td>
<td>Removes a variable. Local or Global
</td>
<td>remove_variable = variable_name
</td>
<td>none
</td>
<td>
</td></tr>
<tr>
<td>resolve_title_and_vassal_change
</td>
<td>Execute and destory the target title and vassal change, the change cannot be used after calling this effect
</td>
<td>resolve_title_and_vassal_change = scope:change
</td>
<td>none
</td>
<td>title and vassal change
</td></tr>
<tr>
<td>clamp_variable
</td>
<td>Rounds a variable (global or loval) to the nearest specified value
<p>Where X is the name of the variable
Y is a script value
</p>
</td>
<td>clamp_variable = { name = X nearest = Y }
</td>
<td>none
</td>
<td>
</td></tr>
<tr>
<td>save_scope_as
</td>
<td>Saves the current scope as an arbitrarily-named target to be referenced later in the (unbroken) event chain
</td>
<td>save_event_target_as = &lt;string&gt;
</td>
<td>none
</td>
<td>
</td></tr>
<tr>
<td>save_scope_value_as
</td>
<td>Saves a numerical or bool value as an arbitrarily-named target to be referenced later in the (unbroken) event chain
</td>
<td>save_scope_value_as = { name = &lt;string&gt; value = x }
</td>
<td>none
</td>
<td>
</td></tr>
<tr>
<td>save_temporary_scope_as
</td>
<td>Saves the current scope as an arbitrarily-named temporary target to be referenced later in the same effect
</td>
<td>save_temporary_event_target_as = &lt;string&gt;
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
<td>none
</td>
<td>
</td></tr>
<tr>
<td>set_focus_progress
</td>
<td>Sets focus progress
</td>
<td>Unspecified
</td>
<td>none
</td>
<td>
</td></tr>
<tr>
<td>set_generated_asexuality_chance
</td>
<td>Sets the chance for a generated character to be asexual
</td>
<td>set_generated_asexuality_chance = 20
</td>
<td>none
</td>
<td>
</td></tr>
<tr>
<td>set_generated_bisexuality_chance
</td>
<td>Sets the chance for a generated character to be bisexual
</td>
<td>set_generated_bisexuality_chance = 20
</td>
<td>none
</td>
<td>
</td></tr>
<tr>
<td>set_generated_homosexuality_chance
</td>
<td>Sets the chance for a generated character to be homosexual
</td>
<td>set_generated_homosexuality_chance = 20
</td>
<td>none
</td>
<td>
</td></tr>
<tr>
<td>set_trait_rank
</td>
<td>Sets the trait rank = { trait = trait_group rank = new rank }
</td>
<td>Unspecified
</td>
<td>none
</td>
<td>
</td></tr>
<tr>
<td>set_variable
</td>
<td>Sets a variable. Either global or local.
<p>Where X is the name of the variable used to then access it
Y is any event target, bool, value, script value or flag (flag:W)
An optional days where Z is the number of days or script value
This variable will be accessible with &lt;type_&gt;var:X. With type being in a scope object or in a top scope
</p>
</td>
<td>set_variable = { name = X value = Y days = Z }
</td>
<td>none
</td>
<td>
</td></tr>
<tr>
<td>setup_claim_cb
</td>
<td>this effect will add a scope:cb_prestige_factor with a value based on what's being taken civil_war = yes # Will vassalize people based on their capital location rather than being fully contained. Won't steal land from people not vassalized
</td>
<td>setup_claim_cb = {
<pre>attacker = scope:attacker
defender = scope:defender
claimant = scope:claimant
change = scope:change victory = yes/no
take_occupied = yes/no
</pre>
<p>}
</p>
</td>
<td>none
</td>
<td>
</td></tr>
<tr>
<td>setup_de_jure_cb
</td>
<td>this effect will add a scope:cb_prestige_factor with a value based on what's being taken
</td>
<td>setup_de_jure_cb = {
<pre>attacker = scope:attacker
defender = scope:defender
change = scope:change
victory = yes/no
title = some title - Optional; will make it target a specific dejure title rather than *everything* that is dejure the attacker's
</pre>
<p>}
</p>
</td>
<td>none
</td>
<td>
</td></tr>
<tr>
<td>setup_invasion_cb
</td>
<td>this effect will add a scope:cb_prestige_factor with a value based on what's being taken
</td>
<td>setup_invasion_cb = {
<pre>attacker = scope:attacker
defender = scope:defender
change = scope:change victory = yes/no
take_occupied = yes/no
</pre>
<p>}
</p>
</td>
<td>none
</td>
<td>
</td></tr>
<tr>
<td>show_as_tooltip
</td>
<td>Effect only shown in tooltips (but not executed)
</td>
<td>Unspecified
</td>
<td>none
</td>
<td>
</td></tr>
<tr>
<td>start_tutorial_lesson
</td>
<td>Starts the tutorial lesson with the given key. Does nothing if the tutorial is not running, the lesson is completed (or already running), or the lesson cannot be triggered (e.g. trigger fails)
</td>
<td>Unspecified
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
	case_1 = { &lt;effects&gt; }
	case_2 = { &lt;effects&gt; }
	case_n = { &lt;effects&gt; }
	fallback = { &lt;effects&gt; }
</p>
</td>
<td>none
</td>
<td>
</td></tr>
<tr>
<td>trigger_event
</td>
<td>triggers an event or on_action
</td>
<td>
<p>For events:
</p>
<pre>trigger_event = {
	id = X
	days/months/years = Y
}
</pre>
<p>For on_actions:
</p>
<pre>trigger_event = {
	on_action = X
	days/months/years = Y
}
</pre>
<p>Days/months/years are optional and equal to 0 if not specified. If specified, Y can be a value or an inclusive interval "{ A B }" from which the duration will be picked randomly.
</p>
</td>
<td>none
</td>
<td>
</td></tr>
<tr>
<td>try_create_important_action
</td>
<td>Tries to create an important action notification. Will keep the current one if already exists.
</td>
<td>try_create_important_action
<p>important_action_type = important_action_type_key - the important action object key to create. Must be defined.
actor = character_actor - optional, can be used by the important action effect
recipient = character_actor - optional, can be used by the important action effect
secondary_actor = character_secontary_actor - optional, can be used by the important action effect
secondary_recipient = character_secondary_recipient - optional, can be used by the important action effect
landed_title = landed_title
optional, can be used by the important action effect
</p>
</td>
<td>Unspecified
</td>
<td>none
</td>
<td>
</td></tr>
<tr>
<td>try_create_suggestion
</td>
<td>Tries to create an suggestuib notification. Will keep the current one if already exists.
</td>
<td>try_create_suggestion
<p>suggestion_type = suggestion_type_key - the suggestion action object key to create. Must be defined.
actor = character_actor - optional, can be used by the suggestion effect
recipient = character_actor - optional, can be used by the suggestion effect
secondary_actor = character_secontary_actor - optional, can be used by the suggestion effect
secondary_recipient = character_secondary_recipient - optional, can be used by the suggestion effect
landed_title = landed_title
optional, can be used by the suggestion effect
</p>
</td>
<td>Unspecified
</td>
<td>none
</td>
<td>
</td></tr></tbody></table>
<p><br />
</p>
<div style="clear: both;"></div>
<div style="padding: 2px; border: 1px solid #aaa; text-align: center; border-collapse: collapse; font-size: 100%;">
<div style="height: 1.6em; font-weight: bold; font-size: 105%; background-color: #efefef;"><b><a href="/Modding" title="Modding">Modding</a></b></div>
<div style="font-size:0.9em;">
<table style="font-size: 11px; margin: 0px 0px -2px -2px; width: 100%;">

<tbody><tr>
<td style="width: 15%; background: #EDEDED; font-weight: bold; text-align: right; padding: 2px 5px;">Documentation
</td>
<td style="text-align: left; padding: 2px 5px;"><a class="mw-selflink selflink">Effects</a> • <a href="/Triggers" title="Triggers">Triggers</a> • <a href="/Modifier_list" title="Modifier list">Modifiers</a> • <a href="/Scopes" title="Scopes">Scopes</a> • <a href="/index.php?title=Variables&amp;action=edit&amp;redlink=1" class="new" title="Variables (page does not exist)">Variables</a> • <a href="/index.php?title=Data_types&amp;action=edit&amp;redlink=1" class="new" title="Data types (page does not exist)">Data types</a> • <a href="/Localization" title="Localization">Localization</a> • <a href="/index.php?title=Customizable_localization&amp;action=edit&amp;redlink=1" class="new" title="Customizable localization (page does not exist)">Customizable localization</a>
</td></tr></tbody></table>
<table style="font-size: 11px; margin: 0px 0px -2px -2px; width: 100%;">

<tbody><tr>
<td style="width: 15%; background: #EDEDED; font-weight: bold; text-align: right; padding: 2px 5px;">Scripting
</td>
<td style="text-align: left; padding: 2px 5px;"><a href="/index.php?title=AI_modding&amp;action=edit&amp;redlink=1" class="new" title="AI modding (page does not exist)">AI</a> • <a href="/Bookmarks_modding" title="Bookmarks modding">Bookmarks</a> • <a href="/Characters_modding" title="Characters modding">Characters</a> • <a href="/Commands" title="Commands">Commands</a> • <a href="/index.php?title=Council_modding&amp;action=edit&amp;redlink=1" class="new" title="Council modding (page does not exist)">Council</a> • <a href="/Culture_modding" title="Culture modding">Culture</a> • <a href="/Decisions_modding" title="Decisions modding">Decisions</a> • <a href="/Dynasties_modding" title="Dynasties modding">Dynasties</a> • <a href="/Event_modding" title="Event modding">Events</a> • <a href="/index.php?title=Governments_modding&amp;action=edit&amp;redlink=1" class="new" title="Governments modding (page does not exist)">Governments</a> • <a href="/History_modding" title="History modding">History</a> • <a href="/index.php?title=Holdings_modding&amp;action=edit&amp;redlink=1" class="new" title="Holdings modding (page does not exist)">Holdings</a> • <a href="/index.php?title=Lifestyles_modding&amp;action=edit&amp;redlink=1" class="new" title="Lifestyles modding (page does not exist)">Lifestyles</a> • <a href="/index.php?title=Regiments_modding&amp;action=edit&amp;redlink=1" class="new" title="Regiments modding (page does not exist)">Regiments</a> • <a href="/Religions_modding" title="Religions modding">Religions</a> • <a href="/index.php?title=Story_cycles_modding&amp;action=edit&amp;redlink=1" class="new" title="Story cycles modding (page does not exist)">Story cycles</a> • <a href="/Title_modding" title="Title modding">Titles</a> • <a href="/Trait_modding" title="Trait modding">Traits</a>
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
Cached time: 20201129021522
Cache expiry: 86400
Dynamic content: false
CPU time usage: 0.260 seconds
Real time usage: 0.280 seconds
Preprocessor visited node count: 271/1000000
Preprocessor generated node count: 706/1000000
Post‐expand include size: 9326/2097152 bytes
Template argument size: 4119/2097152 bytes
Highest expansion depth: 5/40
Expensive parser function count: 0/100
Unstrip recursion depth: 0/20
Unstrip post‐expand size: 6052/5000000 bytes
-->
<!--
Transclusion expansion time report (%,ms,calls,template)
100.00%   13.153      1 -total
 70.17%    9.230      1 Template:Modding_navbox
 54.54%    7.174      1 Template:Navbox
 21.11%    2.776      1 Template:Version
 18.35%    2.414      6 Template:Navboxgroup
 14.01%    1.843      1 Template:Clear
-->

<!-- Saved in parser cache with key wiki_ck3-wmckiii_beta_:pcache:idhash:1277-0!canonical and timestamp 20201129021522 and revision id 10088
 -->
</div></div>                        <div class="printfooter">
                            Retrieved from "<a dir="ltr" href="https://ck3.paradoxwikis.com/index.php?title=Effects&amp;oldid=10088">https://ck3.paradoxwikis.com/index.php?title=Effects&amp;oldid=10088</a>"                        </div>
                    <div id="catlinks" class="catlinks" data-mw="interface"><div id="mw-normal-catlinks" class="mw-normal-catlinks"><a href="/Special:Categories" title="Special:Categories">Categories</a>: <ul><li><a href="/Category:Potentially_outdated" title="Category:Potentially outdated">Potentially outdated</a></li><li><a href="/Category:1.0" title="Category:1.0">1.0</a></li><li><a href="/Category:Modding" title="Category:Modding">Modding</a></li></ul></div></div>                    <div class="visualClear"></div>
                                    </div>
            </div>
        </div>
				<div id="footer" role="contentinfo">
						<ul id="footer-info">
								<li id="footer-info-lastmod"> This page was last edited on 23 October 2020, at 02:30.</li>
								<li id="footer-info-copyright">Content is available under <a href="https://central.paradoxwikis.com/Central:Copyrights" class="extiw" title="central:Central:Copyrights">Attribution-ShareAlike 3.0</a> unless otherwise noted.</li>
							</ul>
						<ul id="footer-places">
								<li id="footer-places-about"><a href="https://central.paradoxwikis.com/Central:About" class="extiw" title="central:Central:About">About CK3 Wiki</a></li>
								<li id="footer-places-mainpage"><a href="/Crusader_Kings_III_Wiki" title="Crusader Kings III Wiki">Crusader Kings III Wiki</a></li>
								<li id="footer-places-paradoxwiki"><a href="https://paradoxwikis.com/" class="extiw" title="paradoxwiki:">Paradox Wikis</a></li>
								<li id="footer-places-legal_pp"><a href="https://legal.paradoxplaza.com/privacy?locale=en">Privacy Policy</a></li>
								<li id="footer-places-mobileview"><a href="https://ck3.paradoxwikis.com/index.php?title=Effects&amp;mobileaction=toggle_view_mobile" class="noprint stopMobileRedirectToggle">Mobile view</a></li>
							</ul>
										<ul id="footer-icons" class="noprint">
										<li id="footer-copyrightico">
						<a href="https://creativecommons.org/licenses/by-sa/3.0/"><img src="https://licensebuttons.net/l/by-sa/3.0/88x31.png" alt="Attribution-ShareAlike 3.0" width="88" height="31"/></a>					</li>
										<li id="footer-poweredbyico">
						<a href="//www.mediawiki.org/"><img src="/resources/assets/poweredby_mediawiki_88x31.png" alt="Powered by MediaWiki" srcset="/resources/assets/poweredby_mediawiki_132x47.png 1.5x, /resources/assets/poweredby_mediawiki_176x62.png 2x" width="88" height="31"/></a>					</li>
									</ul>
						<div style="clear: both;"></div>
		</div>

<script>(window.RLQ=window.RLQ||[]).push(function(){mw.config.set({"wgPageParseReport":{"limitreport":{"cputime":"0.260","walltime":"0.280","ppvisitednodes":{"value":271,"limit":1000000},"ppgeneratednodes":{"value":706,"limit":1000000},"postexpandincludesize":{"value":9326,"limit":2097152},"templateargumentsize":{"value":4119,"limit":2097152},"expansiondepth":{"value":5,"limit":40},"expensivefunctioncount":{"value":0,"limit":100},"unstrip-depth":{"value":0,"limit":20},"unstrip-size":{"value":6052,"limit":5000000},"timingprofile":["100.00%   13.153      1 -total"," 70.17%    9.230      1 Template:Modding_navbox"," 54.54%    7.174      1 Template:Navbox"," 21.11%    2.776      1 Template:Version"," 18.35%    2.414      6 Template:Navboxgroup"," 14.01%    1.843      1 Template:Clear"]},"cachereport":{"timestamp":"20201129021522","ttl":86400,"transientcontent":false}}});});</script>
<!-- Google Tag Manager (added by extension GoogleTagManager) -->
<noscript><iframe src="//www.googletagmanager.com/ns.html?id=GTM-5QW7SS"
height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'//www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-5QW7SS');</script>
<!-- End Google Tag Manager -->
<script>(window.RLQ=window.RLQ||[]).push(function(){mw.config.set({"wgBackendResponseTime":55});});</script>
		<div class="footer pdx_footer"><div class="footer-container content grid ts-inner"><div class="footer__logo footer-item"><div class="content-asset"><div class="footer__logo-image"><img src="https://www.paradoxplaza.com/on/demandware.static/Sites-Paradox_US-Site/-/en_US/images/footer-master-logo.png"/></div></div></div><div class="footer__games footer-item"><div class="content-asset"><div class="footer_section_title">Games</div><ul class="footer__menu"><li class="footer__menu_link"><a href="https://www.paradoxplaza.com/games/" title="Browse">Browse</a></li><li class="footer__menu_link"><a href="https://www.paradoxplaza.com/new-releases/" title="New Releases">New Releases</a></li><li class="footer__menu_link"><a href="https://www.paradoxplaza.com/coming-soon/" title="Coming Soon">Coming Soon</a></li><li class="footer__menu_link"><a href="https://www.paradoxplaza.com/on-sale/" title="On Sale">On Sale</a></li><li class="footer__menu_link"><a href="https://play.paradoxplaza.com/" title="Paradox Launcher">Play on Paradox technology</a></li></ul></div></div><div class="footer__community footer-item"><div class="content-asset"><div class="footer_section_title">Community</div><ul class="footer__menu"><li class="footer__menu_link"><a href="https://forum.paradoxplaza.com/forum/index.php" title="Paradox Forums">Paradox Forums</a></li><li class="footer__menu_link"><a href="https://paradoxwikis.com/" title="Paradox Wikis">Paradox Wikis</a></li><li class="footer__menu_link"><a href="https://www.paradoxplaza.com/support-static-info-ca.html" title="Support">Support</a></li><li class="footer__menu_link"><a href="http://merch.paradoxplaza.com/" title="Merch">Merch</a></li></ul></div></div><div class="footer__about footer-item"><div class="content-asset"><div class="footer_section_title">About</div><ul class="footer__menu"><li class="footer__menu_link"><a href="https://www.paradoxplaza.com/news" title="News">News</a></li><li class="footer__menu_link"><a href="https://www.paradoxplaza.com/about-us-static-info-ca.html" title="About us">About us</a></li><li class="footer__menu_link"><a href="http://career.paradoxplaza.com/" title="Careers">Careers</a></li><li class="footer__menu_link"><a href="https://www.paradoxplaza.com/playtest-static-info-ca.html" title="Join our playtests">Join our playtests</a></li><li class="footer__menu_link"><a href="https://www.paradoxplaza.com/press-static-info-ca.html" title="Media contact">Media contact</a></li></ul></div></div><div class="footer__socialmedia footer-item"><div class="content-asset"><div class="footer_section_title">Social Media</div><ul class="footer__socialmedia-icons"><li class="footer__social-icon"><a href="https://www.facebook.com/ParadoxInteractive" target="_blank"><span class="icon icon-facebook-with-circle"></span></a></li><li class="footer__social-icon"><a href="https://twitter.com/PdxInteractive" target="_blank"><span class="icon icon-twitter-with-circle"></span></a></li><li class="footer__social-icon"><a href="https://www.youtube.com/user/Paradoxplaza" target="_blank"><span class="icon icon-youtube-with-circle"></span></a></li><li class="footer__social-icon"><a href="https://www.twitch.tv/paradoxinteractive" target="_blank"><span class="icon icon-twitch-with-circle"></span></a></li><li class="footer__social-icon"><a href="https://www.instagram.com/explore/locations/241319129/paradox-interactive/" target="_blank"><span class="icon icon-instagram-with-circle"></span></a></li><li class="footer__social-icon"><a href="https://open.spotify.com/artist/75N2nC2KNgaQ1e6bGs0wyc" target="_blank"><span class="icon icon-spotify-with-circle"></span></a></li></ul></div><div class="hide-for-small"><div class="content-asset"><ul class="footer__menu"><li class="footer__menu_link-small"><a href="https://legal.paradoxplaza.com/" title="Terms &amp; Policies">Terms & Policies</a></li><li class="footer__menu_link-small"><a href="https://www.paradoxplaza.com/legal-static-info-ca.html" title="Legal Information">Legal Information</a></li><li class="footer__menu_link-small"><a href="https://ec.europa.eu/consumers/odr/main/index.cfm?event=main.home.chooseLanguage" title="EU Online Dispute Resolution">EU Online Dispute Resolution</a></li><li class="footer__menu_link-small"><a href="https://www.paradoxplaza.com/faq-static-info-ca.html" title="Frequently Asked Questions">Frequently Asked Questions</a></li><li class="footer__menu_link-small"><a href="http://www.paradoxinteractive.com/" title="Paradox Interactive corporate website">Paradox Interactive corporate website</a></li></ul></div></div></div><div class="footer__legal footer-item show-for-small"><div class="content-asset"><ul class="footer__menu"><li class="footer__menu_link-small"><a href="https://legal.paradoxplaza.com/" title="Terms &amp; Policies">Terms & Policies</a></li><li class="footer__menu_link-small"><a href="https://www.paradoxplaza.com/legal-static-info-ca.html" title="Legal Information">Legal Information</a></li><li class="footer__menu_link-small"><a href="https://ec.europa.eu/consumers/odr/main/index.cfm?event=main.home.chooseLanguage" title="EU Online Dispute Resolution">EU Online Dispute Resolution</a></li><li class="footer__menu_link-small"><a href="https://www.paradoxplaza.com/faq-static-info-ca.html" title="Frequently Asked Questions">Frequently Asked Questions</a></li><li class="footer__menu_link-small"><a href="http://www.paradoxinteractive.com/" title="Paradox Interactive corporate website">Paradox Interactive corporate website</a></li></ul></div></div></div></div>
	</body>
</html>
`

var globalEffectsArray = parseWikipedia(wikipedia)
