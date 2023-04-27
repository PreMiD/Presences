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

const bombay: GamePresence = {
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
		"": 2
	}
}
					*/
					break;
				case "action_of_active_player":
					/*
					{
	"name": "action_of_active_player",
	"description": "${actplayer} must choose an action (${this_action} remaining) or pass",
	"descriptionmyturn": "${you} must choose an action (${this_action} remaining) or pass",
	"args": "argActionOfActivePlayer",
	"type": "activeplayer",
	"possibleactions": [
		"consolidate",
		"pass",
		"move",
		"buy",
		"selling",
		"build"
	],
	"transitions": {
		"next_player": 4,
		"choice_elephant_package_to_build": 6,
		"choice_elephant_package_to_sell": 8,
		"choice_cube_market": 7
	}
}
					*/
					break;
				case "restocking":
					/*
					{
	"name": "restocking",
	"description": "Supplying the markets",
	"type": "game",
	"action": "stRestocking",
	"updateGameProgression": false,
	"transitions": {
		"": 2
	}
}
					*/
					break;
				case "next_player":
					/*
					{
	"name": "next_player",
	"description": "",
	"type": "game",
	"action": "stNextPlayer",
	"updateGameProgression": true,
	"transitions": {
		"next_action": 2,
		"restocking": 3,
		"score": 5
	}
}
					*/
					break;
				case "score":
					/*
					{
	"name": "score",
	"description": "",
	"type": "game",
	"action": "stScore",
	"updateGameProgression": true,
	"transitions": {
		"": 99
	}
}
					*/
					break;
				case "choice_elephant_package_to_build":
					/*
					{
	"name": "choice_elephant_package_to_build",
	"description": "${actplayer} must choose the package sold",
	"descriptionmyturn": "${you} must choose the package sold",
	"args": "argChoiceElephantPackage",
	"type": "activeplayer",
	"possibleactions": [
		"choice_elephant_package_to_build_yellow",
		"choice_elephant_package_to_build_purple",
		"choice_elephant_package_to_build_blue",
		"choice_elephant_package_to_build_orange"
	],
	"transitions": {
		"next_player": 4,
		"choice_cube_market": 7
	}
}
					*/
					break;
				case "choice_cube_market":
					/*
					{
	"name": "choice_cube_market",
	"description": "${actplayer} must choose a package in the market",
	"descriptionmyturn": "${you} must choose a package in the market",
	"args": "argChoiceCubeMarket",
	"type": "activeplayer",
	"possibleactions": [
		"choice_cube_market_yellow",
		"choice_cube_market_purple",
		"choice_cube_market_blue",
		"choice_cube_market_orange",
		"choice_cube_market_none"
	],
	"transitions": {
		"next_player": 4
	}
}
					*/
					break;
				case "choice_elephant_package_to_sell":
					/*
					{
	"name": "choice_elephant_package_to_sell",
	"description": "${actplayer} must choose the package sold",
	"descriptionmyturn": "${you} must choose the package sold",
	"args": "argChoiceElephantPackageToSell",
	"type": "activeplayer",
	"possibleactions": [
		"choice_elephant_package_to_sell_yellow",
		"choice_elephant_package_to_sell_purple",
		"choice_elephant_package_to_sell_blue",
		"choice_elephant_package_to_sell_orange"
	],
	"transitions": {
		"next_player": 4
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
export default bombay;
