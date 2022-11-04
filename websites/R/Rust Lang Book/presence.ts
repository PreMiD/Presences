const presence = new Presence({
	clientId: "1033608073106968576",
});

presence.on("UpdateData", async () => {
	const path = window.location.pathname
			.replace("/book/", "")
			.replace(".html", ""),
		presenceData: PresenceData = {
			largeImageKey: "rust-logo-512",
			smallImageKey: "ferris-512",
			smallImageText: "Hi rustaceans!",
			buttons: [
				{
					label: "Read the book",
					url: window.location.href,
				},
			],
		};

	if (path === "" || path === "title-page")
		presenceData.details = "Viewing the book homepage";
	else if (path === "foreword") presenceData.details = "Reading the foreword";
	else if (path.startsWith("ch")) {
		presenceData.details = `Reading chapter ${
			path.replace("ch", "").split("-")[0]
		}`;
		if (path.split("-")[1] === "00")
			presenceData.state = document.querySelectorAll("h1")[1].textContent;
		else presenceData.state = document.querySelector("h2").textContent;
	} else if (path.startsWith("appendix")) {
		presenceData.details = `Reading appendix ${
			path.replace("appendix", "").split("-")[0]
		}`;
		if (path.split("-")[1] === "00")
			presenceData.state = document.querySelectorAll("h1")[1].textContent;
		else presenceData.state = document.querySelector("h2").textContent;
	}

	presence.setActivity(presenceData);
});
