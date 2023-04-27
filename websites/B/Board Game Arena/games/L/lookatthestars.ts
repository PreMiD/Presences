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

const lookatthestars: GamePresence = {
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
		"": 20
	}
}
					*/
					break;
				case "playCard":
					/*
					{
	"name": "playCard",
	"description": "Players must place the shape",
	"descriptionmyturn": "",
	"type": "multipleactiveplayer",
	"initialprivate": 30,
	"action": "stPlayCard",
	"possibleactions": [
		"cancelPlaceShape"
	],
	"transitions": {
		"next": 70
	}
}
					*/
					break;
				case "placeShape":
					/*
					{
	"name": "placeShape",
	"descriptionmyturn": "${you} must place the shape",
	"type": "private",
	"args": "argPlaceShape",
	"possibleactions": [
		"placeShape",
		"placeShootingStar",
		"skipCard",
		"cancelPlaceShape"
	],
	"transitions": {
		"place2": 40,
		"place4": 41,
		"place3": 42,
		"place6": 43,
		"place9": 44,
		"place1": 45,
		"place5": 46,
		"place7": 47,
		"place8": 48,
		"confirm": 60
	}
}
					*/
					break;
				case "placePlanet":
					/*
					{
	"name": "placePlanet",
	"descriptionmyturn": "${you} can place a new planet on an unused star",
	"type": "private",
	"args": "argPlacePlanet",
	"possibleactions": [
		"placePlanet",
		"skipBonus",
		"cancelPlaceShape"
	],
	"transitions": {
		"next": 40,
		"confirm": 60
	}
}
					*/
					break;
				case "placeLine":
					/*
					{
	"name": "placeLine",
	"descriptionmyturn": "${you} can place a new line between 2 adjacent stars",
	"type": "private",
	"args": "argPlaceLine",
	"possibleactions": [
		"placeLine",
		"skipBonus",
		"cancelPlaceShape"
	],
	"transitions": {
		"next": 41,
		"confirm": 60
	}
}
					*/
					break;
				case "placeStar":
					/*
					{
	"name": "placeStar",
	"descriptionmyturn": "${you} can place a new star (${number}/2)",
	"type": "private",
	"args": "argPlaceStar",
	"possibleactions": [
		"placeStar",
		"skipBonus",
		"cancelPlaceShape"
	],
	"transitions": {
		"next": 42,
		"confirm": 60
	}
}
					*/
					break;
				case "placeBlackHole":
					/*
					{
	"name": "placeBlackHole",
	"descriptionmyturn": "${you} can place a black hole",
	"type": "private",
	"args": "argPlacePlanet",
	"possibleactions": [
		"placeBlackHole",
		"skipBonus",
		"cancelPlaceShape"
	],
	"transitions": {
		"next": 43,
		"confirm": 60
	}
}
					*/
					break;
				case "placeCrescentMoon":
					/*
					{
	"name": "placeCrescentMoon",
	"descriptionmyturn": "${you} can place a crescent moon",
	"type": "private",
	"args": "argPlacePlanet",
	"possibleactions": [
		"placeCrescentMoon",
		"skipBonus",
		"cancelPlaceShape"
	],
	"transitions": {
		"next": 44,
		"confirm": 60
	}
}
					*/
					break;
				case "placeLuminousAura":
					/*
					{
	"name": "placeLuminousAura",
	"descriptionmyturn": "${you} can place a luminous aura",
	"type": "private",
	"args": "argPlaceLuminousAura",
	"possibleactions": [
		"placeLuminousAura",
		"skipBonus",
		"cancelPlaceShape"
	],
	"transitions": {
		"next": 45,
		"confirm": 60
	}
}
					*/
					break;
				case "placeGalaxy":
					/*
					{
	"name": "placeGalaxy",
	"descriptionmyturn": "${you} can place a galaxy",
	"type": "private",
	"args": "argPlaceGalaxy",
	"possibleactions": [
		"placeGalaxy",
		"skipBonus",
		"cancelPlaceShape"
	],
	"transitions": {
		"next": 46,
		"confirm": 60
	}
}
					*/
					break;
				case "placeNova":
					/*
					{
	"name": "placeNova",
	"descriptionmyturn": "${you} can place a nova",
	"type": "private",
	"args": "argPlaceNova",
	"possibleactions": [
		"placeNova",
		"skipBonus",
		"cancelPlaceShape"
	],
	"transitions": {
		"next": 47,
		"confirm": 60
	}
}
					*/
					break;
				case "placeTwinklingStar":
					/*
					{
	"name": "placeTwinklingStar",
	"descriptionmyturn": "${you} can place a twinkling star",
	"type": "private",
	"args": "argPlacePlanet",
	"possibleactions": [
		"placeTwinklingStar",
		"skipBonus",
		"cancelPlaceShape"
	],
	"transitions": {
		"next": 48,
		"confirm": 60
	}
}
					*/
					break;
				case "confirmTurn":
					/*
					{
	"name": "confirmTurn",
	"descriptionmyturn": "${you} must confirm your turn",
	"type": "private",
	"args": "argConfirmTurn",
	"possibleactions": [
		"confirmTurn",
		"cancelBonus",
		"cancelPlaceShape"
	],
	"transitions": {
		"place2": 40,
		"place4": 41,
		"place3": 42,
		"place6": 43,
		"place9": 44,
		"place1": 45,
		"place5": 46,
		"place7": 47,
		"place8": 48
	}
}
					*/
					break;
				case "nextShape":
					/*
					{
	"name": "nextShape",
	"description": "",
	"type": "game",
	"action": "stNextShape",
	"updateGameProgression": true,
	"transitions": {
		"next": 20,
		"endScore": 90
	}
}
					*/
					break;
				case "endScore":
					/*
					{
	"name": "endScore",
	"description": "",
	"type": "game",
	"action": "stEndScore",
	"updateGameProgression": true,
	"transitions": {
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
export default lookatthestars;
