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

const coupcitystate: GamePresence = {
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
				case "roundBegin":
					/*
					{
	"name": "roundBegin",
	"description": "",
	"type": "game",
	"action": "stRoundBegin",
	"updateGameProgression": true,
	"transitions": {
		"": 3
	}
}
					*/
					break;
				case "playerBegin":
					/*
					{
	"name": "playerBegin",
	"description": "${actplayer} must take an action.",
	"descriptionmyturn": "${you} must take an action.",
	"type": "activeplayer",
	"action": "stPlayerBegin",
	"possibleactions": [
		"act"
	],
	"transitions": {
		"ask": 10,
		"execute": 19,
		"zombiePass": 97
	}
}
					*/
					break;
				case "ask":
					/*
					{
	"name": "ask",
	"description": "Wait until all players have responded.",
	"descriptionmyturn": "Stop ${player_name2}'s ${action_name}?",
	"type": "multipleactiveplayer",
	"args": "argAsk",
	"action": "stAsk",
	"possibleactions": [
		"actionBlock",
		"actionNo",
		"actionYes"
	],
	"transitions": {
		"askBlock": 11,
		"yes": 15,
		"yesAll": 16,
		"execute": 19,
		"zombiePass": 19
	}
}
					*/
					break;
				case "askBlock":
					/*
					{
	"name": "askBlock",
	"description": "Wait until all players have responded.",
	"descriptionmyturn": "Stop ${player_name2}'s block?",
	"type": "multipleactiveplayer",
	"args": "argAsk",
	"action": "stAsk",
	"possibleactions": [
		"actionNo",
		"actionYes"
	],
	"transitions": {
		"yes": 17,
		"execute": 19,
		"zombiePass": 19
	}
}
					*/
					break;
				case "askChooseCard":
					/*
					{
	"name": "askChooseCard",
	"description": "${actplayer} must choose a card: ${reason} (${detail}).",
	"descriptionmyturn": "${you} must choose a card: ${reason} (${detail}).",
	"type": "activeplayer",
	"args": "argChooseCard",
	"possibleactions": [
		"actionChooseCard"
	],
	"transitions": {
		"challenge": 15,
		"challengeBlock": 17,
		"killLoss": 21,
		"killCoup": 20,
		"execute": 19
	}
}
					*/
					break;
				case "askDiscard":
					/*
					{
	"name": "askDiscard",
	"description": "${actplayer} must discard ${count} cards.",
	"descriptionmyturn": "${you} must discard ${count} cards.",
	"type": "activeplayer",
	"args": "argDiscard",
	"possibleactions": [
		"actionDiscard"
	],
	"transitions": {
		"": 97
	}
}
					*/
					break;
				case "askExamine":
					/*
					{
	"name": "askExamine",
	"description": "${actplayer} must act on ${player_name2}'s card.",
	"descriptionmyturn": "${you} must act on ${player_name2}'s card.",
	"type": "activeplayer",
	"args": "argExamine",
	"action": "stExamine",
	"possibleactions": [
		"actionExamineKeep",
		"actionExamineExchange"
	],
	"transitions": {
		"": 97
	}
}
					*/
					break;
				case "challenge":
					/*
					{
	"name": "challenge",
	"description": "",
	"type": "game",
	"action": "stChallenge",
	"transitions": {
		"askChooseCard": 12,
		"killLoss": 21
	}
}
					*/
					break;
				case "challengeAll":
					/*
					{
	"name": "challengeAll",
	"description": "",
	"type": "game",
	"action": "stChallengeAll",
	"transitions": {
		"killLoss": 21
	}
}
					*/
					break;
				case "challengeBlock":
					/*
					{
	"name": "challengeBlock",
	"description": "",
	"type": "game",
	"action": "stChallengeBlock",
	"transitions": {
		"askChooseCard": 12,
		"killLoss": 21
	}
}
					*/
					break;
				case "execute":
					/*
					{
	"name": "execute",
	"description": "",
	"type": "game",
	"action": "stExecute",
	"transitions": {
		"playerEnd": 97,
		"killCoup": 20,
		"askChooseCard": 12,
		"askDiscard": 13,
		"askExamine": 14
	}
}
					*/
					break;
				case "killCoup":
					/*
					{
	"name": "killCoup",
	"description": "",
	"type": "game",
	"action": "stKillCoup",
	"transitions": {
		"askChooseCard": 12,
		"playerEnd": 97
	}
}
					*/
					break;
				case "killLoss":
					/*
					{
	"name": "killLoss",
	"description": "",
	"type": "game",
	"action": "stKillLoss",
	"transitions": {
		"askChooseCard": 12,
		"secondChance": 22,
		"execute": 19,
		"roundEnd": 98
	}
}
					*/
					break;
				case "secondChance":
					/*
					{
	"name": "secondChance",
	"description": "Wait until all players have responded.",
	"descriptionmyturn": "Stop ${player_name2}'s ${action_name}?",
	"type": "multipleactiveplayer",
	"args": "argAsk",
	"possibleactions": [
		"actionBlock",
		"actionNo"
	],
	"transitions": {
		"askBlock": 11,
		"execute": 19,
		"zombiePass": 19
	}
}
					*/
					break;
				case "playerEnd":
					/*
					{
	"name": "playerEnd",
	"description": "",
	"type": "game",
	"action": "stPlayerEnd",
	"updateGameProgression": true,
	"transitions": {
		"playerBegin": 3,
		"roundEnd": 98
	}
}
					*/
					break;
				case "roundEnd":
					/*
					{
	"name": "roundEnd",
	"description": "",
	"type": "game",
	"action": "stRoundEnd",
	"updateGameProgression": true,
	"transitions": {
		"roundBegin": 2,
		"gameEnd": 99
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
export default coupcitystate;
