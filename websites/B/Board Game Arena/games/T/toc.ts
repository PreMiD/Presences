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

const toc: GamePresence = {
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
				case "newHand":
					/*
					{
	"name": "newHand",
	"description": "Dealing new hand...",
	"type": "game",
	"action": "stNewHand",
	"transitions": {
		"newPlayer": 3,
		"cardExchange": 9,
		"nextCharityPlayer": 10
	}
}
					*/
					break;
				case "newPlayer":
					/*
					{
	"name": "newPlayer",
	"description": "Next player...",
	"type": "game",
	"action": "stNewPlayer",
	"transitions": {
		"playerPlay": 4,
		"playerDiscard": 7
	}
}
					*/
					break;
				case "playerPlay":
					/*
					{
	"name": "playerPlay",
	"description": "${actplayer} must play a card and move a pawn",
	"descriptionmyturn": "${you} must play a card and move a pawn",
	"type": "activeplayer",
	"args": "argPlayerPlay",
	"possibleactions": [
		"play"
	],
	"transitions": {
		"prepareContinueSevenMove": 5,
		"nextPlayer": 8
	}
}
					*/
					break;
				case "prepareContinueSevenMove":
					/*
					{
	"name": "prepareContinueSevenMove",
	"description": "Continue move...",
	"type": "game",
	"action": "stPrepareContinueSevenMove",
	"transitions": {
		"": 6
	}
}
					*/
					break;
				case "continueSevenMove":
					/*
					{
	"name": "continueSevenMove",
	"description": "Seven: ${actplayer} must continue to move pawns (${n} ${fields} left)",
	"descriptionmyturn": "Seven: ${you} must continue to move pawns (${n} ${fields} left)",
	"type": "activeplayer",
	"args": "argContinueSevenMove",
	"possibleactions": [
		"play"
	],
	"transitions": {
		"prepareContinueSevenMove": 5,
		"nextPlayer": 8
	}
}
					*/
					break;
				case "playerDiscard":
					/*
					{
	"name": "playerDiscard",
	"description": "${reason} ${actplayer} must discard a card without effect",
	"descriptionmyturn": "${reason} ${you} must discard a card without effect",
	"type": "activeplayer",
	"args": "argPlayerDiscard",
	"possibleactions": [
		"discard"
	],
	"transitions": {
		"nextPlayer": 8
	}
}
					*/
					break;
				case "nextPlayer":
					/*
					{
	"name": "nextPlayer",
	"description": "End of turn...",
	"type": "game",
	"action": "stNextPlayer",
	"transitions": {
		"newHand": 2,
		"newPlayer": 3,
		"gameEnd": 99
	},
	"updateGameProgression": true
}
					*/
					break;
				case "cardExchange":
					/*
					{
	"name": "cardExchange",
	"description": "Some players still have to choose a card to exchange",
	"descriptionmyturn": "${you} must choose a card to exchange with your teammate",
	"type": "multipleactiveplayer",
	"action": "stCardExchange",
	"possibleactions": [
		"exchange"
	],
	"transitions": {
		"": 3
	}
}
					*/
					break;
				case "nextCharityPlayer":
					/*
					{
	"name": "nextCharityPlayer",
	"description": "Next charity player...",
	"type": "game",
	"action": "stNextCharityPlayer",
	"transitions": {
		"charityPlayerDemand": 11,
		"newPlayer": 3,
		"cardExchange": 9
	}
}
					*/
					break;
				case "charityPlayerDemand":
					/*
					{
	"name": "charityPlayerDemand",
	"description": "${actplayer} must demand a card",
	"descriptionmyturn": "${you} must demand a card:",
	"type": "activeplayer",
	"possibleactions": [
		"demand"
	],
	"transitions": {
		"charityPlayerExchange": 12,
		"nextCharityPlayer": 10
	}
}
					*/
					break;
				case "charityPlayerExchange":
					/*
					{
	"name": "charityPlayerExchange",
	"description": "${actplayer} must choose a card to exchange with the demanded one (${value_name} from ${player_name})",
	"descriptionmyturn": "${you} must choose a card to exchange with which you demanded (${value_name} from ${player_name})",
	"args": "argCharityPlayerExchange",
	"type": "activeplayer",
	"possibleactions": [
		"exchangeDemand"
	],
	"transitions": {
		"": 10
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
export default toc;
