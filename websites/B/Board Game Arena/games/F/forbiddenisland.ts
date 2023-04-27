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

const forbiddenisland: GamePresence = {
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
		"": 6
	}
}
					*/
					break;
				case "playerActions":
					/*
					{
	"name": "playerActions",
	"description": "${actplayer} ",
	"descriptionmyturn": "${you} ",
	"type": "activeplayer",
	"args": "argPlayerActions",
	"possibleactions": [
		"move",
		"shore_up",
		"skip",
		"give_card",
		"capture",
		"special_action"
	],
	"transitions": {
		"action": 2,
		"skip": 2,
		"bonus_shoreup": 9,
		"draw_treasure": 3,
		"sandbags": 10,
		"heli_lift": 11,
		"discard": 4
	}
}
					*/
					break;
				case "drawTreasure":
					/*
					{
	"name": "drawTreasure",
	"description": "Drawing treasure cards",
	"descriptionmyturn": "Drawing treasure cards",
	"type": "game",
	"action": "stDrawTreasureCards",
	"transitions": {
		"continue": 13,
		"set_flood": 5,
		"discard": 4,
		"final": 12
	}
}
					*/
					break;
				case "discardTreasure":
					/*
					{
	"name": "discardTreasure",
	"description": "${actplayer} must select cards to discard (down to 5)",
	"descriptionmyturn": "${you} must select cards to discard (down to 5)",
	"type": "multipleactiveplayer",
	"action": "stDiscardTreasure",
	"args": "argDiscardTreasure",
	"possibleactions": [
		"discard",
		"special_action"
	],
	"transitions": {
		"action": 2,
		"discard": 4,
		"continue": 13,
		"set_flood": 5,
		"sandbags": 10,
		"heli_lift": 11,
		"draw_treasure": 3
	}
}
					*/
					break;
				case "setFlood":
					/*
					{
	"name": "setFlood",
	"description": "Drawing flood cards",
	"descriptionmyturn": "Drawing flood cards",
	"type": "game",
	"action": "stSetFloodCards",
	"transitions": {
		"continue": 13
	}
}
					*/
					break;
				case "drawFlood":
					/*
					{
	"name": "drawFlood",
	"description": "Drawing flood cards",
	"descriptionmyturn": "Drawing flood cards",
	"type": "game",
	"action": "stDrawFloodCards",
	"args": "argDrawFloodCards",
	"transitions": {
		"draw_flood": 6,
		"continue": 13,
		"rescue_pawn": 8,
		"next_player": 7,
		"final": 12
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
		"next_turn": 2,
		"final": 12
	}
}
					*/
					break;
				case "rescuePawn":
					/*
					{
	"name": "rescuePawn",
	"description": "Other players are rescuing their pawns",
	"descriptionmyturn": "${you} rescue your pawn.  Select a tile to move to",
	"type": "multipleactiveplayer",
	"action": "stRescuePawn",
	"args": "argMultiPlayerActions",
	"possibleactions": [
		"move"
	],
	"transitions": {
		"draw_flood": 6,
		"rescue_pawn": 8,
		"continue": 13,
		"next_player": 7,
		"final": 12
	}
}
					*/
					break;
				case "bonusShoreup":
					/*
					{
	"name": "bonusShoreup",
	"description": "${actplayer} is taking bonus shore up action",
	"descriptionmyturn": "${you} take bonus shore up action",
	"type": "activeplayer",
	"args": "argPlayerActions",
	"possibleactions": [
		"shore_up",
		"skip"
	],
	"transitions": {
		"action": 2,
		"draw_treasure": 3
	}
}
					*/
					break;
				case "sandbags":
					/*
					{
	"name": "sandbags",
	"description": "${actplayer} is playing Sandbags",
	"descriptionmyturn": "${you} are playing Sandbags. Select tile to shore up",
	"type": "multipleactiveplayer",
	"action": "stSpecialAction",
	"args": "argPlayerActions",
	"possibleactions": [
		"shore_up",
		"cancel"
	],
	"transitions": {
		"action": 2,
		"cancel": 2,
		"draw_treasure": 3,
		"discard": 4,
		"continue": 13,
		"set_flood": 5
	}
}
					*/
					break;
				case "heli_lift":
					/*
					{
	"name": "heli_lift",
	"description": "${actplayer} is playing Helicopter Lift",
	"descriptionmyturn": "${you} are playing Helicopter Lift.  Select starting tile",
	"type": "multipleactiveplayer",
	"action": "stSpecialAction",
	"args": "argPlayerActions",
	"possibleactions": [
		"move",
		"cancel",
		"win"
	],
	"transitions": {
		"action": 2,
		"cancel": 2,
		"draw_treasure": 3,
		"discard": 4,
		"continue": 13,
		"set_flood": 5,
		"final": 12
	}
}
					*/
					break;
				case "final":
					/*
					{
	"name": "final",
	"type": "game",
	"action": "stFinal",
	"transitions": {
		"end": 99,
		"debug": 2
	}
}
					*/
					break;
				case "continue":
					/*
					{
	"name": "continue",
	"description": "Waiting for ${actplayer} to draw flood cards",
	"descriptionmyturn": "Any player can play Special Cards or ",
	"type": "activeplayer",
	"args": "argPlayerActions",
	"possibleactions": [
		"draw_flood",
		"special_action"
	],
	"transitions": {
		"draw_flood": 6,
		"sandbags": 10,
		"heli_lift": 11
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
export default forbiddenisland;
