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

const tashkalar: GamePresence = {
	logo: "https://cdn.rcd.gg/PreMiD/websites/B/Board%20Game%20Arena/assets/537.png",
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
				case "deckChoice":
					data.state = "Choosing a school";
					break;
				case "initialPiecesDuel":
				case "initialPiecesMelee":
					data.state = "Placing initial pieces";
					break;
				case "actionChoice":
					data.state = "Taking an action";
					break;
				case "pickPiece":
					data.state = "Picking up a piece";
					break;
				case "chooseColorFlare":
					data.state = "Choosing a color for a flare";
					break;
				case "chooseColorImpro":
					data.state = "Choosing a color for improvised summoning";
					break;
				case "chooseColorLegend":
					data.state = "Choosing a color to score the legend in";
					break;
				case "cardChoice":
					data.state = "Choosing a card";
					break;
				case "squareChoice":
					data.state = "Choosing a square";
					break;
				case "moveChoice":
				case "pieceChoice":
				case "directionChoice":
					data.state = "Moving a piece";
					break;
				case "orEffects2":
				case "orEffects3":
					data.state = "Choosing an effect";
					break;
				case "chooseOption":
					data.state = "Choosing an option";
					break;
				case "frozenChoice":
					data.state = "Choosing a frozen effect";
					break;
				case "turnEndHF":
					data.state = "Invoking a flare or claiming a task";
					break;
				case "turnEndDM":
					data.state = "Invoking a flare";
					break;
				case "chooseColor":
					data.state = "Choosing a color to score the unpaired pieces in";
					break;
				case "gameEnd":
					data.state = "Viewing game results";
					break;
			}
		} else data.state = `Waiting for ${activePlayerData.name}`;
		return data;
	},
};
export default tashkalar;
