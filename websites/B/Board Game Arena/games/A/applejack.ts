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

const applejack: GamePresence = {
	logo: "https://cdn.rcd.gg/PreMiD/websites/B/Board%20Game%20Arena/assets/14.png",
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
				case "STATE_PLAYER_TURN_TO_PLACE_TILE":
					data.state = "Placing a tile";
					break;
				case "STATE_APPLEJACK_MOVE":
					data.state = "Applejack is moving";
					break;
				case "STATE_HARVESTING":
					data.state = "A harvest is happening";
					break;
				case "STATE_REPLENISHMENT_TROUGHS":
					data.state = "Replenishing the troughs";
					break;
				case "STATE_BLOSSOM_SOCRING":
					data.state = "A blossom scoring is happening";
					break;
				case "STATE_PLACE_BLIND_DRAWN_TILE":
					data.state = "Placing a blind drawn tile";
					break;
				case "STATE_REFILL_SIDE_FIELD":
					data.state = "Refilling the side field";
					break;
				case "gameEnd":
					data.state = "Viewing game results";
					break;
			}
		} else data.state = `Waiting for ${activePlayerData.name}`;
		return data;
	},
};
export default applejack;
