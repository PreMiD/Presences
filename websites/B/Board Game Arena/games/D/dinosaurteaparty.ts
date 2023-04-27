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

const dinosaurteaparty: GamePresence = {
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
				case "playerTurn":
					/*
					{
	"name": "playerTurn",
	"description": "${actplayer} must ask about a trait to a player or guess a dinosaur of a player",
	"descriptionmyturn": "${you} must ask about a trait to a player or guess a dinosaur of a player",
	"type": "activeplayer",
	"possibleactions": [
		"askTrait",
		"guessDinosaur"
	],
	"transitions": {
		"playAgain": 10,
		"nextPlayer": 20,
		"correctGuess": 30
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
		"nextTurn": 10
	}
}
					*/
					break;
				case "correctGuess":
					/*
					{
	"name": "correctGuess",
	"description": "",
	"type": "game",
	"action": "stCorrectGuess",
	"updateGameProgression": true,
	"transitions": {
		"prepareEndGame": 90,
		"nextPlayer": 20
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
export default dinosaurteaparty;
