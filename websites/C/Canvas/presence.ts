const presence = new Presence({
		clientId: "1023383174027415572",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000),
	canvasDataFunctions = {
		announcement: (presenceData: PresenceData, category: string) => {
			return (presenceData.details = `Viewing announcements for ${category}`);
		},
		discussion: (
			presenceData: PresenceData,
			category: string,
			discussion_path: string[]
		) => {
			switch (discussion_path[0] ?? "") {
				case "": {
					presenceData.details = `Viewing discussions for ${category}`;
					break;
				}
				case "new": {
					presenceData.details = `Creating a new ${
						getNavigationPath()[1] === "Announcements"
							? "announcement"
							: "discussion"
					} for ${category}`;
					presenceData.state =
						document.querySelector<HTMLInputElement>("#discussion_title").value;
					break;
				}
				default: {
					if (discussion_path[1] === "edit") {
						presenceData.details = `Editing a ${
							getNavigationPath()[1] === "Announcements"
								? "announcement"
								: "discussion"
						} for ${category}`;
						presenceData.state =
							document.querySelector<HTMLInputElement>(
								"#discussion_title"
							).value;
					} else {
						presenceData.details = `Viewing a ${
							getNavigationPath()[1] === "Announcements"
								? "announcement"
								: "discussion"
						} for ${category}`;
						presenceData.state =
							document.querySelector<HTMLHeadingElement>(
								".discussion-title"
							).innerText;
					}
				}
			}
		},
		pages: (
			presenceData: PresenceData,
			category: string,
			pages_path: string[]
		) => {
			if (pages_path[0]) {
				if (pages_path[1] === "edit") {
					presenceData.details = `Editing a page for ${category}`;
					presenceData.state =
						document.querySelector<HTMLInputElement>("#title").value;
				} else {
					presenceData.details = `Viewing a page for ${category}`;
					presenceData.state =
						document.querySelector<HTMLHeadingElement>(".page-title").innerText;
				}
			} else {
				const titleInput = document.querySelector<HTMLInputElement>("#title");
				if (titleInput) {
					presenceData.details = `Creating a page for ${category}`;
					presenceData.state = titleInput.value;
				} else {
					presenceData.details = `Viewing pages for ${category}`;
				}
			}
		},
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
			const collaborationInput = document.querySelector<HTMLSelectElement>(
				"#collaboration_collaboration_type"
			);
			if (collaborationInput) {
				presenceData.details = `Creating a collaboration for ${category}`;
				presenceData.state = collaborationInput.value;
			} else if (
				document.querySelector<HTMLFormElement>(".edit_collaboration")
			) {
				presenceData.details = `Editing a collaboration for ${category}`;
				presenceData.state = document.querySelector<HTMLInputElement>(
					"[name='collaboration[title]']"
				).value;
			} else {
				presenceData.details = `Browsing collaborations for ${category}`;
			}
		},
		conferences: (presenceData: PresenceData, category: string) => {
			const conferenceInput = document.querySelector<HTMLInputElement>(
				"#web_conference_title"
			);
			if (conferenceInput) {
				presenceData.details = `${
					document.querySelector<HTMLSelectElement>(
						"#web_conference_conference_type"
					).disabled
						? "Editing"
						: "Creating"
				} a conference for ${category}`;
				presenceData.state = conferenceInput.value;
			} else {
				presenceData.details = `Browsing conferences for ${category}`;
			}
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

function getNavigationPath(): string[] {
	return [...document.querySelector("#breadcrumbs > ul").children]
		.slice(1)
		.map(li => {
			return li.textContent;
		});
}

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
		// All other canvas domains
		const navigationPath = getNavigationPath(),
			topPath = navigationPath[navigationPath.length - 1],
			firstPath = navigationPath[0];
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
				const conversationInput = document.querySelector<HTMLInputElement>(
					"#compose-message-subject"
				);
				if (conversationInput) {
					presenceData.details = "Composing a message";
					presenceData.state = conversationInput.value;
				} else {
					presenceData.details = "Viewing messages";
				}
				break;
			}
			case "courses": {
				if (pathSplit[1]) {
					switch (pathSplit[2] ?? "") {
						case "": {
							presenceData.details = "Viewing course";
							presenceData.state = firstPath;
							break;
						}
						case "announcements": {
							canvasDataFunctions.announcement(
								presenceData,
								`course: ${firstPath}`
							);
							break;
						}
						case "assignments": {
							if (pathSplit[3] === "new") {
								presenceData.details = `Creating an assignment for course: ${firstPath}`;
								presenceData.state =
									document.querySelector<HTMLInputElement>(
										"#assignment_name"
									).value;
							} else if (pathSplit[3]) {
								if (pathSplit[4] === "edit") {
									presenceData.details = `Editing an assignment for course: ${firstPath}`;
									presenceData.state =
										document.querySelector<HTMLInputElement>(
											"#assignment_name"
										).value;
								} else if (pathSplit[4] === "submissions") {
									presenceData.details = `Viewing submissions for assignment: ${topPath} in course: ${firstPath}`;
								} else if (pathSplit[4] === "peer_reviews") {
									presenceData.details = `Viewing peer reviews for assignment: ${topPath} in course: ${firstPath}`;
								} else {
									presenceData.details = `Viewing assignment for course: ${firstPath}`;
									presenceData.state = topPath;
								}
							} else {
								presenceData.details = `Viewing assignments for course: ${firstPath}`;
							}
							break;
						}
						case "discussion_topics": {
							canvasDataFunctions.discussion(
								presenceData,
								`course: ${firstPath}`,
								pathSplit.slice(3)
							);
							break;
						}
						case "gradebook": {
							if (pathSplit[3] === "history") {
								presenceData.details = `Viewing grade history for course: ${firstPath}`;
							} else if (pathSplit[3] === "speed_grader") {
								presenceData.details = `Grading assignment: ${
									document.querySelector<HTMLHeadingElement>(
										".assignmentDetails__Title"
									).textContent
								} in course: ${
									document.querySelector<HTMLAnchorElement>("#context_title")
										.textContent
								}`;
							} else {
								presenceData.details = `Viewing gradebook for course: ${firstPath}`;
							}
							break;
						}
						case "grades": {
							presenceData.details = `Viewing grades for course: ${firstPath}`;
							break;
						}
						case "users": {
							if (pathSplit[3]) {
								canvasDataFunctions.profile(presenceData);
							} else {
								canvasDataFunctions.people(
									presenceData,
									`course: ${firstPath}`
								);
							}
						}
					}
				} else {
					presenceData.details = "Browsing all courses";
				}
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
							canvasDataFunctions.announcement(
								presenceData,
								`group: ${topPath}`
							);
							break;
						}
						case "pages": {
							canvasDataFunctions.pages(
								presenceData,
								`group: ${topPath}`,
								pathSplit.slice(3)
							);
							break;
						}
						case "discussion_topics": {
							canvasDataFunctions.discussion(
								presenceData,
								`group: ${topPath}`,
								pathSplit.slice(3)
							);
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
			case "search": {
				// all_courses
				// rubrics
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
