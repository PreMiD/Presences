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

const bigtimesoccer: GamePresence = {
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
				case "playerTurnOff":
					/*
					{
	"name": "playerTurnOff",
	"description": "${actplayer} must select an offensive option",
	"descriptionmyturn": "${you} must take a valid offensive action: ",
	"type": "activeplayer",
	"args": "argPlayerTurnOff",
	"possibleactions": [
		"playCard",
		"playFree",
		"discardCard",
		"proposeEnd"
	],
	"transitions": {
		"playerClear": 4,
		"playerSelect": 5,
		"changePlayers": 14,
		"resolveShot": 17,
		"playerCard72": 21
	}
}
					*/
					break;
				case "playerTurnDef":
					/*
					{
	"name": "playerTurnDef",
	"description": "${actplayer} may play a defense card",
	"descriptionmyturn": "${you} can defend: ",
	"type": "activeplayer",
	"action": "stPlayerDef",
	"possibleactions": [
		"playCard",
		"pass"
	],
	"transitions": {
		"changePlayers": 14,
		"resolveDefense": 15,
		"resolveHold": 16
	}
}
					*/
					break;
				case "playerClear":
					/*
					{
	"name": "playerClear",
	"description": "${actplayer} must select a zone",
	"descriptionmyturn": "${you} must select the destination zone",
	"type": "activeplayer",
	"args": "argPlayerClear",
	"action": "stPlayerClear",
	"possibleactions": [
		"selectZone"
	],
	"transitions": {
		"changePlayers": 14,
		"resolveClear": 22
	}
}
					*/
					break;
				case "playerSelect":
					/*
					{
	"name": "playerSelect",
	"description": "${actplayer} must select a zone",
	"descriptionmyturn": "${you} must select the destination zone",
	"type": "activeplayer",
	"args": "argPlayerSelect",
	"action": "stPlayerSelect",
	"possibleactions": [
		"selectZone"
	],
	"transitions": {
		"changePlayers": 14
	}
}
					*/
					break;
				case "playerGoalkick":
					/*
					{
	"name": "playerGoalkick",
	"description": "${actplayer} must execute a goal kick",
	"descriptionmyturn": "${you} have a goal kick. Pass the ball to a D2 zone, try to aim to a midfield zone, or:",
	"type": "activeplayer",
	"args": "argPlayerGoalkick",
	"possibleactions": [
		"selectGoalkick",
		"selectZone"
	],
	"transitions": {
		"changePlayers": 14,
		"resolveGoalkick": 18
	}
}
					*/
					break;
				case "playerFreekick":
					/*
					{
	"name": "playerFreekick",
	"description": "${actplayer} must execute a free kick",
	"descriptionmyturn": "${you} have a free kick. Kick the ball or",
	"type": "activeplayer",
	"args": "argPlayerFreekick",
	"possibleactions": [
		"takeOver",
		"selectZone"
	],
	"transitions": {
		"changePlayers": 14,
		"resolveFreekick": 19
	}
}
					*/
					break;
				case "playerFreeShot":
					/*
					{
	"name": "playerFreeShot",
	"description": "${actplayer} can take a shot",
	"descriptionmyturn": "${you} may take a shot (free action) or continue the sequence",
	"type": "activeplayer",
	"action": "stPlayerFreeShot",
	"possibleactions": [
		"decide"
	],
	"transitions": {
		"changePlayers": 14,
		"resolveShot": 17
	}
}
					*/
					break;
				case "playerReplyProposal":
					/*
					{
	"name": "playerReplyProposal",
	"description": "${actplayer} must decide",
	"descriptionmyturn": "The opponent proposes to end the half. ${you} must decide: ",
	"type": "activeplayer",
	"possibleactions": [
		"decide"
	],
	"transitions": {
		"changePlayers": 14,
		"endPeriod": 12
	}
}
					*/
					break;
				case "beginPeriod":
					/*
					{
	"name": "beginPeriod",
	"description": "",
	"type": "game",
	"action": "stBeginPeriod",
	"transitions": {
		"playerAction": 2
	}
}
					*/
					break;
				case "changePlayers":
					/*
					{
	"name": "changePlayers",
	"description": "",
	"type": "game",
	"action": "stChangePlayers",
	"updateGameProgression": true,
	"transitions": {
		"playerOffensive": 2,
		"playerDefense": 3,
		"goalkick": 6,
		"playerFreekick": 7,
		"resolveFreekick": 19,
		"freeShot": 8,
		"replyProposal": 9,
		"endPhase": 12
	}
}
					*/
					break;
				case "endPhase":
					/*
					{
	"name": "endPhase",
	"description": "",
	"type": "game",
	"action": "stEndPhase",
	"transitions": {
		"playerOffensive": 2,
		"goalkick": 6,
		"beginPeriod": 10,
		"shootout": 20,
		"gameEnd": 99
	}
}
					*/
					break;
				case "replenish":
					/*
					{
	"name": "replenish",
	"description": "",
	"type": "game",
	"action": "stReplenish",
	"transitions": {
		"changePlayers": 11
	}
}
					*/
					break;
				case "resolveDefense":
					/*
					{
	"name": "resolveDefense",
	"description": "",
	"type": "game",
	"action": "stResolveDefense",
	"transitions": {
		"changePlayers": 14
	}
}
					*/
					break;
				case "resolveHold":
					/*
					{
	"name": "resolveHold",
	"description": "",
	"type": "game",
	"action": "stResolveHold",
	"transitions": {
		"changePlayers": 14
	}
}
					*/
					break;
				case "resolveShot":
					/*
					{
	"name": "resolveShot",
	"description": "",
	"type": "game",
	"action": "stResolveShot",
	"transitions": {
		"changePlayers": 14,
		"cornerKick": 17
	}
}
					*/
					break;
				case "resolveGoalkick":
					/*
					{
	"name": "resolveGoalkick",
	"description": "",
	"type": "game",
	"action": "stResolveGoalkick",
	"transitions": {
		"changePlayers": 14
	}
}
					*/
					break;
				case "resolveFreekick":
					/*
					{
	"name": "resolveFreekick",
	"description": "",
	"type": "game",
	"action": "stResolveFreekick",
	"transitions": {
		"changePlayers": 14,
		"resolveShot": 17,
		"cornerKick": 17
	}
}
					*/
					break;
				case "resolveShootout":
					/*
					{
	"name": "resolveShootout",
	"description": "",
	"type": "game",
	"action": "stResolveShootout",
	"transitions": {
		"endGame": 99
	}
}
					*/
					break;
				case "playerCard72":
					/*
					{
	"name": "playerCard72",
	"description": "${actplayer} must make a decision",
	"descriptionmyturn": "${you} must decide how to play this card: ",
	"type": "activeplayer",
	"possibleactions": [
		"decide"
	],
	"action": "stPlayerCard72",
	"transitions": {
		"playerSelect": 5
	}
}
					*/
					break;
				case "resolveClear":
					/*
					{
	"name": "resolveClear",
	"description": "",
	"type": "game",
	"action": "stResolveClear",
	"transitions": {
		"changePlayers": 14
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
export default bigtimesoccer;
