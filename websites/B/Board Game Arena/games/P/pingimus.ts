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

const pingimus: GamePresence = {
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
				case "drawTasks":
					/*
					{
	"name": "drawTasks",
	"description": "",
	"type": "game",
	"action": "stDrawTasks",
	"transitions": {
		"paint": 3
	}
}
					*/
					break;
				case "paint":
					/*
					{
	"name": "paint",
	"description": "Other players are painting",
	"descriptionmyturn": "${you} have to paint the term \"${_private.task}\" (no letters/placeholders allowed!)",
	"type": "multipleactiveplayer",
	"args": "argPaint",
	"action": "stPaint",
	"possibleactions": [
		"picture"
	],
	"transitions": {
		"guess": 4
	}
}
					*/
					break;
				case "guess":
					/*
					{
	"name": "guess",
	"description": "Other players are guessing",
	"descriptionmyturn": "${you} have to guess the term for the picture",
	"type": "multipleactiveplayer",
	"args": "argGuess",
	"action": "stGuess",
	"possibleactions": [
		"guess"
	],
	"transitions": {
		"vote": 5
	}
}
					*/
					break;
				case "vote":
					/*
					{
	"name": "vote",
	"description": "Other players are voting (you may still group terms at the bottom)",
	"descriptionmyturn": "${you} have to vote for the best guess (and may group some terms at the bottom)",
	"type": "multipleactiveplayer",
	"args": "argVote",
	"action": "stVote",
	"possibleactions": [
		"vote",
		"union"
	],
	"transitions": {
		"next": 6
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
	"updateGameProgression": true,
	"transitions": {
		"endGame": 99,
		"nextPlayer": 4,
		"nextRound": 2
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
export default pingimus;
