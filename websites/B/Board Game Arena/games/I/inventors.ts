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

const inventors: GamePresence = {
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
		"": 10
	}
}
					*/
					break;
				case "newAge":
					/*
					{
	"name": "newAge",
	"description": "",
	"type": "game",
	"action": "stNewAge",
	"transitions": {
		"startAge": 20
	}
}
					*/
					break;
				case "playerTurn":
					/*
					{
	"name": "playerTurn",
	"description": "${actplayer} must send an inventor to work or refresh his inventors",
	"descriptionmyturn": "${you} must send an inventor to work or ",
	"type": "activeplayer",
	"possibleactions": [
		"work",
		"refresh",
		"useToken"
	],
	"transitions": {
		"completeInvention": 25,
		"endTurn": 30,
		"useReward": 20,
		"knowledge": 21
	}
}
					*/
					break;
				case "knownledge":
					/*
					{
	"name": "knownledge",
	"description": "Knowledge : ${actplayer} must place ${nbr} cubes on ${invention}",
	"descriptionmyturn": "Knowledge : ${you} must place ${nbr} cubes on ${invention}",
	"type": "activeplayer",
	"args": "argKnowledge",
	"possibleactions": [
		"knowledge"
	],
	"transitions": {
		"knowledge": 21,
		"endKnowledge": 30,
		"completeInvention": 25,
		"zombiePass": 30
	}
}
					*/
					break;
				case "completeInvention":
					/*
					{
	"name": "completeInvention",
	"description": "",
	"type": "game",
	"action": "stCompleteInvention",
	"transitions": {
		"endComplete": 30,
		"nextComplete": 26
	}
}
					*/
					break;
				case "chooseReward":
					/*
					{
	"name": "chooseReward",
	"description": "${invention} : ${actplayer} must choose a reward",
	"descriptionmyturn": "${invention} : ${you} must choose a reward (a token or the invention card itself)",
	"type": "activeplayer",
	"args": "argChooseReward",
	"possibleactions": [
		"reward"
	],
	"transitions": {
		"reward": 25
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
		"endAge": 10,
		"nextPlayer": 20,
		"endGame": 98
	}
}
					*/
					break;
				case "justBeforeGameEnd":
					/*
					{
	"name": "justBeforeGameEnd",
	"description": "",
	"type": "game",
	"action": "stJustBeforeGameEnd",
	"transitions": {
		"endGame": 99
	}
}
					*/
					break;
				case "lastTurn":
					/*
					{
	"name": "lastTurn",
	"description": "Some players may use some of your tokens before game end",
	"descriptionmyturn": "${you} may use some of your tokens before game end",
	"type": "multipleactiveplayer",
	"possibleactions": [
		"useToken",
		"endGame"
	],
	"transitions": {
		"endGame": 97
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
export default inventors;
