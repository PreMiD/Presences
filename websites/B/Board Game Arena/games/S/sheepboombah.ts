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

const sheepboombah: GamePresence = {
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
		"": 3
	}
}
					*/
					break;
				case "setupTurn":
					/*
					{
	"name": "setupTurn",
	"description": "${actplayer} must put a sheep in an available starting space",
	"descriptionmyturn": "${you} must put a sheep in an available starting space",
	"type": "activeplayer",
	"args": "argSetup",
	"possibleactions": [
		"placeSheep",
		"pass"
	],
	"transitions": {
		"placeSheep": 3,
		"pass": 3
	}
}
					*/
					break;
				case "nextSetup":
					/*
					{
	"name": "nextSetup",
	"description": "",
	"type": "game",
	"action": "stNextSetup",
	"updateGameProgression": true,
	"transitions": {
		"mainGame": 12,
		"nextPlayer": 2
	}
}
					*/
					break;
				case "playerTurn":
					/*
					{
	"name": "playerTurn",
	"description": "${actplayer} may move a sheep, play a card, or discard cards",
	"descriptionmyturn": "${you} may move a sheep, play a card, or discard cards",
	"type": "activeplayer",
	"args": "argPlayerTurn",
	"possibleactions": [
		"moveSheep",
		"playCard",
		"discard"
	],
	"transitions": {
		"moveSheep": 10,
		"lastMove": 11,
		"playCard": 20,
		"mine": 40,
		"bump": 30,
		"pass": 12
	}
}
					*/
					break;
				case "playerEnd":
					/*
					{
	"name": "playerEnd",
	"description": "${actplayer} may play a card or discard cards",
	"descriptionmyturn": "${you} may play a card or discard cards",
	"type": "activeplayer",
	"args": "argPlayerEnd",
	"possibleactions": [
		"playCard",
		"discard",
		"done"
	],
	"transitions": {
		"lastMove": 11,
		"playCard": 20,
		"done": 12,
		"pass": 12
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
		"nextPlayer": 10,
		"noMoves": 11
	}
}
					*/
					break;
				case "reactCard":
					/*
					{
	"name": "reactCard",
	"description": "Other player(s) may react to the card",
	"descriptionmyturn": "${you} may react to the card",
	"type": "multipleactiveplayer",
	"action": "stMultiPlayerCard",
	"args": "argCard",
	"possibleactions": [
		"playCard",
		"pass"
	],
	"transitions": {
		"playCard": 20,
		"pass": 21
	}
}
					*/
					break;
				case "resolveCard":
					/*
					{
	"name": "resolveCard",
	"description": "",
	"type": "game",
	"action": "stResolveCard",
	"updateGameProgression": true,
	"transitions": {
		"returnPlayerTurn": 10,
		"returnPlayerEnd": 11,
		"choiceNeeded": 22,
		"returnBump": 30,
		"returnMine": 40
	}
}
					*/
					break;
				case "choiceCard":
					/*
					{
	"name": "choiceCard",
	"description": "${actplayer} ${choiceText}",
	"descriptionmyturn": "${you} ${choiceText}",
	"type": "multipleactiveplayer",
	"action": "stMultiPlayerChoice",
	"args": "argChoiceCard",
	"possibleactions": [
		"cardChoice",
		"moveSheep",
		"peepSheep",
		"battle"
	],
	"transitions": {
		"returnPlayerTurn": 10,
		"returnPlayerEnd": 11,
		"peepSheep": 23,
		"returnBump": 31,
		"mine": 40,
		"returnMine": 41,
		"pass": 12
	}
}
					*/
					break;
				case "reactPeep":
					/*
					{
	"name": "reactPeep",
	"description": "${actplayer} may move onto the tile or pass",
	"descriptionmyturn": "${you} may move onto the tile or pass",
	"type": "activeplayer",
	"args": "argPeep",
	"possibleactions": [
		"moveSheep",
		"decline"
	],
	"transitions": {
		"returnPlayerTurn": 10,
		"returnPlayerEnd": 11,
		"mine": 40,
		"pass": 12
	}
}
					*/
					break;
				case "reactBump":
					/*
					{
	"name": "reactBump",
	"description": "Other player(s) may react to the bump",
	"descriptionmyturn": "${you} may react to the bump",
	"type": "multipleactiveplayer",
	"action": "stMultiPlayerBump",
	"args": "argBump",
	"possibleactions": [
		"playCard",
		"pass"
	],
	"transitions": {
		"playCard": 20,
		"pass": 31
	}
}
					*/
					break;
				case "resolveBump":
					/*
					{
	"name": "resolveBump",
	"description": "",
	"type": "game",
	"action": "stResolveBump",
	"updateGameProgression": true,
	"transitions": {
		"returnPlayerTurn": 10,
		"returnPlayerEnd": 11,
		"bump": 30,
		"mine": 40
	}
}
					*/
					break;
				case "reactMine":
					/*
					{
	"name": "reactMine",
	"description": "${actplayer} may react to the mine",
	"descriptionmyturn": "${you} may react to the mine",
	"type": "multipleactiveplayer",
	"action": "stMultiPlayerMine",
	"args": "argMine",
	"possibleactions": [
		"playCard",
		"pass"
	],
	"transitions": {
		"playCard": 20,
		"pass": 41
	}
}
					*/
					break;
				case "resolveMine":
					/*
					{
	"name": "resolveMine",
	"description": "",
	"type": "game",
	"action": "stResolveMine",
	"updateGameProgression": true,
	"transitions": {
		"returnPlayerTurn": 10,
		"returnPlayerEnd": 11
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
export default sheepboombah;
