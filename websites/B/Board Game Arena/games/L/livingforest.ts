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

const livingforest: GamePresence = {
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
				case "roundStart":
					/*
					{
	"name": "roundStart",
	"description": "",
	"type": "manager",
	"action": "stRoundStart",
	"transitions": {
		"next": 20,
		"hidden": 21
	}
}
					*/
					break;
				case "playersDraft":
					/*
					{
	"name": "playersDraft",
	"description": "Others players can form their Guardian Animal Help Line",
	"descriptionmyturn": "${you} can form your Guardian Animal Help Line",
	"type": "multipleactiveplayer",
	"args": "argsPlayersDraft",
	"possibleactions": [
		"draw",
		"stop",
		"discard"
	],
	"transitions": {
		"continue": 20,
		"next": 30
	}
}
					*/
					break;
				case "playersHiddenDraft":
					/*
					{
	"name": "playersHiddenDraft",
	"description": "Others players can form their Guardian Animal Help Line",
	"descriptionmyturn": "${you} can form your Guardian Animal Help Line",
	"type": "multipleactiveplayer",
	"args": "argsPlayersDraft",
	"possibleactions": [
		"draw",
		"stop",
		"discard"
	],
	"transitions": {
		"continue": 21,
		"next": 29
	}
}
					*/
					break;
				case "draftEnd":
					/*
					{
	"name": "draftEnd",
	"description": "",
	"type": "manager",
	"action": "stDraftEnd",
	"transitions": {
		"next": 30
	}
}
					*/
					break;
				case "turnStart":
					/*
					{
	"name": "turnStart",
	"description": "",
	"type": "manager",
	"action": "stTurnStart",
	"transitions": {
		"continue": 40,
		"continue_1": 41
	}
}
					*/
					break;
				case "playerTurn":
					/*
					{
	"name": "playerTurn",
	"description": "${actplayer} can perform up to 2 actions: ${actions_list}",
	"descriptionmyturn": "${you} can perform up to 2 actions: ${actions_list}",
	"type": "activeplayer",
	"possibleactions": [
		"getFragment",
		"buyAnimals",
		"getFires",
		"buyTree",
		"move",
		"pass",
		"rollback"
	],
	"args": "argsPlayerTurn",
	"updateGameProgression": true,
	"transitions": {
		"continue_1": 41,
		"bonus": 42,
		"end": 70,
		"confirm": 50
	}
}
					*/
					break;
				case "playerTurn":
					/*
					{
	"name": "playerTurn",
	"description": "${actplayer} can perform 1 action: ${actions_list}",
	"descriptionmyturn": "${you} can perform 1 action: ${actions_list}",
	"type": "activeplayer",
	"possibleactions": [
		"getFragment",
		"buyAnimals",
		"getFires",
		"buyTree",
		"move",
		"pass",
		"rollback"
	],
	"args": "argsPlayerTurn",
	"updateGameProgression": true,
	"transitions": {
		"bonus": 42,
		"end": 70,
		"confirm": 50
	}
}
					*/
					break;
				case "playerTurn":
					/*
					{
	"name": "playerTurn",
	"description": "${actplayer} get an immediate bonus action: ${action_desc}${action_bonus}",
	"descriptionmyturn": "${you} get an immediate bonus action: ${action_desc}${action_bonus}",
	"type": "activeplayer",
	"possibleactions": [
		"buyAnimals",
		"getFires",
		"buyTree",
		"rollback"
	],
	"args": "argsPlayerTurn",
	"updateGameProgression": true,
	"transitions": {
		"continue_1": 41,
		"bonus": 42,
		"end": 70,
		"confirm": 50
	}
}
					*/
					break;
				case "playerConfirm":
					/*
					{
	"name": "playerConfirm",
	"description": "${actplayer} shall confirm their turn",
	"descriptionmyturn": "${you} shall confirm your turn",
	"type": "activeplayer",
	"possibleactions": [
		"confirm",
		"rollback"
	],
	"args": "argsPlayerConfirm",
	"transitions": {
		"confirm": 70
	}
}
					*/
					break;
				case "roundEnd":
					/*
					{
	"name": "roundEnd",
	"description": "",
	"type": "manager",
	"action": "stRoundEnd",
	"transitions": {
		"next": 10,
		"end": 98
	}
}
					*/
					break;
				case "turnEnd":
					/*
					{
	"name": "turnEnd",
	"description": "",
	"type": "manager",
	"action": "stTurnEnd",
	"updateGameProgression": true,
	"transitions": {
		"next": 30,
		"end": 60
	}
}
					*/
					break;
				case "gameSummary":
					/*
					{
	"name": "gameSummary",
	"description": "",
	"type": "manager",
	"action": "stGameSummary",
	"args": "argsGameSummary",
	"updateGameProgression": true,
	"transitions": {
		"next": 99
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
export default livingforest;
