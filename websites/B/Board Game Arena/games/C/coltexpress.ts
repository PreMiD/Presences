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

const coltexpress: GamePresence = {
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
		"": 5
	}
}
					*/
					break;
				case "randomGangsters":
					/*
					{
	"name": "randomGangsters",
	"description": "",
	"type": "game",
	"action": "stRandomGangsters",
	"possibleactions": [
		"chooseGangster",
		"doneGangster"
	],
	"transitions": {
		"chooseGangster": 10,
		"doneGangster": 20
	}
}
					*/
					break;
				case "chooseGangsters":
					/*
					{
	"name": "chooseGangsters",
	"description": "${actplayer} must pick a character",
	"descriptionmyturn": "${you} must pick a character",
	"type": "activeplayer",
	"args": "argChooseGangsters",
	"possibleactions": [
		"chooseGangster"
	],
	"transitions": {
		"chooseGangster": 15,
		"zombiePass": 15
	}
}
					*/
					break;
				case "nextGangster":
					/*
					{
	"name": "nextGangster",
	"description": "",
	"type": "game",
	"action": "stNextGangster",
	"possibleactions": [
		"nextGangster",
		"doneGangster"
	],
	"transitions": {
		"nextGangster": 10,
		"doneGangster": 20
	}
}
					*/
					break;
				case "buildCards":
					/*
					{
	"name": "buildCards",
	"description": "",
	"type": "game",
	"action": "stBuildCards",
	"transitions": {
		"": 25
	}
}
					*/
					break;
				case "dealCards":
					/*
					{
	"name": "dealCards",
	"description": "",
	"type": "game",
	"action": "stDealCards",
	"updateGameProgression": true,
	"transitions": {
		"": 30
	}
}
					*/
					break;
				case "playCard":
					/*
					{
	"name": "playCard",
	"description": "${actplayer} must play a card or draw more cards",
	"descriptionmyturn": "${you} must play a card or",
	"type": "activeplayer",
	"args": "argPlayCard",
	"possibleactions": [
		"playCard",
		"drawCards"
	],
	"transitions": {
		"playCard": 35,
		"drawCards": 35,
		"zombiePass": 35
	}
}
					*/
					break;
				case "nextCard":
					/*
					{
	"name": "nextCard",
	"description": "",
	"type": "game",
	"action": "stNextCard",
	"updateGameProgression": true,
	"possibleactions": [
		"nextCard",
		"simpleGame",
		"expertGame"
	],
	"transitions": {
		"nextCard": 30,
		"simpleGame": 40,
		"expertGame": 75
	}
}
					*/
					break;
				case "revealCard":
					/*
					{
	"name": "revealCard",
	"description": "",
	"type": "game",
	"action": "stRevealCard",
	"updateGameProgression": true,
	"possibleactions": [
		"move",
		"floor",
		"marshal",
		"shoot",
		"steal",
		"punch",
		"revealsDone",
		"auto"
	],
	"transitions": {
		"move": 45,
		"floor": 40,
		"marshal": 50,
		"shoot": 55,
		"steal": 60,
		"punch": 65,
		"revealsDone": 70,
		"auto": 40
	}
}
					*/
					break;
				case "chooseCar":
					/*
					{
	"name": "chooseCar",
	"description": "${actplayer} must choose where ${gangster} moves",
	"descriptionmyturn": "${you} must choose where ${gangster} moves",
	"type": "activeplayer",
	"args": "argChooseCar",
	"possibleactions": [
		"carChosen"
	],
	"transitions": {
		"carChosen": 40,
		"zombiePass": 40
	}
}
					*/
					break;
				case "chooseCarMarshal":
					/*
					{
	"name": "chooseCarMarshal",
	"description": "${actplayer} must choose where the <span style=\"color:#d0b900\">Marshal</span> moves",
	"descriptionmyturn": "${you} must choose where the <span style=\"color:#d0b900\">Marshal</span> moves",
	"type": "activeplayer",
	"args": "argChooseCar",
	"possibleactions": [
		"carChosen"
	],
	"transitions": {
		"carChosen": 40,
		"zombiePass": 40
	}
}
					*/
					break;
				case "chooseTargetShoot":
					/*
					{
	"name": "chooseTargetShoot",
	"description": "${actplayer} must choose which target ${gangster} shoots",
	"descriptionmyturn": "${you} must choose which target ${gangster} shoots",
	"type": "activeplayer",
	"args": "argChooseTargetShoot",
	"possibleactions": [
		"targetChosenShoot"
	],
	"transitions": {
		"targetChosenShoot": 40,
		"zombiePass": 40
	}
}
					*/
					break;
				case "chooseLoot":
					/*
					{
	"name": "chooseLoot",
	"description": "${actplayer} must choose which loot ${gangster} takes",
	"descriptionmyturn": "${you} must choose which loot ${gangster} takes",
	"type": "activeplayer",
	"args": "argChooseLoot",
	"possibleactions": [
		"lootChosen"
	],
	"transitions": {
		"lootChosen": 40,
		"zombiePass": 40
	}
}
					*/
					break;
				case "chooseTargetPunch":
					/*
					{
	"name": "chooseTargetPunch",
	"description": "${actplayer} must choose who ${gangster} punches",
	"descriptionmyturn": "${you} must choose who ${gangster} punches",
	"type": "activeplayer",
	"args": "argChooseTargetPunch",
	"possibleactions": [
		"targetChosenPunch"
	],
	"transitions": {
		"targetChosenPunch": 40,
		"zombiePass": 40
	}
}
					*/
					break;
				case "endRoundEvent":
					/*
					{
	"name": "endRoundEvent",
	"description": "",
	"type": "game",
	"action": "stEndRoundEvent",
	"possibleactions": [
		"nextRound",
		"gameEnd"
	],
	"transitions": {
		"nextRound": 25,
		"gameEnd": 99
	}
}
					*/
					break;
				case "discard":
					/*
					{
	"name": "discard",
	"description": "Everyone must choose which cards to discard before next round",
	"descriptionmyturn": "${you} must choose which cards to discard before next round",
	"type": "multipleactiveplayer",
	"possibleactions": [
		"discard"
	],
	"transitions": {
		"discard": 40
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
export default coltexpress;
