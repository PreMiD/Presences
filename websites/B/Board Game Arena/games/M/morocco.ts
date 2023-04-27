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

const morocco: GamePresence = {
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
				case "RollDice":
					/*
					{
	"name": "RollDice",
	"description": "Rolling the dice...",
	"type": "game",
	"action": "stRollDice",
	"updateGameProgression": true,
	"transitions": {
		"DiceDone": 3,
		"Scout": 4
	}
}
					*/
					break;
				case "SelectCube":
					/*
					{
	"name": "SelectCube",
	"description": "Other players must select the information cube.",
	"descriptionmyturn": "${you} must select the information cube.",
	"type": "multipleactiveplayer",
	"action": "stSelectCube",
	"args": "argSelectCube",
	"possibleactions": [
		"SelectCube"
	],
	"transitions": {
		"RollDice": 2,
		"Scout": 4
	}
}
					*/
					break;
				case "Scout":
					/*
					{
	"name": "Scout",
	"description": "${actplayer} must move the pawn and scout stalls.",
	"descriptionmyturn": "${you} must move the pawn and scout stalls.",
	"type": "activeplayer",
	"args": "argScout",
	"possibleactions": [
		"MovePawn"
	],
	"transitions": {
		"Scout": 14,
		"AssignWorker": 151
	}
}
					*/
					break;
				case "AssignWorker":
					/*
					{
	"name": "AssignWorker",
	"description": "${actplayer} must select one of his worker and assign to a stall.",
	"descriptionmyturn": "${you} must select one of your worker and assign to a stall.",
	"type": "activeplayer",
	"args": "argAssignWorker",
	"possibleactions": [
		"AssignWorker",
		"PassTurn",
		"UseGold"
	],
	"transitions": {
		"NextTurn": 16,
		"AssignWorker": 15,
		"ClosedStall": 6
	}
}
					*/
					break;
				case "ClosedStall":
					/*
					{
	"name": "ClosedStall",
	"description": "Players receive the appropriate rewards for their relative position in worker count for the closed stall...",
	"type": "game",
	"action": "stClosedStall",
	"updateGameProgression": true,
	"transitions": {
		"NextTurn": 16,
		"AssignWorker": 15,
		"ChooseBonus": 7,
		"CollectJuiceSellerTokens": 8
	}
}
					*/
					break;
				case "ChooseBonus":
					/*
					{
	"name": "ChooseBonus",
	"description": "Other players must select one gold coin or one bodyguard.",
	"descriptionmyturn": "${you} must select one gold coin or one bodyguard.",
	"type": "multipleactiveplayer",
	"action": "stChooseBonus",
	"args": "argChooseBonus",
	"possibleactions": [
		"TakeGold",
		"TakeBodyguard"
	],
	"transitions": {
		"ChooseBonus": 7,
		"NextTurn": 16,
		"AssignWorker": 15,
		"CollectJuiceSellerTokens": 8
	}
}
					*/
					break;
				case "CollectJuiceSellerTokens":
					/*
					{
	"name": "CollectJuiceSellerTokens",
	"description": "Players collects the Juice Seller tokens...",
	"type": "game",
	"action": "stCollectJuiceSellerTokens",
	"updateGameProgression": true,
	"transitions": {
		"NextTurn": 16,
		"AssignWorker": 15,
		"MoveTourist": 9,
		"RotateMarketTile": 10,
		"ClosedStall": 6
	}
}
					*/
					break;
				case "MoveTouristChangePlayer":
					/*
					{
	"name": "MoveTouristChangePlayer",
	"description": "Changing player...",
	"type": "game",
	"action": "stMoveTouristChangePlayer",
	"updateGameProgression": true,
	"transitions": {
		"MoveTourist": 19,
		"NextTurn": 16,
		"AssignWorker": 15,
		"ResetActivePlayer": 11,
		"RotateMarketTile": 10,
		"ClosedStall": 6
	}
}
					*/
					break;
				case "RotateMarketTile":
					/*
					{
	"name": "RotateMarketTile",
	"description": "${actplayer} must decide how to rotate the market tile.",
	"descriptionmyturn": "${you} must decide how to rotate the market tile.",
	"type": "activeplayer",
	"action": "stRotateMarketTile",
	"args": "argRotateMarketTile",
	"possibleactions": [
		"PlaceMarket"
	],
	"transitions": {
		"ResetActivePlayer": 11,
		"MoveTourist": 9
	}
}
					*/
					break;
				case "ResetActivePlayer":
					/*
					{
	"name": "ResetActivePlayer",
	"description": "Changing the active player...",
	"type": "game",
	"action": "stResetActivePlayer",
	"updateGameProgression": true,
	"transitions": {
		"NextTurn": 16,
		"AssignWorker": 15,
		"ClosedStall": 6
	}
}
					*/
					break;
				case "NextPlayer":
					/*
					{
	"name": "NextPlayer",
	"description": "Changing player...",
	"type": "game",
	"action": "stNextPlayer",
	"updateGameProgression": true,
	"transitions": {
		"NextPlayer": 4
	}
}
					*/
					break;
				case "UseCubes":
					/*
					{
	"name": "UseCubes",
	"description": "${actplayer} must swap market cubes with a gold coin selecting the involved cubes or pass.",
	"descriptionmyturn": "${you} must swap market cubes with a gold coin selecting the involved cubes or pass.",
	"type": "activeplayer",
	"action": "stUseCubes",
	"args": "argUseCubes",
	"possibleactions": [
		"Pass",
		"UseGold"
	],
	"transitions": {
		"NextPlayer": 151
	}
}
					*/
					break;
				case "UseCubes":
					/*
					{
	"name": "UseCubes",
	"description": "${actplayer} must swap market cubes with a gold coin selecting the involved cubes or pass.",
	"descriptionmyturn": "${you} must swap market cubes with a gold coin selecting the involved cubes or pass.",
	"type": "activeplayer",
	"action": "stUseCubes",
	"args": "argUseCubes",
	"possibleactions": [
		"Pass",
		"UseGold"
	],
	"transitions": {
		"NextPlayer": 161
	}
}
					*/
					break;
				case "NextPlayer3":
					/*
					{
	"name": "NextPlayer3",
	"description": "Changing player...",
	"type": "game",
	"action": "stNextPlayer3",
	"updateGameProgression": true,
	"transitions": {
		"NextPlayer": 2,
		"gameEnd": 99
	}
}
					*/
					break;
				case "MoveTourist":
					/*
					{
	"name": "MoveTourist",
	"description": "${actplayer} must move their tourists.",
	"descriptionmyturn": "${you} must move your tourists.",
	"type": "activeplayer",
	"action": "stMoveTourist",
	"args": "argMoveTourist",
	"possibleactions": [
		"MoveTourist",
		"PassMoveTourist"
	],
	"transitions": {
		"MoveTourist": 9,
		"MoveTouristChangePlayer": 9,
		"NextTurn": 16,
		"AssignWorker": 15,
		"ResetActivePlayer": 11,
		"RotateMarketTile": 10,
		"ClosedStall": 6
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
				case "NextPlayer2":
					/*
					{
	"name": "NextPlayer2",
	"description": "Changing player...",
	"type": "game",
	"action": "stNextPlayer2",
	"updateGameProgression": true,
	"transitions": {
		"NextPlayer": 5
	}
}
					*/
					break;
				case "DiscardCubes":
					/*
					{
	"name": "DiscardCubes",
	"description": "Other players must discard their information cubes to have at maximum one.",
	"descriptionmyturn": "${you} must discard your information cubes to have at maximum one.",
	"type": "multipleactiveplayer",
	"action": "stDiscardCubes",
	"args": "argDiscardCubes",
	"possibleactions": [
		"Discard"
	],
	"transitions": {
		"NextTurn": 17
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
export default morocco;
