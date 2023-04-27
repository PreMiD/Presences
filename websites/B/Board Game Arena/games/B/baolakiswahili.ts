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

const baolakiswahili: GamePresence = {
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
				case "variantSelect":
					/*
					{
	"name": "variantSelect",
	"description": "",
	"type": "game",
	"action": "stVariantSelect",
	"transitions": {
		"playKiswahili": 10,
		"playKujifunza": 20,
		"playHus": 30,
		"startEditing": 3,
		"switchPhase": 20,
		"endGame": 99
	}
}
					*/
					break;
				case "gameEdit":
					/*
					{
	"name": "gameEdit",
	"description": "${actplayer} edits board for both players (agree on start constellation via chat or audio)",
	"descriptionmyturn": "${you} must edit board for both players (agree on start constellation via chat or audio)",
	"type": "activeplayer",
	"possibleactions": [
		"edit"
	],
	"transitions": {
		"stopEditing": 2,
		"switchPlayer": 4
	}
}
					*/
					break;
				case "editSwitch":
					/*
					{
	"name": "editSwitch",
	"type": "game",
	"action": "stEditSwitch",
	"transitions": {
		"nextPlayer": 3
	}
}
					*/
					break;
				case "kunamuaMoveSelection":
					/*
					{
	"name": "kunamuaMoveSelection",
	"description": "${actplayer} must place seed and make ${type_translated} move",
	"descriptionmyturn": "${you} must place seed for ${type_translated} move",
	"type": "activeplayer",
	"args": "argKunamuaMoveSelection",
	"possibleactions": [
		"executeMove"
	],
	"transitions": {
		"executeMove": 11,
		"zombiePass": 11
	}
}
					*/
					break;
				case "kunamuaMoveExecution":
					/*
					{
	"name": "kunamuaMoveExecution",
	"description": "Move of ${actplayer} gets executed",
	"descriptionmyturn": "Your move gets executed",
	"type": "game",
	"action": "stNextPlayer",
	"updateGameProgression": true,
	"transitions": {
		"nextPlayer": 10,
		"continueCapture": 12,
		"decideSafari": 13,
		"switchPhase": 20,
		"endGame": 99
	}
}
					*/
					break;
				case "kunamuaCaptureSelection":
					/*
					{
	"name": "kunamuaCaptureSelection",
	"description": "${actplayer} must select kichwa",
	"descriptionmyturn": "${you} must select kichwa",
	"type": "activeplayer",
	"args": "argCaptureSelection",
	"possibleactions": [
		"selectKichwa"
	],
	"transitions": {
		"executeMove": 11,
		"zombiePass": 11
	}
}
					*/
					break;
				case "safariDecision":
					/*
					{
	"name": "safariDecision",
	"description": "${actplayer} must decide about safari",
	"descriptionmyturn": "${you} must decide about safari",
	"type": "activeplayer",
	"args": "argSafariDecision",
	"possibleactions": [
		"decideSafari"
	],
	"transitions": {
		"executeMove": 11,
		"zombiePass": 11
	}
}
					*/
					break;
				case "mtajiMoveSelection":
					/*
					{
	"name": "mtajiMoveSelection",
	"description": "${actplayer} must make ${type_translated} move",
	"descriptionmyturn": "${you} must select pit for ${type_translated} move",
	"type": "activeplayer",
	"args": "argMtajiMoveSelection",
	"possibleactions": [
		"executeMove"
	],
	"transitions": {
		"executeMove": 21,
		"zombiePass": 21
	}
}
					*/
					break;
				case "mtajiMoveExecution":
					/*
					{
	"name": "mtajiMoveExecution",
	"description": "Move of ${actplayer} gets executed",
	"descriptionmyturn": "Your move gets executed",
	"type": "game",
	"action": "stNextPlayer",
	"updateGameProgression": true,
	"transitions": {
		"nextPlayer": 20,
		"continueCapture": 22,
		"endGame": 99
	}
}
					*/
					break;
				case "mtajiCaptureSelection":
					/*
					{
	"name": "mtajiCaptureSelection",
	"description": "${actplayer} must select kichwa",
	"descriptionmyturn": "${you} must select kichwa",
	"type": "activeplayer",
	"args": "argCaptureSelection",
	"possibleactions": [
		"selectKichwa"
	],
	"transitions": {
		"executeMove": 21,
		"zombiePass": 21
	}
}
					*/
					break;
				case "husMoveSelection":
					/*
					{
	"name": "husMoveSelection",
	"description": "${actplayer} must make a move",
	"descriptionmyturn": "${you} must select a pit",
	"type": "activeplayer",
	"args": "argHusMoveSelection",
	"possibleactions": [
		"executeMove"
	],
	"transitions": {
		"executeMove": 31,
		"zombiePass": 31
	}
}
					*/
					break;
				case "husMoveExecution":
					/*
					{
	"name": "husMoveExecution",
	"description": "Move of ${actplayer} gets executed",
	"descriptionmyturn": "Your move gets executed",
	"type": "game",
	"action": "stNextPlayer",
	"updateGameProgression": true,
	"transitions": {
		"nextPlayer": 30,
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
export default baolakiswahili;
