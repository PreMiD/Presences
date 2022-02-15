const presence = new Presence({
		clientId: "938732156346314795"
	}),
	user = document.cookie
		.split(";")
		.find(val => val.trim().startsWith("letterboxd"))
		.split("=")[1],
	browsingTimestamp = Math.floor(Date.now() / 1000);

function generateButtonText(text: string): [ButtonData] {
	return [
		{
			label: text.replace("Viewing", "View"),
			url: window.location.href
		}
	];
}

function clarifyString(str: string) {
	return str
		.replaceAll(String.fromCharCode(160), " ")
		.replaceAll(String.fromCharCode(8217), "'");
}

function getImageURLByAlt(alt: string) {
	return Array.from(document.getElementsByTagName("img")).find(
		img => img.alt === alt
	)?.src;
}

function filterIterable<T extends Element>(
	itr: HTMLCollectionOf<T>,
	fnc: (val: T, ind?: number) => boolean
) {
	return Array.from(itr).find((element, ind) => fnc(element, ind));
}

presence.on("UpdateData", async () => {
	const path = document.location.pathname.slice(1).split("/");
	path.pop();

	const presenceData: PresenceData = {
		largeImageKey: "final",
		startTimestamp: browsingTimestamp
	};

	if (path[0]) {
		switch (path[0]) {
			case "lists":
				presenceData.details = "Viewing all lists";
				presenceData.buttons = generateButtonText(presenceData.details);
				break;
			case "members":
				presenceData.details = "Viewing all members";
				presenceData.buttons = generateButtonText(presenceData.details);
				break;
			case "journal":
				presenceData.details = "Viewing the journal";
				presenceData.buttons = generateButtonText(presenceData.details);
				break;
			case "search":
				presenceData.details = `Searching for ${path[1].replaceAll("+", " ")}`;
				break;

			case "settings": {
				const smallPFP = getImageURLByAlt(user);

				presenceData.details = "Changing their settings";
				presenceData.smallImageKey = smallPFP;

				break;
			}

			case "list": {
				const smallPFP = getImageURLByAlt(user);

				presenceData.details = "Creating a list";
				presenceData.smallImageKey = smallPFP;

				break;
			}

			case "invitations": {
				const smallPFP = getImageURLByAlt(user);

				presenceData.details = "Viewing their invitations";
				presenceData.smallImageKey = smallPFP;

				break;
			}

			case "actor":
			case "director": {
				const name = (
						document.getElementsByClassName(
							"title-1 prettify"
						)[0] as HTMLHeadingElement
					).innerText.replace(
						path[0] === "director" ? "FILMS DIRECTED BY\n" : "FILMS STARRING\n",
						""
					),
					pfp = (
						(
							document.getElementsByClassName(
								"avatar person-image image-loaded"
							)[0] as HTMLDivElement
						).firstElementChild as HTMLImageElement
					).src;

				presenceData.details = `Viewing ${
					path[0] === "director" ? "director" : "actor"
				}: ${name}`;
				presenceData.largeImageKey = pfp;
				presenceData.smallImageKey = "final";
				presenceData.buttons = generateButtonText(presenceData.details);

				break;
			}

			case "activity": {
				const name = (
						document.getElementsByClassName("title-3")[0]
							.firstElementChild as HTMLAnchorElement
					).innerText,
					smallPFP = getImageURLByAlt(name);

				presenceData.smallImageKey = smallPFP;
				presenceData.smallImageText = name;

				if (path[1]) {
					switch (path[1]) {
						case "you":
							presenceData.details = "Viewing personal activity";
							break;
						case "incoming":
							presenceData.details = "Viewing incoming activity";
							break;
					}
				} else presenceData.details = "Viewing all activity";

				break;
			}

			case "films": {
				if (path[1]) {
					switch (path[1]) {
						case "upcoming":
							presenceData.details = "Viewing upcoming films";
							break;
						case "popular":
							presenceData.details = "Viewing popular films";
							break;
						case "genre":
							presenceData.details = `Viewing ${
								path[2] ? path[2] : "unknown"
							} films`;
							break;
						case "decade":
							presenceData.details = `Viewing films from the ${
								path[2] ? path[2] : "unknown"
							}`;
					}
				} else presenceData.details = "Viewing films";

				if (!presenceData.details) presenceData.details = "Viewing films";
				presenceData.buttons = generateButtonText(presenceData.details);

				break;
			}

			case "film": {
				if (path[1]) {
					switch (path[1]) {
						default: {
							if (path[2]) {
								if (path[2] === "trailer") {
									const header = document.getElementById(
											"featured-film-header"
										),
										title = clarifyString(
											(header.firstElementChild as HTMLElement).innerText
										);

									presenceData.details = "Viewing the trailer of...";
									presenceData.state = `${title}, ${
										(
											header.lastElementChild.firstElementChild
												.firstElementChild as HTMLAnchorElement
										).innerText
									}`;
									presenceData.largeImageKey = getImageURLByAlt(title);
									presenceData.smallImageKey = "final";
									delete presenceData.startTimestamp;
									presenceData.buttons = [
										{ label: "Watch trailer", url: window.location.href }
									];
								} else {
									const title = document.getElementsByClassName(
											"contextual-title"
										)[0].firstElementChild.firstElementChild
											.nextElementSibling as HTMLAnchorElement,
										year = (
											title.nextElementSibling
												.firstElementChild as HTMLAnchorElement
										).innerText;

									switch (path[2]) {
										case "members":
											presenceData.details = `Viewing people who have seen ${title.innerText}, ${year}`;
											break;
										case "fans":
											presenceData.details = `Viewing fans of ${title.innerText}, ${year}`;
											break;
										case "likes":
											presenceData.details = `Viewing people who have liked ${title.innerText}, ${year}`;
											break;
										case "ratings":
											presenceData.details = `Viewing ratings of ${title.innerText}, ${year}`;
											break;
										case "reviews":
											presenceData.details = `Viewing reviews of ${title.innerText}, ${year}`;
											break;
										case "lists":
											presenceData.details = `Viewing lists that include ${title.innerText}, ${year}`;
											break;
									}

									presenceData.buttons = generateButtonText(
										presenceData.details
									);
									presenceData.largeImageKey = getImageURLByAlt(
										clarifyString(title.innerText)
									);
									presenceData.smallImageKey = "final";
								}
							} else {
								const header = document.getElementById("featured-film-header"),
									title = clarifyString(
										(header.firstElementChild as HTMLElement).innerText
									);

								presenceData.details = `${title}, ${
									(
										header.lastElementChild.firstElementChild
											.firstElementChild as HTMLAnchorElement
									).innerText
								}`;
								presenceData.state = `By ${
									(
										header.lastElementChild.lastElementChild
											.firstElementChild as HTMLSpanElement
									).innerText
								}`;
								presenceData.buttons = [
									{ label: `View ${title}`, url: window.location.href }
								];
								presenceData.largeImageKey = getImageURLByAlt(title);
								presenceData.smallImageKey = "final";
								break;
							}
						}
					}
				}
				break;
			}

			default:
				if (path[1]) {
					switch (path[1]) {
						case "watchlist":
							presenceData.details = "Viewing their watchlist";
							presenceData.buttons = generateButtonText(presenceData.details);
							break;
						case "lists":
							presenceData.details = "Viewing their lists";
							presenceData.buttons = generateButtonText(presenceData.details);
							break;
						case "likes":
							presenceData.details = "Viewing their liked films";
							presenceData.buttons = generateButtonText(presenceData.details);
							break;
						case "following":
							presenceData.details = "Viewing who they've followed";
							presenceData.buttons = generateButtonText(presenceData.details);
							break;
						case "followers":
							presenceData.details = "Viewing their followers";
							break;
						case "blocked":
							presenceData.details = "Viewing who they've blocked";
							break;

						case "activity": {
							if (path[2]) {
								presenceData.details =
									"Viewing who they've followed's activity";
							} else presenceData.details = "Viewing their activity";

							break;
						}

						case "films":
							{
								if (path[2]) {
									switch (path[2]) {
										case "reviews":
											presenceData.details = "Viewing their reviews";
											presenceData.buttons = generateButtonText(
												presenceData.details
											);
											break;
										case "ratings":
											presenceData.details = "Viewing their ratings";
											presenceData.buttons = generateButtonText(
												presenceData.details
											);
											break;
										case "diary":
											presenceData.details = "Viewing their diary";
											presenceData.buttons = generateButtonText(
												presenceData.details
											);
											break;
									}
								} else {
									presenceData.details = "Viewing their films";
									presenceData.buttons = generateButtonText(
										presenceData.details
									);
								}
							}
							break;

						case "tags": {
							if (path[2]) {
								switch (path[2]) {
									case "diary":
										presenceData.details = "Viewing their diary tags";
										presenceData.buttons = generateButtonText(
											presenceData.details
										);
										break;
									case "reviews":
										presenceData.details = "Viewing their tagged reviews";
										presenceData.buttons = generateButtonText(
											presenceData.details
										);
										break;
									case "lists":
										presenceData.details = "Viewing their tagged lists";
										presenceData.buttons = generateButtonText(
											presenceData.details
										);
										break;
								}
							} else {
								presenceData.details = "Viewing their tagged films";
								presenceData.buttons = generateButtonText(presenceData.details);
							}

							break;
						}

						case "stats": {
							const name = document.getElementsByClassName(
								"yir-member-subtitle"
							)[0].lastElementChild as HTMLAnchorElement;
							presenceData.details = `Viewing ${name.innerText}'s statistics`;
							presenceData.largeImageKey = (
								name.previousElementSibling
									.firstElementChild as HTMLImageElement
							).src;
							presenceData.smallImageKey = "final";
							presenceData.buttons = [
								{
									label: `View ${name.innerText}'s stats`,
									url: window.location.href
								}
							];

							break;
						}

						case "list": {
							const title = (
									document.getElementsByClassName(
										"title-1 prettify"
									)[0] as HTMLHeadingElement
								).innerText,
								name = (
									document.getElementsByClassName("name")[0]
										.firstElementChild as HTMLSpanElement
								).innerText,
								smallPFP = getImageURLByAlt(name);

							presenceData.details = `Viewing the list ${title}`;
							presenceData.buttons = generateButtonText(presenceData.details);
							presenceData.state = `By ${name}`;
							presenceData.smallImageKey = smallPFP;
							presenceData.smallImageText = name;

							break;
						}

						case "friends": {
							const title = document.getElementsByClassName(
									"contextual-title"
								)[0].firstElementChild.firstElementChild
									.nextElementSibling as HTMLAnchorElement,
								year = (
									title.nextElementSibling
										.firstElementChild as HTMLAnchorElement
								).innerText;

							if (path[4]) {
								switch (path[4]) {
									case "ratings":
										presenceData.details = "Viewing friends' ratings of...";
										break;
									case "reviews":
										presenceData.details = "Viewing friends' reviews of...";
										break;
									case "lists":
										presenceData.details =
											"Viewing friends' lists that include...";
										break;
									case "fans":
										presenceData.details = "Viewing friends who are fans of...";
										break;
									case "likes":
										presenceData.details = "Viewing friends who have liked...";
										break;
								}
							} else presenceData.details = "Viewing friends who have seen...";

							presenceData.state = `${title.innerText}, ${year}`;
							presenceData.largeImageKey = getImageURLByAlt(
								clarifyString(title.innerText)
							);
							presenceData.smallImageKey = "final";

							break;
						}

						case "film": {
							const title = clarifyString(
									(
										document.getElementsByClassName("film-title-wrapper")[0]
											.firstElementChild as HTMLAnchorElement
									).innerText
								),
								rater = filterIterable(
									document.getElementsByTagName("span"),
									val => {
										if (val.getAttribute("itemprop") === "name") return true;
									}
								).innerText,
								rating = filterIterable(
									document.getElementsByTagName("span"),
									val => {
										if (val.className.startsWith("rating rating-large"))
											return true;
									}
								).innerText;

							presenceData.details = `Review of ${title}`;
							presenceData.state = `By ${rater} (${rating})`;
							presenceData.buttons = [
								{ label: "View review", url: window.location.href }
							];
							presenceData.largeImageKey = getImageURLByAlt(title);
							presenceData.smallImageKey = getImageURLByAlt(rater);
							presenceData.smallImageText = rater;

							break;
						}
					}

					if (
						[
							"watchlist",
							"films",
							"activity",
							"blocked",
							"followers",
							"following",
							"tags",
							"likes",
							"lists"
						].includes(path[1])
					) {
						const name = (
								document.getElementsByClassName("title-3")[0]
									.firstElementChild as HTMLAnchorElement
							).innerText,
							smallPFP = getImageURLByAlt(name);

						if (path[0] !== user && path[0] !== user.toLowerCase()) {
							presenceData.details = presenceData.details
								.replace("their", `${name}'s`)
								.replace("they've", `${name} has`);
						}

						presenceData.smallImageKey = smallPFP;
						presenceData.smallImageText = name;
					}
				} else {
					const name = (
						document.getElementsByClassName("title-1")[0] as HTMLHeadingElement
					).innerText;
					// I could use the get image func but ID is available so its fine (smaller loop (I think))
					presenceData.details = `Viewing ${
						path[0] === user ? "their own" : `${name}'s`
					} profile`;
					presenceData.state = `(${
						path[0] === user ? `${name}/${path[0]}` : path[0]
					})`;
					presenceData.largeImageKey = (
						document.getElementById("avatar-zoom")
							.previousElementSibling as HTMLImageElement
					).src;
					presenceData.smallImageKey = "final";
					presenceData.buttons = [
						{ label: `View ${name}`, url: window.location.href }
					];

					break;
				}
		}
	} else presenceData.details = "At home";

	if (!(await presence.getSetting("show_buttons"))) delete presenceData.buttons;

	presence.setActivity(presenceData);
});
