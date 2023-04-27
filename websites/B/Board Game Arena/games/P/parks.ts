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

const parks: GamePresence = {
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
		"": 4
	}
}
					*/
					break;
				case "statePreChooseYear":
					/*
					{
	"name": "statePreChooseYear",
	"description": "",
	"type": "game",
	"action": "stPreChooseYear",
	"transitions": {
		"chooseYear": 5,
		"skipChooseYear": 10
	}
}
					*/
					break;
				case "stateChooseYear":
					/*
					{
	"name": "stateChooseYear",
	"description": "Other players must choose a year card",
	"descriptionmyturn": "${you} must choose a year card to keep",
	"type": "multipleactiveplayer",
	"possibleactions": [
		"actionChooseYear"
	],
	"transitions": {
		"startGame": 10
	}
}
					*/
					break;
				case "stateNewSeason":
					/*
					{
	"name": "stateNewSeason",
	"description": "Performing season setup",
	"type": "game",
	"action": "stSetupSeason",
	"transitions": {
		"turns": 20,
		"endGame": 80
	}
}
					*/
					break;
				case "stateTurnEngine":
					/*
					{
	"name": "stateTurnEngine",
	"description": "Starting next turn",
	"type": "game",
	"action": "stTurnHandler",
	"updateGameProgression": true,
	"transitions": {
		"startTurn": 21,
		"endSeason": 30,
		"endSeasonWithoutPhoto": 10
	}
}
					*/
					break;
				case "statePlayerTurn":
					/*
					{
	"name": "statePlayerTurn",
	"description": "${actplayer} is taking a turn",
	"descriptionmyturn": "${you} must take your turn",
	"type": "activeplayer",
	"possibleactions": [
		"actionMoveBasic",
		"actionMoveAdv",
		"actionMoveCamp",
		"actionGainCanteen",
		"actionPhoto",
		"actionWild",
		"actionExchange",
		"actionBuy",
		"actionVisit",
		"actionCampDiscardYear",
		"actionFillCanteen",
		"actionUndo",
		"actionEndTurn"
	],
	"transitions": {
		"done": 20,
		"zombieMove": 20
	}
}
					*/
					break;
				case "stateSeasonPhoto":
					/*
					{
	"name": "stateSeasonPhoto",
	"description": "${actplayer} is choosing whether to take a photo",
	"descriptionmyturn": "${you} may take a photo",
	"type": "activeplayer",
	"possibleactions": [
		"actionSeasonPhoto"
	],
	"transitions": {
		"done": 10,
		"zombiePass": 10
	}
}
					*/
					break;
				case "stateScoring":
					/*
					{
	"name": "stateScoring",
	"description": "Scoring",
	"type": "game",
	"action": "stScoring",
	"transitions": {
		"done": 99
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
	"updateGameProgression": true,
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
export default parks;
