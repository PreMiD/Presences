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

const gyges: GamePresence = {
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
		"": 11
	}
}
					*/
					break;
				case "initialPlaceNextPlayer":
					/*
					{
	"name": "initialPlaceNextPlayer",
	"description": "",
	"type": "game",
	"action": "stInitialPlaceNextPlayer",
	"transitions": {
		"nextPlayer": 11,
		"nextPhase": 20
	}
}
					*/
					break;
				case "initialPlace":
					/*
					{
	"name": "initialPlace",
	"description": "${actplayer} can reorganize his initial position",
	"descriptionmyturn": "${you} can reorganize your initial position",
	"type": "activeplayer",
	"args": "argInitialPlace",
	"possibleactions": [
		"initialPlace"
	],
	"transitions": {
		"initialPlace": 11,
		"endInitialPlace": 10
	}
}
					*/
					break;
				case "choosePiece":
					/*
					{
	"name": "choosePiece",
	"description": "${actplayer} must choose a piece to move",
	"descriptionmyturn": "${you} must choose a piece to move",
	"type": "activeplayer",
	"args": "argChoosePiece",
	"updateGameProgression": true,
	"possibleactions": [
		"choosePiece"
	],
	"transitions": {
		"choosePiece": 21,
		"zombiepass": 40
	}
}
					*/
					break;
				case "chooseMove":
					/*
					{
	"name": "chooseMove",
	"description": "${actplayer} must choose where to move",
	"descriptionmyturn": "${you} must choose where to move",
	"type": "activeplayer",
	"args": "argChooseMove",
	"possibleactions": [
		"chooseMove",
		"cancelMove",
		"replace",
		"changePath"
	],
	"transitions": {
		"chooseMove": 21,
		"changePath": 21,
		"endMove": 40,
		"winGame": 99,
		"cancel": 20,
		"replace": 22,
		"zombiepass": 40
	}
}
					*/
					break;
				case "chooseReplace":
					/*
					{
	"name": "chooseReplace",
	"description": "${actplayer} must move the landed on piece to any free space",
	"descriptionmyturn": "${you} must move the landed on piece to any free space",
	"type": "activeplayer",
	"args": "argCurrentPath",
	"possibleactions": [
		"chooseReplace",
		"cancelMove"
	],
	"transitions": {
		"replace": 40,
		"cancel": 20,
		"zombiepass": 40
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
		"nextPlayer": 20
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
export default gyges;
