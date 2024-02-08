const presence = new Presence({
		clientId: "961652082027421746",
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
		"css",
		"php",
		"kt",
		"sql",
		"lua",
		"ru",
		"bash",
		"sh",
		"bat",
		"cr",
		"go",
		"rs",
	];

const enum Assets {
	Logo = "https://cdn.rcd.gg/PreMiD/websites/C/CodeSandbox/assets/logo.png",
	Square = "https://cdn.discordapp.com/app-assets/961652082027421746/961655974333141062.png?size=512",
	Create = "https://cdn.discordapp.com/app-assets/961652082027421746/962808878104461362.png?size=512",
	Dashboard = "https://cdn.discordapp.com/app-assets/961652082027421746/961855878519197706.png?size=512",
	Discover = "https://cdn.discordapp.com/app-assets/961652082027421746/962722774718242837.png?size=512",
	Drafts = "https://cdn.discordapp.com/app-assets/961652082027421746/962722774915367012.png?size=512",
	All = "https://cdn.discordapp.com/app-assets/961652082027421746/962722774667915264.png?size=512",
	Templates = "https://cdn.discordapp.com/app-assets/961652082027421746/962722774965698561.png?size=512",
	Repositories = "https://cdn.discordapp.com/app-assets/961652082027421746/962722774844067930.png?size=512",
	Recent = "https://cdn.discordapp.com/app-assets/961652082027421746/962722774806331392.png?size=512",
	Deleted = "https://cdn.discordapp.com/app-assets/961652082027421746/962722774751772692.png?size=512",
	Shared = "https://cdn.discordapp.com/app-assets/961652082027421746/962722774646947870.png?size=512",
	Liked = "https://cdn.discordapp.com/app-assets/961652082027421746/962722774667890698.png?size=512",
	Profile = "https://cdn.discordapp.com/app-assets/961652082027421746/962781564712914974.png?size=512",
	Txt = "https://cdn.discordapp.com/app-assets/961652082027421746/961744562626396160.png?size=512",
	UserSandbox = "https://cdn.discordapp.com/app-assets/961652082027421746/962781564532564008.png?size=512",
	Unknown = "https://cdn.discordapp.com/app-assets/961652082027421746/962819498270941275.png?size=512",
}

const assets = {
	py: "https://cdn.discordapp.com/app-assets/961652082027421746/961676733168369694.png?size=512",
	js: "https://cdn.discordapp.com/app-assets/961652082027421746/961677110806724698.png?size=512",
	ts: "https://cdn.discordapp.com/app-assets/961652082027421746/961677111125475429.png?size=512",
	css: "https://cdn.discordapp.com/app-assets/961652082027421746/961677111268110386.png?size=512",
	swift:
		"https://cdn.discordapp.com/app-assets/961652082027421746/961677111930793995.png?size=512",
	html: "https://cdn.discordapp.com/app-assets/961652082027421746/961677111972737045.png?size=512",
	java: "https://cdn.discordapp.com/app-assets/961652082027421746/961677112350216223.png?size=512",
	cpp: "https://cdn.discordapp.com/app-assets/961652082027421746/961731137330364466.png?size=512",
	json: "https://cdn.discordapp.com/app-assets/961652082027421746/961739308509839380.png?size=512",
	cs: "https://cdn.discordapp.com/app-assets/961652082027421746/961742269373906964.png?size=512",
	c: "https://cdn.discordapp.com/app-assets/961652082027421746/961743219593453589.png?size=512",
	txt: "https://cdn.discordapp.com/app-assets/961652082027421746/961744562626396160.png?size=512",
	tsx: "https://cdn.discordapp.com/app-assets/961652082027421746/961772140565233675.png?size=512",
	jsx: "https://cdn.discordapp.com/app-assets/961652082027421746/961772245301202985.png?size=512",
	cr: "https://cdn.discordapp.com/app-assets/961652082027421746/962166504126836736.png?size=512",
	go: "https://cdn.discordapp.com/app-assets/961652082027421746/962166504282001462.png?size=512",
	sh: "https://cdn.discordapp.com/app-assets/961652082027421746/962166504693043200.png?size=512",
	bash: "https://cdn.discordapp.com/app-assets/961652082027421746/962166504995049512.png?size=512",
	sql: "https://cdn.discordapp.com/app-assets/961652082027421746/962166505041174554.png?size=512",
	ru: "https://cdn.discordapp.com/app-assets/961652082027421746/962166505045368942.png?size=512",
	lua: "https://cdn.discordapp.com/app-assets/961652082027421746/962166505221533706.png?size=512",
	php: "https://cdn.discordapp.com/app-assets/961652082027421746/962166505452228618.png?size=512",
	kt: "https://cdn.discordapp.com/app-assets/961652082027421746/962167344950550598.png?size=512",
	bat: "https://cdn.discordapp.com/app-assets/961652082027421746/962168886252437617.png?size=512",
	rs: "https://cdn.discordapp.com/app-assets/961652082027421746/962325628168847371.png?size=512",
};

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: Assets.Logo,
			smallImageKey: Assets.Square,
			smallImageText: "CodeSandbox",
			details: "Loading",
			startTimestamp: browsingTimestamp,
		},
		{ pathname, search } = window.location;
	if (pathname.startsWith("/")) {
		if (document.querySelector<HTMLDivElement>('[class="ReactModalPortal"]')) {
			presenceData.details = "Creating a new sandbox!";
			presenceData.largeImageKey = Assets.Create;
		} else if (pathname.includes("/dashboard/home")) {
			presenceData.details = "Looking at their dashboard";
			presenceData.state = "Page: Home";
			presenceData.largeImageKey = Assets.Dashboard;
		} else if (pathname.includes("/dashboard/discover")) {
			presenceData.details = "Discovering other sandboxes";
			presenceData.state = "Page: Discover";
			presenceData.largeImageKey = Assets.Discover;
		} else if (pathname.includes("/dashboard/drafts")) {
			presenceData.details = "Looking at their drafts";
			presenceData.state = "Page: Drafts";
			presenceData.largeImageKey = Assets.Drafts;
		} else if (pathname.includes("/dashboard/all")) {
			presenceData.details = "Looking through their sandboxes";
			presenceData.state = "Page: All Sandboxes";
			presenceData.largeImageKey = Assets.All;
		} else if (pathname.includes("/dashboard/templates")) {
			presenceData.details = "Looking through their templates";
			presenceData.state = "Page: Templates";
			presenceData.largeImageKey = Assets.Templates;
		} else if (pathname.includes("/dashboard/repositories")) {
			presenceData.details = "Looking through their repositories";
			presenceData.state = "Page: Repositories";
			presenceData.largeImageKey = Assets.Repositories;
		} else if (pathname.includes("/dashboard/recent")) {
			presenceData.details = "Looking through their recent sandboxes";
			presenceData.state = "Page: Recently Modified";
			presenceData.largeImageKey = Assets.Recent;
		} else if (pathname.includes("/dashboard/deleted")) {
			presenceData.details = "Looking through their trashed sandboxes";
			presenceData.state = "Page: Recently Deleted";
			presenceData.largeImageKey = Assets.Deleted;
		} else if (pathname.includes("/dashboard/shared")) {
			presenceData.details = "Looking at shared sandboxes";
			presenceData.state = "Page: Shared With Me";
			presenceData.largeImageKey = Assets.Shared;
		} else if (pathname.includes("/dashboard/liked")) {
			presenceData.details = "Looking at liked sandboxes";
			presenceData.state = "Page: Liked Sandboxes";
			presenceData.largeImageKey = Assets.Liked;
		} else if (pathname.includes("/u/")) {
			presenceData.details = "Looking at a user's profile:";
			presenceData.state = `${
				document.querySelector<HTMLSpanElement>(
					'[class="sc-bdnylx sc-gtssRu gDXMLZ hHsTZp"]'
				).textContent
			} (@${
				document.querySelector<HTMLSpanElement>(
					'[class="sc-bdnylx sc-gtssRu gDXMLZ itZLEx"]'
				).textContent
			})`;
			presenceData.largeImageKey = Assets.Profile;
			presenceData.buttons = [
				{
					label: "View Profile",
					url: location.href.toString(),
				},
			];
		} else if (pathname.includes("/s/")) {
			if (
				document.querySelector<HTMLButtonElement>('[aria-label="Explorer"]')
			) {
				const cfile = search.split("/").filter(elm => elm !== ""),
					formatImg = search.split(".").filter(elm => elm !== "");
				presenceData.details = `Editing ${
					search
						? ` ${cfile[cfile.length - 1].replace(
								/(:)|[0-9]|(-)/g,
								""
						  )} (${document
								.querySelector<HTMLAnchorElement>('[title="Go to Line"]')
								.textContent.replace(/\(|([0-9]*) selected\)/g, "")})`
						: "a sandbox"
				}`;
				presenceData.state = `Workspace: ${document.title.split("-")[0]}`;
				if (
					formats.includes(
						formatImg[formatImg.length - 1]
							/*.toLowerCase()*/
							.replace(/(:)|[0-9]|(-)/g, "")
					)
				) {
					presenceData.largeImageKey =
						assets[
							`${formatImg[formatImg.length - 1]
								.toLowerCase()
								.replace(/(:)|[0-9]|(-)/g, "")}` as keyof typeof assets
						];
				} else presenceData.largeImageKey = Assets.Txt;
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
				presenceData.largeImageKey = Assets.UserSandbox;
				presenceData.buttons = [
					{
						label: "View Sandbox",
						url: location.href.toString(),
					},
				];
			}
		} else {
			presenceData.details = "Viewing an unsupported CodeSandbox page";
			presenceData.largeImageKey = Assets.Unknown;
		}
	}
	presence.setActivity(presenceData);
});
