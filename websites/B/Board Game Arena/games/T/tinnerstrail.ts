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

const tinnerstrail: GamePresence = {
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
				case "InitialSetup":
					/*
					{
	"name": "InitialSetup",
	"description": "Other players must select their Survey Cards.",
	"descriptionmyturn": "${you} must select one Survey Card for each letter.",
	"type": "multipleactiveplayer",
	"action": "stInitialSetup",
	"args": "argInitialSetup",
	"possibleactions": [
		"SelectCards"
	],
	"transitions": {
		"SetupDone": 4
	}
}
					*/
					break;
				case "SetTinPrice":
					/*
					{
	"name": "SetTinPrice",
	"description": "Rolling the dice for the Tin Price...",
	"type": "game",
	"action": "stSetTinPrice",
	"updateGameProgression": true,
	"transitions": {
		"SetTinPriceResult": 5
	}
}
					*/
					break;
				case "SetCopperPrice":
					/*
					{
	"name": "SetCopperPrice",
	"description": "Rolling the dice for the Copper Price...",
	"type": "game",
	"action": "stSetCopperPrice",
	"updateGameProgression": true,
	"transitions": {
		"ActionPhase": 6
	}
}
					*/
					break;
				case "ActionPhase":
					/*
					{
	"name": "ActionPhase",
	"description": "${actplayer} must select an action to perform",
	"descriptionmyturn": "${you} must select an action to perform",
	"type": "activeplayer",
	"action": "stActionPhase",
	"args": "argActionPhase",
	"updateGameProgression": true,
	"possibleactions": [
		"BuildMine",
		"ExtractOre",
		"SellPasties",
		"DevelopmentActions",
		"Pass"
	],
	"transitions": {
		"BuildMine": 7,
		"ExtractOre": 8,
		"DevelopmentActions": 10,
		"Pass": 11,
		"NextPlayer": 79
	}
}
					*/
					break;
				case "BuildMine":
					/*
					{
	"name": "BuildMine",
	"description": "${actplayer} must select an area and place an initial bid",
	"descriptionmyturn": "${you} must select an area and place an initial bid",
	"type": "activeplayer",
	"args": "argBuildMine",
	"action": "stBuildMine",
	"updateGameProgression": true,
	"possibleactions": [
		"Bid",
		"PassBid",
		"Back"
	],
	"transitions": {
		"SameBid": 7,
		"NextBid": 77,
		"Back": 6
	}
}
					*/
					break;
				case "ExtractOre":
					/*
					{
	"name": "ExtractOre",
	"description": "${actplayer} must select tin and copper to extract",
	"descriptionmyturn": "${you} must select tin and copper to extract",
	"type": "activeplayer",
	"args": "argExtractOre",
	"updateGameProgression": true,
	"possibleactions": [
		"ExtractOre",
		"Back"
	],
	"transitions": {
		"NextPlayer": 79,
		"Back": 6
	}
}
					*/
					break;
				case "DevelopmentActions":
					/*
					{
	"name": "DevelopmentActions",
	"description": "${actplayer} must perform a development action",
	"descriptionmyturn": "${you} must perform a development action",
	"type": "activeplayer",
	"args": "argDevelopmentActions",
	"updateGameProgression": true,
	"possibleactions": [
		"DevelopmentActions",
		"Back"
	],
	"transitions": {
		"NextPlayer": 79,
		"Back": 6
	}
}
					*/
					break;
				case "Pass":
					/*
					{
	"name": "Pass",
	"description": "Changing active player...",
	"type": "game",
	"action": "stPass",
	"updateGameProgression": true,
	"transitions": {
		"SellInvest": 12,
		"ActionPhase": 6
	}
}
					*/
					break;
				case "SellInvest":
					/*
					{
	"name": "SellInvest",
	"description": "${actplayer} may invest or pass",
	"descriptionmyturn": "${you} may invest or pass",
	"type": "activeplayer",
	"action": "stSellInvest",
	"args": "argSellInvest",
	"updateGameProgression": true,
	"possibleactions": [
		"Invest",
		"Pass"
	],
	"transitions": {
		"ChangePlayer": 13,
		"GameEnd": 99
	}
}
					*/
					break;
				case "Pass2":
					/*
					{
	"name": "Pass2",
	"description": "Changing active player...",
	"type": "game",
	"action": "stPass2",
	"updateGameProgression": true,
	"transitions": {
		"SellInvest": 12,
		"EndTurn": 14
	}
}
					*/
					break;
				case "EndTurn":
					/*
					{
	"name": "EndTurn",
	"description": "${actplayer} may look at one face down area tile",
	"descriptionmyturn": "${you} may look at one face down area tile",
	"type": "activeplayer",
	"updateGameProgression": true,
	"possibleactions": [
		"PassPeek",
		"Peek"
	],
	"transitions": {
		"ChangePlayer": 15
	}
}
					*/
					break;
				case "Pass3":
					/*
					{
	"name": "Pass3",
	"description": "Changing active player...",
	"type": "game",
	"action": "stPass3",
	"updateGameProgression": true,
	"transitions": {
		"SetTinPrice": 4,
		"EndTurn": 14
	}
}
					*/
					break;
				case "NextBid":
					/*
					{
	"name": "NextBid",
	"description": "Changing active player...",
	"type": "game",
	"action": "stNextBid",
	"updateGameProgression": true,
	"transitions": {
		"BuildMine": 7,
		"ActionPhase": 6,
		"PlaySurveyCard": 78
	}
}
					*/
					break;
				case "PlaySurveyCard":
					/*
					{
	"name": "PlaySurveyCard",
	"description": "${actplayer} could play a Survey Card",
	"descriptionmyturn": "${you} could play a Survey Card",
	"type": "activeplayer",
	"args": "argPlaySurveyCard",
	"updateGameProgression": true,
	"possibleactions": [
		"PlayCard",
		"PassPlayCard"
	],
	"transitions": {
		"PassPlayCard": 79,
		"ActionPhase": 6
	}
}
					*/
					break;
				case "PassPlayCard":
					/*
					{
	"name": "PassPlayCard",
	"description": "Changing active player...",
	"type": "game",
	"action": "stPassPlayCard",
	"updateGameProgression": true,
	"transitions": {
		"ActionPhase": 6
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
export default tinnerstrail;
