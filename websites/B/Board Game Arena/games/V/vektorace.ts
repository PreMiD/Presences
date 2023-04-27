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

const vektorace: GamePresence = {
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
				case "firstPlayerPositioning":
					/*
					{
	"name": "firstPlayerPositioning",
	"type": "activeplayer",
	"description": "${actplayer} must choose his/her starting position",
	"descriptionmyturn": "${you} must choose your starting position",
	"possibleactions": [
		"placeFirstCar"
	],
	"args": "argFirstPlayerPositioning",
	"transitions": {
		"chooseTokens": 4,
		"zombiePass": 5
	}
}
					*/
					break;
				case "flyingStartPositioning":
					/*
					{
	"name": "flyingStartPositioning",
	"type": "activeplayer",
	"description": "${actplayer} must choose his/her starting position",
	"descriptionmyturn": "${you} have to select a reference car to determine all possible \"flying-start\" positions",
	"possibleactions": [
		"placeCarFS"
	],
	"args": "argFlyingStartPositioning",
	"transitions": {
		"chooseTokens": 4,
		"zombiePass": 5
	}
}
					*/
					break;
				case "tokenAmountChoice":
					/*
					{
	"name": "tokenAmountChoice",
	"type": "activeplayer",
	"description": "${actplayer} must choose with how many token of each type he/she wishes to start the game",
	"descriptionmyturn": "${you} must choose with how many token of each type you wish to start the game",
	"possibleactions": [
		"chooseTokensAmount"
	],
	"args": "argTokenAmountChoice",
	"transitions": {
		"endInitialTokenAmt": 5,
		"zombiePass": 5
	}
}
					*/
					break;
				case "nextPositioning":
					/*
					{
	"name": "nextPositioning",
	"type": "game",
	"description": "",
	"action": "stNextPositioning",
	"transitions": {
		"nextPositioningPlayer": 3,
		"gameStart": 6
	}
}
					*/
					break;
				case "greenLight":
					/*
					{
	"name": "greenLight",
	"type": "activeplayer",
	"description": "${actplayer} must choose the starting gear vector for all players",
	"descriptionmyturn": "${you} must choose the starting gear vector for all players",
	"args": "argGreenLight",
	"possibleactions": [
		"chooseStartingGear"
	],
	"transitions": {
		"placeVector": 7,
		"zombiePass": 16
	}
}
					*/
					break;
				case "gearVectorPlacement":
					/*
					{
	"name": "gearVectorPlacement",
	"type": "activeplayer",
	"action": "stGearVectorPlacement",
	"description": "${actplayer} must place his/her current gear vector",
	"descriptionmyturn": "${you} must place your current gear vector",
	"args": "argGearVectorPlacement",
	"possibleactions": [
		"placeGearVector",
		"brakeCar",
		"giveWay"
	],
	"transitions": {
		"boostPromt": 8,
		"skipBoost": 10,
		"slowdownOrBrake": 17,
		"setNewTurnOrder": 19,
		"zombiePass": 16
	},
	"updateGameProgression": true
}
					*/
					break;
				case "boostPrompt":
					/*
					{
	"name": "boostPrompt",
	"type": "activeplayer",
	"description": "${actplayer} can choose to use a boost to extend his/her car movement",
	"descriptionmyturn": "${you} can choose to use a boost to extend your car movement",
	"possibleactions": [
		"useBoost"
	],
	"transitions": {
		"use": 9,
		"skip": 10,
		"zombiePass": 16
	}
}
					*/
					break;
				case "boostVectorPlacement":
					/*
					{
	"name": "boostVectorPlacement",
	"type": "activeplayer",
	"action": "stBoostVectorPlacement",
	"description": "${actplayer} must choose which boost he/she wants to use",
	"descriptionmyturn": "${you} must choose which boost you want to use",
	"args": "argBoostVectorPlacement",
	"possibleactions": [
		"placeBoostVector"
	],
	"transitions": {
		"placeCar": 10,
		"zombiePass": 16
	}
}
					*/
					break;
				case "carPlacement":
					/*
					{
	"name": "carPlacement",
	"type": "activeplayer",
	"description": "${actplayer} must choose where he/she wants to place his/her car",
	"descriptionmyturn": "${you} must choose where you want to place your car",
	"args": "argCarPlacement",
	"possibleactions": [
		"placeCar"
	],
	"transitions": {
		"attack": 12,
		"boxEntrance": 11,
		"endMovement": 14,
		"zombiePass": 16
	}
}
					*/
					break;
				case "pitStop":
					/*
					{
	"name": "pitStop",
	"type": "activeplayer",
	"action": "stPitStop",
	"description": "${actplayer} must choose how to refill his/her token reserve",
	"descriptionmyturn": "${you} must choose how to refill your token reserve",
	"args": "argPitStop",
	"possibleactions": [
		"chooseTokensAmount"
	],
	"transitions": {
		"endPitStopRefill": 14,
		"zombiePass": 16
	}
}
					*/
					break;
				case "attackManeuvers":
					/*
					{
	"name": "attackManeuvers",
	"type": "activeplayer",
	"action": "stAttackManeuvers",
	"description": "${actplayer} can perform some attack maneuvers",
	"descriptionmyturn": "${you} can choose to attack a car",
	"args": "argAttackManeuvers",
	"possibleactions": [
		"engageManeuver",
		"skipAttack"
	],
	"transitions": {
		"endOfMovement": 14,
		"zombiePass": 16
	}
}
					*/
					break;
				case "boxBoxPromt":
					/*
					{
	"name": "boxBoxPromt",
	"type": "activeplayer",
	"description": "${actplayer} can decide to call \"BoxBox!\"",
	"descriptionmyturn": "${you} can decide to call ",
	"possibleactions": [
		"boxBox"
	],
	"transitions": {
		"endTurn": 15,
		"zombiePass": 16
	}
}
					*/
					break;
				case "endOfMovementSpecialEvents":
					/*
					{
	"name": "endOfMovementSpecialEvents",
	"type": "game",
	"action": "stEndOfMovementSpecialEvents",
	"transitions": {
		"gearDeclaration": 15,
		"skipGearDeclaration": 16,
		"boxBox": 13,
		"raceEnd": 99
	}
}
					*/
					break;
				case "futureGearDeclaration":
					/*
					{
	"name": "futureGearDeclaration",
	"type": "activeplayer",
	"description": "${actplayer} must declare what gear he/she will use in the next turn",
	"descriptionmyturn": "${you} must declare what gear you will use in the next turn",
	"args": "argFutureGearDeclaration",
	"possibleactions": [
		"declareGear"
	],
	"transitions": {
		"nextPlayer": 16,
		"zombiePass": 16
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
		"": 7
	}
}
					*/
					break;
				case "EmergencyBrake":
					/*
					{
	"name": "EmergencyBrake",
	"type": "game",
	"action": "stEmergencyBrake",
	"transitions": {
		"slowdown": 7,
		"brake": 18
	}
}
					*/
					break;
				case "emergencyBrake":
					/*
					{
	"name": "emergencyBrake",
	"type": "activeplayer",
	"description": "${actplayer} must choose how to rotate his/her car",
	"descriptionmyturn": "${you} must choose how to rotate your car",
	"args": "argEmergencyBrake",
	"possibleactions": [
		"rotateAfterBrake"
	],
	"transitions": {
		"endOfTurn": 15,
		"zombiePass": 16
	}
}
					*/
					break;
				case "giveWay":
					/*
					{
	"name": "giveWay",
	"type": "game",
	"action": "stGiveWay",
	"transitions": {
		"": 7
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
export default vektorace;
