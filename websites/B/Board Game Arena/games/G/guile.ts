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

const guile: GamePresence = {
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
				case "SelectFaction":
					/*
					{
	"name": "SelectFaction",
	"description": "${actplayer} must select a Faction.",
	"descriptionmyturn": "${you} must select a Faction.",
	"type": "activeplayer",
	"possibleactions": [
		"SelectFaction"
	],
	"transitions": {
		"DraftCard": 3
	}
}
					*/
					break;
				case "DraftCard":
					/*
					{
	"name": "DraftCard",
	"description": "Wait for your opponent to select a card and pass the rest.",
	"descriptionmyturn": "You must select a card and pass the rest.",
	"type": "multipleactiveplayer",
	"action": "stDraftCard",
	"updateGameProgression": true,
	"possibleactions": [
		"SelectCard"
	],
	"transitions": {
		"DraftDone": 4
	}
}
					*/
					break;
				case "ReceiveCards":
					/*
					{
	"name": "ReceiveCards",
	"description": "Players receive cards from their opponent.",
	"type": "game",
	"action": "stReceiveCards",
	"updateGameProgression": true,
	"transitions": {
		"NextDraft": 3,
		"StartTurn": 5
	}
}
					*/
					break;
				case "PlaceCard":
					/*
					{
	"name": "PlaceCard",
	"description": "Wait for your opponent to place his influence cards.",
	"descriptionmyturn": "You must place your influence cards.",
	"type": "multipleactiveplayer",
	"action": "stPlaceCard",
	"updateGameProgression": true,
	"possibleactions": [
		"PlaceCard"
	],
	"transitions": {
		"PlaceCardDone": 6
	}
}
					*/
					break;
				case "PlayerTurn":
					/*
					{
	"name": "PlayerTurn",
	"description": "${actplayer} must reveal a card or swap two cards.",
	"descriptionmyturn": "${you} must reveal a card or swap two cards.",
	"type": "activeplayer",
	"action": "stPlayerTurn",
	"args": "argPlayerTurn",
	"updateGameProgression": true,
	"possibleactions": [
		"RevealCard",
		"RevealDone",
		"SwapCard"
	],
	"transitions": {
		"NextPlayer": 7,
		"CalculateScore": 8
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
		"NextPlayer": 6
	}
}
					*/
					break;
				case "CalculateScore":
					/*
					{
	"name": "CalculateScore",
	"description": "Calculate Scores...",
	"descriptionmyturn": "Calculate Scores...",
	"type": "multipleactiveplayer",
	"action": "stCalculateScore",
	"args": "argCalculateScore",
	"possibleactions": [
		"Continue"
	],
	"updateGameProgression": true,
	"transitions": {
		"NextTurn": 9
	}
}
					*/
					break;
				case "NextTurn":
					/*
					{
	"name": "NextTurn",
	"description": "Next turn.",
	"type": "game",
	"action": "stNextTurn",
	"updateGameProgression": true,
	"transitions": {
		"NextTurn": 3,
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
export default guile;
