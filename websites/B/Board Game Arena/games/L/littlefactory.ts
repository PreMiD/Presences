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

const littlefactory: GamePresence = {
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
				case "StartTurn":
					/*
					{
	"name": "StartTurn",
	"description": "${actplayer} must activate buildings or pass.",
	"descriptionmyturn": "${you} must activate buildings or pass.",
	"action": "stStartTurn",
	"type": "activeplayer",
	"args": "argStartTurn",
	"updateGameProgression": true,
	"possibleactions": [
		"Activate",
		"Pass"
	],
	"transitions": {
		"NextPhase": 3,
		"StayHere": 2
	}
}
					*/
					break;
				case "PlayerAction":
					/*
					{
	"name": "PlayerAction",
	"description": "${actplayer} must produce or trade with his resources.",
	"descriptionmyturn": "${you} must produce or trade with your resources.",
	"type": "activeplayer",
	"action": "stPlayerAction",
	"args": "argPlayerAction",
	"updateGameProgression": true,
	"possibleactions": [
		"GoTrade",
		"GoProduce",
		"GoBack",
		"Trade"
	],
	"transitions": {
		"PlayerAction": 3,
		"NextPhase": 4
	}
}
					*/
					break;
				case "EndTurn":
					/*
					{
	"name": "EndTurn",
	"description": "${actplayer} must activate buildings or pass.",
	"descriptionmyturn": "${you} must activate buildings or pass.",
	"action": "stEndTurn",
	"type": "activeplayer",
	"args": "argEndTurn",
	"updateGameProgression": true,
	"possibleactions": [
		"Activate",
		"Pass"
	],
	"transitions": {
		"NextPhase": 5,
		"StayHere": 4
	}
}
					*/
					break;
				case "NextPlayer":
					/*
					{
	"name": "NextPlayer",
	"description": "Changing player...",
	"type": "game",
	"action": "stNextPlayer",
	"updateGameProgression": true,
	"transitions": {
		"NextPlayer": 2,
		"GameEnd": 99
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
export default littlefactory;
