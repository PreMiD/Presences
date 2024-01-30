const presence = new Presence({
		clientId: "1201520071055515698",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

let itemName: HTMLElement;

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		largeImageKey: 
			"https://lzd-img-global.slatic.net/g/tps/tfs/TB1PApewFT7gK0jSZFpXXaTkpXa-200-200.png",
		startTimestamp: browsingTimestamp,	
	};

	itemName = document.querySelector("#search > span > h1 > div > div.sg-col-14-of-20.sg-col-26-of-32.sg-col-18-of-24.sg-col.sg-col-22-of-28.s-breadcrumb.sg-col-10-of-16.sg-col-30-of-36.sg-col-6-of-12 > div > div > span.a-color-state.a-text-bold");
	
	if (document.querySelector(".pdp-mod-product-badge-title")) { // PRODUCT
		const itemName = document.querySelector(".pdp-mod-product-badge-title");
		itemName = document.querySelector(".pdp-mod-product-badge-title");
		presenceData.details = "Viewing Product:";
		presenceData.state = itemName.textContent;
		presenceData.largeImageKey = document.querySelector('meta[name="og:image"]').getAttribute("content") || "";
	} else if (document.location.pathname.includes("/tag")) { // TAGS
		itemName = document.querySelector(".JrAyI");
		presenceData.details = "Tags:";
		presenceData.state = itemName.textContent;
	} else if (document.location.pathname.includes("/catalog")) { // CATALOG
		itemName = document.querySelector(".JrAyI");
		presenceData.details = "Catalog:";
		presenceData.state = itemName.textContent;
	} else if (document.location.pathname.includes("/customer/order")) { // ORDER
		presenceData.details = "My Orders";
	} else if (document.location.pathname.includes("/user/login")) { // LOGIN
		presenceData.details = "User:";
		presenceData.state = "Login";
	} else if (document.location.pathname.includes("/user/profile")) { // PROFILE
		itemName = document.querySelector(".my-profile-item-info");
		presenceData.details = "My Profile:";
		presenceData.state = itemName.textContent;
	} else if (document.location.pathname.includes("/address")) { // ADDRESS
		presenceData.details = "Address Book";
	} else if (document.location.pathname.includes("/cart")) { // CART
		itemName = document.querySelector(".checkout-summary-label");
		presenceData.details = "Cart:";
		presenceData.state = itemName.textContent;
	} else if (document.location.pathname.includes("/customer/cancellations/index")) { // CANCALLATIONS
		presenceData.details = "My Cancellations";
	} else if (document.location.pathname.includes("customer/cancellations/view")) { // CANCELLATION DETAILS
		itemName = document.querySelector(".info-unit");
		presenceData.details = "Cancellation Details:";
		presenceData.state = itemName.textContent;
	} else if (document.location.pathname.includes("/wallet")) { // WALLET
		presenceData.details = "Lazada Wallet";
	} else if (document.location.pathname.includes("/customer/myReview")) { // CANCELLATION DETAILS
		presenceData.details = "My Reviews";
	} else if (document.location.pathname.includes("/wishlist")) { // WISHLIST
		itemName = document.querySelector(".first ");
		presenceData.details = itemName.textContent;
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
