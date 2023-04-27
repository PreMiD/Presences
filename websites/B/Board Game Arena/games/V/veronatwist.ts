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

const veronatwist: GamePresence = {
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
				case "PlaceCharacters":
					/*
					{
	"name": "PlaceCharacters",
	"description": "${actplayer} must place the characters",
	"descriptionmyturn": "${you} must place the characters",
	"type": "activeplayer",
	"args": "argPlaceCharacters",
	"possibleactions": [
		"PlaceCharacter"
	],
	"transitions": {
		"PlacementDone": 3
	}
}
					*/
					break;
				case "ChooseCharacters":
					/*
					{
	"name": "ChooseCharacters",
	"description": "${actplayer} must choose two characters",
	"descriptionmyturn": "${you} must choose two characters",
	"type": "activeplayer",
	"args": "argChooseCharacters",
	"possibleactions": [
		"ChooseCharacter"
	],
	"transitions": {
		"Chosen": 4
	}
}
					*/
					break;
				case "ChangePlayer":
					/*
					{
	"name": "ChangePlayer",
	"description": "Changing player...",
	"descriptionmyturn": "Changing player...",
	"type": "game",
	"action": "stChangePlayer",
	"transitions": {
		"Play": 5
	}
}
					*/
					break;
				case "MoveCharacters":
					/*
					{
	"name": "MoveCharacters",
	"description": "${actplayer} must move a character",
	"descriptionmyturn": "${you} must move a character",
	"type": "activeplayer",
	"args": "argMoveCharacters",
	"updateGameProgression": true,
	"possibleactions": [
		"MoveCharacter",
		"MoveTokens"
	],
	"transitions": {
		"MoveNext": 4,
		"MovementDone": 6
	}
}
					*/
					break;
				case "Report":
					/*
					{
	"name": "Report",
	"description": "Nurse's report",
	"descriptionmyturn": "Nurse's report",
	"type": "game",
	"action": "stReport",
	"updateGameProgression": true,
	"transitions": {
		"NextTurn": 4,
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
export default veronatwist;
