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

const iwari: GamePresence = {
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
				case "playerActions":
					/*
					{
	"name": "playerActions",
	"description": "${actplayer} must play cards and place pieces",
	"descriptionmyturn": "${you} must play cards and place pieces",
	"type": "activeplayer",
	"args": "argsValidActions",
	"possibleactions": [
		"playCards",
		"discard",
		"placePiece",
		"confirmMove",
		"drawCard"
	],
	"updateGameProgression": true,
	"transitions": {
		"drawCards": 4,
		"playDummy": 3,
		"discard": 4,
		"offerFeat": 8,
		"refillDisplay": 5,
		"checkGameEnd": 6,
		"zombiePass": 5
	}
}
					*/
					break;
				case "dummyActions":
					/*
					{
	"name": "dummyActions",
	"description": "${actplayer} must play cards and place pieces for the third tribe",
	"descriptionmyturn": "${you} must play cards and place pieces for the third tribe",
	"type": "activeplayer",
	"args": "argsValidActions",
	"possibleactions": [
		"playCards",
		"placePiece",
		"confirmMove"
	],
	"updateGameProgression": true,
	"transitions": {
		"drawCards": 4,
		"checkGameEnd": 6,
		"zombiePass": 5
	}
}
					*/
					break;
				case "drawCards":
					/*
					{
	"name": "drawCards",
	"description": "${actplayer} must replenish their hand back up to 3 cards",
	"descriptionmyturn": "${you} must replenish your hand back up to 3 cards",
	"type": "activeplayer",
	"possibleactions": [
		"drawCard"
	],
	"updateGameProgression": true,
	"transitions": {
		"drawCard": 4,
		"refillDisplay": 5,
		"zombiePass": 5
	}
}
					*/
					break;
				case "refillDisplay":
					/*
					{
	"name": "refillDisplay",
	"type": "game",
	"action": "stRefillDisplay",
	"updateGameProgression": true,
	"transitions": {
		"nextPlayer": 2,
		"checkGameEnd": 6,
		"scoring": 7
	}
}
					*/
					break;
				case "checkGameEnd":
					/*
					{
	"name": "checkGameEnd",
	"type": "game",
	"action": "stCheckGameEnd",
	"transitions": {
		"nextPlayer": 2,
		"scoring": 7
	}
}
					*/
					break;
				case "scoring":
					/*
					{
	"name": "scoring",
	"type": "game",
	"action": "stScoring",
	"updateGameProgression": true,
	"transitions": {
		"refillDisplay": 5,
		"endGame": 99
	}
}
					*/
					break;
				case "offerFeat":
					/*
					{
	"name": "offerFeat",
	"description": "${actplayer} may place a ${featTypeName} feat",
	"descriptionmyturn": "${you} may place a ${featTypeName} feat",
	"type": "activeplayer",
	"args": "argsFeatOptions",
	"possibleactions": [
		"placeFeat",
		"skipFeat"
	],
	"transitions": {
		"offerFeat": 8,
		"playDummy": 3,
		"drawCards": 4,
		"checkGameEnd": 6,
		"zombiePass": 5
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
export default iwari;
