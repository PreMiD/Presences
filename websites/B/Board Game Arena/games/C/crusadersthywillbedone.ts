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

const crusadersthywillbedone: GamePresence = {
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
				case "installStateStep":
					/*
					{
	"name": "installStateStep",
	"description": "",
	"type": "game",
	"action": "stInstallStateStep",
	"transitions": {
		"executeGameStateStep": 3,
		"executeActivePlayerStateStep": 4,
		"executeMultipleActivePlayerStateStep": 5,
		"endGame": 99
	}
}
					*/
					break;
				case "executeGameStateStep":
					/*
					{
	"name": "executeGameStateStep",
	"description": "",
	"type": "game",
	"action": "stExecuteGameStateStep",
	"args": "getStateStepArgs",
	"updateGameProgression": true,
	"transitions": {
		"nextStateStep": 6
	}
}
					*/
					break;
				case "executeActivePlayerStateStep":
					/*
					{
	"name": "executeActivePlayerStateStep",
	"description": "",
	"descriptionmyturn": "",
	"type": "activeplayer",
	"args": "getStateStepArgs",
	"possibleactions": [
		"clientaction"
	],
	"updateGameProgression": true,
	"transitions": {
		"nextStateStep": 6,
		"undo": 7,
		"zombiePass": 6
	}
}
					*/
					break;
				case "executeMultipleActivePlayerStateStep":
					/*
					{
	"name": "executeMultipleActivePlayerStateStep",
	"description": "",
	"type": "activeplayer",
	"possibleactions": [
		"clientaction"
	],
	"args": "getStateStepArgs",
	"updateGameProgression": true,
	"transitions": {
		"nextStateStep": 6
	}
}
					*/
					break;
				case "navigateToNextStateStep":
					/*
					{
	"name": "navigateToNextStateStep",
	"action": "stNavigateToNextStateStep",
	"description": "",
	"type": "game",
	"transitions": {
		"installStateStep": 2,
		"endGame": 99
	}
}
					*/
					break;
				case "undoStep":
					/*
					{
	"name": "undoStep",
	"action": "stUndoStep",
	"description": "",
	"type": "game",
	"transitions": {
		"": 6
	}
}
					*/
					break;
				case "rollBackToStateStep":
					/*
					{
	"name": "rollBackToStateStep",
	"action": "stRollBackToStateStep",
	"description": "",
	"type": "game",
	"transitions": {
		"installStateStep": 2,
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
export default crusadersthywillbedone;
