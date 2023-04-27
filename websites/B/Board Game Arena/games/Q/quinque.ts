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

const quinque: GamePresence = {
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
				case "firstPlayer":
					/*
					{
	"name": "firstPlayer",
	"description": "${actplayer} must place a parachute on the first tile",
	"descriptionmyturn": "${you} must place a parachute on the first tile",
	"type": "activeplayer",
	"args": "argFirstPlayerAction",
	"possibleactions": [
		"playParachute"
	],
	"transitions": {
		"playParachute": 10,
		"zombiePass": 10
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
		"nextTurn": 20,
		"endGame": 99,
		"autoPass": 10
	}
}
					*/
					break;
				case "playerAction1":
					/*
					{
	"name": "playerAction1",
	"description": "${actplayer} must place a parachute, add a new tile, or move a tile",
	"descriptionmyturn": "${you} must place a parachute, add a new tile, or move a tile",
	"type": "activeplayer",
	"args": "argPlayerAction1",
	"possibleactions": [
		"playParachute",
		"moveTile",
		"pass"
	],
	"transitions": {
		"playParachute": 21,
		"moveTile": 21,
		"pass": 10
	}
}
					*/
					break;
				case "nextAction":
					/*
					{
	"name": "nextAction",
	"description": "",
	"type": "game",
	"action": "stNextAction",
	"updateGameProgression": true,
	"transitions": {
		"nextAction": 30,
		"endGame": 99,
		"autoPass": 10
	}
}
					*/
					break;
				case "playerAction2":
					/*
					{
	"name": "playerAction2",
	"description": "${actplayer} may move a tile",
	"descriptionmyturn": "${you} may move a tile",
	"type": "activeplayer",
	"args": "argPlayerAction2",
	"possibleactions": [
		"moveTile",
		"pass"
	],
	"transitions": {
		"moveTile": 10,
		"pass": 10
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
export default quinque;
