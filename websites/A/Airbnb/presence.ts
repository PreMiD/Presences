const presence = new Presence({
		clientId: "993151156652093480",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		largeImageKey: "logo",
		startTimestamp: browsingTimestamp,
	},

		privacy = await presence.getSetting("privacy");

	if (document.location.pathname.includes("/rooms")) {
		if (privacy) {
			presenceData.details = "Viewing a room";
			delete presenceData.state;
			delete presenceData.buttons;
		} else {
			presenceData.details = "Viewing a room";
			presenceData.state = document.querySelector(
				"#site-content > div > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div > div > div > div > section > div._b8stb0 > span > h1"
			).textContent;
			presenceData.buttons = [
				{ label: "View Room", url: document.location.href },
			];
		}
	} else if (document.location.pathname.includes("/book")) {
		if (privacy) {
			presenceData.details = "Booking a room";
		} else {
			presenceData.details = `Booking ${document.querySelector("#LISTING_CARD-title").textContent
				}`;
			presenceData.state = `From ${document.querySelector(
				'[data-plugin-in-point-id="DATE_PICKER"] > div > div > div._b7b6bk > div._1qyi2pa > div._jbk4n3'
			).textContent
				} for ${document.querySelector(
					'[data-plugin-in-point-id="GUEST_PICKER"] > div > div > div._b7b6bk > div._1qyi2pa > div._jbk4n3'
				).textContent
				}`;
			presenceData.buttons = [
				{ label: "View Booking Details", url: document.location.href },
			];
		}
	} else if (document.location.pathname.includes("/inbox"))
		presenceData.details = "Viewing Messages";
	else if (document.location.pathname.includes("notifications"))
		presenceData.details = "Viewing Notifications";
	else if (document.location.pathname.includes("wishlists"))
		presenceData.details = "Viewing wishlists";
	else if (document.location.pathname.includes("split-stays"))
		presenceData.details = "Viewing a split stay";
	else if (document.location.pathname.includes("/account"))
		presenceData.details = "Viewing account details";
	else presenceData.details = "Browsing";

	presence.setActivity(presenceData);
});
