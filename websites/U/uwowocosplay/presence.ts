const presence = new Presence({
		clientId: "1216150866122244096",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			details: "Uwowo Cosplay Homepage",
			largeImageKey: "https://i.imgur.com/OczeyDO.jpeg",
			startTimestamp: browsingTimestamp,
		},
		{ pathname, href } = document.location;
	switch (pathname.replace("/en-de", "").trim()) {
		case "/": {
			presenceData.details = "Browsing the Homepage";
			break;
		}
		case "/collections/shop-all": {
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

	if (pathname.startsWith("/products/")) setProduct(presenceData, href);

	presence.setActivity(presenceData);
});

function getStyle(pathname: string) {
	const path = pathname.split("/collections/")[1];
	if (path !== null)
		return `Browsing the ${path} Collection`
			.split("-")
			.join(" ")
			.replace("Collections", "")
			.trim();
	else return "Unknown Page";
}

function setProduct(presenceData: PresenceData, href: string) {
	const product = document
		.querySelector(
			"#ProductInfo-template--14675231342673__main > div.product__title > h1"
		)
		.textContent.split("Uwowo")[1]
		.replace("Costume", "")
		.trim();
	presenceData.details = `Viewing ${product
		.split(" ")
		.slice(0, product.split(" ").length / 2)
		.join(" ")}`;
	presenceData.state = product
		.split(" ")
		.slice(product.split(" ").length / 2)
		.join(" ");
	presenceData.buttons = [
		{
			label: "View Cosplay",
			url: href,
		},
	];
}
