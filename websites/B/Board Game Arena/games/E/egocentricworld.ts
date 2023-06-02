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

const egocentricworld: GamePresence = {
	logo: "https://cdn.rcd.gg/PreMiD/websites/B/Board%20Game%20Arena/assets/162.png",
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
				case "playerTurn":
					data.state = "Taking an action";
					break;
				case "drawCard":
				case "pickCard":
					data.state = "Playing a card";
					break;
				case "exchangeCards":
				case "firstPlayerAnswerExchange":
				case "secondPlayerAnswerExchange":
				case "exchangeCardsOnePlayer":
				case "exchangeCardsFirstPlayer":
				case "exchangeCardsSecondPlayer":
					data.state = "Exchanging cards";
					break;
				case "seeCards":
				case "playerSee":
					data.state = "Looking at another player's cards";
					break;
				case "playerAnswer":
					data.state = "Validating or cancelling an effect";
					break;
				case "gameEnd":
					data.state = "Viewing game results";
					break;
			}
		} else data.state = `Waiting for ${activePlayerData.name}`;
		return data;
	},
};
export default egocentricworld;
