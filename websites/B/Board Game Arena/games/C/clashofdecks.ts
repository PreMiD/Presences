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

const clashofdecks: GamePresence = {
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
				case "draft":
					/*
					{
	"name": "draft",
	"description": "",
	"type": "game",
	"action": "stDraft",
	"transitions": {
		"next": 8,
		"start": 7,
		"same": 2
	}
}
					*/
					break;
				case "invocation":
					/*
					{
	"name": "invocation",
	"description": "${actplayer} must play a card or start assault (${mana} mana left)",
	"descriptionmyturn": "${you} must play a card or start assault (${mana} mana left)",
	"type": "activeplayer",
	"args": "argInvocation",
	"possibleactions": [
		"playCard",
		"pass"
	],
	"transitions": {
		"same": 3,
		"next": 4,
		"zombiePass": 4,
		"finish": 99
	}
}
					*/
					break;
				case "startAssault":
					/*
					{
	"name": "startAssault",
	"description": "",
	"type": "game",
	"action": "stStartAssault",
	"transitions": {
		"next": 5,
		"incant": 6
	}
}
					*/
					break;
				case "assault":
					/*
					{
	"name": "assault",
	"description": "",
	"type": "game",
	"action": "stAssault",
	"transitions": {
		"next": 7,
		"same": 5,
		"incant": 6,
		"finish": 99
	}
}
					*/
					break;
				case "incantAssault":
					/*
					{
	"name": "incantAssault",
	"description": "${actplayer} must play an incantation or continue assault (${mana} mana left)",
	"descriptionmyturn": "${you} must play an incantation or continue assault (${mana} mana left)",
	"type": "activeplayer",
	"args": "argInvocation",
	"possibleactions": [
		"playCard",
		"pass"
	],
	"transitions": {
		"same": 5,
		"next": 5,
		"zombiePass": 5
	}
}
					*/
					break;
				case "mana":
					/*
					{
	"name": "mana",
	"description": "",
	"type": "game",
	"action": "stMana",
	"updateGameProgression": true,
	"transitions": {
		"next": 3
	}
}
					*/
					break;
				case "draftPick":
					/*
					{
	"name": "draftPick",
	"description": "${actplayer} must pick one card",
	"descriptionmyturn": "${you} must pick one card",
	"type": "activeplayer",
	"possibleactions": [
		"pickCard"
	],
	"transitions": {
		"next": 2,
		"zombiePass": 99
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
export default clashofdecks;
