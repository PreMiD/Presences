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

const lineae: GamePresence = {
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
	"type": "game",
	"action": "stGameSetup",
	"transitions": {
		"": 11
	}
}
					*/
					break;
				case "chooseLocations":
					/*
					{
	"name": "chooseLocations",
	"description": "Wait for your opponents to choose their starting locations",
	"descriptionmyturn": "${you} must choose a starting location",
	"type": "multipleactiveplayer",
	"action": "stChooseLocation",
	"possibleactions": [
		"playerChoseLocation"
	],
	"transitions": {
		"done": 21
	}
}
					*/
					break;
				case "roundStart":
					/*
					{
	"name": "roundStart",
	"description": "",
	"type": "game",
	"action": "stRoundStart",
	"transitions": {
		"": 31
	}
}
					*/
					break;
				case "roundEnd":
					/*
					{
	"name": "roundEnd",
	"description": "",
	"type": "game",
	"action": "stRoundEnd",
	"updateGameProgression": true,
	"transitions": {
		"next": 21,
		"done": 91
	}
}
					*/
					break;
				case "sunlightPhaseStart":
					/*
					{
	"name": "sunlightPhaseStart",
	"description": "Wait for your opponents to make a decision",
	"descriptionmyturn": "${you} may burn a hydrocarbon cube for 6 electricity",
	"type": "multipleactiveplayer",
	"action": "stSunlightPhaseStart",
	"possibleactions": [
		"diesel",
		"endTurn"
	],
	"transitions": {
		"done": 39
	}
}
					*/
					break;
				case "sunlightPhaseEnd":
					/*
					{
	"name": "sunlightPhaseEnd",
	"description": "",
	"type": "game",
	"action": "stSunlightPhaseEnd",
	"transitions": {
		"": 41
	}
}
					*/
					break;
				case "playerTurn":
					/*
					{
	"name": "playerTurn",
	"description": "${actplayer} must place workers or pass",
	"descriptionmyturn": "${you} must place workers or",
	"type": "activeplayer",
	"possibleactions": [
		"placeWorker",
		"subMovement",
		"useCard",
		"vesselMovement",
		"pass"
	],
	"transitions": {
		"done": 51,
		"repeat": 41,
		"goAgain": 42,
		"tolls": 45
	}
}
					*/
					break;
				case "playerNextTurn":
					/*
					{
	"name": "playerNextTurn",
	"description": "${actplayer} may place more workers",
	"descriptionmyturn": "${you} may place more workers or",
	"type": "activeplayer",
	"possibleactions": [
		"placeWorker",
		"subMovement",
		"useCard",
		"vesselMovement",
		"endTurn"
	],
	"transitions": {
		"done": 51,
		"repeat": 42,
		"goAgain": 42,
		"tolls": 45
	}
}
					*/
					break;
				case "payTollsStart":
					/*
					{
	"name": "payTollsStart",
	"description": "Wait for your opponents to make a decision",
	"descriptionmyturn": "${you} may move your surface vessel by paying $1 to ${lockPlayerName} before they ${lockVerb} lock ${lock}.",
	"type": "multipleactiveplayer",
	"action": "stPayTollsStart",
	"args": "argPayTollsStart",
	"possibleactions": [
		"vesselMovement",
		"endTurn"
	],
	"transitions": {
		"done": 46
	}
}
					*/
					break;
				case "payTollsEnd":
					/*
					{
	"name": "payTollsEnd",
	"description": "",
	"type": "game",
	"action": "stPayTollsEnd",
	"transitions": {
		"done": 51,
		"goAgain": 42
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
		"next": 41,
		"done": 29
	}
}
					*/
					break;
				case "finalScoring":
					/*
					{
	"name": "finalScoring",
	"description": "",
	"type": "game",
	"action": "stFinalScoring",
	"transitions": {
		"done": 99
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
export default lineae;
