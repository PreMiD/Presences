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

const tigriseuphrates: GamePresence = {
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
				case "playerTurn":
					/*
					{
	"name": "playerTurn",
	"description": "${actplayer} must take action ${action_number} of 2",
	"descriptionmyturn": "${you} must take action ${action_number} of 2",
	"type": "activeplayer",
	"args": "arg_playerTurn",
	"possibleactions": [
		"placeLeader",
		"placeTile",
		"discard",
		"pickupLeader",
		"undo",
		"pass"
	],
	"transitions": {
		"placeRevoltSupport": 7,
		"safeLeader": 4,
		"warFound": 11,
		"safeNoMonument": 4,
		"safeMonument": 10,
		"buildCivilizationBuilding": 18,
		"nextAction": 4,
		"endGame": 14,
		"pass": 4,
		"zombiePass": 4,
		"undo": 2
	}
}
					*/
					break;
				case "incrementAction":
					/*
					{
	"name": "incrementAction",
	"description": "Incrementing Action",
	"type": "game",
	"updateGameProgression": true,
	"action": "stIncrementAction",
	"transitions": {
		"pickTreasure": 13,
		"confirmTurn": 16,
		"secondAction": 2,
		"endGame": 14,
		"endTurn": 17,
		"wonderScore": 20
	}
}
					*/
					break;
				case "supportWar":
					/*
					{
	"name": "supportWar",
	"description": "${actplayer} may send support",
	"descriptionmyturn": "${you} may send support",
	"type": "activeplayer",
	"args": "arg_showWar",
	"possibleactions": [
		"placeSupport",
		"undo"
	],
	"transitions": {
		"placeSupport": 11,
		"zombiePass": 11,
		"undo": 2,
		"unpickLeader": 9
	}
}
					*/
					break;
				case "supportRevolt":
					/*
					{
	"name": "supportRevolt",
	"description": "${actplayer} may send revolt (red) support",
	"descriptionmyturn": "${you} may send revolt (red) support",
	"type": "activeplayer",
	"args": "arg_showRevolt",
	"possibleactions": [
		"placeSupport",
		"undo"
	],
	"transitions": {
		"placeSupport": 12,
		"zombiePass": 12,
		"undo": 2
	}
}
					*/
					break;
				case "warLeader":
					/*
					{
	"name": "warLeader",
	"description": "${actplayer} must select war leader",
	"descriptionmyturn": "${you} must select war leader",
	"type": "activeplayer",
	"args": "arg_pickWarLeader",
	"possibleactions": [
		"selectWarLeader",
		"undo"
	],
	"transitions": {
		"placeSupport": 6,
		"leaderSelected": 11,
		"zombiePass": 6,
		"undo": 2
	}
}
					*/
					break;
				case "buildMonument":
					/*
					{
	"name": "buildMonument",
	"description": "${actplayer} may build monument",
	"descriptionmyturn": "${you} may build monument",
	"type": "activeplayer",
	"args": "arg_showKingdoms",
	"possibleactions": [
		"selectMonument",
		"pass",
		"undo"
	],
	"transitions": {
		"buildMonument": 4,
		"pass": 4,
		"zombiePass": 4,
		"undo": 2,
		"multiMonument": 15,
		"multiWonder": 19,
		"buildWonder": 4
	}
}
					*/
					break;
				case "warProgress":
					/*
					{
	"name": "warProgress",
	"description": "Progressing war",
	"type": "game",
	"action": "stWarProgress",
	"transitions": {
		"pickLeader": 9,
		"placeSupport": 6,
		"nextWar": 11,
		"warMonument": 10,
		"noWar": 4,
		"warCivilization": 18
	}
}
					*/
					break;
				case "revoltProgress":
					/*
					{
	"name": "revoltProgress",
	"description": "Progressing revolt",
	"type": "game",
	"action": "stRevoltProgress",
	"transitions": {
		"placeSupport": 7,
		"concludeRevolt": 4
	}
}
					*/
					break;
				case "pickTreasure":
					/*
					{
	"name": "pickTreasure",
	"description": "${actplayer} must take treasure",
	"descriptionmyturn": "${you} must take treasure",
	"type": "activeplayer",
	"args": "arg_pickTreasure",
	"possibleactions": [
		"pickTreasure",
		"undo"
	],
	"transitions": {
		"pickTreasure": 4,
		"zombiePass": 4,
		"undo": 2
	}
}
					*/
					break;
				case "finalScoring":
					/*
					{
	"name": "finalScoring",
	"description": "Final Scoring",
	"type": "game",
	"updateGameProgression": true,
	"action": "stFinalScoring",
	"transitions": {
		"endGame": 99
	}
}
					*/
					break;
				case "multiMonument":
					/*
					{
	"name": "multiMonument",
	"description": "${actplayer} must pick top left tile for monument",
	"descriptionmyturn": "${you} must pick top left tile for monument",
	"type": "activeplayer",
	"args": "arg_showKingdoms",
	"possibleactions": [
		"selectMonumentTile"
	],
	"transitions": {
		"buildMonument": 4,
		"zombiePass": 4
	}
}
					*/
					break;
				case "endTurnConfirm":
					/*
					{
	"name": "endTurnConfirm",
	"description": "${actplayer} must confirm turn",
	"descriptionmyturn": "${you} must confirm turn",
	"type": "activeplayer",
	"args": "arg_playerTurn",
	"possibleactions": [
		"undo",
		"confirm"
	],
	"transitions": {
		"endTurn": 17,
		"zombiePass": 17,
		"undo": 2,
		"wonderScore": 20
	}
}
					*/
					break;
				case "nextPlayer":
					/*
					{
	"name": "nextPlayer",
	"description": "Next Player",
	"type": "game",
	"updateGameProgression": true,
	"action": "stNextPlayer",
	"transitions": {
		"nextPlayer": 2,
		"endGame": 14
	}
}
					*/
					break;
				case "buildCivilizationBuilding":
					/*
					{
	"name": "buildCivilizationBuilding",
	"description": "${actplayer} may pick tile to build a civilization building",
	"descriptionmyturn": "${you} may pick tile to build a civilization building",
	"type": "activeplayer",
	"args": "arg_showKingdoms",
	"possibleactions": [
		"buildCivilizationBuilding",
		"pass",
		"undo"
	],
	"transitions": {
		"noMonument": 4,
		"zombiePass": 4,
		"undo": 2,
		"monumentFound": 10
	}
}
					*/
					break;
				case "multiWonder":
					/*
					{
	"name": "multiWonder",
	"description": "${actplayer} must pick center for wonder",
	"descriptionmyturn": "${you} must pick center for wonder",
	"type": "activeplayer",
	"args": "arg_showKingdoms",
	"possibleactions": [
		"selectWonderTile"
	],
	"transitions": {
		"buildWonder": 4,
		"zombiePass": 4
	}
}
					*/
					break;
				case "wonderScore":
					/*
					{
	"name": "wonderScore",
	"description": "${actplayer} must pick point color from wonder",
	"descriptionmyturn": "${you} must pick point color from wonder",
	"type": "activeplayer",
	"args": "arg_showKingdoms",
	"possibleactions": [
		"pickPoint",
		"undo"
	],
	"transitions": {
		"next": 17,
		"zombiePass": 17,
		"undo": 2
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
export default tigriseuphrates;
