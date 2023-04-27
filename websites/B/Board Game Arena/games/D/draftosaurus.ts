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

const draftosaurus: GamePresence = {
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
				case "nextTurn":
					/*
					{
	"name": "nextTurn",
	"type": "game",
	"action": "nextTurn",
	"transitions": {
		"gameEnd": 7,
		"newHands": 3,
		"quarantine": 5,
		"switchBoard": 8
	}
}
					*/
					break;
				case "placeDinos":
					/*
					{
	"name": "placeDinos",
	"description": "Waiting for everyone else to place their dinosaur",
	"descriptionmyturn": "${you} must place a dinosaur into <span id=\"pen-desc\">${dieDescription}</span> ${dieDiv}",
	"type": "multipleactiveplayer",
	"updateGameProgression": true,
	"args": "dieArgs",
	"possibleactions": [
		"everyoneSelected",
		"selectPlace"
	],
	"transitions": {
		"everyoneSelected": 9
	}
}
					*/
					break;
				case "discardDinos":
					/*
					{
	"name": "discardDinos",
	"description": "Waiting for your opponent to discard one dino",
	"descriptionmyturn": "${you} must discard one dino",
	"type": "multipleactiveplayer",
	"action": "startDiscard",
	"updateGameProgression": true,
	"possibleactions": [
		"everyoneDiscarded",
		"selectDiscard"
	],
	"transitions": {
		"everyoneDiscarded": 2
	}
}
					*/
					break;
				case "quarantinePlace":
					/*
					{
	"name": "quarantinePlace",
	"description": "Everyone must place the dino from their Quarantine Zone",
	"descriptionmyturn": "${you} must must place the dino from Quarantine Zone",
	"type": "multipleactiveplayer",
	"action": "quarantineToHand",
	"updateGameProgression": true,
	"possibleactions": [
		"everyoneSelected",
		"selectPlace"
	],
	"transitions": {
		"everyoneSelected": 6
	}
}
					*/
					break;
				case "qBufferPlace":
					/*
					{
	"name": "qBufferPlace",
	"type": "game",
	"action": "bufferToPens",
	"transitions": {
		"placed": 7
	}
}
					*/
					break;
				case "countScores":
					/*
					{
	"name": "countScores",
	"type": "game",
	"action": "finalCounting",
	"transitions": {
		"end": 99
	}
}
					*/
					break;
				case "switchBoard":
					/*
					{
	"name": "switchBoard",
	"type": "game",
	"action": "switchBoard",
	"transitions": {
		"done": 2
	}
}
					*/
					break;
				case "bufferPlace":
					/*
					{
	"name": "bufferPlace",
	"type": "game",
	"action": "bufferToPens",
	"transitions": {
		"placed": 2,
		"2pdiscard": 4
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
export default draftosaurus;
