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

const chocolatefactory: GamePresence = {
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
				case "next":
					/*
					{
	"name": "next",
	"type": "game",
	"action": "stGameNext",
	"transitions": {
		"nextPhase": 10,
		"expandRecruit": 30,
		"runFactory": 40,
		"simultaneousRunFactory": 41,
		"fulfilOrdersPreCheck": 59,
		"cleanupActions": 60
	}
}
					*/
					break;
				case "nextPlayer":
					/*
					{
	"name": "nextPlayer",
	"type": "game",
	"action": "stGameNextPlayer",
	"updateGameProgression": true,
	"transitions": {
		"next": 2,
		"nextPhase": 10
	}
}
					*/
					break;
				case "nextPhase":
					/*
					{
	"name": "nextPhase",
	"type": "game",
	"action": "stGameNextPhase",
	"updateGameProgression": true,
	"transitions": {
		"prepare": 11,
		"cleanup": 60,
		"next": 2,
		"gameoverSolo": 97,
		"gameover": 98
	}
}
					*/
					break;
				case "gamePrepare":
					/*
					{
	"name": "gamePrepare",
	"type": "game",
	"action": "stGamePrepare",
	"transitions": {
		"next": 2
	}
}
					*/
					break;
				case "expandRecruit":
					/*
					{
	"name": "expandRecruit",
	"description": "${actplayer} must expand and/or recruit",
	"descriptionmyturn": "${you} ${description}",
	"type": "activeplayer",
	"args": "argExpandRecruit",
	"possibleactions": [
		"expand",
		"recruit"
	],
	"transitions": {
		"nextPlayer": 3,
		"zombiePass": 3
	}
}
					*/
					break;
				case "runFactory":
					/*
					{
	"name": "runFactory",
	"description": "${actplayer} must run their factory shifts",
	"descriptionmyturn": "${you} must run a factory shift (${shift_instance} of ${num_shifts})",
	"type": "activeplayer",
	"possibleactions": [
		"runFactory"
	],
	"args": "argRunFactory",
	"transitions": {
		"next": 3,
		"zombiePass": 3
	}
}
					*/
					break;
				case "simultaneousRunFactory":
					/*
					{
	"name": "simultaneousRunFactory",
	"description": "All players must run their factory shifts",
	"descriptionmyturn": "${you} must run a factory shift (${shift_instance} of ${num_shifts})",
	"type": "multipleactiveplayer",
	"args": "argRunFactory",
	"possibleactions": [
		"runFactory"
	],
	"transitions": {
		"next": 10,
		"zombiePass": 10
	}
}
					*/
					break;
				case "fulfilOrders":
					/*
					{
	"name": "fulfilOrders",
	"description": "${actplayer} may fulfill orders",
	"descriptionmyturn": "${you} may fulfill orders",
	"type": "activeplayer",
	"possibleactions": [
		"fulfilOrders"
	],
	"transitions": {
		"next": 3,
		"zombiePass": 3
	}
}
					*/
					break;
				case "simultaneousFulfilOrders":
					/*
					{
	"name": "simultaneousFulfilOrders",
	"description": "All players may fulfill orders",
	"descriptionmyturn": "${you} may fulfill orders",
	"type": "multipleactiveplayer",
	"possibleactions": [
		"fulfilOrders"
	],
	"transitions": {
		"next": 10,
		"zombiePass": 10
	}
}
					*/
					break;
				case "lastDayMoveChocolates":
					/*
					{
	"name": "lastDayMoveChocolates",
	"type": "game",
	"action": "stGameLastDayMoveChocolates",
	"transitions": {
		"fulfilOrders": 50,
		"simultaneousFulfilOrders": 51
	}
}
					*/
					break;
				case "cleanupActions":
					/*
					{
	"name": "cleanupActions",
	"type": "game",
	"action": "stGameCleanupActions",
	"transitions": {
		"employee": 61,
		"pickupOrders": 62,
		"discardChocolate": 63,
		"nextPlayer": 3
	}
}
					*/
					break;
				case "cleanupEmployee":
					/*
					{
	"name": "cleanupEmployee",
	"description": "${actplayer} may use Department Store Agent",
	"descriptionmyturn": "${you} may use Department Store Agent",
	"type": "activeplayer",
	"possibleactions": [
		"fulfilOrders"
	],
	"transitions": {
		"next": 64,
		"zombiePass": 64
	}
}
					*/
					break;
				case "cleanupPickOrders":
					/*
					{
	"name": "cleanupPickOrders",
	"description": "${actplayer} must replace completed corner shop orders",
	"descriptionmyturn": "${you} must replace completed corner shop orders",
	"type": "activeplayer",
	"args": "argCleanupPickOrders",
	"possibleactions": [
		"replaceOrder"
	],
	"transitions": {
		"next": 60,
		"zombiePass": 60
	}
}
					*/
					break;
				case "cleanupDiscardChocolate":
					/*
					{
	"name": "cleanupDiscardChocolate",
	"description": "${actplayer} may keep ${chocolate_limit} pieces of chocolate",
	"descriptionmyturn": "${you} may keep ${chocolate_limit} pieces of chocolate",
	"type": "activeplayer",
	"args": "argCleanupDiscardChocolate",
	"possibleactions": [
		"keepChocolate"
	],
	"transitions": {
		"next": 60,
		"zombiePass": 60
	}
}
					*/
					break;
				case "cleanupEmployeeDone":
					/*
					{
	"name": "cleanupEmployeeDone",
	"type": "game",
	"action": "stGameCleanupEmployeeDone",
	"transitions": {
		"next": 60,
		"gameover": 98,
		"gameoverSolo": 97
	}
}
					*/
					break;
				case "gameoverSolo":
					/*
					{
	"name": "gameoverSolo",
	"type": "game",
	"action": "stGameoverSolo",
	"transitions": {
		"gameover": 99
	}
}
					*/
					break;
				case "gameover":
					/*
					{
	"name": "gameover",
	"type": "game",
	"action": "stGameover",
	"transitions": {
		"gameover": 99
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
export default chocolatefactory;
