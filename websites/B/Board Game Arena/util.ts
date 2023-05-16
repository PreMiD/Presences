export interface GameMetadata extends Record<string, unknown> {
	bRealtime: number;
	bTutorial: boolean;
	channel: string;
	chatDetached: boolean;
	current_player_is_active: boolean;
	current_player_name: string;
	game_group: string;
	game_id: number;
	game_name: string;
	game_status: string;
	isSpectator: boolean;
	is_coop: boolean;
	is_sandbox: boolean;
	is_solo: boolean;
	metasiteurl: string;
	player_id: number;
	gamedatas: Record<string, unknown>;
}

const dataCache: GameMetadata = {} as GameMetadata,
	dataCacheTime: Record<string, number> = {};

export function getGameTag(presence: Presence) {
	return getMetadata<string>(presence, "game_name");
}

function getCachedItem(key: string) {
	return dataCache[key];
}

function setCachedItem(key: string, value: unknown) {
	dataCache[key] = value;
}

function getCacheTime(key: string) {
	return dataCacheTime[key] ?? 0;
}

function setCacheTime(key: string, time: number) {
	dataCacheTime[key] = time;
}

/**
 * Gets a page variable from the window.
 * Note to future maintainers: Replace with newer API when available.
 *
 * @param variable
 * @param presence
 * @returns
 */
function getPageVariable<E>(variable: string, presence: Presence) {
	const variablePath = variable.split(".");

	// convert into legacy format
	let legacyVariable = `${variablePath[0]}"]`;
	for (let i = 1; i < variablePath.length - 1; i++) {
		legacyVariable += `["${variablePath[i]}"]`;
	}
	legacyVariable += `["${variablePath[variablePath.length - 1]}`;

	return presence.getPageletiable<E>(legacyVariable);
}

/**
 * Fetches metadata about the current game.
 *
 * @param presence
 * @param key
 * @returns
 */
export async function getMetadata<E>(
	presence: Presence,
	key: string
): Promise<E> {
	const now = Date.now();
	if (now - getCacheTime(key) > 1000) {
		setCacheTime(key, now);
		const data = await getPageVariable<E>(`gameui.${key}`, presence);
		setCachedItem(key, data);
		return data;
	} else return getCachedItem(key) as E;
}

/**
 * Fetches data from the game's data object.
 * This includes game-specific data.
 *
 * @param presence
 * @param key
 * @returns
 */
export function getGameData<E>(presence: Presence, key: string) {
	return getMetadata<E>(presence, `gamedatas.${key}`);
}

export interface PlayerData {
	name: string;
	id: number;
	score: string;
	avatar: string;
}

export function getPlayerData(presence: Presence, id: number) {
	return getGameData<PlayerData>(presence, `players.${id}`);
}

export function getCurrentGameState(presence: Presence) {
	return getGameData<string>(presence, "gamestate.name");
}

export function getCurrentGameStateType(presence: Presence) {
	return getGameData<string>(presence, "gamestate.type");
}

export function getActivePlayerId(presence: Presence) {
	return getGameData<number>(presence, "gamestate.active_player");
}

export function getUserPlayerId(presence: Presence) {
	return getMetadata<number>(presence, "player_id");
}

export function getPlayerAvatar(id: number) {
	return document.querySelector<HTMLImageElement>(`avatar_${id}`).src;
}

export function getPlayerScore(id: number) {
	return document.querySelector<HTMLSpanElement>(`#player_score_${id}`)
		.textContent;
}
