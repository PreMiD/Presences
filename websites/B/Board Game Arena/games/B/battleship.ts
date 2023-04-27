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

const battleship: GamePresence = {
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
				case "playerTurnPlace":
					/*
					{
	"name": "playerTurnPlace",
	"description": "Other player must place ships",
	"descriptionmyturn": "${you} must place ships (click on YOUR SHIPS board to place)",
	"type": "multipleactiveplayer",
	"action": "st_MultiPlayerInit",
	"args": "arg_playerTurnPlace",
	"possibleactions": [
		"playPlace"
	],
	"transitions": {
		"next": 4,
		"last": 99
	}
}
					*/
					break;
				case "playerTurnAttack":
					/*
					{
	"name": "playerTurnAttack",
	"description": "${actplayer} must select a grid to fire",
	"descriptionmyturn": "${you} must select a grid to fire",
	"type": "activeplayer",
	"args": "arg_playerTurnAttack",
	"possibleactions": [
		"playAttack",
		"playBot"
	],
	"transitions": {
		"next": 4,
		"last": 99
	}
}
					*/
					break;
				case "gameTurnNextPlayer":
					/*
					{
	"name": "gameTurnNextPlayer",
	"description": "Fire!!!",
	"type": "game",
	"action": "st_gameTurnNextPlayer",
	"updateGameProgression": true,
	"transitions": {
		"last": 99,
		"next": 3
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
export default battleship;
