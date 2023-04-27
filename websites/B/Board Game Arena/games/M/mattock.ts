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

const mattock: GamePresence = {
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
				case "setup":
					/*
					{
	"name": "setup",
	"description": "",
	"type": "game",
	"action": "stSetup",
	"updateGameProgression": false,
	"transitions": {
		"tunnel": 3,
		"tunnelWithMiner": 4
	}
}
					*/
					break;
				case "playerPlayTunnel":
					/*
					{
	"name": "playerPlayTunnel",
	"description": "${actplayer} must place a tile",
	"descriptionmyturn": "${you} must place a tile",
	"type": "activeplayer",
	"possibleactions": [
		"placeTunnel"
	],
	"args": "argPlaceTunnel",
	"transitions": {
		"placeTunnel": 5,
		"zombiePass": 7
	}
}
					*/
					break;
				case "playerPlayTunnelWithMiner":
					/*
					{
	"name": "playerPlayTunnelWithMiner",
	"description": "${actplayer} must place a tile with miner",
	"descriptionmyturn": "${you} must place a tile with miner",
	"type": "activeplayer",
	"possibleactions": [
		"placeTunnel"
	],
	"args": "argPlaceTunnel",
	"transitions": {
		"placeTunnel": 5,
		"zombiePass": 7
	}
}
					*/
					break;
				case "moveMinerOrNextPlayer":
					/*
					{
	"name": "moveMinerOrNextPlayer",
	"description": "",
	"type": "game",
	"action": "stMoveMinerOrNextPlayer",
	"updateGameProgression": false,
	"transitions": {
		"move": 6,
		"nextPlayer": 7
	}
}
					*/
					break;
				case "playerMoveMiner":
					/*
					{
	"name": "playerMoveMiner",
	"description": "${actplayer} may move a miner",
	"descriptionmyturn": "${you} may move a miner",
	"type": "activeplayer",
	"args": "argMoveMiner",
	"possibleactions": [
		"moveMiner",
		"pass",
		"undo"
	],
	"transitions": {
		"moveMiner": 7,
		"pass": 7,
		"undo": 2,
		"zombiePass": 7
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
		"nextPlayer": 3,
		"nextPlayerRemovedMiner": 4
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
export default mattock;
