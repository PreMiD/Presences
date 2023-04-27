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

const burglebros: GamePresence = {
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
		"": 5
	}
}
					*/
					break;
				case "randomizeWalls":
					/*
					{
	"name": "randomizeWalls",
	"description": "The administrator of the table can generate new walls for this game",
	"descriptionmyturn": "${you} can generate a new set of walls for this game",
	"type": "activeplayer",
	"action": "stRandomizeWalls",
	"possibleactions": [
		"randomizeWalls"
	],
	"transitions": {
		"startGame": 7
	}
}
					*/
					break;
				case "chooseCharacter":
					/*
					{
	"name": "chooseCharacter",
	"description": "Other players must choose a character",
	"descriptionmyturn": "${you} must choose a character",
	"type": "multipleactiveplayer",
	"action": "stChooseCharacter",
	"args": "argChooseCharacter",
	"possibleactions": [
		"playCard"
	],
	"transitions": {
		"chooseCharacter": 8,
		"nextPlayer": 7
	}
}
					*/
					break;
				case "startingTile":
					/*
					{
	"name": "startingTile",
	"description": "${actplayer} must choose a starting tile",
	"descriptionmyturn": "${you} must choose a starting tile",
	"type": "activeplayer",
	"args": "argStartingTile",
	"possibleactions": [
		"chooseStartingTile"
	],
	"transitions": {
		"": 9
	}
}
					*/
					break;
				case "playerTurn":
					/*
					{
	"name": "playerTurn",
	"description": "${actplayer} have ${actions_remaining} actions remaining",
	"descriptionmyturn": "${you} have ${actions_remaining} actions remaining",
	"type": "activeplayer",
	"args": "argPlayerTurn",
	"updateGameProgression": true,
	"possibleactions": [
		"hack",
		"move",
		"peek",
		"addSafeDie",
		"rollSafeDice",
		"playCard",
		"characterAction",
		"trade",
		"pickUpCat",
		"takeCards",
		"pass",
		"escape",
		"restartTurn"
	],
	"transitions": {
		"endAction": 21,
		"endTurn": 10,
		"nextPlayer": 12,
		"cardChoice": 13,
		"tileChoice": 14,
		"playerChoice": 15,
		"proposeTrade": 16,
		"takeCards": 24,
		"specialChoice": 20,
		"rookChoice": 25,
		"chooseAlarm": 20,
		"restartTurn": 9,
		"gameOver": 90
	}
}
					*/
					break;
				case "endTurn":
					/*
					{
	"name": "endTurn",
	"description": "Triggering end of turn effects...",
	"type": "game",
	"args": "argPlayerTurn",
	"action": "stEndTurn",
	"updateGameProgression": true,
	"transitions": {
		"moveGuard": 11,
		"chooseAlarm": 20
	}
}
					*/
					break;
				case "moveGuard":
					/*
					{
	"name": "moveGuard",
	"description": "Guard is moving...",
	"type": "game",
	"action": "stMoveGuard",
	"updateGameProgression": true,
	"transitions": {
		"nextPlayer": 12,
		"chooseAlarm": 20,
		"gameOver": 90
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
		"playerTurn": 9
	}
}
					*/
					break;
				case "cardChoice":
					/*
					{
	"name": "cardChoice",
	"description": "${card_name_displayed}: ${actplayer} must choose ${choice_description}",
	"descriptionmyturn": "${card_name_displayed}: ${you} must choose ${choice_description}",
	"type": "activeplayer",
	"args": "argCardChoice",
	"updateGameProgression": true,
	"possibleactions": [
		"selectCardChoice",
		"cancelCardChoice",
		"restartTurn"
	],
	"transitions": {
		"endAction": 21,
		"nextAction": 9,
		"endTurn": 10,
		"tileChoice": 14,
		"restartTurn": 9,
		"chooseAlarm": 20,
		"gameOver": 90
	}
}
					*/
					break;
				case "tileChoice":
					/*
					{
	"name": "tileChoice",
	"description": "${tile_name}: ${actplayer} must choose an option",
	"descriptionmyturn": "${tile_name}: ${you} must choose an option",
	"type": "activeplayer",
	"args": "argTileChoice",
	"possibleactions": [
		"selectTileChoice",
		"restartTurn"
	],
	"transitions": {
		"endAction": 21,
		"tileChoice": 14,
		"restartTurn": 9,
		"endTurn": 10,
		"switchRookMove": 25,
		"chooseAlarm": 20
	}
}
					*/
					break;
				case "playerChoice":
					/*
					{
	"name": "playerChoice",
	"description": "${actplayer} must choose a player",
	"descriptionmyturn": "${you} must choose a player",
	"type": "activeplayer",
	"args": "argPlayerChoice",
	"possibleactions": [
		"selectPlayerChoice",
		"cancelPlayerChoice",
		"restartTurn"
	],
	"transitions": {
		"endAction": 21,
		"nextAction": 9,
		"proposeTrade": 16,
		"specialChoice": 20,
		"chooseAlarm": 20,
		"restartTurn": 9
	}
}
					*/
					break;
				case "proposeTrade":
					/*
					{
	"name": "proposeTrade",
	"description": "${actplayer} must choose cards to trade",
	"descriptionmyturn": "${you} must choose cards to trade",
	"type": "activeplayer",
	"args": "argProposeTrade",
	"possibleactions": [
		"proposeTrade",
		"cancelTrade"
	],
	"transitions": {
		"endAction": 21,
		"nextAction": 9,
		"nextTradePlayer": 18,
		"endTradeOtherPlayer": 19
	}
}
					*/
					break;
				case "confirmTrade":
					/*
					{
	"name": "confirmTrade",
	"description": "${actplayer} must confirm a trade",
	"descriptionmyturn": "${you} must confirm a trade",
	"type": "activeplayer",
	"args": "argConfirmTrade",
	"possibleactions": [
		"confirmTrade",
		"cancelTrade"
	],
	"transitions": {
		"endTradeOtherPlayer": 19
	}
}
					*/
					break;
				case "nextTradePlayer":
					/*
					{
	"name": "nextTradePlayer",
	"description": "",
	"type": "game",
	"action": "stNextTradePlayer",
	"transitions": {
		"confirmTrade": 17
	}
}
					*/
					break;
				case "endTradeOtherPlayer":
					/*
					{
	"name": "endTradeOtherPlayer",
	"description": "",
	"type": "game",
	"action": "stEndTradeOtherPlayer",
	"transitions": {
		"nextAction": 9
	}
}
					*/
					break;
				case "specialChoice":
					/*
					{
	"name": "specialChoice",
	"description": "${choice_name}: ${actplayer} must choose ${choice_description}",
	"descriptionmyturn": "${choice_name}: ${you} must choose ${choice_description}",
	"type": "activeplayer",
	"args": "argSpecialChoice",
	"updateGameProgression": true,
	"possibleactions": [
		"selectSpecialChoice",
		"cancelSpecialChoice"
	],
	"transitions": {
		"endAction": 21,
		"nextAction": 9,
		"tileChoice": 14,
		"playerTurn": 9,
		"moveGuard": 11,
		"chooseAlarm": 20,
		"switchRookMove": 25,
		"gameOver": 90
	}
}
					*/
					break;
				case "endAction":
					/*
					{
	"name": "endAction",
	"description": "",
	"type": "game",
	"action": "stEndAction",
	"transitions": {
		"nextAction": 9,
		"drawTools": 22,
		"endTurn": 10
	}
}
					*/
					break;
				case "drawToolsAndDiscard":
					/*
					{
	"name": "drawToolsAndDiscard",
	"description": "${actplayer} must choose a tool",
	"descriptionmyturn": "${you} must choose a tool",
	"type": "activeplayer",
	"args": "argDrawToolsAndDiscard",
	"possibleactions": [
		"keepTool",
		"restartTurn"
	],
	"transitions": {
		"drawToolsOtherPlayer": 23,
		"nextAction": 9,
		"endTurn": 10,
		"restartTurn": 9
	}
}
					*/
					break;
				case "drawToolsOtherPlayer":
					/*
					{
	"name": "drawToolsOtherPlayer",
	"description": "",
	"type": "game",
	"action": "stDrawToolsOtherPlayer",
	"transitions": {
		"nextAction": 9
	}
}
					*/
					break;
				case "takeCards":
					/*
					{
	"name": "takeCards",
	"description": "${actplayer} must choose cards to take",
	"descriptionmyturn": "${you} must choose cards to take",
	"type": "activeplayer",
	"args": "argPlayerTurn",
	"possibleactions": [
		"confirmTakeCards",
		"cancelTakeCards"
	],
	"transitions": {
		"endAction": 21,
		"nextAction": 9
	}
}
					*/
					break;
				case "switchRookMove":
					/*
					{
	"name": "switchRookMove",
	"description": "",
	"type": "game",
	"action": "stSwitchRookMove",
	"transitions": {
		"confirmRookMove": 26,
		"endAction": 21,
		"switchRookMove": 25,
		"tileChoice": 14
	}
}
					*/
					break;
				case "confirmRookMove":
					/*
					{
	"name": "confirmRookMove",
	"description": "${actplayer} must confirm The Rook move",
	"descriptionmyturn": "The Rook wants to move you to ${destination_name} on floor ${floor}",
	"type": "activeplayer",
	"args": "argConfirmRookMove",
	"possibleactions": [
		"confirmRookMove",
		"cancelRookMove"
	],
	"transitions": {
		"switchRookMove": 25,
		"gameOver": 90,
		"tileChoice": 14,
		"chooseAlarm": 20
	}
}
					*/
					break;
				case "gameOver":
					/*
					{
	"name": "gameOver",
	"description": "End of game",
	"type": "game",
	"action": "stGameOver",
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
export default burglebros;
