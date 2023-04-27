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

const mapmaker: GamePresence = {
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
				case "playerTurn":
					/*
					{
	"name": "playerTurn",
	"description": "${actplayer} ${str}.",
	"descriptionmyturn": "${you} ${str}.",
	"type": "activeplayer",
	"args": "argPlayerTurn",
	"possibleactions": [
		"playEdge",
		"resetTurn",
		"confirmTurn"
	],
	"transitions": {
		"playEdge": 3,
		"resetTurn": 7,
		"confirmTurn": 8,
		"zombiePass": 5
	}
}
					*/
					break;
				case "evaluatePlayerMove":
					/*
					{
	"name": "evaluatePlayerMove",
	"description": "",
	"type": "game",
	"action": "stEvaluatePlayerMove",
	"updateGameProgression": true,
	"transitions": {
		"districtTieBreak": 6,
		"samePlayer": 4,
		"endGame": 99
	}
}
					*/
					break;
				case "samePlayer":
					/*
					{
	"name": "samePlayer",
	"description": "",
	"type": "game",
	"action": "stSamePlayer",
	"transitions": {
		"continueSamePlayer": 2
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
	"args": "argNextPlayer",
	"action": "stNextPlayer",
	"transitions": {
		"continueNextPlayer": 2
	}
}
					*/
					break;
				case "districtTieBreak":
					/*
					{
	"name": "districtTieBreak",
	"description": "${actplayer} must select district winner.",
	"descriptionmyturn": "${you} must select district winner.",
	"type": "activeplayer",
	"args": "argDistrictTieBreak",
	"possibleactions": [
		"selectDistrictWinner"
	],
	"transitions": {
		"selectDistrictWinner": 3
	}
}
					*/
					break;
				case "resetTurn":
					/*
					{
	"name": "resetTurn",
	"description": "",
	"type": "game",
	"action": "stResetTurn",
	"transitions": {
		"continueSamePlayer": 2
	}
}
					*/
					break;
				case "confirmTurn":
					/*
					{
	"name": "confirmTurn",
	"description": "",
	"type": "game",
	"action": "stConfirmTurn",
	"transitions": {
		"nextPlayer": 5,
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
export default mapmaker;
