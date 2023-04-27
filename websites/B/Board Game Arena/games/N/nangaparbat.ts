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

const nangaparbat: GamePresence = {
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
				case "guideSetup":
					/*
					{
	"name": "guideSetup",
	"description": "${actplayer} must pick a region for the guide",
	"descriptionmyturn": "${you} must pick the guide's starting region for your opponent",
	"type": "activeplayer",
	"args": "argGuideSetup",
	"possibleactions": [
		"placeGuide"
	],
	"transitions": {
		"placeGuide": 11
	}
}
					*/
					break;
				case "playerTurn":
					/*
					{
	"name": "playerTurn",
	"description": "${actplayer} must select an animal to trap and then score or pass",
	"descriptionmyturn": "${you} must select an animal in the guide's region to trap",
	"type": "activeplayer",
	"args": "argPlayerTurn",
	"possibleactions": [
		"trapAnimal",
		"activateAnimal",
		"placeGuide",
		"buildTrade",
		"skipBuildTrade",
		"cancel",
		"buildCamp",
		"tradeAnimalsDifferent",
		"tradeAnimalsSame",
		"swapHikers",
		"swapHikerAndAnimal",
		"swapAnimals",
		"cancelActivation",
		"cancelPointsChart",
		"zombiePass"
	],
	"transitions": {
		"trapAnimal": 10,
		"activateAnimal": 10,
		"placeGuide": 10,
		"buildTrade": 10,
		"skipBuildTrade": 11,
		"buildCamp": 11,
		"tradeAnimalsDifferent": 11,
		"tradeAnimalsSame": 11,
		"swapHikers": 10,
		"swapHikerAndAnimal": 10,
		"swapAnimals": 10,
		"cancel": 10,
		"cancelActivation": 10,
		"cancelPointsChart": 10,
		"zombiePass": 11
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
		"endGame": 12,
		"nextPlayer": 10
	}
}
					*/
					break;
				case "finalScoring":
					/*
					{
	"name": "finalScoring",
	"description": "",
	"type": "game",
	"action": "stFinalScoring",
	"updateGameProgression": true,
	"transitions": {
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
export default nangaparbat;
