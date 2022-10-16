const presence = new Presence({
		clientId: "1015402986534608948",
	}),
	slideshow = presence.createSlideshow(),
	logo = "https://i.imgur.com/uCqmcTv.png";

type State = "start" | "generation" | "results";

let browsingTimestamp: number = Date.now() / 1000,
	oldPrompt: string = null,
	activityState: State = "start";

const uploadedURLs: Record<string, string> = {};
function uploadImage(url: string) {
	return new Promise<string>(resolve => {
		if (uploadedURLs[url]) return resolve(uploadedURLs[url]);
		// Prevents uploading the same image twice due to race conditions
		uploadedURLs[url] = logo;
		try {
			fetch(url)
				.then(r => r.arrayBuffer())
				.then(file => {
					return fetch("https://bashupload.com", {
						method: "POST",
						body: file,
					})
						.then(r => r.text())
						.then(x => x.match(/https(.*)/)?.[0]);
				})
				.then(uploadURL => {
					uploadedURLs[url] = uploadURL;
					setTimeout(() => {
						presence.info(uploadURL);
						resolve(uploadURL);
					}, 750);
				});
		} catch (err) {
			presence.error(err);
			resolve(url);
		}
	});
}

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: logo,
			startTimestamp: browsingTimestamp,
		},
		{ pathname } = window.location;
	switch (pathname) {
		case "/": {
			const input = document.querySelector<HTMLDivElement>("#prompt"),
				container = document.querySelector<HTMLDivElement>(
					".h-full.w-full > .relative > div > div"
				);
			presenceData.state = input.textContent
				? `"${input.textContent}"`
				: "Waiting for input...";
			if (container.querySelector("svg.text-gray-300"))
				presenceData.details = "Thinking of a prompt";
			else if (
				input.nextElementSibling
					.querySelector("img")
					.classList.contains("animate-wiggle")
			) {
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
				if (
					document.activeElement === input &&
					input.textContent !== oldPrompt
				) {
					presenceData.details = "Thinking of a new prompt";
					slideshow.deleteAllSlides();
				} else if (container.childElementCount > 3) {
					presenceData.details = "Viewing results";
					presenceData.state = `"${oldPrompt}"`;
					const imageURLs = [...container.children].map(child => {
						return (child.firstElementChild as HTMLImageElement).src;
					});
					for (const [i, imageURL] of imageURLs.entries()) {
						const presenceDataCopy = Object.assign({}, presenceData);
						presenceDataCopy.largeImageKey = await uploadImage(imageURL);
						slideshow.addSlide(`image${i}`, presenceDataCopy, 5000);
					}
				} else {
					if (slideshow.getSlides().length > 0) slideshow.deleteAllSlides();
					presenceData.details = "Viewing a generated image";
					presenceData.state = `"${oldPrompt}"`;
					presenceData.largeImageKey = await uploadImage(
						container.querySelector("img").src
					);
				}
			}
			break;
		}
		case "/privacy": {
			presenceData.details = "Reading privacy policy";
			break;
		}
		case "/terms": {
			presenceData.details = "Reading terms and conditions";
			break;
		}
	}
	if (presenceData.details) {
		if (slideshow.getSlides().length > 0) presence.setActivity(slideshow);
		else presence.setActivity(presenceData);
	} else presence.setActivity();
});
