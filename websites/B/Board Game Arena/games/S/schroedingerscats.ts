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

const schroedingerscats: GamePresence = {
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
				case "playerTurnPreHypothesis":
					/*
					{
	"name": "playerTurnPreHypothesis",
	"description": "${actplayer} must pick their actions",
	"descriptionmyturn": "${you} may play your physicist. Then you must either call out the current bid or place a new bid yourself.",
	"type": "activeplayer",
	"args": "argPlayerTurnPreHypothesis",
	"possibleactions": [
		"playPhysicist",
		"playOpenPhysicist",
		"callBid",
		"placeBid",
		"skipBid"
	],
	"transitions": {
		"prove_bid": 4,
		"postHypothesis": 3,
		"endOfRound": 11,
		"nextPlayer": 10
	}
}
					*/
					break;
				case "playerTurnPostHypothesis":
					/*
					{
	"name": "playerTurnPostHypothesis",
	"description": "${actplayer} must pick their actions",
	"descriptionmyturn": "${you} may play your physicist, reveal research cards or end your turn.",
	"type": "activeplayer",
	"args": "argPlayerTurnPostHypothesis",
	"possibleactions": [
		"playPhysicist",
		"playOpenPhysicist",
		"revealCards",
		"discardAndReplaceCards",
		"endMove"
	],
	"transitions": {
		"nextPlayer": 10
	}
}
					*/
					break;
				case "prepareNextPlayer":
					/*
					{
	"name": "prepareNextPlayer",
	"description": "",
	"type": "game",
	"action": "stPrepareNextPlayer",
	"updateGameProgression": true,
	"transitions": {
		"nextPlayer": 2,
		"endOfRound": 11,
		"prepareEndGame": 98
	}
}
					*/
					break;
				case "endOfRound":
					/*
					{
	"name": "endOfRound",
	"description": "",
	"type": "game",
	"action": "stEndOfRound",
	"updateGameProgression": true,
	"transitions": {
		"confirmEndOfRound": 12,
		"cleanup": 13,
		"prepareEndGame": 98
	}
}
					*/
					break;
				case "confirmEndOfRound":
					/*
					{
	"name": "confirmEndOfRound",
	"description": "Waiting for others players to start a new experiment",
	"descriptionmyturn": "Ready? ",
	"type": "multipleactiveplayer",
	"updateGameProgression": true,
	"possibleactions": [
		"confirmEndOfRound"
	],
	"transitions": {
		"cleanup": 13
	}
}
					*/
					break;
				case "cleanup":
					/*
					{
	"name": "cleanup",
	"description": "",
	"type": "game",
	"action": "stCleanup",
	"updateGameProgression": true,
	"transitions": {
		"prepareNextPlayer": 10
	}
}
					*/
					break;
				case "prepareEndGame":
					/*
					{
	"name": "prepareEndGame",
	"description": "",
	"type": "game",
	"action": "stPrepareEndGame",
	"updateGameProgression": true,
	"transitions": {
		"gameEnd": 99
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
export default schroedingerscats;
