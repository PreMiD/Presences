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

const samarkand: GamePresence = {
	logo: "https://cdn.rcd.gg/PreMiD/websites/B/Board%20Game%20Arena/assets/465.png",
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
				case "PlacePawn":
					data.details = "Placing a pawn";
					break;
				case "MovePawn":
					data.details = "Moving a pawn";
					break;
				case "Oasis":
					data.details = "Buying goods in the Oasis";
					break;
				case "City":
					data.details = "Selling goods in the City";
					break;
				case "Nomad":
					data.details = "Giving a greeting gift";
					break;
				case "ChooseMarket":
					data.details = "Choosing a market to remove chips from";
					break;
				case "Nomad2":
					data.details = "Trading goods or moving again";
					break;
				case "MovePawnDice":
					data.details = "Moving a pawn based on the dice result";
					break;
				case "DiscardCubes":
				case "DiscardCubesDone":
					data.state = "Discarding cubes";
					break;
				case "gameEnd":
					data.state = "Viewing game results";
					break;
			}
		} else data.state = `Waiting for ${activePlayerData.name}`;
		return data;
	},
};
export default samarkand;
