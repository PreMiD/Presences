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

const amyitis: GamePresence = {
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
	"description": "Game setup",
	"type": "manager",
	"action": "stGameSetup",
	"transitions": {
		"": 2
	}
}
					*/
					break;
				case "newTurn":
					/*
					{
	"name": "newTurn",
	"description": "",
	"type": "game",
	"action": "stNewTurn",
	"updateGameProgression": true,
	"transitions": {
		"newTurn": 10,
		"endGame": 98
	}
}
					*/
					break;
				case "playerAction":
					/*
					{
	"name": "playerAction",
	"description": "${actplayer} must recruit, pass or move the caravan",
	"descriptionmyturn": "${you} must recruit, pass or move the caravan",
	"type": "activeplayer",
	"action": "stPlayerAction",
	"possibleactions": [
		"recruit",
		"pass",
		"movecaravan"
	],
	"transitions": {
		"recruitFarmer": 11,
		"recruitEngineer": 12,
		"recruitPriest": 13,
		"recruitMerchant": 30,
		"pass": 30,
		"caravanSell": 20,
		"caravanCard": 21,
		"caravanGarden": 22
	}
}
					*/
					break;
				case "recruitFarmer":
					/*
					{
	"name": "recruitFarmer",
	"description": "${actplayer} must choose a field",
	"descriptionmyturn": "${you} must choose a field",
	"type": "activeplayer",
	"possibleactions": [
		"chooseField"
	],
	"transitions": {
		"chooseField": 30
	}
}
					*/
					break;
				case "recruitEngineer":
					/*
					{
	"name": "recruitEngineer",
	"description": "${actplayer} must build an irrigation",
	"descriptionmyturn": "${you} must build an irrigation",
	"type": "activeplayer",
	"action": "stRecruitEngineer",
	"possibleactions": [
		"chooseIrrigation"
	],
	"transitions": {
		"chooseIrrigation": 30,
		"zombiePass": 30
	}
}
					*/
					break;
				case "recruitPriest":
					/*
					{
	"name": "recruitPriest",
	"description": "${actplayer} must choose a temple",
	"descriptionmyturn": "${you} must choose a temple",
	"type": "activeplayer",
	"possibleactions": [
		"chooseTemple"
	],
	"transitions": {
		"chooseTemple": 30
	}
}
					*/
					break;
				case "recruitEngineerNoPoints":
					/*
					{
	"name": "recruitEngineerNoPoints",
	"description": "${actplayer} must build an irrigation",
	"descriptionmyturn": "${you} must build an irrigation",
	"type": "activeplayer",
	"action": "stRecruitEngineer",
	"possibleactions": [
		"chooseIrrigation"
	],
	"transitions": {
		"chooseIrrigation": 30,
		"zombiePass": 30
	}
}
					*/
					break;
				case "caravanSell":
					/*
					{
	"name": "caravanSell",
	"description": "${actplayer} must sell 1 or 2 resources",
	"descriptionmyturn": "${you} must sell 1 or 2 resources",
	"type": "activeplayer",
	"possibleactions": [
		"sellResources"
	],
	"transitions": {
		"sellResources": 14,
		"zombiePass": 30
	}
}
					*/
					break;
				case "caravanCard":
					/*
					{
	"name": "caravanCard",
	"description": "${actplayer} must choose a Court card",
	"descriptionmyturn": "${you} must choose a Court card",
	"type": "activeplayer",
	"action": "stCaravanCard",
	"args": "argCaravanCard",
	"possibleactions": [
		"chooseCourtCard"
	],
	"transitions": {
		"chooseCourtCard": 30,
		"zombiePass": 30
	}
}
					*/
					break;
				case "caravanGarden":
					/*
					{
	"name": "caravanGarden",
	"description": "${actplayer} must plant in the garden (plant quality: ${quality})",
	"descriptionmyturn": "${you} must plant in the garden (plant quality: ${quality})",
	"type": "activeplayer",
	"args": "argCaravanGarden",
	"action": "stCaravanGarden",
	"possibleactions": [
		"plantPlant"
	],
	"transitions": {
		"plantPlant": 30,
		"freeCourtChoice": 23,
		"zombiePass": 30
	}
}
					*/
					break;
				case "freeCourtChoice":
					/*
					{
	"name": "freeCourtChoice",
	"description": "${actplayer} must choose a Court card",
	"descriptionmyturn": "${you} must choose a Court card to pick:",
	"type": "activeplayer",
	"possibleactions": [
		"freeCourtChoice"
	],
	"transitions": {
		"freeCourtChoice": 30,
		"zombiePass": 30
	}
}
					*/
					break;
				case "endActionCheck":
					/*
					{
	"name": "endActionCheck",
	"description": "${actplayer} must choose the resource to pick with his Caravaneer card",
	"descriptionmyturn": "${you} must choose the resource to pick with your Caravaneer card",
	"type": "activeplayer",
	"action": "stEndActionCheck",
	"possibleactions": [
		"courtCardResource"
	],
	"transitions": {
		"endAction": 31
	}
}
					*/
					break;
				case "nextPlayerAction":
					/*
					{
	"name": "nextPlayerAction",
	"description": "",
	"type": "game",
	"action": "stNextPlayerAction",
	"transitions": {
		"nextAction": 10,
		"endTurn": 40
	}
}
					*/
					break;
				case "lastTurnPhase":
					/*
					{
	"name": "lastTurnPhase",
	"description": "",
	"type": "game",
	"action": "stLastTurnPhase",
	"transitions": {
		"": 49
	}
}
					*/
					break;
				case "ishtarChoiceTest":
					/*
					{
	"name": "ishtarChoiceTest",
	"description": "",
	"type": "game",
	"action": "stIshtarChoiceTest",
	"transitions": {
		"noChoice": 46,
		"choice": 45
	}
}
					*/
					break;
				case "tammouzChoice":
					/*
					{
	"name": "tammouzChoice",
	"description": "${actplayer} must choose a field (Tammouz temple power)",
	"descriptionmyturn": "${you} must choose a field (Tammouz temple power)",
	"type": "activeplayer",
	"action": "stTammouzChoice",
	"possibleactions": [
		"chooseField"
	],
	"transitions": {
		"chooseField": 47
	}
}
					*/
					break;
				case "tammouzExchange":
					/*
					{
	"name": "tammouzExchange",
	"description": "${actplayer} can exchange a resource for another one",
	"descriptionmyturn": "${you} can exchange a resource for:",
	"type": "activeplayer",
	"action": "stTammouzExchange",
	"possibleactions": [
		"exchangeResource"
	],
	"transitions": {
		"exchangeResource": 44
	}
}
					*/
					break;
				case "stockLimitation":
					/*
					{
	"name": "stockLimitation",
	"description": "Some players must adjust their resource stock",
	"descriptionmyturn": "${you} can keep a maximum of ${titlearg1} resources",
	"type": "multipleactiveplayer",
	"args": "argStockLimitation",
	"action": "stStockLimitation",
	"possibleactions": [
		"discardResources"
	],
	"transitions": {
		"nextTurn": 50
	}
}
					*/
					break;
				case "ishtarChoice":
					/*
					{
	"name": "ishtarChoice",
	"description": "Ishtar: ${actplayer} must choose: 1 talent or 1 camel",
	"descriptionmyturn": "Ishtar: ${you} must choose: 1 talent or 1 camel",
	"type": "activeplayer",
	"possibleactions": [
		"ishtarChoice"
	],
	"transitions": {
		"ishtarChoice": 46
	}
}
					*/
					break;
				case "marduktammouz":
					/*
					{
	"name": "marduktammouz",
	"description": "",
	"type": "game",
	"action": "stMardukTammouz",
	"transitions": {
		"noChoice": 44,
		"choice": 42
	}
}
					*/
					break;
				case "tammouzExchangeTest":
					/*
					{
	"name": "tammouzExchangeTest",
	"description": "",
	"type": "game",
	"action": "stTammouzExchangeTest",
	"transitions": {
		"noExchange": 44,
		"exchange": 43
	}
}
					*/
					break;
				case "procession":
					/*
					{
	"name": "procession",
	"description": "${actplayer} must choose a temple",
	"descriptionmyturn": "${you} must choose a temple",
	"type": "activeplayer",
	"action": "stProcession",
	"possibleactions": [
		"chooseTemple"
	],
	"transitions": {
		"chooseTemple": 41
	}
}
					*/
					break;
				case "endGameTest":
					/*
					{
	"name": "endGameTest",
	"description": "",
	"type": "game",
	"action": "stEndGameTest",
	"transitions": {
		"newTurn": 2,
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
export default amyitis;
