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

const mercadodelisboaste: GamePresence = {
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
				case "playerTurn":
					/*
					{
	"name": "playerTurn",
	"description": "${actplayer} must open a Market, attract a Customer, open a Restaurant or get Money",
	"descriptionmyturn": "${you} must open a Market, attract a Customer, open a Restaurant or get Money",
	"args": "argplayerTurn",
	"type": "activeplayer",
	"possibleactions": [
		"OpenMarket",
		"AttractCustomer",
		"OpenRestaurant",
		"GetMoney",
		"ReshuffleMine",
		"ReshuffleBoard"
	],
	"transitions": {
		"NextPlayer": 5,
		"GainMoney": 3,
		"GainMoney2": 6,
		"GameEnd": 99
	}
}
					*/
					break;
				case "GainMoney":
					/*
					{
	"name": "GainMoney",
	"description": "Gain the money...",
	"type": "game",
	"action": "stGainMoney",
	"updateGameProgression": true,
	"transitions": {
		"PickMarket": 4,
		"GameEnd": 99
	}
}
					*/
					break;
				case "PickMarket":
					/*
					{
	"name": "PickMarket",
	"description": "${actplayer} must take a new Market from the supply",
	"descriptionmyturn": "${you} must take a new Market from the supply",
	"args": "argPickMarket",
	"type": "activeplayer",
	"possibleactions": [
		"PickMarket",
		"ReshuffleBoard"
	],
	"transitions": {
		"NextPlayer": 5,
		"GameEnd": 99
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
	"action": "stNextPlayer",
	"updateGameProgression": true,
	"transitions": {
		"NextPlayer": 2,
		"GameEnd": 99
	}
}
					*/
					break;
				case "GainMoney2":
					/*
					{
	"name": "GainMoney2",
	"description": "Gain the money...",
	"type": "game",
	"action": "stGainMoney2",
	"updateGameProgression": true,
	"transitions": {
		"NextPlayer": 5,
		"GameEnd": 99
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
export default mercadodelisboaste;
