const presence = new Presence({
		clientId: "644645903973482536",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

let user: HTMLElement, title: HTMLElement, language: string;

// TODO: Convert to Presences#getStrings()
/**
 * Get Translation
 * @param stringName Name of string you want to get
 */
function getTranslation(stringName: string): string {
	switch (stringName) {
		case "HomePage":
			switch (language) {
				case "nl":
					return "Bekijkt de startpagina";
				default:
					return "Viewing home page";
			}
		case "ProductView":
			switch (language) {
				case "nl":
					return "Bekijkt product:";
				default:
					return "Viewing product:";
			}
		case "BrandView":
			switch (language) {
				case "nl":
					return "Bekijkt merk:";
				default:
					return "Viewing brand:";
			}
		case "CategoryView":
			switch (language) {
				case "nl":
					return "Bekijkt categorie:";
				default:
					return "Viewing category:";
			}
		case "Cart":
			switch (language) {
				case "nl":
					return "Bekijkt zijn winkelwagen";
				default:
					return "Viewing their cart";
			}
		case "Wishlist":
			switch (language) {
				case "nl":
					return "Bekijkt zijn verlanglijstje";
				default:
					return "Viewing their wishlist";
			}
		case "AccountSettings":
			switch (language) {
				case "nl":
					return "Bekijkt zijn account";
				default:
					return "Viewing their account";
			}
			break;
		case "FAQ":
			switch (language) {
				case "nl":
					return "Bekijkt de veel gestelde vragen";
				default:
					return "Viewing the FAQ";
			}
		default:
			presence.error(
				"Unknown StringName please contact the Developer of this presence!\nYou can contact him/her in the PreMiD Discord (discord.premid.app)"
			);
			return "Unknown stringName";
	}
}

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		largeImageKey:
			"https://cdn.rcd.gg/PreMiD/websites/Z/Zalando/assets/logo.png",
		startTimestamp: browsingTimestamp,
	};

	({ language } = window.navigator); //Make this change-able with presence settings
	//en = English
	//nl = Nederlands
	//Language list can be found here: https://api.premid.app/v2/langFile/list

	if (
		document.location.pathname === "/" ||
		document.location.pathname.includes("home/")
	)
		presenceData.details = getTranslation("HomePage");
	else if (document.location.pathname.includes(".html")) {
		user = document.querySelector(
			".h-container.h-product-title.topSection.h-align-left > div:nth-child(2) > h1"
		);
		title = document.querySelector(
			".h-container.h-product-title.topSection.h-align-left > div:nth-child(1) > a > h2"
		);
		presenceData.details = getTranslation("ProductView");
		presenceData.state = `${user.textContent} > ${title.textContent}`;
	} else if (
		document.querySelector(
			"#z-nvg-cognac-root > div > z-grid > z-grid-item:nth-child(2) > div > div > div > div > h1 > span > a"
		) !== null
	) {
		user = document.querySelector<HTMLAnchorElement>(
			"#z-nvg-cognac-root > div > z-grid > z-grid-item:nth-child(2) > div > div > div > div > h1 > span > a"
		);
		presenceData.details = getTranslation("BrandView");
		presenceData.state = user.textContent;
	} else if (
		document.querySelector<HTMLUListElement>(
			"#z-nvg-cognac-root > div > z-grid > z-grid-item:nth-child(2) > div > div > nav > ul"
		) !== null
	) {
		user = document.querySelector<HTMLUListElement>(
			"#z-nvg-cognac-root > div > z-grid > z-grid-item:nth-child(2) > div > div > nav > ul"
		);
		presenceData.details = getTranslation("CategoryView");
		presenceData.state = user.textContent;
	} else if (document.location.pathname.includes("/cart/"))
		presenceData.details = getTranslation("Cart");
	else if (document.location.pathname.includes("/wishlist/"))
		presenceData.details = getTranslation("Wishlist");
	else if (document.location.pathname.includes("/myaccount/"))
		presenceData.details = getTranslation("AccountSettings");
	else if (document.location.pathname.includes("/faq/"))
		presenceData.details = getTranslation("FAQ");

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
