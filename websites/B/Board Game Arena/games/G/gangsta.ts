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

const gangsta: GamePresence = {
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
	"description": "Game Setup",
	"type": "manager",
	"action": "stGameSetup",
	"transitions": {
		"": "4"
	}
}
					*/
					break;
				case "checkSynchro":
					/*
					{
	"name": "checkSynchro",
	"description": "",
	"type": "game",
	"action": "stCheckSynchro",
	"updateGameProgression": true,
	"transitions": {
		"mobilize": 3,
		"playerAction": 4
	}
}
					*/
					break;
				case "playerMobilize":
					/*
					{
	"name": "playerMobilize",
	"description": "${actplayer} is mobilizing their gangsters",
	"descriptionmyturn": "${you} must choose which gangsters to untap (${leader} free untaps)",
	"type": "activeplayer",
	"possibleactions": [
		"untapGangsters",
		"skip"
	],
	"transitions": {
		"playTurn": 4,
		"skip": 4,
		"zombiePass": 25
	},
	"args": "argPlayerMobilize"
}
					*/
					break;
				case "playerAction":
					/*
					{
	"name": "playerAction",
	"description": "${actplayer} must perform an action or pass",
	"descriptionmyturn": "${you} must recruit, perform a heist, or Pass",
	"type": "activeplayer",
	"possibleactions": [
		"recruitGangster",
		"performHeist",
		"pass"
	],
	"transitions": {
		"discard": 5,
		"checkPhase": 25,
		"replay": 25,
		"zombiePass": 25,
		"rewardRecruit": 7,
		"rewardSteal": 8,
		"rewardTap": 9,
		"markForKill": 10,
		"rewardSkill": 11
	}
}
					*/
					break;
				case "discard":
					/*
					{
	"name": "discard",
	"description": "${actplayer} may discard a card from the available heists or gangsters",
	"descriptionmyturn": "${you} may discard a card from the available heists or gangsters",
	"type": "activeplayer",
	"possibleactions": [
		"discard",
		"skipDiscard"
	],
	"transitions": {
		"checkPhase": 25
	}
}
					*/
					break;
				case "snitch":
					/*
					{
	"name": "snitch",
	"description": "Other players must deal with the snitch",
	"descriptionmyturn": "${you} need to deal with the snitch",
	"type": "multipleactiveplayer",
	"possibleactions": [
		"snitchKill"
	],
	"transitions": {
		"checkPhase": 25
	},
	"action": "stSnitchInit",
	"args": "argSnitchInit"
}
					*/
					break;
				case "rewardRecruit":
					/*
					{
	"name": "rewardRecruit",
	"description": "${actplayer} can recruit an additional gangster",
	"descriptionmyturn": "${you} may recruit an additional gangster",
	"type": "activeplayer",
	"possibleactions": [
		"recruitGangster",
		"skip"
	],
	"transitions": {
		"checkPhase": 25,
		"skip": 25
	}
}
					*/
					break;
				case "rewardSteal":
					/*
					{
	"name": "rewardSteal",
	"description": "${actplayer} can now steal ${amount} from anyone",
	"descriptionmyturn": "${you} may steal ${amount} from a rival gang",
	"type": "activeplayer",
	"possibleactions": [
		"steal",
		"skip"
	],
	"transitions": {
		"checkPhase": 25,
		"skip": 25,
		"replay": 4
	},
	"args": "argRewardSteal"
}
					*/
					break;
				case "rewardTap":
					/*
					{
	"name": "rewardTap",
	"description": "${actplayer} may tap ${amount} rival gangsters",
	"descriptionmyturn": "${you} may tap ${amount} rival gangsters",
	"type": "activeplayer",
	"possibleactions": [
		"tap",
		"skip"
	],
	"transitions": {
		"checkPhase": 25,
		"skip": 25,
		"zombiePass": 25
	},
	"args": "argRewardTap"
}
					*/
					break;
				case "markForKill":
					/*
					{
	"name": "markForKill",
	"description": "${actplayer} is chosing a rival gang as a target",
	"descriptionmyturn": "${you} may designate a rival gang for an assassination",
	"type": "activeplayer",
	"possibleactions": [
		"markForKill",
		"skip"
	],
	"transitions": {
		"markForKill": 12,
		"skip": 25,
		"zombiePass": 25
	},
	"args": "argRewardMark"
}
					*/
					break;
				case "rewardSkill":
					/*
					{
	"name": "rewardSkill",
	"description": "${actplayer} is giving a skill to a gangster",
	"descriptionmyturn": "${you} may teach the skill ${skill_name} to one of your gangsters",
	"type": "activeplayer",
	"possibleactions": [
		"teach",
		"skip"
	],
	"transitions": {
		"checkPhase": 25,
		"skip": 25,
		"zombiePass": 25
	},
	"args": "argRewardSkill"
}
					*/
					break;
				case "switchToKiller":
					/*
					{
	"name": "switchToKiller",
	"description": "",
	"type": "game",
	"action": "stSwitchToKiller",
	"transitions": {
		"selectKiller": 13
	}
}
					*/
					break;
				case "rewardKill":
					/*
					{
	"name": "rewardKill",
	"description": "${actplayer} is choosing a gangster to kill",
	"descriptionmyturn": "${you} must select one of your gangsters",
	"type": "activeplayer",
	"possibleactions": [
		"kill"
	],
	"transitions": {
		"goBackToActive": 14,
		"zombiePass": 14
	},
	"args": "argRewardKill"
}
					*/
					break;
				case "goBackToActive":
					/*
					{
	"name": "goBackToActive",
	"description": "",
	"type": "game",
	"action": "stGoBackToActive",
	"transitions": {
		"checkPhase": 25
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
		"nextPlayer": 2
	}
}
					*/
					break;
				case "startGDG":
					/*
					{
	"name": "startGDG",
	"description": "",
	"type": "game",
	"action": "stStartGDG",
	"updateGameProgression": true,
	"transitions": {
		"nextPlayer": 24
	}
}
					*/
					break;
				case "gdgMulti":
					/*
					{
	"name": "gdgMulti",
	"description": "Other players must choose a gangster",
	"descriptionmyturn": "${you} must choose a gangster",
	"type": "multipleactiveplayer",
	"possibleactions": [
		"gdgKill"
	],
	"transitions": {
		"startDomination": 26
	},
	"action": "stGdgMulti",
	"args": "argGdgMulti"
}
					*/
					break;
				case "discoverSnitch":
					/*
					{
	"name": "discoverSnitch",
	"description": "",
	"type": "game",
	"action": "stDiscoverSnitch",
	"updateGameProgression": true,
	"transitions": {
		"checkPhase": 25,
		"snitch": 6
	}
}
					*/
					break;
				case "revealCards":
					/*
					{
	"name": "revealCards",
	"description": "",
	"type": "game",
	"action": "stRevealCards",
	"updateGameProgression": true,
	"transitions": {
		"endTurn": 20,
		"snitch": 23
	}
}
					*/
					break;
				case "checkPhase":
					/*
					{
	"name": "checkPhase",
	"description": "",
	"type": "game",
	"action": "stCheckPhase",
	"updateGameProgression": true,
	"transitions": {
		"gameEnd": 98,
		"startGDG": 21,
		"startDomination": 27,
		"revealCards": 24
	}
}
					*/
					break;
				case "startDomination":
					/*
					{
	"name": "startDomination",
	"description": "",
	"type": "game",
	"action": "stStartDomination",
	"updateGameProgression": true,
	"transitions": {
		"nextPlayer": 24
	}
}
					*/
					break;
				case "computeGangWar":
					/*
					{
	"name": "computeGangWar",
	"description": "",
	"type": "game",
	"action": "stComputeGDG",
	"updateGameProgression": false,
	"transitions": {
		"GDGMulti": 22
	}
}
					*/
					break;
				case "endOfGame":
					/*
					{
	"name": "endOfGame",
	"description": "",
	"type": "game",
	"action": "stEndOfGame",
	"updateGameProgression": true,
	"transitions": {
		"gameEnd": 99
	}
}
					*/
					break;
				case "gameEnd":
					/*
					{
	"name": "gameEnd",
	"description": "The game has ended",
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
export default gangsta;
