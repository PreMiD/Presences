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

const nippon: GamePresence = {
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
		"": 10
	}
}
					*/
					break;
				case "playerTurn":
					/*
					{
	"name": "playerTurn",
	"description": "${actplayer} must take a Worker or Consolidate",
	"descriptionmyturn": "${you} must take a Worker or Consolidate",
	"type": "activeplayer",
	"args": "argPlayerTurn",
	"possibleactions": [
		"actionTakeWorker",
		"actionConsolidate",
		"actionBuyTrainOrShip",
		"actionTrackUp",
		"actionInvest",
		"actionProduce",
		"actionMachinery",
		"actionExport",
		"actionLocalMarket",
		"actionBlueprintExchange",
		"actionUpgradeFactory"
	],
	"transitions": {
		"next": 11,
		"loopback": 10,
		"bonus": 16
	}
}
					*/
					break;
				case "gameTurnNextPlayer":
					/*
					{
	"name": "gameTurnNextPlayer",
	"description": "Game resolving current action",
	"type": "game",
	"action": "stGameTurnNextPlayer",
	"updateGameProgression": true,
	"transitions": {
		"last": 15,
		"next": 10,
		"refill": 13
	}
}
					*/
					break;
				case "playerPreFinal":
					/*
					{
	"name": "playerPreFinal",
	"description": "Other players may exchange blueprints before final scoring",
	"descriptionmyturn": "${you} may exchange blueprints into track advancements before final scoring (click on track)",
	"type": "multipleactiveplayer",
	"args": "argPlayerPreFinal",
	"possibleactions": [
		"actionAck",
		"actionBlueprintExchange"
	],
	"transitions": {
		"next": 17,
		"loopback": 12
	}
}
					*/
					break;
				case "gameTurnRefill":
					/*
					{
	"name": "gameTurnRefill",
	"description": "Refill is triggered",
	"type": "game",
	"action": "stGameTurnRefill",
	"updateGameProgression": true,
	"transitions": {
		"next": 11
	}
}
					*/
					break;
				case "playerPostFinal":
					/*
					{
	"name": "playerPostFinal",
	"description": "Other players acknowledging end of game (test state)",
	"descriptionmyturn": "${you} must acknowledge end of game (test state, remove before production)",
	"type": "multipleactiveplayer",
	"action": "stMultiactive",
	"args": "argPlayerPreFinal",
	"possibleactions": [
		"actionAck"
	],
	"transitions": {
		"next": 99
	}
}
					*/
					break;
				case "gameTurnFinalScoring":
					/*
					{
	"name": "gameTurnFinalScoring",
	"description": "Final Scoring is triggered",
	"type": "game",
	"action": "stGameTurnFinalScoring",
	"updateGameProgression": true,
	"transitions": {
		"next": 12,
		"end": 99
	}
}
					*/
					break;
				case "playerTurnUpgradePrompt":
					/*
					{
	"name": "playerTurnUpgradePrompt",
	"description": "${actplayer} can use factory replacement bonus",
	"descriptionmyturn": "${you} can use your Paper factory bonus to replace it",
	"type": "activeplayer",
	"args": "argPlayerTurn",
	"possibleactions": [
		"actionUpgradeFactory"
	],
	"transitions": {
		"next": 11
	}
}
					*/
					break;
				case "gameTurnFinalScoring2":
					/*
					{
	"name": "gameTurnFinalScoring2",
	"description": "Final Scoring is triggered",
	"type": "game",
	"action": "stGameTurnFinalScoring2",
	"updateGameProgression": true,
	"transitions": {
		"next": 99,
		"bonus2x": 18,
		"end": 99
	}
}
					*/
					break;
				case "playerBonus2x":
					/*
					{
	"name": "playerBonus2x",
	"description": "Other player must place 2x multiplier on achievement slot",
	"descriptionmyturn": "${you} must place 2x multiplier on achievement slot",
	"type": "activeplayer",
	"args": "argPlayerPreFinal",
	"possibleactions": [
		"actionPlaceBonus2x"
	],
	"transitions": {
		"next": 17,
		"loopback": 18
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
export default nippon;
