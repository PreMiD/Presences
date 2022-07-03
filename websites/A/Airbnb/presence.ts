const presence = new Presence({
	clientId: "993151156652093480",
}),
browsingTimestamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
const presenceData: PresenceData = {
	largeImageKey: "logo",
};

presenceData.startTimestamp = browsingTimestamp;
if (document.location.pathname.includes("/rooms")) {
	presenceData.details = "Viewing rooms";
	const room = document.querySelector("#site-content > div > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div > div > div > div > section > div._b8stb0 > span > h1").textContent;
	presenceData.state = room;
	presenceData.buttons = [{ label: "View Room", url: document.location.href}];
} else if (document.location.pathname.includes("/book")) {
	const room = document.querySelector("#LISTING_CARD-title").textContent;
	presenceData.details = `Booking ${room}`;
	const dates = document.querySelector('[data-plugin-in-point-id="DATE_PICKER"] > div > div > div._b7b6bk > div._1qyi2pa > div._jbk4n3').textContent,
	 guests = document.querySelector('[data-plugin-in-point-id="GUEST_PICKER"] > div > div > div._b7b6bk > div._1qyi2pa > div._jbk4n3').textContent;
	presenceData.state = `From ${dates} for ${guests}`;
	presenceData.buttons = [{ label: "View Booking Details", url: document.location.href}];
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
else
	presenceData.details = "Browsing";

presence.setActivity(presenceData);
});