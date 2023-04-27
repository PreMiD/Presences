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

const viticulture: GamePresence = {
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
				case "startGame":
					/*
					{
	"name": "startGame",
	"description": "",
	"type": "game",
	"action": "stStartGame",
	"updateGameProgression": false,
	"transitions": {
		"choose": 10,
		"mamaEffect": 11
	}
}
					*/
					break;
				case "mamaPapaChoose":
					/*
					{
	"name": "mamaPapaChoose",
	"description": "Players must choose mama and papa",
	"descriptionmyturn": "${you} must choose mama and papa",
	"type": "multipleactiveplayer",
	"args": "argMamaPapaChoose",
	"possibleactions": [
		"chooseMamaPapa"
	],
	"transitions": {
		"next": 11,
		"zombiePass": 11
	}
}
					*/
					break;
				case "mamaEffect":
					/*
					{
	"name": "mamaEffect",
	"description": "",
	"type": "game",
	"action": "stMamaEffect",
	"updateGameProgression": false,
	"transitions": {
		"next": 12
	}
}
					*/
					break;
				case "papaOptionChoose":
					/*
					{
	"name": "papaOptionChoose",
	"description": "${actplayer} must choose papa option",
	"descriptionmyturn": "${you} must choose papa option",
	"type": "activeplayer",
	"possibleactions": [
		"choosePapaOption"
	],
	"args": "argPapaOptionChoose",
	"transitions": {
		"next": 13,
		"zombiePass": 13
	}
}
					*/
					break;
				case "papaOptionChooseNext":
					/*
					{
	"name": "papaOptionChooseNext",
	"description": "",
	"type": "game",
	"action": "stPapaOptionChooseNext",
	"updateGameProgression": false,
	"transitions": {
		"next": 12,
		"end": 20
	}
}
					*/
					break;
				case "startTurn":
					/*
					{
	"name": "startTurn",
	"description": "",
	"type": "game",
	"action": "stStartTurn",
	"updateGameProgression": true,
	"transitions": {
		"next": 30
	}
}
					*/
					break;
				case "springChooseWakeup":
					/*
					{
	"name": "springChooseWakeup",
	"description": "${actplayer} must choose a wake-up row",
	"descriptionmyturn": "${you} must choose a wake-up row",
	"type": "activeplayer",
	"args": "argSpringChooseWakeup",
	"possibleactions": [
		"chooseWakeup"
	],
	"transitions": {
		"next": 31,
		"zombiePass": 31
	}
}
					*/
					break;
				case "springChooseWakeupNext":
					/*
					{
	"name": "springChooseWakeupNext",
	"description": "",
	"type": "game",
	"action": "stSpringChooseWakeupNext",
	"updateGameProgression": true,
	"transitions": {
		"next": 30,
		"end": 40
	}
}
					*/
					break;
				case "startSeasonWorkers":
					/*
					{
	"name": "startSeasonWorkers",
	"description": "",
	"type": "game",
	"action": "stStartSeasonWorkers",
	"updateGameProgression": true,
	"transitions": {
		"next": 42
	}
}
					*/
					break;
				case "seasonWorkers":
					/*
					{
	"name": "seasonWorkers",
	"description": "${actplayer} must place a worker or pass",
	"descriptionmyturn": "${you} must place a worker or pass",
	"type": "activeplayer",
	"args": "argSeasonWorkers",
	"possibleactions": [
		"placeWorker",
		"pass"
	],
	"transitions": {
		"next": 42,
		"zombiePass": 42
	}
}
					*/
					break;
				case "seasonWorkersNext":
					/*
					{
	"name": "seasonWorkersNext",
	"description": "",
	"type": "game",
	"action": "stSeasonWorkersNext",
	"updateGameProgression": true,
	"transitions": {
		"next": 41,
		"plant": 70,
		"makeWine": 71,
		"playYellowCard": 72,
		"fillOrder": 74,
		"playBlueCard": 73,
		"playCardSecondOption": 79,
		"chooseVisitorCardDraw": 75,
		"chooseCards": 76,
		"chooseOptions": 77,
		"executeLocation": 78,
		"takeActionPrev": 80,
		"discardVines": 85,
		"allBuild": 81,
		"allChoose": 82,
		"allPlant": 83,
		"allGiveCard": 84,
		"chooseFallCard": 50,
		"end": 90
	}
}
					*/
					break;
				case "fallChooseCard":
					/*
					{
	"name": "fallChooseCard",
	"description": "${actplayer} must draw a summer or winter visitor card",
	"descriptionmyturn": "${you} must draw a summer or winter visitor card",
	"descriptionChoose1": "${actplayer} must draw a summer or winter visitor card",
	"descriptionChoose1myturn": "${you} must draw a summer or winter visitor card",
	"descriptionChoose2": "${actplayer} must draw two visitor cards (cottage)",
	"descriptionChoose2myturn": "${you} must draw two visitor cards (cottage)",
	"type": "activeplayer",
	"args": "argFallChooseCard",
	"possibleactions": [
		"chooseFallCard"
	],
	"transitions": {
		"next": 51,
		"zombiePass": 51
	}
}
					*/
					break;
				case "fallChooseCardNext":
					/*
					{
	"name": "fallChooseCardNext",
	"description": "",
	"type": "game",
	"action": "stFallChooseCardNext",
	"updateGameProgression": false,
	"transitions": {
		"next": 50,
		"end": 40
	}
}
					*/
					break;
				case "plant":
					/*
					{
	"name": "plant",
	"description": "${actplayer} can plant a field",
	"descriptionmyturn": "${you} can plant a field",
	"type": "activeplayer",
	"args": "argPlant",
	"possibleactions": [
		"plant",
		"refuse"
	],
	"transitions": {
		"next": 42,
		"zombiePass": 42
	}
}
					*/
					break;
				case "makeWine":
					/*
					{
	"name": "makeWine",
	"description": "${actplayer} can make a wine",
	"descriptionmyturn": "${you} can make a wine",
	"type": "activeplayer",
	"args": "argMakeWine",
	"possibleactions": [
		"makeWine",
		"refuse"
	],
	"transitions": {
		"next": 42,
		"zombiePass": 42
	}
}
					*/
					break;
				case "playYellowCard":
					/*
					{
	"name": "playYellowCard",
	"description": "${actplayer} can play a summer visitor card",
	"descriptionmyturn": "${you} can play a summer visitor card",
	"type": "activeplayer",
	"args": "argPlayYellowCard",
	"possibleactions": [
		"playYellowCard",
		"refuse"
	],
	"transitions": {
		"next": 42,
		"zombiePass": 42
	}
}
					*/
					break;
				case "playBlueCard":
					/*
					{
	"name": "playBlueCard",
	"description": "${actplayer} can play a winter visitor card",
	"descriptionmyturn": "${you} can play a winter visitor card",
	"type": "activeplayer",
	"args": "argPlayBlueCard",
	"possibleactions": [
		"playBlueCard",
		"refuse"
	],
	"transitions": {
		"next": 42,
		"zombiePass": 42
	}
}
					*/
					break;
				case "fillOrder":
					/*
					{
	"name": "fillOrder",
	"description": "${actplayer} can fill a wine order card",
	"descriptionmyturn": "${you} can fill a wine order card",
	"type": "activeplayer",
	"args": "argFillOrder",
	"possibleactions": [
		"fillOrder",
		"refuse"
	],
	"transitions": {
		"next": 42,
		"zombiePass": 42
	}
}
					*/
					break;
				case "chooseVisitorCardDraw":
					/*
					{
	"name": "chooseVisitorCardDraw",
	"description": "${actplayer} can draw a visitor card",
	"descriptionmyturn": "${you} can draw a visitor card",
	"type": "activeplayer",
	"args": "argChooseVisitorCardDraw",
	"possibleactions": [
		"chooseVisitorCardDraw"
	],
	"transitions": {
		"next": 42,
		"zombiePass": 42
	}
}
					*/
					break;
				case "chooseCards":
					/*
					{
	"name": "chooseCards",
	"description": "${actplayer} can choose ${maxCards} cards",
	"descriptionmyturn": "${you} can choose ${maxCards} cards",
	"type": "activeplayer",
	"args": "argChooseCards",
	"possibleactions": [
		"chooseCards"
	],
	"transitions": {
		"next": 42,
		"zombiePass": 42
	}
}
					*/
					break;
				case "chooseOptions":
					/*
					{
	"name": "chooseOptions",
	"description": "${actplayer} can choose an option",
	"descriptionmyturn": "${you} can choose an option",
	"type": "activeplayer",
	"args": "argChooseOptions",
	"possibleactions": [
		"chooseOptions"
	],
	"transitions": {
		"next": 42,
		"zombiePass": 42
	}
}
					*/
					break;
				case "executeLocation":
					/*
					{
	"name": "executeLocation",
	"description": "${actplayer} can execute location effects",
	"descriptionmyturn": "${you} can execute location effects",
	"type": "activeplayer",
	"args": "argExecuteLocation",
	"possibleactions": [
		"executeLocation",
		"refuse"
	],
	"transitions": {
		"next": 42,
		"refuse": 42,
		"zombiePass": 42
	}
}
					*/
					break;
				case "playCardSecondOption":
					/*
					{
	"name": "playCardSecondOption",
	"description": "${actplayer} can play an additional option of visitor card",
	"descriptionmyturn": "${you} can play an additional option of visitor card",
	"type": "activeplayer",
	"args": "argPlayCardSecondOption",
	"possibleactions": [
		"playCardSecondOption",
		"refuse"
	],
	"transitions": {
		"next": 42,
		"zombiePass": 42
	}
}
					*/
					break;
				case "takeActionPrev":
					/*
					{
	"name": "takeActionPrev",
	"description": "${actplayer} can take any action in a previous season",
	"descriptionmyturn": "${you} can take any action in a previous season",
	"type": "activeplayer",
	"args": "argTakeActionPrev",
	"possibleactions": [
		"takeActionPrev",
		"cancelAction",
		"refuse"
	],
	"transitions": {
		"next": 42,
		"same": 41,
		"playBlueCard": 73,
		"zombiePass": 42
	}
}
					*/
					break;
				case "allBuild":
					/*
					{
	"name": "allBuild",
	"description": "Players can build a structure",
	"descriptionmyturn": "${you} can build a structure",
	"type": "multipleactiveplayer",
	"args": "argAllBuild",
	"possibleactions": [
		"allBuild",
		"refuse"
	],
	"transitions": {
		"next": 89,
		"zombiePass": 89
	}
}
					*/
					break;
				case "allChoose":
					/*
					{
	"name": "allChoose",
	"description": "Players can choose",
	"descriptionmyturn": "${you} can choose",
	"description621": "Players can choose: lose ${token_vp1} to gain ${token_lira3}",
	"description621myturn": "${you} can choose: lose ${token_vp1} to gain ${token_lira3}",
	"description631": "Players can choose: give ${token_lira2} to ${other_player_name}, or ${other_player_name} gains ${token_vp1}",
	"description631myturn": "${you} can choose: give ${token_lira2} to ${other_player_name}, or ${other_player_name} gains ${token_vp1}",
	"description825": "Players can choose: retrieve grande worker ${token_workerGrande} and ${other_player_name} gains ${token_vp1}",
	"description825myturn": "${you} can choose: retrieve grande worker ${token_workerGrande} and ${other_player_name} gains ${token_vp1}",
	"description838": "Players can choose: pay ${token_lira1} to train a worker and ${other_player_name} gains ${token_vp1}",
	"description838myturn": "${you} can choose: pay ${token_lira1} to train a worker and ${other_player_name} gains ${token_vp1}",
	"type": "multipleactiveplayer",
	"args": "argAllChoose",
	"possibleactions": [
		"allChoose",
		"refuse"
	],
	"transitions": {
		"next": 89,
		"zombiePass": 89
	}
}
					*/
					break;
				case "allPlant":
					/*
					{
	"name": "allPlant",
	"description": "Players can plant a vine card",
	"descriptionmyturn": "${you} can plant a vine card",
	"type": "multipleactiveplayer",
	"args": "argAllPlant",
	"possibleactions": [
		"allPlant",
		"refuse"
	],
	"transitions": {
		"next": 89,
		"zombiePass": 89
	}
}
					*/
					break;
				case "allGiveCard":
					/*
					{
	"name": "allGiveCard",
	"description": "Players must give ${token_card} to ${playerNameGive}",
	"descriptionmyturn": "${you} must give ${token_card} to ${playerNameGive}",
	"description623": "All opponents can give up to 3 ${token_card1}/${token_card2} (total) to ${playerNameGive}",
	"description623myturn": "${you} and opponents can give up to 3 ${token_card1}/${token_card2} (total) to ${playerNameGive}",
	"description835": "Players must give ${token_card} to ${playerNameGive}",
	"description835myturn": "${you} must give ${token_card} to ${playerNameGive}",
	"type": "multipleactiveplayer",
	"args": "argAllGiveCard",
	"possibleactions": [
		"allGiveCard",
		"refuse"
	],
	"transitions": {
		"next": 89,
		"zombiePass": 89
	}
}
					*/
					break;
				case "discardVines":
					/*
					{
	"name": "discardVines",
	"description": "${actplayer} must discard ${minCards} ${token_card}",
	"descriptionmyturn": "${you} must discard ${minCards} ${token_card}",
	"type": "activeplayer",
	"args": "argDiscardVines",
	"possibleactions": [
		"discardVines"
	],
	"transitions": {
		"next": 42,
		"zombiePass": 42
	}
}
					*/
					break;
				case "allActionEnd":
					/*
					{
	"name": "allActionEnd",
	"description": "",
	"type": "game",
	"action": "stAllActionEnd",
	"updateGameProgression": true,
	"transitions": {
		"next": 42
	}
}
					*/
					break;
				case "endTurn":
					/*
					{
	"name": "endTurn",
	"description": "",
	"type": "game",
	"action": "stEndTurn",
	"updateGameProgression": true,
	"transitions": {
		"next": 20,
		"discard": 91,
		"end": 99
	}
}
					*/
					break;
				case "discardCards":
					/*
					{
	"name": "discardCards",
	"description": "Players must discard down to 7 cards",
	"descriptionmyturn": "${you} must discard down to 7 cards",
	"type": "multipleactiveplayer",
	"args": "argDiscardCards",
	"possibleactions": [
		"discardCards"
	],
	"transitions": {
		"next": 20,
		"zombiePass": 20
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
export default viticulture;
