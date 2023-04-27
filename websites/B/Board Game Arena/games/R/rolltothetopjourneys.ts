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

const rolltothetopjourneys: GamePresence = {
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
		"": 10
	}
}
					*/
					break;
				case "rollDice":
					/*
					{
	"name": "rollDice",
	"description": "Rolling dice",
	"type": "game",
	"action": "stRollDice",
	"args": "argRollDice",
	"transitions": {
		"selectionPhase": 11,
		"endGame": 99
	}
}
					*/
					break;
				case "multiplayerSelectionPhase":
					/*
					{
	"name": "multiplayerSelectionPhase",
	"description": "Waiting for other players to end their turn",
	"descriptionmyturn": "${you} must do your turn",
	"type": "multipleactiveplayer",
	"initialprivate": 20,
	"action": "stMultiplayerSelectionPhase",
	"args": "argMultiplayerSelectionPhase",
	"transitions": {
		"": 20,
		"nextTurn": 30
	}
}
					*/
					break;
				case "playersTurn":
					/*
					{
	"name": "playersTurn",
	"description": "${actplayer} should select die/dice and fill their board or pass",
	"descriptionmyturn": "${you} should select die/dice and fill your board or pass",
	"type": "private",
	"args": "argPlayersTurn",
	"possibleactions": [
		"selectDice",
		"selectField",
		"restart"
	],
	"transitions": {
		"": 21
	}
}
					*/
					break;
				case "confirmEndTurn":
					/*
					{
	"name": "confirmEndTurn",
	"description": "${actplayer} should end your turn or continue",
	"descriptionmyturn": "${you} should end your turn or continue",
	"type": "private",
	"transitions": {
		"endTurn": 11,
		"cancel": 20
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
	"args": "argNextPlayer",
	"updateGameProgression": true,
	"transitions": {
		"addDice": 31,
		"removeDice": 32,
		"addOrRemoveDice": 33,
		"swapDice": 34,
		"endGame": 99
	}
}
					*/
					break;
				case "addDice":
					/*
					{
	"name": "addDice",
	"description": "${actplayer} must ADD a die to the active pool",
	"descriptionmyturn": "${you} must ADD a die to the active pool",
	"type": "activeplayer",
	"args": "argAddDice",
	"transitions": {
		"diceChanged": 10,
		"zombiePass": 10
	}
}
					*/
					break;
				case "removeDice":
					/*
					{
	"name": "removeDice",
	"description": "${actplayer} must REMOVE a die from the active pool",
	"descriptionmyturn": "${you} must REMOVE a die from the active pool",
	"type": "activeplayer",
	"args": "argRemoveDice",
	"transitions": {
		"diceChanged": 10,
		"zombiePass": 10
	}
}
					*/
					break;
				case "addOrRemoveDice":
					/*
					{
	"name": "addOrRemoveDice",
	"description": "${actplayer} must ADD or REMOVE a die",
	"descriptionmyturn": "${you} must ADD or REMOVE a die",
	"type": "activeplayer",
	"args": "argAddOrRemoveDice",
	"transitions": {
		"addDice": 31,
		"removeDice": 32,
		"zombiePass": 10
	}
}
					*/
					break;
				case "swapDice1":
					/*
					{
	"name": "swapDice1",
	"description": "${actplayer} must select a die to ADD to the active pool",
	"descriptionmyturn": "${you} must select a die to ADD to the active pool",
	"type": "activeplayer",
	"args": "argSwapDice1",
	"transitions": {
		"swapDice2": 35,
		"zombiePass": 10
	}
}
					*/
					break;
				case "swapDice2":
					/*
					{
	"name": "swapDice2",
	"description": "${actplayer} must select a die to REMOVE from the active pool",
	"descriptionmyturn": "${you} must select a die to REMOVE from the active pool",
	"type": "activeplayer",
	"args": "argSwapDice2",
	"transitions": {
		"diceChanged": 10,
		"zombiePass": 10
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
export default rolltothetopjourneys;
