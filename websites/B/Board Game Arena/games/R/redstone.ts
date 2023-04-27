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

const redstone: GamePresence = {
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
				case "selectSquare":
					/*
					{
	"name": "selectSquare",
	"description": "${actplayer} must place a stone.",
	"descriptionmyturn": "${you} must place a stone.",
	"type": "activeplayer",
	"args": "argSelectSquare",
	"possibleactions": [
		"selectSquare"
	],
	"transitions": {
		"placeStone": 4,
		"selectNonCapturingOrCapturingSquare": 3,
		"firstMoveChoice": 12,
		"zombiePass": 4,
		"endGame": 99
	}
}
					*/
					break;
				case "chooseNonCaptureOrCapture":
					/*
					{
	"name": "chooseNonCaptureOrCapture",
	"description": "${actplayer} must make a capturing or non-capturing placement.",
	"descriptionmyturn": "${you} must make a capturing or non-capturing placement.",
	"type": "activeplayer",
	"args": "argChooseCaptureOrNonCapture",
	"possibleactions": [
		"chooseNoncapturing",
		"chooseCapturing",
		"unselectSelectedSquare"
	],
	"transitions": {
		"placeStone": 4,
		"unselectSelectedSquare": 2,
		"zombiePass": 4,
		"endGame": 99
	}
}
					*/
					break;
				case "nextPlayer":
					/*
					{
	"name": "nextPlayer",
	"type": "game",
	"action": "stNextPlayer",
	"updateGameProgression": true,
	"transitions": {
		"nextTurn": 2,
		"endGame": 99
	}
}
					*/
					break;
				case "nextPlayerFirstMove":
					/*
					{
	"name": "nextPlayerFirstMove",
	"type": "game",
	"action": "stNextPlayerFirstMove",
	"updateGameProgression": true,
	"transitions": {
		"placeStone": 4,
		"firstMoveChoice": 13
	}
}
					*/
					break;
				case "firstMoveChoice":
					/*
					{
	"name": "firstMoveChoice",
	"description": "${actplayer} may choose to switch colors and keep your first move as their own.",
	"descriptionmyturn": "${you} can switch colors and keep your opponents first move as your own.  Or just play on with your current color.",
	"type": "activeplayer",
	"args": "argSelectSquare",
	"possibleactions": [
		"chooseFirstMove",
		"selectSquare"
	],
	"transitions": {
		"nextTurn": 4,
		"placeStone": 4
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
export default redstone;
