interface AnchorItem {
	text: string;
	id: string;
}

const presence = new Presence({
		clientId: "1081479845940314114",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000),
	IDLE_TIMEOUT = 10 * 60 * 1000;

let sidebar: string = null,
	scrollPercentage = 0,
	lastActivity: number = Date.now();

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: "large",
			startTimestamp: browsingTimestamp,
		},
		{ pathname, search } = window.location,
		title = document.title.split(" | ")[0];

	switch (true) {
		case lastActivity + IDLE_TIMEOUT < Date.now(): {
			presenceData.smallImageKey = "idle";
			presenceData.smallImageText = "Idling...";
			presenceData.details = "Idling at page: ";
			presenceData.state = title;
			presenceData.startTimestamp = Math.floor(lastActivity / 1000);

			break;
		}

		case pathname.startsWith("/search"): {
			presenceData.smallImageKey = "search";
			presenceData.smallImageText = "Searching...";
			presenceData.details = "Searching for something...";

			if (search) {
				presenceData.details = "Searching for:";
				presenceData.state = [
					search.split("q=")[1],
					`(${
						document.querySelector<HTMLDivElement>("main")?.childElementCount ??
						0
					} results)`,
				].join(" ");

				presenceData.buttons = [
					{
						label: "Show Results",
						url: location.href,
					},
				];
			}

			break;
		}

		case !!sidebar: {
			presenceData.smallImageKey = "search";
			presenceData.smallImageText = "Searching...";
			presenceData.details = "Selecting a category:";
			presenceData.state = sidebar;

			break;
		}

		default: {
			const contents = [
				...document.querySelectorAll<HTMLDivElement>(".anchor").values(),
			];

			let topmost: AnchorItem = null;

			if (contents.length) {
				const topmostElem = [...contents].sort((a, b) => {
					const [{ y: y1, h: h1 }, { y: y2, h: h2 }] = [a, b].map(e => ({
						y: e.getBoundingClientRect().y,
						h: e.clientHeight + parseInt(getComputedStyle(e).marginTop) * 5,
					}));

					if (y1 < h1 && y2 < h2) return y2 - y1;

					return y1 - y2;
				});

				topmost = {
					text: topmostElem[0].textContent,
					id: topmostElem[0].id,
				};
			}

			presenceData.smallImageKey = "read";
			presenceData.smallImageText = "Reading...";
			presenceData.details = `Reading ${title} page:`;
			presenceData.state = [
				topmost?.text ?? null,
				`(${scrollPercentage.toFixed(2)}%)`,
			]
				.filter(Boolean)
				.join(" ");
			presenceData.buttons = [
				{
					label: "Read Page",
					url: [location.href, topmost?.id].filter(Boolean).join("#"),
				},
			];

			break;
		}
	}

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});

document.addEventListener("mouseover", e => {
	const target = e.target as HTMLElement;

	if (target.classList.contains("menu__link")) sidebar = target.textContent;
	else if (!target.classList.contains("menu")) sidebar = null;

	lastActivity = Date.now();
});

document.addEventListener("scroll", () => {
	const { scrollY, innerHeight } = window,
		{ scrollHeight } = document.body;

	scrollPercentage = (scrollY / (scrollHeight - innerHeight)) * 100;

	lastActivity = Date.now();
});
