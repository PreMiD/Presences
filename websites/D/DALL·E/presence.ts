const presence = new Presence({
		clientId: "1037407267336753152",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000),
	slideshow = presence.createSlideshow();

function getListImages() {
	return [
		...document.querySelectorAll<HTMLDivElement>(
			".image-prompt-overlay-container"
		),
	].map(container => [
		container.querySelector<HTMLImageElement>(".generated-image > img").src,
		container.querySelector<HTMLDivElement>(".image-prompt-overlay")
			.textContent,
	]);
}

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: "https://i.imgur.com/i6UPLX2.png",
			startTimestamp: browsingTimestamp,
		},
		{ pathname, href } = window.location,
		showImages = await presence.getSetting<boolean>("showImages");

	if (pathname === "/") {
	} else if (pathname.startsWith("/history")) {
		if (showImages) {
			const images = getListImages();
			if (images.length > 0) {
				for (let i = 0; i < images.length; i++) {
					const [image, text] = images[i];
					slideshow.addSlide(
						i.toString(),
						{
							...presenceData,
							details: "Viewing history",
							state: text,
							largeImageKey: image,
						},
						5000
					);
				}
			} else {
				presenceData.details = "Viewing history";
			}
		} else {
			presenceData.details = "Viewing history";
		}
	} else if (pathname.startsWith("/c/")) {
		if (showImages) {
			const imageData = getListImages();
			for (let i = 0; i < imageData.length; i++) {
				const [image, text] = imageData[i],
					slide = {
						...presenceData,
						details: `Viewing collection: ${
							document.querySelector<HTMLDivElement>("[class*=h3]").textContent
						}`,
						state: text,
						largeImageKey: image,
					};
				if (
					!document.querySelector<HTMLDivElement>(
						".collection-layout-private"
					) &&
					!pathname.includes("/private")
				) {
					slide.buttons = [
						{
							label: "View Collection",
							url: href,
						},
					];
				}
				slideshow.addSlide(i.toString(), slide, 5000);
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
		if (showImages) {
			const images = [
				...document.querySelectorAll<HTMLImageElement>(
					".generated-image > img"
				),
			].map(image => image.src);
			for (let i = 0; i < images.length; i++) {
				slideshow.addSlide(
					i.toString(),
					{
						...presenceData,
						details: "Viewing a generation",
						state: document.querySelector<HTMLInputElement>(
							".image-prompt-input"
						).value,
						largeImageKey: images[i],
					},
					5000
				);
			}
		} else {
			presenceData.details = "Viewing a generation";
			presenceData.state = document.querySelector<HTMLInputElement>(
				".image-prompt-input"
			).value;
		}
	} else if (pathname.startsWith("/s/")) {
		presenceData.details = "Viewing an image";
		presenceData.state = document.querySelector<HTMLHeadingElement>(
			".gen-detail-caption"
		).textContent;
		presenceData.buttons = [{ label: "View Image", url: href }];
		if (showImages) {
			presenceData.largeImageKey = document.querySelector<HTMLImageElement>(
				".generated-image > img"
			).src;
		}
	} else {
		presenceData.details = "Browsing";
		presenceData.state = document.title.match(/^(.*)?( \| DALL·E)?$/)[1];
	}

	if (presenceData.details) {
		presence.setActivity(presenceData);
		slideshow.deleteAllSlides();
	} else if (slideshow.getSlides().length > 0) {
		presence.setActivity(slideshow);
	} else {
		presence.setActivity();
	}
});
