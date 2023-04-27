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

const bids: GamePresence = {
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
				case "newHand":
					/*
					{
	"name": "newHand",
	"description": "",
	"type": "game",
	"action": "stNewHand",
	"updateGameProgression": true,
	"transitions": {
		"": 30
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
	"transitions": {
		"playerturn": 31,
		"lowestCard": 34,
		"thiefState": 35
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
		"playCard": 32,
		"zombiePass": 32,
		"surpriseCard": 33
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
		"nextPlayer": 31,
		"surpriseCard": 33,
		"lowestCard": 34,
		"nextTrick": 30,
		"endHand": 40
	}
}
					*/
					break;
				case "surpriseCard":
					/*
					{
	"name": "surpriseCard",
	"description": "",
	"type": "game",
	"action": "stSurpriseCard",
	"transitions": {
		"": 32
	}
}
					*/
					break;
				case "lowestCard":
					/*
					{
	"name": "lowestCard",
	"description": "",
	"type": "game",
	"action": "stLowestCard",
	"transitions": {
		"nextTrick": 30,
		"playCard": 32
	}
}
					*/
					break;
				case "thiefState":
					/*
					{
	"name": "thiefState",
	"description": "${actplayer} can steal a card",
	"descriptionmyturn": "${you} can steal a card",
	"type": "activeplayer",
	"possibleactions": [
		"stealCard",
		"actionNo"
	],
	"transitions": {
		"steal": 36,
		"endHand": 40
	}
}
					*/
					break;
				case "stealCard":
					/*
					{
	"name": "stealCard",
	"description": "",
	"type": "game",
	"action": "stStealCard",
	"transitions": {
		"playerturn": 31,
		"endHand": 40
	}
}
					*/
					break;
				case "endHandThiefState":
					/*
					{
	"name": "endHandThiefState",
	"description": "${actplayer} can steal a card",
	"descriptionmyturn": "${you} can steal a card",
	"type": "activeplayer",
	"possibleactions": [
		"stealCard",
		"actionNo"
	],
	"transitions": {
		"steal": 36
	}
}
					*/
					break;
				case "endHand":
					/*
					{
	"name": "endHand",
	"description": "",
	"type": "game",
	"action": "stEndHand",
	"transitions": {
		"nextHand": 20,
		"thiefState": 37,
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
export default bids;
