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

const artthief: GamePresence = {
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
				case "playCard":
					/*
					{
	"name": "playCard",
	"description": "${actplayer} must play a card",
	"descriptionmyturn": "${you} must play a card",
	"type": "activeplayer",
	"args": "argPlayCard",
	"possibleactions": [
		"playCard"
	],
	"transitions": {
		"moveThief": 3,
		"flipCard": 4,
		"noMoveAndFlip": 4,
		"noMoveAndNoFlip": 5,
		"nextTurn": 5,
		"zombiePass": 99
	}
}
					*/
					break;
				case "moveThief":
					/*
					{
	"name": "moveThief",
	"description": "${actplayer} may move ${c}${thief}${e} (${spaces_left}/${nb} spaces left)",
	"descriptionmyturn": "${you} may move ${c}${thief}${e} (${spaces_left}/${nb} spaces left)",
	"type": "activeplayer",
	"args": "argMoveThief",
	"possibleactions": [
		"moveThief"
	],
	"transitions": {
		"moveLeft": 3,
		"flipCard": 4,
		"nextTurn": 5,
		"endGame": 99,
		"zombiePass": 99
	}
}
					*/
					break;
				case "flipCard":
					/*
					{
	"name": "flipCard",
	"description": "${actplayer} must flip a card with ${item_symbol}",
	"descriptionmyturn": "${you} must flip a card with ${item_symbol}",
	"type": "activeplayer",
	"args": "argFlipCard",
	"possibleactions": [
		"flipCard"
	],
	"transitions": {
		"moveThief": 3,
		"nextTurn": 5,
		"zombiePass": 99
	}
}
					*/
					break;
				case "nextTurn":
					/*
					{
	"name": "nextTurn",
	"description": "",
	"type": "game",
	"action": "stNextTurn",
	"updateGameProgression": true,
	"transitions": {
		"nextTurn": 2,
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
export default artthief;
