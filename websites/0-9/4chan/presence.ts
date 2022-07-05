const presence = new Presence({
		clientId: "706956748329713685",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);
let pathname: string,
	query1: HTMLElement | string | Element | boolean,
	query2: HTMLElement | string | Element | boolean,
	query3: HTMLElement | string | Element | boolean,
	query4: HTMLElement | string | Element | boolean,
	query5: HTMLElement | string | Element | boolean,
	query6: HTMLElement | string | Element | boolean,
	query7: HTMLElement | string | Element | boolean;

interface IFrameData {
	pathnameA: string;
	queryA: string | boolean | HTMLElement | Element;
	queryB: string | boolean | HTMLElement | Element;
	queryC: string | boolean | HTMLElement | Element;
	queryD: string | boolean | HTMLElement | Element;
	queryE: string | boolean | HTMLElement | Element;
	queryF: string | boolean | HTMLElement | Element;
	queryG: string | boolean | HTMLElement | Element;
}

presence.on("iFrameData", (data: IFrameData) => {
	pathname = data.pathnameA;
	query1 = data.queryA;
	query2 = data.queryB;
	query3 = data.queryC;
	query4 = data.queryD;
	query5 = data.queryE;
	query6 = data.queryF;
	query7 = data.queryG;
});
presence.on("UpdateData", () => {
	if (!location.pathname.startsWith("/frames")) {
		({ pathname } = window.location);
		query1 = document.querySelector("div.boardBanner>div.boardTitle");
		query2 = document.querySelector("div.boxbar>h2");
		query3 = document.querySelector("div.pagelist>div.pages");
		query4 = document.querySelector("div.pagelist>div.pages>strong");
		query5 = document.querySelector<HTMLElement>("table#postForm");
		query6 = document.querySelector("#togglePostFormLink");
		query7 = document.querySelector<HTMLElement>("div#quickReply");
		query1 = query1 ? query1.textContent : false;
		query2 = query2 ? query2.textContent : false;
		query3 = query3 ? query3.lastElementChild.textContent : false;
		query4 = query4 ? query4.textContent : false;
		query5 = query5 ? true : false;
		query6 = query6 ? query6.hasAttribute("style") : false;
		query7 = query7 ? true : false;
	}
	let title;
	function getTitle() {
		if (!query1) title = query2;
		else title = query1;
		if (query3) title += ` - ${query4}/${query3}`;
		return title as string;
	}
	const presenceData: PresenceData = {
		details: getTitle(),
		largeImageKey: "logo",
		startTimestamp: browsingTimestamp,
	};
	if (pathname === "/") presenceData.details = "Home";
	else if (pathname && pathname.includes("/thread/")) {
		const ThreadId = pathname.split("/");
		presenceData.state = `Thread ${
			ThreadId[Number(ThreadId.indexOf("thread") + 1)]
		}`;
	}
	if (query6 || query7) {
		presenceData.smallImageKey = "writing";
		presenceData.smallImageText = "Replying/Posting";
	}
	presenceData.startTimestamp = browsingTimestamp;
	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
