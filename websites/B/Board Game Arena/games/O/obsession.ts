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

const obsession: GamePresence = {
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
				case "pickFamily":
					/*
					{
	"name": "pickFamily",
	"description": "${actplayer} must choose a family",
	"descriptionmyturn": "${you} must choose a family",
	"type": "activeplayer",
	"args": "argPickFamily",
	"possibleactions": [
		"pickFamily"
	],
	"transitions": {
		"next": 70,
		"zombiePass": 70
	}
}
					*/
					break;
				case "gameStartingGuest":
					/*
					{
	"name": "gameStartingGuest",
	"type": "game",
	"action": "stGameStartingGuest",
	"transitions": {
		"pick": 4,
		"next": 70
	}
}
					*/
					break;
				case "pickStartingGuest":
					/*
					{
	"name": "pickStartingGuest",
	"description": "${actplayer} must choose a starting guest",
	"descriptionmyturn": "${you} must choose a starting guest",
	"type": "activeplayer",
	"args": "argPickStartingGuest",
	"possibleactions": [
		"pickStartingGuest"
	],
	"transitions": {
		"next": 3,
		"zombiePass": 3
	}
}
					*/
					break;
				case "playerRotateService":
					/*
					{
	"name": "playerRotateService",
	"type": "game",
	"action": "stGamePlayerRotateService",
	"updateGameProgression": true,
	"transitions": {
		"": 11
	}
}
					*/
					break;
				case "playerRoundEvent":
					/*
					{
	"name": "playerRoundEvent",
	"type": "game",
	"action": "stGamePlayerRoundEvent",
	"transitions": {
		"hostActivity": 12,
		"resolvePlayerEvents": 40
	}
}
					*/
					break;
				case "hostActivity":
					/*
					{
	"name": "hostActivity",
	"description": "${actplayer} must host an activity or pass",
	"descriptionmyturn": "${you} must host an activity or pass (Starting reputation ${starting_prestige}${builder_holiday})",
	"type": "activeplayer",
	"args": "argHostActivity",
	"possibleactions": [
		"hostActivity",
		"pass",
		"specialAction",
		"playVpCard"
	],
	"transitions": {
		"resolveFavors": 40,
		"specialAction": 12,
		"zombiePass": 19
	}
}
					*/
					break;
				case "playerCleanup":
					/*
					{
	"name": "playerCleanup",
	"type": "game",
	"action": "stGamePlayerCleanup",
	"transitions": {
		"": 70
	}
}
					*/
					break;
				case "builderMarket":
					/*
					{
	"name": "builderMarket",
	"description": "${actplayer} may purchase an improvement",
	"descriptionmyturn": "${you} may purchase an improvement${mkt_builder_holiday}",
	"type": "activeplayer",
	"args": "argBuilderMarket",
	"possibleactions": [
		"buyImprovement",
		"skip",
		"specialAction",
		"playVpCard"
	],
	"transitions": {
		"buyAgain": 30,
		"specialAction": 30,
		"resolveFavors": 40,
		"skip": 19,
		"zombiePass": 19
	}
}
					*/
					break;
				case "gamePlayerEnjoyFavor":
					/*
					{
	"name": "gamePlayerEnjoyFavor",
	"type": "game",
	"action": "stGamePlayerEnjoyFavor",
	"transitions": {
		"hostActivity": 12,
		"buyBuilding": 30,
		"resolveFavors": 40,
		"resolveFavor": 41,
		"vpCardEndGame": 97,
		"vpCardEndGameNextPlayer": 96
	}
}
					*/
					break;
				case "playerResolveFavor":
					/*
					{
	"name": "playerResolveFavor",
	"description": "${actplayer} must resolve their favors",
	"descriptionmyturn": "${you} must resolve your favors",
	"type": "activeplayer",
	"args": "argPlayerResolveFavor",
	"possibleactions": [
		"resolveSelectServant",
		"resolveSelectCard",
		"resolveChooseFavor",
		"resolveAttackOpponent",
		"resolveRumorMill",
		"skip"
	],
	"transitions": {
		"next": 40,
		"skip": 40,
		"zombiePass": 19
	}
}
					*/
					break;
				case "gameCourtship":
					/*
					{
	"name": "gameCourtship",
	"type": "game",
	"action": "stGameCourtship",
	"transitions": {
		"pickFairchild": 64,
		"discardObjective": 61
	}
}
					*/
					break;
				case "gameDiscardObjective":
					/*
					{
	"name": "gameDiscardObjective",
	"type": "game",
	"action": "stGameDiscardObjective",
	"updateGameProgression": true,
	"transitions": {
		"discardObjective": 65
	}
}
					*/
					break;
				case "pickFairChild":
					/*
					{
	"name": "pickFairChild",
	"description": "${actplayer} must pick a Fairchild to invite",
	"descriptionmyturn": "${you} must pick a Fairchild to invite",
	"type": "activeplayer",
	"possibleactions": [
		"pickFairChild"
	],
	"transitions": {
		"next": 61,
		"zombiePass": 61
	}
}
					*/
					break;
				case "discardObjective":
					/*
					{
	"name": "discardObjective",
	"description": "Waiting for all players to finish discarding an objective",
	"descriptionmyturn": "${you} must discard an objective",
	"type": "multipleactiveplayer",
	"possibleactions": [
		"discardObjective"
	],
	"updateGameProgression": true,
	"transitions": {
		"next": 66,
		"zombiePass": 66
	}
}
					*/
					break;
				case "gameCleanupDiscardObjective":
					/*
					{
	"name": "gameCleanupDiscardObjective",
	"type": "game",
	"action": "stGameCleanupDiscardObjective",
	"transitions": {
		"nextRound": 71,
		"vpOption": 96
	}
}
					*/
					break;
				case "next":
					/*
					{
	"name": "next",
	"type": "game",
	"action": "stGameNext",
	"transitions": {
		"pickFamily": 2,
		"pickStartingGuest": 3,
		"playerRotateService": 10,
		"nextRound": 71
	}
}
					*/
					break;
				case "nextRound":
					/*
					{
	"name": "nextRound",
	"type": "game",
	"action": "stGameNextRound",
	"transitions": {
		"playerRotateService": 10,
		"courtship": 60,
		"gameover": 98
	}
}
					*/
					break;
				case "vpOption":
					/*
					{
	"name": "vpOption",
	"type": "game",
	"action": "stGameVpOption",
	"updateGameProgression": true,
	"transitions": {
		"vpOption": 97,
		"gameover": 98
	}
}
					*/
					break;
				case "playVpCard":
					/*
					{
	"name": "playVpCard",
	"description": "${actplayer} may play vp cards for favors (instead of gaining those victory points)",
	"descriptionmyturn": "${you} may play vp cards for favors (instead of gaining those victory points)",
	"type": "activeplayer",
	"possibleactions": [
		"skip",
		"playVpCard"
	],
	"transitions": {
		"skip": 96,
		"specialAction": 97,
		"resolveFavors": 40,
		"zombiePass": 96
	}
}
					*/
					break;
				case "gameover":
					/*
					{
	"name": "gameover",
	"type": "game",
	"action": "stGameover",
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
export default obsession;
