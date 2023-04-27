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

const happycity: GamePresence = {
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
				case "nextPlayer":
					/*
					{
	"name": "nextPlayer",
	"description": "",
	"type": "game",
	"action": "stNextPlayer",
	"updateGameProgression": true,
	"transitions": {
		"endGameChecks": 90,
		"nextPlayer": 3,
		"draft": 8
	}
}
					*/
					break;
				case "discardCard":
					/*
					{
	"name": "discardCard",
	"description": "${actplayer} may discard a building",
	"descriptionmyturn": "${you} may discard a building",
	"type": "activeplayer",
	"action": "stDiscard",
	"possibleactions": [
		"discardCard",
		"pass"
	],
	"transitions": {
		"": 4
	}
}
					*/
					break;
				case "drawCard":
					/*
					{
	"name": "drawCard",
	"description": "${actplayer} must draw a building",
	"descriptionmyturn": "${you} must draw a building",
	"type": "activeplayer",
	"action": "stDraw",
	"possibleactions": [
		"drawCard"
	],
	"transitions": {
		"": 5
	}
}
					*/
					break;
				case "playerTurn":
					/*
					{
	"name": "playerTurn",
	"description": "${actplayer} must buy a structure or take a coin",
	"descriptionmyturn": "${you} must buy a structure (dwelling or building) or",
	"action": "stPlayerTurn",
	"type": "activeplayer",
	"args": "argPlayerTurn",
	"possibleactions": [
		"buyCard",
		"takeCoin"
	],
	"transitions": {
		"": 6
	}
}
					*/
					break;
				case "specialCheck":
					/*
					{
	"name": "specialCheck",
	"description": "",
	"type": "game",
	"action": "stSpecial",
	"updateGameProgression": true,
	"transitions": {
		"next": 2,
		"offerSpecial": 7
	}
}
					*/
					break;
				case "specialCard":
					/*
					{
	"name": "specialCard",
	"description": "${actplayer} may take a special building",
	"descriptionmyturn": "${you} may take a special building",
	"type": "activeplayer",
	"args": "argSpecial",
	"possibleactions": [
		"specialBuilding",
		"pass"
	],
	"transitions": {
		"": 2
	}
}
					*/
					break;
				case "marketDraft":
					/*
					{
	"name": "marketDraft",
	"description": "${actplayer} must draft a market",
	"descriptionmyturn": "${you} must draft a market",
	"type": "activeplayer",
	"possibleactions": [
		"draftMarket"
	],
	"transitions": {
		"": 2
	}
}
					*/
					break;
				case "endGameChecks":
					/*
					{
	"name": "endGameChecks",
	"description": "",
	"type": "game",
	"action": "stEndGameChecks",
	"updateGameProgression": true,
	"transitions": {
		"endGame": 99,
		"playerChoice": 91
	}
}
					*/
					break;
				case "endGameChoice":
					/*
					{
	"name": "endGameChoice",
	"description": "${actplayer} must choose which card to copy",
	"descriptionmyturn": "${you} must choose which card to copy",
	"action": "stEndGameChoice",
	"type": "activeplayer",
	"args": "argEGCheck",
	"possibleactions": [
		"copyCard"
	],
	"transitions": {
		"": 90
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
export default happycity;
