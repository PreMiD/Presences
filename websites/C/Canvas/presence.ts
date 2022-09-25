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
			discussionPath: string[]
		) => {
			switch (discussionPath[0] ?? "") {
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
					if (discussionPath[1] === "edit") {
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
							).textContent;
					}
				}
			}
		},
		pages: (
			presenceData: PresenceData,
			category: string,
			pagesPath: string[]
		) => {
			if (pagesPath[0]) {
				if (pagesPath[1] === "edit") {
					presenceData.details = `Editing a page for ${category}`;
					presenceData.state =
						document.querySelector<HTMLInputElement>("#title").value;
				} else {
					presenceData.details = `Viewing a page for ${category}`;
					presenceData.state =
						document.querySelector<HTMLHeadingElement>(
							".page-title"
						).textContent;
				}
			} else {
				const titleInput = document.querySelector<HTMLInputElement>("#title");
				if (titleInput) {
					presenceData.details = `Creating a page for ${category}`;
					presenceData.state = titleInput.value;
				} else presenceData.details = `Viewing pages for ${category}`;
			}
		},
		files: (presenceData: PresenceData, category: string = null) => {
			if (category) presenceData.details = `Browsing files for ${category}`;
			else presenceData.details = "Browsing files";
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
			} else presenceData.details = `Browsing collaborations for ${category}`;
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
			} else presenceData.details = `Browsing conferences for ${category}`;
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
		{ pathname, hostname, search } = window.location,
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
				} else presenceData.details = "Viewing messages";
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
							switch (pathSplit[3] ?? "") {
								case "": {
									presenceData.details = `Viewing assignments for course: ${firstPath}`;
									break;
								}
								case "new": {
									presenceData.details = `Creating an assignment for course: ${firstPath}`;
									presenceData.state =
										document.querySelector<HTMLInputElement>(
											"#assignment_name"
										).value;
									break;
								}
								default: {
									switch (pathSplit[4]) {
										case "edit": {
											presenceData.details = `Editing an assignment for course: ${firstPath}`;
											presenceData.state =
												document.querySelector<HTMLInputElement>(
													"#assignment_name"
												).value;
											break;
										}
										case "submissions": {
											presenceData.details = `Viewing submissions for an assignment for course: ${firstPath}`;
											presenceData.state = topPath;
											break;
										}
										case "peer_reviews": {
											presenceData.details = `Viewing peer reviews for an assignment for course: ${firstPath}`;
											presenceData.state = topPath;
											break;
										}
										default: {
											presenceData.details = `Viewing assignment for course: ${firstPath}`;
											presenceData.state = topPath;
										}
									}
								}
							}
							break;
						}
						case "collaborations": {
							canvasDataFunctions.collaborations(
								presenceData,
								`course: ${firstPath}`
							);
							break;
						}
						case "conferences": {
							canvasDataFunctions.conferences(
								presenceData,
								`course: ${firstPath}`
							);
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
						case "external_tools": {
							presenceData.details = `Viewing course: ${firstPath}`;
							presenceData.state = topPath;
							break;
						}
						case "files": {
							canvasDataFunctions.files(presenceData, `course: ${firstPath}`);
							break;
						}
						case "gradebook": {
							switch (pathSplit[3]) {
								case "history": {
									presenceData.details = `Viewing grade history for course: ${firstPath}`;
									break;
								}
								case "speed_grader": {
									presenceData.details = `Grading an assignment for course: ${
										document.querySelector<HTMLAnchorElement>("#context_title")
											.textContent
									}`;
									presenceData.state =
										document.querySelector<HTMLHeadingElement>(
											".assignmentDetails__Title"
										).textContent;
									break;
								}
								default: {
									presenceData.details = `Viewing gradebook for course: ${firstPath}`;
								}
							}
							break;
						}
						case "grades": {
							presenceData.details = `Viewing grades for course: ${firstPath}`;
							break;
						}
						case "modules": {
							if (pathSplit[3] === "progressions")
								presenceData.details = `Viewing module progression for course: ${firstPath}`;
							else
								presenceData.details = `Viewing modules for course: ${firstPath}`;
							break;
						}
						case "outcomes": {
							const createOutcomeModal =
									document.querySelector<HTMLSpanElement>(
										"[data-testid='createOutcomeModal']"
									),
								editOutcomeInput = document.querySelector<HTMLInputElement>(
									"[data-testid='name-input']"
								);
							if (createOutcomeModal) {
								presenceData.details = `Creating an outcome for course: ${firstPath}`;
								presenceData.state =
									createOutcomeModal.querySelector<HTMLInputElement>(
										"input"
									).value;
							} else if (editOutcomeInput) {
								presenceData.details = `Editing an outcome for course: ${firstPath}`;
								presenceData.state = editOutcomeInput.value;
							} else
								presenceData.details = `Viewing outcomes for course: ${firstPath}`;
							break;
						}
						case "pages": {
							canvasDataFunctions.pages(
								presenceData,
								`course: ${firstPath}`,
								pathSplit.slice(3)
							);
							break;
						}
						case "quizzes": {
							if (pathSplit[3]) {
								switch (pathSplit[4] ?? "") {
									case "": {
										presenceData.details = `Viewing a quiz for course: ${firstPath}`;
										presenceData.state = topPath;
										break;
									}
									case "edit": {
										presenceData.details = `Editing a quiz for course: ${firstPath}`;
										presenceData.state = topPath;
										break;
									}
									case "take": {
										presenceData.details = `Taking a quiz for course: ${firstPath}`;
										const currentQuestion = document.querySelector(
												".current_question i"
											),
											timeElapsedType = document
												.querySelector<HTMLSpanElement>(".time_header")
												.textContent.match(/(Running|Elapsed)/i)[1],
											[years, months, days, hours, minutes, seconds] = document
												.querySelector<HTMLDivElement>(".time_running")
												.textContent.match(
													/(?:([\d,]+) Years, )?(?:(\d+) Months, )?(?:(\d+) Days, )?(?:(\d+) Hours, )?(?:(\d+) Minutes, )?(\d+) Seconds/
												)
												.map(x => +x.replaceAll(",", "")),
											totalSeconds =
												seconds +
												minutes * 60 +
												hours * 3600 +
												days * 86400 +
												months * 2592000 +
												years * 31104000;
										if (timeElapsedType === "Running") {
											presenceData.endTimestamp =
												Math.floor(Date.now() / 1000) + totalSeconds;
										} else {
											presenceData.startTimestamp =
												Math.floor(Date.now() / 1000) - totalSeconds;
										}
										presenceData.state = currentQuestion
											? `${topPath} - ${currentQuestion.nextSibling.textContent}`
											: topPath;
										break;
									}
									case "history": {
										presenceData.details = `Viewing an attempt for a quiz in course: ${firstPath}`;
										presenceData.state = `${navigationPath[2]} - Attempt ${
											document
												.querySelector<HTMLAnchorElement>(".quiz_version")
												.textContent.match(/(\d+):/)[1]
										}`;
										break;
									}
								}
							} else
								presenceData.details = `Viewing quizzes for course: ${firstPath}`;
							break;
						}
						case "rubrics": {
							const editRubricTitle =
								document.querySelector<HTMLInputElement>("#rubric-title");
							if (editRubricTitle) {
								presenceData.details = `${
									pathSplit[3] ? "Editing" : "Creating"
								} a rubric for course: ${firstPath}`;
								presenceData.state = editRubricTitle.value;
							} else if (pathSplit[3]) {
								presenceData.details = `Viewing rubric for course: ${firstPath}`;
								presenceData.state = topPath;
							} else
								presenceData.details = `Viewing rubrics for course: ${firstPath}`;
							break;
						}
						case "settings": {
							presenceData.details = `Managing settings for course: ${firstPath}`;
							presenceData.state =
								document.querySelector<HTMLLIElement>(
									".ui-tabs-active"
								).textContent;
							break;
						}
						case "syllabus": {
							if (
								document.querySelector<HTMLIFrameElement>(
									"#course_syllabus_body_ifr"
								)
							)
								presenceData.details = `Editing syllabus for course: ${firstPath}`;
							else
								presenceData.details = `Viewing syllabus for course: ${firstPath}`;
							break;
						}
						case "users": {
							if (pathSplit[3]) canvasDataFunctions.profile(presenceData);
							else {
								canvasDataFunctions.people(
									presenceData,
									`course: ${firstPath}`
								);
							}
							break;
						}
					}
				} else presenceData.details = "Browsing all courses";
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
							if (pathSplit[3]) canvasDataFunctions.profile(presenceData);
							else
								canvasDataFunctions.people(presenceData, `group: ${firstPath}`);
							break;
						}
					}
				} else presenceData.details = "Viewing groups";
				break;
			}
			case "profile": {
				switch (pathSplit[1] ?? "") {
					case "": {
						const profileNameInput =
							document.querySelector<HTMLInputElement>("#name_input");
						if (profileNameInput) {
							presenceData.details = "Editing profile";
							presenceData.state = profileNameInput.value;
						} else canvasDataFunctions.profile(presenceData);
						break;
					}
					case "content_shares": {
						presenceData.details = "Viewing shared content";
						break;
					}
					case "settings": {
						presenceData.details = "Editing profile settings";
						break;
					}
					case "qr_mobile_login": {
						presenceData.details = "Viewing QR code";
						break;
					}
				}
				break;
			}
			case "search": {
				switch (pathSplit[1]) {
					case "all_courses": {
						presenceData.details = "Searching all courses";
						presenceData.state = new URLSearchParams(search).get("search");
						break;
					}
					case "rubrics": {
						presenceData.details = "Searching rubrics";
						break;
					}
				}
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
