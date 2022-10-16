const presence = new Presence({
	clientId: "609774216430092298",
});

async function getStrings() {
	return presence.getStrings(
		{
			viewing: "general.viewing",
			searchFor: "general.searchFor",
			search: "general.search",
			viewingHome: "general.viewHome",
			downloads: "premid.pageDownloads",
			browsing: "general.browsing",
			reading: "general.reading",
			readingNews: "osu!ppy.readingNews",
			viewingNews: "osu!ppy.viewingNews",
			viewNews: "osu!ppy.viewNews",
			support: "osu!ppy.support",
			beatMapListing: "osu!ppy.beatMapListing",
			beatMapPacks: "osu!ppy.beatMapPacks",
			beatMapLooking: "osu!ppy.beatMapLooking",
			featuredArtists: "osu!ppy.featuredArtists",
			osuStore: "osu!ppy.osuStore",
			kudosuRankings: "osu!ppy.kudosuRankings",
			performanceRankings: "osu!ppy.performanceRankings",
			scoreRankings: "osu!ppy.scoreRankings",
			countryRankings: "osu!ppy.countryRankings",
			forums: "osu!ppy.forums",
			for: "osu!ppy.for",
			viewingForum: "osu!ppy.viewingForum",
			readingForum: "osu!ppy.readingForum",
			spotlights: "osu!ppy.spotlights",
			chatting: "osu!ppy.chatting",
			contests: "osu!ppy.contests",
			livestreams: "osu!ppy.livestreams",
			tournaments: "osu!ppy.tournaments",
			changelog: "osu!ppy.changelog",
			friendList: "osu!ppy.friendList",
			watchLists: "osu!ppy.watchLists",
			rank: "osu!ppy.rank",
			theirProfile: "osu!ppy.theirProfile",
			otherProfile: "osu!ppy.otherProfile",
			accountSettings: "osu!ppy.accountSettings",
			unsupportedPage: "osu!ppy.unsupportedPage",
			beatmapView: "osu!ppy.beatmapView",
			wikiMainPage: "osu!ppy.wikiMainPage",
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
			largeImageKey: "logo",
		},
		[buttons, newLang] = await Promise.all([
			presence.getSetting<boolean>("buttons"),
			presence.getSetting<string>("lang"),
		]);

	if (oldLang !== newLang) {
		oldLang = newLang;
		strings = await getStrings();
	}

	if (document.location.pathname === "/home") {
		inputSelected = document.querySelector(
			"body > div:nth-child(20) > div > div > div > div > input"
		);
		if (inputSelected) {
			presenceData.details = strings.searchFor;
			presenceData.state = inputSelected.value;
			presenceData.smallImageKey = "searching";
		} else {
			presenceData.details = strings.viewingHome;
			presenceData.smallImageKey = "searching";
		}
	} else if (document.location.pathname.startsWith("/home/download")) {
		presenceData.details = strings.viewing;
		presenceData.state = strings.downloads;
		presenceData.smallImageKey = "searching";
	} else if (document.location.pathname.startsWith("/home/news")) {
		if (document.location.pathname.split("/")[3]) {
			presenceData.details = strings.readingNews;
			presenceData.state = document.querySelector(
				"div.news-show__info > h1"
			).textContent;
			presenceData.smallImageKey = "reading";

			if (buttons) {
				presenceData.buttons = [
					{
						label: strings.viewNews,
						url: document.URL,
					},
				];
			}
		} else {
			presenceData.details = strings.viewingNews;
			presenceData.smallImageKey = "searching";
		}
	} else if (document.location.pathname.startsWith("/home/support")) {
		presenceData.details = strings.viewing;
		presenceData.state = strings.support;
		presenceData.smallImageKey = "searching";
	} else if (document.location.pathname.includes("/beatmapsets")) {
		if (document.location.pathname === "/beatmapsets") {
			presenceData.details = strings.browsing;
			presenceData.state = strings.beatMapListing;
			presenceData.smallImageKey = "searching";
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
				presenceData.smallImageKey = "searching";
			}

			if (buttons) {
				presenceData.buttons = [
					{
						label: strings.beatmapView,
						url: document.URL,
					},
				];
			}
		}
	} else if (document.location.pathname.startsWith("/beatmaps/packs")) {
		presenceData.details = strings.browsing;
		presenceData.state = strings.beatMapPacks;
		presenceData.smallImageKey = "searching";
	} else if (document.location.pathname.startsWith("/beatmaps/artists")) {
		presenceData.details = strings.browsing;
		presenceData.state = strings.featuredArtists;
		presenceData.smallImageKey = "searching";
	} else if (document.location.pathname.startsWith("/store")) {
		presenceData.details = strings.browsing;
		presenceData.state = strings.osuStore;
		presenceData.smallImageKey = "searching";
	} else if (document.location.pathname.startsWith("/rankings")) {
		gamemode = document.location.pathname.split("/")[2];
		if (document.location.pathname.includes("/performance")) {
			if (
				document.querySelector("div.u-ellipsis-overflow").textContent !== "All"
			) {
				selected = document.querySelector("div.u-ellipsis-overflow");
				presenceData.details = strings.browsing;
				presenceData.state = `${strings.performanceRankings} (${strings.for
					.replace("{0}", `(${selected.textContent})`)
					.replace("{1}", `[${gamemode}]`)}`;
				presenceData.smallImageKey = "searching";
			} else {
				presenceData.details = strings.browsing;
				presenceData.state = `${strings.performanceRankings} [${gamemode}]`;
				presenceData.smallImageKey = "searching";
			}
		} else if (document.location.pathname.includes("/charts")) {
			selected = document.querySelector("div.u-ellipsis-overflow");
			presenceData.details = strings.browsing;
			presenceData.state = `${strings.spotlights} (${selected.textContent})`
				.replace("{0}", gamemode)
				.replace("{1}", selected.textContent);
			presenceData.smallImageKey = "searching";
		} else if (document.location.pathname.includes("/score")) {
			presenceData.details = strings.browsing;
			presenceData.state = `${strings.scoreRankings.replace(
				"{0}",
				`[${gamemode}]`
			)}`;
			presenceData.smallImageKey = "searching";
		} else if (document.location.pathname.includes("/country")) {
			presenceData.details = strings.browsing;
			presenceData.state = `${strings.countryRankings.replace(
				"{0}",
				`[${gamemode}]`
			)}`;
			presenceData.smallImageKey = "searching";
		}
	} else if (document.location.pathname.includes("kudosu")) {
		presenceData.details = strings.browsing;
		presenceData.state = strings.kudosuRankings;
		presenceData.smallImageKey = "searching";
	} else if (document.location.pathname.startsWith("/multiplayer/rooms")) {
		selected = document.querySelector("div.u-ellipsis-overflow");
		presenceData.details = strings.browsing;
		presenceData.state = `${selected.textContent}`;
		presenceData.smallImageKey = "searching";
	} else if (document.location.pathname.startsWith("/community/forums")) {
		if (document.location.pathname.split("/")[3] === "topics") {
			presenceData.details = strings.readingForum;
			presenceData.smallImageKey = "reading";
		} else if (
			isNaN(parseInt(document.location.pathname.split("/")[3])) === false
		) {
			forumName = document
				.querySelector("h1.forum-title__name a.link--white.link--no-underline")
				.textContent.replace(/[\n|\r][\s\S][\s\S]/g, "")
				.trimStart()
				.trimEnd();
			presenceData.details = strings.browsing;
			presenceData.state = strings.forums.replace("{0}", forumName);
			presenceData.smallImageKey = "searching";
		} else {
			presenceData.details = strings.browsing;
			presenceData.state = strings.forums.replace("{0}", "");
			presenceData.smallImageKey = "searching";
		}
	} else if (document.location.pathname.startsWith("/community/chat"))
		presenceData.details = strings.chatting;
	else if (document.location.pathname.startsWith("/community/contests")) {
		presenceData.details = strings.browsing;
		presenceData.state = strings.contests;
		presenceData.smallImageKey = "searching";
	} else if (document.location.pathname.startsWith("/community/livestreams")) {
		presenceData.details = strings.browsing;
		presenceData.state = strings.livestreams;
		presenceData.smallImageKey = "searching";
	} else if (document.location.pathname.startsWith("/community/tournaments")) {
		presenceData.details = strings.browsing;
		presenceData.state = strings.tournaments;
		presenceData.smallImageKey = "searching";
	} else if (document.location.pathname.startsWith("/home/search")) {
		inputSelected = document.querySelector("#search-input");
		if (inputSelected) {
			presenceData.details = strings.searchFor;
			presenceData.state = inputSelected.value;
			presenceData.smallImageKey = "searching";
		} else {
			presenceData.details = strings.search;
			presenceData.smallImageKey = "searching";
		}
	} else if (document.location.pathname.startsWith("/home/account/edit"))
		presenceData.details = strings.accountSettings;
	else if (document.location.pathname.startsWith("/wiki")) {
		selected = document.querySelector(
			"body > div.osu-layout__section.osu-layout__section--full.js-content.help_show > div.osu-page.osu-page--wiki > div > div.wiki-page__content > div > h1"
		);
		if (selected) {
			presenceData.details = strings.reading;
			presenceData.state = selected.textContent;
			presenceData.smallImageKey = "reading";
		} else if (document.location.pathname.includes("/Main_Page")) {
			presenceData.details = strings.reading;
			presenceData.state = strings.wikiMainPage;
			presenceData.smallImageKey = "reading";
		} else {
			selected = document.querySelector(
				"body > div.osu-layout__section.osu-layout__section--full.js-content.help_sitemap > div.osu-page.osu-page--generic"
			);
			presenceData.details = strings.reading;
			presenceData.state = selected.textContent;
			presenceData.smallImageKey = "reading";
		}
	} else if (document.location.pathname.startsWith("/home/changelog")) {
		presenceData.details = strings.viewing;
		presenceData.state = strings.changelog;
		presenceData.smallImageKey = "reading";
	} else if (document.location.pathname.startsWith("/home/friends")) {
		presenceData.details = strings.viewing;
		presenceData.state = strings.friendList;
		presenceData.smallImageKey = "reading";
	} else if (document.location.pathname.startsWith("/home/follows")) {
		presenceData.details = strings.viewing;
		presenceData.state = strings.watchLists;
		presenceData.smallImageKey = "reading";
	} else if (document.location.pathname.startsWith("/users")) {
		profileName = document.querySelector<HTMLElement>(
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
		presenceData.smallImageKey = "reading";
	} else {
		presenceData.details = strings.viewing;
		presenceData.state = strings.unsupportedPage;
	}

	presence.setActivity(presenceData);
});
