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

const niagara: GamePresence = {
	logo: "https://cdn.rcd.gg/PreMiD/websites/B/Board%20Game%20Arena/assets/366.png",
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
				case "choosePaddle":
					data.state = "Playing a paddle card";
					break;
				case "moveCanoe":
					data.state = "Moving a canoe";
					break;
				case "chooseCanoeAction":
					data.state = "Choosing a canoe action";
					break;
				case "canoeMaySteal":
					data.state = "Stealing a gem";
					break;
				case "chooseWeather":
					data.state = "Changing the weather";
					break;
				case "gameEnd":
					data.state = "Viewing game results";
					break;
			}
		} else data.state = `Waiting for ${activePlayerData.name}`;
		return data;
	},
};
export default niagara;
