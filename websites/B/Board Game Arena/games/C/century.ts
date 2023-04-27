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

const century: GamePresence = {
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
				case "playerTurnAction":
					/*
					{
	"name": "playerTurnAction",
	"description": "${actplayer} must choose an action",
	"descriptionmyturn": "${you} must choose: Play a Card, Acquire, Claim",
	"type": "activeplayer",
	"args": "arg_playerTurnAction",
	"possibleactions": [
		"playCard",
		"pickUp",
		"buyCard",
		"buyGolem",
		"undo"
	],
	"transitions": {
		"next": 3,
		"loopback": 2,
		"discard": 5,
		"undo": 6
	}
}
					*/
					break;
				case "gameTurnNextPlayer":
					/*
					{
	"name": "gameTurnNextPlayer",
	"description": "",
	"type": "game",
	"action": "st_gameTurnNextPlayer",
	"updateGameProgression": true,
	"transitions": {
		"next": 2,
		"discard": 5,
		"loopback": 3,
		"last": 99,
		"debuglast": 4
	}
}
					*/
					break;
				case "playerGameEnd":
					/*
					{
	"name": "playerGameEnd",
	"description": "Game Over",
	"descriptionmyturn": "Game Over",
	"type": "activeplayer",
	"args": "arg_playerTurnAction",
	"possibleactions": [
		"end"
	],
	"transitions": {
		"next": 99,
		"loopback": 4
	}
}
					*/
					break;
				case "playerTurnDiscard":
					/*
					{
	"name": "playerTurnDiscard",
	"description": "${actplayer} must discard",
	"descriptionmyturn": "${you} must discard down to 10 spices",
	"type": "activeplayer",
	"args": "arg_playerTurnDiscard",
	"possibleactions": [
		"discard",
		"undo"
	],
	"transitions": {
		"next": 3,
		"loopback": 5
	}
}
					*/
					break;
				case "gameTurnUndo":
					/*
					{
	"name": "gameTurnUndo",
	"description": "",
	"type": "game",
	"action": "st_gameTurnUndo",
	"updateGameProgression": false,
	"transitions": {
		"next": 2
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
export default century;
