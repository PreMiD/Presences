import wingspan from "./W/wingspan";

export interface GamePresence {
	logo: string;
	getData(): Promise<PresenceData> | PresenceData;
}

const games: Record<string, GamePresence> = {
	wingspan,
};

const unknownGame: GamePresence = {
	logo: "https://i.imgur.com/uCstmQE.png",
	async getData() {
		return {};
	},
};

export default function getGame(key: string) {
	if (games[key]) {
		return games[key];
	} else {
		return unknownGame;
	}
}
