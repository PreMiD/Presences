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

const pontedeldiavolo: GamePresence = {
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
				case "setupPlayerFirst":
					/*
					{
	"name": "setupPlayerFirst",
	"description": "${actplayer} must play two tiles",
	"descriptionmyturn": "${you} must play two tiles",
	"type": "activeplayer",
	"possibleactions": [
		"playTile"
	],
	"transitions": {
		"playedTile": 3
	}
}
					*/
					break;
				case "setupPlayerFirstB":
					/*
					{
	"name": "setupPlayerFirstB",
	"description": "${actplayer} must play another tile",
	"descriptionmyturn": "${you} must play another tile",
	"type": "activeplayer",
	"possibleactions": [
		"playTile"
	],
	"transitions": {
		"playedTile": 4
	}
}
					*/
					break;
				case "setupNextPlayer":
					/*
					{
	"name": "setupNextPlayer",
	"type": "game",
	"action": "stSetupNextPlayer",
	"updateGameProgression": true,
	"transitions": {
		"nextTurn": 5
	}
}
					*/
					break;
				case "setupPlayerSecond":
					/*
					{
	"name": "setupPlayerSecond",
	"description": "${actplayer} must play two tiles or play as light",
	"descriptionmyturn": "${you} must play two tiles or ",
	"type": "activeplayer",
	"possibleactions": [
		"playTile",
		"playAsLight"
	],
	"transitions": {
		"playedTile": 7,
		"playAsLight": 8
	}
}
					*/
					break;
				case "setupStandardPlayerColours":
					/*
					{
	"name": "setupStandardPlayerColours",
	"type": "game",
	"action": "stSetupStandardPlayerColours",
	"updateGameProgression": true,
	"transitions": {
		"continue": 15
	}
}
					*/
					break;
				case "setupReversePlayerColours":
					/*
					{
	"name": "setupReversePlayerColours",
	"type": "game",
	"action": "stSetupReversePlayerColours",
	"updateGameProgression": true,
	"transitions": {
		"continue": 20
	}
}
					*/
					break;
				case "playerTurn":
					/*
					{
	"name": "playerTurn",
	"description": "${actplayer} must play two tiles or a bridge",
	"descriptionmyturn": "${you} must play two tiles or a bridge",
	"type": "activeplayer",
	"possibleactions": [
		"playTile",
		"playBridge"
	],
	"transitions": {
		"playedTile": 15,
		"playedBridge": 20
	}
}
					*/
					break;
				case "playerTurnNoTiles":
					/*
					{
	"name": "playerTurnNoTiles",
	"description": "${actplayer} must play a bridge or pass and trigger game end",
	"descriptionmyturn": "${you} must play a bridge or ",
	"type": "activeplayer",
	"possibleactions": [
		"playBridge",
		"passAndEndGame"
	],
	"transitions": {
		"playedBridge": 20,
		"passed": 20
	}
}
					*/
					break;
				case "playerTurnB":
					/*
					{
	"name": "playerTurnB",
	"description": "${actplayer} must play another tile",
	"descriptionmyturn": "${you} must play another tile",
	"type": "activeplayer",
	"possibleactions": [
		"playTile"
	],
	"transitions": {
		"playedTile": 20
	}
}
					*/
					break;
				case "nextPlayer":
					/*
					{
	"name": "nextPlayer",
	"type": "game",
	"action": "stNextPlayer",
	"updateGameProgression": true,
	"transitions": {
		"nextTurn": 10,
		"cantPlay": 11,
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
export default pontedeldiavolo;
