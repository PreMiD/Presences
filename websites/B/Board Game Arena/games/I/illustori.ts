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

const illustori: GamePresence = {
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
	"description": "Game setup.",
	"type": "manager",
	"action": "stGameSetup",
	"transitions": {
		"": 2
	}
}
					*/
					break;
				case "firstPlayerTurn":
					/*
					{
	"name": "firstPlayerTurn",
	"description": "${actplayer} will call the name of the first artwork.",
	"descriptionmyturn": "${you} must call the name of the first artwork.",
	"type": "activeplayer",
	"possibleactions": [
		"callFirstName"
	],
	"transitions": {
		"startChaining": 60,
		"firstZombieNext": 3
	}
}
					*/
					break;
				case "firstZombieNext":
					/*
					{
	"name": "firstZombieNext",
	"type": "game",
	"updateGameProgression": false,
	"action": "stNextFirst",
	"transitions": {
		"firstPlayer": 2,
		"endGame": 99
	}
}
					*/
					break;
				case "playerTurn":
					/*
					{
	"name": "playerTurn",
	"description": "${actplayer} will put a card with its name, or swap cards.",
	"descriptionmyturn": "${you} must put a card with its name, or",
	"type": "activeplayer",
	"args": "argPlayerTurn",
	"possibleactions": [
		"callArtworkName",
		"swapCards"
	],
	"transitions": {
		"discussion": 20,
		"failed": 60,
		"zombiePass": 60,
		"finishSwapping": 60
	}
}
					*/
					break;
				case "discussion":
					/*
					{
	"name": "discussion",
	"description": "Discuss the artwork name and vote.",
	"descriptionmyturn": "Discuss the artwork name and vote.",
	"type": "multipleactiveplayer",
	"args": "argDiscussion",
	"action": "stDiscussion",
	"possibleactions": [
		"vote"
	],
	"transitions": {
		"voted": 21
	}
}
					*/
					break;
				case "voteResult":
					/*
					{
	"name": "voteResult",
	"type": "game",
	"action": "stWaitVoting",
	"transitions": {
		"agree": 60,
		"disagree": 60
	}
}
					*/
					break;
				case "nextPlayer":
					/*
					{
	"name": "nextPlayer",
	"type": "game",
	"args": "argNextPlayer",
	"action": "stNextPlayer",
	"updateGameProgression": true,
	"transitions": {
		"nextPlayer": 10,
		"endGame": 99
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
export default illustori;
