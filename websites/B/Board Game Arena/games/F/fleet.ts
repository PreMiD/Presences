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

const fleet: GamePresence = {
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
				case "auction":
					/*
					{
	"name": "auction",
	"description": "${actplayer} must bid or pass",
	"descriptionmyturn": "${you} may select a license to bid on or pass",
	"type": "activeplayer",
	"possibleactions": [
		"bid",
		"buyLicense",
		"pass"
	],
	"transitions": {
		"": 9
	}
}
					*/
					break;
				case "launch":
					/*
					{
	"name": "launch",
	"description": "${actplayer} may launch a boat",
	"descriptionmyturn": "${you} may launch a boat",
	"type": "activeplayer",
	"possibleactions": [
		"launchBoat",
		"pass"
	],
	"transitions": {
		"": 9
	}
}
					*/
					break;
				case "hire":
					/*
					{
	"name": "hire",
	"description": "${actplayer} may hire a captain",
	"descriptionmyturn": "${you} may hire a captain",
	"type": "activeplayer",
	"possibleactions": [
		"hireCaptain",
		"pass"
	],
	"transitions": {
		"": 9
	}
}
					*/
					break;
				case "processing":
					/*
					{
	"name": "processing",
	"description": "Other players may process and trade fish crates",
	"descriptionmyturn": "${you} may process fish crates",
	"type": "multipleactiveplayer",
	"action": "stProcessing",
	"args": "argsProcessing",
	"possibleactions": [
		"processFish",
		"tradeFish",
		"pass"
	],
	"transitions": {
		"": 9
	}
}
					*/
					break;
				case "draw":
					/*
					{
	"name": "draw",
	"description": "Other players must discard a card",
	"descriptionmyturn": "${you} must discard a card",
	"type": "multipleactiveplayer",
	"action": "stDraw",
	"possibleactions": [
		"discard"
	],
	"transitions": {
		"": 9
	}
}
					*/
					break;
				case "nextPlayer":
					/*
					{
	"name": "nextPlayer",
	"type": "game",
	"action": "stNextPlayer",
	"updateGameProgression": true,
	"transitions": {
		"auction": 2,
		"launch": 3,
		"hire": 4,
		"launchHire": 11,
		"processing": 6,
		"draw": 8,
		"cantPlay": 9,
		"finalScore": 10
	}
}
					*/
					break;
				case "finalScore":
					/*
					{
	"name": "finalScore",
	"type": "game",
	"action": "stFinalScore",
	"transitions": {
		"": 99
	}
}
					*/
					break;
				case "launchHire":
					/*
					{
	"name": "launchHire",
	"description": "Other players may launch boats and/or hire captains",
	"descriptionmyturn": "${you} may launch a boat",
	"type": "multipleactiveplayer",
	"action": "stLaunchHire",
	"args": "argsLaunchHire",
	"possibleactions": [
		"launchBoat",
		"hireCaptain",
		"pass"
	],
	"transitions": {
		"": 9
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
export default fleet;
