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

const forex: GamePresence = {
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
				case "playerAction":
					/*
					{
	"name": "playerAction",
	"description": "${actplayer} must choose an action",
	"descriptionmyturn": "${you} must choose an action",
	"type": "activeplayer",
	"possibleactions": [
		"offerSpotTrade",
		"makeContract",
		"investCurrency",
		"divestCurrency",
		"resolve"
	],
	"transitions": {
		"spotOffer": 21,
		"nextPlayer": 3,
		"divest": 50,
		"chooseCurrency": 4,
		"endGame": 70
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
	"updateGameProgression": true,
	"action": "stNextPlayer",
	"transitions": {
		"": 2
	}
}
					*/
					break;
				case "strengthenCurrency":
					/*
					{
	"name": "strengthenCurrency",
	"description": "${actplayer} must choose currency to strengthen",
	"descriptionmyturn": "${you} must choose currency to strengthen",
	"type": "activeplayer",
	"possibleactions": [
		"chooseCurrencyToStrengthen"
	],
	"transitions": {
		"nextPlayer": 3,
		"endGame": 70
	}
}
					*/
					break;
				case "offerResponse":
					/*
					{
	"name": "offerResponse",
	"description": "${from_player_name} offered ${to_player_name} a Spot Trade of ${x_monies1} for ${x_monies2}${x_monies}",
	"descriptionmyturn": "${from_player_name} offered ${to_player_name} a Spot Trade of ${x_monies1} for ${x_monies2}${x_monies}",
	"type": "activeplayer",
	"possibleactions": [
		"respondSpotTrade",
		"cancelSpotTrade"
	],
	"args": "argsSpotOffer",
	"transitions": {
		"": 22
	}
}
					*/
					break;
				case "spotTrade":
					/*
					{
	"name": "spotTrade",
	"description": "",
	"type": "game",
	"action": "stSpotOffer",
	"transitions": {
		"getResponse": 20
	}
}
					*/
					break;
				case "spotResponse":
					/*
					{
	"name": "spotResponse",
	"description": "",
	"type": "game",
	"action": "stSpotResponse",
	"transitions": {
		"": 2
	}
}
					*/
					break;
				case "divest":
					/*
					{
	"name": "divest",
	"description": "",
	"type": "game",
	"action": "stDivest",
	"transitions": {
		"divest": 50,
		"nextDivest": 51,
		"lastDivest": 3
	}
}
					*/
					break;
				case "nextDivest":
					/*
					{
	"name": "nextDivest",
	"description": "${actplayer} may sell ${currency} Certificates",
	"descriptionmyturn": "${you} may sell ${currency} Certificates",
	"type": "activeplayer",
	"args": "argsSellCertificates",
	"possibleactions": [
		"optDivestCurrency"
	],
	"transitions": {
		"divest": 50
	}
}
					*/
					break;
				case "lastresolve":
					/*
					{
	"name": "lastresolve",
	"description": "",
	"type": "game",
	"action": "stLastResolve",
	"transitions": {
		"chooseStrongest": 75,
		"scoring": 98
	}
}
					*/
					break;
				case "strongestCurrency":
					/*
					{
	"name": "strongestCurrency",
	"description": "${actplayer} must choose currency for final scoring",
	"descriptionmyturn": "${you} must choose currency for final scoring",
	"type": "activeplayer",
	"args": "argsChooseCurrency",
	"possibleactions": [
		"chooseStrongestCurrency"
	],
	"transitions": {
		"": 98
	}
}
					*/
					break;
				case "scoring":
					/*
					{
	"name": "scoring",
	"description": "",
	"type": "game",
	"action": "stScoring",
	"transitions": {
		"": 99
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
export default forex;
