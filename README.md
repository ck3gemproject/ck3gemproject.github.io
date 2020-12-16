# The CK3 Gem Project

The CK3 Gem Project is a generator of Crusader Kings 3 events based on generative grammars.

## How does the project work?

You generate events "brick by brick" by defining each "brick" on a grid (or across multiple grids), setting constraints, and running a generator over your grids from a START point on the grid by pressing a "Generate" button. Each "brick" (component, as I call it here) can have event settings (theme, background etc...), localization, effects, options, and most other CK3 code attached to it. The generator accumulates these bricks as it walks across the grid, combines the components to prevent duplication where possible, and continues moving until it reaches a point where it cannot walk anymore (because you have not given it anywhere to go). At that point, it creates: (1) a localization entry, (2) an event entry, and (3) an on_action entry (if you have defined an on_action). You can then download the event and on_action entries as text files.

## How will this benefit my modding?

-Short learning curve

-Menu based modding

-Extensible and reusable code through component system

-Generation allows you to make a vast variety of events by defining a finite number of components

## What is a generative grammar?

 The project is based on the idea of a generative grammar. In their article, "Generating Missions and Spaces for Adaptable Play Experiences", Joris Dormans and Sander Bakkes describe generative grammars as follows:

"Generative grammars originate in linguistics where they are used as a model to describe sets of linguistic phrases . . . . A generative grammar typically consists of an alphabet and a set of rules. The alphabet is a set of symbols the grammar works with. The rules employ rewrite operations: a rule specifies what symbol can be replaced by what other symbols to form a new string. For example: a rule in a grammar might specify that in a string of symbols, symbol 'S' can be replaced by the symbols 'ab.' This rule would normally be written down as S --> ab. . . . Some symbols in the alphabet can never be replaced because there are no rules that specify their replacement. These symbols are called terminals and the convention is to represent them with lowercase characters. The symbols 'a' and 'b' in the last example are terminals. Nonterminals have rules that specify their replacement. . . . The symbol 'S' from the prevous rules is an example. For a grammar that describes natural language sentences, temrinal symbols might be words, whereas nonterminal symbols represent functional word groups, such as noun-phrases and verb-phrases. The denominator 'S' is often used for a grammar's start symbol. A generative grammar needs at least one symbol to replace; it cannot start from nothing. Therefore, a complete generative grammar also specifies a start symbol."

For more reading, see:

["Generating Missions and Spaces for Adaptable Play Experience" by Joris Dormans](http://sander.landofsand.com/publications/Dormans_Bakkes_-_Generating_Missions_and_Spaces_for_Adaptable_Play_Experiences.pdf)

[The Tracery Project by Kate Compton](http://www.galaxykate.com/blog/gameswithtracery.html)

## Ok, I understand symbols, terminals, and non-terminals, but what is the graph in the CK3 GEM Project?

The CK3 GEM project uses a rudimentary attempt at implementing a graph grammar. As Dormans and Bakkes again explain, "Graph grammars are a specialized form of generative grammars that produce graphs consisting of edges and nodes, instead of producing strings."

This allows a spatial representation of the generative grammar process. In the CK3 GEM Project, we use an arbitrary number of user defined 2d grids made up of hundreds of cells in which the user can define an arbitrary number of components.

![The Gem Project](https://github.com/ck3gemproject/ck3gemproject.github.io/blob/main/img/gridscreenshot.png?raw=true)

## How does this generate CK3 Events?

Each component may have associated text localization, event settings, triggers, effects, options, and other data related to an event

A generator function starts at a START point on a grid, steps cell by cell through the grid or among multiple grids along user-defined pathways, and accumulates text localization, event settings, triggers, effects, options, and other data related to an event from each component. On the back-end, the generator produces the necessary localization files and assembles the code to create localization, event, and on_action files to plug and play in your mod folders.

## Getting Started

This guide will walk you through the process of getting started with the CK3 GEM Project.

## Tooltips

If you get lost, hover over a section of the page for a few seconds. Much of the page has associated helpful tooltips. The tooltips give you information both on the function of the generator and game modding concepts. For example, if you hover over a trigger, it will tell you how that trigger works based on CK3 Modding Wiki entries.

![Example Tooltip](https://github.com/ck3gemproject/ck3gemproject.github.io/blob/main/img/exampletooltip.png?raw=true)

### Selecting a Grid

At the top of the screen is a select element that allows you to choose a grid by name. By default, the project begins with a grid named "Main". When you change the selection, it will bring up the associated grid. Buttons below the select box allow you to add additional grids or delete grids.

![The Grid](https://github.com/ck3gemproject/ck3gemproject.github.io/blob/main/img/gridcloseup.png?raw=true)

### Selecting a Cell

You select a cell by clicking on the cell within the grid. When you select a cell, the cell generally will change colors.

![The Cell](https://github.com/ck3gemproject/ck3gemproject.github.io/blob/main/img/cellcloseup.png?raw=true)

### Defining a Component

The heart of your work is defining components of cells. Once you have selected a cell, look below the grid. You will see a number of text entry boxes followed by a green "Save Component" button. The function of each text entry box is described below.

![Component Entry](https://github.com/ck3gemproject/ck3gemproject.github.io/blob/main/img/componententry.png?raw=true)

#### Creating a Starting Component

To let the generator know where to start, write the word START in the "Set Tags" box. You can define multiple START points on any grid, and the generator will randomly pick one of those START locations to begin.

#### Localization

The "Localization" input box refers to CK3 Event Localization. When the generator steps on a cell, it checks each component on that cell for a localization box. If you have defined a localization entry for a component on a cell, the generator will do one of two things with it. If every component on a cell consists solely of defined localization and triggers, the generator will create a triggered description. Otherwise, the generator will add that localization together with other localization to create a single localization entry (aggregating localization entries avoids unnecessary entries in the generated localization file).

![Localization](https://github.com/ck3gemproject/ck3gemproject.github.io/blob/main/img/localization.png?raw=true)


#### Travel

The "Travel" input box allows you to define possible travel directions, from this particular component, on the 2d grid. The "Travel" input box also allows you to define probabilities of traveling in specific directions. For example, typing only "NW" in this box would mean that if this component is selected by the generator, the generator will only move up and to the left on the 2d grid. As another example, if you type "NW(1), N(50)" the generator will be fifty times more likely to go up than to go up and to the left. As a default, if you do not type a probability in parentheses after a cardinal direction, the generator will assign a base probability factor of 100.

![Travel](https://github.com/ck3gemproject/ck3gemproject.github.io/blob/main/img/travel.png?raw=true)

#### Run Grid

As stated above, you can define grids by name in by clicking the "Add Grid" button above the grid and move between defining grids with the select element above the grid:

![Add Grid](https://github.com/ck3gemproject/ck3gemproject.github.io/blob/main/img/addgrid.png?raw=true)

But what good does it do to have more than one grid? That is where the "Run Grid" input box shines. Here, you simply write the name of a grid:

![Run Grid](https://github.com/ck3gemproject/ck3gemproject.github.io/blob/main/img/rungrid.png?raw=true)

If this box has been filled out, the generator will process this component, then jump to that grid and process that entire grid, and then jump back to this grid to finish running it. Grids can go as many layers deep as you want. For example, if you see a person, you could have a grid called persondescription that then jumps to grids such as weightdescription, etc... Every time the generator hits a "Run Grid", it essentially places the grid on top of a stack. If it hits another run grid before finishing that grid, it then places another grid on top of the stack and so on.

#### Set Tags

The "Set Tags" input box allows you to define arbitrary tags to associate with a component.  For example, I might have a component with the localization, "Moonlight streams in through my window." In that case, I might want to set tags here, on the fly, such as "night" and "inside" to check later. Tags, like everything else, can be separated by commas to create multiple tags.

Since this is the first cell in a grid, we should define a START tag on the component in the set tags box. This tells the generator where to start and is necessary before the generator will run.

![Set Tags](https://github.com/ck3gemproject/ck3gemproject.github.io/blob/main/img/starttags.png?raw=true)

#### Has Tags

The "Has Tags" box essentially allows you to set a condition on the generator selecting this component. Building on the previous example, in a later component I may want to check to see if "night" has been set before discussing the night guardsmen passing by.

![Has Tags](https://github.com/ck3gemproject/ck3gemproject.github.io/blob/main/img/raining.png?raw=true)

#### Doesn't Have Tags

Similarly, the "Doesn't Have Tags" input box allows you to check to make sure tags have NOT been set before choosing this component. This avoids events that say things like, "Moonlight streams in through my window. The rain falls on me from the heavens above."

#### Remove Tags

The "Remove Tags" box allows you to remove arbitrary tags that have previously been set in an event generation cycle. Use cases are limited, but this may come in handy if you want possible scene shifts in the middle of an event or other changes that make previously defined tags untrue.

#### Component Probability

The "Comp. Probability Box" takes a number and allows you to define a probability factor for a component. When the generator steps on a cell, it chooses among the components defined on the cell by lining up the components by probability, getting a pseudo-random number, and checking that number against the component probabilities to choose a selected component for generation. By default, the probability factor is 100.

#### Save Component Button

Once you have filled out any elements you would like from the list above, hit the "Save Component" button. The cell in which the component is located will now turn green on the grid (denoting cells with components). And a list of defined components will appear below the "Save Component" button. The list gives the localization, travel directions, and various tags related with each component defined on a cell. You can click on any component within the list to provide further edits, which are necessary for example to associate game code with a component.

### Editing a Component

Once you have saved a component, you may provide more meaningful edits to the component by clicking the component in the component list described above, which appears below the "Save Component" button:

![Component List](https://github.com/ck3gemproject/ck3gemproject.github.io/blob/main/img/componentlist.png?raw=true)

The edit boxes consists primarily of two elements: (1) the same boxes you used to define the component, where you can edit any previously entered data, and (2) a new box that gives you access to adding bricks of CK3 Event Code to the generator. We examined the first element above. We now examine the second element.

![Component Edit](https://github.com/ck3gemproject/ck3gemproject.github.io/blob/main/img/componentedit.png?raw=true)


#### "Save" Button

Once you have made changes to a selected component, click the "Save" button to save that component and go back to the default grid view.

#### "Delete" Button

If you want to delete a defined component, click the delete button.

#### "Settings" Button

By default, the edit box begins on the "Settings" screen. Here, you can define various general settings for an event including the on action, title, theme, background override, portraits, and animations.

![Settings Edit](https://github.com/ck3gemproject/ck3gemproject.github.io/blob/main/img/componentedit.png?raw=true)

#### Immediate

By clicking the "Immediate" button, you will be taken to an edit screen that corresponds to the "Immediate" block on an event. Here, you define effects that will happen immediately when the event is triggered. The box consists of four basic elements. First, an input box allows you to define the scopes, if any, to which the effects should be applied. For example, you might write angry_vassal, if you have defined the scope angry vassal earlier. Second, the "Tooltip" box allows you to define a tooltip that should be associated with these effects. The generator aggregates all tooltips accumulated during generation and creates an appropriate tooltip. Third, a freestyle textarea allows you to code any immediate effects as you normally would (minus the outer immediate = {} block, which is added automatically by the generator). Finally, a list of every effect in CK3 is provided below the freestyle block. By hovering over an element in the list, a blue help box will appear that describes how to use that effect (pulled from the modding Wiki). Where possible, placeholder text will tell you what input the effect takes (e.g., "int", "bool", etc.). All you have to do is add that input in the input box, and the generator will create the code. For example, entering "10" in the input box next to add_gold will create the code "add_gold = 10" in the immediate block of your generated event.

![Immediate](https://github.com/ck3gemproject/ck3gemproject.github.io/blob/main/img/immediate.png?raw=true)

#### After

If you click the "After" button, you will see the same thing as in the "Immediate" edit box, but any effects described here will be applied after the event is run and any options are selected. It corresponds to CK3's "after = {}" block of coding and will produce appropriate code for that block.

![After](https://github.com/ck3gemproject/ck3gemproject.github.io/blob/main/img/aftereffects.png?raw=true)

#### Options

Clicking the "Options" button allows you to add an event option to a component. A select element allows you to select a scope to apply effects from the option to. An option text input box allows you to provide option localization by merely inputting text. A tooltip box does the same and automatically creates tooltip localization. An "Option Effects Code" box allows you to define effects as you normally would within an option block. Below the "Option Effects Code" box is a list of ai modifiers (defining the ai's weighting to select a particular option) and every effect.

![Options](https://github.com/ck3gemproject/ck3gemproject.github.io/blob/main/img/options.png?raw=true)

#### Triggers

IMPORTANT NOTE ON TRIGGERS: Setting triggers works a little differently than you might expect but allows us to create triggers in various blocks without having to redo a trigger screen for each block. Specifically, when you add a trigger on the trigger screen, it is processed in the following fashion:

-If no localization, effects, or options are selected, the trigger will be applied within the trigger block.

-If only localization is defined, the trigger will be applied as a trigger on a triggered_desc.

-If effects or options have been entered, the trigger will apply as a trigger on the effects or the effects of the option.

![Triggers](https://github.com/ck3gemproject/ck3gemproject.github.io/blob/main/img/triggers.png?raw=true)

### Generation

When you are done defining your generation pathways, press the "Generate" button in the top menu and specify a number of events to generate. The generator will generate that many events starting on your currently selected grid. Event code will appear under the "Code" tab. Event localization will appear under the localization tab. Event on_actions (if set) will appear under the on_action tab. At the top of each tab, you will see an option to download the file. Just download and place in the proper mod folder. Localization comes properly encoded already for your convenience.
