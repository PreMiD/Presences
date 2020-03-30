var presence = new Presence({
    clientId: "629473655218241557"
}), strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
});
presence.on("UpdateData", async () => {
    let Data = {
        largeImageKey: "musescore"
    };
    if (document.location.pathname.endsWith("/forum")) {
        Data.details = `Looking at`;
        Data.state = `the forums.`;
    }
    if (document.location.pathname.endsWith("/download")) {
        Data.details = `Looking how to`;
        Data.state = `download Musescore.`;
    }
    if (document.location.pathname.includes("/handbook")) {
        Data.details = `Looking at`;
        Data.state = `the handbook.`;
    }
    if (document.location.pathname.endsWith("/plugins")) {
        Data.details = `Looking at`;
        Data.state = `plugins.`;
    }
    if (document.location.pathname.endsWith("/services")) {
        Data.details = `Looking at`;
        Data.state = `services.`;
    }
    if (document.location.pathname.includes("/tutorials") ||
        document.location.pathname.includes("/howto")) {
        Data.details = `Looking at`;
        Data.state = `tutorials.`;
    }
    if (document.location.pathname.endsWith("/faq")) {
        Data.details = `Looking at`;
        Data.state = `the FAQ.`;
    }
    if (document.location.pathname.endsWith("/tracker")) {
        Data.details = `Looking at`;
        Data.state = `recent content.`;
    }
    if (document.location.pathname.includes("/dashboard")) {
        Data.details = `Looking at`;
        Data.state = `their dashboard.`;
    }
    if (document.location.pathname.startsWith("/piano-tutorial")) {
        Data.details = `Looking at`;
        Data.state = `piano tutorials.`;
    }
    if (document.location.pathname.startsWith("/community")) {
        Data.details = `Looking at`;
        Data.state = `communities.`;
    }
    if (document.location.pathname.includes("/sheetmusic")) {
        Data.details = `Looking at`;
        Data.state = `sheetmusic.`;
    }
    if (document.location.pathname.startsWith("/upload")) {
        Data.details = `Uploading`;
        Data.state = `their music.`;
    }
    if (document.location.pathname.startsWith("/hub")) {
        Data.details = `Looking at`;
        Data.state = `${document.location.pathname.split("/")[2]} sheetmusic.`;
    }
    if (document.location.pathname.endsWith("/my-scores")) {
        Data.details = `Looking at`;
        Data.state = `their sheetmusic.`;
    }
    if (document.location.pathname.startsWith("/upgrade")) {
        Data.details = `Considering`;
        Data.state = `upgrading to pro.`;
    }
    if (document.location.pathname.startsWith("/checkout")) {
        Data.details = `Checking something`;
        Data.state = `out.`;
    }
    if (document.location.pathname.endsWith("/group/create")) {
        Data.details = `Creating a`;
        Data.state = `new group.`;
    }
    if (document.location.pathname.endsWith("/community-guidelines")) {
        Data.details = `Browsing the`;
        Data.state = `community guidelines.`;
    }
    if (document.location.pathname.endsWith("/press") ||
        document.location.pathname.endsWith("/news")) {
        Data.details = `Browsing the`;
        Data.state = `press.`;
    }
    if (document.location.pathname.endsWith("/jobs")) {
        Data.details = `Looking at`;
        Data.state = `job opportunities.`;
    }
    if (document.location.pathname.endsWith("/about")) {
        Data.details = `Looking at`;
        Data.state = `the about section.`;
    }
    if (document.location.pathname.startsWith("/hc")) {
        Data.details = `Looking at`;
        Data.state = `the help center.`;
    }
    if (document.location.pathname.startsWith("/contact")) {
        Data.details = `Contacting`;
        Data.state = `Musescore.`;
    }
    if (document.querySelector("body > div.page.js-user-profile-page > div.content-header > div.banner-header.group-header > div > div.info-wrapper.group-info-wrapper.user-info-wrapper > div > h1 > a")) {
        Data.details = `Browing`;
        Data.state = `${document.querySelector("body > div.page.js-user-profile-page > div.content-header > div.banner-header.group-header > div > div.info-wrapper.group-info-wrapper.user-info-wrapper > div > h1 > a").textContent}'s profile`;
    }
    if (document.querySelector("#jmuse-container > div.viewer > div.viewerWrapper > div")) {
        if (`${document
            .querySelector("#jmuse-container > div:nth-child(1) > div > div > div > div._1DDmo.undefined > div:nth-child(1) > div > div > div.oY3Aa > button")
            .getAttribute("state")}` == "default") {
            Data.smallImageKey = "pause";
            Data.details = "Looking at";
            Data.state = document.querySelector("body > div.page.page-score > div.container > div.row > main > article > div > div.score-right > h1").textContent;
            Data.smallImageText = (await strings).pause;
        }
        else if (`${document
            .querySelector("#jmuse-container > div:nth-child(1) > div > div > div > div._1DDmo.undefined > div:nth-child(1) > div > div > div.oY3Aa > button")
            .getAttribute("state")}` == "primary") {
            let time = getTimeLeft([
                document
                    .querySelector("#jmuse-container > div:nth-child(1) > div > div > div > div._1DDmo.undefined > div:nth-child(1) > div > div > div._3vWaq > span")
                    .textContent.split("/")[0],
                document
                    .querySelector("#jmuse-container > div:nth-child(1) > div > div > div > div._1DDmo.undefined > div:nth-child(1) > div > div > div._3vWaq > span")
                    .textContent.split("/")[1]
            ]);
            Data.startTimestamp = getTimestamps(time[0], time[1])[0];
            Data.endTimestamp = getTimestamps(time[0], time[1])[1];
            Data.smallImageKey = "play";
            Data.details = "Listening to";
            Data.state = document.querySelector("body > div.page.page-score > div.container > div.row > main > article > div > div.score-right > h1").textContent;
            Data.smallImageText = (await strings).play;
        }
    }
    if (document.location.pathname.includes("/user")) {
        if (document.location.pathname.includes("/edit")) {
            Data.details = `Editing`;
            Data.state = `their account.`;
        }
        if (document.location.pathname.includes("settings/profile")) {
            Data.details = `Editing`;
            Data.state = `their profile.`;
        }
        if (document.location.pathname.includes("subscription")) {
            Data.details = `Viewing a`;
            Data.state = `subscription.`;
        }
        if (document.location.pathname.includes("billing")) {
            Data.details = `Viewing their`;
            Data.state = `billing history.`;
        }
        if (document.location.pathname.includes("gifts")) {
            Data.details = `Viewing their`;
            Data.state = `gifts.`;
        }
        if (document.location.pathname.includes("notifications")) {
            Data.details = `Viewing their`;
            Data.state = `notifications.`;
        }
        if (document.location.pathname.includes("/message")) {
            Data.details = `Looking at`;
            Data.state = `messages.`;
        }
        if (document.location.pathname.includes("/followers")) {
            Data.details = `Looking at`;
            Data.state = `${document.querySelector("body > div.page.js-user-profile-page > div.content-header > div.banner-header.group-header > div > div.info-wrapper.group-info-wrapper.user-info-wrapper > div > h1 > a").textContent}'s followers.`;
        }
        if (document.location.pathname.includes("/following")) {
            Data.details = `Looking who`;
            Data.state = `${document.querySelector("body > div.page.js-user-profile-page > div.content-header > div.banner-header.group-header > div > div.info-wrapper.group-info-wrapper.user-info-wrapper > div > h1 > a").textContent} is following.`;
        }
        if (document.location.pathname.includes("/invite")) {
            Data.details = `Inviting`;
            Data.state = `some friends.`;
        }
        if (document.querySelector("body > div.page.js-user-profile-page > div.content-header.collapsed > div.banner-header.group-header > div > div.info-wrapper.group-info-wrapper.user-info-wrapper > div > h1 > a")) {
            Data.details = `Browing`;
            Data.state = `${document.querySelector("body > div.page.js-user-profile-page > div.content-header.collapsed > div.banner-header.group-header > div > div.info-wrapper.group-info-wrapper.user-info-wrapper > div > h1 > a").textContent}'s profile`;
        }
    }
    else if (document.querySelector("body > div.page.js-user-profile-page > div.content-header > div.banner-header.group-header > div > div.info-wrapper.group-info-wrapper.user-info-wrapper > div > h1 > a")) {
        if (document.location.pathname.includes("/sheetmusic")) {
            Data.details = `Looking at`;
            Data.state = `${document.querySelector("body > div.page.js-user-profile-page > div.content-header > div.banner-header.group-header > div > div.info-wrapper.group-info-wrapper.user-info-wrapper > div > h1 > a").textContent}'s sheetmusic.`;
        }
        if (document.location.pathname.includes("/favorites")) {
            Data.details = `Looking at`;
            Data.state = `${document.querySelector("body > div.page.js-user-profile-page > div.content-header > div.banner-header.group-header > div > div.info-wrapper.group-info-wrapper.user-info-wrapper > div > h1 > a").textContent}'s favorites.`;
        }
        if (document.location.pathname.includes("/sets")) {
            Data.details = `Looking at`;
            Data.state = `${document.querySelector("body > div.page.js-user-profile-page > div.content-header > div.banner-header.group-header > div > div.info-wrapper.group-info-wrapper.user-info-wrapper > div > h1 > a").textContent}'s sets.`;
        }
    }
    presence.setActivity(Data);
});
function getTimeLeft(Time) {
    var TimeGone = Time[0].split(":").reverse();
    var TimeTotal = Time[1].split(":").reverse();
    var parsedAudioDuration = getTime(TimeGone, TimeTotal);
    return [parsedAudioDuration[0], parsedAudioDuration[1]];
}
function getTime(timegone, timetotal) {
    var timegoneN = parseInt(timegone[0]) + parseInt(timegone[1]) * 60;
    var timetotalN = parseInt(timetotal[0]) + parseInt(timetotal[1]) * 60;
    var back = [timegoneN, timetotalN];
    return back;
}
function getTimestamps(videoTime, videoDuration) {
    var startTime = Date.now();
    var endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
    return [Math.floor(startTime / 1000), endTime];
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMxQixRQUFRLEVBQUUsb0JBQW9CO0NBQzlCLENBQUMsRUFDRixPQUFPLEdBQUcsUUFBUSxDQUFDLFVBQVUsQ0FBQztJQUM3QixJQUFJLEVBQUUsMkJBQTJCO0lBQ2pDLEtBQUssRUFBRSwwQkFBMEI7Q0FDakMsQ0FBQyxDQUFDO0FBQ0osUUFBUSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsS0FBSyxJQUFJLEVBQUU7SUFDcEMsSUFBSSxJQUFJLEdBQWlCO1FBQ3hCLGFBQWEsRUFBRSxXQUFXO0tBQzFCLENBQUM7SUFHRixJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsRUFBRTtRQUNsRCxJQUFJLENBQUMsT0FBTyxHQUFHLFlBQVksQ0FBQztRQUM1QixJQUFJLENBQUMsS0FBSyxHQUFHLGFBQWEsQ0FBQztLQUMzQjtJQUNELElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxFQUFFO1FBQ3JELElBQUksQ0FBQyxPQUFPLEdBQUcsZ0JBQWdCLENBQUM7UUFDaEMsSUFBSSxDQUFDLEtBQUssR0FBRyxxQkFBcUIsQ0FBQztLQUNuQztJQUNELElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxFQUFFO1FBQ3JELElBQUksQ0FBQyxPQUFPLEdBQUcsWUFBWSxDQUFDO1FBQzVCLElBQUksQ0FBQyxLQUFLLEdBQUcsZUFBZSxDQUFDO0tBQzdCO0lBQ0QsSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLEVBQUU7UUFDcEQsSUFBSSxDQUFDLE9BQU8sR0FBRyxZQUFZ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