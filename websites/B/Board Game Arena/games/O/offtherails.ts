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

const offtherails: GamePresence = {
	logo: "https://cdn.rcd.gg/PreMiD/websites/B/Board%20Game%20Arena/assets/385.png",
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
				case "playerActionPhase":
					data.state = "Taking actions";
					break;
				case "playerMovementCart":
				case "playerMovementDirection":
					data.state = "Choosing which cart moves first";
					break;
				case "playerMovementJewels":
					data.state = "Choosing which jewels to pick up";
					break;
				case "playerCollisionSplit":
					data.state = "Dividing jewels from struck cart";
					break;
				case "playerCollisionHand":
					data.state = "Choosing which hand to drop";
					break;
				case "playerMissionClaim":
					data.state = "Claiming a mission card";
					break;
				case "playerChasmExpand":
					data.state = "Choosing where the mine will collapse";
					break;
				case "gameEnd":
					data.state = "Viewing game results";
					break;
			}
		} else data.state = `Waiting for ${activePlayerData.name}`;
		return data;
	},
};
export default offtherails;
