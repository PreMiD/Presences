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

const signorie: GamePresence = {
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
		"": 3
	}
}
					*/
					break;
				case "playerTurn":
					/*
					{
	"name": "playerTurn",
	"description": "${actplayer} must select a die to perform an action or pass",
	"descriptionmyturn": "${you} must select a die to perform an action or pass",
	"args": "arg_playerTurnMain",
	"type": "activeplayer",
	"possibleactions": [
		"playAction",
		"pass"
	],
	"transitions": {
		"next": 4,
		"helper": 6
	}
}
					*/
					break;
				case "gameTurnRoundSetup":
					/*
					{
	"name": "gameTurnRoundSetup",
	"description": "Round setup",
	"type": "game",
	"action": "st_gameTurnRoundSetup",
	"updateGameProgression": true,
	"transitions": {
		"next": 2
	}
}
					*/
					break;
				case "gameTurnNextPlayer":
					/*
					{
	"name": "gameTurnNextPlayer",
	"description": "",
	"type": "game",
	"action": "st_gameTurnNextPlayer",
	"updateGameProgression": true,
	"transitions": {
		"next": 2,
		"loopback": 4,
		"last": 5
	}
}
					*/
					break;
				case "gameTurnRoundRewards":
					/*
					{
	"name": "gameTurnRoundRewards",
	"description": "Round rewards",
	"type": "game",
	"action": "st_gameTurnRoundRewards",
	"updateGameProgression": true,
	"transitions": {
		"endGame": 99,
		"next": 3,
		"reward": 7,
		"helper": 6
	}
}
					*/
					break;
				case "playerTurnHelper":
					/*
					{
	"name": "playerTurnHelper",
	"description": "${actplayer} performing helper actions",
	"descriptionmyturn": "${you} may perform helper actions",
	"args": "arg_playerTurnHelper",
	"type": "activeplayer",
	"possibleactions": [
		"playHelper"
	],
	"transitions": {
		"next": 4,
		"helper": 6
	}
}
					*/
					break;
				case "playerTurnReward":
					/*
					{
	"name": "playerTurnReward",
	"description": "${actplayer} picking a reward",
	"descriptionmyturn": "${you} must pick a reward",
	"args": "arg_playerTurnReward",
	"type": "activeplayer",
	"possibleactions": [
		"playPickReward"
	],
	"transitions": {
		"next": 5,
		"helper": 6
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
export default signorie;
