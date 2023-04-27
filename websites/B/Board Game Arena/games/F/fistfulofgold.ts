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

const fistfulofgold: GamePresence = {
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
		"": 3
	}
}
					*/
					break;
				case "gameStartRound":
					/*
					{
	"name": "gameStartRound",
	"description": "",
	"type": "game",
	"action": "stGameStartRound",
	"transitions": {
		"initialSetup": 4,
		"firstTurn": 5
	}
}
					*/
					break;
				case "multiDiscardCards":
					/*
					{
	"name": "multiDiscardCards",
	"description": "Waiting for other players to discard",
	"descriptionmyturn": "${you} must choose cards to discard",
	"type": "multipleactiveplayer",
	"action": "stMultiDiscardCards",
	"possibleactions": [
		"discardCards"
	],
	"args": "argMultiDiscardCards",
	"transitions": {
		"nextPlayer": 5,
		"nextRound": 3
	}
}
					*/
					break;
				case "multiPlayerTurn":
					/*
					{
	"name": "multiPlayerTurn",
	"description": "Waiting for other players to choose a card",
	"descriptionmyturn": "${you} must choose a card to play",
	"type": "multipleactiveplayer",
	"action": "stMultiPlayerTurn",
	"possibleactions": [
		"playCard"
	],
	"transitions": {
		"gameTurn": 10
	}
}
					*/
					break;
				case "gameDuel":
					/*
					{
	"name": "gameDuel",
	"description": "",
	"type": "game",
	"action": "stGameDuel",
	"updateGameProgression": true,
	"transitions": {
		"nextPlayer": 5,
		"discardCards": 4,
		"reclaimDiscardedCard": 15,
		"nextRound": 3,
		"gameEnd": 99
	}
}
					*/
					break;
				case "playerReclaimDiscardedCard":
					/*
					{
	"name": "playerReclaimDiscardedCard",
	"description": "${actplayer} must return a discarded card to his hand",
	"descriptionmyturn": "${you} must return a discarded card to your hand",
	"type": "activeplayer",
	"possibleactions": [
		"reclaimDiscardedCard"
	],
	"args": "argPlayerReclaimDiscardedCard",
	"transitions": {
		"nextPlayer": 5,
		"discardCards": 4,
		"reclaimDiscardedCard": 15,
		"nextRound": 3,
		"gameEnd": 99
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
	"args": "argGameEnd",
	"updateGameProgression": true
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
export default fistfulofgold;
