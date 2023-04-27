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

const gardennation: GamePresence = {
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
				case "chooseSecretMissions":
					/*
					{
	"name": "chooseSecretMissions",
	"description": "Waiting for other players",
	"descriptionmyturn": "${you} must choose 2 Secret missions",
	"type": "multipleactiveplayer",
	"action": "stChooseSecretMissions",
	"args": "argChooseSecretMissions",
	"possibleactions": [
		"chooseSecretMissions",
		"cancelChooseSecretMissions"
	],
	"transitions": {
		"end": 15
	}
}
					*/
					break;
				case "endSecretMissions":
					/*
					{
	"name": "endSecretMissions",
	"description": "",
	"type": "game",
	"action": "stEndSecretMissions",
	"transitions": {
		"start": 20
	}
}
					*/
					break;
				case "chooseAction":
					/*
					{
	"name": "chooseAction",
	"description": "${actplayer} must choose an action (${remainingActions} remaining action(s))",
	"descriptionmyturn": "${you} must choose an action (${remainingActions} remaining action(s))",
	"type": "activeplayer",
	"args": "argChooseAction",
	"possibleactions": [
		"chooseConstructBuilding",
		"chooseAbandonBuilding",
		"changeTerritory",
		"chooseUsePloyToken",
		"skipTurn"
	],
	"transitions": {
		"constructBuilding": 30,
		"abandonBuilding": 40,
		"changeTerritory": 20,
		"usePloyToken": 50,
		"chooseNextPlayer": 70
	}
}
					*/
					break;
				case "constructBuilding":
					/*
					{
	"name": "constructBuilding",
	"description": "${actplayer} must choose an area to construct a building",
	"descriptionmyturn": "${you} must choose an area to construct a building",
	"type": "activeplayer",
	"args": "argConstructBuilding",
	"possibleactions": [
		"constructBuilding",
		"cancelConstructBuilding"
	],
	"transitions": {
		"chooseTypeOfLand": 31,
		"chooseCompletedCommonProject": 35,
		"endAction": 65,
		"cancel": 20
	}
}
					*/
					break;
				case "chooseTypeOfLand":
					/*
					{
	"name": "chooseTypeOfLand",
	"description": "${actplayer} must choose a type of land",
	"descriptionmyturn": "${you} must choose a type of land",
	"type": "activeplayer",
	"args": "argChooseTypeOfLand",
	"possibleactions": [
		"chooseTypeOfLand",
		"cancelChooseTypeOfLand"
	],
	"transitions": {
		"chooseCompletedCommonProject": 35,
		"endAction": 65,
		"cancel": 30
	}
}
					*/
					break;
				case "chooseCompletedCommonProject":
					/*
					{
	"name": "chooseCompletedCommonProject",
	"description": "${actplayer} must choose the common project to complete",
	"descriptionmyturn": "${you} must choose the common project to complete",
	"type": "activeplayer",
	"args": "argChooseCompletedCommonProject",
	"possibleactions": [
		"chooseCompletedCommonProject",
		"skipCompletedCommonProject"
	],
	"transitions": {
		"endAction": 65,
		"endRound": 80
	}
}
					*/
					break;
				case "abandonBuilding":
					/*
					{
	"name": "abandonBuilding",
	"description": "${actplayer} must choose a building to abandon",
	"descriptionmyturn": "${you} must choose a building to abandon",
	"type": "activeplayer",
	"args": "argAbandonBuilding",
	"possibleactions": [
		"abandonBuilding",
		"cancelAbandonBuilding"
	],
	"transitions": {
		"endAction": 65,
		"cancel": 20
	}
}
					*/
					break;
				case "usePloyToken":
					/*
					{
	"name": "usePloyToken",
	"description": "${actplayer} must choose a ploy",
	"descriptionmyturn": "${you} must choose a ploy",
	"type": "activeplayer",
	"args": "argUsePloyToken",
	"possibleactions": [
		"usePloyToken",
		"cancelUsePloyToken"
	],
	"transitions": {
		"strategicMovement": 52,
		"roofTransfer": 54,
		"buildingInvasion": 56,
		"cancel": 20
	}
}
					*/
					break;
				case "strategicMovement":
					/*
					{
	"name": "strategicMovement",
	"description": "${actplayer} must choose a territory for the Torticrane",
	"descriptionmyturn": "${you} must choose a territory for the Torticrane",
	"type": "activeplayer",
	"args": "argStrategicMovement",
	"possibleactions": [
		"strategicMovement",
		"cancelUsePloy"
	],
	"transitions": {
		"endPloy": 20,
		"cancel": 50
	}
}
					*/
					break;
				case "chooseRoofToTransfer":
					/*
					{
	"name": "chooseRoofToTransfer",
	"description": "${actplayer} must choose a roof to transfer",
	"descriptionmyturn": "${you} must choose a roof to transfer",
	"type": "activeplayer",
	"args": "argChooseRoofToTransfer",
	"possibleactions": [
		"chooseRoofToTransfer",
		"cancelUsePloy"
	],
	"transitions": {
		"chooseRoofDestination": 55,
		"cancel": 50
	}
}
					*/
					break;
				case "chooseRoofDestination":
					/*
					{
	"name": "chooseRoofDestination",
	"description": "${actplayer} must choose a new building for the roof",
	"descriptionmyturn": "${you} must choose a new building for the roof",
	"type": "activeplayer",
	"args": "argChooseRoofDestination",
	"possibleactions": [
		"chooseRoofDestination",
		"cancelUsePloy"
	],
	"transitions": {
		"endPloy": 20,
		"cancel": 50
	}
}
					*/
					break;
				case "buildingInvasion":
					/*
					{
	"name": "buildingInvasion",
	"description": "${actplayer} must choose a building to invade",
	"descriptionmyturn": "${you} must choose a building to invade",
	"type": "activeplayer",
	"args": "argBuildingInvasion",
	"possibleactions": [
		"buildingInvasion",
		"cancelUsePloy"
	],
	"transitions": {
		"chooseCompletedCommonProject": 35,
		"endAction": 65,
		"cancel": 50
	}
}
					*/
					break;
				case "endAction":
					/*
					{
	"name": "endAction",
	"description": "",
	"type": "game",
	"action": "stEndAction",
	"transitions": {
		"newAction": 20,
		"chooseNextPlayer": 70
	}
}
					*/
					break;
				case "chooseNextPlayer":
					/*
					{
	"name": "chooseNextPlayer",
	"description": "${actplayer} must choose the next player",
	"descriptionmyturn": "${you} must choose the next player",
	"type": "activeplayer",
	"action": "stChooseNextPlayer",
	"args": "argChooseNextPlayer",
	"possibleactions": [
		"chooseNextPlayer"
	],
	"transitions": {
		"nextPlayer": 75,
		"endRound": 80
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
		"nextPlayer": 20
	}
}
					*/
					break;
				case "endRound":
					/*
					{
	"name": "endRound",
	"description": "",
	"type": "game",
	"action": "stEndRound",
	"transitions": {
		"newRound": 20,
		"endScore": 90
	}
}
					*/
					break;
				case "endScore":
					/*
					{
	"name": "endScore",
	"description": "",
	"type": "game",
	"action": "stEndScore",
	"updateGameProgression": true,
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
export default gardennation;
