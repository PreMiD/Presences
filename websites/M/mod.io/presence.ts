const presence = new Presence({
		clientId: "1023277091392868372",
	}),
	browsingStamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: "https://i.imgur.com/kl7hgZe.png",
			startTimestamp: browsingStamp,
		},
		{ pathname, href, hostname, search } = window.location,
		pathSplit = pathname.split("/").filter(x => x);

	switch (hostname) {
		case "mod.io": {
			switch (pathSplit[0] ?? "") {
				case "": {
					presenceData.details = "Browsing homepage";
					break;
				}
				case "g": {
					if (pathSplit[1] === "add") {
						presenceData.details = "Adding a game";
						presenceData.state =
							document.querySelector<HTMLHeadingElement>("h1").textContent;
					} else {
						const gameImageURL = getComputedStyle(
								document.querySelector<HTMLDivElement>("#container [role=img]")
							).backgroundImage.match(/url\("(.+)"\)/)[1],
							gameName = document.querySelector<HTMLAnchorElement>(
								"#container a[href*='/g/']"
							).textContent;
						switch (pathSplit[2] ?? "") {
							case "": {
								presenceData.details = `Browsing mods for ${gameName}`;
								presenceData.largeImageKey = gameImageURL;
								presenceData.buttons = [
									{
										label: "View game mods",
										url: href,
									},
								];
								break;
							}
							case "m": {
								if (pathSplit[4] === "admin") {
									presenceData.details = "Managing a mod";
									presenceData.state =
										document.querySelector<HTMLHeadingElement>(
											"h1"
										).textContent;
								} else {
									presenceData.details = `Viewing a mod for ${gameName}`;
									presenceData.state =
										document.querySelector<HTMLHeadingElement>(
											"h1"
										).textContent;
									presenceData.smallImageKey = gameImageURL;
									presenceData.smallImageText = gameName;
									presenceData.largeImageKey = getComputedStyle(
										document.querySelector<HTMLDivElement>(
											"a[href*='/m/'] > div[role=img]"
										)
									).backgroundImage.match(/url\("(.+)"\)/)[1];
									presenceData.buttons = [
										{
											label: "View mod",
											url: href,
										},
									];
								}
								break;
							}
							case "r": {
								if (pathSplit[3]) {
									presenceData.details = `Reading a guide for ${gameName}`;
									presenceData.state =
										document.querySelector<HTMLHeadingElement>(
											"h1"
										).textContent;
									presenceData.smallImageKey = gameImageURL;
									presenceData.smallImageText = gameName;
									presenceData.largeImageKey = getComputedStyle(
										document.querySelector<HTMLDivElement>(
											"a[href*='/r/'] > div[role=img]"
										)
									).backgroundImage.match(/url\("(.+)"\)/)[1];
									presenceData.buttons = [
										{
											label: "View guide",
											url: href,
										},
									];
								} else {
									presenceData.details = `Browsing guides for ${gameName}`;
									presenceData.largeImageKey = gameImageURL;
								}
								break;
							}
							case "u": {
								presenceData.details = `Viewing a user's profile`;
								presenceData.state =
									document.querySelector<HTMLHeadingElement>("h1").textContent;
								const profileImage = document.querySelector<HTMLImageElement>(
									"img[src*='/members/']"
								);
								if (profileImage) {
									presenceData.largeImageKey = profileImage.src;
								}
								break;
							}
						}
					}
					break;
				}
				case "me": {
					switch (pathSplit[1]) {
						case "account": {
							presenceData.details = "Managing account settings";
							break;
						}
						case "library": {
							presenceData.details = "Browsing their library";
							break;
						}
						case "comments": {
							presenceData.details = "Browsing their comments";
							break;
						}
						case "followers": {
							presenceData.details = "Browsing their followers";
							break;
						}
						case "access": {
							presenceData.details = "Managing their API keys";
							break;
						}
						case "privacy": {
							presenceData.details = "Managing their privacy settings";
							break;
						}
					}
					break;
				}
				case "u": {
					presenceData.details = "Viewing a user's profile";
					presenceData.state =
						document.querySelector<HTMLHeadingElement>("h1").textContent;
					const profileImage = document.querySelector<HTMLImageElement>(
						"img[src*='/members/']"
					);
					if (profileImage) {
						presenceData.largeImageKey = profileImage.src;
					}
					break;
				}
				default: {
					presenceData.details = "Browsing";
					presenceData.state =
						document.querySelector<HTMLHeadingElement>("h1").textContent ??
						document.title.match(/(.*) - mod\.io/)[1];
				}
			}
			break;
		}
		case "blog.mod.io": {
			switch (pathSplit[0] ?? "") {
				case "": {
					presenceData.details = "Browsing the blog";
					presenceData.state = "Home page";
					break;
				}
				case "search": {
					presenceData.details = "Searching the blog";
					presenceData.state = new URLSearchParams(search).get("q");
					break;
				}
				case "tagged": {
					presenceData.details = "Browsing articles by tag";
					presenceData.state = pathSplit[1];
					break;
				}
				default: {
					presenceData.details = "Reading an article";
					presenceData.state =
						document.querySelector<HTMLHeadingElement>("h1").textContent;
					presenceData.buttons = [
						{
							label: "Read article",
							url: href,
						},
					];
				}
			}
			break;
		}
		case "docs.mod.io": {
			presenceData.details = "Browsing documentation";
			presenceData.state =
				document.querySelector<HTMLAnchorElement>(
					".active.toc-link"
				).textContent;
			break;
		}
		case "integrate.mod.io": {
			break;
		}
		case "old.mod.io": {
			break;
		}
		// Old subdomains
		default: {
		}
	}

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
