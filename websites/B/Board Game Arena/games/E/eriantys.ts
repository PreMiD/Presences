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

const eriantys: GamePresence = {
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
		"": 10
	}
}
					*/
					break;
				case "playAssistant":
					/*
					{
	"name": "playAssistant",
	"description": "${actplayer} must play an Assistant card",
	"descriptionmyturn": "${you} must play an Assistant card",
	"type": "activeplayer",
	"args": "argPlayAssistant",
	"possibleactions": [
		"playAssistant"
	],
	"transitions": {
		"next": 11,
		"zombiePass": 99
	}
}
					*/
					break;
				case "nextPlayerPlanning":
					/*
					{
	"name": "nextPlayerPlanning",
	"type": "game",
	"description": "Resolving planning phase",
	"action": "stNextPlayerPlanning",
	"updateGameProgression": true,
	"transitions": {
		"nextTurn": 10,
		"nextPhase": 20
	}
}
					*/
					break;
				case "moveStudents":
					/*
					{
	"name": "moveStudents",
	"description": "${actplayer} must move one of his/her new students (${stud_count}/${stud_max})",
	"descriptionmyturn": "${you} must move one of your new students (${stud_count}/${stud_max})",
	"type": "activeplayer",
	"args": "argMoveStudents",
	"possibleactions": [
		"moveStudent",
		"useCharacter",
		"undoAction"
	],
	"transitions": {
		"next": 21,
		"undoAction": 21,
		"useCharacter": 60,
		"zombiePass": 99,
		"char_1": 51,
		"char_2": 52,
		"char_4": 53,
		"char_6": 54,
		"char_8": 55,
		"char_9": 56,
		"char_10": 57,
		"char_11": 58
	}
}
					*/
					break;
				case "moveAgain":
					/*
					{
	"name": "moveAgain",
	"type": "game",
	"action": "stMoveAgain",
	"transitions": {
		"again": 20,
		"next": 30
	}
}
					*/
					break;
				case "moveMona":
					/*
					{
	"name": "moveMona",
	"description": "${actplayer} must move Mother Nature",
	"descriptionmyturn": "${you} must move Mother Nature",
	"type": "activeplayer",
	"args": "argMoveMona",
	"possibleactions": [
		"moveMona",
		"useCharacter"
	],
	"transitions": {
		"pickCloud": 40,
		"useCharacter": 60,
		"endTurn": 41,
		"gameEnd": 99,
		"zombiePass": 99,
		"char_1": 51,
		"char_2": 52,
		"char_4": 53,
		"char_6": 54,
		"char_8": 55,
		"char_9": 56,
		"char_10": 57,
		"char_11": 58
	}
}
					*/
					break;
				case "cloudTileDrafting":
					/*
					{
	"name": "cloudTileDrafting",
	"description": "${actplayer} must choose a Cloud tile",
	"descriptionmyturn": "${you} must choose a Cloud tile",
	"type": "activeplayer",
	"args": "argCloudTileDrafting",
	"possibleactions": [
		"chooseCloudTile",
		"useCharacter"
	],
	"transitions": {
		"endTurn": 41,
		"useCharacter": 60,
		"zombiePass": 99,
		"char_1": 51,
		"char_2": 52,
		"char_4": 53,
		"char_6": 54,
		"char_8": 55,
		"char_9": 56,
		"char_10": 57,
		"char_11": 58
	}
}
					*/
					break;
				case "nextPlayerAction":
					/*
					{
	"name": "nextPlayerAction",
	"type": "game",
	"description": "Resolving action phase",
	"action": "stNextPlayerAction",
	"updateGameProgression": true,
	"transitions": {
		"nextPlayerAction": 20,
		"nextRound": 10,
		"gameEnd": 99
	}
}
					*/
					break;
				case "useCharacterAbility":
					/*
					{
	"name": "useCharacterAbility",
	"type": "game",
	"action": "stUseCharacterAbility",
	"transitions": {
		"char_1": 20,
		"char_2": 52,
		"char_4": 53,
		"char_6": 54,
		"char_8": 55,
		"char_9": 56,
		"char_10": 20,
		"char_11": 58
	}
}
					*/
					break;
				case "character1_ability":
					/*
					{
	"name": "character1_ability",
	"description": "${actplayer} must must move a Student from the Character card to an Island",
	"descriptionmyturn": "${you} must must move a Student from the Character card to an Island",
	"type": "activeplayer",
	"args": "argMoveStudents",
	"possibleactions": [
		"moveStudent"
	],
	"transitions": {
		"endAbility": 60,
		"zombiePass": 99
	}
}
					*/
					break;
				case "character2_ability":
					/*
					{
	"name": "character2_ability",
	"description": "${actplayer} must choose an Island to resolve",
	"descriptionmyturn": "${you} must choose an Island to resolve",
	"type": "activeplayer",
	"args": "argMoveMona",
	"possibleactions": [
		"moveMona"
	],
	"transitions": {
		"endAbility": 60,
		"zombiePass": 99
	}
}
					*/
					break;
				case "character4_ability":
					/*
					{
	"name": "character4_ability",
	"description": "${actplayer} must place a No Entry token on an Island",
	"descriptionmyturn": "${you} must place a No Entry token on an Island",
	"type": "activeplayer",
	"possibleactions": [
		"placeNoEntry"
	],
	"transitions": {
		"endAbility": 60,
		"zombiePass": 99
	}
}
					*/
					break;
				case "character6_ability":
					/*
					{
	"name": "character6_ability",
	"description": "${actplayer} may replace up to 3 Students from his/her School entrance with Students on the Character card",
	"descriptionmyturn": "${you} may replace up to 3 Students from your School entrance with Students on the Character card",
	"type": "activeplayer",
	"possibleactions": [
		"replaceStudents"
	],
	"transitions": {
		"endAbility": 60,
		"zombiePass": 99
	}
}
					*/
					break;
				case "character8_ability":
					/*
					{
	"name": "character8_ability",
	"description": "${actplayer} must choose a Student color",
	"descriptionmyturn": "${you} must choose a Student color",
	"type": "activeplayer",
	"possibleactions": [
		"pickStudentColor"
	],
	"transitions": {
		"endAbility": 60,
		"zombiePass": 99
	}
}
					*/
					break;
				case "character9_ability":
					/*
					{
	"name": "character9_ability",
	"description": "${actplayer} may replace up to 2 Students from his/her School entrance with Students in his/her School Dining Hall",
	"descriptionmyturn": "${you} may replace up to 2 Students from your School entrance with Students in your School Dining Hall",
	"type": "activeplayer",
	"possibleactions": [
		"replaceStudents"
	],
	"transitions": {
		"endAbility": 60,
		"zombiePass": 99
	}
}
					*/
					break;
				case "character10_ability":
					/*
					{
	"name": "character10_ability",
	"description": "${actplayer} must must move a Student from the Character card to his/her School Dining Hall",
	"descriptionmyturn": "${you} must must move a Student from the Character card to your School Dining Hall",
	"type": "activeplayer",
	"args": "argMoveStudents",
	"possibleactions": [
		"moveStudent"
	],
	"transitions": {
		"endAbility": 60,
		"zombiePass": 99
	}
}
					*/
					break;
				case "character11_ability":
					/*
					{
	"name": "character11_ability",
	"description": "${actplayer} must choose a Student color",
	"descriptionmyturn": "${you} must choose a Student color",
	"type": "activeplayer",
	"possibleactions": [
		"pickStudentColor"
	],
	"transitions": {
		"endAbility": 60,
		"zombiePass": 99
	}
}
					*/
					break;
				case "endCharacterAbility":
					/*
					{
	"name": "endCharacterAbility",
	"type": "game",
	"action": "stEndCharacterAbility",
	"transitions": {
		"moveStudents": 20,
		"moveMona": 30,
		"cloudTileDrafting": 40
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
export default eriantys;
