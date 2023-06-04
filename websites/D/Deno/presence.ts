const presence = new Presence({
		clientId: "843058683100266526",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

const enum Assets {
	Logo = "https://cdn.rcd.gg/PreMiD/websites/D/Deno/assets/logo.png",
	NewsLogo = "https://cdn.rcd.gg/PreMiD/websites/D/Deno/assets/0.png",
	MerchLogo = "https://cdn.rcd.gg/PreMiD/websites/D/Deno/assets/1.png",
}

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: Assets.Logo,
			startTimestamp: browsingTimestamp,
		},
		{ href, hash, hostname, pathname } = document.location,
		[privacy, buttons] = await Promise.all([
			presence.getSetting<boolean>("privacy"),
			presence.getSetting<boolean>("buttons"),
		]),
		search = document.querySelector<HTMLInputElement>('[id="search-input"]'),
		pathnameSplit = pathname.split("/");
	if (privacy) {
		presenceData.largeImageKey = Assets.Logo;
		presenceData.details = "Browsing";
		presence.setActivity(presenceData);
		return;
	}
	switch (hostname) {
		case "deno.land": {
			if (search?.value) {
				presenceData.details = "Searching for";
				presenceData.state = search.value;
				presenceData.smallImageKey = Assets.Search;
			} else if (pathname.includes("/manual")) {
				presenceData.buttons = [
					{
						label: "Read Manual",
						url: href,
					},
				];
				presenceData.state = "Manual";
				presenceData.smallImageKey = Assets.Reading;
				presenceData.smallImageText = "Reading";
				presenceData.details =
					document.querySelector('[class="anchor"]').parentElement.textContent;
			} else {
				switch (pathnameSplit[1]) {
					case "": {
						presenceData.details = "Viewing homepage";
						break;
					}
					case "blog": {
						presenceData.buttons = [
							{
								label: "Read Blog",
								url: href,
							},
						];
						presenceData.details = "Reading the blog";
						presenceData.smallImageKey = Assets.Reading;
						presenceData.smallImageText = "Reading";
						break;
					}
					case "x": {
						presenceData.buttons = [
							{
								label: "Explore Modules",
								url: href,
							},
						];

						if (document.querySelector('[class="text-default"]')) {
							presenceData.details = "Viewing third party module";
							presenceData.state = document
								.querySelector("title")
								?.textContent.split("|")[0];
						} else {
							presenceData.smallImageKey = Assets.Reading;
							presenceData.smallImageText = "Reading";
							presenceData.details = "Reading about third party modules";
						}
						break;
					}
				}
			}
			break;
		}
		case "doc.deno.land": {
			presenceData.buttons = [
				{
					label: "View Docs",
					url: href,
				},
			];
			presenceData.details = `Viewing ${
				!hash ? "deno" : `${hash.replace("#", "")}'s`
			} (${document.querySelector('[class="truncate"]').textContent} version)`;
			break;
		}
		case "deno.com": {
			switch (pathnameSplit[1]) {
				case "": {
					presenceData.details = "Viewing homepage";
					break;
				}
				case "blog": {
					presenceData.buttons = [
						{
							label: "View Blog",
							url: href,
						},
					];
					presenceData.smallImageKey = Assets.Reading;
					presenceData.smallImageText = "Reading";
					if (document.querySelector("article")) {
						presenceData.details = "Reading an article about";
						presenceData.state =
							document.querySelector("article").firstElementChild.textContent;
					} else presenceData.details = "Reading the blog";
					break;
				}
				case "deploy": {
					switch (pathnameSplit[2]) {
						case "subhosting": {
							presenceData.buttons = [
								{
									label: "View Subhosting",
									url: href,
								},
							];
							presenceData.details = "Viewing the subhosting page";
							break;
						}
						case "docs": {
							presenceData.buttons = [
								{
									label: "View Docs",
									url: href,
								},
							];
							presenceData.smallImageKey = Assets.Reading;
							presenceData.smallImageText = "Reading";
							presenceData.details = "Reading an article about";
							presenceData.state =
								document.querySelector("article").firstElementChild.textContent;
							break;
						}
						case "pricing": {
							presenceData.buttons = [
								{
									label: "View Pricing",
									url: href,
								},
							];
							presenceData.details = "Viewing deno's pricing";
							break;
						}
						case "":
						default: {
							presenceData.buttons = [
								{
									label: "View The Deploy Page",
									url: href,
								},
							];
							presenceData.details = "Viewing the deploy page";
							break;
						}
					}
					break;
				}
			}
			break;
		}
		case "deno.news": {
			presenceData.buttons = [
				{
					label: "View The News",
					url: href,
				},
			];
			presenceData.largeImageKey = Assets.NewsLogo;
			presenceData.details = "Viewing the news page";
			break;
		}
		case "denostatus.com": {
			presenceData.buttons = [
				{
					label: "View Deno's Status",
					url: href,
				},
			];
			presenceData.details = "Viewing deno's status";
			break;
		}
		case "merch.deno.com": {
			presenceData.largeImageKey = Assets.MerchLogo;
			presenceData.buttons = [
				{
					label: "View Merge Store",
					url: href,
				},
			];
			presenceData.details = "Viewing deno's merch store";
			break;
		}
	}
	if (!buttons) delete presenceData.buttons;
	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
