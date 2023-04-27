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

const buttons: GamePresence = {
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
				case "playerTurn":
					/*
					{
	"name": "playerTurn",
	"description": "${actplayer} is choosing whether to roll the dice",
	"descriptionmyturn": "${you} must: ",
	"type": "activeplayer",
	"args": "argChooseOption",
	"possibleactions": [
		"choice"
	],
	"transitions": {
		"": 3
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
		"chooseDice": 4,
		"nextPlayer": 2,
		"endRound": 10
	}
}
					*/
					break;
				case "placeButton":
					/*
					{
	"name": "placeButton",
	"description": "Players are choosing whether to place a button",
	"descriptionmyturn": "${you} must place a button",
	"type": "multipleactiveplayer",
	"args": "argPlaceButton",
	"possibleactions": [
		"placeButton",
		"pass"
	],
	"transitions": {
		"": 3
	}
}
					*/
					break;
				case "roundEnd":
					/*
					{
	"name": "roundEnd",
	"description": "",
	"type": "game",
	"action": "stRoundEnd",
	"updateGameProgression": true,
	"transitions": {
		"allocateStars": 20,
		"nextRound": 2,
		"endGame": 99
	}
}
					*/
					break;
				case "placeStar":
					/*
					{
	"name": "placeStar",
	"description": "Players are allocating their star(s)",
	"descriptionmyturn": "${you} must allocate your star(s)",
	"type": "multipleactiveplayer",
	"possibleactions": [
		"allocateStar"
	],
	"transitions": {
		"continue": 20,
		"endAllocation": 10
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
export default buttons;
