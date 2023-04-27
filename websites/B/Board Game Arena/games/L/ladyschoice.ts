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

const ladyschoice: GamePresence = {
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
				case "chooseState":
					/*
					{
	"name": "chooseState",
	"description": "",
	"type": "game",
	"action": "st_chooseState",
	"transitions": {
		"twoPlayers": 12,
		"morePlayers": 22
	}
}
					*/
					break;
				case "firstCourt2p":
					/*
					{
	"name": "firstCourt2p",
	"description": "${actplayer} is choosing a gentleman to court",
	"descriptionmyturn": "${you} must choose a gentleman to court",
	"type": "activeplayer",
	"possibleactions": [
		"court2p",
		"zombiePass"
	],
	"transitions": {
		"court2p": 13,
		"zombiePass": 99
	}
}
					*/
					break;
				case "nextPlayer2p":
					/*
					{
	"name": "nextPlayer2p",
	"description": "",
	"type": "game",
	"action": "st_nextPlayer2p",
	"transitions": {
		"nextPlayer": 14
	},
	"updateGameProgression": true
}
					*/
					break;
				case "turnStart":
					/*
					{
	"name": "turnStart",
	"description": "${actplayer} is choosing a gentleman to court or marry",
	"descriptionmyturn": "${you} must choose a gentleman to court or marry",
	"type": "activeplayer",
	"possibleactions": [
		"court2p",
		"marry2p",
		"zombiePass"
	],
	"transitions": {
		"court2p": 15,
		"marry2p": 99,
		"finalCourt2p": 13,
		"zombiePass": 99
	}
}
					*/
					break;
				case "secondCourt2p":
					/*
					{
	"name": "secondCourt2p",
	"description": "${actplayer} is choosing a gentleman for the second court action",
	"descriptionmyturn": "${you} must choose a gentleman for the second court action",
	"type": "activeplayer",
	"possibleactions": [
		"court2p",
		"zombiePass"
	],
	"transitions": {
		"court2p": 13,
		"zombiePass": 99
	},
	"updateGameProgression": true
}
					*/
					break;
				case "gentTurn":
					/*
					{
	"name": "gentTurn",
	"description": "${actplayer} is boasting or changing an attribute card",
	"descriptionmyturn": "${you} must choose an attribute card, then boast it or change it",
	"type": "activeplayer",
	"possibleactions": [
		"boast",
		"change",
		"zombiePass"
	],
	"transitions": {
		"endOfTurn": 24,
		"zombiePass": 24
	}
}
					*/
					break;
				case "ladyTurn":
					/*
					{
	"name": "ladyTurn",
	"description": "${actplayer} is choosing a gentleman to court or marry",
	"descriptionmyturn": "${you} must choose a gentleman to court or marry",
	"type": "activeplayer",
	"possibleactions": [
		"courtMoreP",
		"marryMoreP",
		"zombiePass"
	],
	"transitions": {
		"endOfTurn": 24,
		"marriageManager": 28,
		"zombiePass": 28
	}
}
					*/
					break;
				case "nextPlayerMorePlayers":
					/*
					{
	"name": "nextPlayerMorePlayers",
	"description": "",
	"type": "game",
	"action": "st_nextPlayerMorePlayers",
	"transitions": {
		"ladyTurn": 23,
		"ladyTurnClockExpired": 25,
		"gentTurn": 22
	},
	"updateGameProgression": true
}
					*/
					break;
				case "ladyTurnClockExpired":
					/*
					{
	"name": "ladyTurnClockExpired",
	"description": "${actplayer}'s biological clock has expired, and must choose a gentleman to marry right now.",
	"descriptionmyturn": "Your biological clock has expired. You must choose a gentleman to marry right now.",
	"type": "activeplayer",
	"possibleactions": [
		"marryMoreP",
		"zombiePass"
	],
	"transitions": {
		"marriageManager": 28,
		"zombiePass": 28
	}
}
					*/
					break;
				case "ladyTurnFinalCourt":
					/*
					{
	"name": "ladyTurnFinalCourt",
	"description": "${actplayer} has one last chance to court before deciding which gentleman to marry.",
	"descriptionmyturn": "You have one last chance to court before deciding which gentleman to marry.",
	"type": "activeplayer",
	"possibleactions": [
		"courtMoreP",
		"zombiePass"
	],
	"transitions": {
		"ladyTurnFinalMarry": 27,
		"zombiePass": 27
	}
}
					*/
					break;
				case "ladyTurnFinalMarry":
					/*
					{
	"name": "ladyTurnFinalMarry",
	"description": "The round is over. ${actplayer} must choose a gentleman to marry right now.",
	"descriptionmyturn": "The round is over. You must choose a gentleman to marry right now.",
	"type": "activeplayer",
	"possibleactions": [
		"marryMoreP",
		"zombiePass"
	],
	"transitions": {
		"marriageManager": 28,
		"zombiePass": 28
	}
}
					*/
					break;
				case "marriageManager":
					/*
					{
	"name": "marriageManager",
	"description": "",
	"type": "game",
	"action": "st_marriageManager",
	"transitions": {
		"ladyTurnFinalCourt": 26,
		"ladyTurnFinalMarry": 27,
		"gentTurn": 22,
		"gameOver": 99
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
export default ladyschoice;
