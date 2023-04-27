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

const blueskies: GamePresence = {
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
				case "seedBoard":
					/*
					{
	"name": "seedBoard",
	"type": "game",
	"action": "stSeedBoard",
	"transitions": {
		"default": 3
	}
}
					*/
					break;
				case "startingGates":
					/*
					{
	"name": "startingGates",
	"description": "${actplayer} is buying starting gates.",
	"descriptionmyturn": "You have 6 points to purchase your starting gates. Unused points will be lost!",
	"type": "activeplayer",
	"possibleactions": [
		"buyGates"
	],
	"transitions": {
		"default": 4,
		"zombiePass": 4
	}
}
					*/
					break;
				case "startingGatesPrevPlayer":
					/*
					{
	"name": "startingGatesPrevPlayer",
	"type": "game",
	"action": "stPrevPlayer",
	"transitions": {
		"nextPlayer": 3,
		"done": 5
	}
}
					*/
					break;
				case "buyGates":
					/*
					{
	"name": "buyGates",
	"description": "${actplayer} is buying gates.",
	"descriptionmyturn": "You have 6 points to purchase new gates. Unused points will be added to your score.",
	"type": "activeplayer",
	"possibleactions": [
		"buyGates"
	],
	"transitions": {
		"default": 6,
		"zombiePass": 6
	},
	"updateGameProgression": true
}
					*/
					break;
				case "buyGatesNextPlayer":
					/*
					{
	"name": "buyGatesNextPlayer",
	"type": "game",
	"action": "stNextPlayer",
	"transitions": {
		"nextPlayer": 5,
		"done": 7
	}
}
					*/
					break;
				case "playCards":
					/*
					{
	"name": "playCards",
	"description": "${actplayer} must play a card or use a special action.",
	"descriptionmyturn": "${you} must play a card or use your special action.",
	"type": "activeplayer",
	"possibleactions": [
		"playCard",
		"specialAction"
	],
	"transitions": {
		"playCard": 8,
		"zombiePass": 8,
		"specialAction": 15
	}
}
					*/
					break;
				case "playCardsNextPlayer":
					/*
					{
	"name": "playCardsNextPlayer",
	"type": "game",
	"action": "stNextPlayer",
	"transitions": {
		"nextPlayer": 7,
		"done": 9
	}
}
					*/
					break;
				case "drawDemandCards":
					/*
					{
	"name": "drawDemandCards",
	"type": "game",
	"action": "stDrawCards",
	"transitions": {
		"default": 10
	}
}
					*/
					break;
				case "scoreIncome":
					/*
					{
	"name": "scoreIncome",
	"type": "game",
	"action": "stScoreIncome",
	"transitions": {
		"endGame": 99,
		"governmentAssistance": 18,
		"keepGoing": 13
	},
	"updateGameProgression": true
}
					*/
					break;
				case "governmentAssistance":
					/*
					{
	"name": "governmentAssistance",
	"description": "${actplayer} is receiving government assistance.",
	"descriptionmyturn": "The government offers assistance: you may add passengers to up to ${num} ${airports}.",
	"type": "activeplayer",
	"args": "argGovernmentAssistance",
	"possibleactions": [
		"governmentAssist"
	],
	"transitions": {
		"nextPlayer": 12,
		"zombiePass": 12,
		"done": 16
	}
}
					*/
					break;
				case "governmentAssistanceNextPlayer":
					/*
					{
	"name": "governmentAssistanceNextPlayer",
	"type": "game",
	"action": "stGovernmentAssistanceNext",
	"transitions": {
		"nextPlayer": 11,
		"done": 16
	}
}
					*/
					break;
				case "localAirlines":
					/*
					{
	"name": "localAirlines",
	"type": "game",
	"action": "stLocalAirlines",
	"transitions": {
		"default": 14
	}
}
					*/
					break;
				case "passStartPlayer":
					/*
					{
	"name": "passStartPlayer",
	"type": "game",
	"action": "stPassStartPlayer",
	"transitions": {
		"default": 5
	}
}
					*/
					break;
				case "specialAction":
					/*
					{
	"name": "specialAction",
	"description": "${actplayer} must play a card or use a special action.",
	"descriptionmyturn": "${you} must choose an airport to receive passengers and any number of cards to discard.",
	"type": "activeplayer",
	"possibleactions": [
		"cancel",
		"useSpecial"
	],
	"transitions": {
		"cancel": 7,
		"zombiePass": 8,
		"useSpecial": 8
	}
}
					*/
					break;
				case "governmentDiscard":
					/*
					{
	"name": "governmentDiscard",
	"description": "End of government assistance: ${actplayer} is choosing whether to discard.",
	"descriptionmyturn": "End of government assistance: ${you} may discard any number of cards.",
	"type": "activeplayer",
	"possibleactions": [
		"discard"
	],
	"transitions": {
		"default": 17,
		"zombiePass": 17
	}
}
					*/
					break;
				case "governmentDiscardNextPlayer":
					/*
					{
	"name": "governmentDiscardNextPlayer",
	"type": "game",
	"action": "stNextPlayer",
	"transitions": {
		"nextPlayer": 16,
		"done": 13
	}
}
					*/
					break;
				case "governmentAssistanceStartPlayer":
					/*
					{
	"name": "governmentAssistanceStartPlayer",
	"type": "game",
	"action": "stGovernmentAssistance",
	"transitions": {
		"nextPlayer": 11,
		"done": 16
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
export default blueskies;
