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

const libertalia: GamePresence = {
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
				case "newCampaign":
					/*
					{
	"name": "newCampaign",
	"type": "game",
	"action": "stNewCampaign",
	"transitions": {
		"": 20
	}
}
					*/
					break;
				case "newDay":
					/*
					{
	"name": "newDay",
	"type": "game",
	"action": "stNewDay",
	"updateGameProgression": true,
	"transitions": {
		"": 21
	}
}
					*/
					break;
				case "chooseCard":
					/*
					{
	"name": "chooseCard",
	"description": "Everyone must choose a card to play",
	"descriptionmyturn": "${you} must choose a card to play",
	"type": "multipleactiveplayer",
	"action": "stChooseCard",
	"possibleactions": [
		"chooseCard"
	],
	"transitions": {
		"chooseCard": 29
	}
}
					*/
					break;
				case "beforeDay":
					/*
					{
	"name": "beforeDay",
	"type": "game",
	"action": "stBeforeDay",
	"transitions": {
		"": 30
	}
}
					*/
					break;
				case "day":
					/*
					{
	"name": "day",
	"type": "game",
	"action": "stDay",
	"transitions": {
		"endOfDay": 31,
		"recruiter": 61,
		"preacher": 62,
		"gunner": 63,
		"merchant": 64,
		"parrot": 65,
		"surgeon": 67,
		"continueDay": 30
	}
}
					*/
					break;
				case "dust":
					/*
					{
	"name": "dust",
	"type": "game",
	"action": "stDust",
	"transitions": {
		"booty": 32,
		"night": 40,
		"cabinBoy": 31
	}
}
					*/
					break;
				case "chooseBooty":
					/*
					{
	"name": "chooseBooty",
	"description": "${actplayer} must choose a booty",
	"descriptionmyturn": "${you} must choose a booty",
	"type": "activeplayer",
	"args": "argChooseBooty",
	"action": "stChooseBooty",
	"possibleactions": [
		"chooseBooty"
	],
	"transitions": {
		"chooseBooty": 31,
		"chooseBootyCook": 34,
		"bootySaber": 33,
		"zombiePass": 31
	}
}
					*/
					break;
				case "bootySaber":
					/*
					{
	"name": "bootySaber",
	"description": "Saber: ${actplayer} must choose a character to discard from the den of an adjacent player",
	"descriptionmyturn": "Saber: ${you} must choose a character to discard from the den of an adjacent player",
	"type": "activeplayer",
	"possibleactions": [
		"chooseFromDen",
		"saber"
	],
	"transitions": {
		"chooseFromDen": 31,
		"chooseFromDenCook": 34,
		"zombiePass": 31
	}
}
					*/
					break;
				case "chooseBooty":
					/*
					{
	"name": "chooseBooty",
	"description": "${actplayer} must choose a booty",
	"descriptionmyturn": "${you} must choose a booty",
	"type": "activeplayer",
	"args": "argChooseBooty",
	"action": "stChooseBooty",
	"possibleactions": [
		"chooseBooty",
		"secondChoiceForCook"
	],
	"transitions": {
		"chooseBooty": 31,
		"chooseBootyCook": 31,
		"bootySaber": 35,
		"zombiePass": 31
	}
}
					*/
					break;
				case "bootySaber":
					/*
					{
	"name": "bootySaber",
	"description": "Saber: ${actplayer} must choose a character to discard from the den of an adjacent player",
	"descriptionmyturn": "Saber: ${you} must choose a character to discard from the den of an adjacent player",
	"type": "activeplayer",
	"possibleactions": [
		"chooseFromDen",
		"saber",
		"secondChoiceForCook"
	],
	"transitions": {
		"chooseFromDen": 31,
		"chooseFromDenCook": 31,
		"zombiePass": 31
	}
}
					*/
					break;
				case "night":
					/*
					{
	"name": "night",
	"type": "game",
	"action": "stNight",
	"transitions": {
		"nextDay": 20,
		"endCampaign": 50,
		"waitress": 66,
		"reloadNight": 40
	}
}
					*/
					break;
				case "dayOfRest":
					/*
					{
	"name": "dayOfRest",
	"type": "game",
	"action": "stDayOfRest",
	"transitions": {
		"endOfGame": 99,
		"newCampaign": 10
	}
}
					*/
					break;
				case "recruiter":
					/*
					{
	"name": "recruiter",
	"description": "${card_name}: ${actplayer} must take back a character from his den",
	"descriptionmyturn": "${card_name}: ${you} must take back a character from your den",
	"type": "activeplayer",
	"args": "argCurrentCard",
	"possibleactions": [
		"chooseFromDen"
	],
	"transitions": {
		"chooseFromDen": 30,
		"zombiePass": 30
	}
}
					*/
					break;
				case "preacher":
					/*
					{
	"name": "preacher",
	"description": "${card_name}: ${actplayer} must choose which booty he want to keep",
	"descriptionmyturn": "${card_name}: ${you} must choose which booty you want to keep",
	"type": "activeplayer",
	"args": "argCurrentCard",
	"possibleactions": [
		"chooseCollectedBooty"
	],
	"transitions": {
		"chooseCollectedBooty": 30,
		"zombiePass": 30
	}
}
					*/
					break;
				case "gunner":
					/*
					{
	"name": "gunner",
	"description": "${card_name}: ${actplayer} must choose a character to discard from any den",
	"descriptionmyturn": "${card_name}: ${you} must choose a character to discard from any den",
	"type": "activeplayer",
	"args": "argCurrentCard",
	"possibleactions": [
		"chooseFromDen"
	],
	"transitions": {
		"chooseFromDen": 30,
		"zombiePass": 30
	}
}
					*/
					break;
				case "merchant":
					/*
					{
	"name": "merchant",
	"description": "${card_name}: ${actplayer} must choose booty tiles to discard",
	"descriptionmyturn": "${card_name}: ${you} must choose booty tiles to discard",
	"type": "activeplayer",
	"args": "argMerchant",
	"possibleactions": [
		"chooseBootyMerchant"
	],
	"transitions": {
		"chooseBootyMerchant": 30,
		"zombiePass": 30
	}
}
					*/
					break;
				case "parrot":
					/*
					{
	"name": "parrot",
	"description": "${card_name}: ${actplayer} must choose a card to play",
	"descriptionmyturn": "${card_name}: ${you} must choose a card to play",
	"type": "activeplayer",
	"args": "argCurrentCard",
	"possibleactions": [
		"parrot"
	],
	"transitions": {
		"parrot": 29,
		"zombiePass": 29
	}
}
					*/
					break;
				case "waitress":
					/*
					{
	"name": "waitress",
	"description": "${card_name}: ${actplayer} can discard a treasure map for 3 doubloons",
	"descriptionmyturn": "${card_name}: ${you} can discard a treasure map for 3 doubloons",
	"type": "activeplayer",
	"args": "argCurrentNightCard",
	"possibleactions": [
		"waitress"
	],
	"transitions": {
		"waitress": 40,
		"zombiePass": 40
	}
}
					*/
					break;
				case "surgeon":
					/*
					{
	"name": "surgeon",
	"description": "${card_name}: ${actplayer} must take back a character from his cemetary",
	"descriptionmyturn": "${card_name}: ${you} must take back a character from your cemetary",
	"type": "activeplayer",
	"args": "argCurrentCard",
	"possibleactions": [
		"chooseFromCemetary"
	],
	"transitions": {
		"chooseFromCemetary": 30,
		"zombiePass": 30
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
export default libertalia;
