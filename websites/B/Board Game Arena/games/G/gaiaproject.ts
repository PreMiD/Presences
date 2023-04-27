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

const gaiaproject: GamePresence = {
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
				case "stateSetup":
					/*
					{
	"name": "stateSetup",
	"description": "Performing setup",
	"type": "game",
	"action": "stSetup",
	"transitions": {
		"rotate": 11,
		"chooseRace": 12,
		"placeMine": 13,
		"placePI": 14,
		"chooseBooster": 15,
		"setupAutoma": 16,
		"banFactions": 75,
		"selectDrafts": 76,
		"doDraft": 77,
		"done": 50
	}
}
					*/
					break;
				case "stateSetupRotate":
					/*
					{
	"name": "stateSetupRotate",
	"description": "${actplayer} is rotating map tiles",
	"descriptionmyturn": "${you} must rotate map tiles",
	"type": "activeplayer",
	"possibleactions": [
		"actionRotateTile",
		"actionSetOptions"
	],
	"transitions": {
		"done": 10,
		"zombiePass": 99
	}
}
					*/
					break;
				case "stateSetupChooseRace":
					/*
					{
	"name": "stateSetupChooseRace",
	"description": "${actplayer} is choosing a faction",
	"descriptionmyturn": "${you} must choose a faction",
	"type": "activeplayer",
	"possibleactions": [
		"actionChooseRace",
		"actionSetOptions"
	],
	"transitions": {
		"done": 10,
		"zombiePass": 99
	}
}
					*/
					break;
				case "stateSetupPlaceMine":
					/*
					{
	"name": "stateSetupPlaceMine",
	"description": "${actplayer} must place a mine",
	"descriptionmyturn": "${you} must place a mine",
	"type": "activeplayer",
	"possibleactions": [
		"actionPlaceStartingMine",
		"actionSetOptions"
	],
	"transitions": {
		"done": 10,
		"zombiePass": 99
	}
}
					*/
					break;
				case "stateSetupPlacePI":
					/*
					{
	"name": "stateSetupPlacePI",
	"description": "${actplayer} must place a planetary institute",
	"descriptionmyturn": "${you} must place your planetary institute",
	"type": "activeplayer",
	"possibleactions": [
		"actionRace8PlacePI",
		"actionSetOptions"
	],
	"transitions": {
		"done": 10,
		"zombiePass": 99
	}
}
					*/
					break;
				case "stateSetupChooseBooster":
					/*
					{
	"name": "stateSetupChooseBooster",
	"description": "${actplayer} is choosing a booster tile",
	"descriptionmyturn": "${you} must choose a booster tile",
	"type": "activeplayer",
	"possibleactions": [
		"actionChooseBoosterTile",
		"actionSetOptions"
	],
	"transitions": {
		"done": 10,
		"zombiePass": 99
	}
}
					*/
					break;
				case "stateSetupChooseAutoma":
					/*
					{
	"name": "stateSetupChooseAutoma",
	"description": "${actplayer} is making automa selections",
	"descriptionmyturn": "${you} must make automa selections",
	"type": "activeplayer",
	"possibleactions": [
		"actionChooseAutoma"
	],
	"transitions": {
		"done": 10
	}
}
					*/
					break;
				case "stateTurnEngine":
					/*
					{
	"name": "stateTurnEngine",
	"description": "Starting next turn",
	"type": "game",
	"action": "stTurnHandler",
	"transitions": {
		"startTurn": 21,
		"automa": 70,
		"endRound": 40
	}
}
					*/
					break;
				case "statePlayerTurn":
					/*
					{
	"name": "statePlayerTurn",
	"description": "${actplayer} is taking a turn",
	"descriptionmyturn": "${you} must take your turn",
	"type": "activeplayer",
	"possibleactions": [
		"actionBuild",
		"actionUpgrade",
		"actionFormFederation",
		"actionStartGaia",
		"actionResearch",
		"actionGainResource",
		"actionGainTech",
		"actionPass",
		"actionSetOptions",
		"actionRace6Swap",
		"actionRace8SpaceStation",
		"actionConvert",
		"actionDiscard",
		"actionRace10ConvertGaia",
		"actionRace13ConvertPwr"
	],
	"transitions": {
		"done": 22,
		"placeLost": 29,
		"charge": 30
	}
}
					*/
					break;
				case "statePreConvert":
					/*
					{
	"name": "statePreConvert",
	"description": "Preparing for end of turn",
	"type": "game",
	"action": "stPreConvert",
	"transitions": {
		"endTurn": 20,
		"canConvert": 23
	}
}
					*/
					break;
				case "stateConvert":
					/*
					{
	"name": "stateConvert",
	"description": "${actplayer} is deciding whether to perform conversions",
	"descriptionmyturn": "${you} may perform conversions",
	"type": "activeplayer",
	"possibleactions": [
		"actionConvert",
		"actionDiscard",
		"actionEndTurn",
		"actionRace10ConvertGaia",
		"actionRace13ConvertPwr",
		"actionSetOptions"
	],
	"transitions": {
		"done": 20,
		"zombiePass": 20
	}
}
					*/
					break;
				case "stateGainTech":
					/*
					{
	"name": "stateGainTech",
	"description": "${actplayer} is gaining a technology",
	"descriptionmyturn": "${you} must select a technology to gain",
	"type": "activeplayer",
	"possibleactions": [
		"actionGainFreeTech",
		"actionSetOptions"
	],
	"transitions": {
		"done": 22,
		"gaiaPhaseRace14": 62,
		"placeLost": 29
	}
}
					*/
					break;
				case "stateResearchAdv":
					/*
					{
	"name": "stateResearchAdv",
	"description": "${actplayer} is researching",
	"descriptionmyturn": "${you} must select a research track",
	"type": "activeplayer",
	"possibleactions": [
		"actionResearch",
		"actionSetOptions"
	],
	"transitions": {
		"done": 22,
		"gaiaPhaseRace14": 62,
		"placeLost": 29
	}
}
					*/
					break;
				case "statePlaceLost":
					/*
					{
	"name": "statePlaceLost",
	"description": "${actplayer} is placing the lost planet",
	"descriptionmyturn": "${you} must place the lost planet",
	"type": "activeplayer",
	"possibleactions": [
		"actionPlaceLostMine",
		"actionSetOptions"
	],
	"transitions": {
		"charge": 30,
		"done": 22,
		"gaiaPhaseRace14": 62
	}
}
					*/
					break;
				case "stateCharge":
					/*
					{
	"name": "stateCharge",
	"description": "Charging power",
	"type": "game",
	"action": "stChargeHandler",
	"updateGameProgression": true,
	"transitions": {
		"charge": 31,
		"done": 22,
		"researchAdv": 28,
		"gainTech": 27,
		"gaiaPhaseRace14": 62,
		"automaDone": 20
	}
}
					*/
					break;
				case "stateChargePwr":
					/*
					{
	"name": "stateChargePwr",
	"description": "${actplayer} is deciding whether to charge power",
	"descriptionmyturn": "${you} must choose whether to charge power",
	"type": "activeplayer",
	"args": "stGetChargeAmt",
	"possibleactions": [
		"actionChargePower",
		"actionSetOptions"
	],
	"transitions": {
		"done": 30,
		"zombiePass": 30
	}
}
					*/
					break;
				case "endRound":
					/*
					{
	"name": "endRound",
	"description": "Ending round",
	"type": "game",
	"action": "stEndRound",
	"transitions": {
		"done": 50,
		"endGame": 80
	}
}
					*/
					break;
				case "stateIncome":
					/*
					{
	"name": "stateIncome",
	"description": "Collecting income",
	"type": "game",
	"action": "stIncome",
	"updateGameProgression": true,
	"transitions": {
		"done": 60,
		"chooseIncome": 51
	}
}
					*/
					break;
				case "stateIncomeChoice":
					/*
					{
	"name": "stateIncomeChoice",
	"description": "${actplayer} is collecting income",
	"descriptionmyturn": "${you} must choose your income order",
	"type": "activeplayer",
	"args": "stGetIncomeAmt",
	"possibleactions": [
		"actionIncome",
		"actionSetOptions"
	],
	"transitions": {
		"done": 50,
		"zombiePass": 50
	}
}
					*/
					break;
				case "stateGaia":
					/*
					{
	"name": "stateGaia",
	"description": "Gaia phase",
	"type": "game",
	"action": "stGaia",
	"transitions": {
		"done": 20,
		"gaiaRace1": 61,
		"gaiaRace14": 62
	}
}
					*/
					break;
				case "stateGaiaRace1":
					/*
					{
	"name": "stateGaiaRace1",
	"description": "${actplayer} is converting Gaia power",
	"descriptionmyturn": "${you} may convert Gaia power",
	"type": "activeplayer",
	"possibleactions": [
		"actionRace1ConvertGaia"
	],
	"transitions": {
		"done": 60,
		"zombiePass": 60
	}
}
					*/
					break;
				case "stateGaiaRace14":
					/*
					{
	"name": "stateGaiaRace14",
	"description": "${actplayer} must make a Gaia phase decision",
	"descriptionmyturn": "${you} may discard 4 Gaia power in order to research",
	"type": "activeplayer",
	"possibleactions": [
		"actionRace14DiscardGaia"
	],
	"transitions": {
		"done": 60,
		"gainTech": 27,
		"zombiePass": 60
	}
}
					*/
					break;
				case "stateAutoma":
					/*
					{
	"name": "stateAutoma",
	"description": "Automa's turn",
	"type": "game",
	"action": "stAutoma",
	"transitions": {
		"charge": 30,
		"done": 20
	}
}
					*/
					break;
				case "stateSetupBanRace":
					/*
					{
	"name": "stateSetupBanRace",
	"description": "Other players are choosing which factions to ban",
	"descriptionmyturn": "${you} must select a faction to ban",
	"type": "activeplayer",
	"possibleactions": [
		"actionBanRace"
	],
	"transitions": {
		"done": 10
	}
}
					*/
					break;
				case "stateSetupAddDraft":
					/*
					{
	"name": "stateSetupAddDraft",
	"description": "${actplayer} is choosing a faction to add to the draft pool",
	"descriptionmyturn": "${you} must select a faction to add to the draft pool",
	"type": "activeplayer",
	"possibleactions": [
		"actionAddDraftRace"
	],
	"transitions": {
		"done": 10
	}
}
					*/
					break;
				case "stateSetupDraft":
					/*
					{
	"name": "stateSetupDraft",
	"description": "Other players are bidding on factions",
	"descriptionmyturn": "${you} must choose the maximum VP to bid on each faction",
	"type": "multipleactiveplayer",
	"possibleactions": [
		"actionBidRaces"
	],
	"transitions": {
		"done": 78
	}
}
					*/
					break;
				case "stateDraftResolution":
					/*
					{
	"name": "stateDraftResolution",
	"description": "Performing setup",
	"action": "stDraftResolution",
	"type": "game",
	"transitions": {
		"done": 10
	}
}
					*/
					break;
				case "stateScoring":
					/*
					{
	"name": "stateScoring",
	"description": "Scoring",
	"type": "game",
	"action": "stScoring",
	"transitions": {
		"done": 99
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
export default gaiaproject;
