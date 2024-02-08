const presence = new Presence({
		clientId: "928372793438011433",
	}),
	browsingStamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
	const [time, cover, roomCode] = await Promise.all([
			presence.getSetting<boolean>("time"),
			presence.getSetting<boolean>("cover"),
			presence.getSetting<boolean>("roomCode"),
		]),
		presenceData: PresenceData = {
			largeImageKey:
				"https://cdn.rcd.gg/PreMiD/websites/J/Just%20Dance%20Now/assets/logo.png",
			startTimestamp: browsingStamp,
		};

	if (document.querySelector("html").className.includes("vip")) {
		presenceData.smallImageKey =
			"https://cdn.discordapp.com/app-assets/928372793438011433/928774626350358598.png?size=512";
	}
	presenceData.smallImageText = "VIP";
	if (document.querySelector("div.logo"))
		presenceData.details = "Viewing Homepage";
	else if (
		document.querySelector("html").className.includes("state-afterdance")
	) {
		presenceData.details = "Scores";
		presenceData.state = document
			.querySelector(".song-detail__title")
			.firstElementChild.textContent.replace(" - ALTERNATE", "");
		if (cover) {
			presenceData.largeImageKey = (
				document.querySelector(".item-selected").firstElementChild
					.firstElementChild as HTMLImageElement
			).src;
		}
		if (roomCode) {
			presenceData.details = `Scores (${
				document.querySelector(".danceroom__number").textContent
			})`;
		}
	} else if (
		document.querySelector("html").className.includes("state-tutorial")
	) {
		presenceData.details = "Tutorial";
		presenceData.state = document
			.querySelector(".song-detail__title")
			.firstElementChild.textContent.replace(" - ALTERNATE", "");
		if (cover) {
			presenceData.largeImageKey = (
				document.querySelector(".item-selected").firstElementChild
					.firstElementChild as HTMLImageElement
			).src;
		}
		if (roomCode) {
			presenceData.details = `Tutorial (${
				document.querySelector(".danceroom__number").textContent
			})`;
		}
	} else if (document.querySelector("html").className.includes("state-dance")) {
		presenceData.details = "Playing";
		presenceData.state = document
			.querySelector(".song-detail__title")
			.firstElementChild.textContent.replace(" - ALTERNATE", "");
		[presenceData.startTimestamp, presenceData.endTimestamp] =
			presence.getTimestampsfromMedia(
				document.querySelector("#in-game_video") as HTMLVideoElement
			);
		if (cover) {
			presenceData.largeImageKey = (
				document.querySelector(".item-selected").firstElementChild
					.firstElementChild as HTMLImageElement
			).src;
		}
		if (roomCode) {
			presenceData.details = `Playing (${
				document.querySelector(".danceroom__number").textContent
			})`;
		}
	} else if (
		document.querySelector("html").className.includes("state-coachselection")
	) {
		presenceData.details = "Coach Selection";
		presenceData.state = `${document
			.querySelector(".coach-selection__details-song")
			.textContent.replace(" - ALTERNATE", "")}`;
		if (roomCode) {
			presenceData.details = `Coach Selection (${
				document.querySelector(".danceroom__number").textContent
			})`;
		}
		if (cover) {
			presenceData.largeImageKey = (
				document.querySelector(".item-selected").firstElementChild
					.firstElementChild as HTMLImageElement
			).src;
		}
	} else if (
		document.querySelector("html").className.includes("state-songselection") &&
		document.querySelector<HTMLLIElement>(".selected").title === "Playlists"
	) {
		presenceData.details = `Browsing ${
			document.querySelector(".selected").childNodes[3].textContent
		}`;
		if (
			document.querySelector(".song-grid--title").textContent !== "Song Library"
		) {
			presenceData.state =
				document.querySelector(".song-grid--title").textContent;
			if (cover) {
				presenceData.largeImageKey = (
					document.querySelector(".playlist--banner__selected")
						.firstElementChild as HTMLImageElement
				).src;
			}
		}
		if (roomCode) {
			presenceData.details = `Browsing ${
				document.querySelector(".selected").childNodes[3].textContent
			} (${document.querySelector(".danceroom__number").textContent})`;
		}
		if (document.querySelector(".item-selected")) {
			presenceData.state = document
				.querySelector(".song-detail__title")
				.firstElementChild.textContent.replace(" - ALTERNATE", "");
			if (cover) {
				presenceData.largeImageKey = (
					document.querySelector(".item-selected").firstElementChild
						.firstElementChild as HTMLImageElement
				).src;
			}
		}
	} else if (
		document.querySelector("html").className.includes("state-songselection") &&
		document.querySelector<HTMLLIElement>(".selected").title === "Songs"
	) {
		presenceData.details = `Browsing ${
			document.querySelector(".selected").childNodes[3].textContent
		}`;
		if (document.querySelector(".item-selected")) {
			presenceData.state = document
				.querySelector(".song-detail__title")
				.firstElementChild.textContent.replace(" - ALTERNATE", "");
			if (cover) {
				presenceData.largeImageKey = (
					document.querySelector(".item-selected").firstElementChild
						.firstElementChild as HTMLImageElement
				).src;
			}
		}
		if (roomCode) {
			presenceData.details = `Browsing ${
				document.querySelector(".selected").childNodes[3].textContent
			} (${document.querySelector(".danceroom__number").textContent})`;
		}
	}

	if (!time) delete presenceData.startTimestamp;

	presence.setActivity(presenceData);
});
