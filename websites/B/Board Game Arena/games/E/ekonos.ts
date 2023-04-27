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

const ekonos: GamePresence = {
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
		"": 10
	}
}
					*/
					break;
				case "playCard":
					/*
					{
	"name": "playCard",
	"description": "${actplayer} must play a card",
	"descriptionmyturn": "${you} must play a card",
	"type": "activeplayer",
	"possibleactions": [
		"playCardMap",
		"playCardGrow"
	],
	"transitions": {
		"done": 14,
		"checkPresident": 11,
		"zombiePass": 15
	}
}
					*/
					break;
				case "growCheckPresident":
					/*
					{
	"name": "growCheckPresident",
	"description": "",
	"type": "game",
	"action": "st_growCheckPresident",
	"updateGameProgression": false,
	"transitions": {
		"growTriggered": 12,
		"noGrow": 14,
		"endGame": 99
	}
}
					*/
					break;
				case "growCompany":
					/*
					{
	"name": "growCompany",
	"description": "As president, ${actplayer} is managing ${company} expansion",
	"descriptionmyturn": "",
	"args": "getGrowCompanyArgs",
	"type": "activeplayer",
	"possibleactions": [
		"growCompanyDone",
		"growCompanyPass"
	],
	"transitions": {
		"growCompanyDone": 13,
		"growCompanyPass": 13,
		"zombiePass": 15
	}
}
					*/
					break;
				case "resumeWithSellBuy":
					/*
					{
	"name": "resumeWithSellBuy",
	"description": "",
	"type": "game",
	"action": "st_resumeWithSellBuy",
	"updateGameProgression": false,
	"transitions": {
		"resume": 14
	}
}
					*/
					break;
				case "sellBuy":
					/*
					{
	"name": "sellBuy",
	"description": "${actplayer} is deciding whether to sell and/or buy",
	"descriptionmyturn": "",
	"type": "activeplayer",
	"possibleactions": [
		"sellBuyDone"
	],
	"transitions": {
		"sellBuyDone": 15,
		"zombiePass": 15
	}
}
					*/
					break;
				case "endTurn":
					/*
					{
	"name": "endTurn",
	"description": "",
	"type": "game",
	"action": "st_endTurn",
	"updateGameProgression": true,
	"transitions": {
		"nextTurn": 10,
		"endRound": 20,
		"endGame": 99
	}
}
					*/
					break;
				case "endRound":
					/*
					{
	"name": "endRound",
	"description": "End of round",
	"type": "game",
	"action": "st_endRound",
	"updateGameProgression": false,
	"transitions": {
		"nextTurn": 10,
		"endGame": 99
	}
}
					*/
					break;
				case "gameEnd":
					/*
					{
	"name": "gameEnd",
	"description": "Game over",
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
export default ekonos;
