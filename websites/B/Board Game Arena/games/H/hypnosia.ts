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

const hypnosia: GamePresence = {
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
				case "playerDiceTurn":
					/*
					{
	"name": "playerDiceTurn",
	"description": "",
	"type": "game",
	"action": "stRollDice",
	"transitions": {
		"rollDice": 3,
		"zombiePass": 5
	}
}
					*/
					break;
				case "playerSelectTurn":
					/*
					{
	"name": "playerSelectTurn",
	"description": "${actplayer} must select pawn",
	"descriptionmyturn": "${you} must select pawn",
	"type": "activeplayer",
	"action": "stPlayerSelectTurn",
	"possibleactions": [
		"selectPawn",
		"endVote"
	],
	"args": "argPlayerSelectTurn",
	"transitions": {
		"selectPawn": 4,
		"cantSelect": 5,
		"endVote": 3,
		"zombiePass": 5
	}
}
					*/
					break;
				case "playerMoveTurn":
					/*
					{
	"name": "playerMoveTurn",
	"description": "${actplayer} must move pawn",
	"descriptionmyturn": "${you} must move pawn",
	"type": "activeplayer",
	"possibleactions": [
		"movePawn",
		"cancelSelection",
		"endVote"
	],
	"args": "argPlayerMoveTurn",
	"transitions": {
		"movePawn1": 3,
		"movePawn2": 5,
		"cancel": 3,
		"endVote": 4,
		"zombiePass": 5
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
		"endGame": 99,
		"nextPlayer": 2,
		"cantPlay": 5
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
export default hypnosia;
