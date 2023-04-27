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

const feastforodin: GamePresence = {
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
				case "newViking":
					/*
					{
	"name": "newViking",
	"type": "game",
	"action": "stNewViking",
	"updateGameProgression": true,
	"transitions": {
		"": 20
	}
}
					*/
					break;
				case "harvestGoods":
					/*
					{
	"name": "harvestGoods",
	"type": "game",
	"action": "stHarvestGoods",
	"transitions": {
		"": 51
	}
}
					*/
					break;
				case "turnExplorationBoards":
					/*
					{
	"name": "turnExplorationBoards",
	"type": "game",
	"action": "stTurnExplorationBoards",
	"transitions": {
		"": 40
	}
}
					*/
					break;
				case "drawWeapon":
					/*
					{
	"name": "drawWeapon",
	"type": "game",
	"action": "stDrawWeapon",
	"transitions": {
		"": 51
	}
}
					*/
					break;
				case "setFirstPlayer":
					/*
					{
	"name": "setFirstPlayer",
	"type": "game",
	"action": "stSetFirstPlayer",
	"transitions": {
		"": 50
	}
}
					*/
					break;
				case "pickAction":
					/*
					{
	"name": "pickAction",
	"description": "${actplayer} must take an action",
	"descriptionmyturn": "${you} must take an action",
	"type": "activeplayer",
	"action": "stPickAction",
	"possibleactions": [
		"pass",
		"action"
	],
	"transitions": {
		"action": 51,
		"pass": 60,
		"zombiepass": 60
	}
}
					*/
					break;
				case "doCommand":
					/*
					{
	"name": "doCommand",
	"type": "game",
	"action": "stDoCommand",
	"transitions": {
		"finished": 59,
		"finished_harvest": 30,
		"finished_postactions": 70,
		"finished_bonus": 120,
		"finished_drawweapon": 49,
		"finished_breeding": 100,
		"finished_feast": 110,
		"finished_feastGameEnd": 150,
		"next": 51,
		"command-playOccupation": 1001,
		"command-pickmodal": 1002,
		"command-exchange": 1003,
		"command-forge": 1004,
		"command-forgebuy": 1005,
		"command-mountain": 1006,
		"command-trade": 1007,
		"command-upgrade": 1008,
		"command-emigrate": 1012,
		"command-swapwhalingboatknarr": 1013,
		"command-clone": 1014,
		"command-personalfeast": 1015,
		"command-storeman": 1016,
		"command-meatupgrade": 1018,
		"command-inspector": 1019,
		"command-hornturner": 1021,
		"command-wharfowner": 1023,
		"command-fineblacksmith": 1024,
		"command-shipbuilder": 1025,
		"command-dragonslayer": 1026,
		"command-privatechef": 1027,
		"command-fieldfarmer": 1028,
		"command-earl": 1029,
		"command-cowherd": 1030,
		"command-bonecollector": 1031,
		"command-breeder": 1032,
		"command-shepherdboy": 1033,
		"command-metalsmith": 1034,
		"command-hidebuyer": 1035,
		"command-preacher": 1036,
		"command-hornblower": 1037,
		"command-flip": 1038,
		"command-sameupgrade": 1039,
		"command-quartermaster": 1040,
		"command-longshipbuilder": 1041,
		"command-harborguard": 1042,
		"command-spicemerchant": 1043,
		"command-meatmerchant": 1044,
		"command-sower": 1045,
		"command-flaxbaker": 1046,
		"command-disheartenedwarrior": 1047,
		"command-ironsmith": 1048,
		"command-emigratepassable": 1049,
		"command-silkstitcher": 1050,
		"command-laborer": 1051,
		"command-payupgrade": 1052,
		"command-meatcurer": 1053,
		"command-snarespecialist": 1054,
		"command-deerstalker": 1055,
		"command-lancebearer": 1056,
		"command-armedfighter": 1057,
		"command-spicetrader": 1058,
		"command-sponsor": 1059,
		"command-beforeorafter-draw": 1060,
		"command-beforeorafter-play": 1061,
		"command-hornblower2": 1062,
		"command-hunt": 1063,
		"command-peacemaker": 1064,
		"command-slowpoke": 1065,
		"command-bosporustraveller": 1067,
		"command-swordfighter": 1068,
		"command-follower": 1069,
		"command-clerk": 1070,
		"command-nwupgrade": 1071,
		"command-latecomer": 1072,
		"command-preceptor": 1073,
		"command-berserker": 1074,
		"command-oreboatman": 1075,
		"command-fishcook": 1076,
		"command-soberman": 1077,
		"command-explore": 1078
	}
}
					*/
					break;
				case "confirmTurn":
					/*
					{
	"name": "confirmTurn",
	"description": "${actplayer} must confirm their turn",
	"descriptionmyturn": "${you} must confirm your turn",
	"type": "activeplayer",
	"action": "stConfirmTurn",
	"args": "argConfirmTurn",
	"possibleactions": [
		"affirm",
		"undo"
	],
	"transitions": {
		"affirm": 60,
		"undo": 50,
		"zombiepass": 60
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
	"transitions": {
		"nextPlayer": 50,
		"nextPhase": 51
	}
}
					*/
					break;
				case "determineStartPlayer":
					/*
					{
	"name": "determineStartPlayer",
	"type": "game",
	"action": "stDetermineStartPlayer",
	"transitions": {
		"": 80
	}
}
					*/
					break;
				case "income-prepare":
					/*
					{
	"name": "income-prepare",
	"type": "game",
	"action": "stSetAllMultiactive",
	"transitions": {
		"": 81
	}
}
					*/
					break;
				case "income-placegoods":
					/*
					{
	"name": "income-placegoods",
	"description": "Other players may place goods on their boards",
	"descriptionmyturn": "${you} may place goods on your boards before receiving income",
	"action": "stPreIncome",
	"type": "multipleactiveplayer",
	"possibleactions": [
		"pass"
	],
	"transitions": {
		"pass": 83
	}
}
					*/
					break;
				case "income":
					/*
					{
	"name": "income",
	"type": "game",
	"action": "stIncome",
	"transitions": {
		"": 90
	}
}
					*/
					break;
				case "breeding":
					/*
					{
	"name": "breeding",
	"type": "game",
	"action": "stBreeding",
	"transitions": {
		"": 51
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
				case "feast-prepare":
					/*
					{
	"name": "feast-prepare",
	"type": "game",
	"action": "stSetAllMultiactive",
	"transitions": {
		"": 101
	}
}
					*/
					break;
				case "feast-placegoods":
					/*
					{
	"name": "feast-placegoods",
	"description": "Other players may place goods on their feast boards",
	"descriptionmyturn": "${you} may place goods on your feast board",
	"action": "stPreFeast",
	"type": "multipleactiveplayer",
	"possibleactions": [
		"pass"
	],
	"transitions": {
		"pass": 102
	}
}
					*/
					break;
				case "feast":
					/*
					{
	"name": "feast",
	"type": "game",
	"action": "stFeast",
	"transitions": {
		"done": 51
	}
}
					*/
					break;
				case "bonus-prepare":
					/*
					{
	"name": "bonus-prepare",
	"type": "game",
	"action": "stSetAllMultiactive",
	"transitions": {
		"": 111
	}
}
					*/
					break;
				case "bonus-placegoods":
					/*
					{
	"name": "bonus-placegoods",
	"description": "Other players may place goods on their boards",
	"descriptionmyturn": "${you} may place goods on your boards before receiving bonuses",
	"type": "multipleactiveplayer",
	"possibleactions": [
		"pass"
	],
	"transitions": {
		"pass": 112
	}
}
					*/
					break;
				case "bonus":
					/*
					{
	"name": "bonus",
	"type": "game",
	"action": "stBonus",
	"transitions": {
		"": 51
	}
}
					*/
					break;
				case "updateMountainStrips":
					/*
					{
	"name": "updateMountainStrips",
	"type": "game",
	"action": "stUpdateMountainStrips",
	"transitions": {
		"": 130
	}
}
					*/
					break;
				case "removePlacedVikings":
					/*
					{
	"name": "removePlacedVikings",
	"type": "game",
	"action": "stRemovePlacedVikings",
	"transitions": {
		"": 140
	}
}
					*/
					break;
				case "nextRound":
					/*
					{
	"name": "nextRound",
	"type": "game",
	"action": "stNextRound",
	"transitions": {
		"": 10
	}
}
					*/
					break;
				case "gameEnd-prepare":
					/*
					{
	"name": "gameEnd-prepare",
	"type": "game",
	"action": "stSetAllMultiactive",
	"transitions": {
		"": 151
	}
}
					*/
					break;
				case "gameEnd-placegoods":
					/*
					{
	"name": "gameEnd-placegoods",
	"description": "Other players may place goods on their boards",
	"descriptionmyturn": "${you} may place goods on your boards before the end of the game",
	"type": "multipleactiveplayer",
	"possibleactions": [
		"pass"
	],
	"transitions": {
		"pass": 152
	}
}
					*/
					break;
				case "gameEnd-scoring":
					/*
					{
	"name": "gameEnd-scoring",
	"type": "game",
	"action": "stGameEndScoring",
	"transitions": {
		"": 99
	}
}
					*/
					break;
				case "command-playOccupation":
					/*
					{
	"name": "command-playOccupation",
	"description": "${actplayer} may play an occupation",
	"descriptionmyturn": "${you} may play an occupation",
	"type": "activeplayer",
	"action": "stPlayOccupation",
	"possibleactions": [
		"pass",
		"selectOccupation",
		"undo"
	],
	"transitions": {
		"done": 51,
		"pass": 51,
		"zombiepass": 51,
		"undo": 50
	}
}
					*/
					break;
				case "command-pickmodal":
					/*
					{
	"name": "command-pickmodal",
	"description": "${actplayer} must take an action",
	"descriptionmyturn": "${you} must choose which action to perform",
	"type": "activeplayer",
	"action": "stPickModal",
	"args": "argPickModal",
	"possibleactions": [
		"selectMode",
		"undo",
		"pass"
	],
	"transitions": {
		"done": 51,
		"pass": 51,
		"zombiepass": 51,
		"undo": 50
	}
}
					*/
					break;
				case "command-exchange":
					/*
					{
	"name": "command-exchange",
	"description": "${actplayer} may make an exchange",
	"descriptionmyturn": "${you} may make an exchange",
	"type": "activeplayer",
	"action": "stExchange",
	"args": "argExchange",
	"possibleactions": [
		"pass",
		"affirm",
		"undo"
	],
	"transitions": {
		"affirm": 51,
		"pass": 51,
		"zombiepass": 51,
		"undo": 50
	}
}
					*/
					break;
				case "command-forge":
					/*
					{
	"name": "command-forge",
	"description": "${actplayer} must take a special tile from the forge",
	"descriptionmyturn": "${you} must take a special tile from the forge",
	"type": "activeplayer",
	"possibleactions": [
		"pass",
		"selectSpecialTile",
		"undo"
	],
	"transitions": {
		"done": 51,
		"pass": 51,
		"zombiepass": 51,
		"undo": 50
	}
}
					*/
					break;
				case "command-forgebuy":
					/*
					{
	"name": "command-forgebuy",
	"description": "${actplayer} may buy a special tile from the oval board",
	"descriptionmyturn": "${you} may buy a special tile from the oval board",
	"type": "activeplayer",
	"action": "stForge",
	"possibleactions": [
		"pass",
		"selectSpecialTile",
		"undo"
	],
	"transitions": {
		"done": 51,
		"pass": 51,
		"zombiepass": 51,
		"undo": 50
	}
}
					*/
					break;
				case "command-mountain":
					/*
					{
	"name": "command-mountain",
	"description": "${actplayer} must take ${num} resource(s) from a mountain strip",
	"descriptionmyturn": "${you} must take ${num} resource(s) from a mountain strip",
	"type": "activeplayer",
	"action": "stMountain",
	"args": "argMountain",
	"possibleactions": [
		"selectStrip",
		"undo"
	],
	"transitions": {
		"done": 51,
		"pass": 51,
		"zombiepass": 51,
		"undo": 50
	}
}
					*/
					break;
				case "command-trade":
					/*
					{
	"name": "command-trade",
	"description": "${actplayer} may choose green goods to upgrade",
	"descriptionmyturn": "${you} may choose green goods to upgrade",
	"type": "activeplayer",
	"action": "stUpgrade",
	"possibleactions": [
		"selectGoods",
		"undo"
	],
	"transitions": {
		"done": 51,
		"pass": 51,
		"zombiepass": 51,
		"undo": 50
	}
}
					*/
					break;
				case "command-upgrade":
					/*
					{
	"name": "command-upgrade",
	"description": "${actplayer} may choose ${num_tiles} good(s) to upgrade ${num_steps} time(s) each",
	"descriptionmyturn": "${you} may choose ${num_tiles} good(s) to upgrade ${num_steps} time(s) each",
	"type": "activeplayer",
	"action": "stUpgrade",
	"args": "argUpgrade",
	"possibleactions": [
		"selectGoods",
		"selectMode",
		"undo"
	],
	"transitions": {
		"done": 51,
		"pass": 51,
		"zombiepass": 51,
		"undo": 50
	}
}
					*/
					break;
				case "command-hunt-roll":
					/*
					{
	"name": "command-hunt-roll",
	"description": "",
	"descriptionmyturn": "",
	"type": "activeplayer",
	"action": "stHuntRoll",
	"transitions": {
		"": 1010
	}
}
					*/
					break;
				case "command-hunt":
					/*
					{
	"name": "command-hunt",
	"description": "${actplayer} must perform ${hunt_type_desc}",
	"descriptionmyturn": "${you} must perform ${hunt_type_desc}",
	"type": "activeplayer",
	"args": "argHunt",
	"possibleactions": [
		"reroll",
		"hunt",
		"deny"
	],
	"transitions": {
		"done": 51,
		"deny": 51,
		"raid": 1011,
		"reroll": 1009,
		"zombiepass": 51
	}
}
					*/
					break;
				case "command-hunt-reward":
					/*
					{
	"name": "command-hunt-reward",
	"description": "${actplayer} must pick a reward",
	"descriptionmyturn": "${you} must pick a reward (strength: ${raid_value})",
	"type": "activeplayer",
	"args": "argHuntReward",
	"possibleactions": [
		"selectSpecialTile"
	],
	"transitions": {
		"done": 51,
		"raider": 1066,
		"zombiepass": 51
	}
}
					*/
					break;
				case "command-emigrate":
					/*
					{
	"name": "command-emigrate",
	"description": "${actplayer} must pick a boat to emigrate",
	"descriptionmyturn": "${you} must pick a boat to emigrate",
	"type": "activeplayer",
	"possibleactions": [
		"selectShip",
		"undo"
	],
	"transitions": {
		"done": 51,
		"zombiepass": 51,
		"undo": 50
	}
}
					*/
					break;
				case "command-swapwhalingboatknarr":
					/*
					{
	"name": "command-swapwhalingboatknarr",
	"description": "${actplayer} may swap a whaling boat for a knarr",
	"descriptionmyturn": "${you} may swap a whaling boat for a knarr",
	"type": "activeplayer",
	"action": "stSwapWhalingBoatKnarr",
	"possibleactions": [
		"selectShip",
		"pass",
		"undo"
	],
	"transitions": {
		"done": 51,
		"pass": 51,
		"zombiepass": 51,
		"undo": 50
	}
}
					*/
					break;
				case "command-clone":
					/*
					{
	"name": "command-clone",
	"description": "${actplayer} must chose an action to copy",
	"descriptionmyturn": "${you} must chose an action to copy",
	"type": "activeplayer",
	"possibleactions": [
		"action",
		"undo"
	],
	"transitions": {
		"action": 51,
		"zombiepass": 51,
		"undo": 50
	}
}
					*/
					break;
				case "command-personalfeast":
					/*
					{
	"name": "command-personalfeast",
	"description": "${actplayer} may place goods on their feast board",
	"descriptionmyturn": "${you} may place goods on your feast board",
	"type": "activeplayer",
	"possibleactions": [
		"pass",
		"undo"
	],
	"transitions": {
		"pass": 51,
		"zombiepass": 51,
		"undo": 50
	}
}
					*/
					break;
				case "command-storeman":
					/*
					{
	"name": "command-storeman",
	"description": "${actplayer} must take a good",
	"descriptionmyturn": "${you} must take a good",
	"type": "activeplayer",
	"action": "stStoreman",
	"possibleactions": [
		"selectGoods",
		"undo"
	],
	"transitions": {
		"pass": 51,
		"done": 51,
		"zombiepass": 51,
		"undo": 50
	}
}
					*/
					break;
				case "command-meatupgrade":
					/*
					{
	"name": "command-meatupgrade",
	"description": "${actplayer} may choose 1 meat good to upgrade",
	"descriptionmyturn": "${you} may choose 1 meat good to upgrade",
	"type": "activeplayer",
	"action": "stMeatUpgrade",
	"args": "argUpgrade",
	"possibleactions": [
		"selectGoods",
		"undo"
	],
	"transitions": {
		"done": 51,
		"pass": 51,
		"zombiepass": 51,
		"undo": 50
	}
}
					*/
					break;
				case "command-inspector":
					/*
					{
	"name": "command-inspector",
	"description": "${actplayer} may return a viking to the Thing space",
	"descriptionmyturn": "${you} may return a viking to the Thing space",
	"type": "activeplayer",
	"possibleactions": [
		"action",
		"pass",
		"undo"
	],
	"transitions": {
		"pass": 51,
		"another": 1020,
		"zombiepass": 51,
		"undo": 50
	}
}
					*/
					break;
				case "command-inspector2":
					/*
					{
	"name": "command-inspector2",
	"description": "${actplayer} may return a second viking to their Thing space",
	"descriptionmyturn": "${you} may return a second viking to their Thing space",
	"type": "activeplayer",
	"possibleactions": [
		"affirm",
		"pass",
		"undo"
	],
	"transitions": {
		"pass": 51,
		"affirm": 51,
		"zombiepass": 51,
		"undo": 50
	}
}
					*/
					break;
				case "command-hornturner":
					/*
					{
	"name": "command-hornturner",
	"description": "${actplayer} may make an exchange",
	"descriptionmyturn": "${you} may make an exchange",
	"type": "activeplayer",
	"action": "stCheckSkip",
	"possibleactions": [
		"affirm",
		"pass",
		"undo"
	],
	"transitions": {
		"pass": 1022,
		"affirm": 1022,
		"zombiepass": 51,
		"undo": 50
	}
}
					*/
					break;
				case "command-hornturner2":
					/*
					{
	"name": "command-hornturner2",
	"description": "${actplayer} may make an exchange",
	"descriptionmyturn": "${you} may make an exchange",
	"type": "activeplayer",
	"action": "stCheckSkip",
	"possibleactions": [
		"affirm",
		"pass",
		"undo"
	],
	"transitions": {
		"pass": 51,
		"affirm": 51,
		"zombiepass": 51,
		"undo": 50
	}
}
					*/
					break;
				case "command-wharfowner":
					/*
					{
	"name": "command-wharfowner",
	"description": "${actplayer} may make an exchange",
	"descriptionmyturn": "${you} may make an exchange",
	"type": "activeplayer",
	"action": "stCheckSkip",
	"possibleactions": [
		"selectShip",
		"pass",
		"undo"
	],
	"transitions": {
		"done": 51,
		"pass": 51,
		"zombiepass": 51,
		"undo": 50
	}
}
					*/
					break;
				case "command-fineblacksmith":
					/*
					{
	"name": "command-fineblacksmith",
	"description": "${actplayer} may make an exchange",
	"descriptionmyturn": "${you} may make an exchange",
	"type": "activeplayer",
	"action": "stCheckSkip",
	"possibleactions": [
		"selectSpecialTile",
		"pass",
		"undo"
	],
	"transitions": {
		"pass": 51,
		"done": 51,
		"zombiepass": 51,
		"undo": 50
	}
}
					*/
					break;
				case "command-shipbuilder":
					/*
					{
	"name": "command-shipbuilder",
	"description": "${actplayer} may make an exchange",
	"descriptionmyturn": "${you} may make an exchange",
	"type": "activeplayer",
	"action": "stCheckSkip",
	"possibleactions": [
		"selectShip",
		"pass",
		"undo"
	],
	"transitions": {
		"done": 51,
		"pass": 51,
		"zombiepass": 51,
		"undo": 50
	}
}
					*/
					break;
				case "command-dragonslayer":
					/*
					{
	"name": "command-dragonslayer",
	"description": "${actplayer} may make an exchange",
	"descriptionmyturn": "${you} may make an exchange",
	"type": "activeplayer",
	"action": "stCheckSkip",
	"possibleactions": [
		"affirm",
		"pass",
		"undo"
	],
	"transitions": {
		"pass": 51,
		"affirm": 51,
		"zombiepass": 51,
		"undo": 50
	}
}
					*/
					break;
				case "command-privatechef":
					/*
					{
	"name": "command-privatechef",
	"description": "${actplayer} may make an exchange",
	"descriptionmyturn": "${you} may make an exchange",
	"type": "activeplayer",
	"action": "stCheckSkip",
	"possibleactions": [
		"affirm",
		"pass",
		"undo"
	],
	"transitions": {
		"pass": 51,
		"affirm": 51,
		"zombiepass": 51,
		"undo": 50
	}
}
					*/
					break;
				case "command-fieldfarmer":
					/*
					{
	"name": "command-fieldfarmer",
	"description": "${actplayer} may upgrade 1 orange good for 1 silver",
	"descriptionmyturn": "${you} may upgrade 1 orange good for 1 silver",
	"type": "activeplayer",
	"action": "stCheckSkip",
	"possibleactions": [
		"selectGoods",
		"pass",
		"undo"
	],
	"transitions": {
		"pass": 51,
		"done": 51,
		"zombiepass": 51,
		"undo": 50
	}
}
					*/
					break;
				case "command-earl":
					/*
					{
	"name": "command-earl",
	"description": "${actplayer} may buy a stonehouse",
	"descriptionmyturn": "${you} may buy a stonehouse",
	"type": "activeplayer",
	"action": "stCheckSkip",
	"possibleactions": [
		"affirm",
		"pass",
		"undo"
	],
	"transitions": {
		"pass": 51,
		"affirm": 51,
		"zombiepass": 51,
		"undo": 50
	}
}
					*/
					break;
				case "command-cowherd":
					/*
					{
	"name": "command-cowherd",
	"description": "${actplayer} may make an exchange",
	"descriptionmyturn": "${you} may make an exchange",
	"type": "activeplayer",
	"action": "stCheckSkip",
	"possibleactions": [
		"affirm",
		"pass",
		"undo"
	],
	"transitions": {
		"pass": 51,
		"affirm": 51,
		"zombiepass": 51,
		"undo": 50
	}
}
					*/
					break;
				case "command-bonecollector":
					/*
					{
	"name": "command-bonecollector",
	"description": "${actplayer} may make an exchange",
	"descriptionmyturn": "${you} may make an exchange",
	"type": "activeplayer",
	"action": "stCheckSkip",
	"possibleactions": [
		"affirm",
		"pass",
		"undo"
	],
	"transitions": {
		"pass": 51,
		"affirm": 51,
		"zombiepass": 51,
		"undo": 50
	}
}
					*/
					break;
				case "command-breeder":
					/*
					{
	"name": "command-breeder",
	"description": "${actplayer} may make an exchange",
	"descriptionmyturn": "${you} may make an exchange",
	"type": "activeplayer",
	"action": "stCheckSkip",
	"possibleactions": [
		"affirm",
		"pass",
		"undo"
	],
	"transitions": {
		"pass": 51,
		"affirm": 51,
		"zombiepass": 51,
		"undo": 50
	}
}
					*/
					break;
				case "command-shepherdboy":
					/*
					{
	"name": "command-shepherdboy",
	"description": "${actplayer} may make an exchange",
	"descriptionmyturn": "${you} may make an exchange",
	"type": "activeplayer",
	"action": "stCheckSkip",
	"possibleactions": [
		"affirm",
		"pass",
		"undo"
	],
	"transitions": {
		"pass": 51,
		"affirm": 51,
		"zombiepass": 51,
		"undo": 50
	}
}
					*/
					break;
				case "command-metalsmith":
					/*
					{
	"name": "command-metalsmith",
	"description": "${actplayer} may make an exchange",
	"descriptionmyturn": "${you} may make an exchange",
	"type": "activeplayer",
	"possibleactions": [
		"selectMode",
		"pass",
		"undo"
	],
	"transitions": {
		"pass": 51,
		"done": 51,
		"zombiepass": 51,
		"undo": 50
	}
}
					*/
					break;
				case "command-hidebuyer":
					/*
					{
	"name": "command-hidebuyer",
	"description": "${actplayer} may make an exchange",
	"descriptionmyturn": "${you} may make an exchange",
	"type": "activeplayer",
	"action": "stCheckSkip",
	"possibleactions": [
		"selectMode",
		"pass",
		"undo"
	],
	"transitions": {
		"pass": 51,
		"done": 51,
		"zombiepass": 51,
		"undo": 50
	}
}
					*/
					break;
				case "command-preacher":
					/*
					{
	"name": "command-preacher",
	"description": "${actplayer} may make an exchange",
	"descriptionmyturn": "${you} may make an exchange",
	"type": "activeplayer",
	"possibleactions": [
		"selectMode",
		"pass",
		"undo"
	],
	"transitions": {
		"pass": 51,
		"done": 51,
		"zombiepass": 51,
		"undo": 50
	}
}
					*/
					break;
				case "command-hornblower":
					/*
					{
	"name": "command-hornblower",
	"description": "${actplayer} may make an exchange",
	"descriptionmyturn": "${you} may make an exchange",
	"type": "activeplayer",
	"action": "stCheckSkip",
	"possibleactions": [
		"affirm",
		"pass",
		"undo"
	],
	"transitions": {
		"pass": 51,
		"affirm": 51,
		"zombiepass": 51,
		"undo": 50
	}
}
					*/
					break;
				case "command-flip":
					/*
					{
	"name": "command-flip",
	"description": "${actplayer} may choose up to ${num_tiles} good(s) to flip",
	"descriptionmyturn": "${you} may choose up to ${num_tiles} good(s) to flip",
	"type": "activeplayer",
	"action": "stUpgrade",
	"args": "argUpgrade",
	"possibleactions": [
		"selectGoods",
		"undo"
	],
	"transitions": {
		"done": 51,
		"pass": 51,
		"zombiepass": 51,
		"undo": 50
	}
}
					*/
					break;
				case "command-sameupgrade":
					/*
					{
	"name": "command-sameupgrade",
	"description": "${actplayer} may choose ${num_tiles} good(s) to upgrade ${num_steps} time(s) each",
	"descriptionmyturn": "${you} may choose ${num_tiles} good(s) to upgrade ${num_steps} time(s) each",
	"type": "activeplayer",
	"action": "stUpgrade",
	"args": "argUpgrade",
	"possibleactions": [
		"selectGoods",
		"undo"
	],
	"transitions": {
		"done": 51,
		"pass": 51,
		"zombiepass": 51,
		"undo": 50
	}
}
					*/
					break;
				case "command-quartermaster":
					/*
					{
	"name": "command-quartermaster",
	"description": "${actplayer} may buy a longship",
	"descriptionmyturn": "${you} may buy a longship",
	"type": "activeplayer",
	"action": "stCheckSkip",
	"possibleactions": [
		"affirm",
		"pass",
		"undo"
	],
	"transitions": {
		"pass": 51,
		"affirm": 51,
		"zombiepass": 51,
		"undo": 50
	}
}
					*/
					break;
				case "command-longshipbuilder":
					/*
					{
	"name": "command-longshipbuilder",
	"description": "${actplayer} may buy a longship",
	"descriptionmyturn": "${you} may buy a longship",
	"type": "activeplayer",
	"action": "stCheckSkip",
	"possibleactions": [
		"affirm",
		"pass",
		"undo"
	],
	"transitions": {
		"pass": 51,
		"affirm": 51,
		"zombiepass": 51,
		"undo": 50
	}
}
					*/
					break;
				case "command-harborguard":
					/*
					{
	"name": "command-harborguard",
	"description": "${actplayer} may pick a boat to emigrate",
	"descriptionmyturn": "${you} may pick a boat to emigrate",
	"type": "activeplayer",
	"action": "stCheckSkip",
	"possibleactions": [
		"selectShip",
		"pass",
		"undo"
	],
	"transitions": {
		"pass": 51,
		"done": 51,
		"zombiepass": 51,
		"undo": 50
	}
}
					*/
					break;
				case "command-spicemerchant":
					/*
					{
	"name": "command-spicemerchant",
	"description": "${actplayer} may make an exchange",
	"descriptionmyturn": "${you} may make an exchange",
	"type": "activeplayer",
	"action": "stCheckSkip",
	"possibleactions": [
		"affirm",
		"pass",
		"undo"
	],
	"transitions": {
		"affirm": 51,
		"pass": 51,
		"zombiepass": 51,
		"undo": 50
	}
}
					*/
					break;
				case "command-meatmerchant":
					/*
					{
	"name": "command-meatmerchant",
	"description": "${actplayer} may make an exchange",
	"descriptionmyturn": "${you} may make an exchange",
	"type": "activeplayer",
	"action": "stCheckSkip",
	"possibleactions": [
		"selectMode",
		"pass",
		"undo"
	],
	"transitions": {
		"done": 51,
		"pass": 51,
		"zombiepass": 51,
		"undo": 50
	}
}
					*/
					break;
				case "command-sower":
					/*
					{
	"name": "command-sower",
	"description": "${actplayer} may make an exchange",
	"descriptionmyturn": "${you} may make an exchange",
	"type": "activeplayer",
	"possibleactions": [
		"selectMode",
		"affirm",
		"pass",
		"undo"
	],
	"transitions": {
		"done": 51,
		"affirm": 51,
		"pass": 51,
		"zombiepass": 51,
		"undo": 50
	}
}
					*/
					break;
				case "command-flaxbaker":
					/*
					{
	"name": "command-flaxbaker",
	"description": "${actplayer} may make an exchange",
	"descriptionmyturn": "${you} may make an exchange",
	"type": "activeplayer",
	"action": "stCheckSkip",
	"possibleactions": [
		"affirm",
		"pass",
		"undo"
	],
	"transitions": {
		"affirm": 51,
		"pass": 51,
		"zombiepass": 51,
		"undo": 50
	}
}
					*/
					break;
				case "command-disheartenedwarrior":
					/*
					{
	"name": "command-disheartenedwarrior",
	"description": "${actplayer} must take a good",
	"descriptionmyturn": "${you} must take a good",
	"type": "activeplayer",
	"possibleactions": [
		"selectMode",
		"undo"
	],
	"transitions": {
		"pass": 51,
		"done": 51,
		"zombiepass": 51,
		"undo": 50
	}
}
					*/
					break;
				case "command-ironsmith":
					/*
					{
	"name": "command-ironsmith",
	"description": "${actplayer} may return a viking to the Thing space",
	"descriptionmyturn": "${you} may return a viking to the Thing space",
	"type": "activeplayer",
	"action": "stCheckSkip",
	"possibleactions": [
		"affirm",
		"pass",
		"undo"
	],
	"transitions": {
		"pass": 51,
		"affirm": 51,
		"zombiepass": 51,
		"undo": 50
	}
}
					*/
					break;
				case "command-emigratepassable":
					/*
					{
	"name": "command-emigratepassable",
	"description": "${actplayer} may pick a boat to emigrate",
	"descriptionmyturn": "${you} may pick a boat to emigrate",
	"type": "activeplayer",
	"action": "stCheckSkip",
	"possibleactions": [
		"selectShip",
		"pass",
		"undo"
	],
	"transitions": {
		"done": 51,
		"pass": 51,
		"zombiepass": 51,
		"undo": 50
	}
}
					*/
					break;
				case "command-silkstitcher":
					/*
					{
	"name": "command-silkstitcher",
	"description": "${actplayer} may make an exchange",
	"descriptionmyturn": "${you} may make an exchange",
	"type": "activeplayer",
	"action": "stCheckSkip",
	"possibleactions": [
		"affirm",
		"pass",
		"undo"
	],
	"transitions": {
		"affirm": 51,
		"pass": 51,
		"zombiepass": 51,
		"undo": 50
	}
}
					*/
					break;
				case "command-laborer":
					/*
					{
	"name": "command-laborer",
	"description": "${actplayer} may make an exchange",
	"descriptionmyturn": "${you} may make an exchange",
	"type": "activeplayer",
	"action": "stCheckSkip",
	"possibleactions": [
		"affirm",
		"pass",
		"undo"
	],
	"transitions": {
		"affirm": 51,
		"pass": 51,
		"zombiepass": 51,
		"undo": 50
	}
}
					*/
					break;
				case "command-payupgrade":
					/*
					{
	"name": "command-payupgrade",
	"description": "${actplayer} may choose ${num_tiles} good(s) to upgrade ${num_steps} time(s) each",
	"descriptionmyturn": "${you} may choose ${num_tiles} good(s) to upgrade ${num_steps} time(s) each",
	"type": "activeplayer",
	"action": "stUpgrade",
	"args": "argUpgrade",
	"possibleactions": [
		"selectGoods",
		"undo",
		"pass"
	],
	"transitions": {
		"done": 51,
		"pass": 51,
		"zombiepass": 51,
		"undo": 50
	}
}
					*/
					break;
				case "command-meatcurer":
					/*
					{
	"name": "command-meatcurer",
	"description": "${actplayer} may make an exchange",
	"descriptionmyturn": "${you} may make an exchange",
	"type": "activeplayer",
	"action": "stCheckSkip",
	"possibleactions": [
		"affirm",
		"pass",
		"undo"
	],
	"transitions": {
		"pass": 51,
		"affirm": 51,
		"zombiepass": 51,
		"undo": 50
	}
}
					*/
					break;
				case "command-snarespecialist":
					/*
					{
	"name": "command-snarespecialist",
	"description": "${actplayer} may return a viking to the Thing space",
	"descriptionmyturn": "${you} may return a viking to the Thing space",
	"type": "activeplayer",
	"action": "stCheckSkip",
	"possibleactions": [
		"affirm",
		"pass",
		"undo"
	],
	"transitions": {
		"pass": 51,
		"affirm": 51,
		"zombiepass": 51,
		"undo": 50
	}
}
					*/
					break;
				case "command-deerstalker":
					/*
					{
	"name": "command-deerstalker",
	"description": "${actplayer} may make an exchange",
	"descriptionmyturn": "${you} may make an exchange",
	"type": "activeplayer",
	"action": "stCheckSkip",
	"possibleactions": [
		"affirm",
		"pass",
		"undo"
	],
	"transitions": {
		"pass": 51,
		"affirm": 51,
		"zombiepass": 51,
		"undo": 50
	}
}
					*/
					break;
				case "command-lancebearer":
					/*
					{
	"name": "command-lancebearer",
	"description": "${actplayer} must take a good",
	"descriptionmyturn": "${you} must take a good",
	"type": "activeplayer",
	"possibleactions": [
		"selectMode",
		"pass",
		"undo"
	],
	"transitions": {
		"pass": 51,
		"done": 51,
		"zombiepass": 51,
		"undo": 50
	}
}
					*/
					break;
				case "command-armedfighter":
					/*
					{
	"name": "command-armedfighter",
	"description": "${actplayer} may take ore or stone from a mountain strip",
	"descriptionmyturn": "${you} may take ore or stone from a mountain strip",
	"type": "activeplayer",
	"action": "stCheckSkip",
	"possibleactions": [
		"selectStrip",
		"pass",
		"undo"
	],
	"transitions": {
		"done": 51,
		"pass": 51,
		"zombiepass": 51,
		"undo": 50
	}
}
					*/
					break;
				case "command-spicetrader":
					/*
					{
	"name": "command-spicetrader",
	"description": "${actplayer} may make an exchange",
	"descriptionmyturn": "${you} may make an exchange",
	"type": "activeplayer",
	"action": "stCheckSkip",
	"possibleactions": [
		"affirm",
		"pass",
		"undo"
	],
	"transitions": {
		"pass": 51,
		"affirm": 51,
		"zombiepass": 51,
		"undo": 50
	}
}
					*/
					break;
				case "command-sponsor":
					/*
					{
	"name": "command-sponsor",
	"description": "${actplayer} may make an exchange",
	"descriptionmyturn": "${you} may make an exchange",
	"type": "activeplayer",
	"action": "stCheckSkip",
	"possibleactions": [
		"selectMode",
		"pass",
		"undo"
	],
	"transitions": {
		"pass": 51,
		"done": 51,
		"zombiepass": 51,
		"undo": 50
	}
}
					*/
					break;
				case "command-beforeorafter-draw":
					/*
					{
	"name": "command-beforeorafter-draw",
	"description": "${actplayer} must choose when to draw an occupation",
	"descriptionmyturn": "${you} must choose when to draw an occupation",
	"type": "activeplayer",
	"possibleactions": [
		"selectMode",
		"undo"
	],
	"transitions": {
		"done": 51,
		"zombiepass": 51,
		"undo": 50
	}
}
					*/
					break;
				case "command-beforeorafter-play":
					/*
					{
	"name": "command-beforeorafter-play",
	"description": "${actplayer} must choose when to play an occupation",
	"descriptionmyturn": "${you} must choose when to play an occupation",
	"type": "activeplayer",
	"action": "stBeforeOrAfterPlay",
	"possibleactions": [
		"selectMode",
		"undo"
	],
	"transitions": {
		"done": 51,
		"zombiepass": 51,
		"undo": 50
	}
}
					*/
					break;
				case "command-hornblower2":
					/*
					{
	"name": "command-hornblower2",
	"description": "${actplayer} may make an exchange",
	"descriptionmyturn": "${you} may make an exchange",
	"type": "activeplayer",
	"action": "stCheckSkip",
	"possibleactions": [
		"affirm",
		"pass",
		"undo"
	],
	"transitions": {
		"pass": 51,
		"affirm": 51,
		"zombiepass": 51,
		"undo": 50
	}
}
					*/
					break;
				case "command-prehunt":
					/*
					{
	"name": "command-prehunt",
	"description": "${actplayer} must perform ${hunt_type_desc}",
	"descriptionmyturn": "${you} must perform ${hunt_type_desc}",
	"type": "activeplayer",
	"args": "argHunt",
	"possibleactions": [
		"affirm",
		"undo"
	],
	"transitions": {
		"undo": 50,
		"affirm": 1009,
		"zombiepass": 51
	}
}
					*/
					break;
				case "command-peacemaker":
					/*
					{
	"name": "command-peacemaker",
	"description": "${actplayer} may take a resource",
	"descriptionmyturn": "${you} may take a resource",
	"type": "activeplayer",
	"possibleactions": [
		"selectMode",
		"pass",
		"undo"
	],
	"transitions": {
		"pass": 51,
		"done": 51,
		"zombiepass": 51,
		"undo": 50
	}
}
					*/
					break;
				case "command-slowpoke":
					/*
					{
	"name": "command-slowpoke",
	"description": "${actplayer} may make an exchange",
	"descriptionmyturn": "${you} may make an exchange",
	"type": "activeplayer",
	"action": "stCheckSkip",
	"possibleactions": [
		"selectMode",
		"pass",
		"undo"
	],
	"transitions": {
		"pass": 51,
		"done": 51,
		"zombiepass": 51,
		"undo": 50
	}
}
					*/
					break;
				case "command-hunt-reward2":
					/*
					{
	"name": "command-hunt-reward2",
	"description": "${actplayer} may pick a second reward",
	"descriptionmyturn": "${you} may pick a second reward (strength: ${raid_value})",
	"type": "activeplayer",
	"args": "argHuntReward",
	"possibleactions": [
		"selectSpecialTile",
		"pass"
	],
	"transitions": {
		"done": 51,
		"pass": 51,
		"zombiepass": 51
	}
}
					*/
					break;
				case "command-bosporustraveller":
					/*
					{
	"name": "command-bosporustraveller",
	"description": "${actplayer} may make an exchange",
	"descriptionmyturn": "${you} may make an exchange",
	"type": "activeplayer",
	"action": "stCheckSkip",
	"possibleactions": [
		"selectMode",
		"pass",
		"undo"
	],
	"transitions": {
		"pass": 51,
		"done": 51,
		"zombiepass": 51,
		"undo": 50
	}
}
					*/
					break;
				case "command-swordfighter":
					/*
					{
	"name": "command-swordfighter",
	"description": "${actplayer} may remove an ore to receive +2 on the roll",
	"descriptionmyturn": "${you} may remove an ore to receive +2 on the roll",
	"type": "activeplayer",
	"action": "stCheckSkip",
	"possibleactions": [
		"selectShip",
		"pass",
		"undo"
	],
	"transitions": {
		"done": 1063,
		"pass": 1063,
		"zombiepass": 51,
		"undo": 50
	}
}
					*/
					break;
				case "command-follower":
					/*
					{
	"name": "command-follower",
	"description": "${actplayer} must chose an action to copy",
	"descriptionmyturn": "${you} must chose an action to copy",
	"type": "activeplayer",
	"possibleactions": [
		"action",
		"pass",
		"undo"
	],
	"transitions": {
		"action": 51,
		"pass": 51,
		"zombiepass": 51,
		"undo": 50
	}
}
					*/
					break;
				case "command-clerk":
					/*
					{
	"name": "command-clerk",
	"description": "${actplayer} must take an action",
	"descriptionmyturn": "${you} must choose which action to perform",
	"type": "activeplayer",
	"action": "stCheckSkip",
	"args": "argPickModal",
	"possibleactions": [
		"selectMode",
		"undo",
		"pass"
	],
	"transitions": {
		"done": 51,
		"pass": 51,
		"zombiepass": 51,
		"undo": 50
	}
}
					*/
					break;
				case "command-nwupgrade":
					/*
					{
	"name": "command-nwupgrade",
	"description": "${actplayer} may choose ${num_tiles} good(s) to upgrade ${num_steps} time(s) each",
	"descriptionmyturn": "${you} may choose ${num_tiles} good(s) to upgrade ${num_steps} time(s) each",
	"type": "activeplayer",
	"action": "stUpgrade",
	"args": "argUpgrade",
	"possibleactions": [
		"selectGoods",
		"selectMode",
		"undo"
	],
	"transitions": {
		"done": 51,
		"pass": 51,
		"zombiepass": 51,
		"undo": 50
	}
}
					*/
					break;
				case "command-latecomer":
					/*
					{
	"name": "command-latecomer",
	"description": "${actplayer} may chose an action space to use with Latecomer for 1 silver",
	"descriptionmyturn": "${you} may chose an action space to use with Latecomer for 1 silver",
	"type": "activeplayer",
	"possibleactions": [
		"action",
		"pass"
	],
	"transitions": {
		"action": 51,
		"pass": 51,
		"zombiepass": 51
	}
}
					*/
					break;
				case "command-preceptor":
					/*
					{
	"name": "command-preceptor",
	"description": "${actplayer} must choose to draw or play an occupation",
	"descriptionmyturn": "${you} must choose to draw or play an occupation",
	"type": "activeplayer",
	"action": "stCheckSkip",
	"args": "argPickModal",
	"possibleactions": [
		"selectMode",
		"undo",
		"pass"
	],
	"transitions": {
		"done": 51,
		"pass": 51,
		"zombiepass": 51,
		"undo": 50
	}
}
					*/
					break;
				case "command-berserker":
					/*
					{
	"name": "command-berserker",
	"description": "${actplayer} may remove an ore to receive +3 on the roll",
	"descriptionmyturn": "${you} may remove an ore from the raiding longship to receive +3 on the roll",
	"type": "activeplayer",
	"action": "stCheckSkip",
	"possibleactions": [
		"selectShip",
		"pass",
		"undo"
	],
	"transitions": {
		"done": 1063,
		"pass": 1063,
		"zombiepass": 51,
		"undo": 50
	}
}
					*/
					break;
				case "command-oreboatman":
					/*
					{
	"name": "command-oreboatman",
	"description": "${actplayer} may place ${num} ore on their boards",
	"descriptionmyturn": "${you} may place ${num} ore on your boards",
	"type": "activeplayer",
	"action": "stCheckSkip",
	"args": "argOreBoatman",
	"possibleactions": [
		"pass"
	],
	"transitions": {
		"done": 51,
		"pass": 51,
		"zombiepass": 51
	}
}
					*/
					break;
				case "command-fishcook":
					/*
					{
	"name": "command-fishcook",
	"description": "${actplayer} may place ${num} stock fish on their houses",
	"descriptionmyturn": "${you} may place ${num} stock fish on your houses",
	"type": "activeplayer",
	"action": "stCheckSkip",
	"args": "argFishCook",
	"possibleactions": [
		"pass"
	],
	"transitions": {
		"done": 51,
		"pass": 51,
		"zombiepass": 51
	}
}
					*/
					break;
				case "command-soberman":
					/*
					{
	"name": "command-soberman",
	"description": "${actplayer} may forgo placing mead to gain 1 silver",
	"descriptionmyturn": "${you} may forgo placing mead to gain 1 silver",
	"type": "activeplayer",
	"possibleactions": [
		"pass",
		"affirm"
	],
	"transitions": {
		"done": 51,
		"affirm": 51,
		"pass": 51,
		"zombiepass": 51
	}
}
					*/
					break;
				case "command-explore":
					/*
					{
	"name": "command-explore",
	"description": "${actplayer} must select an island to explore",
	"descriptionmyturn": "${you} must select an island to explore",
	"type": "activeplayer",
	"args": "argExplore",
	"action": "stExplore",
	"possibleactions": [
		"selectIsland",
		"undo"
	],
	"transitions": {
		"done": 51,
		"pass": 51,
		"zombiepass": 51,
		"undo": 50
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
export default feastforodin;
