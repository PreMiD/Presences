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

const astra: GamePresence = {
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
		"": 10
	}
}
					*/
					break;
				case "stateTurnHandler":
					/*
					{
	"name": "stateTurnHandler",
	"description": "Processing results",
	"type": "game",
	"action": "stTurnHandler",
	"updateGameProgression": true,
	"transitions": {
		"startTurn": 11,
		"endGame": 90
	}
}
					*/
					break;
				case "statePlayerTurn":
					/*
					{
	"name": "statePlayerTurn",
	"description": "It is ${actplayer}'s turn",
	"descriptionmyturn": "${you} must take your turn",
	"type": "activeplayer",
	"possibleactions": [
		"actionAbility",
		"actionRest",
		"actionObserve",
		"actionEndObserve",
		"actionUndo"
	],
	"transitions": {
		"donePlayer": 21
	}
}
					*/
					break;
				case "stateDiscoveryHandler":
					/*
					{
	"name": "stateDiscoveryHandler",
	"description": "Processing results",
	"type": "game",
	"action": "stDiscoveryHandler",
	"updateGameProgression": true,
	"transitions": {
		"startDiscovery": 22,
		"endDiscovery": 31,
		"endPostDreamDiscovery": 41
	}
}
					*/
					break;
				case "stateDiscovery":
					/*
					{
	"name": "stateDiscovery",
	"description": "Other players are selecting a Boon",
	"descriptionmyturn": "${you} must choose a Boon",
	"type": "multipleactiveplayer",
	"possibleactions": [
		"actionBoon"
	],
	"transitions": {
		"done": 21
	}
}
					*/
					break;
				case "stateDreamHandler":
					/*
					{
	"name": "stateDreamHandler",
	"description": "Processing results",
	"type": "game",
	"action": "stDreamHandler",
	"transitions": {
		"manualDream": 32,
		"doneDream": 21
	}
}
					*/
					break;
				case "stateDream":
					/*
					{
	"name": "stateDream",
	"description": "${actplayer} is Dreaming",
	"descriptionmyturn": "${you} must perform a Dream action",
	"type": "activeplayer",
	"possibleactions": [
		"actionDream"
	],
	"args": "argDream",
	"transitions": {
		"doneDream": 21
	}
}
					*/
					break;
				case "stateDiscardHandler":
					/*
					{
	"name": "stateDiscardHandler",
	"description": "Processing results",
	"type": "game",
	"action": "stDiscardHandler",
	"updateGameProgression": true,
	"transitions": {
		"doDiscard": 42,
		"skipDiscard": 10
	}
}
					*/
					break;
				case "stateDiscard":
					/*
					{
	"name": "stateDiscard",
	"description": "${actplayer} is discarding",
	"descriptionmyturn": "${you} must discard",
	"type": "activeplayer",
	"possibleactions": [
		"actionDiscard"
	],
	"transitions": {
		"doneDiscard": 10
	}
}
					*/
					break;
				case "stateScoring":
					/*
					{
	"name": "stateScoring",
	"description": "Processing results",
	"type": "game",
	"action": "stScoring",
	"transitions": {
		"allDone": 99
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
export default astra;
