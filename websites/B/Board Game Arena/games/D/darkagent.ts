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

const darkagent: GamePresence = {
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
				case "afterGameSetup":
					/*
					{
	"name": "afterGameSetup",
	"description": "After Game setup",
	"type": "manager",
	"action": "stAfterGameSetup",
	"transitions": {
		"normal": 3,
		"fixed": 6
	}
}
					*/
					break;
				case "NATIONPhase":
					/*
					{
	"name": "NATIONPhase",
	"description": "Everybody must choose an Intelligence Service",
	"descriptionmyturn": "${you} must choose a color and an Intelligence Service",
	"type": "multipleactiveplayer",
	"action": "stNATIONPhase",
	"possibleactions": [
		"nation"
	],
	"transitions": {
		"chosen": 4,
		"zombiePass": 4,
		"End": 95
	}
}
					*/
					break;
				case "BeginSats":
					/*
					{
	"name": "BeginSats",
	"description": "",
	"type": "game",
	"action": "stBeginSats",
	"transitions": {
		"": 5
	}
}
					*/
					break;
				case "PlaceSat":
					/*
					{
	"name": "PlaceSat",
	"description": "${actplayer} must place a satellite",
	"descriptionmyturn": "${you} must place a satellite",
	"type": "activeplayer",
	"possibleactions": [
		"placeSat"
	],
	"transitions": {
		"satPlaced": 9,
		"zombiePass": 9
	}
}
					*/
					break;
				case "COLORPhase":
					/*
					{
	"name": "COLORPhase",
	"description": "Everybody must choose a color",
	"descriptionmyturn": "${you} must choose a color",
	"type": "multipleactiveplayer",
	"action": "stNATIONPhase",
	"possibleactions": [
		"nation"
	],
	"transitions": {
		"chosen": 4,
		"zombiePass": 4,
		"End": 95
	}
}
					*/
					break;
				case "SatNextPlayer":
					/*
					{
	"name": "SatNextPlayer",
	"description": "",
	"type": "game",
	"action": "stSatNextPlayer",
	"transitions": {
		"satLeft": 5,
		"noSatLeft": 20,
		"End": 95
	}
}
					*/
					break;
				case "EnterSats":
					/*
					{
	"name": "EnterSats",
	"description": "",
	"type": "game",
	"action": "stEnterSats",
	"transitions": {
		"": 11
	}
}
					*/
					break;
				case "ReEnterSats":
					/*
					{
	"name": "ReEnterSats",
	"description": "",
	"type": "game",
	"action": "stReEnterSats",
	"transitions": {
		"": 13
	}
}
					*/
					break;
				case "OnOwnSatClick":
					/*
					{
	"name": "OnOwnSatClick",
	"description": "${actplayer} must choose one of his/her sats",
	"descriptionmyturn": "${you} must choose one of your sats",
	"type": "activeplayer",
	"possibleactions": [
		"onOwnSatClick",
		"reverse"
	],
	"transitions": {
		"ownSatChosen": 14,
		"reverseSAT": 11,
		"zombiePass": 14,
		"End": 95
	}
}
					*/
					break;
				case "EnterSecondSat":
					/*
					{
	"name": "EnterSecondSat",
	"description": "",
	"type": "game",
	"action": "stEnterSecondSats",
	"transitions": {
		"": 15
	}
}
					*/
					break;
				case "ClickOnSecondSat":
					/*
					{
	"name": "ClickOnSecondSat",
	"description": "${actplayer} must choose a fow sat or an empty square",
	"descriptionmyturn": "${you} must choose a fow sat or an empty square",
	"type": "activeplayer",
	"possibleactions": [
		"clickOnSecondSat",
		"reverse"
	],
	"transitions": {
		"moveDone": 16,
		"zombiePass": 16,
		"reverse": 23,
		"exchangeDone": 20,
		"End": 95
	}
}
					*/
					break;
				case "EnterSecondMove":
					/*
					{
	"name": "EnterSecondMove",
	"description": "",
	"type": "game",
	"action": "stEnterSecondMove",
	"transitions": {
		"": 17
	}
}
					*/
					break;
				case "OnOwnSatClick2":
					/*
					{
	"name": "OnOwnSatClick2",
	"description": "${actplayer} must choose one of his/her sats",
	"descriptionmyturn": "${you} must choose one of your sats",
	"type": "activeplayer",
	"possibleactions": [
		"onOwnSatClick",
		"reverse"
	],
	"transitions": {
		"ownSatChosen": 18,
		"reverse": 23,
		"zombiePass": 18,
		"End": 95
	}
}
					*/
					break;
				case "EnterSecondSat2":
					/*
					{
	"name": "EnterSecondSat2",
	"description": "",
	"type": "game",
	"action": "stEnterSecondSats",
	"transitions": {
		"": 19
	}
}
					*/
					break;
				case "ClickOnSecondSat2":
					/*
					{
	"name": "ClickOnSecondSat2",
	"description": "${actplayer} must choose an empty square",
	"descriptionmyturn": "${you} must choose an empty square",
	"type": "activeplayer",
	"possibleactions": [
		"clickOnSecondSat",
		"reverse"
	],
	"transitions": {
		"moveDone": 20,
		"reverse": 23,
		"zombiePass": 20,
		"End": 95
	}
}
					*/
					break;
				case "EnterTDOAction":
					/*
					{
	"name": "EnterTDOAction",
	"description": "",
	"type": "game",
	"action": "stEnterTDOAction",
	"transitions": {
		"": 25
	}
}
					*/
					break;
				case "ReEnterTDOAction":
					/*
					{
	"name": "ReEnterTDOAction",
	"description": "",
	"type": "game",
	"action": "stReEnterTDOAction",
	"transitions": {
		"": 25
	}
}
					*/
					break;
				case "EnterBackward":
					/*
					{
	"name": "EnterBackward",
	"description": "",
	"type": "game",
	"action": "stEnterBackward",
	"transitions": {
		"reverseSAT": 11,
		"reverseTDO": 25
	}
}
					*/
					break;
				case "EnterBackwardMEDIA":
					/*
					{
	"name": "EnterBackwardMEDIA",
	"description": "",
	"type": "game",
	"action": "stEnterBackward",
	"transitions": {
		"reverseTDO": 27,
		"reverseMediaPhase1": 27,
		"reverseMediaPhase2": 29,
		"ReEnterTDOAction": 22
	}
}
					*/
					break;
				case "TDOACtion":
					/*
					{
	"name": "TDOACtion",
	"description": "${actplayer} must choose an action for each satellite",
	"descriptionmyturn": "${you} must choose an action for each satellite",
	"type": "activeplayer",
	"possibleactions": [
		"reverse",
		"targetCard",
		"skipaction",
		"attackaction",
		"useaction",
		"engageaction",
		"media",
		"chooseaction",
		"ExtendedAction",
		"eqpaction"
	],
	"transitions": {
		"reverse": 23,
		"skip": 30,
		"media": 26,
		"supersat": 50,
		"DBL": 60,
		"eqpRIF": 55,
		"eqpJET": 65,
		"eqpBIN": 70,
		"eqpBOT": 75,
		"eqpSAT": 80,
		"powSHAKIL": 85,
		"powKAMKAZ": 86,
		"powAIMXCG": 87,
		"powHELIMAST": 91,
		"powCARNAVAL": 92,
		"aimLOK": 35,
		"zombiePass": 30,
		"End": 95
	}
}
					*/
					break;
				case "EnterMediaAction":
					/*
					{
	"name": "EnterMediaAction",
	"description": "",
	"type": "game",
	"action": "stEnterMediaAction",
	"transitions": {
		"": 27
	}
}
					*/
					break;
				case "MediaAction":
					/*
					{
	"name": "MediaAction",
	"description": "${actplayer} has to choose 3 cards for media action",
	"descriptionmyturn": "${you} have to choose 3 cards for media action",
	"type": "activeplayer",
	"possibleactions": [
		"MediaAction",
		"reverse"
	],
	"transitions": {
		"CardsChosen": 28,
		"reverse": 24,
		"End": 95
	}
}
					*/
					break;
				case "EnterMediaAction2":
					/*
					{
	"name": "EnterMediaAction2",
	"description": "",
	"type": "game",
	"action": "stEnterMediaAction2",
	"transitions": {
		"": 29
	}
}
					*/
					break;
				case "MediaAction2":
					/*
					{
	"name": "MediaAction2",
	"description": "${actplayer} must now place cards from last to first",
	"descriptionmyturn": "${you} must now place cards from last to first",
	"type": "activeplayer",
	"possibleactions": [
		"MediaAction",
		"reverse"
	],
	"transitions": {
		"CardsOnTDO": 30,
		"MEDFRI": 22,
		"reverse": 24,
		"zombiePass": 30,
		"End": 95
	}
}
					*/
					break;
				case "NextPlayerTurn":
					/*
					{
	"name": "NextPlayerTurn",
	"description": "",
	"type": "game",
	"action": "stNextPlayerTurn",
	"transitions": {
		"next": 10,
		"ONU": 40,
		"End": 95
	}
}
					*/
					break;
				case "EnterAimLOK":
					/*
					{
	"name": "EnterAimLOK",
	"description": "",
	"type": "game",
	"action": "stEnterAimLOK",
	"transitions": {
		"": 36
	}
}
					*/
					break;
				case "onAimLOKClick":
					/*
					{
	"name": "onAimLOKClick",
	"description": "${actplayer} must choose an aim to lock",
	"descriptionmyturn": "${you} must choose an aim to lock",
	"type": "activeplayer",
	"possibleactions": [
		"aimclick",
		"reverse"
	],
	"transitions": {
		"aimchosen": 22,
		"skip": 30,
		"reverse": 23,
		"zombiePass": 30,
		"End": 95
	}
}
					*/
					break;
				case "ONUPhase":
					/*
					{
	"name": "ONUPhase",
	"description": "Everybody must vote for U.N. Peace decision",
	"descriptionmyturn": "${you} have to vote for U.N. Peace decision (FOR: move cards, AGAINST: stay like this)",
	"type": "multipleactiveplayer",
	"action": "stONUPhase",
	"possibleactions": [
		"vote"
	],
	"transitions": {
		"voted": 45,
		"zombiePass": 45,
		"End": 95
	}
}
					*/
					break;
				case "VoteCounting":
					/*
					{
	"name": "VoteCounting",
	"description": "",
	"type": "game",
	"action": "stVoteCounting",
	"transitions": {
		"next": 10,
		"zombiePass": 13,
		"End": 95
	}
}
					*/
					break;
				case "EnterSuperSat":
					/*
					{
	"name": "EnterSuperSat",
	"description": "",
	"type": "game",
	"action": "stEnterSuperSat",
	"transitions": {
		"": 52
	}
}
					*/
					break;
				case "ChooseSatToUpgrade":
					/*
					{
	"name": "ChooseSatToUpgrade",
	"description": "${actplayer} must choose a sat to upgrade",
	"descriptionmyturn": "${you} must choose a sat to upgrade",
	"type": "activeplayer",
	"possibleactions": [
		"onChooseUpgrade",
		"reverse"
	],
	"transitions": {
		"upgradedone": 22,
		"zombiePass": 30,
		"reverse": 23,
		"End": 95
	}
}
					*/
					break;
				case "EnterEqpRIF":
					/*
					{
	"name": "EnterEqpRIF",
	"description": "",
	"type": "game",
	"action": "stEnterEqpRIF",
	"transitions": {
		"": 57
	}
}
					*/
					break;
				case "onEQPRIFClick":
					/*
					{
	"name": "onEQPRIFClick",
	"description": "${actplayer} must choose a target",
	"descriptionmyturn": "${you} must choose a target",
	"type": "activeplayer",
	"possibleactions": [
		"attackaction",
		"reverse"
	],
	"transitions": {
		"onEQPRIFClick": 22,
		"skip": 30,
		"reverse": 23,
		"zombiePass": 30,
		"End": 95
	}
}
					*/
					break;
				case "EnterDBL":
					/*
					{
	"name": "EnterDBL",
	"description": "",
	"type": "game",
	"action": "stEnterDBL",
	"transitions": {
		"": 62
	}
}
					*/
					break;
				case "onChooseDBL":
					/*
					{
	"name": "onChooseDBL",
	"description": "${actplayer} must choose which SPY is DOUBLE AGENT",
	"descriptionmyturn": "${you} must choose which SPY is DOUBLE AGENT",
	"type": "activeplayer",
	"possibleactions": [
		"engageaction",
		"reverse"
	],
	"transitions": {
		"onDBLClick": 22,
		"reverse": 23,
		"zombiePass": 30,
		"End": 95
	}
}
					*/
					break;
				case "EnterJET":
					/*
					{
	"name": "EnterJET",
	"description": "",
	"type": "game",
	"action": "stEnterEqpJET",
	"transitions": {
		"": 67
	}
}
					*/
					break;
				case "onEQPJETClick":
					/*
					{
	"name": "onEQPJETClick",
	"description": "${actplayer} must choose one of his spy",
	"descriptionmyturn": "${you} must choose one of your spy",
	"type": "activeplayer",
	"possibleactions": [
		"ownspyclick",
		"reverse"
	],
	"transitions": {
		"SpySent": 68,
		"Kamikaze": 22,
		"reverse": 23,
		"End": 95
	}
}
					*/
					break;
				case "EnterJETPhase2":
					/*
					{
	"name": "EnterJETPhase2",
	"description": "",
	"type": "game",
	"action": "stEnterJETPhase2",
	"transitions": {
		"": 69
	}
}
					*/
					break;
				case "JETPhase2":
					/*
					{
	"name": "JETPhase2",
	"description": "${actplayer} must choose an opponent spy/ a sentinel",
	"descriptionmyturn": "${you} must choose an opponent spy/ a sentinel",
	"type": "activeplayer",
	"possibleactions": [
		"eqpaction",
		"reverse"
	],
	"transitions": {
		"next": 22,
		"zombiePass": 30,
		"reverse": 23,
		"End": 95
	}
}
					*/
					break;
				case "EnterBIN":
					/*
					{
	"name": "EnterBIN",
	"description": "",
	"type": "game",
	"action": "stEnterEqpBIN",
	"transitions": {
		"": 72
	}
}
					*/
					break;
				case "onEQPBINClick":
					/*
					{
	"name": "onEQPBINClick",
	"description": "${actplayer} must choose an aim",
	"descriptionmyturn": "${you} must choose an aim",
	"type": "activeplayer",
	"possibleactions": [
		"eqpaction",
		"skipaction",
		"reverse"
	],
	"transitions": {
		"onEQPBINClick": 22,
		"skip": 22,
		"zombiePass": 30,
		"reverse": 23,
		"End": 95
	}
}
					*/
					break;
				case "EnterBOT":
					/*
					{
	"name": "EnterBOT",
	"description": "",
	"type": "game",
	"action": "stEnterEqpBOT",
	"transitions": {
		"": 77
	}
}
					*/
					break;
				case "onEQPBOTClick":
					/*
					{
	"name": "onEQPBOTClick",
	"description": "${actplayer} must choose an empty square",
	"descriptionmyturn": "${you} must choose an empty square",
	"type": "activeplayer",
	"possibleactions": [
		"eqpaction",
		"reverse"
	],
	"transitions": {
		"onEQPBOTClick": 22,
		"mustChooseSPY": 78,
		"zombiePass": 30,
		"reverse": 23,
		"End": 95
	}
}
					*/
					break;
				case "EnterChooseSpy":
					/*
					{
	"name": "EnterChooseSpy",
	"description": "",
	"type": "game",
	"action": "stEnterChooseSpy",
	"transitions": {
		"": 79
	}
}
					*/
					break;
				case "ChooseSPY":
					/*
					{
	"name": "ChooseSPY",
	"description": "${actplayer} must choose your spy to move",
	"descriptionmyturn": "${you} must choose your spy to move",
	"type": "activeplayer",
	"possibleactions": [
		"ownspyclick",
		"reverse"
	],
	"transitions": {
		"SpySent": 22,
		"reverse": 23,
		"End": 95
	}
}
					*/
					break;
				case "EnterSAT":
					/*
					{
	"name": "EnterSAT",
	"description": "",
	"type": "game",
	"action": "stEnterEqpSAT",
	"transitions": {
		"": 82
	}
}
					*/
					break;
				case "onEQPSATClick":
					/*
					{
	"name": "onEQPSATClick",
	"description": "${actplayer} must choose an opponent SAT",
	"descriptionmyturn": "${you} must choose an opponent SAT",
	"type": "activeplayer",
	"possibleactions": [
		"eqpaction",
		"reverse"
	],
	"transitions": {
		"onEQPSATClick": 22,
		"zombiePass": 30,
		"reverse": 23,
		"End": 95
	}
}
					*/
					break;
				case "EnterPowSHA":
					/*
					{
	"name": "EnterPowSHA",
	"description": "",
	"type": "game",
	"action": "stEnterPowSHA",
	"transitions": {
		"": 57
	}
}
					*/
					break;
				case "EnterPowKAMKAZ":
					/*
					{
	"name": "EnterPowKAMKAZ",
	"description": "",
	"type": "game",
	"action": "stEnterPowKAMKAZ",
	"transitions": {
		"": 89
	}
}
					*/
					break;
				case "EnterPowAIMXCG":
					/*
					{
	"name": "EnterPowAIMXCG",
	"description": "",
	"type": "game",
	"action": "stEnterPowAIMXCG",
	"transitions": {
		"": 88
	}
}
					*/
					break;
				case "onAIMXCG":
					/*
					{
	"name": "onAIMXCG",
	"description": "${actplayer} must choose two cards to exchange (aims/tactic cards)",
	"descriptionmyturn": "${you} must choose two cards to exchange (aims/tactic cards)",
	"type": "activeplayer",
	"possibleactions": [
		"choosecard"
	],
	"transitions": {
		"done": 22,
		"End": 95
	}
}
					*/
					break;
				case "EnterKAMKAZ":
					/*
					{
	"name": "EnterKAMKAZ",
	"description": "",
	"type": "game",
	"action": "stEnterKAMKAZ",
	"transitions": {
		"": 90
	}
}
					*/
					break;
				case "onKAMKAZClick":
					/*
					{
	"name": "onKAMKAZClick",
	"description": "${actplayer} must choose one of his spy",
	"descriptionmyturn": "${you} must choose one of your spy",
	"type": "activeplayer",
	"possibleactions": [
		"KAMKAZclick",
		"reverse"
	],
	"transitions": {
		"Kamikaze": 22,
		"reverse": 23,
		"End": 95
	}
}
					*/
					break;
				case "EnterPowHELIMAST":
					/*
					{
	"name": "EnterPowHELIMAST",
	"description": "",
	"type": "game",
	"action": "stEnterPowHELIMAST",
	"transitions": {
		"": 75
	}
}
					*/
					break;
				case "EnterPowCARNAVAL":
					/*
					{
	"name": "EnterPowCARNAVAL",
	"description": "",
	"type": "game",
	"action": "stEnterPowCARNAVAL",
	"transitions": {
		"": 93
	}
}
					*/
					break;
				case "onCARNAVAL":
					/*
					{
	"name": "onCARNAVAL",
	"description": "${actplayer} must choose a direction and a line (arrows)",
	"descriptionmyturn": "${you} must choose a direction and a line (arrows)",
	"type": "activeplayer",
	"possibleactions": [
		"onCARNAVAL"
	],
	"transitions": {
		"done": 22,
		"zombiePass": 30,
		"End": 95
	}
}
					*/
					break;
				case "InitEnd":
					/*
					{
	"name": "InitEnd",
	"description": "",
	"type": "game",
	"action": "stInitEnd",
	"updateGameProgression": true,
	"transitions": {
		"endtheGame": 99
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
export default darkagent;
