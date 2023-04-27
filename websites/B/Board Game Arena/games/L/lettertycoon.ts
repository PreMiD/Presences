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

const lettertycoon: GamePresence = {
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
		"": 5
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
	"transitions": {
		"hasReplaceCardOption": 20,
		"noReplaceCardOption": 30
	}
}
					*/
					break;
				case "playerMayReplaceCard":
					/*
					{
	"name": "playerMayReplaceCard",
	"description": "${actplayer} may replace a card",
	"descriptionmyturn": "${you} may replace a card",
	"type": "activeplayer",
	"possibleactions": [
		"replaceCard",
		"skipReplaceCard"
	],
	"transitions": {
		"replaceCard": 21,
		"skip": 30,
		"zombiePass": 30
	}
}
					*/
					break;
				case "replaceCard":
					/*
					{
	"name": "replaceCard",
	"description": "",
	"type": "game",
	"action": "stReplaceCard",
	"transitions": {
		"": 30
	}
}
					*/
					break;
				case "playerMayPlayWord":
					/*
					{
	"name": "playerMayPlayWord",
	"description": "${actplayer} may play a word",
	"descriptionmyturn": "${you} may play a word",
	"type": "activeplayer",
	"possibleactions": [
		"playWord",
		"skipPlayWord"
	],
	"transitions": {
		"playWord": 31,
		"skip": 60,
		"zombiePass": 60
	}
}
					*/
					break;
				case "playWord":
					/*
					{
	"name": "playWord",
	"description": "",
	"type": "game",
	"action": "stPlayWord",
	"transitions": {
		"automaticChallengeVariant": 35,
		"playersChallengeVariant": 40
	}
}
					*/
					break;
				case "automaticChallenge":
					/*
					{
	"name": "automaticChallenge",
	"description": "",
	"type": "game",
	"action": "stAutomaticChallenge",
	"transitions": {
		"wordAccepted": 45,
		"wordRejectedTryAgain": 30,
		"wordRejectedNoRetries": 70
	}
}
					*/
					break;
				case "playersMayChallenge":
					/*
					{
	"name": "playersMayChallenge",
	"description": "Other players may challenge or accept the played word",
	"descriptionmyturn": "${you} may challenge or accept the played word",
	"type": "multipleactiveplayer",
	"action": "stPlayersMayChallenge",
	"possibleactions": [
		"challengeWord",
		"acceptWord"
	],
	"transitions": {
		"resolveChallenge": 41
	}
}
					*/
					break;
				case "resolveChallenge":
					/*
					{
	"name": "resolveChallenge",
	"description": "",
	"type": "game",
	"action": "stResolveChallenge",
	"transitions": {
		"scoreWord": 45,
		"wordRejected": 70
	}
}
					*/
					break;
				case "scoreWord":
					/*
					{
	"name": "scoreWord",
	"description": "",
	"type": "game",
	"action": "stScoreWord",
	"transitions": {
		"patentsAvailable": 50,
		"noPatentsAvailable": 55
	}
}
					*/
					break;
				case "playerMayBuyPatent":
					/*
					{
	"name": "playerMayBuyPatent",
	"description": "${actplayer} may buy a patent",
	"descriptionmyturn": "${you} may buy a patent",
	"type": "activeplayer",
	"possibleactions": [
		"buyPatent",
		"skipBuyPatent"
	],
	"transitions": {
		"buyPatent": 51,
		"skip": 55,
		"zombiePass": 55
	}
}
					*/
					break;
				case "buyPatent":
					/*
					{
	"name": "buyPatent",
	"description": "",
	"type": "game",
	"action": "stBuyPatent",
	"transitions": {
		"": 55
	}
}
					*/
					break;
				case "refillCommunityPool":
					/*
					{
	"name": "refillCommunityPool",
	"description": "",
	"type": "game",
	"action": "stRefillCommunityPool",
	"transitions": {
		"discardCards": 60,
		"refillHand": 75
	}
}
					*/
					break;
				case "playerMayDiscardCards":
					/*
					{
	"name": "playerMayDiscardCards",
	"description": "${actplayer} may discard cards",
	"descriptionmyturn": "${you} may discard cards",
	"type": "activeplayer",
	"possibleactions": [
		"discardCards",
		"skipDiscardCards"
	],
	"transitions": {
		"done": 75,
		"zombiePass": 75
	}
}
					*/
					break;
				case "playerMustDiscardCard":
					/*
					{
	"name": "playerMustDiscardCard",
	"description": "${actplayer} must discard a card",
	"descriptionmyturn": "${you} must discard a card",
	"type": "activeplayer",
	"possibleactions": [
		"discardCard"
	],
	"transitions": {
		"done": 75,
		"zombiePass": 75
	}
}
					*/
					break;
				case "refillHand":
					/*
					{
	"name": "refillHand",
	"description": "",
	"type": "game",
	"action": "stRefillHand",
	"transitions": {
		"": 76
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
	"transitions": {
		"nextTurn": 5,
		"endGame": 99
	},
	"updateGameProgression": true
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
export default lettertycoon;
