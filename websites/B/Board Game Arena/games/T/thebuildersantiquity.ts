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

const thebuildersantiquity: GamePresence = {
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
	"description": "${actplayer} has ${actions} action(s): Start a construction, Recruit or Send a worker to work.",
	"descriptionmyturn": "${you} have ${actions} action(s): Start a construction, Recruit, Send a worker to work, or",
	"type": "activeplayer",
	"args": "argPlayerTurn",
	"possibleactions": [
		"startConstruction",
		"recruit",
		"work",
		"coins",
		"endTurn",
		"cancel",
		"buyInvestment",
		"freePrisoner"
	],
	"transitions": {
		"endTurn": 10,
		"endAction": 2,
		"endGame": 99,
		"zombiePass": 10
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
		"endResolution": 11,
		"nextPlayer": 2
	}
}
					*/
					break;
				case "endResolution":
					/*
					{
	"name": "endResolution",
	"description": "Players can free prisoners or refund loans",
	"descriptionmyturn": "${you} can free prisoners or refund loans",
	"args": "argsEndResolution",
	"type": "multipleactiveplayer",
	"action": "stEndResolution",
	"possibleactions": [
		"freeEndPrisoner",
		"endRefundLoan",
		"endResolution"
	],
	"transitions": {
		"endGame": 99,
		"endResolution": 11
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
export default thebuildersantiquity;
