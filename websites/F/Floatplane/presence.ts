const presence = new Presence({
		clientId: "889918462477095012",
	}),
	browsingTimestamp = Date.now(),
	/* eslint-disable camelcase */
	assets = {
		bitwit_ultra:
			"https://cdn.discordapp.com/app-assets/889918462477095012/889955073323565147.png?size=512",
		tech_deals:
			"https://cdn.discordapp.com/app-assets/889918462477095012/889955494821789736.png?size=512",
		eposvox:
			"https://cdn.discordapp.com/app-assets/889918462477095012/889955639684653116.png?size=512",
		ufdtech:
			"https://cdn.discordapp.com/app-assets/889918462477095012/889955902436819065.png?size=512",
		level1techs:
			"https://cdn.discordapp.com/app-assets/889918462477095012/889956141264670772.png?size=512",
		"3dprintingnerd":
			"https://cdn.discordapp.com/app-assets/889918462477095012/889956369023795240.png?size=512",
		themightyjingles:
			"https://cdn.discordapp.com/app-assets/889918462477095012/889956603602829403.png?size=512",
		restoreit:
			"https://cdn.discordapp.com/app-assets/889918462477095012/889956721332719707.png?size=512",
		badseedtech:
			"https://cdn.discordapp.com/app-assets/889918462477095012/889956938488627240.png?size=512",
		robertneal:
			"https://cdn.discordapp.com/app-assets/889918462477095012/889957136510091345.png?size=512",
		lawfulmasses:
			"https://cdn.discordapp.com/app-assets/889918462477095012/889981292752539659.png?size=512",
		gearseekers:
			"https://cdn.discordapp.com/app-assets/889918462477095012/889982141964894248.png?size=512",
		craftcomputing:
			"https://cdn.discordapp.com/app-assets/889918462477095012/889982561726640209.png?size=512",
		toastybros:
			"https://cdn.discordapp.com/app-assets/889918462477095012/889982847010635796.png?size=512",
		theguncollective:
			"https://cdn.discordapp.com/app-assets/889918462477095012/889982990271270912.png?size=512",
		forgottenweapons:
			"https://cdn.discordapp.com/app-assets/889918462477095012/890208334383296514.png?size=512",
		linustechtips:
			"https://cdn.discordapp.com/app-assets/889918462477095012/890208777641525288.png?size=512",
		lonseidman:
			"https://cdn.discordapp.com/app-assets/889918462477095012/890209027005513739.png?size=512",
	};
/* eslint-enable camelcase */

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey:
				"https://cdn.rcd.gg/PreMiD/websites/F/Floatplane/assets/logo.png",
			startTimestamp: browsingTimestamp,
		},
		[, page, pageType, pageTypeType] = location.pathname.split("/");

	if (!page) {
		//Uploads
		const subCount =
				document.querySelector(".simplebar-content")?.children.length,
			showCount = await presence.getSetting<boolean>("subscriptions");

		presenceData.details = "Vieweing uploads";

		if (showCount && subCount > 0) {
			presenceData.state = `${subCount - 1} ${
				subCount > 2 ? "Subscriptions" : "Subscription"
			}`;
		}
	} else {
		switch (page) {
			case "discover": {
				//Homepage
				presenceData.details = "Viewing Homepage";
				presenceData.state = "Say Hello To Floatplane";

				break;
			}
			case "browse": {
				//Browsing
				const searchTerm = (
						document.querySelector(".search-bar") as HTMLInputElement
					)?.value,
					channelCount =
						document.querySelector(".creator-cards")?.children.length;

				presenceData.details = "Browsing";
				presenceData.state = `${channelCount} Channels`;
				presenceData.smallImageKey = Assets.Reading;
				presenceData.smallImageText = "Browsing";

				if (searchTerm) {
					let stringFormated;

					switch (channelCount) {
						case 1:
							if (document.querySelector(".search-not-found")) {
								stringFormated = "No Results";
								break;
							}
							stringFormated = "1 Channel";
							break;

						default:
							stringFormated = `${channelCount} Channels`;
					}

					presenceData.details = `Searching: ${searchTerm}`;
					presenceData.state = stringFormated;
					presenceData.smallImageKey = Assets.Search;
					presenceData.smallImageText = "Searching";
				}

				break;
			}
			case "channel": {
				//Viewing a channel
				const channelTitle =
					document.querySelector(".channel-title")?.textContent;

				//Wait for page to load
				if (!channelTitle) return;

				presenceData.details = "Viewing channel:";
				presenceData.state = channelTitle;
				presenceData.largeImageKey =
					assets[pageType.toLowerCase() as keyof typeof assets];
				presenceData.smallImageKey =
					"https://cdn.rcd.gg/PreMiD/websites/F/Floatplane/assets/logo.png";
				presenceData.smallImageText = document.title;
				presenceData.buttons = [{ label: "View Channel", url: location.href }];

				if (pageTypeType === "live") {
					//Stream
					const title = document.querySelector(".title-text")?.textContent;
					if (!title || !document.querySelector("video")) return;

					delete presenceData.startTimestamp;

					presenceData.details = title;
					presenceData.smallImageKey = Assets.Live;
					presenceData.smallImageText = "Live";
					presenceData.buttons = [
						{
							label: "View Stream",
							url: location.href,
						},
						{
							label: "View Channel",
							url: (document.querySelector(".channel-title") as HTMLLinkElement)
								?.href,
						},
					];
				}

				break;
			}
			default:
				switch (pageType) {
					case "profile": {
						//User
						const channelTitle =
							document.querySelector(".channel-title").textContent;

						//Wait for page to load
						if (!channelTitle) return;

						presenceData.details = "Viewing user:";
						presenceData.state = channelTitle;
						presenceData.buttons = [{ label: "View User", url: location.href }];

						break;
					}
					case "settings": {
						//Settings
						presenceData.details = "Viewing thier";
						presenceData.state = "Settings";

						break;
					}
					case "help": {
						//Help pages
						presenceData.details = "Viewing:";
						presenceData.state = "Support pages";

						break;
					}
					default:
						switch (page) {
							case "support": {
								//Support Pages
								const searchTerm = (
										document.querySelector("#search") as HTMLInputElement
									).textContent,
									faqCount =
										document.querySelectorAll(".question-answer").length;

								presenceData.details = "Viewing FAQ";
								presenceData.state = `${faqCount} topics`;

								if (searchTerm) {
									let stringFormated;

									switch (faqCount) {
										case 1:
											stringFormated = "1 Topic";
											break;
										case 0:
											stringFormated = "No Results";
											break;
										default:
											stringFormated = `${faqCount} Topics`;
									}

									presenceData.details = `Searching FAQ: ${searchTerm}`;
									presenceData.state = stringFormated;
									presenceData.smallImageKey = Assets.Search;
									presenceData.smallImageText = "Searching";
								}

								break;
							}
							case "legal": {
								//Support Pages
								presenceData.details = "Legal Stuff";
								presenceData.buttons = [
									{
										label: "Terms of Service",
										url: "https://www.floatplane.com/legal/terms",
									},
									{
										label: "Privacy Policy",
										url: "https://www.floatplane.com/legal/privacy",
									},
								];

								break;
							}
							case "post": {
								//Video
								const video = document.querySelector(
									"video"
								) as HTMLVideoElement;

								//Wait for page to load
								if (!video) return;
								delete presenceData.startTimestamp;

								presenceData.details =
									document.querySelector(".title-text")?.textContent;
								presenceData.state =
									document.querySelector(".channel-title")?.textContent;
								presenceData.largeImageKey =
									assets[
										(
											document.querySelector(
												".channel-title"
											) as HTMLLinkElement
										)?.href
											.toLowerCase()
											?.split("/")
											.slice(-1)[0] as keyof typeof assets
									];
								[, presenceData.endTimestamp] =
									presence.getTimestampsfromMedia(video);
								presenceData.smallImageKey = video.paused
									? Assets.Pause
									: Assets.Play;
								presenceData.smallImageText = video.paused
									? "Paused"
									: "Playing";
								presenceData.buttons = [
									{
										label: "View Video",
										url: location.href,
									},
									{
										label: "View Channel",
										url: (
											document.querySelector(
												".channel-title"
											) as HTMLLinkElement
										).href,
									},
								];

								if (video.paused) {
									delete presenceData.startTimestamp;
									delete presenceData.endTimestamp;
								}

								break;
							}
							// No default
						}
				}
		}
	}

	const showButtons = await presence.getSetting<boolean>("buttons");

	if (!showButtons) delete presenceData.buttons;

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
