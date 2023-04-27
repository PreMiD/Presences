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

const thirteenclues: GamePresence = {
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
				case "selectCombinaison":
					/*
					{
	"name": "selectCombinaison",
	"descriptionmyturn": "${you} must select 1 Person, 1 Location and 1 Weapon",
	"type": "multipleactiveplayer",
	"action": "stSelectCombinaison",
	"possibleactions": [
		"selectCombinaison",
		"cancelCombinaison"
	],
	"transitions": {
		"": 3
	}
}
					*/
					break;
				case "assignCombinaison":
					/*
					{
	"name": "assignCombinaison",
	"description": "",
	"type": "game",
	"action": "stAssignCombinaison",
	"transitions": {
		"": 4
	}
}
					*/
					break;
				case "playerTurn":
					/*
					{
	"name": "playerTurn",
	"description": "${actplayer} must take an action",
	"descriptionmyturn": "${you} must take an action",
	"type": "activeplayer",
	"args": "argPlayerTurn",
	"updateGameProgression": true,
	"possibleactions": [
		"modifySheet",
		"questionWitness",
		"secretInformant",
		"makeAccusation"
	],
	"transitions": {
		"next_player": 5,
		"end": 90
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
	"transitions": {
		"": 4
	}
}
					*/
					break;
				case "gameOption":
					/*
					{
	"name": "gameOption",
	"description": "",
	"type": "game",
	"action": "stGameOption",
	"transitions": {
		"normal": 2,
		"fast": 4
	}
}
					*/
					break;
				case "beforeGameEnd":
					/*
					{
	"name": "beforeGameEnd",
	"description": "",
	"type": "game",
	"action": "stBeforeGameEnd",
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
export default thirteenclues;
