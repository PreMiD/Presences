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

const dotsandboxes: GamePresence = {
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
	"type": "activeplayer",
	"description": "${actplayer} has to draw a box side.",
	"descriptionmyturn": "${you} have to draw a box side.",
	"possibleactions": [
		"actDrawSide"
	],
	"transitions": {
		"transCompleteBox": 2,
		"transSetup": 3,
		"transIncompleteBox": 10,
		"zombiePass": 10,
		"transEndGame": 99
	}
}
					*/
					break;
				case "pieSetupBlue":
					/*
					{
	"name": "pieSetupBlue",
	"type": "activeplayer",
	"description": "${actplayer} has to draw a box side or end the setup phase.",
	"descriptionmyturn": "${you} can draw a box side as <span style=\"color:#0000ff\">BLUE</span> or end the setup phase.",
	"possibleactions": [
		"actDrawSide",
		"actEndSetup"
	],
	"transitions": {
		"transEndSetup": 10,
		"transCompleteBox": 3,
		"transIncompleteBox": 4,
		"zombiePass": 10
	}
}
					*/
					break;
				case "pieSetupRed":
					/*
					{
	"name": "pieSetupRed",
	"type": "activeplayer",
	"description": "${actplayer} has to draw a box side or end the setup phase.",
	"descriptionmyturn": "${you} can draw a box side as <span style=\"color:#ff0000\">RED</span> or end the setup phase.",
	"possibleactions": [
		"actDrawSide",
		"actEndSetup"
	],
	"transitions": {
		"transEndSetup": 10,
		"transCompleteBox": 4,
		"transIncompleteBox": 3,
		"zombiePass": 10
	}
}
					*/
					break;
				case "pieRule":
					/*
					{
	"name": "pieRule",
	"type": "activeplayer",
	"args": "argPieRule",
	"description": "${actplayer} must decide whether to swap the colours or not.",
	"descriptionmyturn": "${you} may swap the player colours or keep them as they are. Next colour to play is <span style=\"color:#${colourCode};\">${colourName}</span>",
	"possibleactions": [
		"actKeepColours",
		"actSwapColours"
	],
	"transitions": {
		"transNextPlayer": 10,
		"transSamePlayer": 2,
		"zombiePass": 10
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
		"transNextTurn": 2,
		"transToPie": 9,
		"transEndGame": 99
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
export default dotsandboxes;
