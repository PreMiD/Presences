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

const troyesdice: GamePresence = {
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
				case "chooseDice":
					/*
					{
	"name": "chooseDice",
	"description": "Others must choose a die and perform an action",
	"descriptionmyturn": "${you} must choose a die",
	"type": "multipleactiveplayer",
	"action": "stChooseDice",
	"args": "argChooseDie",
	"possibleactions": [
		"chooseDie",
		"chooseResourceToPay",
		"gainResources",
		"buildBuilding",
		"chooseCitizen",
		"undo",
		"modifyDieColor",
		"modifyDieValue"
	],
	"transitions": {
		"setupRound": 3
	}
}
					*/
					break;
				case "setupRound":
					/*
					{
	"name": "setupRound",
	"type": "game",
	"action": "stSetupRound",
	"transitions": {
		"chooseDice": 2,
		"score": 4
	},
	"updateGameProgression": true
}
					*/
					break;
				case "score":
					/*
					{
	"name": "score",
	"type": "game",
	"action": "stScore",
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
export default troyesdice;
