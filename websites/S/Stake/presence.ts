const presence = new Presence({
		clientId: "1030599970551771266",
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

presence.on("UpdateData", async () => {
	const [showBal, showTimestamp, showCurrentGame] = await Promise.all([
			presence.getSetting<boolean>("showBal"),
			presence.getSetting<boolean>("showTimestamp"),
			presence.getSetting<boolean>("showCurrentGame"),
		]),
		presenceData: PresenceData = {
			largeImageKey: "https://i.imgur.com/D4d2JSH.png",
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
	} else if (pathname.includes("sports"))
		presenceData.state = "Browsing Sports...";
	else presenceData.state = "Browsing...";

	if (showBal) {
		const balance = document
				.querySelector("div.currency > span.content > span")
				.textContent.trim(),
			currency = document
				.querySelector("div.currency > span.variant-subtle > svg > use")
				.getAttributeNS("http://www.w3.org/1999/xlink", "href")
				.replace("#icon-currency-", "")
				.toUpperCase();

		if (pathname.includes("games")) presenceData.details = "Balance: (In Game)";
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
