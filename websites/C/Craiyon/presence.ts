const presence = new Presence({
		clientId: "1015402986534608948",
	}),
	slideshow = presence.createSlideshow(),
	logo = "https://cdn.rcd.gg/PreMiD/websites/C/Craiyon/assets/logo.png";

type State = "start" | "generation" | "results";

let browsingTimestamp: number = Date.now() / 1000,
	oldPrompt: string = null,
	activityState: State = "start";

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: logo,
			startTimestamp: browsingTimestamp,
		},
		{ pathname, href } = window.location,
		pathList = pathname.split("/").filter(Boolean);
	switch (pathList[0] ?? "/") {
		case "/": {
			const input = document.querySelector<HTMLTextAreaElement>("#prompt"),
				generationButton =
					document.querySelector<HTMLButtonElement>("#generateButton"),
				promptSettingsCheck = document.querySelector<HTMLImageElement>(
					"[alt='Style example']"
				);
			presenceData.state = input.value
				? `"${input.value}"`
				: "Waiting for input...";
			if (promptSettingsCheck) presenceData.details = "Thinking of a prompt";
			else if (generationButton.disabled) {
				if (activityState !== "generation") {
					presenceData.startTimestamp = browsingTimestamp = Date.now() / 1000;
					slideshow.deleteAllSlides();
					oldPrompt = input.textContent;
					activityState = "generation";
				}
				presenceData.details = "Generating images";
				presenceData.state = `"${oldPrompt}"`;
			} else {
				if (activityState !== "results") {
					presenceData.startTimestamp = browsingTimestamp = Date.now() / 1000;
					activityState = "results";
				}
				if (document.activeElement === input && input.value !== oldPrompt) {
					presenceData.details = "Thinking of a new prompt";
					slideshow.deleteAllSlides();
				} else {
					presenceData.details = "Viewing results";
					presenceData.state = `"${oldPrompt}"`;
					const images = document.querySelectorAll<HTMLImageElement>(
						".image-container img"
					);
					for (const [i, image] of images.entries()) {
						const presenceDataCopy = Object.assign({}, presenceData);
						presenceDataCopy.largeImageKey = image.src;
						slideshow.addSlide(`image${i}`, presenceDataCopy, 5000);
					}
				}
			}
			break;
		}
		case "image": {
			presenceData.details = "Viewing an image";
			presenceData.state = (
				document
					.evaluate("//p[text()='Prompt']", document.body)
					.iterateNext() as HTMLParagraphElement
			).nextElementSibling;
			presenceData.largeImageKey =
				document.querySelector<HTMLImageElement>("main img").src;
			presenceData.buttons = [
				{
					label: "View Image Details",
					url: href,
				},
			];
			break;
		}
		case "blog": {
			if (pathList.length > 1) {
				presenceData.details = "Reading a blog post";
				presenceData.state = document.querySelector("h1");
				presenceData.largeImageKey =
					document.querySelector<HTMLImageElement>("main p + img").src;
				presenceData.buttons = [
					{
						label: "View Blog Post",
						url: href,
					},
				];
			} else {
				presenceData.details = "Browsing blog posts";
			}
			break;
		}
		case "privacy": {
			presenceData.details = "Reading privacy policy";
			break;
		}
		case "terms": {
			presenceData.details = "Reading terms and conditions";
			break;
		}
	}
	if (presenceData.details) {
		if (slideshow.getSlides().length > 0) presence.setActivity(slideshow);
		else presence.setActivity(presenceData);
	} else presence.setActivity();
});
