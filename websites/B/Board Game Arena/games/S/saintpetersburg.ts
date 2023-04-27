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

const saintpetersburg: GamePresence = {
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
	"description": "${actplayer} must choose a card or pass",
	"descriptionmyturn": "${you} must choose a card or pass",
	"type": "activeplayer",
	"args": "argPlayerTurn",
	"possibleactions": [
		"selectCard",
		"addCard",
		"buyCard",
		"playCard",
		"useObservatory",
		"pass",
		"autopass",
		"cancel"
	],
	"transitions": {
		"nextPlayer": 11,
		"useObservatory": 14,
		"allPass": 12,
		"zombiePass": 11,
		"zombieAllPass": 12
	}
}
					*/
					break;
				case "nextPlayer":
					/*
					{
	"name": "nextPlayer",
	"type": "game",
	"action": "stNextPlayer",
	"updateGameProgression": false,
	"transitions": {
		"nextTurn": 10,
		"cantPlay": 11,
		"allPass": 12
	}
}
					*/
					break;
				case "scorePhase":
					/*
					{
	"name": "scorePhase",
	"type": "game",
	"action": "stScorePhase",
	"updateGameProgression": false,
	"transitions": {
		"nextPhase": 13,
		"usePub": 15,
		"endGame": 99
	}
}
					*/
					break;
				case "nextPhase":
					/*
					{
	"name": "nextPhase",
	"type": "game",
	"action": "stNextPhase",
	"updateGameProgression": true,
	"transitions": {
		"nextTurn": 10,
		"cantPlay": 11
	}
}
					*/
					break;
				case "useObservatory":
					/*
					{
	"name": "useObservatory",
	"description": "Observatory: ${actplayer} must take or discard",
	"descriptionmyturn": "${card_name}: ${you} must take or discard",
	"type": "activeplayer",
	"args": "argUseObservatory",
	"possibleactions": [
		"buyCard",
		"addCard",
		"discard",
		"cancel"
	],
	"transitions": {
		"nextPlayer": 11,
		"zombiePass": 11,
		"zombieAllPass": 12
	}
}
					*/
					break;
				case "usePub":
					/*
					{
	"name": "usePub",
	"description": "Other players may choose to use Pub",
	"descriptionmyturn": "Pub: ${you} may buy points for 2 Rubles each",
	"type": "multipleactiveplayer",
	"action": "stUsePub",
	"args": "argUsePub",
	"possibleactions": [
		"buyPoints"
	],
	"transitions": {
		"nextPhase": 13
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
export default saintpetersburg;
