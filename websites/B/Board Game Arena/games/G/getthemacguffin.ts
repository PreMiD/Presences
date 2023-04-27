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

const getthemacguffin: GamePresence = {
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
	"description": "${actplayer} must play a card",
	"descriptionmyturn": "${you} must play a card from your hand or use/discard an Object in play",
	"type": "activeplayer",
	"args": "argPossibleTargetsInfo",
	"possibleactions": [
		"playCard",
		"discard",
		"pass"
	],
	"transitions": {
		"playCard": 2,
		"nextPlayer": 23,
		"pass": 23,
		"secretCards": 3,
		"specifyClockwise": 4,
		"specifyInPlayObject": 5,
		"specifyObjectsToSwap": 6,
		"mandatoryCard": 7
	}
}
					*/
					break;
				case "seeSecretCards":
					/*
					{
	"name": "seeSecretCards",
	"description": "${actplayer} is looking at secret cards",
	"descriptionmyturn": "${you} are looking at secret cards",
	"type": "activeplayer",
	"args": "argSeeSecretCards",
	"possibleactions": [
		"takeCard",
		"confirm"
	],
	"transitions": {
		"nextPlayer": 23
	}
}
					*/
					break;
				case "specifyClockwise":
					/*
					{
	"name": "specifyClockwise",
	"description": "${actplayer} is choosing clockwise or counterclockwise",
	"descriptionmyturn": "Who's hand do ${you} want to receive?",
	"type": "activeplayer",
	"possibleactions": [
		"clockwise",
		"counterclockwise"
	],
	"args": "argClockwise",
	"transitions": {
		"nextPlayer": 23
	}
}
					*/
					break;
				case "specifyObjectToTake":
					/*
					{
	"name": "specifyObjectToTake",
	"description": "${actplayer} is choosing an object to take",
	"descriptionmyturn": "${you} must choose an object to take",
	"type": "activeplayer",
	"possibleactions": [
		"takeObject"
	],
	"transitions": {
		"nextPlayer": 23
	}
}
					*/
					break;
				case "specifyObjectsToSwap":
					/*
					{
	"name": "specifyObjectsToSwap",
	"description": "${actplayer} is choosing 2 objects to swap",
	"descriptionmyturn": "${you} must choose 2 objects to swap between different players",
	"type": "activeplayer",
	"possibleactions": [
		"swapObjects"
	],
	"transitions": {
		"nextPlayer": 23
	}
}
					*/
					break;
				case "mandatoryCard":
					/*
					{
	"name": "mandatoryCard",
	"description": "${actplayer} must play the previously stolen card",
	"descriptionmyturn": "${you} must play the card you’ve just took",
	"type": "activeplayer",
	"args": "argMandatoryCard",
	"possibleactions": [
		"playCard",
		"discard",
		"pass"
	],
	"transitions": {
		"playCard": 2,
		"nextPlayer": 23,
		"pass": 23,
		"secretCards": 3,
		"specifyClockwise": 4,
		"specifyInPlayObject": 5,
		"specifyObjectsToSwap": 6
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
	"args": "argCardsCounters",
	"action": "stNextPlayer",
	"updateGameProgression": true,
	"transitions": {
		"playerTurn": 2,
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
export default getthemacguffin;
