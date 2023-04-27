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

const escapefromthehiddencastle: GamePresence = {
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
				case "setupRoundPlayerTurn":
					/*
					{
	"name": "setupRoundPlayerTurn",
	"description": "${actplayer} must choose a space on the gallery for a guest",
	"descriptionmyturn": "${you} must choose a space on the gallery for a guest",
	"type": "activeplayer",
	"possibleactions": [
		"choosesquaresetup"
	],
	"transitions": {
		"nextplayer": 3
	}
}
					*/
					break;
				case "setupRoundNextPlayer":
					/*
					{
	"name": "setupRoundNextPlayer",
	"type": "game",
	"action": "stSetupRoundNextPlayer",
	"transitions": {
		"setup": 2,
		"startgame": 4
	}
}
					*/
					break;
				case "playerTurnRoll":
					/*
					{
	"name": "playerTurnRoll",
	"description": "${actplayer} must roll the die",
	"descriptionmyturn": "${you} must roll the die",
	"type": "activeplayer",
	"possibleactions": [
		"rolldie"
	],
	"transitions": {
		"hugo": 6,
		"move": 5
	}
}
					*/
					break;
				case "playerTurnMove":
					/*
					{
	"name": "playerTurnMove",
	"description": "${actplayer} must choose a guest to move",
	"descriptionmyturn": "${you} must choose a guest to move",
	"type": "activeplayer",
	"action": "stPlayerTurnMove",
	"args": "argPlayerTurnMove",
	"possibleactions": [
		"chooseguest",
		"pass"
	],
	"transitions": {
		"move": 7,
		"pass": 8
	}
}
					*/
					break;
				case "hugoMove":
					/*
					{
	"name": "hugoMove",
	"type": "game",
	"action": "stHugoMove",
	"transitions": {
		"": 8
	}
}
					*/
					break;
				case "playerTurnMoveDestination":
					/*
					{
	"name": "playerTurnMoveDestination",
	"description": "${actplayer} must choose a place to move to",
	"descriptionmyturn": "${you} must choose a place to move to",
	"type": "activeplayer",
	"args": "argPlayerTurnMoveDestination",
	"possibleactions": [
		"choosedestination",
		"cancel"
	],
	"transitions": {
		"finished": 8,
		"cancel": "5"
	}
}
					*/
					break;
				case "nextPlayer":
					/*
					{
	"name": "nextPlayer",
	"type": "game",
	"updateGameProgression": true,
	"action": "stNextPlayer",
	"transitions": {
		"continue": 4,
		"autoplay": 13,
		"roundfinished": 9
	}
}
					*/
					break;
				case "checkGameEnd":
					/*
					{
	"name": "checkGameEnd",
	"type": "game",
	"action": "stCheckGameEnd",
	"transitions": {
		"end": 99,
		"nextround": 10
	}
}
					*/
					break;
				case "setupNewRound":
					/*
					{
	"name": "setupNewRound",
	"type": "game",
	"action": "stSetupNewRound",
	"transitions": {
		"": 11
	}
}
					*/
					break;
				case "newRound":
					/*
					{
	"name": "newRound",
	"type": "activeplayer",
	"description": "${actplayer} must choose a space on the gallery for a guest",
	"descriptionmyturn": "${you} must choose a space on the gallery for a guest",
	"action": "stNewRound",
	"possibleactions": [
		"choosesquare"
	],
	"transitions": {
		"": 12
	}
}
					*/
					break;
				case "newRoundNextPlayer":
					/*
					{
	"name": "newRoundNextPlayer",
	"type": "game",
	"action": "stNewRoundNextPlayer",
	"transitions": {
		"next": 11,
		"start": 4
	}
}
					*/
					break;
				case "autoplay":
					/*
					{
	"name": "autoplay",
	"type": "game",
	"action": "stAutoplay",
	"description": "${actplayer} rolls the die",
	"possibleactions": "rolldie",
	"transitions": {
		"hugo": 6,
		"move": 5
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
export default escapefromthehiddencastle;
