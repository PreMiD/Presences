const presence = new Presence({
		clientId: "629413450774347786",
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
		largeImageKey: "https://i.imgur.com/DLMu1BF.png",
		startTimestamp: browsingTimestamp,
	};
	if (
		document.location.hostname === "bimbimma.com" &&
		document.URL.includes("/mcstacker/2014-08-31.php")
	) {
		presenceData.details = "MCStacker for 1.7.x";
		delete presenceData.state;

		delete presenceData.smallImageKey;

		presence.setActivity(presenceData);
	} else if (
		document.location.hostname === "mcstacker.bimbimma.com" &&
		document.URL.includes("/mcstacker1.10.php")
	) {
		presenceData.details = "MCStacker for 1.8.x - 1.10.x";
		delete presenceData.state;

		delete presenceData.smallImageKey;

		presence.setActivity(presenceData);
	} else if (
		document.location.hostname === "mcstacker.bimbimma.com" ||
		document.URL.includes("mcstacker.net/1.12.php")
	) {
		presenceData.details = "MCStacker for 1.12.x";
		delete presenceData.state;

		delete presenceData.smallImageKey;

		presence.setActivity(presenceData);
	} else if (document.URL.includes("mcstacker.net/1.13converter.php")) {
		presenceData.details = "MCStacker Converter for 1.13.x";
		delete presenceData.state;

		delete presenceData.smallImageKey;

		presence.setActivity(presenceData);
	} else if (document.URL.includes("mcstacker.net/1.13.php")) {
		presenceData.details = "MCStacker for 1.13.x";
		delete presenceData.state;

		delete presenceData.smallImageKey;

		presence.setActivity(presenceData);
	} else if (document.URL.includes("mcstacker.net/1.14.php")) {
		presenceData.details = "MCStacker for 1.14.x";
		delete presenceData.state;

		delete presenceData.smallImageKey;

		presence.setActivity(presenceData);
	} else if (document.URL.includes("mcstacker.net/1.15.php")) {
		presenceData.details = "MCStacker for 1.15.x";
		delete presenceData.state;

		delete presenceData.smallImageKey;

		presence.setActivity(presenceData);
	} else if (document.location.hostname === "mcstacker.net") {
		if (document.querySelector("#lootTableContainer")) {
			presenceData.details = "MCStacker for latest";
			presenceData.state = "Making a loot table";

			delete presenceData.smallImageKey;

			presence.setActivity(presenceData);
		} else if (document.querySelector("#lootPane")) {
			presenceData.details = "MCStacker for latest";
			presenceData.state = "Making a /loot command";

			delete presenceData.smallImageKey;

			presence.setActivity(presenceData);
		} else if (document.querySelector("#bossbarPane")) {
			presenceData.details = "MCStacker for latest";
			presenceData.state = "Making a /bossbar command";

			delete presenceData.smallImageKey;

			presence.setActivity(presenceData);
		} else if (document.querySelector("#scoreboardPane")) {
			presenceData.details = "MCStacker for latest";
			presenceData.state = "Making a /scoreboard command";

			delete presenceData.smallImageKey;

			presence.setActivity(presenceData);
		} else if (document.querySelector("#teamPane")) {
			presenceData.details = "MCStacker for latest";
			presenceData.state = "Making a /team command";

			delete presenceData.smallImageKey;

			presence.setActivity(presenceData);
		} else if (document.querySelector("#particlePane")) {
			presenceData.details = "MCStacker for latest";
			presenceData.state = "Making a /particle command";

			delete presenceData.smallImageKey;

			presence.setActivity(presenceData);
		} else if (document.querySelector("#soundPane")) {
			presenceData.details = "MCStacker for latest";
			presenceData.state = "Making a /playsound command";

			delete presenceData.smallImageKey;

			presence.setActivity(presenceData);
		} else if (document.querySelector("#replaceItemPane")) {
			presenceData.details = "MCStacker for latest";
			presenceData.state = "Making a /replaceitem command";

			delete presenceData.smallImageKey;

			presence.setActivity(presenceData);
		} else if (document.querySelector("#tellrawPane")) {
			presenceData.details = "MCStacker for latest";
			presenceData.state = "Making a /tellraw command";

			delete presenceData.smallImageKey;

			presence.setActivity(presenceData);
		} else if (document.querySelector("#blockPane")) {
			presenceData.details = "MCStacker for latest";
			presenceData.state = "Making a /block command";

			delete presenceData.smallImageKey;

			presence.setActivity(presenceData);
		} else if (document.querySelector("#rootEntity")) {
			presenceData.details = "MCStacker for latest";
			presenceData.state = "Making a /entity command";

			delete presenceData.smallImageKey;

			presence.setActivity(presenceData);
		} else if (document.querySelector("#givePane")) {
			presenceData.details = "MCStacker for latest";
			presenceData.state = "Making a /give command";

			delete presenceData.smallImageKey;

			presence.setActivity(presenceData);
		} else if (document.querySelector("#effectPane")) {
			presenceData.details = "MCStacker for latest";
			presenceData.state = "Making a /effect command";

			delete presenceData.smallImageKey;

			presence.setActivity(presenceData);
		} else if (document.URL.includes("/versions.php")) {
			presenceData.details = "MCStacker viewing:";
			presenceData.state = "Version page";

			delete presenceData.smallImageKey;

			presence.setActivity(presenceData);
		} else if (document.location.pathname.includes("/npc/")) {
			presenceData.details = "Using the";
			presenceData.state = "NPC generator";

			delete presenceData.smallImageKey;

			presence.setActivity(presenceData);
		} else if (document.location.pathname.includes("/murals/")) {
			presenceData.details = "Using the";
			presenceData.state = "Mural generator";

			delete presenceData.smallImageKey;

			presence.setActivity(presenceData);
		} else presence.setActivity();
	} else presence.setActivity();
});
