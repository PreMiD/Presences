var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var presence = new Presence({
    clientId: '634124614544392193',
    mediaKeys: false
}), strings = presence.getStrings({
    play: 'presence.playback.playing',
    pause: 'presence.playback.paused'
});
var browsingStamp = Math.floor(Date.now() / 1000);

presence.on('UpdateData', () => __awaiter(this, void 0, void 0, function* () {
    var presenceData = {
        details: 'Radio.net',
        largeImageKey: 'logo_big'
    };
    var path = window.location.pathname.split('/').slice(1);

    switch(path[0]) {
        case 's':
            presenceData.details = document.querySelectorAll('h1')['0'].firstChild.data;
            presenceData.state = document.getElementsByClassName('player__song')['0'].innerText;
            if(!document.getElementsByClassName('player__animate-icon player__animate-icon--playing')['0'].style.display) {
                presenceData.smallImageKey = 'play';
                presenceData.smallImageText = (yield strings).play;
                presenceData.startTimestamp = browsingStamp = Math.floor(Date.now() / 1000);
            } else {
                presenceData.smallImageKey = 'pause';
                presenceData.smallImageText = (yield strings).pause;
            }
            break;
        case 'search':
            presenceData.details = `Searching for "${new URLSearchParams(window.location.search).get('q')}"`;
            presenceData.smallImageKey = 'search';
            presenceData.smallImageText = 'Searching';
            break;
        case 'genre':
            if(path.length > 1) {
                presenceData.details = `Browsing genre "${document.getElementsByClassName('headline-large')['0'].firstChild.data.replace('\n', '')}"`;
            } else {
                presenceData.details = 'Browsing through genres';
            }
            break;
        case 'topic':
            if(path.length > 1) {
                presenceData.details = `Browsing topic "${document.getElementsByClassName('headline-large')['0'].firstChild.data.replace('\n', '')}"`;
            } else {
                presenceData.details = 'Browsing through topics';
            }
            break;
        case 'local-stations':
            presenceData.details = 'Browsing through local stations';
            break;
        case 'top-stations':
            presenceData.details = 'Browsing through top stations';
            break;
        default:
            if(path.length > 0) {
                presenceData.details = 'Browsing';
            } else {
                presenceData.details = 'Home';
            }
            break;
    }

    presence.setActivity(presenceData);
}));