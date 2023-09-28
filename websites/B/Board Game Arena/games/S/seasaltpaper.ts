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

const seasaltpaper: GamePresence = {
	logo: "https://cdn.rcd.gg/PreMiD/websites/B/Board%20Game%20Arena/assets/471.png",
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
				case "takeCards":
					data.state = "Taking cards";
					break;
				case "chooseCard":
					data.state = "Keeping a card";
					break;
				case "chooseDiscardPile":
				case "putDiscardPile":
					data.state = "Choosing a discard pile";
					break;
				case "playCards":
					data.state = "Playing cards duo";
					break;
				case "chooseDiscardCard":
					data.state = "Choosing a card to discard";
					break;
				case "chooseOpponent":
					data.state = "Stealing a card from an opponent";
					break;
				case "gameEnd":
					data.state = "Viewing game results";
					break;
			}
		} else data.state = `Waiting for ${activePlayerData.name}`;
		return data;
	},
};
export default seasaltpaper;
