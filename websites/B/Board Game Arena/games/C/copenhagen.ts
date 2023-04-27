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

const copenhagen: GamePresence = {
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
	"action": "stNextPlayer",
	"updateGameProgression": true,
	"transitions": {
		"playerTurn": 3
	}
}
					*/
					break;
				case "playerTurn":
					/*
					{
	"name": "playerTurn",
	"description": "${actplayer} must take a card or place a facade tile",
	"descriptionmyturn": "${you} must take a card or place a facade tile",
	"type": "activeplayer",
	"possibleactions": [
		"takeCard",
		"placePolyomino",
		"activateAbilityAnyCards",
		"activateAbilityAdditionalCard",
		"activateAbilityBothActions",
		"activateAbilityConstructionDiscount",
		"activateAbilityChangeOfColors",
		"undo"
	],
	"transitions": {
		"checkHandSize": 4,
		"calculateScore": 7,
		"coatOfArms": 8,
		"zombiePass": 50
	}
}
					*/
					break;
				case "checkHandSize":
					/*
					{
	"name": "checkHandSize",
	"description": "",
	"type": "game",
	"action": "stCheckHandSize",
	"transitions": {
		"takeAdjacentCard": 5,
		"takeAdditionalCard": 9,
		"discardDownToMaxHandSize": 6,
		"takeCardsLastCall": 10,
		"placePolyominoAfterTakingCards": 11,
		"refillHarbor": 50
	}
}
					*/
					break;
				case "takeAdjacentCard":
					/*
					{
	"name": "takeAdjacentCard",
	"args": "argTakeAdjacentCard",
	"description": "${actplayer} must take another card",
	"descriptionmyturn": "${you} must take another card next to the one you just took",
	"type": "activeplayer",
	"possibleactions": [
		"takeCard",
		"activateAbilityAnyCards",
		"activateAbilityAdditionalCard",
		"activateAbilityBothActions",
		"undo"
	],
	"transitions": {
		"checkHandSize": 4,
		"zombiePass": 50
	}
}
					*/
					break;
				case "discardDownToMaxHandSize":
					/*
					{
	"name": "discardDownToMaxHandSize",
	"description": "${actplayer} must discard a card",
	"descriptionmyturn": "${you} must discard a card. You can only have 7 cards in hand.",
	"type": "activeplayer",
	"possibleactions": [
		"discard",
		"undo"
	],
	"transitions": {
		"takeAdjacentCard": 5,
		"takeAdditionalCard": 9,
		"discardDownToMaxHandSize": 6,
		"takeCardsLastCall": 10,
		"placePolyominoAfterTakingCards": 11,
		"refillHarbor": 50,
		"zombiePass": 50
	}
}
					*/
					break;
				case "calculateScore":
					/*
					{
	"name": "calculateScore",
	"description": "",
	"type": "game",
	"action": "stCalculateScore",
	"transitions": {
		"coatOfArms": 8,
		"refillHarbor": 50,
		"endGame": 99
	}
}
					*/
					break;
				case "coatOfArms":
					/*
					{
	"name": "coatOfArms",
	"action": "stCoatOfArms",
	"description": "${actplayer} must take an ability tile ${title_ability_tile}, place a special facade tile ${title_special_facade_tile}, or flip over ALL their used ability tiles ${title_ability_tile_used}",
	"descriptionmyturn": "${you} must take an ability tile ${title_ability_tile}, place a special facade tile ${title_special_facade_tile}, or flip over ALL your used ability tiles ${title_ability_tile_used}",
	"type": "activeplayer",
	"possibleactions": [
		"placePolyomino",
		"takeAbilityTile",
		"resetUsedAbilities",
		"undo"
	],
	"transitions": {
		"coatOfArms": 8,
		"calculateScore": 7,
		"refillHarbor": 50,
		"zombiePass": 50
	}
}
					*/
					break;
				case "takeAdditionalCard":
					/*
					{
	"name": "takeAdditionalCard",
	"description": "${actplayer} must take another card",
	"descriptionmyturn": "${you} must take another card",
	"type": "activeplayer",
	"possibleactions": [
		"takeCard",
		"activateAbilityBothActions",
		"undo"
	],
	"transitions": {
		"checkHandSize": 4,
		"zombiePass": 50
	}
}
					*/
					break;
				case "takeCardsLastCall":
					/*
					{
	"name": "takeCardsLastCall",
	"description": "${actplayer} may use special ability tiles",
	"descriptionmyturn": "${you} may use special ability tiles",
	"type": "activeplayer",
	"possibleactions": [
		"activateAbilityAdditionalCard",
		"activateAbilityBothActions",
		"endTurn",
		"undo"
	],
	"transitions": {
		"takeAdditionalCard": 9,
		"placePolyominoAfterTakingCards": 11,
		"refillHarbor": 50,
		"zombiePass": 50
	}
}
					*/
					break;
				case "placePolyominoAfterTakingCards":
					/*
					{
	"name": "placePolyominoAfterTakingCards",
	"action": "stPlacePolyominoAfterTakingCards",
	"description": "${actplayer} may place a facade tile",
	"descriptionmyturn": "${you} may place a facade tile",
	"type": "activeplayer",
	"possibleactions": [
		"placePolyomino",
		"endTurn",
		"activateAbilityConstructionDiscount",
		"activateAbilityChangeOfColors",
		"undo"
	],
	"transitions": {
		"calculateScore": 7,
		"refillHarbor": 50,
		"zombiePass": 50
	}
}
					*/
					break;
				case "refillHarbor":
					/*
					{
	"name": "refillHarbor",
	"description": "",
	"type": "game",
	"action": "stRefillHarbor",
	"transitions": {
		"nextPlayer": 2,
		"endGame": 99
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
export default copenhagen;
