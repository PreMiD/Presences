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

const glow: GamePresence = {
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
		"": 10
	}
}
					*/
					break;
				case "chooseAdventurer":
					/*
					{
	"name": "chooseAdventurer",
	"description": "${actplayer} must choose an adventurer",
	"descriptionmyturn": "${you} must choose an adventurer",
	"type": "activeplayer",
	"args": "argChooseAdventurer",
	"possibleactions": [
		"chooseAdventurer"
	],
	"transitions": {
		"nextPlayer": 11,
		"chooseTomDice": 12,
		"zombiePass": 11
	}
}
					*/
					break;
				case "nextPlayerChooseAdventurer":
					/*
					{
	"name": "nextPlayerChooseAdventurer",
	"description": "",
	"type": "game",
	"action": "stNextPlayerChooseAdventurer",
	"transitions": {
		"nextPlayer": 10,
		"end": 15
	}
}
					*/
					break;
				case "chooseTomDice":
					/*
					{
	"name": "chooseTomDice",
	"description": "",
	"descriptionmyturn": "${you} must choose Tom dice",
	"type": "activeplayer",
	"args": "argChooseTomDice",
	"possibleactions": [
		"chooseTomDice"
	],
	"transitions": {
		"startRound": 15,
		"zombiePass": 15
	}
}
					*/
					break;
				case "startRound":
					/*
					{
	"name": "startRound",
	"description": "",
	"type": "game",
	"action": "stStartRound",
	"transitions": {
		"morning": 20
	}
}
					*/
					break;
				case "recruitCompanion":
					/*
					{
	"name": "recruitCompanion",
	"description": "${actplayer} must recruit a companion",
	"descriptionmyturn": "${you} must recruit a companion",
	"type": "activeplayer",
	"args": "argRecuitCompanion",
	"possibleactions": [
		"recruitCompanion"
	],
	"transitions": {
		"moveBlackDie": 23,
		"selectSketalDie": 22,
		"nextPlayer": 28,
		"removeCompanion": 21,
		"zombiePass": 28
	}
}
					*/
					break;
				case "removeCompanion":
					/*
					{
	"name": "removeCompanion",
	"description": "${actplayer} must remove a companion",
	"descriptionmyturn": "${you} must remove a companion",
	"type": "activeplayer",
	"args": "argRemoveCompanion",
	"possibleactions": [
		"removeCompanion"
	],
	"transitions": {
		"nextPlayer": 28,
		"zombiePass": 28
	}
}
					*/
					break;
				case "selectSketalDie":
					/*
					{
	"name": "selectSketalDie",
	"description": "${actplayer} must choose a new die",
	"descriptionmyturn": "${you} must choose a new die",
	"type": "activeplayer",
	"args": "argSelectSketalDie",
	"possibleactions": [
		"selectSketalDie"
	],
	"transitions": {
		"nextPlayer": 28,
		"removeCompanion": 21,
		"zombiePass": 28
	}
}
					*/
					break;
				case "moveBlackDie":
					/*
					{
	"name": "moveBlackDie",
	"description": "${actplayer} must move black die",
	"descriptionmyturn": "${you} must move black die",
	"type": "activeplayer",
	"args": "argMoveBlackDie",
	"possibleactions": [
		"moveBlackDie"
	],
	"transitions": {
		"selectSketalDie": 22,
		"nextPlayer": 28,
		"removeCompanion": 21,
		"zombiePass": 28
	}
}
					*/
					break;
				case "nextPlayerRecruitCompanion":
					/*
					{
	"name": "nextPlayerRecruitCompanion",
	"description": "",
	"type": "game",
	"action": "stNextPlayerRecruitCompanion",
	"transitions": {
		"nextPlayer": 20,
		"end": 29
	}
}
					*/
					break;
				case "endRecruit":
					/*
					{
	"name": "endRecruit",
	"description": "",
	"type": "game",
	"action": "stEndRecruit",
	"transitions": {
		"": 30
	}
}
					*/
					break;
				case "rollDice":
					/*
					{
	"name": "rollDice",
	"description": "Players can reroll or change their dice",
	"descriptionmyturn": "${you} can reroll or change your dice",
	"descriptionrollDice": "Select 1 or 2 dice to reroll",
	"descriptionchangeDie": "Select 1 die to change",
	"type": "multipleactiveplayer",
	"action": "stRollDice",
	"args": "argRollDice",
	"possibleactions": [
		"rollDice",
		"changeDie",
		"keepDice"
	],
	"transitions": {
		"keepDice": 35,
		"zombiePass": 35
	}
}
					*/
					break;
				case "resurrect":
					/*
					{
	"name": "resurrect",
	"description": "Players with Cromaug can take a companion from the cemetery",
	"descriptionmyturn": "${you} can take a companion from the cemetery",
	"type": "multipleactiveplayer",
	"action": "stResurrect",
	"args": "argResurrect",
	"possibleactions": [
		"resurrect",
		"skipResurrect"
	],
	"transitions": {
		"selectSketalDie": 36,
		"resolveCards": 40,
		"zombiePass": 50
	}
}
					*/
					break;
				case "selectSketalDieMulti":
					/*
					{
	"name": "selectSketalDieMulti",
	"description": "${actplayer} must choose a new die",
	"descriptionmyturn": "${you} must choose a new die",
	"type": "multipleactiveplayer",
	"args": "argSelectSketalDie",
	"possibleactions": [
		"selectSketalDie"
	],
	"transitions": {
		"resolveCards": 40,
		"zombiePass": 50
	}
}
					*/
					break;
				case "resolveCards":
					/*
					{
	"name": "resolveCards",
	"description": "Players must resolve their cards",
	"descriptionmyturn": "${you} must resolve your cards (select the card to resolve first)",
	"type": "multipleactiveplayer",
	"action": "stResolveCards",
	"args": "argResolveCards",
	"possibleactions": [
		"resolveCard",
		"resolveAll"
	],
	"transitions": {
		"move": 50,
		"zombiePass": 50
	}
}
					*/
					break;
				case "move":
					/*
					{
	"name": "move",
	"description": "Players can move their company",
	"descriptionmyturn": "${you} can move your company",
	"descriptionboat": "Players can move one of their boats",
	"descriptionmyturnboat": "${you} can move one of your boats",
	"descriptiondiscard": "Choose a companion or spell to discard",
	"type": "multipleactiveplayer",
	"action": "stMove",
	"args": "argMove",
	"possibleactions": [
		"move",
		"placeEncampment",
		"endTurn"
	],
	"transitions": {
		"endRound": 80,
		"zombiePass": 80
	}
}
					*/
					break;
				case "endRound":
					/*
					{
	"name": "endRound",
	"description": "",
	"type": "game",
	"action": "stEndRound",
	"transitions": {
		"newRound": 15,
		"endScore": 90
	}
}
					*/
					break;
				case "endScore":
					/*
					{
	"name": "endScore",
	"description": "",
	"type": "game",
	"action": "stEndScore",
	"transitions": {
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
export default glow;
