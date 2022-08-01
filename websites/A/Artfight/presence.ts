const presence = new Presence({
		clientId: "1002575262292131910",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000),
	slideshow = new Slideshow();

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: "artfight-logo",
			startTimestamp: browsingTimestamp,
		},
		presenceDataSlide: PresenceData = {
			largeImageKey: "artfight-logo",
			startTimestamp: browsingTimestamp,
		},
		pathnameArray = document.location.pathname.split("/"),
		showCover = await presence.getSetting<boolean>("cover");

	switch (pathnameArray[1]) {
		case "":
			presenceData.details = "Browsing homepage";
			break;
		case "attack": {
			const presenceDataTeam: PresenceData = {
				largeImageKey: "artfight-logo",
				startTimestamp: browsingTimestamp,
			};

			presenceData.details =
				presenceDataSlide.details =
				presenceDataTeam.details =
					`Viewing a${
						document.querySelector("td > div.badge.badge-info")?.textContent ??
						"n attack"
					}`;

			presenceData.state = `"${document
				.querySelector(".profile-header-name > a > u")
				.textContent.trim()}"`;

			if (showCover && !document.querySelector("div.alert")) {
				presenceData.largeImageKey =
					presenceDataSlide.largeImageKey =
					presenceDataTeam.largeImageKey =
						document
							.querySelector("#image-pane > div > a > img")
							.getAttribute("src");
			}

			const tableAttackData = document.querySelectorAll("tbody > tr > td");
			presenceDataSlide.state = `From ${tableAttackData[1].textContent.trim()} to ${tableAttackData[3].textContent.trim()}`;
			presenceDataTeam.state = `Team ${tableAttackData[5].textContent.trim()}`;

			presenceData.buttons =
				presenceDataSlide.buttons =
				presenceDataTeam.buttons =
					[
						{ label: "View Drawing", url: document.location.href },
						{
							label: "View Artist",
							url: `${
								document.location.origin
							}/~${tableAttackData[1].textContent.trim()}`,
						},
					];

			slideshow.addSlide("attackName", presenceData, 5000);
			slideshow.addSlide("authorName", presenceDataSlide, 5000);
			slideshow.addSlide("teamName", presenceDataTeam, 5000);
			break;
		}
		case "browse":
			presenceData.details = "Browsing";
			if (pathnameArray[2].startsWith("attacks"))
				presenceData.state = "attacks";
			else if (pathnameArray[2].startsWith("characters"))
				presenceData.state = "characters";
			else if (pathnameArray[2].startsWith("tags"))
				presenceData.state = "characters by tags";
			break;
		case "info":
			presenceData.details = "Reading";
			presenceData.smallImageKey = "reading";
			switch (pathnameArray[2]) {
				case "help":
					presenceData.state = "Help page";
					break;
				case "about":
					presenceData.state = "About Artfight";
					break;
				case "faq":
					presenceData.state = "Frequently Asked Questions";
					break;
				case "guide-attacks":
					presenceData.state = "Guide to categorize your attack";
					break;
				case "size":
					presenceData.state = "Guide to name character size";
					break;
				case "drawings":
					presenceData.state = "Guide to rate drawings";
					break;
				case "3d-modeling":
					presenceData.state = "Guide to rate 3D models";
					break;
				case "crafts":
					presenceData.state = "Guide to rate crafts arts";
					break;
				case "animation":
					presenceData.state = "Guide to rate animations";
					break;
				case "guide-maturity":
					presenceData.state = "Guide to filter mature content";
					break;
				case "gore":
					presenceData.state = "Guide to filter gore content";
					break;
				case "bodyhorror":
					presenceData.state = "Guide to filter bodyhorror content";
					break;
				case "nudity":
					presenceData.state = "Guide to filter nudity content";
					break;
				case "sexualthemes":
					presenceData.state = "Guide to filter sexual themes content";
					break;
				case "epilespy":
					presenceData.state = "Guide to Epilespy and eye strain warning";
					break;
				case "otherfilters":
					presenceData.state = "Guide to other sensitive content";
					break;
				case "guide-bbcode":
					presenceData.state = "Guide to BBCode and CSS";
					break;
				case "contact-us":
					presenceData.state = "How to contact a moderator";
					break;
				case "contact":
					presenceData.state = "How to contact an administrator";
					break;
				case "credits":
					presenceData.state = "Staff credits page";
					break;
				case "artcredits":
					presenceData.state = "Art credits page";
					break;
				case "rules":
					presenceData.state = "artfight rules";
					break;
				case "tos":
					presenceData.state = "ToS page";
					break;
				case "privacy":
					presenceData.state = "Privacy policy";
					break;
			}
			break;
		case "shop":
			presenceData.details = "Browsing the shop";
			presenceData.state = document
				.querySelector("div.alert")
				.textContent.includes("closed")
				? "Actually closed"
				: "Shop opened";
			break;
		case "donate":
			presenceData.details = "Donating to Artfight";
			break;
		case "news":
			presenceData.details = "Reading news";
			presenceData.smallImageKey = "reading";
			break;
		case "members": {
			presenceData.details = "Browsing members";
			const browsingPageNumber = document.location.href.split("?");
			presenceData.state =
				browsingPageNumber.length === 1
					? "Page 1"
					: `Page ${browsingPageNumber[1].split("=")[1]}`;
			if (showCover) {
				presenceData.largeImageKey = document
					.querySelector<HTMLSpanElement>("span.icon-user")
					.style.backgroundImage.split('"')[1];
			}
			break;
		}
		default:
			break;
	}

	if (slideshow.getSlides().length > 0) presence.setActivity(slideshow);
	else if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
