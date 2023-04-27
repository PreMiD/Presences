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

const herrlof: GamePresence = {
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
				case "newHand":
					/*
					{
	"name": "newHand",
	"description": "",
	"type": "game",
	"action": "st_newHand",
	"updateGameProgression": true,
	"transitions": {
		"": 3
	}
}
					*/
					break;
				case "bidding":
					/*
					{
	"name": "bidding",
	"descriptionmyturn": "${you} must bid a number of tricks you think you will win",
	"description": "Waiting for other bid(s)",
	"type": "multipleactiveplayer",
	"possibleactions": [
		"bid"
	],
	"transitions": {
		"all_bids_in": 4
	}
}
					*/
					break;
				case "startTricks":
					/*
					{
	"name": "startTricks",
	"description": "",
	"type": "game",
	"action": "st_startTricks",
	"transitions": {
		"": 5
	}
}
					*/
					break;
				case "playCard":
					/*
					{
	"name": "playCard",
	"descriptionmyturn": "${you} must play a card",
	"description": "${actplayer} must play a card",
	"type": "activeplayer",
	"possibleactions": [
		"play_card"
	],
	"transitions": {
		"three_opt_out": 6,
		"resolve_three": 7,
		"after_play": 8
	}
}
					*/
					break;
				case "threeOptOut":
					/*
					{
	"name": "threeOptOut",
	"descriptionmyturn": "${you} may use the 3 special ability ",
	"description": "${actplayer} is deciding on using the 3 special ability ",
	"type": "activeplayer",
	"possibleactions": [
		"three_opt_out"
	],
	"transitions": {
		"resolve_three": 7,
		"after_play": 8
	}
}
					*/
					break;
				case "resolveThree":
					/*
					{
	"name": "resolveThree",
	"descriptionmyturn": "${you} must choose a card to return",
	"description": "${actplayer} is choosing which card to return",
	"type": "activeplayer",
	"possibleactions": [
		"return_card_to_deck"
	],
	"transitions": {
		"after_play": 8
	}
}
					*/
					break;
				case "afterPlay":
					/*
					{
	"name": "afterPlay",
	"description": "",
	"type": "game",
	"action": "st_afterPlay",
	"transitions": {
		"next_player": 5,
		"resolve_trick": 9
	}
}
					*/
					break;
				case "resolveTrick":
					/*
					{
	"name": "resolveTrick",
	"description": "",
	"type": "game",
	"action": "st_resolveTrick",
	"transitions": {
		"resolve_one": 10,
		"resolve_six": 12,
		"after_trick": 15
	}
}
					*/
					break;
				case "resolveOne":
					/*
					{
	"name": "resolveOne",
	"description": "",
	"type": "game",
	"action": "st_resolveOne",
	"transitions": {
		"choose_one_target": 11,
		"after_trick": 15
	}
}
					*/
					break;
				case "chooseOneTarget":
					/*
					{
	"name": "chooseOneTarget",
	"descriptionmyturn": "${you} must choose who to steal a trick from",
	"description": "${actplayer} is choosing whose trick to steal",
	"type": "activeplayer",
	"args": "args_chooseTargetPlayer",
	"possibleactions": [
		"choose_one_target"
	],
	"transitions": {
		"after_trick": 15
	}
}
					*/
					break;
				case "resolveSix":
					/*
					{
	"name": "resolveSix",
	"description": "",
	"type": "game",
	"action": "st_resolveSix",
	"transitions": {
		"choose_six_target": 13,
		"choose_six_return": 14
	}
}
					*/
					break;
				case "chooseSixTarget":
					/*
					{
	"name": "chooseSixTarget",
	"descriptionmyturn": "${you} must choose who to steal a card from",
	"description": "${actplayer} is choosing whose hand to steal from",
	"type": "activeplayer",
	"args": "args_chooseTargetPlayer",
	"possibleactions": [
		"choose_six_target"
	],
	"transitions": {
		"choose_six_return": 14,
		"after_trick": 15
	}
}
					*/
					break;
				case "chooseSixReturn":
					/*
					{
	"name": "chooseSixReturn",
	"descriptionmyturn": "${you} must choose a card to return to the same player",
	"description": "${actplayer} is choosing a card to return",
	"type": "activeplayer",
	"possibleactions": [
		"return_card_to_player"
	],
	"transitions": {
		"after_trick": 15
	}
}
					*/
					break;
				case "afterTrick":
					/*
					{
	"name": "afterTrick",
	"description": "",
	"type": "game",
	"action": "st_afterTrick",
	"transitions": {
		"next_trick": 5,
		"resolve_round": 16
	}
}
					*/
					break;
				case "resolveRound":
					/*
					{
	"name": "resolveRound",
	"description": "",
	"type": "game",
	"action": "st_resolveRound",
	"transitions": {
		"next_hand": 2,
		"end_game": 99
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
export default herrlof;
