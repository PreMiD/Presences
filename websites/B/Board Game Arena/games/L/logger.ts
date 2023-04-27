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

const logger: GamePresence = {
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
		"": 2
	}
}
					*/
					break;
				case "playerInitialLocation":
					/*
					{
	"name": "playerInitialLocation",
	"description": "${actplayer} must choose his initial location",
	"descriptionmyturn": "${you} must choose your initial location",
	"type": "activeplayer",
	"args": "argPlayerInitialLocation",
	"possibleactions": [
		"playerSetInitialLocation"
	],
	"transitions": {
		"nextPlayer": 6
	}
}
					*/
					break;
				case "treeGrowth":
					/*
					{
	"name": "treeGrowth",
	"description": "Trees are growing",
	"action": "stGrowTrees",
	"type": "game",
	"transitions": {
		"playerAction": 4
	}
}
					*/
					break;
				case "playerAction":
					/*
					{
	"name": "playerAction",
	"description": "${actplayer} must plant, chop or, if able, protest",
	"descriptionmyturn": "${you} must <span style=\"color: #00CC66;\">plant</span>, <span style=\"color: #660000;\">chop</span> or, if able, <span style=\"color: #707070;\">protest</span>",
	"type": "activeplayer",
	"args": "argPossibleActions",
	"possibleactions": [
		"actionPlant",
		"playerProtest",
		"actionChop",
		"noAction"
	],
	"transitions": {
		"playerProtest": 5,
		"nextPlayer": 6
	}
}
					*/
					break;
				case "playerProtest":
					/*
					{
	"name": "playerProtest",
	"description": "${actplayer} is protesting",
	"descriptionmyturn": "${you} must place one or more protesters on mature trees",
	"type": "activeplayer",
	"possibleactions": [
		"actionProtest"
	],
	"transitions": {
		"nextPlayer": 6
	}
}
					*/
					break;
				case "nextPlayer":
					/*
					{
	"name": "nextPlayer",
	"updateGameProgression": true,
	"description": "",
	"type": "game",
	"action": "stNextPlayer",
	"transitions": {
		"gameEnd": 99,
		"playerMovement": 7,
		"playerInitialLocation": 2
	}
}
					*/
					break;
				case "playerMovement":
					/*
					{
	"name": "playerMovement",
	"description": "${actplayer} must move or stay",
	"descriptionmyturn": "${you} must move or stay",
	"type": "activeplayer",
	"args": "argPlayerMovement",
	"possibleactions": [
		"playerMove",
		"playerStay"
	],
	"transitions": {
		"treeGrowth": 3,
		"nextPlayer": 6
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
export default logger;
