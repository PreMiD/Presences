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

const forsale: GamePresence = {
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
				case "newBuyRound":
					/*
					{
	"name": "newBuyRound",
	"description": "",
	"type": "game",
	"action": "stNewBuyRound",
	"transitions": {
		"playerBidPass": 3,
		"nextBidderOrSettleWinner": 4
	}
}
					*/
					break;
				case "playerBidPass":
					/*
					{
	"name": "playerBidPass",
	"description": "${actplayer} must bid or pass",
	"descriptionmyturn": "${you} must select an action ",
	"type": "activeplayer",
	"possibleactions": [
		"bid",
		"pass"
	],
	"args": "argPlayerBidPass",
	"updateGameProgression": true,
	"transitions": {
		"bid": 4,
		"pass": 4
	}
}
					*/
					break;
				case "nextBidderOrSettleWinner":
					/*
					{
	"name": "nextBidderOrSettleWinner",
	"description": "",
	"type": "game",
	"action": "stNextBidderOrSettleWinner",
	"transitions": {
		"findNextBidder": 5,
		"settleWinner": 6
	}
}
					*/
					break;
				case "findNextBidder":
					/*
					{
	"name": "findNextBidder",
	"description": "",
	"type": "game",
	"action": "stFindNextBidder",
	"transitions": {
		"playerTurn": 3,
		"nextBidderOrSettleWinner": 4,
		"skip": 5
	}
}
					*/
					break;
				case "settleWinner":
					/*
					{
	"name": "settleWinner",
	"description": "",
	"type": "game",
	"action": "stSettleWinner",
	"updateGameProgression": true,
	"transitions": {
		"nextRound": 2,
		"sellPhase": 10
	}
}
					*/
					break;
				case "newSellRound":
					/*
					{
	"name": "newSellRound",
	"description": "",
	"type": "game",
	"action": "stNewSellRound",
	"updateGameProgression": true,
	"transitions": {
		"playerSell": 11
	}
}
					*/
					break;
				case "playerSell":
					/*
					{
	"name": "playerSell",
	"type": "multipleactiveplayer",
	"description": "Other players must choose one property to sell",
	"descriptionmyturn": "${you} must choose one property to sell",
	"possibleactions": [
		"sell"
	],
	"updateGameProgression": true,
	"transitions": {
		"allSellsSubmitted": 12
	}
}
					*/
					break;
				case "settleSale":
					/*
					{
	"name": "settleSale",
	"description": "",
	"type": "game",
	"action": "stSettleSale",
	"transitions": {
		"nextRound": 10,
		"scoreGame": 98
	}
}
					*/
					break;
				case "computeScore":
					/*
					{
	"name": "computeScore",
	"description": "",
	"type": "game",
	"action": "stComputeScore",
	"transitions": {
		"": 99
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
export default forsale;
