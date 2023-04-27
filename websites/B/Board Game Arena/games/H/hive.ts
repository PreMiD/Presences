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

const hive: GamePresence = {
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
				case "playerTurn":
					/*
					{
	"name": "playerTurn",
	"description": "${actplayer} must place a piece on the table",
	"descriptionmyturn": "${you} must place a piece on the table",
	"type": "activeplayer",
	"args": "argPlayerTurn",
	"possibleactions": [
		"playToken",
		"offerDraw"
	],
	"transitions": {
		"tokenPlayed": 3,
		"offerDraw": 4
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
	"updateGameProgression": true,
	"transitions": {
		"nextTurn": 2,
		"cantPlay": 3,
		"nextTurnCanMove": 5,
		"endGame": 99
	}
}
					*/
					break;
				case "offerDraw":
					/*
					{
	"name": "offerDraw",
	"description": "",
	"type": "game",
	"action": "stOfferDraw",
	"updateGameProgression": false,
	"transitions": {
		"offeringDraw": 6
	}
}
					*/
					break;
				case "playerTurn":
					/*
					{
	"name": "playerTurn",
	"description": "${actplayer} must place or move a piece on the table",
	"descriptionmyturn": "${you} must place or move a piece on the table",
	"type": "activeplayer",
	"args": "argPlayerTurn",
	"possibleactions": [
		"playToken",
		"offerDraw"
	],
	"transitions": {
		"tokenPlayed": 3,
		"offerDraw": 4
	}
}
					*/
					break;
				case "offeringDraw":
					/*
					{
	"name": "offeringDraw",
	"description": "${actplayer} must accept or deny proposal",
	"descriptionmyturn": "${you} must accept or deny proposal",
	"type": "activeplayer",
	"possibleactions": [
		"playToken",
		"acceptDraw",
		"denyDraw",
		"continueGame",
		"endGame"
	],
	"transitions": {
		"continueGame": 7,
		"endGame": 99
	}
}
					*/
					break;
				case "continueGame":
					/*
					{
	"name": "continueGame",
	"description": "",
	"type": "game",
	"action": "stContinueGame",
	"updateGameProgression": false,
	"transitions": {
		"nextTurn": 75,
		"nextTurnCanMove": 5
	}
}
					*/
					break;
				case "playerTurnNoDraw":
					/*
					{
	"name": "playerTurnNoDraw",
	"description": "${actplayer} must place or move a piece on the table",
	"descriptionmyturn": "${you} must place or move a piece on the table",
	"type": "activeplayer",
	"args": "argPlayerTurn",
	"possibleactions": [
		"playToken"
	],
	"transitions": {
		"tokenPlayed": 3
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
export default hive;
