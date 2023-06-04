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

const rallymangt: GamePresence = {
	logo: "https://cdn.rcd.gg/PreMiD/websites/B/Board%20Game%20Arena/assets/435.png",
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
				case "diceSelection":
					data.state = "Setting trajectory";
					break;
				case "diceRoll":
					data.state = "Rolling dice";
					break;
				case "pitStop":
					data.state = "Making a pit stop";
					break;
				case "tireChoose":
					data.state = "Choosing tires";
					break;
				case "flatout":
					data.state = "Setting back dice due to loss of control";
					break;
				case "lossSide":
					data.state = "Choosing which side to spin off";
					break;
				case "flystartOrBoostFlatout":
				case "flystartOrBoost":
					data.state = "Choosing between flying start or boost dice";
					break;
				case "manualStart":
					data.state = "Choosing starting position";
					break;
				case "gameEnd":
					data.state = "Viewing game results";
					break;
			}
		} else data.state = `Waiting for ${activePlayerData.name}`;
		return data;
	},
};
export default rallymangt;
