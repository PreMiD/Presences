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

const nicodemus: GamePresence = {
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
				case "chooseAction":
					/*
					{
	"name": "chooseAction",
	"description": "${actplayer} must play or repair a machine",
	"descriptionmyturn": "${you} must play or repair a machine",
	"type": "activeplayer",
	"args": "argChooseAction",
	"possibleactions": [
		"playMachine",
		"repairMachine"
	],
	"transitions": {
		"choosePlayAction": 20,
		"chooseProject": 60,
		"nextPlayer": 90,
		"zombiePass": 90
	}
}
					*/
					break;
				case "choosePlayAction":
					/*
					{
	"name": "choosePlayAction",
	"description": "${actplayer} must choose an action for played card",
	"descriptionmyturn": "${you} must choose an action for played card",
	"type": "activeplayer",
	"args": "argChoosePlayAction",
	"possibleactions": [
		"getCharcoalium",
		"getResource",
		"applyEffect"
	],
	"transitions": {
		"selectResource": 30,
		"selectMachine": 32,
		"selectProject": 33,
		"selectExchange": 31,
		"refillHand": 85,
		"zombiePass": 90
	}
}
					*/
					break;
				case "selectResource":
					/*
					{
	"name": "selectResource",
	"description": "${actplayer} must choose resource(s) for effect ${machineEffect}",
	"descriptionmyturn": "${you} must choose resource(s) for effect ${machineEffect}",
	"type": "activeplayer",
	"args": "argSelectResource",
	"possibleactions": [
		"selectResource"
	],
	"transitions": {
		"refillHand": 85,
		"zombiePass": 90
	}
}
					*/
					break;
				case "selectExchange":
					/*
					{
	"name": "selectExchange",
	"description": "${actplayer} can exchange resource/charcoalium (${number}/3)",
	"descriptionmyturn": "${you} can exchange resource/charcoalium (${number}/3)",
	"type": "activeplayer",
	"args": "argSelectExchange",
	"possibleactions": [
		"selectExchange",
		"skipExchange"
	],
	"transitions": {
		"selectExchange": 31,
		"refillHand": 85,
		"zombiePass": 90
	}
}
					*/
					break;
				case "selectMachine":
					/*
					{
	"name": "selectMachine",
	"description": "${actplayer} must choose a machine for effect ${machineEffect}",
	"descriptionmyturn": "${you} must choose a machine for effect ${machineEffect}",
	"type": "activeplayer",
	"args": "argSelectMachine",
	"possibleactions": [
		"selectMachine"
	],
	"transitions": {
		"selectMachine": 32,
		"selectProject": 33,
		"selectResource": 30,
		"selectExchange": 31,
		"refillHand": 85,
		"zombiePass": 90
	}
}
					*/
					break;
				case "selectProject":
					/*
					{
	"name": "selectProject",
	"description": "${actplayer} must choose a project for effect ${machineEffect}",
	"descriptionmyturn": "${you} must choose a project for effect ${machineEffect}",
	"type": "activeplayer",
	"args": "argSelectProject",
	"possibleactions": [
		"selectProject"
	],
	"transitions": {
		"refillHand": 85,
		"zombiePass": 90
	}
}
					*/
					break;
				case "chooseProject":
					/*
					{
	"name": "chooseProject",
	"description": "${actplayer} can select complete project(s)",
	"descriptionmyturn": "${you} can select complete project(s)",
	"type": "activeplayer",
	"args": "argChooseProject",
	"possibleactions": [
		"selectProjects",
		"skipSelectProjects"
	],
	"transitions": {
		"nextPlayer": 90,
		"chooseProjectDiscardedMachine": 61,
		"completeProjects": 65,
		"zombiePass": 90
	}
}
					*/
					break;
				case "chooseProjectDiscardedMachine":
					/*
					{
	"name": "chooseProjectDiscardedMachine",
	"description": "${actplayer} must choose machines to discard for completed project(s)",
	"descriptionmyturn": "${you} must choose machines to discard for completed project(s)",
	"type": "activeplayer",
	"args": "argChooseProjectDiscardedMachine",
	"possibleactions": [
		"discardSelectedMachines"
	],
	"transitions": {
		"completeProjects": 65,
		"zombiePass": 90
	}
}
					*/
					break;
				case "completeProjects":
					/*
					{
	"name": "completeProjects",
	"description": "",
	"type": "game",
	"action": "stCompleteProjects",
	"transitions": {
		"nextPlayer": 90,
		"zombiePass": 90
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
		"nextPlayer": 90
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
		"nextPlayer": 10,
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
export default nicodemus;
