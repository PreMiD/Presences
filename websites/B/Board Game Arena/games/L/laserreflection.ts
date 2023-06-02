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

const laserreflection: GamePresence = {
	logo: "https://cdn.rcd.gg/PreMiD/websites/B/Board%20Game%20Arena/assets/301.png",
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
				case "puzzleCreationInit":
				case "puzzleCreation":
				case "puzzleCreationEnd":
					data.state = "Creating a puzzle";
					break;
				case "puzzlePlayInit":
				case "puzzlePlay":
					data.state = "Solving a puzzle";
					break;
				case "createFromSeed":
					data.state = "Creating a puzzle from a seed";
					break;
				case "teamSelectionInit":
				case "teamSelection":
					data.state = "Selecting a team";
					break;
				case "design":
					data.state = "Sharing a puzzle";
					break;
				case "gameEnd":
					data.state = "Viewing game results";
					break;
			}
		} else data.state = `Waiting for ${activePlayerData.name}`;
		return data;
	},
};
export default laserreflection;
