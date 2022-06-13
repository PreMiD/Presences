const presence = new Presence({
		clientId: "887975742812590120",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
	const showTimestamp = await presence.getSetting<boolean>("timestamp"),
		showButtons = await presence.getSetting<boolean>("buttons"),
		presenceData: PresenceData = {
			largeImageKey: "caards_logo",
			details: "Viewing unsupported page",
		};

	switch (document.location.hostname) {
		case "www.caards.me": {
			if (document.location.pathname === "/")
				presenceData.details = "Viewing home page";
			else if (document.location.pathname.includes("partners")) {
				presenceData.details = "Viewing page:";
				presenceData.state = "Partners";
				presenceData.buttons = [
					{
						label: "View Partners",
						url: document.location.href,
					},
				];
			} else if (document.location.pathname === "/popular") {
				presenceData.details = "Viewing:";
				presenceData.state = "Popular caards";
				presenceData.buttons = [
					{
						label: "View Popular Caards",
						url: document.location.href,
					},
				];
			} else if (document.location.pathname.includes("feed"))
				presenceData.details = "Viewing feed";
			else if (document.location.pathname.includes("/u/")) {
				presenceData.smallImageKey = "reading";
				presenceData.details = "Viewing profile:";
				presenceData.state = `${
					document.querySelector("span.Name.text-3xl")?.textContent || "Unknown"
				}`;
				presenceData.buttons = [
					{
						label: "View Profile",
						url: document.location.href,
					},
				];
			} else if (document.location.pathname === "/me/settings") {
				const tab = document.querySelector("button.B01")?.textContent;
				presenceData.details = "Editing Profile";
				presenceData.state = `${"Tab:" + ` ${tab ? tab : "User"}`}`;
			} else if (document.location.pathname === "/themes") {
				presenceData.details = "Viewing page:";
				presenceData.state = "Themes";
				presenceData.buttons = [
					{
						label: "View Themes",
						url: document.location.href,
					},
				];
			} else if (document.location.pathname.includes("/t/")) {
				const [, theme] = document.location.href.split("/t/");
				presenceData.details = "Viewing theme:";
				presenceData.state = `${theme}`;
				presenceData.buttons = [
					{
						label: `View ${theme}`,
						url: document.location.href,
					},
				];
			} else {
				switch (document.location.pathname) {
					case "/signup": {
						presenceData.details = "Signing Up";
						break;
					}
					case "/signin": {
						const username = document.querySelector("input")?.value;
						presenceData.details = "Signing In:";
						username
							? (presenceData.state = `To ${username}`)
							: (presenceData.state = "To Unknown");

						break;
					}
					case "/privacy": {
						presenceData.details = "Viewing:";
						presenceData.state = "Privacy Policy";

						break;
					}
					case "/tos": {
						presenceData.details = "Viewing:";
						presenceData.state = "Terms of Service";

						break;
					}
					// No default
				}
			}
			break;
		}
		case "help.caards.me": {
			if (document.location.pathname === "/")
				presenceData.details = "Viewing help page";
			else if (document.location.pathname.includes("/widgets/")) {
				presenceData.details = "Viewing help info...";
				presenceData.state = `Widget: ${
					document.location.href.split("/widgets/")[1]
				}`;
			}

			break;
		}
		case "status.caards.me": {
			if (document.location.pathname === "/")
				presenceData.details = "Viewing status page";

			break;
		}
		// No default
	}

	if (!showButtons) delete presenceData.buttons;
	if (showTimestamp) presenceData.startTimestamp = browsingTimestamp;

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
