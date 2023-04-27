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

const skull: GamePresence = {
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
		"": 12
	}
}
					*/
					break;
				case "playerTurn":
					/*
					{
	"name": "playerTurn",
	"description": "${actplayer} must play a disc or issue a challenge",
	"descriptionmyturn": "${you} must play a disc or issue a challenge",
	"type": "activeplayer",
	"args": "argPlayerTurn",
	"possibleactions": [
		"play",
		"bid"
	],
	"transitions": {
		"play": 10,
		"bid": 11,
		"reveal": 4,
		"zombiePass": 10
	}
}
					*/
					break;
				case "bidTurn":
					/*
					{
	"name": "bidTurn",
	"description": "${actplayer} must increase the bid or pass",
	"descriptionmyturn": "${you} must increase the bid or pass",
	"type": "activeplayer",
	"args": "argBidTurn",
	"possibleactions": [
		"bid"
	],
	"transitions": {
		"bid": 11,
		"reveal": 4,
		"zombiePass": 11
	}
}
					*/
					break;
				case "reveal":
					/*
					{
	"name": "reveal",
	"description": "${actplayer} must reveal ${num} disc(s)",
	"descriptionmyturn": "${you} must reveal ${num} disc(s)",
	"type": "activeplayer",
	"args": "argReveal",
	"action": "stReveal",
	"possibleactions": [
		"reveal"
	],
	"transitions": {
		"rose": 4,
		"skull": 4,
		"next": 12,
		"selfSkull": 6,
		"gameEnd": 99,
		"zombiePass": 12
	}
}
					*/
					break;
				case "initialCoaster":
					/*
					{
	"name": "initialCoaster",
	"description": "Other players must play a disc",
	"descriptionmyturn": "${you} must play a disc",
	"type": "multipleactiveplayer",
	"args": "argPlayerTurn",
	"possibleactions": [
		"play"
	],
	"transitions": {
		"done": 13,
		"zombiePass": 13
	}
}
					*/
					break;
				case "discardCoaster":
					/*
					{
	"name": "discardCoaster",
	"description": "${actplayer} must discard a disc",
	"descriptionmyturn": "${you} must discard a disc",
	"type": "activeplayer",
	"action": "stDiscardCoaster",
	"possibleactions": [
		"play"
	],
	"transitions": {
		"play": 7,
		"zombiePass": 7
	}
}
					*/
					break;
				case "chooseStartPlayer":
					/*
					{
	"name": "chooseStartPlayer",
	"description": "${actplayer} must choose a start player for the next round",
	"descriptionmyturn": "${you} must choose a start player for the next round",
	"type": "activeplayer",
	"action": "stChooseStartPlayer",
	"possibleactions": [
		"choosePlayer"
	],
	"transitions": {
		"choosePlayer": 12,
		"zombiePass": 12
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
	"updateGameProgression": true,
	"transitions": {
		"next": 2
	}
}
					*/
					break;
				case "nextBidPlayer":
					/*
					{
	"name": "nextBidPlayer",
	"type": "game",
	"action": "stNextBidPlayer",
	"updateGameProgression": true,
	"transitions": {
		"next": 3,
		"reveal": 4
	}
}
					*/
					break;
				case "preInitial":
					/*
					{
	"name": "preInitial",
	"type": "game",
	"action": "stSetAllMultiactive",
	"transitions": {
		"next": 5,
		"gameEnd": 99
	}
}
					*/
					break;
				case "preRound":
					/*
					{
	"name": "preRound",
	"type": "game",
	"action": "stSetCurrentPlayer",
	"transitions": {
		"": 2
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
export default skull;
