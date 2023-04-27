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

const cosmosempires: GamePresence = {
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
		"": 30
	}
}
					*/
					break;
				case "adjustProductionRollPhase":
					/*
					{
	"name": "adjustProductionRollPhase",
	"type": "activeplayer",
	"description": "${actplayer} must choose whether to adjust the production roll or not (${actionsAvailable} remaining)",
	"descriptionmyturn": "${you} must choose whether to adjust the production roll or not (${actionsAvailable} remaining)",
	"args": "argAdjustProductionRollPhase",
	"action": "stAdjustProductionRollPhase",
	"possibleactions": [
		"adjustRollAction"
	],
	"transitions": {
		"nextPhase": 20,
		"firstTurnNextPhase": 30,
		"zombiePass": 30
	}
}
					*/
					break;
				case "productionPhase":
					/*
					{
	"name": "productionPhase",
	"type": "game",
	"action": "stProductionPhase",
	"transitions": {
		"nextPhase": 30
	}
}
					*/
					break;
				case "buildOrCyclePhase":
					/*
					{
	"name": "buildOrCyclePhase",
	"type": "activeplayer",
	"description": "${actplayer} must choose a card to build or cycle from the build pool (${actionsAvailable} left)",
	"descriptionmyturn": "${you} must choose a card to build or cycle from the build pool (${actionsAvailable} left)",
	"args": "argBuildOrCyclePhase",
	"possibleactions": [
		"buildCardAction",
		"cycleCardAction",
		"endTurnAction"
	],
	"transitions": {
		"self": 30,
		"darkspaceHubRollValue": 31,
		"nextPhase": 40,
		"zombiePass": 40
	},
	"updateGameProgression": true
}
					*/
					break;
				case "chooseDarkSpaceHubRollValuePhase":
					/*
					{
	"name": "chooseDarkSpaceHubRollValuePhase",
	"type": "activeplayer",
	"description": "${actplayer} must choose a roll value for his new Darkspace Hub",
	"descriptionmyturn": "${you} must choose a roll value for your new Darkspace Hub",
	"args": "argchooseDarkSpaceHubRollValuePhase",
	"possibleactions": [
		"chooseRollValue"
	],
	"transitions": {
		"buildOrCyclePhase": 30,
		"nextPhase": 40
	}
}
					*/
					break;
				case "nextPlayerPhase":
					/*
					{
	"name": "nextPlayerPhase",
	"type": "game",
	"action": "stNextPlayerPhase",
	"transitions": {
		"nextTurn": 10,
		"endGame": 99
	},
	"updateGameProgression": true
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
export default cosmosempires;
