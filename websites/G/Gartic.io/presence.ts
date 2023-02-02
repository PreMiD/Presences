const presence = new Presence({ clientId: "808668919635247104" }),
	garticPlayingTimestamp = Math.floor(Date.now() / 1000),
	getGarticPresence = (): PresenceData => {
		const path = document.location.pathname,
			base: PresenceData = {
				largeImageKey: "https://i.imgur.com/3rfHXtU.png",
				startTimestamp: garticPlayingTimestamp,
			};

		if (path === "/") return { ...base, details: "Viewing the homepage" };

		if (path === "/rooms") return { ...base, details: "Browsing rooms" };

		if (path !== "/room" && !path.match(/^\/[0-9a-zA-Z]{6,}/))
			return { ...base, details: "Somewhere on the site" };

		const user = document.querySelector(".user.you"),
			medal =
				Object.entries({
					first: "🥇",
					second: "🥈",
					third: "🥉",
				})
					.filter(([key]) => user.classList.contains(key))
					.map(([, value]) => value)
					.find(() => true) ?? "",
			wins = Number(user.querySelector(".win")?.textContent ?? "0"),
			data: PresenceData = {
				...base,
				details: `${user.querySelector(".nick").textContent} | ${medal} ${user
					.querySelector(".points")
					.textContent.replace("pts", "points")} 
					${wins > 0 ? ` | 🏆 ${wins} wins` : ""}`,
			};

		if (user.classList.contains("turn"))
			return { ...data, state: "🖌️ Currently drawing" };

		if (user.classList.contains("hit"))
			return { ...data, state: "✅ Guessed the word" };

		return { ...data, state: "🤔 Guessing the word" };
	};

presence.on("UpdateData", async () => {
	presence.setActivity(getGarticPresence());
});
