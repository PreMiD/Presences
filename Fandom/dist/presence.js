let presence = new Presence({
	clientId: "644400074008297512",
	mediaKeys: false
});

let browsingStamp = Math.floor(Date.now() / 1000);
let title, sitename;
let href = new URL(document.location.href);

presence.on("UpdateData", async () => {

	let presenceData = {
		details: "In construction",
		state: "-",
		largeImageKey: "lg"
	};

	if (href.pathname.includes("/wiki/")) {

		let actionResult = href.searchParams.get("action") || href.searchParams.get("veaction");
		let titleFromURL = () => {
			if (href.pathname.startsWith("/wiki/")) {
				raw = href.pathname.slice(6);
			} else {
				lang = href.pathname.split("/")[0];
				raw = href.pathname.slice(7 + lang.length);
			}
			if (raw.includes("_")) return raw.replace(/_/g, " ");
			else return raw;
		};

		try {
			title = document.querySelector('.page-header__title').innerText;
		} catch (e) {
			title = null;
		}

		try {
			sitename = document.querySelector("meta[property='og:site_name']").content;
		} catch (e) {
			sitename = null;
		}

		if (title === "Home") {
			sitename = document.querySelector("meta[property='og:title']").content;
			presenceData.state = "Home";
			delete presenceData.details;
		} else if (actionResult == "history" && titleFromURL) {
			presenceData.details = "Viewing revision history";
			presenceData.state = titleFromURL();
		} else if (actionResult == "edit" && titleFromURL) {
			if (href.searchParams.has("action")) title = document.querySelector("#EditPageHeader").children[2].innerText;
			presenceData.details = "Editing a wiki page";
			presenceData.state = titleFromURL();
		} else if (href.pathname.includes("User:")) {
			presenceData.details = "Reading a user page";
			presenceData.state = titleFromURL();
		} else if (href.pathname.includes("User_talk:")) {
			presenceData.details = "Reading a user talk page";
			presenceData.state = titleFromURL();
		} else if (href.pathname.includes("User_blog:")) {
			if (title) {
				presenceData.details = "Reading a user blog post";
				presenceData.state = title + " by " + document.querySelector(".page-header__blog-post-details").firstElementChild.innerText;
			} else {
				presenceData.details = "Reading a user blog";
				presenceData.state = titleFromURL();
			}
		} else {
			if (href.pathname.includes("Thread:")) presenceData.details = "Reading a forum thread";
			else if (href.pathname.includes("Board:")) presenceData.details = "Looking at a forum board";
			else if (href.pathname.includes("Special:")) presenceData.details = "Reading a special page";
			else if (href.pathname.includes("Talk:")) presenceData.details = "Reading a talk page";
			else if (href.pathname.includes("Category:")) presenceData.details = "Looking at a category";
			else if (href.pathname.includes("File:")) presenceData.details = "Looking at a file";
			else presenceData.details = "Reading a wiki page";
			presenceData.state = title || titleFromURL();
		}

		presenceData.startTimestamp = browsingStamp;
		presenceData.state += " | " + sitename;

	} else if (href.host === "www.fandom.com") {

		if (href.pathname === "/") {
			presenceData.state = "Index";
			presenceData.startTimestamp = browsingStamp;
			delete presenceData.details;
		} else if (href.pathname.includes("/signin")) {
			presenceData.details = "Signing in";
			presenceData.startTimestamp = browsingStamp;
			delete presenceData.state;
		} else if (href.pathname.includes("/register")) {
			presenceData.details = "Registering an account";
			presenceData.startTimestamp = browsingStamp;
			delete presenceData.details;
		} else if (href.pathname.includes("/articles/")) {
			presenceData.details = "Reading an article";
			presenceData.state = document.querySelector(".article-header__title").innerText;
			presenceData.startTimestamp = browsingStamp;
		} else if (href.pathname.includes("/topics/")) {
			presenceData.details = "Looking at a topic";
			presenceData.state = document.querySelector(".topic-header__title").firstElementChild.innerHTML;
			presenceData.startTimestamp = browsingStamp;
		} else if (href.pathname.includes("/video")) {
			presenceData.details = "Watching a video";
			presenceData.state = document.querySelector(".video-page-featured-player__title").innerText;
			try {
				if (document.querySelector(".jw-icon-playback").getAttribute("aria-label") === "Pause") {
					video = document.querySelector(".jw-video");
					let timestamps = getTimestamps(Math.floor(video.currentTime), Math.floor(video.duration));
					presenceData.startTimestamp = timestamps[0];
					presenceData.endTimestamp = timestamps[1];
				}
			} catch (err) {
				presenceData.startTimestamp = browsingStamp;
			}
		} else if (href.pathname.includes("/curated/")) {
			presenceData.details = "Looking at a curation";
			presenceData.state = document.querySelector(".card__title").innerText;
			presenceData.startTimestamp = browsingStamp;
		} else {
			presenceData.details = "Reading a page";
			if (href.pathname.includes("/explore")) presenceData.state = "Explore";
			else if (href.pathname.includes("/about")) presenceData.state = "About";
			else if (href.pathname.includes("/carriers")) presenceData.state = "Carriers";
			else if (href.pathname.includes("/terms-of-use")) presenceData.state = "Terms of Use";
			else if (href.pathname.includes("/privacy-policy")) presenceData.state = "Privacy Policy";
			else if (href.pathname.includes("/mediakit")) presenceData.state = "Media Kit";
			else if (href.pathname.includes("/local-sitemap")) presenceData.state = "Local Sitemap";
			presenceData.startTimestamp = browsingStamp;
		}

	} else if (href.pathname === "/f" || href.pathname.includes("/f/")) {

		href = new URL(document.location.href);

		if (href.pathname === "/f") {
			presenceData.details = "Looking at the discussion page";
			delete presenceData.state;
		} else if (href.pathname.includes("/p/")) {
			presenceData.details = "Reading an discussion post";
			presenceData.state = document.querySelector(".post__title").innerText;
		} else if (href.pathname.includes("/u/")) {
			presenceData.details = "Looking at a discussion user page";
			presenceData.state = document.querySelector(".user-overview__username").innerText;
		}
		
		presenceData.startTimestamp = browsingStamp;

	}

	presence.setActivity(presenceData);
});

function getTimestamps(videoTime, videoDuration) {
	let startTime = Date.now();
	let endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
	return [Math.floor(startTime / 1000), endTime];
}