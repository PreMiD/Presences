const presence = new Presence({
		clientId: "653639828826750976", // Contact if you want me to edit the discord assets/keys/whatever
	}),
	strings = presence.getStrings({
		play: "general.playing",
		pause: "general.paused",
	});

function getTimes(time: number): Record<string, number> {
	let seconds = Math.round(time),
		minutes = Math.floor(seconds / 60);

	seconds -= minutes * 60;

	const hours = Math.floor(minutes / 60);

	minutes -= hours * 60;

	return {
		sec: seconds,
		min: minutes,
		hrs: hours,
	};
}

function lessTen(digit: number): string {
	return digit < 10 ? "0" : "";
}

function getTimestamp(time: number): string {
	const { sec, min, hrs } = getTimes(time);

	return hrs > 0
		? `${hrs}:${lessTen(min)}${min}:${lessTen(sec)}${sec}`
		: `${min}:${lessTen(sec)}${sec}`;
}

interface Match {
	display: string;
	imageKey: string;
}

interface MatchList {
	[key: string]: Match;
}

const enum Assets {
	Logo = "https://cdn.rcd.gg/PreMiD/websites/C/CyTube/assets/logo.png",
	ServiceYT = "https://cdn.rcd.gg/PreMiD/websites/C/CyTube/assets/0.png",
	ServiceGD = "https://cdn.rcd.gg/PreMiD/websites/C/CyTube/assets/1.png",
	ServiceDBX = "https://cdn.rcd.gg/PreMiD/websites/C/CyTube/assets/2.png",
	ServiceAWS = "https://cdn.rcd.gg/PreMiD/websites/C/CyTube/assets/3.png",
	ServiceDC = "https://cdn.rcd.gg/PreMiD/websites/C/CyTube/assets/4.png",
	ServiceGC = "https://cdn.rcd.gg/PreMiD/websites/C/CyTube/assets/5.png",
	ServiceUK = "https://cdn.rcd.gg/PreMiD/websites/C/CyTube/assets/6.png",
}

const matches: MatchList = {
	youtube: { display: "YouTube", imageKey: Assets.ServiceYT },
	googlevideo: { display: "YouTube", imageKey: Assets.ServiceYT },

	"docs.google": { display: "Google Drive", imageKey: Assets.ServiceGD },
	googleusercontent: {
		display: "Google Drive",
		imageKey: Assets.ServiceGD,
	},

	appspot: { display: "Google Cloud", imageKey: Assets.ServiceGC },
	blogspot: { display: "Google Cloud", imageKey: Assets.ServiceGC },

	dropbox: { display: "Dropbox", imageKey: Assets.ServiceDBX },

	amazonaws: { display: "Amazon AWS", imageKey: Assets.ServiceAWS },

	soundcloud: { display: "Soundcloud", imageKey: Assets.Question }, // asset not found

	discordapp: { display: "Discord", imageKey: Assets.ServiceDC },

	"vimeo-prod-": { display: "Vimeo", imageKey: Assets.Question }, // asset not found
};

function service(service: string): Match {
	let returnMatch: Match = {
		display: "Unknown Service",
		imageKey: Assets.ServiceUK,
	};

	for (const key of Object.keys(matches))
		service.includes(key) && (returnMatch = matches[key]);

	return returnMatch;
}

class VideoData {
	audio = false;
	paused = true;
	duration = 0;
	currentTime = 0;
	site: string;
}

let iFrameResponse = new VideoData();

presence.on("iFrameData", (data: VideoData) => {
	iFrameResponse = data;
});

presence.on("UpdateData", async () => {
	const path = document.location.pathname,
		presenceData: PresenceData = {
			largeImageKey: Assets.Logo,
			details: "loading",
			state: "CyTube",
		},
		translate = {
			pause: (await strings).pause,
			play: (await strings).play,
		};

	async function setVideo(data: VideoData) {
		const currentService: Match = service(data.site);

		presenceData.details = `Watching ${document
			.querySelector("#currenttitle")
			.textContent.replace("Currently Playing:", "")}
            - ${currentService.display}`;

		presenceData.largeImageKey = currentService.imageKey;

		[presenceData.startTimestamp, presenceData.endTimestamp] =
			presence.getTimestamps(
				Math.floor(data.currentTime),
				Math.floor(data.duration)
			);

		if (data.paused) {
			presenceData.startTimestamp = null;
			presenceData.smallImageKey = Assets.Pause;
			presenceData.smallImageText = `${translate.pause} - ${getTimestamp(
				data.currentTime
			)}`;
		} else {
			presenceData.smallImageKey = Assets.Play;
			presenceData.smallImageText = translate.play;
		}
	}

	if (path.includes("/r/")) {
		presenceData.state = `${document.querySelector("#motd").textContent} - /r/${
			path.split("r/")[0]
		}`;
		if (
			document.body.className.includes("chatOnly") ||
			!document.querySelector("#videowrap")
		) {
			presenceData.details = "Chatting";
			presenceData.startTimestamp = Math.floor(Date.now() / 1000);
		} else if (!document.querySelector("#videowrap").querySelector("video")) {
			presenceData.details = "Waiting to Start";
			presenceData.smallImageKey = Assets.Play;
			presenceData.smallImageText = "Waiting";
			presenceData.startTimestamp = Math.floor(Date.now() / 1000);

			if (iFrameResponse?.site) setVideo(iFrameResponse);
		} else {
			const video = document.querySelector("#videowrap").querySelector("video");

			setVideo({
				audio: false,
				currentTime: video.currentTime,
				duration: video.duration,
				paused: video.paused,
				site: video.src,
			});
		}
	} else if (path === "/") {
		presenceData.details = "On Homepage";
		presenceData.startTimestamp = Math.floor(Date.now() / 1000);
	} else if (path.includes("/account/")) {
		presenceData.details = "Managing Account";
		presenceData.startTimestamp = Math.floor(Date.now() / 1000);
	} else if (path === "/contact") {
		presenceData.details = "Contacting Support";
		presenceData.startTimestamp = Math.floor(Date.now() / 1000);
	}
	presence.setActivity(presenceData, true);
});
