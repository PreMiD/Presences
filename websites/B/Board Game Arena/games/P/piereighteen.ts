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

const piereighteen: GamePresence = {
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
				case "setupTurn":
					/*
					{
	"name": "setupTurn",
	"description": "All players must choose their first Pier card and Plan card",
	"descriptionmyturn": "${you} must choose your first Pier card",
	"type": "multipleactiveplayer",
	"action": "stMakeEveryoneActive",
	"possibleactions": [
		"choiceConfirm",
		"choiceCancel"
	],
	"transitions": {
		"choiceConfirm": 3,
		"zombiePass": 3
	}
}
					*/
					break;
				case "endSetup":
					/*
					{
	"name": "endSetup",
	"description": "",
	"type": "game",
	"action": "stEndSetup",
	"transitions": {
		"": 4
	}
}
					*/
					break;
				case "playerTurn":
					/*
					{
	"name": "playerTurn",
	"description": "${actplayer} must choose a card and place it",
	"descriptionmyturn": "${you} must choose a card and place it",
	"type": "activeplayer",
	"args": "argPlayerTurn",
	"possibleactions": [
		"playCard"
	],
	"transitions": {
		"playCard": 5,
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
		"nextPlayer": 4,
		"endRound": 6
	}
}
					*/
					break;
				case "endRound":
					/*
					{
	"name": "endRound",
	"description": "",
	"type": "game",
	"action": "stEndRound",
	"updateGameProgression": true,
	"transitions": {
		"nextPlayer": 4,
		"finishPlan": 7
	}
}
					*/
					break;
				case "finishPlan":
					/*
					{
	"name": "finishPlan",
	"description": "All players must place the Plan card",
	"descriptionmyturn": "${you} must place the Plan card",
	"type": "multipleactiveplayer",
	"args": "argFinishPlan",
	"action": "stMakeEveryoneActive",
	"possibleactions": [
		"planConfirm"
	],
	"transitions": {
		"planConfirm": 99,
		"zombiePass": 99
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
export default piereighteen;
