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

const artdecko: GamePresence = {
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
		"": 20
	}
}
					*/
					break;
				case "action1State":
					/*
					{
	"name": "action1State",
	"description": "${actplayer} is taking a first action",
	"descriptionmyturn": "${you} must take your first action",
	"type": "activeplayer",
	"possibleactions": [
		"actionHaggle",
		"actionAcquire",
		"actionExhibit"
	],
	"transitions": {
		"actionCompleteTransition": 11,
		"endTurnEarlyTransition": 17,
		"zombieTransition": 20
	}
}
					*/
					break;
				case "action2State":
					/*
					{
	"name": "action2State",
	"description": "${actplayer} is taking a second action",
	"descriptionmyturn": "${you} must take your second action",
	"type": "activeplayer",
	"possibleactions": [
		"actionHaggle",
		"actionAcquire",
		"actionExhibit"
	],
	"transitions": {
		"actionCompleteTransition": 15,
		"endTurnEarlyTransition": 17,
		"zombieTransition": 20
	}
}
					*/
					break;
				case "discardState":
					/*
					{
	"name": "discardState",
	"description": "${actplayer} is discarding",
	"descriptionmyturn": "${you} may choose to discard",
	"type": "activeplayer",
	"possibleactions": [
		"actionDiscard"
	],
	"transitions": {
		"endTurnTransition": 20,
		"zombieTransition": 20
	}
}
					*/
					break;
				case "autoDiscardState":
					/*
					{
	"name": "autoDiscardState",
	"type": "game",
	"action": "stAutoDiscard",
	"updateGameProgression": true,
	"transitions": {
		"endTurnTransition": 20
	}
}
					*/
					break;
				case "endTurnState":
					/*
					{
	"name": "endTurnState",
	"type": "game",
	"action": "stNextPlayer",
	"updateGameProgression": true,
	"transitions": {
		"nextTurnTransition": 10,
		"scoringTransition": 80
	}
}
					*/
					break;
				case "scoringState":
					/*
					{
	"name": "scoringState",
	"type": "game",
	"action": "stScoring",
	"updateGameProgression": true,
	"transitions": {
		"endGameTransition": 99
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
export default artdecko;
