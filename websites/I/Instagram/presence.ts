const presence = new Presence({
		clientId: "547436289960574977"
	}),
	timestamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: "logo"
		},
		settings = await getSettings(),
		{ pathname } = window.location,
		path = pathname.split("/"),
		profileName = document.querySelector("div.XBGH5 h2");

	if (settings.elapsedTime) presenceData.startTimestamp = timestamp;

	if (!path[1]) presenceData.details = "Viewing the Homepage";
	else if (pathname.startsWith("/stories")) {
		const time = document.querySelector("time.BPyeS.Nzb55"),
			video = document.querySelector("video");

		presenceData.details = settings.privacy
			? "Viewing a Story"
			: `Viewing ${path[2]}'s Story`;

		if (time && time.getAttribute("datetime")) {
			presenceData.state = getDateString(
				new Date(time.getAttribute("datetime"))
			);
		}

		if (!settings.privacy) {
			if (video && video.duration) {
				const timestamps = presence.getTimestampsfromMedia(video);

				presenceData.startTimestamp = timestamps[0];
				presenceData.endTimestamp = timestamps[1];
			}

			presenceData.buttons = [
				{
					label: "View Story",
					url: `https://www.instagram.com/stories/${path[2]}/${path[3]}`
				}
			];
		} else {
			delete presenceData.startTimestamp;
			delete presenceData.endTimestamp;
			delete presenceData.buttons;
		}
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
			settings.privacy || !profileName
				? "Viewing a Post"
				: `Viewing ${profileName}'s Post`;

		if (time && time.getAttribute("datetime")) {
			presenceData.state = getDateString(
				new Date(time.getAttribute("datetime"))
			);
		}

		if (!settings.privacy) {
			if (settings.postImage && image && image.src)
				presenceData.largeImageKey = await getShortURL(image.src);

			presenceData.buttons = [
				{
					label: "View Post",
					url: `https://www.instagram.com/${path[1]}/${path[2]}`
				}
			];
		} else delete presenceData.buttons;
	} else if (pathname.startsWith("/explore"))
		presenceData.details = "Exploring...";
	else if (pathname.startsWith("/nametag"))
		presenceData.details = "Viewing nametag";
	else if (
		pathname.startsWith("/direct/inbox") ||
		pathname.startsWith("/direct/t")
	)
		presenceData.details = "Direct Messages";
	else if (profileName?.textContent === path[1]) {
		const profilePicture =
			document.querySelector<HTMLImageElement>("img._6q-tv");

		presenceData.details = `Viewing a Profile${settings.privacy ? "" : ":"}`;

		if (!settings.privacy) {
			presenceData.state = `${
				document.querySelector("div.QGPIr h1")?.textContent ?? "Unknown"
			} (@${profileName.textContent})`;

			if (profilePicture)
				presenceData.smallImageKey = await getShortURL(profilePicture.src);

			presenceData.buttons = [
				{
					label: "View Profile",
					url: `https://www.instagram.com/${path[1]}`
				}
			];
		} else {
			delete presenceData.state;
			delete presenceData.smallImageKey;
			delete presenceData.buttons;
		}
	}

	if (document.querySelector("div.QY4Ed.P0xOK input.focus-visible")) {
		presenceData.details = settings.privacy ? "Searching" : "Searching:";

		if (!settings.privacy) {
			presenceData.state = document.querySelector<HTMLInputElement>(
				"div.QY4Ed.P0xOK input.focus-visible"
			)?.value;
		} else delete presenceData.state;
	}

	presence.setActivity(presenceData);
});

function getDateString(date: Date) {
	const seconds = Math.abs(Date.now() - date.getTime()) / 1000;

	switch (true) {
		case seconds < 60:
			return `${Math.floor(seconds)} second${seconds === 1 ? "" : "s"} ago`;
		case seconds < 3600:
			return `${Math.floor(seconds / 60)} minute${
				seconds === 60 ? "" : "s"
			} ago`;
		case seconds < 86400:
			return `${Math.floor(seconds / 3600)} hour${
				seconds === 3600 ? "" : "s"
			} ago`;
		case seconds < 604800:
			return `${Math.floor(seconds / 86400)} day${
				seconds === 86400 ? "" : "s"
			} ago`;
		case seconds < 2419200:
			return `${Math.floor(seconds / 604800)} week${
				seconds === 604800 ? "" : "s"
			} ago`;
		case seconds < 29030400:
			return `${Math.floor(seconds / 2419200)} month${
				seconds === 2419200 ? "" : "s"
			} ago`;
		default:
			return `${Math.floor(seconds / 29030400)} year${
				seconds === 29030400 ? "" : "s"
			} ago`;
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

async function getSettings() {
	const settings = await Promise.all([
			await presence.getSetting<boolean>("privacy"),
			await presence.getSetting<boolean>("elapsedTime"),
			await presence.getSetting<boolean>("postImage")
		]),
		names = ["privacy", "elapsedTime", "postImage"],
		obj: {
			[key in typeof names[number]]?: boolean;
		} = {};

	names.forEach((name, i) => {
		obj[name] = settings[i];
	});

	return obj;
}
