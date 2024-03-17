const presence = new Presence({
		clientId: "971483473024004157",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

const enum Assets {
	Logo = "https://i.ibb.co/YWQTYzh/cy0lojzy.png",
}

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: Assets.Logo,
			startTimestamp: browsingTimestamp,
			details: "Browsing ZenMarket",
		},
		{ pathname, search, href } = document.location,
		path = pathname.replace(
			`/${document.querySelector("html").getAttribute("lang")}`,
			""
		);

	// Profile

	if (path === "/profile/" || path === "/profile/default.aspx") {
		const warehouseTable: HTMLTableElement = document.querySelector(
				"#productsBought > div:nth-child(1) > table"
			),
			cartTable: HTMLTableElement = document.querySelector(".shop-stripped"),
			warehouseItems = warehouseTable ? warehouseTable.rows.length : 0,
			cartItems = cartTable ? cartTable.rows.length - 1 : 0;

		presenceData.details = "Viewing Account";
		presenceData.state = `${
			warehouseItems > 1 || warehouseItems === 0
				? `${warehouseItems} items`
				: `${warehouseItems} item`
		} in warehouse || ${
			cartItems > 1 || cartItems === 0
				? `${cartItems} items`
				: `${cartItems} item`
		} in cart`;
	}

	if (path === "/profile/messages.aspx" || path === "/profile/support.aspx")
		presenceData.details = "Viewing Messages";

	if (path === "/profile/actions.aspx")
		presenceData.details = "Looking at Events";

	if (path === "/profile/watchlist.aspx") {
		if (
			(search.includes("tab=auctions") &&
				!search.includes("history")) ||
			!search
		) {
			const products = document.querySelector(
					"#auctions > div:nth-child(2) > .col-md-12"
				),
				watchCount = products ? products.children.length - 1 : 0;

			presenceData.details = "Looking at watched auction items";
			presenceData.state = `${
				watchCount > 1 || watchCount === 0
					? `${watchCount} items`
					: `${watchCount} item`
			} on the watchlist`;
		} else if (
			search.includes("tab=auctions") &&
			search.includes("history")
		)
			presenceData.details = "Viewing history of watched auction items";
		else if (search.includes("tab=products")) {
			const products = document.querySelector(
					"#products > div:nth-child(2) > .col-md-12"
				),
				watchCount = products ? products.children.length : 0;

			presenceData.details = "Looking at watched items";
			presenceData.state = `${
				watchCount > 1 || watchCount === 0
					? `${watchCount} items`
					: `${watchCount} item`
			} on the watchlist`;
		} else if (search.includes("tab=sellers"))
			presenceData.details = "Viewing watched sellers";
		else if (search.includes("tab=recent"))
			presenceData.details = "Looking at recently viewed items";
	}

	if (path === "/profile/parcel.aspx") presenceData.details = "Viewing parcels";

	if (path === "/profile/payments.aspx")
		presenceData.details = "Viewing transactions";

	if (path === "/profile/levels.aspx") {
		presenceData.details = "Checking current level";
		presenceData.state = `Current Level: ${
			document.querySelector("#lblCurrentTier").textContent
		}`;
	}

	if (path === "/profile/settings.aspx")
		presenceData.details = "Viewing settings";

	// Product view

	if (
		path === "/auction.aspx" &&
		search.includes("itemCode")
	) {
		presenceData.details = `Looking at ${
			document.querySelector("#itemTitle").textContent
		}`;
		presenceData.state = `Price: ${
			document.querySelector("#lblPriceY").textContent
		} || Bids: ${document.querySelector("#bidNum").textContent} || Condition: ${
			document.querySelector("#lblItemStatus").textContent
		} || Seller: ${document.querySelector("#seller").textContent}`;
		presenceData.buttons = [
			{
				label: "View on ZenMarket",
				url: href,
			},
			{
				label: "View on Yahoo Auctions",
				url: document.querySelector("#productPage").getAttribute("href"),
			},
		];
	}

	if (path === "/yshoppingproduct.aspx") {
		presenceData.details = `Looking at ${
			document.querySelector("#itemTitle").textContent
		}`;
		presenceData.state = `Price: ${
			document.querySelector("#lblPrice").textContent
		} || Condition: ${
			document.querySelector("#lblItemCondition").textContent
		} || Seller: ${document.querySelector("#seller").textContent}`;
		presenceData.buttons = [
			{
				label: "View on ZenMarket",
				url: href,
			},
			{
				label: "View on Yahoo Shopping",
				url: document.querySelector("#productPage").getAttribute("href"),
			},
		];
	}

	if (path === "/mercariproduct.aspx") {
		presenceData.details = `Looking at ${
			document.querySelector("#itemTitle").textContent
		}`;
		presenceData.state = `Price: ${
			document.querySelector("#lblPrice").textContent
		} || Seller: ${document.querySelector("#seller").textContent}`;
		presenceData.buttons = [
			{
				label: "View on ZenMarket",
				url: href,
			},
			{
				label: "View on Mercari",
				url: document.querySelector("#productPage").getAttribute("href"),
			},
		];
	}

	if (path === "/rakumaproduct.aspx") {
		presenceData.details = `Looking at ${
			document.querySelector("#itemTitle").textContent
		}`;
		presenceData.state = `Price: ${
			document.querySelector("#lblPrice").textContent
		} || Seller: ${document.querySelector("#seller").textContent}`;
		presenceData.buttons = [
			{
				label: "View on ZenMarket",
				url: href,
			},
			{
				label: "View on Rakuma",
				url: document.querySelector("#productPage").getAttribute("href"),
			},
		];
	}

	if (path === "/rakutenproduct.aspx") {
		presenceData.details = `Looking at ${
			document.querySelector("#itemTitle").textContent
		}`;
		presenceData.state = `Price: ${
			document.querySelector("#lblPrice").textContent
		} || Seller: ${document.querySelector("#seller").textContent}`;
		presenceData.buttons = [
			{
				label: "View on ZenMarket",
				url: href,
			},
			{
				label: "View on Rakuten",
				url: document.querySelector("#productPage").getAttribute("href"),
			},
		];
	}

	if (path === "/amazonproduct.aspx") {
		const condition: HTMLSpanElement =
			document.querySelector("#lblConditionName");
		presenceData.details = `Looking at ${
			document.querySelector("#itemTitle").textContent
		}`;
		presenceData.state = `Price: ${
			document.querySelector("#lblPrice").textContent
		} ${condition ? `|| Condition: ${condition.textContent}` : ""}`;
		presenceData.buttons = [
			{
				label: "View on ZenMarket",
				url: href,
			},
			{
				label: "View on Amazon",
				url: document.querySelector("#productPage").getAttribute("href"),
			},
		];
	}

	if (path === "/othershopproduct.aspx") {
		presenceData.details = `Looking at ${
			document.querySelector("#itemTitle").textContent
		}`;
		presenceData.state = `Price: ${
			document.querySelector("#lblPrice").textContent
		}`;
		presenceData.buttons = [
			{
				label: "View on ZenMarket",
				url: href,
			},
			{
				label: "View on Original page",
				url: document.querySelector("#productPage").getAttribute("href"),
			},
		];
	}

	if (
		path.includes("/s/") &&
		path.split("/").length === 4 &&
		document.querySelector("#itemTitle")
	) {
		presenceData.details = `Looking at ${
			document.querySelector("#itemTitle").textContent
		}`;
		presenceData.state = `Price: ${
			document.querySelector("#lblPrice").textContent
		} || Seller: ${document.querySelector("#aSeller").textContent}`;
		presenceData.buttons = [
			{
				label: "View on ZenMarket",
				url: href,
			},
			{
				label: "View on ZenPlus",
				url: document.querySelector("#itemUrl").getAttribute("href"),
			},
		];
	}

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
