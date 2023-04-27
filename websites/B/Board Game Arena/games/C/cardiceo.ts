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

const cardiceo: GamePresence = {
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
				case "roll":
					/*
					{
	"name": "roll",
	"updateGameProgression": true,
	"description": "${actplayer} must roll",
	"descriptionmyturn": "${you} must roll",
	"type": "activeplayer",
	"possibleactions": [
		"roll"
	],
	"transitions": {
		"play": 3,
		"pass": 6
	}
}
					*/
					break;
				case "play":
					/*
					{
	"name": "play",
	"description": "${actplayer} must play or pass",
	"descriptionmyturn": "${you} must play or pass",
	"type": "activeplayer",
	"possibleactions": [
		"play",
		"pass",
		"clear"
	],
	"transitions": {
		"gameEnd": 99,
		"pass": 6
	}
}
					*/
					break;
				case "pass":
					/*
					{
	"name": "pass",
	"description": "${actplayer} must pass",
	"descriptionmyturn": "${you} must pass",
	"type": "activeplayer",
	"possibleactions": [
		"pass"
	],
	"transitions": {
		"gameEnd": 99,
		"pass": 6
	}
}
					*/
					break;
				case "keep":
					/*
					{
	"name": "keep",
	"updateGameProgression": true,
	"description": "${actplayer} must roll all the dice or keep all the dice",
	"descriptionmyturn": "${you} must roll all the dice or keep all the dice",
	"type": "activeplayer",
	"possibleactions": [
		"roll",
		"keep"
	],
	"transitions": {
		"roll": 3,
		"play": 3
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
	"action": "stNext",
	"transitions": {
		"keep": 5,
		"roll": 2,
		"gameEnd": 99
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
export default cardiceo;
