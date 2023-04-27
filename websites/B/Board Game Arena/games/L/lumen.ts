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

const lumen: GamePresence = {
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
		"": 20
	}
}
					*/
					break;
				case "newRound":
					/*
					{
	"name": "newRound",
	"description": "",
	"type": "game",
	"action": "stNewRound",
	"updateGameProgression": true,
	"transitions": {
		"askActivatePlanning": 25,
		"rollDice": 30
	}
}
					*/
					break;
				case "askActivatePlanning":
					/*
					{
	"name": "askActivatePlanning",
	"description": "${actplayer} can activate Planning",
	"descriptionmyturn": "${you} can activate Planning",
	"type": "activeplayer",
	"possibleactions": [
		"activatePlanning",
		"passPlanning"
	],
	"transitions": {
		"activate": 26,
		"pass": 30
	}
}
					*/
					break;
				case "planificationChooseFaces":
					/*
					{
	"name": "planificationChooseFaces",
	"description": "${actplayer} must choose dice faces",
	"descriptionmyturn": "${you} must choose dice faces",
	"type": "activeplayer",
	"possibleactions": [
		"chooseDiceFaces"
	],
	"transitions": {
		"chooseOperation": 35
	}
}
					*/
					break;
				case "rollDice":
					/*
					{
	"name": "rollDice",
	"description": "",
	"type": "game",
	"action": "stRollDice",
	"transitions": {
		"chooseOperation": 35
	}
}
					*/
					break;
				case "chooseOperation":
					/*
					{
	"name": "chooseOperation",
	"description": "${actplayer} must choose an operation",
	"descriptionmyturn": "${you} must choose an operation",
	"type": "activeplayer",
	"args": "argChooseOperation",
	"possibleactions": [
		"chooseOperation"
	],
	"transitions": {
		"chooseCell": 40
	}
}
					*/
					break;
				case "chooseCell":
					/*
					{
	"name": "chooseCell",
	"description": "${actplayer} must report ${number} in an eligible circle",
	"descriptionmyturn": "${you} must report ${number} in an eligible circle",
	"type": "activeplayer",
	"args": "argChooseCell",
	"possibleactions": [
		"chooseCell",
		"cancelOperation"
	],
	"transitions": {
		"chooseAction": 47,
		"cancel": 35,
		"nextPlayer": 80,
		"chooseCellLink": 45
	}
}
					*/
					break;
				case "chooseCellLink":
					/*
					{
	"name": "chooseCellLink",
	"description": "${actplayer} must choose a cell link",
	"descriptionmyturn": "${you} must choose a cell link",
	"type": "activeplayer",
	"args": "argChooseCellLink",
	"possibleactions": [
		"chooseCellLink",
		"cancelOperation"
	],
	"transitions": {
		"chooseAction": 47,
		"cancel": 35,
		"nextPlayer": 80
	}
}
					*/
					break;
				case "confirmCell":
					/*
					{
	"name": "confirmCell",
	"description": "${actplayer} must confirm circle",
	"descriptionmyturn": "${you} must confirm circle",
	"type": "activeplayer",
	"args": "argConfirmCell",
	"possibleactions": [
		"confirmCell",
		"cancelCell"
	],
	"transitions": {
		"chooseAction": 50,
		"cancel": 40
	}
}
					*/
					break;
				case "chooseAction":
					/*
					{
	"name": "chooseAction",
	"description": "${actplayer} must choose the order of actions",
	"descriptionmyturn": "${you} must choose the order of actions",
	"type": "activeplayer",
	"action": "stChooseAction",
	"args": "argChooseAction",
	"possibleactions": [
		"startWithAction",
		"useFoulPlay"
	],
	"transitions": {
		"useFoulPlay": 55,
		"nextMove": 75
	}
}
					*/
					break;
				case "chooseFighter":
					/*
					{
	"name": "chooseFighter",
	"description": "${actplayer} must choose a fighter to play, move or activate",
	"descriptionmyturn": "${you} must choose a fighter to play, move or activate",
	"descriptionOnlyFoolPlay": "${actplayer} can use Foul Play",
	"descriptionmyturnOnlyFoolPlay": "${you} can use Foul Play",
	"descriptionPLACE": "${actplayer} must choose a fighter to play",
	"descriptionmyturnPLACE": "${you} must choose a fighter to play",
	"descriptionMOVE": "${actplayer} must choose a fighter to move or activate",
	"descriptionmyturnMOVE": "${you} must choose a fighter to move or activate",
	"description4": "${actplayer} must choose a fighter to push",
	"descriptionmyturn4": "${you} must choose a fighter to push",
	"description5": "${actplayer} must choose a fighter to assassinate",
	"descriptionmyturn5": "${you} must choose a fighter to assassinate",
	"description9": "${actplayer} must choose a fighter to disable",
	"descriptionmyturn9": "${you} must choose a fighter to disable",
	"description21": "${actplayer} must choose two fighters to remove",
	"descriptionmyturn21": "${you} must choose two fighters to remove",
	"description22": "${actplayer} must choose a fighter to reset its territory",
	"descriptionmyturn22": "${you} must choose a fighter to reset its territory",
	"description23": "${actplayer} must choose two fighters to swap",
	"descriptionmyturn23": "${you} must choose two fighters to swap",
	"type": "activeplayer",
	"args": "argChooseFighter",
	"possibleactions": [
		"playFighter",
		"moveFighter",
		"activateFighter",
		"chooseFighters",
		"cancelChooseFighters",
		"pass",
		"passChooseFighters",
		"useFoulPlay",
		"cancelFoulPlay"
	],
	"transitions": {
		"useFoulPlay": 55,
		"cancel": 55,
		"chooseTerritory": 60,
		"chooseFighter": 55,
		"nextMove": 75,
		"nextPlayer": 80
	}
}
					*/
					break;
				case "chooseTerritory":
					/*
					{
	"name": "chooseTerritory",
	"description": "",
	"descriptionmyturn": "",
	"description1": "${actplayer} must choose a territory to place the new fighter",
	"descriptionmyturn1": "${you} must choose a territory to place the new fighter",
	"description2": "${actplayer} must choose a territory to move the fighter",
	"descriptionmyturn2": "${you} must choose a territory to move the fighter",
	"description4": "${actplayer} must choose a territory to push the fighter to",
	"descriptionmyturn4": "${you} must choose a territory to push the fighter to",
	"description6": "${actplayer} must choose a territory to fly to",
	"descriptionmyturn6": "${you} must choose a territory to fly to",
	"description7": "${actplayer} must choose a territory to move the fighter",
	"descriptionmyturn7": "${you} must choose a territory to move the fighter",
	"description8": "${actplayer} must choose a territory to place the initiative marker",
	"descriptionmyturn8": "${you} must choose a territory to place the initiative marker",
	"type": "activeplayer",
	"args": "argChooseTerritory",
	"possibleactions": [
		"chooseTerritory",
		"cancelChooseTerritory"
	],
	"transitions": {
		"cancel": 55,
		"chooseCellInterference": 65,
		"chooseFighter": 55,
		"nextMove": 75
	}
}
					*/
					break;
				case "chooseCellInterference":
					/*
					{
	"name": "chooseCellInterference",
	"description": "${actplayer} must choose a circle for Interference",
	"descriptionmyturn": "${you} must choose a circle for Interference",
	"type": "activeplayer",
	"args": "argChooseCellInterference",
	"possibleactions": [
		"chooseCellInterference"
	],
	"transitions": {
		"nextMove": 75
	}
}
					*/
					break;
				case "nextMove":
					/*
					{
	"name": "nextMove",
	"description": "",
	"type": "game",
	"action": "stNextMove",
	"transitions": {
		"chooseAction": 50,
		"chooseFighter": 55,
		"nextPlayer": 80
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
	"transitions": {
		"nextPlayer": 35,
		"endRound": 85
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
	"updateGameProgression": true,
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
export default lumen;
