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

const veletas: GamePresence = {
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
				case "placeShooters":
					/*
					{
	"name": "placeShooters",
	"description": "${actplayer} must place their initial shooter(s)",
	"descriptionmyturn": "${you} must place your initial shooter(s)",
	"type": "activeplayer",
	"args": "argPlaceShooters",
	"possibleactions": [
		"placeTokens"
	],
	"transitions": {
		"placeTokens": 3
	}
}
					*/
					break;
				case "transition":
					/*
					{
	"name": "transition",
	"description": "",
	"type": "game",
	"action": "stTransition",
	"transitions": {
		"moreShooters": 2,
		"nextTurn": 4,
		"moreStones": 5,
		"pieRule": 6,
		"endGame": 99
	}
}
					*/
					break;
				case "playerTurn":
					/*
					{
	"name": "playerTurn",
	"description": "${actplayer} must take a shot",
	"descriptionmyturn": "Optionally ${you} may move a shooter. ${you} must take a shot",
	"type": "activeplayer",
	"args": "argPlayerTurn",
	"updateGameProgression": true,
	"possibleactions": [
		"moveAndShoot"
	],
	"transitions": {
		"moveAndShoot": 3,
		"zombiePass": 3
	}
}
					*/
					break;
				case "placeStones":
					/*
					{
	"name": "placeStones",
	"description": "${actplayer} must place their initial stone",
	"descriptionmyturn": "${you} must place your initial stone",
	"type": "activeplayer",
	"args": "argPlaceStones",
	"possibleactions": [
		"placeStones"
	],
	"transitions": {
		"placeStones": 3
	}
}
					*/
					break;
				case "pieRule":
					/*
					{
	"name": "pieRule",
	"description": "${actplayer} must decide to swap sides or place shooters",
	"descriptionmyturn": "${you} have to decide to either swap sides or place shooters",
	"type": "activeplayer",
	"possibleactions": [
		"pieRuleDecision"
	],
	"transitions": {
		"moreShooters": 2,
		"activeNextPlayerAndmoreShooters": 7
	}
}
					*/
					break;
				case "transitionAfterSwappedSides":
					/*
					{
	"name": "transitionAfterSwappedSides",
	"description": "",
	"type": "game",
	"action": "stTransitionAfterSwappedSides",
	"transitions": {
		"moreShooters": 2
	}
}
					*/
					break;
				case "transitionAfterSetup":
					/*
					{
	"name": "transitionAfterSetup",
	"description": "",
	"type": "game",
	"action": "stTransitionAfterSetup",
	"transitions": {
		"moreShooters": 2
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
export default veletas;
