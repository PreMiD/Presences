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

const mijnlieff: GamePresence = {
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
				case "check_end":
					/*
					{
	"name": "check_end",
	"description": "",
	"type": "game",
	"action": "check_end_action",
	"transitions": {
		"ended": 99,
		"not_ended": 3
	}
}
					*/
					break;
				case "check_forced_pass":
					/*
					{
	"name": "check_forced_pass",
	"description": "${actplayer} is blocked!",
	"descriptionmyturn": "${you} are blocked!",
	"type": "activeplayer",
	"action": "check_forced_pass_action",
	"transitions": {
		"play": 4,
		"pass": 5,
		"play_after_pass": 6
	}
}
					*/
					break;
				case "player_turn":
					/*
					{
	"name": "player_turn",
	"description": "${actplayer} must place a piece",
	"descriptionmyturn": "${you} must place a piece",
	"type": "activeplayer",
	"possibleactions": [
		"place_piece"
	],
	"transitions": {
		"placed_piece": 5,
		"pass": 5
	},
	"args": "player_turn_arg"
}
					*/
					break;
				case "next_turn":
					/*
					{
	"name": "next_turn",
	"description": "",
	"type": "game",
	"action": "next_turn_action",
	"updateGameProgression": true,
	"transitions": {
		"": 2
	}
}
					*/
					break;
				case "player_turn_after_pass":
					/*
					{
	"name": "player_turn_after_pass",
	"description": "${actplayer} must place a piece (because you were blocked)",
	"descriptionmyturn": "${you} must place a piece (because you blocked your opponent)",
	"type": "activeplayer",
	"possibleactions": [
		"place_piece"
	],
	"transitions": {
		"placed_piece": 5,
		"pass": 5
	},
	"args": "player_turn_arg"
}
					*/
					break;
				case "player_passes":
					/*
					{
	"name": "player_passes",
	"description": "",
	"type": "game",
	"action": "check_forced_pass_action",
	"transitions": {
		"play": 4,
		"pass": 5,
		"play_after_pass": 6
	}
}
					*/
					break;
				case "check_layout":
					/*
					{
	"name": "check_layout",
	"description": "",
	"type": "game",
	"action": "check_layout_action",
	"transitions": {
		"standard": 2,
		"players": 11
	}
}
					*/
					break;
				case "check_start":
					/*
					{
	"name": "check_start",
	"description": "",
	"type": "game",
	"action": "check_start_action",
	"transitions": {
		"started": 2,
		"not_started": 12
	}
}
					*/
					break;
				case "player_setup_turn":
					/*
					{
	"name": "player_setup_turn",
	"description": "${actplayer} must lay a board segment",
	"descriptionmyturn": "${you} must lay a board segment",
	"type": "activeplayer",
	"possibleactions": [
		"place_board"
	],
	"transitions": {
		"placed_board": 13
	},
	"args": "player_setup_turn_arg"
}
					*/
					break;
				case "next_setup_turn":
					/*
					{
	"name": "next_setup_turn",
	"description": "",
	"type": "game",
	"action": "next_turn_action",
	"transitions": {
		"": 11
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
export default mijnlieff;
