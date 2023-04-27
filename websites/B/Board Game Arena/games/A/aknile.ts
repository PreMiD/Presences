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

const aknile: GamePresence = {
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
				case "flood":
					/*
					{
	"name": "flood",
	"type": "game",
	"action": "stFlood",
	"updateGameProgression": true,
	"transitions": {
		"plague": 3,
		"speculationPlague": 4,
		"harvest": 5,
		"gameEnd": 90
	}
}
					*/
					break;
				case "floodPlague":
					/*
					{
	"name": "floodPlague",
	"type": "game",
	"action": "stPlague",
	"updateGameProgression": true,
	"transitions": {
		"": 2
	}
}
					*/
					break;
				case "speculationPlague":
					/*
					{
	"name": "speculationPlague",
	"type": "game",
	"action": "stPlague",
	"updateGameProgression": true,
	"transitions": {
		"": 5
	}
}
					*/
					break;
				case "harvest":
					/*
					{
	"name": "harvest",
	"type": "game",
	"action": "stHarvest",
	"updateGameProgression": true,
	"transitions": {
		"playerTrade": 10,
		"gameEnd": 90
	}
}
					*/
					break;
				case "playerTrade":
					/*
					{
	"name": "playerTrade",
	"description": "${actplayer} must trade or pass",
	"descriptionmyturn": "${you} must trade or pass",
	"type": "activeplayer",
	"possibleactions": [
		"market",
		"offering",
		"pass",
		"zombiePass"
	],
	"updateGameProgression": true,
	"transitions": {
		"plague": 13,
		"market": 10,
		"offering": 2,
		"pass": 15,
		"zombiePass": 15,
		"gameEnd": 90
	}
}
					*/
					break;
				case "marketCardPlague":
					/*
					{
	"name": "marketCardPlague",
	"type": "game",
	"action": "stPlague",
	"transitions": {
		"": 10
	}
}
					*/
					break;
				case "playerPlantOrSpeculate":
					/*
					{
	"name": "playerPlantOrSpeculate",
	"description": "${actplayer} must plant or speculate",
	"descriptionmyturn": "${you} must plant or speculate",
	"type": "activeplayer",
	"possibleactions": [
		"back",
		"plant",
		"speculate",
		"pass",
		"zombiePass"
	],
	"transitions": {
		"back": 10,
		"plant": 20,
		"speculate": 20,
		"pass": 20,
		"zombiePass": 20
	}
}
					*/
					break;
				case "drawCards":
					/*
					{
	"name": "drawCards",
	"type": "game",
	"action": "stDrawCards",
	"transitions": {
		"plague": 22,
		"nextPlayer": 25,
		"gameEnd": 90
	}
}
					*/
					break;
				case "drawCardPlague":
					/*
					{
	"name": "drawCardPlague",
	"type": "game",
	"action": "stPlague",
	"transitions": {
		"": 25
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
		"": 2
	}
}
					*/
					break;
				case "gameEndScoring":
					/*
					{
	"name": "gameEndScoring",
	"type": "game",
	"action": "stGameEndScoring",
	"updateGameProgression": true,
	"transitions": {
		"": 99
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
export default aknile;
