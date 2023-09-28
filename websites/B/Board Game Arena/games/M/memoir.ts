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

const memoir: GamePresence = {
	logo: "https://cdn.rcd.gg/PreMiD/websites/B/Board%20Game%20Arena/assets/343.png",
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
				case "uploadScenario":
					data.state = "Uploading a scenario";
					break;
				case "commissarCard":
					data.state = "Placing a card under the commissar token";
					break;
				case "playCommissarCard":
					data.state = "Playing a commissar card";
					break;
				case "playCard":
					data.state = "Playing a card";
					break;
				case "orderUnits":
					data.state = "Ordering units";
					break;
				case "moveUnits":
					data.state = "Moving units";
					break;
				case "attackUnit":
				case "attackUnits":
					data.state = "Attacking units";
					break;
				case "opponentAmbush":
					data.state = "Reacting to an ambush";
					break;
				case "attackRetreat":
					data.state = "Retreating";
					break;
				case "takeGround":
					data.state = "Taking the ground";
					break;
				case "armorOverrun":
					data.state = "Overrunning an armor unit";
					break;
				case "drawChoice":
					data.state = "Choosing a card to discard";
					break;
				case "desertMove":
					data.state = "Moving an additional hex (Desert rules)";
					break;
				case "battleBack":
					data.state = "Battling back";
					break;
				case "orderUnitsFinestHour":
					data.state = "Ordering units (Finest Hour)";
					break;
				case "targetAirPower":
					data.state = "Targeting units (Air Power)";
					break;
				case "targetBarrage":
					data.state = "Targeting units (Barrage)";
					break;
				case "targetMedics":
					data.state = "Healing units";
					break;
				case "selectUnits":
					data.state = "Selecting units";
					break;
				case "airDrop":
					data.state = "Air dropping units";
					break;
				case "confirmTurn":
					data.state = "Confirming turn";
					break;
				case "gameEnd":
					data.state = "Viewing game results";
					break;
			}
		} else data.state = `Waiting for ${activePlayerData.name}`;
		return data;
	},
};
export default memoir;
