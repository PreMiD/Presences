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

const impasse: GamePresence = {
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
				case "selectOrigin":
					/*
					{
	"name": "selectOrigin",
	"description": "${actplayer} must select a stack of one or two checkers.",
	"descriptionmyturn": "${you} must select a stack of one or two checkers.",
	"type": "activeplayer",
	"args": "argSelectOrigin",
	"possibleactions": [
		"selectOrigin"
	],
	"transitions": {
		"selectOrigin": 3,
		"bearOff": 6,
		"zombiePass": 6,
		"endGame": 99
	}
}
					*/
					break;
				case "selectDestination":
					/*
					{
	"name": "selectDestination",
	"description": "${actplayer} must select a destination.",
	"descriptionmyturn": "${you} must select a destination.",
	"type": "activeplayer",
	"args": "argSelectDestination",
	"possibleactions": [
		"selectDestination",
		"unselectOrigin"
	],
	"transitions": {
		"selectDestination": 6,
		"selectCrownableDestination": 4,
		"selectCrownableDestNoCrownsAvailable": 6,
		"unselectOrigin": 2,
		"zombiePass": 6,
		"endGame": 99
	}
}
					*/
					break;
				case "selectCrown":
					/*
					{
	"name": "selectCrown",
	"description": "${actplayer} must select a crown.",
	"descriptionmyturn": "${you} must select a crown.",
	"type": "activeplayer",
	"args": "argSelectCrown",
	"possibleactions": [
		"selectCrown"
	],
	"transitions": {
		"selectCrown": 6,
		"zombiePass": 6,
		"endGame": 99
	}
}
					*/
					break;
				case "removeImpasseChecker":
					/*
					{
	"name": "removeImpasseChecker",
	"description": "Impasse. ${actplayer} must remove a checker.",
	"descriptionmyturn": "Impasse. ${you} must remove a checker.",
	"type": "activeplayer",
	"args": "argRemoveImpasseChecker",
	"possibleactions": [
		"removeImpasseChecker"
	],
	"transitions": {
		"removeImpasseChecker": 6,
		"removeImpasseChecker_createUncrowned": 4,
		"removeImpasseChecker_createUncrowned_noCrownsAvailable": 6,
		"zombiePass": 6,
		"endGame": 99
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
		"movesAvailable": 2,
		"noMovesAvailable": 5,
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
export default impasse;
