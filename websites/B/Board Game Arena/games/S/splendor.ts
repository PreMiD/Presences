import { GamePresence } from "..";
import {
	getActivePlayerId,
	getCurrentGameState,
	getPlayerAvatar,
	getPlayerData,
	getPlayerScore,
	getUserPlayerId,
} from "../../util";

const splendor: GamePresence = {
	logo: "https://cdn.rcd.gg/PreMiD/websites/B/Board%20Game%20Arena/assets/511.png",
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
				case "playerTurn":
					data.state = "Choosing an action";
					break;
				case "playerDiscard":
					data.state = "Discarding excess gems";
					break;
				case "playerPass":
					data.state = "Passing";
					break;
				case "chooseCard":
					data.state = "Choosing a noble";
					break;
				case "gameEnd":
					data.state = "Viewing game results";
					break;
			}
		} else data.state = `Waiting for ${activePlayerData.name}`;
		return data;
	},
};
export default splendor;
