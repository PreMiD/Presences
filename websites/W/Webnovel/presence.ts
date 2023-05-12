const presence = new Presence({
		clientId: "959109938779684874",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

enum Assets {
	Play = "https://i.imgur.com/q57RJjs.png",
	Pause = "https://i.imgur.com/mcEXiZk.png",
	Stop = "https://i.imgur.com/aLYu3Af.png",
	Search = "https://i.imgur.com/B7FxcD4.png",
	Question = "https://i.imgur.com/pIIJniP.png",
	Live = "https://i.imgur.com/0HVm46z.png",
	Reading = "https://i.imgur.com/5m10TTT.png",
	Writing = "https://i.imgur.com/Pa00qZh.png",
	Call = "https://i.imgur.com/PFdbnIf.png",
	Vcall = "https://i.imgur.com/6wG9ZvM.png",
	Downloading = "https://i.imgur.com/ryrDrz4.png",
	Uploading = "https://i.imgur.com/SwNDR5U.png",
	Repeat = "https://i.imgur.com/Ikh95KU.png",
	RepeatOne = "https://i.imgur.com/wh885z3.png",
	Premiere = "https://i.imgur.com/Zf8FSUR.png",
	PremiereLive = "https://i.imgur.com/yC4j9Lg.png",
	Viewing = "https://i.imgur.com/fpZutq6.png",
}

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			details: "Browsing",
			largeImageKey: "https://i.imgur.com/PcDEB6x.png",
		},
		[privacy, timestamp, cover, buttons] = await Promise.all([
			presence.getSetting<boolean>("privacy"),
			presence.getSetting<number>("timestamp"),
			presence.getSetting<boolean>("cover"),
			presence.getSetting<boolean>("buttons"),
		]),
		{ pathname, hostname, href, search } = document.location,
		[book, comic, stories, ranking] = [
			pathname.startsWith("/book/"),
			pathname.startsWith("/comic/"),
			pathname.startsWith("/stories/"),
			pathname.startsWith("/ranking/"),
		];
	switch (hostname) {
		case "www.webnovel.com": {
			if (pathname === "/") presenceData.details = "Home Page";
			else if (stories || ranking) {
				if (stories) presenceData.details = "Browsing Categories";
				else if (ranking) presenceData.details = "Viewing Rankings";
				if (!privacy) {
					const activeTab =
						document.querySelectorAll<HTMLAnchorElement>("a[class~='_on']");
					presenceData.details = `Viewing ${activeTab[0].title.replace(
						",",
						""
					)}`;
					presenceData.state = activeTab[1].title;
				}
				presenceData.smallImageKey = Assets.Search;
			} else if (book || comic) {
				if (cover) {
					presenceData.largeImageKey = `https://img.webnovel.com/bookcover/${
						pathname.split("/")[2].split("_")[1]
					}/600/600.jpg`;
				}
				if (document.querySelector(".cha-hd-mn")) {
					const novelInfo = document
						.querySelector<HTMLSpanElement>(".cha-hd-mn-text")
						.textContent.split(" / ");
					if (book) presenceData.details = "Reading a Novel";
					else if (comic) presenceData.details = "Reading a Comic";
					if (!privacy) {
						presenceData.details = novelInfo[0].trim();
						presenceData.state = novelInfo[1].trim();
						presenceData.smallImageKey = Assets.Reading;
						presenceData.smallImageText = "Reading";
						presenceData.buttons = [
							{ label: "Read Chapter", url: document.URL },
							{
								label: "Read Book",
								url: document.querySelector<HTMLAnchorElement>(".dib.ell").href,
							},
						];
					}
				} else {
					if (book) presenceData.details = "Viewing a Novel";
					else if (comic) presenceData.details = "Viewing a Comic";
					if (!privacy) {
						presenceData.state = document
							.querySelector<HTMLHeadingElement>("h2")
							.innerHTML.split(" <")[0];
						presenceData.buttons = [{ label: "View Book", url: document.URL }];
					}
				}
			} else if (pathname.startsWith("/profile/")) {
				presenceData.details = "Viewing a Profile";
				if (cover) {
					presenceData.largeImageKey =
						document.querySelector<HTMLImageElement>(".avatar-area img").src;
				}
				if (!privacy) {
					presenceData.state =
						document.querySelector<HTMLAnchorElement>("h3").textContent;
					presenceData.buttons = [{ label: "View Profile", url: document.URL }];
				}
			} else if (pathname.startsWith("/search")) {
				presenceData.details = "Searching";
				presenceData.smallImageKey = Assets.Search;

				if (!privacy) {
					presenceData.details = "Searching for:";
					presenceData.state =
						document.querySelector<HTMLInputElement>("input").value;
				}
			} else if (pathname.startsWith("/library"))
				presenceData.details = "Viewing Library";
			else if (pathname.startsWith("/history"))
				presenceData.details = "Viewing History";
			else if (pathname.startsWith("/tags")) {
				presenceData.details = "Browsing Tags";
				presenceData.smallImageKey = Assets.Search;
				if (!privacy) {
					presenceData.state =
						document.querySelector<HTMLHeadingElement>("h2").textContent;
				}
			}

			break;
		}
		case "forum.webnovel.com": {
			const params = new URLSearchParams(search);
			if (params.has("q") && pathname === "/") {
				presenceData.details = "Searching Forum";
				presenceData.smallImageKey = Assets.Search;
				if (!privacy) {
					presenceData.details = "Searching Forum for";
					presenceData.state = params.get("q");
				}
			} else if (pathname === "/") presenceData.details = "Forum Home Page";
			else if (pathname.startsWith("/following"))
				presenceData.details = "Viewing Followed discussions";
			else if (pathname.startsWith("/tags"))
				presenceData.details = "Browsing Tags";
			else if (pathname.startsWith("/t")) {
				presenceData.details = "Browsing Topics";
				presenceData.smallImageKey = Assets.Search;
				if (!privacy) {
					presenceData.state =
						document.querySelector<HTMLHeadingElement>(
							".Hero-title"
						).textContent;
				}
			} else if (pathname.startsWith("/d")) {
				presenceData.details = "Reading Discussion";
				presenceData.smallImageKey = Assets.Reading;
				if (!privacy) {
					presenceData.state =
						document.querySelector<HTMLHeadingElement>("h2").textContent;
					presenceData.buttons = [
						{
							label: "View Discussion",
							url: href.split("/").splice(0, 5).join("/"),
						},
					];
				}
			} else if (pathname.startsWith("/u")) {
				presenceData.details = "Viewing User Profile";
				if (cover) {
					presenceData.largeImageKey = document.querySelector<HTMLImageElement>(
						".UserCard-profile .Avatar"
					).src;
				}
				if (!privacy) {
					presenceData.state = document.querySelector(
						".UserCard-profile .username"
					).textContent;
					presenceData.buttons = [
						{
							label: "View Profile",
							url: href.split("/").splice(0, 5).join("/"),
						},
					];
				}
			} else if (pathname.startsWith("/p")) {
				presenceData.details = "Reading a Post";
				presenceData.smallImageKey = Assets.Reading;
				if (!privacy) {
					presenceData.state =
						document.querySelector<HTMLHeadingElement>(
							".PageHero-title"
						).textContent;
					presenceData.buttons = [{ label: "Read Post", url: document.URL }];
				}
			}

			break;
		}
		case "inkstone.webnovel.com": {
			if (pathname.includes("/dashboard"))
				presenceData.details = "Author's Dashboard";
			else if (pathname.startsWith("/academy")) {
				presenceData.details = "Writers Academy";
				presenceData.smallImageKey = Assets.Reading;
				if (pathname.includes("/column")) {
					presenceData.details = "Viewing a Column";
					if (!privacy)
						presenceData.state = document.querySelector("h2").textContent;
				} else if (pathname.includes("/article")) {
					presenceData.details = "Reading an Article";
					if (cover && document.querySelector('[class^="cover"] > img')) {
						presenceData.largeImageKey =
							document.querySelector<HTMLImageElement>(
								'[class^="cover"] > img'
							).src;
					}
					if (!privacy) {
						presenceData.state =
							document.querySelector<HTMLDivElement>(".fs32.lh40").textContent;
					}
				}
			} else if (pathname.includes("/list"))
				presenceData.details = "Viewing their Novel List";
			else if (pathname.includes("/create")) {
				presenceData.details = "Making a Novel";
				presenceData.smallImageKey = Assets.Writing;
			}

			break;
		}
	}

	switch (presenceData.smallImageKey) {
		case "search":
			presenceData.smallImageText = "Searching";
			break;
		case "reading":
			presenceData.smallImageText = "Reading";
			break;
	}

	if (timestamp) presenceData.startTimestamp = browsingTimestamp;
	if (!buttons) delete presenceData.buttons;

	presence.setActivity(presenceData);
});
