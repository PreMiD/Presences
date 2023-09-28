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

const catcafe: GamePresence = {
	logo: "https://cdn.rcd.gg/PreMiD/websites/B/Board%20Game%20Arena/assets/82.png",
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
				case "playerTurnPicking":
					data.state = "Picking a die";
					break;
				case "multiplayerDrawingPhase":
					data.state = "Drawing";
					break;
				case "playerTurnDrawingPhase1":
					data.state = "Choosing a die for location";
					break;
				case "playerTurnDrawingPhase2":
					data.state = "Choosing a location";
					break;
				case "playerTurnDrawingPhase3":
					data.state = "Choosing a shape";
					break;
				case "playerTurnCatSelection":
					data.state = "Choosing a cat";
					break;
				case "gameEnd":
					data.state = "Viewing game results";
					break;
			}
		} else data.state = `Waiting for ${activePlayerData.name}`;
		return data;
	},
};
export default catcafe;
