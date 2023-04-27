import agricola from "./A/agricola";
import akropolis from "./A/akropolis";
import arnak from "./A/arnak";
import azul from "./A/azul";
import cantstop from "./C/cantstop";
import carcassonne from "./C/carcassonne";
import castlesofburgundy from "./C/castlesofburgundy";
import catan from "./C/catan";
import gizmos from "./G/gizmos";
import hanabi from "./H/hanabi";
import itsawonderfulworld from "./I/itsawonderfulworld";
import kingoftokyo from "./K/kingoftokyo";
import luckynumbers from "./L/luckynumbers";
import sechsnimmt from "./S/sechsnimmt";
import sevenwonders from "./S/sevenwonders";
import sevenwondersduel from "./S/sevenwondersduel";
import spacebase from "./S/spacebase";
import splendor from "./S/splendor";
import spots from "./S/spots";
import tickettoride from "./T/tickettoride";
import welcometo from "./W/welcometo";
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
	castlesofburgundy,
	spacebase,
	agricola,
	arnak,
	sechsnimmt,
	akropolis,
	cantstop,
	gizmos,
	sevenwonders,
	hanabi,
	kingoftokyo,
	luckynumbers,
	spots,
	welcometo,
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
