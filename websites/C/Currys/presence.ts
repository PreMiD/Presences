const presence = new Presence({
		clientId: "996516483150663721",
	}),
	{ pathname, host } = document.location,
	browsingTimestamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
	const presenceData = {
		smallImageKey: "search",
		largeImageKey: "https://i.imgur.com/yOolF4f.png",
		largeImageText: "Browsing Currys",
		startTimestamp: browsingTimestamp,
		details: "Browsing",
		state: "Currys Website",
	};
	if (host === "www.currys.co.uk") {
		presenceData.startTimestamp = browsingTimestamp;
		presenceData.state = "Homepage";
	}

	// Product categories / Sub-categories
	if (document.querySelector(".amp-herobanner-headline")) {
		presenceData.state = document.querySelector(
			".amp-herobanner-headline"
		).textContent;
	}
	if (document.querySelector(".plp-heading"))
		presenceData.state = document.querySelector(".plp-heading").textContent;

	if (document.querySelector("#clp-row-1 > div > div > h1")) {
		presenceData.state = document.querySelector(
			"#clp-row-1 > div > div > h1"
		).textContent;
	} else if (document.querySelector("#clp-row-1 > div > h1")) {
		presenceData.state = document.querySelector(
			"#clp-row-1 > div > h1"
		).textContent;
	}

	// Product page
	if (
		pathname.includes("/products/") &&
		document.querySelector(".product-name")
	)
		presenceData.state = document.querySelector(".product-name").textContent;

	// Account related pages
	if (pathname.includes("/my-account")) {
		if (pathname.includes("/saved-for-later")) {
			presenceData.details = "Viewing";
			presenceData.state = "Wishlist";
		} else if (pathname.includes("/orders")) {
			presenceData.details = "Viewing";
			presenceData.state = "Orders";
		} else if (pathname.includes("/manage-your-details")) {
			presenceData.details = "Managing";
			presenceData.state = "Account details";
		} else if (pathname.includes("/login")) {
			presenceData.details = "Viewing";
			presenceData.state = "Sign in page";
		} else if (pathname.includes("/app/basket")) {
			presenceData.details = "Viewing";
			presenceData.state = "Basket";
		}
	}

	if (pathname.includes("/store-finder")) {
		presenceData.details = "Finding";
		presenceData.state = "Stores";
	} else if (pathname.includes("/gbuk/techtalk")) {
		// TechTalk articles
		presenceData.state = "TechTalk Articles";
	}

	// Overall services
	if (pathname.includes("/services/")) presenceData.state = "Services";

	if (location.href.includes("search")) {
		// Searching product
		const replaced = document
			.querySelector(".plp-heading")
			.textContent.replace(/["]/g, " ")
			.replace("Showing results for", "");

		presenceData.details = "Searching for:";
		presenceData.state = replaced;
	}

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
