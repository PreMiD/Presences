var presence = new Presence({
	clientId: "652880245371699222",
	mediaKeys: false
})

var browsingStamp = Math.floor(Date.now() / 1000),
	href = new URL(document.location.href),
	presenceData = {
		details: <string> 'In construction',
		state: <string> null,
		largeImageKey: <string> "lg",
		startTimestamp: <number> browsingStamp,
		endTimestamp: <number> null
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

	if (href.hostname === "www.gamepedia.com") {

		if (href.pathname === "/") {
			presenceData.state = "Index"
			presenceData.startTimestamp = browsingStamp
			delete presenceData.details
		} else if (href.pathname.includes("/twitch-login")) {
			presenceData.details = "Signing in"
			presenceData.startTimestamp = browsingStamp
			delete presenceData.state
		} else if (href.pathname.includes("/twitch-signup")) {
			presenceData.details = "Registering an account"
			presenceData.startTimestamp = browsingStamp
			delete presenceData.details
		} else if (href.pathname.includes("/news/")) {
			presenceData.details = "Reading an news article"
			presenceData.state = document.querySelector(".p-article-title").textContent
			presenceData.startTimestamp = browsingStamp
		} else if (href.pathname.includes("/blog/")) {
			presenceData.details = "Reading a blog article"
			presenceData.state = document.querySelector(".p-article-title").textContent
			presenceData.startTimestamp = browsingStamp
		} else if (href.pathname.includes("/members/")) {
			presenceData.details = "Reading a blog article"
			presenceData.state = document.querySelector(".username").textContent
			presenceData.startTimestamp = browsingStamp
		} else {
			presenceData.details = "Viewing a page"
			if (href.pathname.includes("/PRO")) presenceData.state = "Gamepedia PRO"
			else presenceData.state = document.title.split(" - ")[0]
			presenceData.startTimestamp = browsingStamp
		}

	} else {
		
		let title: string, 
			sitename: string,
			actionResult = href.searchParams.get("action"),
			titleFromURL = () => {
				let raw: string
				if (href.pathname.startsWith("/index.php")) raw = href.searchParams.get("title")
				else raw = href.pathname.slice(1)
				if (raw.includes("_")) return raw.replace(/_/g, " ")
				else return raw
			}

		try {
			title = document.querySelector("meta[property='og:title']").content
		} catch (e) {
			title = titleFromURL()
		}

		try {
			sitename = document.querySelector("meta[property='og:site_name']").content
		} catch (e) {
			sitename = null
		}

		let namespaceDetails = {
			"Media": "Viewing a media",
			"Special": "Viewing a special page",
			"Talk": "Viewing a talk page",
			"User": "Viewing a user page",
			"User talk": "Viewing a user talk page",
			[sitename]: "Viewing a project page",
			[sitename + " talk"]: "Viewing a project talk page",
			"File": "Viewing a file",
			"File talk": "Viewing a file talk page",
			"MediaWiki": "Viewing a MediaWiki page",
			"MediaWiki talk": "Viewing a MediaWiki talk page",
			"Template": "Viewing a template",
			"Template talk": "Viewing a template talk",
			"Help": "Viewing a help page",
			"Help talk": "Viewing a help talk page",
			"Category": "Viewing a category",
			"Category talk": "Viewing a category talk page"
		} 

		if (title === sitename) {
			presenceData.state = "Home"
			delete presenceData.details
		} else if (actionResult == "history" && titleFromURL) {
			presenceData.details = "Viewing revision history"
			presenceData.state = title
		} else if (actionResult == "edit" && titleFromURL) {
			presenceData.details = "Editing a wiki page"
			presenceData.state = title
		} else if (title.startsWith("UserProfile:")) {
			presenceData.details = "Viewing a user profile"
			presenceData.state = document.querySelector(".mw-headline").textContent			
		} else {
			if (namespaceDetails[title.split(":")[0]]) presenceData.details = namespaceDetails[title.split(":")[0]]
			else presenceData.details = "Reading a wiki page"
			presenceData.state = title
		}

		presenceData.startTimestamp = browsingStamp
		presenceData.state += " | " + sitename

	} 

	cleanData()

})()

if (updateCallback.present) {
	presence.on("UpdateData", async () => {
		updateCallback.function()
		presence.setActivity(presenceData)
	})
} else {
	presence.on("UpdateData", async () => {
		presence.setActivity(presenceData)
	})
}

/**
 * Get timestamps.
 * @param {Number} videoTime Current video time seconds
 * @param {Number} videoDuration Video duration seconds
 */
function getTimestamps(videoTime: number, videoDuration: number) {
	var startTime = Date.now()
	var endTime = Math.floor(startTime / 1000) - videoTime + videoDuration
	return [Math.floor(startTime / 1000), endTime]
}

/**
 * Initialize presenceData
 */
function resetData() {
	presenceData = {
		details: <string> 'In construction',
		state: <string> null,
		largeImageKey: <string> "lg",
		startTimestamp: <number> browsingStamp,
		endTimestamp: <number> null
	};
}

/**
 * Cleans presenceData
 */
function cleanData() {
	if (presenceData.state === null) delete presenceData.state
	if (presenceData.endTimestamp === null) delete presenceData.endTimestamp
}