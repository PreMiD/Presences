const presence = new Presence({
	clientId: "468420510632509473",
});

presence.on("UpdateData", async () => {
	const { pathname } = document.location,
		logo = "https://i.imgur.com/AoF1JnY.png";
	if (pathname === "/") {
		presence.setActivity({
			details: "Viewing the homepage",
			largeImageKey: logo,
		});
	} else if (
		pathname === "/anime.php" ||
		pathname.startsWith("/topanime") ||
		pathname.startsWith("/watch")
	) {
		presence.setActivity({
			details: "Looking for anime",
			largeImageKey: logo,
		});
	} else if (
		pathname === "/manga.php" ||
		pathname.startsWith("/topmanga") ||
		pathname.startsWith("/store")
	) {
		presence.setActivity({
			details: "Looking for manga",
			largeImageKey: logo,
		});
	} else if (pathname.startsWith("/forum")) {
		const presenceData: PresenceData = {
			details: "Viewing the forums",
			state: document
				.querySelector("meta[property='og:title']")
				.getAttribute("content"),
			largeImageKey: logo,
		};
		presence.setActivity(presenceData);
	} else if (pathname.startsWith("/clubs.php")) {
		if (document.querySelectorAll(".normal_header")[1]) {
			const presenceData: PresenceData = {
				details: "Viewing a club",
				state: document.querySelector(".h1").textContent,
				largeImageKey: logo,
			};
			presence.setActivity(presenceData);
		} else if (
			document.querySelector(".h1-title").textContent === "Invitations"
		) {
			presence.setActivity({
				details: "Viewing club Invitations",
				largeImageKey: logo,
			});
		} else if (document.querySelector(".h1-title").textContent === "My Clubs") {
			presence.setActivity({
				details: "Viewing my clubs",
				largeImageKey: logo,
			});
		} else {
			presence.setActivity({
				details: "Looking for clubs",
				largeImageKey: logo,
			});
		}
	} else if (pathname.startsWith("/blog.php")) {
		presence.setActivity({
			details: "Viewing the blogs",
			largeImageKey: logo,
		});
	} else if (pathname.startsWith("/users.php")) {
		presence.setActivity({
			details: "Searching for users",
			largeImageKey: logo,
		});
	} else if (pathname.startsWith("/news")) {
		presence.setActivity({
			details: "Viewing the news",
			largeImageKey: logo,
		});
	} else if (pathname.startsWith("/featured")) {
		if (
			document
				.querySelector("meta[property='og:title']")
				.getAttribute("content")
				.includes("Featured Articles")
		) {
			presence.setActivity({
				details: "Viewing featured articles",
				largeImageKey: logo,
			});
		} else {
			const presenceData: PresenceData = {
				details: "Viewing an article",
				state: document.querySelector(".title").textContent,
				largeImageKey: logo,
			};
			presence.setActivity(presenceData);
		}
	} else if (pathname.startsWith("/people")) {
		if (document.querySelector(".h1").textContent === "People") {
			presence.setActivity({
				details: "Viewing people",
				largeImageKey: logo,
			});
		} else {
			const presenceData: PresenceData = {
				details: "Viewing a person",
				state: document
					.querySelector(".title-name")
					.textContent.replace(/(<([^>]+)>)/gi, ""),
				largeImageKey: logo,
			};
			presence.setActivity(presenceData);
		}
	} else if (pathname.startsWith("/character")) {
		if (document.querySelector(".h1").textContent === "Characters") {
			presence.setActivity({
				details: "Looking for characters",
				largeImageKey: logo,
			});
		} else {
			const presenceData: PresenceData = {
				details: "Viewing a character",
				state: document
					.querySelectorAll(".normal_header")[2]
					.textContent.replace(/(<([^>]+)>)/gi, ""),
				largeImageKey: logo,
			};
			presence.setActivity(presenceData);
		}
	} else if (pathname.startsWith("/profile")) {
		presence.setActivity({
			details: "Viewing a profile",
			state: pathname.split("/")[2],
			largeImageKey: logo,
		});
	} else if (pathname.startsWith("/animelist")) {
		presence.setActivity({
			details: "Viewing an anime list",
			state: pathname.split("/")[2],
			largeImageKey: logo,
		});
	} else if (pathname.startsWith("/mangalist")) {
		presence.setActivity({
			details: "Viewing a manga list",
			state: pathname.split("/")[2],
			largeImageKey: logo,
		});
	} else if (pathname.startsWith("/anime")) {
		// TODO: The if loop to check if the user is really on the page of an anime is currently always true for some reason which results in the presence going away when the user is for example in the anime directory
		if (document.querySelector(".js-anime-edit-info-button")) {
			const presenceData: PresenceData = {
				details: "Viewing an anime",
				state: `${document.querySelector(".title-name").textContent} ${
					document.querySelector(".title-english")?.textContent ?? ""
				}`.trim(),
				largeImageKey: logo,
			};
			presence.setActivity(presenceData);
		} else {
			presence.setActivity({
				details: "Looking for anime",
				largeImageKey: logo,
			});
		}
	} else if (pathname.startsWith("/manga")) {
		// TODO: The if loop to check if the user is really on the page of an anime is currently always true for some reason which results in the presence going away when the user is for example in the anime directory
		if (document.querySelector(".js-manga-edit-info-button")) {
			const presenceData: PresenceData = {
				details: "Viewing a manga",
				state: `${document.querySelector(".title-name").textContent} ${
					document.querySelector(".title-english")?.textContent ?? ""
				}`.trim(),
				largeImageKey: logo,
			};
			presence.setActivity(presenceData);
		} else {
			presence.setActivity({
				details: "Looking for manga",
				largeImageKey: logo,
			});
		}
	} else {
		presence.setActivity({
			largeImageKey: logo,
		});
	}
});
