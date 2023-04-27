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

const triatri: GamePresence = {
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
		"": 20
	}
}
					*/
					break;
				case "newHand":
					/*
					{
	"name": "newHand",
	"description": "",
	"type": "game",
	"action": "stNewHand",
	"updateGameProgression": true,
	"transitions": {
		"": 21
	}
}
					*/
					break;
				case "DecideonFirstplayer":
					/*
					{
	"name": "DecideonFirstplayer",
	"description": "players must select a card to decide first player",
	"descriptionmyturn": "${you} must select a card to decide first player",
	"type": "multipleactiveplayer",
	"action": "stDecideOnFirstPlayer",
	"possibleactions": [
		"decideOnFirstPlayer"
	],
	"transitions": {
		"decide": 22
	}
}
					*/
					break;
				case "Judge":
					/*
					{
	"name": "Judge",
	"description": "",
	"type": "game",
	"action": "stJudge",
	"transitions": {
		"reset": 21,
		"decisionFirstPlayer": 30
	}
}
					*/
					break;
				case "newTrick":
					/*
					{
	"name": "newTrick",
	"description": "",
	"type": "game",
	"action": "stNewTrick",
	"transitions": {
		"newTrick": 31,
		"newTrickStart": 32,
		"lastSelection": 34
	}
}
					*/
					break;
				case "selectToken":
					/*
					{
	"name": "selectToken",
	"description": "${actplayer} must select a token",
	"descriptionmyturn": "${you} must select a token",
	"type": "activeplayer",
	"possibleactions": [
		"selectToken"
	],
	"transitions": {
		"selectAttribute": 30
	}
}
					*/
					break;
				case "playerTurn":
					/*
					{
	"name": "playerTurn",
	"description": "${actplayer} must play a card",
	"descriptionmyturn": "${you} must play a card",
	"type": "activeplayer",
	"possibleactions": [
		"playCard"
	],
	"transitions": {
		"playCard": 33
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
		"nextPlayer": 32,
		"nextTrick": 30,
		"endHand": 40,
		"endGame": 99
	}
}
					*/
					break;
				case "autoPlayerTurn":
					/*
					{
	"name": "autoPlayerTurn",
	"description": "",
	"type": "game",
	"action": "stAutoMode",
	"transitions": {
		"autoProcess": 33
	}
}
					*/
					break;
				case "endHand":
					/*
					{
	"name": "endHand",
	"description": "",
	"type": "game",
	"action": "stEndHand",
	"transitions": {
		"nextHand": 20,
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
export default triatri;
