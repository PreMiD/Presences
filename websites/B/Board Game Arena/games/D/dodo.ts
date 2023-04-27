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

const dodo: GamePresence = {
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
				case "selectChecker":
					/*
					{
	"name": "selectChecker",
	"description": "${actplayer} must select a checker to move.",
	"descriptionmyturn": "${you} must select a checker to move.",
	"type": "activeplayer",
	"args": "argSelectChecker",
	"possibleactions": [
		"selectChecker"
	],
	"transitions": {
		"selectChecker": 3
	}
}
					*/
					break;
				case "selectDestination":
					/*
					{
	"name": "selectDestination",
	"description": "${actplayer} must select a destination for the selected checker.",
	"descriptionmyturn": "${you} must select a destination for the selected checker.",
	"type": "activeplayer",
	"args": "argSelectDestination",
	"possibleactions": [
		"unselectChecker",
		"selectDestination"
	],
	"transitions": {
		"unselectChecker": 2,
		"selectDestination": 4
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
export default dodo;
