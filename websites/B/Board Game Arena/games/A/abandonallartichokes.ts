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

const abandonallartichokes: GamePresence = {
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
		"": 3
	}
}
					*/
					break;
				case "nextPlayer":
					/*
					{
	"name": "nextPlayer",
	"description": "Player cleanup and refilling garden row",
	"type": "game",
	"action": "stNextPlayer",
	"transitions": {
		"3": 3,
		"4": 4,
		"99": 99
	},
	"updateGameProgression": true
}
					*/
					break;
				case "harvest":
					/*
					{
	"name": "harvest",
	"description": "${actplayer} must harvest a card from the garden row",
	"descriptionmyturn": "${you} must harvest a card from the garden row",
	"type": "activeplayer",
	"possibleactions": [
		"harvestCard"
	],
	"transitions": {
		"2": 2,
		"4": 4
	}
}
					*/
					break;
				case "playCard":
					/*
					{
	"name": "playCard",
	"description": "${actplayer} must play a card or end their turn",
	"descriptionmyturn": "${you} must play a card or end your turn",
	"type": "activeplayer",
	"possibleactions": [
		"playCard",
		"pass"
	],
	"transitions": {
		"2": 2,
		"5": 5,
		"6": 6,
		"7": 7,
		"9": 9,
		"10": 10,
		"11": 11,
		"12": 12,
		"13": 13,
		"14": 14,
		"15": 15,
		"17": 17
	}
}
					*/
					break;
				case "leekChooseOpponent":
					/*
					{
	"name": "leekChooseOpponent",
	"description": "${actplayer} must choose an opponent",
	"descriptionmyturn": "${you} must choose an opponent",
	"type": "activeplayer",
	"args": "arg_leekOpponents",
	"possibleactions": [
		"leekChooseOpponent"
	],
	"transitions": {
		"6": 6,
		"16": 16
	}
}
					*/
					break;
				case "leekTakeCard":
					/*
					{
	"name": "leekTakeCard",
	"description": "${actplayer} must take card or decline to take it",
	"descriptionmyturn": "${you} must take card or decline to take it",
	"type": "activeplayer",
	"possibleactions": [
		"leekTakeCard"
	],
	"transitions": {
		"15": 15
	}
}
					*/
					break;
				case "eggplantChooseCards":
					/*
					{
	"name": "eggplantChooseCards",
	"description": "Other players must choose two cards to pass on",
	"descriptionmyturn": "${you} must choose two cards to pass on",
	"action": "stEggplantInit",
	"type": "multipleactiveplayer",
	"possibleactions": [
		"eggplantChooseCards"
	],
	"transitions": {
		"8": 8
	}
}
					*/
					break;
				case "eggplantDone":
					/*
					{
	"name": "eggplantDone",
	"description": "Passing cards for eggplant",
	"type": "game",
	"action": "stEggplantDone",
	"transitions": {
		"15": 15
	}
}
					*/
					break;
				case "pepperTakeCard":
					/*
					{
	"name": "pepperTakeCard",
	"description": "${actplayer} must pick card to put on deck",
	"descriptionmyturn": "${you} must pick card to put on deck",
	"type": "activeplayer",
	"possibleactions": [
		"pepperTakeCard"
	],
	"transitions": {
		"15": 15,
		"16": 16
	}
}
					*/
					break;
				case "peasTakeCard":
					/*
					{
	"name": "peasTakeCard",
	"description": "${actplayer} must pick a card to keep",
	"descriptionmyturn": "${you} must pick a card to keep",
	"type": "activeplayer",
	"possibleactions": [
		"peasTakeCard"
	],
	"transitions": {
		"11": 11,
		"16": 16
	}
}
					*/
					break;
				case "peasChooseOpponent":
					/*
					{
	"name": "peasChooseOpponent",
	"description": "${actplayer} must choose who gets the other card",
	"descriptionmyturn": "${you} must choose who gets the other card",
	"type": "activeplayer",
	"args": "arg_allOpponents",
	"possibleactions": [
		"peasChooseOpponent"
	],
	"transitions": {
		"15": 15,
		"16": 16
	}
}
					*/
					break;
				case "onionChooseOpponent":
					/*
					{
	"name": "onionChooseOpponent",
	"description": "${actplayer} must choose who gets the onion",
	"descriptionmyturn": "${you} must choose who gets the onion",
	"type": "activeplayer",
	"args": "arg_allOpponents",
	"possibleactions": [
		"onionChooseOpponent"
	],
	"transitions": {
		"15": 15,
		"16": 16
	}
}
					*/
					break;
				case "cornTakeCard":
					/*
					{
	"name": "cornTakeCard",
	"description": "${actplayer} must pick a card from the garden row",
	"descriptionmyturn": "${you} must pick a card from the garden row",
	"type": "activeplayer",
	"possibleactions": [
		"cornTakeCard"
	],
	"transitions": {
		"15": 15,
		"16": 16
	}
}
					*/
					break;
				case "beetChooseOpponent":
					/*
					{
	"name": "beetChooseOpponent",
	"description": "${actplayer} must choose an opponent",
	"descriptionmyturn": "${you} must choose an opponent",
	"type": "activeplayer",
	"args": "arg_beetOpponents",
	"possibleactions": [
		"beetChooseOpponent"
	],
	"transitions": {
		"15": 15,
		"16": 16
	}
}
					*/
					break;
				case "playedCard":
					/*
					{
	"name": "playedCard",
	"description": "Card was played",
	"type": "game",
	"action": "stPlayedCard",
	"transitions": {
		"2": 2,
		"4": 4
	},
	"updateGameProgression": true
}
					*/
					break;
				case "zombieUndo":
					/*
					{
	"name": "zombieUndo",
	"description": "Undo last card play of player that quit",
	"type": "game",
	"action": "stZombieUndo",
	"transitions": {
		"2": 2
	}
}
					*/
					break;
				case "rhubarbHarvestCard":
					/*
					{
	"name": "rhubarbHarvestCard",
	"description": "${actplayer} must harvest a card from the garden row",
	"descriptionmyturn": "${you} must harvest a card from the garden row",
	"type": "activeplayer",
	"possibleactions": [
		"rhubarbHarvestCard"
	],
	"transitions": {
		"15": 15,
		"16": 16
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
export default abandonallartichokes;
