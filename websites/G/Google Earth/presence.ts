const presence = new Presence({
		clientId: "1034133591938060298",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: "https://i.imgur.com/bsN9g4H.png",
			startTimestamp: browsingTimestamp,
		},
		{ pathname } = window.location;

	if (pathname === "/web/") {
		presenceData.details = "Loading";
	} else {
		const appRoot = document.querySelector("earth-app").shadowRoot,
			knowledgeCard = appRoot.querySelector("earth-knowledge-card"),
			drawerContainer = appRoot.querySelector("paper-drawer-panel"),
			drawerRoot = drawerContainer.querySelector("earth-drawer").shadowRoot;
		if (pathname.startsWith("/web/search/")) {
			presenceData.details = "Searching";
			presenceData.state = drawerRoot
				.querySelector("earth-search")
				.shadowRoot.querySelector("app-header-layout")
				.querySelector("earth-omnibox")
				.shadowRoot.querySelector<HTMLInputElement>("iron-input > input").value;
		} else {
			if (knowledgeCard.getAttribute("hidden") !== "true") {
				const mainCardRoot =
					knowledgeCard.shadowRoot.querySelector("#top-card").shadowRoot;
				presenceData.details = "Looking at a location";
				presenceData.state = `${
					mainCardRoot.querySelector<HTMLDivElement>("#title").textContent
				} - ${
					mainCardRoot.querySelector<HTMLDivElement>("#known-for").textContent
				}`;
			} else if (knowledgeCard.getAttribute("expanded") === "") {
				const expandedCartRoot = document
					.querySelector("earth-expanded-card")
					.shadowRoot.querySelector("app-header-layout")
					.querySelector<HTMLDivElement>("#card-content");
				presenceData.details = "Viewing more information about a location";
				presenceData.state = `${
					expandedCartRoot.querySelector<HTMLDivElement>("#title").textContent
				} - ${
					expandedCartRoot.querySelector<HTMLDivElement>("#known-for")
						.textContent
				}`;
			} else {
				presenceData.details = "Looking at a point on the map";
				presenceData.state = document
					.querySelector<HTMLSpanElement>("#pointer-coordinates")
					.textContent.trim();
			}
		}
	}

	presence.setActivity(presenceData);
});
