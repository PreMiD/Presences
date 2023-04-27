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

const dicehospital: GamePresence = {
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
		"": 2
	}
}
					*/
					break;
				case "newTurn":
					/*
					{
	"name": "newTurn",
	"type": "game",
	"action": "stNewTurn",
	"updateGameProgression": true,
	"transitions": {
		"setup2Players": 3,
		"setupDiceChoice": 4,
		"patientIntake": 10
	}
}
					*/
					break;
				case "special2Players":
					/*
					{
	"name": "special2Players",
	"description": "${actplayer} must choose either an additional Department tile or an additional Specialist card to reveal",
	"descriptionmyturn": "${you} must choose either an additional Department tile or an additional Specialist card to reveal",
	"type": "activeplayer",
	"possibleactions": [
		"chooseImprovementType"
	],
	"transitions": {
		"setupDiceChoice": 4,
		"patientIntake": 10,
		"zombiePass": 10
	}
}
					*/
					break;
				case "setupDiceChoice":
					/*
					{
	"name": "setupDiceChoice",
	"description": "Players must choose values of their starting dice",
	"descriptionmyturn": "${you} must set your starting dice to the values ${die_values}",
	"args": "argDieValue",
	"type": "multipleactiveplayer",
	"action": "stSetupDiceChoice",
	"possibleactions": [
		"placeDiceInHandFinished"
	],
	"transitions": {
		"finished": 5,
		"zombiePass": 5
	}
}
					*/
					break;
				case "administratorChoice":
					/*
					{
	"name": "administratorChoice",
	"description": "Players must choose an administrator for their hospital",
	"descriptionmyturn": "${you} must choose an administrator for your hospital",
	"type": "multipleactiveplayer",
	"action": "stAdministratorChoice",
	"possibleactions": [
		"chooseAdministratorCard"
	],
	"transitions": {
		"finished": 10,
		"zombiePass": 10
	}
}
					*/
					break;
				case "patientIntakeSetup":
					/*
					{
	"name": "patientIntakeSetup",
	"description": "First player roll dice and place them on ambulances",
	"type": "game",
	"action": "stPatientIntakeSetup",
	"transitions": {
		"diceToChoose": 11,
		"noDiceToChoose": 13
	}
}
					*/
					break;
				case "patientIntakePlaceDice":
					/*
					{
	"name": "patientIntakePlaceDice",
	"description": "${actplayer} may move some dice of same value from an ambulance to another",
	"descriptionmyturn": "${you} may move some dice of same value from an ambulance to another",
	"type": "activeplayer",
	"args": "argPatientIntakePlaceDice",
	"possibleactions": [
		"placeDiceOnAmbulance",
		"placeDiceOnAmbulanceFinished"
	],
	"transitions": {
		"finished": 12,
		"zombiePass": 12
	}
}
					*/
					break;
				case "patientIntakePlaceDiceFinished":
					/*
					{
	"name": "patientIntakePlaceDiceFinished",
	"type": "game",
	"action": "stNextStateFirstPlayer",
	"transitions": {
		"nextState": 13
	}
}
					*/
					break;
				case "patientIntakeChooseAmbulance":
					/*
					{
	"name": "patientIntakeChooseAmbulance",
	"description": "${actplayer} must choose an ambulance",
	"descriptionmyturn": "${you} must choose an ambulance",
	"type": "activeplayer",
	"args": "argPatientIntakePlaceDice",
	"possibleactions": [
		"chooseAmbulance"
	],
	"transitions": {
		"chooseAmbulance": 15,
		"mortuary": 14,
		"zombiePass": 15
	}
}
					*/
					break;
				case "patientIntakeMortuary":
					/*
					{
	"name": "patientIntakeMortuary",
	"description": "${actplayer} must select ${nb_of_dice} dice to send to mortuary",
	"descriptionmyturn": "${you} must select ${nb_of_dice} dice to send to mortuary",
	"type": "activeplayer",
	"args": "argPatientIntakeMortuary",
	"possibleactions": [
		"chooseDiceToSendToMortuary"
	],
	"transitions": {
		"nextPlayer": 15,
		"zombiePass": 15
	}
}
					*/
					break;
				case "patientIntakeNextPlayer":
					/*
					{
	"name": "patientIntakeNextPlayer",
	"type": "game",
	"action": "stPatientIntakeNextPlayer",
	"transitions": {
		"nextPlayer": 13,
		"finished": 20
	}
}
					*/
					break;
				case "hospitalImprovement":
					/*
					{
	"name": "hospitalImprovement",
	"description": "${actplayer} must choose an improvement",
	"descriptionmyturn": "${you} must choose an improvement",
	"type": "activeplayer",
	"possibleactions": [
		"chooseImprovement",
		"discardImprovementChoice"
	],
	"transitions": {
		"chooseImprovement": 21,
		"zombiePass": 21
	}
}
					*/
					break;
				case "hospitalImprovementNextPlayer":
					/*
					{
	"name": "hospitalImprovementNextPlayer",
	"type": "game",
	"action": "stHospitalImprovementNextPlayer",
	"transitions": {
		"nextPlayer": 20,
		"finished": 30
	}
}
					*/
					break;
				case "hospitalActivation":
					/*
					{
	"name": "hospitalActivation",
	"description": "All players must finish to activate nurses or specialists",
	"descriptionmyturn": "${you} have to activate a nurse or a specialist on a department tile",
	"type": "multipleactiveplayer",
	"updateGameProgression": true,
	"action": "stHospitalActivationInit",
	"possibleactions": [
		"activateNurse",
		"activateSpecialist",
		"useBloodBag",
		"undoMove",
		"reset",
		"finished",
		"unpass",
		"chooseDieToSave"
	],
	"transitions": {
		"finished": 40,
		"zombiePass": 40
	}
}
					*/
					break;
				case "neglectedPatients":
					/*
					{
	"name": "neglectedPatients",
	"description": "Each neglected patient has its value lowered by ${number}",
	"descriptionmyturn": "Each neglected patient has its value lowered by ${number}",
	"type": "game",
	"args": "argNeglectedPatients",
	"action": "stNeglectedPatients",
	"updateGameProgression": true,
	"transitions": {
		"finished": 50
	}
}
					*/
					break;
				case "dischargedPatients":
					/*
					{
	"name": "dischargedPatients",
	"description": "Updating scores...",
	"type": "game",
	"action": "stDischargedPatients",
	"transitions": {
		"shiftChange": 60,
		"endGame": 99
	}
}
					*/
					break;
				case "shiftChange":
					/*
					{
	"name": "shiftChange",
	"description": "Shift change, preparing turn ${round}",
	"type": "game",
	"action": "stShiftChange",
	"args": "argShiftChange",
	"transitions": {
		"nextTurn": 2
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
export default dicehospital;
