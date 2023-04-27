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

const lostseas: GamePresence = {
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
				case "initGame":
					/*
					{
	"name": "initGame",
	"type": "manager",
	"action": "stInitGame",
	"transitions": {
		"goCols": 5
	}
}
					*/
					break;
				case "setCols":
					/*
					{
	"name": "setCols",
	"type": "multipleactiveplayer",
	"description": "Other players are choosing goals",
	"descriptionmyturn": "${you} can flip and sort goals",
	"action": "stSetCols",
	"args": "argsSetCols",
	"updateGameProgression": true,
	"possibleactions": [
		"setCols"
	],
	"transitions": {
		"colsDone": 6
	}
}
					*/
					break;
				case "afterSetCols":
					/*
					{
	"name": "afterSetCols",
	"type": "manager",
	"action": "stAfterSetCols",
	"transitions": {
		"goRows": 7
	}
}
					*/
					break;
				case "setRows":
					/*
					{
	"name": "setRows",
	"type": "multipleactiveplayer",
	"description": "Other players are choosing goals",
	"descriptionmyturn": "${you} can flip and sort goals",
	"action": "stSetRows",
	"args": "argsSetRows",
	"updateGameProgression": true,
	"possibleactions": [
		"setRows"
	],
	"transitions": {
		"rowsDone": 8
	}
}
					*/
					break;
				case "afterSetRows":
					/*
					{
	"name": "afterSetRows",
	"type": "manager",
	"action": "stAfterSetRows",
	"transitions": {
		"setupDone": 10
	}
}
					*/
					break;
				case "initTurn":
					/*
					{
	"name": "initTurn",
	"type": "manager",
	"action": "stInitTurn",
	"transitions": {
		"goPlay": 15,
		"endGame": 99
	}
}
					*/
					break;
				case "playTile":
					/*
					{
	"name": "playTile",
	"type": "activeplayer",
	"action": "stPlayTile",
	"updateGameProgression": true,
	"description": "${actplayer} must choose the tile to place",
	"descriptionmyturn": "",
	"possibleactions": [
		"playTile"
	],
	"transitions": {
		"goDiscard": 16,
		"playDone": 20
	}
}
					*/
					break;
				case "discardTile":
					/*
					{
	"name": "discardTile",
	"type": "activeplayer",
	"action": "stDiscardTile",
	"updateGameProgression": true,
	"description": "${actplayer} must discard a tile",
	"descriptionmyturn": "",
	"possibleactions": [
		"discardTile"
	],
	"transitions": {
		"playDone": 20
	}
}
					*/
					break;
				case "endTurn":
					/*
					{
	"name": "endTurn",
	"type": "manager",
	"updateGameProgression": true,
	"action": "stEndTurn",
	"transitions": {
		"nextTurn": 10
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
export default lostseas;
