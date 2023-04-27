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

const seasons: GamePresence = {
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
		"": 11
	}
}
					*/
					break;
				case "draftChoice":
					/*
					{
	"name": "draftChoice",
	"description": "Everyone must choose a card to keep from the set",
	"descriptionmyturn": "${you} must choose a card to keep from the set",
	"type": "multipleactiveplayer",
	"action": "stDraftChoice",
	"possibleactions": [
		"draftChooseCard"
	],
	"transitions": {
		"everyoneChoosed": 11
	}
}
					*/
					break;
				case "continueDraftChoice":
					/*
					{
	"name": "continueDraftChoice",
	"description": "",
	"type": "game",
	"action": "stContinueDraftChoice",
	"transitions": {
		"endDraftChoice": 14,
		"endDraftChoiceTwist": 12,
		"continueDraftChoice": 10
	}
}
					*/
					break;
				case "draftTwist":
					/*
					{
	"name": "draftTwist",
	"description": "Twist of Fate: Some player must choose a card",
	"descriptionmyturn": "Twist of Fate: ${you} must choose a card to keep",
	"type": "multipleactiveplayer",
	"possibleactions": [
		"draftTwist"
	],
	"transitions": {
		"draftTwist": 14
	}
}
					*/
					break;
				case "prepareBuildLibrary":
					/*
					{
	"name": "prepareBuildLibrary",
	"description": "",
	"type": "game",
	"action": "stPrepareBuildLibrary",
	"transitions": {
		"": 18
	}
}
					*/
					break;
				case "buildLibrary3":
					/*
					{
	"name": "buildLibrary3",
	"description": "Everyone must choose 3 cards to be taken at the beginning of the 3rd year.",
	"descriptionmyturn": "${you} must choose 3 cards to be taken at the beginning of the 3rd year.",
	"type": "multipleactiveplayer",
	"action": "stBuildLibrary",
	"possibleactions": [
		"chooseLibrary"
	],
	"transitions": {
		"endBuildLibrary": 16
	}
}
					*/
					break;
				case "prepareBuildLibrary":
					/*
					{
	"name": "prepareBuildLibrary",
	"description": "",
	"type": "game",
	"action": "stPrepareBuildLibrary",
	"transitions": {
		"": 17
	}
}
					*/
					break;
				case "buildLibrary2":
					/*
					{
	"name": "buildLibrary2",
	"description": "Everyone must choose 3 cards to be taken at the beginning of the 2nd year.",
	"descriptionmyturn": "${you} must choose 3 cards to be taken at the beginning of the 2nd year.",
	"type": "multipleactiveplayer",
	"action": "stBuildLibrary",
	"possibleactions": [
		"chooseLibrary",
		"chooseLibrary2"
	],
	"transitions": {
		"endBuildLibrary": 20
	}
}
					*/
					break;
				case "buildLibraryNew":
					/*
					{
	"name": "buildLibraryNew",
	"description": "Everyone must distribute his cards in 3 decks: year I, year II, year III.",
	"descriptionmyturn": "${you} must distribute your cards in 3 decks: year I, year II, year III.",
	"type": "multipleactiveplayer",
	"action": "stBuildLibraryNew",
	"possibleactions": [
		"chooseLibrarynew"
	],
	"transitions": {
		"chooseLibrarynew": 20
	}
}
					*/
					break;
				case "startYear":
					/*
					{
	"name": "startYear",
	"description": "",
	"type": "game",
	"action": "stStartYear",
	"transitions": {
		"newyear": 21,
		"endGame": 98
	}
}
					*/
					break;
				case "startRound":
					/*
					{
	"name": "startRound",
	"description": "",
	"type": "game",
	"action": "stStartRound",
	"updateGameProgression": true,
	"transitions": {
		"newround": 22,
		"endGame": 98
	}
}
					*/
					break;
				case "diceChoice":
					/*
					{
	"name": "diceChoice",
	"description": "${actplayer} must choose a die",
	"descriptionmyturn": "${you} must choose a die",
	"type": "activeplayer",
	"possibleactions": [
		"chooseDie"
	],
	"transitions": {
		"chooseDie": 23
	}
}
					*/
					break;
				case "diceChoiceNextPlayer":
					/*
					{
	"name": "diceChoiceNextPlayer",
	"description": "",
	"type": "game",
	"action": "stDiceChoiceNextPlayer",
	"transitions": {
		"nextPlayer": 22,
		"noMoreDice": 27
	}
}
					*/
					break;
				case "nextPlayerTurn":
					/*
					{
	"name": "nextPlayerTurn",
	"description": "",
	"type": "game",
	"action": "stNextPlayerTurn",
	"transitions": {
		"nextPlayer": 27,
		"endRound": 39
	}
}
					*/
					break;
				case "maliceDie":
					/*
					{
	"name": "maliceDie",
	"description": "${actplayer} can use Die of Malice",
	"descriptionmyturn": "${you} can use Die of Malice to reroll your die",
	"type": "activeplayer",
	"action": "stMaliceDie",
	"possibleactions": [
		"reroll"
	],
	"transitions": {
		"startTurn": 227,
		"cardEffect": 50
	}
}
					*/
					break;
				case "startPlayerTurn":
					/*
					{
	"name": "startPlayerTurn",
	"description": "",
	"type": "game",
	"action": "stStartPlayerTurn",
	"transitions": {
		"checkEnergy": 31,
		"startTurn": 29
	}
}
					*/
					break;
				case "startPlayerTurn2":
					/*
					{
	"name": "startPlayerTurn2",
	"description": "",
	"type": "game",
	"action": "stStartPlayerTurn2",
	"transitions": {
		"startTurn": 30
	}
}
					*/
					break;
				case "playerTurn":
					/*
					{
	"name": "playerTurn",
	"description": "${actplayer} can take some actions",
	"descriptionmyturn": "${you} can take some actions",
	"type": "activeplayer",
	"args": "argPlayerTurn",
	"action": "stPlayerTurn",
	"possibleactions": [
		"incSummon",
		"draw",
		"transmute",
		"summon",
		"active",
		"useBonus",
		"endTurn"
	],
	"transitions": {
		"endOfTurn": 25,
		"cardEffect": 50,
		"summonVariableCost": 35,
		"draw": 32,
		"useBonus": 30,
		"bonusDraw": 36,
		"bonusExchange": 37
	}
}
					*/
					break;
				case "checkEnergy":
					/*
					{
	"name": "checkEnergy",
	"description": "${actplayer} can keep only ${keep} energies",
	"descriptionmyturn": "${you} must discard ${trash} energies",
	"type": "activeplayer",
	"args": "argCheckEnergy",
	"possibleactions": [
		"discardEnergy"
	],
	"transitions": {
		"discardEnergy": 30,
		"continueDiscard": 31
	}
}
					*/
					break;
				case "keepOrDiscard":
					/*
					{
	"name": "keepOrDiscard",
	"description": "${actplayer} can keep of discard his card",
	"descriptionmyturn": "${you} must choose to keep or discard ${card_name}",
	"type": "activeplayer",
	"args": "argKeepOfDiscard",
	"possibleactions": [
		"keepOrDiscard"
	],
	"transitions": {
		"keepOrDiscard": 30,
		"zombieTurn": 30
	}
}
					*/
					break;
				case "summonVariableCost":
					/*
					{
	"name": "summonVariableCost",
	"description": "${actplayer} must choose how to pay the cost of ${card_name}",
	"descriptionmyturn": "${you} must choose how to pay the cost of ${card_name}:",
	"type": "activeplayer",
	"action": "stSummonVariableCost",
	"args": "argSummonVariableCost",
	"possibleactions": [
		"chooseCost"
	],
	"transitions": {
		"chooseCost": 50,
		"cancelChooseCost": 30
	}
}
					*/
					break;
				case "bonusDrawChoice":
					/*
					{
	"name": "bonusDrawChoice",
	"description": "${card_name}: ${actplayer} must add one card to his hand",
	"descriptionmyturn": "${card_name}: ${you} must add one card to your hand",
	"type": "activeplayer",
	"args": "argBonusDrawChoice",
	"possibleactions": [
		"chooseCard"
	],
	"transitions": {
		"chooseCard": 30,
		"zombieTurn": 30
	}
}
					*/
					break;
				case "bonusExchangeDiscard":
					/*
					{
	"name": "bonusExchangeDiscard",
	"description": "Bonus: ${actplayer} must discard 2 energy tokens",
	"descriptionmyturn": "Bonus: ${you} must discard 2 energy tokens",
	"type": "activeplayer",
	"possibleactions": [
		"discardEnergyBonus"
	],
	"transitions": {
		"discardEnergy": 38,
		"zombieTurn": 30
	}
}
					*/
					break;
				case "bonusGainEnergy":
					/*
					{
	"name": "bonusGainEnergy",
	"description": "${card_name}: ${actplayer} must choose which energy to get (x${nbr})",
	"descriptionmyturn": "${card_name}: ${you} must choose which energy to get (x${nbr})",
	"type": "activeplayer",
	"args": "argBonusGainEnergy",
	"possibleactions": [
		"gainEnergy"
	],
	"transitions": {
		"next": 38,
		"end": 30,
		"zombieTurn": 30
	}
}
					*/
					break;
				case "preEndRound":
					/*
					{
	"name": "preEndRound",
	"description": "",
	"type": "game",
	"action": "stPreEndRound",
	"transitions": {
		"endRound": 40,
		"cardEffect": 50
	}
}
					*/
					break;
				case "endRound":
					/*
					{
	"name": "endRound",
	"description": "",
	"type": "game",
	"action": "stEndRound",
	"transitions": {
		"nextYear": 20,
		"nextRound": 21,
		"endGame": 98,
		"cardEffect": 50
	}
}
					*/
					break;
				case "cardEffect":
					/*
					{
	"name": "cardEffect",
	"description": "",
	"type": "game",
	"action": "stCardEffect",
	"transitions": {
		"nextEffect": 51,
		"checkEnergy": 52,
		"endEffectPlayerTurn": 30,
		"endEffectEndOfRound": 39,
		"endEffectNewRound": 21,
		"endEffectNewYear": 20,
		"endEffectBeforeTurn": 27,
		"gainEnergy": 60,
		"discardIshtar": 61,
		"discardKairn": 62,
		"necroticSacrifice": 63,
		"discardMirror": 64,
		"elementalChoice": 66,
		"treeOfLifeChoice": 67,
		"cauldronPlace": 69,
		"vampiricChoice": 70,
		"amuletFireChoice": 73,
		"divineChoice": 74,
		"potionDreamChoice": 75,
		"dragonSkull": 76,
		"temporalBoots": 79,
		"syllasSacrifice": 80,
		"nariaChoice": 82,
		"amsugTakeback": 83,
		"lewisChoice": 85,
		"orbChoice": 86,
		"discardIshtar2": 88,
		"discardHornPlenty": 89,
		"familiarChoice": 90,
		"rattyNightshade": 92,
		"warden_choice": 93,
		"throneDiscard": 150,
		"telescopeChoice": 151,
		"discardJewel": 152,
		"fairyMonolith": 153,
		"fairyMonolithActive": 154,
		"seleniaCodex": 155,
		"scrollIshtar": 157,
		"statueOfEolisChoice": 159,
		"resurrectionChoice": 161,
		"potionSacrificeChoice": 162,
		"ravenChoice": 163,
		"potionOfAncientChoice": 165,
		"sepuchralAmuletCardChoice": 168,
		"discardEstorian": 170,
		"arusSacrifice": 171,
		"argosianChoice": 172,
		"discardEolis": 173,
		"dragonSoulCardChoice": 174,
		"dialColofDualChoice": 175,
		"staffWinterDiscard": 176,
		"chronoRingChoice": 178,
		"urmianChoice": 179,
		"draw": 181,
		"craftyChoice": 183,
		"discardMinion": 185,
		"chaliceEternity": 186,
		"chaliceEternityChoice": 187,
		"carnivoraChoice": 188,
		"igramulChoice": 189,
		"escaped_choice": 193
	}
}
					*/
					break;
				case "nextEffect":
					/*
					{
	"name": "nextEffect",
	"description": "",
	"type": "game",
	"action": "stNextEffect",
	"transitions": {
		"": 50
	}
}
					*/
					break;
				case "nextEffectCheckEnergy":
					/*
					{
	"name": "nextEffectCheckEnergy",
	"description": "${actplayer} can keep only ${keep} energies",
	"descriptionmyturn": "${you} must discard ${trash} energies",
	"type": "activeplayer",
	"action": "stNextEffectCheckEnergy",
	"args": "argCheckEnergy",
	"possibleactions": [
		"discardEnergy",
		"discardEnergyEffect"
	],
	"transitions": {
		"energyOk": 51,
		"discardEnergy": 51,
		"continueDiscard": 52
	}
}
					*/
					break;
				case "gainEnergy":
					/*
					{
	"name": "gainEnergy",
	"description": "${card_name}: ${actplayer} must choose which energy to get (x${nbr})",
	"descriptionmyturn": "${card_name}: ${you} must choose which energy to get (x${nbr})",
	"type": "activeplayer",
	"args": "argGainEnergy",
	"possibleactions": [
		"gainEnergy"
	],
	"transitions": {
		"next": 60,
		"end": 52,
		"endAmuletOfTime": 91
	}
}
					*/
					break;
				case "discardIshtar":
					/*
					{
	"name": "discardIshtar",
	"description": "${card_name}: ${actplayer} must discard 4 identical energies",
	"descriptionmyturn": "${card_name}: ${you} must discard 4 identical energies",
	"type": "activeplayer",
	"args": "argCurrentEffectCard",
	"possibleactions": [
		"discardEnergyEffect"
	],
	"transitions": {
		"discardEnergy": 51
	}
}
					*/
					break;
				case "discardKairn":
					/*
					{
	"name": "discardKairn",
	"description": "${card_name}: ${actplayer} must discard an energy",
	"descriptionmyturn": "${card_name}: ${you} must discard an energy",
	"type": "activeplayer",
	"args": "argCurrentEffectCard",
	"possibleactions": [
		"discardEnergyEffect"
	],
	"transitions": {
		"discardEnergy": 51
	}
}
					*/
					break;
				case "necroticSacrifice":
					/*
					{
	"name": "necroticSacrifice",
	"description": "${card_name}: ${actplayer} must discard or sacrifice a familiar",
	"descriptionmyturn": "${card_name}: ${you} must discard or sacrifice a familiar",
	"type": "activeplayer",
	"args": "argCurrentEffectCard",
	"possibleactions": [
		"sacrifice",
		"discard"
	],
	"transitions": {
		"sacrifice": 60,
		"discard": 60,
		"zombieTurn": 51
	}
}
					*/
					break;
				case "mirrorDiscard":
					/*
					{
	"name": "mirrorDiscard",
	"description": "${card_name}: ${actplayer} must choose X identical energies",
	"descriptionmyturn": "${card_name}: ${you} must choose X identical energies",
	"type": "activeplayer",
	"args": "argCurrentEffectCard",
	"possibleactions": [
		"chooseXenergy"
	],
	"transitions": {
		"chooseXenergy": 65,
		"none": 51
	}
}
					*/
					break;
				case "mirrorChoose":
					/*
					{
	"name": "mirrorChoose",
	"description": "${card_name}: ${actplayer} must choose a type of energy",
	"descriptionmyturn": "${card_name}: ${you} must choose to get ${nbr}:",
	"type": "activeplayer",
	"args": "argGainEnergy",
	"possibleactions": [
		"chooseEnergyType"
	],
	"transitions": {
		"chooseEnergyType": 51
	}
}
					*/
					break;
				case "elementalChoice":
					/*
					{
	"name": "elementalChoice",
	"description": "${card_name}: ${actplayer} must choose to use one energy${forfree}",
	"descriptionmyturn": "${card_name}: ${you} must choose to use one energy${forfree}",
	"type": "activeplayer",
	"args": "argElementalChoice",
	"possibleactions": [
		"chooseEnergyType",
		"cardEffectEnd"
	],
	"transitions": {
		"chooseEnergyType": 51,
		"gainEnergy": 72,
		"continue": 66
	}
}
					*/
					break;
				case "treeOfLifeChoice":
					/*
					{
	"name": "treeOfLifeChoice",
	"description": "${card_name}: ${actplayer} must make a choice",
	"descriptionmyturn": "${card_name}: ${you} must choose:",
	"type": "activeplayer",
	"args": "argCurrentEffectCard",
	"possibleactions": [
		"dualChoice"
	],
	"transitions": {
		"discardEnergy": 68,
		"gainEnergy": 60
	}
}
					*/
					break;
				case "discardTree":
					/*
					{
	"name": "discardTree",
	"description": "${card_name}: ${actplayer} must discard an energy",
	"descriptionmyturn": "${card_name}: ${you} must discard an energy",
	"type": "activeplayer",
	"args": "argCurrentEffectCard",
	"possibleactions": [
		"discardEnergyEffect"
	],
	"transitions": {
		"discardEnergy": 51
	}
}
					*/
					break;
				case "cauldronPlace":
					/*
					{
	"name": "cauldronPlace",
	"description": "${card_name}: ${actplayer} must place an energy on the Cauldron",
	"descriptionmyturn": "${card_name}: ${you} must place an energy on the Cauldron",
	"type": "activeplayer",
	"args": "argCurrentEffectCard",
	"possibleactions": [
		"discardEnergyEffect",
		"placeenergyEffect"
	],
	"transitions": {
		"discardEnergy": 52,
		"potionSacrificeChoice": 162
	}
}
					*/
					break;
				case "vampiricChoice":
					/*
					{
	"name": "vampiricChoice",
	"description": "${card_name}: ${actplayer} must choose to draw or discard a card",
	"descriptionmyturn": "${card_name}: ${you} must choose to draw or discard a card",
	"type": "activeplayer",
	"args": "argCurrentEffectCard",
	"possibleactions": [
		"dualChoice"
	],
	"transitions": {
		"gainEnergy": 60,
		"chooseDiscard": 71,
		"noGain": 51
	}
}
					*/
					break;
				case "vampiricDiscard":
					/*
					{
	"name": "vampiricDiscard",
	"description": "${card_name}: ${actplayer} must discard a card",
	"descriptionmyturn": "${card_name}: ${you} must discard a card",
	"type": "activeplayer",
	"args": "argCurrentEffectCard",
	"possibleactions": [
		"discard",
		"useZira"
	],
	"transitions": {
		"gainEnergy": 60,
		"noGain": 51
	}
}
					*/
					break;
				case "gainEnergy":
					/*
					{
	"name": "gainEnergy",
	"description": "${card_name}: ${actplayer} must choose which energy to get (x${nbr})",
	"descriptionmyturn": "${card_name}: ${you} must choose which energy to get (x${nbr})",
	"type": "activeplayer",
	"args": "argGainEnergy",
	"possibleactions": [
		"gainEnergy"
	],
	"transitions": {
		"next": 72,
		"end": 66
	}
}
					*/
					break;
				case "amuletFireChoice":
					/*
					{
	"name": "amuletFireChoice",
	"description": "${card_name}: ${actplayer} must add one card to his hand",
	"descriptionmyturn": "${card_name}: ${you} must add one card to your hand",
	"type": "activeplayer",
	"args": "argCurrentEffectCard",
	"possibleactions": [
		"chooseCard"
	],
	"transitions": {
		"chooseCard": 51
	}
}
					*/
					break;
				case "divineChoice":
					/*
					{
	"name": "divineChoice",
	"description": "${card_name}: ${actplayer} must choose a card to summon for free",
	"descriptionmyturn": "${card_name}: ${you} must choose a card to summon for free",
	"type": "activeplayer",
	"args": "argCurrentEffectCard",
	"possibleactions": [
		"chooseCard"
	],
	"transitions": {
		"chooseCard": 51
	}
}
					*/
					break;
				case "potionDreamChoice":
					/*
					{
	"name": "potionDreamChoice",
	"description": "${card_name}: ${actplayer} must choose a card to summon for free",
	"descriptionmyturn": "${card_name}: ${you} must choose a card to summon for free",
	"type": "activeplayer",
	"args": "argCurrentEffectCard",
	"possibleactions": [
		"chooseCardHand",
		"chooseCardHandOtus"
	],
	"transitions": {
		"chooseCardHand": 51
	}
}
					*/
					break;
				case "dragonSkull1":
					/*
					{
	"name": "dragonSkull1",
	"description": "${card_name}: ${actplayer} must sacrifice a card",
	"descriptionmyturn": "${card_name}: ${you} must sacrifice a card",
	"type": "activeplayer",
	"args": "argCurrentEffectCard",
	"possibleactions": [
		"sacrifice"
	],
	"transitions": {
		"sacrifice": 77
	}
}
					*/
					break;
				case "dragonSkull2":
					/*
					{
	"name": "dragonSkull2",
	"description": "${card_name}: ${actplayer} must sacrifice a card",
	"descriptionmyturn": "${card_name}: ${you} must sacrifice a card",
	"type": "activeplayer",
	"args": "argCurrentEffectCard",
	"possibleactions": [
		"sacrifice"
	],
	"transitions": {
		"sacrifice": 78
	}
}
					*/
					break;
				case "dragonSkull3":
					/*
					{
	"name": "dragonSkull3",
	"description": "${card_name}: ${actplayer} must sacrifice a card",
	"descriptionmyturn": "${card_name}: ${you} must sacrifice a card",
	"type": "activeplayer",
	"args": "argCurrentEffectCard",
	"possibleactions": [
		"sacrifice",
		"lastsacrifice"
	],
	"transitions": {
		"sacrifice": 51
	}
}
					*/
					break;
				case "temporalBoots":
					/*
					{
	"name": "temporalBoots",
	"description": "${card_name}: ${actplayer} must move the season token back or forward",
	"descriptionmyturn": "${card_name}: ${you} must move the season token back or forward",
	"type": "activeplayer",
	"args": "argCurrentEffectCard",
	"possibleactions": [
		"moveSeason"
	],
	"transitions": {
		"moveSeason": 51
	}
}
					*/
					break;
				case "syllasSacrifice":
					/*
					{
	"name": "syllasSacrifice",
	"description": "${card_name}: ${actplayer} must sacrifice a card",
	"descriptionmyturn": "${card_name}: ${you} must sacrifice a card",
	"type": "activeplayer",
	"args": "argCurrentEffectCard",
	"possibleactions": [
		"sacrifice"
	],
	"transitions": {
		"nextPlayer": 81
	}
}
					*/
					break;
				case "syllasSacrificeNext":
					/*
					{
	"name": "syllasSacrificeNext",
	"type": "game",
	"transitions": {
		"continue": 80,
		"end": 51
	}
}
					*/
					break;
				case "nariaChoice":
					/*
					{
	"name": "nariaChoice",
	"description": "${card_name}: ${actplayer} must choose a card for ${target}",
	"descriptionmyturn": "${card_name}: ${you} must choose a card for ${target}",
	"type": "activeplayer",
	"args": "argOpponentTarget",
	"possibleactions": [
		"chooseCard"
	],
	"transitions": {
		"chooseCard": 51,
		"nextPlayer": 82
	}
}
					*/
					break;
				case "amsugTakeback":
					/*
					{
	"name": "amsugTakeback",
	"description": "${card_name}: ${actplayer} must take back a magical item",
	"descriptionmyturn": "${card_name}: ${you} must take back a magical item",
	"type": "activeplayer",
	"args": "argCurrentEffectCard",
	"possibleactions": [
		"takeBack"
	],
	"transitions": {
		"nextPlayer": 84
	}
}
					*/
					break;
				case "amsugTakebackNext":
					/*
					{
	"name": "amsugTakebackNext",
	"type": "game",
	"transitions": {
		"continue": 83,
		"end": 51
	}
}
					*/
					break;
				case "lewisChoice":
					/*
					{
	"name": "lewisChoice",
	"description": "${card_name}: ${actplayer} must choose an opponent",
	"descriptionmyturn": "${card_name}: ${you} must choose an opponent",
	"type": "activeplayer",
	"args": "argCurrentEffectCard",
	"possibleactions": [
		"choosePlayer"
	],
	"transitions": {
		"choosePlayer": 52
	}
}
					*/
					break;
				case "orbChoice":
					/*
					{
	"name": "orbChoice",
	"description": "${card_name}: ${actplayer} must make a choice",
	"descriptionmyturn": "${card_name}: ${you} must choose:",
	"type": "activeplayer",
	"args": "argCurrentEffectCard",
	"possibleactions": [
		"dualChoice"
	],
	"transitions": {
		"seeNextCard": 87,
		"discardNextCard": 51
	}
}
					*/
					break;
				case "orbChoice2":
					/*
					{
	"name": "orbChoice2",
	"description": "${card_name}: ${actplayer} must choose to summon or replace a card",
	"descriptionmyturn": "${card_name}: ${you} must choose to summon or replace this card",
	"type": "activeplayer",
	"args": "argCurrentEffectCard",
	"possibleactions": [
		"orbChoice"
	],
	"transitions": {
		"orbChoice": 51
	}
}
					*/
					break;
				case "discardIshtar":
					/*
					{
	"name": "discardIshtar",
	"description": "${card_name}: ${actplayer} must discard 3 identical energies",
	"descriptionmyturn": "${card_name}: ${you} must discard 3 identical energies",
	"type": "activeplayer",
	"args": "argCurrentEffectCard",
	"possibleactions": [
		"discardEnergyEffect"
	],
	"transitions": {
		"discardEnergy": 51
	}
}
					*/
					break;
				case "discardHornPlenty":
					/*
					{
	"name": "discardHornPlenty",
	"description": "${card_name}: ${actplayer} must discard an energy",
	"descriptionmyturn": "${card_name}: ${you} must discard an energy",
	"type": "activeplayer",
	"args": "argCurrentEffectCard",
	"possibleactions": [
		"discardEnergyEffect"
	],
	"transitions": {
		"discardEnergy": 51
	}
}
					*/
					break;
				case "familiarChoice":
					/*
					{
	"name": "familiarChoice",
	"description": "${card_name}: ${actplayer} must make a choice",
	"descriptionmyturn": "${card_name}: ${you} must choose:",
	"type": "activeplayer",
	"args": "argCurrentEffectCard",
	"possibleactions": [
		"dualChoice",
		"familiarAddToHand",
		"familiarDiscard"
	],
	"transitions": {
		"familiarAddToHand": 51,
		"familiarDiscard": 51
	}
}
					*/
					break;
				case "amuletOfTime":
					/*
					{
	"name": "amuletOfTime",
	"description": "${card_name}: ${actplayer} must discard X power cards to draw X power cards",
	"descriptionmyturn": "${card_name}: ${you} must discard X power cards to draw X power cards",
	"type": "activeplayer",
	"args": "argCurrentEffectCard",
	"possibleactions": [
		"amuletOfTime",
		"useZira"
	],
	"transitions": {
		"amuletOfTime": 52,
		"chooseZira": 91
	}
}
					*/
					break;
				case "rattyNightshade":
					/*
					{
	"name": "rattyNightshade",
	"description": "${card_name}: ${actplayer} must collect up to 2 energy token from each opponent`s energy reserve",
	"descriptionmyturn": "${card_name}: ${you} must collect up to 2 energy token from each opponent`s energy reserve",
	"type": "activeplayer",
	"args": "argCurrentEffectCard",
	"possibleactions": [
		"collectEnergy"
	],
	"transitions": {
		"rattyNightshade": 52
	}
}
					*/
					break;
				case "wardenChoice":
					/*
					{
	"name": "wardenChoice",
	"description": "${card_name}: ${actplayer} must make a choice",
	"descriptionmyturn": "${card_name}: ${you} must choose:",
	"type": "activeplayer",
	"args": "argCurrentEffectCard",
	"possibleactions": [
		"dualChoice"
	],
	"transitions": {
		"discardEnergy": 95,
		"discardCard": 97
	}
}
					*/
					break;
				case "wardenDiscardEnergy":
					/*
					{
	"name": "wardenDiscardEnergy",
	"description": "${card_name}: ${actplayer} must discard 4 energies",
	"descriptionmyturn": "${card_name}: ${you} must discard 4 energies",
	"type": "activeplayer",
	"args": "argCurrentEffectCard",
	"possibleactions": [
		"discardEnergyEffect"
	],
	"transitions": {
		"nextPlayer": 95,
		"end": 51
	}
}
					*/
					break;
				case "wardenDiscardEnergyNext":
					/*
					{
	"name": "wardenDiscardEnergyNext",
	"type": "game",
	"action": "stWardenDiscardEnergyNext",
	"transitions": {
		"playerChoice": 94,
		"next": 95,
		"end": 51
	}
}
					*/
					break;
				case "wardenDiscardCard":
					/*
					{
	"name": "wardenDiscardCard",
	"description": "${card_name}: ${actplayer} must discard a card",
	"descriptionmyturn": "${card_name}: ${you} must discard a card",
	"type": "activeplayer",
	"args": "argCurrentEffectCard",
	"possibleactions": [
		"discard",
		"useZira"
	],
	"transitions": {
		"nextPlayer": 97,
		"end": 51
	}
}
					*/
					break;
				case "wardenDiscardCardNext":
					/*
					{
	"name": "wardenDiscardCardNext",
	"type": "game",
	"action": "stWardenDiscardCardNext",
	"transitions": {
		"playerChoice": 96,
		"next": 97,
		"end": 51
	}
}
					*/
					break;
				case "finalScoring":
					/*
					{
	"name": "finalScoring",
	"description": "",
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
				case "throneDiscard":
					/*
					{
	"name": "throneDiscard",
	"description": "${card_name}: ${actplayer} must discard a card",
	"descriptionmyturn": "${card_name}: ${you} must discard a card",
	"type": "activeplayer",
	"args": "argCurrentEffectCard",
	"possibleactions": [
		"discard",
		"useZira"
	],
	"transitions": {
		"discard": 51
	}
}
					*/
					break;
				case "telescopeChoice":
					/*
					{
	"name": "telescopeChoice",
	"description": "${card_name}: ${actplayer} must replace a card on top of the draw pile",
	"descriptionmyturn": "${card_name}: ${you} must replace a card on top of the draw pile",
	"type": "activeplayer",
	"args": "argCurrentEffectCard",
	"possibleactions": [
		"chooseCard"
	],
	"transitions": {
		"chooseCard": 51
	}
}
					*/
					break;
				case "discardJewel":
					/*
					{
	"name": "discardJewel",
	"description": "${card_name}: ${actplayer} must discard 3 identical energies",
	"descriptionmyturn": "${card_name}: ${you} must discard 3 identical energies",
	"type": "activeplayer",
	"args": "argCurrentEffectCard",
	"possibleactions": [
		"discardEnergyEffect"
	],
	"transitions": {
		"discardEnergy": 51
	}
}
					*/
					break;
				case "fairyMonolith":
					/*
					{
	"name": "fairyMonolith",
	"description": "${card_name}: ${actplayer} may place an energy on ${card_name}",
	"descriptionmyturn": "${card_name}: ${you} may place an energy on ${card_name}:",
	"type": "activeplayer",
	"args": "argCurrentEffectCard",
	"possibleactions": [
		"discardEnergyEffect",
		"doNotUse"
	],
	"transitions": {
		"discardEnergy": 51,
		"doNotUse": 51
	}
}
					*/
					break;
				case "fairyMonolithActive":
					/*
					{
	"name": "fairyMonolithActive",
	"description": "${card_name}: ${actplayer} must choose which energies to return in his reserve",
	"descriptionmyturn": "${card_name}: ${you} must choose which energies to return in your reserve",
	"type": "activeplayer",
	"args": "argCurrentEffectCardWithId",
	"possibleactions": [
		"fairyMonolithActive"
	],
	"transitions": {
		"fairyMonolithActive": 52
	}
}
					*/
					break;
				case "seleniaTakeback":
					/*
					{
	"name": "seleniaTakeback",
	"description": "${card_name}: ${actplayer} must take back a magical item",
	"descriptionmyturn": "${card_name}: ${you} must take back a magical item",
	"type": "activeplayer",
	"args": "argCurrentEffectCard",
	"possibleactions": [
		"takeBack",
		"doNotUse"
	],
	"transitions": {
		"takeback": 51,
		"doNotUse": 51
	}
}
					*/
					break;
				case "scrollIshtarChoice":
					/*
					{
	"name": "scrollIshtarChoice",
	"description": "${card_name}: ${actplayer} must choose a type of energy",
	"descriptionmyturn": "${card_name}: ${you} must choose a type of energy",
	"type": "activeplayer",
	"args": "argCurrentEffectCard",
	"possibleactions": [
		"chooseEnergyType"
	],
	"transitions": {
		"scrollIshtarCardChoice": 158
	}
}
					*/
					break;
				case "scrollIshtarCardChoice":
					/*
					{
	"name": "scrollIshtarCardChoice",
	"description": "${card_name}: ${actplayer} must make a choice",
	"descriptionmyturn": "${card_name}: ${you} must choose:",
	"type": "activeplayer",
	"args": "argCurrentEffectCard",
	"possibleactions": [
		"dualChoice",
		"familiarAddToHand",
		"familiarDiscard"
	],
	"transitions": {
		"familiarAddToHand": 51,
		"familiarDiscard": 51
	}
}
					*/
					break;
				case "statueOfEolisChoice":
					/*
					{
	"name": "statueOfEolisChoice",
	"description": "${card_name}: ${actplayer} must make a choice",
	"descriptionmyturn": "${card_name}: ${you} must choose:",
	"type": "activeplayer",
	"args": "argCurrentEffectCard",
	"possibleactions": [
		"statueOfEolisChoice",
		"gainEnergy"
	],
	"transitions": {
		"statueOfEolisChoice": 51,
		"end": 51,
		"topcard": 160,
		"zombieTurn": 51
	}
}
					*/
					break;
				case "statueOfEolisLook":
					/*
					{
	"name": "statueOfEolisLook",
	"description": "${card_name}: ${actplayer} is looking at the top card of the draw pile",
	"descriptionmyturn": "${card_name}: ${you} can look at the top card of the draw pile",
	"type": "activeplayer",
	"args": "argCurrentEffectCard",
	"possibleactions": [
		"dualChoice"
	],
	"transitions": {
		"end": 51,
		"zombieTurn": 51
	}
}
					*/
					break;
				case "resurrectionChoice":
					/*
					{
	"name": "resurrectionChoice",
	"description": "${card_name}: ${actplayer} must add one card to his hand",
	"descriptionmyturn": "${card_name}: ${you} must add one card to your hand",
	"type": "activeplayer",
	"args": "argCurrentEffectCard",
	"possibleactions": [
		"chooseCard"
	],
	"transitions": {
		"chooseCard": 51
	}
}
					*/
					break;
				case "potionSacrificeChoice":
					/*
					{
	"name": "potionSacrificeChoice",
	"description": "${card_name}: ${actplayer} may sacrifice Shield of Zira instead",
	"descriptionmyturn": "${card_name}: ${you} may sacrifice Shield of Zira instead",
	"type": "activeplayer",
	"action": "stPotionSacrificeChoice",
	"args": "argCurrentEffectCard",
	"possibleactions": [
		"dualChoice",
		"useZira"
	],
	"transitions": {
		"chooseZira": 52,
		"potionDreamChoice": 75,
		"gainEnergy": 60,
		"resurrectionChoice": 161,
		"potionOfAncientChoice": 165,
		"crystalTitanChoice": 192
	}
}
					*/
					break;
				case "ravenChoice":
					/*
					{
	"name": "ravenChoice",
	"description": "${card_name}: ${actplayer} must choose a Magical item to mimic",
	"descriptionmyturn": "${card_name}: ${you} must choose a Magical item to mimic",
	"type": "activeplayer",
	"args": "argCurrentEffectCard",
	"possibleactions": [
		"chooseOpponentCard",
		"doNotUse"
	],
	"transitions": {
		"chooseOpponentCard": 51,
		"doNotUse": 51
	}
}
					*/
					break;
				case "potionOfAncientChoice":
					/*
					{
	"name": "potionOfAncientChoice",
	"description": "${card_name}: ${actplayer} must make a choice",
	"descriptionmyturn": "${card_name}: ${you} must choose:",
	"type": "activeplayer",
	"args": "argPotionOfAncientChoice",
	"action": "stPotionOfAncientChoice",
	"possibleactions": [
		"dualChoice"
	],
	"transitions": {
		"continue": 165,
		"stop": 52,
		"potionOfAncientCardChoice": 166,
		"gainEnergy": 167
	}
}
					*/
					break;
				case "potionOfAncientCardChoice":
					/*
					{
	"name": "potionOfAncientCardChoice",
	"description": "${card_name}: ${actplayer} must add one card to his hand",
	"descriptionmyturn": "${card_name}: ${you} must add one card to your hand",
	"type": "activeplayer",
	"args": "argCurrentEffectCard",
	"possibleactions": [
		"chooseCard"
	],
	"transitions": {
		"chooseCard": 165
	}
}
					*/
					break;
				case "gainEnergy":
					/*
					{
	"name": "gainEnergy",
	"description": "${card_name}: ${actplayer} must choose which energy to get (x${nbr})",
	"descriptionmyturn": "${card_name}: ${you} must choose which energy to get (x${nbr})",
	"type": "activeplayer",
	"args": "argGainEnergy",
	"possibleactions": [
		"gainEnergy"
	],
	"transitions": {
		"next": 167,
		"end": 165
	}
}
					*/
					break;
				case "sepulchralAmuletChoice":
					/*
					{
	"name": "sepulchralAmuletChoice",
	"description": "${card_name}: ${actplayer} must add one card to his hand",
	"descriptionmyturn": "${card_name}: ${you} must add one card to your hand",
	"type": "activeplayer",
	"args": "argCurrentEffectCard",
	"possibleactions": [
		"chooseCard"
	],
	"transitions": {
		"chooseCard": 169,
		"moMoreCard": 51
	}
}
					*/
					break;
				case "sepulchralAmuletChoice2":
					/*
					{
	"name": "sepulchralAmuletChoice2",
	"description": "${card_name}: ${actplayer} must replace a card on top of the draw pile",
	"descriptionmyturn": "${card_name}: ${you} must replace a card on top of the draw pile",
	"type": "activeplayer",
	"args": "argCurrentEffectCard",
	"possibleactions": [
		"chooseCard"
	],
	"transitions": {
		"chooseCard": 51,
		"moMoreCard": 51
	}
}
					*/
					break;
				case "discardEstorian":
					/*
					{
	"name": "discardEstorian",
	"description": "${card_name}: ${actplayer} must discard 2 identical energies",
	"descriptionmyturn": "${card_name}: ${you} must discard 2 identical energies",
	"type": "activeplayer",
	"args": "argCurrentEffectCard",
	"possibleactions": [
		"discardEnergyEffect"
	],
	"transitions": {
		"discardEnergy": 51
	}
}
					*/
					break;
				case "arusSacrifice":
					/*
					{
	"name": "arusSacrifice",
	"description": "${card_name}: ${actplayer} must discard or sacrifice a card",
	"descriptionmyturn": "${card_name}: ${you} must discard or sacrifice a card",
	"type": "activeplayer",
	"args": "argCurrentEffectCard",
	"possibleactions": [
		"sacrifice",
		"discard"
	],
	"transitions": {
		"sacrifice": 51,
		"discard": 51,
		"zombieTurn": 51
	}
}
					*/
					break;
				case "argosianChoice":
					/*
					{
	"name": "argosianChoice",
	"description": "${card_name}: ${actplayer} must choose a Familiar to lock",
	"descriptionmyturn": "${card_name}: ${you} must choose a Familiar to lock",
	"type": "activeplayer",
	"args": "argCurrentEffectCard",
	"possibleactions": [
		"chooseOpponentCard"
	],
	"transitions": {
		"chooseOpponentCard": 51,
		"zombieTurn": 51
	}
}
					*/
					break;
				case "discardEolis":
					/*
					{
	"name": "discardEolis",
	"description": "${card_name}: ${actplayer} must discard a Water energy",
	"descriptionmyturn": "${card_name}: ${you} must discard a Water energy",
	"type": "activeplayer",
	"args": "argCurrentEffectCard",
	"possibleactions": [
		"discardEnergyEffect",
		"chooseCost",
		"cancel"
	],
	"transitions": {
		"discardEnergy": 51,
		"cancelChooseCost": 51,
		"cancel": 51,
		"zombieTurn": 51
	}
}
					*/
					break;
				case "dragonsouldCardChoice":
					/*
					{
	"name": "dragonsouldCardChoice",
	"description": "${card_name}: ${actplayer} must choose a card",
	"descriptionmyturn": "${card_name}: ${you} must choose a card",
	"type": "activeplayer",
	"args": "argCurrentEffectCard",
	"possibleactions": [
		"chooseTableauCard",
		"cancel"
	],
	"transitions": {
		"chooseTableauCard": 51,
		"cancel": 51,
		"zombieTurn": 51
	}
}
					*/
					break;
				case "dialDualChoice":
					/*
					{
	"name": "dialDualChoice",
	"description": "${card_name}: ${actplayer} may reroll the remaining die",
	"descriptionmyturn": "${card_name}: ${you} may reroll the remaining die",
	"type": "activeplayer",
	"args": "argCurrentEffectCard",
	"possibleactions": [
		"dualChoice"
	],
	"transitions": {
		"dualChoice": 51,
		"zombieTurn": 51
	}
}
					*/
					break;
				case "staffWinterDiscard":
					/*
					{
	"name": "staffWinterDiscard",
	"description": "${card_name}: ${actplayer} must discard a card",
	"descriptionmyturn": "${card_name}: ${you} must discard a card",
	"type": "activeplayer",
	"args": "argCurrentEffectCard",
	"possibleactions": [
		"discard",
		"useZira"
	],
	"transitions": {
		"gainEnergy": 177,
		"zombieTurn": 51
	}
}
					*/
					break;
				case "gainEnergy":
					/*
					{
	"name": "gainEnergy",
	"description": "${card_name}: ${actplayer} must choose which energy to get (x${nbr})",
	"descriptionmyturn": "${card_name}: ${you} must choose which energy to get (x${nbr})",
	"type": "activeplayer",
	"args": "argGainEnergy",
	"possibleactions": [
		"gainEnergy"
	],
	"transitions": {
		"next": 177,
		"end": 52,
		"zombieTurn": 52
	}
}
					*/
					break;
				case "chronoRingChoice":
					/*
					{
	"name": "chronoRingChoice",
	"description": "${card_name}: ${actplayer} must make a choice",
	"descriptionmyturn": "${card_name}: ${you} must choose:",
	"type": "activeplayer",
	"args": "argCurrentEffectCard",
	"possibleactions": [
		"chronoRingChoice",
		"gainEnergy",
		"chronoRingChoice"
	],
	"transitions": {
		"chronoRingChoice": 51,
		"end": 51,
		"zombieTurn": 51
	}
}
					*/
					break;
				case "urmianChoice":
					/*
					{
	"name": "urmianChoice",
	"description": "${card_name}: ${actplayer} must make a choice",
	"descriptionmyturn": "${card_name}: ${you} must choose:",
	"type": "activeplayer",
	"args": "argCurrentEffectCard",
	"possibleactions": [
		"urmianChoice",
		"dualChoice"
	],
	"transitions": {
		"urmianChoice": 51,
		"urmianSacrifice": 180,
		"zombieTurn": 51
	}
}
					*/
					break;
				case "urmianSacrifice":
					/*
					{
	"name": "urmianSacrifice",
	"description": "${card_name}: ${actplayer} must sacrifice a card",
	"descriptionmyturn": "${card_name}: ${you} must sacrifice a card",
	"type": "activeplayer",
	"args": "argCurrentEffectCard",
	"possibleactions": [
		"sacrifice"
	],
	"transitions": {
		"sacrifice": 51,
		"zombieTurn": 51
	}
}
					*/
					break;
				case "keepOrDiscardRagfield":
					/*
					{
	"name": "keepOrDiscardRagfield",
	"description": "${actplayer} can keep of discard his card",
	"descriptionmyturn": "${you} must choose to keep or discard ${card_name}",
	"type": "activeplayer",
	"args": "argKeepOfDiscard",
	"possibleactions": [
		"keepOrDiscard"
	],
	"transitions": {
		"keepOrDiscard": 182,
		"draw": 181,
		"zombieTurn": 182
	}
}
					*/
					break;
				case "servantNext":
					/*
					{
	"name": "servantNext",
	"type": "game",
	"action": "stServantNext",
	"transitions": {
		"continue": 181,
		"end": 51,
		"next": 182,
		"draw": 181
	}
}
					*/
					break;
				case "craftyChooseOpponent":
					/*
					{
	"name": "craftyChooseOpponent",
	"description": "${card_name}: ${actplayer} must choose an opponent",
	"descriptionmyturn": "${card_name}: ${you} must choose an opponent",
	"type": "activeplayer",
	"args": "argCraftyChoice",
	"possibleactions": [
		"choosePlayer"
	],
	"transitions": {
		"choosePlayer": 184
	}
}
					*/
					break;
				case "crafyChoice":
					/*
					{
	"name": "crafyChoice",
	"description": "${card_name}: ${actplayer} must choose a card to give to ${target}",
	"descriptionmyturn": "${card_name}: ${you} must choose a card to give to ${target}",
	"type": "activeplayer",
	"args": "argOpponentTarget",
	"possibleactions": [
		"chooseCardHandcrafty"
	],
	"transitions": {
		"chooseCardHand": 51
	}
}
					*/
					break;
				case "discardMinion":
					/*
					{
	"name": "discardMinion",
	"description": "${card_name}: ${actplayer} must discard an Air energy",
	"descriptionmyturn": "${card_name}: ${you} must discard an Air energy",
	"type": "activeplayer",
	"args": "argCurrentEffectCard",
	"possibleactions": [
		"discardEnergyEffect",
		"chooseCost",
		"cancelChooseCost"
	],
	"transitions": {
		"discardEnergy": 51,
		"cancelChooseCost": 51,
		"zombieTurn": 51
	}
}
					*/
					break;
				case "chaliceEternity":
					/*
					{
	"name": "chaliceEternity",
	"description": "${card_name}: ${actplayer} may place an energy on ${card_name}",
	"descriptionmyturn": "${card_name}: ${you} may place an energy on ${card_name}:",
	"type": "activeplayer",
	"args": "argCurrentEffectCard",
	"possibleactions": [
		"discardEnergyEffect",
		"doNotUse"
	],
	"transitions": {
		"discardEnergy": 51,
		"doNotUse": 51,
		"zombieTurn": 51
	}
}
					*/
					break;
				case "chaliceEternityChoice":
					/*
					{
	"name": "chaliceEternityChoice",
	"description": "${card_name}: ${actplayer} must choose a card to summon for free",
	"descriptionmyturn": "${card_name}: ${you} must choose a card to summon for free",
	"type": "activeplayer",
	"args": "argCurrentEffectCard",
	"possibleactions": [
		"chooseCard"
	],
	"transitions": {
		"chooseCard": 51
	}
}
					*/
					break;
				case "carnivoraChoice":
					/*
					{
	"name": "carnivoraChoice",
	"description": "${card_name}: ${actplayer} must choose to keep or replace this card",
	"descriptionmyturn": "${card_name}: ${you} must choose to keep or replace this card",
	"type": "activeplayer",
	"args": "argCurrentEffectCard",
	"possibleactions": [
		"dualChoice"
	],
	"transitions": {
		"dualChoice": 51
	}
}
					*/
					break;
				case "igramulChoice":
					/*
					{
	"name": "igramulChoice",
	"description": "${card_name}: ${actplayer} must name a card",
	"descriptionmyturn": "${card_name}: ${you} must name a card",
	"type": "activeplayer",
	"args": "argCurrentEffectCard",
	"possibleactions": [
		"dualChoice"
	],
	"transitions": {
		"dualChoice": 191
	}
}
					*/
					break;
				case "igramulDiscard":
					/*
					{
	"name": "igramulDiscard",
	"description": "${card_name}: ${actplayer} may sacrifice Shield of Zira instead",
	"descriptionmyturn": "${card_name}: ${you} may sacrifice Shield of Zira instead",
	"type": "activeplayer",
	"action": "stIgramulDiscard",
	"args": "argCurrentEffectCard",
	"possibleactions": [
		"useZira"
	],
	"transitions": {
		"nextPlayer": 191,
		"end": 52
	}
}
					*/
					break;
				case "igramulDiscardNext":
					/*
					{
	"name": "igramulDiscardNext",
	"type": "game",
	"transitions": {
		"continue": 190,
		"end": 52
	}
}
					*/
					break;
				case "crystalTitanChoice":
					/*
					{
	"name": "crystalTitanChoice",
	"description": "${card_name}: ${actplayer} must choose an opponent Power card to sacrifice",
	"descriptionmyturn": "${card_name}: ${you} must choose an opponent Power card to sacrifice",
	"type": "activeplayer",
	"args": "argCurrentEffectCard",
	"possibleactions": [
		"chooseOpponentCard",
		"doNotUse",
		"dualChoice"
	],
	"transitions": {
		"chooseOpponentCard": 51,
		"doNotUse": 51
	}
}
					*/
					break;
				case "escapedChoice":
					/*
					{
	"name": "escapedChoice",
	"description": "${actplayer} may activate ${card_name} to get the last card drawn.",
	"descriptionmyturn": "${you} may activate ${card_name} to get the last card drawn.",
	"type": "activeplayer",
	"args": "argCurrentEffectCard",
	"possibleactions": [
		"dualChoice"
	],
	"transitions": {
		"dualChoice": 51
	}
}
					*/
					break;
				case "steadfastDie":
					/*
					{
	"name": "steadfastDie",
	"description": "${actplayer} can use Steadfast die",
	"descriptionmyturn": "${you} can use Steadfast die",
	"type": "activeplayer",
	"action": "stSteadfastDie",
	"possibleactions": [
		"steadFast"
	],
	"transitions": {
		"startTurn": 28,
		"cardEffect": 50
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
export default seasons;
