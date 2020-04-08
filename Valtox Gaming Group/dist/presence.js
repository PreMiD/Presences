var presence = new Presence({
    clientId: "640146822257573928"
});
var browsingStamp = Math.floor(Date.now() / 1000);
var user;
var title;
presence.on("UpdateData", async () => {
    const presenceData = {
        largeImageKey: "valtox"
    };
    if (document.location.hostname == "valtoxgaminggroup.com") {
        if (document.location.pathname == "/") {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "🌐 Viewing home page";
        }
        else if (document.location.pathname.includes("/profile/") ||
            document.location.pathname.includes("/user/")) {
            presenceData.startTimestamp = browsingStamp;
            user = document.querySelector(".title.m-0");
            presenceData.details = "🌐 Viewing user:";
            presenceData.state = "📰 " + user.textContent;
        }
        else if (document.location.pathname.includes("/logistics")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "📰 Reading about the logistics";
            presenceData.smallImageKey = "reading";
        }
        else if (document.location.pathname.includes("/about")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "📰 Reading about Valtox";
            presenceData.smallImageKey = "reading";
        }
        else if (document.location.pathname.includes("/fivem")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "🌐 Reading about";
            presenceData.state = "📰 Valtox FiveM";
            presenceData.smallImageKey = "reading";
        }
        else if (document.location.pathname.includes("/minecraft")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "🌐 Reading about";
            presenceData.state = "📰 Valtox Minecraft";
            presenceData.smallImageKey = "reading";
        }
    }
    else if (document.location.hostname == "vtc.valtoxgaminggroup.com") {
        if (document.location.pathname.includes("/truckinglive")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "🌐 Viewing Live Tracker";
            presenceData.state = "🌍 Tracking Info";
        }
    }
    else if (document.location.hostname == "hub.valtoxgaminggroup.com") {
        if (document.location.pathname.includes("/logbook")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "🌐 Viewing their logbook";
            presenceData.state =
                "📰 " +
                    document.querySelector("#jobskm").textContent +
                    " " +
                    document.querySelector("#page-content-wrapper > div > div.row > div:nth-child(1) > div > span.count-name.white").textContent +
                    " | " +
                    document.querySelector("#jobscount").textContent +
                    " " +
                    document.querySelector("#page-content-wrapper > div > div.row > div:nth-child(2) > div > span.count-name").textContent;
        }
        else if (document.location.pathname.includes("/downloads")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "🌐 Viewing the";
            presenceData.state = "📰 downloads page";
        }
        else if (document.location.pathname.includes("/events")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "🌐 Viewing the";
            presenceData.state = "📰 upcoming events";
        }
        else if (document.location.pathname.includes("/rules")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "🌐 Viewing the";
            presenceData.state = "📰 VTC rules";
        }
        else if (document.location.pathname.includes("/login")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "🌐 Logging in...";
        }
        else {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "🌐 Viewing their";
            presenceData.state = "📰 VTC dashboard";
        }
    }
    else if (document.location.hostname == "panel.valtoxgaminggroup.com") {
        if (document.location.pathname == "/") {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "🌐 Staff Panel";
            presenceData.state = "📰 Viewing panel home";
        }
        else if (document.location.pathname.includes("/account")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "🌐 Staff Panel";
            presenceData.state = "📰 Viewing their account";
        }
        else if (document.location.pathname.includes("/server/")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "🌐 Staff Panel - Editing";
            title =
                document.querySelector(".card-title") ||
                    document.querySelector("body > div > div.content-wrapper > section.content-header > ol > li:nth-child(2) > a");
            presenceData.state = "📰 Server: " + title.textContent;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMxQixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsQ0FBQztBQUVILElBQUksYUFBYSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDO0FBRWxELElBQUksSUFBUyxDQUFDO0FBQ2QsSUFBSSxLQUFVLENBQUM7QUFFZixRQUFRLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxLQUFLLElBQUksRUFBRTtJQUNuQyxNQUFNLFlBQVksR0FBaUI7UUFDakMsYUFBYSxFQUFFLFFBQVE7S0FDeEIsQ0FBQztJQUVGLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLElBQUksdUJBQXVCLEVBQUU7UUFDekQsSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsSUFBSSxHQUFHLEVBQUU7WUFDckMsWUFBWSxDQUFDLGNBQWMsR0FBRyxhQUFhLENBQUM7WUFDNUMsWUFBWSxDQUFDLE9BQU8sR0FBRyxzQkFBc0IsQ0FBQztTQUMvQzthQUFNLElBQ0wsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQztZQUNoRCxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEVBQzdDO1lBQ0EsWUFBWSxDQUFDLGNBQWMsR0FBRyxhQUFhLENBQUM7WUFDNUMsSUFBSSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUFDLENBQUM7WUFDNUMsWUFBWSxDQUFDLE9BQU8sR0FBRyxrQkFBa0IsQ0FBQztZQUMxQyxZQUFZLENBQUMsS0FBSyxHQUFHLEtBQUssR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDO1NBQy9DO2FBQU0sSUFB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