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

const cubosaurs: GamePresence = {
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
				case "newRound":
					/*
					{
	"name": "newRound",
	"type": "game",
	"action": "stNewRound",
	"updateGameProgression": false,
	"transitions": {
		"drawFirstCard": 20
	}
}
					*/
					break;
				case "drawCard":
					/*
					{
	"name": "drawCard",
	"type": "game",
	"action": "stDrawCard",
	"transitions": {
		"mainChoice": 30
	}
}
					*/
					break;
				case "mainAction":
					/*
					{
	"name": "mainAction",
	"description": "${actplayer} must play",
	"descriptionmyturn": "${you} must accept the hand or decline by adding a card",
	"type": "activeplayer",
	"args": "argPossibleCards",
	"possibleactions": [
		"acceptHand",
		"giveCard",
		"buyTile"
	],
	"transitions": {
		"handAccepted": 32,
		"timerDNA": 34,
		"emptyDNA": 33,
		"cardAdded": 31,
		"tileSelected": 40,
		"zombiePass": 32
	}
}
					*/
					break;
				case "confirmation":
					/*
					{
	"name": "confirmation",
	"description": "${actplayer} must confirm",
	"descriptionmyturn": "Confirm your choice ?",
	"type": "activeplayer",
	"possibleactions": [
		"cancel",
		"confirm"
	],
	"transitions": {
		"resume": 30,
		"nextPlayer": 32,
		"timerDNA": 34,
		"zombiePass": 32
	}
}
					*/
					break;
				case "nextPlayer":
					/*
					{
	"name": "nextPlayer",
	"type": "game",
	"action": "stNextPlayer",
	"updateGameProgression": true,
	"transitions": {
		"emptyHand": 20,
		"gift": 30,
		"endRound": 50
	}
}
					*/
					break;
				case "dnaSteal":
					/*
					{
	"name": "dnaSteal",
	"description": "${actplayer} steals DNA",
	"descriptionmyturn": "${you} have to steal DNA",
	"type": "activeplayer",
	"args": "argSteal",
	"possibleactions": [
		"dnaOk"
	],
	"transitions": {
		"nextPlayer": 32,
		"timerDNA": 34,
		"zombiePass": 32
	}
}
					*/
					break;
				case "DNAtimer":
					/*
					{
	"name": "DNAtimer",
	"description": "${actplayer} can play a DNA Evolution tile",
	"descriptionmyturn": "${you} can play a DNA Evolution tile",
	"type": "activeplayer",
	"args": "argPossibleTiles",
	"action": "stRefreshScores",
	"possibleactions": [
		"pass",
		"play",
		"buyTile"
	],
	"transitions": {
		"choose": 35,
		"nextPlayer": 32,
		"tileSelected": 40,
		"zombiePass": 32
	}
}
					*/
					break;
				case "chooseTile":
					/*
					{
	"name": "chooseTile",
	"description": "${actplayer} can play a DNA Evolution tile",
	"descriptionmyturn": "${you} can play a DNA Evolution tile",
	"type": "activeplayer",
	"args": "argPossibleTiles",
	"possibleactions": [
		"pass",
		"buyTile"
	],
	"transitions": {
		"nextPlayer": 32,
		"tileSelected": 40,
		"zombiePass": 32
	}
}
					*/
					break;
				case "dnaEffect":
					/*
					{
	"name": "dnaEffect",
	"description": "${actplayer} buy a DNA Evolution tile",
	"descriptionmyturn": "DNA Evolution tile",
	"type": "activeplayer",
	"args": "argSelection",
	"possibleactions": [
		"cancelTile",
		"confirmTile"
	],
	"transitions": {
		"resume": 30,
		"resumeChoose": 35,
		"nextPlayer": 32,
		"zombiePass": 32
	}
}
					*/
					break;
				case "endOfRound":
					/*
					{
	"name": "endOfRound",
	"type": "game",
	"description": "Computing scores",
	"action": "stEndRound",
	"updateGameProgression": true,
	"transitions": {
		"wait": 51,
		"endGame": 99
	}
}
					*/
					break;
				case "waitNextRound":
					/*
					{
	"name": "waitNextRound",
	"type": "multipleactiveplayer",
	"description": "Others are looking at the end of round scores",
	"descriptionmyturn": "Look at the end of round scores",
	"action": "stMultiPlayerWait",
	"possibleactions": [
		"nextRound"
	],
	"updateGameProgression": false,
	"transitions": {
		"nextRound": 10
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
export default cubosaurs;
