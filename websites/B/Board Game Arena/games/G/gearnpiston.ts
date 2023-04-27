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

const gearnpiston: GamePresence = {
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
		"": 2
	}
}
					*/
					break;
				case "refreshParts":
					/*
					{
	"name": "refreshParts",
	"description": "",
	"type": "manager",
	"action": "stRefreshParts",
	"updateGameProgression": true,
	"transitions": {
		"planAction": 3,
		"gameEnding": 90
	}
}
					*/
					break;
				case "planAction":
					/*
					{
	"name": "planAction",
	"description": "",
	"type": "manager",
	"action": "stPlanAction",
	"transitions": {
		"chooseAction": 4,
		"canDiscard": 5
	}
}
					*/
					break;
				case "chooseAction":
					/*
					{
	"name": "chooseAction",
	"description": "${actplayer} must place a token",
	"descriptionmyturn": "${you} must place a token",
	"type": "activeplayer",
	"possibleactions": [
		"chooseAction"
	],
	"transitions": {
		"chooseAction": 3,
		"zombiePass": 3
	}
}
					*/
					break;
				case "canDiscard":
					/*
					{
	"name": "canDiscard",
	"description": "",
	"type": "manager",
	"action": "stCanDiscard",
	"transitions": {
		"discardPart": 6,
		"nextStep": 9
	}
}
					*/
					break;
				case "discardPart":
					/*
					{
	"name": "discardPart",
	"description": "${actplayer} can discard a Blueprint or pass",
	"descriptionmyturn": "${you} can discard a Blueprint or ",
	"type": "activeplayer",
	"possibleactions": [
		"discardPart",
		"pass"
	],
	"transitions": {
		"nextDiscard": 5,
		"zombiePass": 5
	}
}
					*/
					break;
				case "backAlleyToSupply":
					/*
					{
	"name": "backAlleyToSupply",
	"description": "",
	"type": "manager",
	"action": "stBackAlleyToSupply",
	"transitions": {
		"": 10
	}
}
					*/
					break;
				case "backAlley":
					/*
					{
	"name": "backAlley",
	"description": "",
	"type": "manager",
	"action": "stBackAlley",
	"transitions": {
		"chooseBackAlleyAction": 11,
		"noBackAlley": 10,
		"blackMarket": 13,
		"espionage": 18,
		"unionMuscle": 23,
		"nextArea": 30
	}
}
					*/
					break;
				case "chooseBackAlleyAction":
					/*
					{
	"name": "chooseBackAlleyAction",
	"description": "${actplayer} must choose a Back Alley action",
	"descriptionmyturn": "${you} must choose a Back Alley action: ",
	"type": "activeplayer",
	"args": "argBackAlleyActions",
	"possibleactions": [
		"blackMarket",
		"espionage",
		"unionMuscle"
	],
	"transitions": {
		"blackMarket": 13,
		"espionage": 18,
		"unionMuscle": 23,
		"zombiePass": 10
	}
}
					*/
					break;
				case "blackMarket":
					/*
					{
	"name": "blackMarket",
	"description": "",
	"type": "manager",
	"action": "stBlackMarket",
	"transitions": {
		"pickPart": 14,
		"autoPickPart": 10
	}
}
					*/
					break;
				case "pickBlackMarketPart":
					/*
					{
	"name": "pickBlackMarketPart",
	"description": "${actplayer} must pick a New Part tile from the Black Market",
	"descriptionmyturn": "${you} must pick a New Part tile from the Black Market",
	"type": "activeplayer",
	"possibleactions": [
		"chosenBlackMarket"
	],
	"transitions": {
		"topOrBottom": 15,
		"noCardLeft": 10,
		"zombiePass": 10
	}
}
					*/
					break;
				case "topOrBottom":
					/*
					{
	"name": "topOrBottom",
	"description": "${actplayer} must put New Part tiles back on the top or bottom of the New Part stack",
	"descriptionmyturn": "${you} must put New Part tiles back on the top or bottom of the New Part stack",
	"type": "activeplayer",
	"possibleactions": [
		"topOrBottom"
	],
	"transitions": {
		"topOrBottom": 10,
		"zombiePass": 10
	}
}
					*/
					break;
				case "espionage":
					/*
					{
	"name": "espionage",
	"description": "",
	"type": "manager",
	"action": "stEspionage",
	"transitions": {
		"choosePlayer": 19,
		"onlyOnePlayer": 20,
		"onePlayerOnePart": 10
	}
}
					*/
					break;
				case "choosePlayer":
					/*
					{
	"name": "choosePlayer",
	"description": "${actplayer} must choose a player to take a Blueprint from",
	"descriptionmyturn": "${you} must choose a player to take a Blueprint from",
	"type": "activeplayer",
	"possibleactions": [
		"choosePlayer"
	],
	"transitions": {
		"pickPlayerPart": 20,
		"pickOnlyPart": 10,
		"zombiePass": 10
	}
}
					*/
					break;
				case "pickPlayerPart":
					/*
					{
	"name": "pickPlayerPart",
	"description": "${actplayer} must pick a Blueprint",
	"descriptionmyturn": "${you} must pick a Blueprint",
	"type": "activeplayer",
	"possibleactions": [
		"pickPlayerPart"
	],
	"transitions": {
		"pickPlayerPart": 10,
		"zombiePass": 10
	}
}
					*/
					break;
				case "unionMuscle":
					/*
					{
	"name": "unionMuscle",
	"description": "",
	"type": "manager",
	"action": "stUnionMuscle",
	"transitions": {
		"choose": 24,
		"autoChoose": 25,
		"autoChooseMove": 10
	}
}
					*/
					break;
				case "chooseToken":
					/*
					{
	"name": "chooseToken",
	"description": "${actplayer} must choose a token to move",
	"descriptionmyturn": "${you} must choose a token to move",
	"type": "activeplayer",
	"args": "argMovableTokens",
	"possibleactions": [
		"chooseToken"
	],
	"transitions": {
		"move": 25,
		"autoMove": 10,
		"zombiePass": 10
	}
}
					*/
					break;
				case "tokenDestination":
					/*
					{
	"name": "tokenDestination",
	"description": "${actplayer} must choose where to move the token",
	"descriptionmyturn": "${you} must choose where to move the token",
	"type": "activeplayer",
	"args": "argTokenDestinations",
	"possibleactions": [
		"tokenDestination"
	],
	"transitions": {
		"tokenDestination": 10,
		"zombiePass": 10
	}
}
					*/
					break;
				case "patentOffice":
					/*
					{
	"name": "patentOffice",
	"description": "",
	"type": "manager",
	"action": "stPatentOffice",
	"transitions": {
		"noAction": 30,
		"pickNewPart": 31,
		"nextArea": 40
	}
}
					*/
					break;
				case "pickNewPart":
					/*
					{
	"name": "pickNewPart",
	"description": "${actplayer} must pick a New Part tile",
	"descriptionmyturn": "${you} must pick a New Part tile",
	"type": "activeplayer",
	"possibleactions": [
		"pickNewPart"
	],
	"updateGameProgression": true,
	"transitions": {
		"patentOffice": 30,
		"zombiePass": 30
	}
}
					*/
					break;
				case "junkYard":
					/*
					{
	"name": "junkYard",
	"description": "",
	"type": "manager",
	"action": "stJunkYard",
	"transitions": {
		"noAction": 40,
		"pickJunkPart": 41,
		"nextArea": 50
	}
}
					*/
					break;
				case "pickJunkPart":
					/*
					{
	"name": "pickJunkPart",
	"description": "${general_description}",
	"descriptionmyturn": "${personal_description}",
	"type": "activeplayer",
	"args": "argPickJunkPart",
	"possibleactions": [
		"pickJunkPart",
		"donePicking"
	],
	"updateGameProgression": true,
	"transitions": {
		"pickJunkPart": 41,
		"junkYard": 40,
		"zombiePass": 40
	}
}
					*/
					break;
				case "workshop":
					/*
					{
	"name": "workshop",
	"description": "Waiting for other players in the workshop...",
	"descriptionmyturn": "${you} can perform actions at the workshop",
	"type": "multipleactiveplayer",
	"action": "stWorkshop",
	"possibleactions": [
		"workshopAction",
		"undo",
		"doneWorkshop",
		"editAction"
	],
	"transitions": {
		"workshopEnd": 51,
		"nextArea": 2,
		"zombiePass": 51
	}
}
					*/
					break;
				case "workshopEnd":
					/*
					{
	"name": "workshopEnd",
	"description": "",
	"type": "manager",
	"action": "stWorkshopEnd",
	"transitions": {
		"nextTurn": 2
	}
}
					*/
					break;
				case "assembling":
					/*
					{
	"name": "assembling",
	"description": "Waiting for other players to assemble their sections before the end...",
	"descriptionmyturn": "${you} must assemble your sections to complete your automobile before the end",
	"type": "multipleactiveplayer",
	"action": "stAssembling",
	"possibleactions": [
		"editAction",
		"lastAssemble"
	],
	"transitions": {
		"assemblingDone": 91,
		"zombiePass": 91
	}
}
					*/
					break;
				case "scrap":
					/*
					{
	"name": "scrap",
	"description": "Waiting for other players to add Scrap Part tiles...",
	"descriptionmyturn": "${you} must add Scrap Part tiles to make your automobile functional.",
	"type": "multipleactiveplayer",
	"action": "stScrap",
	"possibleactions": [
		"undoAll",
		"addScrap"
	],
	"transitions": {
		"scrapDone": 98,
		"zombiePass": 98
	}
}
					*/
					break;
				case "scores":
					/*
					{
	"name": "scores",
	"description": "",
	"descriptionmyturn": "",
	"type": "manager",
	"args": "argScores",
	"action": "stScores",
	"transitions": {
		"endGame": 99
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
				case "gameEnd":
					data.state = "Viewing game results";
					break;
			}
		} else data.state = `Waiting for ${activePlayerData.name}`;
		return data;
	},
};
export default gearnpiston;
