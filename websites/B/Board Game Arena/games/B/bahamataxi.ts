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

const bahamataxi: GamePresence = {
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
				case "moveCheck":
					/*
					{
	"name": "moveCheck",
	"description": "",
	"type": "game",
	"action": "moveCheck",
	"transitions": {
		"cannotmove": 4,
		"canmove": 3,
		"canpickup": 5
	}
}
					*/
					break;
				case "turnBeforeMove":
					/*
					{
	"name": "turnBeforeMove",
	"description": "${actplayer} must move the taxi ${moveString}${moveCounter}${moveString2}",
	"descriptionmyturn": "${you} must move your taxi ${moveString}${moveCounter}${moveString2}",
	"type": "activeplayer",
	"args": "argMoveTurn",
	"possibleactions": [
		"moveTaxi"
	],
	"transitions": {
		"moveTaxi": 4,
		"zombiePass": 6
	}
}
					*/
					break;
				case "dropoffpickupCheck":
					/*
					{
	"name": "dropoffpickupCheck",
	"description": "",
	"type": "game",
	"action": "dropoffpickupCheck",
	"transitions": {
		"cannotpickup": 6,
		"canpickup": 5
	}
}
					*/
					break;
				case "turnAfterMove":
					/*
					{
	"name": "turnAfterMove",
	"description": "${actplayer} may pick up a passenger",
	"descriptionmyturn": "${you} may choose a passenger to pick up",
	"type": "activeplayer",
	"args": "argPickupTurn",
	"possibleactions": [
		"pickupPassenger",
		"pickupPass",
		"drawPassenger"
	],
	"transitions": {
		"pickupLeft": 5,
		"pickupDone": 6,
		"pickupPass": 6,
		"zombiePass": 6,
		"pickupBeforeMoveDone": 2
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
		"gameEnded": 99,
		"notEndedYet": 2
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
export default bahamataxi;
