const presence = new Presence({
		clientId: "939893108827635712",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
	const [timestamps, buttons, cover] = await Promise.all([
			presence.getSetting<boolean>("timestamps"),
			presence.getSetting<boolean>("buttons"),
			presence.getSetting<boolean>("cover"),
		]),
		presenceData: PresenceData = {
			largeImageKey: "logo",
			startTimestamp: browsingTimestamp,
		};

	if (document.location.pathname === "/")
		presenceData.details = "Viewing Homepage";
	if (document.location.pathname.startsWith("/levels")) {
		if (document.location.pathname === "/levels") {
			presenceData.details = "Browsing Levels";
			presenceData.state = `${
				document.querySelector("div.dropdown-trigger > button").textContent
			} ${
				document.querySelector<SVGElement>("div.field > button > span > svg")
					.dataset.icon === "sort-amount-up"
					? "↑"
					: "↓"
			}`;
			const previewedCard = [...document.querySelectorAll("audio")].find(
				element => !element.paused
			)?.parentElement.parentElement.parentElement;
			if (previewedCard) {
				presenceData.details =
					previewedCard.querySelector(".content-title").textContent;
				presenceData.state =
					previewedCard.querySelector(".content-subtitle").textContent;
				presenceData.largeImageKey = previewedCard
					.querySelector<HTMLDivElement>(".content-card-bg")
					.style.backgroundImage.slice(5, -2);
				presenceData.endTimestamp = presence.getTimestampsfromMedia(
					previewedCard.querySelector("audio")
				)[1];
				presenceData.smallImageKey = Assets.Play;
				presenceData.smallImageText = "Playing Preview";
				presenceData.buttons = [
					{
						label: "View Level",
						url: previewedCard.querySelector<HTMLAnchorElement>(
							".content-card-overlay"
						).href,
					},
					{
						label: "View Uploader",
						url: previewedCard.querySelector<HTMLAnchorElement>(".link").href,
					},
				];
			}
		} else {
			presenceData.details = document.querySelector("h1").textContent;
			presenceData.state = document.querySelector("h5").textContent;
			presenceData.largeImageKey = document.querySelector<HTMLImageElement>(
				"img.background-image"
			).src;
			presenceData.buttons = [
				{
					label: "View Level",
					url: document.location.href,
				},
				{
					label: "View Uploader",
					url: document.querySelector<HTMLAnchorElement>(".player-avatar").href,
				},
			];
			if (!document.querySelector("audio").paused) {
				presenceData.smallImageKey = Assets.Play;
				presenceData.smallImageText = "Playing Preview";
				presenceData.endTimestamp = presence.getTimestampsfromMedia(
					document.querySelector("audio")
				)[1];
			}
		}
	}
	if (document.location.pathname.startsWith("/collections")) {
		if (document.location.pathname === "/collections")
			presenceData.details = "Browsing Collections";
		else {
			presenceData.details = "Viewing Collection";
			presenceData.state = document.querySelector("h1").textContent;
			presenceData.largeImageKey = document.querySelector<HTMLImageElement>(
				"img.background-image"
			).src;
			presenceData.buttons = [
				{
					label: "View Level",
					url: document.location.href,
				},
				{
					label: "View Uploader",
					url: document.querySelector<HTMLAnchorElement>(".player-avatar").href,
				},
			];
		}
	}
	if (document.location.pathname.startsWith("/posts")) {
		if (document.location.pathname === "/posts")
			presenceData.details = "Browsing Posts";
		else {
			presenceData.details = "Viewing Post";
			presenceData.state = document.querySelector("h1").textContent;
			presenceData.buttons = [
				{
					label: "View Post",
					url: document.location.href,
				},
			];
		}
	}
	if (document.location.pathname.startsWith("/profile")) {
		presenceData.details = "Viewing Profile";
		presenceData.state = document.querySelector(".username").textContent;
		presenceData.largeImageKey =
			document.querySelector<HTMLImageElement>(".cytoid-avatar").src;
		presenceData.buttons = [
			{
				label: "View Profile",
				url: document.location.href,
			},
		];
	}
	if (document.location.pathname.startsWith("/studio")) {
		presenceData.details = "Viewing Studio";
		presenceData.state = document.querySelector(
			".is-exact-active > span"
		).textContent;
	}
	if (document.location.pathname.startsWith("/settings")) {
		presenceData.details = "Viewing Settings";
		presenceData.state = document.querySelector(
			".is-exact-active > span"
		).textContent;
	}
	if (document.location.pathname === "/library")
		presenceData.details = "Viewing Library";
	if (document.location.pathname.startsWith("/pages/")) {
		presenceData.details = `Viewing ${
			document.querySelector("div.title").textContent
		}`;
	}
	if (document.location.pathname === "/credits")
		presenceData.details = "Viewing Credits";

	if (!timestamps) {
		delete presenceData.startTimestamp;
		delete presenceData.endTimestamp;
	}
	if (!cover) presenceData.largeImageKey = "https://cdn.rcd.gg/PreMiD/websites/C/Cytoid/assets/logo.png";
	if (!buttons && presenceData.buttons) delete presenceData.buttons;

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
