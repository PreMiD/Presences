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

const boop: GamePresence = {
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
	"description": "Game setup",
	"type": "manager",
	"action": "stGameSetup",
	"transitions": {
		"": 10
	}
}
					*/
					break;
				case "changePlayer":
					/*
					{
	"name": "changePlayer",
	"type": "game",
	"action": "stChangePlayer",
	"transitions": {
		"possibleFigures": 8,
		"finishTurn": 15
	}
}
					*/
					break;
				case "possibleFigures":
					/*
					{
	"name": "possibleFigures",
	"type": "game",
	"action": "stPossibleFigures",
	"transitions": {
		"playerTurnFigureSelection": 9,
		"playerTurnKitten": 10,
		"playerTurnCat": 11,
		"finishTurn": 15
	}
}
					*/
					break;
				case "playerTurnFigureSelection":
					/*
					{
	"name": "playerTurnFigureSelection",
	"description": "${actplayer} must play a Kitten or Cat",
	"descriptionmyturn": "${you} must play a Kitten or Cat",
	"type": "activeplayer",
	"possibleactions": [
		"selectKitten",
		"selectCat"
	],
	"transitions": {
		"selectKitten": 10,
		"selectCat": 11,
		"zombiePass": 15
	}
}
					*/
					break;
				case "playerTurnKitten":
					/*
					{
	"name": "playerTurnKitten",
	"description": "${actplayer} must play a Kitten",
	"descriptionmyturn": "${you} must play a Kitten",
	"type": "activeplayer",
	"args": "argPlayerTurnKitten",
	"possibleactions": [
		"undo",
		"playKitten"
	],
	"transitions": {
		"undo": 9,
		"playKitten": 14,
		"zombiePass": 15
	}
}
					*/
					break;
				case "playerTurnCat":
					/*
					{
	"name": "playerTurnCat",
	"description": "${actplayer} must play a Cat",
	"descriptionmyturn": "${you} must play a Cat",
	"type": "activeplayer",
	"args": "argPlayerTurnCat",
	"possibleactions": [
		"undo",
		"playCat"
	],
	"transitions": {
		"undo": 9,
		"playCat": 14,
		"zombiePass": 15
	}
}
					*/
					break;
				case "figuresToUpgradeSelection":
					/*
					{
	"name": "figuresToUpgradeSelection",
	"description": "${actplayer} must select 3 Kittens/Cats to graduate",
	"descriptionmyturn": "${you} must select 3 Kittens/Cats to graduate",
	"type": "activeplayer",
	"args": "argFiguresToUpgradeSelection",
	"possibleactions": [
		"nextTurn"
	],
	"transitions": {
		"nextTurn": 7,
		"zombiePass": 15
	}
}
					*/
					break;
				case "singleFigureToUpgradeSelection":
					/*
					{
	"name": "singleFigureToUpgradeSelection",
	"description": "${actplayer} must select 1 Kitten/Cat to graduate",
	"descriptionmyturn": "${you} must select 1 Kitten/Cat to graduate",
	"type": "activeplayer",
	"args": "argSingleFigureToUpgradeSelection",
	"possibleactions": [
		"nextTurn"
	],
	"transitions": {
		"nextTurn": 7,
		"zombiePass": 15
	}
}
					*/
					break;
				case "confirmTurn":
					/*
					{
	"name": "confirmTurn",
	"description": "${actplayer} must confirm or restart their turn",
	"descriptionmyturn": "${you} must confirm or restart your turn",
	"type": "activeplayer",
	"possibleactions": [
		"confirm",
		"cancel"
	],
	"transitions": {
		"confirm": 15,
		"cancel": 16,
		"zombiePass": 15
	}
}
					*/
					break;
				case "finishTurn":
					/*
					{
	"name": "finishTurn",
	"type": "game",
	"action": "stFinishTurn",
	"updateGameProgression": true,
	"transitions": {
		"nextTurn": 7,
		"figuresUpgradeSelection": 12,
		"singleFigureUpgradeSelection": 13,
		"cantPlay": 15,
		"endGame": 99
	}
}
					*/
					break;
				case "cancelTurn":
					/*
					{
	"name": "cancelTurn",
	"type": "game",
	"action": "stCancelTurn",
	"args": "argCancelTurn",
	"transitions": {
		"restartTurn": 8,
		"zombiePass": 15
	}
}
					*/
					break;
				case "gameEnd":
					/*
					{
	"name": "gameEnd",
	"description": "End of Game",
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
export default boop;
