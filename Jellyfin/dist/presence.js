// official website
const JELLYFIN_URL = "jellyfin.org";

// web client document.title value (case sensitive)
const DOCUMENT_TITLE = "Jellyfin";

// web client app name
const APP_NAME = "Jellyfin Web";

// all the presence art assets uploaded to discord
const PRESENCE_ART_ASSETS = {
    download: "downloading",
    live: "live",
    logo: "banner-icon",
    pause: "pause",
    play: "play",
    read: "reading",
    search: "search",
    write: "writing"
}

let presence = new Presence({
    clientId: "669359568391766018",
    mediaKeys: false
});

// View https://docs.premid.app/en/dev/presence/class -> presenceData interfac
let presenceData = {
    largeImageKey: PRESENCE_ART_ASSETS.logo,
    // smallImageKey: "key",
    // smallImageText: "Some hover text",
    // details: "",
    // state: "",
    // startTimestamp: null,
    // endTimestamp: 1577151472000
};

let ApiClient;

/**
 * handleOfficialWebsite - handle the presence while the user is in the official website
 *
 * @return {void}
 */
function handleOfficialWebsite() {
    presenceData.details = "At jellyfin.org";

    switch (location.pathname) {
        case "/":
            presenceData.state = "On landing page";
            break;
        case "/posts/":
            presenceData.state = "Reading the latest posts";
            presenceData.smallImageKey = PRESENCE_ART_ASSETS.read;
            break;
        case "/downloads/":
            presenceData.state = "On downloads";
            presenceData.smallImageKey = PRESENCE_ART_ASSETS.download;
            break;
        case "/contribute/":
            presenceData.state = "Learning how to contribute";
            break;
        case "/contact/":
            presenceData.state = "On contact page";
            break;
        default:
            // reading the docs
            if (location.pathname.indexOf("/docs/") === 0) {
                presenceData.state = `Reading the docs: ${document.title.split("|")[0].trim()}`;
                presenceData.smallImageKey = PRESENCE_ART_ASSETS.read;
            }
    }
}

/**
 * isJellyfinWebClient - verifies that we are in the jellyfin web client
 *
 * @return {boolean}
 */
async function isJellyfinWebClient() {
	if (!ApiClient) {
		ApiClient = await presence.getPageletiable("ApiClient");
	}

	if (typeof ApiClient === "object") {
		if (ApiClient["_appName"] === APP_NAME) {
			 return true;
		}
	}

	return false;
}

/**
 * handleWebClient - handle the presence while the user is in the web client
 *
 * @return {void}  description
 */
async function handleWebClient() {
    presenceData.details = "web client";

    // obtain the path, on the example would return "login.html"
    // https://media.domain.tld/web/index.html#!/login.html?serverid=randomserverid
    path = location.hash.split("?")[0].substr(3);

    switch (path) {
        case "login.html":
            presenceData.state = "Logging in";
            break;
        case "home.html":
            presenceData.state = "At home";
            break;
        case "search.html":
            presenceData.state = "Searching";
            presenceData.smallImageKey = PRESENCE_ART_ASSETS.search;
            break;

        // user preferences
        case "mypreferencesmenu.html":
        case "myprofile.html": // profile
        case "mypreferencesdisplay.html": // display
        case "mypreferenceshome.html": // home
        case "mypreferenceslanguages.html": // languages
        case "mypreferencessubtitles.html": // subtitles
            presenceData.state = "On user preferences";
            break;

        // admin dashboard
        case "dashboard.html":
        // server section
        case "dashboardgeneral.html": // general
        case "userprofiles.html": // user profiles
        case "useredit.html": // editing user profile
        case "library.html": // managing library
        case "librarydisplay.html": // library display settings
        case "metadataimages.html": // library metadata settings
        case "metadatanfo.html": // library NFO settings
        case "encodingsettings.html": // encoding settings
        // devices section
        case "devices.html": // devices
        case "device.html": // editing device
        case "serveractivity.html": // server activity
        case "dlnasettings.html": // dlna settings
        // live tv section
        case "livetvstatus.html": // manage live tv
        case "livetvsettings.html": // live tv settings (dvr)
        // advanced section
        case "networking.html": // networking
        case "apikeys.html": // api keys
        case "log.html": // logs
        case "notificationsettings.html": // notification settings
        case "installedplugins.html": // plugins
        case "availableplugins.html": // plugins catalog
        case "scheduledtasks.html": // scheduled tasks
        case "configurationpage": // plugins configuration page
            presenceData.state = "On admin dashboard";
            break;

        case "movies.html":
            presenceData.state = "Browsing movies";
            break;

        case "tv.html":
            presenceData.state = "Browsing tv series";
            break;

        case "edititemmetadata.html":
            presenceData.state = "Editing media metadata";
            break;

        case "itemdetails.html":
			await handleItemDetails();
            break;

        case "videoosd.html":
            handleVideoPlayback();
            break;

        // TODO: add music, books, images, music videos, and mix content categories urls

        default:
            if (path.substr(0, 3) === "dlg") {
                // generic popup do nothing
            } else {
                // for testing purposes
                // presenceData.state = path;
            }
    }
}

/**
 * handleVideoPlayback - handles the presence when the user is using the video player
 *
 * @return {void}
 */
function handleVideoPlayback() {
    let videoPlayerPage = document.getElementById("videoOsdPage");

    if (videoPlayerPage === null) {
        // elements not loaded yet
        return;
    }

    let videoPlayerElem = document.getElementsByTagName("video")[0];

    // this variables content will be replaced in details and status properties on presenceData
    let title;
    let subtitle;

    // title on the header
    let headerTitleElem = document.querySelector("h3.pageTitle");

    // title on the osdControls
    let osdTitleElem = videoPlayerPage.querySelector("h3.osdTitle");

    // movie
    if (!headerTitleElem.innerText) {
        title = `Playing movie: ${osdTitleElem.innerText}`;
        subtitle = "";

    // tv show
    } else {
        title = `Playing tv series: ${headerTitleElem.innerText}`;
        subtitle = osdTitleElem.innerText;
    }

    // playing
    if (!videoPlayerElem.paused) {
        presenceData.smallImageKey = PRESENCE_ART_ASSETS.play;
        presenceData.smallImageText = "Playing";
        presenceData.endTimestamp = new Date(Date.now() + (videoPlayerElem.duration - videoPlayerElem.currentTime) * 1000).getTime();

    // paused
    } else {
        presenceData.smallImageKey = PRESENCE_ART_ASSETS.pause;
        presenceData.smallImageText = `Paused at: ${videoOsdPage.querySelector(".osdPositionText").innerText}`;
        delete presenceData.endTimestamp;
    }

    presenceData.details = title;
    presenceData.state = subtitle;

    if (!presenceData.state) {
        delete presenceData.state;
    }
}

/**
 * getUserId - obtains the user id
 *
 * @return {string}  user id
 */
function getUserId() {
    try {
        return ApiClient["_currentUser"]["Id"];
    } catch (e) {
        console.log("Got user id from localStorage");
        // TODO: if multitple servers check the server id from location.hash
        return JSON.parse(localStorage.getItem("jellyfin_credentials")).Servers[0].UserId;
    }
}

// cache the requested media
let media = [];


/**
 * obtainMediaInfo - obtain the metadata of the given id
 *
 * @param  {string} itemId id of the item to get metadata of
 * @return {object}        metadata of the item
 */
async function obtainMediaInfo(itemId) {
    if (media[itemId]) {
        if (media[itemId] !== "pending") {
            return media[itemId];
        }

        return;
    }

    media[itemId] = "pending";

    fetch(`/Users/${getUserId()}/Items/${itemId}`, {
        credentials: "include",
        headers: {
            "x-emby-authorization": `MediaBrowser Client="${ApiClient["_appName"]}", Device="${ApiClient["_deviceName"]}", DeviceId="${ApiClient["_deviceId"]}", Version="${ApiClient["_appVersion"]}", Token="${ApiClient["_serverInfo"]["AccessToken"]}"`
        }
    })
    .then(resp => resp.json())
    .then(json => {
		media[itemId] = json;
		return media[itemId];
    });
}

/**
 * handleItemDetails - handles the presence when the user is viewing the details of an item
 *
 * @return {void}
 */
async function handleItemDetails() {
	let params = location.hash.split("?")[1].split("&");
	let id;

	for (let param of params) {
		let p = param.split("=");

		if (p[0] === "id") {
			id = p[1];
			break;
		}
	}

	let data = await obtainMediaInfo(id);

	if (!data) {
		presenceData.details = "Browsing details of an item";
		presenceData.state = "Could not get item details";

	} else {
		presenceData.details = `Browsing details of: ${data.Name}`;

		switch (data.Type) {
			case "Movie":
				presenceData.state = `${data.Type} ─ ${data.OriginalTitle} (${data.ProductionYear})`;
				break;
			case "Series":
				presenceData.state = `${data.Type} ─ (${data.Status})`;
				break;
			case "Season":
				presenceData.state = `${data.Type} ─ ${data.SeriesName}`;
				break;
			case "Episode":
				presenceData.state = `${data.Type} ─ ${data.SeriesName} - ${data.SeasonName}`;
				break;
			case "Person":
				let description = "Description not available";

				if (data.Overview) {
					description = data.Overview.substr(0, 40) + (data.Overview.length > 40 ? "..." : "");
				}
				presenceData.state = `${data.Type} ─ ${description}`;
				break;

			// TODO: add music, books, images, music videos, and mix content categories urls
			default:
				// console.log(`${data.Type}:`, data);
				presenceData.state = "No further information available";
		}
	}
}

/**
 * setDefaultsToPresence - set defaul values to the presenceData object
 *
 * @return {void}
 */
function setDefaultsToPresence() {
    if (presenceData.smallImageKey) {
        delete presenceData.smallImageKey;
    }
    if (presenceData.smallImageText) {
        delete presenceData.smallImageText;
    }
    if (presenceData.startTimestamp) {
        delete presenceData.startTimestamp;
    }
    if (presenceData.endTimestamp) {
        delete presenceData.endTimestamp;
    }
}

// tick function, this is called several times a second where possible
presence.on("UpdateData", async () => {
    setDefaultsToPresence();

    let showPresence = false;

    // we are on the official jellyfin page
    if (location.host.toLowerCase() === JELLYFIN_URL) {
        showPresence = true;
        handleOfficialWebsite();

    // we are on the web client and has been verified
	} else if (await isJellyfinWebClient()) {
        showPresence = true;
        await handleWebClient();

    } else {
		// clear presence, we are not on a jellyfin web client
		// cannot clear the presence, as it could clear it while it's active on other tab
		// presence.clearActivity();
    }

	if (!presenceData.startTimestamp || !presenceData.endTimestamp) {
		presenceData.startTimestamp = Date.now();
	}

    // if jellyfin is detected init/update the presence status
    if (showPresence) {
        if (presenceData.details == null) {
            presence.setTrayTitle();
            presence.setActivity();

        } else {
            presence.setActivity(presenceData);
        }
    }
});
