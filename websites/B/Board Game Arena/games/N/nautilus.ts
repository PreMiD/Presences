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

const nautilus: GamePresence = {
	logo: "https://i.imgur.com/fp5ou4i.png",
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
				case "giveSpecialCardToOpponent":
					data.state = "Giving a special card";
					break;
				case "playDiverOrSpecialCard":
					data.state = "Playing a diver or special card";
					break;
				case "sendDiverCardToOppositeSide":
					data.state = "Sending a diver card to opposite side";
					break;
				case "sendDiverCardToSameSide":
					data.state = "Sending a diver card to same side";
					break;
				case "playSpecialCardAnchor":
					data.state = "Playing the anchor special card";
					break;
				case "lookDiverCardsInOpponentHand":
					data.state = "Looking at the diver cards in opponent's hand";
					break;
				case "keepExtraDiverCard":
					data.state = "Keeping an extra diver card";
					break;
				case "returnDiverCardToOpponent":
					data.state = "Returning a diver card to opponent";
					break;
				case "gameEnd":
					data.state = "Viewing game results";
					break;
			}
		} else data.state = `Waiting for ${activePlayerData.name}`;
		return data;
	},
};
export default nautilus;
