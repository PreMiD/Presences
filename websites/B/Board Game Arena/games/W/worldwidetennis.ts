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

const worldwidetennis: GamePresence = {
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
		"firstServe": 5
	}
}
					*/
					break;
				case "serverTurn":
					/*
					{
	"name": "serverTurn",
	"description": "${actplayer} must play a serve card",
	"descriptionmyturn": "${you} must play a serve card",
	"type": "activeplayer",
	"possibleactions": [
		"chooseServe"
	],
	"transitions": {
		"servePoint": 5,
		"nextReplacement": 9,
		"nextPoint": 20,
		"noAdPoint": 20,
		"tieBreak": 20,
		"changeEnds": 20,
		"endGame": 99
	}
}
					*/
					break;
				case "playerMove":
					/*
					{
	"name": "playerMove",
	"description": "${actplayer} can move or give up point",
	"descriptionmyturn": "${you} can move or give up point",
	"type": "activeplayer",
	"possibleactions": [
		"giveUpPoint",
		"movePlayerToBall",
		"useOverheadSmash"
	],
	"transitions": {
		"nextChooseCard": 7,
		"nextReplacement": 9,
		"nextPoint": 20,
		"noAdPoint": 20,
		"tieBreak": 20,
		"changeEnds": 20,
		"endGame": 99
	}
}
					*/
					break;
				case "chooseCard":
					/*
					{
	"name": "chooseCard",
	"description": "${actplayer} must play a card",
	"descriptionmyturn": "${you} must play a card",
	"type": "activeplayer",
	"possibleactions": [
		"giveUpPoint",
		"playCard"
	],
	"transitions": {
		"nextReplacement": 9,
		"nextPoint": 20,
		"tieBreak": 20,
		"changeEnds": 20,
		"endGame": 99
	}
}
					*/
					break;
				case "chooseSide":
					/*
					{
	"name": "chooseSide",
	"description": "${actplayer} must choose a side",
	"descriptionmyturn": "${you}  must choose a side",
	"type": "activeplayer",
	"args": "argChooseSide",
	"possibleactions": [
		"chooseSide"
	],
	"transitions": {
		"nextPoint": 35
	}
}
					*/
					break;
				case "playerReplacement":
					/*
					{
	"name": "playerReplacement",
	"description": "${actplayer} can move",
	"descriptionmyturn": "${you} can move",
	"type": "activeplayer",
	"args": "argPlayerReplacement",
	"possibleactions": [
		"stayHere",
		"rushToTheNet",
		"replaceBack"
	],
	"transitions": {
		"nextShot": 10
	}
}
					*/
					break;
				case "NextShot":
					/*
					{
	"name": "NextShot",
	"description": "",
	"type": "game",
	"action": "stNextShot",
	"transitions": {
		"nextMove": 6,
		"nextCard": 7,
		"end": 5
	}
}
					*/
					break;
				case "NextPoint":
					/*
					{
	"name": "NextPoint",
	"description": "",
	"type": "game",
	"action": "stNextPoint",
	"transitions": {
		"checkDecks": 35,
		"changeEnds": 30
	}
}
					*/
					break;
				case "changeEnds":
					/*
					{
	"name": "changeEnds",
	"description": "${actplayer} can recover, focus and then elaborate a strategy",
	"descriptionmyturn": "${you}  can recover, focus and then elaborate a strategy",
	"type": "multipleactiveplayer",
	"args": "argChangeEnds",
	"action": "stChangeEnds",
	"possibleactions": [
		"getStars",
		"getCard",
		"getDiscard",
		"changeEnds"
	],
	"transitions": {
		"changeEnds": 30,
		"checkDecks": 35
	}
}
					*/
					break;
				case "checkDecks":
					/*
					{
	"name": "checkDecks",
	"description": "",
	"type": "game",
	"action": "stCheckDecks",
	"transitions": {
		"multi_hand_above_12": 36,
		"hand_above_12": 40,
		"nextPoint": 5,
		"chooseSide": 8
	}
}
					*/
					break;
				case "multiDiscardExtraCards":
					/*
					{
	"name": "multiDiscardExtraCards",
	"description": "Both players must discard some cards",
	"descriptionmyturn": "Both players must discard some cards",
	"type": "multipleactiveplayer",
	"action": "stMultiDiscardExtraCards",
	"possibleactions": [
		"discardCards"
	],
	"transitions": {
		"checkDecks": 35
	}
}
					*/
					break;
				case "discardExtraCards":
					/*
					{
	"name": "discardExtraCards",
	"description": "${actplayer} must discard some cards",
	"descriptionmyturn": "${you} must discard some cards",
	"type": "activeplayer",
	"possibleactions": [
		"discardCards"
	],
	"transitions": {
		"checkDecks": 35
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
export default worldwidetennis;
