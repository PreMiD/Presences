const presence = new Presence({
		clientId: "1201520071055515698",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

let item: HTMLElement;

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		largeImageKey: 
			"https://lzd-img-global.slatic.net/g/tps/tfs/TB1PApewFT7gK0jSZFpXXaTkpXa-200-200.png",
		startTimestamp: browsingTimestamp,	
	};

	if (document.querySelector(".pdp-mod-product-badge-title")) { // PRODUCT
		item = document.querySelector(".pdp-mod-product-badge-title");
		presenceData.details = "Viewing Product:";
		presenceData.state = item.textContent;
		presenceData.largeImageKey = document.querySelector('meta[name="og:image"]').getAttribute("content") || "";
	} else if (document.location.pathname.includes("/tag")) { // TAGS
		item = document.querySelector(".JrAyI");
		presenceData.details = "Tags:";
		presenceData.state = item.textContent;
	} else if (document.location.pathname.includes("/catalog")) { // CATALOG
		item = document.querySelector(".JrAyI");
		presenceData.details = "Catalog:";
		presenceData.state = item.textContent;
	} else if (document.location.pathname.includes("/customer/order")) { // ORDER
		presenceData.details = "My Orders";
	} else if (document.location.pathname.includes("/user/login")) { // LOGIN
		presenceData.details = "User:";
		presenceData.state = "Login";
	} else if (document.location.pathname.includes("/user/profile")) { // PROFILE
		item = document.querySelector(".my-profile-item-info");
		presenceData.details = "My Profile:";
		presenceData.state = item.textContent;
	} else if (document.location.pathname.includes("/address")) { // ADDRESS
		presenceData.details = "Address Book";
	} else if (document.location.pathname.includes("/cart")) { // CART
		item = document.querySelector(".checkout-summary-label");
		presenceData.details = "Cart:";
		presenceData.state = item.textContent;
	} else if (document.location.pathname.includes("/customer/cancellations/index")) { // CANCALLATIONS
		presenceData.details = "My Cancellations";
	} else if (document.location.pathname.includes("customer/cancellations/view")) { // CANCELLATION DETAILS
		item = document.querySelector(".info-unit");
		presenceData.details = "Cancellation Details:";
		presenceData.state = item.textContent;
	} else if (document.location.pathname.includes("/wallet")) { // WALLET
		presenceData.details = "Lazada Wallet";
	} else if (document.location.pathname.includes("/customer/myReview")) { // CANCELLATION DETAILS
		presenceData.details = "My Reviews";
	} else if (document.location.pathname.includes("/wishlist")) { // WISHLIST
		item = document.querySelector(".first ");
		presenceData.details = item.textContent;
	} else if (document.location.pathname.includes("/customer/returns")) { // RETURNS
		presenceData.details = "My Returns";
	} else (presenceData.details = "Home");

	if (await presence.getSetting<boolean>("incognito")) {
		presenceData.details = "Incognito";
		presenceData.largeImageKey = "https://lzd-img-global.slatic.net/g/tps/tfs/TB1PApewFT7gK0jSZFpXXaTkpXa-200-200.png";
		presenceData.state = null;
		presenceData.startTimestamp = null;
	}
	if (!presenceData.details) presence.setActivity();
	else presence.setActivity(presenceData);
});
