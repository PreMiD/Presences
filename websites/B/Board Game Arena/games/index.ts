import azul from "./A/azul";
import wingspan from "./W/wingspan";
import yatzy from "./Y/yatzy";

export interface GamePresence {
	logo: string;
	getData(presence: Presence): Promise<PresenceData> | PresenceData;
}

const games: Record<string, GamePresence> = {
	wingspan,
	yatzy,
	azul,
};

export default function getGame(key: string) {
	if (games[key]) return games[key];
	else {
		return {
			logo: "https://i.imgur.com/uCstmQE.png",
			async getData() {
				return {};
			},
		};
	}
}
