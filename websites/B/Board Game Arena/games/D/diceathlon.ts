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

const diceathlon: GamePresence = {
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
		"": 8
	}
}
					*/
					break;
				case "playerRollTurn":
					/*
					{
	"name": "playerRollTurn",
	"description": "${actplayer} must Roll the dice",
	"descriptionmyturn": "",
	"type": "activeplayer",
	"possibleactions": [
		"RollDice",
		"ShowPlayer",
		"gameover"
	],
	"transitions": {
		"getadie": 3,
		"gameover": 99
	}
}
					*/
					break;
				case "playerGADTurn":
					/*
					{
	"name": "playerGADTurn",
	"description": "${actplayer} must select a die",
	"descriptionmyturn": "${you} must select a die",
	"type": "activeplayer",
	"possibleactions": [
		"ShowPlayer",
		"rerolldie",
		"placethedie",
		"passturn",
		"gameover"
	],
	"transitions": {
		"gonextpl": 4,
		"gameover": 99
	}
}
					*/
					break;
				case "changePlayer":
					/*
					{
	"name": "changePlayer",
	"description": "activate next player",
	"descriptionmyturn": "activate next player",
	"type": "game",
	"action": "stNextPlayer",
	"transitions": {
		"newroll": 2,
		"nextpl": 3,
		"gameover": 99
	}
}
					*/
					break;
				case "mplayerRollTurn":
					/*
					{
	"name": "mplayerRollTurn",
	"description": "${you} must Roll your dice",
	"descriptionmyturn": "",
	"type": "private",
	"possibleactions": [
		"RollDice",
		"ShowPlayer",
		"gameover"
	],
	"transitions": {
		"getadie": 6,
		"gameover": 99
	}
}
					*/
					break;
				case "mplayerGADTurn":
					/*
					{
	"name": "mplayerGADTurn",
	"description": "${you} must select a die",
	"descriptionmyturn": "${you} must select a die",
	"type": "private",
	"possibleactions": [
		"ShowPlayer",
		"rerolldie",
		"placethedie",
		"passturn",
		"gameover"
	],
	"transitions": {
		"newroll": 5,
		"gameover": 99
	}
}
					*/
					break;
				case "startTheGame":
					/*
					{
	"name": "startTheGame",
	"description": "start the game",
	"descriptionmyturn": "start the game",
	"type": "game",
	"action": "stByOption",
	"transitions": {
		"seq": 2,
		"multi": 10
	}
}
					*/
					break;
				case "activateplayers":
					/*
					{
	"name": "activateplayers",
	"description": "",
	"descriptionmyturn": "",
	"type": "multipleactiveplayer",
	"initialprivate": 5,
	"action": "ststartmulti",
	"transitions": {
		"EndTurn": 6,
		"RollDice": 5,
		"gameover": 99,
		"waitothers": 9
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
export default diceathlon;
