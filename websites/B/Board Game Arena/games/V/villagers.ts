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

const villagers: GamePresence = {
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
				case "draftPhase":
					/*
					{
	"name": "draftPhase",
	"description": "${actplayer} must draft a villager from the road (${drafts} left)",
	"descriptionmyturn": "${you} must draft a villager from the road (${drafts} left)",
	"args": "argPlayerDraftInfo",
	"type": "activeplayer",
	"updateGameProgression": true,
	"possibleactions": [
		"draft",
		"draftBlank",
		"draftReserve"
	],
	"transitions": {
		"nextPlayer": 11
	}
}
					*/
					break;
				case "draftNextPlayer":
					/*
					{
	"name": "draftNextPlayer",
	"description": "",
	"type": "game",
	"action": "stNextPlayerDraft",
	"updateGameProgression": true,
	"transitions": {
		"draftPhase": 10,
		"draftEnd": 12
	}
}
					*/
					break;
				case "draftEnd":
					/*
					{
	"name": "draftEnd",
	"description": "Draft complete, villagers move into player's hands",
	"type": "game",
	"action": "stDraftEnd",
	"transitions": {
		"updateRoad": 19,
		"updateRoad2P": 20,
		"buildPhase": 13
	}
}
					*/
					break;
				case "buildPhase":
					/*
					{
	"name": "buildPhase",
	"description": "${actplayer} may build a villager in their village (${builds} left)",
	"descriptionmyturn": "${you} may build a villager in your village (${builds} left)",
	"args": "argPlayerBuildInfo",
	"type": "activeplayer",
	"possibleactions": [
		"buildFromHand",
		"buildBasicVillager",
		"buildSpecialVillager",
		"buildPass",
		"buildCancel"
	],
	"transitions": {
		"nextPlayer": 14,
		"buildPhase": 13
	}
}
					*/
					break;
				case "buildNextPlayer":
					/*
					{
	"name": "buildNextPlayer",
	"description": "",
	"type": "game",
	"action": "stNextPlayerBuild",
	"updateGameProgression": false,
	"transitions": {
		"buildPhase": 13,
		"buildEnd": 15
	}
}
					*/
					break;
				case "buildEnd":
					/*
					{
	"name": "buildEnd",
	"description": "",
	"type": "game",
	"action": "stBuildEnd",
	"transitions": {
		"draftPhase": 10,
		"marketPhase": 16
	}
}
					*/
					break;
				case "marketPhase":
					/*
					{
	"name": "marketPhase",
	"description": "A market phase has begun, all players earn gold from villagers",
	"type": "game",
	"action": "stMarketPhase",
	"updateGameProgression": true,
	"transitions": {
		"draftPhase": 10,
		"gameEnd": 99
	}
}
					*/
					break;
				case "draftUpdateRoad":
					/*
					{
	"name": "draftUpdateRoad",
	"description": "Updating villagers on the road",
	"type": "game",
	"action": "stUpdateRoad",
	"transitions": {
		"buildPhase": 13
	}
}
					*/
					break;
				case "draftUpdateRoad2P":
					/*
					{
	"name": "draftUpdateRoad2P",
	"description": "${actplayer} can add a coin to a villager on the road",
	"descriptionmyturn": "${you} can add a coin to a villager on the road",
	"type": "activeplayer",
	"possibleactions": [
		"draftAddRoadCoin",
		"draftPassRoadCoin"
	],
	"transitions": {
		"nextPlayer": 21
	}
}
					*/
					break;
				case "draftUpdateRoad2PNext":
					/*
					{
	"name": "draftUpdateRoad2PNext",
	"description": "",
	"type": "game",
	"action": "stUpdateRoadNextPlayer",
	"transitions": {
		"nextPlayer": 20,
		"buildPhase": 13
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
export default villagers;
