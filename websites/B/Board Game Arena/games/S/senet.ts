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

const senet: GamePresence = {
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
		"": 5
	}
}
					*/
					break;
				case "throwSticks":
					/*
					{
	"name": "throwSticks",
	"type": "game",
	"action": "stThrowSticks",
	"transitions": {
		"throwSticks": 10,
		"cantPlay": 20
	}
}
					*/
					break;
				case "playerTurn":
					/*
					{
	"name": "playerTurn",
	"description": "${actplayer} must move a stone: <font color=\"grey\">${totalStickValue} step(s)</font> ${backwardMove}",
	"descriptionmyturn": "${you} must move a stone: <font color=\"${infoColor}\">${totalStickValue} step(s)</font> ${backwardMove}",
	"type": "activeplayer",
	"args": "argPlayerTurn",
	"possibleactions": [
		"moveStone"
	],
	"transitions": {
		"moveStone": 20,
		"bonusTurn": 5,
		"zombiePass": 20,
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
		"nextPlayer": 5,
		"stoneInWater": 30
	}
}
					*/
					break;
				case "waterTurn":
					/*
					{
	"name": "waterTurn",
	"description": "${actplayer} is drowning in the House of Waters...",
	"descriptionmyturn": "${you} are drowning in the House of Waters...",
	"type": "activeplayer",
	"possibleactions": [
		"returnStone",
		"throwFour"
	],
	"transitions": {
		"returnStone": 20,
		"failedFour": 20,
		"throwFour": 5,
		"zombiePass": 20,
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
export default senet;
