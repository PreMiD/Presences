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

const welcometonewlasvegas: GamePresence = {
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
				case "soloChoice":
					/*
					{
	"name": "soloChoice",
	"description": "You must choose your ACME oponnent",
	"descriptionmyturn": "${you} must choose your ACME oponnent",
	"type": "activeplayer",
	"action": "stSoloChoice",
	"possibleactions": [
		"registerAcmeArchitect"
	],
	"transitions": {
		"borrowChoice": 20
	}
}
					*/
					break;
				case "newTurn":
					/*
					{
	"name": "newTurn",
	"description": "A new turn is starting",
	"type": "game",
	"action": "stNewTurn",
	"updateGameProgression": true,
	"transitions": {
		"playerTurn": 4
	}
}
					*/
					break;
				case "playerTurn":
					/*
					{
	"name": "playerTurn",
	"description": "Waiting for some player.",
	"descriptionmyturn": "${you} must pick a pair of casino cards",
	"type": "multipleactiveplayer",
	"possibleactions": [
		"registerPlayerTurn"
	],
	"transitions": {
		"applyTurns": 5
	}
}
					*/
					break;
				case "applyTurns":
					/*
					{
	"name": "applyTurns",
	"description": "Here is what each player has done during this turn.",
	"type": "game",
	"action": "stApplyTurn",
	"transitions": {
		"newTurn": 3,
		"computeScores": 98
	}
}
					*/
					break;
				case "borrowChoice":
					/*
					{
	"name": "borrowChoice",
	"description": "Each player must choose whether to borrow from bank or not",
	"descriptionmyturn": "${you} must choose whether to borrow from bank or not",
	"type": "multipleactiveplayer",
	"possibleactions": [
		"registerBorrowChoice"
	],
	"args": "argBorrowChoice",
	"transitions": {
		"newTurn": 3
	}
}
					*/
					break;
				case "computeScores":
					/*
					{
	"name": "computeScores",
	"description": "We reached the end of the game! Let's compute the scores!",
	"type": "game",
	"action": "stComputeScores",
	"transitions": {
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
export default welcometonewlasvegas;
