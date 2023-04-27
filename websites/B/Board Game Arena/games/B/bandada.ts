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

const bandada: GamePresence = {
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
				case "drawCard":
					/*
					{
	"name": "drawCard",
	"description": "${actplayer} must select a card",
	"descriptionmyturn": "${you} must select a card",
	"type": "activeplayer",
	"possibleactions": [
		"drawCard"
	],
	"transitions": {
		"changeDice": 10,
		"zombiePass": 88
	}
}
					*/
					break;
				case "changeDice1":
					/*
					{
	"name": "changeDice1",
	"description": "${actplayer} must ${action}",
	"descriptionmyturn": "${you} must ${action}",
	"args": "argChangeDice",
	"type": "activeplayer",
	"possibleactions": [
		"changeDice"
	],
	"transitions": {
		"changeNextDice": 11,
		"scoreRound": 20,
		"nextPlayer": 30,
		"zombiePass": 88
	}
}
					*/
					break;
				case "changeDice2":
					/*
					{
	"name": "changeDice2",
	"description": "${actplayer} must ${action}",
	"descriptionmyturn": "${you} must ${action}",
	"args": "argChangeDice",
	"type": "activeplayer",
	"possibleactions": [
		"changeDice"
	],
	"transitions": {
		"changeNextDice": 12,
		"scoreRound": 20,
		"nextPlayer": 30,
		"zombiePass": 88
	}
}
					*/
					break;
				case "changeDice3":
					/*
					{
	"name": "changeDice3",
	"description": "${actplayer} must ${action}",
	"descriptionmyturn": "${you} must ${action}",
	"args": "argChangeDice",
	"type": "activeplayer",
	"possibleactions": [
		"changeDice"
	],
	"transitions": {
		"scoreRound": 20,
		"nextPlayer": 30,
		"zombiePass": 88
	}
}
					*/
					break;
				case "scoreRound":
					/*
					{
	"name": "scoreRound",
	"description": "score the round",
	"type": "game",
	"action": "stScoreRound",
	"updateGameProgression": true,
	"transitions": {
		"drawCard": 2,
		"gameEnd": 99
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
		"drawCard": 2
	}
}
					*/
					break;
				case "zombiePass":
					/*
					{
	"name": "zombiePass",
	"description": "",
	"type": "game",
	"action": "stZombiePass",
	"transitions": {
		"scoreRound": 20,
		"nextPlayer": 30
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
export default bandada;
