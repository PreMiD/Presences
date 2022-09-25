const presence = new Presence({
		clientId: "1023383174027415572",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000),
	canvasDataFunctions = {
		announcement: (presenceData: PresenceData, category: string) => {},
		discussion: (presenceData: PresenceData, category: string) => {},
		pages: (presenceData: PresenceData, category: string) => {},
		files: (presenceData: PresenceData, category: string = null) => {
			if (category) {
				presenceData.details = `Browsing files for ${category}`;
			} else {
				presenceData.details = "Browsing files";
			}
			presenceData.state = document.querySelector<HTMLAnchorElement>(
				"#breadcrumbs>ul>li+li:last-of-type a"
			).textContent;
		},
		collaborations: (presenceData: PresenceData, category: string) => {
			presenceData.details = `Browsing collaborations for ${category}`;
		},
		conferences: (presenceData: PresenceData, category: string) => {
			presenceData.details = `Browsing conferences for ${category}`;
		},
		people: (presenceData: PresenceData, category: string) => {
			presenceData.details = `Browsing members of ${category}`;
		},
		profile: (presenceData: PresenceData) => {
			presenceData.details = "Viewing a user's profile";
			presenceData.state = document
				.querySelector<HTMLHeadingElement>("h2")
				.textContent.trim();
			presenceData.smallImageKey = getComputedStyle(
				document.querySelector<HTMLAnchorElement>(".avatar")
			).backgroundImage.match(/url\("(.+)"\)/)[1];
		},
	};

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: "https://i.imgur.com/DRlJvzX.png",
			startTimestamp: browsingTimestamp,
		},
		{ pathname, hostname } = window.location,
		pathSplit = pathname.split("/").filter(val => val);

	if (hostname === "www.canvas.net") {
		switch (pathSplit[0] ?? "") {
			case "": {
				presenceData.details = "Browsing catalog";
				break;
			}
			case "browse": {
				presenceData.details = "Browsing course details";
				presenceData.state =
					document.querySelector<HTMLHeadingElement>(".h1").textContent;
				break;
			}
			case "courses": {
				presenceData.details = "Enrolling in a course";
				presenceData.state =
					document.querySelector<HTMLSpanElement>(
						"h2 > span"
					).lastChild.textContent;
				break;
			}
			case "dashboard": {
				presenceData.details = "Viewing their dashboard";
				break;
			}
			case "order_items": {
				presenceData.details = "Viewing their purchase history";
				break;
			}
		}
	} else {
		const topPath = document.querySelector<HTMLAnchorElement>(
				"#breadcrumbs>ul>li+li:last-of-type a"
			)?.textContent,
			firstPath = document.querySelector(
				"#breadcrumbs li:nth-of-type(2)"
			)?.textContent;
		// All other canvas domains
		switch (pathSplit[0] ?? "") {
			case "": {
				presenceData.details = "Viewing dashboard";
				break;
			}
			case "about": {
				canvasDataFunctions.profile(presenceData);
				break;
			}
			case "account_notifications": {
				presenceData.details = "Viewing global notifications";
				break;
			}
			case "calendar": {
				presenceData.details = "Viewing calendar";
				presenceData.state = document.querySelector<HTMLSpanElement>(
					".navigation_title_text"
				).textContent;
				break;
			}
			case "conversations": {
				break;
			}
			case "courses": {
				break;
			}
			case "files": {
				canvasDataFunctions.files(presenceData);
				break;
			}
			case "groups": {
				if (pathSplit[1]) {
					presenceData.details = "Viewing a group";
					switch (pathSplit[2] ?? "") {
						case "": {
							presenceData.state = topPath;
							break;
						}
						case "announcements": {
							presenceData.state = `Announcements for ${firstPath}`;
							break;
						}
						case "pages": {
							presenceData.state = `Pages for ${firstPath}`;
							break;
						}
						case "discussion_topics": {
							break;
						}
						case "files": {
							canvasDataFunctions.files(presenceData, `group: ${firstPath}`);
							break;
						}
						case "collaborations": {
							canvasDataFunctions.collaborations(
								presenceData,
								`group: ${firstPath}`
							);
							break;
						}
						case "conferences": {
							canvasDataFunctions.conferences(
								presenceData,
								`group: ${firstPath}`
							);
							break;
						}
						case "users": {
							if (pathSplit[3]) {
								canvasDataFunctions.profile(presenceData);
							} else {
								canvasDataFunctions.people(presenceData, `group: ${firstPath}`);
							}
							break;
						}
					}
				} else {
					presenceData.details = "Viewing groups";
				}
				break;
			}
			case "profile": {
				break;
			}
			default: {
				presenceData.details = "Browsing";
				presenceData.state =
					document.querySelector<HTMLHeadingElement>("h2")?.textContent ??
					document.title;
			}
		}
	}

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
