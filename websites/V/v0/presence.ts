const presence = new Presence({ clientId: "1160993221854380132" }),
	presenceData: PresenceData = {
		largeImageKey: "https://i.imgur.com/UhCCRnQ.png",
		startTimestamp: Math.floor(Date.now() / 1000),
	};

presence.on("UpdateData", async () => {
	switch (
		document.location.pathname.endsWith("/") &&
		document.location.pathname.length > 1
			? document.location.pathname.slice(
					0,
					document.location.pathname.length - 1
			  )
			: document.location.pathname
	) {
		case "/":
			presenceData.details = "Viewing homepage";
			presenceData.largeImageKey = "https://i.imgur.com/UhCCRnQ.png";
			presenceData.smallImageKey = "";
			break;
		case `/r/${document.location.pathname.split("/")[2]}`:
			presenceData.details = "Prompting a template";
			presenceData.state = `User prompt: "${document
				.querySelector("span.text-sm.line-clamp-1.text-ellipsis.text-left")
				.textContent.slice(0, 50)}"`;
			presenceData.buttons = null;
			break;
		case `/t/${document.location.pathname.split("/")[2]}`:
			presenceData.details = `Viewing a template by @${
				(document.querySelector("a.flex-none") as HTMLAnchorElement).href.split(
					"/"
				)[3]
			}`;
			presenceData.state = `"${document
				.querySelector(
					"h1.md\\:max-w-xs.lg\\:max-w-sm.text-sm.line-clamp-1.text-ellipsis.animate-in.fade-in-5.text-gray-1000"
				)
				.textContent.slice(0, 50)}"`;
			presenceData.buttons = [
				{
					label: "View template",
					url: document.location.href,
				},
			];
			break;
		// v0.dev/{username}
		case `/${document.location.pathname.split("/")[1]}`:
			presenceData.details = `Viewing @${
				document.location.pathname.split("/")[1]
			} profile`;
			presenceData.largeImageKey = (
				document.querySelector("img.rounded-full.h-12.w-12") as HTMLImageElement
			).src;
			presenceData.smallImageKey = "https://i.imgur.com/UhCCRnQ.png";
			presenceData.buttons = [
				{
					label: "View profile",
					url: document.location.href,
				},
			];
			break;
	}
	presence.setActivity(presenceData);
});
