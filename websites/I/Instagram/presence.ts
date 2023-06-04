const presence = new Presence({
		clientId: "547436289960574977",
	}),
	timestamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey:
				"https://cdn.rcd.gg/PreMiD/websites/I/Instagram/assets/logo.png",
		},
		[privacySetting, elapsedTimeSetting, postImageSetting] = await Promise.all([
			presence.getSetting<boolean>("privacy"),
			presence.getSetting<boolean>("elapsedTime"),
			presence.getSetting<boolean>("postImage"),
		]),
		{ pathname } = window.location,
		path = pathname.split("/"),
		[, profileName] = document.title.split("(");

	if (elapsedTimeSetting) presenceData.startTimestamp = timestamp;

	if (!path[1]) presenceData.details = "Viewing the Homepage";
	else if (pathname.startsWith("/stories")) {
		const time = document.querySelector("time.BPyeS.Nzb55"),
			video = document.querySelector("video");

		presenceData.details = privacySetting
			? "Viewing a Story"
			: `Viewing ${path[2]}'s Story`;

		if (time && time.getAttribute("datetime")) {
			presenceData.state = getDateString(
				new Date(time.getAttribute("datetime"))
			);
		}

		if (!privacySetting && video && video.duration) {
			const timestamps = presence.getTimestampsfromMedia(video);

			presenceData.startTimestamp = timestamps[0];
			presenceData.endTimestamp = timestamps[1];
		}

		presenceData.buttons = [
			{
				label: "View Story",
				url: `https://www.instagram.com/stories/${path[2]}/${path[3]}`,
			},
		];
	} else if (pathname.startsWith("/accounts")) {
		presenceData.details = "Settings";
		presenceData.state = "Changing their Settings";
	} else if (pathname.startsWith("/p")) {
		const time = document.querySelector("time._1o9PC.Nzb55"),
			profileName = document.querySelector(
				"a.sqdOP.yWX7d._8A5w5.ZIAjV"
			)?.textContent,
			image = document.querySelector<HTMLImageElement>(
				"div.eLAPa.RzuR0 div.KL4Bh img"
			);

		presenceData.details =
			privacySetting || !profileName
				? "Viewing a Post"
				: `Viewing ${profileName}'s Post`;

		if (time && time.getAttribute("datetime")) {
			presenceData.state = getDateString(
				new Date(time.getAttribute("datetime"))
			);
		}

		if (!privacySetting && postImageSetting && image && image.src)
			presenceData.largeImageKey = await getShortURL(image.src);

		presenceData.buttons = [
			{
				label: "View Post",
				url: `https://www.instagram.com/${path[1]}/${path[2]}`,
			},
		];
	} else if (pathname.startsWith("/explore"))
		presenceData.details = "Exploring...";
	else if (pathname.startsWith("/nametag"))
		presenceData.details = "Viewing nametag";
	else if (
		pathname.startsWith("/direct/inbox") ||
		pathname.startsWith("/direct/t")
	)
		presenceData.details = "Direct Messages";
	else if (profileName.split(")")[0].replace("@", "") === path[1]) {
		const profilePicture =
			document.querySelector<HTMLImageElement>("img._6q-tv");

		presenceData.details = `Viewing a Profile${privacySetting ? "" : ":"}`;
		presenceData.state = `${
			document
				.querySelector("head > title")
				?.textContent.split("(")[0]
				.trim() ?? "Unknown"
		} (${profileName.split(")")[0]})`;

		if (profilePicture)
			presenceData.smallImageKey = await getShortURL(profilePicture.src);

		presenceData.buttons = [
			{
				label: "View Profile",
				url: `https://www.instagram.com/${path[1]}`,
			},
		];
	}

	if (document.querySelector("div.QY4Ed.P0xOK input.focus-visible")) {
		presenceData.details = privacySetting ? "Searching" : "Searching:";
		presenceData.state = document.querySelector<HTMLInputElement>(
			"div.QY4Ed.P0xOK input.focus-visible"
		)?.value;
	}

	if (privacySetting) {
		delete presenceData.state;
		delete presenceData.endTimestamp;
		delete presenceData.buttons;
		delete presenceData.smallImageKey;
	}

	presence.setActivity(presenceData);
});

function getDateString(date: Date) {
	const seconds = Math.abs(Date.now() - date.getTime()) / 1000,
		minutes = Math.floor(seconds / 60),
		hours = Math.floor(minutes / 60),
		days = Math.floor(hours / 24);

	switch (true) {
		case seconds < 60:
			return `${Math.floor(seconds)} second${seconds === 1 ? "" : "s"} ago`;
		case seconds < 3600:
			return `${minutes} minute${minutes === 1 ? "" : "s"} ago`;
		case seconds < 86400:
			return `${hours} hour${hours === 1 ? "" : "s"} ago`;
		case seconds < 604800:
			return `${days} day${days === 1 ? "" : "s"} ago`;
		case seconds < 2419200:
			return `${days / 7} week${days === 7 ? "" : "s"} ago`;
		case seconds < 29030400:
			return `${days / 30} month${days === 30 ? "" : "s"} ago`;
		default:
			return `${days / 365} year${days === 365 ? "" : "s"} ago`;
	}
}

const shortenedURLs: Record<string, string> = {};
async function getShortURL(url: string) {
	if (!url || url.length < 256) return url;
	if (shortenedURLs[url]) return shortenedURLs[url];
	try {
		const pdURL = await (
			await fetch(`https://pd.premid.app/create/${url}`)
		).text();
		shortenedURLs[url] = pdURL;
		return pdURL;
	} catch (err) {
		presence.error(err);
		return url;
	}
}
