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

const dragonwood: GamePresence = {
	logo: "https://cdn.rcd.gg/PreMiD/websites/B/Board%20Game%20Arena/assets/155.png",
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
				case "playerTurn":
					data.state = "Taking a turn";
					break;
				case "sunnyDay":
				case "sunnyDayEnd":
					data.state = "Sunny day! Drawing cards";
					break;
				case "thunderStorm":
					data.state = "Thunderstorm! Discarding cards";
					break;
				case "windStorm":
					data.state = "Wind storm! Passing cards";
					break;
				case "quicksand":
				case "quicksandEnd":
					data.state = "Quicksand! Replacing cards";
					break;
				case "discardAdventurer":
				case "discardAdventurerMP":
					data.state = "Discarding Adventurers";
					break;
				case "gameEnd":
					data.state = "Viewing game results";
					break;
			}
		} else data.state = `Waiting for ${activePlayerData.name}`;
		return data;
	},
};
export default dragonwood;
