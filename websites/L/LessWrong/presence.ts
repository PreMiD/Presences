const presence = new Presence({
	clientId: "1310452380915077170",
});

function capitalize(string: string): string {
	return string.charAt(0).toUpperCase() + string.substring(1);
}

const browsingTimestamp = Math.floor(Date.now() / 1000);
let data;

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		largeImageKey: "https://i.imgur.com/GnuhkCJ.png",
		startTimestamp: browsingTimestamp,
	};

	if (document.location.pathname === "/") {
		presenceData.details = "Browsing LessWrong";
		presenceData.state = "at Homepage";
	} else if (document.location.pathname.startsWith("/posts/")) {
		data = document.location.pathname.split("/");
		presenceData.details = `Reading ${data[1]}`;
		presenceData.state = `${capitalize(
			data[3].replace(/-\d+$/, "").split("-").join(" ")
		)}`;
	} else {
		presenceData.details = "Browsing LessWrong";
		presenceData.state = " ";
	}

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
