const presence = new Presence({
		clientId: "1204425198741491742",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

const enum Assets {
	Logo = "https://i.imgur.com/3GKaT4f.png",
}

let video = {
	current: 0,
	duration: 0,
	paused: true,
};

presence.on(
	"iFrameData",
	(data: { current: number; duration: number; paused: boolean }) => {
		video = data;
	}
);

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: Assets.Logo,
			startTimestamp: browsingTimestamp,
		},
		{ pathname, href, origin } = document.location;

	presenceData.smallImageKey = Assets.Viewing;

	const production = pathname.startsWith("/production/as") ? pathname : null,
		community = pathname.startsWith("/community") ? pathname : null;
	switch (pathname) {
		case pathname.startsWith("/settings") ? pathname : null:
			presenceData.details = "Przegląda ustawienia profilu...";
			break;
		case pathname.startsWith("/profile") ? pathname : null:
			presenceData.details = "Przegląda profil:";
			presenceData.state = document.querySelector("h1").innerHTML;
			presenceData.buttons = [{ label: "Zobacz profil", url: href }];
			break;
		case community:
			presenceData.smallImageKey = Assets.Reading;
			if (community.split("/").length === 3) {
				presenceData.details = "Przegląda post na forum:";
				presenceData.state = document.querySelector("h1").innerHTML;
				presenceData.buttons = [{ label: "Zobacz post", url: href }];
			} else presenceData.details = "Przegląda forum...";
			break;
		case production:
			if (production.endsWith("movies"))
				presenceData.details = "Przegląda filmy anime...";
			else if (production.endsWith("list"))
				presenceData.details = "Przegląda serie anime...";
			else {
				const nav = document.querySelector("ol");
				presenceData.largeImageKey = document
					.querySelector("img.shadow-sm")
					.getAttribute("src");
				if (nav.children.length === 3) {
					presenceData.details = "Przegląda serię:";
					presenceData.state = document.querySelector("h1.fw-bolder").innerHTML;
					presenceData.buttons = [{ label: "Zobacz serię", url: href }];
				} else if (nav.children.length === 4) {
					presenceData.details = `Ogląda: ${nav.children[2].textContent}`;
					presenceData.state = `Odcinek: ${nav.children[3].textContent}`;
					presenceData.buttons = [
						{ label: "Oglądaj", url: href },
						{
							label: "Cała seria",
							url: `${origin}${nav.children[2]
								.querySelector("a")
								.getAttribute("href")}`,
						},
					];
					[presenceData.startTimestamp, presenceData.endTimestamp] =
						presence.getTimestamps(video.current, video.duration);

					presenceData.smallImageKey = Assets.Play;
					presenceData.smallImageText = "Odtwarzanie";
					if (video.paused) {
						presenceData.smallImageKey = Assets.Pause;
						presenceData.smallImageKey = "Wstrzymano";
						delete presenceData.startTimestamp;
						delete presenceData.endTimestamp;
					}
				}
			}
			break;
		case "/schedule":
			presenceData.details = "Przegląda harmonogram...";
			break;
		case "/stats":
			presenceData.details = "Przegląda statystyki...";
			break;
		case "/monitoring":
			presenceData.details = "Przegląda monitorowane serie...";
			break;
		case "/contact":
			presenceData.details = "Przegląda stronę kontaktową...";
			break;
		case "/rules":
			presenceData.details = "Czyta regulamin...";
			presenceData.smallImageKey = Assets.Reading;
			break;
		case "/privacy":
			presenceData.details = "Czyta politykę prywatności...";
			presenceData.smallImageKey = Assets.Reading;
			break;
		case "/alternatives":
			presenceData.details = "Przegląda listę stron alternatywnych...";
			break;
		default:
			presenceData.details = "Przegląda stronę główną...";
			break;
	}

	if (!presenceData.details) presence.setActivity();
	else presence.setActivity(presenceData);
});
