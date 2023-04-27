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

const tashkalar: GamePresence = {
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
		"": 5
	}
}
					*/
					break;
				case "randomDecks":
					/*
					{
	"name": "randomDecks",
	"description": "",
	"type": "game",
	"action": "stRandomDecks",
	"transitions": {
		"beginGame": 20,
		"chooseDecks": 10,
		"initialPiecesDuel": 16,
		"initialPiecesMelee": 17
	}
}
					*/
					break;
				case "deckChoice":
					/*
					{
	"name": "deckChoice",
	"description": "${actplayer} must choose a school",
	"descriptionmyturn": "${you} must choose a school",
	"type": "activeplayer",
	"args": "argDeckChoice",
	"possibleactions": [
		"chooseDeck"
	],
	"transitions": {
		"chooseDeck": 15,
		"zombiePass": 99
	}
}
					*/
					break;
				case "nextDeck":
					/*
					{
	"name": "nextDeck",
	"description": "",
	"type": "game",
	"action": "stNextDeck",
	"transitions": {
		"beginGame": 20,
		"nextDeck": 10,
		"initialPiecesDuel": 16,
		"initialPiecesMelee": 17
	}
}
					*/
					break;
				case "initialPiecesDuel":
					/*
					{
	"name": "initialPiecesDuel",
	"description": "${actplayer} must place the initial pieces",
	"descriptionmyturn": "${you} must place one of your pieces on a square marked <div id=\"DMmark\"></div>",
	"type": "activeplayer",
	"possibleactions": [
		"placeInitialPieces"
	],
	"transitions": {
		"placeInitialPieces": 19,
		"zombiePass": 20
	}
}
					*/
					break;
				case "initialPiecesMelee":
					/*
					{
	"name": "initialPiecesMelee",
	"description": "${actplayer} must place the initial pieces",
	"descriptionmyturn": "${you} must place a ${color} piece on a square adjacent to a <div id=\"DMMmark\"></div> symbol",
	"type": "activeplayer",
	"args": "argMeleeInitial",
	"possibleactions": [
		"placeInitialPieces",
		"placeLastPiece"
	],
	"transitions": {
		"placeInitialPieces": 17,
		"placeLastPiece": 19,
		"zombiePass": 20
	}
}
					*/
					break;
				case "setFirstPlayer":
					/*
					{
	"name": "setFirstPlayer",
	"description": "",
	"type": "game",
	"action": "stSetFirstPlayer",
	"transitions": {
		"": 20
	}
}
					*/
					break;
				case "turnBegin":
					/*
					{
	"name": "turnBegin",
	"description": "",
	"type": "game",
	"action": "stTurnBegin",
	"transitions": {
		"firstAction": 21
	}
}
					*/
					break;
				case "actionChoice":
					/*
					{
	"name": "actionChoice",
	"description": "${actplayer} must play a piece or select a card (${actions} actions left)",
	"descriptionmyturn": "${you} must play a piece or select a card (${actions} actions left)",
	"type": "activeplayer",
	"args": "argActionChoice",
	"updateGameProgression": true,
	"possibleactions": [
		"playPiece",
		"playCard",
		"discardCard",
		"playFlare",
		"playFrozen",
		"playWarp",
		"pieceShortage",
		"browseHistory"
	],
	"transitions": {
		"playPiece": 70,
		"playCard": 40,
		"chooseColorImpro": 36,
		"chooseColorLegend": 38,
		"discardCard": 70,
		"chooseColorFlare": 28,
		"playFlare": 30,
		"playFrozen": 40,
		"playWarp": 40,
		"pieceShortage": 22,
		"browseHistory": 95,
		"zombiePass": 70
	}
}
					*/
					break;
				case "pickPiece":
					/*
					{
	"name": "pickPiece",
	"description": "${actplayer} has no pieces left and must pick one up",
	"descriptionmyturn": "${you} have no pieces left and must pick one up",
	"type": "activeplayer",
	"args": "argPickPiece",
	"possibleactions": [
		"playPiece",
		"playCard",
		"cancelPick",
		"browseHistory"
	],
	"transitions": {
		"playPiece": 70,
		"playCard": 40,
		"chooseColorLegend": 38,
		"cancelPick": 21,
		"browseHistory": 95,
		"zombiePass": 70
	}
}
					*/
					break;
				case "chooseColorFlare":
					/*
					{
	"name": "chooseColorFlare",
	"description": "${actplayer} must choose against which color the flare is invoked",
	"descriptionmyturn": "${you} must choose against which color the flare is invoked",
	"type": "activeplayer",
	"args": "argChooseColorFlare",
	"possibleactions": [
		"colorChosen",
		"browseHistory"
	],
	"transitions": {
		"colorChosen": 30,
		"browseHistory": 95,
		"zombiePass": 50
	}
}
					*/
					break;
				case "initFlare":
					/*
					{
	"name": "initFlare",
	"description": "",
	"type": "game",
	"action": "stInitFlare",
	"transitions": {
		"flareInitiated": 50,
		"flaresDone": 21,
		"flaresTurnDoneHF": 75,
		"flaresTurnDoneDM": 76
	}
}
					*/
					break;
				case "chooseColorImpro":
					/*
					{
	"name": "chooseColorImpro",
	"description": "${actplayer} must choose a color for improvised summoning",
	"descriptionmyturn": "${you} must choose a color for improvised summoning",
	"type": "activeplayer",
	"args": "argChooseColorImpro",
	"possibleactions": [
		"playPiece",
		"playCard",
		"cancelPick",
		"browseHistory"
	],
	"transitions": {
		"playCard": 40,
		"chooseColorLegend": 38,
		"pieceShortage": 22,
		"browseHistory": 95,
		"zombiePass": 70
	}
}
					*/
					break;
				case "chooseColorLegend":
					/*
					{
	"name": "chooseColorLegend",
	"description": "${actplayer} must choose a color to score the legend in",
	"descriptionmyturn": "${you} must choose a color to score your legend in",
	"type": "activeplayer",
	"args": "argChooseColorLegend",
	"possibleactions": [
		"colorChosen",
		"browseHistory"
	],
	"transitions": {
		"colorChosen": 40,
		"autoEffect": 50,
		"browseHistory": 95,
		"zombiePass": 70
	}
}
					*/
					break;
				case "initEffect":
					/*
					{
	"name": "initEffect",
	"description": "",
	"type": "game",
	"action": "stInitEffect",
	"transitions": {
		"effectsInitiated": 50
	}
}
					*/
					break;
				case "cardChoice":
					/*
					{
	"name": "cardChoice",
	"description": "${actplayer} must choose a card",
	"descriptionmyturn": "${you} must choose a card",
	"type": "activeplayer",
	"args": "argCardChoice",
	"possibleactions": [
		"effectPlayed",
		"skip",
		"browseHistory"
	],
	"transitions": {
		"effectPlayed": 50,
		"skip": 50,
		"browseHistory": 95,
		"zombiePass": 50
	}
}
					*/
					break;
				case "squareChoice":
					/*
					{
	"name": "squareChoice",
	"description": "${actplayer} must choose a square",
	"descriptionmyturn": "${you} must choose a square",
	"type": "activeplayer",
	"args": "argPlaceInput",
	"possibleactions": [
		"effectPlayed",
		"skip",
		"browseHistory"
	],
	"transitions": {
		"effectPlayed": 50,
		"skip": 50,
		"browseHistory": 95,
		"zombiePass": 50
	}
}
					*/
					break;
				case "pieceChoice":
					/*
					{
	"name": "pieceChoice",
	"description": "${actplayer} must choose a square",
	"descriptionmyturn": "${you} must choose a square",
	"type": "activeplayer",
	"args": "argEffectInput",
	"possibleactions": [
		"effectPlayed",
		"skip",
		"browseHistory"
	],
	"transitions": {
		"effectPlayed": 50,
		"skip": 50,
		"browseHistory": 95,
		"zombiePass": 50
	}
}
					*/
					break;
				case "moveChoice":
					/*
					{
	"name": "moveChoice",
	"description": "${actplayer} must move a piece",
	"descriptionmyturn": "${you} must move a piece",
	"type": "activeplayer",
	"args": "argEffectInput",
	"possibleactions": [
		"effectPlayed",
		"skip",
		"browseHistory"
	],
	"transitions": {
		"effectPlayed": 50,
		"skip": 50,
		"browseHistory": 95,
		"zombiePass": 50
	}
}
					*/
					break;
				case "directionChoice":
					/*
					{
	"name": "directionChoice",
	"description": "${actplayer} must choose a direction",
	"descriptionmyturn": "${you} must choose a direction",
	"type": "activeplayer",
	"args": "argEffectInput",
	"possibleactions": [
		"effectPlayed",
		"skip",
		"browseHistory"
	],
	"transitions": {
		"effectPlayed": 50,
		"skip": 50,
		"browseHistory": 95,
		"zombiePass": 50
	}
}
					*/
					break;
				case "orEffects2":
					/*
					{
	"name": "orEffects2",
	"description": "${actplayer} must choose an effect",
	"descriptionmyturn": "${you} must choose an effect",
	"type": "activeplayer",
	"args": "argEffectInput",
	"possibleactions": [
		"effectPlayed",
		"skip",
		"browseHistory"
	],
	"transitions": {
		"effectPlayed": 50,
		"skip": 50,
		"browseHistory": 95,
		"zombiePass": 50
	}
}
					*/
					break;
				case "orEffects3":
					/*
					{
	"name": "orEffects3",
	"description": "${actplayer} must choose an effect",
	"descriptionmyturn": "${you} must choose an effect",
	"type": "activeplayer",
	"args": "argEffectInput",
	"possibleactions": [
		"effectPlayed",
		"skip",
		"browseHistory"
	],
	"transitions": {
		"effectPlayed": 50,
		"skip": 50,
		"browseHistory": 95,
		"zombiePass": 50
	}
}
					*/
					break;
				case "chooseOption":
					/*
					{
	"name": "chooseOption",
	"description": "${questionhe}",
	"descriptionmyturn": "${questionyou}",
	"type": "activeplayer",
	"args": "argOptions",
	"possibleactions": [
		"effectPlayed",
		"skip",
		"browseHistory"
	],
	"transitions": {
		"effectPlayed": 50,
		"skip": 50,
		"browseHistory": 95,
		"zombiePass": 50
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
		"effectCard": 41,
		"effectSquare": 42,
		"effectPiece": 43,
		"effectMovePiece": 44,
		"effectDirection": 45,
		"orEffects2": 46,
		"orEffects3": 47,
		"effectChoose": 48,
		"autoEffect": 50,
		"effectFalse": 50,
		"chooseColorLegend": 38,
		"chooseFrozen": 55,
		"effectsDone": 70,
		"nextFlare": 30
	}
}
					*/
					break;
				case "frozenChoice":
					/*
					{
	"name": "frozenChoice",
	"description": "${actplayer} must choose a frozen effect to put into play",
	"descriptionmyturn": "${you} must choose a frozen effect to put into play",
	"type": "activeplayer",
	"args": "argFrozenChoice",
	"possibleactions": [
		"frozenChosen",
		"browseHistory"
	],
	"transitions": {
		"frozenChosen": 70,
		"browseHistory": 95,
		"zombiePass": 70
	}
}
					*/
					break;
				case "nextAction":
					/*
					{
	"name": "nextAction",
	"description": "",
	"type": "game",
	"action": "stNextAction",
	"transitions": {
		"nextAction": 21,
		"actionsDoneHF": 75,
		"actionsDoneDM": 76
	}
}
					*/
					break;
				case "turnEndHF":
					/*
					{
	"name": "turnEndHF",
	"description": "${actplayer} may invoke a flare or claim a task",
	"descriptionmyturn": "${you} may invoke a flare, claim a task or",
	"type": "activeplayer",
	"args": "argTurnEnd",
	"possibleactions": [
		"playFlare",
		"playFrozen",
		"playWarp",
		"chooseTask",
		"skip",
		"browseHistory"
	],
	"transitions": {
		"chooseColorFlare": 28,
		"playFlare": 30,
		"playFrozen": 40,
		"playWarp": 40,
		"chooseTask": 90,
		"skip": 90,
		"browseHistory": 95,
		"zombiePass": 90
	}
}
					*/
					break;
				case "turnEndDM":
					/*
					{
	"name": "turnEndDM",
	"description": "${actplayer} may invoke a flare",
	"descriptionmyturn": "${you} may invoke a flare or",
	"type": "activeplayer",
	"args": "argTurnEnd",
	"possibleactions": [
		"playFlare",
		"playFrozen",
		"playWarp",
		"skip",
		"chooseColor",
		"browseHistory"
	],
	"transitions": {
		"chooseColorFlare": 28,
		"playFlare": 30,
		"playFrozen": 40,
		"playWarp": 40,
		"skip": 90,
		"chooseColor": 88,
		"browseHistory": 95,
		"zombiePass": 90
	}
}
					*/
					break;
				case "chooseColor":
					/*
					{
	"name": "chooseColor",
	"description": "${actplayer} must choose a color to score the unpaired pieces in",
	"descriptionmyturn": "${you} must choose a color to score your unpaired pieces in",
	"type": "activeplayer",
	"args": "argChooseColor",
	"possibleactions": [
		"colorChosen",
		"browseHistory"
	],
	"transitions": {
		"colorChosen": 90,
		"browseHistory": 95,
		"zombiePass": 90
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
	"transitions": {
		"nextPlayer": 20,
		"endGame": 99
	}
}
					*/
					break;
				case "browseHistory":
					/*
					{
	"name": "browseHistory",
	"description": "",
	"type": "game",
	"action": "stBrowseHistory",
	"transitions": {
		"actionChoice": 21,
		"pickPiece": 22,
		"chooseColorFlare": 28,
		"chooseColorImpro": 36,
		"chooseColorLegend": 38,
		"effectCard": 41,
		"effectSquare": 42,
		"effectPiece": 43,
		"effectMovePiece": 44,
		"effectDirection": 45,
		"orEffects2": 46,
		"orEffects3": 47,
		"effectChoose": 48,
		"frozenChoice": 55,
		"turnEndHF": 75,
		"turnEndDM": 76
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
export default tashkalar;
