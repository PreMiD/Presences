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

const zooloretto: GamePresence = {
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
	"description": "${actplayer} must draw a tile to add to a wagon, take a wagon and pass or perform a money action.",
	"descriptionmyturn": "${you} must draw a tile to add to a wagon, take a wagon and pass or perform a money action.",
	"type": "activeplayer",
	"args": "argplayerTurn",
	"possibleactions": [
		"DrawTile",
		"TakeWagon",
		"BuyEnclosure",
		"Move",
		"Swap",
		"Buy",
		"Discard"
	],
	"transitions": {
		"PlaceTile": 3,
		"ArrangeZoo": 5,
		"NextPlayer": 4,
		"Move": 7,
		"Swap": 8,
		"Buy": 9,
		"Discard": 10
	}
}
					*/
					break;
				case "PlaceTile":
					/*
					{
	"name": "PlaceTile",
	"description": "${actplayer} must place a tile on a Wagon.",
	"descriptionmyturn": "${you} must place a tile on a Wagon.",
	"type": "activeplayer",
	"possibleactions": [
		"PlaceTile"
	],
	"transitions": {
		"NextPlayer": 4
	}
}
					*/
					break;
				case "NextPlayer":
					/*
					{
	"name": "NextPlayer",
	"description": "Changing player...",
	"type": "game",
	"action": "stNextPlayer",
	"updateGameProgression": true,
	"transitions": {
		"NextPlayer": 2,
		"NextTurn": 6,
		"GameEnd": 99
	}
}
					*/
					break;
				case "ArrangeZoo":
					/*
					{
	"name": "ArrangeZoo",
	"description": "${actplayer} must arrange tiles in his Zoo.",
	"descriptionmyturn": "${you} must arrange tiles in your Zoo.",
	"type": "activeplayer",
	"possibleactions": [
		"ArrangeTiles",
		"AutoArrangeTiles",
		"ConfirmArrangement",
		"Reset",
		"GoBack"
	],
	"transitions": {
		"NextPlayer": 4,
		"playerTurn": 2
	}
}
					*/
					break;
				case "NextTurn":
					/*
					{
	"name": "NextTurn",
	"description": "Changing player...",
	"type": "game",
	"action": "stNextTurn",
	"updateGameProgression": true,
	"transitions": {
		"NextPlayer": 2,
		"GameEnd": 99
	}
}
					*/
					break;
				case "Move":
					/*
					{
	"name": "Move",
	"description": "${actplayer} must move an animal tile or a stall tile from one space to another.",
	"descriptionmyturn": "${you} must move an animal tile or a stall tile from one space to another.",
	"type": "activeplayer",
	"possibleactions": [
		"Move",
		"Back"
	],
	"transitions": {
		"Back": 2,
		"NextPlayer": 4
	}
}
					*/
					break;
				case "Swap":
					/*
					{
	"name": "Swap",
	"description": "${actplayer} must swap two sets on animals.",
	"descriptionmyturn": "${you} must swap two sets on animals.",
	"type": "activeplayer",
	"possibleactions": [
		"Swap",
		"Back"
	],
	"transitions": {
		"Back": 2,
		"NextPlayer": 4
	}
}
					*/
					break;
				case "Buy":
					/*
					{
	"name": "Buy",
	"description": "${actplayer} must buy a tile from an opponent Barn.",
	"descriptionmyturn": "${you} must buy a tile from an opponent Barn.",
	"type": "activeplayer",
	"possibleactions": [
		"Buy",
		"Back"
	],
	"transitions": {
		"Back": 2,
		"NextPlayer": 4
	}
}
					*/
					break;
				case "Discard":
					/*
					{
	"name": "Discard",
	"description": "${actplayer} must discard a tile from his Barn.",
	"descriptionmyturn": "${you} must discard a tile from your Barn.",
	"type": "activeplayer",
	"possibleactions": [
		"Discard",
		"Back"
	],
	"transitions": {
		"Back": 2,
		"NextPlayer": 4
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
export default zooloretto;
