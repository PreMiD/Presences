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

const legendraiders: GamePresence = {
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
		"": 10
	}
}
					*/
					break;
				case "character_choice":
					/*
					{
	"name": "character_choice",
	"description": "${actplayer} must choose the character",
	"descriptionmyturn": "${you} must choose the character",
	"args": "argsCharacterChoice",
	"type": "activeplayer",
	"possibleactions": [
		"chooseCharacter"
	],
	"transitions": {
		"stCheckFinish": 90,
		"zombiePass": 90
	}
}
					*/
					break;
				case "roll_dice":
					/*
					{
	"name": "roll_dice",
	"description": "${actplayer} must choose an action",
	"descriptionmyturn": "${you} must choose an action",
	"args": "argsRollDice",
	"type": "activeplayer",
	"possibleactions": [
		"rollDice",
		"takeCard",
		"takeDeckCard",
		"takeColumn"
	],
	"transitions": {
		"chooseAction": 50,
		"discardTile": 60,
		"discardTool": 70,
		"completeDiscovery": 80,
		"chooseDiceFace": 30,
		"checkFinish": 90,
		"zombiePass": 90
	}
}
					*/
					break;
				case "choose_dice_face":
					/*
					{
	"name": "choose_dice_face",
	"description": "${actplayer} may play a dice card or confirm the roll",
	"descriptionmyturn": "${you} may play a dice card or",
	"args": "argsChooseDiceFace",
	"type": "activeplayer",
	"possibleactions": [
		"confirmDice",
		"chooseDiceFace"
	],
	"transitions": {
		"chooseAction": 50,
		"discardTile": 60,
		"discardTool": 70,
		"checkFinish": 90
	}
}
					*/
					break;
				case "choose_dice_card_effect":
					/*
					{
	"name": "choose_dice_card_effect",
	"description": "${actplayer} must choose the dice card effect",
	"descriptionmyturn": "${you} must choose the dice card effect",
	"args": "argsChooseDiceCardEffect",
	"type": "activeplayer",
	"possibleactions": [
		"chooseDiceCardEffect"
	],
	"transitions": {
		"chooseAction": 50,
		"checkFinish": 90
	}
}
					*/
					break;
				case "choose_action":
					/*
					{
	"name": "choose_action",
	"description": "${actplayer} must choose an action",
	"descriptionmyturn": "${you} must choose an action",
	"args": "argsChooseAction",
	"type": "activeplayer",
	"possibleactions": [
		"takeCard",
		"takeDeckCard",
		"takeColumn",
		"performAction"
	],
	"transitions": {
		"chooseDiceFace": 30,
		"discardTile": 60,
		"discardTool": 70,
		"completeDiscovery": 80,
		"checkFinish": 90,
		"zombiePass": 90
	}
}
					*/
					break;
				case "discard_tile":
					/*
					{
	"name": "discard_tile",
	"description": "${actplayer} must choose a tile to discard",
	"descriptionmyturn": "${you} must choose a tile to discard",
	"args": "argsDiscardTile",
	"type": "activeplayer",
	"possibleactions": [
		"discardTile"
	],
	"transitions": {
		"chooseAction": 50,
		"discardTool": 70,
		"checkFinish": 90
	}
}
					*/
					break;
				case "discard_tool":
					/*
					{
	"name": "discard_tool",
	"description": "${actplayer} must choose a tool to discard",
	"descriptionmyturn": "${you} must choose a tool to discard",
	"args": "argsDiscardTool",
	"type": "activeplayer",
	"possibleactions": [
		"discardTool"
	],
	"transitions": {
		"completeDiscovery": 80,
		"chooseAction": 50,
		"discardTool": 70,
		"checkFinish": 90
	}
}
					*/
					break;
				case "complete_discovery":
					/*
					{
	"name": "complete_discovery",
	"description": "${actplayer} must complete a discovery or pass",
	"descriptionmyturn": "${you} must complete a discovery or",
	"args": "argsCompleteDiscovery",
	"type": "activeplayer",
	"updateGameProgression": true,
	"possibleactions": [
		"completeDiscovery",
		"pass",
		"performAction"
	],
	"transitions": {
		"completeDiscovery": 80,
		"discardTool": 70,
		"checkFinish": 90
	}
}
					*/
					break;
				case "check_finish":
					/*
					{
	"name": "check_finish",
	"type": "game",
	"action": "stCheckFinish",
	"transitions": {
		"characterChoice": 10,
		"rollDice": 20,
		"chooseAction": 50,
		"finish": 99
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
export default legendraiders;
