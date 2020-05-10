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
    let ApiClientt;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxNQUFNLFFBQVEsR0FBRyxZQUFZLENBQUM7QUFHOUIsTUFBTSxRQUFRLEdBQUcsVUFBVSxDQUFDO0FBRzVCLE1BQU0sbUJBQW1CLEdBQUc7SUFDMUIsUUFBUSxFQUFFLGFBQWE7SUFDdkIsSUFBSSxFQUFFLE1BQU07SUFDWixJQUFJLEVBQUUsYUFBYTtJQUNuQixLQUFLLEVBQUUsT0FBTztJQUNkLElBQUksRUFBRSxNQUFNO0lBQ1osSUFBSSxFQUFFLFNBQVM7SUFDZixNQUFNLEVBQUUsUUFBUTtJQUNoQixLQUFLLEVBQUUsU0FBUztDQUNqQixDQUFDO0FBR0YsTUFBTSxpQkFBaUIsR0FBRyxtREFBbUQsQ0FBQztBQU85RSxTQUFTLFFBQVEsQ0FBQyxPQUFPO0lBQ3ZCLE9BQU8sQ0FBQyxHQUFHLENBQ1QsbUJBQW1CLEdBQUcsT0FBTyxFQUM3QixpQkFBaUIsR0FBRyxvREFBb0QsRUFDeEUsaUJBQWlCLEdBQUcsb0RBQW9ELEVBQ3hFLGVBQWUsQ0FDaEIsQ0FBQztBQUNKLENBQUM7QUFFRCxJQUFJLFFBQVEsRUFBRSxTQUFTLENBQUM7QUFDeEIsTUFBTSxZQUFZLEdBQWlCO0lBQ2pDLGFBQWEsRUFBRSxtQkFBbUIsQ0FBQyxJQUFJO0NBQ3hDLENBQUM7QUFHRixNQUFNLEtBQUssR0FBRyxFQUFFLENBQUM7QUFLakIsU0FBUyxxQkFBcUI7SUFDNUIsWUFBWSxDQUFDLE9BQU8sR0FBRyxNQUFNLFFBQVEsRUFBRSxDQUFDO0lBRXhDLFFBQVEsUUFBUSxDQUFDLFFBQVEsRUFBRTtRQUN6QixLQUFLLEdBQUcsQ0FBQztRQUNULEtBQUssYUFBYTtZQUNoQixZQUFZLENBQUMsS0FBSyxHQUFHLGlCQUFpQixDQUFDO1lBQ3ZDLE1BQU07UUFDUixLQUFLLGFBQWE7WUFDaEIsWUFBWSxDQUFDLEtBQUssR0FBRyxlQUFlLENBQUM7WUFDckMsTUFBTTtRQUNSLEtBQUssWUFBWTtZQUNmLFlBQVksQ0FBQyxLQUFLLEdBQUcsa0JBQWtCLENBQUM7WUFDeEMsWUFBWSxDQUFDLGFBQWEsR0FBRyxtQkFBbUIsQ0FBQyxJQUFJLENBQUM7WUFDdEQsTUFBTTtRQUNSLEtBQUssZ0JBQWdCO1lBQ25CLFlBQVksQ0FBQyxLQUFLLEdBQUcsY0FBYyxDQUFDO1lBQ3BDLFlBQVksQ0FBQyxhQUFhLEdBQUcsbUJBQW1CLENBQUMsUUFBUSxDQUFDO1lBQzFELE1BQU07UUFDUixLQUFLLGdCQUFnQixDQUFDO1FBQ3RCLEtBQUssb0JBQW9CLENBQUM7UUFDMUIsS0FBSyxxQkFBcUI7WUFDeEIsWUFBWSxDQUFDLEtBQUssR0FBRyx5QkFBeUIsQ0FBQztZQUMvQyxNQUFNO1FBQ1IsS0FBSyxlQUFlO1lBQ2xCLFlBQVksQ0FBQyxLQUFLLEdBQUcsaUJBQWlCLENBQUM7WUFDdkMsTUFBTTtRQUNSO1lBRUUsSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsRUFBRTtnQkFDOUMsWUFBWSxDQUFDLEtBQUssR0FBRyxtQkFBbUIsQ0FBQzthQUMxQztpQkFBTSxJQUNMLFFBQVEsQ0FBQyxhQUFhLENBQUMsa0JBQWtCLENBQUM7Z0JBQzFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxXQUFXLEtBQUssV0FBVyxFQUN0RTtnQkFDQSxZQUFZLENBQUMsS0FBSyxHQUFHLGtCQUFrQixDQUFDO2dCQUN4QyxZQUFZLENBQUMsYUFBYSxHQUFHLG1CQUFtQixDQUFDLElBQUksQ0FBQzthQUN2RDtLQUNKO0FBQ0gsQ0FBQztBQVFELEtBQUssVUFBVSxlQUFlO0lBQzVCLElBQUksVUFBVSxDQUFDO0lBQ2YsSUFBSSxDQUFDLFNBQVMsRUFBRTtRQUNkLFVBQVUsR0FBRyxNQUFNLFFBQVEsQ0FBQyxlQUFlLENBQUMsV0FBVyxDQUFDLENBQUM7S0FDMUQ7U0FBTTtRQUNMLFVBQVUsR0FBRyxTQUFTLENBQUM7S0FDeEI7SUFFRCxJQUFJLFVBQVUsSUFBSSxPQUFPLFVBQVUsS0FBSyxRQUFRLEVBQUU7UUFDaEQsSUFBSSxVQUFVLENBQUMsVUFBVSxDQUFDLElBQUksVUFBVSxDQUFDLFVBQVUsQ0FBQyxLQUFLLFFBQVEsRUFBRTtZQUNqRSxPQUFPLElBQUksQ0FBQztTQUNiO0tBQ0Y7SUFFRCxPQUFPLEtBQUssQ0FBQztBQUNmLENBQUM7QUFLRCxTQUFTLG1CQUFtQjtJQUUxQixJQUFJO1FBQ0YsTUFBTSxTQUFTLEdBQUcsUUFBUSxDQUFDLG9CQUFvQixDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzVELE1BQU0sYUFBYSxHQUFHLFFBQVEsQ0FBQyxzQkFBc0IsQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUMxRSxNQUFNLE9BQU8sR0FBRyxhQUFhLENBQUMsZ0JBQWdCLENBQUMsbUJBQW1CLENBQUMsQ0FBQztRQUVwRSxZQUFZLENBQUMsT0FBTyxHQUFHLGlCQUNyQixPQUFPLENBQUMsTUFBTSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsZUFDakQsRUFBRSxDQUFDO1FBQ0gsWUFBWSxDQUFDLEtBQUssR0FBRyxPQUNuQixPQUFPLENBQUMsTUFBTSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsZ0JBQ2pELEVBQUUsQ0FBQztRQUdILElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxFQUFFO1lBQ3JCLFlBQVksQ0FBQyxhQUFhLEdBQUcsbUJBQW1CLENBQUMsSUFBSSxDQUFDO1lBQ3RELFlBQVksQ0FBQyxjQUFjLEdBQUcsU0FBUyxDQUFDO1lBQ3hDLFlBQVksQ0FBQyxZQUFZLEdBQUcsSUFBSSxJQUFJLENBQ2xDLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLFNBQVMsQ0FBQyxRQUFRLEdBQUcsU0FBUyxDQUFDLFdBQVcsQ0FBQyxHQUFHLElBQUksQ0FDakUsQ0FBQyxPQUFPLEVBQUUsQ0FBQztTQUdiO2FBQU07WUFDTCxZQUFZLENBQUMsYUFBYSxHQUFHLG1CQUFtQixDQUFDLEtBQUssQ0FBQztZQUN2RCxZQUFZLENBQUMsY0FBYyxHQUFHLFFBQVEsQ0FBQztZQUN2QyxPQUFPLFlBQVksQ0FBQyxZQUFZLENBQUM7U0FDbEM7S0FDRjtJQUFDLE9BQU8sQ0FBQyxFQUFFO0tBRVg7QUFDSCxDQUFDO0FBT0QsU0FBUyxTQUFTO0lBQ2hCLElBQUk7UUFDRixPQUFPLFNBQVMsQ0FBQyxjQUFjLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUN4QztJQUFDLE9BQU8sQ0FBQyxFQUFFO1FBQ1YsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLG9CQUFvQixDQUFDLENBQUM7YUFDbkUsT0FBTyxDQUFDO1FBR1gsSUFBSSxRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUU7WUFDbEMsS0FBSyxNQUFNLEtBQUssSUFBSSxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUU7Z0JBQzFELElBQUksS0FBSyxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsRUFBRTtvQkFDaEMsTUFBTSxRQUFRLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFFckMsS0FBSyxNQUFNLE1BQU0sSUFBSSxPQUFPLEVBQUU7d0JBQzVCLElBQUksTUFBTSxDQUFDLEVBQUUsS0FBSyxRQUFRLEVBQUU7NEJBQzFCLE9BQU8sTUFBTSxDQUFDLE1BQU0sQ0FBQzt5QkFDdEI7cUJBQ0Y7aUJBQ0Y7YUFDRjtTQUNGO2FBQU07WUFDTCxPQUFPLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUM7U0FDMUI7S0FDRjtBQUNILENBQUM7QUFRRCxLQUFLLFVBQVUsZUFBZSxDQUFDLE1BQU07SUFDbkMsSUFBSSxLQUFLLENBQUMsTUFBTSxDQUFDLEVBQUU7UUFDakIsSUFBSSxLQUFLLENBQUMsTUFBTSxDQUFDLEtBQUssU0FBUyxFQUFFO1lBQy9CLE9BQU8sS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1NBQ3RCO1FBRUQsT0FBTztLQUNSO0lBRUQsS0FBSyxDQUFDLE1BQU0sQ0FBQyxHQUFHLFNBQVMsQ0FBQztJQUMxQixLQUFLLENBQUMsZUFBZSxTQUFTLEVBQUUsVUFBVSxNQUFNLEVBQUUsRUFBRTtRQUNsRCxXQUFXLEVBQUUsU0FBUztRQUN0QixPQUFPLEVBQUU7WUFDUCxzQkFBc0IsRUFBRSx3QkFBd0IsU0FBUyxDQUFDLFVBQVUsQ0FBQyxjQUFjLFNBQVMsQ0FBQyxhQUFhLENBQUMsZ0JBQWdCLFNBQVMsQ0FBQyxXQUFXLENBQUMsZUFBZSxTQUFTLENBQUMsYUFBYSxDQUFDLGFBQWEsU0FBUyxDQUFDLGFBQWEsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxHQUFHO1NBQ2hQO0tBQ0YsQ0FBQztTQUNDLElBQUksQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO1NBQzNCLElBQUksQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO1FBQ2IsS0FBSyxDQUFDLE1BQU0sQ0FBQyxHQUFHLElBQUksQ0FBQztRQUNyQixPQUFPLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUN2QixDQUFDLENBQUMsQ0FBQztBQUNQLENBQUM7QUFLRCxLQUFLLFVBQVUsbUJBQW1CO0lBQ2hDLE1BQU0sZUFBZSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMseUJBQXlCLENBQUMsQ0FBQztJQUUxRSxJQUFJLGVBQWUsS0FBSyxJQUFJLEVBQUU7UUFFNUIsT0FBTztLQUNSO0lBRUQsTUFBTSxlQUFlLEdBQUcsUUFBUSxDQUFDLG9CQUFvQixDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBR2xFLElBQUksS0FBSyxDQUFDO0lBQ1YsSUFBSSxRQUFRLENBQUM7SUFHYixNQUFNLGVBQWUsR0FBRyxlQUFlLENBQUMsYUFBYSxDQUFDLGtCQUFrQixDQUFDLENBQUM7SUFHMUUsTUFBTSxrQkFBa0IsR0FBRyxlQUFlLENBQUMsYUFBYSxDQUN0RCx3QkFBd0IsQ0FDekIsQ0FBQztJQUdGLElBQUksU0FBUyxDQUFDO0lBRWQsTUFBTSx3QkFBd0IsR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDLHNCQUFzQixDQUNuRSxzQkFBc0IsQ0FDdkIsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUdMLElBQUssd0JBQTZDLENBQUMsS0FBSyxDQUFDLGVBQWUsRUFBRTtRQUV4RSxNQUFNLE9BQU8sR0FBSSx3QkFBNkMsQ0FBQyxLQUFLLENBQUMsZUFBZTthQUNqRixLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQ2IsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRWpCLFNBQVMsR0FBRyxNQUFNLGVBQWUsQ0FBQyxPQUFPLENBQUMsQ0FBQztLQUM1QztTQUFNO1FBRUwsU0FBUyxHQUFHO1lBQ1YsSUFBSSxFQUFFLFdBQVc7U0FDbEIsQ0FBQztLQUNIO0lBR0QsSUFBSSxDQUFDLFNBQVMsRUFBRTtRQUNkLEtBQUssR0FBRywwQkFBMEIsQ0FBQztRQUNuQyxRQUFRLEdBQUcsK0JBQStCLENBQUM7S0FDNUM7U0FBTTtRQUNMLFFBQVEsU0FBUyxDQUFDLElBQUksRUFBRTtZQUN0QixLQUFLLE9BQU87Z0JBQ1YsS0FBSyxHQUFHLGtCQUFrQixDQUFDO2dCQUMzQixRQUFRLEdBQUcsa0JBQWtCLENBQUMsV0FBVyxDQUFDO2dCQUMxQyxNQUFNO1lBQ1IsS0FBSyxRQUFRO2dCQUNYLEtBQUssR0FBRyxZQUFZLGVBQWUsQ0FBQyxXQUFXLEVBQUUsQ0FBQztnQkFDbEQsUUFBUSxHQUFHLGtCQUFrQixDQUFDLFdBQVcsQ0FBQztnQkFDMUMsTUFBTTtZQUNSLEtBQUssV0FBVztnQkFDZCxLQUFLLEdBQUcsa0JBQWtCLENBQUM7Z0JBQzNCLFFBQVEsR0FBRyxrQkFBa0IsQ0FBQyxXQUFXLENBQUM7Z0JBQzFDLE1BQU07WUFDUjtnQkFDRSxLQUFLLEdBQUcsWUFBWSxTQUFTLENBQUMsSUFBSSxFQUFFLENBQUM7Z0JBQ3JDLFFBQVEsR0FBRyxTQUFTLENBQUMsSUFBSSxDQUFDO1NBQzdCO0tBQ0Y7SUFHRCxJQUFJLFNBQVMsSUFBSSxTQUFTLENBQUMsSUFBSSxLQUFLLFdBQVcsRUFBRTtRQUMvQyxZQUFZLENBQUMsYUFBYSxHQUFHLG1CQUFtQixDQUFDLElBQUksQ0FBQztRQUN0RCxZQUFZLENBQUMsY0FBYyxHQUFHLFNBQVMsQ0FBQztLQUd6QztTQUFNLElBQUksQ0FBQyxlQUFlLENBQUMsTUFBTSxFQUFFO1FBQ2xDLFlBQVksQ0FBQyxhQUFhLEdBQUcsbUJBQW1CLENBQUMsSUFBSSxDQUFDO1FBQ3RELFlBQVksQ0FBQyxjQUFjLEdBQUcsU0FBUyxDQUFDO1FBQ3hDLFlBQVksQ0FBQyxZQUFZLEdBQUcsSUFBSSxJQUFJLENBQ2xDLElBQUksQ0FBQyxHQUFHLEVBQUU7WUFDUixDQUFDLGVBQWUsQ0FBQyxRQUFRLEdBQUcsZUFBZSxDQUFDLFdBQVcsQ0FBQyxHQUFHLElBQUksQ0FDbEUsQ0FBQyxPQUFPLEVBQUUsQ0FBQztLQUdiO1NBQU07UUFDTCxZQUFZLENBQUMsYUFBYSxHQUFHLG1CQUFtQixDQUFDLEtBQUssQ0FBQztRQUN2RCxZQUFZLENBQUMsY0FBYyxHQUFHLFFBQVEsQ0FBQztRQUN2QyxPQUFPLFlBQVksQ0FBQyxZQUFZLENBQUM7S0FDbEM7SUFFRCxZQUFZLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztJQUM3QixZQUFZLENBQUMsS0FBSyxHQUFHLFFBQVEsQ0FBQztJQUU5QixJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssRUFBRTtRQUN2QixPQUFPLFlBQVksQ0FBQyxLQUFLLENBQUM7S0FDM0I7QUFDSCxDQUFDO0FBS0QsS0FBSyxVQUFVLGlCQUFpQjtJQUM5QixNQUFNLE1BQU0sR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDdEQsSUFBSSxFQUFFLENBQUM7SUFFUCxLQUFLLE1BQU0sS0FBSyxJQUFJLE1BQU0sRUFBRTtRQUMxQixJQUFJLEtBQUssQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDM0IsRUFBRSxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDekIsTUFBTTtTQUNQO0tBQ0Y7SUFFRCxNQUFNLElBQUksR0FBRyxNQUFNLGVBQWUsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUV2QyxJQUFJLENBQUMsSUFBSSxFQUFFO1FBQ1QsWUFBWSxDQUFDLE9BQU8sR0FBRyw2QkFBNkIsQ0FBQztRQUNyRCxZQUFZLENBQUMsS0FBSyxHQUFHLDRCQUE0QixDQUFDO0tBQ25EO1NBQU07UUFDTCxZQUFZLENBQUMsT0FBTyxHQUFHLHdCQUF3QixJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7UUFFM0QsUUFBUSxJQUFJLENBQUMsSUFBSSxFQUFFO1lBQ2pCLEtBQUssT0FBTztnQkFDVixZQUFZLENBQUMsS0FBSyxHQUFHLEdBQUcsSUFBSSxDQUFDLElBQUksTUFBTSxJQUFJLENBQUMsYUFBYSxLQUFLLElBQUksQ0FBQyxjQUFjLEdBQUcsQ0FBQztnQkFDckYsTUFBTTtZQUNSLEtBQUssUUFBUTtnQkFDWCxZQUFZLENBQUMsS0FBSyxHQUFHLEdBQUcsSUFBSSxDQUFDLElBQUksT0FBTyxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUM7Z0JBQ3ZELE1BQU07WUFDUixLQUFLLFFBQVE7Z0JBQ1gsWUFBWSxDQUFDLEtBQUssR0FBRyxHQUFHLElBQUksQ0FBQyxJQUFJLE1BQU0sSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO2dCQUN6RCxNQUFNO1lBQ1IsS0FBSyxTQUFTO2dCQUNaLFlBQVksQ0FBQyxLQUFLLEdBQUcsR0FBRyxJQUFJLENBQUMsSUFBSSxNQUFNLElBQUksQ0FBQyxVQUFVLE1BQU0sSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO2dCQUM5RSxNQUFNO1lBQ1IsS0FBSyxRQUFRLENBQUMsQ0FBQztnQkFDYixJQUFJLFdBQVcsR0FBRywyQkFBMkIsQ0FBQztnQkFFOUMsSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFO29CQUNqQixXQUFXO3dCQUNULElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUM7NEJBQzNCLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO2lCQUM1QztnQkFDRCxZQUFZLENBQUMsS0FBSyxHQUFHLEdBQUcsSUFBSSxDQUFDLElBQUksTUFBTSxXQUFXLEVBQUUsQ0FBQztnQkFDckQsTUFBTTthQUNQO1lBQ0QsS0FBSyxZQUFZO2dCQUNmLFlBQVksQ0FBQyxLQUFLLEdBQUcsR0FBRyxJQUFJLENBQUMsSUFBSSxNQUFNLElBQUksQ0FBQyxrQkFBa0IsUUFBUSxDQUFDO2dCQUN2RSxNQUFNO1lBQ1IsS0FBSyxhQUFhLENBQUM7WUFDbkIsS0FBSyxXQUFXO2dCQUNkLFlBQVksQ0FBQyxLQUFLLEdBQUcsR0FBRyxJQUFJLENBQUMsSUFBSSxxQ0FBcUMsQ0FBQztnQkFDdkUsTUFBTTtZQUNSO2dCQUNFLFlBQVksQ0FBQyxLQUFLLEdBQUcsa0NBQWtDLENBQUM7U0FDM0Q7S0FDRjtBQUNILENBQUM7QUFLRCxLQUFLLFVBQVUsZUFBZTtJQUM1QixNQUFNLFVBQVUsR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDLG9CQUFvQixDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBRy9ELElBQ0UsVUFBVSxDQUFDLE1BQU0sR0FBRyxDQUFDO1FBQ3JCLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLGtCQUFrQixDQUFDO1FBQ3BELFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQ2pCO1FBQ0EsbUJBQW1CLEVBQUUsQ0FBQztRQUN0QixPQUFPO0tBQ1I7SUFFRCxZQUFZLENBQUMsT0FBTyxHQUFHLGVBQWUsQ0FBQztJQUl2QyxNQUFNLElBQUksR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFFbkQsUUFBUSxJQUFJLEVBQUU7UUFDWixLQUFLLG9CQUFvQixDQUFDO1FBQzFCLEtBQUssMEJBQTBCLENBQUM7UUFDaEMsS0FBSyw2QkFBNkI7WUFDaEMsWUFBWSxDQUFDLEtBQUssR0FBRyxZQUFZLENBQUM7WUFDbEMsTUFBTTtRQUNSLEtBQUssTUFBTTtZQUNULFlBQVksQ0FBQyxLQUFLLEdBQUcsU0FBUyxDQUFDO1lBQy9CLE1BQU07UUFDUixLQUFLLFFBQVE7WUFDWCxZQUFZLENBQUMsS0FBSyxHQUFHLFdBQVcsQ0FBQztZQUNqQyxZQUFZLENBQUMsYUFBYSxHQUFHLG1CQUFtQixDQUFDLE1BQU0sQ0FBQztZQUN4RCxNQUFNO1FBR1IsS0FBSyxVQUFVLENBQUM7UUFDaEIsS0FBSyx1QkFBdUIsQ0FBQztRQUM3QixLQUFLLDBCQUEwQixDQUFDO1FBQ2hDLEtBQUssd0JBQXdCLENBQUM7UUFDOUIsS0FBSyx5QkFBeUIsQ0FBQztRQUMvQixLQUFLLHVCQUF1QixDQUFDO1FBQzdCLEtBQUssd0JBQXdCLENBQUM7UUFDOUIsS0FBSyx3QkFBd0I7WUFDM0IsWUFBWSxDQUFDLEtBQUssR0FBRyxxQkFBcUIsQ0FBQztZQUMzQyxNQUFNO1FBR1IsS0FBSyxXQUFXLENBQUM7UUFDakIsS0FBSyx1QkFBdUIsQ0FBQztRQUM3QixLQUFLLE9BQU8sQ0FBQztRQUNiLEtBQUssZUFBZSxDQUFDO1FBQ3JCLEtBQUssd0JBQXdCLENBQUM7UUFDOUIsS0FBSywwQkFBMEIsQ0FBQztRQUNoQyxLQUFLLG1CQUFtQixDQUFDO1FBQ3pCLEtBQUssbUJBQW1CLENBQUM7UUFDekIsS0FBSywyQkFBMkIsQ0FBQztRQUNqQyxLQUFLLDRCQUE0QixDQUFDO1FBQ2xDLEtBQUssU0FBUyxDQUFDO1FBQ2YsS0FBSyxhQUFhLENBQUM7UUFDbkIsS0FBSyxtQkFBbUIsQ0FBQztRQUN6QixLQUFLLG1CQUFtQixDQUFDO1FBQ3pCLEtBQUssbUJBQW1CLENBQUM7UUFDekIsS0FBSyxTQUFTLENBQUM7UUFDZixLQUFLLHFCQUFxQixDQUFDO1FBQzNCLEtBQUssMkJBQTJCLENBQUM7UUFDakMsS0FBSywrQkFBK0IsQ0FBQztRQUNyQyxLQUFLLDhCQUE4QixDQUFDO1FBQ3BDLEtBQUssZ0NBQWdDLENBQUM7UUFDdEMsS0FBSyxpQ0FBaUMsQ0FBQztRQUN2QyxLQUFLLE1BQU0sQ0FBQztRQUNaLEtBQUssMkJBQTJCLENBQUM7UUFDakMsS0FBSyxzQkFBc0IsQ0FBQztRQUM1QixLQUFLLDRCQUE0QixDQUFDO1FBQ2xDLEtBQUssd0JBQXdCLENBQUM7UUFDOUIsS0FBSyxnQkFBZ0IsQ0FBQztRQUN0QixLQUFLLGVBQWUsQ0FBQztRQUNyQixLQUFLLFNBQVM7WUFDWixZQUFZLENBQUMsS0FBSyxHQUFHLG9CQUFvQixDQUFDO1lBQzFDLE1BQU07UUFFUixLQUFLLFFBQVE7WUFDWCxZQUFZLENBQUMsS0FBSyxHQUFHLGlCQUFpQixDQUFDO1lBQ3ZDLE1BQU07UUFFUixLQUFLLElBQUk7WUFDUCxZQUFZLENBQUMsS0FBSyxHQUFHLG9CQUFvQixDQUFDO1lBQzFDLE1BQU07UUFFUixLQUFLLE9BQU87WUFDVixZQUFZLENBQUMsS0FBSyxHQUFHLGdCQUFnQixDQUFDO1lBQ3RDLE1BQU07UUFFUixLQUFLLGlCQUFpQjtZQUNwQixZQUFZLENBQUMsS0FBSyxHQUFHLHdCQUF3QixDQUFDO1lBQzlDLE1BQU07UUFFUixLQUFLLE1BQU07WUFDVCxNQUFNLGlCQUFpQixFQUFFLENBQUM7WUFDMUIsTUFBTTtRQUVSLEtBQUssd0JBQXdCO1lBQzNCLE1BQU0sbUJBQW1CLEVBQUUsQ0FBQztZQUM1QixNQUFNO1FBRVI7WUFDRSxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLEtBQUssRUFBRTtnQkFDL0IsUUFBUSxDQUFDLFNBQVMsSUFBSSxFQUFFLENBQUMsQ0FBQzthQUMzQjtLQUNKO0FBQ0gsQ0FBQztBQUtELFNBQVMscUJBQXFCO0lBQzVCLElBQUksWUFBWSxDQUFDLGFBQWEsRUFBRTtRQUM5QixPQUFPLFlBQVksQ0FBQyxhQUFhLENBQUM7S0FDbkM7SUFDRCxJQUFJLFlBQVksQ0FBQyxjQUFjLEVBQUU7UUFDL0IsT0FBTyxZQUFZLENBQUMsY0FBYyxDQUFDO0tBQ3BDO0lBQ0QsSUFBSSxZQUFZLENBQUMsY0FBYyxFQUFFO1FBQy9CLE9BQU8sWUFBWSxDQUFDLGNBQWMsQ0FBQztLQUNwQztJQUNELElBQUksWUFBWSxDQUFDLFlBQVksRUFBRTtRQUM3QixPQUFPLFlBQVksQ0FBQyxZQUFZLENBQUM7S0FDbEM7QUFDSCxDQUFDO0FBS0QsS0FBSyxVQUFVLFVBQVU7SUFDdkIscUJBQXFCLEVBQUUsQ0FBQztJQUV4QixJQUFJLFlBQVksR0FBRyxLQUFLLENBQUM7SUFHekIsSUFBSSxRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxLQUFLLFFBQVEsRUFBRTtRQUM1QyxZQUFZLEdBQUcsSUFBSSxDQUFDO1FBQ3BCLHFCQUFxQixFQUFFLENBQUM7S0FHekI7U0FBTSxJQUFJLE1BQU0sZUFBZSxFQUFFLEVBQUU7UUFDbEMsWUFBWSxHQUFHLElBQUksQ0FBQztRQUNwQixNQUFNLGVBQWUsRUFBRSxDQUFDO0tBQ3pCO0lBR0QsSUFBSSxDQUFDLFlBQVksQ0FBQyxjQUFjLElBQUksQ0FBQyxZQUFZLENBQUMsWUFBWSxFQUFFO1FBQzlELFlBQVksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO0tBQzFDO0lBR0QsSUFBSSxZQUFZLEVBQUU7UUFDaEIsSUFBSSxZQUFZLENBQUMsT0FBTyxJQUFJLElBQUksRUFBRTtZQUNoQyxRQUFRLENBQUMsWUFBWSxFQUFFLENBQUM7WUFDeEIsUUFBUSxDQUFDLFdBQVcsRUFBRSxDQUFDO1NBQ3hCO2FBQU07WUFDTCxRQUFRLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxDQUFDO1NBQ3BDO0tBQ0Y7QUFDSCxDQUFDO0FBT0QsS0FBSyxVQUFVLElBQUk7SUFDakIsSUFBSSxTQUFTLEdBQUcsS0FBSyxDQUFDO0lBR3RCLElBQUksUUFBUSxDQUFDLElBQUksS0FBSyxRQUFRLEVBQUU7UUFDOUIsU0FBUyxHQUFHLElBQUksQ0FBQztRQUNqQixRQUFRLENBQUMsdUJBQXVCLENBQUMsQ0FBQztLQUduQztTQUFNO1FBQ0wsSUFBSTtZQUNGLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLENBQUM7WUFFcEUsS0FBSyxNQUFNLE1BQU0sSUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFO2dCQUVqQyxJQUNFLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxPQUFPLEVBQUU7b0JBQ3hELEVBQUUsR0FBRyxJQUFJLEVBQ1Q7b0JBQ0EsU0FBUyxHQUFHLElBQUksQ0FBQztvQkFDakIsUUFBUSxDQUFDLDBCQUEwQixDQUFDLENBQUM7aUJBQ3RDO2FBQ0Y7U0FDRjtRQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQ1YsU0FBUyxHQUFHLEtBQUssQ0FBQztTQUNuQjtLQUNGO0lBRUQsSUFBSSxTQUFTLEVBQUU7UUFDYixRQUFRLEdBQUcsSUFBSSxRQUFRLENBQUM7WUFDdEIsUUFBUSxFQUFFLG9CQUFvQjtTQUMvQixDQUFDLENBQUM7UUFFSCxRQUFRLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxVQUFVLENBQUMsQ0FBQztLQUN2QztBQUNILENBQUM7QUFDRCxJQUFJLEVBQUUsQ0FBQyJ9