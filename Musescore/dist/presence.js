var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var presence = new Presence({
    clientId: "629473655218241557",
    mediaKeys: true
}), strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
});
presence.on("UpdateData", () => __awaiter(this, void 0, void 0, function* () {
    let Data = {
        largeImageKey: "musescore",
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
    if (document.location.pathname.includes("/tutorials") || document.location.pathname.includes("/howto")) {
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
    if (document.location.pathname.endsWith("/press") || document.location.pathname.endsWith("/news")) {
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
        if (`${document.querySelector("#jmuse-container > div:nth-child(1) > div > div > div > div._1DDmo.undefined > div:nth-child(1) > div > div > div.oY3Aa > button").getAttribute("state")}` == "default") {
            Data.smallImageKey = "pause";
            Data.details = "Looking at";
            Data.state = document.querySelector("body > div.page.page-score > div.container > div.row > main > article > div > div.score-right > h1").textContent;
            Data.smallImageText = (yield strings).pause;
        }
        else if (`${document.querySelector("#jmuse-container > div:nth-child(1) > div > div > div > div._1DDmo.undefined > div:nth-child(1) > div > div > div.oY3Aa > button").getAttribute("state")}` == "primary") {
            let time = getTimeLeft([document.querySelector("#jmuse-container > div:nth-child(1) > div > div > div > div._1DDmo.undefined > div:nth-child(1) > div > div > div._3vWaq > span").textContent.split("/")[0], document.querySelector("#jmuse-container > div:nth-child(1) > div > div > div > div._1DDmo.undefined > div:nth-child(1) > div > div > div._3vWaq > span").textContent.split("/")[1]]);
            Data.startTimestamp = getTimestamps(time[0], time[1])[0];
            Data.endTimestamp = getTimestamps(time[0], time[1])[1];
            Data.smallImageKey = "play";
            Data.details = "Listening to";
            Data.state = document.querySelector("body > div.page.page-score > div.container > div.row > main > article > div > div.score-right > h1").textContent;
            Data.smallImageText = (yield strings).play;
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
}));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMxQixRQUFRLEVBQUUsb0JBQW9CO0lBQzlCLFNBQVMsRUFBRSxJQUFJO0NBQ2hCLENBQUMsRUFDQSxPQUFPLEdBQUcsUUFBUSxDQUFDLFVBQVUsQ0FBQztJQUM1QixJQUFJLEVBQUUsMkJBQTJCO0lBQ2pDLEtBQUssRUFBRSwwQkFBMEI7Q0FFbEMsQ0FBQyxDQUFDO0FBQ0wsUUFBUSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsR0FBUyxFQUFFO0lBQ25DLElBQUksSUFBSSxHQUFpQjtRQUN2QixhQUFhLEVBQUUsV0FBVztLQUMzQixDQUFDO0lBR0YsSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEVBQUU7UUFBRSxJQUFJLENBQUMsT0FBTyxHQUFHLFlBQVksQ0FBQztRQUFDLElBQUksQ0FBQyxLQUFLLEdBQUcsYUFBYSxDQUFDO0tBQUU7SUFDL0csSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLEVBQUU7UUFBRSxJQUFJLENBQUMsT0FBTyxHQUFHLGdCQUFnQixDQUFDO1FBQUMsSUFBSSxDQUFDLEtBQUssR0FBRyxxQkFBcUIsQ0FBQztLQUFFO0lBQzlILElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxFQUFFO1FBQUUsSUFBSSxDQUFDLE9BQU8sR0FBRyxZQUFZLENBQUM7UUFBQyxJQUFJLENBQUMsS0FBSyxHQUFHLGVBQWUsQ0FBQztLQUFFO0lBQ3BILElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxFQUFFO1FBQUUsSUFBSSxD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LFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUE7SUFDbEUsSUFBSSxVQUFVLEdBQUcsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUE7SUFDckUsSUFBSSxJQUFJLEdBQUcsQ0FBQyxTQUFTLEVBQUUsVUFBVSxDQUFDLENBQUE7SUFDbEMsT0FBTyxJQUFJLENBQUM7QUFDZCxDQUFDO0FBQ0QsU0FBUyxhQUFhLENBQUMsU0FBaUIsRUFBRSxhQUFxQjtJQUM3RCxJQUFJLFNBQVMsR0FBRyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7SUFDM0IsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLEdBQUcsU0FBUyxHQUFHLGFBQWEsQ0FBQztJQUN2RSxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLEVBQUUsT0FBTyxDQUFDLENBQUM7QUFDakQsQ0FBQyJ9