import abalone from "./A/abalone";
import abandonallartichokes from "./A/abandonallartichokes";
import abyss from "./A/abyss";
import ageofcivilization from "./A/ageofcivilization";
import agricola from "./A/agricola";
import akeruption from "./A/akeruption";
import aknile from "./A/aknile";
import akropolis from "./A/akropolis";
import alhambra from "./A/alhambra";
import almadi from "./A/almadi";
import alveole from "./A/alveole";
import amyitis from "./A/amyitis";
import anachrony from "./A/anachrony";
import apocalypseazcc from "./A/apocalypseazcc";
import applejack from "./A/applejack";
import architectsofthewestkingdom from "./A/architectsofthewestkingdom";
import arcticscavengers from "./A/arcticscavengers";
import armadora from "./A/armadora";
import arnak from "./A/arnak";
import artdecko from "./A/artdecko";
import artthief from "./A/artthief";
import assyria from "./A/assyria";
import astra from "./A/astra";
import automobiles from "./A/automobiles";
import azul from "./A/azul";
import cantstop from "./C/cantstop";
import carcassonne from "./C/carcassonne";
import castlesofburgundy from "./C/castlesofburgundy";
import catan from "./C/catan";
import gizmos from "./G/gizmos";
import greatwesterntrail from "./G/greatwesterntrail";
import hanabi from "./H/hanabi";
import itsawonderfulworld from "./I/itsawonderfulworld";
import kingoftokyo from "./K/kingoftokyo";
import luckynumbers from "./L/luckynumbers";
import patchwork from "./P/patchwork";
import potionexplosion from "./P/potionexplosion";
import raceforthegalaxy from "./R/raceforthegalaxy";
import sechsnimmt from "./S/sechsnimmt";
import sevenwonders from "./S/sevenwonders";
import sevenwondersarchitects from "./S/sevenwondersarchitects";
import sevenwondersduel from "./S/sevenwondersduel";
import spacebase from "./S/spacebase";
import splendor from "./S/splendor";
import spots from "./S/spots";
import stoneage from "./S/stoneage";
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
	sevenwondersarchitects,
	greatwesterntrail,
	potionexplosion,
	patchwork,
	architectsofthewestkingdom,
	raceforthegalaxy,
	stoneage,
	abalone,
	abandonallartichokes,
	abyss,
	ageofcivilization,
	akeruption,
	aknile,
	alhambra,
	almadi,
	alveole,
	amyitis,
	anachrony,
	apocalypseazcc,
	applejack,
	arcticscavengers,
	armadora,
	artdecko,
	artthief,
	assyria,
	astra,
	automobiles,
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
