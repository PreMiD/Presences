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

const paniclab: GamePresence = {
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
		"": 19
	}
}
					*/
					break;
				case "PressReady":
					/*
					{
	"name": "PressReady",
	"description": "Press Ready when you are",
	"descriptionmyturn": "Press Ready when you are",
	"type": "multipleactiveplayer",
	"action": "stCheckAllReady",
	"possibleactions": [
		"ReadyPressed"
	],
	"transitions": {
		"normal": 20,
		"zombiePass": 19
	}
}
					*/
					break;
				case "readyTurn":
					/*
					{
	"name": "readyTurn",
	"description": "${actplayer} ROLLS THE DICE",
	"descriptionmyturn": "${you} ROLL THE DICE",
	"type": "activeplayer",
	"action": "stShowRoll",
	"possibleactions": [
		"Rolling"
	],
	"transitions": {
		"normal": 21,
		"zombiePass": 23
	}
}
					*/
					break;
				case "rolldice":
					/*
					{
	"name": "rolldice",
	"description": "${actplayer} ROLLS THE DICE",
	"descriptionmyturn": "${you} ROLL THE DICE",
	"type": "activeplayer",
	"possibleactions": [
		"RollDice"
	],
	"transitions": {
		"normal": 22,
		"zombiePass": 23
	}
}
					*/
					break;
				case "ChkSolution":
					/*
					{
	"name": "ChkSolution",
	"description": "find the Amoeba and click on it",
	"descriptionmyturn": "find the Amoeba and click on it",
	"type": "multipleactiveplayer",
	"possibleactions": [
		"CheckSolution"
	],
	"transitions": {
		"backtoready": 23,
		"endGame": 99,
		"stayhere": 22
	}
}
					*/
					break;
				case "backtoready":
					/*
					{
	"name": "backtoready",
	"description": "",
	"descriptionmyturn": "",
	"type": "game",
	"action": "stBackToReady",
	"transitions": {
		"": 19
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
export default paniclab;
