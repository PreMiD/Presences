const presence = new Presence({
		clientId: "754549450772316160"
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", () => {
	const presenceData: PresenceData = {
		largeImageKey: "logo",
		smallImageKey: "help",
		startTimestamp: browsingTimestamp
	};

	if (
		!document.body.textContent.includes("404 Not Found\nnginx") &&
		!isNaN(Number(location.pathname.replace(/\//g, "")))
	) {
		let text = document.querySelector("#comic > img").getAttribute("title");
		if (text.length > 127) text = `${text.substring(0, 124)}...`;

		presenceData.smallImageText = text;
		presenceData.details = `Reading #${
			document
				.querySelector('[property="og:url"]')
				.getAttribute("content")
				.split("xkcd.com/")[1]
				.split("/")[0]
		}`;
		presenceData.state = document.querySelector("#ctitle").textContent;
	} else presenceData.details = "Browsing XKCD";

	presence.setActivity(presenceData);
});
