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

const balloonpop: GamePresence = {
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
				case "RollDice":
					/*
					{
	"name": "RollDice",
	"description": "${actplayer} is rolling the dice",
	"descriptionmyturn": "${you} are rolling the dice",
	"type": "activeplayer",
	"action": "stRollDice",
	"args": "argRollDice",
	"possibleactions": [
		"Results",
		"RollDice"
	],
	"transitions": {
		"Results": 5,
		"RollDice2": 22
	}
}
					*/
					break;
				case "RollDice2":
					/*
					{
	"name": "RollDice2",
	"description": "${actplayer} is rolling the dice the second time",
	"descriptionmyturn": "${you} are rolling the dice the second time",
	"type": "activeplayer",
	"action": "stRollDice2",
	"args": "argRollDice2",
	"possibleactions": [
		"Results",
		"RollDice2"
	],
	"transitions": {
		"Results": 5,
		"RollDice3": 33
	}
}
					*/
					break;
				case "RollDice3":
					/*
					{
	"name": "RollDice3",
	"description": "Rolling the dice the third time",
	"descriptionmyturn": "Rolling the dice the third time",
	"type": "game",
	"action": "stRollDice3",
	"args": "argRollDice3",
	"possibleactions": [
		"Results"
	],
	"transitions": {
		"Results": 5
	}
}
					*/
					break;
				case "Results":
					/*
					{
	"name": "Results",
	"description": "Calculating the result...",
	"descriptionmyturn": "Calculating the result...",
	"type": "game",
	"action": "stResults",
	"args": "argResults",
	"possibleactions": [
		"NextPlayer",
		"Popped"
	],
	"transitions": {
		"NextPlayer": 6,
		"Popped": 7
	}
}
					*/
					break;
				case "NextPlayer":
					/*
					{
	"name": "NextPlayer",
	"description": "Calculating the result...",
	"descriptionmyturn": "Calculating the result...",
	"type": "game",
	"action": "stNextPlayer",
	"possibleactions": [
		"NextPlayer"
	],
	"transitions": {
		"NextPlayer": 2
	}
}
					*/
					break;
				case "Popped":
					/*
					{
	"name": "Popped",
	"description": "Balloons popped!",
	"descriptionmyturn": "Balloons popped!",
	"type": "game",
	"action": "stPopped",
	"transitions": {
		"NextPlayer": 2,
		"GameEnd": 99
	}
}
					*/
					break;
				case "Rolling2":
					/*
					{
	"name": "Rolling2",
	"description": "Rolling the dice the second time",
	"descriptionmyturn": "Rolling the dice the second time",
	"type": "game",
	"action": "stRolling2",
	"transitions": {
		"RollDice2": 3
	}
}
					*/
					break;
				case "Rolling3":
					/*
					{
	"name": "Rolling3",
	"description": "Rolling the dice the third time",
	"descriptionmyturn": "Rolling the dice the third time",
	"type": "game",
	"action": "stRolling3",
	"transitions": {
		"RollDice3": 4
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
export default balloonpop;
