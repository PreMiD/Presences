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

const targi: GamePresence = {
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
				case "startDraw":
					/*
					{
	"name": "startDraw",
	"description": "Start",
	"type": "manager",
	"action": "stStartDraw",
	"transitions": {
		"": 10
	}
}
					*/
					break;
				case "playerTurn":
					/*
					{
	"name": "playerTurn",
	"description": "${actplayer} must place a Targi",
	"descriptionmyturn": "${you} must place a Targi",
	"type": "activeplayer",
	"args": "argTargiPlayerTurn",
	"possibleactions": [
		"playTargi"
	],
	"transitions": {
		"": 11
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
	"updateGameProgression": false,
	"transitions": {
		"nextPlayer": 10,
		"playAction": 20
	}
}
					*/
					break;
				case "playAction":
					/*
					{
	"name": "playAction",
	"description": "${actplayer} can choose an action to perform",
	"descriptionmyturn": "${you} can choose an action to perform",
	"type": "activeplayer",
	"args": "argActionPlayerTurn",
	"possibleactions": [
		"makeAction",
		"pass"
	],
	"transitions": {
		"playOtherAction": 20,
		"nextPlayerAction": 30,
		"makeChoiceTribe": 211,
		"makeChoiceWare": 212,
		"showWareCard": 23,
		"placeTribu": 24,
		"tradeForWaresGold": 26,
		"tradeForPoints": 27
	}
}
					*/
					break;
				case "placeCard":
					/*
					{
	"name": "placeCard",
	"description": "${actplayer} must choose where to place the Tribe card",
	"descriptionmyturn": "${you} must choose where to place the Tribe card",
	"type": "activeplayer",
	"args": "argCardChoiceValue",
	"possibleactions": [
		"placeCard"
	],
	"transitions": {
		"playOtherAction": 20,
		"nextPlayerAction": 30,
		"makeChoiceWare": 212,
		"makeChoiceGoldWaresVP": 213,
		"swapTribes": 221
	}
}
					*/
					break;
				case "showWareCard":
					/*
					{
	"name": "showWareCard",
	"description": "${actplayer} gets a Goods card from the Caravan",
	"type": "game",
	"args": "argShowWareCard",
	"action": "stEarnCaravanCard",
	"transitions": {
		"playOtherAction": 20,
		"makeChoiceWare": 212,
		"nextPlayerAction": 30
	}
}
					*/
					break;
				case "moveTribu_1":
					/*
					{
	"name": "moveTribu_1",
	"description": "${actplayer} can select a Tribe marker to move",
	"descriptionmyturn": "${you} can select one of your Tribe markers to move it",
	"type": "activeplayer",
	"args": "argTribuValue",
	"action": "stCheckMoveTribe",
	"possibleactions": [
		"selectTribu",
		"cancel"
	],
	"transitions": {
		"selectTribu": 25,
		"playOtherAction": 20,
		"nextPlayerAction": 30
	}
}
					*/
					break;
				case "moveTribu_2":
					/*
					{
	"name": "moveTribu_2",
	"description": "${actplayer} must select an unoccupied center card",
	"descriptionmyturn": "${you} must select an unoccupied center card",
	"type": "activeplayer",
	"args": "argTribuEmptyValue",
	"possibleactions": [
		"selectTribu",
		"cancel"
	],
	"transitions": {
		"playOtherAction": 20,
		"nextPlayerAction": 30
	}
}
					*/
					break;
				case "tradeForWaresGold":
					/*
					{
	"name": "tradeForWaresGold",
	"description": "${actplayer} can trade goods for gold or other goods",
	"descriptionmyturn": "${you} can trade goods for gold or other goods",
	"type": "activeplayer",
	"args": "argTradeForWaresGold",
	"possibleactions": [
		"trade",
		"cancel"
	],
	"transitions": {
		"tradeAgain": 26,
		"makeChoiceWare": 212,
		"playOtherAction": 20,
		"nextPlayerAction": 30
	}
}
					*/
					break;
				case "tradeForPoints":
					/*
					{
	"name": "tradeForPoints",
	"description": "${actplayer} can trade goods or gold for victory points",
	"descriptionmyturn": "${you} can trade goods or gold for victory points",
	"type": "activeplayer",
	"possibleactions": [
		"trade",
		"cancel"
	],
	"transitions": {
		"playOtherAction": 20,
		"nextPlayerAction": 30
	}
}
					*/
					break;
				case "endOfTurnCardEffects":
					/*
					{
	"name": "endOfTurnCardEffects",
	"description": "Checking Tribe advantages",
	"type": "game",
	"action": "stEndOfTurnCardEffects",
	"updateGameProgression": false,
	"transitions": {
		"done": 31,
		"makeChoiceWare": 212
	}
}
					*/
					break;
				case "endOfTurnLimitResources":
					/*
					{
	"name": "endOfTurnLimitResources",
	"description": "${actplayer} must discard goods in excess of 10 and gold in excess of 3",
	"descriptionmyturn": "${you} must discard goods in excess of 10 and gold in excess of 3",
	"type": "activeplayer",
	"action": "stEndOfTurnLimitResources",
	"args": "argEndOfTurnLimitResources",
	"possibleactions": [
		"discard"
	],
	"transitions": {
		"": 32
	}
}
					*/
					break;
				case "endOfTurn":
					/*
					{
	"name": "endOfTurn",
	"description": "Ending player turn",
	"type": "game",
	"action": "stEndOfTurn",
	"updateGameProgression": false,
	"transitions": {
		"nextActionPlayer": 20,
		"moveRaider": 40,
		"endGame": 98
	}
}
					*/
					break;
				case "moveRaider":
					/*
					{
	"name": "moveRaider",
	"description": "The raider moves",
	"type": "game",
	"action": "stMoveRaider",
	"updateGameProgression": true,
	"transitions": {
		"newTurn": 10,
		"raid": 41
	}
}
					*/
					break;
				case "raid":
					/*
					{
	"name": "raid",
	"description": "Your opponent must choose what to lose during the raid",
	"descriptionmyturn": "${you} must choose what to lose during the raid",
	"type": "multipleactiveplayer",
	"action": "stRaid",
	"args": "argRaid",
	"possibleactions": [
		"makeChoice",
		"cancel"
	],
	"transitions": {
		"moveRaider": 40,
		"endGame": 98
	}
}
					*/
					break;
				case "finalScoring":
					/*
					{
	"name": "finalScoring",
	"description": "Final scoring",
	"type": "game",
	"action": "stFinalScoring",
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
	"description": "End of game",
	"type": "manager",
	"action": "stGameEnd",
	"args": "argGameEnd"
}
					*/
					break;
				case "chooseTribe":
					/*
					{
	"name": "chooseTribe",
	"description": "${actplayer} must choose what to do with this tribe card",
	"descriptionmyturn": "${you} must choose what to do with this tribe card",
	"type": "activeplayer",
	"args": "argChooseTribe",
	"possibleactions": [
		"makeChoice"
	],
	"transitions": {
		"playOtherAction": 20,
		"nextPlayerAction": 30,
		"placeCard": 22
	}
}
					*/
					break;
				case "chooseWare":
					/*
					{
	"name": "chooseWare",
	"description": "${actplayer} must choose which goods to get",
	"descriptionmyturn": "${you} must choose which goods to get",
	"type": "activeplayer",
	"args": "argChooseWare",
	"possibleactions": [
		"chooseWare"
	],
	"transitions": {
		"playOtherAction": 20,
		"nextPlayerAction": 30,
		"tradeForWaresGold": 26,
		"endOfTurn": 31
	}
}
					*/
					break;
				case "chooseGoldWaresVP":
					/*
					{
	"name": "chooseGoldWaresVP",
	"description": "${actplayer} must choose to get 3 goods OR 1 gold OR 1 victory point",
	"descriptionmyturn": "${you} must choose to get 3 goods OR 1 gold OR 1 victory point",
	"type": "activeplayer",
	"possibleactions": [
		"chooseWare"
	],
	"transitions": {
		"playOtherAction": 20,
		"nextPlayerAction": 30
	}
}
					*/
					break;
				case "swapTribesPhase1":
					/*
					{
	"name": "swapTribesPhase1",
	"description": "${actplayer} may select a Tribe card to swap position with another",
	"descriptionmyturn": "${you} may select a Tribe card to swap position with another",
	"type": "activeplayer",
	"args": "argSwapFirst",
	"action": "stCheckSwapTribe",
	"possibleactions": [
		"selectSwap1",
		"cancel"
	],
	"transitions": {
		"selectTribeCard": 222,
		"playOtherAction": 20,
		"nextPlayerAction": 30
	}
}
					*/
					break;
				case "swapTribesPhase2":
					/*
					{
	"name": "swapTribesPhase2",
	"description": "${actplayer} must select a Tribe card to swap position with",
	"descriptionmyturn": "${you} must select a Tribe card to swap position with",
	"type": "activeplayer",
	"args": "argSwapSecond",
	"possibleactions": [
		"selectSwap2",
		"cancel"
	],
	"transitions": {
		"playOtherAction": 20,
		"nextPlayerAction": 30
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
export default targi;
