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

const thegnomesofzavandor: GamePresence = {
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
				case "SoilSamples":
					/*
					{
	"name": "SoilSamples",
	"description": "${actplayer} may take soil samples for 1 gold each.",
	"descriptionmyturn": "${you} may take soil samples for 1 gold each.",
	"type": "activeplayer",
	"action": "stSoilSamples",
	"args": "argSoilSamples",
	"updateGameProgression": true,
	"possibleactions": [
		"SoilSamples",
		"pass"
	],
	"transitions": {
		"Action": 3,
		"zombiePass": 3
	}
}
					*/
					break;
				case "ActionPhase":
					/*
					{
	"name": "ActionPhase",
	"description": "${actplayer} must perform one action.",
	"descriptionmyturn": "${you} must perform one action.",
	"type": "activeplayer",
	"args": "argActionPhase",
	"updateGameProgression": true,
	"possibleactions": [
		"Take4Golds",
		"Buy",
		"Sell",
		"BuyMiningRights",
		"TakeTrader",
		"TradeGems",
		"Draw2Jewelry",
		"Draw2Artifacts",
		"BuyJACard"
	],
	"transitions": {
		"NextPlayer": 4,
		"DrawCard": 33,
		"Mining": 5,
		"zombiePass": 4
	}
}
					*/
					break;
				case "NextPlayer":
					/*
					{
	"name": "NextPlayer",
	"description": "Changing active player...",
	"type": "game",
	"action": "stNextPlayer",
	"updateGameProgression": true,
	"transitions": {
		"SoilSamples": 2
	}
}
					*/
					break;
				case "SelectGems":
					/*
					{
	"name": "SelectGems",
	"description": "Other players must select gems they want to mine and pay gold to the Hoovermatic owner.",
	"descriptionmyturn": "${you} must select gems you want to mine and pay gold to the Hoovermatic owner.",
	"type": "multipleactiveplayer",
	"action": "stSelectGems",
	"possibleactions": [
		"SelectGems"
	],
	"transitions": {
		"Mining": 55,
		"zombiePass": 55,
		"GameEnd": 99
	}
}
					*/
					break;
				case "Mining2":
					/*
					{
	"name": "Mining2",
	"description": "Other players must select one Gemstone for each Wild Gemstone symbols.",
	"descriptionmyturn": "${you} must select one Gemstone for each Wild Gemstone symbols.",
	"type": "activeplayer",
	"action": "stMining2",
	"args": "argMining2",
	"possibleactions": [
		"MineGem"
	],
	"updateGameProgression": true,
	"transitions": {
		"NextPlayer": 66,
		"Mining": 7,
		"GameEnd": 99,
		"zombiePass": 66
	}
}
					*/
					break;
				case "Mining3":
					/*
					{
	"name": "Mining3",
	"description": "Mining Phase...",
	"type": "game",
	"action": "stMining3",
	"updateGameProgression": true,
	"transitions": {
		"SoilSamples": 2,
		"GameEnd": 99
	}
}
					*/
					break;
				case "DrawCard":
					/*
					{
	"name": "DrawCard",
	"description": "${actplayer} must select one card to keep.",
	"descriptionmyturn": "${you} must select one card to keep.",
	"type": "activeplayer",
	"args": "argDrawCard",
	"possibleactions": [
		"SelectCard"
	],
	"transitions": {
		"NextPlayer": 4,
		"Mining": 5,
		"SortCard": 333
	}
}
					*/
					break;
				case "Mining":
					/*
					{
	"name": "Mining",
	"description": "Mining Phase...",
	"type": "game",
	"action": "stMining",
	"updateGameProgression": true,
	"transitions": {
		"Mining": 6,
		"Mining2": 7,
		"GameEnd": 99
	}
}
					*/
					break;
				case "NextPlayer2":
					/*
					{
	"name": "NextPlayer2",
	"description": "Changing active player...",
	"type": "game",
	"action": "stNextPlayer2",
	"updateGameProgression": true,
	"transitions": {
		"NextPlayer": 6,
		"Mining": 7
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
				case "SortCard":
					/*
					{
	"name": "SortCard",
	"description": "${actplayer} must sort discarded cards.",
	"descriptionmyturn": "${you} must sort discarded cards.",
	"type": "activeplayer",
	"args": "argSortCard",
	"possibleactions": [
		"SortCard"
	],
	"transitions": {
		"NextPlayer": 4,
		"Mining": 5
	}
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
export default thegnomesofzavandor;
