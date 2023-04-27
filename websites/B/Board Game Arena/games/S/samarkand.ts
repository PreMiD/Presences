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

const samarkand: GamePresence = {
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
				case "PlacePawn":
					/*
					{
	"name": "PlacePawn",
	"description": "${actplayer} must place his pawn",
	"descriptionmyturn": "${you} must place your pawn",
	"args": "argPlacePawn",
	"type": "activeplayer",
	"possibleactions": [
		"PlacePawn"
	],
	"transitions": {
		"NextPlayer": 3,
		"NextPhase": 4
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
		"NextPlayer": 2
	}
}
					*/
					break;
				case "NextPhase":
					/*
					{
	"name": "NextPhase",
	"description": "Changing player...",
	"type": "game",
	"action": "stNextPhase",
	"updateGameProgression": true,
	"transitions": {
		"NextPhase": 5
	}
}
					*/
					break;
				case "MovePawn":
					/*
					{
	"name": "MovePawn",
	"description": "${actplayer} move his pawn",
	"descriptionmyturn": "${you} move your pawn",
	"type": "activeplayer",
	"args": "argMovePawn",
	"possibleactions": [
		"MovePawn",
		"RollDie"
	],
	"transitions": {
		"Oasis": 6,
		"City": 7,
		"Nomad": 8,
		"Dice": 13
	}
}
					*/
					break;
				case "Oasis":
					/*
					{
	"name": "Oasis",
	"description": "${actplayer} must buy goods in the Oasis",
	"descriptionmyturn": "${you} must buy goods in the Oasis",
	"type": "activeplayer",
	"args": "argOasis",
	"possibleactions": [
		"Buy1Goods",
		"Buy4Goods",
		"CannotBuy"
	],
	"transitions": {
		"NextPlayer": 9,
		"Discard": 14
	}
}
					*/
					break;
				case "City":
					/*
					{
	"name": "City",
	"description": "${actplayer} must sell goods in the City",
	"descriptionmyturn": "${you} must sell goods in the City",
	"type": "activeplayer",
	"args": "argCity",
	"action": "stCity",
	"possibleactions": [
		"SellGoods",
		"CannotSell"
	],
	"transitions": {
		"NextPlayer": 9,
		"ChooseMarket": 10,
		"GameEnd": 99
	}
}
					*/
					break;
				case "Nomad":
					/*
					{
	"name": "Nomad",
	"description": "${actplayer} must give a greeting gift or pay if not possible",
	"descriptionmyturn": "${you} must give a greeting gift or pay if not possible",
	"type": "activeplayer",
	"args": "argNomad",
	"action": "stNomad",
	"possibleactions": [
		"GiveGift",
		"Pay",
		"TakeCards"
	],
	"transitions": {
		"NomadAction": 12,
		"NextPlayer": 9,
		"Discard": 14
	}
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
				case "ChooseMarket":
					/*
					{
	"name": "ChooseMarket",
	"description": "${actplayer} must chose where to remove the chips",
	"descriptionmyturn": "${you} must chose where to remove the chips",
	"type": "activeplayer",
	"args": "argChooseMarket",
	"action": "stChooseMarket",
	"possibleactions": [
		"ChooseMarket"
	],
	"transitions": {
		"NextPlayer": 11
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
		"NextPlayer": 5
	}
}
					*/
					break;
				case "Nomad2":
					/*
					{
	"name": "Nomad2",
	"description": "${actplayer} must trade goods or move again",
	"descriptionmyturn": "${you} must trade goods or move again",
	"type": "activeplayer",
	"args": "argNomad2",
	"action": "stNomad2",
	"possibleactions": [
		"Trade",
		"MovePawn",
		"Pass"
	],
	"transitions": {
		"Oasis": 6,
		"City": 7,
		"Nomad": 8,
		"NextPlayer": 11
	}
}
					*/
					break;
				case "MovePawnDice":
					/*
					{
	"name": "MovePawnDice",
	"description": "${actplayer} move his pawn based on the dice result",
	"descriptionmyturn": "${you} move your pawn based on the dice result",
	"type": "activeplayer",
	"args": "argMovePawnDice",
	"action": "stMovePawnDice",
	"possibleactions": [
		"MovePawn"
	],
	"transitions": {
		"Oasis": 6,
		"City": 7,
		"Nomad": 8
	}
}
					*/
					break;
				case "DiscardCubes":
					/*
					{
	"name": "DiscardCubes",
	"description": "Other players must discard down to 12 cubes or less.",
	"descriptionmyturn": "${you} must discard down to 12 cubes or less.",
	"type": "multipleactiveplayer",
	"action": "stDiscardCubes",
	"args": "argDiscardCubes",
	"possibleactions": [
		"Discard"
	],
	"transitions": {
		"Done": 15
	}
}
					*/
					break;
				case "NextPlayer4":
					/*
					{
	"name": "NextPlayer4",
	"description": "Changing player...",
	"type": "game",
	"action": "stNextPlayer4",
	"updateGameProgression": true,
	"transitions": {
		"NextPlayer": 16
	}
}
					*/
					break;
				case "DiscardCubesDone":
					/*
					{
	"name": "DiscardCubesDone",
	"description": "${actplayer} must discard down to 12 cubes or less.",
	"descriptionmyturn": "${you} must discard down to 12 cubes or less.",
	"type": "activeplayer",
	"action": "stDiscardCubesDone",
	"possibleactions": [
		"Buy1Goods",
		"Buy4Goods",
		"TakeCards",
		"Pay"
	],
	"transitions": {
		"NextPlayer": 9,
		"NomadAction": 12
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
export default samarkand;
