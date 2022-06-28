const presence = new Presence({
	clientId: "990710812320612432",
});

presence.on("UpdateData", () => {
	const presenceData: PresenceData = {
		largeImageKey: "zarp-512x512",
	};
	switch (window.location.host) {
		case "zarpgaming.com":
			if (
				window.location.pathname === "/index.php" ||
				window.location.pathname === "/index.php/forum"
			)
				presenceData.details = "Viewing the home page";
			else if (window.location.pathname.startsWith("/index.php/forum/")) {
				presenceData.details = "Viewing a section:";
				presenceData.state =
					document.querySelector<HTMLElement>(
						"#Kunena > form > div > div.kheader > h2 > span"
					)?.textContent ?? document.title;
				presenceData.buttons = [
					{
						label: "Visit Section",
						url: window.location.href,
					},
				];
			} else if (window.location.pathname === "/index.php/servers")
				presenceData.details = "Viewing servers";
			else if (window.location.pathname === "/index.php/user-list")
				presenceData.details = "Viewing the list of users";
			else if (window.location.pathname === "/index.php/zarp-vip")
				presenceData.details = "Viewing the VIP page";
			else if (window.location.pathname === "/index.php/zarp-vip/booster-pack")
				presenceData.details = "Viewing the booster packs";
			else if (window.location.pathname === "/index.php/help")
				presenceData.details = "Viewing the help page";
			else if (window.location.pathname.startsWith("/index.php/help/faq")) {
				presenceData.details = "Viewing the FAQ";
				if (window.location.pathname.includes("faq/"))
					presenceData.state = document.title;
			} else if (
				document.querySelector(
					"#Kunena > div:nth-child(5) > div.kheader > h1 > span"
				)
			) {
				presenceData.details = "Viewing a thead:";
				presenceData.state = document
					.querySelector<HTMLElement>(
						"#Kunena > div:nth-child(5) > div.kheader > h1 > span"
					)
					.textContent.replace("TOPIC: ", "");
				presenceData.buttons = [
					{
						label: "Visit Thread",
						url: window.location.href,
					},
				];
			} else if (
				window.location.pathname.startsWith("/index.php/2013-11-13-21-35-14/")
			) {
				presenceData.details = "Viewing a section:";
				presenceData.state = document.querySelector<HTMLElement>(
					"#Kunena > div.kblock.kpathway.breadcrumbs-1 > div > div > div > div.path-element > a"
				).textContent;
				presenceData.buttons = [
					{
						label: "Visit Section",
						url: window.location.href,
					},
				];
			} else if (
				window.location.pathname.startsWith("/index.php/forum/profile/")
			) {
				presenceData.details = "Viewing a profile:";
				presenceData.state = document.title.replace("Profile for ", "");
				presenceData.buttons = [
					{
						label: "Visit Profile",
						url: window.location.href,
					},
				];
			} else if (
				window.location.pathname.startsWith("/index.php/forum/announcement/")
			) {
				if (window.location.pathname.includes("list"))
					presenceData.details = "Viewing the announcement list";
				else {
					presenceData.details = "Viewing an announcement:";
					presenceData.state = document.querySelector<HTMLElement>(
						"#Kunena > div.kblock.kannouncement > div.kheader > h2 > span"
					).textContent;
				}
			} else if (window.location.pathname.includes("/topic/create")) {
				presenceData.details = "Creating a topic in section:";
				presenceData.state = document.querySelector<HTMLElement>(
					"#Kunena > div.kblock.kpathway.breadcrumbs-1 > div > div > div > div:nth-child(3) > a"
				).textContent;
			} else if (window.location.pathname.includes("/new-topic")) {
				presenceData.details = "Creating a topic in section:";

				for (const option of document.querySelector<HTMLSelectElement>("#postcatid")) {
					if (option.selected) {
						presenceData.state = option.textContent
							.replace(/^[-\s]+/, "")
							.replace(/[-\s]+/g, " ");
						break;
					}
				}
			} else if (!presenceData.details) {
				presenceData.details = "Viewing a page:";
				presenceData.state = document.title;
			}

			break;
		case "control.zarpgaming.com":
			presenceData.details = "Server Control Panel";
			break;
	}

	presence.setActivity(presenceData);
});
