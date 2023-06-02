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

const diablo: GamePresence = {
	logo: "https://cdn.rcd.gg/PreMiD/websites/B/Board%20Game%20Arena/assets/130.png",
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
				case "selectOriginFirstTurn":
					data.state = "Moving a checker";
					break;
				case "selectDestinationFirstTurn":
					data.state = "Selecting initial destination";
					break;
				case "selectOriginMoveA":
					data.state = "Selecting a stack for move A";
					break;
				case "selectDestinationMoveA":
					data.state = "Selecting a destination for move A";
					break;
				case "selectOriginMoveB":
					data.state = "Selecting a stack for move B";
					break;
				case "selectDestinationMoveB":
					data.state = "Selecting a destination for move B";
					break;
				case "removeCheckerMoveA":
					data.state = "Removing a checker (move A)";
					break;
				case "removeCheckerMoveB":
					data.state = "Removing a checker (move B)";
					break;
				case "gameEnd":
					data.state = "Viewing game results";
					break;
			}
		} else data.state = `Waiting for ${activePlayerData.name}`;
		return data;
	},
};
export default diablo;
