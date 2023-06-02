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

const ladyschoice: GamePresence = {
	logo: "https://cdn.rcd.gg/PreMiD/websites/B/Board%20Game%20Arena/assets/297.png",
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
				case "firstCourt2p":
				case "secondCourt2p":
					data.state = "Courting a gentleman";
					break;
				case "turnStart":
				case "ladyTurn":
					data.state = "Choosing a gentleman to court or marry";
					break;
				case "gentTurn":
					data.state = "Boasting or changing an attribute card";
					break;
				case "ladyTurnClockExpired":
				case "ladyTurnFinalMarry":
					data.state = "Marrying a gentleman immediately";
					break;
				case "ladyTurnFinalCourt":
					data.state = "Courting a gentleman before deciding which to marry";
					break;
				case "gameEnd":
					data.state = "Viewing game results";
					break;
			}
		} else data.state = `Waiting for ${activePlayerData.name}`;
		return data;
	},
};
export default ladyschoice;
