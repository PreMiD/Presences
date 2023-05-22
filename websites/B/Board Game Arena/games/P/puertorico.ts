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

const puertorico: GamePresence = {
	logo: "https://i.imgur.com/7xAWMVC.png",
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
				case "playerRoleSelection":
					data.state = "Selecting a role";
					break;
				case "playerCaptainShipSelection":
					data.state = "Selecting a cargo ship";
					break;
				case "playerCaptainGoodSelection":
					data.state = "Selecting a good to ship";
					break;
				case "playerTraderGoodSelection":
					data.state = "Selecting a good to trade";
					break;
				case "playerSettlerPlantationSelection":
					data.state = "Selecting a plantation";
					break;
				case "playerCraftsmanPrivilege":
					data.state = "Selecting a good to produce";
					break;
				case "playerBuilderBuildingSelection":
					data.state = "Selecting a building to build";
					break;
				case "multiplayerPlaceColonists":
					data.state = "Placing colonists";
					break;
				case "multiplayerGuesthouseBeforeEndOfGame":
				case "playerGuesthouseBeforeCaptainShipSelection":
				case "multiplayerGuesthouseBeforeCraftsman":
				case "playerGuesthouseBeforeProspector":
				case "playerGuesthouseBeforeTrader":
				case "playerGuesthouseBeforeCaptainRoyalSupplier":
					data.state = "Moving colonists from guesthouse";
					break;
				case "playerCaptainRoyalSupplier":
					data.state = "Trading goods for VPs";
					break;
				case "playerCaptainSmallWharf":
					data.state = "Selecting goods to ship";
					break;
				case "multiplayerStoreGoods":
				case "multiplayerStoreTypeOfGoods":
					data.state = "Storing goods";
					break;
				case "multiplayerStoreOneGood":
					data.state = "Storing a good";
					break;
				case "playerTraderLocationSelection":
					data.state = "Selecting a trading location";
					break;
				case "playerTraderBuyPlantation":
					data.state = "Buying a plantation";
					break;
				case "playerTraderSellPlantation":
					data.state = "Selling a plantation";
					break;
				case "playerSettlerHacienda":
					data.state = "Selecting a plantation from the deck";
					break;
				case "playerSettlerHospice":
					data.state = "Selecting a colonist from the supply or ship";
					break;
				case "playerSettlerPlantationSelectionToDiscard":
					data.state = "Selecting a plantation to discard";
					break;
				case "playerSettlerHuntingLodge":
					data.state = "Discarding a plantation";
					break;
				case "playerBuilderUniversity":
					data.state = "Selecting a colonist from the supply or ship";
					break;
				case "playerBuilderBlackMarket":
					data.state = "Selecting a building to build";
					break;
				case "playerMayorPrivilege":
					data.state = "Selecting a colonist from the supply";
					break;
				case "playerMayorVilla":
					data.state = "Selecting a noble from the supply";
					break;
				case "playerDraftBuilding":
					data.state = "Drafting a building";
					break;
				case "gameEnd":
					data.state = "Viewing game results";
					break;
			}
		} else data.state = `Waiting for ${activePlayerData.name}`;
		return data;
	},
};
export default puertorico;
