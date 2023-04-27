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

const pyramidpoker: GamePresence = {
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
				case "PlaceTile":
					/*
					{
	"name": "PlaceTile",
	"description": "${actplayer} must select and place a tile",
	"descriptionmyturn": "${you} must select and place a tile",
	"type": "activeplayer",
	"args": "argPlaceTile",
	"action": "stPlaceTile",
	"possibleactions": [
		"RevealCard",
		"PlaceTile"
	],
	"transitions": {
		"NextPlayer": 3,
		"GotoCreateHand": 4,
		"GameEnd": 99
	}
}
					*/
					break;
				case "NextPlayer":
					/*
					{
	"name": "NextPlayer",
	"description": "Changing player...",
	"type": "game",
	"action": "stNextPlayer",
	"updateGameProgression": true,
	"transitions": {
		"NextPlayer": 2
	}
}
					*/
					break;
				case "GotoCreateHand":
					/*
					{
	"name": "GotoCreateHand",
	"description": "Changing player...",
	"type": "game",
	"action": "stGotoCreateHand",
	"updateGameProgression": true,
	"transitions": {
		"GotoCreateHand": 5
	}
}
					*/
					break;
				case "CreateHand":
					/*
					{
	"name": "CreateHand",
	"description": "${actplayer} must select tile and place into his hand",
	"descriptionmyturn": "${you} must select tile and place into your hand",
	"type": "activeplayer",
	"action": "stCreateHand",
	"args": "argCreateHand",
	"possibleactions": [
		"PickHand",
		"CreateHand",
		"CreateHand2"
	],
	"transitions": {
		"NextPlayer": 6,
		"GameEnd": 99
	}
}
					*/
					break;
				case "NextPlayer2":
					/*
					{
	"name": "NextPlayer2",
	"description": "Changing player...",
	"type": "game",
	"action": "stNextPlayer2",
	"updateGameProgression": true,
	"transitions": {
		"NextPlayer": 5
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
export default pyramidpoker;
