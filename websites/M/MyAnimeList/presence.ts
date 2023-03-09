const presence = new Presence({
	clientId: "468420510632509473",
});

presence.on("UpdateData", async () => {
	const { pathname, href } = document.location,
		presenceData: PresenceData = {
			largeImageKey: "https://i.imgur.com/AoF1JnY.png",
		};
	if (pathname === "/") {
		presenceData.details = "Viewing the homepage";
	} else if (
		pathname === "/anime.php" ||
		pathname.startsWith("/topanime") ||
		pathname.startsWith("/watch")
	) {
		presenceData.details = "Looking for anime";
	} else if (
		pathname === "/manga.php" ||
		pathname.startsWith("/topmanga") ||
		pathname.startsWith("/store")
	) {
		presenceData.details = "Looking for manga";
	} else if (pathname.startsWith("/forum")) {
		presenceData.details = "Viewing the forums";
		presenceData.state = document
			.querySelector("meta[property='og:title']")
			.getAttribute("content");
	} else if (pathname.startsWith("/clubs.php")) {
		if (document.querySelectorAll(".normal_header")[1]) {
			presenceData.details = "Viewing a club";
			presenceData.state = document.querySelector(".h1").textContent;
		} else if (
			document.querySelector(".h1-title").textContent === "Invitations"
		) {
			presenceData.details = "Viewing club Invitations";
		} else if (document.querySelector(".h1-title").textContent === "My Clubs") {
			presenceData.details = "Viewing my clubs";
		} else {
			presenceData.details = "Looking for clubs";
		}
	} else if (pathname.startsWith("/blog.php")) {
		presenceData.details = "Viewing the blog";
	} else if (pathname.startsWith("/users.php")) {
		presenceData.details = "Searching for users";
	} else if (pathname.startsWith("/news")) {
		presenceData.details = "Viewing the news";
	} else if (pathname.startsWith("/featured")) {
		if (
			document
				.querySelector("meta[property='og:title']")
				.getAttribute("content")
				.includes("Featured Articles")
		) {
			presenceData.details = "Viewing featured articles";
		} else {
			presenceData.details = "Viewing an article";
			presenceData.state = document.querySelector(".title").textContent;
		}
	} else if (pathname.startsWith("/people")) {
		if (document.querySelector(".h1").textContent === "People") {
			presenceData.details = "Viewing people";
		} else {
			presenceData.details = "Viewing a person";
			presenceData.state = document
				.querySelector(".title-name")
				.textContent.replace(/(<([^>]+)>)/gi, "");
		}
	} else if (pathname.startsWith("/character")) {
		if (document.querySelector(".h1").textContent === "Characters") {
			presenceData.details = "Looking for characters";
		} else {
			presenceData.details = "Viewing a character";
			presenceData.state = document
				.querySelectorAll(".normal_header")[2]
				.textContent.replace(/(<([^>]+)>)/gi, "");
		}
	} else if (pathname.startsWith("/profile")) {
		presenceData.details = "Viewing a profile";
		presenceData.state = pathname.split("/")[2];
	} else if (pathname.startsWith("/animelist")) {
		presenceData.details = "Viewing an anime list";
		presenceData.state = pathname.split("/")[2];
	} else if (pathname.startsWith("/mangalist")) {
		presenceData.details = "Viewing a manga list";
		presenceData.state = pathname.split("/")[2];
	} else if (pathname.startsWith("/anime")) {
		// TODO: The if loop to check if the user is really on the page of an anime is currently always true for some reason which results in the presence going away when the user is for example in the anime directory
		if (document.querySelector(".js-anime-edit-info-button")) {
			presenceData.details = "Viewing an anime";
			presenceData.state = `${
				document.querySelector(".title-name").textContent
			} ${document.querySelector(".title-english")?.textContent ?? ""}`.trim();
		} else {
			presenceData.details = "Looking for anime";
		}
	} else if (pathname.startsWith("/manga")) {
		// TODO: The if loop to check if the user is really on the page of an anime is currently always true for some reason which results in the presence going away when the user is for example in the anime directory
		if (document.querySelector(".js-manga-edit-info-button")) {
			presenceData.details = "Viewing a manga";
			presenceData.state = `${
				document.querySelector(".title-name").textContent
			} ${document.querySelector(".title-english")?.textContent ?? ""}`.trim();
		} else {
			presenceData.details = "Looking for manga";
		}
	}
	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
