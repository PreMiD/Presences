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

const rallymangt: GamePresence = {
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
				case "checkManualStart":
					/*
					{
	"name": "checkManualStart",
	"args": "argManualStart",
	"type": "game",
	"action": "stCheckManualStart",
	"transitions": {
		"manual": 16,
		"begin": 3
	}
}
					*/
					break;
				case "beginTurn":
					/*
					{
	"name": "beginTurn",
	"description": "",
	"type": "game",
	"action": "stBeginTurn",
	"args": "argBeginTurn",
	"updateGameProgression": true,
	"transitions": {
		"diceSelection": 4,
		"tireChoose": 9,
		"reenter": 10,
		"beginTurn": 3
	}
}
					*/
					break;
				case "diceSelection":
					/*
					{
	"name": "diceSelection",
	"description": "${actplayer} must set its trajectory",
	"descriptionmyturn": "${you} must set your trajectory",
	"type": "activeplayer",
	"args": "argDiceSelection",
	"possibleactions": [
		"actRollDice",
		"actSelectLimit",
		"actSelectDice",
		"actCancelDice",
		"actFlatout",
		"actBuy",
		"actUndo"
	],
	"transitions": {
		"endTurn": 6,
		"flyStart": 13,
		"same": 4,
		"diceSelection": 4,
		"diceRoll": 5,
		"checkPitStop": 7,
		"lossSide": 12,
		"flatout": 11
	}
}
					*/
					break;
				case "diceRoll":
					/*
					{
	"name": "diceRoll",
	"description": "${actplayer} must choose to roll or stop",
	"descriptionmyturn": "${you} must choose to roll or stop",
	"type": "activeplayer",
	"args": "argDiceSelection",
	"possibleactions": [
		"actRollDice",
		"actRollPass",
		"actBuy"
	],
	"transitions": {
		"endTurn": 6,
		"diceRoll": 5,
		"checkPitStop": 7,
		"lossSide": 12
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
	"transitions": {
		"beginTurn": 3,
		"endGame": 14
	}
}
					*/
					break;
				case "checkPitStop":
					/*
					{
	"name": "checkPitStop",
	"description": "",
	"type": "game",
	"action": "stCheckPitStop",
	"args": "argDiceSelection",
	"transitions": {
		"endTurn": 6,
		"pitStop": 8
	}
}
					*/
					break;
				case "pitStop":
					/*
					{
	"name": "pitStop",
	"description": "${actplayer} must choose to make a pit stop",
	"descriptionmyturn": "${you} must choose to make a pit stop",
	"type": "activeplayer",
	"possibleactions": [
		"actPitStop"
	],
	"transitions": {
		"endTurn": 6
	}
}
					*/
					break;
				case "tireChoose":
					/*
					{
	"name": "tireChoose",
	"description": "${actplayer} must choose a type of tires",
	"descriptionmyturn": "${you} must choose a type of tires",
	"type": "activeplayer",
	"possibleactions": [
		"actTireChoose"
	],
	"transitions": {
		"endTurn": 6,
		"reenter": 10
	}
}
					*/
					break;
				case "reenter":
					/*
					{
	"name": "reenter",
	"description": "",
	"type": "game",
	"action": "stReenter",
	"transitions": {
		"endTurn": 6,
		"beginTurn": 3
	}
}
					*/
					break;
				case "flatout":
					/*
					{
	"name": "flatout",
	"description": "${actplayer} must set back their dices with a loss of control",
	"descriptionmyturn": "${you} must set back your dices with a loss of control",
	"type": "activeplayer",
	"args": "argFlatout",
	"possibleactions": [
		"actSelectDice",
		"actSelectLimit",
		"actCancelDice",
		"actFinishSetBack",
		"actUndo"
	],
	"transitions": {
		"endTurn": 6,
		"same": 11,
		"flyStart": 15,
		"diceSelection": 11,
		"checkPitStop": 7,
		"lossSide": 12
	}
}
					*/
					break;
				case "lossSide":
					/*
					{
	"name": "lossSide",
	"description": "${actplayer} must choose which side it spins off",
	"descriptionmyturn": "${you} must choose which side you spin off",
	"type": "activeplayer",
	"possibleactions": [
		"actLossSide"
	],
	"transitions": {
		"endTurn": 6,
		"checkPitStop": 7
	}
}
					*/
					break;
				case "flystartOrBoost":
					/*
					{
	"name": "flystartOrBoost",
	"description": "${actplayer} must choose between flying start or boost dice",
	"descriptionmyturn": "${you} must choose between flying start or boost dice",
	"type": "activeplayer",
	"possibleactions": [
		"actFlyStart"
	],
	"transitions": {
		"endTurn": 6,
		"diceSelection": 4
	}
}
					*/
					break;
				case "endGame":
					/*
					{
	"name": "endGame",
	"description": "Race finished",
	"descriptionmyturn": "Race finished",
	"type": "activeplayer",
	"args": "argFinalGame",
	"action": "stEndGame",
	"possibleactions": [
		"actNext"
	],
	"transitions": {
		"gameEnd": 99
	}
}
					*/
					break;
				case "flystartOrBoostFlatout":
					/*
					{
	"name": "flystartOrBoostFlatout",
	"description": "${actplayer} must choose between flying start or boost dice",
	"descriptionmyturn": "${you} must choose between flying start or boost dice",
	"type": "activeplayer",
	"possibleactions": [
		"actFlyStart"
	],
	"transitions": {
		"endTurn": 6,
		"diceSelection": 11
	}
}
					*/
					break;
				case "manualStart":
					/*
					{
	"name": "manualStart",
	"args": "argManualStart",
	"type": "activeplayer",
	"possibleactions": [
		"actChooseStart"
	],
	"description": "${actplayer} must choose its starting position",
	"descriptionmyturn": "${you} must choose your starting position",
	"transitions": {
		"check": 2
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
export default rallymangt;
