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

const dragonheart: GamePresence = {
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
				case "playerTurn":
					/*
					{
	"name": "playerTurn",
	"description": "${actplayer} must play a set of cards",
	"descriptionmyturn": "${you} must play a set of cards",
	"type": "activeplayer",
	"possibleactions": [
		"playCards"
	],
	"transitions": {
		"endTurn": 20,
		"knightChoice": 11,
		"sorceressChoice": 12
	}
}
					*/
					break;
				case "knightChoice":
					/*
					{
	"name": "knightChoice",
	"description": "${actplayer} must choose between Trolls and Sorceresses",
	"descriptionmyturn": "${you} must choose between Trolls and Sorceresses",
	"type": "activeplayer",
	"possibleactions": [
		"knightChoice"
	],
	"transitions": {
		"endTurn": 20
	}
}
					*/
					break;
				case "sorceressChoice":
					/*
					{
	"name": "sorceressChoice",
	"description": "${actplayer} must choose between Treasure Chests and Petrified Dragons",
	"descriptionmyturn": "${you} must choose between Treasure Chests and Petrified Dragons",
	"type": "activeplayer",
	"possibleactions": [
		"sorceressChoice"
	],
	"transitions": {
		"endTurn": 20
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
	"updateGameProgression": true,
	"transitions": {
		"nextPlayer": 10,
		"endGame": 98
	}
}
					*/
					break;
				case "finalScoring":
					/*
					{
	"name": "finalScoring",
	"description": "",
	"type": "game",
	"action": "stFinalScoring",
	"transitions": {
		"": 99
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
export default dragonheart;
