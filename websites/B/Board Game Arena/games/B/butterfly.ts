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

const butterfly: GamePresence = {
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
				case "placeHedgehog":
					/*
					{
	"name": "placeHedgehog",
	"description": "${actplayer} must place the hedgehog",
	"descriptionmyturn": "${you} must place the hedgehog",
	"type": "activeplayer",
	"possibleactions": [
		"placeHedgehog"
	],
	"transitions": {
		"moveHedgehog": 11
	}
}
					*/
					break;
				case "moveHedgehog":
					/*
					{
	"name": "moveHedgehog",
	"description": "${actplayer} must move the hedgehog",
	"descriptionmyturn": "${you} must move the hedgehog",
	"type": "activeplayer",
	"args": "argPlayerTurn",
	"possibleactions": [
		"moveHedgehog"
	],
	"transitions": {
		"moveHedgehog": 11,
		"drawConfirm": 4,
		"gameEnd": 99
	}
}
					*/
					break;
				case "drawConfirm":
					/*
					{
	"name": "drawConfirm",
	"description": "${actplayer} passed over a butterfly net and may decide to draw a tile",
	"descriptionmyturn": "${you} may draw a bonus tile for passing over a net",
	"type": "activeplayer",
	"possibleactions": [
		"drawTile"
	],
	"transitions": {
		"confirmDraw": 11,
		"gameEnd": 99
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
		"moveHedgehog": 3,
		"gameEnd": 99
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
export default butterfly;
