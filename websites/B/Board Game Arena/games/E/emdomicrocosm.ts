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

const emdomicrocosm: GamePresence = {
	logo: "https://cdn.rcd.gg/PreMiD/websites/B/Board%20Game%20Arena/assets/167.png",
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
				case "takeCard":
					data.state = "Taking a card";
					break;
				case "chooseAction":
					data.state = "Choosing an action";
					break;
				case "boostWarfare":
					data.state = "Attacking the planet";
					break;
				case "researchAgain":
					data.state = "Researching";
					break;
				case "boostColonize":
					data.state = "Colonizing the planet";
					break;
				case "forceDiscard":
					data.state = "Forcing a discard";
					break;
				case "takeDiscard":
					data.state = "Swapping a Survey Mission for a card";
					break;
				case "gameEnd":
					data.state = "Viewing game results";
					break;
			}
		} else data.state = `Waiting for ${activePlayerData.name}`;
		return data;
	},
};
export default emdomicrocosm;
