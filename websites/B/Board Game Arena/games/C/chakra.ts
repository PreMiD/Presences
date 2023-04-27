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

const chakra: GamePresence = {
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
				case "take":
					/*
					{
	"name": "take",
	"description": "${actplayer} must receive energy {receive}, channel energy {channel} or meditate {meditate}",
	"descriptionmyturn": "${you} must receive energy {receive}, channel energy {channel} or meditate {meditate}",
	"type": "activeplayer",
	"args": "argTake",
	"possibleactions": [
		"actTake",
		"actChannel",
		"actColor"
	],
	"transitions": {
		"next": 4,
		"pickColor": 5,
		"finish": 4,
		"channel": 3,
		"zombiePass": 4
	}
}
					*/
					break;
				case "channel":
					/*
					{
	"name": "channel",
	"description": "${actplayer} must channel its energies",
	"descriptionmyturn": "${you} must channel your energies",
	"type": "activeplayer",
	"args": "argChannel",
	"possibleactions": [
		"actMove",
		"actCancel",
		"actUndo"
	],
	"transitions": {
		"channel": 3,
		"take": 2,
		"next": 4,
		"pickColor": 5,
		"zombiePass": 4
	}
}
					*/
					break;
				case "checkFinish":
					/*
					{
	"name": "checkFinish",
	"type": "game",
	"action": "stCheckFinish",
	"updateGameProgression": true,
	"transitions": {
		"finish": 99,
		"take": 2
	}
}
					*/
					break;
				case "pickColor":
					/*
					{
	"name": "pickColor",
	"description": "${actplayer} must choose its new energy color",
	"descriptionmyturn": "${you} must choose your new energy color by clicking on meditation token",
	"type": "activeplayer",
	"args": "argPickColor",
	"possibleactions": [
		"actColor",
		"actCancel"
	],
	"transitions": {
		"take": 2,
		"finish": 4,
		"zombiePass": 4
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
export default chakra;
