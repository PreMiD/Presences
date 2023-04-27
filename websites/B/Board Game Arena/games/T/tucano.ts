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

const tucano: GamePresence = {
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
				case "playerSelectColumn":
					/*
					{
	"name": "playerSelectColumn",
	"description": "${actplayer} must collect a column of cards",
	"descriptionmyturn": "${you} must collect a column of cards",
	"type": "activeplayer",
	"possibleactions": [
		"selectColumn"
	],
	"transitions": {
		"resolveToucans": 11,
		"endTurn": 20
	}
}
					*/
					break;
				case "playerResolveToucans":
					/*
					{
	"name": "playerResolveToucans",
	"description": "${actplayer} must select a toucan to resolve",
	"descriptionmyturn": "${you} must select a toucan to resolve",
	"type": "activeplayer",
	"args": "argsResolveToucans",
	"possibleactions": [
		"selectFlip",
		"selectGift",
		"selectSteal"
	],
	"transitions": {
		"chooseGift": 12,
		"resolveSteal": 14,
		"resolveToucans": 11,
		"endTurn": 20
	}
}
					*/
					break;
				case "playerChooseGift":
					/*
					{
	"name": "playerChooseGift",
	"description": "${actplayer} must choose a card to gift to another player",
	"descriptionmyturn": "${you} must choose a card to gift to another player",
	"type": "activeplayer",
	"possibleactions": [
		"chooseGift"
	],
	"transitions": {
		"resolveGift": 13,
		"resolveToucans": 11,
		"endTurn": 20
	}
}
					*/
					break;
				case "playerResolveGift":
					/*
					{
	"name": "playerResolveGift",
	"description": "${actplayer} must select a player to gift ${card}",
	"descriptionmyturn": "${you} must select a player to gift ${card}",
	"type": "activeplayer",
	"args": "argsResolveGift",
	"possibleactions": [
		"resolveGift"
	],
	"transitions": {
		"resolveToucans": 11,
		"endTurn": 20
	}
}
					*/
					break;
				case "playerResolveSteal":
					/*
					{
	"name": "playerResolveSteal",
	"description": "${actplayer} must select a card to steal from another player",
	"descriptionmyturn": "${you} must select a card to steal from another player",
	"type": "activeplayer",
	"args": "argsResolveSteal",
	"possibleactions": [
		"resolveSteal"
	],
	"transitions": {
		"resolveToucans": 11,
		"endTurn": 20
	}
}
					*/
					break;
				case "gameNextPlayer":
					/*
					{
	"name": "gameNextPlayer",
	"type": "game",
	"action": "stGameNextPlayer",
	"updateGameProgression": true,
	"transitions": {
		"nextPlayer": 10,
		"assignJoker": 21,
		"endGame": 22
	}
}
					*/
					break;
				case "playerAssignJoker":
					/*
					{
	"name": "playerAssignJoker",
	"description": "${actplayer} must add Joker to a set of fruit",
	"descriptionmyturn": "${you} must add Joker to a set of fruit",
	"type": "activeplayer",
	"possibleactions": [
		"assignJoker"
	],
	"transitions": {
		"endGame": 22
	}
}
					*/
					break;
				case "gameFinalScoring":
					/*
					{
	"name": "gameFinalScoring",
	"type": "game",
	"action": "stGameFinalScoring",
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
export default tucano;
