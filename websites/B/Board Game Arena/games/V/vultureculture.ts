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

const vultureculture: GamePresence = {
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
				case "selectCard":
					/*
					{
	"name": "selectCard",
	"description": "Other players must select a card to play",
	"descriptionmyturn": "You must select a card to play",
	"type": "multipleactiveplayer",
	"action": "stSelectCard",
	"possibleactions": [
		"selectCard"
	],
	"transitions": {
		"": 4
	}
}
					*/
					break;
				case "scoreRound":
					/*
					{
	"name": "scoreRound",
	"description": "Scoring the current Round",
	"type": "game",
	"action": "stScoreRound",
	"transitions": {
		"": 4
	}
}
					*/
					break;
				case "newRound":
					/*
					{
	"name": "newRound",
	"description": "Setting up a new round",
	"updateGameProgression": true,
	"type": "game",
	"action": "stNewRound",
	"transitions": {
		"continue": 2,
		"end": 5
	}
}
					*/
					break;
				case "endScoring":
					/*
					{
	"name": "endScoring",
	"description": "Final result",
	"updateGameProgression": true,
	"type": "game",
	"action": "stEndScoring",
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
export default vultureculture;
