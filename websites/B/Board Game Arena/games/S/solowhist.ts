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

const solowhist: GamePresence = {
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
				case "newHand":
					/*
					{
	"name": "newHand",
	"description": "",
	"type": "game",
	"action": "stNewHand",
	"updateGameProgression": true,
	"transitions": {
		"": 21
	}
}
					*/
					break;
				case "playerBid":
					/*
					{
	"name": "playerBid",
	"description": "${actplayer} must bid or pass",
	"descriptionmyturn": "${you} must bid or pass",
	"type": "activeplayer",
	"possibleactions": [
		"makeBid"
	],
	"action": "giveExtraTimeToActivePlayer",
	"args": "argPlayerBid",
	"updateGameProgression": true,
	"transitions": {
		"makeBid": 22,
		"bidHighest": 28
	}
}
					*/
					break;
				case "nextBidder":
					/*
					{
	"name": "nextBidder",
	"description": "",
	"type": "game",
	"action": "stNextPlayerToBid",
	"transitions": {
		"nextBidder": 21,
		"skip": 22,
		"annul": 23,
		"upgrade": 24,
		"eldestCanCop": 25,
		"done": 28
	}
}
					*/
					break;
				case "annulHand":
					/*
					{
	"name": "annulHand",
	"description": "Players must confirm annulling the hand...",
	"descriptionmyturn": "This hand is annulled and will be dealt again",
	"type": "multipleactiveplayer",
	"action": "stAnnulHand",
	"possibleactions": [
		"confirm"
	],
	"transitions": {
		"done": 20
	}
}
					*/
					break;
				case "upgradeToSolo":
					/*
					{
	"name": "upgradeToSolo",
	"description": "${actplayer} must decide whether to upgrade their bid or pass",
	"descriptionmyturn": "${you} must decide whether to upgrade your bid or pass",
	"type": "activeplayer",
	"action": "giveExtraTimeToActivePlayer",
	"possibleactions": [
		"makeBid",
		"pass"
	],
	"args": "argPlayerBid",
	"transitions": {
		"makeBid": 22,
		"pass": 23,
		"misery": 28,
		"bidHighest": 28
	}
}
					*/
					break;
				case "eldestCanCop":
					/*
					{
	"name": "eldestCanCop",
	"description": "${actplayer} must decide whether to bid Cop or pass",
	"descriptionmyturn": "${you} must decide whether to bid Cop or pass",
	"type": "activeplayer",
	"action": "giveExtraTimeToActivePlayer",
	"possibleactions": [
		"makeBid",
		"cop"
	],
	"transitions": {
		"makeBid": 22
	}
}
					*/
					break;
				case "changeToEldest":
					/*
					{
	"name": "changeToEldest",
	"description": "",
	"type": "game",
	"action": "stChangeToEldest",
	"transitions": {
		"done": 30
	}
}
					*/
					break;
				case "prepareContract":
					/*
					{
	"name": "prepareContract",
	"description": "",
	"type": "game",
	"action": "stPrepareContract",
	"transitions": {
		"chooseTrumpSuit": 29,
		"done": 30
	}
}
					*/
					break;
				case "chooseTrumpSuit":
					/*
					{
	"name": "chooseTrumpSuit",
	"description": "${actplayer} must choose a trump suit",
	"descriptionmyturn": "${you} must choose a trump suit",
	"type": "activeplayer",
	"possibleactions": [
		"chooseTrumpSuit"
	],
	"action": "giveExtraTimeToActivePlayer",
	"transitions": {
		"done": 27
	}
}
					*/
					break;
				case "newTrick":
					/*
					{
	"name": "newTrick",
	"description": "",
	"type": "game",
	"action": "stNewTrick",
	"transitions": {
		"": 31
	}
}
					*/
					break;
				case "playerTurn":
					/*
					{
	"name": "playerTurn",
	"description": "${actplayer} must play a card",
	"descriptionmyturn": "${you} must play a card",
	"type": "activeplayer",
	"action": "stPlayerTurn",
	"possibleactions": [
		"playCard"
	],
	"transitions": {
		"playCard": 32
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
		"nextPlayer": 31,
		"nextTrick": 30,
		"endHand": 40
	}
}
					*/
					break;
				case "endHand":
					/*
					{
	"name": "endHand",
	"description": "",
	"type": "game",
	"action": "stEndHand",
	"transitions": {
		"nextHand": 20,
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
export default solowhist;
