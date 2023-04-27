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

const fifteendays: GamePresence = {
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
				case "play_action":
					/*
					{
	"name": "play_action",
	"description": "${actplayer} must take cards, play cards or obtain a wildcard (action #${action_number})",
	"descriptionmyturn": "${you} must take cards, play cards or obtain a wildcard (action #${action_number})",
	"args": "argsPlayAction",
	"type": "activeplayer",
	"possibleactions": [
		"drawHiddenCard",
		"takeFaceupCard",
		"placeHandCard",
		"takeWildcard",
		"useFeather"
	],
	"transitions": {
		"drawHiddenCards": 25,
		"takeFaceupCards": 28,
		"refillColumn": 35,
		"placeCards": 40,
		"placeWildcard": 55,
		"payCards": 45,
		"takeWildcard": 50,
		"checkFinish": 65,
		"zombiePass": 65
	}
}
					*/
					break;
				case "draw_hidden_cards":
					/*
					{
	"name": "draw_hidden_cards",
	"description": "${actplayer} must draw ${cards_number} card(s) from the decks (action #${action_number})",
	"descriptionmyturn": "${you} must draw ${cards_number} card(s) from the decks (action #${action_number})",
	"args": "argsDrawHiddenCards",
	"type": "activeplayer",
	"possibleactions": [
		"useFeather",
		"drawHiddenCard"
	],
	"transitions": {
		"drawHiddenCards": 25,
		"checkFinish": 65
	}
}
					*/
					break;
				case "take_faceup_cards":
					/*
					{
	"name": "take_faceup_cards",
	"description": "${actplayer} must take ${cards_number} card(s) from the display (action #${action_number})",
	"descriptionmyturn": "${you} must take ${cards_number} card(s) from the display (action #${action_number})",
	"args": "argsPlayAction",
	"type": "activeplayer",
	"possibleactions": [
		"useFeather",
		"takeFaceupCard",
		"undoAction"
	],
	"transitions": {
		"playAction": 20,
		"takeFaceupCards": 28,
		"refillColumn": 35,
		"checkFinish": 65
	}
}
					*/
					break;
				case "discard_exceeding_cards":
					/*
					{
	"name": "discard_exceeding_cards",
	"description": "${actplayer} must discard down to ${hand_limit} cards",
	"descriptionmyturn": "${you} must discard down to ${hand_limit} cards",
	"args": "argsDiscardExceedingCards",
	"type": "activeplayer",
	"possibleactions": [
		"useFeather",
		"discardCard",
		"undoAction"
	],
	"transitions": {
		"discardExceedingCards": 30,
		"checkFinish": 65
	}
}
					*/
					break;
				case "refill_column":
					/*
					{
	"name": "refill_column",
	"description": "${actplayer} must refill a column",
	"descriptionmyturn": "${you} must refill a column",
	"type": "activeplayer",
	"possibleactions": [
		"useFeather",
		"drawToRefill"
	],
	"transitions": {
		"takeFaceupCards": 28,
		"checkFinish": 65
	}
}
					*/
					break;
				case "place_cards":
					/*
					{
	"name": "place_cards",
	"description": "${actplayer} must place cards (actual cost: ${cost})",
	"descriptionmyturn": "${you} must place cards (actual cost: ${cost}) or",
	"args": "argsPlaceCards",
	"type": "activeplayer",
	"possibleactions": [
		"useFeather",
		"placeHandCard",
		"stopPlacing",
		"undoAction"
	],
	"transitions": {
		"playAction": 20,
		"placeCards": 40,
		"payCards": 45,
		"placeWildcard": 55,
		"checkFinish": 65
	}
}
					*/
					break;
				case "pay_cards":
					/*
					{
	"name": "pay_cards",
	"description": "${actplayer} must pay ${cards_to_pay} card(s) (action #${action_number})",
	"descriptionmyturn": "${you} must pay ${cards_to_pay} card(s) (action #${action_number})",
	"args": "argsPayCards",
	"type": "activeplayer",
	"possibleactions": [
		"useFeather",
		"discardCard",
		"undoAction"
	],
	"transitions": {
		"playAction": 20,
		"payCards": 45,
		"checkFinish": 65
	}
}
					*/
					break;
				case "take_wildcard":
					/*
					{
	"name": "take_wildcard",
	"description": "${actplayer} must discard 2 copies of cards already placed (action #${action_number})",
	"descriptionmyturn": "${you} must discard 2 copies of cards already placed (action #${action_number})",
	"args": "argsTakeWildcard",
	"type": "activeplayer",
	"possibleactions": [
		"useFeather",
		"discardCard",
		"undoAction"
	],
	"transitions": {
		"playAction": 20,
		"placeWildcard": 55
	}
}
					*/
					break;
				case "place_wildcard":
					/*
					{
	"name": "place_wildcard",
	"description": "${actplayer} must place a wildcard (action #${action_number})",
	"descriptionmyturn": "${you} must place a wildcard (action #${action_number})",
	"args": "argsPlaceWildcard",
	"type": "activeplayer",
	"possibleactions": [
		"useFeather",
		"placeWildcard",
		"undoAction"
	],
	"transitions": {
		"playAction": 20,
		"placeCards": 40,
		"payCards": 45,
		"checkFinish": 65
	}
}
					*/
					break;
				case "game_end_bonus":
					/*
					{
	"name": "game_end_bonus",
	"type": "activeplayer",
	"description": "${actplayer} may place a wildcard (game end bonus) or pass",
	"descriptionmyturn": "${you} may place a wildcard (game end bonus) or",
	"args": "argsPlaceWildcard",
	"possibleactions": [
		"placeWildcard",
		"pass"
	],
	"transitions": {
		"playAction": 20,
		"checkFinish": 65
	}
}
					*/
					break;
				case "checkFinish":
					/*
					{
	"name": "checkFinish",
	"type": "game",
	"action": "stCheckFinish",
	"updateGameProgression": true,
	"transitions": {
		"finish": 99,
		"gameEndBonus": 60,
		"playAction": 20,
		"discardExceedingCards": 30,
		"refillColumn": 35
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
export default fifteendays;
