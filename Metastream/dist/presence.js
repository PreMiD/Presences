const presence = new Presence({
    clientId: "630462023003799583"
});
var strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused",
    live: "presence.activity.live"
});
function getTime(list) {
    var ret = 0;
    for (let index = list.length - 1; index >= 0; index--) {
        ret += parseInt(list[index]) * 60 ** index;
    }
    return ret;
}
function getTimestamps(audioTime, audioDuration) {
    var splitAudioTime = audioTime.split(":").reverse();
    var splitAudioDuration = audioDuration.split(":").reverse();
    var parsedAudioTime = getTime(splitAudioTime);
    var parsedAudioDuration = getTime(splitAudioDuration);
    var startTime = Date.now();
    var endTime = Math.floor(startTime / 1000) - parsedAudioTime + parsedAudioDuration;
    return [Math.floor(startTime / 1000), endTime];
}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUM1QixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsQ0FBQztBQUNILElBQUksT0FBTyxHQUFHLFFBQVEsQ0FBQyxVQUFVLENBQUM7SUFDaEMsSUFBSSxFQUFFLDJCQUEyQjtJQUNqQyxLQUFLLEVBQUUsMEJBQTBCO0lBQ2pDLElBQUksRUFBRSx3QkFBd0I7Q0FDL0IsQ0FBQyxDQUFDO0FBRUgsU0FBUyxPQUFPLENBQUMsSUFBYztJQUM3QixJQUFJLEdBQUcsR0FBRyxDQUFDLENBQUM7SUFDWixLQUFLLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFLEtBQUssSUFBSSxDQUFDLEVBQUUsS0FBSyxFQUFFLEVBQUU7UUFDckQsR0FBRyxJQUFJLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxFQUFFLElBQUksS0FBSyxDQUFDO0tBQzVDO0lBQ0QsT0FBTyxHQUFHLENBQUM7QUFDYixDQUFDO0FBRUQsU0FBUyxhQUFhLENBQ3BCLFNBQWlCLEVBQ2pCLGFBQXFCO0lBRXJCLElBQUksY0FBYyxHQUFHLFNBQVMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDcEQsSUFBSSxrQkFBa0IsR0FBRyxhQUFhLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBRTVELElBQUksZUFBZSxHQUFHLE9BQU8sQ0FBQyxjQUFjLENBQUMsQ0FBQztJQUM5QyxJQUFJLG1CQUFtQixHQUFHLE9BQU8sQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO0lBRXRELElBQUksU0FBUyxHQUFHLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztJQUMzQixJQUFJLE9BQU8sR0FDVCxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsR0FBRyxlQUFlLEdBQUcsbUJBQW1CLENBQUM7SUFDdkUsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0FBQ2pELENBQUM7QUFFRCxJQUFJLE9BQU8sRUFBRSxNQUFNLENBQUM7QUFFcEIsUUFBUSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsS0FBSyxJQUFJLEVBQUU7SUFDbkMsSUFBSSxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksS0FBSyxNQUFNLEVBQUU7UUFDbkMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDO1FBQzlCLE9BQU8sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUMsQ0FBQztLQUN6QztJQUVELElBQUksT0FBTyxHQUFHLFNBQVMsRUFDckIsS0FBSyxHQUFHLFNBQVMsRUFDakIsYUFBYSxHQUFHLFNBQVMsRUFDekIsY0FBYyxHQUFHLFNBQVMsRUFDMUIsY0FBYyxHQUFHLE9BQU8sRUFDeEIsWUFBWSxHQUFHLFNBQVMsRUFDeEIsT0FBTyxHQUFHLElBQUksQ0FBQztJQUVqQixJQUFJLElBQUksR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQztJQUNwQyxJQUFJLElBQUksR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQztJQUVwQyxJQUFJO1FBQ0YsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLHVCQUF1QixDQUFDLEVBQUU7WUFDdkMsSUFBSSxJQUFJLEtBQUssR0FBRyxFQUFFO2dCQUNoQixPQUFPLEdBQUcsTUFBTSxDQUFDO2dCQUVqQixJQUFJLFNBQVMsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUNwQyxxREFBcUQsQ0FDdEQsQ0FBQztnQkFDRixJQUFJLFNBQVM7b0JBQUUsS0FBSyxHQUFHLFdBQVcsU0FBUyxDQUFDLFdBQVcsRUFBRSxDQUFDO2FBQzNEO1lBQ0QsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxFQUFFO2dCQUMzQixPQUFPLEdBQUcsVUFBVSxDQUFDO2dCQUVyQixJQUFJLFlBQVksR0FBRyxRQUFRLENBQUMsYUFBYSxDQUN2QyxnRUFBZ0UsQ0FDakUsQ0FBQztnQkFDRixJQUFJLFlBQVksRUFBRTtvQkFDaEIsS0FBSyxHQUFHLFdBQVcsWUFBWSxDQUFDLFdBQVcsRUFBRSxDQUFDO2lCQUMvQzthQUNGO1lBQ0QsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxFQUFFO2dCQUN2QixJQUFJLGVBQWUsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLHVCQUF1QixDQUFDLENBQUM7Z0JBQ3RFLElBQUksa0JBQWtCLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FDN0MsMEJBQTBCLENBQzNCLENBQUM7Z0JBQ0YsSUFBSSxtQkFBbUIsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUM5QyxpQ0FBaUMsQ0FDbEMsQ0FBQztnQkFDRixJQUFJLFdBQVcsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLDRCQUE0QixDQUFDLENBQUM7Z0JBRXZFLElBQUksZUFBZSxFQUFFO29CQUNuQixPQUFPLEdBQUcsZUFBZSxDQUFDO2lCQUMzQjtxQkFBTSxJQUFJLGtCQUFrQixFQUFFO29CQUM3QixPQUFPLEdBQUcsY0FBYyxDQUFDO29CQUV6QixJQUFJLG1CQUFtQixFQUFFO3dCQUN2QixLQUFLLEdBQUcsbUJBQW1CLENBQUMsV0FBVyxDQUFDO3FCQUN6QztpQkFDRjtxQkFBTSxJQUFJLFdBQVcsRUFBRTtvQkFDdEIsT0FBTyxHQUFHLGVBQWUsQ0FBQztpQkFDM0I7cUJBQU07b0JBQ0wsYUFBYSxHQUFHLE1BQU0sQ0FBQztvQkFDdkIsY0FBYyxHQUFHLENBQUMsTUFBTSxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUM7b0JBRXRDLElBQUksS0FBSyxHQUNQLFFBQVEsQ0FBQyxhQUFhLENBQUMsMkJBQTJCLENBQUM7d0JBQ25ELFFBQVEsQ0FBQyxhQUFhLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztvQkFDM0MsSUFBSSxXQUFXLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQywyQkFBMkIsQ0FBQyxDQUFDO29CQUV0RSxJQUFJLEtBQUssQ0FBQyxpQkFBaUIsS0FBSyxDQUFDLElBQUksV0FBVyxLQUFLLElBQUksRUFBRTt3QkFDekQsT0FBTyxHQUFHLFlBQVksS0FBSyxDQUFDLGlCQUFpQixTQUFTLENBQUM7cUJBQ3hEO3lCQUFNO3dCQUNMLE9BQU8sR0FBRyxhQUFhLEtBQUssQ0FBQyxpQkFBaUIsU0FBUyxDQUFDO3FCQUN6RDtvQkFFRCxJQUFJLEtBQUssR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLHlCQUF5QixDQUFDLENBQUM7b0JBQzlELElBQUksS0FBSyxJQUFJLEtBQUssQ0FBQyxXQUFXLEtBQUssWUFBWSxFQUFFO3dCQUMvQyxLQUFLLEdBQUcsS0FBSyxDQUFDLFdBQVcsQ0FBQzt3QkFFMUIsSUFBSSxPQUFPLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FDbEMscUNBQXFDLENBQ3RDLENBQUM7d0JBQ0YsSUFBSSxRQUFRLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FDbkMscUNBQXFDLENBQ3RDLENBQUM7d0JBQ0YsSUFBSSxPQUFPLElBQUksUUFBUSxFQUFFOzRCQUN2QixJQUFJLFVBQVUsR0FBRyxhQUFhLENBQzVCLE9BQU8sQ0FBQyxXQUFXLEVBQ25CLFFBQVEsQ0FBQyxXQUFXLENBQ3JCLENBQUM7NEJBQ0YsY0FBYyxHQUFHLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQzs0QkFDL0IsWUFBWSxHQUFHLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQzt5QkFDOUI7d0JBRUQsSUFBSSxJQUFJLEdBQWtCLFFBQVEsQ0FBQyxhQUFhLENBQzlDLDhDQUE4QyxDQUMvQyxDQUFDO3dCQUNGLElBQUksSUFBSSxFQUFFOzRCQUNSLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxFQUFFO2dDQUN2QyxhQUFhLEdBQUcsTUFBTSxDQUFDO2dDQUN2QixjQUFjLEdBQUcsQ0FBQyxNQUFNLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQztnQ0FDdEMsT0FBTyxHQUFHLElBQUksQ0FBQzs2QkFDaEI7aUNBQU07Z0NBQ0wsYUFBYSxHQUFHLE9BQU8sQ0FBQztnQ0FDeEIsY0FBYyxHQUFHLENBQUMsTUFBTSxPQUFPLENBQUMsQ0FBQyxLQUFLLENBQUM7Z0NBQ3ZDLE9BQU8sR0FBRyxLQUFLLENBQUM7NkJBQ2pCO3lCQUNGO3FCQUNGO2lCQUNGO2FBQ0Y7U0FDRjtLQUNGO0lBQUMsT0FBTyxHQUFHLEVBQUU7UUFDWixPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0tBQ3BCO0lBRUQsSUFBSSxJQUFJLEdBQWlCO1FBQ3ZCLE9BQU8sRUFBRSxPQUFPO1FBQ2hCLEtBQUssRUFBRSxLQUFLO1FBQ1osYUFBYSxFQUFFLFlBQVk7UUFDM0IsYUFBYSxFQUFFLGFBQWE7UUFDNUIsY0FBYyxFQUFFLGNBQWM7UUFDOUIsY0FBYyxFQUFFLGNBQWM7UUFDOUIsWUFBWSxFQUFFLFlBQVk7S0FDM0IsQ0FBQztJQUVGLFFBQVEsQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0FBQ3RDLENBQUMsQ0FBQyxDQUFDIn0=