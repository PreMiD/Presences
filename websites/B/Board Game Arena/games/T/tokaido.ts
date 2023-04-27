// TODO
import { GamePresence } from "..";
import {
	getActivePlayerId,
	getCurrentGameState,
	getCurrentGameStateType,
	getPlayerAvatar,
	getPlayerData,
	getPlayerScore,
	getUserPlayerId,
} from "../../util";

const tokaido: GamePresence = {
	logo: "",
	async getData(presence: Presence) {
		const gameState = await getCurrentGameState(presence),
			activePlayer = await getActivePlayerId(presence),
			gameStateType = await getCurrentGameStateType(presence),
			userPlayer = await getUserPlayerId(presence),
			activePlayerData = await getPlayerData(presence, activePlayer),
			data: PresenceData = {
				smallImageKey: getPlayerAvatar(userPlayer),
				smallImageText: `Score: ${getPlayerScore(userPlayer)}`,
			};
		if (activePlayer === userPlayer || gameStateType !== "activeplayer") {
			switch (gameState) {
				case "gameSetup":
					/*
					{
	"name": "gameSetup",
	"description": "Game setup",
	"type": "manager",
	"action": "stGameSetup",
	"transitions": {
		"": 211
	}
}
					*/
					break;
				case "nextPlayer":
					/*
					{
	"name": "nextPlayer",
	"description": "",
	"type": "game",
	"action": "stNextPlayer",
	"updateGameProgression": true,
	"transitions": {
		"normal": 3,
		"neutral": 31,
		"secondStopAction": 4,
		"endGame": 98
	}
}
					*/
					break;
				case "playerTravel":
					/*
					{
	"name": "playerTravel",
	"description": "${actplayer} must travel",
	"descriptionmyturn": "${you} must travel",
	"type": "activeplayer",
	"possibleactions": [
		"selectNextStop",
		"switchAmulet",
		"zombiePass"
	],
	"transitions": {
		"done": 4,
		"amuletSwitched": 3,
		"zombiePass": 2
	}
}
					*/
					break;
				case "stopManagement":
					/*
					{
	"name": "stopManagement",
	"description": "${actplayer} must choose an action",
	"descriptionmyturn": "${you} must choose an action",
	"type": "activeplayer",
	"action": "stStopManagement",
	"possibleactions": [
		"chooseStopAction",
		"cancel",
		"switchAmulet",
		"zombiePass"
	],
	"transitions": {
		"village": 5,
		"legendaryobject": 51,
		"farm": 6,
		"gamingroom": 61,
		"field": 7,
		"mountain": 7,
		"sea": 7,
		"cherrytree": 71,
		"hotspring": 8,
		"bathhouse": 81,
		"temple": 9,
		"amulet": 91,
		"encounter": 101,
		"calligraphy": 105,
		"inn": 11,
		"innsatsuki": 111,
		"innhiroshige": 112,
		"innchuubei": 113,
		"innjirocho": 115,
		"inndaigoro": 116,
		"cancel": 2,
		"amuletSwitched": 4,
		"zombiePass": 2
	},
	"args": "argStopManagement"
}
					*/
					break;
				case "villageStop":
					/*
					{
	"name": "villageStop",
	"description": "${actplayer} can purchase souvenirs",
	"descriptionmyturn": "${you} can purchase souvenirs",
	"type": "activeplayer",
	"action": "stVillageStop",
	"possibleactions": [
		"selectSouvenirCards",
		"switchAmulet",
		"cancel",
		"zombiePass"
	],
	"transitions": {
		"done": 2,
		"amuletSwitched": 5,
		"zombiePass": 2
	},
	"args": "argVillageStop"
}
					*/
					break;
				case "farmStop":
					/*
					{
	"name": "farmStop",
	"description": "${actplayer} works on the farm",
	"descriptionmyturn": "",
	"type": "game",
	"action": "stFarmStop",
	"possibleactions": [
		""
	],
	"transitions": {
		"": 2
	}
}
					*/
					break;
				case "panoramaStop":
					/*
					{
	"name": "panoramaStop",
	"description": "${actplayer} discovers a beautiful panorama",
	"descriptionmyturn": "",
	"type": "game",
	"action": "stPanoramaStop",
	"possibleactions": [
		""
	],
	"transitions": {
		"": 2
	}
}
					*/
					break;
				case "hotSpringStop":
					/*
					{
	"name": "hotSpringStop",
	"description": "${actplayer} enjoys a relaxing bath",
	"descriptionmyturn": "",
	"type": "game",
	"action": "stHotSpringStop",
	"possibleactions": [
		""
	],
	"transitions": {
		"": 2
	}
}
					*/
					break;
				case "templeStop":
					/*
					{
	"name": "templeStop",
	"description": "${actplayer} must choose how many coins to give to the temple",
	"descriptionmyturn": "${you} must choose how many coins to give to the temple",
	"type": "activeplayer",
	"action": "stTempleStop",
	"possibleactions": [
		"selectAmountToGive",
		"zombiePass"
	],
	"transitions": {
		"done": 2,
		"zombiePass": 2
	}
}
					*/
					break;
				case "encounterStop":
					/*
					{
	"name": "encounterStop",
	"description": "${actplayer} makes an encounter",
	"descriptionmyturn": "",
	"type": "game",
	"action": "stEncounterStop",
	"possibleactions": [
		""
	],
	"transitions": {
		"done": 2,
		"panoramaChoice": 104
	}
}
					*/
					break;
				case "innStop":
					/*
					{
	"name": "innStop",
	"description": "${actplayer} can purchase a meal",
	"descriptionmyturn": "${you} can purchase a meal",
	"type": "activeplayer",
	"action": "stInnStop",
	"possibleactions": [
		"selectMeal",
		"switchAmulet",
		"cancel",
		"zombiePass"
	],
	"transitions": {
		"done": 2,
		"amuletSwitched": 11,
		"endGame": 98,
		"zombiePass": 2
	},
	"args": "argInnStop"
}
					*/
					break;
				case "multiplayerChooseTraveler":
					/*
					{
	"name": "multiplayerChooseTraveler",
	"description": "All players must choose a traveler",
	"descriptionmyturn": "All players must choose a traveler",
	"type": "multipleactiveplayer",
	"possibleactions": [
		"selectTraveler"
	],
	"transitions": {
		"": 22
	}
}
					*/
					break;
				case "travelerSetup":
					/*
					{
	"name": "travelerSetup",
	"description": "travelerSetup",
	"type": "game",
	"action": "stTravelerSetup",
	"transitions": {
		"": 2
	}
}
					*/
					break;
				case "neutralTravel":
					/*
					{
	"name": "neutralTravel",
	"description": "${actplayer} must move the neutral traveler",
	"descriptionmyturn": "${you} must move the neutral traveler",
	"type": "activeplayer",
	"possibleactions": [
		"selectNextStop",
		"zombiePass"
	],
	"transitions": {
		"done": 41,
		"zombiePass": 2
	}
}
					*/
					break;
				case "neutralStopManagement":
					/*
					{
	"name": "neutralStopManagement",
	"description": "",
	"type": "game",
	"action": "stNeutralStopManagement",
	"transitions": {
		"done": 2,
		"endGame": 98
	}
}
					*/
					break;
				case "legendaryObjectStop":
					/*
					{
	"name": "legendaryObjectStop",
	"description": "${actplayer} can purchase a Legendary Object",
	"descriptionmyturn": "${you} can purchase a Legendary Object",
	"type": "activeplayer",
	"action": "stLegendaryObjectStop",
	"possibleactions": [
		"selectLegendaryObject",
		"switchAmulet",
		"cancel",
		"zombiePass"
	],
	"transitions": {
		"done": 2,
		"amuletSwitched": 51,
		"zombiePass": 2
	},
	"args": "argLegendaryObjectStop"
}
					*/
					break;
				case "gamingRoomStop":
					/*
					{
	"name": "gamingRoomStop",
	"description": "${actplayer} gambles 2 coins and throws the Fortune die",
	"descriptionmyturn": "",
	"type": "game",
	"action": "stGamingRoomStop",
	"possibleactions": [
		""
	],
	"transitions": {
		"": 2
	}
}
					*/
					break;
				case "cherrytreeStop":
					/*
					{
	"name": "cherrytreeStop",
	"description": "${actplayer} enjoys the cherry blossoms",
	"descriptionmyturn": "",
	"type": "game",
	"action": "stCherryTreeStop",
	"possibleactions": [
		""
	],
	"transitions": {
		"": 2
	}
}
					*/
					break;
				case "bathHouseStop":
					/*
					{
	"name": "bathHouseStop",
	"description": "${actplayer} visits a Bath House",
	"descriptionmyturn": "",
	"type": "game",
	"action": "stBathHouseStop",
	"possibleactions": [
		""
	],
	"transitions": {
		"": 2
	}
}
					*/
					break;
				case "amuletStop":
					/*
					{
	"name": "amuletStop",
	"description": "${actplayer} can purchase an Amulet",
	"descriptionmyturn": "${you} can purchase an Amulet",
	"type": "activeplayer",
	"action": "stAmuletStop",
	"possibleactions": [
		"selectAmulet",
		"cancel",
		"zombiePass"
	],
	"transitions": {
		"done": 2,
		"zombiePass": 2
	},
	"args": "argAmuletStop"
}
					*/
					break;
				case "prepareEndGame":
					/*
					{
	"name": "prepareEndGame",
	"description": "",
	"descriptionmyturn": "",
	"type": "game",
	"action": "stPrepareEndGame",
	"possibleactions": [
		""
	],
	"transitions": {
		"": 99
	}
}
					*/
					break;
				case "gameEnd":
					/*
					{
	"name": "gameEnd",
	"description": "End of game",
	"type": "manager",
	"action": "stGameEnd",
	"args": "argGameEnd"
}
					*/
					break;
				case "encounterStopPrepare":
					/*
					{
	"name": "encounterStopPrepare",
	"description": "${actplayer} must choose an encounter",
	"descriptionmyturn": "${you} must choose an encounter",
	"type": "activeplayer",
	"action": "stEncounterStopPrepare",
	"possibleactions": [
		"selectEncounterCard",
		"zombiePass"
	],
	"transitions": {
		"done": 102,
		"zombiePass": 2
	},
	"args": "argEncounterStopPrepare"
}
					*/
					break;
				case "encounterStopPay":
					/*
					{
	"name": "encounterStopPay",
	"description": "${actplayer} needs to pay for an encounter",
	"descriptionmyturn": "${you} need to pay for this encounter",
	"type": "activeplayer",
	"action": "stEncounterStopPay",
	"possibleactions": [
		"acceptToPay",
		"cancel",
		"zombiePass"
	],
	"transitions": {
		"kitoushi": 103,
		"paid": 10,
		"declined": 2,
		"zombiePass": 2
	},
	"args": "argEncounterStopPay"
}
					*/
					break;
				case "encounterStopKitoushi":
					/*
					{
	"name": "encounterStopKitoushi",
	"description": "${actplayer} can choose a free panorama",
	"descriptionmyturn": "${you} can choose a free panorama",
	"type": "activeplayer",
	"action": "stEncounterStopKitoushi",
	"possibleactions": [
		"selectPanorama",
		"cancel",
		"zombiePass"
	],
	"transitions": {
		"done": 2,
		"doneAtInn": 11,
		"zombiePass": 2
	},
	"args": "argEncounterStopPanoramaChoice"
}
					*/
					break;
				case "encounterStopPanoramaChoice":
					/*
					{
	"name": "encounterStopPanoramaChoice",
	"description": "${actplayer} can choose a free panorama",
	"descriptionmyturn": "${you} can choose a free panorama",
	"type": "activeplayer",
	"possibleactions": [
		"selectPanorama",
		"cancel",
		"zombiePass"
	],
	"transitions": {
		"done": 2,
		"doneAtInn": 11,
		"zombiePass": 2
	},
	"args": "argEncounterStopPanoramaChoice"
}
					*/
					break;
				case "calligraphyStop":
					/*
					{
	"name": "calligraphyStop",
	"description": "${actplayer} can purchase a Calligraphy",
	"descriptionmyturn": "${you} can purchase a Calligraphy",
	"type": "activeplayer",
	"action": "stCalligraphyStop",
	"possibleactions": [
		"selectCalligraphy",
		"cancel",
		"zombiePass"
	],
	"transitions": {
		"done": 2,
		"zombiePass": 2
	},
	"args": "argCalligraphyStop"
}
					*/
					break;
				case "innStopSatsuki":
					/*
					{
	"name": "innStopSatsuki",
	"description": "${actplayer} can get a free meal",
	"descriptionmyturn": "${you} can get a free meal",
	"type": "activeplayer",
	"possibleactions": [
		"acceptMeal",
		"cancel",
		"zombiePass"
	],
	"transitions": {
		"done": 2,
		"cancel": 11,
		"endGame": 98,
		"zombiePass": 2
	},
	"args": "argInnStopSatsuki"
}
					*/
					break;
				case "innStopHiroshige":
					/*
					{
	"name": "innStopHiroshige",
	"description": "${actplayer} can choose a free panorama",
	"descriptionmyturn": "${you} can choose a free panorama",
	"type": "activeplayer",
	"possibleactions": [
		"selectPanorama",
		"cancel",
		"zombiePass"
	],
	"transitions": {
		"doneAtInn": 11,
		"zombiePass": 2
	},
	"args": "argInnStopHiroshige"
}
					*/
					break;
				case "innStopChuubeiPay":
					/*
					{
	"name": "innStopChuubeiPay",
	"description": "${actplayer} needs to pay for an encounter",
	"descriptionmyturn": "${you} need to pay for this encounter",
	"type": "activeplayer",
	"action": "stEncounterStopPay",
	"possibleactions": [
		"acceptToPay",
		"cancel",
		"zombiePass"
	],
	"transitions": {
		"kitoushi": 103,
		"paid": 114,
		"declined": 11,
		"zombiePass": 2
	},
	"args": "argEncounterStopPay"
}
					*/
					break;
				case "innStopChuubei":
					/*
					{
	"name": "innStopChuubei",
	"description": "${actplayer} makes an encounter",
	"descriptionmyturn": "",
	"type": "game",
	"action": "stEncounterStop",
	"possibleactions": [
		""
	],
	"transitions": {
		"done": 11,
		"panoramaChoice": 104
	}
}
					*/
					break;
				case "innStopJirocho":
					/*
					{
	"name": "innStopJirocho",
	"description": "${actplayer} can bet one coin and throw the Fortune Die",
	"descriptionmyturn": "${you} can bet one coin and throw the Fortune Die",
	"type": "activeplayer",
	"possibleactions": [
		"bet",
		"cancel",
		"zombiePass"
	],
	"transitions": {
		"done": 11,
		"zombiePass": 2
	}
}
					*/
					break;
				case "innStopDaigoro":
					/*
					{
	"name": "innStopDaigoro",
	"description": "${actplayer} gets a free Souvenir",
	"descriptionmyturn": "",
	"type": "game",
	"action": "stInnStopDaigoro",
	"possibleactions": [
		""
	],
	"transitions": {
		"done": 11
	}
}
					*/
					break;
				case "gameMultiplayerChooseTraveler":
					/*
					{
	"name": "gameMultiplayerChooseTraveler",
	"description": "",
	"type": "game",
	"action": "stGameMultiplayerChooseTraveler",
	"transitions": {
		"choice": 21,
		"nochoice": 22
	}
}
					*/
					break;
				case "gameEnd":
					data.state = "Viewing game results";
					break;
			}
		} else data.state = `Waiting for ${activePlayerData.name}`;
		return data;
	},
};
export default tokaido;
