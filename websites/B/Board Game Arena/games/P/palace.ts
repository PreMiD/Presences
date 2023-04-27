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

const palace: GamePresence = {
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
		"next": 20
	}
}
					*/
					break;
				case "newHand":
					/*
					{
	"name": "newHand",
	"description": "Shuffle the deck and dealing cards...",
	"type": "game",
	"action": "stNewHand",
	"updateGameProgression": true,
	"transitions": {
		"next": 21
	}
}
					*/
					break;
				case "switchStartCards":
					/*
					{
	"name": "switchStartCards",
	"description": "Please wait for other players to finish switching cards",
	"descriptionmyturn": "${you} may exchange cards in your hand with your faceup table cards",
	"type": "multipleactiveplayer",
	"action": "stSwitchStartCards",
	"possibleactions": [
		"switchStartCards"
	],
	"transitions": {
		"decideWhoGoesFirst": 22
	}
}
					*/
					break;
				case "whoGoesFirst":
					/*
					{
	"name": "whoGoesFirst",
	"description": "",
	"type": "game",
	"action": "stWhoGoesFirst",
	"updateGameProgression": true,
	"transitions": {
		"": 31
	}
}
					*/
					break;
				case "playerTurn":
					/*
					{
	"name": "playerTurn",
	"description": "${actplayer} turn",
	"descriptionmyturn": "${you} must play a card, or pick up the stack",
	"type": "activeplayer",
	"updateGameProgression": true,
	"possibleactions": [
		"playCards",
		"pickupStack"
	],
	"transitions": {
		"next": 32,
		"playagain": 33,
		"playergoesout": 34
	}
}
					*/
					break;
				case "nextTurn":
					/*
					{
	"name": "nextTurn",
	"description": "",
	"type": "game",
	"action": "stNextTurn",
	"transitions": {
		"": 31
	}
}
					*/
					break;
				case "sameTurn":
					/*
					{
	"name": "sameTurn",
	"description": "",
	"type": "game",
	"action": "stSameTurn",
	"transitions": {
		"": 31
	}
}
					*/
					break;
				case "playergoesout":
					/*
					{
	"name": "playergoesout",
	"description": "",
	"type": "game",
	"action": "stPlayerGoesOut",
	"transitions": {
		"carryon": 31,
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
export default palace;
