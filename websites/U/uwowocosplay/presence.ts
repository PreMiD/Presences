const presence = new Presence({
		clientId: "1216150866122244096",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);
const enum Assets {
	Logo = "https://i.imgur.com/U2EMMgC.jpeg",
}
presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			details: "Uwowo Cosplay Homepage",
			largeImageKey: Assets.Logo,
			startTimestamp: browsingTimestamp,
		},
		{ pathname, href } = document.location;
	switch (pathname) {
		case "/": {
			presenceData.details = "Browsing the Homepage";
			break;
		}
		case "/en-de": {
			presenceData.details = "Browsing the Homepage";
			break;
		}
		case "/collections/shop-all": {
			presenceData.details = "Browsing the shop";
			break;
		}
		case "/en-de/collections/shop-all": {
			presenceData.details = "Browsing the shop";
			break;
		}
		case "/cart": {
			presenceData.details = "Viewing their cart";
			break;
		}
		case "/account": {
			presenceData.details = "Viewing their account";
			break;
		}
		default: {
			presenceData.details = getStyle(pathname);
			break;
		}
	}
	if (
		pathname.startsWith("/products/") ||
		pathname.startsWith("/en-de/products/")
	)
		setProduct(presenceData, href);

	presence.setActivity(presenceData);
	console.log(presenceData.details);
});

function getStyle(pathname: string) {
	const path = pathname.split("/collections/")[1];
	if (path !== null) {
		return `Browsing the ${path} Collection`
			.split("-")
			.join(" ")
			.replace("Collections", "")
			.trim();
	} else return "Unknown Page";
}

function setProduct(presenceData: PresenceData, href: string) {
	const product = document
		// replace everything before Uwowo and remove the word "Costume" in regex
		.querySelector(".h2.product-single__title")
		?.textContent?.replace(/.*Uwowo/, "")
		?.replace(/Costume/g, "");
	presenceData.details = `Viewing ${
		product
			?.split(" ")
			?.slice(0, product?.split(" ").length / 2)
			?.join(" ") ?? "Unknown product"
	}`;
	presenceData.state =
		product
			?.split(" ")
			?.slice(product?.split(" ")?.length / 2)
			?.join(" ") ?? "";
	presenceData.buttons = [
		{
			label: "View Cosplay",
			url: href,
		},
	];

	presenceData.largeImageKey =
		document
			.querySelector<HTMLMetaElement>('[property="og:image"]')
			?.content?.split("?")?.[0] ?? Assets.Logo;
	if (presenceData.largeImageKey !== Assets.Logo)
		presenceData.smallImageKey = Assets.Logo;
}
