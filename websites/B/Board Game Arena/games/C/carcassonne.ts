import { GamePresence } from "..";
import {
	getActivePlayerId,
	getCurrentGameState,
	getPlayerAvatar,
	getPlayerData,
	getPlayerScore,
	getUserPlayerId,
} from "../../util";

const carcassonne: GamePresence = {
	logo: "https://i.imgur.com/QDG9D5h.png",
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
				case "playTile":
					data.state = "Placing a tile";
					break;
				case "canPlayPartisan":
					data.state = "Placing a partisan on the tile";
					break;
				case "dragonWalkPlayerChoice":
					data.state = "Moving the dragon";
					break;
				case "scorePoints":
					data.state = "Scoring points";
					break;
				case "gameEnd":
					data.state = "Viewing game results";
					break;
			}
		} else data.state = `Waiting for ${activePlayerData.name}`;
		if (gameState === "unachievedCount") {
			data.state = "Calculating unachieved points";
		}
		return data;
	},
};
export default carcassonne;
