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

const abyss: GamePresence = {
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
		"": 19
	}
}
					*/
					break;
				case "plotAtCourt":
					/*
					{
	"name": "plotAtCourt",
	"description": "${actplayer} may spend a Pearl to bring a new Lord to Court",
	"descriptionmyturn": "${you} may spend a Pearl to bring a new Lord to Court",
	"type": "activeplayer",
	"args": "argAffordableLords",
	"action": "stPlotAtCourt",
	"possibleactions": [
		"plot",
		"pass",
		"explore",
		"requestSupport",
		"recruit",
		"lordEffect"
	],
	"transitions": {
		"plot": 2,
		"pass": 3,
		"explore": 4,
		"requestSupport": 8,
		"requestSupport2": 32,
		"recruit": 12,
		"lord_17": 117,
		"lord_21": 121,
		"lord_12": 112,
		"zombiePass": 3,
		"loopback": 2
	}
}
					*/
					break;
				case "action":
					/*
					{
	"name": "action",
	"description": "${actplayer} must explore, request support or recruit a Lord",
	"descriptionmyturn": "${you} must explore, request support or recruit a Lord",
	"type": "activeplayer",
	"args": "argAffordableLords",
	"action": "stAction",
	"possibleactions": [
		"explore",
		"requestSupport",
		"recruit",
		"lordEffect"
	],
	"transitions": {
		"explore": 4,
		"requestSupport": 8,
		"requestSupport2": 32,
		"recruit": 12,
		"lord_17": 117,
		"lord_21": 121,
		"lord_12": 112,
		"zombiePass": 8,
		"loopback": 3
	}
}
					*/
					break;
				case "prepurchase":
					/*
					{
	"name": "prepurchase",
	"type": "game",
	"action": "stPrePurchase",
	"transitions": {
		"purchase": 5,
		"explore": 6
	}
}
					*/
					break;
				case "purchase":
					/*
					{
	"name": "purchase",
	"description": "${actplayer} may purchase the last Ally or pass",
	"descriptionmyturn": "${you} may purchase the last Ally or pass",
	"type": "activeplayer",
	"args": "argPurchase",
	"possibleactions": [
		"purchase",
		"pass"
	],
	"transitions": {
		"purchase": 62,
		"pass": 4,
		"zombiePass": 4,
		"loopback": 5
	}
}
					*/
					break;
				case "preexplore":
					/*
					{
	"name": "preexplore",
	"type": "game",
	"action": "stPreExplore",
	"transitions": {
		"default": 7,
		"trackFull": 72
	}
}
					*/
					break;
				case "explore":
					/*
					{
	"name": "explore",
	"description": "${actplayer} must take the last card or explore",
	"descriptionmyturn": "${you} must take the last card or explore",
	"type": "activeplayer",
	"args": "argPurchase",
	"possibleactions": [
		"explore",
		"exploreTake",
		"lordEffect"
	],
	"transitions": {
		"explore": 4,
		"exploreTakeAlly": 8,
		"exploreTakeMonster": 11,
		"lord_17": 117,
		"lord_21": 121,
		"lord_12": 112,
		"zombiePass": 8,
		"loopback": 7
	}
}
					*/
					break;
				case "precontrol":
					/*
					{
	"name": "precontrol",
	"type": "game",
	"action": "stPreControl",
	"transitions": {
		"control": 9,
		"next": 18
	}
}
					*/
					break;
				case "control":
					/*
					{
	"name": "control",
	"description": "${actplayer} must choose a Location to control",
	"descriptionmyturn": "${you} must choose a face-up Location to control or draw some from the deck",
	"type": "activeplayer",
	"args": "argControlPostDraw",
	"possibleactions": [
		"chooseLocation",
		"drawLocations"
	],
	"transitions": {
		"chooseLocation": 8,
		"drawLocations": 16,
		"locationEffectBlackSmokers": 17,
		"lord_17": 117,
		"lord_21": 121,
		"lord_12": 112,
		"zombiePass": 10,
		"loopback": 9
	}
}
					*/
					break;
				case "next":
					/*
					{
	"name": "next",
	"type": "game",
	"action": "stNextPlayer",
	"updateGameProgression": true,
	"transitions": {
		"endGame": 98,
		"plot": 19
	}
}
					*/
					break;
				case "chooseMonsterReward":
					/*
					{
	"name": "chooseMonsterReward",
	"description": "${actplayer} must choose a reward",
	"descriptionmyturn": "${you} must choose a reward",
	"type": "activeplayer",
	"args": "argChooseMonsterReward",
	"action": "stChooseMonsterReward",
	"possibleactions": [
		"chooseReward",
		"lordEffect"
	],
	"transitions": {
		"next": 8,
		"lord_17": 117,
		"lord_21": 121,
		"lord_12": 112,
		"zombiePass": 8,
		"loopback": 11
	}
}
					*/
					break;
				case "recruitPay":
					/*
					{
	"name": "recruitPay",
	"description": "${actplayer} must pay for the chosen Lord",
	"descriptionmyturn": "${you} must pay for the chosen Lord",
	"type": "activeplayer",
	"args": "argRecruitPay",
	"possibleactions": [
		"pay",
		"pass",
		"lordEffect"
	],
	"transitions": {
		"pay": 13,
		"pass": 2,
		"lord_17": 117,
		"lord_21": 121,
		"lord_12": 112,
		"zombiePass": 8,
		"loopback": 12
	}
}
					*/
					break;
				case "affiliate":
					/*
					{
	"name": "affiliate",
	"description": "${actplayer} must choose an Ally to affiliate",
	"descriptionmyturn": "${you} must choose an Ally to affiliate",
	"type": "activeplayer",
	"args": "argAffiliate",
	"possibleactions": [
		"affiliate",
		"lordEffect"
	],
	"transitions": {
		"affiliate": 14,
		"lord_17": 117,
		"lord_21": 121,
		"lord_12": 112,
		"zombiePass": 8,
		"loopback": 13
	}
}
					*/
					break;
				case "lordEffect":
					/*
					{
	"name": "lordEffect",
	"description": "${actplayer} must apply effect of the new Lord",
	"descriptionmyturn": "${you} must apply effect of the new Lord",
	"type": "activeplayer",
	"args": "argLordEffect",
	"action": "stLordEffect",
	"possibleactions": [
		"pass"
	],
	"transitions": {
		"done": 8,
		"lord_2": 102,
		"lord_4": 104,
		"lord_5": 105,
		"lord_7": 107,
		"lord_16": 116,
		"lord_19": 119,
		"lord_22": 122,
		"lord_26": 126,
		"lord_23": 123,
		"lord_ambassador": 16,
		"zombiePass": 8,
		"loopback": 14
	}
}
					*/
					break;
				case "cleanupDiscard":
					/*
					{
	"name": "cleanupDiscard",
	"description": "${actplayer} must discard down to 6 Allies",
	"descriptionmyturn": "${you} must discard down to 6 Allies",
	"type": "activeplayer",
	"action": "stCleanupDiscard",
	"possibleactions": [
		"discard",
		"lordEffect"
	],
	"transitions": {
		"next": 10,
		"lord_17": 117,
		"lord_21": 121,
		"lord_12": 112,
		"zombiePass": 8,
		"loopback": 15
	}
}
					*/
					break;
				case "controlPostDraw":
					/*
					{
	"name": "controlPostDraw",
	"description": "${actplayer} must choose a Location to control",
	"descriptionmyturn": "${you} must choose a Location to control",
	"type": "activeplayer",
	"args": "argControlPostDraw",
	"possibleactions": [
		"chooseLocation"
	],
	"transitions": {
		"chooseLocation": 8,
		"locationEffectBlackSmokers": 17,
		"lord_17": 117,
		"lord_21": 121,
		"lord_12": 112,
		"zombiePass": 10,
		"loopback": 16
	}
}
					*/
					break;
				case "locationEffectBlackSmokers":
					/*
					{
	"name": "locationEffectBlackSmokers",
	"description": "${actplayer} may swap the Location for one from the deck",
	"descriptionmyturn": "${you} may swap the Location for one from the deck",
	"type": "activeplayer",
	"action": "stBlackSmokers",
	"args": "argDeckLocations",
	"possibleactions": [
		"chooseLocation"
	],
	"transitions": {
		"chooseLocation": 8,
		"pass": 8,
		"zombiePass": 8,
		"loopback": 17
	}
}
					*/
					break;
				case "unusedLords":
					/*
					{
	"name": "unusedLords",
	"description": "${actplayer} may use the abilities of their unused Lords",
	"descriptionmyturn": "${you} may use the abilities of your unused Lords",
	"type": "activeplayer",
	"action": "stUnusedLords",
	"possibleactions": [
		"lordEffect",
		"pass"
	],
	"transitions": {
		"pass": 15,
		"lord_17": 117,
		"lord_21": 121,
		"lord_12": 112,
		"zombiePass": 8,
		"loopback": 18
	}
}
					*/
					break;
				case "preTurn":
					/*
					{
	"name": "preTurn",
	"type": "game",
	"action": "stPreTurn",
	"transitions": {
		"": 2
	}
}
					*/
					break;
				case "secondStack":
					/*
					{
	"name": "secondStack",
	"description": "${actplayer} must take a second stack from the Council",
	"descriptionmyturn": "${you} must take a second stack from the Council",
	"type": "activeplayer",
	"possibleactions": [
		"requestSupport",
		"lordEffect"
	],
	"transitions": {
		"requestSupport": 8,
		"requestSupport2": 8,
		"lord_17": 117,
		"lord_21": 121,
		"lord_12": 112,
		"zombiePass": 8,
		"loopback": 32
	}
}
					*/
					break;
				case "postpurchase":
					/*
					{
	"name": "postpurchase",
	"type": "game",
	"action": "stPreExplore",
	"transitions": {
		"default": 71
	}
}
					*/
					break;
				case "postpurchaseDiscard":
					/*
					{
	"name": "postpurchaseDiscard",
	"description": "${actplayer} must discard down to 6 Allies",
	"descriptionmyturn": "${you} must discard down to 6 Allies",
	"type": "activeplayer",
	"action": "stCleanupDiscard",
	"possibleactions": [
		"discard"
	],
	"transitions": {
		"next": 61,
		"zombiePass": 61,
		"loopback": 61
	}
}
					*/
					break;
				case "explore2":
					/*
					{
	"name": "explore2",
	"description": "${actplayer} must explore",
	"descriptionmyturn": "${you} must explore",
	"type": "activeplayer",
	"args": "argPurchase",
	"action": "stMustExplore",
	"possibleactions": [
		"explore",
		"lordEffect"
	],
	"transitions": {
		"explore": 4,
		"lord_17": 117,
		"lord_21": 121,
		"lord_12": 112,
		"zombiePass": 8,
		"loopback": 71
	}
}
					*/
					break;
				case "explore3":
					/*
					{
	"name": "explore3",
	"description": "${actplayer} must take the last card",
	"descriptionmyturn": "${you} must take the last card",
	"type": "activeplayer",
	"args": "argPurchase",
	"action": "stMustExploreTake",
	"possibleactions": [
		"exploreTake",
		"lordEffect"
	],
	"transitions": {
		"exploreTakeAlly": 8,
		"exploreTakeMonster": 11,
		"lord_17": 117,
		"lord_21": 121,
		"lord_12": 112,
		"zombiePass": 8,
		"loopback": 72
	}
}
					*/
					break;
				case "finalScoring":
					/*
					{
	"name": "finalScoring",
	"description": "Final scoring",
	"descriptionmyturn": "Final scoring",
	"type": "game",
	"action": "stFinalScoring",
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
				case "lord2":
					/*
					{
	"name": "lord2",
	"description": "Other players must discard an Ally",
	"descriptionmyturn": "${you} must discard an Ally",
	"type": "multipleactiveplayer",
	"action": "stLord2",
	"possibleactions": [
		"discard"
	],
	"transitions": {
		"next": 8,
		"loopback": 102
	}
}
					*/
					break;
				case "lord4":
					/*
					{
	"name": "lord4",
	"description": "${actplayer} must disable one Lord from each opponent",
	"descriptionmyturn": "${you} must disable one Lord from each opponent",
	"type": "activeplayer",
	"possibleactions": [
		"selectLord"
	],
	"transitions": {
		"selectLord": 104,
		"next": 8,
		"zombiePass": 8,
		"loopback": 104
	}
}
					*/
					break;
				case "lord5":
					/*
					{
	"name": "lord5",
	"description": "Other players must discard down to 6 Allies",
	"descriptionmyturn": "${you} must discard down to 6 Allies",
	"type": "multipleactiveplayer",
	"action": "stLord5",
	"possibleactions": [
		"discard"
	],
	"transitions": {
		"next": 8,
		"loopback": 105
	}
}
					*/
					break;
				case "lord7":
					/*
					{
	"name": "lord7",
	"description": "${actplayer} must choose a player to steal a Monster token from",
	"descriptionmyturn": "${you} must choose a player to steal a Monster token from",
	"type": "activeplayer",
	"possibleactions": [
		"chooseMonsterTokens"
	],
	"transitions": {
		"next": 8,
		"zombiePass": 8,
		"loopback": 107
	}
}
					*/
					break;
				case "lord12":
					/*
					{
	"name": "lord12",
	"description": "${actplayer} may discard 1 Ally to gain 2 Pearls",
	"descriptionmyturn": "${you} may discard 1 Ally to gain 2 Pearls",
	"type": "activeplayer",
	"possibleactions": [
		"selectAlly",
		"pass"
	],
	"transitions": {
		"return_2": 2,
		"return_3": 3,
		"return_32": 32,
		"return_7": 7,
		"return_71": 71,
		"return_72": 72,
		"return_9": 9,
		"return_11": 11,
		"return_12": 12,
		"return_13": 13,
		"return_15": 15,
		"return_16": 16,
		"return_18": 18,
		"zombiePass": 8,
		"loopback": 112
	}
}
					*/
					break;
				case "lord16":
					/*
					{
	"name": "lord16",
	"description": "${actplayer} must choose a Council stack to add to their hand",
	"descriptionmyturn": "${you} must choose a Council stack to add to your hand",
	"type": "activeplayer",
	"possibleactions": [
		"requestSupport"
	],
	"transitions": {
		"requestSupport": 8,
		"zombiePass": 8,
		"loopback": 116
	}
}
					*/
					break;
				case "lord17":
					/*
					{
	"name": "lord17",
	"description": "${actplayer} may discard 1 stack from the Council",
	"descriptionmyturn": "${you} may discard 1 stack from the Council",
	"type": "activeplayer",
	"possibleactions": [
		"requestSupport",
		"pass"
	],
	"transitions": {
		"return_2": 2,
		"return_3": 3,
		"return_32": 32,
		"return_7": 7,
		"return_71": 71,
		"return_72": 72,
		"return_9": 9,
		"return_11": 11,
		"return_12": 12,
		"return_13": 13,
		"return_15": 15,
		"return_16": 16,
		"return_18": 18,
		"zombiePass": 8,
		"loopback": 117
	}
}
					*/
					break;
				case "lord19":
					/*
					{
	"name": "lord19",
	"description": "${actplayer} may swap a Location for an available one",
	"descriptionmyturn": "${you} may choose a Location you control to swap with an available one",
	"type": "activeplayer",
	"possibleactions": [
		"chooseLocation",
		"pass"
	],
	"transitions": {
		"chooseLocation": 1192,
		"pass": 8,
		"zombiePass": 8,
		"loopback": 119
	}
}
					*/
					break;
				case "lord21":
					/*
					{
	"name": "lord21",
	"description": "${actplayer} may discard and replace a Lord from the Court",
	"descriptionmyturn": "${you} may discard and replace a Lord from the Court",
	"type": "activeplayer",
	"possibleactions": [
		"recruit",
		"pass"
	],
	"transitions": {
		"return_2": 2,
		"return_3": 3,
		"return_32": 32,
		"return_7": 7,
		"return_71": 71,
		"return_72": 72,
		"return_9": 9,
		"return_11": 11,
		"return_12": 12,
		"return_13": 13,
		"return_15": 15,
		"return_16": 16,
		"return_18": 18,
		"zombiePass": 8,
		"loopback": 121
	}
}
					*/
					break;
				case "lord22":
					/*
					{
	"name": "lord22",
	"description": "${actplayer} may recruit a second Lord for 5 Pearls",
	"descriptionmyturn": "${you} may recruit a second Lord for 5 Pearls",
	"type": "activeplayer",
	"possibleactions": [
		"recruit",
		"pass"
	],
	"transitions": {
		"recruit": 14,
		"pass": 8,
		"zombiePass": 8,
		"loopback": 122
	}
}
					*/
					break;
				case "lord23":
					/*
					{
	"name": "lord23",
	"description": "${actplayer} may discard a Lord to gain one from the Court",
	"descriptionmyturn": "${you} may discard a Lord to gain one from the Court",
	"type": "activeplayer",
	"possibleactions": [
		"selectLord",
		"pass"
	],
	"transitions": {
		"selectLord": 1232,
		"pass": 8,
		"zombiePass": 8,
		"loopback": 123
	}
}
					*/
					break;
				case "lord26":
					/*
					{
	"name": "lord26",
	"description": "${actplayer} may discard a Lord to gain one from the top of the deck",
	"descriptionmyturn": "${you} may discard a Lord to gain one from the top of the deck",
	"type": "activeplayer",
	"possibleactions": [
		"selectLord",
		"pass"
	],
	"transitions": {
		"selectLord": 14,
		"pass": 8,
		"zombiePass": 8,
		"loopback": 126
	}
}
					*/
					break;
				case "lord19b":
					/*
					{
	"name": "lord19b",
	"description": "${actplayer} may swap a Location for an available one",
	"descriptionmyturn": "${you} may choose an available Location to gain",
	"type": "activeplayer",
	"possibleactions": [
		"chooseLocation",
		"pass"
	],
	"transitions": {
		"chooseLocation": 8,
		"locationEffectBlackSmokers": 17,
		"pass": 8,
		"zombiePass": 8,
		"loopback": 1192
	}
}
					*/
					break;
				case "lord23b":
					/*
					{
	"name": "lord23b",
	"description": "${actplayer} may swap a Lord with one from the Court",
	"descriptionmyturn": "${you} must choose a Lord from the Court to gain",
	"type": "activeplayer",
	"possibleactions": [
		"recruit"
	],
	"transitions": {
		"recruit": 14,
		"zombiePass": 8,
		"loopback": 1232
	}
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
export default abyss;
