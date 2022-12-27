const presence = new Presence({
		clientId: "612299892764966923",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000),
	subsection = new URL(document.location.href).searchParams.get("subsection");
let AppName: HTMLElement,
	title: HTMLElement,
	pfname: HTMLElement,
	SeachTerm: HTMLElement;

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		details: "Unknown page",
		largeImageKey: "lg",
	};

	if (document.location.hostname === "steamcommunity.com") {
		presenceData.details = "Steam Community";

		if (document.location.pathname === "/" || !document.location.pathname) {
			if (subsection) {
				presenceData.state = `Browsing ${subsection}`;
				presenceData.startTimestamp = browsingTimestamp;
			} else {
				presenceData.state = "Homepage";
				presenceData.startTimestamp = browsingTimestamp;
			}
		} else if (document.location.pathname.includes("/filedetails/")) {
			presenceData.details = "Viewing a community post";
			presenceData.state = document
				.querySelector<HTMLTitleElement>("head > title")
				.textContent.replace("Steam Community :: ", " ")
				.replace("::", "|");
			presenceData.startTimestamp = browsingTimestamp;
			presenceData.buttons = [
				{
					label: "View the page",
					url: document.location.href,
				},
			];
		} else if (
			document.location.pathname.includes("/id") ||
			document.location.pathname.includes("/profiles")
		) {
			if (
				document.location.pathname.includes("/badges") ||
				document.location.pathname.includes("/games") ||
				document.location.pathname.includes("/inventory") ||
				document.location.pathname.includes("/recommended") ||
				document.location.pathname.includes("/gamecards") ||
				document.location.pathname.includes("/awards")
			) {
				pfname = document.querySelector(
					"#responsive_page_template_content > div > div.profile_small_header_bg > div > div > span.profile_small_header_name > a"
				)?.textContent.trim();
				if (
					document.location.pathname.includes("/badges") ||
					document.location.pathname.includes("/gamecards")
				)
					presenceData.state = `Viewing ${pfname}'s badges`;
				else if (document.location.search.includes("tab=recent"))
					presenceData.state = `Viewing ${pfname}'s recently played games`;
				else if (document.location.pathname.includes("/awards"))
					presenceData.state = `Viewing ${pfname}'s profile awards`;
				else if (document.location.search.includes("tab=perfect"))
					presenceData.state = `Viewing ${pfname}'s perfected games`;
				else if (document.location.search.includes("tab=all"))
					presenceData.state = `Viewing ${pfname}'s games`;
				else if (document.location.pathname.includes("/inventory"))
					presenceData.state = `Viewing ${pfname}'s inventory`;
				else if (document.location.pathname.includes("/recommended"))
					presenceData.state = `Viewing ${pfname}'s reviews`;
				else presenceData.state = `Viewing ${pfname}'s profile details`;
			} else if (
				document.location.pathname.includes("/screenshots") ||
				document.location.pathname.includes("/images") ||
				document.location.pathname.includes("/videos") ||
				document.location.pathname.includes("/myworkshopfiles")
			) {
				pfname = document.querySelector("#HeaderUserInfoName > a").textContent;
				if (document.location.pathname.includes("/screenshots"))
					presenceData.state = `Viewing ${pfname}'s screenshots`;
				else if (document.location.pathname.includes("/images"))
					presenceData.state = `Viewing ${pfname}'s artworks`;
				else if (document.location.pathname.includes("/videos"))
					presenceData.state = `Viewing ${pfname}'s videos`;
				else if (document.location.search.includes("section=guides"))
					presenceData.state = `Viewing ${pfname}'s guides`;
				else if (document.location.search.includes("section=collections"))
					presenceData.state = `Viewing ${pfname}'s workshop collections`;
				else if (document.location.search.includes("section=merchandise"))
					presenceData.state = `Viewing ${pfname}'s merchandise`;
				else presenceData.state = `Viewing ${pfname}'s workshop items`;
			} else if (
				document.location.pathname.includes("/friends") ||
				document.location.pathname.includes("/groups")
			) {
				pfname = document.querySelector("head > title").textContent;
				if (document.location.pathname.includes("/friends")) {
					if (document.location.pathname.includes("/common"))
						presenceData.state = `Viewing ${pfname}'s friends in common`;
					else presenceData.state = `Viewing ${pfname}'s friends list`;
				} else if (document.location.pathname.includes("/groups")) {
					if (document.location.pathname.includes("/common"))
						presenceData.state = `Viewing ${pfname}'s groups in common`;
					else presenceData.state = `Viewing ${pfname}'s joined groups`;
				} else presenceData.state = `Viewing ${pfname}'s social details`;
			} else if (document.location.pathname.includes("/home"))
				presenceData.state = "Browsing the activity page";
			else {
				presenceData.smallImageKey = "lg";
				presenceData.largeImageKey = document.querySelector<HTMLMetaElement>(
					"head > meta[property='og:image']"
				).content;
				presenceData.state = `Viewing ${document
					.querySelector<HTMLTitleElement>("head > title")
					.textContent.replace("Steam Community :: ", " ")}'s profile`;
				presenceData.buttons = [
					{
						label: "Visit the profile page",
						url: document.location.href,
					},
				];
			}
		} else if (document.location.pathname.includes("/followedgames")) {
			presenceData.state = "Browsing follwing games.";

			presenceData.startTimestamp = browsingTimestamp;
		} else if (document.location.pathname.includes("/search/users")) {
			presenceData.details = "Searching for a user: ";

			presenceData.state = `Username: ${
				document.querySelector<HTMLInputElement>("#search_text_box").value
			}`;
			presenceData.startTimestamp = browsingTimestamp;
			presenceData.smallImageKey = "search";
		} else if (document.location.pathname.includes("/app/")) {
			title = document
				.querySelector("head > title")
				.textContent.replace("Steam Community :: ", " ");
			if (document.location.pathname.includes("/workshop/")) {
				presenceData.details = "Steam Workshop";
				presenceData.state = `Browsing through${title} submissions`;
				presenceData.startTimestamp = browsingTimestamp;
			} else if (document.location.pathname.includes("/discussions")) {
				if (document.location.pathname.includes("/0/")) {
					presenceData.details = "Viewing a discussion page";
					presenceData.state = title
						.replace("General ", " ")
						.replace("::", "|");
					presenceData.buttons = [
						{
							label: "Go to the discussion page",
							url: document.location.href,
						},
					];
				} else {
					presenceData.state = document
						.querySelector<HTMLElement>("head > title")
						.textContent.replace(" :: Steam Community", " ");
					presenceData.startTimestamp = browsingTimestamp;
				}
			} else if (document.location.pathname.includes("/screenshots")) {
				presenceData.state = `Screenshots for ${title}`;
				presenceData.startTimestamp = browsingTimestamp;
			} else if (document.location.pathname.includes("/images")) {
				presenceData.state = `${title} Artworks`;
				presenceData.startTimestamp = browsingTimestamp;
			} else if (document.location.pathname.includes("/broadcasts")) {
				if (document.location.pathname.includes("/watch/")) {
					presenceData.startTimestamp = browsingTimestamp;
					presenceData.state = "Watching a broadcast";
					presenceData.buttons = [
						{
							label: "Watch now!",
							url: document.location.href,
						},
					];
				} else presenceData.state = `Browsing${title} live broadcasts`;
			} else if (document.location.pathname.includes("/videos")) {
				presenceData.state = `Browsing through${title} videos`;
				presenceData.startTimestamp = browsingTimestamp;
			} else if (document.location.pathname.includes("/allnews")) {
				presenceData.state = `Reading news about${title}`;
				presenceData.startTimestamp = browsingTimestamp;
			} else if (document.location.pathname.includes("/guides")) {
				presenceData.state = `Browsing in${title} guides`;
				presenceData.startTimestamp = browsingTimestamp;
			} else if (document.location.pathname.includes("/reviews")) {
				presenceData.state = `Reading reviews about${title}`;
				presenceData.startTimestamp = browsingTimestamp;
			} else {
				presenceData.details = `${title} Community Hub`;
				presenceData.startTimestamp = browsingTimestamp;
				presenceData.buttons = [
					{
						label: "View the community homepage",
						url: document.location.href,
					},
				];
			}
		} else if (document.location.pathname.includes("/market")) {
			presenceData.startTimestamp = browsingTimestamp;
			if (document.location.pathname.includes("/listings/")) {
				presenceData.details = "Community Market item listings for";
				presenceData.state = document
					.querySelector<HTMLTitleElement>("head > title")
					.textContent.replace("Steam Community Market :: Listings for ", " ");
				presenceData.buttons = [
					{
						label: "Go to the item page",
						url: document.location.href,
					},
				];
				presenceData.smallImageKey = "lg";
				presenceData.largeImageKey = document.querySelector<HTMLMetaElement>(
					"head > meta[property='og:image']"
				).content;
			} else presenceData.details = "Steam Community Market";
		} else if (document.location.pathname.includes("/workshop")) {
			title = document.querySelector("head > title").textContent;
			presenceData.startTimestamp = browsingTimestamp;
			if (document.location.pathname.includes("/browse/"))
				presenceData.state = `Searching in ${title} workshop items`;
			else if (document.location.pathname.includes("/discussions/"))
				presenceData.state = "Workshop item discussions";
			else if (document.location.pathname.includes("/about/"))
				presenceData.state = `Reading about${title.replace(
					"Steam Community :: ",
					" "
				)} workshop`;
			else presenceData.state = "Workshop's main page";
		} else if (document.location.pathname.includes("/discussions/")) {
			if (document.location.pathname === "/discussions/")
				presenceData.state = "Discussion hub";
			else {
				presenceData.details = "Browsing Steam forums";
				presenceData.state = `${document
					.querySelector<HTMLTitleElement>("head > title")
					.textContent.replace("::", "|")} discussions`;
				presenceData.buttons = [
					{
						label: "Read more",
						url: document.location.href,
					},
				];
			}
		} else if (document.location.pathname.includes("/broadcast/")) {
			presenceData.state = `Watching${document
				.querySelector<HTMLTitleElement>("head > title")
				.textContent.replace("Steam Community :: ", " ")
				.replace(" :: Broadcast", " ")}'s broadcast`;
			presenceData.startTimestamp = browsingTimestamp;
		} else if (document.location.pathname.includes("/chat/")) {
			presenceData.state = "Online Chat";
			presenceData.startTimestamp = browsingTimestamp;
		} else if (document.location.pathname.includes("/tradeoffer/")) {
			presenceData.state = "Sending a trade offer";
			presenceData.startTimestamp = browsingTimestamp;
		}
	} else if (document.location.hostname === "store.steampowered.com") {
		presenceData.details = "Steam Store";

		if (document.location.pathname === "/" || !document.location.pathname) {
			presenceData.state = "Home";
			presenceData.startTimestamp = browsingTimestamp;
		} else if (document.location.pathname.includes("/app/")) {
			AppName = document.querySelector("#appHubAppName");
			presenceData.state = AppName.textContent;
			presenceData.startTimestamp = browsingTimestamp;
			presenceData.smallImageKey = "lg";
			presenceData.largeImageKey = document.querySelector<HTMLMetaElement>(
				"head > meta[property='og:image']"
			).content;
			presenceData.buttons = [
				{
					label: "Visit the store page",
					url: document.location.href,
				},
			];
		} else if (document.location.pathname.includes("/account")) {
			presenceData.state = "Viewing their account prefrences";
			presenceData.startTimestamp = browsingTimestamp;
		} else if (document.location.pathname.includes("/cart")) {
			presenceData.state = "Viewing cart";
			presenceData.startTimestamp = browsingTimestamp;
		} else if (document.location.pathname.includes("/checkout")) {
			presenceData.state = "In checkout";
			presenceData.startTimestamp = browsingTimestamp;
		} else if (document.location.pathname.includes("/wishlist")) {
			presenceData.state = `Viewing ${
				document.querySelector<HTMLTitleElement>("head > title").textContent
			}`;
			presenceData.startTimestamp = browsingTimestamp;
		} else if (document.location.pathname.includes("/games")) {
			presenceData.state = "Browsing games...";
			presenceData.startTimestamp = browsingTimestamp;
		} else if (document.location.pathname.includes("/genre")) {
			const parts = document.location.href.split("/");
			presenceData.state = `Exploring ${parts[parts.length - 2].replaceAll(
				"%20",
				" "
			)} games`;
			presenceData.startTimestamp = browsingTimestamp;
		} else if (document.location.pathname.includes("/demos")) {
			presenceData.state = "Browsing demos...";
			presenceData.startTimestamp = browsingTimestamp;
		} else if (document.location.pathname.includes("/category")) {
			presenceData.state = `Exploring ${
				document.querySelector<HTMLTitleElement>("head > title").textContent
			} games`;
			presenceData.startTimestamp = browsingTimestamp;
		} else if (document.location.pathname.includes("/vr/")) {
			presenceData.state = "Browsing VR games...";
			presenceData.startTimestamp = browsingTimestamp;
		} else if (document.location.pathname.includes("/pccafe")) {
			presenceData.state = "Browsing PC Cafe games...";
			presenceData.startTimestamp = browsingTimestamp;
		} else if (document.location.pathname.includes("/tags")) {
			const parts = document.location.href.split("/");
			presenceData.details = "Browsing in Store Tags";
			presenceData.state = parts[parts.length - 2]
				.replaceAll("%20", " ")
				.replaceAll("%26", "&");
			presenceData.startTimestamp = browsingTimestamp;
		} else if (document.location.pathname.includes("/points/")) {
			presenceData.details = "Steam Points Shop";
			presenceData.startTimestamp = browsingTimestamp;
		} else if (document.location.pathname.includes("/labs/")) {
			presenceData.details = "in Steam Labs";
			presenceData.startTimestamp = browsingTimestamp;
		} else if (document.location.pathname.includes("/macos")) {
			presenceData.state = "Browsing Mac OS X games...";
			presenceData.startTimestamp = browsingTimestamp;
		} else if (document.location.pathname.includes("/about")) {
			presenceData.state = "Reading more about Steam";
			presenceData.startTimestamp = browsingTimestamp;
		} else if (document.location.pathname.includes("/linux")) {
			presenceData.state = "Browsing Linux + Steam OS games...";
			presenceData.startTimestamp = browsingTimestamp;
		} else if (document.location.pathname.includes("/software")) {
			presenceData.state = "Viewing Software category";
			presenceData.startTimestamp = browsingTimestamp;
		} else if (document.location.pathname.includes("/controller")) {
			presenceData.state = "Browsing Controller friendly games";
			presenceData.startTimestamp = browsingTimestamp;
		} else if (document.location.pathname.includes("/remoteplay_hub")) {
			presenceData.state = "Remote Play hub";
			presenceData.startTimestamp = browsingTimestamp;
		} else if (document.location.pathname.includes("/soundtracks")) {
			presenceData.state = "Browsing Soundtracks...";
			presenceData.startTimestamp = browsingTimestamp;
		} else if (document.location.pathname.includes("/vrhardware")) {
			presenceData.state = "Viewing VR hardwares page...";
			presenceData.startTimestamp = browsingTimestamp;
		} else if (document.location.pathname.includes("/steamdeck")) {
			presenceData.state = "Viewing Steam Deck page...";
			presenceData.startTimestamp = browsingTimestamp;
		} else if (document.location.pathname.includes("/greatondeck")) {
			presenceData.state = "Recommended Steam Deck games";
			presenceData.startTimestamp = browsingTimestamp;
		} else if (document.location.pathname.includes("/steamlink")) {
			presenceData.state = "Steam Link";
			presenceData.startTimestamp = browsingTimestamp;
		} else if (document.location.pathname.includes("/news")) {
			presenceData.state = "Reading the news...";
			presenceData.startTimestamp = browsingTimestamp;
		} else if (document.location.pathname.includes("/about")) {
			presenceData.state = "About";
			presenceData.startTimestamp = browsingTimestamp;
		} else if (document.location.pathname.includes("/recommended")) {
			presenceData.state = "Browsing recommended games...";
			presenceData.startTimestamp = browsingTimestamp;
		} else if (document.location.pathname.includes("/upcoming/")) {
			presenceData.state = "Exploring upcoming games...";
			presenceData.startTimestamp = browsingTimestamp;
		} else if (document.location.pathname.includes("/explore")) {
			presenceData.state = "Exploring games...";
			presenceData.startTimestamp = browsingTimestamp;
		} else if (document.location.pathname.includes("/updated")) {
			presenceData.state = "Recently updated games";
			presenceData.startTimestamp = browsingTimestamp;
		} else if (
			document.location.pathname.includes("/communityrecommendations")
		) {
			presenceData.state = "Exploring in community recommendations";
			presenceData.startTimestamp = browsingTimestamp;
		} else if (document.location.pathname.includes("/curators")) {
			presenceData.state = "Viewing Steam Curators page";
			presenceData.startTimestamp = browsingTimestamp;
		} else if (document.location.pathname.includes("/developer/")) {
			presenceData.details = "Viewing a Develoaper Page";
			presenceData.state = document
				.querySelector<HTMLTitleElement>("head > title")
				.textContent.replace("Steam Developer: ", " ");
			presenceData.startTimestamp = browsingTimestamp;
			presenceData.buttons = [
				{
					label: "View the page",
					url: document.location.href,
				},
			];
			presenceData.largeImageKey = document.querySelector<HTMLMetaElement>(
				"head > meta[property='og:image']"
			).content;
		} else if (document.location.pathname.includes("/publisher/")) {
			presenceData.details = "Viewing a Publisher Page";
			presenceData.state = document
				.querySelector<HTMLTitleElement>("head > title")
				.textContent.replace("Steam Publisher: ", " ");
			presenceData.startTimestamp = browsingTimestamp;
			presenceData.buttons = [
				{
					label: "View the page",
					url: document.location.href,
				},
			];
			presenceData.smallImageKey = "lg";
			presenceData.largeImageKey = document.querySelector<HTMLMetaElement>(
				"head > meta[property='og:image']"
			).content;
		} else if (document.location.pathname.includes("/franchise/")) {
			presenceData.details = "Viewing a Game Franchise";
			presenceData.state = document
				.querySelector<HTMLTitleElement>("head > title")
				.textContent.replace("Steam Franchise: ", " ");
			presenceData.startTimestamp = browsingTimestamp;
			presenceData.buttons = [
				{
					label: "View the page",
					url: document.location.href,
				},
			];
			presenceData.smallImageKey = "lg";
			presenceData.largeImageKey = document.querySelector<HTMLMetaElement>(
				"head > meta[property='og:image']"
			).content;
		} else if (document.location.pathname.includes("/curator")) {
			presenceData.state = "Viewing a Steam Curator page";
			presenceData.startTimestamp = browsingTimestamp;
		} else if (document.location.pathname.includes("/specials")) {
			presenceData.state = "Viewing special offers";
			presenceData.startTimestamp = browsingTimestamp;
		} else if (document.location.pathname.includes("/charts")) {
			presenceData.startTimestamp = browsingTimestamp;
			presenceData.details = "Steam Store Charts";
			if (document.location.pathname.includes("topselling"))
				presenceData.state = "Top 100 Selling Games";
			else if (document.location.pathname.includes("mostplayed"))
				presenceData.state = "Top 100 Played Games";
			else if (document.location.pathname.includes("topsellers")) {
				const parted = document.location.href.split("/");
				presenceData.state = `Top Sellers for ${parted[parted.length - 1]}`;
			} else if (document.location.pathname.includes("topnewreleases")) {
				const parted = document.location.href.split("/");
				presenceData.state = `Top new releases for${parted[parted.length - 1]
					.replace("top_", " ")
					.replace("_", " ")}`;
			} else
				presenceData.state = "Top selling and top played games across Steam";
		} else if (document.location.pathname.includes("/stats")) {
			presenceData.state = "Steam & Games Stats.";
			presenceData.startTimestamp = browsingTimestamp;
		} else if (document.location.pathname.includes("/search")) {
			presenceData.startTimestamp = browsingTimestamp;
			const SeachTerm = new URL(document.location.href).searchParams.get(
				"term"
			);
			if (SeachTerm === null) presenceData.state = "Searching...";
			else {
				presenceData.state = `Searching for ${new URL(
					document.location.href
				).searchParams.get("term")}`;
				presenceData.smallImageKey = "search";
			}
		}
	} else if (document.location.hostname === "help.steampowered.com") {
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

	presence.setActivity(presenceData);
});
