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

const lama: GamePresence = {
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
		"": 4
	}
}
					*/
					break;
				case "playerTurn":
					/*
					{
	"name": "playerTurn",
	"description": "${actplayer} may play a ${card1} or ${card2}",
	"descriptionmyturn": "${you} may play a ${card1} or ${card2}",
	"type": "activeplayer",
	"args": "argPlayerTurn",
	"possibleactions": [
		"playCard",
		"draw",
		"fold"
	],
	"transitions": {
		"nextPlayer": 5
	}
}
					*/
					break;
				case "endRound":
					/*
					{
	"name": "endRound",
	"description": "Ending Round and Scoring",
	"type": "manager",
	"action": "stRoundScore",
	"updateGameProgression": true,
	"transitions": {
		"dealRound": 4,
		"endGame": 99
	}
}
					*/
					break;
				case "startRound":
					/*
					{
	"name": "startRound",
	"description": "Starting Round and Dealing new Cards",
	"type": "manager",
	"action": "stRoundStart",
	"updateGameProgression": true,
	"transitions": {
		"startRound": 2
	}
}
					*/
					break;
				case "nextPlayer":
					/*
					{
	"name": "nextPlayer",
	"description": "",
	"type": "manager",
	"action": "stNextPlayer",
	"transitions": {
		"nextPlayer": 2,
		"endRound": 3
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
export default lama;
