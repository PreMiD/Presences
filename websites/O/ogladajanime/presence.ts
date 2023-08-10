const presence = new Presence({ clientId: "1137362720254074972" }),
	browsingTimestamp = Math.floor(Date.now() / 1000),
	anime: HTMLElement = document.querySelector("#anime_name_id"),
	animeicon = document.querySelector(".img-fluid.lozad");

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		startTimestamp: browsingTimestamp,
		largeImageKey: "https://i.imgur.com/xHce23t.png",
	};

	if (document.location.pathname === "/main2")
		presenceData.details = "Przegląda stronę główną";
	else if (document.location.pathname.includes("/search/name/"))
		presenceData.details = "Szuka Anime";
	else if (document.location.pathname.includes("/chat"))
		presenceData.details = "Rozmawia na chacie";
	else if (document.location.pathname.includes("/anime_list/")) {
		presenceData.details = "Przegląda listę Anime";
		presenceData.buttons = [
			{ label: "Zobacz Listę Anime", url: document.location.href },
		];
	} else if (document.location.pathname.includes("/anime")) {
		if (anime) {
			presenceData.details = anime.textContent;
			presenceData.smallImageKey = "https://i.imgur.com/xHce23t.png";
			presenceData.buttons = [
				{ label: "Obejrzyj Teraz", url: document.location.href },
			];

			const episodeNumber =
				parseInt(document.location.href.split("/").pop() || "1", 10) || 1;
			presenceData.state = `Odcinek : ${episodeNumber}`;
		}

		if (animeicon) {
			presenceData.largeImageKey = animeicon
				.getAttribute("data-srcset")
				.split(" ")[0];
		}
	}
	presence.setActivity(presenceData);
});
