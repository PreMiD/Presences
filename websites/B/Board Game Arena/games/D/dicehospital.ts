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

const dicehospital: GamePresence = {
	logo: "https://cdn.rcd.gg/PreMiD/websites/B/Board%20Game%20Arena/assets/135.png",
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
				case "special2Players":
					data.state =
						"Choosing an additional department tile or specialist card";
					break;
				case "setupDiceChoice":
					data.state = "Choosing values of starting dice";
					break;
				case "administratorChoice":
					data.state = "Choosing an administrator";
					break;
				case "patientIntakePlaceDice":
					data.state = "Placing dice on ambulances";
					break;
				case "patientIntakeChooseAmbulance":
					data.state = "Choosing an ambulance";
					break;
				case "patientIntakeMortuary":
					data.state = "Choosing dice to send to the mortuary";
					break;
				case "hospitalImprovement":
					data.state = "Improving their hospital";
					break;
				case "hospitalActivation":
					data.state = "Activating a nurse or specialist";
					break;
				case "gameEnd":
					data.state = "Viewing game results";
					break;
			}
		} else data.state = `Waiting for ${activePlayerData.name}`;
		return data;
	},
};
export default dicehospital;
