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

const yokai: GamePresence = {
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
		"PeekCards": 2
	}
}
					*/
					break;
				case "playerTurnPeekCards":
					/*
					{
	"name": "playerTurnPeekCards",
	"description": "${actplayer} must peek at 2 Yokaï cards",
	"descriptionmyturn": "${you} must peek at 2 Yokaï cards",
	"type": "activeplayer",
	"possibleactions": [
		"peekCard",
		"yokaiInPeace"
	],
	"transitions": {
		"MoveCard": 3,
		"yokaiInPeace": 10,
		"zombiePass": 5
	}
}
					*/
					break;
				case "playerTurnMoveCard":
					/*
					{
	"name": "playerTurnMoveCard",
	"description": "${actplayer} must move 1 Yokaï card",
	"descriptionmyturn": "${you} must move 1 Yokaï card",
	"type": "activeplayer",
	"possibleactions": [
		"moveCard"
	],
	"transitions": {
		"PlayHint": 4,
		"zombiePass": 5
	}
}
					*/
					break;
				case "playerTurnPlayHint":
					/*
					{
	"name": "playerTurnPlayHint",
	"description": "${actplayer} must reveal or place a hint card",
	"descriptionmyturn": "${you} must reveal or place a hint card",
	"type": "activeplayer",
	"possibleactions": [
		"placeHintCard",
		"revealHintCard"
	],
	"transitions": {
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
	"updateGameProgression": true,
	"transitions": {
		"scoreCalculation": 10,
		"nextPlayer": 2
	}
}
					*/
					break;
				case "scoreCalculation":
					/*
					{
	"name": "scoreCalculation",
	"description": "",
	"type": "game",
	"action": "stScoreCalculation",
	"updateGameProgression": true,
	"transitions": {
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
export default yokai;
