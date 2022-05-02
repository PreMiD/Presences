const presence = new Presence({
		clientId: "966711989533544580"
	}),
	browsingStamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: "logo"
		},
		[privacy, buttons] = await Promise.all([
			presence.getSetting<boolean>("privacy"),
			presence.getSetting<boolean>("buttons")
		]),
		search = document.querySelector<HTMLInputElement>(
			"#portals-root > div:nth-child(3) > div > div > div > div > div.css-1dbjc4n.r-1ro0kt6.r-16y2uox.r-1wbh5a2 > input"
		);
	let title: string;
	if (privacy) presenceData.details = "Browsing...";
	else if (document.location.hostname.includes("docs.livelinkbio.com")) {
		presenceData.startTimestamp = browsingStamp;
		if (search && !search.value) {
			presenceData.details = "Searching for:";
			presenceData.state = search.value;
		} else {
			presenceData.details = "Reading Docs:";
			presenceData.state = document.querySelector(
				"body > div.gitbook-root > div > div > div.css-1dbjc4n.r-1ro0kt6.r-16y2uox.r-1wbh5a2 > div.css-1dbjc4n.r-14lw9ot.r-13awgt0 > div > div > div.css-1dbjc4n.r-1ro0kt6.r-18u37iz.r-16y2uox.r-1wbh5a2 > div > div > div.css-1dbjc4n.r-eqz5dr.r-1ifxtd0.r-1ygmrgt > div.css-1dbjc4n.r-18u37iz > div.css-1dbjc4n.r-1ro0kt6.r-16y2uox.r-1wbh5a2 > div"
			).textContent;
		}
	} else if (document.location.hostname.includes("status.livelinkbio.com"))
		presenceData.details = "Status";
	else {
		const type = document.querySelector(
				"body > main > section > div.row.mb-4 > div.col-12.col-lg.d-flex.align-items-center.mb-3.mb-lg-0 > h1"
			),
			active = document.querySelectorAll('[class="nav-link active"]')[0];
		presenceData.startTimestamp = browsingStamp;
		if (document.location.pathname == "/") presenceData.details = "Homepage";
		else if (document.location.pathname.includes("affiliate")) {
			presenceData.details = "Affiliate";
			title = "Affiliate";
		} else if (document.location.pathname.includes("dashboard")) {
			presenceData.details = "Dashboard";
			title = "Dashboard";
		} else if (document.location.pathname.includes("link")) {
			presenceData.state = document.querySelector("#link_url").textContent;
			if (document.location.pathname.endsWith("statistics"))
				presenceData.details = "Statistics of Link:";
			else presenceData.details = "Editing Link:";
		} else if (document.querySelector("body").className.includes("open")) {
			title = document
				.querySelectorAll('[class="modal-title"]')[1]
				.textContent.replace("Edit", "");
			presenceData.details = `${title}:`;
			presenceData.state =
				document.querySelector<HTMLInputElement>("#update_name").value;
		} else if (type && !active) {
			title = type.textContent.trim();
			presenceData.details = `All ${title}`;
		} else if (active) {
			title = active.textContent.trim();
			presenceData.details = title;
		}
	}
	if (!privacy && buttons && document.location.pathname !== "/") {
		if (!title) title = "Page";
		if (presenceData.buttons[0].label !== `View ${title}`) {
			presenceData.buttons = [
				{
					label: `View ${title}`,
					url: document.location.href
				}
			];
		}
	}
	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
