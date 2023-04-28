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
import babydinosaurrescue from "./B/babydinosaurrescue";
import backgammon from "./B/backgammon";
import bahamataxi from "./B/bahamataxi";
import balloonpop from "./B/balloonpop";
import bandada from "./B/bandada";
import bandido from "./B/bandido";
import bang from "./B/bang";
import baolakiswahili from "./B/baolakiswahili";
import barbu from "./B/barbu";
import barenpark from "./B/barenpark";
import barrage from "./B/barrage";
import battleforhill from "./B/battleforhill";
import battleoflits from "./B/battleoflits";
import battleship from "./B/battleship";
import belote from "./B/belote";
import betta from "./B/betta";
import beyondthesun from "./B/beyondthesun";
import bids from "./B/bids";
import bigmonster from "./B/bigmonster";
import bigtimesoccer from "./B/bigtimesoccer";
import bigtwo from "./B/bigtwo";
import biyi from "./B/biyi";
import blackjack from "./B/blackjack";
import blaze from "./B/blaze";
import bloodrage from "./B/bloodrage";
import blooms from "./B/blooms";
import blueskies from "./B/blueskies";
import bobail from "./B/bobail";
import bombay from "./B/bombay";
import boomerangaustralia from "./B/boomerangaustralia";
import boomerangeurope from "./B/boomerangeurope";
import boomerangusa from "./B/boomerangusa";
import boop from "./B/boop";
import bossquest from "./B/bossquest";
import breakthecode from "./B/breakthecode";
import briscola from "./B/briscola";
import bubbleepop from "./B/bubbleepop";
import bug from "./B/bug";
import burglebros from "./B/burglebros";
import butterfly from "./B/butterfly";
import buttons from "./B/buttons";
import buyword from "./B/buyword";
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
	abalone,
	abandonallartichokes,
	abyss,
	ageofcivilization,
	agricola,
	akeruption,
	aknile,
	akropolis,
	alhambra,
	almadi,
	alveole,
	amyitis,
	anachrony,
	apocalypseazcc,
	applejack,
	architectsofthewestkingdom,
	arcticscavengers,
	armadora,
	arnak,
	artdecko,
	artthief,
	assyria,
	astra,
	automobiles,
	azul,
	babydinosaurrescue,
	backgammon,
	bahamataxi,
	balloonpop,
	bandada,
	bandido,
	bang,
	baolakiswahili,
	barbu,
	barenpark,
	barrage,
	battleforhill,
	battleoflits,
	battleship,
	belote,
	betta,
	beyondthesun,
	bids,
	bigmonster,
	bigtimesoccer,
	bigtwo,
	biyi,
	blackjack,
	blaze,
	bloodrage,
	blooms,
	blueskies,
	bobail,
	bombay,
	boomerangaustralia,
	boomerangeurope,
	boomerangusa,
	boop,
	bossquest,
	breakthecode,
	briscola,
	bubbleepop,
	bug,
	burglebros,
	butterfly,
	buttons,
	buyword,
	cantstop,
	carcassonne,
	castlesofburgundy,
	catan,
	gizmos,
	greatwesterntrail,
	hanabi,
	itsawonderfulworld,
	kingoftokyo,
	luckynumbers,
	patchwork,
	potionexplosion,
	raceforthegalaxy,
	sechsnimmt,
	sevenwonders,
	sevenwondersarchitects,
	sevenwondersduel,
	spacebase,
	splendor,
	spots,
	stoneage,
	tickettoride,
	welcometo,
	wingspan,
	yatzy,
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
