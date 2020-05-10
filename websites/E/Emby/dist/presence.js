const EMBY_URL = "emby.media";
const APP_NAME = "Emby Web";
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
const GENERIC_LOG_STYLE = "font-weight: 800; padding: 2px 5px; color: white;";
function PMD_info(message) {
    console.log("%cPreMiD%cINFO%c " + message, GENERIC_LOG_STYLE + "border-radius: 25px 0 0 25px; background: #596cae;", GENERIC_LOG_STYLE + "border-radius: 0 25px 25px 0; background: #5050ff;", "color: unset;");
}
let presence, ApiClient;
const presenceData = {
    largeImageKey: PRESENCE_ART_ASSETS.logo
};
const media = [];
function handleOfficialWebsite() {
    presenceData.details = `At ${EMBY_URL}`;
    switch (location.pathname) {
        case "/":
        case "/index.html":
            presenceData.state = "On landing page";
            break;
        case "/about.html":
            presenceData.state = "On about page";
            break;
        case "/blog.html":
            presenceData.state = "Reading the blog";
            presenceData.smallImageKey = PRESENCE_ART_ASSETS.read;
            break;
        case "/download.html":
            presenceData.state = "On downloads";
            presenceData.smallImageKey = PRESENCE_ART_ASSETS.download;
            break;
        case "/premiere.html":
        case "/premiere-ext.html":
        case "/premiereterms.html":
            presenceData.state = "Learning about premiere";
            break;
        case "/support.html":
            presenceData.state = "On support page";
            break;
        default:
            if (location.pathname.startsWith("/community")) {
                presenceData.state = "On community page";
            }
            else if (document.querySelector(".w-pagehead > h1") &&
                document.querySelector(".w-pagehead > h1").textContent === "Emby Blog") {
                presenceData.state = "Reading the blog";
                presenceData.smallImageKey = PRESENCE_ART_ASSETS.read;
            }
    }
}
async function isEmbyWebClient() {
    if (ApiClient == null) {
        ApiClient = await presence.getPageletiable("ApiClient");
    }
    if (ApiClient && typeof ApiClient === "object") {
        if (ApiClient["_appName"] && ApiClient["_appName"] === APP_NAME) {
            return true;
        }
    }
    return false;
}
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
function getUserId() {
    try {
        return ApiClient["_currentUser"]["Id"];
    }
    catch (e) {
        const servers = JSON.parse(localStorage.getItem("servercredentials3"))
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
async function obtainMediaInfo(itemId) {
    if (media[itemId]) {
        if (media[itemId] !== "pending") {
            return media[itemId];
        }
        return;
    }
    media[itemId] = "pending";
    fetch(`/emby/Users/${getUserId()}/Items/${itemId}`, {
        credentials: "include",
        headers: {
            "x-emby-authorization": `MediaBrowser Client="${ApiClient["_appName"]}", Device="${ApiClient["_deviceName"]}", DeviceId="${ApiClient["_deviceId"]}", Version="${ApiClient["_appVersion"]}", Token="${ApiClient["_serverInfo"]["AccessToken"]}"`
        }
    })
        .then((resp) => resp.json())
        .then((json) => {
        media[itemId] = json;
        return media[itemId];
    });
}
async function handleVideoPlayback() {
    const videoPlayerPage = document.querySelector("[data-type='video-osd']");
    if (videoPlayerPage === null) {
        return;
    }
    const videoPlayerElem = document.getElementsByTagName("video")[0];
    let title;
    let subtitle;
    const headerTitleElem = videoPlayerPage.querySelector("h3.videoOsdTitle");
    const osdParentTitleElem = videoPlayerPage.querySelector("h2.videoOsdParentTitle");
    let mediaInfo;
    const videoPlayerContainerElem = document.body.getElementsByClassName("videoPlayerContainer")[0];
    if (videoPlayerContainerElem.style.backgroundImage) {
        const mediaId = videoPlayerContainerElem.style.backgroundImage
            .split('"')[1]
            .split("/")[5];
        mediaInfo = await obtainMediaInfo(mediaId);
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
                subtitle = osdParentTitleElem.textContent;
                break;
            case "Series":
                title = `Watching ${headerTitleElem.textContent}`;
                subtitle = osdParentTitleElem.textContent;
                break;
            case "TvChannel":
                title = "Watching Live Tv";
                subtitle = osdParentTitleElem.textContent;
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
        case "startup/login.html":
        case "startup/manuallogin.html":
        case "startup/forgotpassword.html":
            presenceData.state = "Logging in";
            break;
        case "home":
            presenceData.state = "At home";
            break;
        case "search":
            presenceData.state = "Searching";
            presenceData.smallImageKey = PRESENCE_ART_ASSETS.search;
            break;
        case "settings":
        case "settings/display.html":
        case "settings/homescreen.html":
        case "settings/playback.html":
        case "settings/subtitles.html":
        case "settings/profile.html":
        case "settings/password.html":
        case "settings/keyboard.html":
            presenceData.state = "On user preferences";
            break;
        case "dashboard":
        case "dashboardgeneral.html":
        case "users":
        case "useredit.html":
        case "userlibraryaccess.html":
        case "userparentalcontrol.html":
        case "userpassword.html":
        case "supporterkey.html":
        case "librarysetup/library.html":
        case "librarysetup/advanced.html":
        case "network":
        case "transcoding":
        case "syncactivity.html":
        case "syncsettings.html":
        case "configurationpage":
        case "devices":
        case "devices/device.html":
        case "devices/cameraupload.html":
        case "livetvsetup/livetvstatus.html":
        case "livetvsetup/livetvtuner.html":
        case "livetvsetup/guideprovider.html":
        case "livetvsetup/livetvsettings.html":
        case "logs":
        case "notificationsettings.html":
        case "plugins/plugins.html":
        case "plugins/plugincatalog.html":
        case "plugins/addplugin.html":
        case "scheduledtasks":
        case "scheduledtask":
        case "apikeys":
            presenceData.state = "On admin dashboard";
            break;
        case "movies":
            presenceData.state = "Browsing movies";
            break;
        case "tv":
            presenceData.state = "Browsing tv series";
            break;
        case "music":
            presenceData.state = "Browsing music";
            break;
        case "metadatamanager":
            presenceData.state = "Editing media metadata";
            break;
        case "item":
            await handleItemDetails();
            break;
        case "videoosd/videoosd.html":
            await handleVideoPlayback();
            break;
        default:
            if (path.substr(0, 3) === "dlg") {
            }
            else
                PMD_info(`path: ${path}`);
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
async function updateData() {
    setDefaultsToPresence();
    let showPresence = false;
    if (location.host.toLowerCase() === EMBY_URL) {
        showPresence = true;
        handleOfficialWebsite();
    }
    else if (await isEmbyWebClient()) {
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
    if (location.host === EMBY_URL) {
        validPage = true;
        PMD_info("Emby website detected");
    }
    else {
        try {
            const data = JSON.parse(localStorage.getItem("servercredentials3"));
            for (const server of data.Servers) {
                if (Date.now() - new Date(server.DateLastAccessed).getTime() <
                    30 * 1000) {
                    validPage = true;
                    PMD_info("Emby web client detected");
                }
            }
        }
        catch (e) {
            validPage = false;
        }
    }
    if (validPage) {
        presence = new Presence({
            clientId: "671807692297207828"
        });
        presence.on("UpdateData", updateData);
    }
}
init();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxNQUFNLFFBQVEsR0FBRyxZQUFZLENBQUM7QUFHOUIsTUFBTSxRQUFRLEdBQUcsVUFBVSxDQUFDO0FBRzVCLE1BQU0sbUJBQW1CLEdBQUc7SUFDMUIsUUFBUSxFQUFFLGFBQWE7SUFDdkIsSUFBSSxFQUFFLE1BQU07SUFDWixJQUFJLEVBQUUsYUFBYTtJQUNuQixLQUFLLEVBQUUsT0FBTztJQUNkLElBQUksRUFBRSxNQUFNO0lBQ1osSUFBSSxFQUFFLFNBQVM7SUFDZixNQUFNLEVBQUUsUUFBUTtJQUNoQixLQUFLLEVBQUUsU0FBUztDQUNqQixDQUFDO0FBR0YsTUFBTSxpQkFBaUIsR0FBRyxtREFBbUQsQ0FBQztBQU85RSxTQUFTLFFBQVEsQ0FBQyxPQUFPO0lBQ3ZCLE9BQU8sQ0FBQyxHQUFHLENBQ1QsbUJBQW1CLEdBQUcsT0FBTyxFQUM3QixpQkFBaUIsR0FBRyxvREFBb0QsRUFDeEUsaUJBQWlCLEdBQUcsb0RBQW9ELEVBQ3hFLGVBQWUsQ0FDaEIsQ0FBQztBQUNKLENBQUM7QUFFRCxJQUFJLFFBQVEsRUFBRSxTQUFTLENBQUM7QUFDeEIsTUFBTSxZQUFZLEdBQWlCO0lBQ2pDLGFBQWEsRUFBRSxtQkFBbUIsQ0FBQyxJQUFJO0NBQ3hDLENBQUM7QUFHRixNQUFNLEtBQUssR0FBRyxFQUFFLENBQUM7QUFLakIsU0FBUyxxQkFBcUI7SUFDNUIsWUFBWSxDQUFDLE9BQU8sR0FBRyxNQUFNLFFBQVEsRUFBRSxDQUFDO0lBRXhDLFFBQVEsUUFBUSxDQUFDLFFBQVEsRUFBRTtRQUN6QixLQUFLLEdBQUcsQ0FBQztRQUNULEtBQUssYUFBYTtZQUNoQixZQUFZLENBQUMsS0FBSyxHQUFHLGlCQUFpQixDQUFDO1lBQ3ZDLE1BQU07UUFDUixLQUFLLGFBQWE7WUFDaEIsWUFBWSxDQUFDLEtBQUssR0FBRyxlQUFlLENB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