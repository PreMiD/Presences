const presence = new Presence({
    clientId: "630462023003799583"
});
var strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused",
    live: "presence.activity.live"
});
var elapsed, oldUrl;
presence.on("UpdateData", async () => {
    if (window.location.href !== oldUrl) {
        oldUrl = window.location.href;
        elapsed = Math.floor(Date.now() / 1000);
    }
    var details = undefined, state = undefined, smallImageKey = undefined, smallImageText = undefined, startTimestamp = elapsed, endTimestamp = undefined, playing = true;
    var host = window.location.hostname;
    var path = window.location.pathname;
    try {
        if (host.match("app.getmetastream.com")) {
            if (path === "/") {
                details = "Home";
                var menu_item = document.querySelector(".MenuTabs__tabItem__2ny6A.MenuTabs__selected__c65wY");
                if (menu_item)
                    state = `Viewing ${menu_item.textContent}`;
            }
            if (path.match("/settings")) {
                details = "Settings";
                var setting_item = document.querySelector(".SettingsMenu__tabItem__3ypki.SettingsMenu__selectedTab__OMITL");
                if (setting_item) {
                    state = `Viewing ${setting_item.textContent}`;
                }
            }
            if (path.match("/join")) {
                var connection_info = document.querySelector(".Connect__info__3Vwlv");
                var disconnection_info = document.querySelector(".Disconnect__info__3Uejx");
                var disconnection_label = document.querySelector(".Disconnect__info__3Uejx > span");
                var menu_header = document.querySelector(".MenuHeader__header__1SYq0");
                if (connection_info) {
                    details = "Connecting...";
                }
                else if (disconnection_info) {
                    details = "Disconnected";
                    if (disconnection_label) {
                        state = disconnection_label.textContent;
                    }
                }
                else if (menu_header) {
                    details = "Setting up...";
                }
                else {
                    smallImageKey = "live";
                    smallImageText = (await strings).live;
                    var users = document.querySelector(".ListOverlay__list__1epFe") ||
                        document.createElement("HTMLDivElement");
                    var user_button = document.querySelector(".UserItem__menuBtn__1ST9k");
                    if (users.childElementCount === 1 || user_button !== null) {
                        details = `Hosting (${users.childElementCount} Users)`;
                    }
                    else {
                        details = `Watching (${users.childElementCount} Users)`;
                    }
                    var title = document.querySelector(".TitleBar__title__3VPpW");
                    if (title && title.textContent !== "Metastream") {
                        state = title.textContent;
                        var current = document.querySelector(".Timeline__time__gcvG5:nth-child(1)");
                        var duration = document.querySelector(".Timeline__time__gcvG5:nth-child(3)");
                        if (current && duration) {
                            var timestamps = getTimestamps(current.textContent, duration.textContent);
                            startTimestamp = timestamps[0];
                            endTimestamp = timestamps[1];
                        }
                        var play = document.querySelector(".PlaybackControls__button__Q0pbe > svg > use");
                        if (play) {
                            if (play.href.baseVal.endsWith("pause")) {
                                smallImageKey = "play";
                                smallImageText = (await strings).play;
                                playing = true;
                            }
                            else {
                                smallImageKey = "pause";
                                smallImageText = (await strings).pause;
                                playing = false;
                            }
                        }
                    }
                }
            }
        }
    }
    catch (err) {
        console.error(err);
    }
    var data = {
        details: details,
        state: state,
        largeImageKey: "metastream",
        smallImageKey: smallImageKey,
        smallImageText: smallImageText,
        startTimestamp: startTimestamp,
        endTimestamp: endTimestamp
    };
    presence.setActivity(data, playing);
});
function getTimestamps(audioTime, audioDuration) {
    var splitAudioTime = audioTime.split(":").reverse();
    var splitAudioDuration = audioDuration.split(":").reverse();
    var parsedAudioTime = getTime(splitAudioTime);
    var parsedAudioDuration = getTime(splitAudioDuration);
    var startTime = Date.now();
    var endTime = Math.floor(startTime / 1000) - parsedAudioTime + parsedAudioDuration;
    return [Math.floor(startTime / 1000), endTime];
}
function getTime(list) {
    var ret = 0;
    for (let index = list.length - 1; index >= 0; index--) {
        ret += parseInt(list[index]) * 60 ** index;
    }
    return ret;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUM3QixRQUFRLEVBQUUsb0JBQW9CO0NBQzlCLENBQUMsQ0FBQztBQUNILElBQUksT0FBTyxHQUFHLFFBQVEsQ0FBQyxVQUFVLENBQUM7SUFDakMsSUFBSSxFQUFFLDJCQUEyQjtJQUNqQyxLQUFLLEVBQUUsMEJBQTBCO0lBQ2pDLElBQUksRUFBRSx3QkFBd0I7Q0FDOUIsQ0FBQyxDQUFDO0FBRUgsSUFBSSxPQUFPLEVBQUUsTUFBTSxDQUFDO0FBRXBCLFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLEtBQUssSUFBSSxFQUFFO0lBQ3BDLElBQUksTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEtBQUssTUFBTSxFQUFFO1FBQ3BDLE1BQU0sR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQztRQUM5QixPQUFPLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLENBQUM7S0FDeEM7SUFFRCxJQUFJLE9BQU8sR0FBRyxTQUFTLEVBQ3RCLEtBQUssR0FBRyxTQUFTLEVBQ2pCLGFBQWEsR0FBRyxTQUFTLEVBQ3pCLGNBQWMsR0FBRyxTQUFTLEVBQzFCLGNBQWMsR0FBRyxPQUFPLEVBQ3hCLFlBQVksR0FBRyxTQUFTLEVBQ3hCLE9BQU8sR0FBRyxJQUFJLENBQUM7SUFFaEIsSUFBSSxJQUFJLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUM7SUFDcEMsSUFBSSxJQUFJLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUM7SUFFcEMsSUFBSTtRQUNILElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyx1QkFBdUIsQ0FBQyxFQUFFO1lBQ3hDLElBQUksSUFBSSxLQUFLLEdB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