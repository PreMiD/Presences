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

const myfirstcastlepanic: GamePresence = {
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
				case "drawCard":
					/*
					{
	"name": "drawCard",
	"description": "Dealing a card to the active player...",
	"descriptionmyturn": "Dealing a card to the active player...",
	"action": "stdrawCard",
	"type": "game",
	"transitions": {
		"PlayCard": 3
	}
}
					*/
					break;
				case "PlayaCard":
					/*
					{
	"name": "PlayaCard",
	"description": "${actplayer} must choose a card to play, choose another player's card to ask for help, or select pass to end your turn",
	"descriptionmyturn": "${you} must choose a card to play, choose another player's card to ask for help, or select pass to end your turn",
	"args": "argPlayaCard",
	"type": "activeplayer",
	"possibleactions": [
		"PlayCard",
		"Pass",
		"AskCard"
	],
	"transitions": {
		"MoveMonster": 4,
		"SelectMonster": 6,
		"AskCard": 7,
		"SinglePlay": 3,
		"GameEnd": 99
	}
}
					*/
					break;
				case "MoveMonsters":
					/*
					{
	"name": "MoveMonsters",
	"description": "Monsters are marching towards the castle...",
	"descriptionmyturn": "Monsters are marching towards the castle...",
	"action": "stMoveMonsters",
	"args": "argMoveMonsters",
	"type": "game",
	"transitions": {
		"DrawMonster": 5,
		"GameEnd": 99
	}
}
					*/
					break;
				case "DrawMonster":
					/*
					{
	"name": "DrawMonster",
	"description": "New monster is coming...",
	"descriptionmyturn": "New monster is coming...",
	"action": "stDrawMonster",
	"args": "argDrawMonster",
	"type": "game",
	"transitions": {
		"NextPlayer": 2,
		"GameEnd": 99,
		"DrawMonster": 5
	}
}
					*/
					break;
				case "SelectMonster":
					/*
					{
	"name": "SelectMonster",
	"description": "${actplayer} must select the monster to remove from the board...",
	"descriptionmyturn": "${you} must select the monster to remove from the board...",
	"args": "argSelectMonster",
	"type": "activeplayer",
	"possibleactions": [
		"SelectMonster"
	],
	"transitions": {
		"MoveMonster": 4
	}
}
					*/
					break;
				case "AskCard":
					/*
					{
	"name": "AskCard",
	"description": "Ask a card to another player...",
	"descriptionmyturn": "Ask a card to another player...",
	"args": "argAskCard",
	"action": "stAskCard",
	"type": "game",
	"transitions": {
		"AskCard2": 8
	}
}
					*/
					break;
				case "AskCard2":
					/*
					{
	"name": "AskCard2",
	"description": "${actplayer} must accept or deny the proposal to play its card...",
	"descriptionmyturn": "${you} must accept or deny the proposal to play your card...",
	"args": "argAskCard2",
	"action": "stAskCard2",
	"type": "activeplayer",
	"possibleactions": [
		"PlayCardYes",
		"DenyCard"
	],
	"transitions": {
		"DenyCard": 9,
		"PlayCardYes": 10
	}
}
					*/
					break;
				case "AskCardDeny":
					/*
					{
	"name": "AskCardDeny",
	"description": "Proposal refused...",
	"descriptionmyturn": "Proposal refused...",
	"args": "argAskCardDeny",
	"action": "stAskCardDeny",
	"type": "game",
	"transitions": {
		"AskCardDeny": 3
	}
}
					*/
					break;
				case "PlayCardYes":
					/*
					{
	"name": "PlayCardYes",
	"description": "Proposal accepted...",
	"descriptionmyturn": "Proposal accepted...",
	"args": "argPlayCardYes",
	"action": "stPlayCardYes",
	"type": "game",
	"possibleactions": [
		"PlayCard",
		"Pass",
		"AskCard"
	],
	"transitions": {
		"MoveMonster": 4,
		"SelectMonster": 6,
		"AskCard": 7,
		"GameEnd": 99
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
export default myfirstcastlepanic;
