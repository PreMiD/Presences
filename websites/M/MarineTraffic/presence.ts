const presence = new Presence({
		clientId: "1013343014711738368",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

let locationMap: string,
	elemName: string,
	shipStatus: string,
	shipDest: string,
	shipDep: string,
	elemDesc: string;

const capitalize = (s: string | any[]) =>
	(s && s[0].toUpperCase() + s.slice(1)) || "";

presence.on("UpdateData", async () => {
	let presenceData: PresenceData = {
		largeImageKey: "logo",
		startTimestamp: browsingTimestamp,
		details: "Viewing:",
	};

	const pages: Record<string, PresenceData> = {
		"ais-historical-data": { state: "Historical AIS Data" },
		"?asset_type=vessels": { state: "Vessels Database" },
		"?asset_type=ports": { state: "Ports Database" },
		"?asset_type=expected_arrivals": { state: "Expected Arrivals" },
		"?asset_type=arrivals_departures": { state: "Port Calls" },
		"?asset_type=lights": { state: "Lighthouses Database" },
		"?asset_type=stations": { state: "Stations Database" },
		"user-agreement": { state: "User Agreement" },
		terms: { state: "Terms" },
		"privacy-policy": { state: "Privacy Policy" },
		"maritime-companies/search": { state: "Maritime companies search" },
		"expand-coverage": { state: "Ship Spotting AIS Receiver" },
		"apply-for-free-ais-receiver": { state: "Free AIS Receiver" },
		"report-your-own-position": { state: "Report AIS Position" },
		"online-services/plans": { state: "Online Services Plans" },
		"photos/of/ships": { state: "Vessel photos" },
		"ais/index/photographers": { state: "Photographers list" },
		"users/my_account": { state: "User Account Overview" },
		"api/account": { state: "API Services" },
		"payment/billing": { state: "Billing Settings" },
		"stations/index": { state: "Personal Stations" },
		"fleets/index": { state: "User Fleets" },
		"users/plans": { state: "Online Services & Plans" },
		"maritime-companies/index": { state: "Business Profile" },
		"corporate/index": { state: "Corporate Account" },
		"users/settings": { state: "User Settings" },
		"notifications/index": { state: "User Notifications" },
	};

	for (const [path, data] of Object.entries(pages)) {
		if (document.location.href.includes(path))
			presenceData = { ...presenceData, ...data };
	}

	if (document.location.hostname.startsWith("shop")) {
		presenceData.details = "Browsing AIS e-shop:";
		presenceData.state = document.title.split("-")[0];
	} else if (document.location.hostname.startsWith("help")) {
		presenceData.details = "Reading help:";
		presenceData.state = document.title.split("–")[0];
		presenceData.buttons = [
			{ label: "Read this page", url: document.location.href },
		];
	} else if (document.location.pathname.startsWith("/blog")) {
		presenceData.details = "Reading a blog post:";
		presenceData.state = document.title.split("-")[0];
		presenceData.buttons = [
			{ label: "Read this post", url: document.location.href },
		];
	} else if (document.location.pathname.includes("ais/home/center")) {
		presenceData.details = "Viewing live map";
		setInterval(() => {
			locationMap = document
				.querySelector(
					"#map_canvas > div.leaflet-control-container > div.leaflet-top.leaflet-right.leaflet-mouse-position-control > div.leaflet-control-mouseposition.leaflet-control"
				)
				.innerHTML.split("<br>")[0];
		}, 5000);
		presenceData.state = `Near ${locationMap}`;
		presenceData.buttons = [
			{ label: "View Page", url: document.location.href },
		];
	} else if (document.location.pathname.includes("ais/home/shipid")) {
		elemName = capitalize(
			document
				.querySelector(
					"#app > div > div.jss2 > div.d-flex.align-items-start.justify-content-start.flex-1-1-auto.home-layout > div.d-flex.flexcol.align-items-start.justify-content-start.flex-wrap.flex-1-1-auto > div > div:nth-child(4) > div > div > div > div > div > div.handle.cursor-move > div > div > div.d-flex.flexcol.align-items-start.justify-content-start.flex-wrap.flex-1-1-auto > div > a"
				)
				.innerHTML.toLowerCase()
		);
		shipStatus = document.querySelector(
			"#infosnippet_container > div > div > div > div:nth-child(2) > div > div:nth-child(1) > div > strong"
		).innerHTML;

		if (
			document
				.querySelector<HTMLAnchorElement>(
					"#infosnippet_container > div > div > div > div:nth-child(2) > div > div > div.d-flex.align-items-center.justify-content-start.flex-wrap.flex-1-1-auto > div:nth-child(1) > div > span > a"
				)
				.href.includes("javascript")
		) {
			shipDep = "Unknown";
		} else {
			shipDep = capitalize(
				document
					.querySelector<HTMLAnchorElement>(
						"#infosnippet_container > div > div > div > div:nth-child(2) > div > div > div.d-flex.align-items-center.justify-content-start.flex-wrap.flex-1-1-auto > div:nth-child(1) > div > span > a"
					)
					.href.split("?name=")[1]
					.split("&country=")[0]
					.toLowerCase()
			);
		}
		if (
			document
				.querySelector<HTMLAnchorElement>(
					"#infosnippet_container > div > div > div > div:nth-child(2) > div > div > div.d-flex.align-items-center.justify-content-start.flex-wrap.flex-1-1-auto > div:nth-child(2) > a"
				)
				.href.includes("javascript")
		) {
			shipDest = "Unknown";
		} else {
			shipDest = capitalize(
				document
					.querySelector<HTMLAnchorElement>(
						"#infosnippet_container > div > div > div > div:nth-child(2) > div > div > div.d-flex.align-items-center.justify-content-start.flex-wrap.flex-1-1-auto > div:nth-child(2) > a"
					)
					.href.split("?name=")[1]
					.split("&country=")[0]
					.toLowerCase()
			);
		}
		presenceData.smallImageText = document.querySelector(
			"#app > div > div.jss2 > div.d-flex.align-items-start.justify-content-start.flex-1-1-auto.home-layout > div.d-flex.flexcol.align-items-start.justify-content-start.flex-wrap.flex-1-1-auto > div > div:nth-child(4) > div > div > div > div > div > div.handle.cursor-move > div > div > div.d-flex.flexcol.align-items-start.justify-content-start.flex-wrap.flex-1-1-auto > div > small"
		).innerHTML;
		presenceData.details = `Tracking ${elemName}`;
		presenceData.state = `From ${shipDep} to ${shipDest} (${shipStatus})`;
		presenceData.largeImageKey = document.querySelector<HTMLImageElement>(
			"#app > div > div.jss2 > div.d-flex.align-items-start.justify-content-start.flex-1-1-auto.home-layout > div.d-flex.flexcol.align-items-start.justify-content-start.flex-wrap.flex-1-1-auto > div > div:nth-child(4) > div > div > div > div > div > div.panel-body.no-padding > div.d-flex.align-items-stretch.justify-content-start.flex-wrap.flex-1-1-auto.inforow > div:nth-child(1) > a > img"
		).src;
		presenceData.smallImageKey = document.querySelector<HTMLImageElement>(
			"#app > div > div.jss2 > div.d-flex.align-items-start.justify-content-start.flex-1-1-auto.home-layout > div.d-flex.flexcol.align-items-start.justify-content-start.flex-wrap.flex-1-1-auto > div > div:nth-child(4) > div > div > div > div > div > div.handle.cursor-move > div > div > div:nth-child(1) > img"
		).src;
		presenceData.buttons = [
			{ label: "View Ship", url: document.location.href },
		];
	} else if (document.location.pathname.includes("ais/home/lightid")) {
		elemName = capitalize(
			document
				.querySelector(
					"#app > div > div.jss2 > div.d-flex.align-items-start.justify-content-start.flex-1-1-auto.home-layout > div.d-flex.flexcol.align-items-start.justify-content-start.flex-wrap.flex-1-1-auto > div > div:nth-child(4) > div > div > div > div > div > div.handle.cursor-move > div > div > div.d-flex.flexcol.align-items-start.justify-content-start.flex-wrap.flex-1-1-auto > a"
				)
				.innerHTML.toLowerCase()
		);
		elemDesc =
			document.querySelector(
				"#app > div > div.jss2 > div.d-flex.align-items-start.justify-content-start.flex-1-1-auto.home-layout > div.d-flex.flexcol.align-items-start.justify-content-start.flex-wrap.flex-1-1-auto > div > div:nth-child(4) > div > div > div > div > div > div.panel-body.no-padding > div > div.d-flex.flexcol.align-items-stretch.justify-content-start.flex-wrap.flex-1-1-100.flexcol-xs-6.flexcol-sm-8 > div:nth-child(3) > div > b"
			).innerHTML +
			", " +
			document.querySelector<HTMLDivElement>(
				"#app > div > div.jss2 > div.d-flex.align-items-start.justify-content-start.flex-1-1-auto.home-layout > div.d-flex.flexcol.align-items-start.justify-content-start.flex-wrap.flex-1-1-auto > div > div:nth-child(4) > div > div > div > div > div > div.handle.cursor-move > div > div > div:nth-child(2) > div"
			).title;
		presenceData.details = `Watching "${elemName}"`;
		presenceData.state = `Location : ${elemDesc}`;
		presenceData.largeImageKey = document.querySelector<HTMLImageElement>(
			"#app > div > div.jss2 > div.d-flex.align-items-start.justify-content-start.flex-1-1-auto.home-layout > div.d-flex.flexcol.align-items-start.justify-content-start.flex-wrap.flex-1-1-auto > div > div:nth-child(4) > div > div > div > div > div > div.panel-body.no-padding > div > div.d-flex.flexcol.align-items-stretch.justify-content-start.flex-wrap.flex-1-1-100.flexcol-xs-6.flexcol-sm-4 > a > img"
		).src;
		presenceData.smallImageText = document.querySelector(
			"#app > div > div.jss2 > div.d-flex.align-items-start.justify-content-start.flex-1-1-auto.home-layout > div.d-flex.flexcol.align-items-start.justify-content-start.flex-wrap.flex-1-1-auto > div > div:nth-child(4) > div > div > div > div > div > div.panel-body.no-padding > div > div.d-flex.flexcol.align-items-stretch.justify-content-start.flex-wrap.flex-1-1-100.flexcol-xs-6.flexcol-sm-8 > div:nth-child(1) > div:nth-child(1) > div > b"
		).innerHTML;
		presenceData.smallImageKey = document.querySelector<HTMLImageElement>(
			"#app > div > div.jss2 > div.d-flex.align-items-start.justify-content-start.flex-1-1-auto.home-layout > div.d-flex.flexcol.align-items-start.justify-content-start.flex-wrap.flex-1-1-auto > div > div:nth-child(4) > div > div > div > div > div > div.panel-body.no-padding > div > div:nth-child(3) > div > div > div:nth-child(1) > div > div.d-flex.flexcol.align-items-start.justify-content-start.flex-wrap.flex-0-1-auto > div > img"
		).src;
		presenceData.buttons = [
			{ label: "View Lighthouse", url: document.location.href },
		];
	} else if (document.location.pathname.includes("ais/home/portid")) {
		elemName =
			capitalize(
				document
					.querySelector(
						"#app > div > div.jss2 > div.d-flex.align-items-start.justify-content-start.flex-1-1-auto.home-layout > div.d-flex.flexcol.align-items-start.justify-content-start.flex-wrap.flex-1-1-auto > div > div:nth-child(4) > div > div > div > div > div > div.handle.cursor-move > div > div > div.d-flex.flexcol.align-items-start.justify-content-start.flex-wrap.flex-1-1-auto > a"
					)
					.innerHTML.toLowerCase()
			) +
			", " +
			document.querySelector<HTMLDivElement>(
				"#app > div > div.jss2 > div.d-flex.align-items-start.justify-content-start.flex-1-1-auto.home-layout > div.d-flex.flexcol.align-items-start.justify-content-start.flex-wrap.flex-1-1-auto > div > div:nth-child(4) > div > div > div > div > div > div.handle.cursor-move > div > div > div:nth-child(2) > div"
			).title;
		elemDesc =
			capitalize(
				document
					.querySelector(
						"#app > div > div.jss2 > div.d-flex.align-items-start.justify-content-start.flex-1-1-auto.home-layout > div.d-flex.flexcol.align-items-start.justify-content-start.flex-wrap.flex-1-1-auto > div > div:nth-child(4) > div > div > div > div > div > div.panel-body.no-padding > div > div.d-flex.flexcol.align-items-stretch.justify-content-start.flex-wrap.flex-1-1-100.flexcol-xs-6.flexcol-sm-8 > div > div:nth-child(1) > div:nth-child(1) > div > b"
					)
					.innerHTML.toLowerCase()
			) +
			" - " +
			document.querySelector(
				"#app > div > div.jss2 > div.d-flex.align-items-start.justify-content-start.flex-1-1-auto.home-layout > div.d-flex.flexcol.align-items-start.justify-content-start.flex-wrap.flex-1-1-auto > div > div:nth-child(4) > div > div > div > div > div > div.panel-body.no-padding > div > div.d-flex.flexcol.align-items-stretch.justify-content-start.flex-wrap.flex-1-1-100.flexcol-xs-6.flexcol-sm-8 > div > div:nth-child(3) > div:nth-child(1) > div > a > div > div > div.d-flex.flexcol.align-items-start.justify-content-start.flex-wrap.flex-1-1-auto.undefined > span > b"
			).innerHTML;
		presenceData.details = `Watching ${elemName}`;
		presenceData.state = `${elemDesc} vessels`;
		presenceData.largeImageKey = document.querySelector<HTMLImageElement>(
			"#app > div > div.jss2 > div.d-flex.align-items-start.justify-content-start.flex-1-1-auto.home-layout > div.d-flex.flexcol.align-items-start.justify-content-start.flex-wrap.flex-1-1-auto > div > div:nth-child(4) > div > div > div > div > div > div.panel-body.no-padding > div > div.d-flex.flexcol.align-items-stretch.justify-content-start.flex-wrap.flex-1-1-100.flexcol-xs-6.flexcol-sm-4 > a > img"
		).src;
		presenceData.smallImageKey = document.querySelector<HTMLImageElement>(
			"#app > div > div.jss2 > div.d-flex.align-items-start.justify-content-start.flex-1-1-auto.home-layout > div.d-flex.flexcol.align-items-start.justify-content-start.flex-wrap.flex-1-1-auto > div > div:nth-child(4) > div > div > div > div > div > div.handle.cursor-move > div > div > div:nth-child(1) > img"
		).src;
		presenceData.smallImageText =
			"Temperature: " +
			document.querySelector(
				"#app > div > div.jss2 > div.d-flex.align-items-start.justify-content-start.flex-1-1-auto.home-layout > div.d-flex.flexcol.align-items-start.justify-content-start.flex-wrap.flex-1-1-auto > div > div:nth-child(4) > div > div > div > div > div > div.panel-body.no-padding > div > div:nth-child(3) > div > div > div:nth-child(1) > div > div.d-flex.flexcol.align-items-start.justify-content-start.flex-wrap.flex-1-1-auto > div > b"
			).innerHTML;
		presenceData.buttons = [
			{ label: "View Port", url: document.location.href },
		];
	} else if (
		document.location.pathname.includes("ais/home/businessDirectoryid")
	) {
		elemName = document.querySelector(
			"#app > div > div.jss2 > div.d-flex.align-items-start.justify-content-start.flex-1-1-auto.home-layout > div.d-flex.flexcol.align-items-start.justify-content-start.flex-wrap.flex-1-1-auto > div > div:nth-child(4) > div > div > div > div > div > div.handle.cursor-move > div > div > div.d-flex.flexcol.align-items-start.justify-content-start.flex-wrap.flex-1-1-auto > div > span"
		).innerHTML;
		elemDesc = document.querySelector(
			"#app > div > div.jss2 > div.d-flex.align-items-start.justify-content-start.flex-1-1-auto.home-layout > div.d-flex.flexcol.align-items-start.justify-content-start.flex-wrap.flex-1-1-auto > div > div:nth-child(4) > div > div > div > div > div > div.handle.cursor-move > div > div > div.d-flex.flexcol.align-items-start.justify-content-start.flex-wrap.flex-1-1-auto > div > div"
		).innerHTML;
		presenceData.details = `Watching ${elemName}`;
		presenceData.state = `Activities: ${elemDesc}`;
		presenceData.smallImageKey =
			"https://photos.marinetraffic.com/ais/showcompanyphoto.aspx?photoid=78062&filetype=3&rand=1661679295747";
		presenceData.buttons = [
			{ label: "View Business", url: document.location.href },
		];
	} else if (document.location.pathname.includes("ais/details/ships")) {
		elemName = capitalize(
			document
				.querySelector(
					"#vesselDetails_summarySection > div.MuiCollapse-root.MuiCollapse-vertical.MuiCollapse-entered.css-c4sutr > div > div > div > div:nth-child(2) > div > strong:nth-child(1)"
				)
				.innerHTML.toLowerCase()
		);
		presenceData.details = `Watching ${elemName}`;
		presenceData.state =
			"Near" +
			document
				.querySelector(
					"#vesselDetails_summarySection > div.MuiCollapse-root.MuiCollapse-vertical.MuiCollapse-entered.css-c4sutr > div > div > div > div:nth-child(2) > div > strong:nth-child(2)"
				)
				.innerHTML.split("-")[1] +
			" - " +
			document.querySelector(
				"#vesselDetails_latestPositionSection > div.MuiCollapse-root.MuiCollapse-vertical.MuiCollapse-entered.css-c4sutr > div > div > div > div > div.MuiGrid-root.MuiGrid-item.MuiGrid-grid-xs-12.MuiGrid-grid-md-true.css-4d8ot5 > p:nth-child(6) > b"
			).innerHTML;
		presenceData.largeImageKey = document.querySelector<HTMLImageElement>(
			"#vesselDetailsHeader > div > div:nth-child(1) > div > div.MuiGrid-root.MuiGrid-item.css-1wxaqej > div > img"
		).src;
		presenceData.smallImageKey = document.querySelector<HTMLImageElement>(
			"#vesselDetailsHeader > div > div:nth-child(1) > div > div.MuiGrid-root.MuiGrid-item.MuiGrid-grid-sm-true.css-qc7bc1 > p > img"
		).src;
		presenceData.smallImageText = document.querySelector<HTMLImageElement>(
			"#vesselDetailsHeader > div > div:nth-child(1) > div > div.MuiGrid-root.MuiGrid-item.MuiGrid-grid-sm-true.css-qc7bc1 > p > img"
		).title;
		presenceData.buttons = [
			{ label: "View Ship", url: document.location.href },
		];
	} else if (document.location.pathname.includes("ais/details/ports")) {
		elemName =
			capitalize(
				document
					.querySelector(
						"#summary > div.MuiCollapse-root.MuiCollapse-vertical.MuiCollapse-entered.css-c4sutr > div > div > div > div:nth-child(2) > div > div > strong:nth-child(1)"
					)
					.innerHTML.toLowerCase()
			) +
			" " +
			document.querySelector(
				"#portDetailsHeader > div > div.MuiGrid-root.MuiGrid-item.css-1wxaqej > div > div.MuiGrid-root.MuiGrid-item.MuiGrid-grid-sm-true.css-qc7bc1 > h1 > span"
			).innerHTML;
		presenceData.details = `Watching ${elemName}`;
		presenceData.state =
			document.querySelector(
				"#generalInfo > div.MuiCollapse-root.MuiCollapse-vertical.MuiCollapse-entered.css-c4sutr > div > div > div > div > p:nth-child(3) > b > a"
			).innerHTML +
			" vessels in | " +
			document.querySelector(
				"#generalInfo > div.MuiCollapse-root.MuiCollapse-vertical.MuiCollapse-entered.css-c4sutr > div > div > div > div > p:nth-child(4) > b > a"
			).innerHTML +
			" arriving";
		presenceData.largeImageKey = document.querySelector<HTMLImageElement>(
			"#portDetailsHeader > div > div.MuiGrid-root.MuiGrid-item.css-1wxaqej > div > div.MuiGrid-root.MuiGrid-item.css-1wxaqej > div > img"
		).src;
		presenceData.smallImageKey = document.querySelector<HTMLImageElement>(
			"#portDetailsHeader > div > div.MuiGrid-root.MuiGrid-item.css-1wxaqej > div > div.MuiGrid-root.MuiGrid-item.MuiGrid-grid-sm-true.css-qc7bc1 > div > img"
		).src;
		presenceData.smallImageText = document.querySelector(
			"#portDetailsHeader > div > div.MuiGrid-root.MuiGrid-item.css-1wxaqej > div > div.MuiGrid-root.MuiGrid-item.MuiGrid-grid-sm-true.css-qc7bc1 > div > span.MuiTypography-root.MuiTypography-body2.jss26.css-14tmp0 > strong"
		).innerHTML;
		presenceData.buttons = [
			{ label: "View Port", url: document.location.href },
		];
	} else if (document.location.pathname.includes("ais/details/stations")) {
		elemName = document.querySelector(
			"body > main > div > div > div.tablet-padding-fix > div:nth-child(4) > div > div > div.table-cell.text-overflow.text-left.collapse-768 > div.group-ib > h1"
		).innerHTML;
		presenceData.details = `Watching ${elemName} Station`;
		presenceData.state = `Covering ${
			document
				.querySelector(
					"body > main > div > div > div.tablet-padding-fix > div.row.gutter-10 > div.col-md-6.col-lg-5 > div:nth-child(4) > div > div > table > tbody > tr:nth-child(5) > td:nth-child(2)"
				)
				.innerHTML.split("<sup>")[0]
		}² (${
			document.querySelector<HTMLImageElement>(
				"body > main > div > div > div.tablet-padding-fix > div:nth-child(4) > div > div > div.table-cell.text-overflow.text-left.collapse-768 > div.vertical-offset-10 > img"
			).title
		})`;
		presenceData.smallImageKey = document.querySelector<HTMLImageElement>(
			"body > main > div > div > div.tablet-padding-fix > div:nth-child(4) > div > div > div.table-cell.text-overflow.text-left.collapse-768 > div.group-ib > img"
		).src;
		presenceData.smallImageText = document.querySelector<HTMLImageElement>(
			"body > main > div > div > div.tablet-padding-fix > div:nth-child(4) > div > div > div.table-cell.text-overflow.text-left.collapse-768 > div.group-ib > img"
		).title;
		presenceData.buttons = [
			{ label: "View Station", url: document.location.href },
		];
	}
	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
