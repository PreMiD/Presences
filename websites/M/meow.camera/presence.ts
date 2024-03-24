const presence = new Presence({
	clientId: "1219194850767929374",
});
let browsingTimestamp = Math.floor(Date.now() / 1000);

const enum Assets {
	Logo = "https://i.postimg.cc/GhMJx6PB/logo.png",
}

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		largeImageKey: Assets.Logo,
		startTimestamp: browsingTimestamp,
	};

	presenceData.details = document.querySelector(".feeder-title").textContent;
	presenceData.state = getStats();
	setTimestamps(document.querySelector("video"), presenceData);
	presenceData.buttons = [
		{
			label: "View Feeder",
			url: document.location.href,
		},
	];
	presence.setActivity(presenceData);
});

function getStats(): string {
	let stats = "";
	const snack = document.querySelector("[title='Snack stock']"),
		kibble = document.querySelector("[title='Kibble stock']"),
		temp = document.querySelector("[title='Feeder temperature']");

	if (!snack || !kibble || !temp) return stats;

	stats = `🍪: ${snack.textContent === "" ? "🚫" : snack.textContent} | 🍿: ${
		kibble.textContent === "" ? "🚫" : kibble.textContent
	} | 🌡️: ${temp.textContent === "" ? "🚫" : temp.textContent} `;

	return stats;
}

function setTimestamps(
	element: HTMLVideoElement,
	presenceData: PresenceData
): void {
	if (element.paused) {
		delete presenceData.startTimestamp;
		browsingTimestamp = Math.floor(Date.now() / 1000);
		presenceData.smallImageKey = Assets.Pause;
	} else presenceData.smallImageKey = Assets.Live;
}
