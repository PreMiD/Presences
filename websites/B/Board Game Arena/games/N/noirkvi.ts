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

const noirkvi: GamePresence = {
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
		"": 11
	}
}
					*/
					break;
				case "killerTurn":
					/*
					{
	"name": "killerTurn",
	"description": "${actplayer} must perform an action",
	"descriptionmyturn": "${you} must perform an action",
	"type": "activeplayer",
	"possibleactions": [
		"shift",
		"kill",
		"disguise",
		"zombiePass"
	],
	"transitions": {
		"shift": 21,
		"kill": 21,
		"disguise": 21,
		"zombiePass": 21
	}
}
					*/
					break;
				case "inspectorTurn":
					/*
					{
	"name": "inspectorTurn",
	"description": "${actplayer} must perform an action",
	"descriptionmyturn": "${you} must perform an action",
	"type": "activeplayer",
	"possibleactions": [
		"shift",
		"arrest",
		"exonerate",
		"citizensArrest",
		"zombiePass"
	],
	"transitions": {
		"shift": 32,
		"arrest": 32,
		"exonerate": 31,
		"citizensArrest": 33,
		"zombiePass": 32
	}
}
					*/
					break;
				case "killerFirstTurn":
					/*
					{
	"name": "killerFirstTurn",
	"description": "${actplayer} must kill a suspect",
	"descriptionmyturn": "${you} must kill a suspect",
	"type": "activeplayer",
	"possibleactions": [
		"kill",
		"zombiePass"
	],
	"transitions": {
		"kill": 12,
		"zombiePass": 12
	}
}
					*/
					break;
				case "afterFirstKill":
					/*
					{
	"name": "afterFirstKill",
	"type": "game",
	"action": "stAfterFirstKill",
	"updateGameProgression": true,
	"transitions": {
		"nextTurn": 13
	}
}
					*/
					break;
				case "inspectorFirstTurn":
					/*
					{
	"name": "inspectorFirstTurn",
	"description": "${actplayer} must pick an identity",
	"descriptionmyturn": "${you} must pick an identity",
	"type": "activeplayer",
	"possibleactions": [
		"pickID"
	],
	"transitions": {
		"pickID": 14
	}
}
					*/
					break;
				case "afterPickID":
					/*
					{
	"name": "afterPickID",
	"type": "game",
	"action": "stAfterPickID",
	"updateGameProgression": true,
	"transitions": {
		"nextTurn": 2
	}
}
					*/
					break;
				case "afterKiller":
					/*
					{
	"name": "afterKiller",
	"type": "game",
	"action": "stAfterKiller",
	"updateGameProgression": true,
	"transitions": {
		"nextTurn": 3,
		"endGame": 99
	}
}
					*/
					break;
				case "inspectorPickExonerate":
					/*
					{
	"name": "inspectorPickExonerate",
	"description": "${actplayer} must discard a card",
	"descriptionmyturn": "${you} must discard a card from your hand",
	"type": "activeplayer",
	"possibleactions": [
		"pickExonerate"
	],
	"transitions": {
		"pickExonerate": 32
	}
}
					*/
					break;
				case "afterInspector":
					/*
					{
	"name": "afterInspector",
	"type": "game",
	"action": "stAfterInspector",
	"updateGameProgression": true,
	"transitions": {
		"nextTurn": 2,
		"endGame": 99
	}
}
					*/
					break;
				case "inspectorPickCitizensArrestCard":
					/*
					{
	"name": "inspectorPickCitizensArrestCard",
	"description": "${actplayer} must discard a card",
	"descriptionmyturn": "${you} must discard a card from your hand.",
	"type": "activeplayer",
	"possibleactions": [
		"pickCitizensArrestCard",
		"pickCitizensArrestCardInvalid"
	],
	"transitions": {
		"pickCitizensArrestCard": 34,
		"pickCitizensArrestCardInvalid": 3
	}
}
					*/
					break;
				case "inspectorPickCitizensArrestTarget":
					/*
					{
	"name": "inspectorPickCitizensArrestTarget",
	"description": "${actplayer} must pick a suspect",
	"descriptionmyturn": "${you} must pick a suspect adjacent to newly exonerated character.",
	"type": "activeplayer",
	"possibleactions": [
		"pickCitizensArrestTarget"
	],
	"transitions": {
		"pickCitizensArrestTarget": 32
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
export default noirkvi;
