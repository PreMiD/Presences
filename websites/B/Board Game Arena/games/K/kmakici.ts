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

const kmakici: GamePresence = {
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
		"": 6
	}
}
					*/
					break;
				case "playerTurn_1":
					/*
					{
	"name": "playerTurn_1",
	"description": "${actplayer} play a card(1/3) or pass",
	"descriptionmyturn": "${you} play a card(1/3) or pass",
	"type": "activeplayer",
	"action": "stDrawCard",
	"possibleactions": [
		"playCard"
	],
	"transitions": {
		"playCard": 3,
		"sameplayer": 6,
		"endGame": 99,
		"zombiePass": 10
	}
}
					*/
					break;
				case "playerTurn_2":
					/*
					{
	"name": "playerTurn_2",
	"description": "${actplayer} play a card(2/3) or turn end",
	"descriptionmyturn": "${you} play a card(2/3) or turn end",
	"type": "activeplayer",
	"possibleactions": [
		"playCard"
	],
	"transitions": {
		"playCard": 4,
		"sameplayer": 6,
		"nextplayer": 10,
		"endGame": 99,
		"zombiePass": 10
	}
}
					*/
					break;
				case "playerTurn_3":
					/*
					{
	"name": "playerTurn_3",
	"description": "${actplayer} play a card(3/3) or turn end",
	"descriptionmyturn": "${you} play a card(3/3) or turn end",
	"type": "activeplayer",
	"possibleactions": [
		"playCard"
	],
	"transitions": {
		"playCard": 10,
		"sameplayer": 6,
		"nextplayer": 10,
		"endGame": 99,
		"zombiePass": 10
	}
}
					*/
					break;
				case "playerTurn_firstplayer":
					/*
					{
	"name": "playerTurn_firstplayer",
	"description": "First player ${actplayer} must play a card(1/3)",
	"descriptionmyturn": "First player ${you} must play a card(1/3)",
	"type": "activeplayer",
	"action": "stDrawCard_firstplayer",
	"possibleactions": [
		"playCard"
	],
	"transitions": {
		"playCard": 3,
		"sameplayer": 6,
		"endGame": 99,
		"zombiePass": 10
	}
}
					*/
					break;
				case "nextPlayer":
					/*
					{
	"name": "nextPlayer",
	"type": "game",
	"action": "stNextPlayer",
	"updateGameProgression": true,
	"transitions": {
		"nextPlayer": 2,
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
export default kmakici;
