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

const fruitpicking: GamePresence = {
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
		"": 3
	}
}
					*/
					break;
				case "skipCheck":
					/*
					{
	"name": "skipCheck",
	"description": "",
	"type": "game",
	"action": "skipCheck",
	"transitions": {
		"play": 3,
		"skip": 6
	}
}
					*/
					break;
				case "plantTurn":
					/*
					{
	"name": "plantTurn",
	"description": "${actplayer} must select a farm and plant seeds",
	"descriptionmyturn": "${you} must select a farm and plant seeds",
	"type": "activeplayer",
	"args": "argPlantTurn",
	"possibleactions": [
		"plantSeed"
	],
	"transitions": {
		"additionalPlant": 2,
		"endPlant": 4,
		"zombiePass": 6
	}
}
					*/
					break;
				case "farmCheck":
					/*
					{
	"name": "farmCheck",
	"description": "",
	"type": "game",
	"action": "farmCheck",
	"transitions": {
		"option": 5,
		"endTurn": 6
	}
}
					*/
					break;
				case "farmTurn":
					/*
					{
	"name": "farmTurn",
	"description": "${actplayer} must choose the action of ${farm_name}",
	"descriptionmyturn": "${you} must choose the action of ${farm_name}",
	"type": "activeplayer",
	"args": "argFarmTurn",
	"possibleactions": [
		"waterPlant",
		"collectCard"
	],
	"transitions": {
		"endTurn": 6,
		"zombiePass": 6
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
		"nextPlayer": 2
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
export default fruitpicking;
