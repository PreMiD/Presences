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

const anachrony: GamePresence = {
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
				case "selection":
					/*
					{
	"name": "selection",
	"description": "${actplayer} must choose a leader",
	"descriptionmyturn": "${you} must choose a leader",
	"type": "activeplayer",
	"args": "argSelection",
	"possibleactions": [
		"select"
	],
	"transitions": {
		"next": 3,
		"zombiePass": 3
	}
}
					*/
					break;
				case "selectioNext":
					/*
					{
	"name": "selectioNext",
	"description": "",
	"type": "game",
	"action": "stSelectionNext",
	"transitions": {
		"next": 2,
		"setup": 4
	}
}
					*/
					break;
				case "setup":
					/*
					{
	"name": "setup",
	"description": "",
	"type": "game",
	"action": "stSetup",
	"args": "argSetup",
	"transitions": {
		"next": 6
	}
}
					*/
					break;
				case "playerTurn":
					/*
					{
	"name": "playerTurn",
	"description": "${actplayer} must take an action or Pass",
	"descriptionmyturn": "${you} must take an action or pass",
	"type": "activeplayer",
	"args": "argPlayerTurn",
	"possibleactions": [
		"select"
	],
	"transitions": {
		"next": 6,
		"zombiePass": 6
	}
}
					*/
					break;
				case "pending":
					/*
					{
	"name": "pending",
	"description": "",
	"type": "game",
	"action": "stPending",
	"updateGameProgression": true,
	"transitions": {
		"next": 7,
		"player": 5,
		"same": 6,
		"vortex": 8
	}
}
					*/
					break;
				case "cleanup":
					/*
					{
	"name": "cleanup",
	"description": "",
	"type": "game",
	"action": "stCleanup",
	"transitions": {
		"next": 6,
		"end": 99
	}
}
					*/
					break;
				case "vortex":
					/*
					{
	"name": "vortex",
	"type": "multipleactiveplayer",
	"description": "4. Warp phase : Other players may choose up to 2 warp tiles",
	"descriptionmyturn": "4. Warp phase : ${you} may choose up to 2 warp tiles",
	"possibleactions": [
		"vortex"
	],
	"transitions": {
		"next": 6,
		"zombiePass": 6
	}
}
					*/
					break;
				case "dummy":
					/*
					{
	"name": "dummy",
	"description": "${actplayer} must take an action or Pass",
	"descriptionmyturn": "${you} must take an action or pass",
	"type": "activeplayer",
	"possibleactions": [
		"select"
	],
	"transitions": {
		"next": 6,
		"zombiePass": 6
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
export default anachrony;
