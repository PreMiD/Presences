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

const similo: GamePresence = {
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
		"": 20
	}
}
					*/
					break;
				case "play_clue":
					/*
					{
	"name": "play_clue",
	"description": "${actplayer} must play a card as a clue",
	"descriptionmyturn": "${you} must play a card as a clue",
	"args": "argsPlayClue",
	"type": "activeplayer",
	"updateGameProgression": true,
	"possibleactions": [
		"playClue"
	],
	"transitions": {
		"guessCharacter": 40,
		"finish": 99
	}
}
					*/
					break;
				case "guess_character":
					/*
					{
	"name": "guess_character",
	"description": "Guessers must vote for the character card(s) to remove",
	"descriptionmyturn": "${you} must vote for the character card(s) to remove",
	"args": "argsGuessCharacter",
	"type": "multipleactiveplayer",
	"possibleactions": [
		"pinCharacter",
		"unpinCharacter",
		"voting",
		"cancelVoting"
	],
	"transitions": {
		"checkFinish": 80
	}
}
					*/
					break;
				case "referee_confirm":
					/*
					{
	"name": "referee_confirm",
	"description": "The referee for this round must choose ${cards_to_select} card(s) to remove among those in the tie",
	"descriptionmyturn": "${you} must choose ${cards_to_select} card(s) to remove among those in the tie",
	"args": "argsRefereeConfirm",
	"type": "activeplayer",
	"possibleactions": [
		"breakTie"
	],
	"transitions": {
		"checkFinish": 80,
		"finish": 99
	}
}
					*/
					break;
				case "check_finish":
					/*
					{
	"name": "check_finish",
	"type": "game",
	"action": "stCheckFinish",
	"transitions": {
		"playClue": 20,
		"refereeConfirm": 60,
		"finish": 99
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
export default similo;
