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

const lostexplorers: GamePresence = {
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
				case "playerSetup":
					/*
					{
	"name": "playerSetup",
	"description": "${actplayer} must flip one starting token, mission side up",
	"descriptionmyturn": "${you} must flip one starting token, mission side up",
	"type": "activeplayer",
	"possibleactions": [
		"flipStartingToken"
	],
	"args": "argsPlayerSetup",
	"transitions": {
		"nextPlayer": 11
	}
}
					*/
					break;
				case "nextPlayerSetup":
					/*
					{
	"name": "nextPlayerSetup",
	"description": "",
	"type": "manager",
	"action": "stNextPlayerSetup",
	"transitions": {
		"continue": 10,
		"play": 30
	}
}
					*/
					break;
				case "retrieveExplorers":
					/*
					{
	"name": "retrieveExplorers",
	"description": "${actplayer} can retrieve Expedition Members from the World Map",
	"descriptionmyturn": "${you} can retrieve Expedition Members from the World Map",
	"type": "activeplayer",
	"possibleactions": [
		"retrieveExplorers"
	],
	"args": "argsretrieveExplorers",
	"transitions": {
		"next": 30
	}
}
					*/
					break;
				case "playExplorers":
					/*
					{
	"name": "playExplorers",
	"description": "Phase 1: ${actplayer} can use Expedition Members to gain token or move on the World Map",
	"descriptionmyturn": "Phase 1: ${you} can use Expedition Members to gain token or move on the World Map",
	"type": "activeplayer",
	"possibleactions": [
		"getToken",
		"moveExplorer",
		"pass",
		"undo"
	],
	"args": "argsPlayExplorers",
	"transitions": {
		"complete": 40,
		"next": 51,
		"continue": 30
	}
}
					*/
					break;
				case "completeMission":
					/*
					{
	"name": "completeMission",
	"description": "Phase 2: ${actplayer} can complete Missions to progress on the Discovery tracks",
	"descriptionmyturn": "Phase 2: ${you} can complete Missions to progress on the Discovery tracks",
	"type": "activeplayer",
	"possibleactions": [
		"completeMission",
		"pass",
		"undo"
	],
	"args": "argsCompleteMission",
	"updateGameProgression": true,
	"transitions": {
		"next": 51,
		"continue": 40
	}
}
					*/
					break;
				case "endTurn":
					/*
					{
	"name": "endTurn",
	"description": "",
	"type": "manager",
	"action": "stTurnEnds",
	"updateGameProgression": true,
	"transitions": {
		"victory": 91,
		"playerRetrieve": 20,
		"playerMove": 30
	}
}
					*/
					break;
				case "showVictory":
					/*
					{
	"name": "showVictory",
	"description": "",
	"type": "manager",
	"action": "stShowVictory",
	"args": "argsShowVictory",
	"transitions": {
		"next": 99
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
export default lostexplorers;
