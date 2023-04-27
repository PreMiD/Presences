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

const getonboard: GamePresence = {
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
		"": 10
	}
}
					*/
					break;
				case "placeDeparturePawn":
					/*
					{
	"name": "placeDeparturePawn",
	"description": "Players must place Departure pawn",
	"descriptionmyturn": "${you} must place Departure pawn",
	"type": "multipleactiveplayer",
	"args": "argPlaceDeparturePawn",
	"action": "stPlaceDeparturePawn",
	"possibleactions": [
		"placeDeparturePawn"
	],
	"transitions": {
		"next": 20
	}
}
					*/
					break;
				case "startGame":
					/*
					{
	"name": "startGame",
	"description": "",
	"type": "game",
	"action": "stStartGame",
	"transitions": {
		"start": 30
	}
}
					*/
					break;
				case "placeRoute":
					/*
					{
	"name": "placeRoute",
	"description": "${actplayer} must place a route ${shape}",
	"descriptionmyturn": "${you} must place a route ${shape}",
	"descriptionConfirm": "${actplayer} must confirm placed marker(s)",
	"descriptionmyturnConfirm": "${you} must confirm placed marker(s)",
	"type": "activeplayer",
	"args": "argPlaceRoute",
	"possibleactions": [
		"placeRoute",
		"cancelLast",
		"resetTurn",
		"confirmTurn"
	],
	"transitions": {
		"placeNext": 30,
		"nextPlayer": 70
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
		"nextPlayer": 30,
		"endRound": 80
	}
}
					*/
					break;
				case "endRound":
					/*
					{
	"name": "endRound",
	"description": "",
	"type": "game",
	"action": "stEndRound",
	"transitions": {
		"newRound": 30,
		"endScore": 90
	}
}
					*/
					break;
				case "endScore":
					/*
					{
	"name": "endScore",
	"description": "",
	"type": "game",
	"action": "stEndScore",
	"updateGameProgression": true,
	"transitions": {
		"endGame": 99
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
export default getonboard;
