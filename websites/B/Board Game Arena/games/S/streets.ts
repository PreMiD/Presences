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

const streets: GamePresence = {
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
		"": 2
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
		"setupGrifter": 4,
		"skipGrifter": 6
	}
}
					*/
					break;
				case "stateSetupGrifter":
					/*
					{
	"name": "stateSetupGrifter",
	"description": "${actplayer} is selecting a character",
	"descriptionmyturn": "${you} must choose a character",
	"type": "activeplayer",
	"possibleactions": [
		"actionChooseCharacter"
	],
	"transitions": {
		"done": 6
	}
}
					*/
					break;
				case "statePostSetup":
					/*
					{
	"name": "statePostSetup",
	"description": "Performing setup",
	"type": "game",
	"action": "stPostSetup",
	"transitions": {
		"startGame": 20
	}
}
					*/
					break;
				case "stateUndo":
					/*
					{
	"name": "stateUndo",
	"description": "Processing results",
	"type": "game",
	"transitions": {
		"abandon": 22,
		"place": 24,
		"playerPlace": 51
	}
}
					*/
					break;
				case "stateTurnHandler":
					/*
					{
	"name": "stateTurnHandler",
	"description": "Processing results",
	"type": "game",
	"action": "stTurnHandler",
	"updateGameProgression": true,
	"transitions": {
		"abandon": 22,
		"place": 24,
		"endGame": 90
	}
}
					*/
					break;
				case "stateAbandon":
					/*
					{
	"name": "stateAbandon",
	"description": "${actplayer} is abandoning a Building",
	"descriptionmyturn": "${you} must abandon a Building",
	"type": "activeplayer",
	"possibleactions": [
		"actionAbandon",
		"actionUndo"
	],
	"transitions": {
		"donePlayer": 40,
		"doneGrifter": 55,
		"undo": 9
	}
}
					*/
					break;
				case "statePlaceTile":
					/*
					{
	"name": "statePlaceTile",
	"description": "${actplayer} is placing a Building",
	"descriptionmyturn": "${you} must place a Building",
	"type": "activeplayer",
	"possibleactions": [
		"actionPlaceTile",
		"actionUndo"
	],
	"transitions": {
		"done": 30,
		"undo": 9
	}
}
					*/
					break;
				case "stateStreetScoreHandler":
					/*
					{
	"name": "stateStreetScoreHandler",
	"description": "Processing results",
	"type": "game",
	"action": "stStreetScoreHandler",
	"transitions": {
		"choose": 31,
		"autoChosen": 34,
		"allScoredPlayer": 45,
		"allScoredGrifter": 58
	}
}
					*/
					break;
				case "stateScoreStreet":
					/*
					{
	"name": "stateScoreStreet",
	"description": "${actplayer} is selecting a street to score",
	"descriptionmyturn": "${you} must select a street to score",
	"type": "activeplayer",
	"possibleactions": [
		"actionScoreStreet",
		"actionUndo"
	],
	"transitions": {
		"scoreStreet": 34,
		"undo": 9
	}
}
					*/
					break;
				case "stateBusinessGainHandler":
					/*
					{
	"name": "stateBusinessGainHandler",
	"description": "Processing results",
	"type": "game",
	"action": "stBusinessGainHandler",
	"transitions": {
		"chooseBusiness": 35,
		"grifterChooseBusiness": 36,
		"finishScore": 37
	}
}
					*/
					break;
				case "stateBusinessGain":
					/*
					{
	"name": "stateBusinessGain",
	"description": "${actplayer} is selecting a business token",
	"descriptionmyturn": "${you} must select a business token",
	"type": "activeplayer",
	"args": "argBusinessGain",
	"possibleactions": [
		"actionGainBusiness"
	],
	"transitions": {
		"done": 34
	}
}
					*/
					break;
				case "stateGrifterBusinessGain":
					/*
					{
	"name": "stateGrifterBusinessGain",
	"description": "${actplayer} is selecting a business token for the Grifter",
	"descriptionmyturn": "${you} must select a business token for the Grifter",
	"type": "activeplayer",
	"args": "argGrifterBusinessGain",
	"possibleactions": [
		"actionGainBusiness",
		"actionUndo"
	],
	"transitions": {
		"done": 34,
		"undo": 9
	}
}
					*/
					break;
				case "statePreScore":
					/*
					{
	"name": "statePreScore",
	"description": "Processing results",
	"type": "game",
	"action": "stPreScore",
	"transitions": {
		"scoreEntrepreneur": 38,
		"justScore": 39
	}
}
					*/
					break;
				case "stateEntrepreneurScore":
					/*
					{
	"name": "stateEntrepreneurScore",
	"description": "${actplayer} is using the Entrepreneur ability",
	"descriptionmyturn": "${you} must select a Building for the Entrepreneur ability",
	"type": "activeplayer",
	"args": "argEntrepreneurScore",
	"possibleactions": [
		"actionScoreTile"
	],
	"transitions": {
		"finishScoring": 39
	}
}
					*/
					break;
				case "stateActuallyScore":
					/*
					{
	"name": "stateActuallyScore",
	"description": "Processing results",
	"type": "game",
	"action": "stActuallyScore",
	"transitions": {
		"donePlayer": 40,
		"doneGrifter": 55
	}
}
					*/
					break;
				case "stateMoveHandler":
					/*
					{
	"name": "stateMoveHandler",
	"description": "Processing results",
	"type": "game",
	"action": "stMoveHandler",
	"transitions": {
		"moveChoice": 41,
		"done": 30,
		"doneAbandon": 24
	}
}
					*/
					break;
				case "stateMovePeople":
					/*
					{
	"name": "stateMovePeople",
	"description": "${actplayer} is moving people",
	"descriptionmyturn": "${you} must move people",
	"type": "activeplayer",
	"args": "argMovePeople",
	"possibleactions": [
		"actionMovePeople",
		"actionUndo"
	],
	"transitions": {
		"done": 40,
		"undo": 9
	}
}
					*/
					break;
				case "stateEndTurn":
					/*
					{
	"name": "stateEndTurn",
	"description": "Processing results",
	"type": "game",
	"action": "stEndTurn",
	"transitions": {
		"abandonAnother": 22,
		"placeAnother": 24,
		"doneSolo": 50,
		"doneMulti": 20
	}
}
					*/
					break;
				case "stateGrifterPlaceHandler":
					/*
					{
	"name": "stateGrifterPlaceHandler",
	"description": "Processing results",
	"type": "game",
	"action": "stGrifterPlaceHandler",
	"transitions": {
		"playerPlace": 51,
		"autoPlaced": 30
	}
}
					*/
					break;
				case "stateGrifterPlaceTile":
					/*
					{
	"name": "stateGrifterPlaceTile",
	"description": "${actplayer} is placing a Building for the Grifter",
	"descriptionmyturn": "${you} must place the Grifter's Building",
	"type": "activeplayer",
	"args": "argGrifterPlaceTile",
	"possibleactions": [
		"actionPlaceTile",
		"actionUndo"
	],
	"transitions": {
		"done": 30,
		"undo": 9
	}
}
					*/
					break;
				case "stateGrifterMoveHandler":
					/*
					{
	"name": "stateGrifterMoveHandler",
	"description": "Processing results",
	"type": "game",
	"action": "stGrifterMoveHandler",
	"transitions": {
		"moveChoice": 56,
		"done": 30
	}
}
					*/
					break;
				case "stateGrifterMovePeople":
					/*
					{
	"name": "stateGrifterMovePeople",
	"description": "${actplayer} is moving people for the Grifter",
	"descriptionmyturn": "${you} must move people for the Grifter",
	"type": "activeplayer",
	"args": "argGrifterMovePeople",
	"possibleactions": [
		"actionMovePeople",
		"actionUndo"
	],
	"transitions": {
		"done": 55,
		"undo": 9
	}
}
					*/
					break;
				case "stateGrifterEndTurn":
					/*
					{
	"name": "stateGrifterEndTurn",
	"description": "Processing results",
	"type": "game",
	"action": "stGrifterEndTurn",
	"transitions": {
		"done": 20
	}
}
					*/
					break;
				case "stateScoring":
					/*
					{
	"name": "stateScoring",
	"description": "Processing results",
	"type": "game",
	"action": "stScoring",
	"updateGameProgression": true,
	"transitions": {
		"allDone": 99
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
export default streets;
