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

const gangofdice: GamePresence = {
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
		"": 2
	}
}
					*/
					break;
				case "state2":
					/*
					{
	"name": "state2",
	"type": "manager",
	"action": "stState2",
	"transitions": {
		"": 3
	}
}
					*/
					break;
				case "state3":
					/*
					{
	"name": "state3",
	"type": "manager",
	"action": "stState3",
	"transitions": {
		"": 4
	}
}
					*/
					break;
				case "state4":
					/*
					{
	"name": "state4",
	"type": "manager",
	"action": "stState4",
	"transitions": {
		"startRound": 5
	}
}
					*/
					break;
				case "initTurn":
					/*
					{
	"name": "initTurn",
	"type": "manager",
	"action": "stInitTurn",
	"transitions": {
		"startTurn": 10,
		"noDice": 20
	}
}
					*/
					break;
				case "chooseDice":
					/*
					{
	"name": "chooseDice",
	"description": "${actplayer} is choosing number of dice",
	"descriptionmyturn": "${you} must choose number of dice",
	"type": "activeplayer",
	"possibleactions": [
		"startroll"
	],
	"transitions": {
		"diceDone": 11,
		"explosion": 20
	}
}
					*/
					break;
				case "rollDice":
					/*
					{
	"name": "rollDice",
	"description": "${actplayer} is rolling dice",
	"descriptionmyturn": "",
	"args": "argRollDice",
	"type": "activeplayer",
	"possibleactions": [
		"reroll"
	],
	"transitions": {
		"reroll": 11,
		"rollDone": 20
	}
}
					*/
					break;
				case "showResult":
					/*
					{
	"name": "showResult",
	"type": "manager",
	"action": "stShowResult",
	"updateGameProgression": true,
	"transitions": {
		"nextPlayer": 5,
		"endRound": 2,
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
export default gangofdice;
