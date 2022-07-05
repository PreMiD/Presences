interface PageContext {
	middleware: (ref: Window, ...args: unknown[]) => boolean;
	exec: (
		context: Presence,
		presenceData: PresenceData,
		options?: { [key: string]: unknown }
	) => Promise<PresenceData> | PresenceData;
}
interface LocalizedStrings {
	[key: string]: string;
}

interface ExecutionArguments {
	showWatch?: boolean;
	strings: LocalizedStrings;
	images: { [key: string]: string };
	[key: string]: unknown;
}

function getQuery() {
	const queryString = location.search.split("?", 2),
		query =
			queryString && queryString.length > 0 && queryString[1]
				? queryString[1].split("&").reduce(function (l, r) {
						const entry = r ? r.split("=", 2) : null;
						if (entry === null) return l;
						return Object.assign(l, { [entry[0]]: entry[1] });
				  }, {})
				: {};
	return query;
}
function capitalizeFirstLetter(string: string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}
function matchYoutubeUrl(url: string): boolean {
	return !!url.match(
		/^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube\.com|youtu.be))(\/(?:[\w-]+\?v=|embed\/|v\/)?)([\w-]+)(\S+)?$/gm
	);
}
function getSourceLink(url: string): { label: string; url: string }[] {
	if (!url) return [];
	if (matchYoutubeUrl(url)) {
		return [
			{
				label: "Watch Youtube Source",
				url,
			},
		];
	}
	return [];
}
const pages: PageContext[] = [
		{
			middleware: ref =>
				!!ref.location.pathname.match(
					/^\/(hot|tags|rising|fresh|feed|rising|stories|random|bookmarks|likes|weekly|best|stories|royal\.coubs)/gi
				) || ref.location.pathname === "/",
			exec: (
				context,
				data,
				{ showWatch, strings, images }: ExecutionArguments
			) => {
				if (!context) return null;
				const activeMedia = document.querySelector<HTMLElement>(
					".coub[coub-block].active"
				);
				if (!activeMedia) return null;
				const title = activeMedia
						.querySelector(".description__title")
						?.textContent?.trim(),
					activeTab =
						document.querySelector<HTMLElement>(
							".page__content .page-menu > .page-menu__inner > .page-menu__item.-active"
						) ||
						document.querySelector<HTMLElement>(
							".best2020__container .page-menu > .page-menu__inner > .page-menu__item.-active"
						) ||
						document.querySelector<HTMLElement>(
							".page__content .story__header"
						),
					isCoubPicks = location.pathname.startsWith("/royal.coubs"),
					activeTabTitle =
						activeTab?.textContent?.trim() ||
						activeTab?.dataset?.title ||
						"Feed";
				if (!title) return null;
				const pageType = document
					.querySelector(".page__content")
					?.getAttributeNames()
					?.map(x => x.match(/^pages-(\w+)-page/i))
					.filter(x => !!x && x.length > 1 && x[1])
					.map(x => capitalizeFirstLetter(x[1]));
				data.state = `Browsing ${
					isCoubPicks && activeTabTitle.match(/^(\w+)/gi)
						? activeTabTitle.match(/^(\w+)/gi)[0]
						: activeTabTitle
				}${
					pageType?.length > 0 &&
					activeTabTitle.toLowerCase() !== pageType[0].toLowerCase()
						? ` in ${pageType[0]}`
						: document.querySelector(".page__content .page-menu.weekly__menu")
						? " in Weekly"
						: location.pathname.startsWith("/best")
						? " in Best of the Year"
						: isCoubPicks
						? " in Coub Picks"
						: ""
				}`;
				data.details = `${title}${
					activeMedia.querySelector(
						".coub__like-button[widget-like-button].-on"
					)
						? " (❤)"
						: ""
				}`;
				data.smallImageKey =
					activeMedia.querySelector("video")?.paused === false
						? images.PLAY
						: images.PAUSE;
				if (showWatch) {
					data.buttons.push(
						...[
							{
								label: strings.watchVideo,
								url: `${document.location.origin}/view/${activeMedia.dataset.permalink}`,
							},
							...getSourceLink(
								activeMedia.querySelector<HTMLAnchorElement>(
									".description__stamp a.description__stamp__source"
								)?.href
							),
						]
					);
				}
				return data;
			},
		},
		{
			middleware: ref =>
				!!ref.document.querySelector(".hero-cover[channel-id]"),
			exec: (
				context,
				data,
				{ showWatch, strings, images }: ExecutionArguments
			) => {
				if (!context) return null;
				const activeMedia = document.querySelector<HTMLElement>(
					".coub[coub-block].active"
				);
				if (!activeMedia) return null;
				const title = activeMedia
						.querySelector(".description__title")
						.textContent?.trim(),
					userName = document.querySelector<HTMLHeadingElement>(
						".channel__description > h1[title]"
					).title,
					activeTab =
						document.querySelector<HTMLElement>(
							".page__content .page-menu > .page-menu__inner > .page-menu__item.-active"
						) ||
						document.querySelector<HTMLElement>(
							".best2020__container .page-menu > .page-menu__inner > .page-menu__item.-active"
						) ||
						document.querySelector<HTMLElement>(
							".page__content .story__header"
						);

				if (!title || !userName) return null;
				data.state = `Browsing ${
					activeTab?.textContent.trimStart().split("\n")[0]?.trim() ||
					activeTab?.dataset?.title ||
					"Feed"
				} from ${userName}`;
				data.details = `${title}${
					activeMedia.querySelector(
						".coub__like-button[widget-like-button].-on"
					)
						? " (❤)"
						: ""
				}`;
				data.smallImageKey =
					activeMedia.querySelector("video")?.paused === false
						? images.PLAY
						: images.PAUSE;
				if (showWatch) {
					data.buttons.push(
						...[
							{
								label: strings.watchVideo,
								url: `${document.location.origin}/view/${activeMedia.dataset.permalink}`,
							},
							{
								label: strings.viewProfil,
								url: `${document.location.origin}/${
									document.location.pathname.split("/")[1]
								}`,
							},
						]
					);
				}
				return data;
			},
		},
		{
			middleware: ref => !!ref.location.pathname.match(/^\/view\/(.*)/gi),
			exec: (
				context,
				data,
				{ strings, showWatch, images }: ExecutionArguments
			) => {
				if (!context) return null;
				const activeMedia =
					document.querySelector<HTMLElement>(".coub[coub-block]");
				if (!activeMedia) return null;
				const title = activeMedia
					.querySelector(".coub__description h5.description__title")
					?.textContent?.trim();

				if (!title) return null;
				data.state = strings.watching;
				data.details = `${title}${
					activeMedia.querySelector(
						".coub__like-button[widget-like-button].-on"
					)
						? " (❤)"
						: ""
				}`;
				data.smallImageKey =
					activeMedia.querySelector("video")?.paused === false
						? images.PLAY
						: images.PAUSE;

				if (showWatch) {
					data.buttons.push(
						...[
							{
								label: strings.watchVideo,
								url: document.location.href,
							},
							...getSourceLink(
								activeMedia.parentElement.querySelector<HTMLAnchorElement>(
									'.coub__info .media-block__item > a[type="embedPopup"]'
								)?.href
							),
						]
					);
				}
				return data;
			},
		},
		{
			middleware: ref => !!ref.location.pathname.match(/^\/(community)/gi),
			exec: (
				context,
				data,
				{ showWatch, strings, images }: ExecutionArguments
			) => {
				if (!context) return null;
				const communityParent = document.querySelector(
					".hot__community[data-community-id]"
				);
				if (!communityParent) return null;
				const activeMedia = document.querySelector<HTMLElement>(".coub.active");
				if (!activeMedia) return null;
				const communityTitle = communityParent
						.querySelector(".description > .title > h2")
						?.textContent?.trim(),
					title = activeMedia
						.querySelector(".description__title")
						?.textContent?.trim();

				if (!communityTitle || !title) return null;
				data.state = `Browsing ${communityTitle} in ${
					communityParent.parentElement.querySelector<HTMLElement>(
						".page-menu.hot__menu > .page-menu__inner > .page-menu__item.-active"
					)?.dataset?.title || "Hot"
				}`;
				data.smallImageKey =
					activeMedia.querySelector("video")?.paused === false
						? images.PLAY
						: images.PAUSE;
				data.details = `${title}`;
				if (showWatch) {
					data.buttons.push(
						...[
							{
								label: strings.watchVideo,
								url: `${document.location.origin}/view/${activeMedia.dataset.permalink}`,
							},
							...getSourceLink(
								activeMedia.querySelector<HTMLAnchorElement>(
									".description__stamp a.description__stamp__source"
								)?.href
							),
						]
					);
				}

				return data;
			},
		},
		{
			middleware: ref => !!ref.window,
			exec: (context, data, { strings }: { strings: { browsing: string } }) => {
				if (!context) return null;
				data.state = strings.browsing;
				data.details = "";
				if (data.smallImageKey) delete data.smallImageKey;
				return data;
			},
		},
	],
	presence = new Presence({
		clientId: "818598086984728576",
	});

let currentLang: string, localizedStrings: { [key: string]: string };
const IMAGES = {
	PLAY: "playx1024",
	PAUSE: "pausex1024",
};
presence.on("UpdateData", async () => {
	const newLang = await presence.getSetting<string>("lang");
	if (newLang !== currentLang) {
		currentLang = newLang;
		localizedStrings = await presence.getStrings(
			{
				browsing: "presence.activity.browsing",
				watching: "presence.playback.playing",
				watchVideo: "general.buttonWatchVideo",
				viewProfile: "general.buttonViewProfile",
			},
			newLang
		);
	}
	const query: { [key: string]: unknown } = getQuery(),
		context = pages.find(x => x.middleware(window, [query]));
	if (!context) return;

	const result = await Promise.resolve(
		context.exec(
			presence,
			{
				largeImageKey: "logo",
			},
			{
				strings: localizedStrings,
				query,
				images: IMAGES,
				showWatch: await presence
					.getSetting<boolean>("show_button_watching")
					.catch(() => true),
			}
		)
	);
	if (!result) {
		presence.setActivity({
			largeImageKey: "logo",
			state: localizedStrings.browsing,
		});
	} else if (result.details) presence.setActivity(result);
});
