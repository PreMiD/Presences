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

const trektwelve: GamePresence = {
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
				case "nextTurn":
					/*
					{
	"name": "nextTurn",
	"description": "",
	"type": "game",
	"action": "stNextTurn",
	"updateGameProgression": true,
	"transitions": {
		"next": 3,
		"end": 10,
		"rope": 9,
		"assist": 7
	}
}
					*/
					break;
				case "playerTurn":
					/*
					{
	"name": "playerTurn",
	"args": "argPlayerTurn",
	"type": "multipleactiveplayer",
	"possibleactions": [
		"actPlay",
		"actChooseCard",
		"actCorde"
	],
	"description": "Every players must choose their result",
	"descriptionmyturn": "${you} must choose your result",
	"transitions": {
		"next": 2,
		"max": 11
	}
}
					*/
					break;
				case "ready":
					/*
					{
	"name": "ready",
	"type": "multipleactiveplayer",
	"possibleactions": [
		"actReady"
	],
	"description": "Each player can look at this ascent before going to next one",
	"descriptionmyturn": "${you} can look at this ascent before going to next one",
	"transitions": {
		"next": 5
	}
}
					*/
					break;
				case "changeAscent":
					/*
					{
	"name": "changeAscent",
	"description": "",
	"type": "game",
	"action": "stChangeAscent",
	"transitions": {
		"next": 2
	}
}
					*/
					break;
				case "endAscent":
					/*
					{
	"name": "endAscent",
	"description": "",
	"type": "game",
	"action": "stEndAscent",
	"transitions": {
		"next": 4,
		"assist": 8,
		"end": 99
	}
}
					*/
					break;
				case "assistance":
					/*
					{
	"name": "assistance",
	"type": "activeplayer",
	"args": "argAssist",
	"possibleactions": [
		"actChooseCard",
		"actPass"
	],
	"description": "${actplayer} must choose an assist",
	"descriptionmyturn": "${you} must choose your assist",
	"transitions": {
		"next": 2,
		"zombiePass": 2
	}
}
					*/
					break;
				case "endAssist":
					/*
					{
	"name": "endAssist",
	"type": "activeplayer",
	"possibleactions": [
		"actChooseCard",
		"actPass"
	],
	"description": "${actplayer} may discard an assist card to gain +3",
	"descriptionmyturn": "${you} may discard an assist card to gain +3",
	"transitions": {
		"next": 6,
		"zombiePass": 6
	}
}
					*/
					break;
				case "lastRope":
					/*
					{
	"name": "lastRope",
	"type": "multipleactiveplayer",
	"args": "argLastRope",
	"possibleactions": [
		"actCorde",
		"actPass"
	],
	"description": "Each player can play a rope, if available, before ascent ends",
	"descriptionmyturn": "${you} can play a rope before ascent ends",
	"transitions": {
		"next": 10
	}
}
					*/
					break;
				case "displayScore":
					/*
					{
	"name": "displayScore",
	"description": "",
	"type": "game",
	"action": "stdisplayScore",
	"transitions": {
		"end": 6
	}
}
					*/
					break;
				case "linkMax":
					/*
					{
	"name": "linkMax",
	"type": "activeplayer",
	"args": "argLinkMax",
	"possibleactions": [
		"actLink"
	],
	"description": "${actplayer} must choose between eligible Lines for your guide",
	"descriptionmyturn": "${you} must choose between eligible Lines for your guide",
	"transitions": {
		"next": 2,
		"max": 11,
		"zombiePass": 2
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
export default trektwelve;
