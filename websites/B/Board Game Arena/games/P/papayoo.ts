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

const papayoo: GamePresence = {
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
		"": 21
	}
}
					*/
					break;
				case "giveCards":
					/*
					{
	"name": "giveCards",
	"description": "Some players must choose ${nbr_cards} cards to give to next player",
	"descriptionmyturn": "${you} must choose ${nbr_cards} cards to give to next player",
	"type": "multipleactiveplayer",
	"action": "stGiveCards",
	"args": "argGiveCards",
	"possibleactions": [
		"giveCards"
	],
	"transitions": {
		"giveCards": 22,
		"skip": 22
	}
}
					*/
					break;
				case "takeCards":
					/*
					{
	"name": "takeCards",
	"description": "",
	"type": "game",
	"action": "stTakeCards",
	"transitions": {
		"throwDice": 23,
		"skip": 23
	}
}
					*/
					break;
				case "throwDice":
					/*
					{
	"name": "throwDice",
	"description": "",
	"type": "game",
	"action": "stThrowDice",
	"transitions": {
		"startHand": 30,
		"skip": 30
	}
}
					*/
					break;
				case "newTrick":
					/*
					{
	"name": "newTrick",
	"description": "",
	"type": "game",
	"action": "stNewTrick",
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
	"description": "${actplayer} must play a card",
	"descriptionmyturn": "${you} must play a card",
	"type": "activeplayer",
	"args": "argPlayCard",
	"possibleactions": [
		"playCard"
	],
	"transitions": {
		"cardPlayed": 32
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
		"nextPlayer": 31,
		"endTrick": 33
	}
}
					*/
					break;
				case "endOfTrick":
					/*
					{
	"name": "endOfTrick",
	"description": "",
	"type": "game",
	"action": "stEndOfTrick",
	"transitions": {
		"nextTrick": 30,
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
		"nextHand": 20,
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
export default papayoo;
