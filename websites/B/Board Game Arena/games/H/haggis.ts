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

const haggis: GamePresence = {
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
				case "newRound":
					/*
					{
	"name": "newRound",
	"description": "",
	"type": "game",
	"action": "stNewRound",
	"transitions": {
		"startRound": 10,
		"tattiesBid": 3
	}
}
					*/
					break;
				case "bidTurn":
					/*
					{
	"name": "bidTurn",
	"description": "${actplayer} may bid for the declarer",
	"descriptionmyturn": "${you} may bid for the declarer",
	"type": "activeplayer",
	"args": "argBidTurn",
	"possibleactions": [
		"bidDeclarer",
		"passBid",
		"lockGroup",
		"lockReset"
	],
	"transitions": {
		"": 4
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
		"continueBid": 3,
		"exchangeCard": 5,
		"noExchange": 10
	}
}
					*/
					break;
				case "discardCards":
					/*
					{
	"name": "discardCards",
	"description": "${actplayer} must discard ${nb} card(s) to Haggis",
	"descriptionmyturn": "${you} must discard ${nb} card(s) to Haggis",
	"type": "activeplayer",
	"args": "argDiscardCards",
	"possibleactions": [
		"discardCards",
		"lockGroup",
		"lockReset"
	],
	"transitions": {
		"": 10
	}
}
					*/
					break;
				case "newTrick":
					/*
					{
	"name": "newTrick",
	"description": "",
	"type": "game",
	"action": "stNewTrick",
	"updateGameProgression": true,
	"transitions": {
		"": 11
	}
}
					*/
					break;
				case "playComboOpen":
					/*
					{
	"name": "playComboOpen",
	"description": "${actplayer} must play a valid combination",
	"descriptionmyturn": "${you} must play a valid combination",
	"type": "activeplayer",
	"possibleactions": [
		"playCombo",
		"bet",
		"lockGroup",
		"lockReset"
	],
	"transitions": {
		"": 20
	}
}
					*/
					break;
				case "playCombo":
					/*
					{
	"name": "playCombo",
	"description": "${actplayer} may play a valid combination",
	"descriptionmyturn": "${you} may play a valid combination",
	"type": "activeplayer",
	"possibleactions": [
		"playCombo",
		"pass",
		"bet",
		"lockGroup",
		"lockReset"
	],
	"transitions": {
		"": 20
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
		"nextPlayer": 12,
		"endTrick": 10,
		"endRound": 50,
		"autoPass": 20,
		"giveCards": 21
	}
}
					*/
					break;
				case "giveCards":
					/*
					{
	"name": "giveCards",
	"description": "${actplayer} must select a player to give captured cards",
	"descriptionmyturn": "${you} must select a player to give captured cards",
	"type": "activeplayer",
	"possibleactions": [
		"giveCards",
		"lockGroup",
		"lockReset"
	],
	"transitions": {
		"": 22
	}
}
					*/
					break;
				case "nextPlayerAfterBomb":
					/*
					{
	"name": "nextPlayerAfterBomb",
	"description": "",
	"type": "game",
	"action": "stNextPlayerAfterBomb",
	"transitions": {
		"endTrick": 10,
		"endRound": 50
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
		"endGame": 99,
		"newRound": 2
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
export default haggis;
