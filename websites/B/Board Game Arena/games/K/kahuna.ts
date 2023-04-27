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

const kahuna: GamePresence = {
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
	"transitions": {
		"": 3
	}
}
					*/
					break;
				case "playerTurn":
					/*
					{
	"name": "playerTurn",
	"description": "${actplayer} must build/destroy a bridge or pick a card",
	"descriptionmyturn": "${you} must build/destroy a bridge or pick a card",
	"type": "activeplayer",
	"action": "stPlayerTurn",
	"updateGameProgression": true,
	"possibleactions": [
		"buildBridge",
		"destroyBridge",
		"discard",
		"pickCard",
		"zombiePass"
	],
	"transitions": {
		"pickCard": 2,
		"pickLastCard": 4,
		"zombiePass": 2
	}
}
					*/
					break;
				case "endRound":
					/*
					{
	"name": "endRound",
	"description": "",
	"descriptionmyturn": "",
	"type": "game",
	"action": "stEndRound",
	"transitions": {
		"nextRound": 2,
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
	"action": "stGameEnd",
	"type": "manager",
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
export default kahuna;
