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

const dragonwood: GamePresence = {
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
	"description": "",
	"type": "manager",
	"action": "stGameSetup",
	"transitions": {
		"": 2
	}
}
					*/
					break;
				case "startGame":
					/*
					{
	"name": "startGame",
	"description": "",
	"type": "game",
	"action": "stStartGame",
	"updateGameProgression": true,
	"transitions": {
		"": 10
	}
}
					*/
					break;
				case "playerTurn":
					/*
					{
	"name": "playerTurn",
	"description": "${actplayer} must attempt a capture or reload",
	"descriptionmyturn": "${you} must select a Landscape card and Adventurers/Enhancements to attempt a capture or reload",
	"type": "activeplayer",
	"action": "stPlayerTurn",
	"possibleactions": [
		"attemptCapture",
		"reload"
	],
	"updateGameProgression": true,
	"transitions": {
		"nextPlayer": 40,
		"discardAdventurer": 30,
		"quicksand": 26,
		"sunnyDay": 20,
		"thunderStorm": 22,
		"windStorm": 23,
		"myEndGame": 90
	}
}
					*/
					break;
				case "sunnyDay":
					/*
					{
	"name": "sunnyDay",
	"description": "Sunny day! Other players must acknowledge.",
	"descriptionmyturn": "Sunny day! All players are to draw 2 cards.",
	"type": "multipleactiveplayer",
	"action": "stSunnyDay",
	"possibleactions": [
		"ackSunnyDay"
	],
	"transitions": {
		"sunnyDayEnd": 21
	}
}
					*/
					break;
				case "sunnyDayEnd":
					/*
					{
	"name": "sunnyDayEnd",
	"description": "Sunny day! All players draw 2 cards.",
	"descriptionmyturn": "Sunny day! All players draw 2 cards.",
	"type": "game",
	"action": "stSunnyDayEnd",
	"transitions": {
		"eventEnd": 25,
		"discardAdventurerMP": 31
	}
}
					*/
					break;
				case "thunderStorm":
					/*
					{
	"name": "thunderStorm",
	"description": "Thunder storm! Other players must discard 1 Adventurer card.",
	"descriptionmyturn": "Thunder storm! ${you} must discard 1 Adventurer card.",
	"type": "multipleactiveplayer",
	"action": "stThunderStorm",
	"possibleactions": [
		"discardAdventurer"
	],
	"transitions": {
		"eventEnd": 25
	}
}
					*/
					break;
				case "windStorm":
					/*
					{
	"name": "windStorm",
	"description": "Wind storm! Other players must pass 1 Adventurer card to the right.",
	"descriptionmyturn": "Wind storm! ${you} must pass 1 Adventurer card to the right.",
	"type": "multipleactiveplayer",
	"action": "stWindStorm",
	"possibleactions": [
		"passAdventurer"
	],
	"transitions": {
		"windStormEnd": 24
	}
}
					*/
					break;
				case "windStormEnd":
					/*
					{
	"name": "windStormEnd",
	"description": "",
	"type": "game",
	"action": "stWindStormEnd",
	"transitions": {
		"eventEnd": 25
	}
}
					*/
					break;
				case "eventEnd":
					/*
					{
	"name": "eventEnd",
	"description": "",
	"type": "game",
	"action": "stEventEnd",
	"transitions": {
		"nextPlayer": 40,
		"quicksand": 26,
		"sunnyDay": 20,
		"thunderStorm": 22,
		"windStorm": 23
	}
}
					*/
					break;
				case "quicksand":
					/*
					{
	"name": "quicksand",
	"description": "Quicksand! Other players must acknowledge.",
	"descriptionmyturn": "Quicksand! All Enhancements are to be removed from the Landscape and replaced with new cards.",
	"type": "multipleactiveplayer",
	"action": "stQuicksand",
	"possibleactions": [
		"ackQuicksand"
	],
	"transitions": {
		"quicksandEnd": 27
	}
}
					*/
					break;
				case "quicksandEnd":
					/*
					{
	"name": "quicksandEnd",
	"description": "Quicksand! All Enhancements are being removed from the Landscape and replaced with new cards.",
	"descriptionmyturn": "Quicksand! All Enhancements are being removed from the Landscape and replaced with new cards.",
	"type": "game",
	"action": "stQuicksandEnd",
	"transitions": {
		"eventEnd": 25,
		"sunnyDay": 20,
		"thunderStorm": 22,
		"windStorm": 23
	}
}
					*/
					break;
				case "discardAdventurer":
					/*
					{
	"name": "discardAdventurer",
	"description": "${actplayer} must discard Adventurers",
	"descriptionmyturn": "${you} must discard ${nbr} Adventurer(s)",
	"type": "activeplayer",
	"args": "argDiscardAdventurer",
	"possibleactions": [
		"discardAdventurer"
	],
	"transitions": {
		"nextPlayer": 40,
		"discardAdventurer": 30
	}
}
					*/
					break;
				case "discardAdventurerMP":
					/*
					{
	"name": "discardAdventurerMP",
	"description": "Other players must discard Adventurers",
	"descriptionmyturn": "${you} must discard ${nbr} Adventurer(s)",
	"type": "multipleactiveplayer",
	"args": "argDiscardAdventurer",
	"action": "stDiscardAdventurerMP",
	"possibleactions": [
		"discardAdventurer"
	],
	"transitions": {
		"discardAdventurerMP": 31,
		"eventEnd": 25
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
	"transitions": {
		"nextPlayer": 10,
		"myEndGame": 90
	}
}
					*/
					break;
				case "myGameEnd":
					/*
					{
	"name": "myGameEnd",
	"description": "End of game",
	"type": "game",
	"action": "stMyGameEnd",
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
export default dragonwood;
