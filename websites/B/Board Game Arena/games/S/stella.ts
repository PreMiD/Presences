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

const stella: GamePresence = {
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
				case "startRound":
					/*
					{
	"name": "startRound",
	"description": "",
	"type": "manager",
	"action": "stStartRound",
	"transitions": {
		"nextWord": 22,
		"gameEnd": 99
	}
}
					*/
					break;
				case "wordSet":
					/*
					{
	"name": "wordSet",
	"description": "",
	"type": "manager",
	"action": "stwordSet",
	"transitions": {
		"next": 30
	}
}
					*/
					break;
				case "associate":
					/*
					{
	"name": "associate",
	"description": "Others players must associate cards with the clue word",
	"descriptionmyturn": "${you} must associate up to 10 cards with the clue word",
	"type": "multipleactiveplayer",
	"args": "argsAssociate",
	"updateGameProgression": true,
	"possibleactions": [
		"associate",
		"cancel"
	],
	"transitions": {
		"next": 40
	}
}
					*/
					break;
				case "announce":
					/*
					{
	"name": "announce",
	"description": "",
	"type": "manager",
	"action": "stAnnounce",
	"transitions": {
		"next": 50
	}
}
					*/
					break;
				case "reveal":
					/*
					{
	"name": "reveal",
	"description": "${actplayer} must reveal a selected card",
	"descriptionmyturn": "${you} must reveal a selected card",
	"type": "activeplayer",
	"args": "argsReveal",
	"updateGameProgression": true,
	"possibleactions": [
		"reveal"
	],
	"transitions": {
		"next": 60
	}
}
					*/
					break;
				case "endTurn":
					/*
					{
	"name": "endTurn",
	"description": "",
	"type": "manager",
	"action": "stEndTurn",
	"transitions": {
		"reveal": 50,
		"endRound": 10
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
export default stella;
