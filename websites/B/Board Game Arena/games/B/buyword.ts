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

const buyword: GamePresence = {
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
				case "RollDice":
					/*
					{
	"name": "RollDice",
	"description": "Rolling the die...",
	"type": "game",
	"action": "stRollDice",
	"updateGameProgression": true,
	"transitions": {
		"DiceDone": 4,
		"DiceDoneChoice": 3
	}
}
					*/
					break;
				case "playerChoice":
					/*
					{
	"name": "playerChoice",
	"description": "${actplayer} must select a value for the die from 2 to 5.",
	"descriptionmyturn": "${you} must select a value for the die from 2 to 5.",
	"type": "activeplayer",
	"action": "stplayerChoice",
	"args": "argplayerChoice",
	"updateGameProgression": true,
	"possibleactions": [
		"Choose2",
		"Choose3",
		"Choose4",
		"Choose5"
	],
	"transitions": {
		"BuyLetters": 4
	}
}
					*/
					break;
				case "BuyLetters":
					/*
					{
	"name": "BuyLetters",
	"description": "Other players must buy letters or discard them.",
	"descriptionmyturn": "${you} must buy letters or discard them.",
	"type": "multipleactiveplayer",
	"action": "stBuyLetters",
	"args": "argBuyLetters",
	"updateGameProgression": true,
	"possibleactions": [
		"BuyLetters",
		"DiscardLetters"
	],
	"transitions": {
		"SellWords": 5
	}
}
					*/
					break;
				case "SellWords":
					/*
					{
	"name": "SellWords",
	"description": "Other players may sell their words.",
	"descriptionmyturn": "${you} may sell your word.",
	"type": "multipleactiveplayer",
	"action": "stSellWords",
	"args": "argSellWords",
	"updateGameProgression": true,
	"possibleactions": [
		"SellWord",
		"Pass"
	],
	"transitions": {
		"DiscardLetters": 6
	}
}
					*/
					break;
				case "DiscardLetters":
					/*
					{
	"name": "DiscardLetters",
	"description": "Other players must discard up to 8 letters or form another word.",
	"descriptionmyturn": "${you} must discard up to 8 letters or form another word.",
	"type": "multipleactiveplayer",
	"action": "stDiscardLetters",
	"args": "argDiscardLetters",
	"updateGameProgression": true,
	"possibleactions": [
		"DiscardLetters",
		"SellWord"
	],
	"transitions": {
		"TurnDone": 7,
		"GameEnd": 99
	}
}
					*/
					break;
				case "NextPlayer":
					/*
					{
	"name": "NextPlayer",
	"description": "Changing player...",
	"type": "game",
	"action": "stNextPlayer",
	"updateGameProgression": true,
	"transitions": {
		"NextPlayer": 2,
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
				case "gameEnd":
					data.state = "Viewing game results";
					break;
			}
		} else data.state = `Waiting for ${activePlayerData.name}`;
		return data;
	},
};
export default buyword;
