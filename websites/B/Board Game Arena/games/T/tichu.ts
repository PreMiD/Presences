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

const tichu: GamePresence = {
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
		"": 10
	}
}
					*/
					break;
				case "newRound":
					/*
					{
	"name": "newRound",
	"description": "",
	"type": "game",
	"action": "stNewRound",
	"transitions": {
		"GTBets": 20
	}
}
					*/
					break;
				case "grandTichuBets":
					/*
					{
	"name": "grandTichuBets",
	"description": "All players must choose if they want to bet a Grand Tichu",
	"descriptionmyturn": "${you} must choose if you want to bet a Grand Tichu",
	"type": "multipleactiveplayer",
	"possibleactions": [
		"grandTichuBet",
		"tichuBet"
	],
	"transitions": {
		"dealLastCards": 30
	}
}
					*/
					break;
				case "dealLastCards":
					/*
					{
	"name": "dealLastCards",
	"description": "",
	"type": "game",
	"action": "stDealLastCards",
	"transitions": {
		"giveCards": 40
	}
}
					*/
					break;
				case "giveCards":
					/*
					{
	"name": "giveCards",
	"description": "All players must give a card to each other player",
	"descriptionmyturn": "${you} must give a card to each other player",
	"action": "stGiveCards",
	"type": "multipleactiveplayer",
	"possibleactions": [
		"giveCards"
	],
	"transitions": {
		"showPassedCards": 45
	}
}
					*/
					break;
				case "showPassedCards":
					/*
					{
	"name": "showPassedCards",
	"description": "Waiting for other players to accept cards",
	"descriptionmyturn": "${you} must accept cards",
	"action": "stShowPassedCards",
	"type": "multipleactiveplayer",
	"args": "argShowPassedCards",
	"possibleactions": [
		"acceptCards"
	],
	"transitions": {
		"acceptCards": 50
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
	"updateGameProgression": true,
	"transitions": {
		"firstCombo": 55
	}
}
					*/
					break;
				case "playComboOpen":
					/*
					{
	"name": "playComboOpen",
	"description": "${actplayer} must play an opening card combination",
	"descriptionmyturn": "${you} must play an opening card combination",
	"type": "activeplayer",
	"args": "argPlayComboOpen",
	"possibleactions": [
		"playCombo",
		"tichuBet"
	],
	"transitions": {
		"phoenixPlay": 63,
		"nextPlayer": 70,
		"mahjongPlayed": 65,
		"zombiePass": 70
	}
}
					*/
					break;
				case "playCombo":
					/*
					{
	"name": "playCombo",
	"description": "${actplayer} must play a card combination, or pass",
	"descriptionmyturn": "${you} must play a card combination, or pass",
	"type": "activeplayer",
	"possibleactions": [
		"playCombo",
		"tichuBet",
		"pass"
	],
	"transitions": {
		"phoenixPlay": 63,
		"nextPlayer": 70,
		"changePlayer": 85,
		"mahjongPlayed": 65,
		"zombiePass": 70
	}
}
					*/
					break;
				case "playBomb":
					/*
					{
	"name": "playBomb",
	"description": "${actplayer} wants to play a bomb.",
	"descriptionmyturn": "${you} must play a play a bomb.",
	"type": "activeplayer",
	"args": "argPlayBomb",
	"possibleactions": [
		"playCombo",
		"tichuBet",
		"pass"
	],
	"transitions": {
		"changePlayer": 85,
		"nextPlayer": 70,
		"zombiePass": 85
	}
}
					*/
					break;
				case "phoenixPlay":
					/*
					{
	"name": "phoenixPlay",
	"description": "${actplayer} must play a card combination, or pass",
	"descriptionmyturn": "${you} must choose a value for the phoenix",
	"type": "activeplayer",
	"args": "argsPhoenixPlay",
	"possibleactions": [
		"phoenixPlay"
	],
	"transitions": {
		"nextPlayer": 70,
		"playCombo": 60,
		"cancel": 55,
		"mahjongPlayed": 65
	}
}
					*/
					break;
				case "mahjongPlay":
					/*
					{
	"name": "mahjongPlay",
	"description": "${actplayer} makes a wish",
	"descriptionmyturn": "${you} make a wish",
	"type": "activeplayer",
	"possibleactions": [
		"makeAWish"
	],
	"transitions": {
		"nextPlayer": 70,
		"zombiePass": 70
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
		"nextPlayer": 60,
		"chooseDragonGift": 80,
		"newTrick": 50,
		"endRound": 90,
		"playComboOpen": 55,
		"confirmTrick": 75
	}
}
					*/
					break;
				case "confirmTrick":
					/*
					{
	"name": "confirmTrick",
	"description": "${actplayer} must collect the trick. Bombs can still be played",
	"descriptionmyturn": "${you} must collect the trick. Bombs can still be played",
	"type": "activeplayer",
	"possibleactions": [
		"collect"
	],
	"transitions": {
		"newTrick": 50,
		"chooseDragonGift": 80,
		"changePlayer": 85,
		"zombiePass": 50
	}
}
					*/
					break;
				case "chooseDragonGift":
					/*
					{
	"name": "chooseDragonGift",
	"description": "${actplayer} must choose who to give the Dragon trick",
	"descriptionmyturn": "${you} must choose who to give the Dragon trick",
	"type": "activeplayer",
	"args": "argChooseDragonGift",
	"possibleactions": [
		"chooseDragonGift"
	],
	"transitions": {
		"newTrick": 50,
		"zombiePass": 50,
		"endRound": 90
	}
}
					*/
					break;
				case "changePlayer":
					/*
					{
	"name": "changePlayer",
	"description": "",
	"type": "game",
	"action": "stChangePlayer",
	"transitions": {
		"playCombo": 60,
		"playBomb": 61,
		"confirmTrick": 75
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
		"endGame": 99,
		"newRound": 10
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
export default tichu;
