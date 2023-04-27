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

const justdesserts: GamePresence = {
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
		"": 23
	}
}
					*/
					break;
				case "playerTurn":
					/*
					{
	"name": "playerTurn",
	"description": "${actplayer} must serve guests, draw a dessert or dump desserts",
	"descriptionmyturn": "${you} must choose 1 action",
	"type": "activeplayer",
	"possibleactions": [
		"draw",
		"serve",
		"swap",
		"openBuffet",
		"poach"
	],
	"args": "argGetPossibleMoves",
	"transitions": {
		"drawn": 23,
		"served": 25,
		"secondGuestServed": 23,
		"swapped": 23,
		"discardGuestNeeded": 24,
		"endGame": 99,
		"buffetOpened": 26,
		"buffetServe": 25,
		"poachingAttempt": 27,
		"poachingUnblockable": 28
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
	"args": "argCardsCounters",
	"updateGameProgression": true,
	"transitions": {
		"playerTurn": 2
	}
}
					*/
					break;
				case "playerDiscardGuest":
					/*
					{
	"name": "playerDiscardGuest",
	"description": "${actplayer} must discard guests until there is only one left from each suit",
	"descriptionmyturn": "${you} must discard guests until there is only one left from each suit",
	"type": "activeplayer",
	"possibleactions": [
		"discardGuest"
	],
	"args": "argCardsCounters",
	"transitions": {
		"guestsDiscarded": 23,
		"discardGuestNeeded": 24
	}
}
					*/
					break;
				case "serveSecondGuest":
					/*
					{
	"name": "serveSecondGuest",
	"description": "${actplayer} can serve another guest",
	"descriptionmyturn": "${you} must serve another guest or pass",
	"type": "activeplayer",
	"possibleactions": [
		"pass",
		"serveSecondGuest",
		"poach"
	],
	"args": "argGetPossibleMoves",
	"updateGameProgression": true,
	"transitions": {
		"passed": 23,
		"secondGuestServed": 23,
		"discardGuestNeeded": 24,
		"poachingAttempt": 27,
		"poachingUnblockable": 28,
		"endGame": 99
	}
}
					*/
					break;
				case "allPlayersDiscardGuest":
					/*
					{
	"name": "allPlayersDiscardGuest",
	"description": "Others must discard one satisfied guest",
	"descriptionmyturn": "${you}  must discard one of your satisfied guests",
	"type": "multipleactiveplayer",
	"action": "stMakeOtherActive",
	"possibleactions": [
		"discardWonGuest"
	],
	"transitions": {
		"buffetGuestDiscarded": 25
	}
}
					*/
					break;
				case "poachingReaction":
					/*
					{
	"name": "poachingReaction",
	"description": "${actplayer} can block poaching attempt",
	"descriptionmyturn": "${you} must decide to block poaching attempt or not",
	"type": "multipleactiveplayer",
	"action": "stActivatePoached",
	"possibleactions": [
		"blockPoaching",
		"letPoaching"
	],
	"args": "argGetPoachedGuest",
	"updateGameProgression": true,
	"transitions": {
		"served": 28,
		"poachingBlocked": 28
	}
}
					*/
					break;
				case "poachingResolved":
					/*
					{
	"name": "poachingResolved",
	"type": "game",
	"action": "stPoachingResolved",
	"args": "argCardsCounters",
	"updateGameProgression": true,
	"transitions": {
		"served": 25,
		"secondGuestServed": 23,
		"discardGuestNeeded": 24,
		"endGame": 99,
		"playerTurn": 2
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
	"updateGameProgression": true,
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
export default justdesserts;
