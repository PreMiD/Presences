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

const pandemic: GamePresence = {
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
				case "initRole":
					/*
					{
	"name": "initRole",
	"type": "game",
	"action": "stInitRole",
	"transitions": {
		"pick": 3,
		"allRoleSet": 4
	}
}
					*/
					break;
				case "pickRole":
					/*
					{
	"name": "pickRole",
	"type": "multipleactiveplayer",
	"descriptionmyturn": "Choose a role",
	"description": "Waiting for other players",
	"args": "argPickRole",
	"possibleactions": [
		"pickRole"
	],
	"transitions": {
		"allRoleSet": 4
	}
}
					*/
					break;
				case "initialDisease":
					/*
					{
	"name": "initialDisease",
	"type": "multipleactiveplayer",
	"descriptionmyturn": "Initial Diseases",
	"description": "Waiting for other players",
	"possibleactions": [
		"initReady"
	],
	"action": "stInitialDisease",
	"transitions": {
		"playerReady": 5,
		"zombiePass": 5
	}
}
					*/
					break;
				case "allPlayerReady":
					/*
					{
	"name": "allPlayerReady",
	"type": "game",
	"action": "stAllPlayerReady",
	"transitions": {
		"nextAction": 10
	}
}
					*/
					break;
				case "chooseAction":
					/*
					{
	"name": "chooseAction",
	"description": "${active_role} has ${action_left} action(s) left",
	"descriptionmyturn": "",
	"type": "activeplayer",
	"args": "argChooseAction",
	"action": "stChooseAction",
	"possibleactions": [
		"action",
		"event",
		"pass",
		"undo"
	],
	"transitions": {
		"actionDone": 15,
		"startForecast": 11,
		"zombiePass": 15,
		"afterPass": 16
	},
	"updateGameProgression": true
}
					*/
					break;
				case "forecast":
					/*
					{
	"name": "forecast",
	"description": "${actplayer} is sorting cards",
	"descriptionmyturn": "${you} must sort cards",
	"type": "activeplayer",
	"args": "argForecastCards",
	"action": "stForecast",
	"possibleactions": [
		"sendForecast"
	],
	"transitions": {
		"nextAction": 10,
		"allActionDone": 16,
		"startInfection": 25,
		"backDiscard": 21,
		"backDiscardOtherPlayer": 12,
		"maxHandOk": 25,
		"zombiePass": 10
	}
}
					*/
					break;
				case "afterForecastDuringDiscard":
					/*
					{
	"name": "afterForecastDuringDiscard",
	"type": "game",
	"action": "stAfterForecastDuringDiscard",
	"transitions": {
		"nextAction": 10,
		"backDiscard": 21,
		"maxHandOk": 25
	}
}
					*/
					break;
				case "afterAction":
					/*
					{
	"name": "afterAction",
	"type": "game",
	"action": "stAfterAction",
	"transitions": {
		"nextAction": 10,
		"allActionDone": 16,
		"tooMuchCards": 21,
		"allCureDone": 91
	}
}
					*/
					break;
				case "endTurn":
					/*
					{
	"name": "endTurn",
	"type": "activeplayer",
	"description": "${actplayer} must draw cards",
	"descriptionmyturn": "",
	"args": "argEndTurn",
	"action": "stEndTurn",
	"possibleactions": [
		"endTurn",
		"action",
		"event",
		"undo"
	],
	"transitions": {
		"endTurnConfirm": 20,
		"actionDone": 15,
		"startForecast": 11,
		"zombiePass": 25
	}
}
					*/
					break;
				case "drawCards":
					/*
					{
	"name": "drawCards",
	"type": "game",
	"action": "stDrawCards",
	"transitions": {
		"startInfection": 25,
		"tooMuchCards": 21,
		"onEpidemic": 22,
		"onOutbreak": 90,
		"noMoreCube": 90,
		"noMoreCards": 90,
		"askResPop": 24
	}
}
					*/
					break;
				case "discardCards":
					/*
					{
	"name": "discardCards",
	"description": "${actplayer} must discard card(s)",
	"descriptionmyturn": "",
	"action": "stDiscardCards",
	"type": "activeplayer",
	"args": "argDiscardCards",
	"possibleactions": [
		"event",
		"action",
		"discardCards"
	],
	"transitions": {
		"maxHandOk": 25,
		"afterEvent": 21,
		"startForecast": 11,
		"backToAction": 26,
		"zombiePass": 25
	}
}
					*/
					break;
				case "showEpidemic":
					/*
					{
	"name": "showEpidemic",
	"type": "multipleactiveplayer",
	"descriptionmyturn": "Epidemic!",
	"description": "Waiting for other players",
	"possibleactions": [
		"epidemicDone"
	],
	"action": "stDoEpidemic",
	"transitions": {
		"allEpidemicDone": 23,
		"zombiePass": 10
	}
}
					*/
					break;
				case "afterEpidemic":
					/*
					{
	"name": "afterEpidemic",
	"type": "game",
	"action": "stAfterEpidemic",
	"transitions": {
		"startInfection": 25,
		"tooMuchCards": 21,
		"onEpidemic": 22,
		"askResPop": 24,
		"onOutbreak": 90,
		"noMoreCube": 90
	}
}
					*/
					break;
				case "canResPop":
					/*
					{
	"name": "canResPop",
	"type": "activeplayer",
	"descriptionmyturn": "Play Resilient Population?",
	"description": "Waiting for other players",
	"possibleactions": [
		"answerAskPop",
		"event"
	],
	"transitions": {
		"onEpidemic": 22,
		"zombiePass": 10
	}
}
					*/
					break;
				case "beforeInfection":
					/*
					{
	"name": "beforeInfection",
	"descriptionmyturn": "",
	"description": "${actplayer} must draw Infection card(s)",
	"args": "argBeforeInfection",
	"type": "activeplayer",
	"action": "stbeforeInfection",
	"possibleactions": [
		"event",
		"action",
		"startInfection"
	],
	"transitions": {
		"eventDone": 25,
		"startForecast": 11,
		"startInfection": 30,
		"startQuietNight": 27,
		"zombiePass": 30
	}
}
					*/
					break;
				case "backToActions":
					/*
					{
	"name": "backToActions",
	"type": "game",
	"action": "stBackToActions",
	"transitions": {
		"afterBack": 15
	}
}
					*/
					break;
				case "QuietNight":
					/*
					{
	"name": "QuietNight",
	"type": "game",
	"action": "stQuietNight",
	"transitions": {
		"nextAction": 10
	}
}
					*/
					break;
				case "DoInfection":
					/*
					{
	"name": "DoInfection",
	"type": "game",
	"description": "Infecting",
	"action": "stDoInfection",
	"transitions": {
		"nextInfection": 25,
		"nextAction": 10,
		"onOutbreak": 90,
		"noMoreCube": 90
	}
}
					*/
					break;
				case "gameLost":
					/*
					{
	"name": "gameLost",
	"type": "game",
	"descriptionmyturn": "Game Lost",
	"description": "Game Lost",
	"updateGameProgression": true,
	"action": "stGameLost",
	"transitions": {
		"endGame": 99
	}
}
					*/
					break;
				case "gameWon":
					/*
					{
	"name": "gameWon",
	"type": "game",
	"updateGameProgression": true,
	"action": "stGameWon",
	"transitions": {
		"endGame": 99
	}
}
					*/
					break;
				case "tempEndScreen":
					/*
					{
	"name": "tempEndScreen",
	"type": "game",
	"updateGameProgression": true,
	"action": "stTempEndScreen",
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
export default pandemic;
