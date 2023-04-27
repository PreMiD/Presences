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

const armadora: GamePresence = {
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
				case "playerTurn":
					/*
					{
	"name": "playerTurn",
	"description": "${actplayer} must place a Warrior or 2 palisades",
	"descriptionmyturn": "${you} must place a Warrior or 2 palisades",
	"type": "activeplayer",
	"action": "stPlayerTurn",
	"possibleactions": [
		"placeWarrior",
		"placePalisade",
		"pass"
	],
	"transitions": {
		"placeWarrior": 20,
		"placePalisade": 3,
		"pass": 20,
		"advanced": 5,
		"zombiePass": 20
	}
}
					*/
					break;
				case "playerTurnSecondPalisade":
					/*
					{
	"name": "playerTurnSecondPalisade",
	"description": "${actplayer} may play another palisade",
	"descriptionmyturn": "${you} may play another palisade",
	"type": "activeplayer",
	"possibleactions": [
		"placePalisade",
		"onePalisade"
	],
	"transitions": {
		"placePalisade": 20,
		"zombiePass": 20
	}
}
					*/
					break;
				case "playerTurn":
					/*
					{
	"name": "playerTurn",
	"description": "${actplayer} must place a Warrior or 2 palisades (or play a power)",
	"descriptionmyturn": "${you} must place a Warrior or 2 palisades (or play a power)",
	"type": "activeplayer",
	"possibleactions": [
		"placeWarrior",
		"placePalisade",
		"pass",
		"power"
	],
	"transitions": {
		"placeWarrior": 20,
		"placePalisade": 3,
		"pass": 20,
		"reinforce": 6,
		"unleash": 7,
		"placeWarriorFaceUp": 8,
		"lookAtWarrior": 9,
		"placeFreePalisade": 10,
		"zombiePass": 20
	}
}
					*/
					break;
				case "reinforce":
					/*
					{
	"name": "reinforce",
	"description": "${actplayer} must place his reinforcement on a warrior",
	"descriptionmyturn": "${you} must place your reinforcement on a warrior",
	"type": "activeplayer",
	"possibleactions": [
		"reinforce",
		"cancel",
		"chooseWarrior"
	],
	"transitions": {
		"reinforce": 20,
		"cancel": 5,
		"zombiePass": 20
	}
}
					*/
					break;
				case "unleash":
					/*
					{
	"name": "unleash",
	"description": "${actplayer} may shoot an opponent warrior",
	"descriptionmyturn": "${you} may shoot an opponent warrior",
	"type": "activeplayer",
	"possibleactions": [
		"unleash",
		"cancel",
		"chooseWarrior"
	],
	"transitions": {
		"unleash": 5,
		"cancel": 5,
		"zombiePass": 20
	}
}
					*/
					break;
				case "placeWarrior":
					/*
					{
	"name": "placeWarrior",
	"description": "${actplayer} may place a warrior (face-up)",
	"descriptionmyturn": "${you} may place a warrior (face-up)",
	"type": "activeplayer",
	"possibleactions": [
		"placeWarrior",
		"cancel",
		"placeFaceup"
	],
	"transitions": {
		"placeWarrior": 5,
		"cancel": 5,
		"zombiePass": 20
	}
}
					*/
					break;
				case "lookWarrior":
					/*
					{
	"name": "lookWarrior",
	"description": "${actplayer} may secretly look a the value of a Warrior",
	"descriptionmyturn": "${you} may secretly look a the value of a Warrior",
	"type": "activeplayer",
	"possibleactions": [
		"lookAtWarrior",
		"cancel",
		"chooseWarrior"
	],
	"transitions": {
		"lookAtWarrior": 5,
		"cancel": 5,
		"zombiePass": 20
	}
}
					*/
					break;
				case "placePalisadeFree":
					/*
					{
	"name": "placePalisadeFree",
	"description": "${actplayer} may place a palisade",
	"descriptionmyturn": "${you} may place a palisade",
	"type": "activeplayer",
	"possibleactions": [
		"placePalisade",
		"onePalisade",
		"cancel",
		"placePalisadeFree"
	],
	"transitions": {
		"placePalisade": 5,
		"cancel": 5,
		"zombiePass": 20
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
		"endGame": 99,
		"nextPlayer": 2
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
export default armadora;
