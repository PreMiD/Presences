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

const hydroracers: GamePresence = {
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
				case "raceStart":
					/*
					{
	"name": "raceStart",
	"description": "New race : planes are placed on starting line.",
	"type": "game",
	"action": "stRaceStart",
	"updateGameProgression": true,
	"transitions": {
		"": 3
	}
}
					*/
					break;
				case "turnStart":
					/*
					{
	"name": "turnStart",
	"description": "New turn.",
	"type": "game",
	"action": "stTurnStart",
	"updateGameProgression": true,
	"transitions": {
		"player": 4,
		"autopilot": 5
	}
}
					*/
					break;
				case "playerTurn":
					/*
					{
	"name": "playerTurn",
	"description": "${actplayer} must play a card, bet or pass",
	"descriptionmyturn": "${you} must play a card, bet or pass",
	"type": "activeplayer",
	"possibleactions": [
		"playCard",
		"bet",
		"pass"
	],
	"transitions": {
		"playCard": 6,
		"bet": 4,
		"pass": 6
	}
}
					*/
					break;
				case "autopilotTurn":
					/*
					{
	"name": "autopilotTurn",
	"description": "Autopilot turn...",
	"type": "game",
	"action": "stAutopilotTurn",
	"transitions": {
		"playCard": 6,
		"pass": 6
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
		"endRace": 7,
		"newTurn": 3,
		"nextPlayer": 4,
		"nextAutopilot": 5
	}
}
					*/
					break;
				case "raceEnd":
					/*
					{
	"name": "raceEnd",
	"description": "",
	"type": "game",
	"action": "stRaceEnd",
	"transitions": {
		"endGame": 99,
		"nextRace": 2
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
export default hydroracers;
