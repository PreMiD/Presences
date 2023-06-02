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

const hoola: GamePresence = {
	logo: "https://cdn.rcd.gg/PreMiD/websites/B/Board%20Game%20Arena/assets/249.png",
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
				case "claimDrawStop":
					data.state = "Taking an action";
					break;
				case "interceptTurn":
					data.state = "Playing a meld using the claimed discard";
					break;
				case "playerTurn":
					data.state = "Playing a meld or adding cards";
					break;
				case "jokerReplaceSelect":
					data.state = "Substituting a card";
					break;
				case "addSelect":
					data.state = "Adding cards to a location";
					break;
				case "gameEnd":
					data.state = "Viewing game results";
					break;
			}
		} else data.state = `Waiting for ${activePlayerData.name}`;
		return data;
	},
};
export default hoola;
