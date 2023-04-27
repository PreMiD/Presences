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

const railroadink: GamePresence = {
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
				case "useDice":
					/*
					{
	"name": "useDice",
	"description": "Other players must use all dice",
	"descriptionmyturn": "${you} must use all dice and can draw special route",
	"type": "multipleactiveplayer",
	"possibleactions": [
		"drawRoute",
		"doneUseDice",
		"undoUseDice",
		"restartUseDice"
	],
	"transitions": {
		"nextRound": 3
	},
	"action": "stUseDice",
	"args": "argUseDice"
}
					*/
					break;
				case "checkEndGame":
					/*
					{
	"name": "checkEndGame",
	"type": "game",
	"action": "stCheckGameEnd",
	"transitions": {
		"end": 99,
		"nextRound": 5
	}
}
					*/
					break;
				case "prepareRound":
					/*
					{
	"name": "prepareRound",
	"type": "game",
	"action": "stPrepareRound",
	"transitions": {
		"useDice": 2,
		"decideMeteor": 10,
		"decideMeteorCancel": 11
	}
}
					*/
					break;
				case "decideMeteor":
					/*
					{
	"name": "decideMeteor",
	"description": "Other players must decide if and where will meteor strike",
	"descriptionmyturn": "${you} must decide if and where will meteor strike (select special route to prevent)",
	"type": "multipleactiveplayer",
	"possibleactions": [
		"decideMeteor",
		"decidePrevent"
	],
	"transitions": {
		"useDice": 2
	},
	"action": "stDecideMeteor",
	"args": "argDecideMeteor"
}
					*/
					break;
				case "decideMeteorCancel":
					/*
					{
	"name": "decideMeteorCancel",
	"description": "Other players must decide if meteor will strike",
	"descriptionmyturn": "${you} must decide if meteor will strike (select special route to prevent)",
	"type": "multipleactiveplayer",
	"possibleactions": [
		"decideMeteor",
		"decidePrevent",
		"allowMeteor"
	],
	"transitions": {
		"useDice": 2
	},
	"action": "stDecideMeteor",
	"args": "argDecideMeteor"
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
export default railroadink;
