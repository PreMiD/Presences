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

const nautilus: GamePresence = {
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
		"": 2
	}
}
					*/
					break;
				case "preparationOfRound":
					/*
					{
	"name": "preparationOfRound",
	"description": "Preparing a new round...",
	"type": "game",
	"action": "stPreparationOfRound",
	"transitions": {
		"": 3
	}
}
					*/
					break;
				case "giveSpecialCardToOpponent":
					/*
					{
	"name": "giveSpecialCardToOpponent",
	"description": "${actplayer} must give one of special cards to his/her opponent",
	"descriptionmyturn": "${you} must give one of special cards to your opponent",
	"type": "activeplayer",
	"args": "argPlayerGiveSpecialCardToOpponent",
	"possibleactions": [
		"giveSpecialCardToOpponent"
	],
	"transitions": {
		"": 4
	}
}
					*/
					break;
				case "checkSpecialCardPlayedBeforeDiverCardsInFirstPlayer":
					/*
					{
	"name": "checkSpecialCardPlayedBeforeDiverCardsInFirstPlayer",
	"description": "",
	"type": "game",
	"action": "stCheckSpecialCardPlayedBeforeDiverCardsInFirstPlayer",
	"transitions": {
		"isInHand": 22,
		"isNotInHand": 5
	}
}
					*/
					break;
				case "checkSpecialCardPlayedBeforeDiverCardsInSecondPlayer":
					/*
					{
	"name": "checkSpecialCardPlayedBeforeDiverCardsInSecondPlayer",
	"description": "",
	"type": "game",
	"action": "stCheckSpecialCardPlayedBeforeDiverCardsInSecondPlayer",
	"transitions": {
		"isInHand": 17,
		"isNotInHand": 22
	}
}
					*/
					break;
				case "playDiverOrSpecialCard":
					/*
					{
	"name": "playDiverOrSpecialCard",
	"description": "${actplayer} must play a diver card or a special card",
	"descriptionmyturn": "${you} must play a diver card or a special card",
	"type": "activeplayer",
	"args": "argPlayerPlayDiverOrSpecialCard",
	"possibleactions": [
		"playDiverOrSpecialCard"
	],
	"transitions": {
		"turnOfCardCompleted": 9,
		"zombiePlayed": 16,
		"diverCardWithVertArrowPlayed": 7,
		"diverCardWithHorzArrowPlayed": 8,
		"specialCardKrakenPlayed": 9,
		"specialCardFishbonePlayed": 9,
		"specialCardEyePlayed": 11,
		"specialCardDivingModulePlayed": 12,
		"specialCardHarpoonPlayed": 14
	}
}
					*/
					break;
				case "sendDiverCardToOppositeSide":
					/*
					{
	"name": "sendDiverCardToOppositeSide",
	"description": "${actplayer} must send a diver card to an empty space on opposite side",
	"descriptionmyturn": "${you} must send a diver card to an empty space on opposite side",
	"type": "activeplayer",
	"args": "argPlayerSendDiverCardToOppositeSide",
	"possibleactions": [
		"sendDiverCardToOppositeSide"
	],
	"transitions": {
		"": 9
	}
}
					*/
					break;
				case "sendDiverCardToSameSide":
					/*
					{
	"name": "sendDiverCardToSameSide",
	"description": "${actplayer} must send a diver card to an empty space on same side",
	"descriptionmyturn": "${you} must send a diver card to an empty space on same side",
	"type": "activeplayer",
	"args": "argPlayerSendDiverCardToSameSide",
	"possibleactions": [
		"sendDiverCardToSameSide"
	],
	"transitions": {
		"": 9
	}
}
					*/
					break;
				case "checkAnchorIsSelected":
					/*
					{
	"name": "checkAnchorIsSelected",
	"description": "",
	"type": "game",
	"action": "stCheckAnchorSelected",
	"transitions": {
		"anchorSelected": 10,
		"notSelected": 16
	}
}
					*/
					break;
				case "playSpecialCardAnchor":
					/*
					{
	"name": "playSpecialCardAnchor",
	"description": "${actplayer} must play the Anchor special card on anyone card",
	"descriptionmyturn": "${you} must play the Anchor special card on anyone card",
	"type": "activeplayer",
	"args": "argPlayerPlaySpecialCardAnchor",
	"possibleactions": [
		"playSpecialCardAnchor"
	],
	"transitions": {
		"anchorPlayed": 16,
		"anchorCanceled": 16,
		"zombiePlayed": 16
	}
}
					*/
					break;
				case "lookDiverCardsInOpponentHand":
					/*
					{
	"name": "lookDiverCardsInOpponentHand",
	"description": "${actplayer} is looking at the diver cards in his/her opponent`s hand",
	"descriptionmyturn": "${you} are looking at the diver cards in your opponent`s hand",
	"type": "activeplayer",
	"args": "argPlayerLookDiverCardsInOpponentHand",
	"possibleactions": [
		"lookDiverCardsInOpponentHand"
	],
	"transitions": {
		"firstPlayerLooked": 5,
		"secondPlayerLooked": 16,
		"zombiePlayed": 16
	}
}
					*/
					break;
				case "drawTwoExtraDiverCards":
					/*
					{
	"name": "drawTwoExtraDiverCards",
	"description": "",
	"type": "game",
	"action": "stDrawTwoExtraDiverCards",
	"transitions": {
		"": 13
	}
}
					*/
					break;
				case "keepExtraDiverCard":
					/*
					{
	"name": "keepExtraDiverCard",
	"description": "${actplayer} must keep one of two extra diver cards and return other to the deck",
	"descriptionmyturn": "${you} must keep one of two extra diver cards and return other to the deck",
	"type": "activeplayer",
	"args": "argPlayerKeepExtraDiverCard",
	"possibleactions": [
		"keepExtraDiverCard"
	],
	"transitions": {
		"firstPlayerKept": 5,
		"secondPlayerKept": 16
	}
}
					*/
					break;
				case "drawDiverCardFromOpponentHand":
					/*
					{
	"name": "drawDiverCardFromOpponentHand",
	"description": "",
	"type": "game",
	"action": "stDrawDiverCardFromOpponentHand",
	"transitions": {
		"": 15
	}
}
					*/
					break;
				case "returnDiverCardToOpponent":
					/*
					{
	"name": "returnDiverCardToOpponent",
	"description": "${actplayer} must select anyone diver card to return it to his/her opponent",
	"descriptionmyturn": "${you} must select anyone diver card to return it to your opponent",
	"type": "activeplayer",
	"args": "argPlayerReturnDiverCardToOpponent",
	"possibleactions": [
		"returnDiverCardToOpponent"
	],
	"transitions": {
		"firstPlayerReturned": 5,
		"secondPlayerReturned": 16
	}
}
					*/
					break;
				case "checkEndOfRound":
					/*
					{
	"name": "checkEndOfRound",
	"description": "",
	"type": "game",
	"action": "stCheckEndOfRound",
	"updateGameProgression": true,
	"transitions": {
		"roundEnded": 18,
		"notEndedYet": 17
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
		"": 22
	}
}
					*/
					break;
				case "awardDomainCards":
					/*
					{
	"name": "awardDomainCards",
	"description": "The domain cards are being awarded...",
	"type": "game",
	"action": "stAwardDomainCards",
	"updateGameProgression": true,
	"transitions": {
		"": 19
	}
}
					*/
					break;
				case "checkEndOfGame":
					/*
					{
	"name": "checkEndOfGame",
	"description": "",
	"type": "game",
	"action": "stCheckEndOfGame",
	"transitions": {
		"gameEnded": 21,
		"notEndedYet": 20
	}
}
					*/
					break;
				case "nextFirstPlayer":
					/*
					{
	"name": "nextFirstPlayer",
	"description": "",
	"type": "game",
	"action": "stNextFirstPlayer",
	"transitions": {
		"": 2
	}
}
					*/
					break;
				case "scoring":
					/*
					{
	"name": "scoring",
	"description": "Scoring...",
	"type": "game",
	"action": "stScoring",
	"transitions": {
		"": 99
	}
}
					*/
					break;
				case "checkCardForPlay":
					/*
					{
	"name": "checkCardForPlay",
	"description": "",
	"type": "game",
	"action": "stCheckCardForPlay",
	"transitions": {
		"isDiverCard": 23,
		"isSpecialCard": 24,
		"isDiverOrSpecialCard": 6
	}
}
					*/
					break;
				case "playDiverOrSpecialCard":
					/*
					{
	"name": "playDiverOrSpecialCard",
	"description": "${actplayer} must play a diver card",
	"descriptionmyturn": "${you} must play a diver card",
	"type": "activeplayer",
	"args": "argPlayerPlayDiverOrSpecialCard",
	"possibleactions": [
		"playDiverOrSpecialCard"
	],
	"transitions": {
		"turnOfCardCompleted": 9,
		"zombiePlayed": 16,
		"diverCardWithVertArrowPlayed": 7,
		"diverCardWithHorzArrowPlayed": 8,
		"specialCardKrakenPlayed": 9,
		"specialCardFishbonePlayed": 9,
		"specialCardEyePlayed": 11,
		"specialCardDivingModulePlayed": 12,
		"specialCardHarpoonPlayed": 14
	}
}
					*/
					break;
				case "playDiverOrSpecialCard":
					/*
					{
	"name": "playDiverOrSpecialCard",
	"description": "${actplayer} must play a special card",
	"descriptionmyturn": "${you} must play a special card",
	"type": "activeplayer",
	"args": "argPlayerPlayDiverOrSpecialCard",
	"possibleactions": [
		"playDiverOrSpecialCard"
	],
	"transitions": {
		"turnOfCardCompleted": 9,
		"zombiePlayed": 16,
		"diverCardWithVertArrowPlayed": 7,
		"diverCardWithHorzArrowPlayed": 8,
		"specialCardKrakenPlayed": 9,
		"specialCardFishbonePlayed": 9,
		"specialCardEyePlayed": 11,
		"specialCardDivingModulePlayed": 12,
		"specialCardHarpoonPlayed": 14
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
export default nautilus;
