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

const elgrande: GamePresence = {
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
				case "revealActionCards":
					/*
					{
	"name": "revealActionCards",
	"description": "",
	"type": "game",
	"updateGameProgression": true,
	"action": "stRevealActionCards",
	"transitions": {
		"playPowerCards": 3
	}
}
					*/
					break;
				case "playPowerCards":
					/*
					{
	"name": "playPowerCards",
	"description": "${actplayer} must play a power card",
	"descriptionmyturn": "${you} must play a power card",
	"type": "activeplayer",
	"possibleactions": [
		"playPowerCard"
	],
	"transitions": {
		"nextPowerCard": 4,
		"nextActionCard": 15,
		"zombiePass": 15
	}
}
					*/
					break;
				case "nextPowerCard":
					/*
					{
	"name": "nextPowerCard",
	"description": "",
	"type": "game",
	"action": "stNextPowerCard",
	"transitions": {
		"nextPowerCard": 3
	}
}
					*/
					break;
				case "chooseActionCard":
					/*
					{
	"name": "chooseActionCard",
	"description": "${actplayer} must choose an action card",
	"descriptionmyturn": "${you} must choose an action card",
	"type": "activeplayer",
	"possibleactions": [
		"chooseActionCard"
	],
	"transitions": {
		"prepareAction": 6,
		"zombiePass": 15
	}
}
					*/
					break;
				case "prepareAction":
					/*
					{
	"name": "prepareAction",
	"description": "",
	"type": "game",
	"action": "stPrepareAction",
	"transitions": {
		"decide": 7,
		"placeCaballeros": 10,
		"useAction": 11,
		"nextPlayer": 15
	}
}
					*/
					break;
				case "actionStep0Decide":
					/*
					{
	"name": "actionStep0Decide",
	"description": "${actplayer} may choose between placing caballeros and action",
	"descriptionmyturn": "${you} may choose between placing caballeros and action",
	"type": "activeplayer",
	"possibleactions": [
		"decide"
	],
	"transitions": {
		"placeCaballeros": 8,
		"placeCaballeros2": 10,
		"useAction": 9,
		"nextPlayer": 15,
		"chooseRegion": 14,
		"angryKing": 12,
		"vetoAsk": 17,
		"zombiePass": 15
	}
}
					*/
					break;
				case "actionStep1PlaceCaballeros":
					/*
					{
	"name": "actionStep1PlaceCaballeros",
	"description": "${actplayer} may place ${count} caballeros",
	"descriptionmyturn": "${you} may place ${count} caballeros",
	"type": "activeplayer",
	"args": "argPlaceCaballeros",
	"possibleactions": [
		"placeCaballeros"
	],
	"transitions": {
		"useAction": 11,
		"nextPlayer": 15,
		"vetoAsk": 17,
		"zombiePass": 15
	}
}
					*/
					break;
				case "actionStep1UseAction":
					/*
					{
	"name": "actionStep1UseAction",
	"description": "${actplayer} may use the action",
	"descriptionmyturn": "${you} may use the action",
	"type": "activeplayer",
	"possibleactions": [
		"placeCaballeros",
		"moveCaballeros",
		"skipAction",
		"undo",
		"selectRegion",
		"moveMobileScoreBoard",
		"takeBackPowerCard",
		"veto"
	],
	"transitions": {
		"placeCaballeros": 10,
		"nextPlayer": 15,
		"chooseRegion": 14,
		"angryKing": 12,
		"vetoAsk": 17,
		"vetoSelectMove": 19,
		"zombiePass": 15
	}
}
					*/
					break;
				case "actionStep2PlaceCaballeros":
					/*
					{
	"name": "actionStep2PlaceCaballeros",
	"description": "${actplayer} may place ${count} caballeros",
	"descriptionmyturn": "${you} may place ${count} caballeros",
	"type": "activeplayer",
	"args": "argPlaceCaballeros",
	"possibleactions": [
		"placeCaballeros"
	],
	"transitions": {
		"nextPlayer": 15,
		"zombiePass": 15
	}
}
					*/
					break;
				case "actionStep2UseAction":
					/*
					{
	"name": "actionStep2UseAction",
	"description": "${actplayer} may use the action",
	"descriptionmyturn": "${you} may use the action",
	"type": "activeplayer",
	"possibleactions": [
		"placeCaballeros",
		"moveCaballeros",
		"skipAction",
		"undo",
		"activateAction",
		"selectRegion",
		"moveMobileScoreBoard",
		"takeBackPowerCard",
		"veto"
	],
	"transitions": {
		"nextPlayer": 15,
		"chooseRegion": 14,
		"angryKing": 12,
		"vetoAsk": 17,
		"vetoSelectMove": 19,
		"zombiePass": 15
	}
}
					*/
					break;
				case "nextAngryKing":
					/*
					{
	"name": "nextAngryKing",
	"description": "",
	"type": "game",
	"action": "stNextAngryKing",
	"transitions": {
		"angryKing": 13,
		"placeCaballeros": 10,
		"nextPlayer": 15
	}
}
					*/
					break;
				case "angryKing":
					/*
					{
	"name": "angryKing",
	"description": "${actplayer} has to remove 3 caballeros",
	"descriptionmyturn": "${you} have to remove 3 caballeros",
	"type": "activeplayer",
	"possibleactions": [
		"moveCaballeros"
	],
	"transitions": {
		"nextPlayer": 12,
		"zombiePass": 12
	}
}
					*/
					break;
				case "chooseRegion":
					/*
					{
	"name": "chooseRegion",
	"description": "Other players must choose a secret region (${for})",
	"descriptionmyturn": "${you} must choose a secret region (${for})",
	"type": "multipleactiveplayer",
	"args": "argChooseRegion",
	"action": "stChooseRegion",
	"possibleactions": [
		"chooseRegion"
	],
	"transitions": {
		"nextPlayer": 15,
		"score": 16,
		"placeCaballeros": 10
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
		"getCaballeros": 21,
		"refill": 20,
		"nextRound": 2,
		"chooseRegionForCastillo": 14
	}
}
					*/
					break;
				case "score":
					/*
					{
	"name": "score",
	"description": "",
	"type": "game",
	"action": "stScore",
	"updateGameProgression": true,
	"transitions": {
		"nextRound": 2,
		"endGame": 99
	}
}
					*/
					break;
				case "vetoAsk":
					/*
					{
	"name": "vetoAsk",
	"description": "Other players may veto against the special action of ${otherplayer}",
	"descriptionmyturn": "${you} may veto against the special action of ${otherplayer}",
	"type": "multipleactiveplayer",
	"args": "argVetoAsk",
	"action": "stVetoAsk",
	"possibleactions": [
		"veto"
	],
	"transitions": {
		"vetoSelectMove": 19,
		"nextPlayer": 15,
		"placeCaballeros": 10,
		"actionStep1UseAction": 9,
		"actionStep2UseAction": 11,
		"chooseRegion": 14,
		"angryKing": 12
	}
}
					*/
					break;
				case "vetoSelectMove":
					/*
					{
	"name": "vetoSelectMove",
	"description": "${actplayer} has to choose, from which move on to veto",
	"descriptionmyturn": "${you} have to choose, from which move on to veto",
	"type": "activeplayer",
	"args": "argVetoSelectMove",
	"possibleactions": [
		"vetoSelectMove"
	],
	"transitions": {
		"vetoSelectMove": 18,
		"nextPlayer": 15,
		"placeCaballeros": 10,
		"actionStep1UseAction": 9,
		"actionStep2UseAction": 11,
		"deactivateVetoPlayer": 22
	}
}
					*/
					break;
				case "activeVetoPlayer":
					/*
					{
	"name": "activeVetoPlayer",
	"description": "",
	"type": "game",
	"action": "stActiveVetoPlayer",
	"transitions": {
		"": 18
	}
}
					*/
					break;
				case "refillProvince":
					/*
					{
	"name": "refillProvince",
	"description": "${actplayer} may remove ${count} caballeros from regions to the province",
	"descriptionmyturn": "${you} may remove ${count} caballeros from regions to the province",
	"type": "activeplayer",
	"args": "argRefillProvince",
	"possibleactions": [
		"moveCaballeros",
		"undo"
	],
	"transitions": {
		"getCaballeros": 21,
		"zombiePass": 15
	}
}
					*/
					break;
				case "getCaballeros":
					/*
					{
	"name": "getCaballeros",
	"description": "",
	"type": "game",
	"action": "stGetCaballeros",
	"transitions": {
		"chooseActionCard": 5
	}
}
					*/
					break;
				case "deactivateVetoPlayer":
					/*
					{
	"name": "deactivateVetoPlayer",
	"description": "",
	"type": "game",
	"action": "stDeactivateVetoPlayer",
	"transitions": {
		"nextPlayer": 15,
		"placeCaballeros": 10
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
export default elgrande;
