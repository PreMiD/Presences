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

const capereurope: GamePresence = {
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
				case "stateNewRound":
					/*
					{
	"name": "stateNewRound",
	"description": "Processing results",
	"type": "game",
	"action": "stNewRound",
	"transitions": {
		"startRound": 15,
		"endGame": 90
	}
}
					*/
					break;
				case "stateTurnHandler":
					/*
					{
	"name": "stateTurnHandler",
	"description": "Processing results",
	"type": "game",
	"action": "stTurnHandler",
	"updateGameProgression": true,
	"transitions": {
		"startTurn": 20,
		"endRound": 10
	}
}
					*/
					break;
				case "statePlay":
					/*
					{
	"name": "statePlay",
	"description": "${actplayer} is playing a card",
	"descriptionmyturn": "${you} must play a card",
	"type": "activeplayer",
	"possibleactions": [
		"actionPlay",
		"actionGearDiscard"
	],
	"transitions": {
		"burnGood": 25,
		"endTurn": 15
	}
}
					*/
					break;
				case "stateSwitchToOpponent":
					/*
					{
	"name": "stateSwitchToOpponent",
	"description": "Processing results",
	"type": "game",
	"action": "stSwitchToOpponent",
	"transitions": {
		"done": 26
	}
}
					*/
					break;
				case "stateReturnGood":
					/*
					{
	"name": "stateReturnGood",
	"description": "${actplayer} is returning a good to [CARD${locationId}]",
	"descriptionmyturn": "${you} must choose a good to return to [CARD${locationId}]",
	"args": "argReturnGood",
	"type": "activeplayer",
	"possibleactions": [
		"actionReturnGood"
	],
	"transitions": {
		"endTurn": 15
	}
}
					*/
					break;
				case "stateScoring":
					/*
					{
	"name": "stateScoring",
	"description": "Processing results",
	"type": "game",
	"action": "stScoring",
	"updateGameProgression": true,
	"transitions": {
		"allDone": 99
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
export default capereurope;
