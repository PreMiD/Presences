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

const viamagica: GamePresence = {
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
				case "chooseInitCards":
					/*
					{
	"name": "chooseInitCards",
	"type": "multipleactiveplayer",
	"description": "Others are choosing starting portal cards.",
	"descriptionmyturn": "Select 3 portal cards in your player area to keep and then press Done button.",
	"possibleactions": [
		"chooseInitCards"
	],
	"transitions": {
		"initCardsChosen": 10,
		"forceEndGame": 99,
		"zombiePass": 10
	},
	"action": "stMultiPlayerInit"
}
					*/
					break;
				case "drawToken":
					/*
					{
	"name": "drawToken",
	"type": "game",
	"action": "stDrawToken",
	"updateGameProgression": false,
	"transitions": {
		"tokenDrawn": 20
	}
}
					*/
					break;
				case "placeGem":
					/*
					{
	"name": "placeGem",
	"type": "multipleactiveplayer",
	"description": "Others are choosing crystals",
	"descriptionmyturn": "Select both a crystal and an Animus space",
	"args": "argAvailGemPlaces",
	"possibleactions": [
		"placeGem"
	],
	"updateGameProgression": false,
	"transitions": {
		"gemPlaced": 30,
		"noGemsToPlace": 10,
		"zombiePass": 30
	},
	"action": "stMultiPlayerInitFlexible"
}
					*/
					break;
				case "checkForCompCards":
					/*
					{
	"name": "checkForCompCards",
	"type": "game",
	"action": "stCheckForCompCards",
	"updateGameProgression": false,
	"transitions": {
		"compCardsDone_NoDone": 40,
		"compCardsDone_HasDone": 40
	}
}
					*/
					break;
				case "dispatchCompCards":
					/*
					{
	"name": "dispatchCompCards",
	"type": "game",
	"action": "stDispatchCompCards",
	"updateGameProgression": false,
	"transitions": {
		"resolveBonus": 51,
		"noCardsLeft": 95
	}
}
					*/
					break;
				case "completeCard":
					/*
					{
	"name": "completeCard",
	"type": "activeplayer",
	"description": "${actplayer} is resolving completed portal card",
	"descriptionmyturn": "Choose new portal card to replace your completed portal card",
	"args": "argCardInfo",
	"possibleactions": [
		"completeCard"
	],
	"updateGameProgression": true,
	"transitions": {
		"completedCard": 50,
		"zombiePass": 50
	}
}
					*/
					break;
				case "scoreAdjustRules":
					/*
					{
	"name": "scoreAdjustRules",
	"type": "game",
	"action": "stScoreAdjustRules",
	"updateGameProgression": false,
	"transitions": {
		"checkCompleteCards": 30,
		"resolvePortalCount": 52
	}
}
					*/
					break;
				case "removeGems":
					/*
					{
	"name": "removeGems",
	"type": "game",
	"action": "stRemoveGems",
	"updateGameProgression": false,
	"transitions": {
		"resolveBonus": 53
	}
}
					*/
					break;
				case "resolvePortalCount":
					/*
					{
	"name": "resolvePortalCount",
	"type": "activeplayer",
	"description": "${actplayer} decides whether to claim the ${n_card} portal card reward",
	"descriptionmyturn": "Do you want to claim the reward for opening ${n_card} portal cards",
	"args": "argPortalCount",
	"possibleactions": [
		"resolvePortalCount"
	],
	"transitions": {
		"checkCompleteCards": 30,
		"zombiePass": 53
	}
}
					*/
					break;
				case "resolveBonus":
					/*
					{
	"name": "resolveBonus",
	"type": "game",
	"action": "stResolveBonus",
	"updateGameProgression": false,
	"transitions": {
		"activatePortal": 45,
		"dispatchExPlayGem": 55,
		"chooseNewCardBonus": 60,
		"completePortalBonus": 65
	}
}
					*/
					break;
				case "dispatchExPlayGem":
					/*
					{
	"name": "dispatchExPlayGem",
	"type": "game",
	"action": "stDispatchExPlayGem",
	"updateGameProgression": false,
	"transitions": {
		"exPlayGem": 56,
		"doneDispatchExPlayGem": 45
	}
}
					*/
					break;
				case "exPlayGem":
					/*
					{
	"name": "exPlayGem",
	"type": "activeplayer",
	"description": "Portal card bonus: ${actplayer} is placing extra crystals",
	"descriptionmyturn": "Select both a crystal and an Animus space. This is crystal ${gem_count} of ${gem_strt_count} from portal card bonus.",
	"args": "argAvailGemPlacesEx",
	"possibleactions": [
		"placeGem",
		"exPlayGem"
	],
	"transitions": {
		"donePlacingGemEx": 55,
		"zombiePass": 55
	}
}
					*/
					break;
				case "chooseNewCardBonus":
					/*
					{
	"name": "chooseNewCardBonus",
	"type": "activeplayer",
	"description": "Portal card bonus: ${actplayer} is adding a portal card to their play area",
	"descriptionmyturn": "Portal card bonus: Choose new card to add to your playing area",
	"args": "argCardInfo",
	"possibleactions": [
		"chooseNewCardBonus"
	],
	"transitions": {
		"doneChoosingNewCardBonus": 45,
		"zombiePass": 45
	}
}
					*/
					break;
				case "completePortalBonus":
					/*
					{
	"name": "completePortalBonus",
	"type": "activeplayer",
	"description": "Portal card bonus: ${actplayer} is opening a bonus portal",
	"descriptionmyturn": "Portal card bonus: Choose another portal to open in your play area",
	"possibleactions": [
		"completePortalBonus"
	],
	"transitions": {
		"doneCompletePortalBonus": 45,
		"zombiePass": 45
	}
}
					*/
					break;
				case "checkEndGame":
					/*
					{
	"name": "checkEndGame",
	"type": "game",
	"action": "stCheckEndGame",
	"updateGameProgression": true,
	"transitions": {
		"endGame": 99,
		"gameNotEnded": 10
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
export default viamagica;
