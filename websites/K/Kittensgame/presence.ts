const presence = new Presence({
		clientId: "1218931024592113744",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

const enum Assets { // Other default assets can be found at index.d.ts
	Logo = "https://i.imgur.com/ZnH9imj.png",
}

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: Assets.Logo,
			startTimestamp: browsingTimestamp,
		},
		{ pathname, href, hostname } = document.location;

	switch (hostname) {
		case "kittensgame.com": {
			break;
		}
		case "forum.kittensgame.com": {
			const username = document.querySelector("h5.mb-0")?.textContent,
				userTag = document.querySelector(".text-muted")?.textContent;
			switch (true) {
				case pathname.includes("home"):
				case pathname === "/": {
					presenceData.details = `Forum - Viewing all ${document
						.querySelector('label[class*="active"]')
						?.textContent?.toLowerCase()} on the homepage`;
					break;
				}
				case pathname.includes("/u/"): {
					presenceData.details = `Forum - Viewing the profile of: ${
						username && userTag ? `${username} (${userTag})` : userTag
					}`;
					presenceData.state = `Tab: ${document
						.querySelector('[class*="  active"]')
						?.textContent?.toLowerCase()}`;
					presenceData.buttons = [{ label: "View Profile", url: href }];
					break;
				}
				case pathname.includes("/post/"): {
					presenceData.details = "Forum - Reading post about:";
					presenceData.state =
						document.querySelector('[title="Comments"]')?.textContent;
					presenceData.smallImageKey = Assets.Reading;
					presenceData.buttons = [
						{ label: "View Post", url: href },
						{
							label: "View Author's Profile",
							url: document.querySelector<HTMLAnchorElement>(".text-info")
								?.href,
						},
					];
					break;
				}
				case pathname === "/communities": {
					presenceData.details = "Forum - Viewing all communities";
					break;
				}
			}

			break;
		}
		case "wiki.kittensgame.com": {
			const rPathname = pathname.replace(
					`/${document.querySelector("html").getAttribute("lang")}`,
					""
				),
				search = document
					.querySelector(".v-input__control")
					?.querySelector<HTMLInputElement>("input");
			if (search?.value) {
				presenceData.details = "Searching for:";
				presenceData.state = search.value;
				presenceData.smallImageKey = Assets.Search;
				return presence.setActivity(presenceData);
			}

			if (rPathname === "/home")
				presenceData.details = "Wiki - Viewing the homepage";
			else if (rPathname === "/login")
				presenceData.details = "Wiki - Login page";
			else {
				presenceData.details = "Wiki - Reading help article titled:";
				presenceData.state = document.querySelector<HTMLMetaElement>(
					'meta[property="og:title"]'
				)?.content;
				presenceData.smallImageKey = Assets.Reading;
				presenceData.buttons = [{ label: "Read Article", url: href }];
				break;
			}

			break;
		}
	}

	presence.setActivity(presenceData);
});
