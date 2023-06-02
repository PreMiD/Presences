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

const copenhagen: GamePresence = {
	logo: "https://cdn.rcd.gg/PreMiD/websites/B/Board%20Game%20Arena/assets/117.png",
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
					data.state = "Taking a card or placing a facade tile";
					break;
				case "takeAdjacentCard":
				case "takeAdditionalCard":
					data.state = "Taking another card";
					break;
				case "discardDownToMaxHandSize":
					data.state = "Discarding a card";
					break;
				case "coatOfArms":
					data.state = "Doing special abilities or actions";
					break;
				case "takeCardsLastCall":
					data.state = "Using special ability tiles";
					break;
				case "placePolyominoAfterTakingCards":
					data.state = "Placing a facade tile";
					break;
				case "gameEnd":
					data.state = "Viewing game results";
					break;
			}
		} else data.state = `Waiting for ${activePlayerData.name}`;
		return data;
	},
};
export default copenhagen;
