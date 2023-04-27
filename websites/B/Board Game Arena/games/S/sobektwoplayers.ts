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

const sobektwoplayers: GamePresence = {
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
				case "playerTurn":
					/*
					{
	"name": "playerTurn",
	"description": "${actplayer} must take a tile from the Market, sell a set of tiles or play a character",
	"descriptionmyturn": "",
	"args": "argPlayerTurn",
	"action": "stPlayerTurn",
	"type": "activeplayer",
	"possibleactions": [
		"selectMarketTile",
		"sell",
		"playCharacter",
		"refill"
	],
	"transitions": {
		"next": 10,
		"pickResource": 5,
		"deben": 3,
		"orientation": 4,
		"refill": 25,
		"characterScribe": 109,
		"characterArchitect": 108,
		"characterCourtesan": 107,
		"characterHighPriest": 105,
		"characterMerchant": 104,
		"characterThief": 103,
		"characterVizier": 102,
		"gameEnd": 98
	}
}
					*/
					break;
				case "deben":
					/*
					{
	"name": "deben",
	"description": "${actplayer} must choose whether to take a Deben token instead of the tile",
	"descriptionmyturn": "${you} must choose whether to take a Deben token instead of the tile",
	"type": "activeplayer",
	"possibleactions": [
		"answer"
	],
	"transitions": {
		"next": 10
	}
}
					*/
					break;
				case "orientation":
					/*
					{
	"name": "orientation",
	"description": "${actplayer} must choose the orientation of the Ankh pawn",
	"descriptionmyturn": "${you} must choose the orientation of the Ankh pawn",
	"type": "activeplayer",
	"possibleactions": [
		"answer"
	],
	"transitions": {
		"next": 10
	}
}
					*/
					break;
				case "pickResource":
					/*
					{
	"name": "pickResource",
	"description": "${actplayer} must pick a resource for the set",
	"descriptionmyturn": "${you} must pick a resource for the set",
	"type": "activeplayer",
	"action": "stPickResource",
	"possibleactions": [
		"answer"
	],
	"transitions": {
		"next": 6
	}
}
					*/
					break;
				case "pirogue":
					/*
					{
	"name": "pirogue",
	"description": "${actplayer} must pick a Pirogue token",
	"descriptionmyturn": "${you} must pick a Pirogue token",
	"type": "activeplayer",
	"action": "stPirogue",
	"args": "argPirogue",
	"possibleactions": [
		"pickPirogue"
	],
	"transitions": {
		"next": 10,
		"extraTurn": 2,
		"pirogue04": 7,
		"pirogue07": 8
	}
}
					*/
					break;
				case "pirogue04":
					/*
					{
	"name": "pirogue04",
	"description": "${actplayer} must choose a Tile that the opponent must take",
	"descriptionmyturn": "${you} must choose a Tile that your opponent must take",
	"type": "activeplayer",
	"action": "stPirogue04",
	"args": "argPirogue04",
	"possibleactions": [
		"selectMarketTile"
	],
	"transitions": {
		"next": 10
	}
}
					*/
					break;
				case "pirogue07":
					/*
					{
	"name": "pirogue07",
	"description": "${actplayer} must choose a resource to add the Pirogue token to",
	"descriptionmyturn": "${you} must choose a resource to add the Pirogue token to",
	"type": "activeplayer",
	"action": "stPirogue07",
	"args": "argPirogue07",
	"possibleactions": [
		"answer"
	],
	"transitions": {
		"next": 10
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
	"transitions": {
		"": 2
	},
	"updateGameProgression": true
}
					*/
					break;
				case "playerTurn2":
					/*
					{
	"name": "playerTurn2",
	"description": "${actplayer} must take a tile from the market",
	"descriptionmyturn": "${you} must take a tile from the market",
	"args": "argPlayerTurn",
	"type": "activeplayer",
	"possibleactions": [
		"selectMarketTile"
	],
	"transitions": {
		"next": 10,
		"deben": 3,
		"orientation": 4
	}
}
					*/
					break;
				case "pickResource":
					/*
					{
	"name": "pickResource",
	"description": "${actplayer} must pick a resource for the set",
	"descriptionmyturn": "${you} must pick a resource for the set",
	"type": "activeplayer",
	"action": "stPickResource",
	"possibleactions": [
		"answer"
	],
	"transitions": {
		"next": 10
	}
}
					*/
					break;
				case "finalScoring":
					/*
					{
	"name": "finalScoring",
	"type": "game",
	"action": "stFinalScoring",
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
				case "characterVizier":
					/*
					{
	"name": "characterVizier",
	"description": "${actplayer} must take a tile from the opponent's Corruption board",
	"descriptionmyturn": "${you} must take a tile from your opponent's Corruption board",
	"type": "activeplayer",
	"args": "argCharacterVizier",
	"action": "stCharacterVizier",
	"possibleactions": [
		"answer"
	],
	"transitions": {
		"next": 10
	}
}
					*/
					break;
				case "characterThief":
					/*
					{
	"name": "characterThief",
	"description": "${actplayer} must take a tile from the opponent's hand",
	"descriptionmyturn": "${you} must take a tile from your opponent's hand",
	"type": "activeplayer",
	"args": "argCharacterThief",
	"action": "stCharacterThief",
	"possibleactions": [
		"answer"
	],
	"transitions": {
		"next": 10
	}
}
					*/
					break;
				case "characterMerchant":
					/*
					{
	"name": "characterMerchant",
	"description": "${actplayer} must take a tile from the market",
	"descriptionmyturn": "${you} must take a tile from the market",
	"type": "activeplayer",
	"action": "stCharacterMerchant",
	"possibleactions": [
		"selectMarketTile"
	],
	"transitions": {
		"next": 10
	}
}
					*/
					break;
				case "characterHighPriest":
					/*
					{
	"name": "characterHighPriest",
	"description": "${actplayer} must choose a type to remove from their Corruption board",
	"descriptionmyturn": "${you} must choose a type to remove from your Corruption board",
	"type": "activeplayer",
	"possibleactions": [
		"answer"
	],
	"transitions": {
		"next": 10
	}
}
					*/
					break;
				case "characterCourtesan":
					/*
					{
	"name": "characterCourtesan",
	"description": "${actplayer} must add 1 or 2 tiles from their hand to a previously sold set",
	"descriptionmyturn": "${you} must add 1 or 2 tiles from your hand to a previously sold set",
	"type": "activeplayer",
	"action": "stCharacterCourtesan",
	"possibleactions": [
		"sell"
	],
	"transitions": {
		"next": 10,
		"pickResource": 51
	}
}
					*/
					break;
				case "characterArchitect":
					/*
					{
	"name": "characterArchitect",
	"description": "${actplayer} must choose a Pirogue token",
	"descriptionmyturn": "${you} must choose a Pirogue token",
	"type": "activeplayer",
	"args": "argCharacterArchitect",
	"possibleactions": [
		"pickPirogue"
	],
	"transitions": {
		"next": 10,
		"extraTurn": 2,
		"pirogue04": 7,
		"pirogue07": 8
	}
}
					*/
					break;
				case "preCharacterScribe":
					/*
					{
	"name": "preCharacterScribe",
	"type": "game",
	"action": "stNextPlayer",
	"transitions": {
		"": 1092
	}
}
					*/
					break;
				case "characterScribe":
					/*
					{
	"name": "characterScribe",
	"description": "${actplayer} must discard down to 6 tiles",
	"descriptionmyturn": "${you} must discard down to 6 tiles",
	"type": "activeplayer",
	"action": "stCharacterScribe",
	"possibleactions": [
		"sell"
	],
	"transitions": {
		"next": 2
	}
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
export default sobektwoplayers;
