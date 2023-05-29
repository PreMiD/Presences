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

const sixtyone: GamePresence = {
	logo: "https://i.imgur.com/ms6dGdr.png",
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
				case "multiplayerPhase":
					data.state = "Taking a turn";
					break;
				case "chooseArea":
					data.state = "Choosing an area";
					break;
				case "chooseDie":
				case "chooseDieLocation":
					data.state = "Choosing a die";
					break;
				case "chooseCrossLocation":
					data.state = "Choosing a location for the joker";
					break;
				case "chooseLeaveDie":
					data.state = "Choosing a die for leaves score";
					break;
				case "gameEnd":
					data.state = "Viewing game results";
					break;
			}
		} else data.state = `Waiting for ${activePlayerData.name}`;
		return data;
	},
};
export default sixtyone;
