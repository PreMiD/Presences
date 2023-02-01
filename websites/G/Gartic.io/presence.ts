/* eslint-disable one-var */
const garticPlayingTimestamp = Math.floor(Date.now() / 1000);
const getGarticPresence = (): PresenceData => {
	const path = document.location.pathname,
		base: PresenceData = {
			largeImageKey: "https://i.imgur.com/JkOc5Vo.png",
			startTimestamp: garticPlayingTimestamp,
		};

	// The homepage
	if (path === "/") return { ...base, details: "Viewing the Homepage" };

	// The rooms selection page
	if (path === "/rooms") return { ...base, details: "Browsing rooms" };

	// Not in any room???
	if (path !== "/room" && !path.match(/^\/[0-9a-zA-Z]{8}/))
		return { ...base, details: "Somewhere on the site" };

	const user = document.querySelector(".user.you");
	const data: PresenceData = {
		...base,
		details: `In a room / ${user.querySelector(".nick").textContent} / ${user
			.querySelector(".points")
			.textContent.replace("pts", "points")}`,
	};

	if (user.classList.contains("turn"))
		return { ...data, state: "🖌️ Currently drawing" };

	if (user.classList.contains("hit"))
		return { ...data, state: "✅ Guessed the word" };

	return { ...data, state: "🤔 Guessing the word" };
};

const presence = new Presence({ clientId: "808668919635247104" });

presence.on("UpdateData", async () => {
	presence.setActivity(getGarticPresence());
});
