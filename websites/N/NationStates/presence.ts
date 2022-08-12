/**
 * @typedef {object} images NationStates image URLs (typeface version 7)
 * @see https://nsindex.net/wiki/NationStates_(typeface)
 * @property {string} header Long 'NationStates' header image
 * @property {string} logo Square 'NS' image
 * @property {string} envelope Envelope (for telegrams)
 * @property {string} flag Flag (for nations)
 * @property {string} forum Forum logo
 * @property {string} gift Gift (for store)
 * @property {string} globe Globe (for other nations and regions)
 * @property {string} page News page (for dispatches)
 * @property {string} person Person (for dillemas/issues)
 * @property {string} worldassembly World Assembly sigil
 */
const images = {
		header: "https://i.imgur.com/ffxJj5E.png",
		logo: "https://i.imgur.com/04gnehi.png",
		envelope: "https://i.imgur.com/6Hp3f7k.png",
		flag: "https://i.imgur.com/BAzbs0d.png",
		forum: "https://i.imgur.com/uDIj1ta.png",
		gift: "https://i.imgur.com/28eyl2A.png",
		globe: "https://i.imgur.com/hE7TN9d.png",
		page: "https://i.imgur.com/pArUzoy.png",
		person: "https://i.imgur.com/8pTlzJw.png",
		worldassembly: "https://i.imgur.com/A09MAL2.png",
	},
	/**
	 * Timestamp of browsing start
	 * @constant {number} browsingTimestamp
	 */
	browsingTimestamp = Math.floor(Date.now() / 1000),
	/**
	 * Discord Rich Presence
	 * @constant {Presence} presence
	 */
	presence = new Presence({
		clientId: "1006869424441131109",
	}),
	/**
	 * Discord Rich Presence data
	 * @typedef {PresenceData} presenceData
	 * @see https://discord.com/developers/docs/rich-presence/how-to#updating-presence
	 */
	presenceData: PresenceData = {
		largeImageKey: images.logo,
		startTimestamp: browsingTimestamp,
	};

/**
 * Get full nation name of the logged in user.
 * @returns {Promise<string|null>} Settings-aware name of the logged in user or null if not logged in.
 * @see https://www.nationstates.net/pages/api.html#nationapi
 */
async function fetchSelfNationName(): Promise<string | null> {
	// Check if user is logged in
	if (document.body.id !== "loggedin") return null;

	// Get ID of the logged in user
	const username: string = document.body.getAttribute("data-nname");
	if (!username) return null;

	// Fetch nation data using NationStates API
	const nationdata = await fetch(
		`https://www.nationstates.net/cgi-bin/api.cgi?nation=${username}&q=name+type&v=2`
	);
	if (!nationdata.ok) return null;

	// Parse nation name and classification
	const nationparsed = new DOMParser().parseFromString(
			await nationdata.text(),
			"text/html"
		),
		nationname = nationparsed.querySelector("NAME").textContent,
		nationtype = `${nationparsed.querySelector("TYPE").textContent} of`,
		namesetting: number = await presence.getSetting("displayname");

	if (nationname.length + nationtype.length + 2 <= 128 && namesetting > 1)
		return `${nationname}, ${nationtype}`;
	else if (nationname.length <= 128 && namesetting > 0) return nationname;
	else if (namesetting > 0) return `${nationname.substring(0, 128 - 1)}…`;
	else return "";
}

/**
 * Get the (short) name of a nation.
 * @param id Nation ID
 * @returns {Promise<string|null>} Nation name or null if not found.
 * @see https://www.nationstates.net/pages/api.html#nationapi
 */
async function fetchNationName(id: string): Promise<string | null> {
	// Fetch nation data using NationStates API
	const nationdata = await fetch(
		`https://www.nationstates.net/cgi-bin/api.cgi?nation=${id}&q=name&v=2`
	);
	if (!nationdata.ok) return null;

	// Parse nation name
	const nationname = new DOMParser()
		.parseFromString(await nationdata.text(), "text/html")
		.querySelector("NAME").textContent;

	if (nationname.length + 16 <= 128) return nationname;
	else return `${nationname.substring(0, 128 - 17)}…`;
}

/**
 * Get the name of a region.
 * @param id Region ID
 * @returns {Promise<string|null>} Region name or null if not found.
 * @see https://www.nationstates.net/pages/api.html#regionapi
 */
async function fetchRegionName(id: string): Promise<string | null> {
	// Fetch region data using NationStates API
	const regiondata = await fetch(
		`https://www.nationstates.net/cgi-bin/api.cgi?region=${id}&q=name&v=2`
	);
	if (!regiondata.ok) return null;

	// Parse region name
	const regionname = new DOMParser()
		.parseFromString(await regiondata.text(), "text/html")
		.querySelector("NAME").textContent;

	if (regionname.length + 16 <= 128) return regionname;
	else return `${regionname.substring(0, 128 - 17)}…`;
}

/**
 * Update all presence data (with interval of 10 seconds).
 * @returns {Promise<void>}
 */
async function updatePresenceData(): Promise<void> {
	// Main website (nationstates.net)
	if (document.location.hostname === "www.nationstates.net") {
		// Set presence details to the logged in nation name (leave blank if not logged in)
		const nationname: string = await fetchSelfNationName();
		if (nationname && nationname.length > 0) presenceData.details = nationname;
		else delete presenceData.details;

		// Set presence button, if enabled
		if (nationname && (await presence.getSetting("buttons"))) {
			presenceData.buttons = [
				{
					label: "View Nation",
					url: `https://www.nationstates.net/nation=${document.body.getAttribute(
						"data-nname"
					)}`,
				},
			];
		} else delete presenceData.buttons;

		// Determine the current page
		const path = window.location.pathname.toLowerCase(),
			page = path
				.substring(path.indexOf("=") + 1)
				.replace(/\/.+/iu, "")
				.replace(/\?.+/iu, "")
				.toLowerCase();

		// Set presence state according to the current page (if applicable)
		switch (
			path.substring(path.indexOf("/") + 1, path.indexOf("=")).toLowerCase()
		) {
			// Nation page
			case "nation": {
				if (page === document.body.getAttribute("data-nname")) {
					// Visiting own nation profile
					presenceData.state = "Viewing Nation";
					presenceData.smallImageKey = images.flag;
					presenceData.smallImageText = "My Nation";
				} else {
					// Other nation profile
					const nationname: string = await fetchNationName(page);
					presenceData.state = nationname
						? `Viewing Nation: ${nationname}`
						: "Viewing a Nation";
					presenceData.smallImageKey = images.globe;
					presenceData.smallImageText = "World";
				}
				return;
			}

			// Region page
			case "region": {
				const regionname = await fetchRegionName(page);
				presenceData.state = regionname
					? `Viewing Region: ${regionname}`
					: "Viewing a Region";
				presenceData.smallImageKey = images.globe;
				presenceData.smallImageText = "World";
				return;
			}

			// Regular page
			case "page":
				// Continue to subpage check
				break;

			// Index page
			default:
				presenceData.state = "Browsing";
				delete presenceData.smallImageKey;
				return;
		}

		// Set presence state according to the current subpage
		switch (page) {
			// Nation creation
			case "create_nation":
				presenceData.state = "Declaring a New Nation";
				presenceData.smallImageKey = images.flag;
				presenceData.smallImageText = "My Nation";
				break;

			// Region activities
			case "display_region_rmb":
			case "region_control":
			case "region_history":
			case "region_rank":
				presenceData.state = "Attending Regional Activities";
				presenceData.smallImageKey = images.flag;
				presenceData.smallImageText = "Region";
				break;

			// Telegrams
			case "telegram":
			case "telegrams":
			case "tg":
			case "notices":
			case "notice":
				presenceData.state = "Reading Telegrams";
				presenceData.smallImageKey = images.envelope;
				presenceData.smallImageText = "Telegrams";
				break;

			// Writing a telegram
			case "write_telegram":
			case "compose_telegram":
				presenceData.state = "Writing a Telegram";
				presenceData.smallImageKey = images.envelope;
				presenceData.smallImageText = "Telegrams";
				break;

			// Browsing nations and regions
			case "world":
			case "dossier":
			case "change_region":
			case "list_entities":
			case "list_nations":
			case "list_regions":
			case "tag_search":
			case "activity":
				presenceData.state = "Observing the World";
				presenceData.smallImageKey = images.globe;
				presenceData.smallImageText = "World";
				break;

			// Cards
			case "deck":
				presenceData.state = "Playing Cards";
				delete presenceData.smallImageKey;
				break;

			// Store
			case "store":
			case "cart":
			case "order":
				presenceData.state = "Browsing the Store";
				presenceData.smallImageKey = images.gift;
				presenceData.smallImageText = "Store";
				break;

			// Challange
			case "challenge": {
				const opponent = [
					...document
						.querySelector(".trumps-challenger")
						.querySelectorAll(".nname"),
				].find(
					challanger =>
						challanger.textContent.toLowerCase().split(" ").join("_") !==
						document.body.getAttribute("data-nname")
				);
				if (opponent && opponent.textContent)
					presenceData.state = `Challenging ${opponent.textContent}`;
				else presenceData.state = "Challenging";
				delete presenceData.smallImageKey;
				break;
			}

			// Settings
			case "settings":
			case "banners":
			case "upload_flag":
			case "tgsettings":
			case "subscriptions":
				presenceData.state = "Configuring NationStates";
				delete presenceData.smallImageKey;
				break;

			// Dispatches - browsing
			case "dispatches":
				presenceData.state = "Browsing Dispatches";
				presenceData.smallImageKey = images.page;
				presenceData.smallImageText = "Dispatches";
				break;

			// Dispatches - reading
			case "dispatch": {
				const dispatchname = document
					.querySelector("#content")
					?.querySelector(".dispatch")
					?.querySelector("h2")?.textContent;
				if (dispatchname) {
					presenceData.state = `Dispatch: ${
						dispatchname.length > 128 - 10
							? `${dispatchname.substring(0, 128 - 11)}…'`
							: dispatchname
					}`;
				} else presenceData.state = "Browsing Dispatches";
				presenceData.smallImageKey = images.page;
				presenceData.smallImageText = "Dispatches";
				break;
			}

			// Issues - browsing
			case "issues":
			case "dilemmas":
				presenceData.state = "Browsing Issues";
				presenceData.smallImageKey = images.person;
				presenceData.smallImageText = "Issues";
				break;

			// Issues - resolving
			case "show_dilemma": {
				const issuename = document
					.querySelector("#content")
					?.querySelector(".dpaper4")?.textContent;
				if (issuename) {
					presenceData.state = `Issue: ${
						issuename.length > 128 - 7
							? `${issuename.substring(0, 128 - 7)}…'`
							: issuename
					}`;
				} else presenceData.state = "Browsing Issues";
				presenceData.smallImageKey = images.person;
				presenceData.smallImageText = "Issues";
				break;
			}

			// Issues - enacting
			case "enact_dilemma": {
				const issuename = document
					.querySelector("#dlegislationtext")
					?.querySelector("p.dtitle")?.textContent;
				if (issuename) {
					presenceData.state = `Issue: ${
						issuename.length > 128 - 7
							? `${issuename.substring(0, 128 - 7)}…'`
							: issuename
					}`;
				} else presenceData.state = "Browsing Issues";
				presenceData.smallImageKey = images.person;
				presenceData.smallImageText = "Issues";
				break;
			}

			// World Assembly - browsing
			case "wa":
			case "un":
			case "list_un":
			case "list_wa":
			case "un_proposal":
			case "wa_proposal":
				presenceData.state = "Attending the World Assembly";
				presenceData.smallImageKey = images.worldassembly;
				presenceData.smallImageText = "World Assembly";
				break;

			// World Assembly - new proposal
			case "un_repeal":
			case "wa_repeal":
			case "un_new_proposal":
			case "wa_new_proposal":
				presenceData.state = "Writing a new WA proposal";
				presenceData.smallImageKey = images.worldassembly;
				presenceData.smallImageText = "World Assembly";
				break;

			// World Assembly - resolution
			case "ga":
			case "sc":
			case "wa_past_resolution":
			case "wa_past_resolutions":
			case "un_past_resolution":
			case "un_past_resolutions": {
				const resolution = document
					.querySelector(".WA_thing")
					?.querySelector("h2")?.textContent;
				if (resolution && document.querySelectorAll(".WA_thing").length === 1) {
					presenceData.state = `Resolution: ${
						resolution.length > 128 - 7
							? `${resolution.substring(0, 128 - 7)}…'`
							: resolution
					}`;
				} else presenceData.state = "Attending the World Assembly";
				presenceData.smallImageKey = images.worldassembly;
				presenceData.smallImageText = "World Assembly";
				break;
			}

			// Other (main page, hopefully)
			default:
				presenceData.state = "Browsing";
				delete presenceData.smallImageKey;
				break;
		}
	} else if (document.location.hostname === "forum.nationstates.net") {
		// Forums (forum.nationstates.net)
		presenceData.details = "Browsing the Forums";
		presenceData.smallImageKey = images.forum;
		presenceData.smallImageText = "Forums";
		delete presenceData.buttons;

		// Attempt to get the current forum post title
		const { title } = document;
		if (title.startsWith("NationStates • View")) {
			const topicsearch = title.match(/(?<=nationstates\s•\sview\s).+/gi);
			if (topicsearch) {
				let topic = topicsearch[0];
				topic = topic.charAt(0).toUpperCase() + topic.slice(1);
				if (topic.length > 128) topic = `${topic.substring(0, 128)}…`;
				presenceData.state = topic;
			} else delete presenceData.state;
		} else delete presenceData.state;
	} else {
		delete presenceData.state;
		delete presenceData.details;
	}
}
setInterval(updatePresenceData, 10000);

presence.on("UpdateData", async () => {
	if (presenceData.state || presenceData.details)
		presence.setActivity(presenceData);
});
