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

const lox: GamePresence = {
	logo: "https://cdn.rcd.gg/PreMiD/websites/B/Board%20Game%20Arena/assets/324.png",
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
				case "programming":
					data.state = "Programming secret orders";
					break;
				case "resolution":
					data.state = "Executing programmed orders";
					break;
				case "initialPlacement":
					data.state = "Placing initial Idrakys";
					break;
				case "chooseTitan":
					data.state = "Choosing a Raging Titan to eliminate";
					break;
				case "chooseTitanSquad":
					data.state = "Fighting the Raging Titan";
					break;
				case "chooseReward":
					data.state = "Choosing a reward";
					break;
				case "assignReputation":
					data.state = "Assigning Bard tokens";
					break;
				case "dummyPlayer":
					data.state = "Moving the Dummy Player";
					break;
				case "census":
					data.state = "Grabbing for the Census";
					break;
				case "assignStories":
					data.state = "Placing Sorcerers' Guild stories";
					break;
				case "gameEnd":
					data.state = "Viewing game results";
					break;
			}
		} else data.state = `Waiting for ${activePlayerData.name}`;
		return data;
	},
};
export default lox;
