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

const offtherails: GamePresence = {
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
				case "playerActionPhase":
					/*
					{
	"name": "playerActionPhase",
	"description": "${actplayer} may take up to four actions",
	"descriptionmyturn": "${you} may take up to four actions",
	"type": "activeplayer",
	"possibleactions": [
		"playAction",
		"undoActions",
		"undoSingleAction",
		"soloEndGame"
	],
	"transitions": {
		"startMovement": 11,
		"nextAction": 2,
		"claimMission": 8,
		"zombiePass": 17,
		"soloEnd": 16
	}
}
					*/
					break;
				case "playerMovementCart":
					/*
					{
	"name": "playerMovementCart",
	"description": "${actplayer} must choose which cart moves first",
	"descriptionmyturn": "${you} must choose which cart moves first",
	"type": "activeplayer",
	"possibleactions": [
		"movementChooseCart",
		"undoActions"
	],
	"args": "argMovementCart",
	"transitions": {
		"processMovement": 11,
		"claimMission": 8
	}
}
					*/
					break;
				case "playerMovementDirection":
					/*
					{
	"name": "playerMovementDirection",
	"description": "${actplayer} must choose a direction",
	"descriptionmyturn": "${you} must choose a direction",
	"type": "activeplayer",
	"args": "argMovementDirection",
	"possibleactions": [
		"movementChooseDirection"
	],
	"transitions": {
		"processMovement": 11,
		"collision": 12
	}
}
					*/
					break;
				case "playerMovementJewels":
					/*
					{
	"name": "playerMovementJewels",
	"description": "${actplayer} must choose which jewels to pick up",
	"descriptionmyturn": "${you} must choose which jewels to pick up",
	"type": "activeplayer",
	"args": "argMovementJewels",
	"possibleactions": [
		"pickJewels"
	],
	"transitions": {
		"processMovement": 11,
		"claimMission": 8
	}
}
					*/
					break;
				case "playerCollisionSplit":
					/*
					{
	"name": "playerCollisionSplit",
	"description": "${actplayer} must divide jewels from their struck cart evenly into each hand",
	"descriptionmyturn": "${you} must divide jewels from your struck cart evenly into each hand",
	"type": "activeplayer",
	"possibleactions": [
		"collisionSplitJewels"
	],
	"args": "argCollisionSplitJewels",
	"transitions": {
		"collision": 12
	}
}
					*/
					break;
				case "playerCollisionHand":
					/*
					{
	"name": "playerCollisionHand",
	"description": "${actplayer} must choose which hand will be dropped",
	"descriptionmyturn": "${you} must choose which hand will be dropped",
	"type": "activeplayer",
	"possibleactions": [
		"collisionChooseHand"
	],
	"transitions": {
		"collision": 12
	}
}
					*/
					break;
				case "playerMissionClaim":
					/*
					{
	"name": "playerMissionClaim",
	"description": "${actplayer} may claim a mission card",
	"descriptionmyturn": "${you} may claim a mission card",
	"type": "activeplayer",
	"possibleactions": [
		"claimMission"
	],
	"args": "argClaimMission",
	"transitions": {
		"processMovement": 11,
		"collision": 12
	}
}
					*/
					break;
				case "playerChasmExpand":
					/*
					{
	"name": "playerChasmExpand",
	"description": "${actplayer} must choose where the mine will collapse",
	"descriptionmyturn": "${you} must choose where the mine will collapse",
	"type": "activeplayer",
	"possibleactions": [
		"placeChasm"
	],
	"args": "argChasmExpand",
	"transitions": {
		"chasmProcess": 15
	}
}
					*/
					break;
				case "movementProcessing":
					/*
					{
	"name": "movementProcessing",
	"description": "Movement Phase",
	"type": "game",
	"action": "stMovementProcessing",
	"transitions": {
		"chooseCart": 3,
		"chooseDirection": 4,
		"chooseJewels": 5,
		"processMovement": 11,
		"claimMission": 8,
		"collision": 12,
		"endMovementPhase": 13
	}
}
					*/
					break;
				case "movementProcessing":
					/*
					{
	"name": "movementProcessing",
	"description": "Movement Phase",
	"type": "game",
	"action": "stCollisionProcessing",
	"transitions": {
		"chooseDirection": 4,
		"processMovement": 11,
		"claimMission": 8,
		"splitJewels": 6,
		"chooseHand": 7,
		"collision": 12
	}
}
					*/
					break;
				case "endTurn":
					/*
					{
	"name": "endTurn",
	"description": "End of Turn",
	"type": "game",
	"action": "stEndTurn",
	"updateGameProgression": true,
	"transitions": {
		"nextPlayer": 2,
		"chasmExpand": 9,
		"chasmRedraw": 13,
		"finalScore": 16,
		"chasmProcess": 15
	}
}
					*/
					break;
				case "chasmProcessing":
					/*
					{
	"name": "chasmProcessing",
	"description": "The mine continues to collapse!",
	"type": "game",
	"action": "stChasmProcessing",
	"transitions": {
		"nextPlayer": 2,
		"finalScore": 16
	}
}
					*/
					break;
				case "finalScoring":
					/*
					{
	"name": "finalScoring",
	"description": "Final Scoring",
	"type": "game",
	"action": "stFinalScore",
	"updateGameProgression": true,
	"transitions": {
		"endGame": 99,
		"temp": 2
	}
}
					*/
					break;
				case "zombiePass":
					/*
					{
	"name": "zombiePass",
	"description": "Skipping inactive player",
	"type": "game",
	"action": "stZombiePass",
	"transitions": {
		"nextPlayer": 2
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
export default offtherails;
