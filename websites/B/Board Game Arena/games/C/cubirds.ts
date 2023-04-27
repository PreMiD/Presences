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

const cubirds: GamePresence = {
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
				case "playerTurn":
					/*
					{
	"name": "playerTurn",
	"description": "${actplayer} must lay birds",
	"descriptionmyturn": "${you} must lay birds",
	"type": "activeplayer",
	"action": "stPlayerTurn",
	"possibleactions": [
		"play"
	],
	"transitions": {
		"flockOption": 4,
		"drawOption": 3,
		"noCardsLeft": 98,
		"zombiePass": 5
	}
}
					*/
					break;
				case "playerDrawChooser":
					/*
					{
	"name": "playerDrawChooser",
	"description": "${actplayer} may draw two cards",
	"descriptionmyturn": "${you} may draw two cards",
	"type": "activeplayer",
	"possibleactions": [
		"draw",
		"pass"
	],
	"transitions": {
		"flockOption": 4,
		"noCardsLeft": 98,
		"zombiePass": 5
	}
}
					*/
					break;
				case "playerFlockChooser":
					/*
					{
	"name": "playerFlockChooser",
	"description": "${actplayer} may complete a flock",
	"descriptionmyturn": "${you} may complete a flock",
	"type": "activeplayer",
	"action": "stPlayerFlockChooser",
	"possibleactions": [
		"completeFlock",
		"pass"
	],
	"transitions": {
		"endGame": 99,
		"nextPlayer": 5,
		"zombiePass": 5
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
		"endGame": 99,
		"nextPlayer": 2,
		"newHand": 6
	},
	"updateGameProgression": true
}
					*/
					break;
				case "newHand":
					/*
					{
	"name": "newHand",
	"description": "",
	"type": "game",
	"action": "stNewHand",
	"transitions": {
		"playAgain": 2,
		"noCardsLeft": 98
	}
}
					*/
					break;
				case "noCardsLeft":
					/*
					{
	"name": "noCardsLeft",
	"description": "Not enough cards left to deal a new round. The game ends!",
	"type": "game",
	"action": "stNoCardLeft",
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
export default cubirds;
