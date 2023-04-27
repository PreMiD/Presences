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

const themotherroad: GamePresence = {
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
	"description": "Rolling the dice...",
	"type": "game",
	"action": "stRollDice",
	"updateGameProgression": true,
	"transitions": {
		"DiceDone": 3
	}
}
					*/
					break;
				case "SelectDice":
					/*
					{
	"name": "SelectDice",
	"description": "${actplayer} must select one dice combination.",
	"descriptionmyturn": "${you} must select one dice combination.",
	"type": "activeplayer",
	"action": "stSelectDice",
	"args": "argSelectDice",
	"possibleactions": [
		"Select",
		"Pass",
		"ForcedPass"
	],
	"transitions": {
		"NextPlayer": 4,
		"Decide": 5,
		"GameEnd": 99
	}
}
					*/
					break;
				case "NextPlayer":
					/*
					{
	"name": "NextPlayer",
	"description": "Next Turn...",
	"type": "game",
	"action": "stNextPlayer",
	"updateGameProgression": true,
	"transitions": {
		"NextPlayer": 2
	}
}
					*/
					break;
				case "Decision":
					/*
					{
	"name": "Decision",
	"description": "${actplayer} must decide if to pass or to re-roll.",
	"descriptionmyturn": "${you} must decide if to pass or to re-roll.",
	"type": "activeplayer",
	"action": "stDecision",
	"args": "argDecision",
	"possibleactions": [
		"Select",
		"Pass",
		"ForcedPass",
		"Reroll"
	],
	"transitions": {
		"NextPlayer": 4,
		"Reroll": 2,
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
export default themotherroad;
