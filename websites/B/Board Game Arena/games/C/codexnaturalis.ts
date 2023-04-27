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

const codexnaturalis: GamePresence = {
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
		"pickStarterCardSide": 2
	}
}
					*/
					break;
				case "pickStarterCardSide":
					/*
					{
	"name": "pickStarterCardSide",
	"description": "Other players must choose their Starter card's side",
	"descriptionmyturn": "${you} must choose your Starter card's side",
	"type": "multipleactiveplayer",
	"action": "stPickStarterCardSide",
	"possibleactions": [
		"pickStarterCardSide"
	],
	"transitions": {
		"gameSetup2": 3
	}
}
					*/
					break;
				case "gameSetup2":
					/*
					{
	"name": "gameSetup2",
	"description": "",
	"type": "game",
	"action": "stGameSetup2",
	"transitions": {
		"pickSecretObjectiveCard": 4
	}
}
					*/
					break;
				case "pickSecretObjectiveCard":
					/*
					{
	"name": "pickSecretObjectiveCard",
	"description": "Other players must choose their secret Objective cards",
	"descriptionmyturn": "${you} must choose a secret Objective card",
	"type": "multipleactiveplayer",
	"action": "stPickSecretObjectiveCard",
	"possibleactions": [
		"pickSecretObjectiveCard"
	],
	"transitions": {
		"playerTurn": 5
	}
}
					*/
					break;
				case "playerTurn":
					/*
					{
	"name": "playerTurn",
	"description": "${actplayer} must play a card",
	"descriptionmyturn": "${you} must play a card from your hand",
	"type": "activeplayer",
	"args": "argPlayerTurn",
	"possibleactions": [
		"playCard"
	],
	"transitions": {
		"nextPlayer": 7,
		"drawCard": 6,
		"scoreFinalPoints": 95
	}
}
					*/
					break;
				case "drawCard":
					/*
					{
	"name": "drawCard",
	"description": "${actplayer} must draw a card",
	"descriptionmyturn": "${you} must draw a Resource or Gold card",
	"type": "activeplayer",
	"possibleactions": [
		"drawCard"
	],
	"transitions": {
		"nextPlayer": 7
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
		"playerTurn": 5
	},
	"updateGameProgression": true
}
					*/
					break;
				case "scoreFinalPoints":
					/*
					{
	"name": "scoreFinalPoints",
	"description": "Scoring objectives",
	"type": "game",
	"action": "stScoreFinalPoints",
	"transitions": {
		"gameEnd": 99
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
export default codexnaturalis;
