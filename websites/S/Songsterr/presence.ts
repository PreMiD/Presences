const presence = new Presence({
	clientId: "1074706064609656852",
}),
browsingTimestamp = Math.floor(Date.now() / 1000);


function isSearching(pathname: string) {
	return pathname.match("\\?pattern=")?.length > 0;
	
}

presence.on("UpdateData", async () => {
const presenceData: PresenceData = {
	largeImageKey: "https://i.imgur.com/vKeC7jt.png",
	startTimestamp: browsingTimestamp,
},

obj: {[key: string]: string } = {
	plus: "Viewing Plans",
	mytabs: "Checking submitted tabs",
	submit: "Submitting Tabs",
	help: "Reading FAQ",
	howtoreadtab: "Learning how to read a tab",
	account: "Viewing Account Settings",
	favorites: "Viewing Favorite Tabs",
	payment: "Buying Songsterr Plus"
},
searchvar = (<HTMLInputElement>(document.querySelector("#sticky-list-header > div.Ccm27v > div > input")))?.value,
{pathname} = document.location,
params = pathname.split("/");
 presenceData.details = obj[params.at(-1)];

 presenceData.details = isSearching(pathname) ? `Searching tabs for '${searchvar}'` : obj[params.at(-1)];
// if (document.location.search.startsWith("?pattern=")) {
// 	presenceData.details = `Searching tabs for '${searchvar}'`;
// } 
// else if (document.location.pathname.endsWith("plus"))
// 	presenceData.details = "Considering buying Songsterr Plus";
// else if (document.location.pathname.endsWith("mytabs"))
// 	presenceData.details = "Checking submitted tabs";
// else if (document.location.pathname.endsWith("submit"))
// 	presenceData.details = "Submitting tabs";
// else if (document.location.pathname.endsWith("help"))
// 	presenceData.details = "Reading FAQ";
// else if (document.location.pathname.endsWith("howtoreadtab"))
// 	presenceData.details = "Learning how to read a tab";
// else if (document.location.pathname.endsWith("account"))
// 	presenceData.details = "Typing in account details";
// else if (document.location.pathname.endsWith("favorites"))
// 	presenceData.details = "Checking saved favorite songs";
// else if (document.location.pathname.endsWith("payment"))
// 	presenceData.details = "Buying Songsterr Plus";
// else if (
// 	document.querySelector<HTMLInputElement>("#revisions-toggle").title ===
// 	"Hide revisions"
// ) {
// 	presenceData.details = "Checking Revisions";
// 	if (
// 		document.querySelector<HTMLInputElement>("#submitRevisionButton")
// 			?.textContent === "Submit a new revision"
// 	) {
// 		presenceData.details = "Checking Revisions";
// 		presenceData.state = "Submitting a new revision";
// 	}
// } else {
// 	presenceData.state = `Author: ${
// 		document.querySelector('[aria-label="artist"]').textContent
// 	}`;
// 	presenceData.details = `Title: ${
// 		document.querySelector('[aria-label="title"]').textContent
// 	}`;
// }

if (presenceData.details) presence.setActivity(presenceData);
else presence.setActivity();
});





// const presence = new Presence({
// 	clientId: "1112463096368353300",
// });

// presence.on("UpdateData", async () => {
// 	const presenceData: PresenceData = {
// 		largeImageKey:
// 			"https://cdn.rcd.gg/PreMiD/websites/S/Songsterr/assets/logo.png",
// 	};

// 	switch (document.location.pathname) {
// 		case "/": {
// 			presenceData.details = "Searching";
// 			break;
// 		}
// 		case "/a/wa/favorites": {
// 			presenceData.details = "Viewing Favorite Tabs";
// 			break;
// 		}
// 		case "/a/wa/mytabs": {
// 			presenceData.details = "Viewing Owned Tabs";
// 			break;
// 		}
// 		case "/a/wa/submit": {
// 			presenceData.details = "Submitting Tabs";
// 			break;
// 		}
// 		case "/a/wa/plus": {
// 			presenceData.details = "Viewing Plans";
// 			break;
// 		}
// 		case "/a/wa/help": {
// 			presenceData.details = "Viewing Q&A";
// 			break;
// 		}
// 		case "/a/wa/account": {
// 			presenceData.details = "Viewing Account Settings";
// 			break;
// 		}
// 		default:
// 			if (document.location.pathname.startsWith("/a/wsa/")) {
// 				presenceData.details = document.querySelector(
// 					'[aria-label="title"]'
// 				).textContent;

// 				presenceData.state = document.querySelector(
// 					'[aria-label="artist"]'
// 				).textContent;
// 			}
// 	}

// 	presence.setActivity(presenceData);
// });
