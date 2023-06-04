const presence = new Presence({
		clientId: "1003206856958816296",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey:
				"https://cdn.rcd.gg/PreMiD/websites/D/Discord%20ID/assets/logo.png",
			startTimestamp: browsingTimestamp,
		},
		{ hostname, href } = document.location,
		[privacy, covers, idAndTag] = await Promise.all([
			presence.getSetting<boolean>("privacy"),
			presence.getSetting<boolean>("covers"),
			presence.getSetting<boolean>("idAndTag"),
		]);

	if (hostname.includes("wiki.discord.id")) {
		const search = document.querySelector<HTMLInputElement>(
			'[placeholder="Search content…"]'
		);
		if (privacy) presenceData.details = "Browsing Wiki";
		else if (search?.value) {
			presenceData.details = "Searching for";
			presenceData.state = search.value;
		} else {
			presenceData.details = "Reading";
			presenceData.state = document.querySelector(
				'[data-testid="page.title"]'
			).textContent;
			presenceData.smallImageKey = Assets.Reading;
		}
	} else if (hostname === "discord.id") {
		if (privacy) presenceData.details = "Browsing Lookup";
		else {
			const id = document.querySelector('[class="fas fa-user"]')
					?.nextElementSibling?.nextElementSibling,
				username = document.querySelector('[class="fas fa-hashtag"]')
					?.nextElementSibling?.nextElementSibling,
				badge = document.querySelectorAll('[class="badgepng"]');
			if (
				document.querySelector<HTMLInputElement>('[id="inputid"]')?.value &&
				!document.querySelector('[id="captchaPopup___BV_modal_header_"]')
			) {
				if (covers) {
					if (badge.length > 0) {
						presenceData.smallImageKey = `${href}${badge[
							badge.length - 1
						].getAttribute("src")}`;
					}
					presenceData.largeImageKey =
						document.querySelector('[class="avyimg"]')?.getAttribute("src") ??
						"https://cdn.rcd.gg/PreMiD/websites/D/Discord%20ID/assets/logo.png";
				}
				if (idAndTag) {
					if (!username) presenceData.details = "Viewing IDs";
					else {
						presenceData.details = "Viewing user";
						presenceData.state = username.textContent.split("#")[0];
					}
				} else if (id?.textContent && username?.textContent) {
					presenceData.details = "Viewing user";
					presenceData.state = `${username.textContent} (${id.textContent})`;
				} else if (id?.textContent && !username?.textContent) {
					presenceData.details = "Viewing id";
					presenceData.state = id.textContent;
				}
			} else presenceData.details = "Browsing";
		}
	}

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
