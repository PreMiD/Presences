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

const factum: GamePresence = {
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
		"": 5
	}
}
					*/
					break;
				case "checkWhoGoesFirst":
					/*
					{
	"name": "checkWhoGoesFirst",
	"description": "",
	"type": "game",
	"action": "st_checkWhoGoesFirst",
	"transitions": {
		"pickStoryTeller": 6
	}
}
					*/
					break;
				case "pickStoryTeller":
					/*
					{
	"name": "pickStoryTeller",
	"description": "Players will take turns telling stories.<br />Someone else must choose to tell the next story",
	"descriptionmyturn": "Players will take turns telling stories.<br />Look at your cards and remember some story from your life that you can associate with a card.<br />If you are ready…",
	"type": "multipleactiveplayer",
	"possibleactions": [
		"b_tellStory",
		"b_noStory"
	],
	"transitions": {
		"": 8
	}
}
					*/
					break;
				case "startStory":
					/*
					{
	"name": "startStory",
	"description": "${actplayer} is telling a Story",
	"descriptionmyturn": "Please choose one of your cards to tell a story with",
	"type": "activeplayer",
	"possibleactions": [
		"chooseStoryCard"
	],
	"transitions": {
		"chooseStoryCard": 10
	}
}
					*/
					break;
				case "tellStory":
					/*
					{
	"name": "tellStory",
	"description": "${actplayer} is telling a Story",
	"descriptionmyturn": "Tell your story",
	"type": "activeplayer",
	"possibleactions": [
		"chooseStoryCard",
		"b_doneTellingStory"
	],
	"transitions": {
		"chooseStoryCard": 10,
		"b_doneTellingStory": 18
	}
}
					*/
					break;
				case "setupJudging":
					/*
					{
	"name": "setupJudging",
	"description": "",
	"type": "game",
	"action": "st_setupJudging",
	"transitions": {
		"": 20
	}
}
					*/
					break;
				case "chooseGuesser":
					/*
					{
	"name": "chooseGuesser",
	"description": "Judge ${actplayer} is choosing which team should guess the story",
	"descriptionmyturn": "You are the judge. Please choose which team should guess the story",
	"type": "activeplayer",
	"possibleactions": [
		"b_letMyTeamGuess",
		"b_leaveToThem"
	],
	"transitions": {
		"": 25
	}
}
					*/
					break;
				case "addCards":
					/*
					{
	"name": "addCards",
	"description": "Other players are adding cards",
	"descriptionmyturn": "Please choose one of your cards to match the story told<br />While other players are adding cards, you may change your card selection",
	"type": "multipleactiveplayer",
	"args": "argChosenCard",
	"possibleactions": [
		"chooseMatchingCard",
		"b_confirmCard"
	],
	"transitions": {
		"oneguesser": 30,
		"multipleguessers": 40,
		"chooseMatchingCard": 25
	}
}
					*/
					break;
				case "guessing":
					/*
					{
	"name": "guessing",
	"description": "The guesser is choosing the card that they think is the Story Card",
	"descriptionmyturn": "Choose the card that you think is the Story Card",
	"type": "multipleactiveplayer",
	"possibleactions": [
		"guessCard"
	],
	"transitions": {
		"guessCard1p": 35,
		"zombieGuess": 50
	}
}
					*/
					break;
				case "confirmGuessing":
					/*
					{
	"name": "confirmGuessing",
	"description": "A card has been selected",
	"descriptionmyturn": "A card has been selected",
	"type": "multipleactiveplayer",
	"args": "argGuessConfirm",
	"possibleactions": [
		"guessCard",
		"b_confirmGuess"
	],
	"transitions": {
		"guessCard1p": 35,
		"confirmLastGuess": 50
	}
}
					*/
					break;
				case "guessingMultiple":
					/*
					{
	"name": "guessingMultiple",
	"description": "The guessers are choosing the card that they think is the Story Card",
	"descriptionmyturn": "Choose the card that you think is the Story Card",
	"type": "multipleactiveplayer",
	"possibleactions": [
		"guessCard"
	],
	"transitions": {
		"guessCardmulti": 45,
		"guessCard1p": 35,
		"zombieGuess": 50
	}
}
					*/
					break;
				case "confirmGuessingMultiple":
					/*
					{
	"name": "confirmGuessingMultiple",
	"description": "A card has been chosen.  Do the guessers agree?",
	"descriptionmyturn": "A card has been chosen.  Do you agree with the other guessers?",
	"type": "multipleactiveplayer",
	"args": "argGuessConfirm",
	"possibleactions": [
		"guessCard",
		"b_confirmGuess"
	],
	"transitions": {
		"guessCardmulti": 45,
		"guessCard1p": 35,
		"b_confirmGuess": 45,
		"confirmLastGuess": 50
	}
}
					*/
					break;
				case "scoring":
					/*
					{
	"name": "scoring",
	"description": "Turn Results",
	"descriptionmyturn": "Turn Results",
	"args": "argScoring",
	"type": "multipleactiveplayer",
	"possibleactions": [
		"b_scoreContinue"
	],
	"transitions": {
		"storyMaster": 60,
		"endTurn": 70
	}
}
					*/
					break;
				case "storyMaster":
					/*
					{
	"name": "storyMaster",
	"description": "The other players are choosing the Best Story",
	"descriptionmyturn": "Choose which is the Best Story",
	"args": "argChosenCard",
	"type": "multipleactiveplayer",
	"possibleactions": [
		"chooseBestStory",
		"b_confirmBest"
	],
	"transitions": {
		"lastVote": 61,
		"chooseBestStory": 60
	}
}
					*/
					break;
				case "recordStoryMasterPoints":
					/*
					{
	"name": "recordStoryMasterPoints",
	"description": "",
	"type": "game",
	"action": "st_recordStoryMasterPoints",
	"transitions": {
		"": 65
	}
}
					*/
					break;
				case "storyMasterScoring":
					/*
					{
	"name": "storyMasterScoring",
	"description": "Best Story",
	"descriptionmyturn": "Best Story",
	"args": "argStoryMasterScoring",
	"type": "multipleactiveplayer",
	"possibleactions": [
		"b_storyMasterScoringContinue"
	],
	"transitions": {
		"": 70
	}
}
					*/
					break;
				case "endTurn":
					/*
					{
	"name": "endTurn",
	"description": "",
	"type": "game",
	"action": "st_endTurn",
	"transitions": {
		"endGame": 99,
		"advanceTurn": 5
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
export default factum;
