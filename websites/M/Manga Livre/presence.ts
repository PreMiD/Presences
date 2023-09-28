const presence = new Presence({
		clientId: "641409342566039558",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		largeImageKey:
			"https://cdn.rcd.gg/PreMiD/websites/M/Manga%20Livre/assets/logo.png",
		startTimestamp: browsingTimestamp,
	};

	if (document.location.hostname === "mangalivre.net") {
		if (document.location.pathname === "/")
			presenceData.details = "Browsing...";
		else if (
			document.querySelector(".page-navigation > span > em:nth-child(1)") !==
			null
		) {
			presenceData.details = `Reading '${
				document.querySelector("div.series-title > span.title").textContent
			}'`;
			presenceData.state = `Chapter ${document
				.querySelector(".current-chapter")
				.textContent.replace("Cap ", "")} - Page ${
				document.querySelector(".page-navigation > span > em:nth-child(1)")
					.textContent
			}`;
			presenceData.smallImageKey = Assets.Reading;
		} else if (document.location.pathname.includes("/manga/")) {
			presenceData.details = "Viewing the manga:";
			presenceData.state = document.querySelector(
				"#series-data > .series-info > .series-title > h1"
			).textContent;
			presenceData.smallImageKey = Assets.Reading;
		} else if (document.location.pathname.includes("/lista-de-mangas")) {
			presenceData.details = "Viewing manga list";
			presenceData.smallImageKey = Assets.Reading;
		} else if (document.location.pathname.includes("/lista-de-categorias")) {
			presenceData.details = "Viewing category list";
			presenceData.smallImageKey = Assets.Reading;
		} else if (document.location.pathname.includes("/grupos")) {
			presenceData.details = "Viewing group list";
			presenceData.smallImageKey = Assets.Reading;
		} else if (document.location.pathname.includes("/scanlator/")) {
			presenceData.details = "Viewing group:";
			presenceData.state = document.querySelector(".series-title").textContent;
		} else if (document.location.pathname.includes("/mangas/")) {
			presenceData.details = "Viewing category:";
			presenceData.state = document
				.querySelector("#wraper > div > a > div > h2")
				.textContent.replace(
					document.querySelector("#wraper > div > a > div > h2 > div > span")
						.textContent,
					""
				)
				.trim();
		}
	}

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
