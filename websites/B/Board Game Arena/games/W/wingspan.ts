import { GamePresence } from "..";
import { getGameData, getMetadata } from "../../util";

interface PlayerData {
	name: string;
	id: number;
	score: string;
	avatar: string;
}

function getPlayerData(id: number) {
	return getGameData<PlayerData>(`players.${id}`);
}

const wingspan: GamePresence = {
	logo: "https://i.imgur.com/r49yEME.png",
	async getData() {
		const gameState = await getGameData<string>("gamestate.name");
		const activePlayer = await getGameData<number>("active_player");
		const userPlayer = await getMetadata<number>("player_id");
		const userPlayerData = await getPlayerData(userPlayer);
		const activePlayerData = await getPlayerData(activePlayer);
		const data: PresenceData = {
			smallImageKey: document.querySelector<HTMLImageElement>(
				`avatar_${userPlayer}`
			).src,
			smallImageText: `Score: ${userPlayerData.score}`,
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
