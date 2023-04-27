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

const seikatsu: GamePresence = {
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
				case "modeCheck":
					/*
					{
	"name": "modeCheck",
	"description": "",
	"type": "game",
	"action": "stModeCheck",
	"transitions": {
		"normal": 3,
		"solo": 11
	}
}
					*/
					break;
				case "playerTurn":
					/*
					{
	"name": "playerTurn",
	"description": "${actplayer} must place a tile",
	"descriptionmyturn": "${you} must place a tile",
	"type": "activeplayer",
	"args": "argPlayerTurn",
	"possibleactions": [
		"placeTile"
	],
	"transitions": {
		"placeTile": 4,
		"zombiePass": 4
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
		"nextPlayer": 3,
		"endGame": 99
	}
}
					*/
					break;
				case "soloFirstTile":
					/*
					{
	"name": "soloFirstTile",
	"description": "${actplayer} must place the first tile",
	"descriptionmyturn": "${you} must place the first tile",
	"type": "activeplayer",
	"args": "argSoloFirstTile",
	"possibleactions": [
		"soloFirstTile"
	],
	"transitions": {
		"soloFirstTile": 12
	}
}
					*/
					break;
				case "soloSecondTile":
					/*
					{
	"name": "soloSecondTile",
	"description": "${actplayer} must place the second tile",
	"descriptionmyturn": "${you} must place the second tile",
	"type": "activeplayer",
	"args": "argSoloSecondTile",
	"possibleactions": [
		"soloSecondTile"
	],
	"transitions": {
		"soloSecondTile": 14,
		"soloKoiChoice": 13
	}
}
					*/
					break;
				case "soloKoiChoice":
					/*
					{
	"name": "soloKoiChoice",
	"description": "${actplayer} is choosing a tile to keep",
	"descriptionmyturn": "${you} may choose a tile to keep",
	"type": "activeplayer",
	"args": "argSoloKoiChoice",
	"possibleactions": [
		"soloKeepTile",
		"soloDiscardHand"
	],
	"transitions": {
		"soloNextTurn": 14
	}
}
					*/
					break;
				case "soloNextTurn":
					/*
					{
	"name": "soloNextTurn",
	"description": "",
	"type": "game",
	"action": "stSoloNextTurn",
	"updateGameProgression": true,
	"transitions": {
		"nextTurn": 11,
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
export default seikatsu;
