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

const vaalbara: GamePresence = {
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
				case "initTurn":
					/*
					{
	"name": "initTurn",
	"type": "manager",
	"action": "stInitTurn",
	"transitions": {
		"startTurn": 10,
		"endGame": 99
	}
}
					*/
					break;
				case "playerTurn":
					/*
					{
	"name": "playerTurn",
	"type": "multipleactiveplayer",
	"action": "stPlayerTurnInit",
	"description": "Other player must play a card",
	"descriptionmyturn": "${you} must play a card",
	"possibleactions": [
		"playCard"
	],
	"transitions": {
		"allCardsPlayed": 20
	}
}
					*/
					break;
				case "initResolution":
					/*
					{
	"name": "initResolution",
	"type": "manager",
	"action": "stInitResolution",
	"transitions": {
		"nextPlayer": 25
	}
}
					*/
					break;
				case "playerChar":
					/*
					{
	"name": "playerChar",
	"type": "activeplayer",
	"action": "stPlayerChar",
	"args": "argsPlayerChar",
	"description": "",
	"descriptionmyturn": "",
	"possibleactions": [
		"bard",
		"midwife",
		"tracker",
		"rider",
		"pioneer"
	],
	"transitions": {
		"afterChar": 30,
		"askFighter": 26
	}
}
					*/
					break;
				case "askFighter":
					/*
					{
	"name": "askFighter",
	"type": "multipleactiveplayer",
	"action": "stAskFighter",
	"description": "Other player can reveal a Fighter",
	"descriptionmyturn": "",
	"possibleactions": [
		"revealFighter"
	],
	"transitions": {
		"askFighterDone": 27
	}
}
					*/
					break;
				case "afterFighter":
					/*
					{
	"name": "afterFighter",
	"type": "manager",
	"action": "stAfterFighter",
	"transitions": {
		"afterChar": 30
	}
}
					*/
					break;
				case "playerLand":
					/*
					{
	"name": "playerLand",
	"type": "activeplayer",
	"action": "stPlayerLand",
	"description": "Other player is choosing a Land card",
	"descriptionmyturn": "${you} must take a Land card",
	"possibleactions": [
		"pickLand"
	],
	"transitions": {
		"afterLand": 50
	}
}
					*/
					break;
				case "afterPlayer":
					/*
					{
	"name": "afterPlayer",
	"type": "manager",
	"action": "stAfterPlayer",
	"updateGameProgression": true,
	"transitions": {
		"nextPlayer": 25,
		"nextTurn": 2
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
export default vaalbara;
