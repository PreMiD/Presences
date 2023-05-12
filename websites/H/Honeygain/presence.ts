const presence = new Presence({
		clientId: "703447484025798717",
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

presence.on("UpdateData", () => {
	const path = window.location.pathname,
		presenceData: PresenceData = {
			largeImageKey: "https://i.imgur.com/GUMs8VF.png",
			details: "Browsing Honeygain",
			startTimestamp: browsingTimestamp,
		};

	if (document.location.hostname === "www.honeygain.com") {
		if (document.querySelector("#comp-jvf30y3iinlineContent"))
			presenceData.details = "Reading Privacy Policy";
		else if (document.querySelector("#comp-jvf2al4einlineContent"))
			presenceData.details = "Reading Terms of Use";
		else if (path === "/") {
			const estEarningsPos = document
					.querySelector("#comp-jv3eiz6p")
					.getBoundingClientRect(),
				whatIsHGPos = document
					.querySelector("#comp-jv0xq201")
					.getBoundingClientRect(),
				howItWorksPos = document
					.querySelector("#comp-jvgnw4tj")
					.getBoundingClientRect();
			if (estEarningsPos.top < window.innerHeight && estEarningsPos.bottom >= 0)
				presenceData.details = "Estimating Earnings";

			if (whatIsHGPos.top < window.innerHeight && whatIsHGPos.bottom >= 0)
				presenceData.details = "Reading What is Honeygain";

			if (howItWorksPos.top < window.innerHeight && howItWorksPos.bottom >= 0)
				presenceData.details = "Reading How It Works";
		} else if (path.includes("/faq")) presenceData.details = "Reading FAQ";
		else if (path.includes("/contact-us"))
			presenceData.details = "Seeking Help From Honeygain";
		else if (path.includes("/download"))
			presenceData.details = "Downloading Honeygain";
	} else if (path === "/") {
		presenceData.details = "Viewing Dashboard";
		presenceData.state = `Balance: ${
			document
				.querySelectorAll(".sc-dnqmqq.kpUaxq")[0]
				.textContent.split("Equals to ")[1]
		}`;
		presenceData.state += `, Gathered Today: ${
			document
				.querySelectorAll(".sc-dnqmqq.kpUaxq")[1]
				.textContent.split("Equals to ")[1]
		}`;
	} else if (path.includes("/transactions")) {
		presenceData.details = "Viewing Transaction History";
		presenceData.state = `Balance: ${
			document
				.querySelectorAll(".sc-dnqmqq.kpUaxq")[1]
				.textContent.split("Equals to ")[1]
		}`;
	} else if (path.includes("/referrals")) {
		presenceData.details = "Viewing Referrals";
		presenceData.state = `Referral Code: ${
			(
				document.querySelectorAll(
					".sc-RefOD.izklIM.sc-bwCtUz.gqfLZQ"
				)[0] as HTMLInputElement
			).value.split("https://r.honeygain.money/")[1]
		}`;
	} else if (path.includes("/faq")) presenceData.details = "Viewing FAQ";
	else if (path.includes("/profile"))
		presenceData.details = "Viewing Profile settings";

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
