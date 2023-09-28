const presence = new Presence({
		clientId: "1041324883793154098",
	}),
	browingTimestamp = Math.floor(Date.now() / 1000);

async function getStrings() {
	return presence.getStrings(
		{
			browse: "general.browsing",
			search: "general.searchFor",
			searchSomething: "general.searchSomething",
			viewCategory: "general.viewCategory",
			viewHome: "general.viewHome",
			buttonViewPage: "general.buttonViewPage",
			buttonViewProfile: "buttonViewProfile",
		},
		await presence.getSetting<string>("lang").catch(() => "en")
	);
}
function capitalizeFirstLetter(string: string) {
	if (!string) return "Undefined";
	return (
		string.trim().charAt(0).toUpperCase() + string.trim().slice(1).toLowerCase()
	);
}

const enum Assets {
	Logo = "https://cdn.rcd.gg/PreMiD/websites/C/Cracked.io/assets/logo.png",
}

let strings: Awaited<ReturnType<typeof getStrings>>,
	oldLang: string = null;

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: Assets.Logo,
			startTimestamp: browingTimestamp,
		},
		search = document.querySelector<HTMLInputElement>('input[name="keywords"]'),
		{ pathname, href } = document.location,
		[newLang, privacy, showDmUsername, buttons, covers] = await Promise.all([
			presence.getSetting<string>("lang").catch(() => "en"),
			presence.getSetting<boolean>("privacy"),
			presence.getSetting<boolean>("showDmUsername"),
			presence.getSetting<boolean>("buttons"),
			presence.getSetting<boolean>("covers"),
		]),
		active =
			document.querySelector('[class="at ftab"]') ??
			document.querySelector('[class="ftab at"]') ??
			document.querySelector('[class="active"]');

	if (oldLang !== newLang || !strings) {
		oldLang = newLang;
		strings = await getStrings();
	}

	if (privacy) {
		presenceData.details = strings.browse;
		presence.setActivity(presenceData);
		return;
	}
	switch (pathname.split("/")[1].replace(/[.]php/gm, "")) {
		case "search": {
			if (search?.value) {
				presenceData.details = strings.search;
				presenceData.state = search.value;
			} else presenceData.details = strings.searchSomething;
			presenceData.smallImageKey = Assets.Search;
			break;
		}
		case "private":
		case "index":
		case "": {
			const checkForChat = document.querySelector('[name="to"]');
			if (href.includes("action=conversations"))
				presenceData.details = "Viewing all conversations";
			else if (showDmUsername && checkForChat) {
				presenceData.details = "Sending a private message to";
				presenceData.state = checkForChat.getAttribute("value");
				presenceData.largeImageKey =
					document
						.querySelector('[class="conv_users_avatar"]')
						?.querySelector("img")
						?.getAttribute("src") ?? Assets.Logo;
			} else if (checkForChat)
				presenceData.details = "Viewing private messages";
			else if (active) {
				presenceData.details = strings.viewHome;
				presenceData.state = !active
					.getAttribute("title")
					?.toLowerCase()
					.replace("home", "")
					? `Category ${active
							.getAttribute("title")
							?.toLowerCase()
							.replace("home", "")}`
					: "";
			} else presenceData.details = strings.viewHome;
			break;
		}
		case "upgrade": {
			presenceData.details = "Viewing rank upgrades";
			presenceData.buttons = [
				{
					label: strings.buttonViewPage,
					url: href,
				},
			];
			break;
		}
		case "misc": {
			if (
				document.querySelector('[class="thead"]')?.textContent === "Forum Rules"
			) {
				presenceData.details = "Viewing all help documents";
				presenceData.buttons = [
					{
						label: strings.buttonViewPage,
						url: href,
					},
				];
			} else {
				presenceData.details = "Reading a help document about";
				presenceData.state = active?.textContent;
				presenceData.buttons = [
					{
						label: "Read Document",
						url: href,
					},
				];
			}
			break;
		}
		default: {
			if (pathname.toLowerCase().includes("forum-")) {
				const seperator = document.querySelectorAll('[class="nav-seperator"]');
				if (
					document.querySelector('[class="navigation hide-mobile"]')
						.childElementCount > 2
				) {
					presenceData.details = `Browsing ${
						seperator[seperator.length - 1]?.textContent
					}`;
					presenceData.state = `${active?.textContent} (Page ${
						document.querySelector('[class="pagination_current"]')?.textContent
					})`;
				} else
					presenceData.details = `Browsing the ${active?.textContent} forum`;
			} else if (pathname.toLowerCase().includes("thread-")) {
				const thread = document.querySelector('[class="thread-header"]');
				presenceData.details = thread.querySelector("h1")?.textContent;
				presenceData.state = `Posted by: ${
					document.querySelector('[class="post-username"]')?.textContent
				}`;
				presenceData.smallImageKey = Assets.Viewing;
				presenceData.smallImageText = `${thread
					.querySelector("span")
					?.textContent.trim()} views`;
				presenceData.largeImageKey =
					document
						.querySelector('[class="post-avatar-mobile"]')
						?.getAttribute("src")
						?.split("?")[0] ?? Assets.Logo;
				presenceData.buttons = [
					{
						label: "View Thread",
						url: href,
					},
				];
			} else if (active?.textContent.includes("Profile of")) {
				presenceData.details = `Viewing ${document
					.querySelector('[class="profile_item"]')
					?.parentElement?.textContent.trim()}'s profile`;
				presenceData.state = capitalizeFirstLetter(
					document
						.querySelectorAll(
							'[class="trow1 x-smalltext d-flex align-items-center"]'
						)[2]
						?.textContent.trim()
				);
				presenceData.largeImageKey =
					document
						.querySelector('[class="p-avatar"]')
						?.lastElementChild?.getAttribute("src")
						?.split("?")[0] ?? Assets.Logo;
				presenceData.buttons = [
					{
						label: strings.buttonViewProfile,
						url: href,
					},
				];
			} else {
				if (active) {
					presenceData.details = `${strings.browse.replace(
						/[.]{3}/gm,
						""
					)} ${active.textContent?.toLowerCase()}`;
				} else presenceData.details = strings.browse;
				presenceData.buttons = [
					{
						label: strings.buttonViewPage,
						url: href,
					},
				];
			}
		}
	}

	if (!buttons && presenceData.buttons) delete presenceData.buttons;
	if (!covers && presenceData.largeImageKey !== Assets.Logo)
		presenceData.largeImageKey = Assets.Logo;
	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
