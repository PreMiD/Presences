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

const stockpile: GamePresence = {
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
				case "Information":
					/*
					{
	"name": "Information",
	"description": "Information Phase...",
	"type": "game",
	"action": "stInformation",
	"updateGameProgression": true,
	"transitions": {
		"PreSupply": 3
	}
}
					*/
					break;
				case "PreSupply":
					/*
					{
	"name": "PreSupply",
	"description": "Dealing market cards to Stockpiles...",
	"type": "game",
	"action": "stPreSupply",
	"updateGameProgression": true,
	"transitions": {
		"Supply": 4
	}
}
					*/
					break;
				case "Supply1":
					/*
					{
	"name": "Supply1",
	"description": "${actplayer} must choose a market card to play Face-Up.",
	"descriptionmyturn": "${you} must choose a market card to play Face-Up.",
	"type": "activeplayer",
	"updateGameProgression": true,
	"possibleactions": [
		"playCard"
	],
	"transitions": {
		"Supply": 5
	}
}
					*/
					break;
				case "Supply2":
					/*
					{
	"name": "Supply2",
	"description": "${actplayer} must select a stockpile to play Face-Down market card.",
	"descriptionmyturn": "${you} must select a stockpile to play Face-Down market card.",
	"type": "activeplayer",
	"updateGameProgression": true,
	"possibleactions": [
		"playCard"
	],
	"transitions": {
		"NextPlayer": 6
	}
}
					*/
					break;
				case "NextPlayer":
					/*
					{
	"name": "NextPlayer",
	"description": "Changing active player...",
	"type": "game",
	"action": "stNextPlayer",
	"updateGameProgression": true,
	"transitions": {
		"Supply": 4,
		"Demand": 7
	}
}
					*/
					break;
				case "Demand":
					/*
					{
	"name": "Demand",
	"description": "${actplayer} must place the Bidding Meeple on a Bidding Track.",
	"descriptionmyturn": "${you} must place your Bidding Meeple on a Bidding Track.",
	"type": "activeplayer",
	"args": "argDemand",
	"updateGameProgression": true,
	"possibleactions": [
		"BetStockpile"
	],
	"transitions": {
		"NextPlayer": 8
	}
}
					*/
					break;
				case "NextPlayer2":
					/*
					{
	"name": "NextPlayer2",
	"description": "Changing active player...",
	"type": "game",
	"action": "stNextPlayer2",
	"updateGameProgression": true,
	"transitions": {
		"Demand": 7,
		"AssignDemand": 9
	}
}
					*/
					break;
				case "AssignDemand":
					/*
					{
	"name": "AssignDemand",
	"description": "Assigning stockpile market cards to players...",
	"type": "game",
	"action": "stAssignDemand",
	"updateGameProgression": true,
	"transitions": {
		"Action": 10,
		"Selling": 12,
		"Movement": 14
	}
}
					*/
					break;
				case "Action":
					/*
					{
	"name": "Action",
	"description": "${actplayer} must select one action card to increase or decrease a stock value by 2.",
	"descriptionmyturn": "${you} must select one action card to increase or decrease a stock value by 2.",
	"type": "activeplayer",
	"updateGameProgression": true,
	"possibleactions": [
		"ChangeStockValue"
	],
	"transitions": {
		"Action": 10,
		"NextPlayer": 11
	}
}
					*/
					break;
				case "NextPlayer3":
					/*
					{
	"name": "NextPlayer3",
	"description": "Changing active player...",
	"type": "game",
	"action": "stNextPlayer3",
	"updateGameProgression": true,
	"transitions": {
		"Action": 10,
		"Selling": 12,
		"Movement": 14,
		"DecideMovement2": 115
	}
}
					*/
					break;
				case "Selling":
					/*
					{
	"name": "Selling",
	"description": "${actplayer} may sell shares of the stocks from his portfolio or his portfolio split.",
	"descriptionmyturn": "${you} may sell shares of the stocks from your portfolio or your portfolio split.",
	"type": "activeplayer",
	"updateGameProgression": true,
	"possibleactions": [
		"SellShares",
		"Pass"
	],
	"transitions": {
		"Selling": 12,
		"NextPlayer": 13
	}
}
					*/
					break;
				case "NextPlayer4":
					/*
					{
	"name": "NextPlayer4",
	"description": "Changing active player...",
	"type": "game",
	"action": "stNextPlayer4",
	"updateGameProgression": true,
	"transitions": {
		"Selling": 12,
		"Movement": 14
	}
}
					*/
					break;
				case "Movement":
					/*
					{
	"name": "Movement",
	"description": "Stock values move according to Company and Forecast Cards...",
	"type": "game",
	"action": "stMovement",
	"updateGameProgression": true,
	"transitions": {
		"DecideMovement": 15,
		"NextTurn": 17
	}
}
					*/
					break;
				case "DecideMovement":
					/*
					{
	"name": "DecideMovement",
	"description": "${actplayer} may decide to declare the owned shares to receive dividends.",
	"descriptionmyturn": "${you} may decide to declare shares you own to receive dividends.",
	"type": "activeplayer",
	"action": "stDecideMovement",
	"args": "argDecideMovement",
	"updateGameProgression": true,
	"possibleactions": [
		"Declare"
	],
	"transitions": {
		"NextPlayer": 16
	}
}
					*/
					break;
				case "NextPlayer5":
					/*
					{
	"name": "NextPlayer5",
	"description": "Changing active player...",
	"type": "game",
	"action": "stNextPlayer5",
	"updateGameProgression": true,
	"transitions": {
		"DecideMovement": 15,
		"NextTurn": 17
	}
}
					*/
					break;
				case "NextTurn":
					/*
					{
	"name": "NextTurn",
	"description": "Next turn...",
	"type": "game",
	"action": "stNextTurn",
	"updateGameProgression": true,
	"transitions": {
		"Information": 2,
		"GameEnd": 99
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
				case "DecideMovement2":
					/*
					{
	"name": "DecideMovement2",
	"description": "${actplayer} may decide to declare the owned shares to receive dividends.",
	"descriptionmyturn": "${you} may decide to declare shares you own to receive dividends.",
	"type": "activeplayer",
	"args": "argDecideMovement2",
	"action": "stDecideMovement2",
	"updateGameProgression": true,
	"possibleactions": [
		"Declare"
	],
	"transitions": {
		"NextPlayer": 116
	}
}
					*/
					break;
				case "NextPlayer6":
					/*
					{
	"name": "NextPlayer6",
	"description": "Changing active player...",
	"type": "game",
	"action": "stNextPlayer6",
	"updateGameProgression": true,
	"transitions": {
		"DecideMovement": 115,
		"Selling": 12,
		"Movement": 14
	}
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
export default stockpile;
