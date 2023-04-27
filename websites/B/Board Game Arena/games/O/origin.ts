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

const origin: GamePresence = {
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
				case "playerTurnSetup":
					/*
					{
	"type": "multipleactiveplayer",
	"description": "Other players must choose one Objective",
	"descriptionmyturn": "${you} must choose one Objective card to keep",
	"possibleactions": [
		"playKeep"
	],
	"transitions": {
		"next": 5,
		"loopback": 2
	},
	"action": "st_MultiPlayerInit",
	"args": "arg_playerTurnSetup",
	"name": "playerTurnSetup"
}
					*/
					break;
				case "playerTurnMain":
					/*
					{
	"type": "activeplayer",
	"description": "${actplayer} must play an action or card",
	"descriptionmyturn": "${you} must play an action (EVOLUTION, MIGRATION, SWAP) or play a card",
	"possibleactions": [
		"playCard",
		"playEvolution",
		"playMigration",
		"playSwap",
		"pass"
	],
	"transitions": {
		"next": 6,
		"loopback": 4,
		"discard": 8
	},
	"args": "arg_playerTurnMain",
	"name": "playerTurnMain"
}
					*/
					break;
				case "gameTurnSetupDone":
					/*
					{
	"type": "game",
	"updateGameProgression": true,
	"transitions": {
		"next": 4
	},
	"action": "st_gameTurnSetupDone",
	"name": "gameTurnSetupDone"
}
					*/
					break;
				case "gameTurnNextPlayer":
					/*
					{
	"type": "game",
	"updateGameProgression": true,
	"transitions": {
		"next": 4,
		"last": 7
	},
	"action": "st_gameTurnNextPlayer",
	"name": "gameTurnNextPlayer"
}
					*/
					break;
				case "gameTurnEndOfGame":
					/*
					{
	"type": "game",
	"description": "End of game",
	"updateGameProgression": true,
	"transitions": {
		"next": 99,
		"endGame": 99
	},
	"action": "st_gameTurnEndOfGame",
	"name": "gameTurnEndOfGame"
}
					*/
					break;
				case "playerTurnDiscard":
					/*
					{
	"type": "activeplayer",
	"description": "${actplayer} must discard some cards",
	"descriptionmyturn": "${you} must discard ${num} ${color_name} card(s)",
	"possibleactions": [
		"playDiscard"
	],
	"transitions": {
		"next": 4,
		"loopback": 8
	},
	"args": "arg_playerTurnDiscard",
	"name": "playerTurnDiscard"
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
export default origin;
