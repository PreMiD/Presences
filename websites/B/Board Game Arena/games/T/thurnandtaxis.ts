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

const thurnandtaxis: GamePresence = {
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
				case "getCard":
					/*
					{
	"name": "getCard",
	"description": "${actplayer} must add a city card to their hand",
	"descriptionmyturn": "${you} must add a city card to your hand",
	"type": "activeplayer",
	"possibleactions": [
		"getCard"
	],
	"transitions": {
		"getSecondCard": 11,
		"playCard": 13,
		"zombiePass": 7
	}
}
					*/
					break;
				case "checkHand":
					/*
					{
	"name": "checkHand",
	"type": "game",
	"action": "stCheckHand",
	"updateGameProgression": true,
	"transitions": {
		"discard": 6,
		"next": 7
	}
}
					*/
					break;
				case "discardCards":
					/*
					{
	"name": "discardCards",
	"description": "${actplayer} must select cards in hand to discard in excess of 3",
	"descriptionmyturn": "${you} must select cards in hand to discard in excess of 3",
	"type": "activeplayer",
	"possibleactions": [
		"discardCards"
	],
	"transitions": {
		"next": 7,
		"zombiePass": 7
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
	"updateGameProgression": true,
	"transitions": {
		"getCard": 2,
		"getCardOrReplaceCards": 10,
		"endGame": 99
	}
}
					*/
					break;
				case "getCardOrReplaceCards":
					/*
					{
	"name": "getCardOrReplaceCards",
	"description": "${actplayer} may add a city card to their hand, or use the administrator",
	"descriptionmyturn": "${you} may add a city card to your hand, or use the administrator",
	"type": "activeplayer",
	"possibleactions": [
		"getCard",
		"replaceCityCards"
	],
	"transitions": {
		"getSecondCardOrPlayCard": 12,
		"getCard": 2,
		"zombiePass": 7
	}
}
					*/
					break;
				case "getSecondCard":
					/*
					{
	"name": "getSecondCard",
	"description": "${actplayer} must add a second city card to their hand (postmaster)",
	"descriptionmyturn": "${you} must add a second city card to your hand (postmaster)",
	"type": "activeplayer",
	"possibleactions": [
		"getCard"
	],
	"transitions": {
		"playCard": 13,
		"zombiePass": 7
	}
}
					*/
					break;
				case "getSecondCardOrPlayCard":
					/*
					{
	"name": "getSecondCardOrPlayCard",
	"description": "${actplayer} may add a second city card to their hand (postmaster), or play a city card",
	"descriptionmyturn": "${you} may add a second city card to your hand (postmaster), or play a city card",
	"type": "activeplayer",
	"possibleactions": [
		"getCard",
		"playCard"
	],
	"transitions": {
		"playCard": 13,
		"playSecondCard": 14,
		"playSecondCardOrScoreRouteWithCartwright": 15,
		"playSecondCardOrScoreRoute": 17,
		"zombiePass": 7
	}
}
					*/
					break;
				case "playCard":
					/*
					{
	"name": "playCard",
	"description": "${actplayer} must play a city card",
	"descriptionmyturn": "${you} must play a city card",
	"type": "activeplayer",
	"possibleactions": [
		"playCard"
	],
	"transitions": {
		"scoreRoute": 16,
		"next": 7,
		"zombiePass": 7
	}
}
					*/
					break;
				case "playSecondCard":
					/*
					{
	"name": "playSecondCard",
	"description": "${actplayer} may play a second city card (postal carrier)",
	"descriptionmyturn": "${you} may play a second city card (postal carrier)",
	"type": "activeplayer",
	"possibleactions": [
		"playCard",
		"pass"
	],
	"transitions": {
		"scoreRoute": 16,
		"next": 7,
		"zombiePass": 7
	}
}
					*/
					break;
				case "playSecondCardOrScoreRouteWithCartwright":
					/*
					{
	"name": "playSecondCardOrScoreRouteWithCartwright",
	"description": "${actplayer} may play a second city card (postal carrier), or place houses and close the route (with cartwright)",
	"descriptionmyturn": "${you} may play a second city card (postal carrier), or place houses and close the route (with cartwright)",
	"type": "activeplayer",
	"possibleactions": [
		"playCard",
		"score",
		"pass"
	],
	"transitions": {
		"scoreRoute": 16,
		"check": 5,
		"next": 7,
		"endGame": 99,
		"zombiePass": 7
	}
}
					*/
					break;
				case "scoreRoute":
					/*
					{
	"name": "scoreRoute",
	"description": "${actplayer} may place houses and close the route",
	"descriptionmyturn": "${you} may place houses and close the route",
	"type": "activeplayer",
	"possibleactions": [
		"score",
		"pass"
	],
	"transitions": {
		"next": 7,
		"check": 5,
		"endGame": 99,
		"zombiePass": 7
	}
}
					*/
					break;
				case "playSecondCardOrScoreRoute":
					/*
					{
	"name": "playSecondCardOrScoreRoute",
	"description": "${actplayer} may play a second city card (postal carrier), or place houses and close the route",
	"descriptionmyturn": "${you} may play a second city card (postal carrier), or place houses and close the route",
	"type": "activeplayer",
	"possibleactions": [
		"playCard",
		"score",
		"pass"
	],
	"transitions": {
		"scoreRoute": 16,
		"check": 5,
		"next": 7,
		"endGame": 99,
		"zombiePass": 7
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
export default thurnandtaxis;
