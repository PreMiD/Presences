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

const thatslife: GamePresence = {
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
				case "playerRoll":
					/*
					{
	"name": "playerRoll",
	"description": "${actplayer} must roll the die",
	"descriptionmyturn": "${you} must roll the die",
	"type": "activeplayer",
	"action": "stPlayerRoll",
	"possibleactions": [
		"roll"
	],
	"transitions": {
		"play": 3,
		"skip": 6
	}
}
					*/
					break;
				case "playerMove":
					/*
					{
	"name": "playerMove",
	"description": "${actplayer} must choose a piece to move",
	"descriptionmyturn": "${you} must choose a piece to move",
	"type": "activeplayer",
	"args": "argPlayerMove",
	"possibleactions": [
		"chooseToken"
	],
	"transitions": {
		"noAction": 6,
		"steal": 4,
		"gift": 5
	}
}
					*/
					break;
				case "playerSteal":
					/*
					{
	"name": "playerSteal",
	"description": "${actplayer} must choose a tile to steal",
	"descriptionmyturn": "${you} must choose a tile to steal",
	"type": "activeplayer",
	"action": "stSteal",
	"possibleactions": [
		"steal"
	],
	"transitions": {
		"": 6
	}
}
					*/
					break;
				case "gift":
					/*
					{
	"name": "gift",
	"description": "It´s time to make a gift",
	"type": "game",
	"action": "stGift",
	"transitions": {
		"": 6
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
	"updateGameProgression": true,
	"action": "stNextPlayer",
	"transitions": {
		"continue": 2,
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
export default thatslife;
