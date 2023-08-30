const presence = new Presence({
	clientId: "609774216430092298",
});

async function getStrings() {
	return presence.getStrings(
		{
			accountSettings: "osu!ppy.accountSettings",
			beatMapListing: "osu!ppy.beatMapListing",
			beatMapLooking: "osu!ppy.beatMapLooking",
			beatMapPacks: "osu!ppy.beatMapPacks",
			browsing: "general.browsing",
			buttonReadArticle: "general.buttonReadArticle",
			buttonViewBeatmap: "osu!ppy.buttonViewBeatmap",
			buttonViewProfile: "general.buttonViewProfile",
			changelog: "osu!ppy.changelog",
			chatting: "osu!ppy.chatting",
			contests: "osu!ppy.contests",
			countryRankings: "osu!ppy.countryRankings",
			downloads: "premid.pageDownloads",
			featuredArtists: "osu!ppy.featuredArtists",
			for: "osu!ppy.for",
			forums: "osu!ppy.forums",
			friendList: "osu!ppy.friendList",
			kudosuRankings: "osu!ppy.kudosuRankings",
			livestreams: "osu!ppy.livestreams",
			osuStore: "osu!ppy.osuStore",
			otherProfile: "osu!ppy.otherProfile",
			performanceRankings: "osu!ppy.performanceRankings",
			rank: "osu!ppy.rank",
			reading: "general.reading",
			readingAnArticle: "general.readingAnArticle",
			readingArticle: "general.readingArticle",
			readingForum: "osu!ppy.readingForum",
			readingNews: "general.readingNews",
			scoreRankings: "osu!ppy.scoreRankings",
			search: "general.search",
			searchFor: "general.searchFor",
			spotlights: "osu!ppy.spotlights",
			support: "osu!ppy.support",
			theirProfile: "osu!ppy.theirProfile",
			tournaments: "osu!ppy.tournaments",
			unsupportedPage: "osu!ppy.unsupportedPage",
			viewing: "general.viewing",
			viewingForum: "osu!ppy.viewingForum",
			viewingHome: "general.viewHome",
			watchLists: "osu!ppy.watchLists",
			wikiMainPage: "general.wikiMainPage",
		},
		await presence.getSetting<string>("lang").catch(() => "en")
	);
}

let beatmapTitle: string,
	profileName: string,
	profileRanking: string,
	rank: string,
	pp: string,
	title: string,
	diffName: string,
	selected: Element,
	gamemode: string,
	forumName: string,
	inputSelected: HTMLInputElement,
	strings: Awaited<ReturnType<typeof getStrings>>,
	oldLang: string = null;

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey:
				"https://cdn.rcd.gg/PreMiD/websites/O/osu%20ppy/assets/logo.png",
		},
		[buttons, newLang] = await Promise.all([
			presence.getSetting<boolean>("buttons"),
			presence.getSetting<string>("lang"),
		]),
		{ pathname, href } = document.location;

	if (oldLang !== newLang) {
		oldLang = newLang;
		strings = await getStrings();
	}

	if (pathname === "/home") {
		inputSelected = document.querySelector<HTMLInputElement>('[type="search"]');
		if (inputSelected?.value) {
			presenceData.details = strings.searchFor;
			presenceData.state = inputSelected.value;
			presenceData.smallImageKey = Assets.Search;
		} else {
			presenceData.details = strings.viewingHome;
			presenceData.smallImageKey = Assets.Search;
		}
	} else if (pathname.startsWith("/home/download")) {
		presenceData.details = strings.viewing;
		presenceData.state = strings.downloads;
		presenceData.smallImageKey = Assets.Search;
	} else if (pathname.startsWith("/home/news")) {
		if (pathname.split("/")[3]) {
			presenceData.details = strings.readingArticle;
			presenceData.state = document.querySelector(
				"div.news-show__info > h1"
			).textContent;
			presenceData.smallImageKey = Assets.Reading;

			presenceData.buttons = [
				{
					label: strings.buttonReadArticle,
					url: href,
				},
			];
		} else {
			presenceData.details = strings.readingAnArticle;
			presenceData.smallImageKey = Assets.Search;
		}
	} else if (pathname.startsWith("/home/support")) {
		presenceData.details = strings.viewing;
		presenceData.state = strings.support;
		presenceData.smallImageKey = Assets.Search;
	} else if (pathname.includes("/beatmapsets")) {
		if (pathname === "/beatmapsets") {
			presenceData.details = strings.browsing;
			presenceData.state = strings.beatMapListing;
			presenceData.smallImageKey = Assets.Search;
		} else {
			title = document.querySelector(
				".beatmapset-header__details-text--title"
			).textContent;
			diffName = document.querySelector(
				".beatmapset-header__diff-name"
			).textContent;
			if (title && diffName) {
				(beatmapTitle = `${title} [${diffName}]`),
					(presenceData.details = strings.beatMapLooking);
				presenceData.state = beatmapTitle;
				presenceData.smallImageKey = Assets.Search;
			}

			presenceData.buttons = [
				{
					label: strings.buttonViewBeatmap,
					url: href,
				},
			];
		}
	} else if (pathname.startsWith("/beatmaps/packs")) {
		presenceData.details = strings.browsing;
		presenceData.state = strings.beatMapPacks;
		presenceData.smallImageKey = Assets.Search;
	} else if (pathname.startsWith("/beatmaps/artists")) {
		presenceData.details = strings.browsing;
		presenceData.state = strings.featuredArtists;
		presenceData.smallImageKey = Assets.Search;
	} else if (pathname.startsWith("/store")) {
		presenceData.details = strings.browsing;
		presenceData.state = strings.osuStore;
		presenceData.smallImageKey = Assets.Search;
	} else if (pathname.startsWith("/rankings")) {
		gamemode = pathname.split("/")[2];
		if (pathname.includes("/performance")) {
			if (
				document.querySelector("div.u-ellipsis-overflow").textContent !== "All"
			) {
				selected = document.querySelector("div.u-ellipsis-overflow");
				presenceData.details = strings.browsing;
				presenceData.state = `${strings.performanceRankings} (${strings.for
					.replace("{0}", `(${selected.textContent})`)
					.replace("{1}", `[${gamemode}]`)}`;
				presenceData.smallImageKey = Assets.Search;
			} else {
				presenceData.details = strings.browsing;
				presenceData.state = `${strings.performanceRankings} [${gamemode}]`;
				presenceData.smallImageKey = Assets.Search;
			}
		} else if (pathname.includes("/charts")) {
			selected = document.querySelector("div.u-ellipsis-overflow");
			presenceData.details = strings.browsing;
			presenceData.state = `${strings.spotlights} (${selected.textContent})`
				.replace("{0}", gamemode)
				.replace("{1}", selected.textContent);
			presenceData.smallImageKey = Assets.Search;
		} else if (pathname.includes("/score")) {
			presenceData.details = strings.browsing;
			presenceData.state = `${strings.scoreRankings.replace(
				"{0}",
				`[${gamemode}]`
			)}`;
			presenceData.smallImageKey = Assets.Search;
		} else if (pathname.includes("/country")) {
			presenceData.details = strings.browsing;
			presenceData.state = `${strings.countryRankings.replace(
				"{0}",
				`[${gamemode}]`
			)}`;
			presenceData.smallImageKey = Assets.Search;
		}
	} else if (pathname.includes("kudosu")) {
		presenceData.details = strings.browsing;
		presenceData.state = strings.kudosuRankings;
		presenceData.smallImageKey = Assets.Search;
	} else if (pathname.startsWith("/multiplayer/rooms")) {
		selected = document.querySelector("div.u-ellipsis-overflow");
		presenceData.details = strings.browsing;
		presenceData.state = `${selected.textContent}`;
		presenceData.smallImageKey = Assets.Search;
	} else if (pathname.startsWith("/community/forums")) {
		if (pathname.split("/")[3] === "topics") {
			presenceData.details = strings.readingForum;
			presenceData.smallImageKey = Assets.Reading;
		} else if (isNaN(parseInt(pathname.split("/")[3])) === false) {
			forumName = document
				.querySelector("h1.forum-title__name a.link--white.link--no-underline")
				.textContent.replace(/[\n|\r][\s\S][\s\S]/g, "")
				.trimStart()
				.trimEnd();
			presenceData.details = strings.browsing;
			presenceData.state = strings.forums.replace("{0}", forumName);
			presenceData.smallImageKey = Assets.Search;
		} else {
			presenceData.details = strings.browsing;
			presenceData.state = strings.forums.replace("{0}", "");
			presenceData.smallImageKey = Assets.Search;
		}
	} else if (pathname.startsWith("/community/chat"))
		presenceData.details = strings.chatting;
	else if (pathname.startsWith("/community/contests")) {
		presenceData.details = strings.browsing;
		presenceData.state = strings.contests;
		presenceData.smallImageKey = Assets.Search;
	} else if (pathname.startsWith("/community/livestreams")) {
		presenceData.details = strings.browsing;
		presenceData.state = strings.livestreams;
		presenceData.smallImageKey = Assets.Search;
	} else if (pathname.startsWith("/community/tournaments")) {
		presenceData.details = strings.browsing;
		presenceData.state = strings.tournaments;
		presenceData.smallImageKey = Assets.Search;
	} else if (pathname.startsWith("/home/search")) {
		inputSelected = document.querySelector("#search-input");
		if (inputSelected) {
			presenceData.details = strings.searchFor;
			presenceData.state = inputSelected.value;
			presenceData.smallImageKey = Assets.Search;
		} else {
			presenceData.details = strings.search;
			presenceData.smallImageKey = Assets.Search;
		}
	} else if (pathname.startsWith("/home/account/edit"))
		presenceData.details = strings.accountSettings;
	else if (pathname.startsWith("/wiki")) {
		selected = document.querySelector('[class="osu-md osu-md--wiki"] > h1');
		if (selected) {
			presenceData.details = strings.reading;
			presenceData.state = selected.textContent;
			presenceData.smallImageKey = Assets.Reading;
		} else if (pathname.includes("/Main_Page")) {
			presenceData.details = strings.reading;
			presenceData.state = strings.wikiMainPage;
			presenceData.smallImageKey = Assets.Reading;
		} else {
			selected = document.querySelector(
				"body > div.osu-layout__section.osu-layout__section--full.js-content.help_sitemap > div.osu-page.osu-page--generic"
			);
			presenceData.details = strings.reading;
			presenceData.state = selected.textContent;
			presenceData.smallImageKey = Assets.Reading;
		}
	} else if (pathname.startsWith("/home/changelog")) {
		presenceData.details = strings.viewing;
		presenceData.state = strings.changelog;
		presenceData.smallImageKey = Assets.Reading;
	} else if (pathname.startsWith("/home/friends")) {
		presenceData.details = strings.viewing;
		presenceData.state = strings.friendList;
		presenceData.smallImageKey = Assets.Reading;
	} else if (pathname.startsWith("/home/follows")) {
		presenceData.details = strings.viewing;
		presenceData.state = strings.watchLists;
		presenceData.smallImageKey = Assets.Reading;
	} else if (pathname.startsWith("/users")) {
		profileName = document.querySelector(
			"a.simple-menu__header.simple-menu__header--link.js-current-user-cover > div"
		).textContent;
		rank = document.querySelector(
			"div:nth-child(1) > div.value-display__value > div"
		).textContent;
		pp = document.querySelector(
			"div.profile-detail__values.profile-detail__values--grid > div:nth-child(2) > div.value-display__value > div"
		).textContent;
		profileRanking = `${strings.rank.replace("{0}", rank)} / ${pp}pp`;
		presenceData.details =
			document.querySelector("div.profile-info__info > h1 > span")
				.textContent === profileName
				? strings.theirProfile.replace("{0}", profileName)
				: strings.otherProfile.replace("{0}", profileName);
		presenceData.state = profileRanking;
		presenceData.smallImageKey = Assets.Reading;
		presenceData.buttons = [
			{
				label: strings.buttonViewProfile,
				url: href,
			},
		];
	} else {
		presenceData.details = strings.viewing;
		presenceData.state = strings.unsupportedPage;
	}

	if (!buttons && presenceData.buttons) delete presenceData.buttons;
	presence.setActivity(presenceData);
});
