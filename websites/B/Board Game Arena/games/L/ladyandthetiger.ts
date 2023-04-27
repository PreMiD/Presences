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

const ladyandthetiger: GamePresence = {
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
		"": 10
	}
}
					*/
					break;
				case "assignRoles":
					/*
					{
	"name": "assignRoles",
	"description": "",
	"type": "game",
	"action": "stNewContest",
	"updateGameProgression": true,
	"transitions": {
		"": 10
	}
}
					*/
					break;
				case "switchPlayer":
					/*
					{
	"name": "switchPlayer",
	"description": "",
	"type": "game",
	"action": "stNextPlayer",
	"transitions": {
		"collector": 10,
		"guesser": 20
	}
}
					*/
					break;
				case "collectorAction":
					/*
					{
	"name": "collectorAction",
	"description": "${actplayer} (Collector) must choose a card from the display",
	"descriptionmyturn": "${you} (Collector) must choose a card from the display",
	"type": "activeplayer",
	"args": "argGetRole",
	"possibleactions": [
		"collectCard"
	],
	"transitions": {
		"endContest": 90,
		"nextPlayer": 9
	}
}
					*/
					break;
				case "guesserDiscard":
					/*
					{
	"name": "guesserDiscard",
	"description": "${actplayer} (Guesser) must guess, match a set, or discard a card from the display",
	"descriptionmyturn": "${you} (Guesser) must guess, match a set, or discard a card from the display",
	"type": "activeplayer",
	"args": "argGetRole",
	"possibleactions": [
		"discardCard",
		"match",
		"guess"
	],
	"transitions": {
		"endContest": 90,
		"guesser": 21
	}
}
					*/
					break;
				case "guesserAction":
					/*
					{
	"name": "guesserAction",
	"description": "${actplayer} (Guesser) must guess, match a set, or pass",
	"descriptionmyturn": "${you} (Guesser) must guess, match a set, or pass",
	"type": "activeplayer",
	"args": "argGetRole",
	"possibleactions": [
		"guess",
		"match",
		"pass"
	],
	"transitions": {
		"endContest": 90,
		"nextPlayer": 9
	}
}
					*/
					break;
				case "contestEnd":
					/*
					{
	"name": "contestEnd",
	"description": "",
	"type": "game",
	"action": "stContestEnd",
	"transitions": {
		"endGame": 99,
		"newContest": 2
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
export default ladyandthetiger;
