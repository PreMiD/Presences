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

const barenpark: GamePresence = {
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
		"": 100
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
				case "STATE_ENTER_MAIN_PLAY_STATE":
					/*
					{
	"name": "STATE_ENTER_MAIN_PLAY_STATE",
	"description": "",
	"type": "game",
	"action": "stPrivateStateEnter",
	"privateStateEnterActiveFunction": "stChooseMainEnterState",
	"privateStateEnterInactive": 1000,
	"transitions": {
		"": 101
	}
}
					*/
					break;
				case "STATE_MAIN_PLAY_STATE":
					/*
					{
	"name": "STATE_MAIN_PLAY_STATE",
	"description": "${actplayer} must play their turn",
	"descriptionmyturn": "${you} must play your turn",
	"type": "activeplayer",
	"args": "argPrivateStateArgs",
	"argsNoPrivateState": "argMainPlayState",
	"argsAllPrivateState": "argsAllPrivateState",
	"transitions": {
		"privateStateLoop": 101,
		"nextPlayer": 102
	}
}
					*/
					break;
				case "STATE_MAIN_PLAY_STATE_NEXT_PLAYER":
					/*
					{
	"name": "STATE_MAIN_PLAY_STATE_NEXT_PLAYER",
	"description": "",
	"type": "game",
	"action": "stNextPlayer",
	"updateGameProgression": true,
	"transitions": {
		"nextPlayer": 100,
		"endGame": 99
	}
}
					*/
					break;
				case "STATE_PRIVATE_INACTIVE_TURN":
					/*
					{
	"name": "STATE_PRIVATE_INACTIVE_TURN",
	"description": "${actplayer} must play their turn",
	"type": "privateState",
	"possibleactions": [
		"enterPlayLoop",
		"enterTryMode"
	],
	"transitions": {
		"enterPlayLoop": 1001,
		"enterPlayLoopToPass": 1005
	}
}
					*/
					break;
				case "STATE_PRIVATE_CHOOSE_TILE_FROM_PLAYER_SUPPLY":
					/*
					{
	"name": "STATE_PRIVATE_CHOOSE_TILE_FROM_PLAYER_SUPPLY",
	"description": "${you} may select a tile from your supply",
	"descriptionmyturn": "${you} must select a tile from your supply",
	"type": "privateState",
	"args": "argChooseTileFromPlayerSupply",
	"possibleactions": [
		"chooseTileFromPlayerSupply",
		"enterTryMode"
	],
	"transitions": {
		"": 1002
	}
}
					*/
					break;
				case "STATE_PRIVATE_PLACE_TILE_IN_PARK":
					/*
					{
	"name": "STATE_PRIVATE_PLACE_TILE_IN_PARK",
	"description": "${you} may place the selected tile in your park",
	"descriptionmyturn": "${you} must place the selected tile in your park",
	"type": "privateState",
	"args": "argPlaceTileInPark",
	"possibleactions": [
		"placeTileInPark",
		"changeChooseTileFromPlayerSupply",
		"enterTryMode"
	],
	"transitions": {
		"chooseFromSupplyBoard": 1003,
		"confirmTurn": 1006
	}
}
					*/
					break;
				case "STATE_PRIVATE_CHOOSE_FROM_SUPPLY_BOARD":
					/*
					{
	"name": "STATE_PRIVATE_CHOOSE_FROM_SUPPLY_BOARD",
	"description": "${you} may take new tiles: ${shapeList}",
	"descriptionmyturn": "${you} must take new tiles: ${shapeList}",
	"type": "privateState",
	"args": "argChooseFromSupplyBoard",
	"possibleactions": [
		"chooseShapeFromSupplyBoard",
		"chooseParkFromSupplyBoard",
		"enterTryMode"
	],
	"transitions": {
		"chooseFromSupplyBoard": 1003,
		"placePlayerPark": 1004,
		"confirmTurn": 1006
	}
}
					*/
					break;
				case "STATE_PRIVATE_PLACE_PLAYER_PARK":
					/*
					{
	"name": "STATE_PRIVATE_PLACE_PLAYER_PARK",
	"description": "${you} may place the new Park Area",
	"descriptionmyturn": "${you} must place the new Park Area",
	"type": "privateState",
	"args": "argPlacePlayerPark",
	"possibleactions": [
		"placePlayerPark",
		"changeChooseParkFromSupplyBoard",
		"changeChooseShapeFromSupplyBoard"
	],
	"transitions": {
		"chooseFromSupplyBoard": 1003,
		"confirmTurn": 1006
	}
}
					*/
					break;
				case "STATE_PRIVATE_PASS_TURN_CHOOSE_FROM_SUPPLY_BOARD":
					/*
					{
	"name": "STATE_PRIVATE_PASS_TURN_CHOOSE_FROM_SUPPLY_BOARD",
	"description": "${you} may take a new Green Area tile and pass",
	"descriptionmyturn": "${you} must take a new Green Area tile and pass",
	"type": "privateState",
	"args": "argPassTurnChooseFromSupplyBoard",
	"possibleactions": [
		"chooseShapeFromSupplyBoardAndPass",
		"enterTryMode"
	],
	"transitions": {
		"confirmTurn": 1006
	}
}
					*/
					break;
				case "STATE_PRIVATE_CONFIRM_TURN":
					/*
					{
	"name": "STATE_PRIVATE_CONFIRM_TURN",
	"description": "${you} must wait for the other players to end their turn",
	"descriptionmyturn": "${you} must confirm your turn",
	"type": "privateState",
	"possibleactions": [
		"confirmTurn",
		"enterTryMode"
	],
	"transitions": []
}
					*/
					break;
				case "STATE_PRIVATE_PASS_TURN_NO_SHAPE":
					/*
					{
	"name": "STATE_PRIVATE_PASS_TURN_NO_SHAPE",
	"description": "${you} must wait for the other players to end their turn",
	"descriptionmyturn": "${you} must pass (no Green Area and no placeable tiles)",
	"type": "privateState",
	"possibleactions": [
		"passTurn",
		"enterTryMode"
	],
	"transitions": []
}
					*/
					break;
				case "STATE_PRIVATE_TRY_MODE_CHOOSE_TILE":
					/*
					{
	"name": "STATE_PRIVATE_TRY_MODE_CHOOSE_TILE",
	"description": "${you} may select a tile or a park",
	"type": "privateState",
	"args": "argTryModeChooseTile",
	"possibleactions": [
		"tryModeChooseTile",
		"tryModeChoosePark",
		"exitTryMode"
	],
	"transitions": {
		"chooseTile": 2002,
		"choosePark": 2003
	}
}
					*/
					break;
				case "STATE_PRIVATE_TRY_MODE_PLACE_TILE":
					/*
					{
	"name": "STATE_PRIVATE_TRY_MODE_PLACE_TILE",
	"description": "${you} may place a tile",
	"type": "privateState",
	"args": "argTryModePlaceTile",
	"possibleactions": [
		"tryModePlaceTile",
		"tryModeChangeChooseTile",
		"tryModeChangeChoosePark",
		"exitTryMode"
	],
	"transitions": {
		"": 2001
	}
}
					*/
					break;
				case "STATE_PRIVATE_TRY_MODE_PLACE_PARK":
					/*
					{
	"name": "STATE_PRIVATE_TRY_MODE_PLACE_PARK",
	"description": "${you} may place the new Park Area",
	"type": "privateState",
	"args": "argTryModePlacePark",
	"possibleactions": [
		"tryModePlacePark",
		"tryModeChangeChooseTile",
		"tryModeChangeChoosePark",
		"exitTryMode"
	],
	"transitions": {
		"": 2001
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
export default barenpark;
