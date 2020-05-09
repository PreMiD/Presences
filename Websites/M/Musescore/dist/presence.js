var presence = new Presence({
    clientId: "629473655218241557"
}), strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
});
function getTimestamps(videoTime, videoDuration) {
    var startTime = Date.now();
    var endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
    return [Math.floor(startTime / 1000), endTime];
}
function getTime(timegone, timetotal) {
    var timegoneN = parseInt(timegone[0]) + parseInt(timegone[1]) * 60;
    var timetotalN = parseInt(timetotal[0]) + parseInt(timetotal[1]) * 60;
    var back = [timegoneN, timetotalN];
    return back;
}
function getTimeLeft(Time) {
    var TimeGone = Time[0].split(":").reverse();
    var TimeTotal = Time[1].split(":").reverse();
    var parsedAudioDuration = getTime(TimeGone, TimeTotal);
    return [parsedAudioDuration[0], parsedAudioDuration[1]];
}
presence.on("UpdateData", async () => {
    const Data = {
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
            const time = getTimeLeft([
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUN4QixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsRUFDRixPQUFPLEdBQUcsUUFBUSxDQUFDLFVBQVUsQ0FBQztJQUM1QixJQUFJLEVBQUUsMkJBQTJCO0lBQ2pDLEtBQUssRUFBRSwwQkFBMEI7Q0FDbEMsQ0FBQyxDQUFDO0FBT0wsU0FBUyxhQUFhLENBQ3BCLFNBQWlCLEVBQ2pCLGFBQXFCO0lBRXJCLElBQUksU0FBUyxHQUFHLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztJQUMzQixJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsR0FBRyxTQUFTLEdBQUcsYUFBYSxDQUFDO0lBQ3ZFLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsRUFBRSxPQUFPLENBQUMsQ0FBQztBQUNqRCxDQUFDO0FBRUQsU0FBUyxPQUFPLENBQUMsUUFBUSxFQUFFLFNBQVM7SUFDbEMsSUFBSSxTQUFTLEdBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUM7SUFDbkUsSUFBSSxVQUFVLEdBQUcsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUM7SUFDdEUsSUFBSSxJQUFJLEdBQUcsQ0FBQyxTQUFTLEVBQUUsVUFBVSxDQUFDLENBQUM7SUFDbkMsT0FBTyxJQUFJLENBQUM7QUFDZCxDQUFDO0FBRUQsU0FBUyxXQUFXLENBQUMsSUFBYztJQUNqQyxJQUFJ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