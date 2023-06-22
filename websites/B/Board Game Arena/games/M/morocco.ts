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

const morocco: GamePresence = {
	logo: "https://cdn.rcd.gg/PreMiD/websites/B/Board%20Game%20Arena/assets/353.png",
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
				case "SelectCube":
					data.state = "Selecting an information cube";
					break;
				case "Scout":
					data.state = "Moving the pawn and scouting stalls";
					break;
				case "AssignWorker":
					data.state = "Assigning a worker to a stall";
					break;
				case "ClosedStall":
					data.state = "Collecting rewards for closed stalls";
					break;
				case "ChooseBonus":
					data.state = "Choosing a bonus";
					break;
				case "CollectJuiceSellerTokens":
					data.state = "Collecting the Juice Seller tokens";
					break;
				case "RotateMarketTile":
					data.state = "Rotating the market tile";
					break;
				case "UseCubes":
					data.state = "Swapping cubes for gold";
					break;
				case "MoveTourist":
					data.state = "Moving tourists";
					break;
				case "DiscardCubes":
					data.state = "Discarding information cubes";
					break;
				case "gameEnd":
					data.state = "Viewing game results";
					break;
			}
		} else data.state = `Waiting for ${activePlayerData.name}`;
		return data;
	},
};
export default morocco;
