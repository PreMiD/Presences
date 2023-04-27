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

const mascarade: GamePresence = {
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
		"": 50
	}
}
					*/
					break;
				case "showCards":
					/*
					{
	"name": "showCards",
	"description": "Waiting for other players",
	"descriptionmyturn": "Click when ${you} are ready",
	"type": "multipleactiveplayer",
	"action": "stEnterShowCards",
	"possibleactions": [
		"ready"
	],
	"transitions": {
		"allPlayersReady": 3
	}
}
					*/
					break;
				case "nextPlayerMainTurn":
					/*
					{
	"name": "nextPlayerMainTurn",
	"description": "",
	"type": "game",
	"action": "stNextPlayerMainTurn",
	"transitions": {
		"nextPlayerMainTurn": 4
	}
}
					*/
					break;
				case "playerMainTurn":
					/*
					{
	"name": "playerMainTurn",
	"description": "${actplayer} must play",
	"descriptionmyturn": "${you} must play",
	"type": "activeplayer",
	"args": "argMainTurn",
	"updateGameProgression": true,
	"possibleactions": [
		"keepCard",
		"swapCard",
		"lookCard",
		"announceFigure"
	],
	"transitions": {
		"mainTurnDone": 3,
		"announceMade": 6
	}
}
					*/
					break;
				case "claimOrDoNotClaim":
					/*
					{
	"name": "claimOrDoNotClaim",
	"description": "${actplayer} can claim to be the ${announced_figure}",
	"descriptionmyturn": "Do ${you} claim to be the ${announced_figure} ? ",
	"type": "activeplayer",
	"args": "argClaim",
	"possibleactions": [
		"claim"
	],
	"transitions": {
		"claimTurnDone": 6
	}
}
					*/
					break;
				case "nextPlayerClaim":
					/*
					{
	"name": "nextPlayerClaim",
	"description": "",
	"type": "game",
	"action": "stNextPlayerClaim",
	"transitions": {
		"nextPlayerClaim": 5,
		"announcementResolved": 7,
		"richestPlayersTie": 10,
		"fool": 12,
		"sorceress": 15,
		"spy": 16,
		"guru": 20,
		"puppeteer": 25,
		"princess": 27,
		"gamer": 28
	}
}
					*/
					break;
				case "endOfAnnouncement":
					/*
					{
	"name": "endOfAnnouncement",
	"description": "",
	"type": "game",
	"action": "stEndOfAnnouncement",
	"transitions": {
		"nextPlayerMainTurn": 4,
		"enOfGame": 99
	}
}
					*/
					break;
				case "powerOfTricksterRichestTie":
					/*
					{
	"name": "powerOfTricksterRichestTie",
	"description": "${actplayer} must choose which player to tax among richest ones",
	"descriptionmyturn": "${you} must choose which player to tax among richest ones",
	"type": "activeplayer",
	"args": "argPowerOfTricksterRichestTie",
	"possibleactions": [
		"tricksterTax"
	],
	"transitions": {
		"announcementResolved": 7
	}
}
					*/
					break;
				case "powerOfFool":
					/*
					{
	"name": "powerOfFool",
	"description": "${actplayer} must exchange (or not) the card of two other players",
	"descriptionmyturn": "${you} must select the card of two other players and exchange them (or not)",
	"type": "activeplayer",
	"possibleactions": [
		"keepCard",
		"swapCard"
	],
	"transitions": {
		"announcementResolved": 7
	}
}
					*/
					break;
				case "powerOfSorceress":
					/*
					{
	"name": "powerOfSorceress",
	"description": "${actplayer} must choose another player's card",
	"descriptionmyturn": "${you} must choose another player's card",
	"type": "activeplayer",
	"possibleactions": [
		"swapFortune"
	],
	"transitions": {
		"announcementResolved": 7
	}
}
					*/
					break;
				case "powerOfSpyLook":
					/*
					{
	"name": "powerOfSpyLook",
	"description": "${actplayer} must choose another player's card",
	"descriptionmyturn": "${you} must choose another player's card",
	"type": "activeplayer",
	"possibleactions": [
		"lookCard"
	],
	"transitions": {
		"spySwap": 17,
		"zombiePass": 7
	}
}
					*/
					break;
				case "powerOfSpySwap":
					/*
					{
	"name": "powerOfSpySwap",
	"description": "${actplayer} can exchange (or not) their card with ${player_name2}",
	"descriptionmyturn": "${you} can exchange (or not) your card with ${player_name2}",
	"type": "activeplayer",
	"args": "argPowerOfSpySwap",
	"possibleactions": [
		"keepCard",
		"swapCard"
	],
	"transitions": {
		"announcementResolved": 7
	}
}
					*/
					break;
				case "powerOfGuru":
					/*
					{
	"name": "powerOfGuru",
	"description": "${actplayer} must choose another player's card",
	"descriptionmyturn": "${you} must choose another player's card",
	"type": "activeplayer",
	"possibleactions": [
		"pointAtPlayer"
	],
	"transitions": {
		"playerPointedByGuru": 21,
		"zombiePass": 7
	}
}
					*/
					break;
				case "activePointedPlayer":
					/*
					{
	"name": "activePointedPlayer",
	"description": "",
	"type": "game",
	"action": "stActivePointedPlayer",
	"transitions": {
		"pointedByGuru": 22,
		"gamerGuessNbCoins": 29
	}
}
					*/
					break;
				case "powerOfGuruAnnouncement":
					/*
					{
	"name": "powerOfGuruAnnouncement",
	"description": "${actplayer} must guess their mask",
	"descriptionmyturn": "${you} must guess your mask",
	"type": "activeplayer",
	"possibleactions": [
		"announceFigure"
	],
	"transitions": {
		"announcementResolved": 7
	}
}
					*/
					break;
				case "powerOfPuppeteer":
					/*
					{
	"name": "powerOfPuppeteer",
	"description": "${actplayer} must choose two other players' card",
	"descriptionmyturn": "${you} must choose two other players' card",
	"type": "activeplayer",
	"possibleactions": [
		"swapPlayers"
	],
	"transitions": {
		"announcementResolved": 7
	}
}
					*/
					break;
				case "powerOfPrincess":
					/*
					{
	"name": "powerOfPrincess",
	"description": "${actplayer} must choose another player's card",
	"descriptionmyturn": "${you} must choose another player's card",
	"type": "activeplayer",
	"possibleactions": [
		"pointAtPlayer"
	],
	"transitions": {
		"announcementResolved": 7
	}
}
					*/
					break;
				case "powerOfGamer":
					/*
					{
	"name": "powerOfGamer",
	"description": "${actplayer} must choose how many coins to place in their hand",
	"descriptionmyturn": "${you} must choose how many coins to place in your hand",
	"type": "activeplayer",
	"possibleactions": [
		"gamerCoins",
		"pointAtPlayer"
	],
	"transitions": {
		"pointedBygamer": 21,
		"zombiePass": 7
	}
}
					*/
					break;
				case "gamerGuessNbCoins":
					/*
					{
	"name": "gamerGuessNbCoins",
	"description": "${actplayer} must guess how many coins gamer place in their hand",
	"descriptionmyturn": "${you} must guess how many coins gamer place in their hand",
	"type": "activeplayer",
	"possibleactions": [
		"gamerCoins"
	],
	"transitions": {
		"announcementResolved": 7
	}
}
					*/
					break;
				case "checkScenario":
					/*
					{
	"name": "checkScenario",
	"description": "",
	"type": "game",
	"action": "stCheckScenario",
	"transitions": {
		"predefinedScenario": 2,
		"customScenario": 51
	}
}
					*/
					break;
				case "customScenarioBuild":
					/*
					{
	"name": "customScenarioBuild",
	"description": "${actplayer} must select ${nb_masks} masks to play with",
	"descriptionmyturn": "${you} must select ${nb_masks} masks to play with and ",
	"type": "activeplayer",
	"args": "argCustomScenario",
	"possibleactions": [
		"setMaskSelectionForCustomScenario",
		"confirmCustomScenario"
	],
	"transitions": {
		"startGame": 2,
		"zombiePass": 50
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
export default mascarade;
