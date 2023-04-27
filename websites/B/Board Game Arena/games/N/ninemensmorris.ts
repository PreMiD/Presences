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

const ninemensmorris: GamePresence = {
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
	"description": "${actplayer} must place a Stone",
	"descriptionmyturn": "${you} must place a Stone",
	"type": "activeplayer",
	"args": "argPlayerTurn",
	"possibleactions": [
		"makeMove",
		"placeStone"
	],
	"transitions": {
		"nextPlayer": 3,
		"millFormed": 15
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
	"updateGameProgression": true,
	"transitions": {
		"nextTurn": 2,
		"nextTurnSecondPhase": 22,
		"drawOffered": 25,
		"gameEnd": 99
	}
}
					*/
					break;
				case "removePhase":
					/*
					{
	"name": "removePhase",
	"description": "${actplayer} must remove a piece",
	"descriptionmyturn": "${you} must remove a piece",
	"type": "activeplayer",
	"args": "argRemove",
	"possibleactions": [
		"removeStone"
	],
	"transitions": {
		"nextPlayer": 3,
		"gameEnd": 99
	}
}
					*/
					break;
				case "playerTurn":
					/*
					{
	"name": "playerTurn",
	"description": "${actplayer} must move a Stone",
	"descriptionmyturn": "${you} must move a Stone",
	"type": "activeplayer",
	"args": "argPlayerTurn",
	"possibleactions": [
		"makeMove",
		"proposeDraw"
	],
	"transitions": {
		"nextPlayer": 3,
		"millFormed": 15
	}
}
					*/
					break;
				case "considerDraw":
					/*
					{
	"name": "considerDraw",
	"description": "${actplayer} must consider the offer of a draw",
	"descriptionmyturn": "${you} must choose whether to accept a draw: ",
	"type": "activeplayer",
	"args": "argPlayerTurn",
	"possibleactions": [
		"acceptDraw",
		"declineDraw"
	],
	"transitions": {
		"nextPlayer": 3
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
export default ninemensmorris;
