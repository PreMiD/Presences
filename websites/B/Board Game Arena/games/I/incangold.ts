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

const incangold: GamePresence = {
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
		"": 2
	}
}
					*/
					break;
				case "reshuffle":
					/*
					{
	"name": "reshuffle",
	"type": "game",
	"action": "streshuffle",
	"updateGameProgression": true,
	"transitions": {
		"explore": 3,
		"gameEndScoring": 90
	}
}
					*/
					break;
				case "explore":
					/*
					{
	"name": "explore",
	"type": "game",
	"description": "Some players are exploring the temple",
	"action": "stexplore",
	"updateGameProgression": true,
	"transitions": {
		"cleanpockets": 4,
		"vote": 5
	}
}
					*/
					break;
				case "cleanpockets":
					/*
					{
	"name": "cleanpockets",
	"description": "2nd hazard of the same type was drawn and all explorers in the temple flee, droping their pouches",
	"type": "game",
	"action": "stcleanpockets",
	"updateGameProgression": true,
	"transitions": {
		"reshuffle": 2
	}
}
					*/
					break;
				case "vote":
					/*
					{
	"name": "vote",
	"description": "Players in the temple must vote to stay exploring or to return to camp",
	"descriptionmyturn": "${you} must vote to continue exploring or to return to camp",
	"type": "multipleactiveplayer",
	"action": "stvote",
	"possibleactions": [
		"voteExplore",
		"voteLeave"
	],
	"updateGameProgression": true,
	"transitions": {
		"processLeavers": 6
	}
}
					*/
					break;
				case "processLeavers":
					/*
					{
	"name": "processLeavers",
	"description": "...processing player actions acording to their votes",
	"type": "game",
	"action": "stprocessLeavers",
	"updateGameProgression": true,
	"transitions": {
		"explore": 3,
		"cleanpockets": 4
	}
}
					*/
					break;
				case "gameEndScoring":
					/*
					{
	"description": "Final Score",
	"name": "gameEndScoring",
	"type": "game",
	"action": "stGameEndScoring",
	"updateGameProgression": true,
	"transitions": {
		"": 99
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
export default incangold;
