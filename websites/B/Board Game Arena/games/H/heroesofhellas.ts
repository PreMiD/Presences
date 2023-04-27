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

const heroesofhellas: GamePresence = {
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
				case "newHand":
					/*
					{
	"name": "newHand",
	"description": "",
	"type": "game",
	"action": "stNewHand",
	"transitions": {
		"firstTurn": 5
	}
}
					*/
					break;
				case "firstTurnChoice":
					/*
					{
	"name": "firstTurnChoice",
	"description": "${actplayer} must place hero disc on a monster ${choice}",
	"descriptionmyturn": "${you} must place hero disc on a monster ${choice}",
	"type": "activeplayer",
	"args": "argFirstTurnChoice",
	"possibleactions": [
		"placeDisc",
		"moveDisc",
		"pass"
	],
	"transitions": {
		"chooseFirstMonster": 6,
		"pass": 6
	}
}
					*/
					break;
				case "FirstTurnNext":
					/*
					{
	"name": "FirstTurnNext",
	"description": "",
	"type": "game",
	"action": "stFirstTurnNext",
	"transitions": {
		"firstTurnNext": 5,
		"endFirstTurn": 8
	}
}
					*/
					break;
				case "playerTurn":
					/*
					{
	"name": "playerTurn",
	"description": "${actplayer} must do an Action",
	"descriptionmyturn": "${you} must do an Action",
	"type": "activeplayer",
	"args": "argPlayerTurn",
	"possibleactions": [
		"fightMonster",
		"drawCard",
		"moveDisc",
		"discardCard",
		"giveCards",
		"consultOracle",
		"resign"
	],
	"transitions": {
		"fightMonster": 9,
		"drawCard": 31,
		"discardCard": 9,
		"changePlayer": 41,
		"consultOracle": 51,
		"endGame": 99
	}
}
					*/
					break;
				case "OtherTurnNext":
					/*
					{
	"name": "OtherTurnNext",
	"description": "",
	"type": "game",
	"action": "stOtherTurnNext",
	"transitions": {
		"otherTurnNext": 8,
		"endGame": 99
	}
}
					*/
					break;
				case "drawCard":
					/*
					{
	"name": "drawCard",
	"description": "${actplayer} must draw Cards and then discard",
	"descriptionmyturn": "${you} must draw Cards and then discard",
	"args": "argDrawCard",
	"type": "activeplayer",
	"possibleactions": [
		"drawCard",
		"discardCard",
		"discardCardAfterDraw"
	],
	"transitions": {
		"drawCard": 31,
		"discardCard": 9
	}
}
					*/
					break;
				case "changePlayer":
					/*
					{
	"name": "changePlayer",
	"description": "",
	"type": "game",
	"action": "stChangePlayer",
	"transitions": {
		"givenDiscard": 42
	}
}
					*/
					break;
				case "givenDiscard":
					/*
					{
	"name": "givenDiscard",
	"description": "${actplayer} must discard at least ${nb}",
	"descriptionmyturn": "${you} must discard at least ${nb}",
	"args": "argGivenDiscard",
	"type": "activeplayer",
	"possibleactions": [
		"discardCardAfterGiven"
	],
	"transitions": {
		"changePlayerBack": 43
	}
}
					*/
					break;
				case "changePlayerBack":
					/*
					{
	"name": "changePlayerBack",
	"description": "",
	"type": "game",
	"action": "stChangePlayerBack",
	"transitions": {
		"nextPlayer": 8
	}
}
					*/
					break;
				case "consultOracle":
					/*
					{
	"name": "consultOracle",
	"description": "${actplayer} must discard a Card",
	"descriptionmyturn": "${you} must discard a Card",
	"type": "activeplayer",
	"args": "argConsultOracle",
	"possibleactions": [
		"discardCardOracle",
		"resign"
	],
	"transitions": {
		"discardCard": 52,
		"nextPlayer": 6,
		"endGame": 99
	}
}
					*/
					break;
				case "replaceCardOracle":
					/*
					{
	"name": "replaceCardOracle",
	"description": "${actplayer} must return a Card to the Action Deck",
	"descriptionmyturn": "${you} must return a Card to the Action Deck",
	"type": "activeplayer",
	"args": "argReplaceCardOracle",
	"possibleactions": [
		"returnCardOracle",
		"resign"
	],
	"transitions": {
		"oracleReturnCard": 52,
		"nextPlayer": 6,
		"endGame": 99
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
export default heroesofhellas;
