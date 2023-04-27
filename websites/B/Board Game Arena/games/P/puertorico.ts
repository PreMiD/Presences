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

const puertorico: GamePresence = {
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
		"": 201
	}
}
					*/
					break;
				case "nextGovernor":
					/*
					{
	"name": "nextGovernor",
	"description": "Electing the new governor",
	"descriptionmyturn": "",
	"type": "game",
	"action": "stNextGovernor",
	"transitions": {
		"": 3
	}
}
					*/
					break;
				case "nextPlayerForRoleSelection":
					/*
					{
	"name": "nextPlayerForRoleSelection",
	"description": "Activating the next player to select a role",
	"descriptionmyturn": "",
	"type": "game",
	"action": "stNextPlayerForRoleSelection",
	"transitions": {
		"nextPlayerSelected": 4,
		"endOfRoleSelection": 17
	}
}
					*/
					break;
				case "playerRoleSelection":
					/*
					{
	"name": "playerRoleSelection",
	"description": "${actplayer} must select a role",
	"descriptionmyturn": "${you} must select a role",
	"type": "activeplayer",
	"action": "stPlayerRoleSelection",
	"possibleactions": [
		"selectCaptain",
		"selectTrader",
		"selectSettler",
		"selectCraftsman",
		"selectBuilder",
		"selectMayor",
		"selectProspector",
		"zombiePass"
	],
	"transitions": {
		"selectCaptain": 51,
		"selectTrader": 7,
		"selectSettler": 81,
		"selectCraftsman": 9,
		"selectBuilder": 11,
		"selectMayor": 121,
		"selectProspector": 14,
		"zombiePass": 3
	}
}
					*/
					break;
				case "playerCaptainShipSelection":
					/*
					{
	"name": "playerCaptainShipSelection",
	"description": "${actplayer} must select a cargo ship (or a wharf)",
	"descriptionmyturn": "${you} must select a cargo ship (or a wharf)",
	"type": "activeplayer",
	"args": "argPlayerCanDeclineUsingWharf",
	"action": "stPlayerCaptainShipSelection",
	"updateGameProgression": true,
	"possibleactions": [
		"selectShip",
		"selectBuilding",
		"cancel",
		"zombiePass",
		"selectColonist",
		"selectPlantation"
	],
	"transitions": {
		"selectShipOrWharf": 6,
		"selectSmallWharf": 60,
		"occupiedGuesthouse": 53,
		"pass": 15,
		"zombiePass": 15
	}
}
					*/
					break;
				case "playerCaptainGoodSelection":
					/*
					{
	"name": "playerCaptainGoodSelection",
	"description": "${actplayer} must select a type of good to ship",
	"descriptionmyturn": "${you} must select a type of good to ship",
	"type": "activeplayer",
	"action": "stPlayerCaptainGoodSelection",
	"updateGameProgression": false,
	"possibleactions": [
		"selectGoodToShip",
		"cancel",
		"zombiePass",
		"selectColonist",
		"selectBuilding",
		"selectPlantation"
	],
	"transitions": {
		"selectGoodToShip": 15,
		"pass": 5,
		"zombiePass": 15
	}
}
					*/
					break;
				case "playerTraderGoodSelection":
					/*
					{
	"name": "playerTraderGoodSelection",
	"description": "${actplayer} must select some good to trade",
	"descriptionmyturn": "${you} must select some good to trade",
	"type": "activeplayer",
	"action": "stPlayerTraderGoodSelection",
	"updateGameProgression": false,
	"possibleactions": [
		"selectGoodToTrade",
		"cancel",
		"selectColonist",
		"selectBuilding",
		"selectPlantation"
	],
	"transitions": {
		"selectGoodToTrade": 15,
		"mustSelectTradingLocation": 71,
		"occupiedGuesthouse": 74,
		"canBuyPlantation": 72,
		"canSellPlantation": 73,
		"pass": 15,
		"zombiePass": 15
	}
}
					*/
					break;
				case "playerSettlerPlantationSelection":
					/*
					{
	"name": "playerSettlerPlantationSelection",
	"description": "${actplayer} must select a plantation",
	"descriptionmyturn": "${you} must select a plantation",
	"type": "activeplayer",
	"action": "stPlayerSettlerPlantationSelection",
	"updateGameProgression": false,
	"possibleactions": [
		"selectPlantation",
		"selectQuarry",
		"selectForest",
		"cancel",
		"zombiePass",
		"selectColonist",
		"selectBuilding"
	],
	"transitions": {
		"selectPlantation": 82,
		"selectQuarry": 82,
		"selectForest": 83,
		"pass": 84,
		"zombiePass": 15
	}
}
					*/
					break;
				case "craftsmanGoodsProduction":
					/*
					{
	"name": "craftsmanGoodsProduction",
	"description": "${actplayer} produces some goods",
	"descriptionmyturn": "",
	"type": "game",
	"action": "stCraftsmanGoodsProduction",
	"transitions": {
		"productionDone": 10,
		"occupiedGuesthouse": 91
	}
}
					*/
					break;
				case "playerCraftsmanPrivilege":
					/*
					{
	"name": "playerCraftsmanPrivilege",
	"description": "${actplayer} can select an extra good he can produce as his privilege",
	"descriptionmyturn": "${you} can select an extra good you can produce as your privilege",
	"type": "activeplayer",
	"action": "stPlayerCraftsmanPrivilege",
	"updateGameProgression": false,
	"possibleactions": [
		"selectGoodToProduce",
		"cancel",
		"zombiePass",
		"selectColonist",
		"selectBuilding",
		"selectPlantation"
	],
	"transitions": {
		"selectGoodToProduce": 15,
		"selectGoodToProduceLibrary": 10,
		"pass": 15,
		"zombiePass": 15
	}
}
					*/
					break;
				case "playerBuilderBuildingSelection":
					/*
					{
	"name": "playerBuilderBuildingSelection",
	"description": "${actplayer} must select a building to build",
	"descriptionmyturn": "${you} must select a building to build",
	"type": "activeplayer",
	"action": "stPlayerBuilderBuildingSelection",
	"updateGameProgression": true,
	"possibleactions": [
		"selectBuilding",
		"cancel",
		"zombiePass",
		"selectColonist",
		"selectPlantation"
	],
	"transitions": {
		"selectBuilding": 111,
		"blackMarket": 112,
		"pass": 15,
		"zombiePass": 15
	}
}
					*/
					break;
				case "mayorColonistsArrival":
					/*
					{
	"name": "mayorColonistsArrival",
	"description": "Colonists set foot in the new world",
	"descriptionmyturn": "",
	"type": "game",
	"action": "stMayorColonistsArrival",
	"transitions": {
		"": 13
	}
}
					*/
					break;
				case "multiplayerPlaceColonists":
					/*
					{
	"name": "multiplayerPlaceColonists",
	"description": "Everyone must place their colonists",
	"descriptionmyturn": "Everyone must place their colonists",
	"type": "multipleactiveplayer",
	"action": "stMultiplayerPlaceColonists",
	"args": "argMultiplayerNextPlayerInOrder",
	"possibleactions": [
		"selectBuilding",
		"selectPlantation",
		"selectColonist",
		"cancel",
		"accept",
		"wait"
	],
	"transitions": {
		"": 15
	}
}
					*/
					break;
				case "prospector":
					/*
					{
	"name": "prospector",
	"description": "${actplayer} gets one doubloon from his mine",
	"descriptionmyturn": "",
	"type": "game",
	"action": "stProspector",
	"transitions": {
		"done": 15,
		"occupiedGuesthouse": 141
	}
}
					*/
					break;
				case "checkEndOfRolePlayTurn":
					/*
					{
	"name": "checkEndOfRolePlayTurn",
	"description": "Checking for end of phase",
	"descriptionmyturn": "",
	"type": "game",
	"action": "stCheckEndOfRolePlayTurn",
	"transitions": {
		"endOfRolePlayTurn": 3,
		"endOfRolePlayTurnCaptain": 610,
		"stillSomeRolePlayToDo": 16
	}
}
					*/
					break;
				case "nextPlayerForRolePlay":
					/*
					{
	"name": "nextPlayerForRolePlay",
	"description": "Activating the next player to play this phase",
	"descriptionmyturn": "",
	"type": "game",
	"action": "stNextPlayerForRolePlay",
	"transitions": {
		"selectCaptain": 51,
		"selectTrader": 7,
		"selectSettler": 81,
		"selectBuilder": 11
	}
}
					*/
					break;
				case "checkEndOfRoleSelectionTurn":
					/*
					{
	"name": "checkEndOfRoleSelectionTurn",
	"description": "Checking for end of game",
	"descriptionmyturn": "",
	"type": "game",
	"action": "stCheckEndOfRoleSelectionTurn",
	"transitions": {
		"endOfGame": 18,
		"stillSomePlayToDo": 2
	}
}
					*/
					break;
				case "multiplayerGuesthouseBeforeEndOfGame":
					/*
					{
	"name": "multiplayerGuesthouseBeforeEndOfGame",
	"description": "Players with an occupied guesthouse can move colonists from the house",
	"descriptionmyturn": "Players with an occupied guesthouse can move colonists from the house",
	"type": "multipleactiveplayer",
	"action": "stMultiplayerGuesthouseBeforeEndOfGame",
	"updateGameProgression": false,
	"possibleactions": [
		"selectPlantation",
		"cancel",
		"zombiePass",
		"selectColonist",
		"selectBuilding"
	],
	"transitions": {
		"": 19
	}
}
					*/
					break;
				case "scoreEndOfGame":
					/*
					{
	"name": "scoreEndOfGame",
	"description": "Scoring end of game points",
	"descriptionmyturn": "",
	"type": "game",
	"action": "stScoreEndOfGame",
	"transitions": {
		"endOfGame": 99
	}
}
					*/
					break;
				case "playerCaptainRoyalSupplier":
					/*
					{
	"name": "playerCaptainRoyalSupplier",
	"description": "${actplayer} can trade 1 barrel for 1 VP, for each noble on his island (royal supplier)",
	"descriptionmyturn": "${you} can trade 1 barrel for 1 VP, for each noble on your island (royal supplier)",
	"type": "activeplayer",
	"action": "stPlayerCaptainRoyalSupplier",
	"possibleactions": [
		"selectGood",
		"accept",
		"cancel",
		"selectColonist",
		"selectBuilding",
		"selectPlantation"
	],
	"transitions": {
		"accept": 5,
		"pass": 5,
		"occupiedGuesthouse": 52,
		"zombiePass": 15
	}
}
					*/
					break;
				case "playerGuesthouseBeforeCaptainRoyalSupplier":
					/*
					{
	"name": "playerGuesthouseBeforeCaptainRoyalSupplier",
	"description": "${actplayer} can move colonists from his guesthouse",
	"descriptionmyturn": "${you} can move colonists from your guesthouse",
	"type": "activeplayer",
	"updateGameProgression": false,
	"possibleactions": [
		"selectPlantation",
		"cancel",
		"zombiePass",
		"selectColonist",
		"selectBuilding"
	],
	"transitions": {
		"guestMoved": 51,
		"pass": 51,
		"zombiePass": 15
	}
}
					*/
					break;
				case "playerGuesthouseBeforeCaptainShipSelection":
					/*
					{
	"name": "playerGuesthouseBeforeCaptainShipSelection",
	"description": "${actplayer} can move colonists from his guesthouse",
	"descriptionmyturn": "${you} can move colonists from your guesthouse",
	"type": "activeplayer",
	"updateGameProgression": false,
	"possibleactions": [
		"selectPlantation",
		"cancel",
		"zombiePass",
		"selectColonist",
		"selectBuilding"
	],
	"transitions": {
		"guestMoved": 5,
		"pass": 5,
		"zombiePass": 15
	}
}
					*/
					break;
				case "playerCaptainSmallWharf":
					/*
					{
	"name": "playerCaptainSmallWharf",
	"description": "${actplayer} must select goods to ship (small wharf)",
	"descriptionmyturn": "${you} must select goods to ship (small wharf)",
	"type": "activeplayer",
	"args": "argPlayerCaptainSmallWharf",
	"action": "stPlayerCaptainGoodSelection",
	"updateGameProgression": false,
	"possibleactions": [
		"selectGoodToShip",
		"accept",
		"cancel",
		"zombiePass",
		"selectColonist",
		"selectBuilding",
		"selectPlantation"
	],
	"transitions": {
		"accept": 15,
		"pass": 5,
		"zombiePass": 15
	}
}
					*/
					break;
				case "multiplayerStoreTypeOfGoods":
					/*
					{
	"name": "multiplayerStoreTypeOfGoods",
	"description": "Players owning at least one warehouse must choose which types of goods to store",
	"descriptionmyturn": "Players owning at least one warehouse must choose which types of goods to store",
	"type": "multipleactiveplayer",
	"args": "argMultiplayerNextPlayerInOrder",
	"possibleactions": [
		"selectGood",
		"cancel",
		"selectColonist",
		"selectBuilding",
		"selectPlantation",
		"wait"
	],
	"action": "stMultiplayerStoreTypeOfGoods",
	"transitions": {
		"noStorehouse": 620,
		"storehouse": 640
	}
}
					*/
					break;
				case "multiplayerStoreOneGood":
					/*
					{
	"name": "multiplayerStoreOneGood",
	"description": "Players owning unstored goods must select one good to keep",
	"descriptionmyturn": "Players owning unstored goods must select one good to keep",
	"type": "multipleactiveplayer",
	"args": "argMultiplayerNextPlayerInOrder",
	"action": "stMultiplayerStoreOneGood",
	"possibleactions": [
		"selectGood",
		"cancel",
		"selectColonist",
		"selectBuilding",
		"selectPlantation",
		"wait"
	],
	"transitions": {
		"": 63
	}
}
					*/
					break;
				case "endGoodsStorage":
					/*
					{
	"name": "endGoodsStorage",
	"description": "Goods storage phase ends",
	"descriptionmyturn": "",
	"type": "game",
	"action": "stEndGoodsStorage",
	"transitions": {
		"": 3
	}
}
					*/
					break;
				case "multiplayerStoreGoods":
					/*
					{
	"name": "multiplayerStoreGoods",
	"description": "Players owning unstored goods must select one good to keep (or more if they own an occupied storehouse)",
	"descriptionmyturn": "Players owning unstored goods must select one good to keep (or more if they own an occupied storehouse)",
	"type": "multipleactiveplayer",
	"args": "argMultiplayerNextPlayerInOrder",
	"action": "stMultiplayerStoreGoods",
	"possibleactions": [
		"selectGood",
		"cancel",
		"selectColonist",
		"selectBuilding",
		"selectPlantation",
		"wait"
	],
	"transitions": {
		"": 63
	}
}
					*/
					break;
				case "playerTraderLocationSelection":
					/*
					{
	"name": "playerTraderLocationSelection",
	"description": "${actplayer} must select where to trade",
	"descriptionmyturn": "${you} must select where to trade",
	"type": "activeplayer",
	"updateGameProgression": false,
	"possibleactions": [
		"selectTradingHouse",
		"selectTradingPost",
		"selectBuilding",
		"cancel",
		"zombiePass"
	],
	"transitions": {
		"selectTradingLocation": 7,
		"pass": 15,
		"zombiePass": 15
	}
}
					*/
					break;
				case "playerTraderBuyPlantation":
					/*
					{
	"name": "playerTraderBuyPlantation",
	"description": "${actplayer} can get a plantation from the deck for 1 doubloon (land office)",
	"descriptionmyturn": "${you} can get a plantation from the deck for 1 doubloon (land office)",
	"type": "activeplayer",
	"args": "argPlayerTraderBuyPlantation",
	"updateGameProgression": false,
	"possibleactions": [
		"accept",
		"selectForest",
		"cancel"
	],
	"transitions": {
		"accept": 7,
		"selectForest": 7,
		"pass": 7,
		"zombiePass": 15
	}
}
					*/
					break;
				case "playerTraderSellPlantation":
					/*
					{
	"name": "playerTraderSellPlantation",
	"description": "${actplayer} can sell a plantation for 1 doubloon (land office)",
	"descriptionmyturn": "${you} can sell a plantation for 1 doubloon (land office)",
	"type": "activeplayer",
	"updateGameProgression": false,
	"possibleactions": [
		"selectPlantation",
		"cancel"
	],
	"transitions": {
		"done": 7,
		"pass": 7,
		"zombiePass": 15
	}
}
					*/
					break;
				case "playerGuesthouseBeforeTrader":
					/*
					{
	"name": "playerGuesthouseBeforeTrader",
	"description": "${actplayer} can move colonists from his guesthouse",
	"descriptionmyturn": "${you} can move colonists from your guesthouse",
	"type": "activeplayer",
	"updateGameProgression": false,
	"possibleactions": [
		"selectPlantation",
		"cancel",
		"zombiePass",
		"selectColonist",
		"selectBuilding"
	],
	"transitions": {
		"guestMoved": 7,
		"pass": 7,
		"zombiePass": 15
	}
}
					*/
					break;
				case "playerSettlerHacienda":
					/*
					{
	"name": "playerSettlerHacienda",
	"description": "${actplayer} can get a plantation from the deck (hacienda)",
	"descriptionmyturn": "${you} can get a plantation from the deck (hacienda)",
	"type": "activeplayer",
	"action": "stPlayerSettlerHacienda",
	"updateGameProgression": false,
	"possibleactions": [
		"accept",
		"cancel",
		"zombiePass"
	],
	"transitions": {
		"accept": 8,
		"pass": 8,
		"zombiePass": 8
	}
}
					*/
					break;
				case "playerSettlerHospice":
					/*
					{
	"name": "playerSettlerHospice",
	"description": "${actplayer} can get a colonist from the supply or ship (hospice)",
	"descriptionmyturn": "${you} can get a colonist from the supply or ship (hospice)",
	"type": "activeplayer",
	"action": "stPlayerSettlerHospice",
	"updateGameProgression": false,
	"possibleactions": [
		"accept",
		"cancel",
		"zombiePass"
	],
	"transitions": {
		"accept": 84,
		"pass": 84,
		"zombiePass": 84
	}
}
					*/
					break;
				case "playerSettlerPlantationSelectionToDiscard":
					/*
					{
	"name": "playerSettlerPlantationSelectionToDiscard",
	"description": "${actplayer} must select a plantation to discard",
	"descriptionmyturn": "${you} must select a plantation to discard",
	"type": "activeplayer",
	"action": "stPlayerSettlerPlantationSelectionToDiscard",
	"updateGameProgression": false,
	"possibleactions": [
		"selectPlantation",
		"cancel",
		"zombiePass",
		"selectColonist",
		"selectBuilding"
	],
	"transitions": {
		"selectPlantation": 82,
		"zombiePass": 15
	}
}
					*/
					break;
				case "playerSettlerHuntingLodge":
					/*
					{
	"name": "playerSettlerHuntingLodge",
	"description": "${actplayer} can discard a plantation (hunting lodge)",
	"descriptionmyturn": "${you} can discard a plantation (hunting lodge)",
	"type": "activeplayer",
	"action": "stPlayerSettlerHuntingLodge",
	"updateGameProgression": false,
	"possibleactions": [
		"selectPlantation",
		"cancel",
		"zombiePass"
	],
	"transitions": {
		"done": 15,
		"pass": 15,
		"zombiePass": 15
	}
}
					*/
					break;
				case "multiplayerGuesthouseBeforeCraftsman":
					/*
					{
	"name": "multiplayerGuesthouseBeforeCraftsman",
	"description": "Players with an occupied guesthouse can move colonists from the house",
	"descriptionmyturn": "Players with an occupied guesthouse can move colonists from the house",
	"type": "multipleactiveplayer",
	"action": "stMultiplayerGuesthouseBeforeCraftsman",
	"updateGameProgression": false,
	"possibleactions": [
		"selectPlantation",
		"cancel",
		"zombiePass",
		"selectColonist",
		"selectBuilding"
	],
	"transitions": {
		"": 92
	}
}
					*/
					break;
				case "endMultiplayerGuesthouseBeforeCraftsman":
					/*
					{
	"name": "endMultiplayerGuesthouseBeforeCraftsman",
	"description": "",
	"descriptionmyturn": "",
	"type": "game",
	"action": "stEndMultiplayerGuesthouseBeforeCraftsman",
	"transitions": {
		"": 9
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
				case "playerBuilderUniversity":
					/*
					{
	"name": "playerBuilderUniversity",
	"description": "${actplayer} can get a colonist from the supply or ship (university)",
	"descriptionmyturn": "${you} can get a colonist from the supply or ship (university)",
	"type": "activeplayer",
	"action": "stPlayerBuilderUniversity",
	"updateGameProgression": false,
	"possibleactions": [
		"accept",
		"cancel",
		"zombiePass"
	],
	"transitions": {
		"accept": 15,
		"pass": 15,
		"zombiePass": 15
	}
}
					*/
					break;
				case "playerBuilderBlackMarket":
					/*
					{
	"name": "playerBuilderBlackMarket",
	"description": "${actplayer} can use the black market to up to 3 doubloons off the building cost (black market)",
	"descriptionmyturn": "${you} can use the black market to get ${titlearg1} doubloon(s) off the building cost (black market)",
	"type": "activeplayer",
	"action": "stPlayerBuilderBlackMarket",
	"args": "argPlayerBuilderBlackMarket",
	"updateGameProgression": false,
	"possibleactions": [
		"selectVictoryPoint",
		"selectColonist",
		"selectColonistSanJuan",
		"selectGood",
		"accept",
		"cancel",
		"zombiePass"
	],
	"transitions": {
		"accept": 111,
		"pass": 11,
		"zombiePass": 15
	}
}
					*/
					break;
				case "playerMayorPrivilege":
					/*
					{
	"name": "playerMayorPrivilege",
	"description": "${actplayer} can get a colonist from the supply as his privilege",
	"descriptionmyturn": "${you} can get a colonist from the supply as your privilege",
	"type": "activeplayer",
	"action": "stPlayerMayorPrivilege",
	"updateGameProgression": true,
	"possibleactions": [
		"accept",
		"cancel",
		"zombiePass"
	],
	"transitions": {
		"accept": 122,
		"acceptLibrary": 121,
		"pass": 122,
		"zombiePass": 122
	}
}
					*/
					break;
				case "nextPlayerMayorVilla":
					/*
					{
	"name": "nextPlayerMayorVilla",
	"description": "Activating the next player to play this phase",
	"descriptionmyturn": "",
	"type": "game",
	"action": "stNextPlayerMayorVilla",
	"transitions": {
		"villa": 123,
		"done": 12
	}
}
					*/
					break;
				case "playerMayorVilla":
					/*
					{
	"name": "playerMayorVilla",
	"description": "${actplayer} can get a noble from the supply (villa)",
	"descriptionmyturn": "${you} can get a noble from the supply (villa)",
	"type": "activeplayer",
	"updateGameProgression": true,
	"possibleactions": [
		"accept",
		"cancel",
		"zombiePass"
	],
	"transitions": {
		"accept": 122,
		"pass": 122,
		"zombiePass": 122
	}
}
					*/
					break;
				case "playerGuesthouseBeforeProspector":
					/*
					{
	"name": "playerGuesthouseBeforeProspector",
	"description": "${actplayer} can move colonists from his guesthouse",
	"descriptionmyturn": "${you} can move colonists from your guesthouse",
	"type": "activeplayer",
	"updateGameProgression": false,
	"possibleactions": [
		"selectPlantation",
		"cancel",
		"zombiePass",
		"selectColonist",
		"selectBuilding"
	],
	"transitions": {
		"guestMoved": 14,
		"pass": 14,
		"zombiePass": 15
	}
}
					*/
					break;
				case "nextPlayerForDraft":
					/*
					{
	"name": "nextPlayerForDraft",
	"description": "",
	"descriptionmyturn": "",
	"type": "game",
	"action": "stNextPlayerForDraft",
	"transitions": {
		"draftOngoing": 202,
		"draftCompleted": 3
	}
}
					*/
					break;
				case "playerDraftBuilding":
					/*
					{
	"name": "playerDraftBuilding",
	"description": "${actplayer} must draft a building",
	"descriptionmyturn": "${you} must draft a building",
	"type": "activeplayer",
	"possibleactions": [
		"selectBuilding",
		"zombiePass"
	],
	"transitions": {
		"selectBuilding": 201,
		"zombiePass": 201
	}
}
					*/
					break;
				case "activeMultiplayerStoreTypeOfGoods":
					/*
					{
	"name": "activeMultiplayerStoreTypeOfGoods",
	"description": "",
	"descriptionmyturn": "",
	"type": "game",
	"action": "stActiveMultiplayerStoreTypeOfGoods",
	"transitions": {
		"": 61
	}
}
					*/
					break;
				case "activeMultiplayerStoreOneGood":
					/*
					{
	"name": "activeMultiplayerStoreOneGood",
	"description": "",
	"descriptionmyturn": "",
	"type": "game",
	"action": "stActiveMultiplayerStoreOneGood",
	"transitions": {
		"": 62
	}
}
					*/
					break;
				case "activeMultiplayerStoreGoods":
					/*
					{
	"name": "activeMultiplayerStoreGoods",
	"description": "",
	"descriptionmyturn": "",
	"type": "game",
	"action": "stActiveMultiplayerStoreGoods",
	"transitions": {
		"": 64
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
export default puertorico;
