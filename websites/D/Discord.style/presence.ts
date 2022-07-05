const presence = new Presence({
		clientId: "847409866528260116",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
	const showTimestamp = await presence.getSetting<boolean>("timestamp"),
		showButtons = await presence.getSetting<boolean>("buttons"),
		presenceData: PresenceData = {
			largeImageKey: "discordstyle_logo",
		};

	if (document.location.pathname === "/")
		presenceData.details = "Viewing home page";
	else if (document.location.pathname.includes("/results")) {
		presenceData.details = `🔍 Searching for: ${
			document.querySelectorAll("span.font-semibold")[1]?.textContent ||
			"Nothing"
		}`;
		presenceData.state = `📖 ${
			document.querySelectorAll("span.font-semibold")[0]?.textContent
		} result(s)`;
	} else if (document.location.pathname.includes("/template/")) {
		presenceData.details = `Viewing ${
			document.querySelector(
				"h1.w-full.pr-6.text-4xl.font-bold.break-words.opacity-95"
			)?.textContent
		} template`;
		presenceData.state = `👇 ${
			document.querySelectorAll("span.font-bold")[0]?.textContent
		}, ❤️ ${document.querySelectorAll("span.font-bold")[1]?.textContent}, 💬 ${
			document.querySelectorAll("span.font-bold")[2]?.textContent
		}, 📆 ${
			document
				.querySelectorAll("span.font-bold")[3]
				?.textContent.split("ago")[0]
		}`;
		presenceData.buttons = [
			{
				label: "View Template",
				url: document.location.href,
			},
		];
	} else if (document.location.pathname.includes("/user")) {
		const username = document.querySelector(
			"h1.text-2xl.font-semibold.text-white"
		)?.textContent;
		presenceData.details = `Viewing ${
			username
				? username.endsWith("s")
					? `${`${username}'`}`
					: `${`${username}'s`}`
				: "Unknown"
		} profile`;
		presenceData.state = `🖼️ ${
			document.querySelectorAll("span.text-on-naked.text-xs")[0]?.textContent
		} & ❤️ ${
			document.querySelectorAll("span.text-on-naked.text-xs")[1]?.textContent
		}`;
		presenceData.buttons = [
			{
				label: "View User",
				url: document.location.href,
			},
		];
	} else if (document.location.pathname.includes("/latest")) {
		presenceData.details = "Viewing latest templates";
		presenceData.state = `📖 Page ${
			document.querySelector("h2.text-lg.font-semibold.text-white")?.textContent
		}`;
		presenceData.buttons = [
			{
				label: "View Latest",
				url: document.location.href,
			},
		];
	} else if (document.location.pathname.includes("/search")) {
		presenceData.details = "Viewing search page";
		presenceData.buttons = [
			{
				label: "View Page",
				url: document.location.href,
			},
		];
	} else if (document.location.pathname.includes("/bot")) {
		presenceData.details = "Viewing 🤖 bot page";
		presenceData.buttons = [
			{
				label: "View Page",
				url: document.location.href,
			},
		];
	} else if (document.location.pathname.includes("/new"))
		presenceData.details = "Creating 🎨 new template";
	else if (document.location.pathname.includes("/browse")) {
		const [tag] = document.location.href.split("tag=")[1].split("&");
		presenceData.details = `Viewing ${tag ? `${`${tag} tag`}` : "Nothing"}`;
		presenceData.state = `📖 Page ${
			document.querySelector("h2.text-lg.font-semibold.text-white")?.textContent
		}`;
		presenceData.buttons = [
			{
				label: "View Tag",
				url: document.location.href,
			},
		];
	}

	if (!showButtons) delete presenceData.buttons;
	if (showTimestamp) presenceData.startTimestamp = browsingTimestamp;

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
