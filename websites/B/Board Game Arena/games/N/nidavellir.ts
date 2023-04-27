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

const nidavellir: GamePresence = {
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
		"": 3
	}
}
					*/
					break;
				case "startOfAge":
					/*
					{
	"name": "startOfAge",
	"description": "",
	"type": "game",
	"action": "stStartOfAge",
	"transitions": {
		"turn": 4
	}
}
					*/
					break;
				case "startOfTurn":
					/*
					{
	"name": "startOfTurn",
	"description": "",
	"type": "game",
	"action": "stStartOfTurn",
	"updateGameProgression": true,
	"transitions": {
		"start": 10
	}
}
					*/
					break;
				case "endOfTurn":
					/*
					{
	"name": "endOfTurn",
	"description": "",
	"type": "game",
	"action": "stEndOfTurn",
	"transitions": {
		"nextTurn": 4,
		"nextAge": 38
	}
}
					*/
					break;
				case "playerBids":
					/*
					{
	"name": "playerBids",
	"description": "Waiting for other players to bid",
	"descriptionmyturn": "${you} must bid for the three taverns",
	"descriptionmyturngeneric": "${you} must bid for the three taverns",
	"descriptionmyturnplacecoin": "${you} must select a tavern to place the coin",
	"type": "multipleactiveplayer",
	"args": "argPlayerBids",
	"action": "stPlayersBids",
	"possibleactions": [
		"bid"
	],
	"transitions": {
		"done": 11
	}
}
					*/
					break;
				case "nextResolution":
					/*
					{
	"name": "nextResolution",
	"description": "",
	"type": "game",
	"action": "stNextResolution",
	"transitions": {
		"reveal": 12,
		"finished": 5
	}
}
					*/
					break;
				case "resolveBids":
					/*
					{
	"name": "resolveBids",
	"description": "",
	"type": "game",
	"action": "stRevealBids",
	"transitions": {
		"revealed": 14,
		"uline": 13
	}
}
					*/
					break;
				case "ulineBid":
					/*
					{
	"name": "ulineBid",
	"description": "${actplayer} must choose its bid (Uline's power)",
	"descriptionmyturn": "${you} must choose a coin to bid (Uline's power)",
	"type": "activeplayer",
	"args": "argUlineBid",
	"possibleactions": [
		"bid"
	],
	"transitions": {
		"revealed": 14
	}
}
					*/
					break;
				case "resolveBids":
					/*
					{
	"name": "resolveBids",
	"description": "",
	"type": "game",
	"action": "stResolveBids",
	"transitions": {
		"resolved": 20
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
	"updateGameProgression": true,
	"transitions": {
		"recruit": 21,
		"done": 11,
		"discardTavern": 36
	}
}
					*/
					break;
				case "recruitDwarf":
					/*
					{
	"name": "recruitDwarf",
	"description": "${actplayer} must recruit a dwarf at the ${tavern_name}${camp_title}",
	"descriptionmyturn": "${you} must recruit a dwarf at the ${tavern_name}${camp_title}",
	"type": "activeplayer",
	"args": "argRecruitDwarf",
	"action": "stRecruitDwarf",
	"possibleactions": [
		"recruit"
	],
	"transitions": {
		"hero": 22,
		"transform": 24,
		"placeThrud": 34,
		"vidofnir": 42,
		"hofud": 45,
		"brisingamens": 47,
		"recruitDone": 23
	}
}
					*/
					break;
				case "recruitHero":
					/*
					{
	"name": "recruitHero",
	"description": "${actplayer} must recruit a hero",
	"descriptionmyturn": "${you} must recruit a hero",
	"type": "activeplayer",
	"args": "argRecruitHero",
	"possibleactions": [
		"recruit"
	],
	"transitions": {
		"next": 20,
		"hero": 22,
		"trade": 23,
		"discard": 25,
		"transform": 24,
		"placeThrud": 34,
		"recruitCamp": 37,
		"andumia": 43,
		"olwyn": 44,
		"khradTransform": 49,
		"recruitDone": 80
	}
}
					*/
					break;
				case "tradeCoin":
					/*
					{
	"name": "tradeCoin",
	"description": "",
	"type": "game",
	"action": "stTradeCoin",
	"transitions": {
		"next": 20,
		"uline": 33
	}
}
					*/
					break;
				case "transformCoin":
					/*
					{
	"name": "transformCoin",
	"description": "${actplayer} must choose a coin to transform (+${value})",
	"descriptionmyturn": "${you} must choose a coin to transform (+${value})",
	"type": "activeplayer",
	"args": "argTransformCoin",
	"possibleactions": [
		"transform"
	],
	"transitions": {
		"hero": 22,
		"trade": 23,
		"transformDone": 80
	}
}
					*/
					break;
				case "discardCard":
					/*
					{
	"name": "discardCard",
	"description": "${actplayer} must discard ${n} cards",
	"descriptionmyturn": "${you} must discard ${n} cards",
	"descriptionsingle": "${actplayer} must discard a card",
	"descriptionmyturnsingle": "${you} must discard a card",
	"type": "activeplayer",
	"args": "argDiscardCard",
	"possibleactions": [
		"discard"
	],
	"transitions": {
		"hero": 22,
		"recruitDone": 80,
		"placeThrud": 34
	}
}
					*/
					break;
				case "preEndOfAge":
					/*
					{
	"name": "preEndOfAge",
	"description": "",
	"type": "game",
	"action": "stPreEndOfAge",
	"transitions": {
		"end": 30,
		"placeYlud": 35
	}
}
					*/
					break;
				case "endOfAge":
					/*
					{
	"name": "endOfAge",
	"description": "",
	"type": "game",
	"action": "stEndOfAge",
	"transitions": {
		"distinctions": 31,
		"scores": 90
	}
}
					*/
					break;
				case "nextDistinction":
					/*
					{
	"name": "nextDistinction",
	"description": "",
	"type": "game",
	"action": "stNextDistinction",
	"transitions": {
		"next": 31,
		"done": 3,
		"transform": 24,
		"hero": 22,
		"explorer": 32,
		"placeThrud": 34,
		"recruitDone": 31
	}
}
					*/
					break;
				case "distinctionExplorer":
					/*
					{
	"name": "distinctionExplorer",
	"description": "${actplayer} must choose a card",
	"descriptionmyturn": "${you} must choose a card",
	"type": "activeplayer",
	"args": "argDistinctionExplorer",
	"possibleactions": [
		"recruit"
	],
	"transitions": {
		"hero": 22,
		"next": 31,
		"transform": 24,
		"placeThrud": 34,
		"recruitDone": 80
	}
}
					*/
					break;
				case "ulineTradeCoin":
					/*
					{
	"name": "ulineTradeCoin",
	"description": "${actplayer} must choose two coins to trade (Uline's power)",
	"descriptionmyturn": "${you} must choose two coins to trade (Uline's power)",
	"type": "activeplayer",
	"args": "argUlineTradeCoin",
	"possibleactions": [
		"trade"
	],
	"transitions": {
		"next": 20
	}
}
					*/
					break;
				case "chooseThrudColumn":
					/*
					{
	"name": "chooseThrudColumn",
	"description": "${actplayer} must choose where to place Thrud",
	"descriptionmyturn": "${you} must choose where to place Thrud",
	"type": "activeplayer",
	"possibleactions": [
		"pickColumn",
		"recruit"
	],
	"transitions": {
		"next": 20,
		"hero": 22,
		"recruitDone": 80
	}
}
					*/
					break;
				case "chooseYludColumn":
					/*
					{
	"name": "chooseYludColumn",
	"description": "${actplayer} must choose where to place Ylud",
	"descriptionmyturn": "${you} must choose where to place Ylud",
	"type": "activeplayer",
	"possibleactions": [
		"pickColumn"
	],
	"transitions": {
		"next": 20,
		"hero": 22,
		"trade": 23,
		"placeThrud": 34,
		"recruitDone": 80
	}
}
					*/
					break;
				case "discardTavernCard":
					/*
					{
	"name": "discardTavernCard",
	"description": "${actplayer} must discard a card from the ${tavern_name}",
	"descriptionmyturn": "${you} must discard a card from the ${tavern_name}",
	"type": "activeplayer",
	"args": "argDiscardTavernCard",
	"possibleactions": [
		"discard"
	],
	"transitions": {
		"next": 20
	}
}
					*/
					break;
				case "recruitCamp":
					/*
					{
	"name": "recruitCamp",
	"description": "${actplayer} must recruit a mercenary or an artifact at the camp (Holda's effect)",
	"descriptionmyturn": "${you} must recruit a mercenary or an artifact at the camp (Holda's effect)",
	"type": "activeplayer",
	"args": "argRecruitCamp",
	"possibleactions": [
		"recruit"
	],
	"transitions": {
		"hero": 22,
		"trade": 23,
		"transform": 24,
		"vidofnir": 42,
		"hofud": 45,
		"brisingamens": 47,
		"recruitDone": 80
	}
}
					*/
					break;
				case "startMercenaryEnlistment":
					/*
					{
	"name": "startMercenaryEnlistment",
	"description": "",
	"type": "game",
	"action": "stStartMercenaryEnlistment",
	"transitions": {
		"resolved": 39,
		"skip": 29
	}
}
					*/
					break;
				case "nextPlayerMercenaryEnlistment":
					/*
					{
	"name": "nextPlayerMercenaryEnlistment",
	"description": "",
	"type": "game",
	"action": "stNextPlayerEnlist",
	"transitions": {
		"chooseOrder": 41,
		"end": 29,
		"enlist": 40
	}
}
					*/
					break;
				case "enlistMercenary":
					/*
					{
	"name": "enlistMercenary",
	"description": "${actplayer} must choose a mercenary and a column to place it",
	"descriptionmyturn": "${you} must choose a mercenary and a column to place it",
	"args": "argEnlistMercenary",
	"action": "stEnlistMercenary",
	"type": "activeplayer",
	"possibleactions": [
		"enlist"
	],
	"transitions": {
		"next": 39,
		"hero": 22,
		"trade": 23,
		"placeThrud": 34,
		"recruitDone": 40
	}
}
					*/
					break;
				case "chooseEnlistOrder":
					/*
					{
	"name": "chooseEnlistOrder",
	"description": "${actplayer} must choose to either enlist mercenaries first or last",
	"descriptionmyturn": "${you} must choose to either enlist mercenaries first or last",
	"type": "activeplayer",
	"possibleactions": [
		"chooseOrder"
	],
	"transitions": {
		"first": 40,
		"last": 39
	}
}
					*/
					break;
				case "vidofnirTransforms":
					/*
					{
	"name": "vidofnirTransforms",
	"description": "${actplayer} must choose which transformations to make (Vidofnir and Vedrfölnir's effect)",
	"descriptionmyturn": "${you} must choose which transformations to make (Vidofnir and Vedrfölnir's effect)",
	"type": "activeplayer",
	"args": "argVidofnirTransform",
	"action": "stVidofnirTransform",
	"possibleactions": [
		"vidofnirTransform"
	],
	"transitions": {
		"vidofnir": 42,
		"done": 80
	}
}
					*/
					break;
				case "pickDiscardAndumia":
					/*
					{
	"name": "pickDiscardAndumia",
	"description": "${actplayer} must pick one card in the discard",
	"descriptionmyturn": "${you} must pick one card in the discard",
	"type": "activeplayer",
	"args": "argPickDiscardAndumia",
	"possibleactions": [
		"recruit"
	],
	"transitions": {
		"hero": 22,
		"transform": 24,
		"placeThrud": 34,
		"olwyn": 44,
		"recruitDone": 80
	}
}
					*/
					break;
				case "placeOlwynDouble":
					/*
					{
	"name": "placeOlwynDouble",
	"description": "${actplayer} must choose where to place Olwyn double",
	"descriptionmyturn": "${you} must choose where to place Olwyn double",
	"type": "activeplayer",
	"action": "stPlaceOlwynDouble",
	"args": "argPlaceOlwynDouble",
	"possibleactions": [
		"pickColumn"
	],
	"transitions": {
		"hero": 22,
		"transform": 24,
		"placeThrud": 34,
		"olwyn": 44,
		"recruitDone": 44,
		"finished": 80
	}
}
					*/
					break;
				case "preHofud":
					/*
					{
	"name": "preHofud",
	"description": "",
	"type": "game",
	"action": "stPreHofud",
	"transitions": {
		"": 46
	}
}
					*/
					break;
				case "discardHofud":
					/*
					{
	"name": "discardHofud",
	"description": "Others must choose a card in the warrior column and discard it",
	"descriptionmyturn": "${you} must choose a card of the warrior column and discard it",
	"args": "argDiscardHofud",
	"type": "multipleactiveplayer",
	"possibleactions": [
		"discard"
	],
	"transitions": {
		"done": 80
	}
}
					*/
					break;
				case "preBrisingamens":
					/*
					{
	"name": "preBrisingamens",
	"description": "",
	"type": "game",
	"action": "stPreBrisingamens",
	"transitions": {
		"recruit": 48,
		"done": 80
	}
}
					*/
					break;
				case "brisingamens":
					/*
					{
	"name": "brisingamens",
	"description": "${actplayer} must pick one card in the discard",
	"descriptionmyturn": "${you} must pick one card in the discard",
	"args": "argPickDiscardAndumia",
	"type": "activeplayer",
	"possibleactions": [
		"recruit"
	],
	"transitions": {
		"hero": 22,
		"transform": 24,
		"placeThrud": 34,
		"recruitDone": 47
	}
}
					*/
					break;
				case "khradTransform":
					/*
					{
	"name": "khradTransform",
	"description": "${actplayer} must choose a coin to upgrade (Khrad's effect)",
	"descriptionmyturn": "${you} must choose a coin to upgrade (Khrad's effect)",
	"type": "activeplayer",
	"action": "stKhradTransform",
	"args": "argKhradTransform",
	"possibleactions": [
		"transform"
	],
	"transitions": {
		"transformDone": 80
	}
}
					*/
					break;
				case "resolveStack":
					/*
					{
	"name": "resolveStack",
	"description": "",
	"type": "game",
	"action": "stResolveStack",
	"transitions": []
}
					*/
					break;
				case "preEndOfGame":
					/*
					{
	"name": "preEndOfGame",
	"description": "",
	"type": "game",
	"updateGameProgression": true,
	"action": "stPreEndOfGame",
	"transitions": {
		"brisingamens": 91,
		"end": 99
	}
}
					*/
					break;
				case "brisingamensDiscard":
					/*
					{
	"name": "brisingamensDiscard",
	"description": "${actplayer} must discard a card (Brisingamens's effect)",
	"descriptionmyturn": "${you} must choose a card (Brisingamens's effect)",
	"type": "activeplayer",
	"args": "argBrisingamensDiscard",
	"possibleactions": [
		"discard"
	],
	"transitions": {
		"recruitDone": 99
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
export default nidavellir;
