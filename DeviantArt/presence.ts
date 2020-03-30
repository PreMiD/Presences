var presence = new Presence({
	clientId: "664057766809436161",
	mediaKeys: false
})

var currentURL = new URL(document.location.href),
	currentPath = currentURL.pathname.slice(1).split("/"),
	browsingStamp = Math.floor(Date.now() / 1000), 
	presenceData: presenceData = {
		details: <string> "Viewing an unsupported page",
		state: <string> undefined,
		largeImageKey: <string> "lg",
		startTimestamp: <number> browsingStamp,
		endTimestamp: <number> undefined
	},
	updateCallback = {
		_function: null,
		get function() {
			return this._function;
		},
		set function(parameter){
			this._function = parameter
		},
		get present() {
			return this._function !== null
		}
	};

(() => { 

	/*

		For future developers:

		These domains are supported. 
		- www.deviantart.com
		- about.deviantart.com
		- chat.deviantart.com
		- forum.deviantart.com
		- groups.deviantart.com
		- portfolio.deviantart.com
		- shop.deviantart.com
		- www.deviantartsupport.com
		- www.eclipsefeedback.com
		- deviantartads.com
		- sta.sh
		- wallpaper.deviantart.com (redirects to https://www.deviantart.com/customization/wallpaper/)

		These domains will be supported in the future.
		- *.daportfolio.com

	*/

	if (currentURL.hostname === "www.deviantart.com") {

		var loadedPath = [], forceUpdate = false, presenceDataPlaced: presenceData = {}, retries = 0

		/* This one decides if the current theme is the old one or the new one, also known as Eclipse. */
		if (document.querySelector("table#overhead") === null) var websiteTheme = "eclipse"
		else var websiteTheme = "old"

		/* This one decides if the current page belongs to an user or a group */
		if (document.querySelector("#group")) var profileType = "group"
		else var profileType = "user"
	
		updateCallback.function = () => {
	
			if (loadedPath !== currentPath || forceUpdate) {

				loadedPath = currentPath

				try {

					/* 
					
					Section 1
					This section includes the homepage and similar pages.
					
					*/

					if (currentPath[0] === "") {	
						presenceData.details = "Viewing the home page"
	
					} else if (document.querySelector(".error-400") || document.querySelector(".error-401") || document.querySelector(".error-403") || document.querySelector(".error-404") || document.querySelector(".error-405") || document.querySelector(".error-500") || document.querySelector(".error-503") || document.querySelector(".error-banned") || document.querySelector(".error-beta") || document.querySelector(".error-blocked") || document.querySelector(".error-blockedbyuser") || document.querySelector(".error-contentblockedbyuser") || document.querySelector(".error-deactivated") || document.querySelector(".error-noreferrer") || document.querySelector(".error-pageflooder") || document.querySelector(".error-suspended") || document.querySelector(".error-threadflooder") || document.querySelector("#error-400") || document.querySelector("#error-401") || document.querySelector("#error-403") || document.querySelector("#error-404") || document.querySelector("#error-405") || document.querySelector("#error-500") || document.querySelector("#error-503") || document.querySelector("#error-banned") || document.querySelector("#error-beta") || document.querySelector("#error-blocked") || document.querySelector("#error-blockedbyuser") || document.querySelector("#error-contentblockedbyuser") || document.querySelector("#error-deactivated") || document.querySelector("#error-noreferrer") || document.querySelector("#error-pageflooder") || document.querySelector("#error-suspended") || document.querySelector("#error-threadflooder")) { 
						presenceData.details = "On a non-existent page"
						/* This needs to be on the top since the 404 errors has no fixed URL. */
	
					/* The functions below is only valid on the Eclipse theme. */
					
					} else if (currentPath[0] === "deviations") {
						presenceData.details = "Viewing deviations"
						presenceData.state = currentPath.slice(1).concat(getURLParam("order") ? getURLParam("order") : []).join(" > ").trim().replace(/-/g, ' ').toLowerCase().split(' ').map(w => w.replace(w[0], w[0].toUpperCase())).join(' ')
					
					} else if (currentPath[0] === "daily-deviations") {
						presenceData.details = "Viewing daily deviations"
						if (websiteTheme === "eclipse") presenceData.state = document.querySelector("#daily-deviation-picker").value
						else presenceData.state = document.querySelector(".dailyDevCurDate").textContent.split(", ").slice(1).join(", ")
	
					} else if (currentPath[0] === "journals") {
						presenceData.details = "Viewing daily deviations"
						if (currentPath[1]) presenceData.state = currentPath[1].replace(currentPath[1], currentPath[1].toUpperCase())
						else presenceData.state = "All"
						
					} else if (currentPath[0] === "status-updates") {
						presenceData.details = "Viewing status updates"
	
					} else if (currentPath[0] === "polls") {
						presenceData.details = "Viewing polls"
	
					} else if (currentPath[0] === "commissions") {
						presenceData.details = "Viewing commissions"
			
					/* The function below is valid on the Eclipse theme and the old theme. */
	
					} else if (currentPath[0] === "tag") {
						presenceData.details = "Viewing a tag"
						presenceData.state = `#${currentPath[1]}`

					} else if (currentPath[0] === "search") {
						presenceData.details = "Searching something"
						presenceData.state = getURLParam("q")
	
					} else if (currentPath[0] === "notifications") {
						if (currentPath[1] === "notes") presenceData.details = "Reading notes"
						if (currentPath[1] === "watch") presenceData.details = "Viewing the watch list"
						else presenceData.details = "Reading notifications"
						/* Detailed infos, such as what section does the user sees, might be implemented but disabled by default. */
						
					} else if (currentPath[0] === "settings") {
						presenceData.details = "Doing some settings"
						/* Detailed infos might be disabled by default. */
	
					} else if (currentPath[0] === "account") {
						presenceData.details = "Viewing the account pages"
						/* This might expose some stuff, because the page shows orders, points, and earnings. Additional infos might be disabled by default. */
	
					} else if (currentPath[0] === "checkout") {
						presenceData.details = "On the checkout"
						/* This might be disabled by default. */

					} else if (currentPath[0] === "wishlist") {
						presenceData.details = "Viewing their wishlist"

					} else if (currentPath[0] === "core-membership") {
						presenceData.details = "Viewing a page"
						presenceData.state = "Core Membership"
	
					} else if (currentPath[0] === "timeline") {
						presenceData.details = "Viewing a page"
						presenceData.state = "Timeline"

					} else if (currentPath[0] === "makeagroup") {
						presenceData.details = "Making a group"

					/* The function below is only valid on the old theme. */
	
					} else if (websiteTheme === "old" && document.querySelector(".newbrowse") && !Object.keys({presenceDataPlaced}).length) {
						if (getURLParam("q")) {
							presenceData.details = "Searching something"
							presenceData.state = getURLParam("q")
						} else {
							presenceData.details = "Viewing deviations"
							var li = document.querySelectorAll(".browse-facet-category ul li")
							if (currentPath[3]) presenceData.state = `${li[1].textContent} > ${li[2].textContent} > ${document.querySelector(".search-stats").textContent.trim().slice(7)} > `
							else if (currentPath[2]) presenceData.state = `${li[1].textContent} > ${document.querySelector(".search-stats").textContent.trim().slice(7)} > `
							else if (currentPath[1]) presenceData.state = `${document.querySelector(".search-stats").textContent.trim().slice(7)} > `
							else if (currentPath[0]) presenceData.state = ''
							presenceData.state += document.querySelector(".browse-facet-order ul li .selected").textContent
						}
						
					} else if (currentPath[0] === "watch") {
						presenceData.details = "Viewing the watch list"

					} else if (currentPath[0] === "critiques") {
						presenceData.details = "Viewing critiques"

					/* 
					
					Section 2
					This section includes all pages below the user/group's directory. (eq. deviantart.com/team/art/...)
					
					*/

					/* The functions below are vaild for users only. */
						
					} else if (currentPath[1] === "art") {
						presenceData.details = document.querySelector("title").textContent.split(" by ").slice(0, -1).join(" - ")
						presenceData.state = document.querySelector("title").textContent.split(" by ").pop().split(" ")[0]
						/* I actually wanted to get it using the visible elements, but well, it's complicated. */
						if (presenceData.details === presenceDataPlaced.details && presenceData.state === presenceDataPlaced.state) throw new Error('Current status is the same as the previous.');
	
					/* The function below are valid for users and groups. */
	
					} else if (currentPath[1] === "gallery" || currentPath[1] === "favourites") {
						if (currentPath[1] === "gallery") presenceData.details = `Viewing a ${profileType}'s gallery`
						else presenceData.details = `Viewing a ${profileType}'s favourites`
						if (websiteTheme === "eclipse" && profileType === "user") {
							presenceData.state = `${document.querySelector("h2.uUWfu").textContent} by ${getName()}`
						} else {
							if (profileType === "group" && !currentPath[2]) {
								presenceData.state = getName(true)
							} else {		
								if (!document.querySelector(".gallery .active")) presenceData.state = `${document.querySelector(".folder-title").textContent} by ${getName(true)}`
								else if (document.querySelector(".gallery .active").textContent.slice(1) === "Featured") presenceData.state = `Featured by ${getName(true)}`
								else if (document.querySelector(".gallery .active").textContent.slice(1) === "All") presenceData.state = `All by ${getName(true)}`
							}
						}
	
					/* The functions below are vaild for users only. */
	
					} else if (currentPath[1] === "print") {
						presenceData.details =  document.querySelector("h1 .title").textContent
						presenceData.state = getName(true)
	
					} else if (currentPath[1] === "prints") {
						presenceData.details = `Viewing a user's prints`
						presenceData.state = getName()
	
					} else if (currentPath[1] === "posts") {	/* This part is only valid on the Eclipse theme. */
						const details = {
							"All": "Viewing a user's posts",
							"Journals": "Viewing a user's journals",
							"Status Updates": "Viewing a user's statuses",
							"Polls": "Viewing a user's polls"
						}
						presenceData.details = details[document.querySelector("._3xmU1 div a").textContent]
						presenceData.state = getName()
	
					} else if (currentPath[1] === "journal") {
						if (currentPath[2]) {
							if (websiteTheme === "eclipse") {
								presenceData.details = document.querySelector("._2-k1X").textContent
							} else {	/* This part is only valid on the old theme. */
								if (currentPath[2] === "poll") document.querySelector("h2").textContent.substr(1, document.querySelector("h2").textContent.length - 2)
								else presenceData.details = document.querySelector("h1 .title").textContent
							}
							presenceData.state = `${getName()} (journal)`
						} else {	/* This part is only valid on the old theme. */
							presenceData.details = `Viewing a user's journals`
							presenceData.state = getName()
						}
	
					} else if (currentPath[1] === "poll") {
						if (websiteTheme === "eclipse") {
							try {presenceData.details = document.querySelector("._1ddsf").textContent}
							catch {presenceData.details = document.querySelector(".gfMBk").textContent}
						} else {
							presenceData.details = document.querySelector("h2").textContent.substr(1, document.querySelector("h2").textContent.length - 2)
						}
						presenceData.state = getName()
	
					} else if (currentPath[1] === "critique") {
						if (currentPath[2]) {
							presenceData.details = "Viewing a critique"
							presenceData.state = `from ${getName()}, ${document.querySelector("h2").textContent.trim()} ${document.querySelector("h4").textContent.trim()}`
						} else {
							presenceData.details = "Viewing a user's critiques"
							presenceData.state = getName()
						}
						
					} else if (currentPath[1] === "wishlist") {
						presenceData.details = "Viewing a user's wishlist"
						presenceData.state = getName()

					} else if (currentPath[1] === "dds") {
						presenceData.details = "Viewing a user's daily deviations"
						presenceData.state = getName()
					
					} else if (currentPath[1] === "badges") {	/* This part is only valid on the old theme. (not quite sure) */
						if (currentPath[2]) {
							presenceData.details = "Viewing a badge"
							presenceData.state = `${document.querySelector("h3").textContent} from ${getName()}`
						} else {
							presenceData.details = `Viewing a ${profileType}'s badges`
							presenceData.state = getName(true)
						}						
	
					/* The functions below are valid for groups only. */
	
					} else if (currentPath[1] === "aboutus") {
						presenceData.details = "Viewing a group's about page"
						presenceData.state = getName(true)
				
					} else if (currentPath[1] === "blog") {
						presenceData.details = "Viewing a group's blog"
						presenceData.state = getName(true) 
	
					/* The function below are valid for users and groups. */
	
					} else if (currentPath[0] && !currentPath[1] && getName()) {
						presenceData.details = `Viewing a ${profileType}'s profile`
						if (profileType === "group") presenceData.state = getName(true)
						else presenceData.state = getName()
					
					/* Whoops. */

					} else {
						logHandler.pageNotSupported(true)
					}
					
					console.groupEnd()
					console.log("Done!")
					presenceDataPlaced = presenceData
					forceUpdate = false
					retries = 0
	
				} catch (error) {

					forceUpdate = true
					retries++
					resetData()
					presenceData.details = "Loading..."
					if (retries === 1) {
						console.groupCollapsed("Loading or retrying...")
					}
					console.log(`${retries}/30`)
					
					if (retries === 30) {
						updateCallback.function = () => {}
						logHandler.fatalError(error)
					}

				}
	
			} else {
				presenceData = presenceDataPlaced
			}
		}
	
		function getName(override: boolean = false) {
			try {
				if (websiteTheme === "eclipse" && !override) {
					try {return document.querySelector("#content-container > div > div > div > div > div > a.user-link").textContent}
					catch {return document.querySelector("#root > main > div > div > div > div > div > div > div > div > span > a.user-link").textContent}
				} else {
					try {return lastItem(document.querySelectorAll("h1 .author .u .u")).textContent}
					catch {return document.querySelector("h1 .u .u").textContent}
				}
			} catch {
				if (currentPath[0].toLowerCase() === document.querySelector("title").textContent.split(" ")[0].toLowerCase()) return document.querySelector("title").textContent.split(" ")[0]
				else if (currentPath[0].toLowerCase() === document.querySelector("title").textContent.split(" by ")[1].split(" ")[0].toLowerCase()) return presenceData.state = document.querySelector("title").textContent.split(" by ")[1].split(" ")[0]
			}
		} 

		function lastItem(array: NodeList | Array<any>) {
			return array[array.length - 1]
		}

	} else if (currentURL.hostname === "about.deviantart.com") {

		presenceData.details = "Viewing the about pages"

		switch(currentPath[0]) {
			case "":
				presenceData.state = "About"
				break
			case "policy":
				if (currentPath[1] === "etiquette") presenceData.state = "Etiquette Policy"
				break
			default:
				logHandler.pageNotSupported(false)
		}
	
	} else if (currentURL.hostname === "chat.deviantart.com") {

		switch(currentPath[0]) {
			case "":
				presenceData.details = "Viewing the chat room list"
				break
			case "chat":

				presenceData.details = "On a chat room"

				/* Disabled for privacy reasons. Might be enabled if settings is a thing. */

				// var channel = () => document.querySelector(".damnc-tabbar strong").textContent, 
				// 	loadedChannel = "", forceUpdate = false, presenceDataPlaced: presenceData = {}, retries = 0

				// updateCallback.function = () => {
	
				// 	if (loadedChannel !== channel() || forceUpdate) {
				// 		loadedChannel = channel()
				// 		try {
				// 			if (true) {
				// 				presenceData.state = channel()
				// 			/* Whoops. */
				// 			} else {
				// 				logHandler.pageNotSupported(true)
				// 			}
				// 			console.groupEnd()
				// 			presenceDataPlaced = presenceData
				// 			forceUpdate = false
				// 			retries = 0
				// 			console.log("Done! Presence result:")
				// 			console.log(`${presenceData.details}\n${presenceData.state}`)
				// 		} catch (error) {
				// 			forceUpdate = true
				// 			retries++
				// 			resetData()
				// 			presenceData.details = "Loading..."
				// 			if (retries === 1) console.groupCollapsed("Loading or retrying...")
				// 			console.log(`${retries}/30`)
				// 			if (retries === 30) {
				// 				updateCallback.function = () => {}
				// 				logHandler.fatalError()
				// 			}
				// 		}
				// 	} else {
				// 		presenceData = presenceDataPlaced
				// 	}
				// }

				break

			default:
				logHandler.pageNotSupported(false)
		}
		
	} else if (currentURL.hostname === "forum.deviantart.com") {

		if (currentPath[1]) {
			if (currentPath[2]) {
				presenceData.details = "Viewing a topic"
				presenceData.state = document.querySelector("h1").textContent
			} else {
				presenceData.details = "Viewing a topic category"
				presenceData.state = document.querySelector("h1").textContent
			}
		} else {
			presenceData.details = "Viewing the forums"
		}

	} else if (currentURL.hostname === "groups.deviantart.com") {

		presenceData.details = "Looking for a group"
		/* There might be a way to implement the filters, but finding it is a story for another time. */

	} else if (currentURL.hostname === "portfolio.deviantart.com") {
		
		presenceData.details = "Creating a portfolio"

	/*
	
	} else if (loc.hostname === "*.daportfolio.com") {
	Trying to avoid using regex, for this time. 
	
	*/

	} else if (currentURL.hostname === "shop.deviantart.com") {

		if (getURLParam("q")) {
			presenceData.details = "Searching something on the shop"
			presenceData.state = getURLParam("q")
		} else {
			presenceData.details = "Viewing deviations on the shop"
			var li = document.querySelectorAll(".browse-facet-product ul li .selected")
			li.forEach((v) => {
				if (presenceData.state === undefined) presenceData.state = v.textContent
				else presenceData.state += ` > ${v.textContent}`
			})
		}

	} else if (currentURL.hostname === "www.deviantartsupport.com") {

		var currentTitle = "", presenceDataPlaced: presenceData = {}

		updateCallback.function = () => {
			if (currentTitle !== document.title.split(" - ")[0]) {
				currentTitle = document.title.split(" - ")[0]
				presenceData.details = "Viewing the help center/KB"
				presenceData.state = currentTitle
				presenceDataPlaced = presenceData
			} else {
				presenceData = presenceDataPlaced
			}
		}

	} else if (currentURL.hostname === "www.eclipsefeedback.com") {

		presenceData.details = "Giving feedback about Eclipse"

	} else if (currentURL.hostname === "deviantartads.com") {

		presenceData.details = "Viewing the media kit"

	} else if (currentURL.hostname === "sta.sh") {
		
		var loadedPath = [], forceUpdate = false, presenceDataPlaced: presenceData = {}, retries = 0
	
		updateCallback.function = () => {
	
			if (loadedPath !== currentPath || forceUpdate) {

				loadedPath = currentPath

				try {

					switch(currentPath[0]) {
						case "":
							presenceData.details = "On Sta.sh"
							presenceData.state = "Index"
							break
						case "my":
							if (currentPath[1] === "settings") {
								presenceData.details = "On Sta.sh"
								presenceData.state = "Settings"
							} else {
								logHandler.pageNotSupported(true)
							}
							break
						case "writer":
							presenceData.details = "On Sta.sh"
							presenceData.state = "Sta.sh Writer"
							break
						case "muro":
							presenceData.details = "On Sta.sh"
							presenceData.state = "DeviantArt muro"
							break
						default:
							presenceData.details = document.querySelector("title").textContent.split(" - ").slice(0, -1).join(" - ")
							presenceData.state = `${document.querySelector("title").textContent.split(" - ").pop().split("'s")[0]} (sta.sh)`
							if (presenceData.details === "") {
								throw new Error("No title found on Sta.sh")
							}	
					}		
					
					console.groupEnd()
					presenceDataPlaced = presenceData
					forceUpdate = false
					retries = 0
	
				} catch (error) {

					forceUpdate = true
					retries++
					resetData()
					presenceData.details = "Loading..."
					if (retries === 1) {
						console.groupCollapsed("Loading or retrying...")
					}
					console.log(`${retries}/30`)
					
					if (retries === 30) {
						updateCallback.function = () => {}
						logHandler.fatalError(error)
					}

				}
	
			} else {
				presenceData = presenceDataPlaced
			}
		}

	}

})()

if (updateCallback.present) {
	presence.on("UpdateData", async () => {
		resetData()
		updateCallback.function()
		presence.setActivity(presenceData)
	})
} else {
	presence.on("UpdateData", async () => {
		presence.setActivity(presenceData)
	})
}

/**
 * Initialize/reset presenceData.
 */
function resetData() {
	currentURL = new URL(document.location.href),
	currentPath = currentURL.pathname.slice(1).split("/"),
	presenceData = {
		details: <string> "Viewing an unsupported page",
		state: <string> undefined,
		largeImageKey: <string> "lg",
		startTimestamp: <number> browsingStamp,
		endTimestamp: <number> undefined
	};
}

/**
 * Function definitions for logging-related things.
 */
var logHandler = {
	/**
	 * Handles not supported pages.
	 * @param isCritical If the URL is essential to the operation, this should be true, so it will output an error, not a warning.
	 */
	pageNotSupported(isCritical: boolean = false) {
		if (isCritical) console.error("Whoops. It seems that this page is not supported. \nPlease contact @Hans5958#0969 to request a support for this page.")
		else console.warn("It seems that this page is not fully supported. \nPlease contact @Hans5958#0969 to request a support for this page.")
		console.log(currentURL.href)
	},
	/**
	 * Handles fatal errors.
	 * @param error The error that it threw.
	 */
	fatalError(error: string) {
		console.groupEnd()
		console.error("Fatal error! Terminating.\nPlease report this problem to @Hans5958#0969.")
		console.groupCollapsed("Error log")
		console.log(currentURL.href)
		console.error(error)
		console.groupEnd()
	}
}

/**
 * Search for URL parameters.
 * @param urlParam The parameter that you want to know about the value.
 */
function getURLParam(urlParam: string) {
	return currentURL.searchParams.get(urlParam)
}