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

const rollingpins: GamePresence = {
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
		"": 5
	}
}
					*/
					break;
				case "RollDice":
					/*
					{
	"name": "RollDice",
	"description": "${actplayer} must roll dice",
	"descriptionmyturn": "${you} must roll dice",
	"type": "activeplayer",
	"possibleactions": [
		"RollDice",
		"crossIt",
		"getActualSituation"
	],
	"transitions": {
		"RolledDice": 3,
		"NextPlayer": 4,
		"NextPlayerEnd": 10
	}
}
					*/
					break;
				case "ChooseComb":
					/*
					{
	"name": "ChooseComb",
	"description": "${actplayer} must choose combination",
	"descriptionmyturn": "${you} must choose combination",
	"type": "activeplayer",
	"possibleactions": [
		"KillPins",
		"PassBallorTurn",
		"ReRollDice",
		"FlipDie",
		"chosenDice",
		"crossIt",
		"getActualSituation"
	],
	"transitions": {
		"RollDice": 2,
		"NextPlayer": 4,
		"NextPlayerEnd": 10
	}
}
					*/
					break;
				case "backtopturn":
					/*
					{
	"name": "backtopturn",
	"description": "",
	"descriptionmyturn": "",
	"type": "game",
	"action": "stBackToPTurn",
	"updateGameProgression": "true",
	"transitions": {
		"nextpl": 2,
		"gameover": 99
	}
}
					*/
					break;
				case "activateplayers":
					/*
					{
	"name": "activateplayers",
	"description": "",
	"descriptionmyturn": "",
	"type": "game",
	"action": "ststartplayer",
	"transitions": {
		"single": 2,
		"multiple": 9
	}
}
					*/
					break;
				case "RollDiceM":
					/*
					{
	"name": "RollDiceM",
	"description": "",
	"descriptionmyturn": "",
	"type": "private",
	"updateGameProgression": "true",
	"possibleactions": [
		"RollDice",
		"crossIt",
		"getActualSituation",
		"elimPlayer"
	],
	"transitions": {
		"RolledDice": 7,
		"EndTurn": 6
	}
}
					*/
					break;
				case "ChooseCombM":
					/*
					{
	"name": "ChooseCombM",
	"description": "",
	"descriptionmyturn": "",
	"type": "private",
	"updateGameProgression": "true",
	"possibleactions": [
		"KillPins",
		"PassBallorTurn",
		"ReRollDice",
		"FlipDie",
		"chosenDice",
		"crossIt",
		"getActualSituation",
		"elimPlayer"
	],
	"transitions": {
		"RolledDice": 6,
		"RollDice": 6,
		"EndTurn": 6,
		"gameover": 99
	}
}
					*/
					break;
				case "justtogoback":
					/*
					{
	"name": "justtogoback",
	"description": "",
	"descriptionmyturn": "",
	"type": "game",
	"action": "stRestartPriv",
	"updateGameProgression": "true",
	"transitions": {
		"": 9
	}
}
					*/
					break;
				case "activateplayers":
					/*
					{
	"name": "activateplayers",
	"description": "",
	"descriptionmyturn": "",
	"type": "multipleactiveplayer",
	"initialprivate": 6,
	"action": "ststartmulti",
	"transitions": {
		"EndTurn": 6,
		"RollDice": 6,
		"gameover": 99,
		"waitothers": 8
	}
}
					*/
					break;
				case "backtopturnEnd":
					/*
					{
	"name": "backtopturnEnd",
	"description": "",
	"descriptionmyturn": "",
	"type": "game",
	"action": "stBackToPTurnEnd",
	"updateGameProgression": "true",
	"transitions": {
		"nextpl": 2,
		"gameover": 99
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
export default rollingpins;
