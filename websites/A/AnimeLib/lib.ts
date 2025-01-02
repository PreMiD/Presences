/* eslint-disable camelcase */
// Hack to resolve Deepscan
const no_op = (a: number) => a + 1;
no_op(0);

interface CommonData {
	id: number;
	name: string;
	rus_name: string;
	eng_name: string;
	alt_name: string;
	slug: string;
	slug_url: string;
	cover: Cover;
	stats: Stat[];
}

export interface AnimeData extends Omit<CommonData, "stats"> {
	ageRestriction: AnimeAgeRestriction;
	cover: Cover;
	/**
	 * Example: 18 января 1991 г.
	 */
	releaseDateString: string;
	shiki_rate: number;
	shikimori_href: string;
	status: AnimeStatus;
	type: AnimeType;
	/**
	 * Check if it exists. If it is, the anime is licensed and no anime data will be present
	 */
	toast?: {
		message: string;
		type: string;
	};
}

export interface UserData {
	id: number;
	username: string;
	avatar: UserAvatar;
	last_online_at: Date;
}

export type CharacterData = CommonData;
export type PersonData = CommonData;
export type PublisherData = CommonData;
export type TeamData = Omit<CommonData, "stats" | "rus_name">;

export interface CollectionData {
	id: number;
	name: string;
	user: Author;
}

export interface ReviewData {
	id: number;
	title: string;
	user: Author;
	related: ReviewRelation;
}

interface ReviewRelation {
	rus_name: string;
	eng_name: string;
	cover: Cover;
}

interface Author {
	id: string;
	username: string;
	avatar: UserAvatar;
}

interface Stat {
	value: number;
	formated: string;
	short: string;
	tag: "titles" | "subscribers";
	label: string;
}

interface UserAvatar {
	filename: string;
	url: string;
}

interface Cover {
	filename: string;
	default: string;
	thumbnail: string;
}

interface AnimeAgeRestriction {
	id: number; // yet to be typed properly
	label: string;
}

interface AnimeStatus {
	id: number; // yet to be typed properly
	label: string;
}

interface AnimeType {
	id: number; // yet to be typed properly
	label: string;
}

interface CachedResponse {
	id: string;
	data: AnimeData | UserData | CharacterData | CollectionData | ReviewData;
}

let cachedResponse: CachedResponse;

export class AnimeLib {
	private static api = "https://api2.mangalib.me/api";

	public static async getAnime(
		path: string,
		id: string
	): Promise<CachedResponse> {
		if (!cachedResponse || cachedResponse.id !== id) {
			if (path.endsWith("/watch")) path = path.slice(0, -6);

			cachedResponse = {
				id,
				...(await (
					await fetch(`${this.api}/anime/${path.split("/")[3]}`)
				).json()),
			};
		}

		return cachedResponse;
	}

	public static async getUser(id: string): Promise<CachedResponse> {
		if (!cachedResponse || cachedResponse.id !== id) {
			cachedResponse = {
				id,
				...(await (await fetch(`${this.api}/user/${id}`)).json()),
			};
		}

		return cachedResponse;
	}

	public static async getCharacter(
		path: string,
		id: string
	): Promise<CachedResponse> {
		if (!cachedResponse || cachedResponse.id !== id) {
			cachedResponse = {
				id,
				...(await (
					await fetch(`${this.api}/character/${path.split("/")[3]}`)
				).json()),
			};
		}

		return cachedResponse;
	}

	public static async getPerson(
		path: string,
		id: string
	): Promise<CachedResponse> {
		if (!cachedResponse || cachedResponse.id !== id) {
			cachedResponse = {
				id,
				...(await (
					await fetch(`${this.api}/people/${path.split("/")[3]}`)
				).json()),
			};
		}

		return cachedResponse;
	}

	public static async getCollection(id: string): Promise<CachedResponse> {
		if (!cachedResponse || cachedResponse.id !== id) {
			cachedResponse = {
				id,
				...(await (await fetch(`${this.api}/collections/${id}`)).json()),
			};
		}

		return cachedResponse;
	}

	public static async getReview(id: string): Promise<CachedResponse> {
		if (!cachedResponse || cachedResponse.id !== id) {
			cachedResponse = {
				id,
				...(await (await fetch(`${this.api}/reviews/${id}`)).json()),
			};
		}

		return cachedResponse;
	}

	public static async getTeam(
		path: string,
		id: string
	): Promise<CachedResponse> {
		if (!cachedResponse || cachedResponse.id !== id) {
			cachedResponse = {
				id,
				...(await (
					await fetch(`${this.api}/teams/${path.split("/")[3]}`)
				).json()),
			};
		}

		return cachedResponse;
	}

	public static async getPublisher(
		path: string,
		id: string
	): Promise<CachedResponse> {
		if (!cachedResponse || cachedResponse.id !== id) {
			cachedResponse = {
				id,
				...(await (
					await fetch(`${this.api}/publisher/${path.split("/")[3]}`)
				).json()),
			};
		}

		return cachedResponse;
	}
}
