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

const jekyllvshide: GamePresence = {
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
	"type": "manager",
	"action": "stNewRound",
	"transitions": {
		"goSwapCards": 11
	}
}
					*/
					break;
				case "chooseSwapCards":
					/*
					{
	"name": "chooseSwapCards",
	"description": "Opponent is choosing cards to exchange",
	"descriptionmyturn": "Round start : ${you} must choose ${nb_cards} card(s) to exchange",
	"args": "argStateChooseSwapCards",
	"type": "multipleactiveplayer",
	"action": "stChooseSwapCards",
	"possibleactions": [
		"sendCards"
	],
	"transitions": {
		"swapReady": 12
	}
}
					*/
					break;
				case "doSwapCards":
					/*
					{
	"name": "doSwapCards",
	"type": "manager",
	"action": "stDoSwapCards",
	"transitions": {
		"startTricks": 15
	}
}
					*/
					break;
				case "newTrick":
					/*
					{
	"name": "newTrick",
	"type": "manager",
	"updateGameProgression": true,
	"action": "stNewTrick",
	"transitions": {
		"goPlayerTurn": 20
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
	"possibleactions": [
		"playCard"
	],
	"transitions": {
		"askPotionColor": 21,
		"onCardPlayed": 25
	}
}
					*/
					break;
				case "choosePotionColor":
					/*
					{
	"name": "choosePotionColor",
	"description": "${actplayer} must choose a color",
	"descriptionmyturn": "Potion : ${you} must choose a color",
	"type": "activeplayer",
	"possibleactions": [
		"onPotionColor"
	],
	"transitions": {
		"afterPotionColor": 22
	}
}
					*/
					break;
				case "afterPotionColor":
					/*
					{
	"name": "afterPotionColor",
	"type": "manager",
	"action": "stAfterPotionColor",
	"transitions": {
		"secondCard": 20
	}
}
					*/
					break;
				case "afterPlay":
					/*
					{
	"name": "afterPlay",
	"type": "manager",
	"action": "stAfterPlay",
	"transitions": {
		"chooseSwapCardsGreenPotion": 26,
		"secondCard": 20,
		"nextTrick": 15,
		"endRound": 30
	}
}
					*/
					break;
				case "chooseSwapCardsGreenPotion":
					/*
					{
	"name": "chooseSwapCardsGreenPotion",
	"description": "Opponent is choosing cards to exchange",
	"descriptionmyturn": "Green Potion : ${you} must choose ${nb_cards} card(s) to exchange",
	"args": "argStateChooseSwapCardsGreenPotion",
	"type": "multipleactiveplayer",
	"action": "stChooseSwapCardsGreenPotion",
	"possibleactions": [
		"sendCardsGreenPotion"
	],
	"transitions": {
		"swapReadyGreenPotion": 27
	}
}
					*/
					break;
				case "doSwapCardsGreenPotion":
					/*
					{
	"name": "doSwapCardsGreenPotion",
	"type": "manager",
	"action": "stDoSwapCardsGreenPotion",
	"transitions": {
		"startTricks": 15
	}
}
					*/
					break;
				case "endRound":
					/*
					{
	"name": "endRound",
	"type": "manager",
	"action": "stEndRound",
	"transitions": {
		"newRound": 10,
		"nextGame": 35,
		"endGame": 99
	}
}
					*/
					break;
				case "endReturnMatch":
					/*
					{
	"name": "endReturnMatch",
	"type": "manager",
	"action": "stEndReturnMatch",
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
export default jekyllvshide;
