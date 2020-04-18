var presence = new Presence({
    clientId: "640234287525920834"
});
var browsingStamp = Math.floor(Date.now() / 1000);
var user;
var title;
var search;
var typeURL = new URL(document.location.href);
var typeResult = typeURL.searchParams.get("type");
presence.on("UpdateData", async () => {
    const presenceData = {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMxQixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsQ0FBQztBQUVILElBQUksYUFBYSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDO0FBRWxELElBQUksSUFBUyxDQUFDO0FBQ2QsSUFBSSxLQUFVLENBQUM7QUFDZixJQUFJLE1BQVcsQ0FBQztBQUVoQixJQUFJLE9BQU8sR0FBRyxJQUFJLEdBQUcsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQzlDLElBQUksVUFBVSxHQUFHLE9BQU8sQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBRWxELFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLEtBQUssSUFBSSxFQUFFO0lBQ25DLE1BQU0sWUFBWSxHQUFpQjtRQUNqQyxhQUFhLEVBQUUsS0FBSztLQUNyQixDQUFDO0lBRUYsSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsSUFBSSxlQUFlLEVBQUU7UUFDakQsSUFDRSxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsSUFBSSxHQUFHO1lBQ2pDLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxJQUFJLE1BQU0sRUFDcEM7WUFDQSxZQUFZLENBQUMsY0FBYyxHQUFHLGFBQWEsQ0FBQztZQUM1QyxZQUFZLENBQUMsT0FBTyxHQUFHLG1CQUFtQixDQUFDO1NBQzVDO2FBQU0sSUFDTCxRQUFRLENBQUMsYUFBYSxDQUNwQix5R0FBeUcsQ0FDMUcsS0FBSyxJQUFJLEVBQ1Y7WUFDQSxZQUFZLENBQUMsY0FBYyxHQUFHLGFBQWEsQ0FBQztZQUM1QyxJQUFJLEdBQUcsUUFBUSxDQUFD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