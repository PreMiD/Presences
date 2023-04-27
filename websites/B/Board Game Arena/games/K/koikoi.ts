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

const koikoi: GamePresence = {
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
		"": 20
	}
}
					*/
					break;
				case "newHand":
					/*
					{
	"name": "newHand",
	"description": "",
	"type": "game",
	"action": "stNewHand",
	"updateGameProgression": true,
	"transitions": {
		"okDeal": 30,
		"strangeDeal": 40
	}
}
					*/
					break;
				case "playerMatchHandCard":
					/*
					{
	"name": "playerMatchHandCard",
	"description": "${actplayer} must play a card",
	"descriptionmyturn": "${you} must play a card",
	"type": "activeplayer",
	"updateGameProgression": true,
	"possibleactions": [
		"playCard"
	],
	"transitions": {
		"playCard": 32,
		"discard": 32,
		"zombiePass": 37
	}
}
					*/
					break;
				case "drawCard":
					/*
					{
	"name": "drawCard",
	"description": "",
	"type": "game",
	"action": "stDrawCard",
	"transitions": {
		"choosePlay": 33,
		"autoPlay": 34
	}
}
					*/
					break;
				case "playerMatchDrawnCard":
					/*
					{
	"name": "playerMatchDrawnCard",
	"description": "${actplayer} must play the drawn card",
	"descriptionmyturn": "${you} must play the drawn card",
	"type": "activeplayer",
	"args": "argPlayerMatchDrawnCard",
	"updateGameProgression": true,
	"possibleactions": [
		"playDrawnCard"
	],
	"transitions": {
		"playDrawnCard": 34,
		"discard": 37,
		"zombiePass": 37
	}
}
					*/
					break;
				case "checkForScoreAfterDraw":
					/*
					{
	"name": "checkForScoreAfterDraw",
	"description": "",
	"type": "game",
	"action": "stCheckForScore",
	"transitions": {
		"mayKoiKoi": 36,
		"noScore": 37,
		"autoStop": 40
	}
}
					*/
					break;
				case "playerChooseKoiKoiAfterDraw":
					/*
					{
	"name": "playerChooseKoiKoiAfterDraw",
	"description": "${actplayer} must call \"Koi\" or stop",
	"descriptionmyturn": "${you} must call \"Koi\" or stop",
	"type": "activeplayer",
	"args": "argPlayerChooseKoikoi",
	"possibleactions": [
		"callKoikoi",
		"pass"
	],
	"transitions": {
		"callKoikoi": 37,
		"pass": 40
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
		"nextPlayer": 30,
		"endHand": 40
	}
}
					*/
					break;
				case "endHand":
					/*
					{
	"name": "endHand",
	"description": "",
	"type": "game",
	"action": "stEndHand",
	"transitions": {
		"nextHand": 41,
		"endGame": 99
	}
}
					*/
					break;
				case "multiplayerReadyNextHand":
					/*
					{
	"name": "multiplayerReadyNextHand",
	"description": "Is everyone ready for the next month?",
	"descriptionmyturn": "Is everyone ready for the next month?",
	"type": "multipleactiveplayer",
	"args": "argMultiplayerReadyNextHand",
	"action": "stMultiplayerReadyNextHand",
	"possibleactions": [
		"readyForNextHand"
	],
	"transitions": {
		"": 20
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
export default koikoi;
