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

const crimezoom: GamePresence = {
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
				case "playerTurn":
					/*
					{
	"name": "playerTurn",
	"description": "${actplayer} may perform an investigation",
	"descriptionmyturn": "${you} may perform an investigation",
	"type": "multipleactiveplayer",
	"action": "st_MultiPlayerInit",
	"args": "argNumRemaining",
	"possibleactions": [
		"togglePin",
		"clearPin",
		"investigate",
		"followLead",
		"startQuestionnaire"
	],
	"transitions": {
		"loopback": 2,
		"startQuestionnaire": 3
	}
}
					*/
					break;
				case "questionnaire":
					/*
					{
	"name": "questionnaire",
	"description": "${actplayer} must answer the questionnaire",
	"descriptionmyturn": "${you} must answer the questionnaire",
	"type": "multipleactiveplayer",
	"args": "argNumRemaining",
	"possibleactions": [
		"togglePin",
		"clearPin",
		"submit",
		"assignCardToQuestion",
		"assignValueToQuestion"
	],
	"transitions": {
		"loopback": 3,
		"submit": 4
	}
}
					*/
					break;
				case "epilogue":
					/*
					{
	"name": "epilogue",
	"description": "${actplayer} must read the epilogue",
	"descriptionmyturn": "${you} must read the epilogue",
	"type": "multipleactiveplayer",
	"args": "argEpilogue",
	"possibleactions": [
		"end"
	],
	"transitions": {
		"end": 99
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
export default crimezoom;
