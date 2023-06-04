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

const diams: GamePresence = {
	logo: "https://cdn.rcd.gg/PreMiD/websites/B/Board%20Game%20Arena/assets/131.png",
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
				case "playerDraw":
					data.state = "Drawing a card";
					break;
				case "playerHandSelection":
					data.state = "Selecting diamonds to market or secure";
					break;
				case "playerMarketSelection":
					data.state = "Selecting diamonds to get from the market";
					break;
				case "playerDiscardToMarket":
					data.state = "Discarding to the market";
					break;
				case "playerChooseCardPower":
					data.state = "Using a card power";
					break;
				case "playerCompulsorySale":
					data.state = "Choosing a diamond to sell";
					break;
				case "playerSecurExpress":
					data.state = "Choosing diamonds to secure";
					break;
				case "playerSafeDrilling":
					data.state = "Choosing a diamond quality to drill";
					break;
				case "playerSleightOfHand":
					data.state = "Stealing a diamond from the market";
					break;
				case "playerSelectCardForDriller":
					data.state = "Selecting a diamond to give from their safe";
					break;
				case "gameEnd":
					data.state = "Viewing game results";
					break;
			}
		} else data.state = `Waiting for ${activePlayerData.name}`;
		return data;
	},
};
export default diams;
