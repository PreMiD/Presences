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

const spacestationphoenix: GamePresence = {
	logo: "https://cdn.rcd.gg/PreMiD/websites/B/Board%20Game%20Arena/assets/505.png",
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
				case "stateDraftShip":
					data.state = "Drafting a ship";
					break;
				case "stateDraftHub":
					data.state = "Drafting a hub";
					break;
				case "stateSetupHubShip":
					data.state = "Choosing additional starting ships";
					break;
				case "stateSetupHubConstruct":
					data.state = "Building a starting sector";
					break;
				case "stateSetupDiplomacyAdv":
					data.state = "Advancing on the diplomacy track";
					break;
				case "statePlayerTurn":
					data.state = "Taking a turn";
					break;
				case "stateDiplomacy":
					data.state = "Choosing a diplomacy reward";
					break;
				case "gameEnd":
					data.state = "Viewing game results";
					break;
			}
		} else data.state = `Waiting for ${activePlayerData.name}`;
		return data;
	},
};
export default spacestationphoenix;
