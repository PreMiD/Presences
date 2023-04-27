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

const ohhell: GamePresence = {
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
		"setupHands": 2
	}
}
					*/
					break;
				case "setupHands":
					/*
					{
	"name": "setupHands",
	"description": "Distributing hands. Please wait...",
	"type": "game",
	"action": "stSetupHands",
	"transitions": {
		"actionBidding": 3,
		"actionSimultaneousBidding": 6
	}
}
					*/
					break;
				case "actionBidding":
					/*
					{
	"name": "actionBidding",
	"description": "${actplayer} is bidding",
	"descriptionmyturn": "${you} must bid a number of tricks",
	"type": "activeplayer",
	"possibleactions": [
		"bid"
	],
	"args": "argsBidding",
	"transitions": {
		"nextPlayer": 10,
		"zombiePass": 10
	}
}
					*/
					break;
				case "actionPlayCard":
					/*
					{
	"name": "actionPlayCard",
	"description": "${actplayer} is choosing a card",
	"descriptionmyturn": "${you} must choose a card",
	"type": "activeplayer",
	"possibleactions": [
		"playCard"
	],
	"transitions": {
		"nextPlayer": 10,
		"zombiePass": 10
	}
}
					*/
					break;
				case "scoreTricks":
					/*
					{
	"name": "scoreTricks",
	"description": "Scoring tricks. Please wait...",
	"type": "game",
	"action": "stScoreTricks",
	"updateGameProgression": true,
	"transitions": {
		"setupHands": 2,
		"gameEnd": 99
	}
}
					*/
					break;
				case "actionSimultaneousBidding":
					/*
					{
	"name": "actionSimultaneousBidding",
	"description": "Players are bidding",
	"descriptionmyturn": "${you} must bid a number of tricks",
	"type": "multipleactiveplayer",
	"possibleactions": [
		"bid"
	],
	"args": "argsBidding",
	"transitions": {
		"done": 10,
		"dealerChange": 3,
		"zombiePass": 10
	}
}
					*/
					break;
				case "chooseTrump":
					/*
					{
	"name": "chooseTrump",
	"description": "${actplayer} is choosing the trump suit",
	"descriptionmyturn": "${you} must choose a trump suit",
	"type": "activeplayer",
	"possibleactions": [
		"chooseTrump"
	],
	"transitions": {
		"beginPlay": 4,
		"zombiePass": 10
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
		"actionBidding": 3,
		"actionPlayCard": 4,
		"scoreTricks": 5,
		"chooseTrump": 7,
		"loopback": 10
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
export default ohhell;
