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

const spiritsoftheforest: GamePresence = {
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
		"": 20
	}
}
					*/
					break;
				case "take_tile":
					/*
					{
	"name": "take_tile",
	"description": "${actplayer} must take a spirit tile",
	"descriptionmyturn": "${you} must take a spirit tile",
	"args": "argsTakeTile",
	"type": "activeplayer",
	"possibleactions": [
		"takeTile",
		"passTile",
		"playToken"
	],
	"transitions": {
		"takeTile": 20,
		"discardGemstone": 40,
		"zombiePass": 50,
		"checkFinish": 50
	}
}
					*/
					break;
				case "place_gemstone":
					/*
					{
	"name": "place_gemstone",
	"description": "${actplayer} may place/move a gemstone, or end move",
	"descriptionmyturn": "${you} may place/move a gemstone, or",
	"args": "argsPlaceGemstone",
	"type": "activeplayer",
	"possibleactions": [
		"placeGemstone",
		"pass",
		"playToken"
	],
	"transitions": {
		"checkFinish": 50
	}
}
					*/
					break;
				case "discard_gemstone":
					/*
					{
	"name": "discard_gemstone",
	"description": "${actplayer} must discard a gemstone",
	"descriptionmyturn": "${you} must discard a gemstone",
	"args": "argsDiscardGemstone",
	"type": "activeplayer",
	"possibleactions": [
		"discardGemstone"
	],
	"transitions": {
		"checkFinish": 50
	}
}
					*/
					break;
				case "check_finish":
					/*
					{
	"name": "check_finish",
	"type": "game",
	"action": "stCheckFinish",
	"updateGameProgression": true,
	"transitions": {
		"takeTile": 20,
		"placeGemstone": 30,
		"finish": 99
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
export default spiritsoftheforest;
