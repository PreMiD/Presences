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

const splito: GamePresence = {
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
		"turn": 10
	}
}
					*/
					break;
				case "turn":
					/*
					{
	"name": "turn",
	"description": "Other players must play a card",
	"descriptionmyturn": "${you} must play a card to the left or right",
	"type": "multipleactiveplayer",
	"action": "stMakeEveryoneActive",
	"possibleactions": [
		"play"
	],
	"transitions": {
		"endTurn": 20
	},
	"updateGameProgression": true
}
					*/
					break;
				case "endTurn":
					/*
					{
	"name": "endTurn",
	"description": "Handing over cards and calculating scores ...",
	"type": "game",
	"action": "stEndTurn",
	"transitions": {
		"turn": 10,
		"gameEnd": 99
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
export default splito;
