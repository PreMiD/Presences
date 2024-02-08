const presence = new Presence({
		clientId: "823408394098311178",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

	const enum Assets {
		Key = "https://cdn.discordapp.com/app-assets/823408394098311178/823851137542389791.png?size=512",
		Slide = "https://cdn.discordapp.com/app-assets/823408394098311178/823851232006373407.png?size=512",
		Catch = "https://cdn.discordapp.com/app-assets/823408394098311178/823851498717839421.png?size=512",
		Taiko = "https://cdn.discordapp.com/app-assets/823408394098311178/823851558076809226.png?size=512",
		Ring = "https://cdn.discordapp.com/app-assets/823408394098311178/823851604427014155.png?size=512",
		Pad = "https://cdn.discordapp.com/app-assets/823408394098311178/823851645435641867.png?size=512",
		User = "https://cdn.discordapp.com/app-assets/823408394098311178/824831721052045352.png?size=512",
		Skin = "https://cdn.discordapp.com/app-assets/823408394098311178/824890615875371048.png?size=512",
		Talk = "https://cdn.discordapp.com/app-assets/823408394098311178/824894625264435200.png?size=512",
		Gameplay = "https://cdn.discordapp.com/app-assets/823408394098311178/824896266416291840.png?size=512",
		Home = "https://cdn.discordapp.com/app-assets/823408394098311178/825003976067252275.png?size=512",
		Leaderboard = "https://cdn.discordapp.com/app-assets/823408394098311178/825004266984308768.png?size=512",
		Song = "https://cdn.discordapp.com/app-assets/823408394098311178/825005327941632090.png?size=512",
		Charting = "https://cdn.discordapp.com/app-assets/823408394098311178/825006642868519012.png?size=512",
		Inventory = "https://cdn.discordapp.com/app-assets/823408394098311178/825006863782772737.png?size=512",
		Resource = "https://cdn.discordapp.com/app-assets/823408394098311178/825008129892810763.png?size=512",
		Feedback = "https://cdn.discordapp.com/app-assets/823408394098311178/825008480183123978.png?size=512",
		Notification = "https://cdn.discordapp.com/app-assets/823408394098311178/825009418399383613.png?size=512",
		Wiki = "https://cdn.discordapp.com/app-assets/823408394098311178/827401803276091463.png?size=512",
		Store = "https://cdn.discordapp.com/app-assets/823408394098311178/827416752371007539.png?size=512",
		Discuss = "https://cdn.discordapp.com/app-assets/823408394098311178/827418893483638795.png?size=512",
		Malody = "https://cdn.discordapp.com/app-assets/823408394098311178/875564229355257916.png?size=512",
		Jail = "https://cdn.discordapp.com/app-assets/823408394098311178/875575102119477259.png?size=512",
		Livem = "https://cdn.discordapp.com/app-assets/823408394098311178/931407631694835763.png?size=512",
	}

presence.on("UpdateData", async () => {
	const privacy = await presence.getSetting<boolean>("privacy"),
		presenceData: PresenceData = {
			largeImageKey:
				"https://cdn.rcd.gg/PreMiD/websites/M/Mugzone/assets/logo.png",
			startTimestamp: browsingTimestamp,
		};
	if (privacy) presenceData.details = "Browsing Malody Website";
	else if (document.location.pathname === "/")
		presenceData.details = "Malody Main Page";
	else if (document.location.pathname === "/index") {
		presenceData.smallImageKey = Assets.Home;
		presenceData.details = "Viewing Home Page";
	} else if (document.location.pathname.endsWith("/chart")) {
		presenceData.smallImageKey = Assets.Store;
		presenceData.details = "Browsing Chart Store";
	} else if (document.location.pathname.startsWith("/page/all/player")) {
		presenceData.smallImageKey = Assets.Leaderboard;
		presenceData.details = "Viewing Leaderboard";
		if (document.location.href.endsWith("?from=0&mode=0")) {
			presenceData.smallImageKey = Assets.Key;
			presenceData.smallImageText = "KeyMode";
			presenceData.state = "Key Mode";
		} else if (document.location.href.endsWith("?from=0&mode=3")) {
			presenceData.smallImageKey = Assets.Catch;
			presenceData.smallImageText = "CatchMode";
			presenceData.state = "Catch Mode";
		} else if (document.location.href.endsWith("?from=0&mode=4")) {
			presenceData.smallImageKey = Assets.Pad;
			presenceData.smallImageText = "PadMode";
			presenceData.state = "Pad mode";
		} else if (document.location.href.endsWith("?from=0&mode=5")) {
			presenceData.smallImageKey = Assets.Taiko;
			presenceData.smallImageText = "TaikoMode";
			presenceData.state = "Taiko Mode";
		} else if (document.location.href.endsWith("?from=0&mode=6")) {
			presenceData.smallImageKey = Assets.Ring;
			presenceData.smallImageText = "RingMode";
			presenceData.state = "Ring Mode";
		} else if (document.location.href.endsWith("?from=0&mode=7")) {
			presenceData.smallImageKey = Assets.Slide;
			presenceData.smallImageText = "SlideMode";
			presenceData.state = "Slide Mode";
		} else if (document.location.pathname.endsWith("/player")) {
			presenceData.smallImageKey = Assets.Key;
			presenceData.smallImageText = "KeyMode";
			presenceData.state = "Key Mode";
		}
	} else if (document.location.href.includes("/song")) {
		presenceData.smallImageKey = Assets.Song;
		presenceData.details = "Viewing a song";
		presenceData.state = document.querySelector(
			"#content > div.song_title.g_rblock > div.right > h2.textfix.title"
		).textContent;
		presenceData.buttons = [
			{
				label: "View Song",
				url: document.URL,
			},
		];
	} else if (document.location.href.includes("/chart")) {
		presenceData.smallImageKey = Assets.Song;
		presenceData.details = document.querySelector(
			"#content > div.song_title.g_rblock > div.right > h2.textfix.title"
		).textContent;
		presenceData.state = document.querySelector(
			"#content > div.song_title.g_rblock > div.right > h2.mode > span:nth-child(2)"
		).textContent;
		presenceData.buttons = [
			{
				label: "View Chart",
				url: document.URL,
			},
		];
	} else if (document.location.pathname.startsWith("/store")) {
		if (document.location.pathname.endsWith("/skin")) {
			presenceData.smallImageKey = Assets.Skin;
			presenceData.details = "Browsing Skin Store";
		} else if (document.location.pathname.includes("/skin/detail")) {
			presenceData.smallImageKey = Assets.Skin;
			presenceData.details = "Viewing a skin:";
			presenceData.state = document.querySelector(
				"#content > div.song_title.g_rblock > div.right > h2.textfix.title"
			).textContent;
			presenceData.buttons = [
				{
					label: "View Skin",
					url: document.URL,
				},
			];
		} else if (document.location.pathname.endsWith("/all")) {
			presenceData.smallImageKey = Assets.Store;
			presenceData.details = "Browsing Item Store";
		} else if (document.location.pathname.endsWith("/my")) {
			presenceData.smallImageKey = Assets.Inventory;
			presenceData.details = "Viewing Inventory";
		}
	} else if (document.location.pathname.startsWith("/talk")) {
		if (document.location.pathname.includes("/topic")) {
			presenceData.smallImageKey = Assets.Talk;
			presenceData.details = `Viewing topic: ${
				document.querySelector("#chead > div > a").textContent
			}`;
			presenceData.state = document.querySelector(
				"#g_talk > div.g_talk_title > p > span"
			).textContent;
		} else if (document.location.pathname.includes("/user")) {
			if (document.location.pathname.endsWith("/user")) {
				presenceData.smallImageKey = Assets.Talk;
				presenceData.details = "Checking Inbox";
			} else if (document.location.pathname.endsWith("/notify")) {
				presenceData.smallImageKey = Assets.Notification;
				presenceData.details = "Viewing Notification";
			}
		} else if (document.location.pathname.includes("/group")) {
			presenceData.details = "Viewing Discussion Page";
			if (document.location.href.endsWith("/1")) {
				presenceData.smallImageKey = Assets.Gameplay;
				presenceData.state = "Gameplay Disscussion";
			} else if (document.location.href.endsWith("/2")) {
				presenceData.smallImageKey = Assets.Charting;
				presenceData.state = "Chart Discussion";
			} else if (document.location.href.endsWith("/3")) {
				presenceData.smallImageKey = Assets.Resource;
				presenceData.state = "Skin & Resource";
			} else if (document.location.href.endsWith("/4")) {
				presenceData.smallImageKey = Assets.Feedback;
				presenceData.state = "Feedback";
			}
		}
	} else if (document.location.pathname.startsWith("/accounts")) {
		if (document.location.pathname.includes("/login"))
			presenceData.details = "Logging in";
		else if (document.location.pathname.endsWith("/accounts/limit")) {
			presenceData.smallImageKey = Assets.Jail;
			presenceData.details = "Visiting the Jail";
			presenceData.state = "What Is This Place Anyway?";
			presenceData.buttons = [
				{
					label: `Go with ${
						document.querySelector("#header > div > a:nth-child(4) > b")
							.textContent
					}`,
					url: document.URL,
				},
			];
		} else if (document.location.pathname.includes("/user")) {
			if (
				document.querySelector(
					"#content > div.user_head.g_rblock > div.right > p.name > span"
				).textContent ===
				document.querySelector("#header > div > a:nth-child(4) > b").textContent
			) {
				const top = Math.min(
					+document
						.querySelector(
							"#content > div.body > div.panel > div.rank.g_rblock > div:nth-child(1) > div > p.rank"
						)
						.textContent.replace("#", ""),
					+document
						.querySelector(
							"#content > div.body > div.panel > div.rank.g_rblock > div:nth-child(2) > div > p.rank"
						)
						.textContent.replace("#", ""),
					+document
						.querySelector(
							"#content > div.body > div.panel > div.rank.g_rblock > div:nth-child(3) > div > p.rank"
						)
						.textContent.replace("#", ""),
					+document
						.querySelector(
							"#content > div.body > div.panel > div.rank.g_rblock > div:nth-child(4) > div > p.rank"
						)
						.textContent.replace("#", ""),
					+document
						.querySelector(
							"#content > div.body > div.panel > div.rank.g_rblock > div:nth-child(5) > div > p.rank"
						)
						.textContent.replace("#", ""),
					+document
						.querySelector(
							"#content > div.body > div.panel > div.rank.g_rblock > div:nth-child(6) > div > p.rank"
						)
						.textContent.replace("#", "")
				);
				presenceData.details = `User: ${
					document.querySelector(
						"#content > div.user_head.g_rblock > div.right > p.name > span"
					).textContent
				}`;
				presenceData.state = `Best Rank: ${top}`;
				presenceData.smallImageKey = Assets.User;
				presenceData.buttons = [
					{
						label: "Visit My Profile!",
						url: document.URL,
					},
				];
			} else {
				presenceData.details = "Viewing User: ";
				presenceData.state = document.querySelector(
					"#content > div.user_head.g_rblock > div.right > p.name > span"
				).textContent;
				presenceData.smallImageKey = Assets.User;
			}
		} else if (document.location.pathname.endsWith("/friend")) {
			presenceData.smallImageKey = Assets.User;
			presenceData.details = "Viewing Friends List";
		} else if (document.location.pathname.includes("/config/profile")) {
			presenceData.smallImageKey = Assets.Writing;
			presenceData.details = "Editing Profile";
		}
	} else if (document.location.pathname.includes("/page/userpage/edit/")) {
		presenceData.smallImageKey = Assets.Writing;
		presenceData.details = `${
			document.querySelector("#content > div.g_title").textContent
		}profile`;
	} else if (document.location.pathname.includes("/page/search")) {
		presenceData.smallImageKey = Assets.Search;
		presenceData.details = document.querySelector(
			"#content > div.g_title"
		).textContent;
	} else if (document.location.pathname.includes("/page/all")) {
		presenceData.smallImageKey = Assets.Viewing;
		presenceData.details = "Viewing All Pages";
	} else if (document.location.pathname.includes("/page/latest")) {
		presenceData.smallImageKey = Assets.Viewing;
		presenceData.details = "Viewing Recent Changes";
		presenceData.state = "Pages";
	} else if (document.location.pathname.includes("/page/create")) {
		presenceData.smallImageKey = Assets.Writing;
		presenceData.details = "Creating a New Page";
	} else if (document.location.href.includes("/page/create?type=6")) {
		presenceData.smallImageKey = Assets.Writing;
		presenceData.details = "Creating a Template";
	} else if (document.location.pathname.startsWith("/wiki")) {
		presenceData.smallImageKey = Assets.Wiki;
		presenceData.details = "Viewing Wiki";
		presenceData.state = document.querySelector(
			"#content > div.wiki_title.g_rblock > div.title"
		).textContent;
	}
	presence.setActivity(presenceData);
});
