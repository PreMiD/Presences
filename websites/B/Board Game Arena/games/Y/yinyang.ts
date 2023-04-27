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

const yinyang: GamePresence = {
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
		"": 12
	}
}
					*/
					break;
				case "buildDominos":
					/*
					{
	"name": "buildDominos",
	"description": "Waiting for the other player to finish building its dominos",
	"descriptionmyturn": "${you} must build your dominos",
	"type": "multipleactiveplayer",
	"args": "argBuildDominos",
	"transitions": {
		"start": 10,
		"endGame": 99
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
		"next": 3,
		"start": 4,
		"endGame": 99
	},
	"updateGameProgression": true
}
					*/
					break;
				case "startOfTurn":
					/*
					{
	"name": "startOfTurn",
	"description": "${actplayer} may move a piece or apply a law",
	"descriptionmyturn": "${you} may move a piece or apply a law",
	"descriptiondraw": "${actplayer} must accept or deny a draw proposal",
	"descriptionmyturndraw": "${you} must accept or deny a draw proposal",
	"type": "activeplayer",
	"action": "stStartOfTurn",
	"args": "argStartOfTurn",
	"transitions": {
		"move": 5,
		"applyLaw": 6,
		"suggestDraw": 8,
		"acceptDraw": 8,
		"declineDraw": 8,
		"endGame": 99
	}
}
					*/
					break;
				case "movePiece":
					/*
					{
	"name": "movePiece",
	"description": "${actplayer} must move a piece",
	"descriptionmyturn": "${you} must move a piece",
	"descriptionskippable": "${actplayer} may move a piece",
	"descriptionmyturnskippable": "${you} may move a piece",
	"type": "activeplayer",
	"args": "argMovePiece",
	"possibleactions": [
		"movePiece",
		"skip",
		"cancel"
	],
	"transitions": {
		"applyLaw": 6,
		"skip": 8,
		"endTurn": 8,
		"endGame": 99,
		"cancel": 4
	}
}
					*/
					break;
				case "applyLaw":
					/*
					{
	"name": "applyLaw",
	"description": "${actplayer} must apply a law",
	"descriptionmyturn": "${you} must apply a law",
	"descriptionskippable": "${actplayer} may apply a law",
	"descriptionmyturnskippable": "${you} may apply a law",
	"type": "activeplayer",
	"args": "argApplyLaw",
	"possibleactions": [
		"applyLaw",
		"skip",
		"cancel"
	],
	"transitions": {
		"adaptation": 9,
		"skip": 8,
		"endTurn": 8,
		"endGame": 99,
		"cancel": 4
	}
}
					*/
					break;
				case "endOfTurn":
					/*
					{
	"name": "endOfTurn",
	"description": "",
	"type": "game",
	"action": "stEndOfTurn",
	"transitions": {
		"next": 3,
		"endGame": 99
	}
}
					*/
					break;
				case "confirmTurn":
					/*
					{
	"name": "confirmTurn",
	"description": "${actplayer} must confirm or restart their turn",
	"descriptionmyturn": "${you} must confirm or restart your turn",
	"type": "activeplayer",
	"possibleactions": [
		"confirm",
		"cancel"
	],
	"transitions": {
		"zombiePass": 7,
		"endturn": 7,
		"confirm": 7,
		"cancel": 4
	}
}
					*/
					break;
				case "adaptDomino":
					/*
					{
	"name": "adaptDomino",
	"description": "${actplayer} may change one of its law",
	"descriptionmyturn": "${you} may change one of your law",
	"type": "activeplayer",
	"args": "argBuildDominos",
	"transitions": {
		"endTurn": 8
	}
}
					*/
					break;
				case "startPlaying":
					/*
					{
	"name": "startPlaying",
	"type": "game",
	"action": "stStartPlaying",
	"transitions": {
		"": 4
	}
}
					*/
					break;
				case "preBuildDominos":
					/*
					{
	"name": "preBuildDominos",
	"type": "game",
	"action": "stPreBuildDominos",
	"transitions": {
		"": 2
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
export default yinyang;
