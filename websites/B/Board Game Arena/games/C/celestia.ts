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

const celestia: GamePresence = {
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
				case "captainRoll":
					/*
					{
	"name": "captainRoll",
	"description": "${actplayer} is rolling",
	"descriptionmyturn": "${you} are rolling",
	"type": "game",
	"action": "stCaptainRoll",
	"transitions": {
		"nextPlayer": 30,
		"captainAnnouncement": 6
	}
}
					*/
					break;
				case "playerDecision":
					/*
					{
	"name": "playerDecision",
	"description": "Will ${actplayer} stay or disembark?",
	"descriptionmyturn": "Will ${you} stay or disembark?",
	"type": "activeplayer",
	"possibleactions": [
		"stay",
		"disembark",
		"zombiePass"
	],
	"transitions": {
		"nextPlayer": 30,
		"zombiePass": 30
	}
}
					*/
					break;
				case "ejectionCard":
					/*
					{
	"name": "ejectionCard",
	"description": "Waiting for other players to make a decision.",
	"descriptionmyturn": "Do you want to play an ejection card (if possible)?",
	"type": "multipleactiveplayer",
	"possibleactions": [
		"ejection",
		"pass",
		"zombiePass"
	],
	"transitions": {
		"playEjectionCards": 5
	}
}
					*/
					break;
				case "playEjectionCards":
					/*
					{
	"name": "playEjectionCards",
	"description": "Playing ejection cards.",
	"type": "game",
	"action": "stPlayEjectionCards",
	"transitions": {
		"captainAnnouncement": 6
	}
}
					*/
					break;
				case "captainAnnouncement":
					/*
					{
	"name": "captainAnnouncement",
	"description": "Captain ${actplayer} is making an announcement.",
	"descriptionmyturn": "Will you <span style=\"color:green;\">continue</span> or <span style=\"color:red;\">crash</span>?",
	"args": "argCaptainAnnouncement",
	"type": "activeplayer",
	"possibleactions": [
		"continue",
		"crash",
		"zombiePass"
	],
	"transitions": {
		"preparePowerCards": 31,
		"equipmentCards": 15,
		"airshipCrash": 16
	}
}
					*/
					break;
				case "powerCards":
					/*
					{
	"name": "powerCards",
	"description": "Waiting for other players to make a decision.",
	"descriptionmyturn": "Do you want to play a power card (if possible)?",
	"type": "multipleactiveplayer",
	"args": "argPowerCards",
	"possibleactions": [
		"power",
		"pass",
		"zombiePass"
	],
	"transitions": {
		"playPowerCards": 8
	}
}
					*/
					break;
				case "playPowerCards":
					/*
					{
	"name": "playPowerCards",
	"description": "Playing power cards.",
	"type": "game",
	"action": "stPlayPowerCards",
	"transitions": {
		"equipmentCards": 15,
		"alternativeRoute": 9,
		"preparePowerCards": 31,
		"airshipCrash": 16,
		"captainAnnouncement": 6
	}
}
					*/
					break;
				case "alternativeRoute":
					/*
					{
	"name": "alternativeRoute",
	"description": "${actplayer} is looking for an alternative route",
	"descriptionmyturn": "Please choose which dice you want to reroll (dice with black border will reroll)",
	"type": "activeplayer",
	"possibleactions": [
		"reroll",
		"zombiePass"
	],
	"transitions": {
		"captainAnnouncement": 6
	}
}
					*/
					break;
				case "equipmentCards":
					/*
					{
	"name": "equipmentCards",
	"description": "Playing equipment cards.",
	"type": "game",
	"action": "stPlayEquipmentCards",
	"transitions": {
		"nextCaptain": 17,
		"endGame": 99
	}
}
					*/
					break;
				case "airshipCrash":
					/*
					{
	"name": "airshipCrash",
	"description": "<span style=\"color: red;\">The airship crashed</span>. <span style=\"color: #0095C7;\">A new journey begins</span>.",
	"type": "game",
	"action": "stAirshipCrash",
	"updateGameProgression": true,
	"transitions": {
		"nextCaptain": 17,
		"endGame": 99
	}
}
					*/
					break;
				case "nextCaptain":
					/*
					{
	"name": "nextCaptain",
	"description": "",
	"type": "game",
	"action": "stNextCaptain",
	"transitions": {
		"loneCaptain": 18,
		"captainRoll": 2
	}
}
					*/
					break;
				case "loneCaptain":
					/*
					{
	"name": "loneCaptain",
	"description": "${actplayer} is making a decision.",
	"descriptionmyturn": "Do you want to continue your journey alone?",
	"type": "activeplayer",
	"possibleactions": [
		"stay",
		"disembark",
		"zombiePass"
	],
	"transitions": {
		"captainRoll": 2,
		"reset": 19
	}
}
					*/
					break;
				case "reset":
					/*
					{
	"name": "reset",
	"description": "",
	"type": "game",
	"action": "stReset",
	"updateGameProgression": true,
	"transitions": {
		"nextCaptain": 17,
		"endGame": 99
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
	"action": "stNextPlayer",
	"transitions": {
		"playerDecision": 3,
		"ejectionCard": 4,
		"skip": 5,
		"captainAnnouncement": 6
	}
}
					*/
					break;
				case "preparePowerCards":
					/*
					{
	"name": "preparePowerCards",
	"description": "",
	"type": "game",
	"action": "stPreparePowerCards",
	"transitions": {
		"powerCards": 7,
		"skip": 8
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
export default celestia;
