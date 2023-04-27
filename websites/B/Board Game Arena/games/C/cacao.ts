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

const cacao: GamePresence = {
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
	"description": "${actplayer} must play a worker tile",
	"descriptionmyturn": "${you} must play a worker tile",
	"type": "activeplayer",
	"args": "argPlayerTurn",
	"possibleactions": [
		"selectWorker",
		"placeWorker",
		"rotateWorker",
		"confirmWorker",
		"carryOutAction",
		"actionsCompleted"
	],
	"transitions": {
		"fillJungle": 4,
		"jungleActions": 5,
		"nextPlayer": 6,
		"zombiePass": 6
	}
}
					*/
					break;
				case "playerJungle":
					/*
					{
	"name": "playerJungle",
	"description": "${actplayer} must fill a jungle space",
	"descriptionmyturn": "${you} must fill a jungle space",
	"type": "activeplayer",
	"args": "argPlayerJungle",
	"possibleactions": [
		"selectJungle",
		"placeJungle"
	],
	"transitions": {
		"jungleActions": 5,
		"nextPlayer": 6,
		"end": 98,
		"zombiePass": 6
	}
}
					*/
					break;
				case "playerJungleActions":
					/*
					{
	"name": "playerJungleActions",
	"description": "Other players can carry out jungle tile actions",
	"descriptionmyturn": "Click on plantation and/or market to take and sell cacao. Or forgo by clicking on [Finish].",
	"type": "multipleactiveplayer",
	"action": "stMultiPlayerInit",
	"args": "argPlayerActions",
	"possibleactions": [
		"carryOutAction",
		"actionsCompleted"
	],
	"transitions": {
		"next": 6,
		"end": 98,
		"zombiePass": 6
	}
}
					*/
					break;
				case "gameTurn":
					/*
					{
	"name": "gameTurn",
	"description": "Switching to next player",
	"type": "game",
	"action": "stGameTurn",
	"args": "argGameTurn",
	"updateGameProgression": true,
	"transitions": {
		"nextTurn": 2,
		"end": 98
	}
}
					*/
					break;
				case "gameFinalScore":
					/*
					{
	"name": "gameFinalScore",
	"description": "Compute final score",
	"type": "game",
	"action": "stGameScores",
	"args": "argPlayerScores",
	"transitions": {
		"end": 99
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
export default cacao;
