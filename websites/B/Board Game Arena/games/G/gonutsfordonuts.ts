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

const gonutsfordonuts: GamePresence = {
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
				case "startGame":
					/*
					{
	"name": "startGame",
	"description": "",
	"type": "game",
	"action": "stStartGame",
	"updateGameProgression": true,
	"transitions": {
		"": 10
	}
}
					*/
					break;
				case "placeBids":
					/*
					{
	"name": "placeBids",
	"description": "Other players must place a bid for a Donut.",
	"descriptionmyturn": "${you} must place a bid for a Donut.",
	"type": "multipleactiveplayer",
	"action": "stPlaceBids",
	"updateGameProgression": true,
	"possibleactions": [
		"placeBid"
	],
	"transitions": {
		"roundEnd": 20
	}
}
					*/
					break;
				case "roundEnd":
					/*
					{
	"name": "roundEnd",
	"description": "",
	"type": "game",
	"action": "stRoundEnd",
	"transitions": {
		"roundEnd": 20,
		"nextRound": 40,
		"actionRaspberryFrosted": 25,
		"actionBearClaw": 26,
		"actionStrawberryGlazed": 27,
		"actionFrenchCruller": 28,
		"actionCinnamonTwist": 29,
		"actionSprinkled": 31,
		"actionMilk": 33,
		"actionDoubleChocolate": 34,
		"actionRedVelvet": 35,
		"actionDayOldDonuts": 36
	}
}
					*/
					break;
				case "actionRaspberryFrosted":
					/*
					{
	"name": "actionRaspberryFrosted",
	"description": "${actplayer} must discard a Donut",
	"descriptionmyturn": "${you} must discard a Donut",
	"type": "activeplayer",
	"args": "argRaspberryFrosted",
	"possibleactions": [
		"discardMyDonut"
	],
	"transitions": {
		"roundEnd": 20
	}
}
					*/
					break;
				case "actionBearClaw":
					/*
					{
	"name": "actionBearClaw",
	"description": "${actplayer} must take a Donut from another player",
	"descriptionmyturn": "${you} must take a Donut from another player",
	"type": "activeplayer",
	"possibleactions": [
		"stealDonut"
	],
	"transitions": {
		"roundEnd": 20
	}
}
					*/
					break;
				case "actionStrawberryGlazed":
					/*
					{
	"name": "actionStrawberryGlazed",
	"description": "${actplayer} must discard a Donut from another player",
	"descriptionmyturn": "${you} must discard a Donut from another player",
	"type": "activeplayer",
	"possibleactions": [
		"discardDonut"
	],
	"transitions": {
		"roundEnd": 20
	}
}
					*/
					break;
				case "actionFrenchCruller":
					/*
					{
	"name": "actionFrenchCruller",
	"description": "${actplayer} may discard any number of Donuts not selected this round",
	"descriptionmyturn": "${you} may discard any number of Donuts not selected this round",
	"type": "activeplayer",
	"args": "argFrenchCruller",
	"possibleactions": [
		"discardUnselectedDonuts"
	],
	"transitions": {
		"roundEnd": 20
	}
}
					*/
					break;
				case "actionCinnamonTwist":
					/*
					{
	"name": "actionCinnamonTwist",
	"description": "Other players must pass a Donut to the next player",
	"descriptionmyturn": "${you} must pass a Donut to the next player",
	"type": "multipleactiveplayer",
	"args": "argCinnamonTwist",
	"action": "stActionCinnamonTwist",
	"possibleactions": [
		"passDonut"
	],
	"transitions": {
		"actionCinnamonTwistEnd": 30
	}
}
					*/
					break;
				case "actionCinnamonTwistEnd":
					/*
					{
	"name": "actionCinnamonTwistEnd",
	"description": "",
	"type": "game",
	"action": "stActionCinnamonTwistEnd",
	"transitions": {
		"roundEnd": 20
	}
}
					*/
					break;
				case "actionSprinkled":
					/*
					{
	"name": "actionSprinkled",
	"description": "${actplayer} must select a Donut to give to another player",
	"descriptionmyturn": "${you} must select a Donut to give to another player",
	"type": "activeplayer",
	"possibleactions": [
		"passDonut"
	],
	"transitions": {
		"actionSprinkledSelectPlayer": 32
	}
}
					*/
					break;
				case "actionSprinkledSelectPlayer":
					/*
					{
	"name": "actionSprinkledSelectPlayer",
	"description": "${actplayer} must select a Player to give the selected donut to",
	"descriptionmyturn": "${you} must select a Player to give the selected donut to",
	"type": "activeplayer",
	"possibleactions": [
		"selectPlayerToDonateTo"
	],
	"transitions": {
		"roundEnd": 20
	}
}
					*/
					break;
				case "actionMilk":
					/*
					{
	"name": "actionMilk",
	"description": "${actplayer} must select three Donuts or the Milk to discard",
	"descriptionmyturn": "${you} must select three Donuts or the Milk to discard",
	"type": "activeplayer",
	"possibleactions": [
		"milkDiscard"
	],
	"transitions": {
		"roundEnd": 20
	}
}
					*/
					break;
				case "actionDoubleChocolate":
					/*
					{
	"name": "actionDoubleChocolate",
	"description": "${actplayer} must select one of the 2 top cards from the Donut Deck to keep. The other will be returned to the top of the Donut Deck.",
	"descriptionmyturn": "${you} must select one of the 2 top cards from the Donut Deck to keep. The other will be returned to the top of the Donut Deck.",
	"type": "activeplayer",
	"args": "argDoubleChocolate",
	"updateGameProgression": true,
	"possibleactions": [
		"doubleChocolateKeep"
	],
	"transitions": {
		"roundEnd": 20
	}
}
					*/
					break;
				case "actionRedVelvet":
					/*
					{
	"name": "actionRedVelvet",
	"description": "${actplayer} must select any one card from the Discarded Donuts",
	"descriptionmyturn": "${you} must select any one card from the Discarded Donuts",
	"type": "activeplayer",
	"possibleactions": [
		"redVelvetSelect"
	],
	"transitions": {
		"roundEnd": 20
	}
}
					*/
					break;
				case "actionDayOldDonuts":
					/*
					{
	"name": "actionDayOldDonuts",
	"description": "${actplayer} may select up to three cards from the Discarded Donuts",
	"descriptionmyturn": "${you} may select up to three cards from the Discarded Donuts",
	"type": "activeplayer",
	"possibleactions": [
		"dayOldDonutsSelect"
	],
	"transitions": {
		"roundEnd": 20
	}
}
					*/
					break;
				case "nextRound":
					/*
					{
	"name": "nextRound",
	"description": "",
	"type": "game",
	"action": "stNextRound",
	"updateGameProgression": true,
	"transitions": {
		"placeBids": 10,
		"myEndGame": 90
	}
}
					*/
					break;
				case "myGameEnd":
					/*
					{
	"name": "myGameEnd",
	"description": "End of game",
	"type": "game",
	"action": "stMyGameEnd",
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
export default gonutsfordonuts;
