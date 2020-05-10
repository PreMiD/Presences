const presence = new Presence({
    clientId: "683438933841018928"
});
let presenceData;
function isValidGame(name) {
    var validGames = [
        "morrowind",
        "oblivion",
        "shadowrunreturns",
        "skyrim",
        "fallout3",
        "newvegas",
        "dragonage",
        "dragonage2",
        "witcher",
        "xcom",
        "witcher2",
        "xrebirth",
        "worldoftanks",
        "grimrock",
        "darksouls",
        "fallenenchantress",
        "farcry3",
        "chivalry",
        "dungeondefenders",
        "neverwinter",
        "mountandblade",
        "mbwarband",
        "mbwithfireandsword",
        "minecraft",
        "warcraft3",
        "left4dead2",
        "kotor2",
        "masseffect3",
        "sinsofasolarempire",
        "saintsrow4",
        "stateofdecay",
        "fasterthanlight",
        "kotor",
        "starbound",
        "deusex",
        "masseffect",
        "gta4",
        "thief2",
        "zootycoon2",
        "mafia2",
        "savagexr",
        "masseffect2",
        "halo",
        "jurassicparkopgen",
        "soulreaver",
        "torchlight2",
        "gamedevtycoon",
        "battlefield2",
        "batmanarkhamorigins",
        "kerbalspaceprogram",
        "maddennfl08",
        "blackandwhite2",
        "x3terranconflict",
        "justcause2",
        "disciples3",
        "towns",
        "thesims3",
        "dmcdevilmaycry",
        "crysis",
        "rememberme",
        "rpgmakervxace",
        "teamfortress2",
        "jadeempire",
        "eurotrucksimulator2",
        "3089",
        "droxoperative",
        "risen",
        "crysiswarhead",
        "halflife2",
        "crusaderkings2",
        "borderlands",
        "mystonlineuru",
        "doom3",
        "arxfatalis",
        "thief3",
        "naruto3",
        "batmanarkhamcity",
        "startrekvoyagereliteforce",
        "cncgenerals",
        "cataclysmdarkdaysahead",
        "elderscrollsonline",
        "menofwar",
        "borderlands2",
        "fallout2",
        "southparkthestickoftruth",
        "rimworld",
        "arma3",
        "vampirebloodlines",
        "rodina",
        "residentevil4",
        "warthunder",
        "starwarsempireatwar",
        "sacred",
        "tabletopsimulator",
        "civilization4colonization",
        "darksouls2",
        "planetexplorers",
        "mightandmagicx",
        "fallenenchantresslegendaryheroes",
        "ageofmythologyee",
        "dynastywarriors8",
        "spaceengineers",
        "xenonauts",
        "watchdogs",
        "dungeonsiege1",
        "spintires",
        "insurgency",
        "terraria",
        "fallouttactics",
        "assettocorsa",
        "wizard101",
        "divinityoriginalsin",
        "carmageddonreincarnation",
        "piratesofthecaribbean",
        "projectzomboid",
        "warhammer40kchaosgate",
        "medieval2totalwar",
        "spore",
        "tug",
        "voidexpanse",
        "banished",
        "ageofempires",
        "devilmaycry3",
        "narutorevolution",
        "thesims4",
        "fableanniversary",
        "payday2",
        "wasteland2",
        "thelegendofkorra",
        "darkmessiahofmightandmagic",
        "gothic",
        "legendofgrimrock2",
        "endlesslegend",
        "siryouarebeinghunted",
        "neoscavenger",
        "liveforspeed",
        "legomarvelsuperheroes",
        "acepatrol",
        "kenshi",
        "dragonageinquisition",
        "assassinscreed",
        "deadstate",
        "metalgearsolidvgz",
        "rainbowsixvegas2",
        "farcry4",
        "salt",
        "baldursgate2ee",
        "evilgenius",
        "finalfantasy7",
        "worldofwarplanes",
        "gta3",
        "dyinglight",
        "gruntz",
        "darkestdungeon",
        "dishonored",
        "finalfantasy3",
        "saintsrow3",
        "civilizationbeyondearth",
        "voiddestroyer",
        "rollercoastertycoon2",
        "pillarsofeternity",
        "battlefront2",
        "borderlandspresequel",
        "cnctiberiansun",
        "dragonballxenoverse",
        "lifeistrange",
        "mitsurugikamuihikae",
        "spelunky",
        "deadoralive5",
        "gta5",
        "ageofempires3",
        "spacerangersawarapart",
        "spellforce1",
        "forceunleashed2",
        "dawnofwar2retribution",
        "wwe2k15",
        "tesarena",
        "finalfantasy14",
        "witcher3",
        "galacticcivilizations3",
        "gtasanandreas",
        "risen3",
        "daggerfall",
        "dcsworld",
        "devilmaycry4",
        "farmingsimulator2015",
        "sacred2",
        "showtime",
        "sorcererking",
        "starpointgemini2",
        "victoria2",
        "7daystodie",
        "batmanarkhamknight",
        "assassinscreedrogue",
        "metalgearsolidvtpp",
        "redfactionguerilla",
        "shadowrundragonfall",
        "shadowrunhongkong",
        "bigpharma",
        "madmax",
        "ageofwonders3",
        "delver",
        "maxpayne3",
        "fallout4",
        "doom2",
        "finalfantasy5",
        "fortresscraftevolved",
        "risen2",
        "robinhood",
        "subnautica",
        "sunlesssea",
        "thesecretofmonkeyisland",
        "amnesia",
        "blockland",
        "grimdawn",
        "sims2",
        "guiltygearxrd",
        "haloonline",
        "lethalleague",
        "starwarstheoldrepublic",
        "undertale",
        "bioshock",
        "hitmanbloodmoney",
        "psychonauts",
        "civilisationv",
        "theguild2renaissance",
        "dragonsdogma",
        "bloodandgoldcaribbean",
        "dragonquestheroes",
        "oriandtheblindforest",
        "unturned",
        "Transcendence",
        "bladeandsoul",
        "simcitysocieties",
        "xcom2",
        "americantrucksimulator",
        "totalannihalation",
        "narutoultimateninjastorm4",
        "thebindingofisaacrebirth",
        "farcryprimal",
        "tropico5",
        "alienisolation",
        "stardewvalley",
        "wwe2k16",
        "needforspeed2016",
        "startrekonline",
        "startrekbridgecommmander",
        "deadpool",
        "factorio",
        "gothic3",
        "planetbase",
        "streetfighterv",
        "stalkerclearsky",
        "tomclancysthedivision",
        "legostarwarsthecompletesaga",
        "starwarsbattlefront2015",
        "doom",
        "spidermanshattereddimensions",
        "darksouls3",
        "nexusthejupiterincident",
        "fableIII",
        "warhammer40000dawnofwar",
        "halflife",
        "masteroforionconquerthestars",
        "ageofempires2hd",
        "emperorbattlefordune",
        "worldinconflict",
        "unrealtournament3",
        "unrealtournament",
        "trackmaniaunited",
        "trackmanianations",
        "thesims",
        "supremecommander",
        "starwarsbattlefront",
        "prey",
        "fear",
        "flightsimulatorx",
        "grandtheftautovicecity",
        "jointoperationstyphoonrising",
        "left4dead",
        "operationflashpoint",
        "dayofdefeatsource",
        "deusexinvisiblewar",
        "startrekeliteforceII",
        "fear2projectorigin",
        "counterstrikeconditionzero",
        "civilizationiv",
        "callofdutyworldatwar",
        "blackandwhite",
        "battlefieldvietnam",
        "quake4",
        "lordoftheringsonlineshadowsofangmar",
        "themovies",
        "lordoftheringsbattleformiddleearth2",
        "operationflashpointresistance",
        "aliensvspredator2",
        "callofdutyunitedoffensive",
        "halo2",
        "returntocastlewolfenstein",
        "startrekstarfleetcommand3",
        "unrealtournament2003",
        "companyofheroes",
        "startreklegacy",
        "counterstrikesource",
        "callofduty",
        "worldofwarcraft",
        "callofduty2",
        "battlefield1942",
        "unrealtournament2004",
        "medalofhonor",
        "neverwinter2",
        "finalfantasyxx2hdremaster",
        "empyriongalacticsurvival",
        "europauniversalisiv",
        "deadisland",
        "joypony",
        "farcry2",
        "commandandconquerrenegade",
        "stalkercallofpripyat",
        "stalkershadowofchernobyl",
        "soldieroffortune2",
        "startrekarmada2",
        "callofdutyblackops2",
        "thiefthedarkproject",
        "thebannersaga",
        "motocrossmadness2",
        "fonlineashesofphoenix",
        "sidmeiersacepatrolpacificskies",
        "systemshock2",
        "ubersoldier2",
        "prisonarchitect",
        "samuraiwarriors2",
        "burnoutparadise",
        "stellaris",
        "melodysescape",
        "rage",
        "thebannersaga2",
        "nomanssky",
        "falloutshelter",
        "thesaboteur",
        "ridersoficarus",
        "deadspace",
        "divinityoriginalsin2",
        "leagueoflegends",
        "rpgmakermv",
        "duelyst",
        "deadrising",
        "civilisationvi",
        "battlebrothers",
        "freecol",
        "sakuradungeon",
        "shadowwarrior2",
        "southparkrally",
        "skyrimspecialedition",
        "stonehearth",
        "farmingsimulator2013",
        "tyranny",
        "residentevil6",
        "helgatelondon",
        "armacoldwarassault",
        "middleearthshadowofmordor",
        "starcrawlers",
        "heroesofmightandmagicv",
        "starwarsjediknightjediacademy",
        "breakingwheel",
        "strongholdcrusader2",
        "counterstrike16",
        "osirisnewdawn",
        "thelongdark",
        "stalkercallofchernobyl",
        "doorkickers",
        "dungeonlordssteamedition",
        "spellforce2",
        "assassinscreedii",
        "diablo",
        "thebookofunwrittentales",
        "escapefrompleasureplanet",
        "grandiaIIanniversaryedition",
        "doom1993",
        "sidmeierspirates",
        "totalwarshogun2",
        "berserkandthebandofthehawk",
        "halcyon6starbasecommander",
        "butcher",
        "ultimatemarvelvscapcom3",
        "masseffectandromeda",
        "rugbyleaguelive3",
        "streetfighteriv",
        "ghostreconwildlands",
        "castlevanialordsofshadow",
        "orcsmustdie2",
        "talesofberseria",
        "space",
        "baldursgate",
        "offworldtradingcompany",
        "justcause3",
        "pornostudiotycoon",
        "nierautomata",
        "finalfantasy9",
        "prey2017",
        "mirrorsedgecatalyst",
        "astroneer",
        "deusexhumanrevolution",
        "privateergeminigold",
        "titanquestanniversaryedition",
        "divinityoriginalsinenhancededition",
        "gothic2",
        "overwatch",
        "hotrodamericanstreetdrag",
        "icewinddale2",
        "kopanitoallstarssoccer",
        "monopoly",
        "saltandsanctuary",
        "csgo",
        "dungeonsiegeii",
        "heartsofironiv",
        "lifeisfeudal",
        "lordsofthefallen",
        "vermintide",
        "sonicmania",
        "endlessspace2",
        "mountandbladevikingconquest",
        "prehistorickingdom",
        "jaggedalliance2",
        "monacowhatsyoursismine",
        "sonicadventuredx",
        "batmanarkhamasylum",
        "finalfantasy13",
        "lifeisstrangebeforethestorm",
        "sniperghostwarrior",
        "tekken7",
        "starpointgeminiwarlords",
        "elex",
        "hacklastrecode",
        "assassinscreedorigins",
        "battlechasersnightwar",
        "mafia",
        "pavlov",
        "sphinxandthecursedmummy",
        "planttycoon",
        "hacknet",
        "spectromancer",
        "istaria",
        "riseofthetombraider",
        "thewalkingdead",
        "spaceengine",
        "darkandlight",
        "colonysurvival",
        "starwarsbattlefront22017",
        "alendadoheroi",
        "blazbluecentralfiction",
        "empiretotalwar",
        "garrysmod",
        "halocustomedition",
        "mesozoica",
        "mugen",
        "spacecolony",
        "spellforce3",
        "starcitizen",
        "turok2",
        "twoworlds",
        "legothehobbit",
        "handoffate2",
        "metro2033",
        "endlesssky",
        "site",
        "kingdomcomedeliverance",
        "dungeonbuilder",
        "finalfantasy12",
        "stationeers",
        "dokidokiliteratureclub",
        "metalgearsurvive",
        "mytimeatportia",
        "vermintide2",
        "intothebreach",
        "empireearth",
        "paintthetownred",
        "twoworldstwo",
        "finalfantasy15",
        "slaythespire",
        "survivingmars",
        "testdriveunlimited2",
        "farcry5",
        "conanexiles",
        "ahatintime",
        "contagion",
        "ysviii",
        "tombraider2",
        "softwareinc",
        "trove",
        "battletech",
        "swordcoastlegends",
        "pcbuildingsimulator",
        "pillarsofeternity2",
        "darksiders2deathinitiveedition",
        "pulsarlostcolony",
        "warlordsbattlecry2",
        "warlordsbattlecry3",
        "needforspeedpayback",
        "deusexmankinddivided",
        "oxygennotincluded",
        "themercuryman",
        "mnmh7",
        "mechwarrior4",
        "mortalkombat9",
        "footballmanager2018",
        "beamngdrive",
        "gunsgoreandcannoli2",
        "darksoulsremastered",
        "stateofdecay2",
        "totalwarwarhammer2",
        "auroradusksteamage",
        "kingdomsofamalurreckoning",
        "vampyr",
        "blazbluecrosstagbattle",
        "rugbychallenge3",
        "watchdogs2",
        "vampireredemption",
        "wurmunlimited",
        "supersmashbroswiiu",
        "spellforce2demonsofthepast",
        "crashbandicootnsanetrilogy",
        "bayonetta",
        "deadspace2",
        "hawx2",
        "shiningresonancerefrain",
        "spellforce2masterofwar",
        "middleearthshadowofwar",
        "terratech",
        "brawlhalla",
        "metrolastlightredux",
        "redfactionarmageddon",
        "warhammer40000gladiusrelicsofwar",
        "sniperghostwarrior3",
        "metro2033redux",
        "metrolastlight",
        "necropolis",
        "objectsinspace",
        "scpcontainmentbreach",
        "hitmanabsolution",
        "titanfall2",
        "splintercellconviction",
        "callofdutyinfinitewarfare",
        "monsterhunterworld",
        "xmenoriginswolverine",
        "redfactionguerrillaremarstered",
        "hexenii",
        "demonsage",
        "beatsaber",
        "fateextella",
        "callofdutywwii",
        "dyinglightbadblood",
        "riseofindustry",
        "shenmue",
        "shenmue2",
        "twopointhospital",
        "divinityoriginalsin2definitiveedition",
        "enclave",
        "jurassicworldevolution",
        "zoneoftheendersthe2ndrunnermars",
        "spellforceplatinumedition",
        "ysmemoriesofcelceta",
        "shadowofthetombraider",
        "skyrimnintendoswitch",
        "thebardstaleivbarrowsdeep",
        "starcontrolorigins",
        "dragonquestxi",
        "gpbikes",
        "inazumaelevengostrikers2013",
        "mysummercar",
        "legorockraiders",
        "theatheawakening",
        "pathfinderkingmaker",
        "battlefieldbadcompany2",
        "assassinscreedodyssey",
        "fifa18",
        "battlefield1",
        "generationzero",
        "assassinscreedunity",
        "carmechanicsimulator2018",
        "warriorsorochi4",
        "soulcaliburvi",
        "fallout76",
        "kingsbountydarkside",
        "footballmanager2019",
        "legostarwarsthevideogame",
        "ultimatespiderman",
        "dominions4",
        "pathofexile",
        "x4foundations",
        "blockscape",
        "justcause4",
        "hades",
        "fallout",
        "aragami",
        "starsector",
        "starwarsepisode1racer",
        "edgeofeternity",
        "bladeandsorcery",
        "galacticcivilizations2",
        "farmingsimulator19",
        "gardenpaws",
        "yakuza0",
        "talesofglory",
        "farmingsimulator17",
        "mafia3",
        "fellsealarbitersmark",
        "xplane11",
        "onimushawarlords",
        "kingdomtwocrowns",
        "graveyardkeeper",
        "hollowknight",
        "thebannersaga3",
        "superpower2",
        "assassinscreedrevelations",
        "finalfantasy8",
        "residentevil22019",
        "maddennfl19",
        "Desolate",
        "ashofgodsredemption",
        "subnauticabelowzero",
        "supermarioodyssey",
        "hexenbeyondheretic",
        "anthem",
        "thepurringquest",
        "wargroove",
        "bloodborne",
        "transformersdevastation",
        "supremecommander2",
        "thecuriousexpedition",
        "driversanfrancisco",
        "dontstarvetogether",
        "deadspace3",
        "hardtime",
        "farcrynewdawn",
        "quake2",
        "mightandmagicviii",
        "metroexodus",
        "pes2019",
        "secretofmana",
        "enderal",
        "wrcfiaworldrallychampionship",
        "phantomdoctrine",
        "thesurge",
        "battlefieldv",
        "thegenesisproject",
        "residentevilbiohazardhdremaster",
        "dawnofman",
        "devilmaycry5",
        "theamazingspiderman2",
        "bleed",
        "nioh",
        "derailvalley",
        "cuphead",
        "cavesofqud",
        "eastshade",
        "residentevil5goldedition",
        "tomclancysthedivision2",
        "sekiro",
        "astroximperium",
        "myexboyfriendthespacetyrant",
        "jumpforce",
        "slimerancher",
        "assassinscreediiiremastered",
        "outward",
        "residentevil0biohazard0hdremaster",
        "borderlandsgotyenhanced",
        "hereticshadowoftheserpentriders",
        "acecombat7skiesunknown",
        "killerisdead",
        "sunsetoverdrive",
        "turokdinosaurhunter",
        "darksiderswarmasterededition",
        "metalgearrisingrevengeance",
        "commandandconquer3tiberiumwars",
        "syndicatewars",
        "deathroadtocanada",
        "theevilwithin",
        "wwe2k19",
        "weedcraftinc",
        "laracroftandtheguardianoflight",
        "onewayheroics",
        "haydee",
        "clonedroneinthedangerzone",
        "metroidprime2echoesgamecube",
        "invisibleinc",
        "crysis2",
        "halflifesource",
        "thea2theshattering",
        "erannorthreborn",
        "mortalkombat11",
        "shovelknight",
        "ellerosorigins",
        "crysis3",
        "commandandconquer3kaneswrath",
        "residentevil1996",
        "anno1800",
        "manhunt",
        "yakuzakiwami2",
        "tombraider2013",
        "hitman2",
        "unreal2theawakening",
        "aplaguetaleinnocence",
        "skyrimplaystation4",
        "fallout4playstation4",
        "saintsrow2",
        "staxel",
        "rysesonofrome",
        "gigantic",
        "outlast",
        "sonicadventure2",
        "wolfensteintheoldblood",
        "wolfensteintheneworder",
        "stormworksbuildandrescue",
        "spellforce3soulharvest",
        "creatures",
        "creatures2",
        "creatures3",
        "totalwarthreekingdoms",
        "gridautosport",
        "lobotomycorporation",
        "fifa19",
        "wargamereddragon",
        "pathologic2",
        "cryofall",
        "bloodstainedritualofthenight",
        "yakuzakiwami",
        "thesinkingcity",
        "ultimatefishingsimulator",
        "needforspeedmostwanted2005",
        "battlefleetgothicarmada2",
        "zombieshooter2",
        "ageofcivilizations2",
        "cultistsimulator",
        "needforspeedworld",
        "celeste",
        "endcyclevs",
        "fortheking",
        "motorsportmanager",
        "totalwarrome2",
        "battlegrounds3",
        "shatteredtaleoftheforgottenking",
        "wrc5",
        "assassinscreedsyndicate",
        "callofdutyadvancedwarfare",
        "gloomhaven",
        "wrc7",
        "heroesofmightandmagiciii",
        "residentevil21998",
        "mightandmightvi",
        "lightningreturnsfinalfantasy13",
        "satisfactory",
        "enslavedodysseytothewest",
        "warsandwarriorsjoanofarc",
        "ballisticng",
        "dishonored2",
        "strandeddeep",
        "theevilwithin2",
        "rebelgalaxyoutlaw",
        "holdfastnationsatwar",
        "ageofwondersplanetfall",
        "daggerfallunity",
        "remnantfromtheashes",
        "ascepticsguidetomagic",
        "oninaki",
        "underrailexpedition",
        "control",
        "blairwitch",
        "monstersanctuary",
        "ninjablade",
        "openttd",
        "hiveswapfriendsim",
        "spyroreignitedtrilogy",
        "clivebarkersjericho",
        "shortesttriptoearth",
        "greedfall",
        "finalfantasy8remastered",
        "demonssouls",
        "blasphemous",
        "wizardry8",
        "mordhau",
        "maddennfl20",
        "borderlands3",
        "devilshunt",
        "thesurge2",
        "stronghold2",
        "greenhell",
        "shadowsawakening",
        "halothemasterchiefcollection",
        "codevein",
        "wrc8",
        "darkwood",
        "rebelgalaxy",
        "thepunisher",
        "lovethyselfahoratiostory",
        "huntshowdown",
        "recoredefinitiveedition",
        "warsaw",
        "cubeworld",
        "trine4thenightmareprince",
        "valfaris",
        "assassinscreedivblackflag",
        "residentevil5",
        "mechandmercsblacktalons",
        "azure",
        "fantasygeneral2",
        "reddeadredemption2",
        "discoelysium",
        "ghostreconbreakpoint",
        "legendofzeldabreathofthewild",
        "theouterworlds",
        "starwarsrepubliccommando",
        "splintercellblacklist",
        "darksiders3",
        "noita",
        "tombraiderlegend",
        "untitledgoosegame",
        "roguelands",
        "warhammer40000spacemarine",
        "callofdutymodernwarfare",
        "thetechnomancer",
        "themasterplan",
        "dirt3",
        "wildermyth",
        "mechwarrioronline",
        "starwarsjedifallenorder",
        "condemnedcriminalorigins",
        "terminatorresistance",
        "deadrising3",
        "yanderesimulator",
        "osu",
        "legendofzeldatwilightprincess",
        "uboat",
        "gun",
        "flatoutultimatecarnage",
        "warhammer40000dawnofwarII",
        "needforspeedheat",
        "bioshockinfinite",
        "shenmue3",
        "keplerth",
        "ageofempires2definitiveedition",
        "citiesskylines",
        "talesofsymphonia",
        "ambersairline7wonders",
        "planetzoo",
        "mechwarrior5mercenaries",
        "darksidersgenesis",
        "phoenixpoint",
        "transportfever2",
        "runeii",
        "shadowman",
        "thetownoflight",
        "bloonstd5",
        "racedrivergrid",
        "neonchrome",
        "freemanguerrillawarfare",
        "undermine",
        "boneworks",
        "sinsofthefathers20thanniversaryedition",
        "killingfloor",
        "overload",
        "portal2",
        "outerwilds",
        "omertacityofgangsters",
        "terminatorsalvation",
        "blackmesa",
        "residentevil7",
        "lowmagicage",
        "session",
        "howtosurvive2",
        "atomrpg",
        "zumadeluxe",
        "castlevaniaanniversarycollection",
        "howtosurvive",
        "sdgundamggenerationcrossrays",
        "legobatman",
        "toukiden2",
        "thiswarofmine",
        "residentevilrevelations",
        "dragonballzkakarot",
        "vanquish",
        "kingsbountythelegend",
        "dragonballxenoverse2",
        "nimbatusthespacedroneconstructor",
        "prototype",
        "heroesandgenerals",
        "callofcthulhudarkcornersoftheearth",
        "singularity",
        "2dark",
        "houseparty",
        "soldiersheroesofworldwar2",
        "vikingswolvesofmidgard",
        "callofjuarezgunslinger",
        "laracroftgo",
        "thehuntercallofthewild",
        "lethalleagueblaze",
        "rage2",
        "wolcenlordsofmayhem",
        "metalunit",
        "plagueincevolved",
        "mountandblade2bannerlord"
    ];
    return validGames.includes(name);
}
function getCategorizedPresenceData(path, presenceData, pageTitle, gameTitle, typeUrl, typeSingle, typePlural) {
    if (path.length > 3 &&
        path[0] !== "" &&
        path[1] === typeUrl &&
        path[2] === "categories" &&
        parseInt(path[3])) {
        presenceData.details = gameTitle + " - Viewing " + typeSingle + " category";
        presenceData.state = pageTitle;
    }
    else if (path.length > 3 &&
        path[0] !== "" &&
        path[1] === typeUrl &&
        path[2] === "categories" &&
        path[3] !== "") {
        presenceData.details =
            gameTitle + " - Browsing " + typeSingle + " categories";
        presenceData.state = pageTitle;
    }
    else if (path.length > 2 &&
        path[0] !== "" &&
        path[1] === typeUrl &&
        path[2] === "categories") {
        presenceData.details =
            gameTitle + " - Browsing " + typeSingle + " categories";
    }
    else if (path.length > 2 &&
        path[0] !== "" &&
        path[1] === typeUrl &&
        path[2] === "add") {
        presenceData.details = gameTitle + " - Uploading a new " + typeSingle;
        presenceData.smallImageKey = "writing";
    }
    else if (path.length > 2 &&
        path[0] !== "" &&
        path[1] === typeUrl &&
        path[2] !== "categories" &&
        parseInt(path[2])) {
        presenceData.details = gameTitle + " - Viewing " + typeSingle;
        presenceData.state = pageTitle;
    }
    else if (path.length > 2 &&
        path[0] !== "" &&
        path[1] === typeUrl &&
        path[2] !== "categories" &&
        path[2] !== "") {
        presenceData.details = gameTitle + " - Browsing " + typePlural;
        presenceData.state = pageTitle;
    }
    else if (path.length > 1 && path[0] !== "" && path[1] === typeUrl) {
        presenceData.details = gameTitle + " - Browsing " + typePlural;
    }
    else {
        presenceData.details = gameTitle + " - Browsing page";
    }
    return presenceData;
}
const browsingStamp = Math.floor(Date.now() / 1000);
presence.on("UpdateData", () => {
    const subdomain = window.location.host.split(".")[0];
    const path = window.location.pathname.split("/").slice(1);
    presenceData = {
        largeImageKey: "logo",
        smallImageKey: "reading",
        startTimestamp: browsingStamp
    };
    switch (subdomain) {
        case "help":
            presenceData.details = "Browsing support page";
            break;
        case "users":
            presenceData.details = "Editing user account";
            break;
        case "wiki":
            var wikiTitle = null;
            try {
                wikiTitle = document.getElementById("firstHeading").innerText;
                if (wikiTitle > 128) {
                    wikiTitle = wikiTitle.substring(0, 125) + "...";
                }
            }
            catch (error) {
                wikiTitle = "Unknown page";
            }
            presenceData.details = "Reading wiki";
            presenceData.state = wikiTitle;
            break;
        case "forums":
            var forumTitle = null;
            try {
                forumTitle = document
                    .getElementsByTagName("title")[0]
                    .innerHTML.replace(" - The Nexus Forums", "")
                    .replace("The Nexus Forums", "");
                if (forumTitle === "") {
                    forumTitle = "Home";
                }
                else if (forumTitle > 128) {
                    forumTitle = forumTitle.substring(0, 125) + "...";
                }
            }
            catch (error) {
                forumTitle = "Unknown page";
            }
            presenceData.details = "Browsing forums";
            presenceData.state = forumTitle;
            break;
        default:
            var gameTitle = null;
            try {
                gameTitle = document.getElementsByClassName("game-name")[0].textContent;
                if (gameTitle > 128) {
                    gameTitle = gameTitle.substring(0, 125) + "...";
                }
            }
            catch (error) {
                gameTitle = "Unknown game";
            }
            var pageTitle = null;
            try {
                pageTitle = document.getElementsByTagName("H1")[0].textContent;
                if (pageTitle > 128) {
                    pageTitle = pageTitle.substring(0, 125) + "...";
                }
            }
            catch (error) {
                pageTitle = "Unknown page";
            }
            if (path.length > 0 && isValidGame(path[0])) {
                if (path.length > 1 && path[1] !== "") {
                    switch (path[1]) {
                        case "mods":
                            presenceData = getCategorizedPresenceData(path, presenceData, pageTitle, gameTitle, "mods", "mod", "mods");
                            break;
                        case "media":
                            presenceData = getCategorizedPresenceData(path, presenceData, pageTitle, gameTitle, "media", "media", "media");
                            break;
                        case "images":
                            presenceData = getCategorizedPresenceData(path, presenceData, pageTitle, gameTitle, "images", "image", "images");
                            break;
                        case "videos":
                            presenceData = getCategorizedPresenceData(path, presenceData, pageTitle, gameTitle, "videos", "video", "videos");
                            break;
                        default:
                            presenceData.details = gameTitle + " - Browsing page";
                            break;
                    }
                }
                else {
                    presenceData.details = gameTitle + " - Browsing home";
                }
            }
            else if (path.length > 0 && path[0] !== "") {
                switch (path[0]) {
                    case "about":
                        presenceData.details = "Browsing about";
                        break;
                    case "news":
                        if (path.length > 1 && parseInt(path[1])) {
                            presenceData.details = "Reading a news article";
                            presenceData.state = pageTitle;
                        }
                        else {
                            presenceData.details = "Browsing news";
                        }
                        break;
                    case "mods":
                        if (path.length > 1 && path[1] === "add") {
                            presenceData.details = "Uploading a new mod";
                            presenceData.smallImageKey = "writing";
                        }
                        else {
                            presenceData.details = "Browsing mods";
                        }
                        break;
                    case "media":
                        presenceData.details = "Browsing media";
                        break;
                    case "images":
                        if (path.length > 1 && path[1] === "add") {
                            presenceData.details = "Uploading a new image";
                            presenceData.smallImageKey = "writing";
                        }
                        else {
                            presenceData.details = "Browsing images";
                        }
                        break;
                    case "videos":
                        if (path.length > 1 && path[1] === "add") {
                            presenceData.details = "Uploading a new video";
                            presenceData.smallImageKey = "writing";
                        }
                        else {
                            presenceData.details = "Browsing videos";
                        }
                        break;
                    case "games":
                        presenceData.details = "Browsing games";
                        break;
                    default:
                        presenceData.details = "Browsing page";
                        break;
                }
            }
            else {
                presenceData.details = "Browsing home";
            }
            break;
    }
    if (presenceData.details == null) {
        presence.setTrayTitle();
        presence.setActivity();
    }
    else {
        presence.setActivity(presenceData);
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUM1QixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsQ0FBQztBQUVILElBQUksWUFBMEIsQ0FBQztBQVUvQixTQUFTLFdBQVcsQ0FBQyxJQUFZO0lBQy9CLElBQUksVUFBVSxHQUFHO1FBQ2YsV0FBVztRQUNYLFVBQVU7UUFDVixrQkFBa0I7UUFDbEIsUUFBUTtRQUNSLFVBQVU7UUFDVixVQUFVO1FBQ1YsV0FBVztRQUNYLFlBQVk7UUFDWixTQUFTO1FBQ1QsTUFBTTtRQUNOLFVBQVU7UUFDVixVQUFVO1FBQ1YsY0FBYztRQUNkLFVBQVU7UUFDVixXQUFXO1FBQ1gsbUJBQW1CO1FBQ25CLFNBQVM7UUFDVCxVQUFVO1FBQ1Ysa0JBQWtCO1FBQ2xCLGFBQWE7UUFDYixlQUFlO1FBQ2YsV0FBVztRQUNYLG9CQUFvQjtRQUNwQixXQUFXO1FBQ1gsV0FBVztRQUNYLFlBQVk7UUFDWixRQUFRO1FBQ1IsYUFBYTtRQUNiLG9CQUFvQjtRQUNwQixZQUFZO1FBQ1osY0FBYztRQUNkLGlCQUFpQjtRQUNqQixPQUFPO1FBQ1AsV0FBVztRQUNYLFFBQVE7UUFDUixZQUFZO1FBQ1osTUFBTTtRQUNOLFFBQVE7UUFDUixZQUFZO1FBQ1osUUFBUTtRQUNSLFVBQVU7UUFDVixhQUFhO1FBQ2IsTUFBTTtRQUNOLG1CQUFtQjtRQUNuQixZQUFZO1FBQ1osYUFBYTtRQUNiLGVBQWU7UUFDZixjQUFjO1FBQ2QscUJBQXFCO1FBQ3JCLG9CQUFvQjtRQUNwQixhQUFhO1FBQ2IsZ0JBQWdCO1FBQ2hCLGtCQUFrQjtRQUNsQixZQUFZO1FBQ1osWUFBWTtRQUNaLE9BQU87UUFDUCxVQUFVO1FBQ1YsZ0JBQWdCO1FBQ2hCLFFBQVE7UUFDUixZQUFZO1FBQ1osZUFBZTtRQUNmLGVBQWU7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