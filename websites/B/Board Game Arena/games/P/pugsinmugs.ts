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

const pugsinmugs: GamePresence = {
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
				case "playerTurn":
					/*
					{
	"name": "playerTurn",
	"description": "${actplayer} must draw a card from deck or play a Mischief card or get a Mug",
	"descriptionmyturn": "${you} must draw a card from deck or play a Mischief card or get a Mug",
	"type": "activeplayer",
	"possibleactions": [
		"drawCard",
		"playCard",
		"pass",
		"discardFrom",
		"getAMug",
		"stealAMug",
		"scardFrom",
		"digdiscard",
		"gameOver",
		"planDiscardFrom"
	],
	"transitions": {
		"nextaction": 2,
		"passto": 3,
		"gameover": 99
	}
}
					*/
					break;
				case "nextplayerTurn":
					/*
					{
	"name": "nextplayerTurn",
	"description": "",
	"descriptionmyturn": "",
	"type": "game",
	"action": "stNextPlayer",
	"updateGameProgression": true,
	"transitions": {
		"nextplayer": 2,
		"discard": 4,
		"gameover": 99
	}
}
					*/
					break;
				case "discardCards":
					/*
					{
	"name": "discardCards",
	"description": "${actplayer} must discard up to have 5 cards in hand",
	"descriptionmyturn": "${you} must discard up to have 5 cards in hand",
	"type": "activeplayer",
	"possibleactions": [
		"discardACard",
		"gameOver",
		"discardFrom"
	],
	"transitions": {
		"pass": 3,
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
export default pugsinmugs;
