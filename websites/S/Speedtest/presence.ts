const presence = new Presence({
		clientId: "817385570912174121",
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
	const presenceData: PresenceData = {
			largeImageKey: "https://i.imgur.com/CFAKdIH.png",
		},
		showISP = await presence.getSetting<boolean>("showISP");

	if (window.location.hostname.includes("speedtest")) {
		if (window.location.pathname.includes("/run")) {
			const server = `${
					document.querySelector(
						".result-item-icon.result-item-host .result-data, .result-item-icon.result-item-host .result-label"
					).textContent
				} - ${
					document.querySelector(
						".result-item-icon.result-item-host .result-data, .result-item-icon.result-item-host .result-label .result-name"
					).textContent
				}`,
				ping =
					document.querySelector(
						"span.result-item.result-item-latency.result-data-latency-item.updated > span"
					).textContent +
					document.querySelector("span:nth-child(1) > span.result-data-unit")
						.textContent,
				download =
					document.querySelector(".result-item-download .result-data")
						.textContent +
					document.querySelector(".result-item-download .result-data-unit")
						.textContent,
				upload =
					document.querySelector(".result-item-upload .result-data")
						.textContent +
					document.querySelector(".result-item-upload .result-data-unit")
						.textContent;
			let isp = document.querySelector(
				".result-item-icon.result-item-isp .result-label"
			).textContent;
			if (!showISP) isp = "Hidden";
			// 27 & 29 = nothing + unit
			if (upload.length === 29) {
				presenceData.details = `Live results - Ping ${
					ping.length === 27 ? "Testing" : ping
				} | Download ${
					download.length === 29 ? "Testing" : download
				} | Upload Testing`;
				presenceData.state = `ISP: ${isp} | Server: ${server}`;
			} else presenceData.details = "Browsing the homepage";
			presenceData.startTimestamp = browsingTimestamp;
		} else if (window.location.pathname.includes("/result")) {
			const server = `${
				document.querySelector(
					".result-item-icon.result-item-host .result-data, .result-item-icon.result-item-host .result-label"
				).textContent
			} - ${
				document.querySelector(
					".result-item-icon.result-item-host .result-data, .result-item-icon.result-item-host .result-label .result-name"
				).textContent
			}`;
			let isp = document.querySelector(
				".result-item-icon.result-item-isp .result-label"
			).textContent;
			if (!showISP) isp = "Hidden";
			try {
				presenceData.details = `Viewing results - Ping ${
					document.querySelector(
						"span.result-item.result-item-latency.result-data-latency-item.updated > span"
					).textContent
				} ms | Download ${
					document.querySelector(
						"div.result-item-container.result-item-container-align-center > div > div.result-data.u-align-left > span"
					).textContent
				} Mbps | Upload ${
					document.querySelector(
						"div.result-item-container.result-item-container-align-left > div > div.result-data.u-align-left > span"
					).textContent
				} Mbps`;
			} catch {
				presenceData.details = `Viewing results - Ping ${
					document.querySelector(
						"span.result-item.result-item-latency.result-data-latency-item.updated > span"
					).textContent
				} ms | Download ${
					document.querySelector(
						"div.result-item-container.result-item-container-align-center > div > div.result-data.u-align-left > span"
					).textContent
				} Mbps | Upload ${
					document.querySelector(
						"div.result-item-container.result-item-container-align-left > div > div.result-data.u-align-left > span"
					).textContent
				} Mbps`;
			}
			presenceData.state = `ISP: ${isp} | Server: ${server}`;
			presenceData.startTimestamp = browsingTimestamp;
		} else if (window.location.pathname.includes("/ookla-5g-map")) {
			presenceData.details = "Navigate on the 5G map";
			presenceData.startTimestamp = browsingTimestamp;
		} else if (window.location.pathname.includes("/apps")) {
			presenceData.details = "Watching apps";
			presenceData.startTimestamp = browsingTimestamp;
		} else if (window.location.pathname.endsWith("/insights")) {
			presenceData.details = "Browsing insights";
			presenceData.startTimestamp = browsingTimestamp;
		} else if (window.location.pathname.includes("/insights/blog")) {
			presenceData.details = "Browsing blog";
			if (window.location.pathname !== "/insights/blog/") {
				presenceData.state = document.querySelector(
					"#speedtest .header .header-wrap h1"
				).textContent;
			}
			presenceData.startTimestamp = browsingTimestamp;
		} else if (window.location.pathname.includes("/global-index")) {
			presenceData.details = "Browsing Speedtest Global Index";
			presenceData.state = document.querySelector(
				".section .page-header"
			).textContent;
			presenceData.startTimestamp = browsingTimestamp;
		} else if (window.location.pathname.includes("/speedtest-servers")) {
			presenceData.details = "Look how to host a server";
			presenceData.startTimestamp = browsingTimestamp;
		} else if (window.location.pathname.includes("/enterprise")) {
			presenceData.details = "Look entreprise solutions";
			presenceData.startTimestamp = browsingTimestamp;
		} else if (window.location.pathname.includes("/about")) {
			presenceData.details = "About Ookla";
			presenceData.startTimestamp = browsingTimestamp;
		} else if (window.location.pathname.includes("/login")) {
			presenceData.details = "Log in";
			presenceData.startTimestamp = browsingTimestamp;
		} else if (window.location.pathname.includes("/register")) {
			presenceData.details = "Creating an account";
			presenceData.startTimestamp = browsingTimestamp;
		} else if (window.location.pathname.includes("/settings")) {
			presenceData.details = "Browsing settings";
			presenceData.startTimestamp = browsingTimestamp;
		} else if (window.location.pathname.includes("/help")) {
			presenceData.details = "Browsing help QA";
			presenceData.startTimestamp = browsingTimestamp;
		} else if (
			document.querySelector<HTMLSpanElement>("a > span.start-background").style
				.opacity === "1"
		) {
			const server = `${
					document.querySelector(
						".result-item-icon.result-item-host .result-data, .result-item-icon.result-item-host .result-label"
					).textContent
				} - ${
					document.querySelector(
						".result-item-icon.result-item-host .result-data, .result-item-icon.result-item-host .result-label .result-name"
					).textContent
				}`,
				download =
					document.querySelector(".result-item-download .result-data")
						.textContent +
					document.querySelector(".result-item-download .result-data-unit")
						.textContent,
				upload = `${
					document.querySelector(".result-item-upload .result-data").textContent
				}${
					document.querySelector(".result-item-upload .result-data-unit")
						.textContent
				}`;
			let isp = document.querySelector(
					".result-item-icon.result-item-isp .result-label"
				).textContent,
				ping = "";
			if (!showISP) isp = "Hidden";
			if (
				document.querySelector(
					"span.result-item.result-item-latency.result-data-latency-item.updated > span"
				) &&
				document.querySelector("span:nth-child(1) > span.result-data-unit")
			) {
				ping =
					document.querySelector(
						"span.result-item.result-item-latency.result-data-latency-item.updated > span"
					).textContent +
					document.querySelector("span:nth-child(1) > span.result-data-unit")
						.textContent;
			} else ping = "N/A";

			presenceData.details = `Testing ${server}`;
			presenceData.details = `Live results - Ping ${
				ping.length === 27 ? "Testing" : ping
			} | Download ${download.length === 29 ? "Testing" : download} | Upload  ${
				upload.length === 29 ? "Testing" : upload
			}`;
			presenceData.state = `ISP: ${isp} | Server: ${server}`;
		} else presenceData.details = "Browsing the homepage";
		presenceData.startTimestamp = browsingTimestamp;
	}
	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
