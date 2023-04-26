export interface GameMetadata extends Record<string, any> {
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
	gamedatas: Record<string, any>;
}

let dataCache: GameMetadata,
	dataCacheTime: Record<string, number> = {};

export function getGameTag() {
	return getMetadata<string>("game_name");
}

function getCachedItem(key: string) {
	return dataCache[key];
}

function setCachedItem(key: string, value: any) {
	dataCache[key] = value;
}

function getCacheTime(key: string) {
	return dataCacheTime[key] ?? 0;
}

function setCacheTime(key: string, time: number) {
	dataCacheTime[key] = time;
}

/**
 * Fetches metadata about the current game.
 *
 * @param key
 * @returns
 */
export async function getMetadata<E>(key: string): Promise<E> {
	const now = Date.now();
	if (now - getCacheTime(key) > 1000) {
		setCacheTime(key, now);
		const data = await presence.getPageVariable(`gameui.${key}`);
		setCachedItem(key, data);
		return data as E;
	} else {
		return getCachedItem(key) as E;
	}
}

/**
 * Fetches data from the game's data object.
 * This includes game-specific data.
 *
 * @param key
 * @returns
 */
export function getGameData<E>(key: string) {
	return getMetadata<E>(`gamedatas.${key}`);
}
