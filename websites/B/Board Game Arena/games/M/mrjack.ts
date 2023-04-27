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

const mrjack: GamePresence = {
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
				case "roundSetup":
					/*
					{
	"name": "roundSetup",
	"description": "",
	"type": "game",
	"action": "stRoundSetup",
	"transitions": {
		"pickCharacter": 10
	}
}
					*/
					break;
				case "pickCharacterCard":
					/*
					{
	"name": "pickCharacterCard",
	"description": "${actplayer} must pick a character",
	"descriptionmyturn": "${you} must pick ${characterText}",
	"type": "activeplayer",
	"possibleactions": [
		"selectCharacterCard"
	],
	"transitions": {
		"moveCharacter": 20,
		"moveCharacterWithAbility": 15
	},
	"args": "argPickCharacterCard",
	"updateGameProgression": true
}
					*/
					break;
				case "moveCharacterWithAbility":
					/*
					{
	"name": "moveCharacterWithAbility",
	"description": "${actplayer} must move ${characterName} or use his ability",
	"descriptionmyturn": "${you} must move ${characterName} or use his ability",
	"type": "activeplayer",
	"possibleactions": [
		"moveCharacter",
		"characterExit",
		"characterCapture",
		"decideAbility",
		"cancelCharacter"
	],
	"transitions": {
		"moveGaslight": 30,
		"moveCordon": 32,
		"moveManhole": 34,
		"switchPlace": 37,
		"moveCloser": 38,
		"pickCharacter": 10,
		"endTurn": 60,
		"endGame": 99
	},
	"args": "argMoveCharacter"
}
					*/
					break;
				case "afterSpecialAction":
					/*
					{
	"name": "afterSpecialAction",
	"type": "game",
	"action": "stAfterSpecialAction",
	"transitions": {
		"endTurn": 60,
		"moveCharacter": 20
	}
}
					*/
					break;
				case "moveCharacter":
					/*
					{
	"name": "moveCharacter",
	"description": "${actplayer} must move ${characterName}",
	"descriptionmyturn": "${you} must move ${characterName}",
	"type": "activeplayer",
	"possibleactions": [
		"moveCharacter",
		"characterExit",
		"characterCapture",
		"cancelCharacter"
	],
	"transitions": {
		"endTurn": 60,
		"endGame": 99,
		"pickCharacter": 10,
		"dealAlibiCard": 36,
		"rotateWatson": 41
	},
	"args": "argMoveCharacter"
}
					*/
					break;
				case "selectSourceGaslight":
					/*
					{
	"name": "selectSourceGaslight",
	"description": "${actplayer} must move one gaslight",
	"descriptionmyturn": "${you} must move one gaslight",
	"type": "activeplayer",
	"possibleactions": [
		"selectSourceGaslight",
		"cancelAbility"
	],
	"transitions": {
		"selected": 31,
		"cancel": 15
	},
	"args": "argSelectSourceGaslight"
}
					*/
					break;
				case "selectGaslightDestination":
					/*
					{
	"name": "selectGaslightDestination",
	"description": "${actplayer} must decide where to move selected gaslight",
	"descriptionmyturn": "${you} must decide where to move selected gaslight",
	"type": "activeplayer",
	"possibleactions": [
		"selectGaslightDestination",
		"cancelSelection"
	],
	"transitions": {
		"afterSpecialAction": 16,
		"cancelSelection": 30
	},
	"args": "argSelectGaslightDestination"
}
					*/
					break;
				case "selectSourceCordon":
					/*
					{
	"name": "selectSourceCordon",
	"description": "${actplayer} must select one cordon to move",
	"descriptionmyturn": "${you} must select one cordon to move",
	"type": "activeplayer",
	"possibleactions": [
		"selectSourceCordon",
		"cancelAbility"
	],
	"transitions": {
		"selected": 33,
		"cancel": 15
	},
	"args": "argMoveCordon"
}
					*/
					break;
				case "selectCordonDestination":
					/*
					{
	"name": "selectCordonDestination",
	"description": "${actplayer} must decide where to move selected cordon",
	"descriptionmyturn": "${you} must decide where to move selected cordon",
	"type": "activeplayer",
	"possibleactions": [
		"selectCordonDestination",
		"cancelSelection"
	],
	"transitions": {
		"afterSpecialAction": 16,
		"cancelSelection": 32
	},
	"args": "argMoveCordon"
}
					*/
					break;
				case "selectSourceManhole":
					/*
					{
	"name": "selectSourceManhole",
	"description": "${actplayer} must select one manhole to move",
	"descriptionmyturn": "${you} must select one manhole to move",
	"type": "activeplayer",
	"possibleactions": [
		"selectSourceManhole",
		"cancelAbility"
	],
	"transitions": {
		"selected": 35,
		"cancel": 15
	},
	"args": "argSelectSourceManhole"
}
					*/
					break;
				case "selectManholeDestination":
					/*
					{
	"name": "selectManholeDestination",
	"description": "${actplayer} must decide where to move selected manhole",
	"descriptionmyturn": "${you} must decide where to move selected manhole",
	"type": "activeplayer",
	"possibleactions": [
		"selectManholeDestination",
		"cancelSelection"
	],
	"transitions": {
		"afterSpecialAction": 16,
		"cancelSelection": 34
	},
	"args": "argSelectManholeDestination"
}
					*/
					break;
				case "dealAlibiCard":
					/*
					{
	"name": "dealAlibiCard",
	"description": "",
	"type": "game",
	"action": "stDealAlibiCard",
	"transitions": {
		"afterSpecialAction": 16
	}
}
					*/
					break;
				case "switchPlace":
					/*
					{
	"name": "switchPlace",
	"description": "${actplayer} must select character to switch place with",
	"descriptionmyturn": "${you} must select character to switch place with",
	"type": "activeplayer",
	"possibleactions": [
		"switchPlace",
		"cancelAbility"
	],
	"transitions": {
		"endTurn": 60,
		"cancel": 15,
		"rotateWatson": 41
	},
	"args": "argOtherCharacters"
}
					*/
					break;
				case "startMoveCloser":
					/*
					{
	"name": "startMoveCloser",
	"description": "",
	"type": "game",
	"action": "stStartMovecloser",
	"transitions": {
		"pickCharacterTomoveCloser": 39
	}
}
					*/
					break;
				case "pickCharacterToMoveCloser":
					/*
					{
	"name": "pickCharacterToMoveCloser",
	"description": "${actplayer} must select character to move closer to Sergeant Goodley (${count} movements left)",
	"descriptionmyturn": "${you} must select character to move closer to Sergeant Goodley (${count} movements left)",
	"type": "activeplayer",
	"possibleactions": [
		"pickCharacterToMoveCloser",
		"cancelAbility"
	],
	"transitions": {
		"moveCloser": 40,
		"cancel": 15
	},
	"args": "argPickCharacterToMoveCloser"
}
					*/
					break;
				case "moveCloser":
					/*
					{
	"name": "moveCloser",
	"description": "${actplayer} must move ${characterName} closer to Sergeant Goodley (${count} movements left)",
	"descriptionmyturn": "${you} must move ${characterName} closer to Sergeant Goodley (${count} movements left)",
	"type": "activeplayer",
	"possibleactions": [
		"moveCloser",
		"cancelCharacter"
	],
	"transitions": {
		"movementPointsLeft": 39,
		"afterSpecialAction": 16,
		"rotateWatson": 41
	},
	"args": "argMoveCloser"
}
					*/
					break;
				case "rotateWatson":
					/*
					{
	"name": "rotateWatson",
	"description": "${actplayer} must chose final Watson orientation",
	"descriptionmyturn": "${you} must chose final Watson orientation",
	"type": "activeplayer",
	"possibleactions": [
		"rotateWatson",
		"confirmWatsonRotation"
	],
	"transitions": {
		"endTurn": 60,
		"movementPointsLeft": 39,
		"afterSpecialAction": 16
	},
	"args": "argRotateWatson"
}
					*/
					break;
				case "turnEnd":
					/*
					{
	"name": "turnEnd",
	"description": "",
	"type": "game",
	"action": "stTurnEnd",
	"transitions": {
		"pickCharacterCard": 10,
		"newRound": 70
	}
}
					*/
					break;
				case "roundWrapUp":
					/*
					{
	"name": "roundWrapUp",
	"description": "",
	"type": "game",
	"action": "stRoundWrapUp",
	"transitions": {
		"nextRound": 2,
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
export default mrjack;
