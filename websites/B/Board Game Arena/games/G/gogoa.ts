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

const gogoa: GamePresence = {
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
		"": 5
	}
}
					*/
					break;
				case "multiChoosePlans":
					/*
					{
	"name": "multiChoosePlans",
	"description": "Waiting for player(s) to select tour plans.",
	"descriptionmyturn": "",
	"type": "multipleactiveplayer",
	"action": "st_multiChoosePlansStart",
	"possibleactions": [
		"chooseTourPlans",
		"undoChooseTourPlans",
		"zombiePass"
	],
	"transitions": {
		"done": 6
	}
}
					*/
					break;
				case "gameAfterChoosePlans":
					/*
					{
	"name": "gameAfterChoosePlans",
	"description": "",
	"type": "game",
	"action": "st_gameAfterChoosePlans",
	"updateGameProgression": false,
	"transitions": {
		"continue": 10
	}
}
					*/
					break;
				case "gameBeforeStartingPlayer":
					/*
					{
	"name": "gameBeforeStartingPlayer",
	"description": "",
	"type": "game",
	"action": "st_gameBeforeStartingPlayer",
	"updateGameProgression": true,
	"transitions": {
		"continue": 11
	}
}
					*/
					break;
				case "startingPlayer":
					/*
					{
	"name": "startingPlayer",
	"description": "${actplayer} must play first",
	"descriptionmyturn": "Choose a die for direction",
	"type": "activeplayer",
	"possibleactions": [
		"drawPath",
		"zombiePass"
	],
	"transitions": {
		"done": 20,
		"zombiePass": 20
	}
}
					*/
					break;
				case "gameBeforeMultiTurn":
					/*
					{
	"name": "gameBeforeMultiTurn",
	"description": "",
	"type": "game",
	"action": "st_gameBeforeMultiTurn",
	"updateGameProgression": false,
	"transitions": {
		"continue": 21
	}
}
					*/
					break;
				case "multiTurn":
					/*
					{
	"name": "multiTurn",
	"description": "Waiting for player(s) to finish.",
	"descriptionmyturn": "",
	"type": "multipleactiveplayer",
	"action": "st_multiTurnStart",
	"possibleactions": [
		"reserveDie",
		"drawPath",
		"undoDraw",
		"zombiePass"
	],
	"transitions": {
		"done": 22
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
	"action": "st_endRound",
	"updateGameProgression": false,
	"transitions": {
		"nextRound": 10,
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
export default gogoa;
