import { GamePresence } from "..";
import { getGameData, getMetadata } from "../../util";

interface PlayerData {
	name: string;
	id: number;
	score: string;
	avatar: string;
}

function getPlayerData(presence: Presence, id: number) {
	return getGameData<PlayerData>(presence, `players.${id}`);
}

const wingspan: GamePresence = {
	logo: "https://i.imgur.com/r49yEME.png",
	async getData(presence: Presence) {
		const gameState = await getGameData<string>(presence, "gamestate.name");
		const activePlayer = await getGameData<number>(presence, "active_player");
		const userPlayer = await getMetadata<number>(presence, "player_id");
		const activePlayerData = await getPlayerData(presence, activePlayer);
		const data: PresenceData = {
			smallImageKey: document.querySelector<HTMLImageElement>(
				`avatar_${userPlayer}`
			).src,
			smallImageText: `Score: ${
				document.querySelector<HTMLSpanElement>(`#player_score_${userPlayer}`)
					.textContent
			}`,
		};
		if (activePlayer === userPlayer) {
			switch (gameState) {
				case "gameSetup":
					data.state = "Loading";
					break;
				case "playerInitialDiscard":
					data.state = "Selecting initial birds";
					break;
				case "playerNormalTurn":
					data.state = "Choosing an action";
					break;
				case "playerDrawBirds":
					data.state = "Drawing birds";
					break;
				case "playerPowerWhite":
				case "playerPowerBrown":
				case "playerPowerPink":
				case "playerPowerAllPlayers":
				case "processActionEffect":
				case "processPowerEffectWhite":
				case "processPowerEffectBrown":
				case "processPowerEffectPink":
					data.state = "Activating a power";
					break;
				case "playerGainFromFeeder":
					data.state = "Gaining food from the bird feeder";
					break;
				case "playerDiscardBird":
					data.state = "Discarding a bird";
					break;
				case "gameEnd":
					data.state = "Viewing game results";
					break;
			}
		} else {
			data.state = `Waiting for ${activePlayerData.name}`;
		}
		return data;
	},
};

export default wingspan;
