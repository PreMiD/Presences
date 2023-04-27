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

const chicagoexpress: GamePresence = {
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
				case "initialAuction":
					/*
					{
	"name": "initialAuction",
	"type": "game",
	"action": "stInitialAuction",
	"transitions": {
		"startAuction": 30,
		"auctionsComplete": 20
	}
}
					*/
					break;
				case "playerTurn":
					/*
					{
	"name": "playerTurn",
	"description": "${actplayer} must choose an action",
	"descriptionmyturn": "${you} must choose an action",
	"type": "activeplayer",
	"possibleactions": [
		"startAuction",
		"startDevelopment",
		"startExpansion",
		"passExpansion",
		"passAuction"
	],
	"transitions": {
		"startAuction": 30,
		"startDevelopment": 50,
		"startExpansion": 40,
		"passAuction": 60,
		"passExpansion": 60,
		"zombiePass": 60
	}
}
					*/
					break;
				case "auction":
					/*
					{
	"name": "auction",
	"description": "Auction: ${actplayer} must bid or pass",
	"descriptionmyturn": "Auction: ${you} must bid or pass",
	"type": "activeplayer",
	"args": "argAuction",
	"possibleactions": [
		"bid",
		"passAuctionBid"
	],
	"transitions": {
		"continueAuction": 31,
		"zombiePass": 31
	}
}
					*/
					break;
				case "auctionNextStep":
					/*
					{
	"name": "auctionNextStep",
	"type": "game",
	"action": "stAuctionNextStep",
	"transitions": {
		"nextPlayer": 30,
		"complete": 60
	},
	"updateGameProgression": true
}
					*/
					break;
				case "expansion":
					/*
					{
	"name": "expansion",
	"description": "${actplayer} may expand the ${company_name} route (${remaining} remaining)",
	"descriptionmyturn": "${you} may expand the ${company_name} route (${remaining} remaining)",
	"type": "activeplayer",
	"args": "argExpansion",
	"possibleactions": [
		"expand",
		"endExpansion",
		"cancel"
	],
	"transitions": {
		"continueExpansion": 40,
		"stockEmpty": 41,
		"endExpansion": 60,
		"cancel": 20,
		"zombiePass": 60
	}
}
					*/
					break;
				case "expansionConfirm":
					/*
					{
	"name": "expansionConfirm",
	"description": "${actplayer} must confirm their expansion",
	"descriptionmyturn": "${you} must confirm your expansion",
	"type": "activeplayer",
	"possibleactions": [
		"endExpansion",
		"cancel"
	],
	"transitions": {
		"endExpansion": 60,
		"cancel": 20
	}
}
					*/
					break;
				case "development":
					/*
					{
	"name": "development",
	"description": "${actplayer} must choose a hex to develop",
	"descriptionmyturn": "${you} must choose a hex to develop",
	"type": "activeplayer",
	"args": "argDevelopment",
	"possibleactions": [
		"develop",
		"endDevelop",
		"passDevelopment",
		"cancel"
	],
	"transitions": {
		"confirmDevelopment": 51,
		"passDevelopment": 60,
		"cancel": 20,
		"zombiePass": 60
	}
}
					*/
					break;
				case "developmentConfirm":
					/*
					{
	"name": "developmentConfirm",
	"description": "${actplayer} must confirm their development",
	"descriptionmyturn": "${you} must confirm your development",
	"type": "activeplayer",
	"possibleactions": [
		"endDevelopment",
		"cancel"
	],
	"transitions": {
		"endDevelopment": 60,
		"cancel": 20
	}
}
					*/
					break;
				case "endOfTurn":
					/*
					{
	"name": "endOfTurn",
	"type": "game",
	"action": "stEndOfTurn",
	"transitions": {
		"next": 20,
		"dividend": 71,
		"chicago": 72,
		"nextInitialAuction": 2
	},
	"updateGameProgression": true
}
					*/
					break;
				case "dividendPhase":
					/*
					{
	"name": "dividendPhase",
	"description": "Dividend Phase",
	"type": "game",
	"action": "stDividendPhase",
	"transitions": {
		"next": 20,
		"end": 98
	}
}
					*/
					break;
				case "chicagoPhase":
					/*
					{
	"name": "chicagoPhase",
	"description": "Chicago Phase",
	"type": "game",
	"action": "stChicagoPhase",
	"transitions": {
		"startAuction": 30,
		"next": 60
	}
}
					*/
					break;
				case "scoringEnd":
					/*
					{
	"name": "scoringEnd",
	"description": "Computing scores",
	"type": "game",
	"action": "stScoringEnd",
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
export default chicagoexpress;
