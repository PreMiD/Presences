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

const faifo: GamePresence = {
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
				case "setupNewRound":
					/*
					{
	"name": "setupNewRound",
	"description": "",
	"type": "game",
	"action": "stSetupNewRound",
	"updateGameProgression": true,
	"transitions": {
		"discardOneCard": 3,
		"selectCard": 10
	}
}
					*/
					break;
				case "discardOneCard":
					/*
					{
	"name": "discardOneCard",
	"description": "Other players have to select a card to discard. You may change your selection.",
	"descriptionmyturn": "${you} must select one card to DISCARD",
	"type": "multipleactiveplayer",
	"action": "st_MultiPlayerInit",
	"args": "argDiscardOneCard",
	"updateGameProgression": false,
	"possibleactions": [
		"selectCard"
	],
	"transitions": {
		"revealDiscardedCards": 4
	}
}
					*/
					break;
				case "revealDiscardedCards":
					/*
					{
	"name": "revealDiscardedCards",
	"description": "Revealing discarded cards",
	"type": "game",
	"action": "stRevealDiscardedCards",
	"updateGameProgression": true,
	"transitions": {
		"selectCard": 10
	}
}
					*/
					break;
				case "selectCard":
					/*
					{
	"name": "selectCard",
	"description": "Other players have to select a card to play. You may change your selection.",
	"descriptionmyturn": "${you} must select a card to play",
	"type": "multipleactiveplayer",
	"action": "stSelectCard",
	"updateGameProgression": false,
	"possibleactions": [
		"selectCard"
	],
	"transitions": {
		"resolveCards": 11
	}
}
					*/
					break;
				case "resolveCards":
					/*
					{
	"name": "resolveCards",
	"description": "Revealing the selected cards",
	"type": "game",
	"action": "stResolveSelectedCards",
	"updateGameProgression": true,
	"transitions": {
		"endOfTurnCleanup": 13,
		"activateSkills": 16,
		"multiActiveSkill": 14
	}
}
					*/
					break;
				case "resolveRound":
					/*
					{
	"name": "resolveRound",
	"description": "Determine the winner of this round",
	"type": "game",
	"action": "stResolveRound",
	"updateGameProgression": true,
	"transitions": {
		"newRound": 2,
		"prepareGameEnd": 90
	}
}
					*/
					break;
				case "endOfTurnCleanup":
					/*
					{
	"name": "endOfTurnCleanup",
	"description": "Cleaning up",
	"type": "game",
	"action": "stEndOfTurnCleanup",
	"updateGameProgression": true,
	"transitions": {
		"selectCard": 10,
		"resolveRound": 12
	}
}
					*/
					break;
				case "multiActiveSkill":
					/*
					{
	"name": "multiActiveSkill",
	"description": "Activating Skill",
	"descriptionmyturn": "Activating Skill",
	"type": "multipleactiveplayer",
	"action": "stMultiActiveSkill",
	"args": "argMultiActiveSkill",
	"updateGameProgression": false,
	"possibleactions": [
		"selectCard",
		"stealThreeCoins",
		"giveOneCoin",
		"stealOneCard",
		"returnOneCard",
		"switchMoney",
		"selectCardToGiveLeft",
		"choseRPSOpponent",
		"selectRPS",
		"copySkill"
	],
	"transitions": {
		"activateSkills": 16,
		"multiActiveSkill": 14,
		"multiActiveSkillCheckTransition": 15,
		"endOfTurnCleanup": 13
	}
}
					*/
					break;
				case "multiActiveSkillCheckTransition":
					/*
					{
	"name": "multiActiveSkillCheckTransition",
	"description": "",
	"type": "game",
	"action": "stMultiActiveSkillCheckTransition",
	"updateGameProgression": true,
	"transitions": {
		"multiActiveSkill": 14
	}
}
					*/
					break;
				case "activateSkills":
					/*
					{
	"name": "activateSkills",
	"description": "Activating Skill",
	"type": "game",
	"action": "stActivateSkills",
	"updateGameProgression": false,
	"transitions": {
		"endOfTurnCleanup": 13,
		"activateSkills": 16,
		"multiActiveSkill": 14
	}
}
					*/
					break;
				case "resolveGame":
					/*
					{
	"name": "resolveGame",
	"description": "Determine the winner of the game",
	"type": "game",
	"action": "stPrepareGameEnd",
	"updateGameProgression": true,
	"transitions": {
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
export default faifo;
