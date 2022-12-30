const presence = new Presence({
		clientId: "612299892764966923",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000),
	subsection = new URL(document.location.href).searchParams.get("subsection");

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			details: "Unknown page",
			largeImageKey: "https://i.imgur.com/cek4hGt.png",
		},
		{ pathname, href, hostname, search } = document.location;
	if (hostname === "steamcommunity.com") {
		presenceData.details = "Steam Community";

		if (pathname === "/" || !pathname) {
			if (subsection) {
				presenceData.state = `Browsing ${subsection}`;
				presenceData.startTimestamp = browsingTimestamp;
			} else {
				presenceData.state = "Homepage";
				presenceData.startTimestamp = browsingTimestamp;
			}
		} else if (pathname.includes("/filedetails/")) {
			presenceData.details = "Viewing a community post";
			presenceData.state = document
				.querySelector<HTMLTitleElement>("head > title")
				.textContent.replace("Steam Community :: ", " ")
				.replace("::", "|");
			presenceData.startTimestamp = browsingTimestamp;
			presenceData.buttons = [
				{
					label: "View the page",
					url: href,
				},
			];
		} else if (pathname.includes("/id") || pathname.includes("/profiles")) {
			if (
				pathname.includes("/badges") ||
				pathname.includes("/games") ||
				pathname.includes("/inventory") ||
				pathname.includes("/recommended") ||
				pathname.includes("/gamecards") ||
				pathname.includes("/reviews") ||
				pathname.includes("/awards")
			) {
				const pfname = document
					.querySelector<HTMLAnchorElement>(
						"#responsive_page_template_content > div > div.profile_small_header_bg > div > div > span.profile_small_header_name > a"
					)
					?.textContent.trim();
				if (pathname.includes("/badges") || pathname.includes("/gamecards"))
					presenceData.state = `Viewing ${pfname}'s badges`;
				else if (search.includes("tab=recent"))
					presenceData.state = `Viewing ${pfname}'s recently played games`;
				else if (pathname.includes("/reviews"))
					presenceData.state = `Viewing ${pfname}'s reviews`;
				else if (pathname.includes("/awards"))
					presenceData.state = `Viewing ${pfname}'s profile awards`;
				else if (search.includes("tab=perfect"))
					presenceData.state = `Viewing ${pfname}'s perfected games`;
				else if (search.includes("tab=all"))
					presenceData.state = `Viewing ${pfname}'s games`;
				else if (pathname.includes("/inventory"))
					presenceData.state = `Viewing ${pfname}'s inventory`;
				else if (pathname.includes("/recommended"))
					presenceData.state = `Viewing ${pfname}'s reviews`;
				else presenceData.state = `Viewing ${pfname}'s profile details`;
			} else if (
				pathname.includes("/screenshots") ||
				pathname.includes("/images") ||
				pathname.includes("/videos") ||
				pathname.includes("/myworkshopfiles")
			) {
				const pfname = document.querySelector<HTMLAnchorElement>(
					"#HeaderUserInfoName > a"
				).textContent;
				if (pathname.includes("/screenshots"))
					presenceData.state = `Viewing ${pfname}'s screenshots`;
				else if (pathname.includes("/images"))
					presenceData.state = `Viewing ${pfname}'s artworks`;
				else if (pathname.includes("/videos"))
					presenceData.state = `Viewing ${pfname}'s videos`;
				else if (search.includes("section=guides"))
					presenceData.state = `Viewing ${pfname}'s guides`;
				else if (search.includes("section=collections"))
					presenceData.state = `Viewing ${pfname}'s workshop collections`;
				else if (search.includes("section=merchandise"))
					presenceData.state = `Viewing ${pfname}'s merchandise`;
				else presenceData.state = `Viewing ${pfname}'s workshop items`;
			} else if (
				pathname.includes("/friends") ||
				pathname.includes("/groups")
			) {
				const title =
					document.querySelector<HTMLTitleElement>("head > title").textContent;
				if (pathname.includes("/friends")) {
					if (pathname.includes("/common"))
						presenceData.state = `Viewing ${title}'s friends in common`;
					else presenceData.state = `Viewing ${title}'s friends list`;
				} else if (pathname.includes("/groups")) {
					if (pathname.includes("/common"))
						presenceData.state = `Viewing ${title}'s groups in common`;
					else presenceData.state = `Viewing ${title}'s joined groups`;
				} else presenceData.state = `Viewing ${title}'s social details`;
			} else if (pathname.includes("/home"))
				presenceData.state = "Browsing the activity page";
			else {
				presenceData.smallImageKey = "https://i.imgur.com/cek4hGt.png";
				presenceData.largeImageKey = document.querySelector<HTMLMetaElement>(
					"head > meta[property='og:image']"
				).content;
				presenceData.state = `Viewing ${document
					.querySelector<HTMLTitleElement>("head > title")
					.textContent.replace("Steam Community :: ", " ")}'s profile`;
				presenceData.buttons = [
					{
						label: "Visit the profile page",
						url: href,
					},
				];
			}
		} else if (pathname.includes("/followedgames")) {
			presenceData.state = "Browsing follwing games.";

			presenceData.startTimestamp = browsingTimestamp;
		} else if (pathname.includes("/search/users")) {
			presenceData.details = "Searching for a user: ";

			presenceData.state = `Username: ${
				document.querySelector<HTMLInputElement>("#search_text_box").value
			}`;
			presenceData.startTimestamp = browsingTimestamp;
			presenceData.smallImageKey = "search";
		} else if (pathname.includes("/app/")) {
			const title = document
				.querySelector<HTMLTitleElement>("head > title")
				.textContent.replace("Steam Community :: ", " ");
			if (pathname.includes("/workshop/")) {
				presenceData.details = "Steam Workshop";
				presenceData.state = `Browsing through${title} submissions`;
				presenceData.startTimestamp = browsingTimestamp;
			} else if (pathname.includes("/discussions")) {
				if (pathname.includes("/0/")) {
					presenceData.details = "Viewing a discussion page";
					presenceData.state = title
						.replace("General ", " ")
						.replace("::", "|");
					presenceData.buttons = [
						{
							label: "Go to the discussion page",
							url: href,
						},
					];
				} else {
					presenceData.state = document
						.querySelector<HTMLTitleElement>("head > title")
						.textContent.replace(" :: Steam Community", " ");
					presenceData.startTimestamp = browsingTimestamp;
				}
			} else if (pathname.includes("/screenshots")) {
				presenceData.state = `Screenshots for ${title}`;
				presenceData.startTimestamp = browsingTimestamp;
			} else if (pathname.includes("/images")) {
				presenceData.state = `${title} Artworks`;
				presenceData.startTimestamp = browsingTimestamp;
			} else if (pathname.includes("/broadcasts")) {
				if (pathname.includes("/watch/")) {
					presenceData.startTimestamp = browsingTimestamp;
					presenceData.state = "Watching a broadcast";
					presenceData.buttons = [
						{
							label: "Watch now!",
							url: href,
						},
					];
				} else presenceData.state = `Browsing${title} live broadcasts`;
			} else if (pathname.includes("/videos")) {
				presenceData.state = `Browsing through${title} videos`;
				presenceData.startTimestamp = browsingTimestamp;
			} else if (pathname.includes("/allnews")) {
				presenceData.state = `Reading news about${title}`;
				presenceData.startTimestamp = browsingTimestamp;
			} else if (pathname.includes("/guides")) {
				presenceData.state = `Browsing in${title} guides`;
				presenceData.startTimestamp = browsingTimestamp;
			} else if (pathname.includes("/reviews")) {
				presenceData.state = `Reading reviews about${title}`;
				presenceData.startTimestamp = browsingTimestamp;
			} else {
				presenceData.details = `${title} Community Hub`;
				presenceData.startTimestamp = browsingTimestamp;
				presenceData.buttons = [
					{
						label: "View the community homepage",
						url: href,
					},
				];
			}
		} else if (pathname.includes("/market")) {
			presenceData.startTimestamp = browsingTimestamp;
			if (pathname.includes("/listings/")) {
				presenceData.details = "Community Market item listings for";
				presenceData.state = document
					.querySelector<HTMLTitleElement>("head > title")
					.textContent.replace("Steam Community Market :: Listings for ", " ");
				presenceData.buttons = [
					{
						label: "Go to the item page",
						url: href,
					},
				];
				presenceData.smallImageKey = "https://i.imgur.com/cek4hGt.png";
				presenceData.largeImageKey = document.querySelector<HTMLMetaElement>(
					"head > meta[property='og:image']"
				).content;
			} else presenceData.details = "Steam Community Market";
		} else if (pathname.includes("/workshop")) {
			const title =
				document.querySelector<HTMLTitleElement>("head > title").textContent;
			presenceData.startTimestamp = browsingTimestamp;
			if (pathname.includes("/browse/"))
				presenceData.state = `Searching in ${title} workshop items`;
			else if (pathname.includes("/discussions/"))
				presenceData.state = "Workshop item discussions";
			else if (pathname.includes("/about/"))
				presenceData.state = `Reading about${title.replace(
					"Steam Community :: ",
					" "
				)} workshop`;
			else presenceData.state = "Workshop's main page";
		} else if (pathname.includes("/discussions/")) {
			if (pathname === "/discussions/") presenceData.state = "Discussion hub";
			else {
				presenceData.details = "Browsing Steam forums";
				presenceData.state = `${document
					.querySelector<HTMLTitleElement>("head > title")
					.textContent.replace("::", "|")} discussions`;
				presenceData.buttons = [
					{
						label: "Read more",
						url: href,
					},
				];
			}
		} else if (pathname.includes("/broadcast/")) {
			presenceData.state = `Watching${document
				.querySelector<HTMLTitleElement>("head > title")
				.textContent.replace("Steam Community :: ", " ")
				.replace(" :: Broadcast", " ")}'s broadcast`;
			presenceData.startTimestamp = browsingTimestamp;
		} else if (pathname.includes("/chat/")) {
			presenceData.state = "Online Chat";
			presenceData.startTimestamp = browsingTimestamp;
		} else if (pathname.includes("/tradeoffer/")) {
			presenceData.state = "Sending a trade offer";
			presenceData.startTimestamp = browsingTimestamp;
		}
	} else if (hostname === "store.steampowered.com") {
		presenceData.details = "Steam Store";

		if (pathname === "/" || !pathname) {
			presenceData.state = "Home";
			presenceData.startTimestamp = browsingTimestamp;
		} else if (pathname.includes("/app/")) {
			presenceData.state =
				document.querySelector<HTMLDivElement>("#appHubAppName").textContent;
			presenceData.startTimestamp = browsingTimestamp;
			presenceData.smallImageKey = "https://i.imgur.com/cek4hGt.png";
			presenceData.largeImageKey = document.querySelector<HTMLMetaElement>(
				"head > meta[property='og:image']"
			).content;
			presenceData.buttons = [
				{
					label: "Visit the store page",
					url: href,
				},
			];
		} else if (pathname.includes("/account")) {
			presenceData.state = "Viewing their account prefrences";
			presenceData.startTimestamp = browsingTimestamp;
		} else if (pathname.includes("/cart")) {
			presenceData.state = "Viewing cart";
			presenceData.startTimestamp = browsingTimestamp;
		} else if (pathname.includes("/checkout")) {
			presenceData.state = "In checkout";
			presenceData.startTimestamp = browsingTimestamp;
		} else if (pathname.includes("/wishlist")) {
			presenceData.state = `Viewing ${
				document.querySelector<HTMLTitleElement>("head > title").textContent
			}`;
			presenceData.startTimestamp = browsingTimestamp;
		} else if (pathname.includes("/games")) {
			presenceData.state = "Browsing games...";
			presenceData.startTimestamp = browsingTimestamp;
		} else if (pathname.includes("/genre")) {
			const parts = href.split("/");
			presenceData.state = `Exploring ${parts[parts.length - 2].replaceAll(
				"%20",
				" "
			)} games`;
			presenceData.startTimestamp = browsingTimestamp;
		} else if (pathname.includes("/demos")) {
			presenceData.state = "Browsing demos...";
			presenceData.startTimestamp = browsingTimestamp;
		} else if (pathname.includes("/category")) {
			presenceData.state = `Exploring ${
				document.querySelector<HTMLTitleElement>("head > title").textContent
			} games`;
			presenceData.startTimestamp = browsingTimestamp;
		} else if (pathname.includes("/vr/")) {
			presenceData.state = "Browsing VR games...";
			presenceData.startTimestamp = browsingTimestamp;
		} else if (pathname.includes("/pccafe")) {
			presenceData.state = "Browsing PC Cafe games...";
			presenceData.startTimestamp = browsingTimestamp;
		} else if (pathname.includes("/tags")) {
			presenceData.details = "Browsing in Store Tags";
			presenceData.state =
				document.querySelector<HTMLTitleElement>("head > title").textContent;
			presenceData.startTimestamp = browsingTimestamp;
		} else if (pathname.includes("/points/")) {
			presenceData.details = "Steam Points Shop";
			presenceData.startTimestamp = browsingTimestamp;
		} else if (pathname.includes("/labs/")) {
			presenceData.details = "in Steam Labs";
			presenceData.startTimestamp = browsingTimestamp;
		} else if (pathname.includes("/macos")) {
			presenceData.state = "Browsing Mac OS X games...";
			presenceData.startTimestamp = browsingTimestamp;
		} else if (pathname.includes("/about")) {
			presenceData.state = "Reading more about Steam";
			presenceData.startTimestamp = browsingTimestamp;
		} else if (pathname.includes("/linux")) {
			presenceData.state = "Browsing Linux + Steam OS games...";
			presenceData.startTimestamp = browsingTimestamp;
		} else if (pathname.includes("/software")) {
			presenceData.state = "Viewing Software category";
			presenceData.startTimestamp = browsingTimestamp;
		} else if (pathname.includes("/controller")) {
			presenceData.state = "Browsing Controller friendly games";
			presenceData.startTimestamp = browsingTimestamp;
		} else if (pathname.includes("/remoteplay_hub")) {
			presenceData.state = "Remote Play hub";
			presenceData.startTimestamp = browsingTimestamp;
		} else if (pathname.includes("/soundtracks")) {
			presenceData.state = "Browsing Soundtracks...";
			presenceData.startTimestamp = browsingTimestamp;
		} else if (pathname.includes("/vrhardware")) {
			presenceData.state = "Viewing VR hardwares page...";
			presenceData.startTimestamp = browsingTimestamp;
		} else if (pathname.includes("/steamdeck")) {
			presenceData.state = "Viewing Steam Deck page...";
			presenceData.startTimestamp = browsingTimestamp;
		} else if (pathname.includes("/greatondeck")) {
			presenceData.state = "Recommended Steam Deck games";
			presenceData.startTimestamp = browsingTimestamp;
		} else if (pathname.includes("/steamlink")) {
			presenceData.state = "Steam Link";
			presenceData.startTimestamp = browsingTimestamp;
		} else if (pathname.includes("/news")) {
			presenceData.state = "Reading the news...";
			presenceData.startTimestamp = browsingTimestamp;
		} else if (pathname === "/about") {
			presenceData.state = "About Steam";
			presenceData.startTimestamp = browsingTimestamp;
		} else if (pathname.includes("/recommended")) {
			presenceData.state = "Browsing recommended games...";
			presenceData.startTimestamp = browsingTimestamp;
		} else if (pathname.includes("/upcoming/")) {
			presenceData.state = "Exploring upcoming games...";
			presenceData.startTimestamp = browsingTimestamp;
		} else if (pathname.includes("/explore")) {
			presenceData.state = "Exploring games...";
			presenceData.startTimestamp = browsingTimestamp;
		} else if (pathname.includes("/updated")) {
			presenceData.state = "Recently updated games";
			presenceData.startTimestamp = browsingTimestamp;
		} else if (pathname.includes("/communityrecommendations")) {
			presenceData.state = "Exploring in community recommendations";
			presenceData.startTimestamp = browsingTimestamp;
		} else if (pathname.includes("/curators")) {
			presenceData.state = "Viewing Steam Curators page";
			presenceData.startTimestamp = browsingTimestamp;
		} else if (pathname.includes("/developer/")) {
			presenceData.details = "Viewing a Develoaper Page";
			presenceData.state = document
				.querySelector<HTMLTitleElement>("head > title")
				.textContent.replace("Steam Developer: ", " ");
			presenceData.startTimestamp = browsingTimestamp;
			presenceData.buttons = [
				{
					label: "View the page",
					url: href,
				},
			];
			presenceData.largeImageKey = document.querySelector<HTMLMetaElement>(
				"head > meta[property='og:image']"
			).content;
		} else if (pathname.includes("/publisher/")) {
			presenceData.details = "Viewing a Publisher Page";
			presenceData.state = document
				.querySelector<HTMLTitleElement>("head > title")
				.textContent.replace("Steam Publisher: ", " ");
			presenceData.startTimestamp = browsingTimestamp;
			presenceData.buttons = [
				{
					label: "View the page",
					url: href,
				},
			];
			presenceData.smallImageKey = "https://i.imgur.com/cek4hGt.png";
			presenceData.largeImageKey = document.querySelector<HTMLMetaElement>(
				"head > meta[property='og:image']"
			).content;
		} else if (pathname.includes("/franchise/")) {
			presenceData.details = "Viewing a Game Franchise";
			presenceData.state = document
				.querySelector<HTMLTitleElement>("head > title")
				.textContent.replace("Steam Franchise: ", " ");
			presenceData.startTimestamp = browsingTimestamp;
			presenceData.buttons = [
				{
					label: "View the page",
					url: href,
				},
			];
			presenceData.smallImageKey = "https://i.imgur.com/cek4hGt.png";
			presenceData.largeImageKey = document.querySelector<HTMLMetaElement>(
				"head > meta[property='og:image']"
			).content;
		} else if (pathname.includes("/curator")) {
			presenceData.state = "Viewing a Steam Curator page";
			presenceData.startTimestamp = browsingTimestamp;
		} else if (pathname.includes("/specials")) {
			presenceData.state = "Viewing special offers";
			presenceData.startTimestamp = browsingTimestamp;
		} else if (pathname.includes("/charts")) {
			presenceData.startTimestamp = browsingTimestamp;
			presenceData.details = "Steam Store Charts";
			if (pathname.includes("topselling"))
				presenceData.state = "Top 100 Selling Games";
			else if (pathname.includes("mostplayed"))
				presenceData.state = "Top 100 Played Games";
			else if (pathname.includes("topsellers")) {
				const parted = href.split("/");
				presenceData.state = `Top Sellers for ${parted[parted.length - 1]}`;
			} else if (pathname.includes("topnewreleases")) {
				const parted = href.split("/");
				presenceData.state = `Top new releases for${parted[parted.length - 1]
					.replace("top_", " ")
					.replace("_", " ")}`;
			} else
				presenceData.state = "Top selling and top played games across Steam";
		} else if (pathname.includes("/stats")) {
			presenceData.state = "Steam & Games Stats.";
			presenceData.startTimestamp = browsingTimestamp;
		} else if (pathname.includes("/search")) {
			presenceData.startTimestamp = browsingTimestamp;
			const SearchTerm = new URL(href).searchParams.get("term");
			if (SearchTerm === null) presenceData.state = "Searching...";
			else {
				presenceData.state = `Searching for ${SearchTerm}`;
				presenceData.smallImageKey = "search";
			}
		}
	} else if (hostname === "help.steampowered.com") {
		presenceData.details = "Steam Support";
		presenceData.startTimestamp = browsingTimestamp;
		presenceData.state = document
			.querySelector<HTMLTitleElement>("head > title")
			.textContent.replace("Steam Support", " ")
			.replace(" - ", " ");
		presenceData.largeImageKey = document.querySelector<HTMLMetaElement>(
			"head > meta[property='og:image']"
		).content;
	}

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
