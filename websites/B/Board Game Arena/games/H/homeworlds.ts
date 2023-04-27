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

const homeworlds: GamePresence = {
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
				case "want_creation":
					/*
					{
	"name": "want_creation",
	"description": "${actplayer} must create a homeworld.",
	"descriptionmyturn": "${you} must choose a homestar from the bank.",
	"type": "activeplayer",
	"possibleactions": [
		"act_creation"
	],
	"transitions": {
		"trans_after_creation": 20,
		"zombiePass": 20
	}
}
					*/
					break;
				case "want_free":
					/*
					{
	"name": "want_free",
	"description": "${actplayer} may activate or sacrifice a ship.",
	"descriptionmyturn": "${you} may choose a ship to activate or sacrifice.",
	"type": "activeplayer",
	"updateGameProgression": true,
	"possibleactions": [
		"act_power_action",
		"act_sacrifice",
		"act_catastrophe",
		"act_pass",
		"act_restart_turn",
		"act_offer_draw",
		"act_cancel_offer_draw"
	],
	"args": "args_want_free",
	"transitions": {
		"trans_after_power_action": 21,
		"trans_want_sacrifice_action": 12,
		"trans_after_catastrophe": 23,
		"trans_end_turn": 30,
		"trans_restart": 11,
		"zombiePass": 30
	}
}
					*/
					break;
				case "want_sacrifice_action":
					/*
					{
	"name": "want_sacrifice_action",
	"description": "${actplayer} may ${action_name} a ship (${actions_remaining} action(s) remaining).",
	"descriptionmyturn": "${you} may choose a ship to activate (${actions_remaining} ${action_name} action(s) remaining).",
	"type": "activeplayer",
	"possibleactions": [
		"act_power_action",
		"act_catastrophe",
		"act_pass",
		"act_restart_turn",
		"act_offer_draw",
		"act_cancel_offer_draw"
	],
	"args": "args_want_sacrifice_action",
	"transitions": {
		"trans_after_power_action": 21,
		"trans_after_catastrophe": 23,
		"trans_end_turn": 30,
		"trans_restart": 11,
		"zombiePass": 30
	}
}
					*/
					break;
				case "want_catastrophe":
					/*
					{
	"name": "want_catastrophe",
	"description": "${actplayer} may trigger a catastrophe.",
	"descriptionmyturn": "${you} may trigger a catastrophe.",
	"type": "activeplayer",
	"possibleactions": [
		"act_catastrophe",
		"act_pass",
		"act_restart_turn",
		"act_offer_draw",
		"act_cancel_offer_draw"
	],
	"args": "args_want_catastrophe",
	"transitions": {
		"trans_after_catastrophe": 23,
		"trans_end_turn": 30,
		"trans_restart": 11,
		"zombiePass": 30
	}
}
					*/
					break;
				case "want_restart_turn":
					/*
					{
	"name": "want_restart_turn",
	"description": "${actplayer} may restart their turn.",
	"descriptionmyturn": "${you} may restart your turn.",
	"type": "activeplayer",
	"possibleactions": [
		"act_pass",
		"act_restart_turn",
		"act_offer_draw",
		"act_cancel_offer_draw"
	],
	"args": "args_want_restart_turn",
	"transitions": {
		"trans_end_turn": 30,
		"trans_restart": 11,
		"zombiePass": 30
	}
}
					*/
					break;
				case "after_creation":
					/*
					{
	"name": "after_creation",
	"type": "game",
	"action": "st_after_creation",
	"transitions": {
		"trans_want_creation": 10,
		"trans_want_free": 11,
		"trans_skip_zombie": 20
	}
}
					*/
					break;
				case "after_power_action":
					/*
					{
	"name": "after_power_action",
	"type": "game",
	"action": "st_after_power_action",
	"transitions": {
		"trans_end_turn": 30,
		"trans_want_sacrifice_action": 12,
		"trans_want_catastrophe": 13,
		"trans_want_restart_turn": 14
	}
}
					*/
					break;
				case "after_catastrophe":
					/*
					{
	"name": "after_catastrophe",
	"type": "game",
	"action": "st_after_catastrophe",
	"transitions": {
		"trans_want_free": 11,
		"trans_want_sacrifice_action": 12,
		"trans_want_catastrophe": 13,
		"trans_want_restart_turn": 14,
		"trans_end_turn": 30
	}
}
					*/
					break;
				case "end_turn":
					/*
					{
	"name": "end_turn",
	"type": "game",
	"action": "st_end_turn",
	"transitions": {
		"trans_want_free": 11,
		"trans_endGame": 99
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
export default homeworlds;
