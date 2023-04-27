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

const dicehospitaler: GamePresence = {
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
		"": 3
	}
}
					*/
					break;
				case "throwDice":
					/*
					{
	"name": "throwDice",
	"description": "A new turn begins",
	"type": "game",
	"action": "stThrowDice",
	"transitions": {
		"normal": 4,
		"soloGame": 6
	}
}
					*/
					break;
				case "playerTurn":
					/*
					{
	"name": "playerTurn",
	"description": "${actplayer} must choose a die",
	"descriptionmyturn": "${you} must choose a die",
	"type": "activeplayer",
	"possibleactions": [
		"play",
		"pass"
	],
	"transitions": {
		"play": 5,
		"pass": 5,
		"soloGame": 6
	}
}
					*/
					break;
				case "otherPlayersTurn":
					/*
					{
	"name": "otherPlayersTurn",
	"description": "Other players must choose a die",
	"descriptionmyturn": "${you} must choose a die",
	"type": "multipleactiveplayer",
	"action": "stOtherPlayersTurn",
	"possibleactions": [
		"play",
		"pass"
	],
	"transitions": {
		"allPlayed": 7
	}
}
					*/
					break;
				case "otherPlayersTurn":
					/*
					{
	"name": "otherPlayersTurn",
	"description": "Other players must choose a die",
	"descriptionmyturn": "${you} must choose a die",
	"type": "game",
	"transitions": {
		"play1": 5,
		"play2": 7
	}
}
					*/
					break;
				case "endTurn":
					/*
					{
	"name": "endTurn",
	"description": "",
	"type": "game",
	"action": "stEndTurn",
	"updateGameProgression": true,
	"transitions": {
		"endGame": 99,
		"newTurn": 3
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
export default dicehospitaler;
