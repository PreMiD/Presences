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

const mycity: GamePresence = {
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
				case "preInitGame":
					/*
					{
	"name": "preInitGame",
	"type": "manager",
	"action": "stPreInitGame",
	"transitions": {
		"initGame": 3,
		"askReset": 6
	}
}
					*/
					break;
				case "initGame":
					/*
					{
	"name": "initGame",
	"type": "manager",
	"action": "stInitGame",
	"transitions": {
		"placeWell": 4,
		"startGame": 5
	}
}
					*/
					break;
				case "placeWell":
					/*
					{
	"name": "placeWell",
	"type": "multipleactiveplayer",
	"description": "Other players must place the well",
	"descriptionmyturn": "${you} must place the well",
	"action": "stPlaceWell",
	"possibleactions": [
		"placeWell"
	],
	"transitions": {
		"afterWell": 5
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
	"updateGameProgression": true,
	"transitions": {
		"startTurn": 10,
		"gameDone": 30
	}
}
					*/
					break;
				case "confirmReset":
					/*
					{
	"name": "confirmReset",
	"type": "multipleactiveplayer",
	"description": "Other players must accept to restart the campaign",
	"descriptionmyturn": "${you} must accept or not to restart the campaign",
	"action": "stConfirmReset",
	"possibleactions": [
		"confirmReset"
	],
	"transitions": {
		"cancelReset": 3,
		"doReset": 7
	}
}
					*/
					break;
				case "doReset":
					/*
					{
	"name": "doReset",
	"type": "manager",
	"action": "stDoReset",
	"transitions": {
		"initGame": 3
	}
}
					*/
					break;
				case "playTile":
					/*
					{
	"name": "playTile",
	"type": "multipleactiveplayer",
	"description": "Other players must play a building",
	"descriptionmyturn": "${you} must play a building",
	"action": "stPlayTile",
	"possibleactions": [
		"playTile",
		"passTile",
		"passEpisode",
		"actionCancel"
	],
	"transitions": {
		"tileDone": 20
	},
	"args": "argsPlayTile"
}
					*/
					break;
				case "showResult":
					/*
					{
	"name": "showResult",
	"type": "manager",
	"action": "stShowResult",
	"transitions": {
		"nextCard": 5,
		"placeRail": 25,
		"gameDone": 30
	}
}
					*/
					break;
				case "placeRail":
					/*
					{
	"name": "placeRail",
	"type": "multipleactiveplayer",
	"description": "Other players are applying tracks",
	"descriptionmyturn": "${you} must apply track",
	"action": "stPlaceRail",
	"possibleactions": [
		"placeRail"
	],
	"transitions": {
		"anotherRail": 25,
		"railsDone": 26
	},
	"args": "argsPlaceRail"
}
					*/
					break;
				case "railsDone":
					/*
					{
	"name": "railsDone",
	"type": "manager",
	"action": "stRailsDone",
	"transitions": {
		"nextCard": 5,
		"placeInGame": 27
	}
}
					*/
					break;
				case "placeInGame":
					/*
					{
	"name": "placeInGame",
	"type": "multipleactiveplayer",
	"description": "Other players are applying stickers",
	"descriptionmyturn": "${you} must apply sticker(s)",
	"action": "stPlaceInGame",
	"args": "argsSetRewards",
	"possibleactions": [
		"applyStickers"
	],
	"transitions": {
		"nextCard": 5
	}
}
					*/
					break;
				case "setRewards":
					/*
					{
	"name": "setRewards",
	"type": "multipleactiveplayer",
	"description": "Other players are applying stickers",
	"descriptionmyturn": "${you} must apply sticker(s)",
	"action": "stSetRewards",
	"args": "argsSetRewards",
	"updateGameProgression": true,
	"possibleactions": [
		"applyStickers",
		"placeRail"
	],
	"transitions": {
		"endEpisode": 40,
		"anotherRail": 30
	}
}
					*/
					break;
				case "beforeEndEpisode":
					/*
					{
	"name": "beforeEndEpisode",
	"type": "manager",
	"action": "stBeforeEndEpisode",
	"transitions": {
		"goSave": 50,
		"anotherReward": 30
	}
}
					*/
					break;
				case "saveEpisode":
					/*
					{
	"name": "saveEpisode",
	"type": "manager",
	"action": "stSaveEpisode",
	"updateGameProgression": true,
	"transitions": {
		"goOutro": 90
	}
}
					*/
					break;
				case "outro":
					/*
					{
	"name": "outro",
	"type": "multipleactiveplayer",
	"description": "End of episode",
	"descriptionmyturn": "End of episode",
	"action": "stOutro",
	"possibleactions": [
		"leaveGame",
		"playNextEpisode"
	],
	"transitions": {
		"nextEpisode": 91,
		"final": 95,
		"endGame": 99
	}
}
					*/
					break;
				case "nextEpisode":
					/*
					{
	"name": "nextEpisode",
	"type": "manager",
	"action": "stNextEpisode",
	"transitions": {
		"restartGame": 3
	}
}
					*/
					break;
				case "final":
					/*
					{
	"name": "final",
	"type": "manager",
	"action": "stFinal",
	"transitions": {
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
export default mycity;
