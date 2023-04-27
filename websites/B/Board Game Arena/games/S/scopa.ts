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

const scopa: GamePresence = {
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
		"": 20
	}
}
					*/
					break;
				case "dealStart":
					/*
					{
	"name": "dealStart",
	"description": "",
	"type": "game",
	"action": "stDealStart",
	"updateGameProgression": true,
	"transitions": {
		"": 30
	}
}
					*/
					break;
				case "handStart":
					/*
					{
	"name": "handStart",
	"description": "",
	"type": "game",
	"action": "stHandStart",
	"updateGameProgression": true,
	"transitions": {
		"playerTurn": 40,
		"cirullaDeclare": 35
	}
}
					*/
					break;
				case "cirullaDeclare":
					/*
					{
	"name": "cirullaDeclare",
	"description": "${actplayer} must play a card",
	"descriptionmyturn": "${you} may declare a Cirulla combination or Pass",
	"type": "activeplayer",
	"action": "stCirullaDeclare",
	"args": "argCirullaDeclare",
	"possibleactions": [
		"cirullaDeclare",
		"cirullaPass"
	],
	"transitions": {
		"": 40
	}
}
					*/
					break;
				case "playerTurn":
					/*
					{
	"name": "playerTurn",
	"description": "${actplayer} must play a card",
	"descriptionmyturn": "${you} must play a card",
	"type": "activeplayer",
	"args": "argPlayerTurn",
	"possibleactions": [
		"playCard"
	],
	"transitions": {
		"playCard": 50
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
		"playerTurn": 40,
		"autoPlayerTurn": 55,
		"handEnd": 60,
		"cirullaDeclare": 35
	}
}
					*/
					break;
				case "autoPlayer":
					/*
					{
	"name": "autoPlayer",
	"description": "",
	"type": "game",
	"action": "stAutoPlayer",
	"updateGameProgression": true,
	"transitions": {
		"playerTurn": 40,
		"playCard": 50
	}
}
					*/
					break;
				case "handEnd":
					/*
					{
	"name": "handEnd",
	"description": "",
	"type": "game",
	"action": "stHandEnd",
	"updateGameProgression": true,
	"transitions": {
		"handStart": 30,
		"deckEnd": 70
	}
}
					*/
					break;
				case "deckEnd":
					/*
					{
	"name": "deckEnd",
	"description": "",
	"type": "game",
	"action": "stDeckEnd",
	"transitions": {
		"dealStart": 20,
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
export default scopa;
