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

const seasaltpaper: GamePresence = {
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
		"start": 20
	}
}
					*/
					break;
				case "takeCards":
					/*
					{
	"name": "takeCards",
	"description": "${actplayer} must take two cards from deck or one card from a discard pile ${call}",
	"descriptionmyturn": "${you} must take two cards from deck or one card from a discard pile ${call}",
	"descriptionNoDiscard": "${actplayer} must take two cards from deck ${call}",
	"descriptionmyturnNoDiscard": "${you} must take two cards from deck ${call}",
	"type": "activeplayer",
	"args": "argTakeCards",
	"updateGameProgression": true,
	"possibleactions": [
		"takeCardsFromDeck",
		"takeCardFromDiscard"
	],
	"transitions": {
		"playCards": 40,
		"chooseCard": 30,
		"zombiePass": 75
	}
}
					*/
					break;
				case "chooseCard":
					/*
					{
	"name": "chooseCard",
	"description": "${actplayer} must choose a card to keep",
	"descriptionmyturn": "${you} must choose a card to keep",
	"type": "activeplayer",
	"args": "argChooseCard",
	"possibleactions": [
		"chooseCard"
	],
	"transitions": {
		"putDiscardPile": 35,
		"playCards": 40,
		"zombiePass": 75
	}
}
					*/
					break;
				case "putDiscardPile":
					/*
					{
	"name": "putDiscardPile",
	"description": "${actplayer} must choose a discard pile for the other card",
	"descriptionmyturn": "${you} must choose a discard pile for the other card",
	"type": "activeplayer",
	"args": "argChooseCard",
	"possibleactions": [
		"putDiscardPile"
	],
	"transitions": {
		"playCards": 40,
		"zombiePass": 75
	}
}
					*/
					break;
				case "playCards":
					/*
					{
	"name": "playCards",
	"description": "${actplayer} may play cards duo",
	"descriptionmyturn": "${you} may play cards duo",
	"type": "activeplayer",
	"args": "argPlayCards",
	"action": "stPlayCards",
	"updateGameProgression": true,
	"possibleactions": [
		"playCards",
		"endGameWithMermaids",
		"endTurn",
		"endRound",
		"immediateEndRound"
	],
	"transitions": {
		"chooseDiscardPile": 45,
		"newTurn": 20,
		"chooseOpponent": 50,
		"playCards": 40,
		"endTurn": 75,
		"mermaids": 90,
		"zombiePass": 75
	}
}
					*/
					break;
				case "chooseDiscardPile":
					/*
					{
	"name": "chooseDiscardPile",
	"description": "${actplayer} must choose a discard pile",
	"descriptionmyturn": "${you} must choose a discard pile",
	"type": "activeplayer",
	"possibleactions": [
		"chooseDiscardPile"
	],
	"transitions": {
		"chooseCard": 46,
		"zombiePass": 75
	}
}
					*/
					break;
				case "chooseDiscardCard":
					/*
					{
	"name": "chooseDiscardCard",
	"description": "${actplayer} must choose a card",
	"descriptionmyturn": "${you} must choose a card",
	"type": "activeplayer",
	"args": "argChooseDiscardCard",
	"possibleactions": [
		"chooseDiscardCard"
	],
	"transitions": {
		"playCards": 40,
		"zombiePass": 75
	}
}
					*/
					break;
				case "chooseOpponent":
					/*
					{
	"name": "chooseOpponent",
	"description": "${actplayer} must choose an opponent to steal",
	"descriptionmyturn": "${you} must choose an opponent to steal",
	"type": "activeplayer",
	"args": "argChooseOpponent",
	"possibleactions": [
		"chooseOpponent"
	],
	"transitions": {
		"playCards": 40,
		"zombiePass": 75
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
		"newTurn": 20,
		"endRound": 79
	}
}
					*/
					break;
				case "beforeEndRound":
					/*
					{
	"name": "beforeEndRound",
	"description": "Some players are seeing end round result",
	"descriptionmyturn": "End round result",
	"type": "multipleactiveplayer",
	"action": "stBeforeEndRound",
	"possibleactions": [
		"seen"
	],
	"transitions": {
		"endRound": 80
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
		"newRound": 10,
		"endScore": 90
	}
}
					*/
					break;
				case "endScore":
					/*
					{
	"name": "endScore",
	"description": "",
	"type": "game",
	"action": "stEndScore",
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
export default seasaltpaper;
