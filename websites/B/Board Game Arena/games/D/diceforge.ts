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

const diceforge: GamePresence = {
	logo: "https://i.imgur.com/tbA2lFZ.png",
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
				case "beginPlayerTurn":
					data.state = "Rolling the dice";
					break;
				case "ressourceChoice":
				case "doeRessourceChoice":
				case "exploitRessource":
				case "misfortuneChoice":
					data.state = "Choosing resources for their side";
					break;
				case "reinforcement":
					data.state = "Activating reinforcement cards";
					break;
				case "playerAction":
					data.state = "Choosing an action";
					break;
				case "secondAction":
					data.state = "Taking another action";
					break;
				case "playerOustingChoice":
					data.state = "Choosing resources due to ousting";
					break;
				case "exploitEffect":
					data.state = "Playing exploit effects";
					break;
				case "forgeShip":
				case "doeForgeShip":
				case "oustedForgeShip":
				case "exploitForgeShip":
					data.state = "Forging a side";
					break;
				case "exploitForgeBoar":
					data.state = "Forging a boar side";
					break;
				case "draft":
					data.state = "Choosing a card";
					break;
				case "gameEnd":
					data.state = "Viewing game results";
					break;
			}
		} else data.state = `Waiting for ${activePlayerData.name}`;
		return data;
	},
};
export default diceforge;
