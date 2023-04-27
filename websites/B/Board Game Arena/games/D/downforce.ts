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

const downforce: GamePresence = {
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
				case "auctionTurn":
					/*
					{
	"name": "auctionTurn",
	"args": "argAuctionTurn",
	"action": "stAuctionTurn",
	"description": "Players must play a card or pass",
	"descriptionmyturn": "${you} must play a card or pass",
	"type": "multipleactiveplayer",
	"transitions": {
		"prepareRace": 3,
		"zombiePass": 10,
		"auctionDone": 4,
		"startRace": 10
	},
	"possibleactions": [
		"placeAuction",
		"passAuction",
		"zombiePass"
	]
}
					*/
					break;
				case "prepareRace":
					/*
					{
	"name": "prepareRace",
	"args": "argPrepareRace",
	"action": "stPrepareRace",
	"description": "Players must keep only one power",
	"descriptionmyturn": "${you} must keep only one power",
	"type": "multipleactiveplayer",
	"possibleactions": [
		"choosePower",
		"zombiePass"
	],
	"transitions": {
		"choosePower": 10,
		"zombiePass": 10,
		"startRace": 10
	}
}
					*/
					break;
				case "auctionProcess":
					/*
					{
	"name": "auctionProcess",
	"action": "stAuctionProcessTurn",
	"description": "Processing auction",
	"type": "game",
	"updateGameProgression": true,
	"transitions": {
		"prepareRace": 3,
		"zombiePass": 10,
		"auctionProcessed": 2,
		"startRace": 10
	},
	"possibleactions": [
		"placeAuction",
		"passAuction",
		"zombiePass"
	]
}
					*/
					break;
				case "playerTurnSetup":
					/*
					{
	"name": "playerTurnSetup",
	"description": "A new turn starts",
	"action": "stPlayerTurnSetup",
	"type": "game",
	"updateGameProgression": true,
	"transitions": {
		"playerTurn": 11,
		"moveCar": 12,
		"betTurn": 14,
		"setupPlayerTurn": 10,
		"chooseJokerColor": 13,
		"gameScoring": 90,
		"movementDone": 10
	}
}
					*/
					break;
				case "playerTurn":
					/*
					{
	"name": "playerTurn",
	"action": "stPlayerTurn",
	"description": "${actplayer} must play a card",
	"descriptionmyturn": "${you} must play a card",
	"type": "activeplayer",
	"possibleactions": [
		"placeSpeedCard"
	],
	"transitions": {
		"zombiePass": 10,
		"playSpeedCard": 10,
		"chooseJokerColor": 13,
		"chooseColorToRemove": 15,
		"chooseMovementsOrder": 16,
		"movementDone": 10,
		"gameScoring": 90,
		"gameEnd": 99
	}
}
					*/
					break;
				case "moveCar":
					/*
					{
	"name": "moveCar",
	"action": "stMoveCar",
	"args": "argMoveCar",
	"description": "${actplayer} must move a car",
	"descriptionmyturn": "${you} must move a car",
	"type": "activeplayer",
	"possibleactions": [
		"moveCar"
	],
	"transitions": {
		"zombiePass": 10,
		"moveCar": 12,
		"setupPlayerTurn": 10,
		"chooseJokerColor": 13,
		"orderChosen": 10,
		"gameScoring": 90,
		"movementDone": 10
	}
}
					*/
					break;
				case "chooseJokerColor":
					/*
					{
	"name": "chooseJokerColor",
	"args": "argChooseJokerColor",
	"description": "${actplayer} must choose the color of next car to move",
	"descriptionmyturn": "${you} must choose the color of next car to move",
	"type": "activeplayer",
	"possibleactions": [
		"colorChosen"
	],
	"transitions": {
		"zombiePass": 10,
		"colorChosen": 10,
		"setupPlayerTurn": 10,
		"chooseJokerColor": 13
	}
}
					*/
					break;
				case "betTurn":
					/*
					{
	"name": "betTurn",
	"action": "stBetTurn",
	"args": "argBetTurn",
	"description": "Players must bet on which car will win the race",
	"descriptionmyturn": "${you} must bet on which car will win the race",
	"type": "multipleactiveplayer",
	"updateGameProgression": true,
	"possibleactions": [
		"placeBet",
		"zombiePass"
	],
	"transitions": {
		"placeBet": 10,
		"zombiePass": 10
	}
}
					*/
					break;
				case "chooseColorToRemove":
					/*
					{
	"name": "chooseColorToRemove",
	"action": "stChooseColorToRemove",
	"args": "argChooseColorToRemove",
	"description": "${actplayer} must choose a color to remove from card",
	"descriptionmyturn": "${you} must choose a color to remove from card",
	"type": "activeplayer",
	"possibleactions": [
		"colorChosen"
	],
	"transitions": {
		"colorChosen": 10,
		"zombiePass": 10
	}
}
					*/
					break;
				case "chooseMovementsOrder":
					/*
					{
	"name": "chooseMovementsOrder",
	"description": "${actplayer} may invert the movements order of the card",
	"descriptionmyturn": "${you} may invert the movements order of the card",
	"type": "activeplayer",
	"possibleactions": [
		"orderChosen",
		"zombiePass"
	],
	"transitions": {
		"orderChosen": 10,
		"zombiePass": 10
	}
}
					*/
					break;
				case "gameEndScoring":
					/*
					{
	"description": "Final Score",
	"name": "gameEndScoring",
	"type": "game",
	"action": "stGameEndScoring",
	"updateGameProgression": true,
	"transitions": {
		"": 99
	}
}
					*/
					break;
				case "gameEnd":
					/*
					{
	"name": "gameEnd",
	"args": "argDFGameEnd",
	"description": "End of game",
	"type": "manager",
	"action": "stGameEnd"
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
export default downforce;
