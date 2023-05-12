const presence = new Presence({
		clientId: "863173597941727282",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

enum Assets {
	Play = "https://i.imgur.com/q57RJjs.png",
	Pause = "https://i.imgur.com/mcEXiZk.png",
	Stop = "https://i.imgur.com/aLYu3Af.png",
	Search = "https://i.imgur.com/B7FxcD4.png",
	Question = "https://i.imgur.com/pIIJniP.png",
	Live = "https://i.imgur.com/0HVm46z.png",
	Reading = "https://i.imgur.com/5m10TTT.png",
	Writing = "https://i.imgur.com/Pa00qZh.png",
	Call = "https://i.imgur.com/PFdbnIf.png",
	Vcall = "https://i.imgur.com/6wG9ZvM.png",
	Downloading = "https://i.imgur.com/ryrDrz4.png",
	Uploading = "https://i.imgur.com/SwNDR5U.png",
	Repeat = "https://i.imgur.com/Ikh95KU.png",
	RepeatOne = "https://i.imgur.com/wh885z3.png",
	Premiere = "https://i.imgur.com/Zf8FSUR.png",
	PremiereLive = "https://i.imgur.com/yC4j9Lg.png",
	Viewing = "https://i.imgur.com/fpZutq6.png",
}

let productName, productBrand, blogTitle, blogAuthor;

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		largeImageKey: "https://i.imgur.com/IZlOaJU.png",
		startTimestamp: browsingTimestamp,
	};

	if (window.location.pathname === "/")
		presenceData.details = "Browsing the Home Page";

	if (window.location.pathname.includes("/collections")) {
		if (window.location.pathname.includes("/products")) {
			productName = document.querySelector(
				"#shopify-section-product-template > div:nth-child(1) > div.container.container-fluid-mobile > div > div:nth-child(2) > div > h1"
			).textContent;
			productBrand = document.querySelector(
				"#same_product_height > div.tt-breadcrumb > div > ul > li:nth-child(2) > a"
			).textContent;

			presenceData.details = productName;
			presenceData.state = productBrand;

			presenceData.buttons = [
				{ label: "View Product", url: document.location.href },
				{
					label: "View Category",
					url:
						document.location.origin +
						document
							.querySelector(
								"#same_product_height > div.tt-breadcrumb > div > ul > li:nth-child(2) > a"
							)
							.getAttribute("href"),
				},
			];
		} else if (
			window.location.pathname === "/collections" ||
			window.location.pathname === "/collections/"
		) {
			presenceData.details = "Viewing Brands";

			presenceData.state = document.querySelector(
				"#shopify-section-list-collections-template > div > div > div.tt-block-title > div"
			).textContent;
		} else {
			presenceData.details = `Viewing: ${
				document.querySelector(
					"#same_product_height > div.tt-breadcrumb > div > ul > li:nth-child(2)"
				).textContent
			}`;
			presenceData.state = `${
				document.querySelector(
					"#usf_container > div.usf-sr-container.usf-nosearch > div.tt-filters-options > h1 > span > b"
				).textContent
			} Products`;
		}
	} else if (window.location.pathname.includes("/products/")) {
		productName = document.querySelector(
			"#shopify-section-product-template > div:nth-child(1) > div.container.container-fluid-mobile > div > div:nth-child(2) > div > h1"
		).textContent;
		presenceData.details = productName;

		presenceData.buttons = [
			{ label: "View Product", url: document.location.href },
		];
	} else if (window.location.pathname.includes("/pages")) {
		presenceData.details = `Viewing: ${
			document.querySelector(
				"#same_product_height > div.tt-breadcrumb > div > ul > li:nth-child(2)"
			).textContent
		}`;

		presenceData.buttons = [
			{
				label: "View Page",
				url: document.location.href,
			},
		];
	} else if (window.location.pathname.includes("/search")) {
		presenceData.details = `Searching: ${
			document.querySelector(
				"#usf_container > div.usf-sr-container > div.tt-filters-options > h1 > span > b:nth-child(2)"
			).textContent
		}`;

		presenceData.state = `${
			document.querySelector(
				"#usf_container > div.usf-sr-container > div.tt-filters-options > h1 > span > b:nth-child(1)"
			).textContent
		} Results`;

		presenceData.smallImageKey = Assets.Search;
	} else {
		switch (window.location.pathname) {
			case "/cart": {
				presenceData.details = "Viewing cart";
				break;
			}
			case "/account": {
				presenceData.details = "Viewing account";
				break;
			}
			case "/apps/subscriptions": {
				presenceData.details = "Viewing subscriptions";
				break;
			}
			default:
				if (window.location.pathname.includes("/checkouts/"))
					presenceData.details = "Ordering";
				else if (window.location.pathname.includes("/blogs/")) {
					blogTitle =
						document.querySelector(
							"#shopify-section-article-template > div:nth-child(1) > div > div > div > div > h1"
						)?.textContent || "Viewing News";
					blogAuthor =
						document.querySelector(
							"#shopify-section-article-template > div:nth-child(1) > div > div > div > div > div.tt-autor"
						)?.textContent || null;

					presenceData.details = blogTitle;
					if (blogAuthor) presenceData.state = blogAuthor;

					if (blogAuthor) presenceData.smallImageKey = Assets.Reading;
				} else presence.setActivity();
		}
	}

	presence.setActivity(presenceData);
});
