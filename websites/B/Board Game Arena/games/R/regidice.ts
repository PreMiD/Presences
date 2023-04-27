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

const regidice: GamePresence = {
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
				case "modeCheck":
					/*
					{
	"name": "modeCheck",
	"description": "",
	"type": "game",
	"action": "stModeCheck",
	"transitions": {
		"normal": 3,
		"solo": 6
	}
}
					*/
					break;
				case "selectRoleAndRoll":
					/*
					{
	"name": "selectRoleAndRoll",
	"description": "${actplayer} must declare an action and a die type to gather",
	"descriptionmyturn": "${you} must declare an action and a die type to gather",
	"type": "activeplayer",
	"args": "argSelectRoleAndRoll",
	"possibleactions": [
		"selectRoleAndRoll"
	],
	"transitions": {
		"selectRoleAndRoll": 4,
		"zombiePass": 4
	}
}
					*/
					break;
				case "nextSelectPlayer":
					/*
					{
	"name": "nextSelectPlayer",
	"description": "",
	"type": "game",
	"action": "stNextSelectPlayer",
	"transitions": {
		"selectContinue": 3,
		"selectEnd": 5
	}
}
					*/
					break;
				case "distributeDice":
					/*
					{
	"name": "distributeDice",
	"description": "",
	"type": "game",
	"action": "stDistributeDice",
	"transitions": {
		"": 6
	}
}
					*/
					break;
				case "selectAction":
					/*
					{
	"name": "selectAction",
	"description": "All players may resolve actions in any order",
	"descriptionmyturn": "${you} may resolve actions in any order",
	"type": "multipleactiveplayer",
	"args": "argSelectAction",
	"action": "stSelectActionInit",
	"possibleactions": [
		"attackAction",
		"blockAction",
		"healAction",
		"animalAction",
		"castAttackAction",
		"castBlockAction",
		"castHealAction",
		"castDeathAction",
		"passTurn",
		"passCancel",
		"waitTurn"
	],
	"transitions": {
		"actionContinue": 6,
		"actionEnd": 7
	}
}
					*/
					break;
				case "enemyCheck":
					/*
					{
	"name": "enemyCheck",
	"description": "",
	"type": "game",
	"action": "stEnemyCheck",
	"updateGameProgression": true,
	"transitions": {
		"sufferDamage": 8,
		"distributeBlackDice": 9,
		"noChoice": 10,
		"endGame": 99
	}
}
					*/
					break;
				case "sufferDamage":
					/*
					{
	"name": "sufferDamage",
	"description": "Some players must decide how to take ${nb} damage",
	"descriptionmyturn": "${you} must decide how to take ${nb} damage",
	"type": "multipleactiveplayer",
	"args": "argSufferDamage",
	"action": "stSufferDamageInit",
	"possibleactions": [
		"sufferDamage"
	],
	"transitions": {
		"sufferDamage": 10,
		"zombiePass": 10
	}
}
					*/
					break;
				case "distributeBlackDice":
					/*
					{
	"name": "distributeBlackDice",
	"description": "Players dealt damage must decide how to distribute black dice",
	"descriptionmyturn": "${you} must decide how to distribute black dice",
	"type": "multipleactiveplayer",
	"action": "stDistributeBlackDiceInit",
	"possibleactions": [
		"takeBlackDie",
		"stopTakingBlackDie"
	],
	"transitions": {
		"dieLeft": 9,
		"dieDone": 10,
		"zombiePass": 10
	}
}
					*/
					break;
				case "prepareCheck":
					/*
					{
	"name": "prepareCheck",
	"description": "",
	"type": "game",
	"args": "argPrepareCheck",
	"action": "stPrepareCheck",
	"transitions": {
		"prepareDice": 11,
		"noChoice": 12
	}
}
					*/
					break;
				case "prepareDice":
					/*
					{
	"name": "prepareDice",
	"description": "All players may choose dice to reserve for the next player",
	"descriptionmyturn": "${you} may choose dice to reserve for ${_private.next_player_name}",
	"type": "multipleactiveplayer",
	"args": "argPrepareDice",
	"action": "stPrepareDiceInit",
	"possibleactions": [
		"prepareDice",
		"preparePass"
	],
	"transitions": {
		"prepareDone": 12,
		"zombiePass": 12
	}
}
					*/
					break;
				case "nextRound":
					/*
					{
	"name": "nextRound",
	"description": "",
	"type": "game",
	"action": "stNextRound",
	"transitions": {
		"": 2
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
export default regidice;
