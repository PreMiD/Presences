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

const eightmastersrevenge: GamePresence = {
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
		"": 3
	}
}
					*/
					break;
				case "selectFighter":
					/*
					{
	"name": "selectFighter",
	"description": "${actplayer} must choose a master",
	"descriptionmyturn": "${you} must choose your master among the 8 masters on the box",
	"type": "activeplayer",
	"possibleactions": [
		"selectFighter"
	],
	"transitions": {
		"pass": 3
	}
}
					*/
					break;
				case "nextPlayerSelection":
					/*
					{
	"name": "nextPlayerSelection",
	"type": "game",
	"action": "stNextPlayerSelection",
	"updateGameProgression": false,
	"transitions": {
		"selectFighter": 2,
		"beginGame": 4
	}
}
					*/
					break;
				case "gameBegin":
					/*
					{
	"name": "gameBegin",
	"type": "game",
	"action": "stGameBegin",
	"updateGameProgression": false,
	"transitions": {
		"gameHasStarted": 10,
		"kara": 50,
		"corbeau": 51,
		"masa": 52
	}
}
					*/
					break;
				case "gameBeginAfterReplay":
					/*
					{
	"name": "gameBeginAfterReplay",
	"type": "game",
	"action": "stGameBegin",
	"updateGameProgression": false,
	"transitions": {
		"gameHasStarted": 10,
		"kara": 50,
		"corbeau": 51,
		"masa": 52
	}
}
					*/
					break;
				case "playerTurn":
					/*
					{
	"name": "playerTurn",
	"description": "${actplayer} must ${drawAction}",
	"descriptionmyturn": "${you} must ${drawAction}",
	"args": "argComputeAvailableDrawCard",
	"type": "activeplayer",
	"possibleactions": [
		"playCard",
		"drawCards",
		"pass"
	],
	"transitions": {
		"drawExtraCard": 11,
		"cardPlayed": 12,
		"nextTurn": 80,
		"nextPlayer": 81,
		"slideTrapAndWound": 29,
		"pass": 81,
		"endGame": 98
	}
}
					*/
					break;
				case "drawExtraCardForLater":
					/*
					{
	"name": "drawExtraCardForLater",
	"description": "${actplayer} must draw a card for later or pass (fury power)",
	"descriptionmyturn": "${you} must draw a card for later or pass (fury power)",
	"type": "activeplayer",
	"possibleactions": [
		"drawCard",
		"pass"
	],
	"transitions": {
		"cardPlayed": 12,
		"pass": 12
	}
}
					*/
					break;
				case "nextPlayerDefend":
					/*
					{
	"name": "nextPlayerDefend",
	"description": " ",
	"type": "game",
	"action": "stNextPlayerDefend",
	"updateGameProgression": false,
	"transitions": {
		"defend": 13,
		"blockOnly": 18,
		"counterOnly": 15,
		"pass": 30
	}
}
					*/
					break;
				case "opponentDefend":
					/*
					{
	"name": "opponentDefend",
	"description": "${actplayer} must choose to defend himself (block or counter) or pass",
	"descriptionmyturn": "${you} must choose to defend yourself (block or counter) or pass",
	"type": "activeplayer",
	"possibleactions": [
		"block"
	],
	"transitions": {
		"block": 19,
		"counter": 14,
		"pass": 30,
		"endGame": 98
	}
}
					*/
					break;
				case "nextPlayerCounter":
					/*
					{
	"name": "nextPlayerCounter",
	"description": " ",
	"type": "game",
	"action": "stNextPlayerCounter",
	"updateGameProgression": false,
	"transitions": {
		"counter": 15,
		"next": 16
	}
}
					*/
					break;
				case "opponentCounter":
					/*
					{
	"name": "opponentCounter",
	"description": "${actplayer} must choose to counter or pass",
	"descriptionmyturn": "${you} must choose to counter or pass",
	"type": "activeplayer",
	"possibleactions": [
		"block"
	],
	"transitions": {
		"counter": 14,
		"pass": 16,
		"endGame": 98
	}
}
					*/
					break;
				case "counterLoopResult":
					/*
					{
	"name": "counterLoopResult",
	"description": " ",
	"type": "game",
	"action": "stCounterLoopResult",
	"updateGameProgression": false,
	"transitions": {
		"next": 30,
		"nextPlayer": 81
	}
}
					*/
					break;
				case "opponentBlock":
					/*
					{
	"name": "opponentBlock",
	"description": "${actplayer} must choose to block or pass",
	"descriptionmyturn": "${you} must choose to block or pass",
	"type": "activeplayer",
	"possibleactions": [
		"block"
	],
	"transitions": {
		"block": 19,
		"pass": 30
	}
}
					*/
					break;
				case "nextPlayerBlockAgain":
					/*
					{
	"name": "nextPlayerBlockAgain",
	"description": " ",
	"type": "game",
	"action": "stNextPlayerBlockAgain",
	"updateGameProgression": false,
	"transitions": {
		"block": 18,
		"pass": 30
	}
}
					*/
					break;
				case "slideToken":
					/*
					{
	"name": "slideToken",
	"description": "${actplayer} must choose a damage token on play and slide it aside or pass",
	"descriptionmyturn": "${you} must choose a damage token on play and slide it aside or pass",
	"type": "activeplayer",
	"possibleactions": [
		"move",
		"pass"
	],
	"transitions": {
		"nextPlayer": 81,
		"pass": 81
	}
}
					*/
					break;
				case "resolveAttack":
					/*
					{
	"name": "resolveAttack",
	"description": " ",
	"type": "game",
	"action": "stResolveAttack",
	"updateGameProgression": true,
	"transitions": {
		"next": 33,
		"wound": 31
	}
}
					*/
					break;
				case "furyChooseWoundOverDamage":
					/*
					{
	"name": "furyChooseWoundOverDamage",
	"description": "${actplayer} must choose to place 1 damage on a card in play or pass (fury power)",
	"descriptionmyturn": "${you} must choose to place 1 damage on a card in play or pass (fury power)",
	"type": "activeplayer",
	"possibleactions": [
		"wound"
	],
	"transitions": {
		"next": 33
	}
}
					*/
					break;
				case "applyDamage":
					/*
					{
	"name": "applyDamage",
	"description": " ",
	"type": "game",
	"action": "stApplyDamage",
	"updateGameProgression": true,
	"transitions": {
		"next": 41,
		"fury": 40,
		"endGame": 98
	}
}
					*/
					break;
				case "furyChooseEffect":
					/*
					{
	"name": "furyChooseEffect",
	"description": "${actplayer} must choose which effect to apply (fury power)",
	"descriptionmyturn": "${you} must choose which effect to apply (fury power)",
	"type": "activeplayer",
	"possibleactions": [
		"chooseEffect"
	],
	"transitions": {
		"next": 41
	}
}
					*/
					break;
				case "applyCardEffect":
					/*
					{
	"name": "applyCardEffect",
	"description": " ",
	"type": "game",
	"action": "stApplyCardEffect",
	"updateGameProgression": false,
	"transitions": {
		"none": 80,
		"slide": 42,
		"trap": 43,
		"wound": 44,
		"empower": 45,
		"remove": 46,
		"switch": 47,
		"draw": 48,
		"copy": 49
	}
}
					*/
					break;
				case "slideCardEffect":
					/*
					{
	"name": "slideCardEffect",
	"description": "${actplayer} must slide both cards selected to the left or to the right or pass",
	"descriptionmyturn": "${you} must slide both cards selected to the left or to the right or pass",
	"type": "activeplayer",
	"possibleactions": [
		"slide",
		"pass"
	],
	"transitions": {
		"next": 80,
		"pass": 80,
		"endGame": 98
	}
}
					*/
					break;
				case "trapCardEffect":
					/*
					{
	"name": "trapCardEffect",
	"description": "${actplayer} must place a trap or pass",
	"descriptionmyturn": "${you} must place a trap or pass",
	"type": "activeplayer",
	"possibleactions": [
		"trap",
		"pass"
	],
	"transitions": {
		"next": 80,
		"pass": 80
	}
}
					*/
					break;
				case "woundCardEffect":
					/*
					{
	"name": "woundCardEffect",
	"description": "${actplayer} must place a damage on a card or pass",
	"descriptionmyturn": "${you} must place a damage on a card or pass",
	"type": "activeplayer",
	"possibleactions": [
		"wound",
		"pass"
	],
	"transitions": {
		"next": 80,
		"pass": 80
	}
}
					*/
					break;
				case "empowerCardEffect":
					/*
					{
	"name": "empowerCardEffect",
	"description": "${actplayer} must place power up/down token on a card or pass",
	"descriptionmyturn": "${you} must place power up/down token on a card or pass",
	"type": "activeplayer",
	"possibleactions": [
		"empower",
		"pass"
	],
	"transitions": {
		"next": 80,
		"pass": 80
	}
}
					*/
					break;
				case "removeCardEffect":
					/*
					{
	"name": "removeCardEffect",
	"description": "${actplayer} must remove a token in play or pass",
	"descriptionmyturn": "${you} must remove a token in play or pass",
	"type": "activeplayer",
	"possibleactions": [
		"remove",
		"pass"
	],
	"transitions": {
		"next": 80,
		"pass": 80
	}
}
					*/
					break;
				case "switchCardEffect":
					/*
					{
	"name": "switchCardEffect",
	"description": "${actplayer} must choose a pair of cards or pass",
	"descriptionmyturn": "${you} must choose a pair of cards or pass",
	"type": "activeplayer",
	"possibleactions": [
		"switch",
		"pass"
	],
	"transitions": {
		"next": 80,
		"pass": 80
	}
}
					*/
					break;
				case "drawCardEffect":
					/*
					{
	"name": "drawCardEffect",
	"description": "${actplayer} must draw a card, make his opponent draw a card or pass",
	"descriptionmyturn": "${you} must draw a card, make your opponent draw a card or pass",
	"type": "activeplayer",
	"possibleactions": [
		"drawCards",
		"pass"
	],
	"transitions": {
		"nextTurn": 80,
		"pass": 80
	}
}
					*/
					break;
				case "copyCardEffect":
					/*
					{
	"name": "copyCardEffect",
	"description": "${actplayer} must select a card effect to copy or pass",
	"descriptionmyturn": "${you} must select a card effect to copy or pass",
	"type": "activeplayer",
	"possibleactions": [
		"copy",
		"pass"
	],
	"transitions": {
		"slide": 42,
		"trap": 43,
		"wound": 44,
		"empower": 45,
		"remove": 46,
		"switch": 47,
		"draw": 48,
		"pass": 80
	}
}
					*/
					break;
				case "slideFuryCardEffect":
					/*
					{
	"name": "slideFuryCardEffect",
	"description": "${actplayer} must slide both cards selected to the left or to the right or pass (fury power)",
	"descriptionmyturn": "${you} must slide both cards selected to the left or to the right or pass (fury power)",
	"type": "activeplayer",
	"possibleactions": [
		"slide",
		"pass"
	],
	"transitions": {
		"next": 10,
		"pass": 10,
		"endGame": 98
	}
}
					*/
					break;
				case "putCrowTokenFuryCardEffect":
					/*
					{
	"name": "putCrowTokenFuryCardEffect",
	"description": "${actplayer} must put a crow token on an empty area (fury power) or pass",
	"descriptionmyturn": "${you} must put a crow token on an empty area (fury power) or pass",
	"type": "activeplayer",
	"possibleactions": [
		"putCrowToken",
		"pass"
	],
	"transitions": {
		"next": 10,
		"pass": 10
	}
}
					*/
					break;
				case "revealFuryCardEffect":
					/*
					{
	"name": "revealFuryCardEffect",
	"description": "${actplayer} must choose to reveal the top card of the deck (fury power) or pass",
	"descriptionmyturn": "${you} must choose to reveal the top card of the deck (fury power) or pass",
	"type": "activeplayer",
	"possibleactions": [
		"reveal",
		"pass"
	],
	"transitions": {
		"pass": 10,
		"none": 80,
		"slide": 42,
		"trap": 43,
		"wound": 44,
		"empower": 45,
		"remove": 46,
		"switch": 47,
		"draw": 48,
		"copy": 49,
		"endGame": 98
	}
}
					*/
					break;
				case "nextPlayerOrSamePlayer":
					/*
					{
	"name": "nextPlayerOrSamePlayer",
	"description": " ",
	"type": "game",
	"action": "stNextPlayerOrSamePlayer",
	"updateGameProgression": true,
	"transitions": {
		"playTurn": 10,
		"playAnotherTurn": 5,
		"nextTurn": 4,
		"cantPlay": 4,
		"putCardInHand": 83,
		"endGame": 98
	}
}
					*/
					break;
				case "nextPlayer":
					/*
					{
	"name": "nextPlayer",
	"description": " ",
	"type": "game",
	"action": "stNextPlayer",
	"updateGameProgression": true,
	"transitions": {
		"nextTurn": 4,
		"cantPlay": 4,
		"putCardInHand": 83,
		"endGame": 98
	}
}
					*/
					break;
				case "samePlayerPlayAgain":
					/*
					{
	"name": "samePlayerPlayAgain",
	"description": " ",
	"type": "game",
	"action": "stSamePlayerPlayAgain",
	"updateGameProgression": true,
	"transitions": {
		"playAnotherTurn": 5,
		"cantPlay": 4
	}
}
					*/
					break;
				case "putCardInHandFury":
					/*
					{
	"name": "putCardInHandFury",
	"description": "${actplayer} must select cards to remove from hand (fury power)",
	"descriptionmyturn": "${you} must select cards to remove from hand (fury power)",
	"type": "activeplayer",
	"possibleactions": [
		"putCardAside"
	],
	"transitions": {
		"nextPlayer": 81
	}
}
					*/
					break;
				case "masterDefeated":
					/*
					{
	"name": "masterDefeated",
	"description": "End of game",
	"descriptionmyturn": "End of game",
	"type": "multipleactiveplayer",
	"possibleactions": [
		"end"
	],
	"transitions": {
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
export default eightmastersrevenge;
