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

const boomerangaustralia: GamePresence = {
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
				case "setupNewRound":
					/*
					{
	"name": "setupNewRound",
	"description": "",
	"type": "game",
	"action": "stSetupNewRound",
	"updateGameProgression": true,
	"transitions": {
		"nextPlayer": 3
	}
}
					*/
					break;
				case "selectThrowCard":
					/*
					{
	"name": "selectThrowCard",
	"description": "Waiting for other players to select their throw card",
	"descriptionmyturn": "Select your »Throw« Card",
	"type": "multipleactiveplayer",
	"action": "st_MultiPlayerInit",
	"updateGameProgression": true,
	"possibleactions": [
		"selectCard"
	],
	"transitions": {
		"revealCards": 5
	}
}
					*/
					break;
				case "draft":
					/*
					{
	"name": "draft",
	"description": "Waiting for other players to pick a card",
	"descriptionmyturn": "Pick a card to play on your table",
	"type": "multipleactiveplayer",
	"action": "st_MultiPlayerInit",
	"args": "argDraft",
	"updateGameProgression": true,
	"possibleactions": [
		"selectCard"
	],
	"transitions": {
		"revealCards": 5
	}
}
					*/
					break;
				case "revealCards":
					/*
					{
	"name": "revealCards",
	"description": "",
	"type": "game",
	"action": "stRevealCards",
	"updateGameProgression": true,
	"transitions": {
		"passCards": 6,
		"chooseActivity": 8,
		"endOfRound": 7
	}
}
					*/
					break;
				case "passCards":
					/*
					{
	"name": "passCards",
	"description": "",
	"type": "game",
	"action": "stPassCards",
	"updateGameProgression": true,
	"transitions": {
		"draft": 4,
		"autoSelectLastCard": 9,
		"selectCatchCard": 10
	}
}
					*/
					break;
				case "endOfRoundScoring":
					/*
					{
	"name": "endOfRoundScoring",
	"description": "",
	"type": "game",
	"action": "stEndOfRound",
	"updateGameProgression": true,
	"transitions": {
		"newRound": 2,
		"endOfGame": 99
	}
}
					*/
					break;
				case "chooseActivity":
					/*
					{
	"name": "chooseActivity",
	"description": "Waiting for others players to choose an activity to score",
	"descriptionmyturn": "You may choose an activity to score this round or ",
	"type": "multipleactiveplayer",
	"action": "st_MultiPlayerInit",
	"args": "argChooseActivity",
	"updateGameProgression": true,
	"possibleactions": [
		"chooseActivity"
	],
	"transitions": {
		"endOfRound": 7
	}
}
					*/
					break;
				case "autoSelectLastCard":
					/*
					{
	"name": "autoSelectLastCard",
	"description": "The last card is played automatically",
	"type": "game",
	"action": "stAutoSelectLastCard",
	"updateGameProgression": true,
	"transitions": {
		"revealCards": 5
	}
}
					*/
					break;
				case "selectCatchCard":
					/*
					{
	"name": "selectCatchCard",
	"description": "Waiting for other players to select their catch card",
	"descriptionmyturn": "Select your »Catch« Card. This is the last card to pick in this round!",
	"type": "multipleactiveplayer",
	"action": "st_MultiPlayerInit",
	"updateGameProgression": true,
	"possibleactions": [
		"selectCard"
	],
	"transitions": {
		"revealCards": 5
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
export default boomerangaustralia;
