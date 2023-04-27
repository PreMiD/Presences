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

const spacestationphoenix: GamePresence = {
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
		"": 2
	}
}
					*/
					break;
				case "stateSetup":
					/*
					{
	"name": "stateSetup",
	"description": "Performing setup",
	"type": "game",
	"action": "stSetup",
	"transitions": {
		"startDraft": 3,
		"skipDraft": 20
	}
}
					*/
					break;
				case "stateDraftHandler":
					/*
					{
	"name": "stateDraftHandler",
	"description": "Starting next phase",
	"type": "game",
	"action": "stDraftHandler",
	"transitions": {
		"draftShip": 4,
		"draftHub": 5,
		"doneDrafting": 20
	}
}
					*/
					break;
				case "stateDraftShip":
					/*
					{
	"name": "stateDraftShip",
	"description": "${actplayer} is drafting a ship",
	"descriptionmyturn": "${you} must choose a ship to keep",
	"type": "activeplayer",
	"possibleactions": [
		"actionDraft"
	],
	"transitions": {
		"shipDrafted": 3
	}
}
					*/
					break;
				case "stateDraftHub":
					/*
					{
	"name": "stateDraftHub",
	"description": "${actplayer} is choosing a hub",
	"descriptionmyturn": "${you} must choose a hub to keep",
	"type": "activeplayer",
	"possibleactions": [
		"actionDraft"
	],
	"transitions": {
		"hubDrafted": 3,
		"setupHubShip": 7,
		"setupHubConstruct": 8
	}
}
					*/
					break;
				case "stateSetupHubShip":
					/*
					{
	"name": "stateSetupHubShip",
	"description": "${actplayer} is choosing additional starting ships",
	"descriptionmyturn": "${you} must choose two additional ships to keep",
	"type": "activeplayer",
	"possibleactions": [
		"actionSetupShip"
	],
	"transitions": {
		"hubSetupDone": 3,
		"skipDraft": 20
	}
}
					*/
					break;
				case "stateSetupHubConstruct":
					/*
					{
	"name": "stateSetupHubConstruct",
	"description": "${actplayer} is building a starting sector",
	"descriptionmyturn": "${you} must build a starting sector",
	"type": "activeplayer",
	"possibleactions": [
		"actionSetupConstruct"
	],
	"transitions": {
		"hubSetupDone": 3,
		"freeDiplomacy": 9
	}
}
					*/
					break;
				case "stateSetupDiplomacyAdv":
					/*
					{
	"name": "stateSetupDiplomacyAdv",
	"description": "${actplayer} is advancing on the diplomacy track",
	"descriptionmyturn": "${you} must choose a diplomacy track to advance",
	"type": "activeplayer",
	"possibleactions": [
		"actionSetupDiplomacyAdv"
	],
	"transitions": {
		"hubSetupDone": 3
	}
}
					*/
					break;
				case "stateTurnHandler":
					/*
					{
	"name": "stateTurnHandler",
	"description": "Starting next phase",
	"type": "game",
	"action": "stTurnHandler",
	"updateGameProgression": true,
	"transitions": {
		"startTurn": 21,
		"endGame": 90
	}
}
					*/
					break;
				case "statePlayerTurn":
					/*
					{
	"name": "statePlayerTurn",
	"description": "${actplayer} is taking a turn",
	"descriptionmyturn": "${you} must take your turn",
	"type": "activeplayer",
	"possibleactions": [
		"actionIncome",
		"actionDismantle",
		"actionConstruction",
		"actionExpedition",
		"actionTransport",
		"actionFoodWater",
		"actionDiplomacy",
		"actionGainHumanoid",
		"actionGainResource",
		"actionBonus",
		"actionDone",
		"actionUndo",
		"actionReroll",
		"actionKeep",
		"actionRelocate",
		"actionSwap",
		"actionIncomeExp",
		"actionRsc2Human"
	],
	"transitions": {
		"diplomacy": 50,
		"noDiplomacy": 20
	}
}
					*/
					break;
				case "stateDiplomacy":
					/*
					{
	"name": "stateDiplomacy",
	"description": "Other players are selecting diplomacy rewards",
	"descriptionmyturn": "${you} must choose a diplomacy reward",
	"type": "multipleactiveplayer",
	"possibleactions": [
		"actionDiplomacyReward"
	],
	"transitions": {
		"done": 20
	}
}
					*/
					break;
				case "stateScoring":
					/*
					{
	"name": "stateScoring",
	"description": "Scoring",
	"type": "game",
	"action": "stScoring",
	"updateGameProgression": true,
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
export default spacestationphoenix;
