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

const zefiria: GamePresence = {
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
				case "wheretogo":
					/*
					{
	"name": "wheretogo",
	"description": "",
	"descriptionmyturn": "",
	"type": "game",
	"action": "stStartTheGame",
	"transitions": {
		"3": 3,
		"4": 4,
		"5": 5,
		"6": 6,
		"11": 11,
		"12": 12
	}
}
					*/
					break;
				case "startMeeting":
					/*
					{
	"name": "startMeeting",
	"description": "All Players have time to talk and planning the game",
	"descriptionmyturn": "All Players have time to talk and planning the game",
	"type": "game",
	"action": "stStartMeeting",
	"transitions": {
		"": 10
	}
}
					*/
					break;
				case "selTheSpirit":
					/*
					{
	"name": "selTheSpirit",
	"description": "${actplayer} must chose the Spirit",
	"descriptionmyturn": "${you} must chose the Spirit",
	"type": "game",
	"action": "stStartSpirits",
	"transitions": {
		"": 8
	}
}
					*/
					break;
				case "placeSpirit":
					/*
					{
	"name": "placeSpirit",
	"description": "${actplayer} must place their Spirit on a free corner",
	"descriptionmyturn": "${you} must place your Spirit on a free corner",
	"type": "activeplayer",
	"possibleactions": [
		"spiritPlaced",
		"spiritPlacedSP"
	],
	"transitions": {
		"": 11
	}
}
					*/
					break;
				case "selThePlayer":
					/*
					{
	"name": "selThePlayer",
	"description": "All players must chose the First Player",
	"descriptionmyturn": "All players must chose the First Player",
	"type": "game",
	"action": "stStartSelPlayer",
	"transitions": {
		"": 7
	}
}
					*/
					break;
				case "selPlayerTurn":
					/*
					{
	"name": "selPlayerTurn",
	"description": "All players must chose the First Player",
	"descriptionmyturn": "All players must chose the First Player",
	"type": "multipleactiveplayer",
	"possibleactions": [
		"votePlayer"
	],
	"transitions": {
		"": 11
	}
}
					*/
					break;
				case "spiritsTurn":
					/*
					{
	"name": "spiritsTurn",
	"description": "${actplayer} must chose the Spirit",
	"descriptionmyturn": "${you} must chose the Spirit",
	"type": "activeplayer",
	"possibleactions": [
		"spiritDone"
	],
	"transitions": {
		"": 9
	}
}
					*/
					break;
				case "selTheNextSpirit":
					/*
					{
	"name": "selTheNextSpirit",
	"description": "${actplayer} must chose the Spirit",
	"descriptionmyturn": "${you} must chose the Spirit",
	"type": "game",
	"action": "stNextSpirit",
	"transitions": {
		"SSnext": 8,
		"SSstartPlay": 6,
		"SSSingleMode": 11
	}
}
					*/
					break;
				case "meetingTurn":
					/*
					{
	"name": "meetingTurn",
	"description": "All Players have time to talk and planning the game",
	"descriptionmyturn": "All Players have time to talk and planning the game",
	"type": "multipleactiveplayer",
	"possibleactions": [
		"timerend",
		"moretime"
	],
	"transitions": {
		"": 2
	}
}
					*/
					break;
				case "placeNextSpirit":
					/*
					{
	"name": "placeNextSpirit",
	"description": "${actplayer} must place their Spirit on a corner",
	"descriptionmyturn": "${you} must place your Spirit on a corner",
	"type": "game",
	"action": "stPlaceNextSpirit",
	"transitions": {
		"PSnext": 5,
		"PSstartPlay": 12,
		"HSSpirit": 14
	}
}
					*/
					break;
				case "playerTurn":
					/*
					{
	"name": "playerTurn",
	"description": "${actplayer} must chose Spirit and Isle movements",
	"descriptionmyturn": "${you} must chose Spirit and Isle movements",
	"type": "activeplayer",
	"possibleactions": [
		"spiritMoved",
		"isleMoved",
		"meetingReq",
		"passTurn",
		"removeGems",
		"spendGem",
		"askForMeeting",
		"gameover",
		"restartTurn"
	],
	"transitions": {
		"nextpl": 13,
		"meeting": 3,
		"gameover": 99,
		"doUndo": 16
	}
}
					*/
					break;
				case "nextPlayerTurn":
					/*
					{
	"name": "nextPlayerTurn",
	"description": "",
	"descriptionmyturn": "",
	"type": "game",
	"action": "stNextPlayerTurn",
	"transitions": {
		"": 15
	}
}
					*/
					break;
				case "hideSpirit":
					/*
					{
	"name": "hideSpirit",
	"description": "${actplayer} must chose Spirit and Isle movements",
	"descriptionmyturn": "${you} must chose Spirit and Isle movements",
	"type": "activeplayer",
	"possibleactions": [
		"hideAndSel"
	],
	"transitions": {
		"PLnext": 12
	}
}
					*/
					break;
				case "updProg":
					/*
					{
	"name": "updProg",
	"description": "",
	"descriptionmyturn": "",
	"type": "game",
	"updateGameProgression": "true",
	"action": "stGoNext",
	"transitions": {
		"12": 12,
		"14": 14
	}
}
					*/
					break;
				case "undostate":
					/*
					{
	"name": "undostate",
	"description": "",
	"descriptionmyturn": "",
	"type": "game",
	"action": "stDoUndo",
	"transitions": {
		"": 12
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
export default zefiria;
