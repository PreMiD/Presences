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

const tumbleweed: GamePresence = {
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
				case "initialTurn":
					/*
					{
	"name": "initialTurn",
	"description": "${actplayer} must place initial stacks",
	"descriptionmyturn": "${you} must place initial stacks",
	"type": "activeplayer",
	"possibleactions": [
		"playStack"
	],
	"transitions": {
		"stackPlayed": 5,
		"zombiePass": 6,
		"bypassconfirm": 6
	}
}
					*/
					break;
				case "swapTurn":
					/*
					{
	"name": "swapTurn",
	"description": "${actplayer} must decide whether to swap",
	"descriptionmyturn": "${you} must keep colors or place a red stack and swap colors",
	"type": "activeplayer",
	"possibleactions": [
		"playStack",
		"keepColors"
	],
	"transitions": {
		"stackPlayed": 5,
		"keepColors": 6,
		"zombiePass": 6,
		"bypassconfirm": 6
	}
}
					*/
					break;
				case "playerTurn":
					/*
					{
	"name": "playerTurn",
	"description": "${actplayer} may place a stack",
	"descriptionmyturn": "${you} may place a stack",
	"type": "activeplayer",
	"args": "argPlayerTurn",
	"possibleactions": [
		"playStack",
		"passed"
	],
	"transitions": {
		"stackPlayed": 5,
		"passed": 6,
		"zombiePass": 6,
		"bypassconfirm": 6
	}
}
					*/
					break;
				case "confirmMove":
					/*
					{
	"name": "confirmMove",
	"description": "${actplayer} may place a stack",
	"descriptionmyturn": "Please click again on the stack to confirm your move",
	"type": "activeplayer",
	"possibleactions": [
		"confirmMove",
		"undo"
	],
	"transitions": {
		"checkEndOfGame": 6,
		"initialundo": 2,
		"swapundo": 3,
		"undo": 4,
		"zombiePass": 6
	}
}
					*/
					break;
				case "checkEndOfGame":
					/*
					{
	"name": "checkEndOfGame",
	"description": "",
	"type": "game",
	"action": "stCheckEndOfGame",
	"updateGameProgression": true,
	"transitions": {
		"gameEnded": 99,
		"notEndedYet": 7,
		"initialTurn": 2
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
		"nextTurn": 4,
		"swapTurn": 3
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
export default tumbleweed;
