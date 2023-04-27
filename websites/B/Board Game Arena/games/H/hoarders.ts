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

const hoarders: GamePresence = {
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
				case "choosingCards":
					/*
					{
	"name": "choosingCards",
	"description": "Others must choose 2 cards for the round",
	"descriptionmyturn": "${you} must choose 2 cards for the round",
	"type": "multipleactiveplayer",
	"action": "stMultiPlayerInit",
	"possibleactions": [
		"chooseCard",
		"confirmCards",
		"removeCards"
	],
	"transitions": {
		"confirmCards": 3
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
		"": 4
	}
}
					*/
					break;
				case "playingCards":
					/*
					{
	"name": "playingCards",
	"description": "${actplayer} must play a card",
	"descriptionmyturn": "${you} must play a card",
	"type": "activeplayer",
	"updateGameProgression": true,
	"possibleactions": [
		"playCard",
		"playRaccoon"
	],
	"transitions": {
		"playCard": 5,
		"playRaccoon": 7,
		"zombiePass": 5
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
		"nextPlayer": 4,
		"endRound": 6,
		"endGame": 99
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
	"updateGameProgression": true,
	"transitions": {
		"": 2
	}
}
					*/
					break;
				case "chooseNutCard":
					/*
					{
	"name": "chooseNutCard",
	"description": "${actplayer} must choose a card to steal",
	"descriptionmyturn": "${you} must choose a card to steal",
	"type": "activeplayer",
	"possibleactions": [
		"chooseNutCard"
	],
	"transitions": {
		"chooseNutCard": 8,
		"zombiePass": 5
	}
}
					*/
					break;
				case "setupDefense":
					/*
					{
	"name": "setupDefense",
	"description": "",
	"type": "game",
	"action": "stSetUpDefense",
	"transitions": {
		"canDefend": 9,
		"noDefense": 11
	}
}
					*/
					break;
				case "defendOrAllow":
					/*
					{
	"name": "defendOrAllow",
	"description": "${actplayer} must play Hamster or allow theft",
	"descriptionmyturn": "${you} must play Hamster or allow theft",
	"type": "activeplayer",
	"args": "argDefenseInfos",
	"possibleactions": [
		"defend",
		"allowTheft"
	],
	"transitions": {
		"notZombie": 10,
		"zombiePass": 11
	}
}
					*/
					break;
				case "resetActivePlayer":
					/*
					{
	"name": "resetActivePlayer",
	"description": "",
	"type": "game",
	"action": "stResetActivePlayer",
	"transitions": {
		"": 5
	}
}
					*/
					break;
				case "noDefense":
					/*
					{
	"name": "noDefense",
	"description": "",
	"type": "game",
	"action": "stNoDefense",
	"transitions": {
		"": 10
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
export default hoarders;
