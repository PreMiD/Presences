var presence = new Presence({
	clientId: "664057766809436161"
});

var browsingStamp = Math.floor(Date.now() / 1000),
	href = new URL(document.location.href),
	presenceData = {
		details: <string>"In construction",
		state: <string>null,
		largeImageKey: <string>"lg",
		startTimestamp: <number>browsingStamp,
		endTimestamp: <number>null
	},
	updateCallback = {
		_function: null,
		get function() {
			return this._function;
		},
		set function(parameter) {
			this._function = parameter;
		},
		get present() {
			return this._function !== null;
		}
	};

(() => {
	/*

		Please note that it only supports www.deviantart.com.

		These domains will be supported in the future.
		- about.deviantart.com
		- chat.deviantart.com
		- forums.deviantart.com
		- groups.deviantart.com
		- portofolio.deviantart.com
		- shop.deviantart.com
		- wallpaper.deviantart.com
		- www.deviantartsupport.com
		- eclipsefeedback.com
		- sta.sh

	*/

	if (document.location.hostname === "www.deviantart.com") {
		var currentPath = "",
			forceUpdate = false,
			path = [""],
			presenceDataPlaced = {},
			retries = 0;

		/* This one decides if the current theme is the old one or the new one, also known as Eclipse. */
		if (document.querySelector("table#overhead") === null)
			var websiteTheme = "eclipse";
		else var websiteTheme = "old";

		/* This one decides if the current page belongs to an user or a group */
		if (document.querySelector("#group")) var profileType = "group";
		else var profileType = "user";

		updateCallback.function = () => {
			if (currentPath !== document.location.pathname || forceUpdate) {
				path = document.location.pathname.slice(1).split("/");
				currentPath = document.location.pathname;

				try {
					/* 
					
					Section 1
					This section includes the homepage and similar pages.
					
					*/

					if (path[0] === "") {
						presenceData.details = "Viewing the home page";
					} else if (
						document.querySelector(".error-404") ||
						document.querySelector("#error-404") ||
						document.querySelector(".error-403") ||
						document.querySelector("#error-403")
					) {
						presenceData.details = "On a non-existent page";
						/* This needs to be on the top since the 404 errors has no fixed URL. */

						/* The functions below is only valid on the Eclipse theme. */
					} else if (path[0] === "deviations") {
						presenceData.details = "Viewing deviations";
						presenceData.state = path
							.slice(1)
							.concat(
								new URL(document.location).searchParams.get("order")
									? new URL(document.location).searchParams.get("order")
									: []
							)
							.join(" > ")
							.trim()
							.replace(/-/g, " ")
							.toLowerCase()
							.split(" ")
							.map(w => w.replace(w[0], w[0].toUpperCase()))
							.join(" ");
					} else if (path[0] === "daily-deviations") {
						presenceData.details = "Viewing daily deviations";
						if (websiteTheme === "eclipse")
							presenceData.state = document.querySelector(
								"#daily-deviation-picker"
							).value;
						else
							presenceData.state = document
								.querySelector(".dailyDevCurDate")
								.textContent.split(", ")
								.slice(1)
								.join(", ");
					} else if (path[0] === "journals") {
						presenceData.details = "Viewing daily deviations";
						if (path[1])
							presenceData.state = path[1].replace(
								path[1],
								path[1].toUpperCase()
							);
						else presenceData.state = "All";
					} else if (path[0] === "status-updates") {
						presenceData.details = "Viewing status updates";
					} else if (path[0] === "polls") {
						presenceData.details = "Viewing polls";
					} else if (path[0] === "commissions") {
						presenceData.details = "Viewing commissions";

						/* The function below is valid on the Eclipse theme and the old theme. */
					} else if (path[0] === "tag") {
						presenceData.details = "Viewing a tag";
						presenceData.state = `#${path[1]}`;
					} else if (path[0] === "search") {
						presenceData.details = "Searching something";
						presenceData.state = new URL(document.location).searchParams.get(
							"q"
						);
					} else if (path[0] === "notifications") {
						if (path[1] === "notes") presenceData.details = "Reading notes";
						if (path[1] === "watch")
							presenceData.details = "Viewing the watch list";
						else presenceData.details = "Reading notifications";
						/* Should I make it detailed, such as what section does the user sees? */
					} else if (path[0] === "settings") {
						presenceData.details = "Doing some settings";
						/* Should I also make it more detailed? */
					} else if (path[0] === "account") {
						presenceData.details = "Viewing the account pages";
						/* This might expose some stuff, because the page shows orders, points, and earnings. Consider this. */
					} else if (path[0] === "checkout") {
						presenceData.details = "On the checkout";
						/* Are we really going to do this? */
					} else if (path[0] === "wishlist") {
						presenceData.details = "Viewing their wishlist";
					} else if (path[0] === "core-membership") {
						presenceData.details = "Viewing a page";
						presenceData.state = "Core Membership";

						/* The function below is only valid on the old theme. */
					} else if (
						websiteTheme === "old" &&
						document.querySelector(".newbrowse") &&
						!Object.keys({ presenceDataPlaced }).length
					) {
						if (new URL(document.location).searchParams.get("q")) {
							presenceData.details = "Searching something";
							presenceData.state = new URL(document.location).searchParams.get(
								"q"
							);
						} else {
							presenceData.details = "Viewing deviations";
							var li = document.querySelectorAll(
								".browse-facet-category ul li"
							);
							if (path[3])
								presenceData.state = `${li[1].textContent} > ${
									li[2].textContent
								} > ${document
									.querySelector(".search-stats")
									.textContent.trim()
									.slice(7)} > `;
							else if (path[2])
								presenceData.state = `${li[1].textContent} > ${document
									.querySelector(".search-stats")
									.textContent.trim()
									.slice(7)} > `;
							else if (path[1])
								presenceData.state = `${document
									.querySelector(".search-stats")
									.textContent.trim()
									.slice(7)} > `;
							else if (path[0]) presenceData.state = "";
							presenceData.state += document.querySelector(
								".browse-facet-order ul li .selected"
							).textContent;
						}
					} else if (path[0] === "watch") {
						presenceData.details = "Viewing the watch list";
					} else if (path[0] === "critiques") {
						presenceData.details = "Viewing critiques";

						/* 
						
						Section 2
						This section includes all pages below the user/group's directory. (eq. deviantart.com/team/art/...)
						
						*/

						/* The functions below are vaild for users only. */
					} else if (path[1] === "art") {
						presenceData.details = document
							.querySelector("title")
							.textContent.split(" by ")[0];
						presenceData.state = document
							.querySelector("title")
							.textContent.split(" by ")[1]
							.split(" ")[0];
						/* I actually wanted to get it using the visible elements, but well, it's complicated. */
						if (
							presenceData.details === presenceDataPlaced.details &&
							presenceData.state === presenceDataPlaced.state
						)
							throw new Error("Current status is the same as the previous.");

						/* The function below are valid for users and groups. */
					} else if (path[1] === "gallery" || path[1] === "favourites") {
						if (path[1] === "gallery")
							presenceData.details = `Viewing a ${profileType}'s gallery`;
						else presenceData.details = `Viewing a ${profileType}'s favourites`;
						if (websiteTheme === "eclipse" && profileType === "user") {
							presenceData.state = `${
								document.querySelector("h2.uUWfu").textContent
							} by ${getName()}`;
						} else {
							if (profileType === "group" && !path[2]) {
								presenceData.state = getName(true);
							} else {
								if (!document.querySelector(".gallery .active"))
									presenceData.state = `${
										document.querySelector(".folder-title").textContent
									} by ${getName(true)}`;
								else if (
									document
										.querySelector(".gallery .active")
										.textContent.slice(1) === "Featured"
								)
									presenceData.state = `Featured by ${getName(true)}`;
								else if (
									document
										.querySelector(".gallery .active")
										.textContent.slice(1) === "All"
								)
									presenceData.state = `All by ${getName(true)}`;
							}
						}

						/* The functions below are vaild for users only. */
					} else if (path[1] === "print") {
						presenceData.details = document.querySelector(
							"h1 .title"
						).textContent;
						presenceData.state = getName(true);
					} else if (path[1] === "prints") {
						presenceData.details = `Viewing a user's prints`;
						presenceData.state = getName();
					} else if (path[1] === "posts") {
						/* This part is only valid on the Eclipse theme. */
						const details = {
							All: "Viewing a user's posts",
							Journals: "Viewing a user's journals",
							"Status Updates": "Viewing a user's statuses",
							Polls: "Viewing a user's polls"
						};
						presenceData.details =
							details[document.querySelector("._3xmU1 div a").textContent];
						presenceData.state = getName();
					} else if (path[1] === "journal") {
						if (path[2]) {
							if (websiteTheme === "eclipse") {
								presenceData.details = document.querySelector(
									"._2-k1X"
								).textContent;
							} else {
								/* This part is only valid on the old theme. */
								if (path[2] === "poll")
									document
										.querySelector("h2")
										.textContent.substr(
											1,
											document.querySelector("h2").textContent.length - 2
										);
								else
									presenceData.details = document.querySelector(
										"h1 .title"
									).textContent;
							}
							presenceData.state = `${getName()} (journal)`;
						} else {
							/* This part is only valid on the old theme. */
							presenceData.details = `Viewing a user's journals`;
							presenceData.state = getName();
						}
					} else if (path[1] === "poll") {
						if (websiteTheme === "eclipse") {
							try {
								presenceData.details = document.querySelector(
									"._1ddsf"
								).textContent;
							} catch {
								presenceData.details = document.querySelector(
									".gfMBk"
								).textContent;
							}
						} else {
							presenceData.details = document
								.querySelector("h2")
								.textContent.substr(
									1,
									document.querySelector("h2").textContent.length - 2
								);
						}
						presenceData.state = getName();
					} else if (path[1] === "critique") {
						if (path[2]) {
							presenceData.details = "Viewing a critique";
							presenceData.state = `from ${getName()}, ${document
								.querySelector("h2")
								.textContent.trim()} ${document
								.querySelector("h4")
								.textContent.trim()}`;
						} else {
							presenceData.details = "Viewing a user's critiques";
							presenceData.state = getName();
						}
					} else if (path[1] === "wishlist") {
						presenceData.details = "Viewing a user's wishlist";
						presenceData.state = getName();
					} else if (path[1] === "dds") {
						presenceData.details = "Viewing a user's daily deviations";
						presenceData.state = getName();
					} else if (path[1] === "badges") {
						/* This part is only valid on the old theme. (not quite sure) */
						if (path[2]) {
							presenceData.details = "Viewing a badge";
							presenceData.state = `${
								document.querySelector("h3").textContent
							} from ${getName()}`;
						} else {
							presenceData.details = `Viewing a ${profileType}'s badges`;
							presenceData.state = getName(true);
						}

						/* The functions below are valid for groups only. */
					} else if (path[1] === "aboutus") {
						presenceData.details = "Viewing a group's about page";
						presenceData.state = getName(true);
					} else if (path[1] === "blog") {
						presenceData.details = "Viewing a group's blog";
						presenceData.state = getName(true);

						/* The function below are valid for users and groups. */
					} else if (path[0] && !path[1] && getName()) {
						presenceData.details = `Viewing a ${profileType}'s profile`;
						if (profileType === "group") presenceData.state = getName(true);
						else presenceData.state = getName();

						/* Whoops. */
					} else {
						console.error(
							"Whoops. Seems this page is not supported. \nPlease contact @Hans5958#0969 to request a support for this page."
						);
						console.log(document.location.href);
					}

					console.groupEnd();
					presenceDataPlaced = presenceData;
					forceUpdate = false;
					retries = 0;
					console.log("Done! Presence result:");
					console.log(`${presenceData.details}\n${presenceData.state}`);
				} catch (error) {
					forceUpdate = true;
					retries++;
					resetData();
					presenceData.details = "Loading...";
					if (retries === 1) {
						console.groupCollapsed("Loading or retrying...");
					}
					console.log(`${retries}/30`);

					if (retries === 30) {
						updateCallback.function = () => {};
						console.groupEnd();
						console.error(
							"Fatal error! Terminating.\nPlease report this problem to @Hans5958#0969."
						);
						console.groupCollapsed("Error log");
						console.log(document.location.href);
						console.error(error);
						console.groupEnd();
					}
				}
			} else {
				presenceData = presenceDataPlaced;
			}
		};

		function getName(override: boolean = false) {
			try {
				if (websiteTheme === "eclipse" && !override) {
					try {
						return document.querySelector(
							"#content-container > div > div > div > div > div > a.user-link"
						).textContent;
					} catch {
						return document.querySelector(
							"#root > main > div > div > div > div > div > div > div > div > span > a.user-link"
						).textContent;
					}
				} else {
					try {
						return lastItem(document.querySelectorAll("h1 .author .u .u"))
							.textContent;
					} catch {
						return document.querySelector("h1 .u .u").textContent;
					}
				}
			} catch {
				if (
					path[0].toLowerCase() ===
					document
						.querySelector("title")
						.textContent.split(" ")[0]
						.toLowerCase()
				)
					return document.querySelector("title").textContent.split(" ")[0];
				else if (
					path[0].toLowerCase() ===
					document
						.querySelector("title")
						.textContent.split(" by ")[1]
						.split(" ")[0]
						.toLowerCase()
				)
					return (presenceData.state = document
						.querySelector("title")
						.textContent.split(" by ")[1]
						.split(" ")[0]);
			}
		}

		function lastItem(array: NodeList | Array<any>) {
			return array[array.length - 1];
		}
	}
})();

if (updateCallback.present) {
	presence.on("UpdateData", async () => {
		resetData();
		updateCallback.function();
		cleanData();
		presence.setActivity(presenceData);
	});
} else {
	cleanData();
	presence.on("UpdateData", async () => {
		presence.setActivity(presenceData);
	});
}

/**
 * Initialize presenceData
 */
function resetData() {
	presenceData = {
		details: <string>"In construction",
		state: <string>null,
		largeImageKey: <string>"lg",
		startTimestamp: <number>browsingStamp,
		endTimestamp: <number>null
	};
}

/**
 * Cleans presenceData
 */
function cleanData() {
	Object.keys(presenceData).forEach(key => {
		if (presenceData[key] === null) delete presenceData[key];
	});
}
