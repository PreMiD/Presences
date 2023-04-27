import azul from "./A/azul";
import carcassonne from "./C/carcassonne";
import catan from "./C/catan";
import itsawonderfulworld from "./I/itsawonderfulworld";
import sevenwondersduel from "./S/sevenwondersduel";
import splendor from "./S/splendor";
import tickettoride from "./T/tickettoride";
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
	catan,
	tickettoride,
	carcassonne,
	splendor,
	itsawonderfulworld,
	sevenwondersduel,
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
