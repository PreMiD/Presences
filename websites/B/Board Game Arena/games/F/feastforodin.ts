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

const feastforodin: GamePresence = {
	logo: "https://i.imgur.com/0OtCsRN.png",
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
				case "pickAction":
				case "confirmTurn":
					data.state = "Taking an action";
					break;
				case "income-placegoods":
				case "bonus-placegoods":
				case "gameEnd-placegoods":
					data.state = "Placing goods";
					break;
				case "feast-placegoods":
					data.state = "Placing goods on their feast board";
					break;
				case "command-playOccupation":
					data.state = "Playing an occupation";
					break;
				case "command-exchange":
					data.state = "Making an exchange";
					break;
				case "command-forge":
					data.state = "Taking a special tile from the forge";
					break;
				case "command-forgebuy":
					data.state = "Buying a special tile from the forge";
					break;
				case "command-mountain":
					data.state = "Taking resources from a mountain strip";
					break;
				case "command-trade":
					data.state = "Upgrading green goods";
					break;
				case "command-upgrade":
					data.state = "Upgrading goods";
					break;
				case "command-hunt":
					data.state = "Hunting";
					break;
				case "command-hunt-reward":
					data.state = "Picking a hunting reward";
					break;
				case "command-emigrate":
					data.state = "Emigrating";
					break;
				case "command-swapwhalingboatknarr":
					data.state = "Swapping a whaling boat for a knarr";
					break;
				case "command-clone":
					data.state = "Copying an action";
					break;
				case "command-personalfeast":
					data.state = "Placing goods on their feast board";
					break;
				case "command-storeman":
					data.state = "Taking a good";
					break;
				case "command-meatupgrade":
					data.state = "Upgrading a meat good";
					break;
				case "command-inspector":
				case "command-inspector2":
					data.state = "Returning a viking to the Thing space";
					break;
				case "command-hornturner":
				case "command-hornturner2":
				case "command-wharfowner":
				case "command-fineblacksmith":
				case "command-shipbuilder":
				case "command-dragonslayer":
				case "command-privatechef":
				case "command-cowherd":
				case "command-bonecollector":
				case "command-breeder":
				case "command-shepherdboy":
				case "command-metalsmith":
				case "command-hidebuyer":
				case "command-preacher":
				case "command-hornblower":
				case "command-spicemerchant":
				case "command-meatmerchant":
				case "command-sower":
				case "command-flaxbaker":
				case "command-silkstitcher":
				case "command-laborer":
				case "command-meatcurer":
				case "command-deerstalker":
				case "command-spicetrader":
				case "command-sponsor":
				case "command-hornblower2":
				case "command-slowpoke":
				case "command-bosporustraveller":
					data.state = "Making an exchange";
					break;
				case "command-fieldfarmer":
					data.state = "Upgrading an orange good";
					break;
				case "command-earl":
					data.state = "Buying a stonehouse";
					break;
				case "command-flip":
					data.state = "Flipping goods";
					break;
				case "command-sameupgrade":
					data.state = "Upgrading goods";
					break;
				case "command-quartermaster":
				case "command-longshipbuilder":
					data.state = "Buying a longship";
					break;
				case "command-harborguard":
					data.state = "Picking a boat to emigrate";
					break;
				case "command-disheartenedwarrior":
				case "command-lancebearer":
					data.state = "Taking a good";
					break;
				case "command-ironsmith":
				case "command-snarespecialist":
					data.state = "Returning a viking to the Thing space";
					break;
				case "command-emigratepassable":
					data.state = "Picking a boat to emigrate";
					break;
				case "command-payupgrade":
					data.state = "Upgrading goods";
					break;
				case "command-armedfighter":
					data.state = "Taking resources from a mountain strip";
					break;
				case "command-beforeorafter-draw":
					data.state = "Choosing when to draw an occupation";
					break;
				case "command-beforeorafter-play":
					data.state = "Choosing when to play an occupation";
					break;
				case "command-prehunt":
					data.state = "Hunting";
					break;
				case "command-peacemaker":
					data.state = "Taking a resource";
					break;
				case "command-hunt-reward2":
					data.state = "Picking a hunting reward";
					break;
				case "command-swordfighter":
				case "command-berserker":
					data.state = "Removing an ore for a boost";
					break;
				case "command-follower":
					data.state = "Copying an action";
					break;
				case "command-clerk":
					data.state = "Taking an action";
					break;
				case "command-nwupgrade":
					data.state = "Upgrading goods";
					break;
				case "command-latecomer":
					data.state = "Using Latecomer";
					break;
				case "command-preceptor":
					data.state = "Choosing to draw or play an occupation";
					break;
				case "command-oreboatman":
					data.state = "Placing ore on their boards";
					break;
				case "command-fishcook":
					data.state = "Placing stockfish on their houses";
					break;
				case "command-soberman":
					data.state = "Gaining silver";
					break;
				case "command-explore":
					data.state = "Exploring an island";
					break;
				case "gameEnd":
					data.state = "Viewing game results";
					break;
			}
		} else data.state = `Waiting for ${activePlayerData.name}`;
		return data;
	},
};
export default feastforodin;
