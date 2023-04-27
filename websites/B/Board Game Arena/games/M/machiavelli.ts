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

const machiavelli: GamePresence = {
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
				case "playerTurnStart":
					/*
					{
	"name": "playerTurnStart",
	"description": "${actplayer} must choose an action",
	"descriptionmyturn": "${you} must choose an action",
	"type": "activeplayer",
	"possibleactions": [
		"playCardsStart",
		"takeCardsStart",
		"drawCard"
	],
	"transitions": {
		"checkDeck": 60,
		"turnStateB": 30,
		"checkPlayA": 40
	}
}
					*/
					break;
				case "playerTurnStateA":
					/*
					{
	"name": "playerTurnStateA",
	"description": "${actplayer} must choose an action",
	"descriptionmyturn": "${you} must choose an action",
	"type": "activeplayer",
	"possibleactions": [
		"playCardsStateA",
		"takeCardsStateA",
		"pass"
	],
	"transitions": {
		"checkPlayA": 40,
		"turnStateB": 30,
		"turnEnd": 70
	}
}
					*/
					break;
				case "playerTurnStateB":
					/*
					{
	"name": "playerTurnStateB",
	"description": "${actplayer} must choose an action",
	"descriptionmyturn": "${you} must choose an action",
	"type": "activeplayer",
	"possibleactions": [
		"playCardsStateB",
		"takeCardsStateB",
		"restore"
	],
	"transitions": {
		"turnStateB": 30,
		"checkPlayB": 50,
		"checkDeck": 60
	}
}
					*/
					break;
				case "checkPlayA":
					/*
					{
	"name": "checkPlayA",
	"description": "",
	"type": "game",
	"action": "stCheckPlayA",
	"updateGameProgression": false,
	"transitions": {
		"turnStateA": 20,
		"gameEnd": 99
	}
}
					*/
					break;
				case "checkPlayB":
					/*
					{
	"name": "checkPlayB",
	"description": "",
	"type": "game",
	"action": "stCheckPlayB",
	"updateGameProgression": false,
	"transitions": {
		"turnStart": 10,
		"turnStateA": 20,
		"turnStateB": 30,
		"gameEnd": 99
	}
}
					*/
					break;
				case "checkDeck":
					/*
					{
	"name": "checkDeck",
	"description": "",
	"type": "game",
	"action": "stCheckDeck",
	"updateGameProgression": false,
	"transitions": {
		"turnEnd": 70,
		"gameEnd": 99
	}
}
					*/
					break;
				case "turnEnd":
					/*
					{
	"name": "turnEnd",
	"description": "",
	"type": "game",
	"action": "stTurnEnd",
	"updateGameProgression": true,
	"transitions": {
		"nextPlayer": 10
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
export default machiavelli;
