const iframe = new iFrame();
iframe.on("UpdateData", () => {
	if (
		document.location.hostname === "www.4chan.org" ||
		document.location.hostname === "boards.4chan.org" ||
		document.location.hostname === "www.4channel.org" ||
		(document.location.hostname === "boards.4channel.org" &&
			!document.location.pathname.startsWith("/frames_navigation"))
	) {
		const query1 = document.querySelector("div.boardBanner>div.boardTitle"),
			query2 = document.querySelector("div.boxbar>h2"),
			query3 = document.querySelector("div.pagelist>div.pages"),
			query4 = document.querySelector("div.pagelist>div.pages>strong"),
			query6 = document.querySelector("#togglePostFormLink");
		iframe.send({
			pathnameA: document.location.pathname,
			queryA: query1 ? query1.textContent : false,
			queryB: query2 ? query2.textContent : false,
			queryC: query3 ? query3.lastElementChild.textContent : false,
			queryD: query4 ? query4.textContent : false,
			queryE: document.querySelector("table#postForm") ? true : false,
			queryF: query6 ? query6.hasAttribute("style") : false,
			queryG: document.querySelector("div#quickReply") ? true : false,
		});
	}
});
