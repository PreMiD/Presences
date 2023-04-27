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

const cephalopod: GamePresence = {
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
				case "selectSquare":
					/*
					{
	"name": "selectSquare",
	"description": "${actplayer} must select a square.",
	"descriptionmyturn": "${you} must select a square.",
	"type": "activeplayer",
	"args": "argSelectSquare",
	"possibleactions": [
		"selectSquare"
	],
	"transitions": {
		"selectDeterminingSquare": 6,
		"selectNonDeterminingSquare": 3
	}
}
					*/
					break;
				case "selectDie":
					/*
					{
	"name": "selectDie",
	"description": "${actplayer} must select a die.",
	"descriptionmyturn": "${you} must select a die.",
	"type": "activeplayer",
	"args": "argSelectDie",
	"possibleactions": [
		"selectDie",
		"unselectAll"
	],
	"transitions": {
		"selectDeterminingDie": 6,
		"selectFirstDie": 3,
		"selectPossibleFinalDie": 4,
		"unselectAll": 2
	}
}
					*/
					break;
				case "finalizeThisCombination":
					/*
					{
	"name": "finalizeThisCombination",
	"description": "${actplayer} must finalize their turn or select a die.",
	"descriptionmyturn": "${you} must finalize your turn or select a die.",
	"type": "activeplayer",
	"args": "argSelectDie",
	"possibleactions": [
		"selectDie",
		"finalize",
		"unselectAll"
	],
	"transitions": {
		"finalizeThisCombination": 6,
		"selectDeterminingDie": 6,
		"selectPossibleFinalDie": 4,
		"unselectAll": 2
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
		"nextTurn": 2,
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
export default cephalopod;
