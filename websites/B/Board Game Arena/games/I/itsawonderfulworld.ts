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

const itsawonderfulworld: GamePresence = {
	logo: "https://cdn.rcd.gg/PreMiD/websites/B/Board%20Game%20Arena/assets/266.png",
	async getData(presence: Presence) {
		const gameState = await getCurrentGameState(presence),
			gameStateType = await getCurrentGameStateType(presence),
			activePlayer = await getActivePlayerId(presence),
			userPlayer = await getUserPlayerId(presence),
			activePlayerData = await getPlayerData(presence, activePlayer),
			data: PresenceData = {
				smallImageKey: getPlayerAvatar(userPlayer),
				smallImageText: `Score: ${getPlayerScore(userPlayer)}`,
			};
		if (activePlayer === userPlayer || gameStateType !== "activeplayer") {
			switch (gameState) {
				case "stateDraft":
					data.state = "Drafting a card";
					break;
				case "statePlanning":
					data.state = "Using cards";
					break;
				case "statePlanDiscard":
					data.state = "Choosing a card to keep";
					break;
				case "stateProductionBonus":
					data.state = "Choosing a supremacy bonus";
					break;
				case "stateProduction":
					data.state = "Placing a production cube";
					break;
				case "gameEnd":
					data.state = "Viewing game results";
					break;
			}
		} else data.state = `Waiting for ${activePlayerData.name}`;
		return data;
	},
};
export default itsawonderfulworld;
