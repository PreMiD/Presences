import wingspan from "./W/wingspan";

export interface GamePresence {
	logo: string;
	getData(presence: Presence): Promise<PresenceData> | PresenceData;
}

const games: Record<string, GamePresence> = {
	wingspan,
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
