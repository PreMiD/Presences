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

const imtheboss: GamePresence = {
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
				case "SelectStartSpace":
					/*
					{
	"name": "SelectStartSpace",
	"description": "${actplayer} must select the start space.",
	"descriptionmyturn": "${you} must select the start space.",
	"type": "activeplayer",
	"args": "argSelectStartSpace",
	"updateGameProgression": true,
	"action": "stSelectStartSpace",
	"possibleactions": [
		"SelectStart"
	],
	"transitions": {
		"PlayerTurn": 11
	}
}
					*/
					break;
				case "playerTurn":
					/*
					{
	"name": "playerTurn",
	"description": "${actplayer} make a deal or roll the die and move the dollar token.",
	"descriptionmyturn": "${you} make a deal or roll the die and move the dollar token.",
	"type": "activeplayer",
	"args": "argplayerTurn",
	"updateGameProgression": true,
	"action": "stplayerTurn",
	"possibleactions": [
		"MakeDeal",
		"MoveDollar"
	],
	"transitions": {
		"Deal": 6,
		"MoveDollar": 4
	}
}
					*/
					break;
				case "playerTurn2":
					/*
					{
	"name": "playerTurn2",
	"description": "${actplayer} make a deal or draw three cards.",
	"descriptionmyturn": "${you} make a deal or draw three cards.",
	"type": "activeplayer",
	"args": "argplayerTurn2",
	"updateGameProgression": true,
	"action": "stplayerTurn2",
	"possibleactions": [
		"MakeDeal",
		"DrawCards"
	],
	"transitions": {
		"Deal": 6,
		"NextPlayer": 10,
		"Discard": 12
	}
}
					*/
					break;
				case "Deal":
					/*
					{
	"name": "Deal",
	"description": "${actplayer} make a deal with his own Clan cards.",
	"descriptionmyturn": "${you} make a deal with your own Clan cards.",
	"type": "activeplayer",
	"args": "argDeal",
	"updateGameProgression": true,
	"action": "stDeal",
	"possibleactions": [
		"PlayCard",
		"Negotiation",
		"ConcludeDeal"
	],
	"transitions": {
		"Negotiation": 6,
		"NextPlayer": 10,
		"RollingDie": 13,
		"GameEnd": 99
	}
}
					*/
					break;
				case "Negotiation":
					/*
					{
	"name": "Negotiation",
	"description": "The boss must play his Clan cards or ask other player help for negotiating the deal.",
	"descriptionmyturn": "${you} must play your Clan cards or ask other player help for negotiating the deal.",
	"type": "multipleactiveplayer",
	"action": "stNegotiation",
	"args": "argNegotiation",
	"updateGameProgression": true,
	"possibleactions": [
		"PlayCard",
		"Offer",
		"ConcludeDeal",
		"Breakdown",
		"CancelOffer"
	],
	"transitions": {
		"Paused": 6,
		"NextPlayer": 10,
		"RollingDie": 13,
		"MakeOffer": 14,
		"StopBoss": 15,
		"ChangeBoss": 16,
		"StopTrip": 17,
		"StopRecruitment": 20
	}
}
					*/
					break;
				case "NextPlayer":
					/*
					{
	"name": "NextPlayer",
	"description": "Changing player...",
	"type": "game",
	"updateGameProgression": true,
	"action": "stNextPlayer",
	"transitions": {
		"NextPlayer": 3
	}
}
					*/
					break;
				case "NextPlayer2":
					/*
					{
	"name": "NextPlayer2",
	"description": "Changing player...",
	"type": "game",
	"action": "stNextPlayer2",
	"updateGameProgression": true,
	"transitions": {
		"NextPlayer": 3
	}
}
					*/
					break;
				case "DiscardCards":
					/*
					{
	"name": "DiscardCards",
	"description": "${actplayer} discard cards.",
	"descriptionmyturn": "${you} discard cards.",
	"type": "activeplayer",
	"args": "argDiscardCards",
	"updateGameProgression": true,
	"action": "stDiscardCards",
	"possibleactions": [
		"Discard"
	],
	"transitions": {
		"NextPlayer": 10
	}
}
					*/
					break;
				case "RollingDie":
					/*
					{
	"name": "RollingDie",
	"description": "${actplayer} rolls the die to determine if the game is over.",
	"descriptionmyturn": "${you} rolls the die to determine if the game is over.",
	"type": "activeplayer",
	"args": "argRollingDie",
	"updateGameProgression": true,
	"action": "stRollingDie",
	"possibleactions": [
		"Continue"
	],
	"transitions": {
		"NextPlayer": 10,
		"GameEnd": 99
	}
}
					*/
					break;
				case "DecideOffer":
					/*
					{
	"name": "DecideOffer",
	"description": "${actplayer} must decide if to accept or reject the offer.",
	"descriptionmyturn": "${you} must decide if to accept or reject the offer.",
	"type": "activeplayer",
	"args": "argDecideOffer",
	"updateGameProgression": true,
	"action": "stDecideOffer",
	"possibleactions": [
		"Accept",
		"Reject"
	],
	"transitions": {
		"GoBack": 6
	}
}
					*/
					break;
				case "StopBoss":
					/*
					{
	"name": "StopBoss",
	"description": "${actplayer} must decide if to stop the Boss card or not.",
	"descriptionmyturn": "${you} must decide if to stop the Boss card or not.",
	"type": "activeplayer",
	"args": "argStopBoss",
	"updateGameProgression": true,
	"action": "stStopBoss",
	"possibleactions": [
		"StopBoss",
		"NotStopBoss"
	],
	"transitions": {
		"GoBack": 6,
		"ChangeBoss": 16
	}
}
					*/
					break;
				case "ChangeBoss":
					/*
					{
	"name": "ChangeBoss",
	"description": "Changing the boss...",
	"type": "game",
	"updateGameProgression": true,
	"action": "stChangeBoss",
	"transitions": {
		"GoBack": 6
	}
}
					*/
					break;
				case "ChangePlayerTrip":
					/*
					{
	"name": "ChangePlayerTrip",
	"description": "Changing the player...",
	"type": "game",
	"updateGameProgression": true,
	"action": "stChangePlayerTrip",
	"transitions": {
		"Next": 18
	}
}
					*/
					break;
				case "StopTrip":
					/*
					{
	"name": "StopTrip",
	"description": "${actplayer} must decide if to stop the Travel card or not.",
	"descriptionmyturn": "${you} must decide if to stop the Travel card or not.",
	"type": "activeplayer",
	"args": "argStopTrip",
	"updateGameProgression": true,
	"action": "stStopTrip",
	"possibleactions": [
		"StopTrip",
		"NotStopTrip"
	],
	"transitions": {
		"Next": 19
	}
}
					*/
					break;
				case "ChangePlayerTrip2":
					/*
					{
	"name": "ChangePlayerTrip2",
	"description": "Changing the player...",
	"type": "game",
	"updateGameProgression": true,
	"action": "stChangePlayerTrip2",
	"transitions": {
		"GoBack": 6
	}
}
					*/
					break;
				case "ChangePlayerRecruitment":
					/*
					{
	"name": "ChangePlayerRecruitment",
	"description": "Changing the player...",
	"type": "game",
	"updateGameProgression": true,
	"action": "stChangePlayerRecruitment",
	"transitions": {
		"Next": 21
	}
}
					*/
					break;
				case "StopRecruitment":
					/*
					{
	"name": "StopRecruitment",
	"description": "${actplayer} must decide if to stop the 3 Recruitment cards or not.",
	"descriptionmyturn": "${you} must decide if to stop the 3 Recruitment cards or not.",
	"type": "activeplayer",
	"args": "argStopRecruitment",
	"updateGameProgression": true,
	"action": "stStopRecruitment",
	"possibleactions": [
		"StopRecruitment",
		"NotStopRecruitment"
	],
	"transitions": {
		"Next": 22
	}
}
					*/
					break;
				case "ChangePlayerRecruitment2":
					/*
					{
	"name": "ChangePlayerRecruitment2",
	"description": "Changing the player...",
	"type": "game",
	"updateGameProgression": true,
	"action": "stChangePlayerRecruitment2",
	"transitions": {
		"GoBack": 6
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
export default imtheboss;
