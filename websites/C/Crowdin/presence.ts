const presence = new Presence({
		clientId: "848293229409337444"
	}),
	browsingTimestamp = Math.round(Date.now() / 1000);

let translatePageTitle: HTMLElement | null,
	translatingFile: HTMLElement,
	translateProject: HTMLElement,
	translatingLanguage: HTMLElement,
	profileName: HTMLElement,
	profileNickname: HTMLElement | null;

presence.on("UpdateData", () => {
	const presenceData: PresenceData = {
			details: "Unknown page",
			largeImageKey: "crowdin",
			startTimestamp: browsingTimestamp
		},
		{ pathname, host } = document.location;

	switch (host) {
		case "support.crowdin.com": {
			if (!pathname || pathname === "/")
				presenceData.details = "On the main support page";
			else if (
				pathname.includes("/api/v2/") ||
				pathname.includes("/enterprise/api/")
			) {
				const activeLabel = Array.from(document.querySelectorAll("label")).find(
					c => c.className?.includes("active")
				);
				presenceData.details = "Reading more about API V2";
				presenceData.state =
					activeLabel?.children.length >= 2
						? activeLabel?.children[1].textContent
							? activeLabel?.children[1].textContent
							: activeLabel?.children[0].textContent
						: activeLabel?.textContent;
				presenceData.smallImageKey = "reading";
				if (activeLabel) {
					presenceData.buttons = [
						{
							label: "View section",
							url: document.URL
						}
					];
				}
			} else if (pathname.includes("/search")) {
				presenceData.details = "Searching support";
				presenceData.state = (
					document.querySelector(
						".form-control.form-control__result.input-lg"
					) as HTMLInputElement | null
				)?.value;
				presenceData.smallImageKey = "search";
			} else {
				presenceData.details = "Reading support article";
				presenceData.state = document.querySelector(".hero")?.textContent;
				presenceData.smallImageKey = "reading";
				presenceData.buttons = [
					{
						label: "View article",
						url: document.URL
					}
				];
			}

			break;
		}
		case "store.crowdin.com": {
			presenceData.details = "Browsing the store";
			if (!pathname || pathname === "/")
				presenceData.details = "On the main store page";
			else if (pathname.includes("/collections/")) {
				const isApp = !!document.querySelector(".product-single__title");
				presenceData.details = isApp ? "Viewing app" : "Browsing apps";
				presenceData.state =
					document.querySelector(".product-single__title")?.textContent ||
					(
						document.querySelector("[role=text]") as HTMLElement | null
					)?.textContent.split("\n")?.[1];
				if (isApp) {
					presenceData.buttons = [
						{
							label: "View app",
							url: document.URL
						}
					];
				}
			} else if (pathname.includes("/search")) {
				presenceData.details = "Searching the store";
				presenceData.state = (
					document.querySelector(".search__input") as HTMLInputElement | null
				)?.value;
				presenceData.smallImageKey = "search";
			}

			break;
		}
		case "status.crowdin.com": {
			// TODO add incident page (when they have an incident to report lol)
			presenceData.details = "Viewing Crowdin's status";
			if (pathname === "/subscribe")
				presenceData.details = "Subscribing to status reports";

			break;
		}
		case "blog.crowdin.com": {
			presenceData.smallImageKey = "reading";
			if (pathname === "/") presenceData.details = "Browsing the blog";
			else if (pathname.includes("/tag/")) {
				presenceData.details = "Viewing tag";
				presenceData.state = document
					.querySelector(".text-center.home-bg.home-bg--tags")
					?.textContent.split(":")[1];
				presenceData.buttons = [
					{
						label: "View tag",
						url: document.URL
					}
				];
			} else if (pathname.includes("/search")) {
				presenceData.details = "Searching the blog";
				presenceData.state = (
					document.querySelector(".form-control") as HTMLInputElement | null
				)?.value;
				presenceData.smallImageKey = "search";
			} else if (document.querySelector(".hero > h1")) {
				presenceData.details = "Reading blog post";
				presenceData.state = document.querySelector(".hero > h1").textContent;
				presenceData.buttons = [
					{
						label: "View blog post",
						url: document.URL
					}
				];
			} else {
				presenceData.details = "Unknown page";
				presenceData.smallImageKey = "";
			}

			break;
		}
		default:
			if ((pathname === "/" || !pathname) && host === "crowdin.com")
				presenceData.details = "Website Home";
			else if (
				pathname.includes("/project/") ||
				(host !== "crowdin.com" && pathname === "/")
			) {
				translateProject =
					document.querySelector(
						".title-name.project-name-preview.text-overflow"
					) || document.querySelector(".project-name-text.text-overflow");

				translatePageTitle = document.querySelector(
					".language-header.no-margin-top.margin-bottom"
				);

				presenceData.details = translateProject?.textContent;
				presenceData.buttons = [
					{
						label: "View project",
						url: document.URL
					}
				];
				if (pathname.includes("activity_stream"))
					presenceData.state = "Viewing activity";
				else if (pathname.includes("reports"))
					presenceData.state = "Viewing reports";
				else if (pathname.includes("discussions"))
					presenceData.state = "Viewing discussions";
				else if (pathname.includes("tasks"))
					presenceData.state = "Viewing tasks";
				else {
					presenceData.state =
						translatePageTitle?.textContent || "Viewing project home";
				}
			} else if (
				pathname.includes("/translate") ||
				pathname.includes("/proofread")
			) {
				translatingFile = document.querySelector(".file-name");
				translatingLanguage = document.querySelector(
					".language-name-wrapper.text-overflow"
				);
				translateProject = document.querySelector("title");

				if (pathname.includes("/proofread"))
					presenceData.details = `Proofreading ${translatingFile?.textContent}`;
				else
					presenceData.details = `Translating ${translatingFile?.textContent}`;
				presenceData.state = `${translateProject?.textContent
					.split("-")[1]
					?.trim()} (${translatingLanguage?.textContent})`;
				presenceData.smallImageKey = "writing";
				presenceData.buttons = [
					{
						label: "Translate project",
						url: document.URL
					}
				];
			} else if (pathname.includes("/profile")) {
				profileName = document.querySelector(".username.s-margin-bottom");
				profileNickname = document.querySelector(".user-login");

				if (pathname.includes("/activity")) {
					presenceData.details = "Viewing activity";
					presenceData.state = `${profileName?.textContent}${
						profileNickname ? ` - ${profileNickname.textContent}` : ""
					}`;
				} else if (document.querySelector(".static-icon.static-icon-plus")) {
					presenceData.details = "Viewing own profile";
					presenceData.state = `${profileName?.textContent}${
						profileNickname ? ` - ${profileNickname.textContent}` : ""
					}`;
				} else {
					presenceData.details = "Viewing a profile";
					presenceData.state = `${profileName?.textContent}${
						profileNickname ? ` - ${profileNickname.textContent}` : ""
					}`;
				}
			} else if (pathname.includes("/projects")) {
				presenceData.details = "Exploring projects";
				presenceData.state =
					document.querySelector("#showcase_current").parentElement
						.parentElement.className === "tab-pane active"
						? document.querySelector("#showcase_current")?.textContent
						: document.querySelector(".active")?.textContent;
				presenceData.smallImageKey = "search";
			} else if (pathname.includes("/resources")) {
				presenceData.details = "Viewing resources";
				presenceData.state = (
					document.querySelector(".active") as HTMLLIElement | null
				)?.textContent;
			} else {
				switch (pathname) {
					case "/release-notes": {
						presenceData.details = "Reading release notes";
						presenceData.state = (
							document.querySelector(
								".selected-release-item"
							) as HTMLAnchorElement | null
						)?.textContent;
						presenceData.smallImageKey = "reading";
						presenceData.buttons = [
							{
								label: "View release notes",
								url: document.URL
							}
						];

						break;
					}
					case "/features": {
						presenceData.details = "Viewing Crowdin's features";
						break;
					}
					case "/demo-request": {
						presenceData.details = "Requesting a demo";
						break;
					}
					default:
						if (pathname.includes("/page/")) {
							presenceData.details = "Reading page";
							presenceData.state =
								document.querySelector(".text-center > h1")?.textContent ??
								(
									document.querySelector(".row > h1") as HTMLElement | null
								)?.textContent
									.split("\n")
									.join(" ");
							presenceData.smallImageKey = "reading";
							presenceData.buttons = [
								{
									label: "View page",
									url: document.URL
								}
							];
						} else if (pathname.includes("/pricing"))
							presenceData.details = "Viewing pricing";
						else if (pathname.includes("/enterprise"))
							presenceData.details = "Viewing enterprise";
						else if (pathname.includes("/contacts"))
							presenceData.details = "Contacting Crowdin";
						else if (pathname.includes("/feature-request"))
							presenceData.details = "Viewing feature requests";
				}
			}
	}

	presence.setActivity(presenceData);
});
