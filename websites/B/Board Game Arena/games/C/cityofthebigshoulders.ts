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

const cityofthebigshoulders: GamePresence = {
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
				case "playerStartFirstCompany":
					/*
					{
	"name": "playerStartFirstCompany",
	"description": "${actplayer} must choose a company to start",
	"descriptionmyturn": "${you} must choose a company to start",
	"type": "activeplayer",
	"possibleactions": [
		"startCompany"
	],
	"transitions": {
		"gameTurn": 3,
		"zombiePass": 3
	}
}
					*/
					break;
				case "gameStartFirstCompany":
					/*
					{
	"name": "gameStartFirstCompany",
	"description": "",
	"type": "game",
	"action": "gameStartFirstCompany",
	"transitions": {
		"nextPlayer": 2,
		"playerSellPhase": 4
	}
}
					*/
					break;
				case "playerSellPhase":
					/*
					{
	"name": "playerSellPhase",
	"description": "${actplayer} may sell any number of certificates to the bank",
	"descriptionmyturn": "${you} may sell any number of certificates to the bank",
	"type": "activeplayer",
	"updateGameProgression": true,
	"possibleactions": [
		"sellShares",
		"skipSell",
		"passStockAction"
	],
	"transitions": {
		"gameStockPhase": 5,
		"playerBuyPhase": 8,
		"playerSkipSellBuyPhase": 9,
		"zombiePass": 5
	}
}
					*/
					break;
				case "gameStockPhase":
					/*
					{
	"name": "gameStockPhase",
	"description": "",
	"type": "game",
	"action": "stGameStockPhase",
	"transitions": {
		"playerStockPhase": 4,
		"playerBuildingPhase": 7
	}
}
					*/
					break;
				case "playerBuildingPhase":
					/*
					{
	"name": "playerBuildingPhase",
	"description": "Waiting on other players to choose a building to play",
	"descriptionmyturn": "${you} must choose a building to play",
	"type": "multipleactiveplayer",
	"args": "argsPlayerBuildingPhase",
	"updateGameProgression": true,
	"possibleactions": [
		"selectBuildings"
	],
	"action": "st_MultiPlayerInit",
	"transitions": {
		"gameActionPhaseSetup": 10
	}
}
					*/
					break;
				case "playerBuyPhase":
					/*
					{
	"name": "playerBuyPhase",
	"description": "${actplayer} may buy an available certificate or start a company",
	"descriptionmyturn": "${you} may buy an available certificate or start a company",
	"type": "activeplayer",
	"args": "argPlayerBuyPhase",
	"possibleactions": [
		"buyCertificate",
		"startCompany",
		"skipBuy",
		"undo"
	],
	"transitions": {
		"gameStockPhase": 5,
		"gameTurn": 5,
		"playerconfirmDirectorship": 37,
		"zombiePass": 5
	}
}
					*/
					break;
				case "playerSkipSellBuyPhase":
					/*
					{
	"name": "playerSkipSellBuyPhase",
	"description": "${actplayer} may buy an available certificate or start a company",
	"descriptionmyturn": "${you} may buy an available certificate or start a company",
	"type": "activeplayer",
	"args": "argPlayerBuyPhase",
	"possibleactions": [
		"buyCertificate",
		"startCompany",
		"passStockAction",
		"undo"
	],
	"transitions": {
		"gameStockPhase": 5,
		"gameTurn": 5,
		"playerconfirmDirectorship": 37,
		"zombiePass": 5
	}
}
					*/
					break;
				case "gameActionPhaseSetup":
					/*
					{
	"name": "gameActionPhaseSetup",
	"description": "",
	"type": "game",
	"action": "stGameActionPhaseSetup",
	"transitions": {
		"playerActionPhase": 11
	}
}
					*/
					break;
				case "playerActionPhase":
					/*
					{
	"name": "playerActionPhase",
	"description": "${actplayer} must choose an action",
	"descriptionmyturn": "${you} must choose an action",
	"type": "activeplayer",
	"updateGameProgression": true,
	"args": "argsPlayerActionPhase",
	"possibleactions": [
		"buildingAction",
		"tradeResources",
		"useAsset",
		"undo"
	],
	"transitions": {
		"freeActions": 23,
		"workerBonus": 21,
		"automationBonus": 22,
		"appealBonus": 24,
		"freeAppealBonus": 25,
		"loopback": 11,
		"zombiePass": 12
	}
}
					*/
					break;
				case "gameActionPhase":
					/*
					{
	"name": "gameActionPhase",
	"description": "",
	"type": "game",
	"action": "stGameActionPhase",
	"transitions": {
		"playerActionPhase": 11,
		"playerBuyResourcesPhase": 13,
		"playerEmergencyFundraise": 34
	}
}
					*/
					break;
				case "playerBuyResourcesPhase":
					/*
					{
	"name": "playerBuyResourcesPhase",
	"description": "${company_name} (${actplayer}) may purchase resources from the supply chain",
	"descriptionmyturn": "${company_name} (${you}) may purchase resources from the supply chain",
	"type": "activeplayer",
	"updateGameProgression": true,
	"args": "argsOperationPhase",
	"possibleactions": [
		"buyResources",
		"tradeResources",
		"useAsset",
		"skipBuyResources",
		"undo"
	],
	"transitions": {
		"playerProduceGoodsPhase": 14,
		"freeAppealBonus": 26,
		"loopback": 13,
		"zombiePass": 19,
		"playerDistributeGoodsPhase": 16
	}
}
					*/
					break;
				case "playerProduceGoodsPhase":
					/*
					{
	"name": "playerProduceGoodsPhase",
	"description": "${company_name} (${actplayer}) may produce goods in its factories",
	"descriptionmyturn": "${company_name} (${you}) may produce goods in its factories",
	"type": "activeplayer",
	"args": "argsOperationPhase",
	"possibleactions": [
		"produceGoods",
		"tradeResources",
		"useAsset",
		"skipProduceGoods",
		"undo"
	],
	"transitions": {
		"distributeGoods": 16,
		"nextFactory": 14,
		"managerBonusResources": 15,
		"managerBonusAppeal": 30,
		"freeAppealBonus": 27,
		"loopback": 14,
		"zombiePass": 19
	}
}
					*/
					break;
				case "managerBonusResources":
					/*
					{
	"name": "managerBonusResources",
	"description": "${company_name} (${actplayer}) may choose ${resources_gained} resources to gain from Haymarket Square",
	"descriptionmyturn": "${company_name} (${you}) may choose ${resources_gained} resources to gain from Haymarket Square",
	"type": "activeplayer",
	"args": "argsManagerBonusResources",
	"possibleactions": [
		"managerBonusGainResources"
	],
	"transitions": {
		"distributeGoods": 16,
		"nextFactory": 14,
		"managerBonusAppeal": 30,
		"zombiePass": 19
	}
}
					*/
					break;
				case "playerDistributeGoodsPhase":
					/*
					{
	"name": "playerDistributeGoodsPhase",
	"description": "${company_name} (${actplayer}) may distribute goods",
	"descriptionmyturn": "${company_name} (${you}) may distribute goods",
	"type": "activeplayer",
	"args": "argsOperationPhase",
	"possibleactions": [
		"distributeGoods",
		"skipDistributeGoods",
		"useAsset",
		"tradeResources",
		"undo"
	],
	"transitions": {
		"dividends": 17,
		"gameOperationPhase": 19,
		"freeAppealBonus": 28,
		"loopback": 16,
		"useAssets": 35,
		"zombiePass": 19
	}
}
					*/
					break;
				case "playerDividendsPhase":
					/*
					{
	"name": "playerDividendsPhase",
	"description": "${company_name} (${actplayer}) may pay dividends to shareholders with its earnings (${income})",
	"descriptionmyturn": "${company_name} (${you}) may pay dividends to shareholders with its earnings (${income})",
	"type": "activeplayer",
	"args": "argsOperationPhase",
	"possibleactions": [
		"payDividends",
		"withhold",
		"useAsset",
		"tradeResources",
		"undo"
	],
	"transitions": {
		"gameOperationPhase": 19,
		"freeAppealBonus": 29,
		"loopback": 17,
		"useAssets": 35,
		"zombiePass": 19
	}
}
					*/
					break;
				case "gameOperationPhase":
					/*
					{
	"name": "gameOperationPhase",
	"description": "",
	"type": "game",
	"action": "stGameOperationPhase",
	"transitions": {
		"nextCompany": 13,
		"nextEmergency": 34,
		"cleanup": 20,
		"gameEnd": 99
	}
}
					*/
					break;
				case "gameCleanupPhase":
					/*
					{
	"name": "gameCleanupPhase",
	"description": "",
	"type": "game",
	"action": "stGameCleanup",
	"transitions": {
		"nextRound": 4
	}
}
					*/
					break;
				case "playerAssetWorkerBonus":
					/*
					{
	"name": "playerAssetWorkerBonus",
	"description": "${company_name} (${actplayer}) may choose a factory in which to hire a worker for free",
	"descriptionmyturn": "${company_name} (${you}) may choose a factory in which to hire a worker for free",
	"type": "activeplayer",
	"args": "argsPlayerAssetBonus",
	"possibleactions": [
		"hireWorker",
		"skipAssetBonus",
		"undo"
	],
	"transitions": {
		"freeActions": 23,
		"zombiePass": 12
	}
}
					*/
					break;
				case "playerAssetAutomationBonus":
					/*
					{
	"name": "playerAssetAutomationBonus",
	"description": "${company_name} (${actplayer}) may automate a factory",
	"descriptionmyturn": "${company_name} (${you}) may automate a factory",
	"type": "activeplayer",
	"args": "argsPlayerAssetBonus",
	"possibleactions": [
		"automateFactory",
		"skipAssetBonus",
		"undo"
	],
	"transitions": {
		"freeActions": 23,
		"appealBonus": 24,
		"zombiePass": 12
	}
}
					*/
					break;
				case "playerFreeActionPhase":
					/*
					{
	"name": "playerFreeActionPhase",
	"description": "${actplayer} may trade with Haymarket Square or use Capital Assets",
	"descriptionmyturn": "${you} may trade with Haymarket Square or use Capital Assets",
	"type": "activeplayer",
	"possibleactions": [
		"tradeResources",
		"useAsset",
		"passFreeActions",
		"undo"
	],
	"transitions": {
		"pass": 12,
		"freeAppealBonus": 31,
		"loopback": 23,
		"zombiePass": 12
	}
}
					*/
					break;
				case "playerAssetAppealBonus":
					/*
					{
	"name": "playerAssetAppealBonus",
	"description": "${company_name} (${actplayer}) may gain or forfeit appeal bonus",
	"descriptionmyturn": "${company_name} (${you}) may gain or forfeit appeal bonus",
	"type": "activeplayer",
	"args": "argsPlayerAssetBonus",
	"possibleactions": [
		"gainAppealBonus",
		"forfeitAppealBonus",
		"undo"
	],
	"transitions": {
		"loopback": 24,
		"next": 23,
		"zombiePass": 12
	}
}
					*/
					break;
				case "playerActionAppealBonus":
					/*
					{
	"name": "playerActionAppealBonus",
	"description": "${company_name} (${actplayer}) may gain or forfeit appeal bonus",
	"descriptionmyturn": "${company_name} (${you}) may gain or forfeit appeal bonus",
	"type": "activeplayer",
	"args": "argsPlayerAssetBonus",
	"possibleactions": [
		"gainAppealBonus",
		"forfeitAppealBonus",
		"undo"
	],
	"transitions": {
		"loopback": 25,
		"next": 11,
		"zombiePass": 12
	}
}
					*/
					break;
				case "playerBuyResourceAppealBonus":
					/*
					{
	"name": "playerBuyResourceAppealBonus",
	"description": "${company_name} (${actplayer}) may gain or forfeit appeal bonus",
	"descriptionmyturn": "${company_name} (${you}) may gain or forfeit appeal bonus",
	"type": "activeplayer",
	"args": "argsPlayerAssetBonus",
	"possibleactions": [
		"gainAppealBonus",
		"forfeitAppealBonus"
	],
	"transitions": {
		"loopback": 26,
		"next": 13,
		"zombiePass": 19
	}
}
					*/
					break;
				case "playerProduceGoodsAppealBonus":
					/*
					{
	"name": "playerProduceGoodsAppealBonus",
	"description": "${company_name} (${actplayer}) may gain or forfeit appeal bonus",
	"descriptionmyturn": "${company_name} (${you}) may gain or forfeit appeal bonus",
	"type": "activeplayer",
	"args": "argsPlayerAssetBonus",
	"possibleactions": [
		"gainAppealBonus",
		"forfeitAppealBonus"
	],
	"transitions": {
		"loopback": 27,
		"next": 14,
		"zombiePass": 19
	}
}
					*/
					break;
				case "playerDistributeAppealBonus":
					/*
					{
	"name": "playerDistributeAppealBonus",
	"description": "${company_name} (${actplayer}) may gain or forfeit appeal bonus",
	"descriptionmyturn": "${company_name} (${you}) may gain or forfeit appeal bonus",
	"type": "activeplayer",
	"args": "argsPlayerAssetBonus",
	"possibleactions": [
		"gainAppealBonus",
		"forfeitAppealBonus"
	],
	"transitions": {
		"loopback": 28,
		"next": 16,
		"zombiePass": 19
	}
}
					*/
					break;
				case "playerDividendsAppealBonus":
					/*
					{
	"name": "playerDividendsAppealBonus",
	"description": "${company_name} (${actplayer}) may gain or forfeit appeal bonus",
	"descriptionmyturn": "${company_name} (${you}) may gain or forfeit appeal bonus",
	"type": "activeplayer",
	"args": "argsPlayerAssetBonus",
	"possibleactions": [
		"gainAppealBonus",
		"forfeitAppealBonus"
	],
	"transitions": {
		"loopback": 29,
		"next": 17,
		"zombiePass": 19
	}
}
					*/
					break;
				case "managerBonusAppeal":
					/*
					{
	"name": "managerBonusAppeal",
	"description": "${company_name} (${actplayer}) may gain or forfeit appeal bonus",
	"descriptionmyturn": "${company_name} (${you}) may gain or forfeit appeal bonus",
	"type": "activeplayer",
	"args": "argsPlayerAssetBonus",
	"possibleactions": [
		"gainAppealBonus",
		"forfeitAppealBonus"
	],
	"transitions": {
		"loopback": 30,
		"nextFactory": 14,
		"distributeGoods": 16,
		"zombiePass": 19
	}
}
					*/
					break;
				case "playerFreeActionAppealBonus":
					/*
					{
	"name": "playerFreeActionAppealBonus",
	"description": "${company_name} (${actplayer}) may gain or forfeit appeal bonus",
	"descriptionmyturn": "${company_name} (${you}) may gain or forfeit appeal bonus",
	"type": "activeplayer",
	"args": "argsPlayerAssetBonus",
	"possibleactions": [
		"gainAppealBonus",
		"forfeitAppealBonus"
	],
	"transitions": {
		"loopback": 31,
		"next": 23,
		"zombiePass": 12
	}
}
					*/
					break;
				case "playerEmergencyFundraise":
					/*
					{
	"name": "playerEmergencyFundraise",
	"description": "${company_name} (${actplayer}) may perform Emergency Fundraising by selling shares to the bank",
	"descriptionmyturn": "${company_name} (${you}) may perform Emergency Fundraising by selling shares to the bank",
	"type": "activeplayer",
	"args": "argsOperationPhase",
	"possibleactions": [
		"emergencyFundraise",
		"passEmergencyFundraise"
	],
	"transitions": {
		"playerBuyResourcesPhase": 13,
		"zombiePass": 19
	}
}
					*/
					break;
				case "playerUseAssetsPhase":
					/*
					{
	"name": "playerUseAssetsPhase",
	"description": "${company_name} (${actplayer}) may use unexhausted assets",
	"descriptionmyturn": "${company_name} (${you}) may use unexhausted assets",
	"type": "activeplayer",
	"args": "argsOperationPhase",
	"possibleactions": [
		"useAsset",
		"finish",
		"undo"
	],
	"transitions": {
		"gameOperationPhase": 19,
		"freeAppealBonus": 36,
		"loopback": 35,
		"zombiePass": 19
	}
}
					*/
					break;
				case "playerUseAssetsAppealBonus":
					/*
					{
	"name": "playerUseAssetsAppealBonus",
	"description": "${company_name} (${actplayer}) may gain or forfeit appeal bonus",
	"descriptionmyturn": "${company_name} (${you}) may gain or forfeit appeal bonus",
	"type": "activeplayer",
	"args": "argsPlayerAssetBonus",
	"possibleactions": [
		"gainAppealBonus",
		"forfeitAppealBonus"
	],
	"transitions": {
		"loopback": 36,
		"next": 35,
		"zombiePass": 19
	}
}
					*/
					break;
				case "playerconfirmDirectorship":
					/*
					{
	"name": "playerconfirmDirectorship",
	"description": "${actplayer} must confirm directorship change",
	"descriptionmyturn": "${you} must confirm directorship change",
	"type": "activeplayer",
	"possibleactions": [
		"confirmDirectorship",
		"undo"
	],
	"transitions": {
		"gameStockPhase": 5,
		"zombiePass": 5
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
export default cityofthebigshoulders;
