const presence = new Presence({
		clientId: "1201520071055515698",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: "https://i.ibb.co/LpxnMfj/512x512pngoflazada.png",
			startTimestamp: browsingTimestamp,
		},
		{ pathname } = document.location;

	let item: HTMLElement;

	if (document.querySelector(".pdp-mod-product-badge-title")) {
		item = document.querySelector(".pdp-mod-product-badge-title");
		presenceData.details = "Viewing Product:";
		presenceData.state = item.textContent;
		presenceData.largeImageKey =
			document.querySelector('meta[name="og:image"]').getAttribute("content") ||
			"";
	} else if (pathname.includes("/tag")) {
		item = document.querySelector(".JrAyI");
		presenceData.details = "Viewing Tags:";
		presenceData.state = item.textContent;
	} else if (pathname.includes("/catalog")) {
		item = document.querySelector(".JrAyI");
		presenceData.details = "Viewing Catalog:";
		presenceData.state = item.textContent;
	} else if (pathname.includes("/customer/order"))
		presenceData.details = "My Orders";
	else if (pathname.includes("/user/login")) {
		presenceData.details = "User:";
		presenceData.state = "Login";
	} else if (pathname.includes("/user/profile")) {
		item = document.querySelector(".my-profile-item-info");
		presenceData.details = "My Profile:";
		presenceData.state = item.textContent;
	} else if (pathname.includes("/address"))
		presenceData.details = "Address Book";
	else if (pathname.includes("/cart")) {
		item = document.querySelector(".checkout-summary-label");
		presenceData.details = "Cart:";
		presenceData.state = item.textContent;
	} else if (pathname.includes("/customer/cancellations/index"))
		presenceData.details = "My Cancellations";
	else if (pathname.includes("customer/cancellations/view")) {
		item = document.querySelector(".info-unit");
		presenceData.details = "Cancellation Details:";
		presenceData.state = item.textContent;
	} else if (pathname.includes("/wallet"))
		presenceData.details = "Lazada Wallet";
	else if (pathname.includes("/customer/myReview"))
		presenceData.details = "My Reviews";
	else if (pathname.includes("/wishlist")) {
		item = document.querySelector(".first ");
		presenceData.details = item.textContent;
	} else if (pathname.includes("/customer/returns"))
		presenceData.details = "My Returns";
	else presenceData.details = "Home";

	if (await presence.getSetting<boolean>("incognito")) {
		presenceData.details = "Incognito";
		presenceData.largeImageKey =
			"https://lzd-img-global.slatic.net/g/tps/tfs/TB1PApewFT7gK0jSZFpXXaTkpXa-200-200.png";
		delete presenceData.state;
		delete presenceData.startTimestamp;
	}
	if (!presenceData.details) presence.setActivity();
	else presence.setActivity(presenceData);
});
