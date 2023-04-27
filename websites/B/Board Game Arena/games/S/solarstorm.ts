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

const solarstorm: GamePresence = {
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
				case "playerStartOfTurn":
					/*
					{
	"name": "playerStartOfTurn",
	"type": "game",
	"action": "stStartOfTurn",
	"transitions": {
		"transPlayerTurn": 3
	}
}
					*/
					break;
				case "playerTurn":
					/*
					{
	"name": "playerTurn",
	"description": "${actplayer} must choose an action (${actions} + ${tokens} left)",
	"descriptionmyturn": "${you} must choose an action (${actions} + ${tokens} left)",
	"type": "activeplayer",
	"args": "argPlayerTurn",
	"possibleactions": [
		"choose",
		"useToken",
		"restartTurn"
	],
	"transitions": {
		"transPlayerMove": 4,
		"transPlayerScavenge": 5,
		"transPlayerShare": 7,
		"transPlayerRepair": 8,
		"transPlayerDivert": 9,
		"transPlayerRoomCrewQuarter": 10,
		"transPlayerRoomCargoHold": 11,
		"transPlayerRoomMessHall": 12,
		"transPlayerRoomEngineRoom": 13,
		"transPlayerRoomRepairCentre": 14,
		"transPlayerRoomArmoury": 15,
		"transPlayerRoomBridge": 16,
		"transActionDone": 20,
		"transEndOfGame": 99,
		"transPlayerRestartTurn": 44
	}
}
					*/
					break;
				case "playerMove":
					/*
					{
	"name": "playerMove",
	"description": "${actplayer} must choose a destination",
	"descriptionmyturn": "${you} must choose a destination",
	"type": "activeplayer",
	"args": "argPlayerMove",
	"possibleactions": [
		"move",
		"cancel"
	],
	"transitions": {
		"transActionDone": 20,
		"transActionCancel": 19
	}
}
					*/
					break;
				case "playerScavenge":
					/*
					{
	"name": "playerScavenge",
	"description": "Scavenge: ${actplayer} must roll the dice",
	"descriptionmyturn": "Scavenge: ${you} must roll the dice",
	"type": "activeplayer",
	"possibleactions": [
		"rollDice",
		"cancel"
	],
	"transitions": {
		"transActionScavengePickCards": 6,
		"transActionScavengePickNothing": 20,
		"transActionCancel": 19
	}
}
					*/
					break;
				case "playerScavengePickCards":
					/*
					{
	"name": "playerScavengePickCards",
	"description": "Scavenge: ${actplayer} must pick resources cards",
	"descriptionmyturn": "Scavenge: ${you} must pick resources cards",
	"type": "activeplayer",
	"args": "argPlayerScavengePickCards",
	"possibleactions": [
		"pickResource"
	],
	"transitions": {
		"transActionScavengePickCards": 6,
		"transActionScavengeEnd": 20,
		"transEndOfGame": 99
	}
}
					*/
					break;
				case "playerShare":
					/*
					{
	"name": "playerShare",
	"description": "${actplayer} must share a resource",
	"descriptionmyturn": "${you} must share a resource",
	"type": "activeplayer",
	"action": "stActionShare",
	"possibleactions": [
		"pickResourceFromAnotherPlayer",
		"giveResourceToAnotherPlayer",
		"cancel"
	],
	"transitions": {
		"transActionDone": 20,
		"transActionCancel": 19
	}
}
					*/
					break;
				case "playerRepair":
					/*
					{
	"name": "playerRepair",
	"description": "Repair: ${actplayer} must select a resource",
	"descriptionmyturn": "Repair: ${you} must select a resource",
	"type": "activeplayer",
	"args": "argPlayerRepair",
	"possibleactions": [
		"selectResourceForRepair",
		"cancel"
	],
	"transitions": {
		"transActionDone": 20,
		"transActionCancel": 19
	}
}
					*/
					break;
				case "playerDivert":
					/*
					{
	"name": "playerDivert",
	"description": "Divert power: ${actplayer} must select resources",
	"descriptionmyturn": "Divert power: ${you} must select resources",
	"type": "activeplayer",
	"possibleactions": [
		"selectResourcesForDivert",
		"cancel"
	],
	"transitions": {
		"transActionDone": 20,
		"transActionCancel": 19
	}
}
					*/
					break;
				case "playerRoomCrewQuarter":
					/*
					{
	"name": "playerRoomCrewQuarter",
	"description": "Crew Quarters: ${actplayer} must select a meeple to move",
	"descriptionmyturn": "Crew Quarters: ${you} must select a meeple to move",
	"type": "activeplayer",
	"possibleactions": [
		"moveMeepleToRoom",
		"cancel"
	],
	"transitions": {
		"transActionDone": 20,
		"transActionCancel": 19
	}
}
					*/
					break;
				case "playerRoomCargoHold":
					/*
					{
	"name": "playerRoomCargoHold",
	"description": "Cargo Hold: ${actplayer} must reorder the next resource cards",
	"descriptionmyturn": "Cargo Hold: ${you} must reorder the next resource cards",
	"type": "activeplayer",
	"action": "stPlayerRoomCargoHold",
	"args": "argPlayerRoomCargoHold",
	"possibleactions": [
		"putBackResourceCardsInDeck"
	],
	"transitions": {
		"transActionDone": 20
	}
}
					*/
					break;
				case "playerRoomMessHall":
					/*
					{
	"name": "playerRoomMessHall",
	"description": "Mess Hall: ${actplayer} must take, give or swap a card with another player",
	"descriptionmyturn": "Mess Hall: ${you} must take, give or swap a card with another player",
	"type": "activeplayer",
	"possibleactions": [
		"pickResourceFromAnotherPlayer",
		"giveResourceToAnotherPlayer",
		"swapResourceWithAnotherPlayer",
		"cancel"
	],
	"transitions": {
		"transActionDone": 20,
		"transActionCancel": 19
	}
}
					*/
					break;
				case "playerRoomEngineRoom":
					/*
					{
	"name": "playerRoomEngineRoom",
	"description": "Engine room: ${actplayer} must swap a resource card from the discard pile",
	"descriptionmyturn": "Engine room: ${you} must swap a resource card from the discard pile",
	"type": "activeplayer",
	"args": "argPlayerRoomEngineRoom",
	"possibleactions": [
		"swapResourceFromDiscard",
		"cancel"
	],
	"transitions": {
		"transActionDone": 20,
		"transActionCancel": 19
	}
}
					*/
					break;
				case "playerRoomRepairCentre":
					/*
					{
	"name": "playerRoomRepairCentre",
	"description": "Repair centre: ${actplayer} must repair any room",
	"descriptionmyturn": "Repair centre: ${you} must select a room to repair",
	"type": "activeplayer",
	"possibleactions": [
		"selectResourceForRepair",
		"cancel"
	],
	"transitions": {
		"transActionDone": 20,
		"transActionCancel": 19
	}
}
					*/
					break;
				case "playerRoomArmoury":
					/*
					{
	"name": "playerRoomArmoury",
	"description": "Armoury: ${actplayer} must place protection tokens",
	"descriptionmyturn": "Armoury: ${you} must place protection tokens",
	"type": "activeplayer",
	"args": "argPlayerRoomArmoury",
	"possibleactions": [
		"putProtectionTokens",
		"cancel"
	],
	"transitions": {
		"transActionDone": 20,
		"transActionCancel": 19,
		"transPlayerRoomArmoury": 15
	}
}
					*/
					break;
				case "playerRoomBridge":
					/*
					{
	"name": "playerRoomBridge",
	"description": "Bridge: ${actplayer} must reorder the next damage cards",
	"descriptionmyturn": "Bridge: ${you} must reorder the next damage cards",
	"type": "activeplayer",
	"action": "stPlayerRoomBridge",
	"args": "argPlayerRoomBridge",
	"possibleactions": [
		"putBackDamageCardsInDeck"
	],
	"transitions": {
		"transActionDone": 20
	}
}
					*/
					break;
				case "actionCancel":
					/*
					{
	"name": "actionCancel",
	"type": "game",
	"action": "stActionCancel",
	"transitions": {
		"transPlayerTurn": 3
	}
}
					*/
					break;
				case "actionDone":
					/*
					{
	"name": "actionDone",
	"type": "game",
	"action": "stActionDone",
	"transitions": {
		"transPlayerTurn": 3,
		"transPlayerAskActionTokensPlay": 22,
		"transPlayerPickResourcesCards": 21
	}
}
					*/
					break;
				case "pickResources":
					/*
					{
	"name": "pickResources",
	"description": "End of turn: ${actplayer} must pick resources cards",
	"descriptionmyturn": "End of turn: ${you} must pick resources cards",
	"type": "activeplayer",
	"args": "argPlayerPickResourcesCards",
	"possibleactions": [
		"pickResource",
		"restartTurn"
	],
	"transitions": {
		"transPlayerEndTurn": 40,
		"transPlayerPickResourcesCards": 21,
		"transEndOfGame": 99,
		"transPlayerRestartTurn": 44
	}
}
					*/
					break;
				case "playerAskActionTokensPlay":
					/*
					{
	"name": "playerAskActionTokensPlay",
	"description": "End of turn: ${actplayer} can use their action tokens (${tokens} left)",
	"descriptionmyturn": "End of turn: ${you} can use you action tokens (${tokens} left)",
	"type": "activeplayer",
	"args": "argPlayerAskActionTokensPlay",
	"possibleactions": [
		"useToken",
		"dontUseToken",
		"restartTurn"
	],
	"transitions": {
		"transActionDone": 20,
		"transPlayerRestartTurn": 44
	}
}
					*/
					break;
				case "endTurn":
					/*
					{
	"name": "endTurn",
	"type": "game",
	"action": "stEndTurn",
	"updateGameProgression": true,
	"transitions": {
		"transPlayerDiscardResources": 41,
		"transPlayerNextPlayer": 43,
		"transEndOfGame": 99
	}
}
					*/
					break;
				case "playerDiscardResources":
					/*
					{
	"name": "playerDiscardResources",
	"description": "End of turn: ${actplayer} must discard resources cards (max 6)",
	"descriptionmyturn": "End of turn: ${you} must discard resources cards (max 6)",
	"type": "activeplayer",
	"args": "argPlayerDiscardResources",
	"possibleactions": [
		"discardResources",
		"restartTurn"
	],
	"transitions": {
		"transPlayerNextPlayer": 43,
		"transPlayerRestartTurn": 44
	}
}
					*/
					break;
				case "playerNextPlayer":
					/*
					{
	"name": "playerNextPlayer",
	"type": "game",
	"action": "stNextPlayer",
	"transitions": {
		"transPlayerStartOfTurn": 2
	}
}
					*/
					break;
				case "playerRestartTurn":
					/*
					{
	"name": "playerRestartTurn",
	"type": "game",
	"action": "stPlayerRestartTurn",
	"transitions": {
		"transPlayerStartOfTurn": 2
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
export default solarstorm;
