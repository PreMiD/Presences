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

const sixtyone: GamePresence = {
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
				case "initTurn":
					/*
					{
	"name": "initTurn",
	"description": "",
	"type": "game",
	"action": "stInitTurn",
	"transitions": {
		"": 20
	}
}
					*/
					break;
				case "multiplayerPhase":
					/*
					{
	"name": "multiplayerPhase",
	"description": "Waiting for other players to end their turn.",
	"descriptionmyturn": "${you} must do your turn",
	"type": "multipleactiveplayer",
	"initialprivate": 30,
	"action": "stMultiplayerPhase",
	"args": "argMultiplayerPhase",
	"transitions": {
		"": 80
	}
}
					*/
					break;
				case "chooseArea":
					/*
					{
	"name": "chooseArea",
	"description": "",
	"descriptionmyturn": "${you} ${chooseAreaPrompt}.",
	"type": "private",
	"args": "argChooseArea",
	"possibleactions": [
		"pass",
		"chooseArea"
	],
	"transitions": {
		"passed": 70,
		"areaChosen": 40
	}
}
					*/
					break;
				case "chooseDie":
					/*
					{
	"name": "chooseDie",
	"description": "",
	"descriptionmyturn": "${you} must choose a die.",
	"type": "private",
	"args": "argChooseDie",
	"possibleactions": [
		"chooseDie",
		"cancelAreaChoice"
	],
	"transitions": {
		"toDieLocationChoice": 50,
		"areaChoiceCancelled": 30
	}
}
					*/
					break;
				case "chooseDieLocation":
					/*
					{
	"name": "chooseDieLocation",
	"description": "",
	"descriptionmyturn": "${you} must choose a location.",
	"type": "private",
	"args": "argChooseDieLocation",
	"possibleactions": [
		"chooseDieLocation",
		"cancelDieChoice"
	],
	"transitions": {
		"toCrossLocationChoice": 60,
		"dieChoiceCancelled": 30
	}
}
					*/
					break;
				case "chooseCrossLocation":
					/*
					{
	"name": "chooseCrossLocation",
	"description": "",
	"descriptionmyturn": "${you} must choose a location for the joker.",
	"type": "private",
	"args": "argChooseCrossLocation",
	"possibleactions": [
		"chooseCrossLocation",
		"cancelDieLocation"
	],
	"transitions": {
		"crossLocationChosen": 80,
		"dieLocationCancelled": 30
	}
}
					*/
					break;
				case "chooseLeaveDie":
					/*
					{
	"name": "chooseLeaveDie",
	"description": "",
	"descriptionmyturn": "${you} must choose a die for leaves score.",
	"type": "private",
	"possibleactions": [
		"chooseLeaveDie"
	],
	"transitions": {
		"toCrossLocationChoice": 60,
		"leaveDieChosen": 80
	}
}
					*/
					break;
				case "areaScoring":
					/*
					{
	"updateGameProgression": true,
	"name": "areaScoring",
	"description": "",
	"type": "game",
	"action": "stAreaScoring",
	"transitions": {
		"prepareNextRound": 90
	}
}
					*/
					break;
				case "prepareNextTurn":
					/*
					{
	"name": "prepareNextTurn",
	"description": "",
	"type": "game",
	"action": "stprepareNextTurn",
	"transitions": {
		"startNextRound": 10,
		"goToStatsCulculation": 100
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
				case "statsCalculation":
					/*
					{
	"name": "statsCalculation",
	"description": "",
	"type": "game",
	"action": "stStatsCalculation",
	"transitions": {
		"": 99
	}
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
export default sixtyone;
