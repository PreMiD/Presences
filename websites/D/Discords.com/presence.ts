const presence = new Presence({
		clientId: "843791837273391104",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

enum Assets {
	Logo = "https://i.imgur.com/ZjtyAQx.png",
	Bot = "https://i.imgur.com/Z6ruEIy.png",
	Heart = "https://i.imgur.com/bY8jPXF.png",
}

presence.on("UpdateData", async () => {
	let presenceData: PresenceData = {
		largeImageKey: Assets.Logo,
	};

	const { href, pathname } = document.location,
		[showTimestamp, showButtons] = await Promise.all([
			presence.getSetting<boolean>("timestamp"),
			presence.getSetting<boolean>("buttons"),
		]),
		pages: Record<string, PresenceData> = {
			"/u/dashboard": {
				details: "⚙️ Viewing Dashboard",
				buttons: [{ label: "View Page", url: href }],
			},
			"/premium": {
				details: "💎 Viewing: Premium Plans",
				buttons: [{ label: "View Page", url: href }],
			},
			"/emoji-list": {
				details: "😃 Viewing: Emoji list",
				buttons: [{ label: "View Emojis", url: href }],
			},
			"/sticker-list": {
				details: "🖼️ Viewing: Sticker list",
				buttons: [{ label: "View Stickers", url: href }],
			},
			"/bots": {
				details: "🤖 Viewing: Bots",
				buttons: [{ label: "View Bots", url: href }],
			},
			"/templates": {
				details: "📁 Viewing: Templates",
				buttons: [{ label: "View Templates", url: href }],
			},
			"/termsofservice": {
				details: "📜 Viewing: Terms of Service",
				buttons: [{ label: "View Page", url: href }],
			},
			"/verification": {
				details: "🔐 Viewing: Verification",
				buttons: [{ label: "View Page", url: href }],
			},
			"/apply": {
				details: "📝 Applying for: Verification",
				buttons: [{ label: "Apply", url: href }],
			},
		},
		pageNumber = document.querySelector("li.page-item.active")?.textContent,
		pageNumberBots = document.querySelector("li.active")?.textContent,
		tagSearch = document
			.querySelector("h1.text-md-left")
			?.textContent.replace("Discord Servers", " "),
		standardSearch = document
			.querySelector("div.FMDiWzVk")
			?.querySelector("input")
			?.getAttribute("value");

	for (const [path, data] of Object.entries(pages))
		if (pathname.includes(path)) presenceData = { ...presenceData, ...data };

	if (pathname === "/") {
		presenceData.details = "Viewing home page";

		if (standardSearch) {
			presenceData.details = `🔍 Searching for: ${standardSearch}`;
			presenceData.buttons = [
				{
					label: "View Results",
					url: href,
				},
			];
		}
	} else if (pathname === "/servers/search") {
		presenceData.details = `🔍 Searching for: ${
			document
				.querySelector("h1.text-center")
				?.textContent.replace("Discord Servers", " ") || "Nothing"
		}`;
		presenceData.state = `📖 Page ${pageNumber}`;
		presenceData.buttons = [
			{
				label: "View Results",
				url: href,
			},
		];
	} else if (pathname.includes("/servers/tag/")) {
		if (tagSearch) presenceData.details = `🏷️ Viewing tag: ${tagSearch}`;
		presenceData.state = `📖 Page ${pageNumber}`;
		presenceData.buttons = [
			{
				label: "View Tag",
				url: href,
			},
		];
	} else if (pathname.includes("/servers/tags/")) {
		if (tagSearch) presenceData.details = `🔑 Viewing keyword: ${tagSearch}`;
		presenceData.state = `📖 Page ${pageNumber}`;
		presenceData.buttons = [
			{
				label: "View Keyword",
				url: href,
			},
		];
	} else if (pathname === "/servers/top-100") {
		presenceData.details = "🏅 Viewing: top-100 servers";
		presenceData.state = `📖 Page ${pageNumber}`;
		presenceData.buttons = [
			{
				label: "View Top-100",
				url: href,
			},
		];
	} else if (pathname.includes("/join")) {
		presenceData.details = "🔗 Joining";
		presenceData.state =
			document.querySelector("h2.__9ui9XW8A.mt-4")?.textContent;
		presenceData.largeImageKey =
			document.querySelector("div.Xw20bfHH")?.querySelectorAll("img")[1]?.src ??
			Assets.Logo;
		presenceData.smallImageKey = Assets.Logo;
		presenceData.smallImageText = "Discords";
		presenceData.buttons = [
			{
				label: "Join Server",
				url: href,
			},
		];
	} else if (pathname.includes("/upvote")) {
		presenceData.details = "🗳️ Upvoting";
		presenceData.state = document.querySelector("h1.__9ui9XW8A")?.textContent;
		presenceData.largeImageKey =
			document.querySelector("div.Xw20bfHH")?.querySelectorAll("img")[1]?.src ??
			Assets.Logo;
		presenceData.smallImageKey = Assets.Logo;
		presenceData.smallImageText = "Discords";
		presenceData.buttons = [
			{
				label: "Upvote Server",
				url: href,
			},
		];
	} else if (pathname.includes("/servers/")) {
		const details =
			document.querySelectorAll("div.xt1RiTiJ")[
				document.querySelectorAll("div.xt1RiTiJ")[2]?.querySelector("h5")
					?.textContent === "Social Media"
					? 3
					: 2
			];
		presenceData.details = document
			.querySelector("div.i0dbWFw9")
			?.querySelector("h1")?.textContent;
		presenceData.state = `👤 ${
			details?.textContent
				.split("Total Members:")[1]
				.split("Online Members:")[0]
		} - 👥 ${
			details?.textContent
				.split("Total Members:")[1]
				.split("Online Members:")[1]
				.split("Boost Count" || "Language")[0]
		} ${
			details?.textContent
				.split("Total Members:")[1]
				?.split("Online Members:")[1]
				?.split("Boost Count:")[1]
				?.split("Language")[0] !== null
				? `💎 ${
						details?.textContent
							.split("Total Members:")[1]
							.split("Online Members:")[1]
							.split("Boost Count:")[1]
							.split("Language")[0]
				  }`
				: ""
		}`;
		presenceData.largeImageKey =
			document.querySelector("div.Yzp7abwU")?.querySelectorAll("img")[1]?.src ??
			Assets.Logo;
		presenceData.smallImageKey = Assets.Logo;
		presenceData.smallImageText = `Discords - ${
			document.querySelector("div.JfFLrhpA")?.querySelector("a")
				? "Premium"
				: "Free"
		}`;
		presenceData.buttons = [
			{
				label: "View Server",
				url: href,
			},
			{
				label: "Join Server",
				url: `${href}/join`,
			},
		];
	} else if (pathname.includes("/emoji-list/tag")) {
		presenceData.details = `🏷️ Viewing emoji tag: ${
			document
				.querySelector("h2.text-center")
				?.textContent.replace("Emoji List", " ") ?? "N/A"
		}`;
		presenceData.state = `📖 Page ${pageNumber}`;
		presenceData.buttons = [
			{
				label: "View Emoji Tag",
				url: href,
			},
		];
	} else if (pathname.includes("/emoji-list/search")) {
		const emojiSearch = document
			.querySelector("h2.XJYkMdaM.emojisearchcenter")
			?.textContent?.split("Search:")[1];

		if (emojiSearch) presenceData.details = `🔍 Searching for: ${emojiSearch}`;
		presenceData.state = `📖 Page ${pageNumber}`;
		presenceData.buttons = [
			{
				label: "View Results",
				url: href,
			},
		];
	} else if (pathname.includes("/sticker-list/tag")) {
		presenceData.details = `🏷️ Viewing sticker tag: ${
			document
				.querySelector("h2.text-center")
				?.textContent.replace("Sticker List", " ") ?? "N/A"
		}`;
		presenceData.state = `📖 Page ${pageNumber}`;
		presenceData.buttons = [
			{
				label: "View Sticker Tag",
				url: href,
			},
		];
	} else if (pathname.includes("/sticker-list/search")) {
		const stickSearch = document
			.querySelector("h2.XJYkMdaM.emojisearchcenter")
			?.textContent?.split("Search:")[1]
			?.split("Servers")[0];

		if (stickSearch) presenceData.details = `🔍 Searching for: ${stickSearch}`;
		presenceData.state = `📖 Page ${pageNumber}`;
		presenceData.buttons = [
			{
				label: "View Results",
				url: href,
			},
		];
	} else if (pathname === "/bio") {
		presenceData.details = "🙂 Viewing: Bios";
		presenceData.state = `📖 Page ${pageNumber}`;
		presenceData.buttons = [
			{
				label: "View Bios",
				url: href,
			},
		];

		if (standardSearch) {
			presenceData.details = `🔍 Searching for: ${standardSearch}`;
			presenceData.buttons = [
				{
					label: "View Results",
					url: href,
				},
			];
		}
	} else if (pathname.includes("/bio/p")) {
		presenceData.details = document.querySelector("h1.HiVipESs")?.textContent;
		presenceData.state = document.querySelector(
			"div.fHOTdnFx.g0pusrry"
		)?.textContent;
		presenceData.largeImageKey =
			document.querySelector("div.jYifcv4i")?.querySelectorAll("img")[1]?.src ??
			Assets.Logo;
		presenceData.smallImageKey = Assets.Heart;
		presenceData.smallImageText =
			document.querySelector("#like-button")?.textContent === "0"
				? "Not Liked"
				: document.querySelector("#like-button")?.textContent;
		presenceData.buttons = [
			{
				label: "View Profile",
				url: href,
			},
		];
	} else if (pathname.includes("/bots/verification")) {
		presenceData.details = "🤖 Viewing: Verification";
		presenceData.buttons = [
			{
				label: "View Page",
				url: href,
			},
		];

		if (pathname.includes("/apply")) {
			presenceData.details = "🤖 Applying for Verification";
			presenceData.buttons = [
				{
					label: "Apply for Verification",
					url: href,
				},
			];
		}
	} else if (pathname.includes("/bots/search")) {
		presenceData.details = `🔍 Searching for: ${pathname.split("/search/")[1]}`;
		if (pageNumberBots) presenceData.state = `📖 Page ${pageNumberBots}`;
		presenceData.smallImageKey =
			"https://cdn-icons-png.flaticon.com/512/2021/2021646.png";
		presenceData.smallImageText = `Found ${
			document
				.querySelector("div.banner-left-hp")
				?.querySelector("h1")
				?.textContent?.split("you")[1]
		}`;
		presenceData.buttons = [
			{
				label: "View Results",
				url: href,
			},
		];
	} else if (pathname.includes("/bots/user")) {
		const userTitle = document
			.querySelectorAll("p.title")[1]
			?.textContent.includes("#")
			? document.querySelectorAll("p.title")[1]?.textContent
			: "Unknown User";
		presenceData.details = userTitle;
		presenceData.state = document.querySelector("p.subtitle")?.textContent;
		presenceData.largeImageKey =
			document.querySelector("div.column.is-2")?.querySelector("img")?.src ??
			Assets.Logo;
		presenceData.smallImageKey = Assets.Logo;
		presenceData.smallImageText = `Discords Bots - ${
			document.querySelector("img.profilebadges")?.getAttribute("title") ??
			"Unknown House"
		}`;
		presenceData.buttons = [
			{
				label: "View User",
				url: href,
			},
		];
	} else if (pathname.includes("/vote")) {
		presenceData.details = "🗳️ Upvoting";
		presenceData.state = document
			.querySelector("div.container.is-fluid")
			?.querySelector("h1")
			?.textContent?.replace("Vote for", " ");
		presenceData.largeImageKey =
			document.querySelector("div.column.is-2")?.querySelector("img")?.src ??
			Assets.Logo;
		presenceData.smallImageKey = Assets.Logo;
		presenceData.smallImageText = "Discords Bots";
		presenceData.buttons = [
			{
				label: "Upvote Bot",
				url: href,
			},
			{
				label: "View Bot",
				url: href.replace("/vote", ""),
			},
		];
	} else if (pathname.includes("/bots/tag")) {
		presenceData.details = `🏷️ Viewing bot tag: ${
			document.querySelector("h1.title")?.textContent
		}`;
		if (pageNumberBots) presenceData.state = `📖 Page ${pageNumberBots}`;
		presenceData.buttons = [
			{
				label: "View Bot Tag",
				url: href,
			},
		];
	} else if (pathname.includes("/bots/bot")) {
		const stats = document
			.querySelector("div.stats-bp")
			?.querySelector("ul")
			?.querySelectorAll("li");
		presenceData.details = document
			.querySelector("div.bot-title-bp")
			?.querySelector("h2")?.textContent;
		presenceData.state = `💻 ${stats?.[0]?.textContent?.replace(
			"Servers",
			" "
		)} - 👍 ${stats?.[2]?.querySelector("span")?.textContent}`;
		presenceData.largeImageKey =
			document.querySelector("div.bot-mx-bp")?.querySelector("img")?.src ??
			Assets.Logo;
		presenceData.smallImageKey = Assets.Logo;
		presenceData.smallImageText = `Discords Bots - ${
			window
				.getComputedStyle(document.querySelector("a.status"), "::after")
				.getPropertyValue("background-color") === "rgb(67, 181, 129)"
				? "🟢 Online"
				: "⚪ Offline"
		}`;
		presenceData.buttons = [
			{
				label: "View Bot",
				url: href,
			},
			{
				label: "Invite Bot",
				url: document
					.querySelector("a.invite-btn-bp.bot-btn-bp")
					?.getAttribute("href"),
			},
		];
	} else if (pathname.includes("/templates/search")) {
		presenceData.details = `🔍 Searching for: ${document
			.querySelector("h1.text-2xl")
			?.textContent?.replace("Search results for", "")
			?.replace(/['"]+/g, "")}`;
		presenceData.buttons = [
			{
				label: "View Results",
				url: href,
			},
		];
	} else if (pathname.includes("/templates/id")) {
		presenceData.details =
			document.querySelector("h1.font-semibold")?.textContent;
		presenceData.state = document.querySelector("p.line-clamp-3")?.textContent;
		presenceData.largeImageKey =
			document
				.querySelector("div.items-center.mb-4")
				?.querySelector("img")
				?.src?.replace(/^.*\.(jpg|JPG|svg)$/g, ".png") ?? Assets.Logo;
		presenceData.smallImageKey = Assets.Logo;
		presenceData.smallImageText = `Discords Templates - Used ${
			document.querySelector("p.text-xl")?.textContent
		}`;
		presenceData.buttons = [
			{
				label: "View Template",
				url: href,
			},
		];

		if (pathname.includes("/top")) {
			presenceData.details = "📈 Top Templates";
			presenceData.buttons = [
				{
					label: "View Top Templates",
					url: href,
				},
			];

			delete presenceData.smallImageKey;
			delete presenceData.smallImageText;
		}
	} else if (pathname.includes("/templates/user")) {
		const userWebsite = document
			.querySelector("p.mx-auto")
			?.querySelector("a")
			?.getAttribute("href");
		presenceData.details = document.querySelector("h1.text-3xl")?.textContent;
		presenceData.state = document.querySelector("p.mx-auto")?.textContent;
		presenceData.largeImageKey =
			document.querySelector("figure.mx-auto")?.querySelector("img")?.src ??
			Assets.Logo;
		presenceData.smallImageKey = Assets.Logo;
		presenceData.smallImageText = `Discords Templates - Total of ${
			document
				.querySelector("section.mt-4")
				?.querySelector("div.space-x-2")
				?.querySelectorAll("span")[1]?.textContent
		}`;
		presenceData.buttons = [
			{
				label: "View User",
				url: href,
			},
		];

		if (userWebsite) {
			presenceData.buttons.push({
				label: "View Website",
				url: userWebsite,
			});
		}
	} else if (pathname.includes("/templates/tags")) {
		presenceData.details = `🏷️ Viewing template tag: ${
			document
				.querySelector("a.nuxt-link-exact-active")
				?.querySelectorAll("span")[1]?.textContent
		}`;
		presenceData.buttons = [
			{
				label: "View Tag",
				url: href,
			},
		];
	}

	if (!showButtons) delete presenceData.buttons;
	if (showTimestamp) presenceData.startTimestamp = browsingTimestamp;

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
