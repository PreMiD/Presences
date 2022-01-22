const presence = new Presence({
		clientId: "547436289960574977"
	}),
	timestamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: "logo"
		},
		setting = {
			privacy: await presence.getSetting<boolean>("privacy"),
			elapsedTime: await presence.getSetting<boolean>("elapsedTime"),
			postImage: await presence.getSetting<boolean>("postImage")
		},
		{ pathname } = window.location,
		path = pathname.split("/"),
		profileName = document.querySelector("div.XBGH5 h2");

	if (setting.elapsedTime) presenceData.startTimestamp = timestamp;

	if (!path[1]) presenceData.details = "Viewing the Homepage";
	else if (pathname.startsWith("/stories")) {
		const time = document.querySelector("time.BPyeS.Nzb55"),
			video = document.querySelector("video");

		presenceData.details = setting.privacy
			? "Viewing a Story"
			: `Viewing ${path[2]}'s Story`;

		if (time && time.getAttribute("datetime")) {
			presenceData.state = getDateString(
				new Date(time.getAttribute("datetime"))
			);
		}

		if (!setting.privacy) {
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
			setting.privacy || !profileName
				? "Viewing a Post"
				: `Viewing ${profileName}'s Post`;

		if (time && time.getAttribute("datetime")) {
			presenceData.state = getDateString(
				new Date(time.getAttribute("datetime"))
			);
		}

		if (!setting.privacy) {
			if (setting.postImage && image && image.src)
				presenceData.largeImageKey = await getShortURL(image.src);

			presenceData.buttons = [
				{
					label: "View Post",
					url: `https://www.instagram.com/${path[1]}/${path[2]}`
				}
			];
		}
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

		presenceData.details = setting.privacy
			? "Viewing a Profile"
			: "Viewing a Profile:";

		if (!setting.privacy) {
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
		}
	}

	if (document.querySelector("div.QY4Ed.P0xOK input.focus-visible")) {
		presenceData.details = setting.privacy ? "Searching" : "Searching:";

		if (!setting.privacy) {
			presenceData.state = document.querySelector<HTMLInputElement>(
				"div.QY4Ed.P0xOK input.focus-visible"
			)?.value;
		}
	}

	presence.setActivity(presenceData);
});

function getDateString(date: Date) {
	const seconds = Math.abs(Date.now() - +date) / 1000;

	if (seconds < 60) {
		return `${Math.trunc(seconds)} ${
			Math.trunc(seconds) > 1 ? "seconds" : "second"
		} ago`;
	} else if (seconds < 3600) {
		return `${Math.trunc(seconds / 60)} ${
			Math.trunc(seconds / 60) > 1 ? "minutes" : "minute"
		} ago`;
	} else if (seconds < 86400) {
		return `${Math.trunc(seconds / 3600)} ${
			Math.trunc(seconds / 3600) > 1 ? "hours" : "hour"
		} ago`;
	} else if (seconds < 604800) {
		return `${Math.trunc(seconds / 86400)} ${
			Math.trunc(seconds / 86400) > 1 ? "days" : "day"
		} ago`;
	} else if (seconds < 2419200) {
		return `${Math.trunc(seconds / 604800)} ${
			Math.trunc(seconds / 604800) > 1 ? "weeks" : "week"
		} ago`;
	} else {
		return `${Math.trunc(seconds / 2419200)} ${
			Math.trunc(seconds / 2419200) > 1 ? "months" : "month"
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
