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

const diceforge: GamePresence = {
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
				case "beginTurn":
					/*
					{
	"name": "beginTurn",
	"description": "",
	"type": "game",
	"action": "stBeginTurn",
	"transitions": {
		"beginPlayerTurn": 3,
		"gameEnd": 99,
		"draft": 24
	}
}
					*/
					break;
				case "beginPlayerTurn":
					/*
					{
	"name": "beginPlayerTurn",
	"description": "${actplayer} must roll the dice",
	"descriptionmyturn": "${you} must roll your dice",
	"type": "activeplayer",
	"action": "stBeginPlayerTurn",
	"possibleactions": [
		"actRollDice"
	],
	"transitions": {
		"blessing": 4
	},
	"updateGameProgression": true
}
					*/
					break;
				case "divineBlessing":
					/*
					{
	"name": "divineBlessing",
	"description": "Everyone rolls their dice",
	"descriptionmyturn": "${you} roll your dice",
	"type": "game",
	"action": "stBlessing",
	"transitions": {
		"reinforcement": 6,
		"blessing": 4,
		"ressourceChoice": 5,
		"forgeShip": 19,
		"nextState": 4,
		"misfortune": 26
	}
}
					*/
					break;
				case "ressourceChoice":
					/*
					{
	"name": "ressourceChoice",
	"description": "Everyone choose the resources",
	"descriptionmyturn": "${you} choose the resources for the side ${loyalty}",
	"type": "multipleactiveplayer",
	"args": "argsRessourceChoice",
	"action": "stRessourceChoice",
	"possibleactions": [
		"actRessourceChoice",
		"actSideChoice",
		"actActionChoice",
		"actUseCerberusToken",
		"actUseTritonToken",
		"actAutoHammer",
		"actChooseMazePath",
		"actChooseTreasure",
		"actMazePowerConfirm",
		"actPuzzleCelestial",
		"actPuzzleMaze"
	],
	"transitions": {
		"blessing": 4,
		"choice": 5,
		"nextState": 4,
		"misfortune": 26
	}
}
					*/
					break;
				case "reinforcement":
					/*
					{
	"name": "reinforcement",
	"description": "${actplayer} may activate reinforcement cards",
	"descriptionmyturn": "${you} may activate reinforcement cards",
	"type": "activeplayer",
	"args": "argsReinforcement",
	"action": "stReinforcement",
	"possibleactions": [
		"actReinforcement",
		"actReinforcementPass",
		"actUseTritonToken",
		"actAutoHammer"
	],
	"transitions": {
		"reinforcement": 6,
		"playerAction": 7,
		"choice": 16,
		"forgeShip": 20,
		"misfortune": 26
	}
}
					*/
					break;
				case "playerAction":
					/*
					{
	"name": "playerAction",
	"description": "Turn ${currentTurn}/${maxTurn} : ${actplayer} may choose an action",
	"descriptionmyturn": "Turn ${currentTurn}/${maxTurn} : ${you} may choose an action",
	"type": "activeplayer",
	"args": "argsPlayerAction",
	"possibleactions": [
		"actBuyForge",
		"actEndForge",
		"actBuyExploit",
		"actEndPlayerTurn",
		"actUseTritonToken",
		"actAutoHammer",
		"actUseCompanion",
		"actUseScepter",
		"actCancelScepter"
	],
	"transitions": {
		"playerAction": 7,
		"playerOusting": 12,
		"exploitEffect": 14,
		"endPlayerTurn": 15,
		"playerSecondAction": 10,
		"current": 7
	}
}
					*/
					break;
				case "secondAction":
					/*
					{
	"name": "secondAction",
	"description": "${actplayer} is choosing if another action is played",
	"descriptionmyturn": "Do ${you} wish to take another action?",
	"args": "argsSecondAction",
	"type": "activeplayer",
	"possibleactions": [
		"actSecondAction",
		"actUseTritonToken",
		"actAutoHammer",
		"actUseCompanion",
		"actUseScepter",
		"actCancelScepter"
	],
	"transitions": {
		"playerAction": 7,
		"endPlayerTurn": 15,
		"current": 10
	}
}
					*/
					break;
				case "playerOusting":
					/*
					{
	"name": "playerOusting",
	"description": "",
	"descriptionmyturn": "",
	"type": "game",
	"action": "stOusting",
	"transitions": {
		"exploitEffect": 14,
		"choice": 13,
		"forgeShip": 21,
		"nextState": 12,
		"misfortune": 26
	}
}
					*/
					break;
				case "playerOustingChoice":
					/*
					{
	"name": "playerOustingChoice",
	"description": "Players are choosing resources due to ousting",
	"descriptionmyturn": "${you} choose the resources for the side  ${loyalty}",
	"type": "multipleactiveplayer",
	"args": "argsRessourceChoice",
	"possibleactions": [
		"actOustedRessources",
		"actSideChoice",
		"actActionChoice",
		"actUseCerberusToken",
		"actUseTritonToken",
		"actAutoHammer",
		"actChooseMazePath",
		"actChooseTreasure",
		"actMazePowerConfirm",
		"actPuzzleCelestial",
		"actPuzzleMaze"
	],
	"transitions": {
		"nextState": 12,
		"choice": 13,
		"forgeShip": 21,
		"misfortune": 26
	}
}
					*/
					break;
				case "exploitEffect":
					/*
					{
	"name": "exploitEffect",
	"description": "Effects are being played",
	"descriptionmyturn": "Effects are being played",
	"type": "activeplayer",
	"args": "argExploitEffect",
	"action": "stEffectExploit",
	"possibleactions": [
		"actBuyForge",
		"actExploitEnigma",
		"actExploitBoar",
		"actUseTritonToken",
		"actAutoHammer",
		"actBuyExploit",
		"actCelestialUpgrade",
		"actForgeNymphPass",
		"actAncestorSelect",
		"actMemoryToken"
	],
	"transitions": {
		"playerSecondAction": 10,
		"endPlayerTurn": 15,
		"choice": 17,
		"exploitEffect": 14,
		"forgeShip": 22,
		"forgeBoar": 23,
		"nextState": 14,
		"misfortune": 26
	}
}
					*/
					break;
				case "endPlayerTurn":
					/*
					{
	"name": "endPlayerTurn",
	"description": "",
	"type": "game",
	"action": "stEndPlayerTurn",
	"transitions": {
		"nextPlayer": 3,
		"nextTurn": 2,
		"endScoring": 18
	}
}
					*/
					break;
				case "doeRessourceChoice":
					/*
					{
	"name": "doeRessourceChoice",
	"description": "Players are choosing resources",
	"descriptionmyturn": "${you} choose the resources for the side  ${loyalty}",
	"type": "multipleactiveplayer",
	"args": "argsRessourceChoice",
	"possibleactions": [
		"actDoeTakeRessource",
		"actActionChoice",
		"actSideChoice",
		"actUseCerberusToken",
		"actUseTritonToken",
		"actAutoHammer",
		"actChooseMazePath",
		"actChooseTreasure",
		"actMazePowerConfirm",
		"actPuzzleCelestial",
		"actPuzzleMaze"
	],
	"transitions": {
		"nextState": 6,
		"choice": 16,
		"forgeShip": 20,
		"misfortune": 26
	}
}
					*/
					break;
				case "exploitRessource":
					/*
					{
	"name": "exploitRessource",
	"description": "Players are choosing resources",
	"descriptionmyturn": "${you} choose the resources for the side ${loyalty}",
	"type": "multipleactiveplayer",
	"args": "argExploitRessource",
	"possibleactions": [
		"actExploitRessource",
		"actSideChoice",
		"actActionChoice",
		"actUseCerberusToken",
		"actUseTritonToken",
		"actAutoHammer",
		"actChooseMazePath",
		"actChooseTreasure",
		"actMazePowerConfirm",
		"actPuzzleCelestial",
		"actPuzzleMaze",
		"actRessourceChoice"
	],
	"transitions": {
		"nextState": 14,
		"choice": 17,
		"forgeShip": 22,
		"misfortune": 26
	}
}
					*/
					break;
				case "endScoring":
					/*
					{
	"name": "endScoring",
	"description": "",
	"type": "game",
	"action": "stEndScoring",
	"transitions": {
		"endGame": 99
	},
	"updateGameProgression": true
}
					*/
					break;
				case "forgeShip":
					/*
					{
	"name": "forgeShip",
	"description": "[${ship}] ${actplayer} may forge a side",
	"descriptionmyturn": "[${ship}] ${you} may forge 1 side (cost ${minusCost})",
	"type": "multipleactiveplayer",
	"args": "argsForgeShip",
	"possibleactions": [
		"actBuyForge",
		"actForgeShipPass",
		"actUseTritonToken",
		"actAutoHammer",
		"actCelestialUpgrade",
		"actCancelCelestial",
		"actPuzzleCelestial"
	],
	"transitions": {
		"blessing": 4,
		"forgeShip": 19,
		"nextState": 4
	}
}
					*/
					break;
				case "doeForgeShip":
					/*
					{
	"name": "doeForgeShip",
	"description": "[${ship}] ${actplayer} may forge a side",
	"descriptionmyturn": "[${ship}] ${you} may forge 1 side (cost ${minusCost})",
	"type": "multipleactiveplayer",
	"args": "argsForgeShip",
	"possibleactions": [
		"actBuyForge",
		"actForgeShipPass",
		"actUseTritonToken",
		"actAutoHammer",
		"actCelestialUpgrade",
		"actCancelCelestial"
	],
	"transitions": {
		"nextState": 6,
		"forgeShip": 19,
		"choice": 16
	}
}
					*/
					break;
				case "oustedForgeShip":
					/*
					{
	"name": "oustedForgeShip",
	"description": "[${ship}] ${actplayer} may forge a side",
	"descriptionmyturn": "[${ship}] ${you} may forge 1 side (cost ${minusCost})",
	"type": "multipleactiveplayer",
	"args": "argsForgeShip",
	"possibleactions": [
		"actBuyForge",
		"actForgeShipPass",
		"actCelestialUpgrade",
		"actCancelCelestial",
		"actPuzzleCelestial"
	],
	"transitions": {
		"nextState": 12,
		"choice": 13,
		"forgeShip": 21
	}
}
					*/
					break;
				case "exploitForgeShip":
					/*
					{
	"name": "exploitForgeShip",
	"description": "[${ship}] ${actplayer} may forge a side",
	"descriptionmyturn": "[${ship}] ${you} may forge 1 side (cost ${minusCost})",
	"type": "multipleactiveplayer",
	"args": "argsForgeShip",
	"possibleactions": [
		"actBuyForge",
		"actForgeShipPass",
		"actUseTritonToken",
		"actAutoHammer",
		"actCelestialUpgrade",
		"actCancelCelestial",
		"actPuzzleCelestial"
	],
	"transitions": {
		"nextState": 14,
		"choice": 17,
		"forgeShip": 22
	}
}
					*/
					break;
				case "exploitForgeBoar":
					/*
					{
	"name": "exploitForgeBoar",
	"description": "${actplayer} is forging a ${card_name} side",
	"descriptionmyturn": "${you} must forge the selected ${card_name} side",
	"type": "multipleactiveplayer",
	"args": "argsForgeBoar",
	"possibleactions": [
		"actBuyForge",
		"actAutoHammer"
	],
	"transitions": {
		"exploitEffect": 14
	}
}
					*/
					break;
				case "draftGame":
					/*
					{
	"name": "draftGame",
	"description": "",
	"type": "game",
	"action": "stDraftGame",
	"transitions": {
		"beginTurn": 2,
		"draft": 25
	}
}
					*/
					break;
				case "draft":
					/*
					{
	"name": "draft",
	"description": "Draft : ${actplayer} is choosing a card",
	"descriptionmyturn": "Draft : ${you} must choose a card",
	"type": "activeplayer",
	"possibleactions": [
		"actDraft",
		"actAutoHammer"
	],
	"args": "argsDraft",
	"transitions": {
		"draft": 24
	}
}
					*/
					break;
				case "misfortuneChoice":
					/*
					{
	"name": "misfortuneChoice",
	"description": "Mirror of Misfortune effect: Player is choosing resources",
	"descriptionmyturn": "Mirror of Misfortune effect: ${you} choose the resources for the side  ${loyalty}",
	"type": "multipleactiveplayer",
	"action": "stMisfortuneChoice",
	"args": "argsMisfortune",
	"possibleactions": [
		"actMisfortuneChoice",
		"actActionMisfortune",
		"actAutoHammer"
	],
	"transitions": {
		"nextState": 26,
		"choice": 26,
		"blessing": 4,
		"reinforcement": 6,
		"exploitEffect": 14,
		"exploitRessource": 17,
		"ousting": 12
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
export default diceforge;
