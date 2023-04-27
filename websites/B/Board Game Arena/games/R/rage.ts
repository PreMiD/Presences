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

const rage: GamePresence = {
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
				case "decideBidding":
					/*
					{
	"name": "decideBidding",
	"description": "",
	"type": "game",
	"action": "stDecideBidding",
	"transitions": {
		"actionBidding": 3,
		"actionBiddingHidden": 4
	}
}
					*/
					break;
				case "actionBidding":
					/*
					{
	"name": "actionBidding",
	"description": "${actplayer} is bidding",
	"descriptionmyturn": "${you} must bid a number of tricks",
	"type": "activeplayer",
	"possibleactions": [
		"bid"
	],
	"transitions": {
		"nextPlayer": 6,
		"nextBid": 7,
		"zombie": 7
	}
}
					*/
					break;
				case "actionBiddingHidden":
					/*
					{
	"name": "actionBiddingHidden",
	"type": "multipleactiveplayer",
	"description": "Other players are bidding",
	"descriptionmyturn": "${you} must bid a number of tricks",
	"possibleactions": [
		"bid"
	],
	"transitions": {
		"playCard": 5
	},
	"action": "stBidding"
}
					*/
					break;
				case "actionPlayCard":
					/*
					{
	"name": "actionPlayCard",
	"description": "${actplayer} is choosing a card",
	"descriptionmyturn": "${you} must choose a card",
	"type": "activeplayer",
	"possibleactions": [
		"playCard"
	],
	"transitions": {
		"nextPlayer": 6,
		"nextTrick": 8,
		"zombie": 6
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
	"transitions": {
		"actionPlayCard": 5
	}
}
					*/
					break;
				case "nextBid":
					/*
					{
	"name": "nextBid",
	"description": "",
	"type": "game",
	"action": "stNextBid",
	"transitions": {
		"actionBidding": 3
	}
}
					*/
					break;
				case "nextTrick":
					/*
					{
	"name": "nextTrick",
	"description": "",
	"type": "game",
	"action": "stNextTrick",
	"updateGameProgression": true,
	"transitions": {
		"decideBidding": 2,
		"actionPlayCard": 5,
		"gameEnd": 99
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
export default rage;
