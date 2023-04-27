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

const fortheking: GamePresence = {
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
		"": 55
	}
}
					*/
					break;
				case "DistributeCards":
					/*
					{
	"name": "DistributeCards",
	"description": "${actplayer} must assign the card to himself, to the Favor deck or put it face up in the middle of the table.",
	"descriptionmyturn": "${you} must assign the card to yourself, to the Favor deck or put it face up in the middle of the table.",
	"type": "activeplayer",
	"action": "stDistributeCards",
	"args": "argDistributeCards",
	"possibleactions": [
		"AssignMe",
		"AssignCenter",
		"AssignGovernment"
	],
	"transitions": {
		"DistributeCards": 2,
		"ChooseCentralCards": 3,
		"ModifyDuties": 6
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
		"NextPlayer": 4
	}
}
					*/
					break;
				case "ChooseCentralCards":
					/*
					{
	"name": "ChooseCentralCards",
	"description": "${actplayer} must choose one central card.",
	"descriptionmyturn": "${you} must choose one central card.",
	"type": "activeplayer",
	"action": "stChooseCentralCards",
	"args": "argChooseCentralCards",
	"possibleactions": [
		"ChooseCard"
	],
	"transitions": {
		"NextPlayer": 3,
		"NextAdviser": 5,
		"ModifyDuties": 6
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
		"NextPlayer": 2,
		"GainEsteem": 7
	}
}
					*/
					break;
				case "ModifyDuties":
					/*
					{
	"name": "ModifyDuties",
	"description": "${actplayer} must modify one duty value selecting it on the board.",
	"descriptionmyturn": "${you} must modify one duty value selecting it on the board.",
	"type": "activeplayer",
	"action": "stModifyDuties",
	"args": "argModifyDuties",
	"possibleactions": [
		"Confirm",
		"ConfirmSwapped"
	],
	"transitions": {
		"DistributeCards": 2,
		"ChooseCentralCards": 3,
		"GainEsteem": 11
	}
}
					*/
					break;
				case "GainEsteem":
					/*
					{
	"name": "GainEsteem",
	"description": "${actplayer} must bid for gaining the esteem or pass.",
	"descriptionmyturn": "${you} must bid for gaining the esteem or pass.",
	"type": "activeplayer",
	"action": "stGainEsteem",
	"args": "argGainEsteem",
	"possibleactions": [
		"Bid",
		"Pass"
	],
	"transitions": {
		"NextPlayer": 8,
		"PayCard": 9,
		"NextEsteem": 11
	}
}
					*/
					break;
				case "NextPlayer3":
					/*
					{
	"name": "NextPlayer3",
	"description": "Changing player...",
	"type": "game",
	"action": "stNextPlayer3",
	"updateGameProgression": true,
	"transitions": {
		"NextPlayer": 7
	}
}
					*/
					break;
				case "NextPlayer4":
					/*
					{
	"name": "NextPlayer4",
	"description": "Changing player...",
	"type": "game",
	"action": "stNextPlayer4",
	"updateGameProgression": true,
	"transitions": {
		"NextPlayer": 10
	}
}
					*/
					break;
				case "PayCard":
					/*
					{
	"name": "PayCard",
	"description": "${actplayer} must pay for the card gained or pass.",
	"descriptionmyturn": "${you} must pay for the card gained or pass.",
	"type": "activeplayer",
	"action": "stPayCard",
	"args": "argPayCard",
	"possibleactions": [
		"Pay",
		"Pass"
	],
	"transitions": {
		"NextPlayer": 11,
		"ModifyDuties": 6,
		"NextPlayer2": 12
	}
}
					*/
					break;
				case "NextPlayer5":
					/*
					{
	"name": "NextPlayer5",
	"description": "Changing player...",
	"type": "game",
	"action": "stNextPlayer5",
	"updateGameProgression": true,
	"transitions": {
		"NextPlayer": 7,
		"GameEnd": 99
	}
}
					*/
					break;
				case "NextPlayer6":
					/*
					{
	"name": "NextPlayer6",
	"description": "Changing player...",
	"type": "game",
	"action": "stNextPlayer6",
	"updateGameProgression": true,
	"transitions": {
		"NextPlayer": 7,
		"NextEsteem": 11,
		"GameEnd": 99
	}
}
					*/
					break;
				case "SelectNoble":
					/*
					{
	"name": "SelectNoble",
	"description": "${actplayer} must select a noble.",
	"descriptionmyturn": "${you} must select a noble.",
	"type": "activeplayer",
	"action": "stSelectNoble",
	"args": "argSelectNoble",
	"possibleactions": [
		"SelectNoble"
	],
	"transitions": {
		"NextPlayer": 56
	}
}
					*/
					break;
				case "NextPlayer7":
					/*
					{
	"name": "NextPlayer7",
	"description": "Changing player...",
	"type": "game",
	"action": "stNextPlayer7",
	"updateGameProgression": true,
	"transitions": {
		"NextPlayer": 55,
		"DistributeCards": 2
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
export default fortheking;
