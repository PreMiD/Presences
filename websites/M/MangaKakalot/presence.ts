const presence = new Presence({
		clientId: "698217762660548799",
	}),
	browsingTimestamp = ~~(Date.now() / 1000);

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		largeImageKey:
			"https://cdn.rcd.gg/PreMiD/websites/M/MangaKakalot/assets/logo.png",
		startTimestamp: browsingTimestamp,
	};

	switch (location.hostname) {
		case "mangakakalot.com": {
			if (document.location.pathname.includes("/chapter")) {
				const [title, chapterNum] = document
					.querySelector("div.info-top-chapter > h2")
					.textContent.split("Chapter");

				presenceData.details = title;
				presenceData.state = `CHAPTER ${chapterNum}`;
				presenceData.smallImageKey = Assets.Reading;
			} else if (document.location.pathname.includes("/manga_list")) {
				const [, genre] = document
					.querySelector(".breadcrumb.breadcrumbs > p > span:nth-child(3) > a")
					.textContent.split(":");

				presenceData.details = "Viewing genre:";
				presenceData.state = genre;
			} else if (
				location.pathname.includes("/manga") ||
				location.pathname.includes("/read")
			) {
				presenceData.details = "Viewing manga:";
				presenceData.state = document.querySelector(
					".manga-info-text > li > h1"
				).textContent;
			} else if (location.pathname.includes("/latest"))
				presenceData.details = "Viewing the latest mangas";
			else if (document.location.pathname.includes("/search")) {
				presenceData.details = "Searching for:";
				presenceData.state = document
					.querySelector(".title.update-title")
					.textContent.split(" ")[1]
					.replaceAll("_", " ");
				presenceData.smallImageKey = Assets.Search;
			} else presenceData.details = "Browsing...";
			break;
		}

		case "manganato.com": {
			if (location.pathname.includes("/chapter")) {
				const [title, chapterNum] = document
					.querySelector(".info-top-chapter > h2")
					.textContent.split("Chapter");

				presenceData.details = title;
				presenceData.state = `CHAPTER ${chapterNum}`;
				presenceData.smallImageKey = Assets.Reading;
			} else if (location.pathname.includes("/manga")) {
				presenceData.details = "Viewing manga:";
				presenceData.state = document.querySelector(
					".story-info-right > h1"
				).textContent;
			} else if (location.pathname.includes("/genre")) {
				presenceData.details = "Viewing genre:";
				presenceData.state = document
					.querySelector(".panel-breadcrumb > a:nth-child(3)")
					.textContent.split(":")[1];
			} else if (location.pathname.includes("/search")) {
				presenceData.details = "Searching for:";
				presenceData.state = document
					.querySelector(".panel-breadcrumb")
					.childNodes[4].textContent.split(":")[1]
					.trim()
					.replaceAll("_", " ");
				presenceData.smallImageKey = Assets.Search;
			} else presenceData.details = "Browsing...";

			break;
		}
	}

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
