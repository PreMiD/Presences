let presence = new Presence({
	clientId: "653639828826750976", // Contact if you want me to edit the discord assets/keys/whatever
	mediaKeys: false
}),
	strings = presence.getStrings({
		play: "presence.playback.playing",
		pause: "presence.playback.paused"
	});

class video_data {
	audio: boolean = false
	paused: boolean = true
	duration = 0
	current_time = 0
	site = undefined
}

let iframe_response = new video_data

presence.on("iFrameData", data => {
	iframe_response = data;
})

presence.on("UpdateData", async () => {
	const path = document.location.pathname;
	let presenceData: presenceData = {
		largeImageKey: "cytube_logo",
		details: "loading",
		state: "CyTube"
	}

	let translate = {
		pause: (await strings).pause,
		play: (await strings).play
	}

	async function set_video(data: video_data) {
		let current_service: match = service(data.site)

		presenceData.details = `Watching ${
			document.getElementById('currenttitle').textContent.replace('Currently Playing:', '')}
            - ${current_service.display}`;

		presenceData.largeImageKey = current_service.image_key;

		let timestamps = getTimestamps(
			Math.floor(data.current_time),
			Math.floor(data.duration)
		);

		if (data.paused) {
			presenceData.startTimestamp = null;
			presenceData.smallImageKey = "presence_playback_paused"
			presenceData.smallImageText = `${translate.pause} - ${getTimestamp(data.current_time)}`
		} else {
			presenceData.startTimestamp = timestamps[0]
			presenceData.endTimestamp = timestamps[1]
			presenceData.smallImageKey = "presence_playback_playing"
			presenceData.smallImageText = translate.play
		}
	}

	if (path.includes('/r/')) {
		let container: boolean = !(document.body.className.includes('chatOnly') || !document.getElementById('videowrap'));
		let active_content: boolean = iframe_response.site;
		let room: string = path.split('r/')[1];
		let motd: string = document.getElementById('motd').textContent;

		presenceData.state = `${motd} - /r/${room}`;
		if (!container) {
			presenceData.details = "Chatting";
			presenceData.startTimestamp = Math.floor(Date.now() / 1000);
		} else {
			if (!document.getElementById('videowrap').querySelector("video")) {
				presenceData.details = 'Waiting to Start';
				presenceData.smallImageKey = 'presence_playback_waiting';
				presenceData.smallImageText = 'Waiting';
				presenceData.startTimestamp = Math.floor(Date.now() / 1000);

				if (active_content) set_video(iframe_response)
			} else {
				let video = document.getElementById('videowrap').querySelector("video");
				set_video({
					audio: false,
					current_time: video.currentTime,
					duration: video.duration,
					paused: video.paused,
					site: video.src
				})
			}

		}
	} else if (path == '/') {
		presenceData.details = "On Homepage";
		presenceData.startTimestamp = Math.floor(Date.now() / 1000);
	} else if (path.includes('/account/')) {
		presenceData.details = "Managing Account";
		presenceData.startTimestamp = Math.floor(Date.now() / 1000);
	} else if (path == '/contact') {
		presenceData.details = "Contacting Support"
		presenceData.startTimestamp = Math.floor(Date.now() / 1000);
	}
	presence.setActivity(presenceData, true);
});

/**
 * Get Timestamps
 * @param {Number} videoTime Current video time seconds
 * @param {Number} videoDuration Video duration seconds
 */
function getTimestamps(videoTime: number, videoDuration: number) {
	var startTime = Date.now();
	var endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
	return [Math.floor(startTime / 1000), endTime];
}


function getTimestamp(time) {
	let {
		sec,
		min,
		hrs
	} = getTimesFromMs(time);
	return hrs > 0 ? hrs + ":" + min + ":" + sec : min + ":" + sec;
}

function getTimesFromMs(ms) {
	const p60 = x => Math.floor(x % 60);
	let sec = p60(ms) < 10 ? "0" + p60(ms) : p60(ms),
		min = p60(ms / 60) <= 0 ? 0 : p60(ms / 60),
		hrs = p60(ms / 60 / 60);
	return {
		hrs: hrs,
		sec: sec,
		min: min
	};
}

function service(service: string) {
	let return_match: match = {
		display: "Unknown Service",
		image_key: "cytube_service_uk"
	}

	Object.keys(matches).forEach((key) => {

		if (service.includes(key)) return_match = matches[key];
	})

	return return_match;
}

interface match {
	display: string,
	image_key: string
}

interface matchList {
	[key: string]: match
}

let matches: matchList = {
	"youtube": {
		display: "YouTube",
		image_key: "cytube_service_yt"
	},
	"googlevideo": {
		display: "YouTube",
		image_key: "cytube_service_yt"
	},
	"docs.google": {
		display: "Google Drive",
		image_key: "cytube_service_gd"
	},
	"googleusercontent": {
		display: "Google Drive",
		image_key: "cytube_service_gd"
	},
	"appspot": {
		display: "Google Cloud",
		image_key: "cytube_service_gc"
	},
	"blogspot": {
		display: "Google Cloud",
		image_key: "cytube_service_gc"
	},
	"dropbox": {
		display: "Dropbox",
		image_key: "cytube_service_dbx"
	},
	"amazonaws": {
		display: "Amazon AWS",
		image_key: "cytube_service_aws"
	},
	"soundcloud": {
		display: "Soundcloud",
		image_key: "cytube_service_sc"
	},
	"discordapp": {
		display: "Discord",
		image_key: "cytube_service_dc"
	},
	"vimeo-prod-": {
		display: "Vimeo",
		image_key: "cytube_service_ve"
	}
}
