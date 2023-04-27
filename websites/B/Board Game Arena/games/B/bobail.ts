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

const bobail: GamePresence = {
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
		"": 30
	}
}
					*/
					break;
				case "checkBobail":
					/*
					{
	"name": "checkBobail",
	"type": "game",
	"action": "stCheckBobail",
	"transitions": {
		"bobailFree": 20,
		"bobailBlocked": 99
	}
}
					*/
					break;
				case "playBobail":
					/*
					{
	"name": "playBobail",
	"description": "${actplayer} must play the Bobail",
	"descriptionmyturn": "${you} must play the Bobail",
	"type": "activeplayer",
	"args": "argPlayBobail",
	"possibleactions": [
		"playBobail"
	],
	"transitions": {
		"bobailPlayed": 30,
		"bobailCaptured": 99,
		"zombiePass": 40
	}
}
					*/
					break;
				case "playToken":
					/*
					{
	"name": "playToken",
	"description": "${actplayer} must play a token",
	"descriptionmyturn": "${you} must play a token",
	"type": "activeplayer",
	"args": "argPlayToken",
	"possibleactions": [
		"playToken"
	],
	"transitions": {
		"tokenPlayed": 40,
		"zombiePass": 40
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
	"transitions": {
		"nextPlayer": 10
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
export default bobail;
