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

const noah: GamePresence = {
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
				case "startRound":
					/*
					{
	"name": "startRound",
	"description": "",
	"type": "game",
	"action": "stStartRound",
	"transitions": {
		"": 20
	},
	"updateGameProgression": true
}
					*/
					break;
				case "loadAnimal":
					/*
					{
	"name": "loadAnimal",
	"description": "${actplayer} must load an animal",
	"descriptionmyturn": "${you} must load an animal",
	"descriptionimpossible": "${actplayer} must take back all animals present on the ferry",
	"descriptionmyturnimpossible": "${you} must take back all animals present on the ferry",
	"type": "activeplayer",
	"args": "argLoadAnimal",
	"possibleactions": [
		"loadAnimal",
		"takeAllAnimals"
	],
	"transitions": {
		"loadAnimal": 20,
		"chooseGender": 31,
		"chooseWeight": 35,
		"chooseOpponent": 32,
		"reorderTopDeck": 36,
		"replaceOnTopDeck": 37,
		"moveNoah": 50,
		"zombiePass": 90
	}
}
					*/
					break;
				case "chooseGender":
					/*
					{
	"name": "chooseGender",
	"description": "${actplayer} must choose gender",
	"descriptionmyturn": "${you} must choose gender",
	"type": "activeplayer",
	"possibleactions": [
		"setGender"
	],
	"transitions": {
		"moveNoah": 50,
		"zombiePass": 90
	}
}
					*/
					break;
				case "chooseOpponent":
					/*
					{
	"name": "chooseOpponent",
	"description": "${actplayer} must choose a player to look cards",
	"descriptionmyturn": "${you} must choose a player to look cards",
	"descriptionexchange": "${actplayer} must choose a player to exchange card",
	"descriptionmyturnexchange": "${you} must choose a player to exchange card",
	"descriptiongive": "${actplayer} must choose a player to give card",
	"descriptionmyturngive": "${you} must choose a player to give card",
	"type": "activeplayer",
	"action": "stChooseOpponent",
	"args": "argChooseOpponent",
	"possibleactions": [
		"chooseOpponent"
	],
	"transitions": {
		"look": 33,
		"exchange": 34,
		"moveNoah": 50,
		"zombiePass": 90
	}
}
					*/
					break;
				case "viewCards":
					/*
					{
	"name": "viewCards",
	"description": "${actplayer} looks to chosen opponent cards",
	"descriptionmyturn": "${you} look to chosen opponent cards",
	"type": "activeplayer",
	"args": "argViewCards",
	"possibleactions": [
		"seen"
	],
	"transitions": {
		"seen": 50
	}
}
					*/
					break;
				case "giveCard":
					/*
					{
	"name": "giveCard",
	"description": "${actplayer} must give back a card to chosen opponent",
	"descriptionmyturn": "${you} must give back a card to chosen opponent",
	"type": "activeplayer",
	"action": "stGiveCard",
	"possibleactions": [
		"giveCard"
	],
	"transitions": {
		"giveCard": 50
	}
}
					*/
					break;
				case "chooseWeight":
					/*
					{
	"name": "chooseWeight",
	"description": "${actplayer} must choose weight",
	"descriptionmyturn": "${you} must choose weight",
	"type": "activeplayer",
	"args": "argChooseWeight",
	"possibleactions": [
		"setWeight"
	],
	"transitions": {
		"moveNoah": 50,
		"zombiePass": 90
	}
}
					*/
					break;
				case "reorderTopDeck":
					/*
					{
	"name": "reorderTopDeck",
	"description": "${actplayer} can reorder top deck cards",
	"descriptionmyturn": "${you} can reorder top deck cards",
	"type": "activeplayer",
	"args": "argReorderTopDeck",
	"possibleactions": [
		"reorderTopDeck"
	],
	"transitions": {
		"moveNoah": 50,
		"zombiePass": 90
	}
}
					*/
					break;
				case "replaceOnTopDeck":
					/*
					{
	"name": "replaceOnTopDeck",
	"description": "${actplayer} can replace an animal on top of the deck",
	"descriptionmyturn": "${you} can replace an animal on top of the deck",
	"type": "activeplayer",
	"args": "argReplaceOnTopDeck",
	"possibleactions": [
		"replaceOnTopDeck",
		"skipReplaceOnTopDeck"
	],
	"transitions": {
		"moveNoah": 50,
		"zombiePass": 90
	}
}
					*/
					break;
				case "moveNoah":
					/*
					{
	"name": "moveNoah",
	"description": "${actplayer} must move Noah",
	"descriptionmyturn": "${you} must move Noah",
	"type": "activeplayer",
	"action": "stMoveNoah",
	"args": "argMoveNoah",
	"possibleactions": [
		"moveNoah"
	],
	"transitions": {
		"checkOptimalLoading": 60,
		"endGame": 99,
		"zombiePass": 90
	},
	"updateGameProgression": true
}
					*/
					break;
				case "optimalLoading":
					/*
					{
	"name": "optimalLoading",
	"description": "",
	"type": "game",
	"action": "stOptimalLoading",
	"transitions": {
		"giveCards": 61,
		"drawCards": 80,
		"nextPlayer": 90,
		"zombiePass": 90
	}
}
					*/
					break;
				case "optimalLoadingGiveCards":
					/*
					{
	"name": "optimalLoadingGiveCards",
	"description": "${actplayer} must give ${number} card(s) from your hand to opponents",
	"descriptionmyturn": "${you} must give ${number} card(s) from your hand to opponents",
	"type": "activeplayer",
	"args": "argOptimalLoadingGiveCards",
	"possibleactions": [
		"giveCards"
	],
	"transitions": {
		"drawCards": 80,
		"nextPlayer": 90,
		"zombiePass": 90
	}
}
					*/
					break;
				case "drawCards":
					/*
					{
	"name": "drawCards",
	"description": "",
	"type": "game",
	"action": "stDrawCards",
	"transitions": {
		"nextPlayer": 90,
		"zombiePass": 90
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
	"transitions": {
		"nextPlayer": 20,
		"endRound": 95,
		"endGame": 99
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
		"newRound": 10,
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
export default noah;
