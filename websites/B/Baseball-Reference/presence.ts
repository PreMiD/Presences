const presence = new Presence({
		clientId: "1049610101725605899",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000),
	{ href, pathname, hostname } = document.location;

let team: string = null,
	image = document.images.item(1).src;

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		startTimestamp: browsingTimestamp,
	};
	presence.setActivity(presenceData);
	if (hostname === "baseball-reference.com") {
		if (pathname === "/") presenceData.details = "Viewing Home Page";
	} else if (pathname.includes("/players")) {
		presenceData.details = "Viewing a Player";
		presenceData.state = `${
			document.querySelector("div#meta div h1 span").textContent
		} | ${document
			.querySelector("div#meta div p strong")
			.nextSibling.textContent.replace(/\s/g, " ")
			.trim()}`;
		if (!presence.getActivity().largeImageKey)
			presenceData.largeImageKey = image;

		presenceData.buttons = [{ label: "View Player", url: href }];

		if (
			document.querySelector("#meta > div:nth-child(2) > p:nth-child(5) > a")
		) {
			team = document.querySelector(
				"#meta > div:nth-child(2) > p:nth-child(5) > a"
			).textContent;
			presenceData.state = `${presenceData.state} For The ${team}`;
		}
	} else if (pathname.includes("/managers")) {
		presenceData.details = "Viewing a Manager";
		presenceData.state = document.querySelector(
			"div#meta div h1 span"
		).textContent;
		if (!presence.getActivity().largeImageKey)
			presenceData.largeImageKey = image;

		presenceData.buttons = [{ label: "View Manager", url: href }];
	} else if (pathname.includes("/teams")) {
		presenceData.details = "Viewing a Team";
		presenceData.state = `${
			document.querySelector("div#meta div h1 span").textContent
		} ${
			document.querySelector("div#meta div h1 span").nextElementSibling
				.textContent
		}`;
		if (!presence.getActivity().largeImageKey)
			presenceData.largeImageKey = image;

		presenceData.buttons = [{ label: "View Team", url: href }];
	} else if (pathname.includes("/leagues")) {
		presenceData.details = "Viewing Stats";
		presenceData.state = `${
			document.querySelector("div#meta div h1 span").textContent
		} ${
			document.querySelector("div#meta div h1 span").nextElementSibling
				.textContent
		} ${document.querySelector("div#meta div h1 span.header_end").textContent}`;
		if (!presence.getActivity().largeImageKey)
			presenceData.largeImageKey = image;

		presenceData.buttons = [{ label: "View Page", url: href }];
	} else if (pathname.includes("/boxes")) {
		presenceData.details = "Viewing Box Score";
		presenceData.state = document
			.querySelector("div h1")
			.textContent.replace(" vs ", "@");
		if (!presence.getActivity().largeImageKey)
			image = document.images.item(2).src;

		presenceData.largeImageKey = image;
		presenceData.buttons = [{ label: "View Box Score", url: href }];
	} else if (pathname.includes("/friv")) {
		presenceData.details = "Viewing Misc";
		presenceData.state = document.querySelector("div h1").textContent;
		presenceData.buttons = [{ label: "View Page", url: href }];
	} else if (pathname.includes("/oracle")) {
		presenceData.details = "Consulting the Oracle of Baseball";
		presenceData.state = document.querySelector("div h1").textContent;
		presenceData.buttons = [{ label: "View Page", url: href }];
	}
	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
