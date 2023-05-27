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

const fleet: GamePresence = {
	logo: "https://i.imgur.com/pY4ZZv0.png",
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
				case "auction":
					data.state = "Bidding on a license";
					break;
				case "launch":
					data.state = "Launching a boat";
					break;
				case "hire":
					data.state = "Hiring a captain";
					break;
				case "processing":
					data.state = "Processing fish";
					break;
				case "draw":
					data.state = "Drawing a card";
					break;
				case "launchHire":
					data.state = "Launching a boat and/or hiring a captain";
					break;
				case "gameEnd":
					data.state = "Viewing game results";
					break;
			}
		} else data.state = `Waiting for ${activePlayerData.name}`;
		return data;
	},
};
export default fleet;
