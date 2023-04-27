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

const redsevengame: GamePresence = {
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
				case "playFirst":
					/*
					{
	"name": "playFirst",
	"description": "${actplayer} must play a card to palette or to canvas or pass",
	"descriptionmyturn": "${you} must play a card",
	"type": "activeplayer",
	"action": "stPlayFirst",
	"possibleactions": [
		"playPalette",
		"playCanvas",
		"finish",
		"pass"
	],
	"transitions": {
		"playSecond": 3,
		"nextPlayer": 4,
		"playAction1": 11,
		"playAction7": 12,
		"playAdPalette": 13
	}
}
					*/
					break;
				case "playSecond":
					/*
					{
	"name": "playSecond",
	"description": "${actplayer} must play a card to canvas or finish their turn or pass",
	"descriptionmyturn": "${you} must play a card",
	"type": "activeplayer",
	"args": "argIsPlayerWining",
	"possibleactions": [
		"playCanvas",
		"finish",
		"pass",
		"undo"
	],
	"transitions": {
		"playSecond": 3,
		"nextPlayer": 4
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
	"args": "argNbrCardsInHand",
	"action": "stNextPlayer",
	"updateGameProgression": true,
	"transitions": {
		"endGame": 99,
		"playFirst": 2,
		"newRound": 5
	}
}
					*/
					break;
				case "newRound":
					/*
					{
	"name": "newRound",
	"description": "",
	"type": "game",
	"action": "stnewRound",
	"updateGameProgression": true,
	"transitions": {
		"playFirst": 2,
		"endGame": 99
	}
}
					*/
					break;
				case "playAction1":
					/*
					{
	"name": "playAction1",
	"description": "Action rule One: ${actplayer} must pick a card from another player's Palette",
	"descriptionmyturn": "Action rule One: ${you} must move a card from another player's Palette",
	"type": "activeplayer",
	"possibleactions": [
		"playAction1"
	],
	"transitions": {
		"playSecond": 3
	}
}
					*/
					break;
				case "playAction7":
					/*
					{
	"name": "playAction7",
	"description": "Action rule Seven: ${actplayer} must pick a card from their Palette",
	"descriptionmyturn": "Action rule Seven: ${you} must move a card from your Palette",
	"type": "activeplayer",
	"possibleactions": [
		"playCanvas",
		"playAction7",
		"pass"
	],
	"transitions": {
		"playSecond": 3,
		"nextPlayer": 4
	}
}
					*/
					break;
				case "playAdPalette":
					/*
					{
	"name": "playAdPalette",
	"description": "Action rule Five: ${actplayer} must play a card to their Palette",
	"descriptionmyturn": "Action rule Five: ${you} must play a card",
	"type": "activeplayer",
	"possibleactions": [
		"playPalette",
		"pass"
	],
	"transitions": {
		"playSecond": 3,
		"nextPlayer": 4,
		"playAction1": 11,
		"playAction7": 12,
		"playAdPalette": 13
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
export default redsevengame;
