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

const barrage: GamePresence = {
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
				case "setupBranch":
					/*
					{
	"name": "setupBranch",
	"description": "",
	"type": "game",
	"action": "stSetupBranch",
	"transitions": {
		"pick": 4,
		"start": 10
	}
}
					*/
					break;
				case "pickStartNext":
					/*
					{
	"name": "pickStartNext",
	"description": "",
	"type": "game",
	"action": "stPickStartNext",
	"transitions": {
		"nextPick": 3,
		"pick": 4,
		"done": 10
	}
}
					*/
					break;
				case "pickStart":
					/*
					{
	"name": "pickStart",
	"description": "${actplayer} must choose a company/officer pair and a starting contract",
	"descriptionmyturn": "${you} must choose a company/officer pair and a starting contract",
	"type": "activeplayer",
	"args": "argsPickStart",
	"possibleactions": [
		"actPickStart"
	],
	"transitions": {
		"nextPick": 3
	}
}
					*/
					break;
				case "freePickStart":
					/*
					{
	"name": "freePickStart",
	"description": "${actplayer} must choose a company, an officer and a starting contract",
	"descriptionmyturn": "${you} must choose a company, an officer and a starting contract",
	"type": "activeplayer",
	"args": "argsFreePickStart",
	"action": "stFreePickStart",
	"possibleactions": [
		"actFreePickStart"
	],
	"transitions": {
		"done": 10
	}
}
					*/
					break;
				case "beforeStartOfRound":
					/*
					{
	"name": "beforeStartOfRound",
	"description": "",
	"type": "game",
	"action": "stBeforeStartOfRound",
	"updateGameProgression": true,
	"transitions": {
		"": 11
	}
}
					*/
					break;
				case "startOfRound":
					/*
					{
	"name": "startOfRound",
	"description": "",
	"type": "game",
	"action": "stStartOfRound",
	"updateGameProgression": true
}
					*/
					break;
				case "actionPhase":
					/*
					{
	"name": "actionPhase",
	"description": "",
	"type": "game",
	"action": "stActionPhase",
	"transitions": []
}
					*/
					break;
				case "resolveStack":
					/*
					{
	"name": "resolveStack",
	"type": "game",
	"action": "stResolveStack",
	"transitions": []
}
					*/
					break;
				case "resolveChoice":
					/*
					{
	"name": "resolveChoice",
	"description": "${actplayer} must choose an action",
	"descriptionmyturn": "${you} must choose an action",
	"type": "activeplayer",
	"args": "argsResolveChoice",
	"possibleactions": [
		"actChooseAction",
		"actRestart"
	],
	"transitions": []
}
					*/
					break;
				case "endOfTurn":
					/*
					{
	"name": "endOfTurn",
	"description": "",
	"type": "game",
	"transitions": {
		"end": 98,
		"next": 10
	},
	"action": "stReturnHome"
}
					*/
					break;
				case "placeEngineer":
					/*
					{
	"name": "placeEngineer",
	"description": "${actplayer} must place an engineer",
	"descriptionmyturn": "${you} must place an engineer",
	"descriptionskippable": "${actplayer} may place an engineer",
	"descriptionmyturnskippable": "${you} may place a engineer",
	"args": "argsAtomicAction",
	"type": "activeplayer",
	"possibleactions": [
		"actPlaceEngineer",
		"actPassOptionalAction",
		"actRestart",
		"actSkip"
	],
	"transitions": []
}
					*/
					break;
				case "gainResources":
					/*
					{
	"name": "gainResources",
	"type": "game",
	"action": "stAtomicAction"
}
					*/
					break;
				case "construct":
					/*
					{
	"name": "construct",
	"description": "${actplayer} must build a structure",
	"descriptionmyturn": "${you} must select a technology tile and a space to build a structure",
	"descriptionmyturngeneric": "${you} must select a technology tile and a space to build a structure",
	"descriptionskippable": "${actplayer} may build a structure",
	"descriptionmyturnskippable": "${you} may select a technology tile and a space to build a structure",
	"descriptionmyturnselectTile": "${you} must select a technology tile",
	"descriptionmyturnselectSpace": "${you} must select a space on the map to build a structure",
	"descriptionmyturnconfirm": "Please confirm your choice",
	"args": "argsAtomicAction",
	"action": "stAtomicAction",
	"type": "activeplayer",
	"possibleactions": [
		"actConstruct",
		"actPassOptionalAction",
		"actRestart"
	]
}
					*/
					break;
				case "payResources":
					/*
					{
	"name": "payResources",
	"description": "${actplayer} must choose how to pay for ${source}",
	"descriptionmyturn": "${you} must choose how to pay for ${source}",
	"descriptionauto": "${actplayer} pays for ${source}",
	"descriptionmyturnauto": "${you} pay for ${source}",
	"args": "argsAtomicAction",
	"action": "stAtomicAction",
	"type": "activeplayer",
	"possibleactions": [
		"actPay",
		"actPassOptionalAction",
		"actRestart"
	]
}
					*/
					break;
				case "produce":
					/*
					{
	"name": "produce",
	"description": "${actplayer} must produce energy ${modifier}",
	"descriptionmyturn": "${you} must choose where to produce energy ${modifier}",
	"descriptionskippable": "${actplayer} may produce energy ${modifier}",
	"descriptionmyturnskippable": "${you} may produce energy ${modifier}",
	"descriptiongermanyskippable": "(Germany) ${actplayer} may produce energy with a distinct powerhouse (no bonus/malus)",
	"descriptionmyturngermanyskippable": "(Germany) ${you} may produce energy with a distinct powerhouse (no bonus/malus)",
	"args": "argsAtomicAction",
	"action": "stAtomicAction",
	"type": "activeplayer",
	"possibleactions": [
		"actProduce",
		"actPassOptionalAction",
		"actRestart"
	]
}
					*/
					break;
				case "fulfillContract":
					/*
					{
	"name": "fulfillContract",
	"description": "",
	"descriptionmyturn": "",
	"descriptionskippable": "${actplayer} may fulfill a contract with an energy requirement of at most ${n}",
	"descriptionmyturnskippable": "${you} may fulfill a contract with an energy requirement of at most ${n}",
	"args": "argsAtomicAction",
	"action": "stAtomicAction",
	"type": "activeplayer",
	"possibleactions": [
		"actFulfillContract",
		"actPassOptionalAction",
		"actRestart"
	]
}
					*/
					break;
				case "placeDroplet":
					/*
					{
	"name": "placeDroplet",
	"description": "${actplayer} must choose where to place the ${n} droplet(s) (${speed})",
	"descriptionmyturn": "${you} must choose where to place the ${n} droplet(s) (${speed})",
	"descriptionskippable": "${actplayer} may place ${n} droplet(s) (${speed})",
	"descriptionmyturnskippable": "${you} may place ${n} droplet(s) (${speed})",
	"args": "argsAtomicAction",
	"action": "stAtomicAction",
	"type": "activeplayer",
	"possibleactions": [
		"actPlaceDroplet",
		"actPassOptionalAction",
		"actRestart"
	]
}
					*/
					break;
				case "rotateWheel":
					/*
					{
	"name": "rotateWheel",
	"type": "game",
	"action": "stAtomicAction"
}
					*/
					break;
				case "takeContract":
					/*
					{
	"name": "takeContract",
	"description": "${actplayer} must take ${n} available contract(s)",
	"descriptionmyturn": "${you} must take ${n} available contract(s)",
	"descriptionskippable": "${actplayer} may take ${n} available contract(s)",
	"descriptionmyturnskippable": "${you} may take ${n} available contract(s)",
	"args": "argsAtomicAction",
	"action": "stAtomicAction",
	"type": "activeplayer",
	"possibleactions": [
		"actTakeContract",
		"actPassOptionalAction",
		"actRestart"
	]
}
					*/
					break;
				case "specialEffect":
					/*
					{
	"name": "specialEffect",
	"description": "",
	"descriptionmyturn": "",
	"action": "stAtomicAction",
	"args": "argsAtomicAction",
	"type": "activeplayer",
	"possibleactions": [
		"actPassOptionalAction",
		"actRestart",
		"actCopyPower"
	]
}
					*/
					break;
				case "discardContract":
					/*
					{
	"name": "discardContract",
	"description": "${actplayer} must discard ${n} contract(s)",
	"descriptionmyturn": "${you} must discard ${n} contract(s)",
	"descriptionskippable": "${actplayer} may discard ${n} contract(s)",
	"descriptionmyturnskippable": "${you} may discard ${n} contract(s)",
	"args": "argsAtomicAction",
	"action": "stAtomicAction",
	"type": "activeplayer",
	"possibleactions": [
		"actDiscardContract",
		"actPassOptionalAction",
		"actRestart"
	]
}
					*/
					break;
				case "placeStructure":
					/*
					{
	"name": "placeStructure",
	"description": "${actplayer} must place a structure (${structure})",
	"descriptionmyturn": "${you} must place a structure (${structure})",
	"descriptionskippable": "${actplayer} may place a structure (${structure})",
	"descriptionmyturnskippable": "${you} may place a structure (${structure})",
	"descriptionauto": "${actplayer} place a structure (${structure})",
	"descriptionmyturnauto": "${you} place a structure (${structure})",
	"descriptionconstraints": "${you} place a structure (${structure}) in ${location}",
	"descriptionmyturnconstraints": "${you} place a structure (${structure}) in ${location}",
	"args": "argsAtomicAction",
	"action": "stAtomicAction",
	"type": "activeplayer",
	"possibleactions": [
		"actPlaceStructure",
		"actPassOptionalAction",
		"actRestart"
	]
}
					*/
					break;
				case "tileEffect":
					/*
					{
	"name": "tileEffect",
	"description": "",
	"descriptionmyturn": "",
	"action": "stAtomicAction",
	"args": "argsAtomicAction",
	"type": "activeplayer",
	"possibleactions": [
		"actPassOptionalAction",
		"actRestart"
	]
}
					*/
					break;
				case "patent":
					/*
					{
	"name": "patent",
	"type": "game",
	"action": "stAtomicAction"
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
	"args": "argsConfirmTurn",
	"action": "stConfirmTurn",
	"possibleactions": [
		"actConfirmTurn",
		"actRestart"
	]
}
					*/
					break;
				case "confirmPartialTurn":
					/*
					{
	"name": "confirmPartialTurn",
	"description": "${actplayer} must confirm the switch of player",
	"descriptionmyturn": "${you} must confirm the switch of player. You will not be able to restart turn",
	"type": "activeplayer",
	"args": "argsConfirmTurn",
	"possibleactions": [
		"actConfirmPartialTurn",
		"actRestart"
	]
}
					*/
					break;
				case "genericNextPlayer":
					/*
					{
	"name": "genericNextPlayer",
	"type": "game"
}
					*/
					break;
				case "endScoring":
					/*
					{
	"name": "endScoring",
	"description": "",
	"type": "game",
	"transitions": {
		"": 99
	},
	"updateGameProgression": true,
	"action": "stEndScoring"
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
export default barrage;
