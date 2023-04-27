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

const seotda: GamePresence = {
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
				case "startRound":
					/*
					{
	"name": "startRound",
	"description": "",
	"type": "game",
	"action": "stStartRound",
	"updateGameProgression": true,
	"transitions": {
		"cardReveal": 3,
		"nextBet": 4,
		"changeCard": 6,
		"endRound": 7
	}
}
					*/
					break;
				case "cardReveal":
					/*
					{
	"name": "cardReveal",
	"description": "All players must choose a card to reveal",
	"descriptionmyturn": "${you} must choose a card to reveal",
	"type": "multipleactiveplayer",
	"args": "argCardReveal",
	"action": "stNoFoldInit",
	"possibleactions": [
		"cardReveal",
		"cancelCardReveal"
	],
	"transitions": {
		"": 21
	}
}
					*/
					break;
				case "nextBet":
					/*
					{
	"name": "nextBet",
	"description": "",
	"type": "game",
	"action": "stNextBet",
	"transitions": {
		"nextCard": 4,
		"nextBet": 5,
		"changeCard": 6,
		"endRound": 7
	}
}
					*/
					break;
				case "raiseBet":
					/*
					{
	"name": "raiseBet",
	"description": "${actplayer} may bet or fold",
	"descriptionmyturn": "${you} may bet or fold",
	"type": "activeplayer",
	"args": "argRaiseBet",
	"possibleactions": [
		"raiseBet",
		"foldHand"
	],
	"transitions": {
		"nextBet": 4,
		"zombiePass": 4
	}
}
					*/
					break;
				case "changeCard":
					/*
					{
	"name": "changeCard",
	"description": "All players may discard cards in hand",
	"descriptionmyturn": "${you} may discard cards in hand",
	"type": "multipleactiveplayer",
	"args": "argChangeCard",
	"action": "stNoFoldInit",
	"possibleactions": [
		"changeCard",
		"cancelChangeCard"
	],
	"transitions": {
		"": 22
	}
}
					*/
					break;
				case "handRankCheck":
					/*
					{
	"name": "handRankCheck",
	"description": "",
	"type": "game",
	"action": "stHandRankCheck",
	"transitions": {
		"selectHandRank": 8,
		"endRound": 9
	}
}
					*/
					break;
				case "selectHandRank":
					/*
					{
	"name": "selectHandRank",
	"description": "All players must select their hand rank",
	"descriptionmyturn": "${you} must select your hand rank",
	"type": "multipleactiveplayer",
	"args": "argSelectHandRank",
	"action": "stSelectHandRankInit",
	"possibleactions": [
		"selectHandRank",
		"cancelHandRank"
	],
	"transitions": {
		"": 9
	}
}
					*/
					break;
				case "endRound":
					/*
					{
	"name": "endRound",
	"description": "",
	"type": "game",
	"action": "stEndRound",
	"transitions": {
		"nextRound": 2,
		"49Rematch": 10,
		"tieRematch": 11,
		"endGame": 99
	}
}
					*/
					break;
				case "joinRematch":
					/*
					{
	"name": "joinRematch",
	"description": "Some players may join the rematch",
	"descriptionmyturn": "${you} may join the rematch",
	"type": "multipleactiveplayer",
	"args": "argJoinRematch",
	"action": "stJoinRematchInit",
	"possibleactions": [
		"joinRematch",
		"cancelRematch"
	],
	"transitions": {
		"": 23
	}
}
					*/
					break;
				case "startRematch":
					/*
					{
	"name": "startRematch",
	"description": "",
	"type": "game",
	"action": "stStartRematch",
	"transitions": {
		"": 4
	}
}
					*/
					break;
				case "resolveCardReveal":
					/*
					{
	"name": "resolveCardReveal",
	"description": "",
	"type": "game",
	"action": "stResolveCardReveal",
	"transitions": {
		"": 4
	}
}
					*/
					break;
				case "resolveChangeCard":
					/*
					{
	"name": "resolveChangeCard",
	"description": "",
	"type": "game",
	"action": "stResolveChangeCard",
	"transitions": {
		"": 4
	}
}
					*/
					break;
				case "resolveJoinRematch":
					/*
					{
	"name": "resolveJoinRematch",
	"description": "",
	"type": "game",
	"action": "stResolveJoinRematch",
	"transitions": {
		"": 11
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
export default seotda;
