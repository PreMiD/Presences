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

const noneshallpass: GamePresence = {
	logo: "https://cdn.rcd.gg/PreMiD/websites/B/Board%20Game%20Arena/assets/375.png",
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
				case "pickGuards":
					data.state = "Choosing their guard class";
					break;
				case "standardTurn":
				case "notifyPlayer":
					data.state = "Taking an action";
					break;
				case "doSixAction":
				case "playerSecondTurn":
					data.state = "Performing a bonus action";
					break;
				case "playerDead":
				case "playerDeadNotify":
					data.state = "Incapacitated - treating wounds";
					break;
				case "playerTriples":
				case "playerTriplesTwo":
				case "notifyPlayerTriplesTwo":
					data.state = "Performing a triple action";
					break;
				case "commanderActions":
					data.state = "Performing a commander action";
					break;
				case "choosePeril":
					data.state = "Choosing their peril";
					break;
				case "monsterTurnReady":
				case "monsterArriveReady":
					data.state = "Preparing for the monster's turn";
					break;
				case "gameEnd":
					data.state = "Viewing game results";
					break;
			}
		} else data.state = `Waiting for ${activePlayerData.name}`;
		return data;
	},
};
export default noneshallpass;
