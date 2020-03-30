//import { write } from "fs";

console.log("Starting VT-Presence");
console.log(document);

var __awaiter =
	(this && this.__awaiter) ||
	function (thisArg, _arguments, P, generator) {
		return new (P || (P = Promise))(function (resolve, reject) {
			function fulfilled(value) {
				try {
					step(generator.next(value));
				} catch (e) {
					reject(e);
				}
			}
			function rejected(value) {
				try {
					step(generator["throw"](value));
				} catch (e) {
					reject(e);
				}
			}
			function step(result) {
				result.done
					? resolve(result.value)
					: new P(function (resolve) {
							resolve(result.value);
					  }).then(fulfilled, rejected);
			}
			step((generator = generator.apply(thisArg, _arguments || [])).next());
		});
	};
var presence = new Presence({
		clientId: "650103083438702613",
	}),
	strings = presence.getStrings({
		play: "presence.playback.playing",
		pause: "presence.playback.paused",
	});
var browsingStamp = Math.floor(Date.now() / 1000);
var title, views, air, air2, title2;
var iFrameVideo, currentTime, duration, paused;
var video, videoDuration, videoCurrentTime;
var lastPlaybackState = null;
var playback;
var browsingStamp = Math.floor(Date.now() / 1000);
if (lastPlaybackState != playback) {
	lastPlaybackState = playback;
	browsingStamp = Math.floor(Date.now() / 1000);
}

presence.on("iFrameData", (data) => {
	playback = data.iframe_video.duration !== null ? true : false;
	if (playback) {
		iFrameVideo = data.iframe_video.iFrameVideo;
		currentTime = data.iframe_video.currTime;
		duration = data.iframe_video.dur;
		paused = data.iframe_video.paused;
	}
});

presence.on("UpdateData", () =>
	__awaiter(this, void 0, void 0, function* () {
		var a = (presenceData = ""),
			presenceData = {
				largeImageKey: "logo",
			};

		if (document.location.pathname == "/gui/home") {
			presenceData.details = "Browsing on mainpage...";
			presence.setActivity(presenceData);
		} else if (
			document.location.pathname.includes("/gui/file/") &&
			document.location.pathname.endsWith("/detection")
		) {
			detections = document
				.querySelector("body > vt-virustotal-app")
				.shadowRoot.querySelector("#authChecker > file-view")
				.shadowRoot.querySelector("#report")
				.shadowRoot.querySelector("div > header > vt-ui-file-card")
				.shadowRoot.querySelector(
					"vt-ui-generic-card > div:nth-child(1) > div.detections > span"
				).innerText;
			file = document
				.querySelector("body > vt-virustotal-app")
				.shadowRoot.querySelector("#authChecker > file-view")
				.shadowRoot.querySelector("#report")
				.shadowRoot.querySelector("div > header > vt-ui-file-card")
				.shadowRoot.querySelector(
					"vt-ui-generic-card > div:nth-child(2) > div:nth-child(1) > div.object-id > div.file-name > a"
				).innerText;
			presenceData.details = "Scan file > " + file;
			presenceData.state = detections;
			presence.setActivity(presenceData);
		} else if (
			document.location.pathname.includes("/gui/file/") &&
			document.location.pathname.endsWith("/details")
		) {
			detections2 = document
				.querySelector("body > vt-virustotal-app")
				.shadowRoot.querySelector("#authChecker > file-view")
				.shadowRoot.querySelector("#report")
				.shadowRoot.querySelector("div > header > vt-ui-file-card")
				.shadowRoot.querySelector(
					"vt-ui-generic-card > div:nth-child(1) > div.detections > span"
				).innerText;
			file2 = document
				.querySelector("body > vt-virustotal-app")
				.shadowRoot.querySelector("#authChecker > file-view")
				.shadowRoot.querySelector("#report")
				.shadowRoot.querySelector("div > header > vt-ui-file-card")
				.shadowRoot.querySelector(
					"vt-ui-generic-card > div:nth-child(2) > div:nth-child(1) > div.object-id > div.file-name > a"
				).innerText;
			presenceData.details = "Reading details > " + file2;
			presenceData.state = detections2;
			presence.setActivity(presenceData);
		} else if (
			document.location.pathname.includes("/gui/file/") &&
			document.location.pathname.endsWith("/relations")
		) {
			detections = document
				.querySelector("body > vt-virustotal-app")
				.shadowRoot.querySelector("#authChecker > file-view")
				.shadowRoot.querySelector("#report")
				.shadowRoot.querySelector("div > header > vt-ui-file-card")
				.shadowRoot.querySelector(
					"vt-ui-generic-card > div:nth-child(1) > div.detections > span"
				).innerText;
			file = document
				.querySelector("body > vt-virustotal-app")
				.shadowRoot.querySelector("#authChecker > file-view")
				.shadowRoot.querySelector("#report")
				.shadowRoot.querySelector("div > header > vt-ui-file-card")
				.shadowRoot.querySelector(
					"vt-ui-generic-card > div:nth-child(2) > div:nth-child(1) > div.object-id > div.file-name > a"
				).innerText;
			presenceData.details = "Relations > " + file;
			presenceData.state = detections;
			presence.setActivity(presenceData);
		} else if (
			document.location.pathname.includes("/gui/file/") &&
			document.location.pathname.endsWith("/community")
		) {
			detections = document
				.querySelector("body > vt-virustotal-app")
				.shadowRoot.querySelector("#authChecker > file-view")
				.shadowRoot.querySelector("#report")
				.shadowRoot.querySelector("div > header > vt-ui-file-card")
				.shadowRoot.querySelector(
					"vt-ui-generic-card > div:nth-child(1) > div.detections > span"
				).innerText;
			file = document
				.querySelector("body > vt-virustotal-app")
				.shadowRoot.querySelector("#authChecker > file-view")
				.shadowRoot.querySelector("#report")
				.shadowRoot.querySelector("div > header > vt-ui-file-card")
				.shadowRoot.querySelector(
					"vt-ui-generic-card > div:nth-child(2) > div:nth-child(1) > div.object-id > div.file-name > a"
				).innerText;
			presenceData.details = "Comments > " + file;
			presenceData.state = detections;
			presence.setActivity(presenceData);
		} else if (document.location.pathname.includes("/gui/url/")) {
			scanurl = document
				.querySelector("body > vt-virustotal-app")
				.shadowRoot.querySelector("#authChecker > url-view")
				.shadowRoot.querySelector("#report")
				.shadowRoot.querySelector("#sampleCard")
				.shadowRoot.querySelector("div:nth-child(5) > a").innerText;
			results = document
				.querySelector("body > vt-virustotal-app")
				.shadowRoot.querySelector("#authChecker > url-view")
				.shadowRoot.querySelector("#report")
				.shadowRoot.querySelector("#sampleCard")
				.shadowRoot.querySelector("div.detections").innerText;
			presenceData.details = "Scan url > " + scanurl;
			presenceData.state = results;
			presence.setActivity(presenceData);
		} else if (document.location.pathname == "/gui/sign-in") {
			presenceData.details = "Log in to account...";
			presence.setActivity(presenceData);
		} else if (document.location.pathname.includes("/gui/user/")) {
			nameuser = document
				.querySelector("body > vt-virustotal-app")
				.shadowRoot.querySelector("#authChecker > user-view")
				.shadowRoot.querySelector(
					"#pageWrapper > div.wrapper > vt-ui-generic-card > div:nth-child(2) > div.avatar-name > div > h3"
				).innerText;
			presenceData.details = "Browsing though a profile";
			presenceData.state = nameuser + "'s profile";
			presence.setActivity(presenceData);
		} else if (document.location.pathname.includes("/gui/home/search")) {
			searchtext = document
				.querySelector("body > vt-virustotal-app")
				.shadowRoot.querySelector("#authChecker > home-view")
				.shadowRoot.querySelector("#searchbar")
				.shadowRoot.querySelector("#searchInput")
				.shadowRoot.querySelector("#input").value;
			presenceData.details = "Searching...";
			presenceData.state = searchtext;
			presence.setActivity(presenceData);
		} else if (document.location.pathname.includes("/gui/settings")) {
			presenceData.details = "Change account settings...";
			presence.setActivity(presenceData);
		} else if (document.location.pathname.includes("/gui/home/upload")) {
			presenceData.details = "Upload a file...";
			presence.setActivity(presenceData);
		} else if (document.location.pathname == "/gui/join-us") {
			username3 = document
				.querySelector("body > vt-virustotal-app")
				.shadowRoot.querySelector("#authChecker > join-us-view")
				.shadowRoot.querySelector("#username")
				.shadowRoot.querySelector("#input").value;
			presenceData.details = "Create a account...";
			presenceData.state = "Maybe known as " + username3;
			presence.setActivity(presenceData);
		} else if (document.location.pathname.includes("/gui/home/url")) {
			presenceData.details = "Search for a URL...";
			presenceData.state = "Think about typing.";
			//presence.setActivity(presenceData);
			url2 = document
				.querySelector("body > vt-virustotal-app")
				.shadowRoot.querySelector("#authChecker > home-view")
				.shadowRoot.querySelector("#urlSearchInput")
				.shadowRoot.querySelector("#input").value;
			if ((url2) => 1) {
				presenceData.details = "Search for a URL...";
				presenceData.state = url2;
				// presence.setActivity(presenceData);
			}
			presence.setActivity(presenceData);
		}

		presence.setActivity(presenceData);
	})
);

function getTimestamps(videoTime, videoDuration) {
	var startTime = Date.now();
	var endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
	return [Math.floor(startTime / 1000), endTime];
}
function refresh(presence) {
	refresh.refresh;
}
