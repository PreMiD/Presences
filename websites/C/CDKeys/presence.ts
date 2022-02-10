const presence = new Presence({
		clientId: "940892975502856232"
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);
let search: HTMLInputElement;

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: "logo",
			startTimestamp: browsingTimestamp
		},
		page = window.location.pathname;
	search = document.querySelector("#search");
	if (search.value && search.value !== "__empty__") {
		presenceData.details = "Searching for:";
		presenceData.state = search.value;
		presenceData.smallImageKey = "search";
	} else if (page === "/") presenceData.details = "Homepage";
	else if (
		document.querySelector("#maincontent > div.page-title-wrapper > h1 > span")
	) {
		presenceData.details = document.querySelector(
			"#maincontent > div.page-title-wrapper > h1 > span"
		).textContent;
	} else if (document.querySelector("#product-addtocart-button")) {
		presenceData.details = document.querySelector<HTMLMetaElement>(
			"meta[property='og:title']"
		).content;
	} else if (page.includes("/pc")) presenceData.details = "Pc Games";
	else if (page.includes("-psn")) presenceData.details = "Playstation Games";
	else if (page.includes("/xbox-live")) presenceData.details = "Xbox Games";
	else if (page.includes("/nintendo")) presenceData.details = "Nintendo Games";
	else if (page.includes("/top-up-cards")) presenceData.details = "Top up card";
	else if (page.includes("/sale")) presenceData.details = "Sale";
	else if (page.includes("/daily-deals")) presenceData.details = "Daily Deals";
	else if (page.includes("/new")) presenceData.details = "New Products";
	else if (page.includes("/coming-soon")) presenceData.details = "Coming Soon";
	else if (page.includes("/wishlist")) presenceData.details = "Wishlist";
	else if (page.includes("/cart")) presenceData.details = "Cart";
	else if (page.includes("order/history"))
		presenceData.details = "Order History";
	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
