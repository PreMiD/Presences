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

const kingdoms: GamePresence = {
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
				case "newHand":
					/*
					{
	"name": "newHand",
	"type": "game",
	"action": "stNewHand",
	"updateGameProgression": true,
	"transitions": {
		"": 25
	}
}
					*/
					break;
				case "playerTurn":
					/*
					{
	"name": "playerTurn",
	"description": "",
	"descriptionmyturn": "",
	"args": "argPlayerTurnInfo",
	"type": "activeplayer",
	"action": "stPlayerTurn",
	"possibleactions": [
		"addCardToKingdomGroup",
		"moveKingdomCardToHand",
		"selectOpponent",
		"persistCardOrder"
	],
	"updateGameProgression": true,
	"transitions": {
		"activateOpponent": 26,
		"gameEnd": 99,
		"zombiePass": 80
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
	"possibleactions": [
		"addCardToKingdomGroup",
		"moveKingdomCardToHand",
		"persistCardOrder"
	],
	"updateGameProgression": true,
	"transitions": {
		"playerTurn": 20,
		"lastturn": 70,
		"gameEnd": 99
	}
}
					*/
					break;
				case "activateOpponent":
					/*
					{
	"name": "activateOpponent",
	"type": "game",
	"action": "stActivateOpponent",
	"possibleactions": [
		"addCardToKingdomGroup",
		"moveKingdomCardToHand",
		"persistCardOrder"
	],
	"transitions": {
		"opponentBid": 40,
		"gameEnd": 99
	}
}
					*/
					break;
				case "activateChallenger":
					/*
					{
	"name": "activateChallenger",
	"type": "game",
	"action": "stActivateChallenger",
	"possibleactions": [
		"addCardToKingdomGroup",
		"moveKingdomCardToHand",
		"persistCardOrder"
	],
	"transitions": {
		"challengerBid": 50,
		"gameEnd": 99
	}
}
					*/
					break;
				case "opponentBid":
					/*
					{
	"name": "opponentBid",
	"description": "",
	"descriptionmyturn": "",
	"args": "argOpponentBidInfo",
	"type": "activeplayer",
	"action": "stOpponentBid",
	"possibleactions": [
		"addCardToKingdomGroup",
		"moveKingdomCardToHand",
		"bidCard",
		"opponentGivesUp",
		"persistCardOrder"
	],
	"updateGameProgression": true,
	"transitions": {
		"activateChallenger": 27,
		"completeBidding": 61,
		"gameEnd": 99,
		"zombiePass": 80
	}
}
					*/
					break;
				case "challengerBid":
					/*
					{
	"name": "challengerBid",
	"description": "",
	"descriptionmyturn": "",
	"args": "argChallengerBidInfo",
	"type": "activeplayer",
	"action": "stChallengerBid",
	"possibleactions": [
		"addCardToKingdomGroup",
		"moveKingdomCardToHand",
		"bidCard",
		"persistCardOrder"
	],
	"updateGameProgression": true,
	"transitions": {
		"checkBidResults": 60,
		"gameEnd": 99,
		"zombiePass": 80
	}
}
					*/
					break;
				case "checkBidResults":
					/*
					{
	"name": "checkBidResults",
	"type": "game",
	"action": "stCheckBidResults",
	"possibleactions": [
		"addCardToKingdomGroup",
		"moveKingdomCardToHand",
		"persistCardOrder"
	],
	"transitions": {
		"completeBidding": 61,
		"activateOpponent": 26,
		"gameEnd": 99
	}
}
					*/
					break;
				case "completeBidding":
					/*
					{
	"name": "completeBidding",
	"description": "",
	"descriptionmyturn": "",
	"args": "argCompleteBidding",
	"type": "game",
	"action": "stCompleteBidding",
	"possibleactions": [
		"addCardToKingdomGroup",
		"moveKingdomCardToHand",
		"persistCardOrder"
	],
	"transitions": {
		"nextPlayer": 25,
		"gameEnd": 99
	}
}
					*/
					break;
				case "lastturn":
					/*
					{
	"name": "lastturn",
	"description": "",
	"descriptionmyturn": "",
	"type": "multipleactiveplayer",
	"action": "stLastturn",
	"possibleactions": [
		"addCardToKingdomGroup",
		"moveKingdomCardToHand",
		"kingdomUpdateComplete",
		"persistCardOrder"
	],
	"updateGameProgression": false,
	"transitions": {
		"evalLastturn": 71,
		"zombiePass": 80
	}
}
					*/
					break;
				case "evalLastturn":
					/*
					{
	"name": "evalLastturn",
	"description": "",
	"descriptionmyturn": "",
	"type": "game",
	"action": "stEvalLastturn",
	"updateGameProgression": false,
	"transitions": {
		"gameEnd": 99
	}
}
					*/
					break;
				case "zombiePass":
					/*
					{
	"name": "zombiePass",
	"description": "",
	"descriptionmyturn": "",
	"type": "game",
	"action": "stZombiePass",
	"updateGameProgression": false,
	"transitions": {
		"nextPlayer": 25
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
export default kingdoms;
