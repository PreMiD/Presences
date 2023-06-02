import { GamePresence } from "..";
import {
	getActivePlayerId,
	getCurrentGameState,
	getPlayerAvatar,
	getPlayerData,
	getPlayerScore,
	getUserPlayerId,
} from "../../util";

const tickettoride: GamePresence = {
	logo: "https://cdn.rcd.gg/PreMiD/websites/B/Board%20Game%20Arena/assets/561.png",
	async getData(presence: Presence) {
		const gameState = await getCurrentGameState(presence),
			activePlayer = await getActivePlayerId(presence),
			userPlayer = await getUserPlayerId(presence),
			activePlayerData = await getPlayerData(presence, activePlayer),
			data: PresenceData = {
				smallImageKey: getPlayerAvatar(userPlayer),
				smallImageText: `Score: ${getPlayerScore(userPlayer)}`,
			};
		if (activePlayer === userPlayer) {
			switch (gameState) {
				case "chooseInitialDestinations":
					data.state = "Choosing initial destinations";
					break;
				case "chooseAction":
					data.state = "Choosing an action";
					break;
				case "drawSecondCard":
					data.state = "Drawing a train card";
					break;
				case "chooseAdditionalDestinations":
					data.state = "Choosing additional destinations";
					break;
				case "gameEnd":
					data.state = "Viewing game results";
					break;
			}
		} else data.state = `Waiting for ${activePlayerData.name}`;
		return data;
	},
};
export default tickettoride;
