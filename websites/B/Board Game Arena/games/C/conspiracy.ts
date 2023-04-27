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

const conspiracy: GamePresence = {
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
				case "lordStackSelection":
					/*
					{
	"name": "lordStackSelection",
	"description": "${actplayer} must choose lords from deck or from a discard pile",
	"descriptionlimitToHidden1": "${actplayer} must take the first lord from the deck (Location constraint)",
	"descriptionlimitToHidden2": "${actplayer} must take two lords from the deck and choose one (Location constraint)",
	"descriptionmyturn": "${you} must choose lords from deck or from a discard pile",
	"descriptionmyturnlimitToHidden1": "${you} must take the first lord from the deck (Location constraint)",
	"descriptionmyturnlimitToHidden2": "${you} must take two lords from the deck and choose one (Location constraint)",
	"type": "activeplayer",
	"args": "argLordStackSelection",
	"possibleactions": [
		"chooseDeckStack",
		"chooseVisibleStack"
	],
	"transitions": {
		"chooseDeckStack": 21,
		"chooseOneOnStack": 23,
		"chooseVisibleStack": 22,
		"zombiePass": 60
	}
}
					*/
					break;
				case "lordSelection":
					/*
					{
	"name": "lordSelection",
	"description": "${actplayer} must choose the lord to recruit",
	"descriptionmultiple": "${actplayer} must choose the first lord to place",
	"descriptionlast": "${actplayer} must place the last lord",
	"descriptionmyturn": "${you} must choose the lord to recruit",
	"descriptionmyturnmultiple": "${you} must choose the first lord to place",
	"descriptionmyturnlast": "${you} must must place the last lord",
	"type": "activeplayer",
	"args": "argLordSelection",
	"possibleactions": [
		"addLord"
	],
	"transitions": {
		"addLord": 23,
		"zombiePass": 60
	}
}
					*/
					break;
				case "lordPick":
					/*
					{
	"name": "lordPick",
	"description": "${actplayer} must choose the lord to recruit",
	"descriptionmyturn": "${you} must choose the lord to recruit",
	"type": "activeplayer",
	"possibleactions": [
		"addLord"
	],
	"transitions": {
		"addLord": 23,
		"zombiePass": 60
	}
}
					*/
					break;
				case "lordPlacement":
					/*
					{
	"name": "lordPlacement",
	"description": "",
	"type": "game",
	"action": "stPlayLord",
	"transitions": {
		"swap": 24,
		"addLocation": 40,
		"next": 25
	}
}
					*/
					break;
				case "lordSwap":
					/*
					{
	"name": "lordSwap",
	"description": "${actplayer} must select two lords to swap",
	"descriptionmyturn": "${you} must select two lords to swap",
	"type": "activeplayer",
	"possibleactions": [
		"next"
	],
	"transitions": {
		"next": 25,
		"zombiePass": 60
	}
}
					*/
					break;
				case "endLord":
					/*
					{
	"name": "endLord",
	"description": "",
	"type": "game",
	"action": "stEndLord",
	"updateGameProgression": true,
	"transitions": {
		"nextLord": 21,
		"nextPlayer": 60
	}
}
					*/
					break;
				case "locationStackSelection":
					/*
					{
	"name": "locationStackSelection",
	"description": "${actplayer} must choose a location from the deck or discard pile",
	"descriptionallHidden": "${actplayer} must choose a location from all deck (Location constraint)",
	"descriptionmyturn": "${you} must choose a location from the deck or discard pile",
	"descriptionmyturnallHidden": "${you} must choose a location from all deck (Location constraint)",
	"type": "activeplayer",
	"args": "argLocationStackSelection",
	"possibleactions": [
		"chooseDeckStack",
		"chooseVisibleLocation"
	],
	"transitions": {
		"chooseDeckStack": 41,
		"chooseOneOnStack": 42,
		"chooseVisibleLocation": 42,
		"zombiePass": 60
	}
}
					*/
					break;
				case "locationSelection":
					/*
					{
	"name": "locationSelection",
	"description": "${actplayer} must choose a location",
	"descriptionmyturn": "${you} must choose a location",
	"type": "activeplayer",
	"args": "argLocationSelection",
	"possibleactions": [
		"addLocation"
	],
	"transitions": {
		"addLocation": 42,
		"zombiePass": 60
	}
}
					*/
					break;
				case "addLocation":
					/*
					{
	"name": "addLocation",
	"description": "",
	"type": "game",
	"action": "stAddLocation",
	"transitions": {
		"next": 25
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
		"nextPlayer": 20,
		"showScore": 80
	}
}
					*/
					break;
				case "showScore":
					/*
					{
	"name": "showScore",
	"description": "",
	"type": "game",
	"action": "stShowScore",
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
export default conspiracy;
