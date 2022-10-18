const presence = new Presence({
		clientId: "858408468854997052",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
	const [time, accountValue, buttons] = await Promise.all([
			presence.getSetting<boolean>("time"),
			presence.getSetting<number>("accountValue"),
			presence.getSetting<boolean>("buttons"),
		]),
		search = document.querySelector<HTMLInputElement>('[aria-label="Search"]'),
		searchSpecial =
			document.querySelector<HTMLInputElement>(
				'[class="input-block search"]'
			) ?? document.querySelector<HTMLInputElement>("#inputQuery-bundle"),
		searchAis = document.querySelector<HTMLInputElement>(
			"input.ais-SearchBox-input"
		)?.value,
		jsTag = document.querySelector<HTMLSelectElement>("#js-tag-select"),
		h2Title =
			document.querySelector("h2.header-title")?.textContent ??
			document.querySelector("h2.header-subtitle")?.textContent,
		h1Title = [
			document.querySelector("h1.header-title.flex-grow"),
			document.querySelector("h1.header-title span"),
			document.querySelector("h1.header-title"),
		],
		inputCategory = document.querySelector<HTMLSelectElement>("#inputCategory"),
		inputType = document.querySelector<HTMLSelectElement>("#inputType"),
		inputType2 = document.querySelector<HTMLSelectElement>("#inputType2"),
		inputKeyName = document.querySelector<HTMLSelectElement>("#inputKeyName"),
		inputOperator = document.querySelector<HTMLSelectElement>("#inputOperator"),
		tabnavSelected = document.querySelector("a.tabnav-tab.selected"),
		categorySelect = document.querySelector<HTMLSelectElement>(
			"#js-category-select"
		),
		inputKeyName2 = document.querySelector<HTMLSelectElement>("#inputKeyName2"),
		inputOperator2 =
			document.querySelector<HTMLSelectElement>("#inputOperator2"),
		{ pathname, href, hostname } = document.location,
		presenceData: PresenceData = {
			largeImageKey: "https://i.imgur.com/QUPRec4.png",
			startTimestamp: browsingTimestamp,
		};

	switch (hostname) {
		case "steamdb.info":
			{
				if (search?.value) {
					presenceData.details = "Searching for";
					presenceData.state = search?.value;
					presenceData.smallImageKey = "https://i.imgur.com/oGQtnIY.png";
					return presence.setActivity(presenceData);
				}
				if (searchSpecial?.value)
					presenceData.state = `Search: ${searchSpecial.value}`;
				switch (pathname.split("/")[1]) {
					case "graph": {
						presenceData.details = "Viewing Steam Charts";
						if (jsTag.value !== "0") {
							presenceData.state = `Filter: ${
								jsTag.options[jsTag.selectedIndex].textContent
							}`;
						}
						if (categorySelect.value !== "0") {
							presenceData.state = `Filter: ${
								categorySelect.options[categorySelect.selectedIndex].textContent
							}`;
						}
						break;
					}
					case "changelist": {
						presenceData.details = h1Title[0]?.textContent;
						presenceData.state = h2Title;
						presenceData.buttons = [
							{
								label: "View Page",
								url: href,
							},
						];
						break;
					}
					case "calculator": {
						if (pathname === "/calculator/") {
							presenceData.details = "Viewing Calculator";
							presenceData.state = "Selecting User";
						} else {
							presenceData.details = "Viewing Calculator";
							if (accountValue === 0) {
								presenceData.state = `${
									document.querySelector(".player-name")?.textContent
								} (${
									Array.from(
										document.querySelector(".number-price").childNodes
									).find(node => node.nodeName === "#text").textContent
								})`;
							} else if (accountValue === 1) {
								presenceData.state = `${
									document.querySelector(".player-name")?.textContent
								} (${
									Array.from(
										document.querySelector(".number-price-lowest").childNodes
									).find(node => node.nodeName === "#text").textContent
								})`;
							}
							presenceData.buttons = [
								{
									label: "View Page",
									url: href,
								},
							];
						}
						break;
					}
					case "app": {
						const tbody = document
							.querySelector("tbody")
							.children.item(1)
							.children.item(1).textContent;
						presenceData.state =
							document.querySelector("h1").lastChild.textContent;
						presenceData.smallImageKey = tbody.toLowerCase();
						presenceData.smallImageText = tbody;
						presenceData.buttons = [
							{
								label: "View Page",
								url: href,
							},
						];
						if (tabnavSelected)
							presenceData.details = `Viewing App ${tabnavSelected.childNodes[1].textContent}`;
						else if (pathname.includes("/patchnotes/"))
							presenceData.details = "Viewing App Patchnotes";
						break;
					}
					case "apps": {
						presenceData.details = "Browsing Applications";
						presenceData.state = h2Title;
						break;
					}
					case "sub": {
						presenceData.state =
							document.querySelector("h1").lastChild.textContent;
						presenceData.buttons = [
							{
								label: "View Page",
								url: href,
							},
						];
						presenceData.details = `Viewing Sub ${tabnavSelected.childNodes[1].textContent}`;
						break;
					}
					case "subs": {
						presenceData.details = "Browsing Packages";
						presenceData.state = h2Title;
						break;
					}
					case "bundle": {
						presenceData.details = "Viewing Bundle";
						presenceData.state =
							document.querySelector("h1").lastChild.textContent;
						presenceData.buttons = [
							{
								label: "View Page",
								url: href,
							},
						];
						break;
					}
					case "bundles": {
						presenceData.details = "Browsing Bundles";
						presenceData.state = `Page ${
							document.querySelector("a.paginate_button.active").textContent
						}/${
							document.querySelectorAll("a.paginate_button").item(7).textContent
						}`;
						break;
					}
					case "blog": {
						if (pathname === "/blog/") presenceData.details = "Browsing Blog";
						else if (pathname.includes("/tag/")) {
							presenceData.details = "Browsing Blog Tag";
							presenceData.state = h1Title[1].textContent;
						} else {
							presenceData.details = "Viewing Blog Post";
							presenceData.state =
								document.querySelector("#blog-post-title").textContent;
						}
						presenceData.buttons = [
							{
								label: "View Page",
								url: href,
							},
						];
						break;
					}
					case "faq": {
						presenceData.details = "Viewing FAQ";
						break;
					}
					case "instantsearch": {
						presenceData.details = "Instant Search";
						if (searchAis) presenceData.state = `Search: ${searchAis}`;

						break;
					}
					case "donate": {
						presenceData.details = "Viewing How To Help";
						break;
					}
					case "extension": {
						presenceData.details = "Viewing Extension";
						break;
					}
					case "history": {
						if (pathname.includes("/subs/"))
							presenceData.details = "Viewing Global Package History";
						else presenceData.details = "Viewing Global App History";
						break;
					}
					case "pricechanges": {
						if (href.includes("subs"))
							presenceData.details = "Viewing App Price Changes";
						else presenceData.details = "Viewing Package Price Changes";

						break;
					}
					case "tags": {
						presenceData.details = "Browsing Game Tags";

						break;
					}
					case "tag": {
						presenceData.details = `Browsing Tag: ${
							h1Title[0].textContent.split("»")[1]
						}`;

						break;
					}
					case "tech": {
						if (pathname === "/tech/")
							presenceData.details = "Browsing Technologies";
						else {
							presenceData.buttons = [
								{
									label: "View Page",
									url: href,
								},
							];
							const h1Split = h1Title[2].textContent.split("»")[2];

							switch (pathname.split("/")[2]) {
								case "Engine": {
									presenceData.details = `Browsing Engine ${h1Split}`;
									break;
								}
								case "SDK": {
									presenceData.details = `Browsing SDK ${h1Split}`;
									break;
								}
								case "Emulator": {
									presenceData.details = `Browsing Emulator ${h1Split}`;
									break;
								}
								case "Container": {
									presenceData.details = `Browsing Container ${h1Split}`;
									break;
								}
								case "AntiCheat": {
									presenceData.details = `Browsing AntiCheat ${h1Split}`;
									break;
								}
							}
						}
						break;
					}
					case "patchnotes": {
						if (pathname === "/patchnotes/")
							presenceData.details = "Browsing Patch Notes";
						else {
							presenceData.details = "Viewing Patchnote";
							if (h2Title !== "\xa0")
								presenceData.state = `${h1Title[2].firstElementChild.textContent} ${h2Title}`;
							else presenceData.state = h1Title[2].textContent;

							presenceData.buttons = [
								{
									label: "View Page",
									url: href,
								},
							];
						}
						break;
					}
					case "discord": {
						presenceData.details = "Viewing Discord Info";
						break;
					}
					case "watching": {
						presenceData.buttons = [
							{
								label: "View Page",
								url: href,
							},
						];
						if (h1Title[2]?.textContent !== "Your watch list")
							presenceData.details = `Viewing ${h1Title[2]?.textContent}`;
						else presenceData.details = "Viewing their own watch list";
						break;
					}
					case "freepackages": {
						presenceData.details = "Viewing Free Packages";
						break;
					}
					case "user": {
						presenceData.details = "Viewing Settings";
						break;
					}
					case "badges": {
						presenceData.details = "Browsing Profile Badges";
						break;
					}
					case "badge": {
						presenceData.details = "Viewing Badge";
						if (pathname.includes("/foil/")) {
							presenceData.state = `${
								h1Title[0].childNodes.item(4).textContent
							} (Foil)`;
						} else
							presenceData.state = h1Title[0].childNodes.item(4).textContent;

						presenceData.buttons = [
							{
								label: "View Page",
								url: href,
							},
						];
						break;
					}
					case "signout": {
						presenceData.details = "Signing Out";
						break;
					}
					case "depot": {
						presenceData.buttons = [
							{
								label: "View Page",
								url: href,
							},
						];
						presenceData.state =
							document.querySelector("h1").lastChild.textContent;
						presenceData.details = `Viewing Depot ${tabnavSelected.childNodes[1].textContent}`;
						break;
					}
					case "upcoming": {
						if (jsTag.value !== "0") {
							presenceData.state = `Filter: ${
								jsTag.options[jsTag.selectedIndex].textContent
							}`;
						}
						if (pathname.includes("/free/"))
							presenceData.details = "Viewing Free Promotions";
						else if (pathname.includes("/mostfollowed/"))
							presenceData.details = "Browsing Most Followed Upcoming Games";
						else presenceData.details = "Browsing Upcoming Games";

						break;
					}
					case "calendar": {
						presenceData.details = "Viewing Release Calendar";
						presenceData.state = document.querySelector(
							"h2.header-title.hide-small"
						).textContent;
						break;
					}
					case "stats": {
						switch (pathname.split("/")[2]) {
							case "mostfollowed": {
								presenceData.details = "Browsing Most Followed Games";

								if (categorySelect.value !== "0") {
									presenceData.state = `Filter: ${
										categorySelect.options[categorySelect.selectedIndex]
											.textContent
									}`;
								}
								break;
							}
							case "mostwished": {
								presenceData.details = "Browsing Most Wishlisted Games";
								break;
							}
							case "gameratings": {
								if (href.includes("?all_types"))
									presenceData.details = "Browsing Top Rated Apps";
								else if (pathname === "/stats/gameratings/")
									presenceData.details = "Browsing Top Rated Games";
								else if (document.querySelector("button.btn")) {
									presenceData.details = `Browsing Top Rated Games ${
										document.querySelector("button.btn").textContent
									}`;
								}
								break;
							}
							case "toplevels": {
								presenceData.details = "Viewing Top Users By Level";
								break;
							}
							case "releases": {
								presenceData.details = "Viewing Game Release Summary";
								if (jsTag.value !== "0") {
									presenceData.state = `Filter: ${
										jsTag.options[jsTag.selectedIndex].textContent
									}`;
								}
								break;
							}
						}
						break;
					}
					case "topsellers": {
						presenceData.details = "Weekly Top Sellers";
						if (document.querySelector("button.btn")) {
							presenceData.state = `${
								document.querySelector("button.btn").textContent
							} ${
								document.querySelector("h2.flex-grow").textContent.split(" ")[8]
							}`;
							presenceData.buttons = [
								{
									label: "View Page",
									url: href,
								},
							];
						}
						break;
					}
					case "sales": {
						if (pathname.includes("/history/")) {
							presenceData.details = "Viewing Upcoming & previous sales";
							presenceData.state = `Next Sale: ${
								document.querySelector(".sale-name").textContent
							}`;
						} else presenceData.details = "Browsing Sales";

						break;
					}
					case "servers": {
						if (pathname.includes("/maps/"))
							presenceData.details = "Viewing Valve MM Maps";
						else presenceData.details = "Viewing Valve MM Servers";
						break;
					}
					case "search": {
						presenceData.details = `Searching ${tabnavSelected.textContent}`;
						switch (tabnavSelected.textContent) {
							case "Apps": {
								presenceData.state = `${
									document.querySelector<HTMLSelectElement>("#inputQuery-app")
										.value
								} Type: ${
									inputType.options[inputType.selectedIndex].textContent
								} Category: ${
									inputCategory.options[inputCategory.selectedIndex].textContent
								}`;
								break;
							}
							case "App Keys": {
								presenceData.state = `${
									inputType2.options[inputType2.selectedIndex].textContent
								} ${
									inputKeyName.options[inputKeyName.selectedIndex].textContent
								} ${
									inputOperator.options[inputOperator.selectedIndex].textContent
								} ${
									document.querySelector<HTMLInputElement>("#inputKeyValue")
										.value
								} Raw: ${
									document.querySelector<HTMLInputElement>(
										"input[name='display_value']"
									).checked
								}`;
								break;
							}
							case "Package Keys": {
								presenceData.state = `${
									inputKeyName2.options[inputKeyName2.selectedIndex].textContent
								} ${
									inputOperator2.options[inputOperator2.selectedIndex]
										.textContent
								} ${
									document.querySelector<HTMLInputElement>("#inputKeyValue2")
										.value
								}`;
								break;
							}
							case "Patch Notes": {
								presenceData.state = `${
									document.querySelector<HTMLInputElement>("#patchnotes_query")
										?.value
										? "Search: "
										: ""
								}${
									document.querySelector<HTMLInputElement>("#patchnotes_query")
										?.value
								} AppID: ${
									document.querySelector<HTMLInputElement>("#patchnotes_appid")
										?.value || "All"
								}`;
								break;
							}
						}
						break;
					}
					case "tokendumper": {
						presenceData.details = "Viewing Token Dumper";
						presenceData.state = `${
							document.querySelector("#stats").textContent.split(" ")[0]
						} Users Contributed`;
						break;
					}
					case "keys": {
						presenceData.details = "Viewing Contribute Keys";
						break;
					}
					case "": {
						presenceData.details = "Viewing Homepage";
						break;
					}
					default:
						presenceData.details = "Unsupported Page";
						break;
				}
			}
			break;
		case "steamstat.us": {
			presenceData.details = "Viewing Steam Status";
			presenceData.state = `${
				document.querySelector("#online").textContent
			} users online`;
			break;
		}
	}

	if (!time) delete presenceData.startTimestamp;
	if (!buttons && presenceData.buttons) delete presenceData.buttons;

	presence.setActivity(presenceData);
});
