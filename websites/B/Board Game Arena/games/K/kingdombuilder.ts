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

const kingdombuilder: GamePresence = {
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
		"": 4
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
		"next": 3,
		"start": 4,
		"endgame": 98
	},
	"updateGameProgression": true
}
					*/
					break;
				case "startOfTurn":
					/*
					{
	"name": "startOfTurn",
	"description": "",
	"type": "game",
	"action": "stStartOfTurn",
	"transitions": {
		"build": 5,
		"endgame": 98
	}
}
					*/
					break;
				case "playerBuild":
					/*
					{
	"name": "playerBuild",
	"description": "${actplayer} must build on ${terrainName} ${nbr}",
	"descriptionmyturn": "${you} must build on ${terrainName} ${nbr}",
	"descriptiontile": "${tileName} : ${actplayer} must build on ${terrainName}",
	"descriptiontilemyturn": "${tileName} : ${you} must build on ${terrainName}",
	"type": "activeplayer",
	"args": "argPlayerBuild",
	"possibleactions": [
		"build",
		"restartTurn",
		"skip",
		"endgame",
		"cancel",
		"undoAction"
	],
	"transitions": {
		"zombiePass": 7,
		"endturn": 8,
		"build": 5,
		"move": 9,
		"done": 8,
		"useTile": 6,
		"restartTurn": 4
	}
}
					*/
					break;
				case "playerUseTile":
					/*
					{
	"name": "playerUseTile",
	"description": "${actplayer} may use a location tile",
	"descriptionmyturn": "${you} may use a location tile",
	"type": "activeplayer",
	"args": "argUseTile",
	"possibleactions": [
		"use",
		"skip",
		"restartTurn",
		"undoAction"
	],
	"transitions": {
		"build": 5,
		"move": 9,
		"skip": 8,
		"useTile": 6,
		"restartTurn": 4
	}
}
					*/
					break;
				case "endOfTurn":
					/*
					{
	"name": "endOfTurn",
	"description": "",
	"type": "game",
	"action": "stEndOfTurn",
	"transitions": {
		"next": 3
	}
}
					*/
					break;
				case "confirmTurn":
					/*
					{
	"name": "confirmTurn",
	"description": "${actplayer} must confirm or restart their turn",
	"descriptionmyturn": "${you} must confirm or restart your turn",
	"type": "activeplayer",
	"possibleactions": [
		"confirm",
		"restartTurn",
		"undoAction"
	],
	"transitions": {
		"zombiePass": 7,
		"endturn": 7,
		"confirm": 7,
		"restartTurn": 4,
		"build": 5,
		"useTile": 6
	}
}
					*/
					break;
				case "playerMove":
					/*
					{
	"name": "playerMove",
	"description": "${tileName} : ${actplayer} must move an existing settlement",
	"descriptionmyturn": "${tileName} : ${you} must move an existing settlement",
	"type": "activeplayer",
	"args": "argPlayerMove",
	"possibleactions": [
		"move",
		"restartTurn",
		"cancel",
		"undoAction"
	],
	"transitions": {
		"done": 8,
		"useTile": 6,
		"build": 5,
		"restartTurn": 4
	}
}
					*/
					break;
				case "scoringEnd":
					/*
					{
	"name": "scoringEnd",
	"description": "Computing scores",
	"type": "game",
	"action": "stScoringEnd",
	"transitions": {
		"endgame": 99
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
export default kingdombuilder;
