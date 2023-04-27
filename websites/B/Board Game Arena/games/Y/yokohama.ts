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

const yokohama: GamePresence = {
	logo: "",
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
				case "gameSetup":
					/*
					{
	"name": "gameSetup",
	"description": "",
	"type": "manager",
	"action": "stGameSetup",
	"transitions": {
		"": 2
	}
}
					*/
					break;
				case "initialOrder":
					/*
					{
	"name": "initialOrder",
	"description": "Waiting for other players to select an Order card",
	"descriptionmyturn": "Please select the Order card to keep",
	"type": "multipleactiveplayer",
	"transitions": {
		"done": 3
	}
}
					*/
					break;
				case "nextPhase":
					/*
					{
	"name": "nextPhase",
	"description": "Establishing next phase",
	"type": "game",
	"action": "stNextPhase",
	"transitions": {
		"additional": 4,
		"mainSetup": 5,
		"done": 6
	}
}
					*/
					break;
				case "additionalPhase":
					/*
					{
	"name": "additionalPhase",
	"description": "${actplayer} is now in additional phase",
	"descriptionmyturn": "${you} can: ",
	"args": "argAdditionalPhase",
	"type": "activeplayer",
	"transitions": {
		"useAgent": 10,
		"claimAchievement": 11,
		"completeOrder": 55,
		"mainSetup": 5,
		"done": 6,
		"more": 3,
		"selectOrder": 41,
		"selectAchievement": 42,
		"selectTile": 43
	}
}
					*/
					break;
				case "mainPhaseSetup":
					/*
					{
	"name": "mainPhaseSetup",
	"description": "Setup for main phase",
	"type": "game",
	"action": "stMainPhaseSetup",
	"transitions": {
		"assist": 20,
		"move_pres": 30,
		"place_pres": 301
	}
}
					*/
					break;
				case "nextPlayer":
					/*
					{
	"name": "nextPlayer",
	"description": "Setup for next player",
	"type": "game",
	"updateGameProgression": true,
	"action": "stNextPlayer",
	"transitions": {
		"continue": 3,
		"end": 90
	}
}
					*/
					break;
				case "useAgent":
					/*
					{
	"name": "useAgent",
	"description": "Activation by foreign agent",
	"type": "game",
	"action": "stUseAgent",
	"transitions": {
		"done": 34
	}
}
					*/
					break;
				case "claimAchievement":
					/*
					{
	"name": "claimAchievement",
	"description": "Achievement claim",
	"type": "game",
	"action": "stClaimAchievement",
	"transitions": {
		"done": 3
	}
}
					*/
					break;
				case "placeAssistantsStep":
					/*
					{
	"name": "placeAssistantsStep",
	"description": "${actplayer} is placing assistants",
	"descriptionmyturn": "${you} must select the Area(s) on which to place assistant(s):",
	"type": "activeplayer",
	"args": "argPlaceAssistantsStep",
	"transitions": {
		"add": 21,
		"pay": 22,
		"go": 23,
		"move_pres": 30,
		"place_pres": 301,
		"selectTile": 43
	}
}
					*/
					break;
				case "placeAdjacentAssistant":
					/*
					{
	"name": "placeAdjacentAssistant",
	"description": "${actplayer} is deciding if placing an additional assistant",
	"descriptionmyturn": "<B>Telegram</B>: ${you} may place 1 assistant adjacent to the [${tile_name}]",
	"type": "activeplayer",
	"args": "argPlaceAdjacentAssistant",
	"transitions": {
		"pay": 22,
		"go": 23
	}
}
					*/
					break;
				case "payForAssistant":
					/*
					{
	"name": "payForAssistant",
	"description": "${actplayer} is deciding if paying for presence of other presidents",
	"descriptionmyturn": "${you} must pay a total of ${yens} yen(s) to [${player_names}] to place your assistant(s)",
	"type": "activeplayer",
	"args": "argPayForAssistant",
	"transitions": {
		"yes": 23,
		"no": 20
	}
}
					*/
					break;
				case "confirmAssistants":
					/*
					{
	"name": "confirmAssistants",
	"description": "Assistant placement",
	"type": "game",
	"action": "stConfirmAssistants",
	"transitions": {
		"move_pres": 30,
		"place_pres": 301
	}
}
					*/
					break;
				case "movePresidentStep":
					/*
					{
	"name": "movePresidentStep",
	"description": "${actplayer} is moving his president",
	"descriptionmyturn": "Move President: ${you} must select the target Area or all tiles leading to the target Area",
	"type": "activeplayer",
	"transitions": {
		"return": 31,
		"pay": 32,
		"done": 33
	}
}
					*/
					break;
				case "removeAssistants":
					/*
					{
	"name": "removeAssistants",
	"description": "${actplayer} must decide if removing assistants from the board",
	"descriptionmyturn": "${you} may select the Area(s) from which to take assitant(s) back in hand",
	"type": "activeplayer",
	"transitions": {
		"done": 3
	}
}
					*/
					break;
				case "payForPresident":
					/*
					{
	"name": "payForPresident",
	"description": "${actplayer} is deciding if paying for moving president pass other presidents/canal",
	"descriptionmyturn": "${you} must pay a total of ${yens} yen(s) to [${player_names}] to move your president",
	"type": "activeplayer",
	"args": "argPayForPresident",
	"transitions": {
		"yes": 33,
		"move_pres": 30,
		"place_pres": 301
	}
}
					*/
					break;
				case "placePresident":
					/*
					{
	"name": "placePresident",
	"description": "President placement",
	"type": "game",
	"action": "stPlacePresident",
	"transitions": {
		"done": 34
	}
}
					*/
					break;
				case "activation":
					/*
					{
	"name": "activation",
	"description": "Area Activation Phase",
	"type": "game",
	"action": "stActivation",
	"transitions": {
		"customs": 35,
		"church": 36,
		"trade": 38,
		"warehouse": 40,
		"order": 50,
		"tech": 60,
		"move": 70,
		"done": 341
	}
}
					*/
					break;
				case "sellImports":
					/*
					{
	"name": "sellImports",
	"description": "${actplayer} must decide how much imports to sell",
	"descriptionmyturn": "Please select the desired bonus on the Custom Management Board or:",
	"type": "activeplayer",
	"args": "argSellImports",
	"transitions": {
		"done": 341,
		"warehouse": 40
	}
}
					*/
					break;
				case "complementFaith":
					/*
					{
	"name": "complementFaith",
	"description": "${actplayer} must decide if adding faith",
	"descriptionmyturn": "${you} have ${faith} faith: select the church position",
	"type": "activeplayer",
	"args": "argComplementFaith",
	"transitions": {
		"done": 341,
		"move": 70
	}
}
					*/
					break;
				case "selectResource":
					/*
					{
	"name": "selectResource",
	"description": "${actplayer} must decide which resource to gain",
	"descriptionmyturn": "${you} may select up to ${res_max} resource(s) of your choice",
	"type": "activeplayer",
	"args": "argSelectResource",
	"transitions": {
		"next1": 341,
		"next2": 343
	}
}
					*/
					break;
				case "tradeResource":
					/*
					{
	"name": "tradeResource",
	"description": "${actplayer} is trading",
	"descriptionmyturn": "${you} may select the resources to trade",
	"type": "activeplayer",
	"args": "argTradeResource",
	"transitions": {
		"done": 341
	}
}
					*/
					break;
				case "warehouseOut":
					/*
					{
	"name": "warehouseOut",
	"description": "${actplayer} can take items out of his warehouse",
	"descriptionmyturn": "${you} may select ${item_count} item(s) to take out of your warehouse",
	"type": "activeplayer",
	"args": "argWarehouseOut",
	"transitions": {
		"next1": 341,
		"next2": 343,
		"done": 3
	}
}
					*/
					break;
				case "completePhase":
					/*
					{
	"name": "completePhase",
	"description": "${actplayer} is selecting the order to complete",
	"descriptionmyturn": "Please select the order to complete",
	"type": "activeplayer",
	"args": "argAdditionalPhase",
	"transitions": {
		"completeOrder": 55,
		"cancel": 3
	}
}
					*/
					break;
				case "claimPhase":
					/*
					{
	"name": "claimPhase",
	"description": "${actplayer} is claiming an achievement",
	"descriptionmyturn": "Please select the achievement to claim",
	"type": "activeplayer",
	"args": "argAdditionalPhase",
	"transitions": {
		"claimAchievement": 11,
		"cancel": 3
	}
}
					*/
					break;
				case "agentPhase":
					/*
					{
	"name": "agentPhase",
	"description": "${actplayer} is selecting tile for Agent",
	"descriptionmyturn": "Please select the tile (Area) where to dispatch your agent",
	"type": "activeplayer",
	"args": "argAdditionalPhase",
	"transitions": {
		"useAgent": 10,
		"cancel": 3
	}
}
					*/
					break;
				case "selectOrder":
					/*
					{
	"name": "selectOrder",
	"description": "${actplayer} is acquiring an order",
	"descriptionmyturn": "${you} may select a ${order_range} order on the ${tile_name} management board",
	"type": "activeplayer",
	"args": "argSelectOrder",
	"transitions": {
		"done": 51
	}
}
					*/
					break;
				case "moreOrder":
					/*
					{
	"name": "moreOrder",
	"description": "Verifying if more order can be acquired",
	"type": "game",
	"action": "stMoreOrder",
	"transitions": {
		"done": 341,
		"more": 52
	}
}
					*/
					break;
				case "selectOrder2":
					/*
					{
	"name": "selectOrder2",
	"description": "${actplayer} is deciding if acquiring a second order",
	"descriptionmyturn": "${you} may acquire a second order for: ",
	"type": "activeplayer",
	"args": "argSelectOrder",
	"transitions": {
		"done": 51
	}
}
					*/
					break;
				case "completeOrder":
					/*
					{
	"name": "completeOrder",
	"description": "Completing order",
	"type": "game",
	"action": "stCompleteOrder",
	"transitions": {
		"done": 3,
		"warehouse": 40,
		"move": 70
	}
}
					*/
					break;
				case "selectTech":
					/*
					{
	"name": "selectTech",
	"description": "${actplayer} is selecting a technology",
	"descriptionmyturn": "${you} have ${gear_count} gear(s) to buy a technology",
	"type": "activeplayer",
	"args": "argSelectTech",
	"transitions": {
		"go": 62,
		"none": 341
	}
}
					*/
					break;
				case "acquireTech":
					/*
					{
	"name": "acquireTech",
	"description": "Acquiring technology",
	"type": "game",
	"action": "stAcquireTech",
	"transitions": {
		"done": 341,
		"station": 63
	}
}
					*/
					break;
				case "placeStation":
					/*
					{
	"name": "placeStation",
	"description": "${actplayer} is choosing the location for the Station",
	"descriptionmyturn": "${you} must select the Area on which to place the <B>Station</B>",
	"type": "activeplayer",
	"transitions": {
		"done": 341
	}
}
					*/
					break;
				case "moveAssistant":
					/*
					{
	"name": "moveAssistant",
	"description": "${actplayer} is moving assistants",
	"descriptionmyturn": "${you} can select a tile, then move an assistant (${curr_move} of ${max_move}) ",
	"type": "activeplayer",
	"args": "argMoveAssistants",
	"transitions": {
		"more": 70,
		"target": 71,
		"next1": 341,
		"next2": 343,
		"done": 3
	}
}
					*/
					break;
				case "moveAssistantTo":
					/*
					{
	"name": "moveAssistantTo",
	"description": "${actplayer} is moving assistants",
	"descriptionmyturn": "${you} must select the tile where to move the assistant",
	"type": "activeplayer",
	"transitions": {
		"more": 70,
		"next1": 341,
		"next2": 343,
		"done": 3
	}
}
					*/
					break;
				case "selectConstruct":
					/*
					{
	"name": "selectConstruct",
	"description": "${actplayer} is chosing a construction",
	"descriptionmyturn": "${you} may select the location on the <I>${tile_name}</I> where to build a shop/trading house: ",
	"type": "activeplayer",
	"args": "argSelectConstruct",
	"transitions": {
		"done": 343,
		"buildShop": 81,
		"buildHouse": 82
	}
}
					*/
					break;
				case "buildShop":
					/*
					{
	"name": "buildShop",
	"description": "Building a Shop",
	"type": "game",
	"action": "stbuildShop",
	"transitions": {
		"done": 343,
		"selectRes": 37,
		"warehouse": 40,
		"move": 70
	}
}
					*/
					break;
				case "buildHouse":
					/*
					{
	"name": "buildHouse",
	"description": "Building a Trading House",
	"type": "game",
	"action": "stbuildHouse",
	"transitions": {
		"done": 343
	}
}
					*/
					break;
				case "finalScoring":
					/*
					{
	"name": "finalScoring",
	"description": "Final Scoring",
	"type": "game",
	"action": "stFinalScoring",
	"transitions": {
		"done": 99
	}
}
					*/
					break;
				case "gameEnd":
					/*
					{
	"name": "gameEnd",
	"description": "End of game",
	"type": "manager",
	"action": "stGameEnd",
	"args": "argGameEnd"
}
					*/
					break;
				case "placePresidentStep":
					/*
					{
	"name": "placePresidentStep",
	"description": "${actplayer} is placing his president",
	"descriptionmyturn": "${you} must select the Area on which to place your president",
	"type": "activeplayer",
	"transitions": {
		"return": 31,
		"pay": 32,
		"done": 33
	}
}
					*/
					break;
				case "powerBonus":
					/*
					{
	"name": "powerBonus",
	"description": "Power bonus verification",
	"type": "game",
	"action": "stPowerBonus",
	"transitions": {
		"done": 342
	}
}
					*/
					break;
				case "construction":
					/*
					{
	"name": "construction",
	"description": "Construction verification",
	"type": "game",
	"action": "stConstruction",
	"transitions": {
		"done": 343,
		"construct": 80
	}
}
					*/
					break;
				case "recovery":
					/*
					{
	"name": "recovery",
	"description": "Recovery step",
	"type": "game",
	"action": "stRecovery",
	"transitions": {
		"done": 3,
		"leave": 349
	}
}
					*/
					break;
				case "leaveAssistant":
					/*
					{
	"name": "leaveAssistant",
	"description": "${actplayer} is deciding if leaving 1 assistant behind",
	"descriptionmyturn": "<B>Telephone</B>: ${you} may leave 1 assistant on the activated tile",
	"type": "activeplayer",
	"transitions": {
		"done": 3
	}
}
					*/
					break;
				case "gameEnd":
					data.state = "Viewing game results";
					break;
			}
		} else data.state = `Waiting for ${activePlayerData.name}`;
		return data;
	},
};
export default yokohama;
