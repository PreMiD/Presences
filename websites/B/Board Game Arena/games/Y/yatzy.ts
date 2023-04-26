import { GamePresence } from "..";
import {
	getActivePlayerId,
	getCurrentGameState,
	getPlayerData,
	getUserPlayerId,
} from "../../util";

const yatzy: GamePresence = {
	logo: "https://i.imgur.com/cOG3G3P.png",
	async getData(presence: Presence) {
		const gameState = await getCurrentGameState(presence),
			activePlayer = await getActivePlayerId(presence),
			userPlayer = await getUserPlayerId(presence),
			activePlayerData = await getPlayerData(presence, activePlayer),
			data: PresenceData = {
				smallImageKey: document.querySelector<HTMLImageElement>(
					`avatar_${userPlayer}`
				).src,
				smallImageText: `Score: ${
					document.querySelector<HTMLSpanElement>(`#player_score_${userPlayer}`)
						.textContent
				}`,
			};
		if (activePlayer === userPlayer) {
			switch (gameState) {
				case "playerTurn":
					data.state = "Rolling dice";
					break;
				case "gameEnd":
					data.state = "Viewing game results";
					break;
			}
		} else data.state = `Waiting for ${activePlayerData.name}`;
		return data;
	},
};
export default yatzy;
