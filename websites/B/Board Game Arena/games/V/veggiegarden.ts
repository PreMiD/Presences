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

const veggiegarden: GamePresence = {
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
				case "startTurn":
					/*
					{
	"name": "startTurn",
	"description": "a new turn starts...",
	"type": "game",
	"action": "ststartTurn",
	"updateGameProgression": true,
	"transitions": {
		"playerpick": 3
	}
}
					*/
					break;
				case "playerpick":
					/*
					{
	"name": "playerpick",
	"type": "activeplayer",
	"description": "${actplayer} has to pick a veggie from the harvest",
	"descriptionmyturn": "${you} have to pick a veggie from the harvest",
	"action": "stplayerpick",
	"possibleactions": [
		"pickcard"
	],
	"transitions": {
		"selectTarget": 4,
		"endTurn": 6,
		"selectDestination": 5,
		"gameEndScoring": 90
	}
}
					*/
					break;
				case "selectTarget":
					/*
					{
	"name": "selectTarget",
	"type": "activeplayer",
	"description": "${actplayer} has to select a target for the card effect",
	"descriptionmyturn": "${you} have to select a target for the card effect",
	"action": "stTarget",
	"args": "argPossibleTargets",
	"possibleactions": [
		"selectTarget",
		"pickcard"
	],
	"transitions": {
		"selectDestination": 5,
		"selectTarget": 4
	}
}
					*/
					break;
				case "selectDestination":
					/*
					{
	"name": "selectDestination",
	"type": "activeplayer",
	"description": "${actplayer} has to select a destination for the card effect",
	"descriptionmyturn": "${you} have to select a destination for the card effect",
	"action": "stDestination",
	"args": "argPossibleDestinations",
	"possibleactions": [
		"selectDestination",
		"cancel"
	],
	"transitions": {
		"endTurn": 6,
		"playerpick": 3
	}
}
					*/
					break;
				case "endTurn":
					/*
					{
	"name": "endTurn",
	"description": "end of the turn",
	"type": "game",
	"action": "stendTurn",
	"updateGameProgression": false,
	"transitions": {
		"": 2
	}
}
					*/
					break;
				case "gameEndScoring":
					/*
					{
	"description": "Final Score",
	"name": "gameEndScoring",
	"type": "game",
	"action": "stGameEndScoring",
	"updateGameProgression": true,
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
export default veggiegarden;
