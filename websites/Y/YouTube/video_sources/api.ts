import { Resolver, presence } from "../util";
import { getVideoID as getDefaultVideoID } from "./default";
import { getVideoID as getShortsVideoID } from "./shorts";

const videoCache = new Map<string, YouTubeAPIResponse>(),
	videoCacheLoading = new Set<string>();

interface YouTubeConfig extends Record<string, unknown> {
	yt: {
		config_: {
			INNERTUBE_API_KEY: string;
			INNERTUBE_CLIENT_NAME: string;
			INNERTUBE_CLIENT_VERSION: string;
		};
	};
}

interface YouTubeAPIResponse {
	videoDetails: {
		title: string;
		lengthSeconds: string;
		channelId: string;
		shortDescription: string;
		thumbnail: {
			thumbnails: {
				url: string;
			}[];
		};
		allowRatings: boolean;
		viewCount: string;
		author: string;
		isPrivate: boolean;
		isLiveContent: boolean;
	};
}

async function fetchVideoData(id: string) {
	const {
		yt: {
			config_: {
				INNERTUBE_API_KEY: apiKey,
				INNERTUBE_CLIENT_NAME: clientName,
				INNERTUBE_CLIENT_VERSION: clientVersion,
			},
		},
	} = await presence.getPageVariable<YouTubeConfig>(
		"yt.config_.INNERTUBE_API_KEY",
		"yt.config_.INNERTUBE_CLIENT_NAME",
		"yt.config_.INNERTUBE_CLIENT_VERSION"
	);
	const request = fetch(
		`https://www.youtube.com/youtubei/v1/player?key=${apiKey}`,
		{
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				videoId: id,
				context: {
					client: {
						clientName,
						clientVersion,
					},
				},
			}),
		}
	).then(res => res.json() as Promise<YouTubeAPIResponse>);
	videoCacheLoading.add(id);
	videoCache.set(id, await request);
	videoCacheLoading.delete(id);
}

function isActive(): boolean {
	const currentVideoID = getVideoID();
	if (!videoCache.has(currentVideoID)) {
		fetchVideoData(currentVideoID);
		return false;
	} else if (videoCacheLoading.has(currentVideoID)) {
		return false;
	}

	return !!getTitle() && !!getUploader();
}

function getTitle(): string {
	return videoCache.get(getVideoID())?.videoDetails.title;
}

function getUploader(): string {
	return videoCache.get(getVideoID())?.videoDetails.author;
}

export function getVideoID(): string {
	return getDefaultVideoID() ?? getShortsVideoID();
}

export function getChannelURL(): string {
	return `https://www.youtube.com/channel/${
		videoCache.get(getVideoID())?.videoDetails.channelId
	}`;
}

const resolver: Resolver = {
	isActive,
	getTitle,
	getUploader,
	getChannelURL,
	getVideoID,
};

export default resolver;
