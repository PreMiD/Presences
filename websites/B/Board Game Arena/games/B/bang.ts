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

const bang: GamePresence = {
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
		"": 4
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
		"start": 4
	},
	"updateGameProgression": true
}
					*/
					break;
				case "startOfTurn":
					/*
					{
	"name": "startOfTurn",
	"description": "",
	"type": "game",
	"action": "stStartOfTurn",
	"transitions": {
		"": 90
	}
}
					*/
					break;
				case "playCard":
					/*
					{
	"name": "playCard",
	"description": "${actplayer} can play a card",
	"descriptionmyturn": "${you} can play a card",
	"type": "activeplayer",
	"args": "argPlayCards",
	"action": "stPlayCard",
	"possibleactions": [
		"actPlayCard",
		"actUseAbility",
		"actEndTurn"
	]
}
					*/
					break;
				case "react":
					/*
					{
	"name": "react",
	"description": "${actplayer} must react",
	"descriptionmyturn": "${you} must react",
	"type": "activeplayer",
	"args": "argReact",
	"action": "stReact",
	"possibleactions": [
		"actReact",
		"actPass",
		"actUseAbility"
	]
}
					*/
					break;
				case "reactBeer":
					/*
					{
	"name": "reactBeer",
	"description": "${actplayer} may play ${n} beer to survive",
	"descriptionmyturn": "${you} may play ${n} beer to survive",
	"type": "activeplayer",
	"args": "argReactBeer",
	"action": "stReact",
	"possibleactions": [
		"actReact",
		"actPass",
		"actUseAbility"
	]
}
					*/
					break;
				case "endOfTurn":
					/*
					{
	"name": "endOfTurn",
	"description": "",
	"type": "game",
	"action": "stEndOfTurn",
	"transitions": {
		"next": 3
	}
}
					*/
					break;
				case "discardExcess":
					/*
					{
	"name": "discardExcess",
	"description": "${actplayer} must discard ${amount} cards before ending its turn",
	"descriptionmyturn": "${you} must discard ${amount} cards before ending your turn",
	"type": "activeplayer",
	"action": "stDiscardExcess",
	"args": "argDiscardExcess",
	"possibleactions": [
		"actCancelEndTurn",
		"actDiscardExcess"
	]
}
					*/
					break;
				case "drawCards":
					/*
					{
	"name": "drawCards",
	"description": "",
	"type": "game",
	"action": "stDrawCards"
}
					*/
					break;
				case "selectCard":
					/*
					{
	"name": "selectCard",
	"description": "${actplayer} must select ${amountToPick} cards for the effect of ${src}",
	"descriptionmyturn": "${you} must select ${amountToPick} cards for the effect of ${src}",
	"descriptionsingle": "${actplayer} must select a card for the effect of ${src}",
	"descriptionsinglemyturn": "${you} must select a card for the effect of ${src}",
	"type": "activeplayer",
	"args": "argSelect",
	"action": "stSelect",
	"possibleactions": [
		"actSelect"
	]
}
					*/
					break;
				case "eliminate":
					/*
					{
	"name": "eliminate",
	"description": "",
	"type": "game",
	"action": "stEliminate",
	"updateGameProgression": true
}
					*/
					break;
				case "drawCard":
					/*
					{
	"name": "drawCard",
	"description": "${actplayer} must choose where to draw the first card from",
	"descriptionmyturn": "${you} must choose where to draw the first card from",
	"type": "activeplayer",
	"args": "argDrawCard",
	"possibleactions": [
		"actDraw"
	]
}
					*/
					break;
				case "resolveFlipped":
					/*
					{
	"name": "resolveFlipped",
	"description": "",
	"type": "game",
	"action": "stResolveFlipped"
}
					*/
					break;
				case "flipCard":
					/*
					{
	"name": "flipCard",
	"description": "",
	"type": "game",
	"action": "stFlipCard"
}
					*/
					break;
				case "triggerAbility":
					/*
					{
	"name": "triggerAbility",
	"description": "",
	"type": "game",
	"action": "stTriggerAbility"
}
					*/
					break;
				case "resolveStack":
					/*
					{
	"name": "resolveStack",
	"description": "",
	"type": "game",
	"action": "stResolveStack",
	"transitions": []
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
export default bang;
