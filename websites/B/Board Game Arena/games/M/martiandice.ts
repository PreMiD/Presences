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

const martiandice: GamePresence = {
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
				case "nextPlayer":
					/*
					{
	"name": "nextPlayer",
	"description": "",
	"type": "game",
	"action": "stThrowAllDice",
	"updateGameProgression": true,
	"transitions": {
		"diceChoosing": 3,
		"endOrEnd": 5
	}
}
					*/
					break;
				case "diceChoosing":
					/*
					{
	"name": "diceChoosing",
	"description": "${actplayer} must choose a dice type to set aside",
	"descriptionmyturn": "${you} must choose a dice type to set aside",
	"type": "activeplayer",
	"args": "argPlayerTurn",
	"possibleactions": [
		"diceSetAside",
		"endTurn"
	],
	"transitions": {
		"continueOrEnd": 4,
		"nextPlayer": 2,
		"tieBreakingOrEnd": 6
	}
}
					*/
					break;
				case "continueOrEnd":
					/*
					{
	"name": "continueOrEnd",
	"description": "${actplayer} may choose to roll all available dice or end the turn",
	"descriptionmyturn": "${you} may choose to ",
	"type": "activeplayer",
	"args": "argPlayerTurn",
	"possibleactions": [
		"rerollDice",
		"endTurn"
	],
	"transitions": {
		"diceChoosing": 3,
		"nextPlayer": 2,
		"tieBreakingOrEnd": 6,
		"endOrEnd": 5
	}
}
					*/
					break;
				case "endOrEnd":
					/*
					{
	"name": "endOrEnd",
	"description": "${actplayer} rolled too many tanks and should end the turn",
	"descriptionmyturn": "${you} rolled too many tanks and the only option is to ",
	"type": "activeplayer",
	"args": "argPlayerTurn",
	"possibleactions": [
		"endTurn"
	],
	"transitions": {
		"nextPlayer": 2,
		"tieBreakingOrEnd": 6
	}
}
					*/
					break;
				case "tieBreakingOrEnd":
					/*
					{
	"name": "tieBreakingOrEnd",
	"description": "Tie breaker round!",
	"type": "game",
	"action": "stThrowTieBreaker",
	"transitions": {
		"gameEnd": 99
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
export default martiandice;
