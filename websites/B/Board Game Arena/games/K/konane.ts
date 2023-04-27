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

const konane: GamePresence = {
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
				case "player1Remove":
					/*
					{
	"name": "player1Remove",
	"type": "activeplayer",
	"args": "argPlayer1Remove",
	"description": "${actplayer} has to remove a stone.",
	"descriptionmyturn": "${you} have to remove one of the selected stones.",
	"possibleactions": [
		"actRemove"
	],
	"transitions": {
		"transRemove": 10,
		"zombiePass": 10
	}
}
					*/
					break;
				case "player2Remove":
					/*
					{
	"name": "player2Remove",
	"type": "activeplayer",
	"args": "argPlayer2Remove",
	"description": "${actplayer} has to remove a stone.",
	"descriptionmyturn": "${you} have to remove one of the selected stones.",
	"possibleactions": [
		"actRemove"
	],
	"transitions": {
		"transRemove": 10,
		"zombiePass": 10
	}
}
					*/
					break;
				case "playerSelect":
					/*
					{
	"name": "playerSelect",
	"type": "activeplayer",
	"args": "argPlayerSelect",
	"description": "${actplayer} has to make a move.",
	"descriptionmyturn": "${you} have to select a stone to move.",
	"possibleactions": [
		"actSelect"
	],
	"transitions": {
		"transSelect": 5,
		"zombiePass": 10,
		"transEndGame": 99
	}
}
					*/
					break;
				case "playerCapture":
					/*
					{
	"name": "playerCapture",
	"type": "activeplayer",
	"args": "argPlayerCapture",
	"description": "${actplayer} has to make a move.",
	"descriptionmyturn": "${you} have to capture a stone.",
	"possibleactions": [
		"actCapture",
		"actSelect"
	],
	"transitions": {
		"transCapture": 10,
		"transSelect": 4,
		"zombiePass": 10,
		"transEndGame": 99
	}
}
					*/
					break;
				case "nextPlayer":
					/*
					{
	"name": "nextPlayer",
	"type": "game",
	"action": "stNextPlayer",
	"updateGameProgression": true,
	"transitions": {
		"transPlayer2Remove": 3,
		"transNextTurn": 4,
		"transEndGame": 99
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
export default konane;
