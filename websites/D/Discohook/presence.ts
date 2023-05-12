const presence = new Presence({
		clientId: "1036322932932218880",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", () => {
	const presenceData: PresenceData = {
			largeImageKey: "https://i.imgur.com/7JEHmcz.png",
			startTimestamp: browsingTimestamp,
		},
		webhookCount = document.querySelectorAll(".evedhr > .dWrjaT").length,
		messageCount = document.querySelectorAll(".jQDPRQ").length,
		embedCount = document.querySelectorAll(".jQDPPo > section").length;

	presenceData.details =
		webhookCount > 1 ? `Editing ${webhookCount} webhooks` : "Editing a webhook";

	presenceData.state = `${messageCount} message${
		messageCount > 1 ? "s" : ""
	} - ${embedCount} embed${embedCount > 1 || embedCount === 0 ? "s" : ""}`;

	presence.setActivity(presenceData);
});
