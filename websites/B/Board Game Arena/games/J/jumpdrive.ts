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

const jumpdrive: GamePresence = {
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
				case "stateSetup":
					/*
					{
	"name": "stateSetup",
	"description": "Performing setup",
	"type": "game",
	"action": "stSetup",
	"transitions": {
		"setupDiscard": 3,
		"startgame": 10
	}
}
					*/
					break;
				case "stateSetupDiscard":
					/*
					{
	"name": "stateSetupDiscard",
	"description": "Other players must discard",
	"descriptionmyturn": "${you} must discard [CARDS]2",
	"type": "multipleactiveplayer",
	"possibleactions": [
		"actionSetupDiscard"
	],
	"transitions": {
		"done": 10
	}
}
					*/
					break;
				case "stateNewRound":
					/*
					{
	"name": "stateNewRound",
	"description": "Performing round setup",
	"type": "game",
	"action": "stNewRound",
	"updateGameProgression": true,
	"transitions": {
		"startTurn": 20
	}
}
					*/
					break;
				case "stateTurn":
					/*
					{
	"name": "stateTurn",
	"description": "Other players are selecting actions",
	"descriptionmyturn": "${you} must choose an action",
	"type": "multipleactiveplayer",
	"possibleactions": [
		"actionPlayCards",
		"actionCancelPlayCards"
	],
	"transitions": {
		"done": 30
	}
}
					*/
					break;
				case "stateResolveActions":
					/*
					{
	"name": "stateResolveActions",
	"description": "Processing results",
	"type": "game",
	"action": "stResolveActions",
	"transitions": {
		"discardExplore": 35
	}
}
					*/
					break;
				case "stateDiscardExplore":
					/*
					{
	"name": "stateDiscardExplore",
	"description": "Other players must discard",
	"descriptionmyturn": "${you} must discard [CARDS]${_private.numDiscard}",
	"args": "argDiscardExplore",
	"type": "multipleactiveplayer",
	"possibleactions": [
		"actionDiscardExplore"
	],
	"transitions": {
		"done": 40
	}
}
					*/
					break;
				case "stateSecondSettleCheck":
					/*
					{
	"name": "stateSecondSettleCheck",
	"description": "Processing results",
	"type": "game",
	"action": "stSecondSettleCheck",
	"transitions": {
		"secondSettle": 45
	}
}
					*/
					break;
				case "stateSecondSettle":
					/*
					{
	"name": "stateSecondSettle",
	"description": "Other players may decide to place a second world",
	"descriptionmyturn": "${you} may place a second world",
	"type": "multipleactiveplayer",
	"possibleactions": [
		"actionSecondSettle"
	],
	"transitions": {
		"done": 50
	}
}
					*/
					break;
				case "stateIncome":
					/*
					{
	"name": "stateIncome",
	"description": "Processing results",
	"type": "game",
	"action": "stIncome",
	"transitions": {
		"discardDown": 55,
		"endGame": 90
	}
}
					*/
					break;
				case "stateDiscardDown":
					/*
					{
	"name": "stateDiscardDown",
	"description": "Other players must discard down to [CARDS]10",
	"descriptionmyturn": "${you} must discard down to [CARDS]10",
	"type": "multipleactiveplayer",
	"updateGameProgression": true,
	"possibleactions": [
		"actionDiscardDown"
	],
	"transitions": {
		"done": 10
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
	"updateGameProgression": true,
	"transitions": {
		"allDone": 99
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
export default jumpdrive;
