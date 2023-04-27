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

const classicgo: GamePresence = {
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
		"": 13
	}
}
					*/
					break;
				case "playerTurn":
					/*
					{
	"name": "playerTurn",
	"description": "${actplayer} must play a stone or pass",
	"descriptionmyturn": "${you} must play a stone or pass",
	"type": "activeplayer",
	"args": "argPlayerTurn",
	"possibleactions": [
		"playStone",
		"pass"
	],
	"transitions": {
		"stonePlayed": 3,
		"zombiePass": 4,
		"playerPassed": 4,
		"playerPassedInSecondPassesSeries": 4,
		"forbiddenMove": 2
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
		"": 2
	}
}
					*/
					break;
				case "nextPlayerPass":
					/*
					{
	"name": "nextPlayerPass",
	"description": "",
	"type": "game",
	"action": "stNextPlayer",
	"updateGameProgression": true,
	"transitions": {
		"": 5
	}
}
					*/
					break;
				case "playerPassed":
					/*
					{
	"name": "playerPassed",
	"description": "Wait for ${actplayer} to play or pass",
	"descriptionmyturn": "${you} must play a stone or pass",
	"type": "activeplayer",
	"args": "argPlayerTurn",
	"possibleactions": [
		"playStone",
		"pass"
	],
	"transitions": {
		"stonePlayed": 3,
		"zombiePass": 9,
		"playerPassed": 9,
		"playerPassedInSecondPassesSeries": 15,
		"zombiePassToEnd": 15
	}
}
					*/
					break;
				case "firstMarkStones":
					/*
					{
	"name": "firstMarkStones",
	"description": "${actplayer} must designate dead stones",
	"descriptionmyturn": "${you} must designate dead stones",
	"type": "activeplayer",
	"args": "argFirstMarkStones",
	"possibleactions": [
		"markStone",
		"markOfStonesDone"
	],
	"transitions": {
		"stoneMarked": 6,
		"zombiePass": 10,
		"proposeToOpponent": 10
	}
}
					*/
					break;
				case "markStonesOrAgree":
					/*
					{
	"name": "markStonesOrAgree",
	"description": "${actplayer} can agree on the status of stones remaining on the board or designate dead stones or resume play",
	"descriptionmyturn": "${you} can agree on the status of stones remaining on the board or designate dead stones or resume play",
	"type": "activeplayer",
	"args": "argMarkStones",
	"possibleactions": [
		"markStone",
		"resume",
		"markOfStonesDone",
		"agree"
	],
	"transitions": {
		"stoneMarked": 8,
		"zombiePass": 12,
		"resumePlayOfPlayer": 2,
		"resumePlayOfOpponent": 11,
		"proposeToOpponent": 10,
		"agreeWithGamePosition": 12,
		"isDesignateStonesOfOpponent": 16
	}
}
					*/
					break;
				case "markStones":
					/*
					{
	"name": "markStones",
	"description": "${actplayer} can designate dead stones or resume play",
	"descriptionmyturn": "${you} can designate dead stones or resume play",
	"type": "activeplayer",
	"args": "argMarkStones",
	"possibleactions": [
		"markStone",
		"resume",
		"markOfStonesDone",
		"agree"
	],
	"transitions": {
		"stoneMarked": 8,
		"zombiePass": 12,
		"resumePlayOfPlayer": 2,
		"resumePlayOfOpponent": 11,
		"proposeToOpponent": 10,
		"agreeWithGamePosition": 12
	}
}
					*/
					break;
				case "nextPlayerFirstMarkStones":
					/*
					{
	"name": "nextPlayerFirstMarkStones",
	"description": "",
	"type": "game",
	"action": "stNextPlayer",
	"updateGameProgression": true,
	"transitions": {
		"": 6
	}
}
					*/
					break;
				case "nextPlayerMarkStones":
					/*
					{
	"name": "nextPlayerMarkStones",
	"description": "",
	"type": "game",
	"action": "stNextPlayer",
	"transitions": {
		"": 7
	}
}
					*/
					break;
				case "nextPlayerResumePlay":
					/*
					{
	"name": "nextPlayerResumePlay",
	"description": "",
	"type": "game",
	"action": "stNextPlayer",
	"transitions": {
		"": 2
	}
}
					*/
					break;
				case "scoring":
					/*
					{
	"name": "scoring",
	"description": "Scoring...",
	"type": "game",
	"action": "stScoring",
	"transitions": {
		"": 99
	}
}
					*/
					break;
				case "giveHandicap":
					/*
					{
	"name": "giveHandicap",
	"description": "",
	"type": "game",
	"action": "stIsHandicap",
	"transitions": {
		"handicapNo": 2,
		"handicapYes": 14
	}
}
					*/
					break;
				case "giveHandicap":
					/*
					{
	"name": "giveHandicap",
	"description": "Handicap stones are placed on the board...",
	"type": "game",
	"action": "stGiveHandicap",
	"transitions": {
		"": 3
	}
}
					*/
					break;
				case "nextPlayerScoring":
					/*
					{
	"name": "nextPlayerScoring",
	"description": "",
	"type": "game",
	"action": "stNextPlayer",
	"transitions": {
		"": 12
	}
}
					*/
					break;
				case "nextPlayerIsDesignateStones":
					/*
					{
	"name": "nextPlayerIsDesignateStones",
	"description": "",
	"type": "game",
	"action": "stNextPlayer",
	"transitions": {
		"": 17
	}
}
					*/
					break;
				case "isDesignateStones":
					/*
					{
	"name": "isDesignateStones",
	"description": "${actplayer} must define an action for dead stones after next series of passes",
	"descriptionmyturn": "${you} must define an action for dead stones after next series of passes",
	"type": "activeplayer",
	"possibleactions": [
		"isDesignateStones"
	],
	"transitions": {
		"resumePlayOfPlayer": 2,
		"resumePlayOfOpponent": 11,
		"zombiePass": 11
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
export default classicgo;
