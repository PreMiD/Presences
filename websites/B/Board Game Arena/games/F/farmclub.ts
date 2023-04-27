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

const farmclub: GamePresence = {
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
		"playerTurnPrep": 10
	}
}
					*/
					break;
				case "playerTurnPrep":
					/*
					{
	"name": "playerTurnPrep",
	"description": "",
	"type": "game",
	"action": "stPlayerTurnPrep",
	"transitions": {
		"hireOrElect": 30,
		"hire": 32,
		"elect": 34
	}
}
					*/
					break;
				case "callOnTheBirds":
					/*
					{
	"name": "callOnTheBirds",
	"description": "${actplayer} calls on the Birds",
	"descriptionmyturn": "${you} may use a Bird token",
	"type": "activeplayer",
	"possibleactions": [
		"cancelCallOnTheBirds",
		"replaceGoals",
		"replaceAnimals"
	],
	"transitions": {
		"hireOrElect": 30,
		"hire": 32,
		"elect": 34
	}
}
					*/
					break;
				case "hireOrElect":
					/*
					{
	"name": "hireOrElect",
	"description": "${actplayer} hires an Animal or elects a Leader",
	"descriptionmyturn": "${you} must hire an Animal or elect a Leader",
	"type": "activeplayer",
	"possibleactions": [
		"startHiring",
		"startElection",
		"startCallOnTheBirds"
	],
	"transitions": {
		"callOnTheBirds": 20,
		"hire": 32,
		"elect": 34,
		"harvest": 40
	},
	"args": "argHireOrElect"
}
					*/
					break;
				case "hire":
					/*
					{
	"name": "hire",
	"description": "${actplayer} hires an Animal",
	"descriptionmyturn": "${you} must hire an animal",
	"type": "activeplayer",
	"possibleactions": [
		"hire",
		"cancelHiring"
	],
	"transitions": {
		"hireOrElect": 30,
		"hirePlacement": 33,
		"reorganiseDecision": 35
	},
	"args": "argHire"
}
					*/
					break;
				case "hirePlacement":
					/*
					{
	"name": "hirePlacement",
	"description": "${actplayer} places an Animal",
	"descriptionmyturn": "${you} must place the animal on your board",
	"type": "activeplayer",
	"possibleactions": [
		"hirePlacement"
	],
	"transitions": {
		"reorganiseDecision": 35
	},
	"args": "argHirePlacement",
	"action": "stHirePlacement"
}
					*/
					break;
				case "elect":
					/*
					{
	"name": "elect",
	"description": "${actplayer} elects a Leader",
	"descriptionmyturn": "${you} must select a clan card and a Leader",
	"type": "activeplayer",
	"possibleactions": [
		"elect",
		"cancelElection"
	],
	"transitions": {
		"hireOrElect": 30,
		"reorganiseDecision": 40
	},
	"args": "argElect"
}
					*/
					break;
				case "reorganiseDecision":
					/*
					{
	"name": "reorganiseDecision",
	"description": "${actplayer} may reorganise their farm",
	"descriptionmyturn": "Do ${you} want to reorganise your farm?",
	"type": "activeplayer",
	"possibleactions": [
		"reorganiseYes",
		"reorganiseNo"
	],
	"transitions": {
		"reorganise": 36,
		"harvest": 40
	},
	"args": "argReorganiseDecision"
}
					*/
					break;
				case "reorganise":
					/*
					{
	"name": "reorganise",
	"description": "${actplayer} reorganises their farm",
	"descriptionmyturn": "${you} must choose two pens on your board to exchange",
	"type": "activeplayer",
	"possibleactions": [
		"reorganise"
	],
	"transitions": {
		"harvest": 40
	},
	"args": "argReorganise"
}
					*/
					break;
				case "harvest":
					/*
					{
	"name": "harvest",
	"description": "",
	"type": "game",
	"action": "stHarvest",
	"transitions": {
		"playerTurnPrep": 10,
		"gameEndScoring": 90
	},
	"updateGameProgression": true
}
					*/
					break;
				case "gameEndScoring":
					/*
					{
	"name": "gameEndScoring",
	"description": "",
	"type": "game",
	"action": "stGameEndScoring",
	"transitions": {
		"gameEnd": 99
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
export default farmclub;
