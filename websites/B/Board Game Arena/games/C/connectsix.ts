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

const connectsix: GamePresence = {
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
				case "playerTurn":
					/*
					{
	"name": "playerTurn",
	"description": "${actplayer} must play a stone",
	"descriptionmyturn": "       ${you} must play a stone",
	"type": "activeplayer",
	"possibleactions": [
		"playStone",
		"undo",
		"proposeDraw"
	],
	"transitions": {
		"stonePlayed": 3,
		"zombiePass": 3,
		"drawProposed": 7,
		"gameEnded": 99
	}
}
					*/
					break;
				case "checkEndOfGame":
					/*
					{
	"name": "checkEndOfGame",
	"description": "",
	"type": "game",
	"action": "stCheckEndOfGame",
	"updateGameProgression": true,
	"transitions": {
		"gameEnded": 99,
		"notEndedYet": 5
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
	"transitions": {
		"": 2
	}
}
					*/
					break;
				case "confirmMove":
					/*
					{
	"name": "confirmMove",
	"description": "       ${actplayer} must confirm",
	"descriptionmyturn": "Confirm your move",
	"type": "activeplayer",
	"possibleactions": [
		"confirmMove",
		"undo"
	],
	"updateGameProgression": true,
	"transitions": {
		"gameEnded": 99,
		"notEndedYet": 4,
		"undo": 2
	}
}
					*/
					break;
				case "drawProposal":
					/*
					{
	"name": "drawProposal",
	"description": "${actplayer} must accept or decline draw",
	"descriptionmyturn": "${you} must accept or decline draw",
	"type": "activeplayer",
	"possibleactions": [
		"acceptDraw",
		"declineDraw"
	],
	"transitions": {
		"decline": 7,
		"accept": 99
	}
}
					*/
					break;
				case "drawPlayerChange":
					/*
					{
	"name": "drawPlayerChange",
	"description": "",
	"type": "game",
	"action": "stDrawPlayerChange",
	"transitions": {
		"proposal": 6,
		"answer": 2
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
export default connectsix;
