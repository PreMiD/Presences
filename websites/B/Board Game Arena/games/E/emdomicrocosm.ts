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

const emdomicrocosm: GamePresence = {
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
				case "gamePrepare":
					/*
					{
	"name": "gamePrepare",
	"description": "",
	"type": "manager",
	"action": "stGamePrepare",
	"transitions": {
		"": 20
	}
}
					*/
					break;
				case "takeCard":
					/*
					{
	"name": "takeCard",
	"description": "${actplayer} must take a card from the supply or from the top of the Domain deck",
	"descriptionmyturn": "${you} must take a card from the supply or from the top of the Domain deck",
	"type": "activeplayer",
	"possibleactions": [
		"takeCard",
		"takeTopCard",
		"playPreDraw"
	],
	"transitions": {
		"finishTakeCard": 30,
		"finishPreDraw": 20
	}
}
					*/
					break;
				case "chooseAction":
					/*
					{
	"name": "chooseAction",
	"description": "${actplayer} must choose an action",
	"descriptionmyturn": "${you} must choose an action",
	"type": "activeplayer",
	"possibleactions": [
		"playCard",
		"returnCards",
		"finishReturnCards"
	],
	"transitions": {
		"nextPlayer": 50,
		"anotherAction": 30,
		"boostWarfare": 31,
		"researchAgain": 32,
		"boostColonize": 33,
		"forceDiscard": 34,
		"takeDiscard": 35
	}
}
					*/
					break;
				case "boostWarfare":
					/*
					{
	"name": "boostWarfare",
	"description": "${actplayer} may reveal icons to attack the planet",
	"descriptionmyturn": "${you} may reveal icons to attack the planet",
	"type": "activeplayer",
	"args": "argBoostWarfare",
	"action": "stBoostWarfare",
	"possibleactions": [
		"finishBoost",
		"skipFinishBoost"
	],
	"transitions": {
		"nextPlayer": 50
	}
}
					*/
					break;
				case "researchAgain":
					/*
					{
	"name": "researchAgain",
	"description": "${actplayer} may reveal icons to research again",
	"descriptionmyturn": "${you} may reveal icons to research again",
	"type": "activeplayer",
	"args": "argBoostResearch",
	"possibleactions": [
		"finishBoost",
		"skipFinishBoost"
	],
	"transitions": {
		"nextPlayer": 50
	}
}
					*/
					break;
				case "boostColonize":
					/*
					{
	"name": "boostColonize",
	"description": "${actplayer} may reveal icons to colonize the planet",
	"descriptionmyturn": "${you} may reveal icons to colonize the planet",
	"type": "activeplayer",
	"args": "argBoostColonize",
	"action": "stBoostColonize",
	"possibleactions": [
		"finishBoost",
		"skipFinishBoost"
	],
	"transitions": {
		"nextPlayer": 50
	}
}
					*/
					break;
				case "forceDiscard":
					/*
					{
	"name": "forceDiscard",
	"description": "${actplayer} must choose a card for the opponent to discard",
	"descriptionmyturn": "${you} must choose a card for the opponent to discard",
	"type": "activeplayer",
	"possibleactions": [
		"finishChoice"
	],
	"transitions": {
		"nextPlayer": 50
	}
}
					*/
					break;
				case "takeDiscard":
					/*
					{
	"name": "takeDiscard",
	"description": "${actplayer} may swap Survey Mission with a card in the opponent's discard",
	"descriptionmyturn": "${you} may swap Survey Mission with a card in the opponent's discard",
	"type": "activeplayer",
	"possibleactions": [
		"finishTakeDiscard"
	],
	"transitions": {
		"nextPlayer": 50
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
	"updateGameProgression": true,
	"transitions": {
		"calcScores": 60,
		"nextPlayer": 20
	}
}
					*/
					break;
				case "calcScores":
					/*
					{
	"name": "calcScores",
	"description": "",
	"type": "game",
	"action": "stCalcScores",
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
export default emdomicrocosm;
