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

const rainbow: GamePresence = {
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
				case "playerTurn":
					/*
					{
	"name": "playerTurn",
	"description": "${actplayer} must play a card or flip a card on the table.",
	"descriptionmyturn": "${you} must play a card or flip a card on the table.",
	"type": "activeplayer",
	"args": "argplayerTurn",
	"possibleactions": [
		"Play",
		"PlayFlipped",
		"Pass",
		"Flip"
	],
	"transitions": {
		"playCard": 2,
		"pass": 3,
		"GameEnd": 99,
		"pass2": 4
	}
}
					*/
					break;
				case "NextPlayer":
					/*
					{
	"name": "NextPlayer",
	"description": "Next Turn...",
	"type": "game",
	"action": "stNextPlayer",
	"updateGameProgression": true,
	"transitions": {
		"NextPlayer": 2
	}
}
					*/
					break;
				case "NextPlayer2":
					/*
					{
	"name": "NextPlayer2",
	"description": "Next Turn...",
	"type": "game",
	"action": "stNextPlayer2",
	"updateGameProgression": true,
	"transitions": {
		"NextPlayer": 2
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
export default rainbow;
