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

const fightthelandlord: GamePresence = {
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
				case "startRound":
					/*
					{
	"name": "startRound",
	"description": "",
	"type": "game",
	"action": "stStartRound",
	"transitions": {
		"": 3
	}
}
					*/
					break;
				case "dealCards":
					/*
					{
	"name": "dealCards",
	"description": "",
	"type": "game",
	"action": "stDealCards",
	"transitions": {
		"": 4
	}
}
					*/
					break;
				case "bidTurn":
					/*
					{
	"name": "bidTurn",
	"description": "${actplayer} may bid for the landlord",
	"descriptionmyturn": "${you} may bid for the landlord",
	"type": "activeplayer",
	"args": "argBidTurn",
	"possibleactions": [
		"bidLandlord",
		"passBid"
	],
	"transitions": {
		"bidCheck": 5,
		"zombiePass": 5
	}
}
					*/
					break;
				case "bidCheck":
					/*
					{
	"name": "bidCheck",
	"description": "",
	"type": "game",
	"action": "stBidCheck",
	"transitions": {
		"redealCards": 3,
		"continueBid": 4,
		"bidEnd": 8,
		"discardPhase": 6
	}
}
					*/
					break;
				case "discardPhase":
					/*
					{
	"name": "discardPhase",
	"description": "All players may discard cards in hand",
	"descriptionmyturn": "${you} may discard cards in hand",
	"type": "multipleactiveplayer",
	"args": "argDiscardPhase",
	"action": "stMakeEveryoneActive",
	"possibleactions": [
		"discardCards",
		"discardCancel"
	],
	"transitions": {
		"": 7
	}
}
					*/
					break;
				case "discardCheck":
					/*
					{
	"name": "discardCheck",
	"description": "",
	"type": "game",
	"action": "stDiscardCheck",
	"transitions": {
		"": 8
	}
}
					*/
					break;
				case "playerTurn":
					/*
					{
	"name": "playerTurn",
	"description": "${actplayer} may play a valid combination",
	"descriptionmyturn": "${you} may play a valid combination",
	"type": "activeplayer",
	"args": "argPlayerTurn",
	"possibleactions": [
		"playCard",
		"passTurn",
		"increaseStake"
	],
	"transitions": {
		"nextPlayer": 9,
		"zombiePass": 9
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
		"nextPlayer": 8,
		"autoPass": 9,
		"endTrick": 10,
		"endRound": 11
	}
}
					*/
					break;
				case "endTrick":
					/*
					{
	"name": "endTrick",
	"description": "",
	"type": "game",
	"action": "stEndTrick",
	"transitions": {
		"nextTrick": 8,
		"autoPlay": 11
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
	"transitions": {
		"nextRound": 2,
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
export default fightthelandlord;
