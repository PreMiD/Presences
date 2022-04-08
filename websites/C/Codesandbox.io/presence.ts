const presence = new Presence({
		clientId: "961652082027421746"
	}),
	browsingTimestamp = Math.floor(Date.now()),
	formats = [
		"js",
		"jsx",
		"ts",
		"tsx",
		"json",
		"py",
		"cpp",
		"cs",
		"c",
		"py",
		"swift",
		"java",
		"html",
		"css"
	];
presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: "load",
			smallImageKey: "smallimagekey",
			smallImageText: "Codesandbox",
			details: "Loading",
			startTimestamp: browsingTimestamp
		},
		{ pathname, search } = window.location;
	if (pathname.includes("/dashboard/")) {
		presenceData.details = "Looking at their dashboard";
		presenceData.largeImageKey = "dashboard";
	} else if (pathname.includes("/u/")) {
		const uname = document.querySelector<HTMLSpanElement>(
			'[class="sc-bdnylx sc-gtssRu gDXMLZ itZLEx"]'
		);
		presenceData.details = "Looking at a user's profile";
		presenceData.state = `@${uname.textContent}`;
		presenceData.buttons = [
			{
				label: `View @${uname.textContent}'s Profile`,
				url: location.href.toString()
			}
		];
	} else if (pathname.includes("/s/")) {
		if (document.querySelector<HTMLButtonElement>('[aria-label="Explorer"]')) {
			const workspaceName = document.querySelector<HTMLButtonElement>(
					'[class="sc-bdnylx lfgQvf SandboxName___StyledButton-sc-1nxafha-0 gsbQdg"]'
				),
				cfile = search.split("/").filter(elm => elm !== ""),
				formatImg = search.split(".").filter(elm => elm !== "");
			presenceData.details = `Editing ${
				search ? ` ${cfile[cfile.length - 1]}` : "a sandbox"
			}`;
			presenceData.state = `Workspace: ${workspaceName.textContent}`;
			if (
				formats.includes(
					formatImg[formatImg.length - 1].toString().toLowerCase()
				)
			) {
				presenceData.largeImageKey = `${formatImg[
					formatImg.length - 1
				].toLowerCase()}`;
			} else presenceData.largeImageKey = "txt";
		} else {
			presenceData.details = `Looking at ${
				document.querySelector<HTMLSpanElement>(
					'[class="sc-bdnylx sc-gtssRu gDXMLZ kEgnIE"]'
				).textContent
			}'s sandbox`;
			presenceData.state = `Workspace: ${
				document.querySelector<HTMLButtonElement>(
					'[class="sc-bdnylx sc-gtssRu gDXMLZ efjlMo"]'
				).textContent
			}`;
			presenceData.largeImageKey = "usersandbox";
			presenceData.buttons = [
				{
					label: "View Sandbox",
					url: location.href.toString()
				}
			];
		}
	}
	presence.setActivity(presenceData);
});
