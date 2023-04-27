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

const kingsguild: GamePresence = {
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
				case "gameStart":
					/*
					{
	"name": "gameStart",
	"description": "preparing game components",
	"type": "game",
	"action": "stGameStart",
	"updateGameProgression": false,
	"transitions": {
		"guildplay": 3,
		"endGuildPhase": 4
	}
}
					*/
					break;
				case "playerGuildTurn":
					/*
					{
	"name": "playerGuildTurn",
	"description": "${actplayer} must choose guild bonus",
	"descriptionmyturn": "${You} must choose guild bonus",
	"type": "activeplayer",
	"args": "argPlayerGuildTurn",
	"possibleactions": [
		"takeResourcesAndReplace",
		"placeRoom",
		"drawTreasureCard"
	],
	"transitions": {
		"nextPlayer": 2,
		"placeRoom": 2,
		"zombiePass": 2
	}
}
					*/
					break;
				case "playerTurn":
					/*
					{
	"name": "playerTurn",
	"description": "${actplayer} can gather, craft, expand or play a treasure card",
	"descriptionmyturn": "${you} can gather, craft, expand or play a treasure card",
	"type": "activeplayer",
	"args": "argPlayerTurn",
	"possibleactions": [
		"specialAction",
		"playTreasureCard",
		"bardAction",
		"oracleAction",
		"placeSpecialist",
		"makeOffering",
		"chooseResource",
		"selectExpandItem",
		"craftItem",
		"soloFuneral",
		"cancel"
	],
	"transitions": {
		"gather": 5,
		"expand": 6,
		"craft": 7,
		"specialAction": 10,
		"playTreasureNoAction": 4,
		"playTreasure": 16,
		"makeOffering": 30,
		"cancel": 4,
		"zombiePass": 30,
		"soloFuneral": 20
	}
}
					*/
					break;
				case "playerGather":
					/*
					{
	"name": "playerGather",
	"description": "${actplayer} must select resources to gather",
	"descriptionmyturn": "${you} must select resources to gather",
	"type": "activeplayer",
	"args": "argPlayerGather",
	"possibleactions": [
		"chooseResource",
		"takeResources",
		"takeResourcesAndReplace",
		"cancel"
	],
	"transitions": {
		"takeResources": 10,
		"cancel": 4,
		"zombiePass": 30
	}
}
					*/
					break;
				case "playerExpand":
					/*
					{
	"name": "playerExpand",
	"description": "${actplayer} must select room or specialist",
	"descriptionmyturn": "${you} must select room or specialist",
	"type": "activeplayer",
	"args": "argPlayerExpand",
	"possibleactions": [
		"selectExpandItem",
		"placeRoom",
		"placeSpecialist",
		"cancel",
		"pass"
	],
	"transitions": {
		"placeRoom": 10,
		"placeSpecialist": 10,
		"playTreasureNoAction": 6,
		"playTreasure": 16,
		"pass": 25,
		"cancel": 4,
		"cancelSolo": 6,
		"zombiePass": 30
	}
}
					*/
					break;
				case "playerCraft":
					/*
					{
	"name": "playerCraft",
	"description": "${actplayer} must choose item to craft",
	"descriptionmyturn": "${you} must choose item to craft",
	"type": "activeplayer",
	"args": "argPlayerCraft",
	"possibleactions": [
		"craftItem",
		"cancel"
	],
	"transitions": {
		"craftItem": 10,
		"craftItemAndSell": 15,
		"completeQuestShared": 14,
		"cancel": 4,
		"zombiePass": 30
	}
}
					*/
					break;
				case "playerBuildRoomOnly":
					/*
					{
	"name": "playerBuildRoomOnly",
	"description": "${actplayer} may build room or pass",
	"descriptionmyturn": "${you} may build room or pass",
	"type": "activeplayer",
	"args": "argPlayerExpand",
	"possibleactions": [
		"selectExpandItem",
		"placeRoom",
		"playTreasureCard",
		"pass",
		"cancel"
	],
	"transitions": {
		"placeRoom": 10,
		"playTreasureNoAction": 8,
		"playTreasure": 16,
		"pass": 30,
		"passEnd": 25,
		"cancel": 8,
		"zombiePass": 30
	}
}
					*/
					break;
				case "playerHireSpecialistOnly":
					/*
					{
	"name": "playerHireSpecialistOnly",
	"description": "${actplayer} may hire specialist or pass",
	"descriptionmyturn": "${you} may hire specialist or pass",
	"type": "activeplayer",
	"args": "argPlayerExpand",
	"possibleactions": [
		"selectExpandItem",
		"placeSpecialist",
		"playTreasureCard",
		"pass",
		"cancel"
	],
	"transitions": {
		"placeSpecialist": 10,
		"playTreasureNoAction": 9,
		"playTreasure": 16,
		"pass": 30,
		"passEnd": 25,
		"cancel": 9,
		"zombiePass": 30
	}
}
					*/
					break;
				case "gameActionSelection":
					/*
					{
	"name": "gameActionSelection",
	"type": "game",
	"action": "stgameActionSelection",
	"updateGameProgression": false,
	"transitions": {
		"playerEndTurn": 25,
		"nextPlayer": 30,
		"buildOnly": 8,
		"specialistonly": 9,
		"replaceBonusRes": 11,
		"specialAction": 12,
		"specialCraftAction": 13,
		"runAgain": 10,
		"finishTreasureCardPlay": 17,
		"appraiser": 13,
		"sellTreasures": 15,
		"funeral": 18,
		"zombiePass": 30,
		"soloPlayExpand": 6
	}
}
					*/
					break;
				case "playerReplaceBonusResource":
					/*
					{
	"name": "playerReplaceBonusResource",
	"description": "${actplayer} can take bonus resource or pass",
	"descriptionmyturn": "${you} can replace one of your resources by bonus resource or pass",
	"type": "activeplayer",
	"args": "argPlayerReplaceBonusResource",
	"possibleactions": [
		"takeResources",
		"takeResourcesAndReplace"
	],
	"transitions": {
		"takeResources": 10,
		"zombiePass": 30
	}
}
					*/
					break;
				case "playerSpecialistOneTimeAction":
					/*
					{
	"name": "playerSpecialistOneTimeAction",
	"description": "${actplayer} must use specialist ability",
	"descriptionmyturn": "${you} must use specialist ability",
	"type": "activeplayer",
	"args": "argPlayerSpecialistOneTimeAction",
	"possibleactions": [
		"chooseResource",
		"takeResources",
		"takeResourcesAndReplace",
		"drawTreasureCard",
		"placeSpecialist",
		"stealResource",
		"craftItem",
		"selectQuest",
		"selectTreasureCards",
		"pass",
		"cancel"
	],
	"transitions": {
		"pass": 10,
		"takeResources": 10,
		"drawTreasureCard": 10,
		"drawTreasureCardAndSell": 15,
		"placeSpecialist": 10,
		"stealResource": 10,
		"craftItem": 10,
		"craftItemAndSell": 15,
		"completeQuestShared": 14,
		"selectQuest": 10,
		"selectTreasureForDiscard": 12,
		"discardTreasures": 10,
		"zombiePass": 30,
		"cancel": 10
	}
}
					*/
					break;
				case "playerSpecialistCraftAction":
					/*
					{
	"name": "playerSpecialistCraftAction",
	"description": "${actplayer} can use ${specialist}'s ability",
	"descriptionmyturn": "",
	"type": "activeplayer",
	"args": "argPlayerSpecialistCraftAction",
	"possibleactions": [
		"drawTreasureCard",
		"selectTreasureCards",
		"selectQuest",
		"pass"
	],
	"transitions": {
		"pass": 10,
		"drawTreasureCardAndSell": 15,
		"drawTreasureCard": 10,
		"placeSpecialist": 10,
		"stealResource": 10,
		"playTreasureNoAction": 10,
		"playTreasure": 16,
		"selectQuest": 10,
		"zombiePass": 30
	}
}
					*/
					break;
				case "playerSelectTreasureCard":
					/*
					{
	"name": "playerSelectTreasureCard",
	"description": "${actplayer} must choose ${card_number} treasure card(s)",
	"descriptionmyturn": "${you} must choose ${card_number} card(s) to keep",
	"type": "activeplayer",
	"args": "argPlayerSelectTreasureCard",
	"possibleactions": [
		"selectTreasureCards",
		"confirm"
	],
	"transitions": {
		"confirm": 10,
		"confirmAndSell": 15,
		"zombiePass": 30
	}
}
					*/
					break;
				case "playerSellTreasure":
					/*
					{
	"name": "playerSellTreasure",
	"description": "${actplayer} must sell or discard treasure card(s)",
	"descriptionmyturn": "",
	"type": "multipleactiveplayer",
	"args": "argPlayerSellTreasure",
	"possibleactions": [
		"selectTreasureCards",
		"confirm"
	],
	"transitions": {
		"confirm": 10,
		"confirmCardPlay": 17,
		"zombiePass": 30
	}
}
					*/
					break;
				case "playerPlayTreasureEffect":
					/*
					{
	"name": "playerPlayTreasureEffect",
	"description": "${actplayer} must resolve treasure card effect",
	"descriptionmyturn": "",
	"type": "activeplayer",
	"args": "argPlayerPlayTreasureEffect",
	"possibleactions": [
		"confirm",
		"takeResourcesAndReplace",
		"drawTreasureCard",
		"chooseResource",
		"selectExpandItem",
		"placeSpecialist",
		"selectTreasureCards",
		"pass",
		"cancel"
	],
	"transitions": {
		"confirm": 17,
		"drawTreasureCardAndSell": 15,
		"cancelBetween": 10,
		"pass": 17,
		"placeSpecialist": 10,
		"selectTreasureDiscard": 16,
		"zombiePass": 30,
		"cancel": 16
	}
}
					*/
					break;
				case "nextPlayerPlayTreasure":
					/*
					{
	"name": "nextPlayerPlayTreasure",
	"type": "game",
	"action": "stNextPlayerPlayTreasure",
	"updateGameProgression": false,
	"transitions": {
		"nextPlayer": 16,
		"backToNormalActions": 4,
		"backToNormalActionsBetween": 10,
		"backToNormalActionsEnd": 25
	}
}
					*/
					break;
				case "kingsFuneralBidding":
					/*
					{
	"name": "kingsFuneralBidding",
	"description": "Other players must bid on the King's Statue",
	"descriptionmyturn": "King's Funeral: ${you} must bid on the King's Statue",
	"type": "multipleactiveplayer",
	"args": "argKingsFuneralBidding",
	"action": "stKingsFuneralBidding",
	"possibleactions": [
		"makeBid"
	],
	"transitions": {
		"makeBid": 19,
		"zombiePass": 19
	}
}
					*/
					break;
				case "resolveFuneralBidding":
					/*
					{
	"name": "resolveFuneralBidding",
	"type": "game",
	"action": "stResolveFuneralBidding",
	"updateGameProgression": false,
	"transitions": {
		"nowinner": 10,
		"winner": 20
	}
}
					*/
					break;
				case "playerPlaceKingStatue":
					/*
					{
	"name": "playerPlaceKingStatue",
	"description": "${actplayer} must place the King's Statue to the guild",
	"descriptionmyturn": "${you} must place the King's Statue to your guild",
	"type": "activeplayer",
	"args": "argPlayerPlaceKingStatue",
	"possibleactions": [
		"placeRoom"
	],
	"transitions": {
		"placeRoom": 10,
		"placeRoomAndReplace": 11,
		"zombiePass": 30
	}
}
					*/
					break;
				case "playerEndTurn":
					/*
					{
	"name": "playerEndTurn",
	"description": "${actplayer} may play treasure card(s) or end turn",
	"descriptionmyturn": "${you} may play treasure card(s) or end turn",
	"type": "activeplayer",
	"args": "argPlayerEndTurn",
	"possibleactions": [
		"endTurn",
		"playTreasureCard",
		"bardAction",
		"oracleAction",
		"cancel",
		"placeSpecialist",
		"makeOffering"
	],
	"transitions": {
		"playTreasureNoAction": 25,
		"playTreasure": 16,
		"endTurn": 30,
		"zombiePass": 30,
		"cancel": 25,
		"makeOffering": 25
	}
}
					*/
					break;
				case "nextPlayer":
					/*
					{
	"name": "nextPlayer",
	"type": "game",
	"action": "stNextPlayer",
	"updateGameProgression": true,
	"transitions": {
		"nextPlayer": 4,
		"endGame": 40,
		"zobiePass": 4
	}
}
					*/
					break;
				case "endCalculations":
					/*
					{
	"name": "endCalculations",
	"type": "game",
	"action": "stEndCalculations",
	"updateGameProgression": false,
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
export default kingsguild;
