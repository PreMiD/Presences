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

const railwaysoftheworld: GamePresence = {
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
		"": 62
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
		"playerTurn": 70,
		"bidding": 56,
		"scoringEnd": 98
	},
	"updateGameProgression": true
}
					*/
					break;
				case "buildTrack":
					/*
					{
	"name": "buildTrack",
	"description": "${actplayer} must build track",
	"descriptionmyturn": "${you} must build track",
	"type": "activeplayer",
	"args": "argBuildTrack",
	"possibleactions": [
		"buildTrack",
		"toggleOperationCard",
		"undoAction",
		"endAction",
		"fuelDepotTrans"
	],
	"transitions": {
		"undo": 70,
		"fuelDepotTransition": 84,
		"nextPlayer": 30,
		"zombiePass": 30,
		"extraTurn": 70
	}
}
					*/
					break;
				case "chooseCard":
					/*
					{
	"name": "chooseCard",
	"description": "${actplayer} must take an operation card",
	"descriptionmyturn": "${you} must take an operation card",
	"type": "activeplayer",
	"possibleactions": [
		"cardChoosen",
		"cancel"
	],
	"transitions": {
		"urbanize": 54,
		"tradingDepot": 81,
		"maritimeConnection": 85,
		"cancel": 70,
		"nextPlayer": 30,
		"zombiePass": 30,
		"extraTurn": 70
	}
}
					*/
					break;
				case "urbanize":
					/*
					{
	"name": "urbanize",
	"description": "${actplayer} must manage a city",
	"descriptionmyturn": "${you} must ",
	"type": "activeplayer",
	"args": "argUrbanize",
	"possibleactions": [
		"urbanize",
		"urbanizeButton",
		"cancel"
	],
	"transitions": {
		"cancel": 70,
		"nextPlayer": 30,
		"zombiePass": 30,
		"extraTurn": 70
	}
}
					*/
					break;
				case "deliverGood":
					/*
					{
	"name": "deliverGood",
	"description": "${actplayer} must deliver a good",
	"descriptionmyturn": "${you} must deliver a good",
	"type": "activeplayer",
	"args": "argDeliverGood",
	"possibleactions": [
		"shipGood",
		"selectCube",
		"selectHex",
		"selectRondelle",
		"undoDeliverGood",
		"endAction"
	],
	"transitions": {
		"undo": 70,
		"nextPlayer": 30,
		"zombiePass": 30,
		"extraTurn": 70
	}
}
					*/
					break;
				case "bidding":
					/*
					{
	"name": "bidding",
	"description": "${actplayer} may make bid for first player",
	"descriptionmyturn": "${you} must bid or pass for first player position",
	"type": "activeplayer",
	"args": "argBids",
	"possibleactions": [
		"bidButton"
	],
	"transitions": {
		"zombiePass": 57,
		"bidResult": 57
	}
}
					*/
					break;
				case "biddingResult":
					/*
					{
	"name": "biddingResult",
	"description": "Process bidding results",
	"type": "game",
	"action": "stBidResult",
	"transitions": {
		"bidding": 56,
		"playerTurn": 70
	}
}
					*/
					break;
				case "westernLink":
					/*
					{
	"name": "westernLink",
	"description": "${actplayer} must build a Western Link",
	"descriptionmyturn": "${you} must build a Western Link",
	"type": "activeplayer",
	"args": "argWesternLink",
	"possibleactions": [
		"westernLinkButton",
		"cancel"
	],
	"transitions": {
		"cancel": 70,
		"nextPlayer": 30,
		"zombiePass": 30,
		"extraTurn": 70
	}
}
					*/
					break;
				case "chooseRailBaron":
					/*
					{
	"name": "chooseRailBaron",
	"description": "Other players must select one Rail Baron card to keep",
	"descriptionmyturn": "${you} must select one Rail Baron card to keep",
	"type": "multipleactiveplayer",
	"action": "stMultiPlayerInit",
	"possibleactions": [
		"railBaronChoosen"
	],
	"transitions": {
		"railBaronResult": 63,
		"zombiePass": 63
	}
}
					*/
					break;
				case "railBaronResult":
					/*
					{
	"name": "railBaronResult",
	"description": "Process Rail Baron selection",
	"type": "game",
	"action": "stRailBaronResult",
	"transitions": {
		"playerTurn": 70,
		"bidding": 56,
		"zombiePass": 30
	}
}
					*/
					break;
				case "playerTurn":
					/*
					{
	"name": "playerTurn",
	"description": "${actplayer} may build track",
	"descriptionmyturn": "${you} may build track, or",
	"type": "activeplayer",
	"args": "argPlayerTurn",
	"possibleactions": [
		"buildTrack",
		"selectHex",
		"improveEngine",
		"improveEngineAltCost",
		"chooseCard",
		"urbanize",
		"placeMine",
		"maritimeConnection",
		"deliverGood",
		"westernLink",
		"endAction",
		"skip",
		"endgame",
		"undoTurn"
	],
	"transitions": {
		"extraTurn": 70,
		"buildTrack": 50,
		"chooseCard": 52,
		"urbanize": 54,
		"deliverGood": 55,
		"westernLink": 58,
		"tradingDepot": 81,
		"placeMine": 82,
		"maritimeConnection": 85,
		"zombiePass": 30,
		"nextPlayer": 30
	}
}
					*/
					break;
				case "tradingDepot":
					/*
					{
	"name": "tradingDepot",
	"description": "${actplayer} must build a trading depot",
	"descriptionmyturn": "${you} must build a trading depot",
	"type": "activeplayer",
	"args": "argTradingDepot",
	"possibleactions": [
		"tradingDepot",
		"tradingDepotButton",
		"cancel"
	],
	"transitions": {
		"cancel": 70,
		"nextPlayer": 30,
		"zombiePass": 30,
		"extraTurn": 70
	}
}
					*/
					break;
				case "placeMine":
					/*
					{
	"name": "placeMine",
	"description": "${actplayer} must place a mine on a gray city",
	"descriptionmyturn": "${you} must ",
	"type": "activeplayer",
	"args": "argPlaceMine",
	"possibleactions": [
		"placeMine",
		"placeMineButton",
		"cancel"
	],
	"transitions": {
		"cancel": 70,
		"nextPlayer": 30,
		"zombiePass": 30,
		"extraTurn": 70
	}
}
					*/
					break;
				case "buildFuelDepot":
					/*
					{
	"name": "buildFuelDepot",
	"description": "${actplayer} may build 1 or 2 fuel depots on a city",
	"descriptionmyturn": "${you} may build 1 or 2 fuel depots on a city",
	"type": "activeplayer",
	"args": "argBuildFuelDepots",
	"possibleactions": [
		"buildFuelDepot",
		"buildFuelDepotButton",
		"undoAction"
	],
	"transitions": {
		"undo": 70,
		"nextPlayer": 30,
		"zombiePass": 30,
		"extraTurn": 70
	}
}
					*/
					break;
				case "fuelDepotTransition":
					/*
					{
	"name": "fuelDepotTransition",
	"description": "Transition to Build Fuel Depot",
	"type": "game",
	"action": "stBuildFuelDepot",
	"transitions": {
		"fuelDepot": 83,
		"zombiePass": 30
	}
}
					*/
					break;
				case "maritimeConnection":
					/*
					{
	"name": "maritimeConnection",
	"description": "${actplayer} may build a maritime connection",
	"descriptionmyturn": "${you} may ",
	"type": "activeplayer",
	"args": "argMaritimeConnection",
	"possibleactions": [
		"selectMaritimeConnection",
		"maritimeConnectionButton",
		"cancel"
	],
	"transitions": {
		"cancel": 70,
		"nextPlayer": 30,
		"zombiePass": 30,
		"extraTurn": 70
	}
}
					*/
					break;
				case "scoringEnd":
					/*
					{
	"name": "scoringEnd",
	"description": "Computing scores",
	"type": "game",
	"action": "stScoringEnd",
	"transitions": {
		"endgame": 99
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
export default railwaysoftheworld;
