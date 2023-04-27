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

const kalah: GamePresence = {
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
		"": 2
	}
}
					*/
					break;
				case "playerFirstTurn":
					/*
					{
	"name": "playerFirstTurn",
	"description": "${actplayer} must select his/her hole to play stones from there",
	"descriptionmyturn": "${you} must select your hole to play stones from there",
	"type": "activeplayer",
	"args": "argPlayerTurn",
	"possibleactions": [
		"playStonesFromHole"
	],
	"transitions": {
		"turnCompleted": 3,
		"extraTurn": 2
	}
}
					*/
					break;
				case "updateStatsFirstTurn":
					/*
					{
	"name": "updateStatsFirstTurn",
	"description": "",
	"type": "game",
	"action": "stCheckEndOfGame",
	"updateGameProgression": true,
	"transitions": {
		"gameEnded": 99,
		"notEndedYet": 4
	}
}
					*/
					break;
				case "nextPlayerForFirstTurn":
					/*
					{
	"name": "nextPlayerForFirstTurn",
	"description": "",
	"type": "game",
	"action": "stNextPlayer",
	"transitions": {
		"": 5
	}
}
					*/
					break;
				case "checkTournamentOpening":
					/*
					{
	"name": "checkTournamentOpening",
	"description": "",
	"type": "game",
	"action": "stCheckTournamentOpening",
	"transitions": {
		"standardOpening": 7,
		"tournamentOpening": 6
	}
}
					*/
					break;
				case "selectSideOfBoard":
					/*
					{
	"name": "selectSideOfBoard",
	"description": "${actplayer} must select a side of the board",
	"descriptionmyturn": "Do ${you} want to take your opponent`s first move and change sides of the board?",
	"type": "activeplayer",
	"possibleactions": [
		"selectSideOfBoard"
	],
	"transitions": {
		"sideOfBoardChanged": 9,
		"notChanged": 7
	}
}
					*/
					break;
				case "playerTurn":
					/*
					{
	"name": "playerTurn",
	"description": "${actplayer} must select his/her hole to play stones from there",
	"descriptionmyturn": "${you} must select your hole to play stones from there",
	"type": "activeplayer",
	"args": "argPlayerTurn",
	"possibleactions": [
		"playStonesFromHole"
	],
	"transitions": {
		"turnCompleted": 9,
		"extraTurn": 8
	}
}
					*/
					break;
				case "checkEndOfGameForExtraTurn":
					/*
					{
	"name": "checkEndOfGameForExtraTurn",
	"description": "",
	"type": "game",
	"action": "stCheckEndOfGameForExtraTurn",
	"updateGameProgression": true,
	"transitions": {
		"gameEnded": 99,
		"notEndedYet": 7
	}
}
					*/
					break;
				case "checkEndOfGame":
					/*
					{
	"name": "checkEndOfGame",
	"description": "",
	"type": "game",
	"action": "stCheckEndOfGame",
	"updateGameProgression": true,
	"transitions": {
		"gameEnded": 99,
		"notEndedYet": 10
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
		"": 7
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
export default kalah;
