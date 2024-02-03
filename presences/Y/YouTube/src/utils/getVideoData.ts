const runningPromises: Record<string, ReturnType<typeof getVideoData>> = {};

export async function getVideoData(data: { videoId: string; apiKey: string; clientName: string; clientVersion: string }): Promise<VideoDetails> {
	const { videoId, apiKey, clientName, clientVersion } = data,
		runningPromise = runningPromises[videoId];
	if (runningPromise) return runningPromise;

	const newPromise = new Promise<VideoDetails>(resolve => {
		void (async () => {
			const response = await fetch(`https://www.youtube.com/youtubei/v1/player?key=${apiKey}`, {
					body: JSON.stringify({
						context: {
							client: {
								clientName,
								clientVersion,
							},
						},
						videoId,
					}),
					headers: {
						"content-type": "application/json",
					},
					method: "POST",
				}),
				json = (await response.json()) as Response;

			resolve(json.videoDetails);
		})();
	});
	runningPromises[videoId] = newPromise;
	return newPromise;
}

interface Response {
	videoDetails: VideoDetails;
}

interface VideoDetails {
	videoId: string;
	title: string;
	lengthSeconds: string;
	channelId: string;
	isOwnerViewing: boolean;
	shortDescription: string;
	isCrawlable: boolean;
	thumbnail: Thumbnails;
	allowRatings: boolean;
	viewCount: string;
	author: string;
	isPrivate: boolean;
	isUnpluggedCorpus: boolean;
	isLiveContent: boolean;
}

interface Thumbnails {
	thumbnails: Thumbnail[];
}

interface Thumbnail {
	url: string;
	width: number;
	height: number;
}
