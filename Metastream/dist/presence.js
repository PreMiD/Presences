var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const presence = new Presence({
    clientId: '630462023003799583'
});
var strings = presence.getStrings({
    play: 'presence.playback.playing',
    pause: 'presence.playback.paused',
    live: 'presence.activity.live'
});
var elapsed, oldUrl;
presence.on('UpdateData', () => __awaiter(this, void 0, void 0, function* () {
    if (window.location.href !== oldUrl) {
        oldUrl = window.location.href;
        elapsed = Math.floor(Date.now() / 1000);
    }
    var details = undefined, state = undefined, smallImageKey = undefined, smallImageText = undefined, startTimestamp = elapsed, endTimestamp = undefined, playing = true;
    var host = window.location.hostname;
    var path = window.location.pathname;
    try {
        if (host.match('app.getmetastream.com')) {
            if (path === '/') {
                details = 'Home';
                var menu_item = document.querySelector('.MenuTabs__tabItem__2ny6A.MenuTabs__selected__c65wY');
                if (menu_item)
                    state = `Viewing ${menu_item.textContent}`;
            }
            if (path.match('/settings')) {
                details = 'Settings';
                var setting_item = document.querySelector('.SettingsMenu__tabItem__3ypki.SettingsMenu__selectedTab__OMITL');
                if (setting_item) {
                    state = `Viewing ${setting_item.textContent}`;
                }
            }
            if (path.match('/join')) {
                var connection_info = document.querySelector('.Connect__info__3Vwlv');
                var disconnection_info = document.querySelector('.Disconnect__info__3Uejx');
                var disconnection_label = document.querySelector('.Disconnect__info__3Uejx > span');
                var menu_header = document.querySelector('.MenuHeader__header__1SYq0');
                if (connection_info) {
                    details = 'Connecting...';
                }
                else if (disconnection_info) {
                    details = 'Disconnected';
                    if (disconnection_label) {
                        state = disconnection_label.textContent;
                    }
                }
                else if (menu_header) {
                    details = 'Setting up...';
                }
                else {
                    smallImageKey = 'live';
                    smallImageText = (yield strings).live;
                    var users = document.querySelector('.ListOverlay__list__1epFe') ||
                        document.createElement('HTMLDivElement');
                    var user_button = document.querySelector('.UserItem__menuBtn__1ST9k');
                    if (users.childElementCount === 1 || user_button !== null) {
                        details = `Hosting (${users.childElementCount} Users)`;
                    }
                    else {
                        details = `Watching (${users.childElementCount} Users)`;
                    }
                    var title = document.querySelector('.TitleBar__title__3VPpW');
                    if (title && title.textContent !== 'Metastream') {
                        state = title.textContent;
                        var current = document.querySelector('.Timeline__time__gcvG5:nth-child(1)');
                        var duration = document.querySelector('.Timeline__time__gcvG5:nth-child(3)');
                        if (current && duration) {
                            var timestamps = getTimestamps(current.textContent, duration.textContent);
                            startTimestamp = timestamps[0];
                            endTimestamp = timestamps[1];
                        }
                        var play = document.querySelector('.PlaybackControls__button__Q0pbe > svg > use');
                        if (play) {
                            if (play.href.baseVal.endsWith('pause')) {
                                smallImageKey = 'play';
                                smallImageText = (yield strings).play;
                                playing = true;
                            }
                            else {
                                smallImageKey = 'pause';
                                smallImageText = (yield strings).pause;
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
        largeImageKey: 'metastream',
        smallImageKey: smallImageKey,
        smallImageText: smallImageText,
        startTimestamp: startTimestamp,
        endTimestamp: endTimestamp
    };
    presence.setActivity(data, playing);
}));
function getTimestamps(audioTime, audioDuration) {
    var splitAudioTime = audioTime.split(':').reverse();
    var splitAudioDuration = audioDuration.split(':').reverse();
    var parsedAudioTime = getTime(splitAudioTime);
    var parsedAudioDuration = getTime(splitAudioDuration);
    var startTime = Date.now();
    var endTime = Math.floor(startTime / 1000) - parsedAudioTime + parsedAudioDuration;
    return [Math.floor(startTime / 1000), endTime];
}
function getTime(list) {
    var ret = 0;
    for (let index = list.length - 1; index >= 0; index--) {
        ret += parseInt(list[index]) * Math.pow(60, index);
    }
    return ret;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBLE1BQU0sUUFBUSxHQUFHLElBQUksUUFBUSxDQUFDO0lBQzVCLFFBQVEsRUFBRSxvQkFBb0I7Q0FDL0IsQ0FBQyxDQUFDO0FBQ0gsSUFBSSxPQUFPLEdBQUcsUUFBUSxDQUFDLFVBQVUsQ0FBQztJQUNoQyxJQUFJLEVBQUUsMkJBQTJCO0lBQ2pDLEtBQUssRUFBRSwwQkFBMEI7SUFDakMsSUFBSSxFQUFFLHdCQUF3QjtDQUMvQixDQUFDLENBQUM7QUFFSCxJQUFJLE9BQU8sRUFBRSxNQUFNLENBQUM7QUFFcEIsUUFBUSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsR0FBUyxFQUFFO0lBQ25DLElBQUksTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEtBQUssTUFBTSxFQUFFO1FBQ25DLE1BQU0sR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQztRQUM5QixPQUFPLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLENBQUM7S0FDekM7SUFFRCxJQUFJLE9BQU8sR0FBRyxTQUFTLEVBQ3JCLEtBQUssR0FBRyxTQUFTLEVBQ2pCLGFBQWEsR0FBRyxTQUFTLEVBQ3pCLGNBQWMsR0FBRyxTQUFTLEVBQzFCLGNBQWMsR0FBRyxPQUFPLEVBQ3hCLFlBQVksR0FBRyxTQUFTLEVBQ3hCLE9BQU8sR0FBRyxJQUFJLENBQUM7SUFFakIsSUFBSSxJQUFJLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUM7SUFDcEMsSUFBSSxJQUFJLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUM7SUFFcEMsSUFBSTtRQUNGLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyx1QkFBdUIsQ0FBQyxFQUFFO1lBQ3ZDLElBQUksSUFBSSxLQUFL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