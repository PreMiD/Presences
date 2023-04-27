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

const carcassonnehuntersandgatherers: GamePresence = {
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
		"": 10
	}
}
					*/
					break;
				case "playTile":
					/*
					{
	"name": "playTile",
	"description": "${actplayer} must play a tile ${titlearg1}",
	"descriptionmyturn": "${you} must play a tile ${titlearg1}",
	"type": "activeplayer",
	"args": "argPlayTile",
	"possibleactions": [
		"playTile"
	],
	"transitions": {
		"playTile": 3,
		"canGetBackTribeMember": 22,
		"giveUpTurn": 10
	}
}
					*/
					break;
				case "canPlayTribeMember":
					/*
					{
	"name": "canPlayTribeMember",
	"description": "${actplayer} can place a tribe member or hut",
	"descriptionmyturn": "${you} can place a tribe member or hut on your tile",
	"type": "activeplayer",
	"action": "stCanPlayTribeMember",
	"args": "argCanPlayTribeMember",
	"possibleactions": [
		"addTribeMember",
		"noTribeMember"
	],
	"transitions": {
		"addTribeMember": 4,
		"noTribeMember": 4
	}
}
					*/
					break;
				case "scorePoints":
					/*
					{
	"name": "scorePoints",
	"description": "",
	"type": "game",
	"action": "stScorePoints",
	"transitions": {
		"": 5
	}
}
					*/
					break;
				case "isTileLeft":
					/*
					{
	"name": "isTileLeft",
	"description": "",
	"type": "game",
	"action": "stIsTileLeft",
	"transitions": {
		"yes": 10,
		"no": 6
	}
}
					*/
					break;
				case "unachievedCount":
					/*
					{
	"name": "unachievedCount",
	"description": "Resolving unachieved features",
	"type": "game",
	"action": "stUnachievedCount",
	"transitions": {
		"": 7
	}
}
					*/
					break;
				case "fieldCount":
					/*
					{
	"name": "fieldCount",
	"description": "Counting grassland",
	"type": "game",
	"action": "stFieldCount",
	"transitions": {
		"hutCount": 8
	}
}
					*/
					break;
				case "hutCount":
					/*
					{
	"name": "hutCount",
	"description": "Counting huts",
	"type": "game",
	"action": "stHutCount",
	"transitions": {
		"gameEnd": 99
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
		"next": 2,
		"cantplay": 5
	}
}
					*/
					break;
				case "canGetBackTribeMember":
					/*
					{
	"name": "canGetBackTribeMember",
	"description": "${actplayer} can take a tribe member back",
	"descriptionmyturn": "${you} can take a tribe member back",
	"type": "activeplayer",
	"possibleactions": [
		"getBackTribeMember",
		"skipGettingBackTribeMember"
	],
	"transitions": {
		"canPlayTribeMember": 3
	}
}
					*/
					break;
				case "gameEnd":
					/*
					{
	"name": "gameEnd",
	"description": "End of game",
	"action": "stGameEnd",
	"type": "manager",
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
export default carcassonnehuntersandgatherers;
