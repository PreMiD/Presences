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

const blueskies: GamePresence = {
	logo: "https://cdn.rcd.gg/PreMiD/websites/B/Board%20Game%20Arena/assets/51.png",
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
				case "startingGates":
					data.state = "Purchasing starting gates";
					break;
				case "buyGates":
					data.state = "Purchasing gates";
					break;
				case "playCards":
					data.state = "Playing cards or using actions";
					break;
				case "scoreIncome":
					data.state = "Scoring income";
					break;
				case "governmentAssistance":
					data.state = "Receiving government assistance";
					break;
				case "specialAction":
					data.state = "Choosing airports and cards to discard";
					break;
				case "governmentDiscard":
					data.state = "Discarding cards";
					break;
				case "gameEnd":
					data.state = "Viewing game results";
					break;
			}
		} else data.state = `Waiting for ${activePlayerData.name}`;
		return data;
	},
};
export default blueskies;
