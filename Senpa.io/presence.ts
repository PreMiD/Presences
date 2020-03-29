const presence = new Presence({
	clientId: "691669470057594940",
	mediaKeys: false
});

var user: any;
var title: any;
var replace: any;
var search: any;

var browsingStamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
	let presenceData: presenceData = {
		largeImageKey: "logo"
	};

	var route = document.location.pathname.split('/');

	if (document.location.pathname === "/") {
		presenceData.details = "Home";
	} else if (document.location.pathname.includes("/web/")) {
		presenceData.details = `Playing on server : ${document.querySelector("#room-stats-hud").textContent}`;
		presenceData.state = `Player :${!document.querySelector("#tag").nodeValue ? "" : ` [${document.querySelector("#tag").nodeValue}]`} ${!document.querySelector("#name").nodeValue ? "no nick" : document.querySelector("#name").nodeValue}` + ` | ${document.querySelector("#stats-hud").textContent}`;
		presenceData.startTimestamp = Date.now();
	} else {
		presenceData.details = document.querySelector(".alt-page h1").textContent;
	}

	if (presenceData.details == null) {
		presence.setTrayTitle();
		presence.setActivity();
	} else {
		if (presenceData.state == null) presenceData.state = "Navigating...";
		presence.setActivity(presenceData);
	}
});

function parseQueryString(queryString?: string): any {
	if (!queryString) {
		queryString = window.location.search.substring(1);
	}
	const params = {};
	const queries = queryString.split("&");
	queries.forEach((indexQuery: string) => {
		const indexPair = indexQuery.split("=");
		const queryKey = decodeURIComponent(indexPair[0]);
		const queryValue = decodeURIComponent(indexPair.length > 1 ? indexPair[1] : "");
		params[queryKey] = queryValue;
	});
	return params;
};