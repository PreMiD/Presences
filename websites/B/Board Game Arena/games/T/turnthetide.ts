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

const turnthetide: GamePresence = {
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
				case "selectCards":
					/*
					{
	"name": "selectCards",
	"type": "multipleactiveplayer",
	"description": "You may change your selection while other players are thinking",
	"descriptionmyturn": "${you} must choose one weather card",
	"possibleactions": [
		"selectCard"
	],
	"transitions": {
		"loopback": 2,
		"nextTide": 4
	},
	"action": "stSelectCardsInit",
	"args": "argSelectCards"
}
					*/
					break;
				case "nextTide":
					/*
					{
	"name": "nextTide",
	"description": "",
	"type": "game",
	"action": "stNextTide",
	"updateGameProgression": true,
	"transitions": {
		"endGame": 99,
		"selectCards": 2
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
export default turnthetide;
