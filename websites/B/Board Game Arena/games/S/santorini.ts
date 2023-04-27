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

const santorini: GamePresence = {
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
		"": 10
	}
}
					*/
					break;
				case "nextPlayerPlaceWorker":
					/*
					{
	"name": "nextPlayerPlaceWorker",
	"description": "",
	"type": "game",
	"action": "stNextPlayerPlaceWorker",
	"transitions": {
		"zombiePass": 3,
		"next": 4,
		"ram": 41,
		"done": 5
	},
	"updateGameProgression": true
}
					*/
					break;
				case "playerPlaceWorker":
					/*
					{
	"name": "playerPlaceWorker",
	"description": "${actplayer} must place a worker",
	"descriptionmyturn": "${you} must place a worker",
	"type": "activeplayer",
	"args": "argPlaceWorker",
	"possibleactions": [
		"placeWorker"
	],
	"transitions": {
		"zombiePass": 3,
		"workerPlaced": 3
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
		"next": 5,
		"play": 16,
		"endgame": 98
	},
	"updateGameProgression": true
}
					*/
					break;
				case "playerMove":
					/*
					{
	"name": "playerMove",
	"description": "${actplayer} must move",
	"descriptionskippable": "${actplayer} may move",
	"descriptionmyturn": "${you} must move",
	"descriptionmyturnskippable": "${you} may move",
	"descriptioncannot": "${you} cannot move",
	"type": "activeplayer",
	"args": "argPlayerMove",
	"action": "stBeforeWork",
	"possibleactions": [
		"playerMove",
		"skip",
		"cancel",
		"resign"
	],
	"transitions": {
		"zombiePass": 19,
		"endturn": 19,
		"endgame": 98,
		"done": 7,
		"skip": 7,
		"cancel": 16,
		"move": 6,
		"power": 15,
		"eliminate": 20,
		"cancelTurn": 21
	}
}
					*/
					break;
				case "playerBuild":
					/*
					{
	"name": "playerBuild",
	"description": "${actplayer} must build",
	"descriptionskippable": "${actplayer} may build",
	"descriptionmyturn": "${you} must build",
	"descriptionmyturnskippable": "${you} may build",
	"descriptioncannot": "${you} cannot build",
	"type": "activeplayer",
	"args": "argPlayerBuild",
	"action": "stBeforeWork",
	"possibleactions": [
		"playerBuild",
		"skip",
		"cancel",
		"resign"
	],
	"transitions": {
		"zombiePass": 19,
		"endturn": 19,
		"endgame": 98,
		"done": 19,
		"skip": 19,
		"cancel": 16,
		"move": 6,
		"build": 7,
		"power": 15,
		"switch": 30,
		"eliminate": 20,
		"cancelTurn": 21
	}
}
					*/
					break;
				case "powersSetup":
					/*
					{
	"name": "powersSetup",
	"description": "",
	"type": "game",
	"action": "stPowersSetup",
	"transitions": {
		"placeWorker": 3,
		"offer": 12,
		"chooseFirstPlayer": 18
	}
}
					*/
					break;
				case "buildOffer":
					/*
					{
	"name": "buildOffer",
	"description": "${actplayer} must offer ${count} powers for selection",
	"descriptionmyturn": "${you} must offer ${count} powers for selection",
	"type": "activeplayer",
	"args": "argBuildOffer",
	"possibleactions": [
		"addOffer",
		"removeOffer",
		"confirmOffer"
	],
	"transitions": {
		"zombiePass": 98,
		"chooseFirstPlayer": 18,
		"goldenFleece": 13,
		"nyx": 66
	}
}
					*/
					break;
				case "powersNextPlayerChoose":
					/*
					{
	"name": "powersNextPlayerChoose",
	"description": "",
	"type": "game",
	"action": "stPowersNextPlayerChoose",
	"transitions": {
		"next": 14,
		"done": 33
	}
}
					*/
					break;
				case "powersPlayerChoose":
					/*
					{
	"name": "powersPlayerChoose",
	"description": "${actplayer} must choose a power",
	"descriptionmyturn": "${you} must choose a power",
	"type": "activeplayer",
	"args": "argChoosePower",
	"possibleactions": [
		"choosePower"
	],
	"transitions": {
		"zombiePass": 98,
		"done": 13
	}
}
					*/
					break;
				case "playerUsePower":
					/*
					{
	"name": "playerUsePower",
	"description": "${actplayer} must use ${power_name}'s power",
	"descriptionskippable": "${actplayer} may use ${power_name}'s power",
	"descriptionmyturn": "${you} must use ${power_name}'s power",
	"descriptionmyturnskippable": "${you} may use ${power_name}'s power",
	"descriptioncannot": "${you} cannot use ${power_name}'s power",
	"type": "activeplayer",
	"args": "argUsePower",
	"possibleactions": [
		"use",
		"skip",
		"cancel",
		"resign"
	],
	"transitions": {
		"cancel": 16,
		"move": 6,
		"build": 7,
		"power": 15,
		"switch": 30,
		"endturn": 19,
		"endgame": 98,
		"eliminate": 20
	}
}
					*/
					break;
				case "startOfTurn":
					/*
					{
	"name": "startOfTurn",
	"description": "",
	"type": "game",
	"action": "stStartOfTurn",
	"transitions": {
		"move": 6,
		"build": 7,
		"endgame": 98,
		"power": 15,
		"switch": 30,
		"eliminate": 20
	},
	"updateGameProgression": true
}
					*/
					break;
				case "endOfTurn":
					/*
					{
	"name": "endOfTurn",
	"description": "",
	"type": "game",
	"action": "stEndOfTurn",
	"transitions": {
		"additionalTurn": 16,
		"next": 5,
		"endgame": 98
	}
}
					*/
					break;
				case "chooseFirstPlayer":
					/*
					{
	"name": "chooseFirstPlayer",
	"description": "${actplayer} must choose which power will start (balanced suggestion: ${power_name})",
	"descriptionmyturn": "${you} must choose which power will start (balanced suggestion: ${power_name})",
	"type": "activeplayer",
	"args": "argChooseFirstPlayer",
	"action": "stChooseFirstPlayer",
	"possibleactions": [
		"chooseFirstPlayer"
	],
	"transitions": {
		"zombiePass": 98,
		"done": 13
	}
}
					*/
					break;
				case "confirmTurn":
					/*
					{
	"name": "confirmTurn",
	"description": "${actplayer} must confirm or restart their turn",
	"descriptionmyturn": "${you} must confirm or restart your turn",
	"type": "activeplayer",
	"action": "stPreEndOfTurn",
	"possibleactions": [
		"confirm",
		"cancel"
	],
	"transitions": {
		"zombiePass": 17,
		"endturn": 17,
		"confirm": 17,
		"cancel": 16,
		"eliminate": 20
	}
}
					*/
					break;
				case "eliminatePlayer":
					/*
					{
	"name": "eliminatePlayer",
	"description": "",
	"type": "game",
	"action": "stEliminatePlayer",
	"transitions": {
		"play": 16,
		"endgame": 98
	}
}
					*/
					break;
				case "cancelTurn":
					/*
					{
	"name": "cancelTurn",
	"description": "",
	"type": "game",
	"action": "stCancelTurn",
	"transitions": {
		"": 17
	}
}
					*/
					break;
				case "switchPlayer":
					/*
					{
	"name": "switchPlayer",
	"description": "",
	"type": "game",
	"action": "stSwitchPlayer",
	"transitions": {
		"zombiePass": 19,
		"endturn": 19,
		"endgame": 98,
		"cancel": 16,
		"move": 6,
		"build": 7,
		"power": 15,
		"eliminate": 20
	}
}
					*/
					break;
				case "nextPlayerPlaceSetup":
					/*
					{
	"name": "nextPlayerPlaceSetup",
	"description": "",
	"type": "game",
	"action": "stNextPlayerPlaceSetup",
	"transitions": {
		"zombiePass": 33,
		"next": 34,
		"skip": 33,
		"done": 3
	},
	"updateGameProgression": true
}
					*/
					break;
				case "playerPlaceSetup":
					/*
					{
	"name": "playerPlaceSetup",
	"description": "${actplayer} must perform his/her power setup",
	"descriptionmyturn": "${you} must perform your power setup",
	"type": "activeplayer",
	"args": "argPlaceSetup",
	"possibleactions": [
		"placeSetup"
	],
	"transitions": {
		"zombiePass": 33,
		"done": 33,
		"setup": 34
	}
}
					*/
					break;
				case "playerPlaceRam":
					/*
					{
	"name": "playerPlaceRam",
	"description": "${actplayer} must place the Ram figure",
	"descriptionmyturn": "${you} must place the Ram figure",
	"type": "activeplayer",
	"args": "argPlaceRam",
	"possibleactions": [
		"placeWorker"
	],
	"transitions": {
		"zombiePass": 98,
		"workerPlaced": 5
	}
}
					*/
					break;
				case "chooseNyxNightPower":
					/*
					{
	"name": "chooseNyxNightPower",
	"description": "${actplayer} must choose ${special_name}",
	"descriptionmyturn": "${you} must choose ${special_name}",
	"type": "activeplayer",
	"args": "argChooseNyxNightPower",
	"possibleactions": [
		"chooseNyxNightPower"
	],
	"transitions": {
		"zombiePass": 98,
		"chooseFirstPlayer": 18
	}
}
					*/
					break;
				case "gameEndStats":
					/*
					{
	"name": "gameEndStats",
	"description": "",
	"type": "game",
	"action": "stGameEndStats",
	"transitions": {
		"endgame": 99
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
export default santorini;
