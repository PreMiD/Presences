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

const oriflamme: GamePresence = {
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
				case "gameStart":
					/*
					{
	"name": "gameStart",
	"type": "manager",
	"action": "stGameStart",
	"transitions": {
		"startRound": 10
	}
}
					*/
					break;
				case "startRound":
					/*
					{
	"name": "startRound",
	"updateGameProgression": true,
	"type": "manager",
	"action": "stStartRound",
	"transitions": {
		"nextPlayer": 15
	}
}
					*/
					break;
				case "playCard":
					/*
					{
	"name": "playCard",
	"type": "activeplayer",
	"action": "stPlayCard",
	"updateGameProgression": true,
	"description": "${actplayer} must play a card",
	"descriptionmyturn": "${you} must play a card",
	"possibleactions": [
		"playCard"
	],
	"transitions": {
		"onCardPlayed": 20,
		"zombiePass": 20
	}
}
					*/
					break;
				case "afterPlay":
					/*
					{
	"name": "afterPlay",
	"type": "manager",
	"updateGameProgression": true,
	"action": "stAfterPlay",
	"transitions": {
		"nextPlayer": 15,
		"allCardPlayed": 25
	}
}
					*/
					break;
				case "startResolution":
					/*
					{
	"name": "startResolution",
	"type": "manager",
	"updateGameProgression": true,
	"action": "stStartResolution",
	"transitions": {
		"newPosition": 30
	}
}
					*/
					break;
				case "preparePosition":
					/*
					{
	"name": "preparePosition",
	"type": "manager",
	"updateGameProgression": true,
	"action": "stPreparePosition",
	"transitions": {
		"cardHidden": 35,
		"needAction": 40,
		"afterAction": 50
	}
}
					*/
					break;
				case "askReveal":
					/*
					{
	"name": "askReveal",
	"type": "activeplayer",
	"action": "stAskReveal",
	"updateGameProgression": true,
	"args": "argAskReveal",
	"description": "${actplayer} chooses to reveal his card or not",
	"descriptionmyturn": "${you} must choose",
	"possibleactions": [
		"doRevealCard",
		"doHideCard"
	],
	"transitions": {
		"stayHidden": 90,
		"afterReveal": 30,
		"zombiePass": 90
	}
}
					*/
					break;
				case "askAction":
					/*
					{
	"name": "askAction",
	"type": "activeplayer",
	"action": "stAskAction",
	"updateGameProgression": true,
	"args": "argAskAction",
	"description": "",
	"descriptionmyturn": "",
	"possibleactions": [
		"doPositionSelection",
		"doAutoAction"
	],
	"transitions": {
		"afterAction": 50,
		"shapeshifter": 40,
		"zombiePass": 90
	}
}
					*/
					break;
				case "afterAction":
					/*
					{
	"name": "afterAction",
	"type": "manager",
	"updateGameProgression": true,
	"action": "stAfterAction",
	"transitions": {
		"actionDone": 90
	}
}
					*/
					break;
				case "nextPosition":
					/*
					{
	"name": "nextPosition",
	"updateGameProgression": true,
	"type": "manager",
	"action": "stNextPosition",
	"transitions": {
		"newPosition": 30,
		"endInfluence": 10,
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
export default oriflamme;
