const presence = new Presence({
		clientId: "1030599970551771266",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
	const [showBal, showTimestamp, showCurrentGame] = await Promise.all([
			presence.getSetting<boolean>("showBal"),
			presence.getSetting<boolean>("showTimestamp"),
			presence.getSetting<boolean>("showCurrentGame"),
		]),
		presenceData: PresenceData = {
			largeImageKey: "logo",
		};

	if (showTimestamp) presenceData.startTimestamp = browsingTimestamp;

	if (
		window.location.pathname.includes("casino") &&
		!window.location.pathname.includes("games")
	) {
		//Browsing Casino / Games

		if (window.location.pathname.includes("group")) {
			presenceData.state = `Browsing ${window.location.pathname
				.split("/group/")
				.pop()
				.replaceAll("-", " ")
				.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase())}...`;
		} else presenceData.state = "Browsing Casino...";
	} else if (window.location.pathname.includes("games")) {
		//Playing Casino Game

		if (showCurrentGame) {
			presenceData.state = `Playing ${document
				.querySelector("div.title-wrap > h1")
				.textContent.trim()}`;

			presenceData.buttons = [
				{
					label: "Play Game",
					url: window.location.href,
				},
			];
		}
	} else if (window.location.pathname.includes("sports")) {
		//Browsing Sports

		presenceData.state = "Browsing Sports...";
	} else presenceData.state = "Browsing...";

	if (showBal) {
		//Display Balance

		const balance = document
				.querySelector("div.currency > span.content > span")
				.textContent.trim(),
			//Get Currency

			currency = document
				.querySelector("div.currency > span.variant-subtle > svg > use")
				.getAttributeNS("http://www.w3.org/1999/xlink", "href")
				.replace("#icon-currency-", "")
				.toUpperCase();

		if (window.location.pathname.includes("games")) {
			//Balance In Game (Subject To Change)

			presenceData.details = "Balance: (In Game)";
		} else if (
			!window.location.pathname.includes("games") &&
			balance.includes(",")
		) {
			//Stake Account Balance
			presenceData.details = `Balance: ${balance} (${currency})`;
		} else presenceData.details = `Balance: ${balance} ${currency}`;

		//Browsing Modals and Subsites

		if (window.location.search.includes("modal=wallet"))
			presenceData.state = "Checking Wallet...";
		else if (window.location.search.includes("modal=vault"))
			presenceData.state = "Checking Vault...";
		else if (window.location.search.includes("modal=vip"))
			presenceData.state = "Checking VIP Progress...";
		else if (window.location.search.includes("modal=user"))
			presenceData.state = "Checking Statistics...";
		else if (window.location.pathname.includes("/transactions/"))
			presenceData.state = "Viewing Transactions...";
		else if (window.location.pathname.includes("/settings/"))
			presenceData.state = "Adjusting Settings...";
	}

	//Update Data

	presence.setActivity(presenceData);
});
