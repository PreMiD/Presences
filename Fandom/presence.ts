var presence = new Presence({
	clientId: "644400074008297512",
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

	if (href.host === "www.fandom.com") {

		/*

		Chapter 1
		This one is for the editorial part of Fandom.

		*/
		
		if (href.pathname === "/") {
			presenceData.state = "Index"
			delete presenceData.details
		} else if (href.pathname.includes("/signin")) {
			presenceData.details = "Signing in"
		} else if (href.pathname.includes("/register")) {
			presenceData.details = "Registering an account"
			delete presenceData.details
		} else if (href.pathname.includes("/articles/")) {
			presenceData.details = "Reading an article"
			presenceData.state = document.querySelector(".article-header__title").textContent
		} else if (href.pathname.includes("/topics/")) {
			presenceData.details = "Viewing a topic"
			presenceData.state = document.querySelector(".topic-header__title").firstElementChild.innerHTML
		} else if (href.pathname.includes("/video")) {
			updateCallback.function = () => {
				resetData()
				presenceData.details = "Watching a video"
				presenceData.state = document.querySelector(".video-page-featured-player__title").textContent
				try {
					if (document.querySelector(".jw-icon-playback").getAttribute("aria-label") === "Pause") {
						let video = document.querySelector(".jw-video")
						let timestamps = getTimestamps(Math.floor(video.currentTime), Math.floor(video.duration))
						presenceData.startTimestamp = timestamps[0]
						presenceData.endTimestamp = timestamps[1]
					} else {
						delete presenceData.startTimestamp
						delete presenceData.endTimestamp
					}
				} catch (e) {
					delete presenceData.startTimestamp
					delete presenceData.endTimestamp
				}
				console.log(presenceData)
			}
		} else if (href.pathname.includes("/curated/")) {
			presenceData.details = "Viewing a curation"
			presenceData.state = document.querySelector(".card__title").textContent
		} else {
			presenceData.details = "Viewing a page"
			if (href.pathname.includes("/explore")) presenceData.state = "Explore"
			else if (href.pathname.includes("/about")) presenceData.state = "About"
			else if (href.pathname.includes("/carriers")) presenceData.state = "Carriers"
			else if (href.pathname.includes("/terms-of-use")) presenceData.state = "Terms of Use"
			else if (href.pathname.includes("/privacy-policy")) presenceData.state = "Privacy Policy"
			else if (href.pathname.includes("/mediakit")) presenceData.state = "Media Kit"
			else if (href.pathname.includes("/local-sitemap")) presenceData.state = "Local Sitemap"
		}

	} else if (href.pathname.includes("/wiki/")) {
		/*

		Chapter 2
		This one is for the wiki part on the Fandom, which was Wikia a while ago.

		*/

		let title: string, 
			sitename: string,
			actionResult = href.searchParams.get("action") || href.searchParams.get("veaction"),
			titleFromURL = () => {
			let raw: string, lang: string
			if (href.pathname.startsWith("/wiki/")) {
				raw = href.pathname.slice(6)
			} else {
				lang = href.pathname.split("/")[0]
				raw = href.pathname.slice(7 + lang.length)
			}
			if (raw.includes("_")) return raw.replace(/_/g, " ")
			else return raw
		}

		try {
			title = document.querySelector('.page-header__title').innerHTML
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
			"Category talk": "Viewing a category talk page",
			"Blog": "Viewing a blog",
			"Message Wall": "Viewing a message wall",
			"Thread": "Viewing a forum thread",
			"Board": "Viewing a forum board",
			"Topic": "Viewing a forum topic",
		} 

		if (title === "Home") {
			sitename = document.querySelector("meta[property='og:title']").content
			presenceData.state = "Home"
			delete presenceData.details
		} else if (actionResult == "history" && titleFromURL) {
			presenceData.details = "Viewing revision history"
			presenceData.state = titleFromURL()
		} else if (actionResult == "edit" && titleFromURL) {
			if (href.searchParams.has("action")) title = document.querySelector("#EditPageHeader").children[2].textContent
			presenceData.details = "Editing a wiki page"
			presenceData.state = titleFromURL()
		} else if (href.pathname.includes("User_blog:")) {
			if (title) {
				presenceData.details = "Reading a user blog post"
				presenceData.state = title + " by " + document.querySelector(".page-header__blog-post-details").firstElementChild.textContent
			} else {
				presenceData.details = "Viewing a user blog"
				presenceData.state = titleFromURL()
			}
		} else {
			if (namespaceDetails[title.split(":")[0]]) presenceData.details = namespaceDetails[title.split(":")[0]]
			else presenceData.details = "Reading a wiki page"
			presenceData.state = title
		}

		presenceData.startTimestamp = browsingStamp
		presenceData.state += " | " + sitename

	} else if (href.pathname === "/f" || href.pathname.includes("/f/")) {

		/*

		Chapter 3
		This one is for the discussion parts on each wikis.

		*/

		updateCallback.function = () => {
			var presenceData = {
				details: <string> 'In construction',
				state: <string> null,
				largeImageKey: <string> "lg",
				startTimestamp: <number> browsingStamp,
			};
			href = new URL(document.location.href)
			if (href.pathname === "/f") {
				presenceData.details = "Viewing the discussion page"
			} else if (href.pathname.includes("/p/")) {
				presenceData.details = "Reading an discussion post"
				presenceData.state = document.querySelector(".post__title").textContent
			} else if (href.pathname.includes("/u/")) {
				presenceData.details = "Viewing a discussion user page"
				presenceData.state = document.querySelector(".user-overview__username").textContent
			}
			cleanData()	
		}

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