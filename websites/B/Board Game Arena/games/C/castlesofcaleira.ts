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

const castlesofcaleira: GamePresence = {
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
		"": 10
	}
}
					*/
					break;
				case "drawCard":
					/*
					{
	"name": "drawCard",
	"description": "",
	"type": "game",
	"action": "stDrawCard",
	"transitions": {
		"playerTurn": 11
	}
}
					*/
					break;
				case "playerTurn":
					/*
					{
	"name": "playerTurn",
	"description": "${actplayer} must play a card",
	"descriptionmyturn": "${you} must play a card",
	"type": "activeplayer",
	"possibleactions": [
		"playCard"
	],
	"transitions": {
		"nextEffect": 20,
		"endGame": 90
	}
}
					*/
					break;
				case "nextCardEffect":
					/*
					{
	"name": "nextCardEffect",
	"description": "",
	"type": "game",
	"action": "stNextCardEffect",
	"transitions": {
		"nextEffect": 20,
		"selectTargets": 21,
		"selectPlayer": 22,
		"marketplace": 40,
		"wizardTower": 50,
		"endTurn": 80
	}
}
					*/
					break;
				case "selectTargets":
					/*
					{
	"name": "selectTargets",
	"description": "${actplayer} must select a target",
	"descriptionmyturn": "${you} must select a target",
	"descriptionWatchtower": "${actplayer} may select up to 2 targets, which will be resolved in that order",
	"descriptionmyturnWatchtower": "${you} may select up to 2 targets, which will be resolved in that order",
	"type": "activeplayer",
	"args": "argSelectTargetsState",
	"possibleactions": [
		"resolveEffectOnTargets"
	],
	"transitions": {
		"nextEffect": 20,
		"observatory": 30,
		"endGame": 90
	}
}
					*/
					break;
				case "selectPlayer":
					/*
					{
	"name": "selectPlayer",
	"description": "${actplayer} must choose a player to exchange a card with",
	"descriptionmyturn": "${you} must choose a player to exchange a card with",
	"type": "activeplayer",
	"possibleactions": [
		"selectPlayerForMarketplace"
	],
	"transitions": {
		"nextEffect": 20,
		"marketplace": 40,
		"endGame": 90
	}
}
					*/
					break;
				case "observatory":
					/*
					{
	"name": "observatory",
	"description": "${actplayer} is deciding whether to turn that piece face up or leave it face down",
	"descriptionmyturn": "${you} may turn this piece face up or leave it face down",
	"type": "activeplayer",
	"possibleactions": [
		"resolveObservatory"
	],
	"transitions": {
		"nextEffect": 20,
		"endGame": 90
	}
}
					*/
					break;
				case "marketplace":
					/*
					{
	"name": "marketplace",
	"description": "Players choosing a card to exchange",
	"descriptionmyturn": "${you} must choose a card from your hand to exchange",
	"type": "multipleactiveplayer",
	"args": "argMarketplaceState",
	"action": "stActivateMarketplacePlayers",
	"possibleactions": [
		"selectMarketplaceCard"
	],
	"transitions": {
		"resolveMarketplace": 41,
		"endGame": 90
	}
}
					*/
					break;
				case "resolveMarketplace":
					/*
					{
	"name": "resolveMarketplace",
	"description": "",
	"type": "game",
	"action": "stResolveMarketplace",
	"transitions": {
		"": 20
	}
}
					*/
					break;
				case "wizardTower":
					/*
					{
	"name": "wizardTower",
	"description": "${actplayer} is looking and sorting the top cards of the deck",
	"descriptionmyturn": "${you} must sort cards before return them back to the top of the deck",
	"type": "activeplayer",
	"args": "argWizardTowerState",
	"possibleactions": [
		"resolveWizardTower"
	],
	"transitions": {
		"nextEffect": 20,
		"endGame": 90
	}
}
					*/
					break;
				case "endTurn":
					/*
					{
	"name": "endTurn",
	"description": "",
	"type": "game",
	"action": "stEndTurn",
	"transitions": {
		"nextPlayer": 81,
		"endGame": 90
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
	"updateGameProgression": true,
	"action": "stNextPlayer",
	"transitions": {
		"nextPlayer": 10,
		"endGame": 90
	}
}
					*/
					break;
				case "finalizeGame":
					/*
					{
	"name": "finalizeGame",
	"description": "",
	"type": "game",
	"action": "stFinalizeGame",
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
export default castlesofcaleira;
