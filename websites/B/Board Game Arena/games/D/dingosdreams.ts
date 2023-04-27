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

const dingosdreams: GamePresence = {
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
				case "gameStart":
					/*
					{
	"name": "gameStart",
	"type": "game",
	"action": "stGameStart",
	"transitions": {
		"": 20
	}
}
					*/
					break;
				case "startRound":
					/*
					{
	"name": "startRound",
	"type": "game",
	"action": "stStartRound",
	"updateGameProgression": true,
	"transitions": {
		"": 30
	}
}
					*/
					break;
				case "setupDream":
					/*
					{
	"name": "setupDream",
	"type": "multipleactiveplayer",
	"description": "Other player(s) may start the new dream or agree to skip it",
	"descriptionmyturn": "${you} may start the new dream or propose to skip it",
	"possibleactions": [
		"skipDream",
		"startDream"
	],
	"action": "stMultiPlayerInitDreamSetup",
	"transitions": {
		"shouldSetupDream": 30,
		"shouldStartDream": 31
	}
}
					*/
					break;
				case "startDream":
					/*
					{
	"name": "startDream",
	"type": "game",
	"action": "stStartDream",
	"transitions": {
		"": 40
	}
}
					*/
					break;
				case "walkabout":
					/*
					{
	"name": "walkabout",
	"type": "game",
	"action": "stWalkabout",
	"updateGameProgression": true,
	"transitions": {
		"shouldEvaluateWalkabout": 41
	}
}
					*/
					break;
				case "evaluateWalkabout":
					/*
					{
	"name": "evaluateWalkabout",
	"type": "game",
	"action": "stEvaluateWalkabout",
	"transitions": {
		"shouldDream": 50,
		"shouldSummarizeDream": 60
	}
}
					*/
					break;
				case "dream":
					/*
					{
	"name": "dream",
	"type": "multipleactiveplayer",
	"updateGameProgression": true,
	"description": "Other player(s) must slide their extra tile into the dreamscape",
	"descriptionmyturn": "${you} must slide the extra tile into the dreamscape",
	"possibleactions": [
		"dream"
	],
	"action": "stMultiPlayerInitDream",
	"transitions": {
		"shouldEvaluateDream": 51
	}
}
					*/
					break;
				case "evaluateDream":
					/*
					{
	"name": "evaluateDream",
	"type": "game",
	"action": "stEvaluateDream",
	"transitions": {
		"shouldWalkabout": 40,
		"shouldSummarizeDream": 60
	}
}
					*/
					break;
				case "summarizeDream":
					/*
					{
	"name": "summarizeDream",
	"type": "multipleactiveplayer",
	"updateGameProgression": true,
	"description": "Other player(s) must end the dream",
	"descriptionmyturn": "${you} must end the dream",
	"possibleactions": [
		"summarizeDream",
		"endDream"
	],
	"action": "stMultiPlayerInitDreamSummary",
	"transitions": {
		"shouldEndRound": 70
	}
}
					*/
					break;
				case "endRound":
					/*
					{
	"name": "endRound",
	"type": "game",
	"action": "stEndRound",
	"updateGameProgression": true,
	"transitions": {
		"shouldStartRound": 20,
		"shouldEndGame": 90
	}
}
					*/
					break;
				case "endGame":
					/*
					{
	"name": "endGame",
	"type": "game",
	"action": "stEndGame",
	"updateGameProgression": true,
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
export default dingosdreams;
