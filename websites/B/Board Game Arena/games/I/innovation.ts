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

const innovation: GamePresence = {
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
				case "turn0":
					/*
					{
	"name": "turn0",
	"description": "Some players still have to choose a card to meld",
	"descriptionmyturn": "${You} must choose a card to meld",
	"type": "multipleactiveplayer",
	"action": "stTurn0",
	"args": "argTurn0",
	"possibleactions": [
		"initialMeld",
		"updateInitialMeld"
	],
	"transitions": {
		"": 3
	}
}
					*/
					break;
				case "whoBegins":
					/*
					{
	"name": "whoBegins",
	"description": "Each player meld his card...",
	"type": "game",
	"action": "stWhoBegins",
	"updateGameProgression": true,
	"transitions": {
		"": 4
	}
}
					*/
					break;
				case "playerTurn":
					/*
					{
	"name": "playerTurn",
	"description": "${actplayer} must take ${qualified_action}",
	"descriptionmyturn": "${You} must take ${qualified_action}:",
	"type": "activeplayer",
	"possibleactions": [
		"draw",
		"meld",
		"dogma",
		"achieve"
	],
	"args": "argPlayerTurn",
	"transitions": {
		"interPlayerTurn": 5,
		"dogmaEffect": 6,
		"justBeforeGameEnd": 98
	}
}
					*/
					break;
				case "interPlayerTurn":
					/*
					{
	"name": "interPlayerTurn",
	"description": "Finalising the player action...",
	"type": "game",
	"action": "stInterPlayerTurn",
	"updateGameProgression": true,
	"transitions": {
		"": 4
	}
}
					*/
					break;
				case "dogmaEffect":
					/*
					{
	"name": "dogmaEffect",
	"description": "Resolving the ${card_name} ${qualified_effect}...",
	"type": "game",
	"action": "stDogmaEffect",
	"args": "argDogmaEffect",
	"transitions": {
		"playerInvolvedTurn": 8,
		"interDogmaEffect": 7
	}
}
					*/
					break;
				case "interDogmaEffect":
					/*
					{
	"name": "interDogmaEffect",
	"description": "Resolving the ${card_name} ${qualified_effect}...",
	"type": "game",
	"action": "stInterDogmaEffect",
	"args": "argInterDogmaEffect",
	"updateGameProgression": true,
	"transitions": {
		"dogmaEffect": 6,
		"interPlayerTurn": 5,
		"justBeforeGameEnd": 98
	}
}
					*/
					break;
				case "playerInvolvedTurn":
					/*
					{
	"name": "playerInvolvedTurn",
	"description": "Resolving the ${card_name} ${qualified_effect} on ${player}...",
	"type": "game",
	"action": "stPlayerInvolvedTurn",
	"args": "argPlayerInvolvedTurn",
	"transitions": {
		"interPlayerInvolvedTurn": 9,
		"interactionStep": 10,
		"justBeforeGameEnd": 98
	}
}
					*/
					break;
				case "interPlayerInvolvedTurn":
					/*
					{
	"name": "interPlayerInvolvedTurn",
	"description": "Resolving the ${card_name} ${qualified_effect} on ${player}...",
	"type": "game",
	"action": "stInterPlayerInvolvedTurn",
	"args": "argInterPlayerInvolvedTurn",
	"updateGameProgression": true,
	"transitions": {
		"playerInvolvedTurn": 8,
		"interDogmaEffect": 7
	}
}
					*/
					break;
				case "interactionStep":
					/*
					{
	"name": "interactionStep",
	"description": "Resolving the ${card_name} ${qualified_effect} on ${player}...",
	"type": "game",
	"action": "stInteractionStep",
	"args": "argInteractionStep",
	"transitions": {
		"preSelectionMove": 12,
		"justBeforeGameEnd": 98
	}
}
					*/
					break;
				case "interInteractionStep":
					/*
					{
	"name": "interInteractionStep",
	"description": "Resolving the ${card_name} ${qualified_effect} on ${player}...",
	"type": "game",
	"action": "stInterInteractionStep",
	"args": "argInterInteractionStep",
	"updateGameProgression": true,
	"transitions": {
		"interactionStep": 10,
		"interPlayerInvolvedTurn": 9,
		"justBeforeGameEnd": 98
	}
}
					*/
					break;
				case "preSelectionMove":
					/*
					{
	"name": "preSelectionMove",
	"description": "Resolving the ${card_name} ${qualified_effect} on ${player}...",
	"type": "game",
	"action": "stPreSelectionMove",
	"args": "argPreSelectionMove",
	"transitions": {
		"selectionMove": 13,
		"interInteractionStep": 11
	}
}
					*/
					break;
				case "selectionMove":
					/*
					{
	"name": "selectionMove",
	"description": "${card_name}: ${message_for_others}",
	"descriptionmyturn": "${card_name}: ${message_for_player} ",
	"type": "activeplayer",
	"possibleactions": [
		"choose"
	],
	"args": "argSelectionMove",
	"transitions": {
		"interSelectionMove": 14,
		"interInteractionStep": 11,
		"justBeforeGameEnd": 98
	}
}
					*/
					break;
				case "interSelectionMove":
					/*
					{
	"name": "interSelectionMove",
	"description": "Resolving the ${card_name} ${qualified_effect} on ${player}...",
	"type": "game",
	"action": "stInterSelectionMove",
	"args": "argInterSelectionMove",
	"updateGameProgression": true,
	"transitions": {
		"preSelectionMove": 12,
		"interInteractionStep": 11,
		"justBeforeGameEnd": 98
	}
}
					*/
					break;
				case "justBeforeGameEnd":
					/*
					{
	"name": "justBeforeGameEnd",
	"description": "Finishing the game...",
	"type": "game",
	"action": "stJustBeforeGameEnd",
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
export default innovation;
