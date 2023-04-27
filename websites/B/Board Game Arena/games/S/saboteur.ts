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

const saboteur: GamePresence = {
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
		"": 2
	}
}
					*/
					break;
				case "nextPlayer":
					/*
					{
	"name": "nextPlayer",
	"description": "",
	"descriptionmyturn": "",
	"type": "game",
	"action": "stNextPlayer",
	"updateGameProgression": true,
	"transitions": {
		"": 3
	}
}
					*/
					break;
				case "playerSelectCard":
					/*
					{
	"name": "playerSelectCard",
	"description": "${actplayer} must choose a card",
	"descriptionmyturn": "${you} must choose a card",
	"type": "activeplayer",
	"action": "stPlayerSelectCard",
	"possibleactions": [
		"selectCard",
		"selectCell",
		"selectPlayerTool",
		"useCardOnPlayer",
		"cancel"
	],
	"transitions": {
		"cellSelected": 7,
		"endCardToShowSelected": 6,
		"playerToolSelected": 7,
		"mineCardDestroyed": 7,
		"actionCardPlayed": 7,
		"cancel": 7,
		"zombiePass": 7
	}
}
					*/
					break;
				case "playerPlayMineCard":
					/*
					{
	"name": "playerPlayMineCard",
	"description": "${actplayer} must play the selected card or discard it",
	"descriptionmyturn": "${you} must select where you want to use this card",
	"type": "activeplayer",
	"possibleactions": [
		"selectCard",
		"selectCell",
		"cancel"
	],
	"transitions": {
		"mineCardSelected": 4,
		"actionCardSelected": 5,
		"twoCardsSelected": 31,
		"threeCardsSelected": 32,
		"cardsUnselected": 3,
		"cellSelected": 7,
		"cancel": 7,
		"zombiePass": 7
	}
}
					*/
					break;
				case "playerPlayActionCard":
					/*
					{
	"name": "playerPlayActionCard",
	"description": "${actplayer} must play the selected card or discard it",
	"descriptionmyturn": "${you} must select where you want to use this card",
	"type": "activeplayer",
	"possibleactions": [
		"selectCard",
		"selectCell",
		"selectPlayerTool",
		"useCardOnPlayer",
		"cancel"
	],
	"transitions": {
		"mineCardSelected": 4,
		"actionCardSelected": 5,
		"twoCardsSelected": 31,
		"threeCardsSelected": 32,
		"cardsUnselected": 3,
		"endCardToShowSelected": 6,
		"mineCardDestroyed": 7,
		"playerToolSelected": 7,
		"actionCardPlayed": 7,
		"cancel": 7,
		"zombiePass": 7
	}
}
					*/
					break;
				case "playerShowGoalCard":
					/*
					{
	"name": "playerShowGoalCard",
	"description": "${actplayer} is using the map to peek at a goal card",
	"descriptionmyturn": "${you} are using the map to peek at a goal card ",
	"type": "activeplayer",
	"possibleactions": [
		"accept"
	],
	"transitions": {
		"accept": 7,
		"zombiePass": 7
	}
}
					*/
					break;
				case "checkEndOfRound":
					/*
					{
	"name": "checkEndOfRound",
	"description": "Preparing next turn...",
	"descriptionmyturn": "",
	"type": "game",
	"action": "stCheckEndOfRound",
	"transitions": {
		"endOfTurn": 2,
		"endOfRound": 8
	}
}
					*/
					break;
				case "checkTheft":
					/*
					{
	"name": "checkTheft",
	"description": "Some theft, anyone?",
	"descriptionmyturn": "",
	"type": "game",
	"action": "stCheckTheft",
	"transitions": {
		"thief": 9,
		"tryNextThief": 8,
		"noMoreThief": 10
	}
}
					*/
					break;
				case "playerStealGold":
					/*
					{
	"name": "playerStealGold",
	"description": "${actplayer} must choose a player to steal 1 gold piece from",
	"descriptionmyturn": "${you} must choose a player to steal 1 gold piece from",
	"type": "activeplayer",
	"possibleactions": [
		"steal"
	],
	"transitions": {
		"done": 8,
		"zombiePass": 8
	}
}
					*/
					break;
				case "checkEndOfGame":
					/*
					{
	"name": "checkEndOfGame",
	"description": "Preparing next round...",
	"descriptionmyturn": "",
	"type": "game",
	"action": "stCheckEndOfGame",
	"transitions": {
		"newRound": 2,
		"endOfGame": 99
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
export default saboteur;
