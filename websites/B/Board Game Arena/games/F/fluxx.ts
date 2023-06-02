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

const fluxx: GamePresence = {
	logo: "https://cdn.rcd.gg/PreMiD/websites/B/Board%20Game%20Arena/assets/189.png",
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
				case "playCard":
					data.state = "Playing a card";
					break;
				case "enforceHandLimitForOthers":
				case "enforceHandLimitForSelf":
					data.state = "Discarding cards";
					break;
				case "enforceKeepersLimitForOthers":
				case "enforceKeepersLimitForSelf":
					data.state = "Discarding keepers";
					break;
				case "goalCleaning":
					data.state = "Discarding a goal";
					break;
				case "actionResolve":
					data.state = "Resolving an action";
					break;
				case "playRockPaperScissors":
					data.state = "Playing Rock-Paper-Scissors";
					break;
				case "freeRuleResolve":
					data.state = "Resolving a free rule";
					break;
				case "creeperResolveTurnStart":
				case "creeperResolveInPlay":
					data.state = "Resolving a creeper";
					break;
				case "tempHandPlay":
					data.state = "Playing a card from your hand";
					break;
				case "gameEnd":
					data.state = "Viewing game results";
					break;
			}
		} else data.state = `Waiting for ${activePlayerData.name}`;
		return data;
	},
};
export default fluxx;
