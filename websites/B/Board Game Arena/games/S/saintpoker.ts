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

const saintpoker: GamePresence = {
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
		"next": 20
	}
}
					*/
					break;
				case "newHand":
					/*
					{
	"name": "newHand",
	"description": "Shuffle the deck and dealing cards...",
	"type": "game",
	"action": "stNewHand",
	"updateGameProgression": true,
	"transitions": {
		"": 21
	}
}
					*/
					break;
				case "selectRiverCardFromHand":
					/*
					{
	"name": "selectRiverCardFromHand",
	"description": "You may change your selection while you wait for other players to finish selecting a card",
	"descriptionmyturn": "MAKE THE RIVER: ${you} need to select a card from your hand to add to the river",
	"type": "multipleactiveplayer",
	"action": "stSelectRiverCardFromHand",
	"possibleactions": [
		"selectRiverCardFromHand"
	],
	"transitions": {
		"completeSelectRiverCardFromHand": 22
	}
}
					*/
					break;
				case "resolveSelectRiverCardFromHand":
					/*
					{
	"name": "resolveSelectRiverCardFromHand",
	"description": "",
	"type": "game",
	"action": "stCompleteSelectRiverCardFromHand",
	"updateGameProgression": false,
	"transitions": {
		"": 31
	}
}
					*/
					break;
				case "playCards":
					/*
					{
	"name": "playCards",
	"description": "You may change your selection while you wait for other players to finish selecting their cards",
	"descriptionmyturn": "MAKE A HAND: ${you} need to select 2 cards to make a poker hand",
	"type": "multipleactiveplayer",
	"action": "stPlayCards",
	"possibleactions": [
		"playCards"
	],
	"transitions": {
		"completePlayCards": 32
	}
}
					*/
					break;
				case "scoreHands":
					/*
					{
	"name": "scoreHands",
	"description": "",
	"type": "game",
	"action": "stScoreHands",
	"transitions": {
		"pickupCards": 33,
		"endGame": 99
	}
}
					*/
					break;
				case "pickupCards":
					/*
					{
	"name": "pickupCards",
	"description": "Waiting for ${actplayer} turn to take back a card",
	"descriptionmyturn": "TAKE BACK CARDS: ${you} must take back a card from the river or any players table to add back to your hand",
	"type": "activeplayer",
	"possibleactions": [
		"pickupCards"
	],
	"transitions": {
		"": 34
	}
}
					*/
					break;
				case "pickupCardsNext":
					/*
					{
	"name": "pickupCardsNext",
	"description": "",
	"type": "game",
	"action": "stPickUpCardsNext",
	"transitions": {
		"next": 33,
		"endRound": 21
	},
	"updateGameProgression": true
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
	"args": "argGameEnd",
	"updateGameProgression": true
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
export default saintpoker;
