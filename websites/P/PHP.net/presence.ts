const presence = new Presence({
		clientId: "952575137180442626"
	}),
	browsingStamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", () => {
	const data: PresenceData = {
			largeImageKey: "php_logo",
			startTimestamp: browsingStamp
		},
		route = document.location.pathname.split("/");

	switch (route[1]) {
		case "":
			data.details = "Browsing the main page...";
			break;
		case "downloads":
		case "downloads.php":
			data.details = "Browsing the download section";
			break;
		case "docs.php":
			data.details = "Browsing the documentation";
			break;
		case "download-docs.php":
			data.details = "Downloading the documentation";
			break;
		case "download-logos.php":
			data.details = "Viewing the official logos";
			break;
		case "manual":{
			data.details = "Viewing the documentation: ";
			const manualTitle = document.title
				.replaceAll("PHP: ", "")
				.replaceAll(" - Manual", "");
			if (route[3].includes("function."))
				data.state = `Function: ${manualTitle}`;
			else if (route[3].includes("language.")) {
				const c = route[3].split(".")[1];
				data.state = `${
					c.charAt(0).toUpperCase() + c.slice(1)
				}: ${manualTitle}`;
			} else data.state = manualTitle;
			break;
		}
		case "releases":
			if (route[2] != "") {
				data.details = "Viewing an release version:";
				data.state = `PHP v${route[2]}`;
			} else data.details = "Viewing the releases";
			break;
		default:
			data.details = "Browsing the website";
	}

	if (route[1].toLowerCase().includes("changelog"))
		data.details = "Reading the changelogs";

	presence.setActivity(data);
});
