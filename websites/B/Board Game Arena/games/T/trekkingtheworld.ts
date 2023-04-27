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

const trekkingtheworld: GamePresence = {
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
				case "setupAirport":
					/*
					{
	"name": "setupAirport",
	"description": "${actplayer} must choose an airport",
	"descriptionmyturn": "${you} must choose an airport",
	"type": "activeplayer",
	"args": "argSetupAirport",
	"possibleactions": [
		"actChooseDestination"
	],
	"transitions": {
		"next": 3
	}
}
					*/
					break;
				case "setup":
					/*
					{
	"name": "setup",
	"type": "game",
	"action": "stSetup",
	"transitions": {
		"setupAirport": 2,
		"airport": 7
	}
}
					*/
					break;
				case "airport":
					/*
					{
	"name": "airport",
	"description": "${actplayer} can fly to an airport",
	"descriptionmyturn": "${you} can fly to an airport",
	"type": "activeplayer",
	"args": "argSetupAirport",
	"possibleactions": [
		"actChooseDestination",
		"actSkip"
	],
	"transitions": {
		"next": 12,
		"zombiePass": 11
	}
}
					*/
					break;
				case "moveSelection":
					/*
					{
	"name": "moveSelection",
	"description": "${actplayer} must announce where to move",
	"descriptionmyturn": "${you} must announce where you move",
	"type": "activeplayer",
	"args": "argMoveSelection",
	"possibleactions": [
		"actChooseDestination"
	],
	"transitions": {
		"next": 6,
		"zombiePass": 11
	}
}
					*/
					break;
				case "moveCard":
					/*
					{
	"name": "moveCard",
	"description": "${actplayer} must play its trek cards for a total value of ${nbflat}",
	"descriptionmyturn": "${you} must play your trek cards for a total value of ${nbflat}",
	"type": "activeplayer",
	"args": "argMoveCard",
	"possibleactions": [
		"actChooseCards",
		"actCancel"
	],
	"transitions": {
		"cancel": 5,
		"finish": 8,
		"zombiePass": 11
	}
}
					*/
					break;
				case "checkAirport":
					/*
					{
	"name": "checkAirport",
	"type": "game",
	"action": "stCheckAirport",
	"transitions": {
		"move": 12,
		"airport": 4,
		"zombiePass": 11
	}
}
					*/
					break;
				case "choose":
					/*
					{
	"name": "choose",
	"description": "${actplayer} must choose : Draw two, Take a tour or journey",
	"descriptionmyturn": "${you} must choose : Draw two, Take a tour or journey",
	"type": "activeplayer",
	"args": "argChoose",
	"possibleactions": [
		"actChoose"
	],
	"transitions": {
		"draw": 9,
		"tour": 10,
		"journey": 14,
		"zombiePass": 11
	}
}
					*/
					break;
				case "draw":
					/*
					{
	"name": "draw",
	"description": "${actplayer} must draw a card",
	"descriptionmyturn": "${you} must draw a card",
	"type": "activeplayer",
	"possibleactions": [
		"actChoose"
	],
	"transitions": {
		"draw": 11,
		"zombiePass": 11
	}
}
					*/
					break;
				case "tour":
					/*
					{
	"name": "tour",
	"description": "${actplayer} must play cards with icons : ",
	"descriptionmyturn": "${you} must play cards with icons : ",
	"type": "activeplayer",
	"args": "argTour",
	"possibleactions": [
		"actChooseCards"
	],
	"transitions": {
		"finish": 11,
		"zombiePass": 11
	}
}
					*/
					break;
				case "checkFinish":
					/*
					{
	"name": "checkFinish",
	"type": "game",
	"action": "stCheckFinish",
	"updateGameProgression": true,
	"transitions": {
		"finish": 99,
		"start": 7
	}
}
					*/
					break;
				case "checkMove":
					/*
					{
	"name": "checkMove",
	"type": "game",
	"action": "stCheckMove",
	"transitions": {
		"move": 5,
		"choose": 8,
		"zombiePass": 11
	}
}
					*/
					break;
				case "journey":
					/*
					{
	"name": "journey",
	"description": "${actplayer} : ${journey}",
	"descriptionmyturn": "${you} : ${journey}",
	"type": "activeplayer",
	"args": "argJourney",
	"possibleactions": [
		"actChooseCards",
		"actChoose"
	],
	"transitions": {
		"finish": 11,
		"journey": 13,
		"zombiePass": 11
	}
}
					*/
					break;
				case "payJourney":
					/*
					{
	"name": "payJourney",
	"description": "${actplayer} must play 2 cards with matching icons",
	"descriptionmyturn": "${you} must play 2 cards with matching icons",
	"type": "activeplayer",
	"possibleactions": [
		"actChooseCards",
		"actCancel"
	],
	"transitions": {
		"cancel": 8,
		"swap": 20,
		"cubeRegion": 19,
		"journey": 13,
		"chooseCube": 17,
		"moveBonus": 16,
		"tourLess": 15,
		"finish": 11,
		"zombiePass": 11
	}
}
					*/
					break;
				case "tourLess":
					/*
					{
	"name": "tourLess",
	"description": "${actplayer} : ${journey}",
	"descriptionmyturn": "${you} : ${journey}",
	"type": "activeplayer",
	"args": "argTourLess",
	"possibleactions": [
		"actChooseCards",
		"actSkip"
	],
	"transitions": {
		"moveBonus": 16,
		"finish": 11,
		"next": 11,
		"zombiePass": 11
	}
}
					*/
					break;
				case "moveBonus":
					/*
					{
	"name": "moveBonus",
	"description": "${actplayer} : ${journey}",
	"descriptionmyturn": "${you} : ${journey}",
	"type": "activeplayer",
	"args": "argMoveBonus",
	"possibleactions": [
		"actChooseDestination",
		"actSkip"
	],
	"transitions": {
		"finish": 11,
		"cubeRegion": 19,
		"next": 11,
		"tourLess": 15,
		"zombiePass": 11
	}
}
					*/
					break;
				case "chooseCube":
					/*
					{
	"name": "chooseCube",
	"description": "${actplayer} must choose a cube in its suitcase to move",
	"descriptionmyturn": "${you} must choose a cube in your suitcase to move",
	"type": "activeplayer",
	"possibleactions": [
		"actChooseColor",
		"actSkip"
	],
	"transitions": {
		"finish": 11,
		"next": 18,
		"zombiePass": 11
	}
}
					*/
					break;
				case "chooseRow":
					/*
					{
	"name": "chooseRow",
	"description": "${actplayer} must choose the color of its new cube",
	"descriptionmyturn": "${you} must choose the color of your new cube",
	"type": "activeplayer",
	"possibleactions": [
		"actChooseColor",
		"actSkip"
	],
	"transitions": {
		"finish": 11,
		"next": 11,
		"zombiePass": 11
	}
}
					*/
					break;
				case "cubeRegion":
					/*
					{
	"name": "cubeRegion",
	"description": "${actplayer} must pick a souvenir in its region",
	"descriptionmyturn": "${you} must pick a souvenir in your region",
	"type": "activeplayer",
	"args": "argCubeRegion",
	"possibleactions": [
		"actChooseDestination",
		"actSkip"
	],
	"transitions": {
		"finish": 11,
		"next": 11,
		"zombiePass": 11
	}
}
					*/
					break;
				case "swap":
					/*
					{
	"name": "swap",
	"description": "${actplayer} must choose a player to swap with",
	"descriptionmyturn": "${you} must choose a player to swap with",
	"type": "activeplayer",
	"possibleactions": [
		"actChoose",
		"actSkip"
	],
	"transitions": {
		"next": 11,
		"finish": 11,
		"zombiePass": 11
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
export default trekkingtheworld;
