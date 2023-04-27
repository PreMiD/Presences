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

const warchest: GamePresence = {
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
				case "gamePreparation":
					/*
					{
	"name": "gamePreparation",
	"description": "",
	"type": "game",
	"action": "stGamePreparation",
	"transitions": {
		"random": 10,
		"draft": 5
	}
}
					*/
					break;
				case "draftUnit":
					/*
					{
	"name": "draftUnit",
	"description": "${actplayer} must ${action} a Unit",
	"descriptionmyturn": "${you} must ${action} a Unit",
	"type": "activeplayer",
	"args": "argDraftUnit",
	"possibleactions": [
		"select_card",
		"draft"
	],
	"transitions": {
		"nextdraft": 6,
		"enddraft": 10,
		"zombiePass": 6
	}
}
					*/
					break;
				case "nextDraft":
					/*
					{
	"name": "nextDraft",
	"type": "game",
	"action": "stNextDraft",
	"transitions": {
		"next_player": 5
	}
}
					*/
					break;
				case "newRound":
					/*
					{
	"name": "newRound",
	"type": "game",
	"action": "stNewRound",
	"transitions": {
		"coinspicked": 15
	}
}
					*/
					break;
				case "selectUnit":
					/*
					{
	"name": "selectUnit",
	"description": "${actplayer} must select a Unit",
	"descriptionmyturn": "${you} must select a Unit",
	"type": "activeplayer",
	"args": "argSelectUnit",
	"possibleactions": [
		"select"
	],
	"transitions": {
		"select": 20,
		"tactics": 30,
		"zombiePass": 70
	}
}
					*/
					break;
				case "unitSelected":
					/*
					{
	"name": "unitSelected",
	"description": "${actplayer} must do an Action",
	"descriptionmyturn": "${you} must do an Action with ${unit_name}",
	"type": "activeplayer",
	"args": "argUnitSelected",
	"possibleactions": [
		"deselect",
		"deploy",
		"bolster",
		"claiminitiative",
		"recruit",
		"pass",
		"takecontrol",
		"move",
		"attack",
		"controlfriend",
		"usedecree"
	],
	"transitions": {
		"cancel_select": 15,
		"validate": 60,
		"tactics": 30,
		"bannerman": 15,
		"warriorpriest": 15,
		"decrees": 40,
		"spy_decree": 42,
		"getattacked": 21,
		"end_game": 99,
		"enlist": 41,
		"zombiePass": 70
	}
}
					*/
					break;
				case "getAttacked":
					/*
					{
	"name": "getAttacked",
	"description": "",
	"type": "game",
	"action": "stGetAttacked",
	"transitions": {
		"askattacked": 22
	}
}
					*/
					break;
				case "askAttacked":
					/*
					{
	"name": "askAttacked",
	"description": "${actplayer} must choose a Unit to be removed",
	"descriptionmyturn": "${you} must choose a Unit to be removed",
	"type": "activeplayer",
	"args": "argAskAttacked",
	"possibleactions": [
		"chooseunit",
		"cancelturn"
	],
	"transitions": {
		"next_player": 23,
		"zombiePass": 70
	}
}
					*/
					break;
				case "returnAttacked":
					/*
					{
	"name": "returnAttacked",
	"description": "",
	"type": "game",
	"action": "stReturnAttacked",
	"transitions": {
		"returnattacked": 24
	}
}
					*/
					break;
				case "afterChooseVictimAttack":
					/*
					{
	"name": "afterChooseVictimAttack",
	"description": "${actplayer} must choose a Unit",
	"descriptionmyturn": "${you} must choose a Unit",
	"type": "activeplayer",
	"action": "stAfterChooseVictimAttack",
	"possibleactions": [
		"chooseunit",
		"cancelturn"
	],
	"transitions": {
		"tactics": 30,
		"validate": 60,
		"bannerman": 15,
		"warriorpriest": 15,
		"enlist": 41,
		"zombiePass": 70
	}
}
					*/
					break;
				case "secondActions":
					/*
					{
	"name": "secondActions",
	"description": "${actplayer} must do an Action",
	"descriptionmyturn": "${you} must do an Action with ${unit_name}",
	"type": "activeplayer",
	"args": "argSecondActions",
	"possibleactions": [
		"deploy",
		"bolster",
		"claiminitiative",
		"recruit",
		"pass",
		"takecontrol",
		"move",
		"attack",
		"createfort",
		"destroyfort",
		"usedecree",
		"select",
		"deselect",
		"endturn",
		"cancelturn",
		"cancelaction"
	],
	"transitions": {
		"getattacked": 21,
		"cancel_select": 15,
		"select": 20,
		"tactics": 30,
		"warriorpriest": 15,
		"bannerman": 15,
		"enlist": 41,
		"decrees": 40,
		"spy_decree": 42,
		"validate": 60,
		"next_player": 70,
		"new_round": 10,
		"end_game": 99,
		"zombiePass": 70
	}
}
					*/
					break;
				case "decreeSelected":
					/*
					{
	"name": "decreeSelected",
	"description": "${actplayer} must choose an Action",
	"descriptionmyturn": "${you} must choose an Action",
	"type": "activeplayer",
	"args": "argDecreeSelected",
	"possibleactions": [
		"deselect",
		"activate",
		"endturn",
		"cancelturn",
		"cancelaction",
		"endspyaction"
	],
	"transitions": {
		"cancel_select": 15,
		"decree": 41,
		"spy_decree": 42,
		"validate": 60,
		"tactics": 30,
		"zombiePass": 70
	}
}
					*/
					break;
				case "decreeSecondActions":
					/*
					{
	"name": "decreeSecondActions",
	"description": "${actplayer} must choose an Action",
	"descriptionmyturn": "${you} must choose an Action",
	"type": "activeplayer",
	"args": "argDecreeSecondActions",
	"possibleactions": [
		"activate",
		"deploy",
		"bolster",
		"claiminitiative",
		"recruit",
		"pass",
		"takecontrol",
		"move",
		"attack",
		"createfort",
		"destroyfort",
		"select",
		"deselect",
		"endturn",
		"cancelturn",
		"cancelaction"
	],
	"transitions": {
		"bannerman": 15,
		"tactics": 30,
		"warriorpriest": 15,
		"getattacked": 21,
		"validate": 60,
		"cancel_select": 15,
		"zombiePass": 70
	}
}
					*/
					break;
				case "spyDecree":
					/*
					{
	"name": "spyDecree",
	"description": "${actplayer} can discard a Coin",
	"descriptionmyturn": "${you} can discard a Coin",
	"type": "activeplayer",
	"args": "argSpyDecree",
	"possibleactions": [
		"select",
		"endaction"
	],
	"transitions": {
		"tactics": 30,
		"validate": 60,
		"zombiePass": 70
	}
}
					*/
					break;
				case "validateTurn":
					/*
					{
	"name": "validateTurn",
	"description": "${actplayer} can validate or restart an Action",
	"descriptionmyturn": "${you} can validate or restart an Action",
	"type": "activeplayer",
	"possibleactions": [
		"endturn",
		"cancelturn"
	],
	"transitions": {
		"cancel_select": 15,
		"next_player": 70,
		"new_round": 10,
		"end_game": 99,
		"zombiePass": 70
	}
}
					*/
					break;
				case "nextPlayer":
					/*
					{
	"name": "nextPlayer",
	"description": "",
	"type": "game",
	"action": "stNextPlayer",
	"updateGameProgression": true,
	"transitions": {
		"nextplayer": 15
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
export default warchest;
