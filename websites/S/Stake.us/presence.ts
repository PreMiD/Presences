const presence = new Presence({
		clientId: "1231098376741982349",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
	const [showBal, showTimestamp, showCurrentGame] = await Promise.all([
			presence.getSetting<boolean>("showBal"),
			presence.getSetting<boolean>("showTimestamp"),
			presence.getSetting<boolean>("showCurrentGame"),
		]),
		presenceData: PresenceData = {
			largeImageKey: "https://i.imgur.com/9jDaQ1b.png",
		},
		{ pathname, search } = window.location;

	if (showTimestamp) presenceData.startTimestamp = browsingTimestamp;

	if (pathname.includes("casino") && !pathname.includes("games")) {
		if (pathname.includes("group")) {
			presenceData.state = `Browsing ${pathname
				.split("/group/")
				.pop()
				.replaceAll("-", " ")
				.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase())}...`;
		} else presenceData.state = "Browsing Casino...";
	} else if (pathname.includes("games")) {
		if (showCurrentGame) {
			presenceData.state = `Playing ${document
				.querySelector("div.title-wrap > h1")
				.textContent.trim()}`;
		}
	} else presenceData.state = "Browsing...";

	if (showBal) {
		const balanceElement = document.querySelector(
				"div.currency > span.content > span"
			),
			currencyElement = document.querySelector(
				"div.currency > span.variant-subtle"
			);
		let balance = "Unknown",
			currency = "Currency";
		if (balanceElement)
			balance = balanceElement.textContent.trim().replace("&nbsp;", " ");

		if (currencyElement) {
			if (currencyElement.getAttribute("title") === "sweeps")
				currency = "Stake Cash";
			else currency = "Gold Coins";
		}

		if (pathname.includes("games"))
			presenceData.details = "Balance: (In Use In Game)";
		else if (!pathname.includes("games") && balance.includes(","))
			presenceData.details = `Balance: ${balance} (${currency})`;
		else presenceData.details = `Balance: ${balance} ${currency}`;

		if (search.includes("modal=wallet"))
			presenceData.state = "Checking Wallet...";
		else if (search.includes("modal=vault"))
			presenceData.state = "Checking Vault...";
		else if (search.includes("modal=vip"))
			presenceData.state = "Checking VIP Progress...";
		else if (search.includes("modal=user"))
			presenceData.state = "Checking Statistics...";
		else if (pathname.includes("/transactions/"))
			presenceData.state = "Viewing Transactions...";
		else if (pathname.includes("/settings/"))
			presenceData.state = "Adjusting Settings...";
	}

	presence.setActivity(presenceData);
});
