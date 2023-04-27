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

const soluna: GamePresence = {
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
		"": 40
	}
}
					*/
					break;
				case "roundStart":
					/*
					{
	"name": "roundStart",
	"description": "",
	"type": "game",
	"updateGameProgression ": true,
	"action": "stRoundStart",
	"args": "argRoundSetup",
	"transitions": {
		"startingRound": 50
	}
}
					*/
					break;
				case "playerTurn":
					/*
					{
	"name": "playerTurn",
	"description": "${actplayer} must select a stack and move on top of another one of the same type or with the same size, OR condede the round",
	"descriptionmyturn": "${you} must select a stack and move on top of another one of the same type or with the same size, OR ",
	"type": "activeplayer",
	"possibleactions": [
		"nextTurn",
		"concedeRound"
	],
	"transitions": {
		"nextTurn": 51,
		"concedeRound": 52,
		"zombiePass": 51
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
		"endingRound": 60,
		"nextTurn": 50
	}
}
					*/
					break;
				case "calculateScoreWhenConcede":
					/*
					{
	"name": "calculateScoreWhenConcede",
	"description": "",
	"type": "game",
	"action": "stCalculateScoreWhenConcede",
	"updateGameProgression": true,
	"transitions": {
		"endingRound": 60
	}
}
					*/
					break;
				case "roundEnd":
					/*
					{
	"name": "roundEnd",
	"description": "",
	"type": "game",
	"updateGameProgression ": true,
	"action": "stRoundEnd",
	"transitions": {
		"endingGame": 99,
		"newRound": 40
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
export default soluna;
