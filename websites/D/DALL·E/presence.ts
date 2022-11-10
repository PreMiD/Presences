const presence = new Presence({
		clientId: "1037407267336753152",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000),
	slideshow = presence.createSlideshow();

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: "https://i.imgur.com/i6UPLX2.png",
			startTimestamp: browsingTimestamp,
		},
		{ pathname } = window.location,
		showImages = await presence.getSetting<boolean>("showImages");

	if (pathname === "") {
	} else if (pathname.startsWith("/history")) {
	} else if (pathname.startsWith("/c/")) {
		if (showImages) {
			const imageData = [
				...document.querySelectorAll<HTMLDivElement>(
					".image-prompt-overlay-container"
				),
			].map(container => [
				container.querySelector<HTMLImageElement>(".generated-image > img").src,
				container.querySelector<HTMLDivElement>(".image-prompt-overlay")
					.textContent,
			]);
			for (let i = 0; i < imageData.length; i++) {
				const [image, text] = imageData[i];
				slideshow.addSlide(
					i.toString(),
					{
						...presenceData,
						details: `Viewing collection: ${
							document.querySelector<HTMLDivElement>("[class*=h3]").textContent
						}`,
						state: text,
						largeImageKey: image,
					},
					5000
				);
			}
		} else {
			presenceData.details = "Viewing a collection";
			presenceData.state =
				document.querySelector<HTMLDivElement>("[class*=h3]").textContent;
		}
	} else if (pathname.startsWith("/collections")) {
		presenceData.details = "Viewing collections";
	} else if (pathname.startsWith("/account")) {
		presenceData.details = "Viewing their account";
	} else if (pathname.startsWith("/e/")) {
	} else if (pathname.startsWith("/s/")) {
	} else {
	}

	presence.setActivity(presenceData);
});
