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

const abandonallartichokes: GamePresence = {
	logo: "https://cdn.rcd.gg/PreMiD/websites/B/Board%20Game%20Arena/assets/1.png",
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
				case "rhubarbHarvestCard":
				case "harvest":
					data.state = "Harvesting a card";
					break;
				case "playCard":
					data.state = "Playing a card";
					break;
				case "beetChooseOpponent":
				case "leekChooseOpponent":
					data.state = "Choosing an opponent";
					break;
				case "leekTakeCard":
					data.state = "Taking a card";
					break;
				case "eggplantChooseCards":
					data.state = "Choosing cards to pass on";
					break;
				case "pepperTakeCard":
					data.state = "Picking card to put on deck";
					break;
				case "peasTakeCard":
					data.state = "Picking card to keep";
					break;
				case "peasChooseOpponent":
					data.state = "Choosing an opponent to give card to";
					break;
				case "onionChooseOpponent":
					data.state = "Choosing an opponent to give onion to";
					break;
				case "cornTakeCard":
					data.state = "Picking a card";
					break;
				case "gameEnd":
					data.state = "Viewing game results";
					break;
			}
		} else data.state = `Waiting for ${activePlayerData.name}`;
		return data;
	},
};
export default abandonallartichokes;
