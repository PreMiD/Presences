const presence = new Presence({
	clientId: "775333674563403838",
});

enum Assets {
	Play = "https://i.imgur.com/q57RJjs.png",
	Pause = "https://i.imgur.com/mcEXiZk.png",
	Stop = "https://i.imgur.com/aLYu3Af.png",
	Search = "https://i.imgur.com/B7FxcD4.png",
	Question = "https://i.imgur.com/pIIJniP.png",
	Live = "https://i.imgur.com/0HVm46z.png",
	Reading = "https://i.imgur.com/5m10TTT.png",
	Writing = "https://i.imgur.com/Pa00qZh.png",
	Call = "https://i.imgur.com/y4YKRZG.png",
	Vcall = "https://i.imgur.com/6wG9ZvM.png",
	Downloading = "https://i.imgur.com/ryrDrz4.png",
	Uploading = "https://i.imgur.com/SwNDR5U.png",
	Repeat = "https://i.imgur.com/Ikh95KU.png",
	RepeatOne = "https://i.imgur.com/qkODaWg.png",
	Premiere = "https://i.imgur.com/Zf8FSUR.png",
	PremiereLive = "https://i.imgur.com/yC4j9Lg.png",
	Viewing = "https://i.imgur.com/fpZutq6.png",
}

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		largeImageKey: "https://i.imgur.com/tU15qL1.png",
	};

	if (document.location.hostname.includes("preview.webflow.com")) {
		presenceData.details = "Viewing project preview";
		presenceData.state = document.title.replace("Webflow - ", "");
	} else if (document.location.hostname.includes("university.webflow.com"))
		presenceData.details = "Webflow University";
	else if (document.location.hostname.includes("ebooks.webflow.com"))
		presenceData.details = "Webflow Ebooks";
	else if (document.location.hostname.includes("forum.webflow.com"))
		presenceData.details = "Reading Forums";
	else if (document.location.hostname.includes("experts.webflow.com"))
		presenceData.details = "Viewing Webflow Experts";
	else if (document.location.hostname.includes("wishlist.webflow.com"))
		presenceData.details = "Browsing Webflow Wishlist";
	else if (document.location.hostname.includes("status.webflow.com"))
		presenceData.details = "Viewing Status Page";
	else if (document.location.pathname === "/")
		presenceData.details = "Viewing home page";
	else if (document.location.pathname.includes("dashboard"))
		presenceData.details = "Viewing Dashboard";

	if (
		document.location.pathname.includes("dashboard/welcome/templates") ||
		document.location.pathname.includes("dashboard/sites/new")
	)
		presenceData.details = "Creating a new project";
	else if (document.location.pathname.includes("dashboard/sites")) {
		presenceData.details = "Editing project settings";
		presenceData.state =
			document.title.replace(" - Webflow", "") ?? "Unknown Project";
	} else if (document.location.pathname.includes("designers")) {
		presenceData.details = "Browsing Designers";
		if (document.location.pathname.includes("popular"))
			presenceData.state = "Popular Designers";
		else if (document.location.pathname.includes("hire"))
			presenceData.state = "Designers for hire";
	} else if (document.location.pathname.includes("design")) {
		presenceData.details = document.title.replace("Webflow - ", "");
		const pageTitle = document.querySelector(
			".bem-TopBar_Body_ContextLens_Name_Value"
		);
		presenceData.state = pageTitle
			? `Editing: ${pageTitle.textContent}`
			: "Editing Unknown Page";
	} else if (document.location.pathname.includes("discover")) {
		presenceData.details = "Exploring projects showcase";
		if (document.location.pathname.includes("popular"))
			presenceData.state = "Popular Projects";
		else if (document.location.pathname.includes("following"))
			presenceData.state = "Followed Creators";
		else if (document.location.pathname.includes("recent"))
			presenceData.state = "Recent Projects";
		else if (document.location.pathname.includes("cloneable"))
			presenceData.state = "Cloneable Projects";
	} else if (document.location.pathname.includes("pricing"))
		presenceData.details = "Viewing Pricing";
	else if (document.location.pathname.includes("templates"))
		presenceData.details = "Browsing Templates";
	else if (document.location.pathname.includes("community"))
		presenceData.details = "Viewing webflow community";
	else if (document.location.pathname.includes("blog"))
		presenceData.details = "Reading Blog";
	else if (document.querySelector(".full-name")) {
		presenceData.details = "Viewing profile";
		presenceData.state = document.querySelector(".full-name").textContent;
	} else if (document.location.pathname.includes("website/add"))
		presenceData.details = "Adding a new website";
	else if (document.location.pathname.includes("dashboard/teams"))
		presenceData.details = "Viewing teams";
	else if (document.location.pathname.includes("no-code")) {
		// Why am I coding status not to code 🤔
		presenceData.details = "Viewing No Code Movement";
	} else if (document.location.pathname.includes("vs/wordpress"))
		presenceData.details = "Webflow vs WordPress";
	else if (document.location.pathname.includes("customers"))
		presenceData.details = "Browsing Webflow Customers";
	else if (document.location.pathname.includes("dashboard/account"))
		presenceData.details = "Editing account settings";

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
