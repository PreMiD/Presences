const presence = new Presence({
		clientId: "1074706064609656852",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);


presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		largeImageKey: "https://i.imgur.com/vKeC7jt.png",
		startTimestamp: browsingTimestamp,
},

revisionscheck = (<HTMLInputElement>document.querySelector("#revisions-toggle")).title,

revisionsubmit = (<HTMLInputElement>document.querySelector("#submitRevisionButton"))?.textContent;

if (document.location.search.startsWith("?pattern=")) {
		const searchvar = (<HTMLInputElement>document.querySelector("#sticky-list-header > div.Ccm27v > div > input")).value;
		presenceData.details = `Searching tabs for '${searchvar}'`;
} else if (document.location.pathname.endsWith("plus")) 
		presenceData.details = "Considering buying Songsterr Plus";

		else if (document.location.pathname.endsWith("mytabs")) 
		presenceData.details = "Checking submitted tabs";

		else if (document.location.pathname.endsWith("submit"))
		presenceData.details = "Submitting tabs";

		else if (document.location.pathname.endsWith("help"))
		presenceData.details = "Reading FAQ";

		else if (document.location.pathname.endsWith("howtoreadtab"))
		presenceData.details = "Learning how to read a tab";

		else if (document.location.pathname.endsWith("account"))
		presenceData.details = "Typing in account details";

		else if (document.location.pathname.endsWith("favorites"))
		presenceData.details = "Checking saved favorite songs";

		else if (document.location.pathname.endsWith("payment"))
		presenceData.details = "Buying Songsterr Plus";

		else if (revisionscheck === "Hide revisions") {
		presenceData.details = "Checking Revisions";
		if (revisionsubmit === "Submit a new revision") {
			presenceData.details = "Checking Revisions";
			presenceData.state = "Submitting a new revision";
	}
} else {
	
	presenceData.state = `Author: ${document.querySelector('[aria-label="artist"]').textContent}`;
	presenceData.details = `Title: ${document.querySelector('[aria-label="title"]').textContent}`;
}


if (presenceData) presence.setActivity(presenceData);
else presence.setActivity(presenceData);
});