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
var lastRadio = '';
var browsingStamp = 0;

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
                if(!browsingStamp || path[1] != lastRadio) {
                    browsingStamp = Math.floor(Date.now() / 1000);
                }
                presenceData.startTimestamp = browsingStamp;
                lastRadio = path[1];
            } else {
                presenceData.smallImageKey = 'pause';
                presenceData.smallImageText = (yield strings).pause;
                browsingStamp = 0;
            }
            break;
        case 'p':
            browsingStamp = 0;
            presenceData.details = document.querySelectorAll('h1')['0'].firstChild.data;
            presenceData.state = document.getElementsByClassName('player__song')['0'].innerText;
            if(!document.getElementsByClassName('player__animate-icon player__animate-icon--playing')['0'].style.display) {
                presenceData.smallImageKey = 'play';
                presenceData.smallImageText = (yield strings).play;
                presenceData.startTimestamp = 0;
                presenceData.endTimestamp = 0;
                var times = document.getElementsByClassName('player__timing-wrap')['0'].innerText.split('\n|\n');
                times[0].split(':').reverse().forEach((time, pos) => {
                    presenceData.startTimestamp += parseInt(time) * Math.pow(60, pos);
                })
                presenceData.startTimestamp = Math.floor(Date.now() / 1000) - presenceData.startTimestamp;
                times[1].split(':').reverse().forEach((time, pos) => {
                    presenceData.endTimestamp += parseInt(time) * Math.pow(60, pos);
                })
                presenceData.endTimestamp = presenceData.startTimestamp + presenceData.endTimestamp;
            } else {
                presenceData.smallImageKey = 'pause';
                presenceData.smallImageText = (yield strings).pause;
            }
            break;
        case 'search':
            browsingStamp = 0;
            presenceData.details = `Searching for "${new URLSearchParams(window.location.search).get('q')}"`;
            presenceData.smallImageKey = 'search';
            presenceData.smallImageText = 'Searching';
            break;
        case 'genre':
            browsingStamp = 0;
            if(path.length > 1) {
                presenceData.details = `Browsing genre "${document.getElementsByClassName('headline-large')['0'].firstChild.data.replace('\n', '')}"`;
            } else {
                presenceData.details = 'Browsing through genres';
            }
            break;
        case 'topic':
            browsingStamp = 0;
            if(path.length > 1) {
                presenceData.details = `Browsing topic "${document.getElementsByClassName('headline-large')['0'].firstChild.data.replace('\n', '')}"`;
            } else {
                presenceData.details = 'Browsing through topics';
            }
            break;
        case 'country':
        case 'city':
            browsingStamp = 0;
            presenceData.details = `Browsing through ${document.getElementsByClassName('headline-large')['0'].innerText.split(' ')[0]} stations from ${document.getElementsByClassName('headline-large')['0'].innerText.split(' ').slice(1).join(' ')}`;
            break;
        case 'local-stations':
            browsingStamp = 0;
            presenceData.details = 'Browsing through local stations';
            break;
        case 'top-stations':
            browsingStamp = 0;
            presenceData.details = 'Browsing through top stations';
            break;
        default:
            presence.setTrayTitle('Radio.net');
            presence.setActivity();
            return;
    }

    presence.setActivity(presenceData);
}));