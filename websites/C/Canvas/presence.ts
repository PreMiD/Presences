const presence = new Presence({
		clientId: "1023383174027415572",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000),
	canvasDataFunctions = {
		announcement: (
			presenceData: PresenceData,
			category: string,
			private: boolean
		) => {
			return (presenceData.details = applyPrivacy(
				"Viewing announcements",
				category,
				private
			));
		},
		discussion: (
			presenceData: PresenceData,
			category: string,
			discussionPath: string[],
			private: boolean
		) => {
			switch (discussionPath[0] ?? "") {
				case "": {
					presenceData.details = applyPrivacy(
						"Viewing discussions",
						category,
						private
					);
					break;
				}
				case "new": {
					presenceData.details = applyPrivacy(
						`Creating a new ${
							getNavigationPath()[1] === "Announcements"
								? "announcement"
								: "discussion"
						}`,
						category,
						private
					);
					if (!private)
						presenceData.state =
							document.querySelector<HTMLInputElement>(
								"#discussion-title"
							).value;
					break;
				}
				default: {
					if (discussionPath[1] === "edit") {
						presenceData.details = applyPrivacy(
							`Editing a ${
								getNavigationPath()[1] === "Announcements"
									? "announcement"
									: "discussion"
							}`,
							category,
							private
						);
						if (!private)
							presenceData.state =
								document.querySelector<HTMLInputElement>(
									"#discussion-title"
								).value;
					} else {
						presenceData.details = applyPrivacy(
							`Viewing a ${
								getNavigationPath()[1] === "Announcements"
									? "announcement"
									: "discussion"
							}`,
							category,
							private
						);
						if (!private)
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
			pagesPath: string[],
			private: boolean
		) => {
			if (pagesPath[0]) {
				if (pagesPath[1] === "edit") {
					presenceData.details = applyPrivacy(
						"Editing a page",
						category,
						private
					);
					if (!private)
						presenceData.state =
							document.querySelector<HTMLInputElement>("#title").value;
				} else {
					presenceData.details = applyPrivacy(
						"Viewing a page",
						category,
						private
					);
					if (!private)
						presenceData.state =
							document.querySelector<HTMLHeadingElement>(
								".page-title"
							).textContent;
				}
			} else {
				const titleInput = document.querySelector<HTMLInputElement>("#title");
				if (titleInput) {
					presenceData.details = applyPrivacy(
						"Creating a page",
						category,
						private
					);
					if (!private) presenceData.state = titleInput.value;
				} else
					presenceData.details = applyPrivacy(
						"Viewing pages",
						category,
						private
					);
			}
		},
		files: (
			presenceData: PresenceData,
			category: string = null,
			private: boolean
		) => {
			if (category)
				presenceData.details = applyPrivacy(
					"Browsing files",
					category,
					private
				);
			else presenceData.details = "Browsing files";
			if (!private)
				presenceData.state = document.querySelector<HTMLAnchorElement>(
					"#breadcrumbs>ul>li+li:last-of-type a"
				).textContent;
		},
		collaborations: (
			presenceData: PresenceData,
			category: string,
			private: boolean
		) => {
			if (
				document.querySelector<HTMLFormElement>("#new_collaboration").style
					.display !== "none"
			) {
				presenceData.details = applyPrivacy(
					"Creating a collaboration",
					category,
					private
				);
				if (!private)
					presenceData.state = document.querySelector<HTMLSelectElement>(
						"#collaboration_collaboration_type"
					).value;
			} else if (
				document.querySelector<HTMLFormElement>(".edit_collaboration")
			) {
				presenceData.details = applyPrivacy(
					"Editing a collaboration",
					category,
					private
				);
				if (!private)
					presenceData.state = document.querySelector<HTMLInputElement>(
						"[name='collaboration[title]']"
					).value;
			} else
				presenceData.details = applyPrivacy(
					"Browsing collaborations",
					category,
					private
				);
		},
		conferences: (
			presenceData: PresenceData,
			category: string,
			private: boolean
		) => {
			const conferenceInput = document.querySelector<HTMLSelectElement>(
				"#web_conference_conference_type"
			);
			if (conferenceInput) {
				presenceData.details = applyPrivacy(
					`${conferenceInput.disabled ? "Editing" : "Creating"} a conference`,
					category,
					private
				);
				if (!private)
					presenceData.state = document.querySelector<HTMLInputElement>(
						"#web_conference_title"
					).value;
			} else
				presenceData.details = applyPrivacy(
					"Browsing conferences",
					category,
					private
				);
		},
		people: (
			presenceData: PresenceData,
			category: string,
			private: boolean
		) => {
			presenceData.details = applyPrivacy(
				"Browsing members",
				category,
				private
			);
		},
		profile: (presenceData: PresenceData, private: boolean) => {
			presenceData.details = "Viewing a user's profile";
			if (!private) {
				presenceData.state = document
					.querySelector<HTMLHeadingElement>("h2")
					.textContent.trim();
				presenceData.smallImageKey = getComputedStyle(
					document.querySelector<HTMLAnchorElement>(".avatar")
				).backgroundImage.match(/url\("(.+)"\)/)[1];
			}
		},
	};

function applyPrivacy(input: string, detail: string, private: boolean) {
	return private ? input : `${input} for ${detail}`;
}

function getNavigationPath(): string[] {
	return [...(document.querySelector("#breadcrumbs > ul")?.children ?? [])]
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
		{ pathname, hostname, search } = document.location,
		pathSplit = pathname.split("/").filter(val => val),
		privacyMode = await presence.getSetting<boolean>("privacyMode");

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
				canvasDataFunctions.profile(presenceData, privacyMode);
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
								`course: ${firstPath}`,
								privacyMode
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
											presenceData.state = navigationPath[2];
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
								`course: ${firstPath}`,
								privacyMode
							);
							break;
						}
						case "conferences": {
							canvasDataFunctions.conferences(
								presenceData,
								`course: ${firstPath}`,
								privacyMode
							);
							break;
						}
						case "discussion_topics": {
							canvasDataFunctions.discussion(
								presenceData,
								`course: ${firstPath}`,
								pathSplit.slice(3),
								privacyMode
							);
							break;
						}
						case "external_tools": {
							presenceData.details = `Viewing course: ${firstPath}`;
							presenceData.state = topPath;
							break;
						}
						case "files": {
							canvasDataFunctions.files(
								presenceData,
								`course: ${firstPath}`,
								privacyMode
							);
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
							if (pathSplit[3]) {
								presenceData.details = `Viewing student grades for course: ${firstPath}`;
								presenceData.state = topPath;
							} else
								presenceData.details = `Viewing grades for course: ${firstPath}`;
							break;
						}
						case "groups": {
							presenceData.details = `Viewing groups for course: ${firstPath}`;
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
								pathSplit.slice(3),
								privacyMode
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
									case "history": {
										presenceData.details = `Viewing an attempt for a quiz in course: ${firstPath}`;
										presenceData.state = `${navigationPath[2]} - Attempt ${
											document
												.querySelector<HTMLAnchorElement>(
													".quiz_version.selected"
												)
												.textContent.match(/(\d+):/)[1]
										}`;
										break;
									}
									case "moderate": {
										presenceData.details = `Moderating a quiz for course: ${firstPath}`;
										presenceData.state = navigationPath[2];
										break;
									}
									case "statistics": {
										presenceData.details = `Viewing statistics for a quiz in course: ${firstPath}`;
										presenceData.state = navigationPath[2];
										break;
									}
									case "submissions": {
										presenceData.details = `Viewing quiz log for course: ${firstPath}`;
										presenceData.state = `${navigationPath[2]} - ${navigationPath[3]}`;
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
											[, years, months, days, hours, minutes, seconds] =
												document
													.querySelector<HTMLDivElement>(".time_running")
													.textContent.match(
														/(?:([\d,]+) Years?, )?(?:(\d+) Months?, )?(?:(\d+) Days?, )?(?:(\d+) Hours?, )?(?:(\d+) Minutes?, )?(\d+) Seconds?/
													)
													.map(x => (x ? +x.replaceAll(",", "") : 0)),
											timeElapsed = new Date(),
											daySeconds =
												seconds + minutes * 60 + hours * 3600 + days * 86400;
										if (timeElapsedType === "Running") {
											timeElapsed.setFullYear(
												timeElapsed.getFullYear() + years
											);
											timeElapsed.setMonth(
												(timeElapsed.getMonth() + 1 + months) % 12
											);
											if (timeElapsed.getMonth() + 1 + months > 12)
												timeElapsed.setFullYear(timeElapsed.getFullYear() + 1);
											timeElapsed.setTime(
												timeElapsed.getTime() + daySeconds * 1000
											);
											delete presenceData.startTimestamp;
											presenceData.endTimestamp = Math.floor(
												timeElapsed.getTime() / 1000
											);
										} else {
											timeElapsed.setFullYear(
												timeElapsed.getFullYear() - years
											);
											timeElapsed.setMonth(
												12 - ((timeElapsed.getMonth() + 1 - months) % 12)
											);
											if (timeElapsed.getMonth() + 1 - months < 0)
												timeElapsed.setFullYear(timeElapsed.getFullYear() - 1);
											timeElapsed.setTime(
												timeElapsed.getTime() - daySeconds * 1000
											);
											presenceData.startTimestamp = Math.floor(
												timeElapsed.getTime() / 1000
											);
										}
										presenceData.state = currentQuestion
											? `${topPath} - ${currentQuestion.nextSibling.textContent}`
											: topPath;
										break;
									}
								}
							} else
								presenceData.details = `Viewing quizzes for course: ${firstPath}`;
							break;
						}
						case "rubrics": {
							if (document.querySelector<HTMLDivElement>("#rubric_new")) {
								presenceData.details = `${
									pathSplit[3] ? "Editing" : "Creating"
								} a rubric for course: ${firstPath}`;
								presenceData.state =
									document.querySelector<HTMLInputElement>(
										"#rubric-title"
									).value;
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
						case "users": {
							if (pathSplit[3])
								canvasDataFunctions.profile(presenceData, privacyMode);
							else {
								canvasDataFunctions.people(
									presenceData,
									`course: ${firstPath}`,
									privacyMode
								);
							}
							break;
						}
					}
				} else presenceData.details = "Browsing all courses";
				break;
			}
			case "files": {
				canvasDataFunctions.files(presenceData, null, privacyMode);
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
								`group: ${firstPath}`,
								privacyMode
							);
							break;
						}
						case "pages": {
							canvasDataFunctions.pages(
								presenceData,
								`group: ${firstPath}`,
								pathSplit.slice(3),
								privacyMode
							);
							break;
						}
						case "discussion_topics": {
							canvasDataFunctions.discussion(
								presenceData,
								`group: ${firstPath}`,
								pathSplit.slice(3),
								privacyMode
							);
							break;
						}
						case "files": {
							canvasDataFunctions.files(
								presenceData,
								`group: ${firstPath}`,
								privacyMode
							);
							break;
						}
						case "collaborations": {
							canvasDataFunctions.collaborations(
								presenceData,
								`group: ${firstPath}`,
								privacyMode
							);
							break;
						}
						case "conferences": {
							canvasDataFunctions.conferences(
								presenceData,
								`group: ${firstPath}`,
								privacyMode
							);
							break;
						}
						case "users": {
							if (pathSplit[3])
								canvasDataFunctions.profile(presenceData, privacyMode);
							else
								canvasDataFunctions.people(
									presenceData,
									`group: ${firstPath}`,
									privacyMode
								);
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
						} else canvasDataFunctions.profile(presenceData, privacyMode);
						break;
					}
					case "communication": {
						presenceData.details = "Managing notification settings";
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
