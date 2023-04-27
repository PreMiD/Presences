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

const applejack: GamePresence = {
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
		"": 11
	}
}
					*/
					break;
				case "STATE_PLAYER_TURN_TO_PLACE_TILE":
					/*
					{
	"name": "STATE_PLAYER_TURN_TO_PLACE_TILE",
	"description": "${actplayer} must place a tile",
	"descriptionmyturn": "${you} must place a tile",
	"type": "activeplayer",
	"possibleactions": [
		"confirmPlacementFromTrough",
		"drawBlindForPlacement"
	],
	"transitions": {
		"tilePlaced": 12,
		"tilePlacedFromSideField": 18,
		"placeBlindDrawnTile": 17,
		"zombiePass": 12
	}
}
					*/
					break;
				case "STATE_APPLEJACK_MOVE":
					/*
					{
	"name": "STATE_APPLEJACK_MOVE",
	"description": "Applejack is moving",
	"type": "game",
	"action": "stApplejackMove",
	"updateGameProgression": true,
	"transitions": {
		"replenishTroughs": 14,
		"harvesting": 13,
		"blossomScoring": 15,
		"finalScoring": 16
	}
}
					*/
					break;
				case "STATE_HARVESTING":
					/*
					{
	"name": "STATE_HARVESTING",
	"description": "A harvest is happening",
	"type": "game",
	"action": "stHarvesting",
	"transitions": {
		"replenishTroughs": 14
	}
}
					*/
					break;
				case "STATE_REPLENISHMENT_TROUGHS":
					/*
					{
	"name": "STATE_REPLENISHMENT_TROUGHS",
	"description": "Replenishing the troughs",
	"type": "game",
	"action": "stReplenishmentTroughs",
	"transitions": {
		"nextPlayerturn": 11
	}
}
					*/
					break;
				case "STATE_BLOSSOM_SOCRING":
					/*
					{
	"name": "STATE_BLOSSOM_SOCRING",
	"description": "A blossom scoring is happening",
	"type": "game",
	"action": "stBlossomScoring",
	"transitions": {
		"replenishTroughs": 14
	}
}
					*/
					break;
				case "STATE_FINAL_SOCRING":
					/*
					{
	"name": "STATE_FINAL_SOCRING",
	"description": "Final scoring",
	"type": "game",
	"action": "stFinalScoring",
	"transitions": {
		"gameEnd": 99
	}
}
					*/
					break;
				case "STATE_PLACE_BLIND_DRAWN_TILE":
					/*
					{
	"name": "STATE_PLACE_BLIND_DRAWN_TILE",
	"description": "${actplayer} must place the blind drawn tile",
	"descriptionmyturn": "${you} must place your blind drawn tile",
	"type": "activeplayer",
	"args": "argsPlayerTurnPlaceBlindDrawnTile",
	"possibleactions": [
		"confirmPlacementBlindDrawn"
	],
	"transitions": {
		"tilePlaced": 12,
		"zombiePass": 12
	}
}
					*/
					break;
				case "STATE_REFILL_SIDE_FIELD":
					/*
					{
	"name": "STATE_REFILL_SIDE_FIELD",
	"description": "${actplayer} must refill the sidefield",
	"descriptionmyturn": "${you} must refill the sidefield",
	"type": "activeplayer",
	"possibleactions": [
		"confirmSelectingFromTrough",
		"drawBlindForSideField"
	],
	"transitions": {
		"sideFieldRefilled": 12,
		"zombiePass": 12
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
export default applejack;
