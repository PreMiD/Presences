// TODO
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

const celestia: GamePresence = {
	logo: "https://i.imgur.com/C6v5wys.png",
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
				case "captainRoll":
					data.state = "Rolling";
					break;
				case "playerDecision":
					data.state = "Making a decision (stay or disembark)";
					break;
				case "ejectionCard":
					data.state = "Playing an ejection card";
					break;
				case "captainAnnouncement":
					data.state = "Making an announcement";
					break;
				case "powerCards":
				case "playPowerCards":
					data.state = "Playing a power card";
					break;
				case "alternativeRoute":
					data.state = "Rerolling dice";
					break;
				case "equipmentCards":
					data.state = "Playing equipment cards";
					break;
				case "airshipCrash":
					data.state = "The airship crashed";
					break;
				case "loneCaptain":
					data.state = "Making a decision (continue alone or not)";
					break;
				case "gameEnd":
					data.state = "Viewing game results";
					break;
			}
		} else data.state = `Waiting for ${activePlayerData.name}`;
		return data;
	},
};
export default celestia;
