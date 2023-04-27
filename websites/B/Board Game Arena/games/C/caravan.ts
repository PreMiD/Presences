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

const caravan: GamePresence = {
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
	"description": "${actplayer} must spend ${NumberOfActions} actions",
	"descriptionmyturn": "${you} must spend ${NumberOfActions} actions",
	"args": "argPlayerTurn",
	"type": "activeplayer",
	"possibleactions": [
		"placeCamel",
		"pickUp",
		"pickupCamel",
		"moveCube",
		"stealResource",
		"endTurn"
	],
	"transitions": {
		"nextPlayer": 11,
		"continue": 2,
		"refill": 3
	}
}
					*/
					break;
				case "refill":
					/*
					{
	"name": "refill",
	"description": "Refilling Resources",
	"descriptionmyturn": "Refilling Resources",
	"type": "game",
	"action": "stRefill",
	"updateGameProgression": true,
	"transitions": {
		"continue": 2,
		"endStage": 4,
		"nextPlayer": 11
	}
}
					*/
					break;
				case "PlayerTurnEnd":
					/*
					{
	"name": "PlayerTurnEnd",
	"description": "Next Delivery Ends the Game -- ${actplayer} has ${NumberOfActions} actions",
	"descriptionmyturn": "Next Delivery Ends the Game -- ${you} have ${NumberOfActions} actions",
	"type": "activeplayer",
	"args": "argPlayerTurn",
	"updateGameProgression": true,
	"possibleactions": [
		"placeCamel",
		"pickUp",
		"pickupCamel",
		"moveCube",
		"stealResource",
		"endTurn"
	],
	"transitions": {
		"nextPlayer": 12,
		"continue": 4,
		"endGame": 91
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
	"transitions": {
		"continue": 2
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
	"transitions": {
		"continue": 4
	}
}
					*/
					break;
				case "penaltyScore":
					/*
					{
	"name": "penaltyScore",
	"description": "Applying End Game Penalties",
	"type": "game",
	"action": "stPenaltyScore",
	"args": "argGameEnd",
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
export default caravan;
