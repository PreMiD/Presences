const presence = new Presence({
	clientId: "468420510632509473",
});

presence.on("UpdateData", async () => {
	if (document.location.pathname === "/") {
		presence.setActivity({
			details: "Viewing the homepage",
			largeImageKey: "lg-mal",
		});
	} else if (
		document.location.pathname === "/anime.php" ||
		document.location.pathname.startsWith("/topanime") ||
		document.location.pathname.startsWith("/watch")
	) {
		presence.setActivity({
			details: "Looking for anime",
			largeImageKey: "lg-mal",
		});
	} else if (
		document.location.pathname === "/manga.php" ||
		document.location.pathname.startsWith("/topmanga") ||
		document.location.pathname.startsWith("/store")
	) {
		presence.setActivity({
			details: "Looking for manga",
			largeImageKey: "lg-mal",
		});
	} else if (document.location.pathname.startsWith("/forum")) {
		const presenceData: PresenceData = {
			details: "Viewing the forums",
			state: document
				.querySelector("meta[property='og:title']")
				.getAttribute("content"),
			largeImageKey: "lg-mal",
		};
		presence.setActivity(presenceData);
	} else if (document.location.pathname.startsWith("/clubs.php")) {
		if (document.querySelectorAll(".normal_header")[1]) {
			const presenceData: PresenceData = {
				details: "Viewing an club",
				state: document.querySelectorAll(".h1")[0].textContent,
				largeImageKey: "lg-mal",
			};
			presence.setActivity(presenceData);
		} else if (
			document.querySelectorAll(".h1-title")[0].textContent === "Invitations"
		) {
			presence.setActivity({
				details: "Viewing club Invitations",
				largeImageKey: "lg-mal",
			});
		} else if (
			document.querySelectorAll(".h1-title")[0].textContent === "My Clubs"
		) {
			presence.setActivity({
				details: "Viewing my clubs",
				largeImageKey: "lg-mal",
			});
		} else {
			presence.setActivity({
				details: "Looking for clubs",
				largeImageKey: "lg-mal",
			});
		}
	} else if (document.location.pathname.startsWith("/blog.php")) {
		presence.setActivity({
			details: "Viewing the blogs",
			largeImageKey: "lg-mal",
		});
	} else if (document.location.pathname.startsWith("/users.php")) {
		presence.setActivity({
			details: "Searching for users",
			largeImageKey: "lg-mal",
		});
	} else if (document.location.pathname.startsWith("/news")) {
		presence.setActivity({
			details: "Viewing the news",
			largeImageKey: "lg-mal",
		});
	} else if (document.location.pathname.startsWith("/featured")) {
		if (
			document
				.querySelector("meta[property='og:title']")
				.getAttribute("content")
				.includes("Featured Articles")
		) {
			presence.setActivity({
				details: "Viewing featured articles",
				largeImageKey: "lg-mal",
			});
		} else {
			const presenceData: PresenceData = {
				details: "Viewing an article",
				state: document.querySelectorAll(".title")[0].textContent,
				largeImageKey: "lg-mal",
			};
			presence.setActivity(presenceData);
		}
	} else if (document.location.pathname.startsWith("/people")) {
		if (document.querySelectorAll(".h1")[0].textContent === "People") {
			presence.setActivity({
				details: "Viewing peoples",
				largeImageKey: "lg-mal",
			});
		} else {
			const presenceData: PresenceData = {
				details: "Viewing a person",
				state: document
					.querySelectorAll(".title-name")[0]
					.textContent.replace(/(<([^>]+)>)/gi, ""),
				largeImageKey: "lg-mal",
			};
			presence.setActivity(presenceData);
		}
	} else if (document.location.pathname.startsWith("/character")) {
		if (document.querySelectorAll(".h1")[0].textContent === "Characters") {
			presence.setActivity({
				details: "Looking for characters",
				largeImageKey: "lg-mal",
			});
		} else {
			const presenceData: PresenceData = {
				details: "Viewing an character",
				state: document
					.querySelectorAll(".normal_header")[2]
					.textContent.replace(/(<([^>]+)>)/gi, ""),
				largeImageKey: "lg-mal",
			};
			presence.setActivity(presenceData);
		}
	} else if (document.location.pathname.startsWith("/profile")) {
		const presenceData: PresenceData = {
			details: "Viewing a profile",
			state: document.location.pathname.split("/")[2],
			largeImageKey: "lg-mal",
		};
		presence.setActivity(presenceData);
	} else if (document.location.pathname.startsWith("/animelist")) {
		const presenceData: PresenceData = {
			details: "Viewing an anime list",
			state: document.location.pathname.split("/")[2],
			largeImageKey: "lg-mal",
		};
		presence.setActivity(presenceData);
	} else if (document.location.pathname.startsWith("/mangalist")) {
		const presenceData: PresenceData = {
			details: "Viewing a manga list",
			state: document.location.pathname.split("/")[2],
			largeImageKey: "lg-mal",
		};
		presence.setActivity(presenceData);
	} else if (document.location.pathname.startsWith("/anime")) {
		// TODO: The if loop to check if thhe user is really on the page of an anime is currently always true for some reason which results in the presence going away when the user is for example in the anime directory
		if (document.querySelectorAll(".js-anime-edit-info-button")[0]) {
			const presenceData: PresenceData = {
				details: "Viewing an anime",
				state:
					document.querySelectorAll(".header-right")[0].parentNode.childNodes[1]
						.textContent,
				largeImageKey: "lg-mal",
			};
			presence.setActivity(presenceData);
		} else {
			presence.setActivity({
				details: "Looking for anime",
				largeImageKey: "lg-mal",
			});
		}
	} else if (document.location.pathname.startsWith("/manga")) {
		// TODO: The if loop to check if thhe user is really on the page of an anime is currently always true for some reason which results in the presence going away when the user is for example in the anime directory
		if (document.querySelectorAll(".js-manga-edit-info-button")[0]) {
			const presenceData: PresenceData = {
				details: "Viewing a manga",
				state:
					document.querySelectorAll(".header-right")[0].parentNode.childNodes[1]
						.textContent,
				largeImageKey: "lg-mal",
			};
			presence.setActivity(presenceData);
		} else {
			presence.setActivity({
				details: "Looking for manga",
				largeImageKey: "lg-mal",
			});
		}
	} else {
		presence.setActivity({
			largeImageKey: "lg-mal",
		});
	}
});
