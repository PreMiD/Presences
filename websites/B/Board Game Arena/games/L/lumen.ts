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

const lumen: GamePresence = {
	logo: "https://cdn.rcd.gg/PreMiD/websites/B/Board%20Game%20Arena/assets/326.png",
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
				case "askActivatePlanning":
				case "planificationChooseFaces":
					data.state = "Activating planning";
					break;
				case "chooseOperation":
					data.state = "Choosing an operation";
					break;
				case "chooseCell":
					data.state = "Choosing a cell";
					break;
				case "chooseCellLink":
					data.state = "Choosing a cell link";
					break;
				case "confirmCell":
					data.state = "Confirming a cell";
					break;
				case "chooseAction":
					data.state = "Choosing an action";
					break;
				case "chooseFighter":
				case "chooseTerritory":
					data.state = "Choosing a fighter";
					break;
				case "chooseCellInterference":
					data.state = "Choosing a cell for Interference";
					break;
				case "gameEnd":
					data.state = "Viewing game results";
					break;
			}
		} else data.state = `Waiting for ${activePlayerData.name}`;
		return data;
	},
};
export default lumen;
