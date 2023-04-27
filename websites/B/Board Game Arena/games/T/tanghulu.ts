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

const tanghulu: GamePresence = {
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
				case "roll_dice":
					/*
					{
	"name": "roll_dice",
	"description": "${actplayer} must roll the dice",
	"descriptionmyturn": "${you} must roll the dice",
	"args": "argsRollDice",
	"type": "activeplayer",
	"updateGameProgression": true,
	"possibleactions": [
		"rollDice"
	],
	"transitions": {
		"bonusFruit": 15,
		"caramelizeSkewer": 20,
		"chooseAction": 30,
		"zombiePass": 90
	}
}
					*/
					break;
				case "bonus_fruit":
					/*
					{
	"name": "bonus_fruit",
	"description": "${actplayer} must choose if to place the drawn fruit or return it to the bag",
	"descriptionmyturn": "${you} must choose if to place the drawn fruit or return it to the bag",
	"args": "argsBonusFruit",
	"type": "activeplayer",
	"possibleactions": [
		"placeFruit",
		"reshuffleBag"
	],
	"transitions": {
		"chooseAction": 30,
		"checkPattern": 50,
		"checkFinish": 90
	}
}
					*/
					break;
				case "caramelize_skewer":
					/*
					{
	"name": "caramelize_skewer",
	"description": "One or more players must garnish a completed stick",
	"descriptionmyturn": "${you} must garnish a completed stick (-4<span class=\"inline_sugar_spent\"></span>)",
	"args": "argsCaramelizeSkewer",
	"type": "multipleactiveplayer",
	"possibleactions": [
		"caramelizeSkewer"
	],
	"transitions": {
		"checkFinish": 90,
		"zombiePass": 90
	}
}
					*/
					break;
				case "choose_action":
					/*
					{
	"name": "choose_action",
	"description": "${actplayer} must buy a fruit (-${cost}<span class=\"inline_coins_spent\"></span>) or go to work",
	"descriptionmyturn": "${you} must buy a fruit (-${cost}<span class=\"inline_coins_spent\"></span>) or",
	"args": "argsChooseAction",
	"type": "activeplayer",
	"updateGameProgression": true,
	"possibleactions": [
		"goToWork",
		"buyFruit"
	],
	"transitions": {
		"buyFruit": 40,
		"checkPattern": 50,
		"checkFinish": 90
	}
}
					*/
					break;
				case "buy_fruit":
					/*
					{
	"name": "buy_fruit",
	"description": "${actplayer} may buy another fruit (-${cost}<span class=\"inline_coins_spent\"></span>)",
	"descriptionmyturn": "${you} may buy another fruit (-${cost}<span class=\"inline_coins_spent\"></span>)",
	"args": "argsBuyFruit",
	"type": "activeplayer",
	"updateGameProgression": true,
	"possibleactions": [
		"buyFruit",
		"stopBuying",
		"stopBuyingAndGetSugar"
	],
	"transitions": {
		"buyFruit": 40,
		"checkPattern": 50,
		"checkFinish": 90
	}
}
					*/
					break;
				case "check_pattern":
					/*
					{
	"name": "check_pattern",
	"type": "game",
	"action": "stCheckPattern",
	"transitions": {
		"chooseAction": 30,
		"buyFruit": 40,
		"choosePattern": 60,
		"checkFinish": 90
	}
}
					*/
					break;
				case "choose_pattern":
					/*
					{
	"name": "choose_pattern",
	"description": "${actplayer} must select the pattern completed",
	"descriptionmyturn": "${you} must select the pattern completed",
	"args": "argsChoosePattern",
	"type": "activeplayer",
	"possibleactions": [
		"choosePattern"
	],
	"transitions": {
		"chooseAction": 30,
		"buyFruit": 40,
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
	"updateGameProgression": true,
	"transitions": {
		"rollDice": 10,
		"chooseAction": 30,
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
export default tanghulu;
