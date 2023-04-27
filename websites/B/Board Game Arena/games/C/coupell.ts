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

const coupell: GamePresence = {
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
				case "drawCards":
					/*
					{
	"name": "drawCards",
	"description": "",
	"type": "game",
	"action": "stDrawCards",
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
	"description": "${actplayer} may give a card, move a partner's card, or claim a word (${action_done}/2)",
	"descriptionmyturn": "${you} may give a card, move a partner's card, or claim a word (${action_done}/2)",
	"type": "activeplayer",
	"args": "argPlayerTurn",
	"possibleactions": [
		"arrangeCard",
		"giveCard",
		"moveCard",
		"claimWord",
		"passTurn"
	],
	"transitions": {
		"actionLeft": 3,
		"confirmTurn": 4,
		"endTurn": 5,
		"zombiePass": 5
	}
}
					*/
					break;
				case "confirmTurn":
					/*
					{
	"name": "confirmTurn",
	"description": "${actplayer} must confirm or cancel card movement (${action_done}/2)",
	"descriptionmyturn": "${you} must confirm or cancel card movement (${action_done}/2)",
	"type": "activeplayer",
	"args": "argConfirmTurn",
	"possibleactions": [
		"arrangeCard",
		"confirmTurn",
		"cancelTurn"
	],
	"transitions": {
		"cancelTurn": 3,
		"actionLeft": 3,
		"endTurn": 5,
		"zombiePass": 5
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
		"drawCards": 2,
		"lastRound": 3,
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
export default coupell;
