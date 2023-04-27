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

const alhambra: GamePresence = {
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
				case "initialMoney":
					/*
					{
	"name": "initialMoney",
	"description": "Everyone must accept initial money",
	"descriptionmyturn": "Everyone must accept initial money",
	"type": "multipleactiveplayer",
	"args": "argInitialMoney",
	"action": "stInitialMoney",
	"possibleactions": [
		"acceptMoney"
	],
	"transitions": {
		"": 10
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
		"playerTurn": 11,
		"notEnoughBuilding": 30
	}
}
					*/
					break;
				case "playerTurn":
					/*
					{
	"name": "playerTurn",
	"description": "${actplayer} must pick money, buy building or transform Alhambra",
	"descriptionmyturn": "${you} must pick money, buy building or transform Alhambra",
	"descriptionmyturngeneric": "${you} must pick money, buy building or transform Alhambra",
	"descriptionmyturnmoney": "${you} may take several money card with total value at most 5",
	"descriptionmyturnbuilding": "${you} must select money card(s) to pay the price of the building",
	"descriptionmyturnmoneyforbuilding": "${you} must select money card(s) and then select the building to buy",
	"type": "activeplayer",
	"args": "argPlayerTurn",
	"possibleactions": [
		"takeMoney",
		"buyBuilding",
		"placeBuilding",
		"restart"
	],
	"transitions": {
		"replay": 11,
		"endTurn": 40,
		"buildingToPlace": 12,
		"zombiePass": 10,
		"restart": 11
	}
}
					*/
					break;
				case "placeBuildings":
					/*
					{
	"name": "placeBuildings",
	"description": "${actplayer} must place new buildings",
	"descriptionmyturn": "${you} must place your new building(s) in your Alhambra or in your stock",
	"descriptionmyturndirk": "${you} must place your new building(s) in your Alhambra or in your stock or give them to neutral player",
	"type": "activeplayer",
	"args": "argPlaceBuilding",
	"possibleactions": [
		"placeBuilding",
		"restart"
	],
	"transitions": {
		"buildingToPlace": 12,
		"endTurn": 40,
		"zombiePass": 10,
		"restart": 11
	}
}
					*/
					break;
				case "lastBuildingsPick":
					/*
					{
	"name": "lastBuildingsPick",
	"description": "",
	"type": "game",
	"action": "stLastBuildingPick",
	"transitions": {
		"buildingToPlace": 31,
		"noMoreBuilding": 32
	}
}
					*/
					break;
				case "placeLastBuildings":
					/*
					{
	"name": "placeLastBuildings",
	"description": "Players who gains buildings must place them",
	"descriptionmyturn": "Last buildings: ${you} must place your new building in your Alhambra or in your stock",
	"type": "multipleactiveplayer",
	"args": "argPlaceLastBuilding",
	"possibleactions": [
		"placeBuilding"
	],
	"action": "stPlaceLastBuildings",
	"transitions": {
		"noMoreBuilding": 32
	}
}
					*/
					break;
				case "lastScoringRound":
					/*
					{
	"name": "lastScoringRound",
	"description": "",
	"type": "game",
	"action": "stLastScoringRound",
	"transitions": {
		"": 99
	}
}
					*/
					break;
				case "confirmTurn":
					/*
					{
	"name": "confirmTurn",
	"description": "${actplayer} must confirm or restart its turn",
	"descriptionmyturn": "${you} must confirm or restart your turn",
	"type": "activeplayer",
	"args": "argConfirmTurn",
	"possibleactions": [
		"restart",
		"confirm"
	],
	"transitions": {
		"restart": 11,
		"confirm": 10,
		"zombiePass": 10
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
export default alhambra;
