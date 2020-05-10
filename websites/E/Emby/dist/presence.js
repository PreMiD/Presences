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
let presence, ApiClient, ApiClientt;
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
        return ApiClientt["_currentUser"]["Id"];
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
            if (path.substr(0, 3) !== "dlg") {
                PMD_info(`path: ${path}`);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxNQUFNLFFBQVEsR0FBRyxZQUFZLENBQUM7QUFHOUIsTUFBTSxRQUFRLEdBQUcsVUFBVSxDQUFDO0FBRzVCLE1BQU0sbUJBQW1CLEdBQUc7SUFDMUIsUUFBUSxFQUFFLGFBQWE7SUFDdkIsSUFBSSxFQUFFLE1BQU07SUFDWixJQUFJLEVBQUUsYUFBYTtJQUNuQixLQUFLLEVBQUUsT0FBTztJQUNkLElBQUksRUFBRSxNQUFNO0lBQ1osSUFBSSxFQUFFLFNBQVM7SUFDZixNQUFNLEVBQUUsUUFBUTtJQUNoQixLQUFLLEVBQUUsU0FBUztDQUNqQixDQUFDO0FBR0YsTUFBTSxpQkFBaUIsR0FBRyxtREFBbUQsQ0FBQztBQU85RSxTQUFTLFFBQVEsQ0FBQyxPQUFPO0lBQ3ZCLE9BQU8sQ0FBQyxHQUFHLENBQ1QsbUJBQW1CLEdBQUcsT0FBTyxFQUM3QixpQkFBaUIsR0FBRyxvREFBb0QsRUFDeEUsaUJBQWlCLEdBQUcsb0RBQW9ELEVBQ3hFLGVBQWUsQ0FDaEIsQ0FBQztBQUNKLENBQUM7QUFFRCxJQUFJLFFBQVEsRUFBRSxTQUFTLEVBQUUsVUFBVSxDQUFDO0FBQ3BDLE1BQU0sWUFBWSxHQUFpQjtJQUNqQyxhQUFhLEVBQUUsbUJBQW1CLENBQUMsSUFBSTtDQUN4QyxDQUFDO0FBR0YsTUFBTSxLQUFLLEdBQUcsRUFBRSxDQUFDO0FBS2pCLFNBQVMscUJBQXFCO0lBQzVCLFlBQVksQ0FBQyxPQUFPLEdBQUcsTUFBTSxRQUFRLEVBQUUsQ0FBQztJQUV4QyxRQUFRLFFBQVEsQ0FBQyxRQUFRLEVBQUU7UUFDekIsS0FBSyxHQUFHLENBQUM7UUFDVCxLQUFLLGFBQWE7WUFDaEIsWUFBWSxDQUFDLEtBQUssR0FBRyxpQkFBaUIsQ0FBQztZQUN2QyxNQUFNO1FBQ1IsS0FBSyxhQUFhO1lBQ2hCLFlBQVksQ0FBQyxLQUFLLEdB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