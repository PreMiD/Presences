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

const lamarcheducrabe: GamePresence = {
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
				case "generateLevel":
					/*
					{
	"name": "generateLevel",
	"description": "Going to the next beach...",
	"type": "game",
	"action": "stGenerateLevel",
	"transitions": {
		"": 3
	}
}
					*/
					break;
				case "placeBaddieCheck":
					/*
					{
	"name": "placeBaddieCheck",
	"description": "",
	"type": "game",
	"args": "argPlaceBaddieCheck",
	"action": "stPlaceBaddieCheck",
	"transitions": {
		"automatic": 5,
		"manual": 4,
		"endGame": 99
	}
}
					*/
					break;
				case "placeBaddie":
					/*
					{
	"name": "placeBaddie",
	"description": "${actplayer} must place a ${baddie_type} Baddie on the ${ordinal} row",
	"descriptionmyturn": "${you} must place a ${baddie_type} Baddie on the ${ordinal} row",
	"type": "activeplayer",
	"args": "argPlaceBaddie",
	"possibleactions": [
		"placeBaddie",
		"resignSelection"
	],
	"transitions": {
		"placeBaddie": 5,
		"resignSelection": 10,
		"zombiePass": 5
	}
}
					*/
					break;
				case "moveCheck":
					/*
					{
	"name": "moveCheck",
	"description": "",
	"type": "game",
	"action": "stMoveCheck",
	"transitions": {
		"movePossible": 6,
		"movePass": 7,
		"endGame": 99
	}
}
					*/
					break;
				case "moveTurn":
					/*
					{
	"name": "moveTurn",
	"description": "${actplayer} may move ${direction}",
	"descriptionmyturn": "${you} may move ${direction}",
	"type": "activeplayer",
	"args": "argMoveTurn",
	"possibleactions": [
		"moveCrab",
		"movePass",
		"resignSelection"
	],
	"transitions": {
		"endTurn": 7,
		"endLevel": 8,
		"resignSelection": 10,
		"endGame": 99,
		"zombiePass": 7
	}
}
					*/
					break;
				case "endTurn":
					/*
					{
	"name": "endTurn",
	"description": "",
	"type": "game",
	"action": "stEndTurn",
	"updateGameProgression": true,
	"transitions": {
		"": 3
	}
}
					*/
					break;
				case "endLevel":
					/*
					{
	"name": "endLevel",
	"description": "",
	"type": "game",
	"action": "stEndLevel",
	"transitions": {
		"continueSelection": 9,
		"autoContinue": 2,
		"endGame": 99
	}
}
					*/
					break;
				case "continueSelection":
					/*
					{
	"name": "continueSelection",
	"description": "All players may continue or stop the adventure",
	"descriptionmyturn": "${you} may continue or stop the adventure",
	"type": "multipleactiveplayer",
	"action": "stContinueInit",
	"possibleactions": [
		"continueAdventure",
		"stopAdventure"
	],
	"updateGameProgression": true,
	"transitions": {
		"continueAdventure": 2,
		"stopAdventure": 99
	}
}
					*/
					break;
				case "resignSelection":
					/*
					{
	"name": "resignSelection",
	"description": "All players may continue or end the adventure",
	"descriptionmyturn": "${you} may continue or end the adventure",
	"type": "multipleactiveplayer",
	"action": "stResignInit",
	"possibleactions": [
		"continueLevel",
		"resignAdventure"
	],
	"transitions": {
		"continueLevel": 11,
		"endGame": 99
	}
}
					*/
					break;
				case "returnToLevel":
					/*
					{
	"name": "returnToLevel",
	"description": "",
	"type": "game",
	"action": "stReturnToLevel",
	"transitions": {
		"continueLevelToPlaceBaddie": 4,
		"continueLevelToMoveTurn": 6
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
export default lamarcheducrabe;
