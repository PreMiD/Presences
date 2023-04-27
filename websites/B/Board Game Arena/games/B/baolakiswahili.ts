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

const baolakiswahili: GamePresence = {
	logo: "https://i.imgur.com/3d7hBKi.png",
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
				case "gameEdit":
					data.state = "Editing board for both players";
					break;
				case "kunamuaMoveSelection":
					data.state = "Placing seed and making move";
					break;
				case "kunamuaMoveExecution":
					data.state = "Executing move";
					break;
				case "kunamuaCaptureSelection":
					data.state = "Selecting kichwa";
					break;
				case "safariDecision":
					data.state = "Deciding about safari";
					break;
				case "mtajiMoveSelection":
					data.state = "Making mtaji move";
					break;
				case "mtajiMoveExecution":
					data.state = "Executing mtaji move";
					break;
				case "mtajiCaptureSelection":
					data.state = "Selecting kichwa";
					break;
				case "husMoveSelection":
					data.state = "Making a move";
					break;
				case "gameEnd":
					data.state = "Viewing game results";
					break;
			}
		} else data.state = `Waiting for ${activePlayerData.name}`;
		return data;
	},
};
export default baolakiswahili;
