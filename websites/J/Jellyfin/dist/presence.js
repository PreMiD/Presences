const JELLYFIN_URL = "jellyfin.org";
const APP_NAME = "Jellyfin Web";
const PRESENCE_ART_ASSETS = {
    download: "downloading",
    live: "live",
    logo: "banner-icon",
    pause: "pause",
    play: "play",
    read: "reading",
    search: "search",
    write: "writing"
};
const presenceData = {
    largeImageKey: PRESENCE_ART_ASSETS.logo
};
let ApiClient, ApiClientt;
const GENERIC_LOG_STYLE = "font-weight: 800; padding: 2px 5px; color: white;";
function PMD_info(message) {
    console.log("%cPreMiD%cINFO%c " + message, GENERIC_LOG_STYLE + "border-radius: 25px 0 0 25px; background: #596cae;", GENERIC_LOG_STYLE + "border-radius: 0 25px 25px 0; background: #5050ff;", "color: unset;");
}
let presence;
function handleAudioPlayback() {
    try {
        const audioElem = document.getElementsByTagName("audio")[0];
        const infoContainer = document.getElementsByClassName("nowPlayingBar")[0];
        const buttons = infoContainer.querySelectorAll("button.itemAction");
        presenceData.details = `Listening to: ${buttons.length >= 1 ? buttons[0].textContent : "unknown title"}`;
        presenceData.state = `By: ${buttons.length >= 2 ? buttons[1].textContent : "unknown artist"}`;
        if (!audioElem.paused) {
            presenceData.smallImageKey = PRESENCE_ART_ASSETS.play;
            presenceData.smallImageText = "Playing";
            presenceData.endTimestamp = new Date(Date.now() + (audioElem.duration - audioElem.currentTime) * 1000).getTime();
        }
        else {
            presenceData.smallImageKey = PRESENCE_ART_ASSETS.pause;
            presenceData.smallImageText = "Paused";
            delete presenceData.endTimestamp;
        }
    }
    catch (e) {
    }
}
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
            if (location.pathname.indexOf("/docs/") === 0) {
                presenceData.state = `Reading the docs: ${document.title
                    .split("|")[0]
                    .trim()}`;
                presenceData.smallImageKey = PRESENCE_ART_ASSETS.read;
            }
    }
}
function getUserId() {
    try {
        return ApiClientt["_currentUser"]["Id"];
    }
    catch (e) {
        const servers = JSON.parse(localStorage.getItem("jellyfin_credentials"))
            .Servers;
        if (location.hash.indexOf("?") > 0) {
            for (const param of location.hash.split("?")[1].split("&")) {
                if (param.startsWith("serverId")) {
                    const serverId = param.split("=")[1];
                    for (const server of servers) {
                        if (server.Id === serverId) {
                            return server.UserId;
                        }
                    }
                }
            }
        }
        else {
            return servers[0].UserId;
        }
    }
}
const media = [];
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
            "x-emby-authorization": `MediaBrowser Client="${ApiClientt["_appName"]}", Device="${ApiClientt["_deviceName"]}", DeviceId="${ApiClientt["_deviceId"]}", Version="${ApiClientt["_appVersion"]}", Token="${ApiClientt["_serverInfo"]["AccessToken"]}"`
        }
    })
        .then((resp) => resp.json())
        .then((json) => {
        media[itemId] = json;
        return media[itemId];
    });
}
async function handleVideoPlayback() {
    const videoPlayerPage = document.getElementById("videoOsdPage");
    if (videoPlayerPage === null) {
        return;
    }
    const videoPlayerElem = document.getElementsByTagName("video")[0];
    let title;
    let subtitle;
    const headerTitleElem = document.querySelector("h3.pageTitle");
    const osdTitleElem = videoPlayerPage.querySelector("h3.osdTitle");
    let mediaInfo;
    const videoPlayerContainerElem = document.body.getElementsByClassName("videoPlayerContainer")[0];
    if (videoPlayerContainerElem.style.backgroundImage) {
        const backgroundImageUrl = videoPlayerContainerElem.style.backgroundImage
            .split('"')[1]
            .replace(ApiClientt["_serverAddress"], "");
        mediaInfo = await obtainMediaInfo(backgroundImageUrl.split("/")[2]);
    }
    else {
        mediaInfo = {
            Type: "TvChannel"
        };
    }
    if (!mediaInfo) {
        title = "Watching unknown content";
        subtitle = "No metadata could be obtained";
    }
    else {
        switch (mediaInfo.Type) {
            case "Movie":
                title = "Watching a Movie";
                subtitle = osdTitleElem.textContent;
                break;
            case "Series":
                title = `Watching ${headerTitleElem.textContent}`;
                subtitle = osdTitleElem.textContent;
                break;
            case "TvChannel":
                title = "Watching Live Tv";
                subtitle = osdTitleElem.textContent;
                break;
            default:
                title = `Watching ${mediaInfo.Type}`;
                subtitle = mediaInfo.Name;
        }
    }
    if (mediaInfo && mediaInfo.Type === "TvChannel") {
        presenceData.smallImageKey = PRESENCE_ART_ASSETS.live;
        presenceData.smallImageText = "Live TV";
    }
    else if (!videoPlayerElem.paused) {
        presenceData.smallImageKey = PRESENCE_ART_ASSETS.play;
        presenceData.smallImageText = "Playing";
        presenceData.endTimestamp = new Date(Date.now() +
            (videoPlayerElem.duration - videoPlayerElem.currentTime) * 1000).getTime();
    }
    else {
        presenceData.smallImageKey = PRESENCE_ART_ASSETS.pause;
        presenceData.smallImageText = "Paused";
        delete presenceData.endTimestamp;
    }
    presenceData.details = title;
    presenceData.state = subtitle;
    if (!presenceData.state) {
        delete presenceData.state;
    }
}
async function handleItemDetails() {
    const params = location.hash.split("?")[1].split("&");
    let id;
    for (const param of params) {
        if (param.startsWith("id=")) {
            id = param.split("=")[1];
            break;
        }
    }
    const data = await obtainMediaInfo(id);
    if (!data) {
        presenceData.details = "Browsing details of an item";
        presenceData.state = "Could not get item details";
    }
    else {
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
            case "Person": {
                let description = "Description not available";
                if (data.Overview) {
                    description =
                        data.Overview.substr(0, 40) +
                            (data.Overview.length > 40 ? "..." : "");
                }
                presenceData.state = `${data.Type} ─ ${description}`;
                break;
            }
            case "MusicAlbum":
                presenceData.state = `${data.Type} ─ ${data.RecursiveItemCount} songs`;
                break;
            case "MusicArtist":
            case "TvChannel":
                presenceData.state = `${data.Type} ─ No further information available`;
                break;
            default:
                presenceData.state = "No further information available";
        }
    }
}
async function handleWebClient() {
    const audioElems = document.body.getElementsByTagName("audio");
    if (audioElems.length > 0 &&
        audioElems[0].classList.contains("mediaPlayerAudio") &&
        audioElems[0].src) {
        handleAudioPlayback();
        return;
    }
    presenceData.details = "At web client";
    const path = location.hash.split("?")[0].substr(3);
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
        case "mypreferencesmenu.html":
        case "myprofile.html":
        case "mypreferencesdisplay.html":
        case "mypreferenceshome.html":
        case "mypreferenceslanguages.html":
        case "mypreferencessubtitles.html":
            presenceData.state = "On user preferences";
            break;
        case "dashboard.html":
        case "dashboardgeneral.html":
        case "userprofiles.html":
        case "useredit.html":
        case "library.html":
        case "librarydisplay.html":
        case "metadataimages.html":
        case "metadatanfo.html":
        case "encodingsettings.html":
        case "devices.html":
        case "device.html":
        case "serveractivity.html":
        case "dlnasettings.html":
        case "livetvstatus.html":
        case "livetvtuner.html":
        case "livetvguideprovider.html":
        case "livetvsettings.html":
        case "networking.html":
        case "apikeys.html":
        case "log.html":
        case "notificationsettings.html":
        case "installedplugins.html":
        case "availableplugins.html":
        case "scheduledtasks.html":
        case "configurationpage":
            presenceData.state = "On admin dashboard";
            break;
        case "movies.html":
            presenceData.state = "Browsing movies";
            break;
        case "tv.html":
            presenceData.state = "Browsing tv series";
            break;
        case "music.html":
            presenceData.state = "Browsing music";
            break;
        case "livetv.html":
            presenceData.state = "Browsing Live TV";
            break;
        case "edititemmetadata.html":
            presenceData.state = "Editing media metadata";
            break;
        case "itemdetails.html":
            await handleItemDetails();
            break;
        case "videoosd.html":
            await handleVideoPlayback();
            break;
        case "nowplaying.html":
            presenceData.state = "Viewing the audio playlist";
            break;
        default:
            if (path.substr(0, 3) === "dlg") {
            }
    }
}
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
async function isJellyfinWebClient() {
    if (!ApiClient) {
        ApiClientt = await presence.getPageletiable("ApiClient");
    }
    else {
        ApiClientt = ApiClient;
    }
    if (ApiClientt && typeof ApiClientt === "object") {
        if (ApiClientt["_appName"] && ApiClientt["_appName"] === APP_NAME) {
            return true;
        }
    }
    return false;
}
async function updateData() {
    setDefaultsToPresence();
    let showPresence = false;
    if (location.host.toLowerCase() === JELLYFIN_URL) {
        showPresence = true;
        handleOfficialWebsite();
    }
    else if (await isJellyfinWebClient()) {
        showPresence = true;
        await handleWebClient();
    }
    if (!presenceData.startTimestamp || !presenceData.endTimestamp) {
        presenceData.startTimestamp = Date.now();
    }
    if (showPresence) {
        if (presenceData.details == null) {
            presence.setTrayTitle();
            presence.setActivity();
        }
        else {
            presence.setActivity(presenceData);
        }
    }
}
async function init() {
    let validPage = false;
    if (location.host === JELLYFIN_URL) {
        validPage = true;
        PMD_info("Jellyfin website detected");
    }
    else {
        try {
            const data = JSON.parse(localStorage.getItem("jellyfin_credentials"));
            for (const server of data.Servers) {
                if (Date.now() - new Date(server.DateLastAccessed).getTime() <
                    30 * 1000) {
                    validPage = true;
                    PMD_info("Jellyfin web client detected");
                }
            }
        }
        catch (e) {
            validPage = false;
        }
    }
    if (validPage) {
        presence = new Presence({
            clientId: "669359568391766018"
        });
        presence.on("UpdateData", updateData);
    }
}
init();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxNQUFNLFlBQVksR0FBRyxjQUFjLENBQUM7QUFHcEMsTUFBTSxRQUFRLEdBQUcsY0FBYyxDQUFDO0FBR2hDLE1BQU0sbUJBQW1CLEdBQUc7SUFDMUIsUUFBUSxFQUFFLGFBQWE7SUFDdkIsSUFBSSxFQUFFLE1BQU07SUFDWixJQUFJLEVBQUUsYUFBYTtJQUNuQixLQUFLLEVBQUUsT0FBTztJQUNkLElBQUksRUFBRSxNQUFNO0lBQ1osSUFBSSxFQUFFLFNBQVM7SUFDZixNQUFNLEVBQUUsUUFBUTtJQUNoQixLQUFLLEVBQUUsU0FBUztDQUNqQixDQUFDO0FBRUYsTUFBTSxZQUFZLEdBQWlCO0lBQ2pDLGFBQWEsRUFBRSxtQkFBbUIsQ0FBQyxJQUFJO0NBQ3hDLENBQUM7QUFFRixJQUFJLFNBQVMsRUFBRSxVQUFVLENBQUM7QUFHMUIsTUFBTSxpQkFBaUIsR0FBRyxtREFBbUQsQ0FBQztBQU85RSxTQUFTLFFBQVEsQ0FBQyxPQUFPO0lBQ3ZCLE9BQU8sQ0FBQyxHQUFHLENBQ1QsbUJBQW1CLEdBQUcsT0FBTyxFQUM3QixpQkFBaUIsR0FBRyxvREFBb0QsRUFDeEUsaUJBQWlCLEdBQUcsb0RBQW9ELEVBQ3hFLGVBQWUsQ0FDaEIsQ0FBQztBQUNKLENBQUM7QUFFRCxJQUFJLFFBQVEsQ0FBQztBQUtiLFNBQVMsbUJBQW1CO0lBRTFCLElBQUk7UUFDRixNQUFNLFNBQVMsR0FBRyxRQUFRLENBQUMsb0JBQW9CLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDNUQsTUFBTSxhQUFhLEdBQUcsUUFBUSxDQUFDLHNCQUFzQixDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzFFLE1BQU0sT0FBTyxHQUFHLGFBQWEsQ0FBQyxnQkFBZ0IsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO1FBRXBF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