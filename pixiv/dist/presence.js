var presence = new Presence({
    clientId: "640234287525920834"
}), strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
});
var browsingStamp = Math.floor(Date.now() / 1000);
var user;
var title;
var replace;
var search;
var typeURL = new URL(document.location.href);
var typeResult = typeURL.searchParams.get("type");
presence.on("UpdateData", async () => {
    let presenceData = {
        largeImageKey: "pix"
    };
    if (document.location.hostname == "www.pixiv.net") {
        if (document.location.pathname == "/" ||
            document.location.pathname == "/en/") {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing home page";
        }
        else if (document.querySelector("#root > div:nth-child(2) > div > div > div > div:nth-child(2) > div > div > div:nth-child(2) > div > h1") !== null) {
            presenceData.startTimestamp = browsingStamp;
            user = document.querySelector("#root > div:nth-child(2) > div > div > div > div:nth-child(2) > div > div > div:nth-child(2) > div > h1");
            presenceData.details = "Viewing user:";
            presenceData.state = user.innerText;
        }
        else if (document.location.pathname.includes("/novel/")) {
            if (document.querySelector("#root > div > div > div > main > section > div:nth-child(1) > div > div:nth-child(2) > h1") !== null) {
                title = document.querySelector("#root > div > div > div > main > section > div:nth-child(1) > div > div:nth-child(2) > h1");
                presenceData.startTimestamp = browsingStamp;
                presenceData.details = "Viewing novel:";
                presenceData.state = title.innerText;
            }
            else {
                presenceData.startTimestamp = browsingStamp;
                presenceData.details = "Browsing for novels...";
            }
        }
        else if (document.location.pathname.includes("/artworks")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing artwork:";
            presenceData.state = document.querySelector("#root > div:nth-child(2) > div > div > main > section > div > div > figcaption > div > div > h1").textContent;
        }
        else if (document.location.pathname.includes("/ranking")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing:";
            presenceData.state = document.querySelector("#wrapper > div.layout-body > div > h1 > a").textContent;
        }
        else if (document.location.pathname.includes("/history.php")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Browsing History";
        }
        else if (document.location.pathname.includes("/bookmark")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing bookmarks";
        }
        else if (document.location.pathname.includes("/mypixiv_all.php")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Browsing My pixiv";
        }
        else if (document.location.pathname.includes("/stacc")) {
            presenceData.startTimestamp = browsingStamp;
            user = document.querySelector("#stacc_center_title");
            presenceData.details = "Browsing Feed";
            presenceData.state = user.innerText;
        }
        else if (document.location.pathname.includes("/fanbox")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing fanbox";
        }
        else if (document.location.pathname.includes("/event/")) {
            if (document.querySelector("#contents > div.pane.full.group > h1") !== null) {
                presenceData.startTimestamp = browsingStamp;
                presenceData.details = "Viewing event:";
                presenceData.state = document.querySelector("#contents > div.pane.full.group > h1").textContent;
            }
            else {
                presenceData.startTimestamp = browsingStamp;
                presenceData.details = "Browsing events...";
            }
        }
        else if (document.location.pathname.includes("/event_add")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Ready to create an event";
        }
        else if (document.location.pathname.includes("/profile_event")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Manage event...";
        }
        else if (document.location.pathname.includes("/tag")) {
            title = document.querySelector("#container > div.page > div.main-wrap > div.profile > section > header > h1");
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing tag:";
            presenceData.state = title.innerText;
        }
        else if (document.location.pathname.includes("/search")) {
            search = document.querySelector("#wrapper > div.layout-body > div > div.column-header > div > h1 > a");
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Searching for:";
            presenceData.state = search.innerText;
            presenceData.smallImageKey = "search";
        }
        else if (document.location.pathname.includes("/setting_user.php")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "User settings";
            presenceData.state = "Basic settings";
        }
        else if (document.location.pathname.includes("/setting_social_login.php")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "User settings";
            presenceData.state = "Link other accounts to pixiv";
        }
        else if (document.location.pathname.includes("/setting_sns_post")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "User settings";
            presenceData.state = "Post on social media";
        }
        else if (document.location.pathname.includes("/setting_profile.php")) {
            presenceData.details = "Profile settings";
            presenceData.state = "Profile information";
        }
        else if (document.location.pathname.includes("/setting_profile_img.php")) {
            presenceData.details = "Profile settings";
            presenceData.state = "Profile images";
        }
        else if (document.location.pathname.includes("/setting_workspace.php")) {
            presenceData.details = "Profile settings";
            presenceData.state = "Workspace";
        }
        else if (document.location.pathname.includes("/setting_design.php")) {
            presenceData.details = "Profile settings";
            presenceData.state = "Design";
        }
        else if (document.location.pathname.includes("/setting_info.php")) {
            presenceData.details = "Notification Settings";
        }
        else if (document.location.pathname.includes("/stacc/my/setting")) {
            presenceData.details = "Auto Feed activity";
        }
        else if (document.location.pathname.includes("/setting_mute.php")) {
            presenceData.details = "Mute setting | Tags";
            if (typeResult == "user")
                presenceData.details = "Mute setting | User";
        }
        else if (document.location.pathname.includes("/premium")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing Premium Registered Info";
        }
        else if (document.location.pathname.includes("/messages.php")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Browsing Private message";
        }
        else if (document.location.pathname.includes("/discovery")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing Recommended Works";
            if (document.location.pathname.includes("/users"))
                presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing Recommended Users";
        }
        else if (document.location.pathname.includes("/upload.php")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Submiting New Illustrations";
            if (typeResult == "manga")
                presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Submiting New Manga";
        }
        else if (document.location.pathname.includes("/ugoira_upload.php")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Submiting New Ugoira(Animations)";
        }
        else if (document.location.pathname.includes("/novel/upload.php")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Submit New Novel";
        }
        else if (document.location.pathname.includes("/manage")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Managing Artworks";
        }
        else if (document.location.pathname.includes("/report")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Browsing report";
            presenceData.state = document.querySelector("#wrapper > div.layout-body > section.analytics-menu-unit > nav > span.label").innerText;
        }
        else if (document.location.pathname.includes("/group")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Browsing group";
        }
        else if (document.location.pathname.includes("/idea")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Browsing idea";
        }
        else if (document.location.pathname.includes("/howto")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Browsing Howto";
        }
    }
    else if (document.location.hostname == "sketch.pixiv.net") {
        presenceData.smallImageKey = "writing";
        if (document.location.pathname == "/" ||
            document.location.pathname.includes("/public")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing sketch page";
        }
        else if (document.location.pathname.includes("/lives/")) {
            title = document.querySelector("#LiveSidebarLiveUser > div.name");
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Sketch- Viewing livestream";
            presenceData.state = "by user: " + title.innerText;
            presenceData.smallImageKey = "live";
        }
        else if (document.location.pathname.includes("/lives")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Sketch- Browsing livestreams";
        }
        else if (document.location.pathname.includes("/popular")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Sketch- Viewing popular posts";
        }
        else if (document.location.pathname.includes("/following")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Sketch- Viewing following posts";
        }
        else if (document.location.pathname.includes("/@")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Sketch- Viewing user:";
            presenceData.state = document.querySelector("#AppContent > div:nth-child(5) > div:nth-child(1) > div > div.UserHeaderBody > div > div.user > div.name").textContent;
        }
        else if (document.location.pathname.includes("/tags")) {
            search = document.querySelector("#TagHeader > div > div.CarouselOverlay > div > div");
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Sketch- Viewing tag:";
            presenceData.state = search.innerText;
        }
    }
    if (presenceData.details == null) {
        presence.setTrayTitle();
        presence.setActivity();
    }
    else {
        presence.setActivity(presenceData);
    }
});
function getTimestamps(videoTime, videoDuration) {
    var startTime = Date.now();
    var endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
    return [Math.floor(startTime / 1000), endTime];
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUN4QixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsRUFDRixPQUFPLEdBQUcsUUFBUSxDQUFDLFVBQVUsQ0FBQztJQUM1QixJQUFJLEVBQUUsMkJBQTJCO0lBQ2pDLEtBQUssRUFBRSwwQkFBMEI7Q0FDbEMsQ0FBQyxDQUFDO0FBRUwsSUFBSSxhQUFhLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLENBQUM7QUFFbEQsSUFBSSxJQUFTLENBQUM7QUFDZCxJQUFJLEtBQVUsQ0FBQztBQUNmLElBQUksT0FBWSxDQUFDO0FBQ2pCLElBQUksTUFBVyxDQUFDO0FBRWhCLElBQUksT0FBTyxHQUFHLElBQUksR0FBRyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDOUMsSUFBSSxVQUFVLEdBQUcsT0FBTyxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7QUFFbEQsUUFBUSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsS0FBSyxJQUFJLEVBQUU7SUFDbkMsSUFBSSxZQUFZLEdBQWlCO1FBQy9CLGFBQWEsRUFBRSxLQUFLO0tBQ3JCLENBQUM7SUFFRixJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxJQUFJLGVBQWUsRUFBRTtRQUNqRCxJQUNFLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxJQUFJLEdBQUc7WUFDakMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLElBQUksTUFBTSxFQUNwQztZQUNBLFlBQVksQ0FBQyxjQUFjLEdBQUcsYUFBYSxDQUFDO1lBQzVDLFlBQVksQ0FBQyxPQUFPLEdBQUcsbUJBQW1CLENBQUM7U0FDNUM7YUFBTSxJ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