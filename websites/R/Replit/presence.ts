const presence = new Presence({
		clientId: "830504223153717311",
	}),
	browsingTimestamp = Math.floor(Date.now());

presence.on("UpdateData", () => {
	const presenceData: PresenceData = {
			details: "Viewing unsupported page",
			largeImageKey: "https://i.imgur.com/jL7ohN5.png",
			startTimestamp: browsingTimestamp,
		},
		{ pathname } = document.location;

	if (pathname === "/" || pathname === "/~")
		presenceData.details = "Viewing home page";
	else if (pathname.startsWith("/@")) {
		if (
			pathname
				.replace("/@", "")
				.split("/")
				.filter(elm => elm !== "").length === 1
		) {
			presenceData.details = "Viewing a user's profile";
			presenceData.state = pathname.replace("/@", "");
		} else if (
			document.querySelector<HTMLSpanElement>(".content span") &&
			!document.querySelector(".breadcrumb-content")
		) {
			presenceData.details = `Viewing ${
				pathname.replace("/@", "").split("/")[0]
			}'s repl`;
			presenceData.state =
				document.querySelector<HTMLSpanElement>(".content span").textContent;
		} else {
			presenceData.details = `Editing ${
				document.querySelector<HTMLDivElement>("div.language-icon-container")
					.title
			} repl`;
			presenceData.state = `${
				pathname.split("/").filter(elm => elm !== "")[1]
			}${window.location.hash ? ` - ${window.location.hash.slice(1)}` : ""}`;
		}
	} else if (pathname.startsWith("/notifications"))
		presenceData.details = "Viewing notifications";
	else if (pathname.startsWith("/languages")) {
		presenceData.details = "Browsing languages:";
		presenceData.state = "All languages";
	} else if (pathname.startsWith("/new")) {
		presenceData.details = "Creating new repl:";
		presenceData.state = `${
			document.querySelector<HTMLInputElement>(
				"input[data-cy='new-repl-language-input']"
			).value || "No languages chosen"
		}`;
	} else if (pathname.startsWith("/repls")) {
		const repls = document.querySelector<HTMLDivElement>(
				"#__next > div > div > div.jsx-2888589246.content > div.jsx-1264267603.repl-content > div.jsx-4064465542 > div:nth-child(3)"
			),
			length = repls
				? repls.children.length - (pathname === "/repls" ? 2 : 1)
				: 0;
		presenceData.details = `Viewing repls ${length ? `(Total ${length})` : ""}`;
		presenceData.state = `${
			pathname === "/repls"
				? "In the main page"
				: `In a folder : ${pathname.replace("/repls/folder/", "")}`
		}`;
	} else if (pathname.startsWith("/community")) {
		presenceData.details = "Surfing feed";
		const [postType] = pathname.replace("/community/", "").split("/"),
			postElement: HTMLDivElement = document.querySelector(
				"#__next > div > div.jsx-132086333.content > div.jsx-2019133593 > div.jsx-2019133593.post-page-content > div.jsx-347352367 > div.jsx-347352367.board-post-detail-header > div.jsx-347352367.board-post-detail-title"
			);
		switch (pathname.replace("/community/", "")) {
			case "all":
				presenceData.state = "All posts";
				break;
			default:
				presenceData.state = `${postType
					.charAt(0)
					.toUpperCase()}${postType.slice(1)}${
					postElement ? ` : ${postElement.textContent}` : ""
				}`;
				break;
		}
	} else if (pathname.startsWith("/templates"))
		presenceData.details = "Viewing replit templates";
	presence.setActivity(presenceData);
});
