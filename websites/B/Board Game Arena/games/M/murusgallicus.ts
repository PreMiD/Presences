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

const murusgallicus: GamePresence = {
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
				case "firstTurn":
					/*
					{
	"name": "firstTurn",
	"description": "${actplayer} must distribute a tower to the second row",
	"descriptionmyturn": "${you} must select a tower and two target squares do distribute the pieces",
	"type": "activeplayer",
	"action": "stFirstTurn",
	"args": "argFirstTurn",
	"possibleactions": [
		"confirm"
	],
	"transitions": {
		"confirm": 10,
		"skip": 4
	}
}
					*/
					break;
				case "colorswap":
					/*
					{
	"name": "colorswap",
	"description": "${actplayer} must choose a color to play with",
	"descriptionmyturn": "${you} must choose a color to play with",
	"type": "activeplayer",
	"possibleactions": [
		"keepcolor",
		"swapcolor"
	],
	"transitions": {
		"keep": 2,
		"swap": 10
	}
}
					*/
					break;
				case "playerTurn":
					/*
					{
	"name": "playerTurn",
	"description": "${actplayer} must move or sacrifice a tower",
	"descriptionmyturn": "${you} must move or sacrifice a tower",
	"type": "activeplayer",
	"action": "stPlayerTurn",
	"args": "argPlayerTurn",
	"updateGameProgression": true,
	"possibleactions": [
		"clicktower",
		"clickdestination"
	],
	"transitions": {
		"": 5
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
	"transitions": {
		"continue": 4,
		"gameend": 99
	}
}
					*/
					break;
				case "nextPlayerPie":
					/*
					{
	"name": "nextPlayerPie",
	"type": "game",
	"action": "stnextPlayerPie",
	"transitions": {
		"pie": 3,
		"start": 4,
		"second_move": 2
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
export default murusgallicus;
