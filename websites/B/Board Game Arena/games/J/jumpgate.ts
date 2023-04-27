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

const jumpgate: GamePresence = {
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
	"description": "Game setup",
	"type": "manager",
	"action": "stGameSetup",
	"transitions": {
		"": 21
	}
}
					*/
					break;
				case "playerTurn":
					/*
					{
	"name": "playerTurn",
	"description": "${actplayer} must pick their first action",
	"descriptionmyturn": "${you} must pick a first action, travel to another planet, or",
	"type": "activeplayer",
	"possibleactions": [
		"research",
		"pass",
		"move",
		"jump",
		"scan",
		"claim",
		"harvest"
	],
	"transitions": {
		"research": 42,
		"pass": 42,
		"move": 42,
		"scan": 23,
		"claim": 25,
		"harvest": 24,
		"auto_harvest": 42,
		"zombiePass": 42
	}
}
					*/
					break;
				case "markResource":
					/*
					{
	"name": "markResource",
	"description": "${actplayer} must mark a resource on their current planet",
	"descriptionmyturn": "${you} must mark a resource on your current planet or",
	"type": "activeplayer",
	"possibleactions": [
		"mark",
		"skip_mark"
	],
	"transitions": {
		"marked": 42,
		"mark_skipped": 42,
		"zombiePass": 42
	}
}
					*/
					break;
				case "harvestResource":
					/*
					{
	"name": "harvestResource",
	"description": "${actplayer} must pick a resource to harvest on their current planet",
	"descriptionmyturn": "${you} must pick a resource to harvest on your current planet",
	"type": "activeplayer",
	"possibleactions": [
		"take"
	],
	"transitions": {
		"taken": 42,
		"zombiePass": 42
	}
}
					*/
					break;
				case "allClaimMarkedResources":
					/*
					{
	"name": "allClaimMarkedResources",
	"description": "Some players must choose whether to take a marked resource",
	"descriptionmyturn": "${you} must choose whether to take a marked resource",
	"type": "multipleactiveplayer",
	"action": "stAllClaimMarkedResources",
	"possibleactions": [
		"resource_collection",
		"takeIt",
		"leaveIt"
	],
	"transitions": {
		"markers_collected": 27,
		"skip": 27
	}
}
					*/
					break;
				case "claimResource":
					/*
					{
	"name": "claimResource",
	"description": "${actplayer} may pick a resource to claim on their current planet",
	"descriptionmyturn": "${you} may pick a resource to claim on your current planet",
	"type": "activeplayer",
	"possibleactions": [
		"claim_resource",
		"none"
	],
	"transitions": {
		"resource_claimed": 42,
		"none": 42,
		"zombiePass": 42
	}
}
					*/
					break;
				case "playerTurn2":
					/*
					{
	"name": "playerTurn2",
	"description": "${actplayer} must pick their second action",
	"descriptionmyturn": "${you} must pick a second action, travel to another planet, or",
	"type": "activeplayer",
	"possibleactions": [
		"research",
		"pass",
		"move",
		"jump",
		"scan",
		"claim",
		"harvest"
	],
	"transitions": {
		"research": 42,
		"pass": 42,
		"move": 42,
		"scan": 23,
		"claim": 25,
		"harvest": 24,
		"auto_harvest": 42,
		"zombiePass": 42
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
		"nextTurn": 21,
		"nextAction": 40,
		"testEnd": 98,
		"gameEnd": 99
	}
}
					*/
					break;
				case "testEnd":
					/*
					{
	"name": "testEnd",
	"description": "${actplayer} must click button to end game",
	"descriptionmyturn": "${you} must click",
	"type": "activeplayer",
	"possibleactions": "endTest",
	"transitions": {
		"endGame": 99
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
export default jumpgate;
