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

const piratenkapern: GamePresence = {
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
				case "StartPlayerTurn":
					/*
					{
	"name": "StartPlayerTurn",
	"description": "Starting buccaneering quest",
	"descriptionmyturn": "Start your buccaneering quest",
	"type": "game",
	"action": "stStartPlayerTurn",
	"transitions": {
		"normalturn": 3,
		"moreskulls": 4
	}
}
					*/
					break;
				case "playerTurn":
					/*
					{
	"name": "playerTurn",
	"description": "${actplayer} must reroll or score",
	"descriptionmyturn": "Keep rolling or finsh your buccaneering quest",
	"type": "activeplayer",
	"action": "stPlayerTurn",
	"args": "argPlayerTurn",
	"possibleactions": [
		"roll",
		"score"
	],
	"transitions": {
		"turnover": 5,
		"score": 7
	}
}
					*/
					break;
				case "skullIsland":
					/*
					{
	"name": "skullIsland",
	"description": "${actplayer} must reroll to get more skulls",
	"descriptionmyturn": "You are on Skull Island. Try to get more skulls",
	"type": "activeplayer",
	"action": "stSkullIsland",
	"possibleactions": [
		"roll",
		"score"
	],
	"transitions": {
		"skullfinished": 6,
		"score": 7
	}
}
					*/
					break;
				case "EndPlayerTurn":
					/*
					{
	"name": "EndPlayerTurn",
	"description": "The turn is over",
	"descriptionmyturn": "Your turn is over",
	"type": "game",
	"action": "stEndPlayerTurn",
	"transitions": {
		"score": 7
	}
}
					*/
					break;
				case "EndSkullIsland":
					/*
					{
	"name": "EndSkullIsland",
	"description": "The turn is over",
	"descriptionmyturn": "Your turn on Skull Island is finished",
	"type": "game",
	"action": "stEndSkullIsland",
	"transitions": {
		"score": 7
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
		"continue": 2,
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
export default piratenkapern;
