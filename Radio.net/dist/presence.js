//-----------------------------------------------------------------------------------------------------------------------------------------------------
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
    mediaKeys: true
}), strings = presence.getStrings({
    play: 'presence.playback.playing',
    pause: 'presence.playback.paused',
    search: 'presence.activity.searching',
    browsing: 'presence.activity.browsing'
});
//-----------------------------------------------------------------------------------------------------------------------------------------------------
var lastPath = '';//Last played radio station or podcast
var browsingStamp = 0;//Timestamp when started listening to a radio station
//-----------------------------------------------------------------------------------------------------------------------------------------------------
presence.on('UpdateData', () => __awaiter(this, void 0, void 0, function* () {
    const host = window.location.hostname.replace('www.', '');
    const path = window.location.pathname.split('/').slice(1);
    var presenceData = {
        details: 'Radio.net',
        largeImageKey: 'logo_big'
    };

    switch(path[0]) {
        //Radio
        //------------------------------------------------------------------------------
        case 's':
            if(!document.getElementsByClassName('player__animate-icon player__animate-icon--playing')[0].style.display) {
                //Radio is playing
                //---------------------------------------
                if(!browsingStamp || lastPath != path[1]) browsingStamp = Math.floor(Date.now() / 1000);
                presenceData.startTimestamp = browsingStamp;
                lastPath = path[1];

                presenceData.smallImageKey = 'play';
                presenceData.smallImageText = (yield strings).play;

                presenceData.details = document.querySelector('h1').innerText;
                presenceData.state = document.getElementsByClassName('player__song')[0].innerText;
            } else {
                //Radio is paused
                //---------------------------------------
                browsingStamp = 0;
                lastPath = '';

                presenceData.smallImageKey = 'pause';
                presenceData.smallImageText = (yield strings).pause;

                presenceData.details = document.querySelector('h1').innerText;
                presenceData.state = `${document.getElementById('st-ov-city-text').innerText}, ${document.getElementById('st-ov-country-text').innerText}`;
                var tags = document.getElementsByClassName('station-info-tags__item');
                tags = Object.keys(tags).map(tag => tags[tag]).filter(tag => tag.id.startsWith('st-ov-genre-text') || tag.id.startsWith('st-ov-topic-text'));
                for(var i = 0; i < tags.length; i++) {
                    if(i == 0) {
                        presenceData.state += ` / ${tags[i].innerText}`;
                    } else {
                        presenceData.state += `, ${tags[i].innerText}`;
                    }
                }

                if(!document.getElementsByClassName('player__info-wrap flex')[0].style.display) {
                    var times = document.getElementsByClassName('player__info-wrap flex')[0].innerText.match(/\d+/g);

                    if(times.length > 0) {
                        //Ad is playing
                        presenceData.startTimestamp = Math.floor(Date.now() / 1000);
                        presenceData.endTimestamp = presenceData.startTimestamp + parseInt(times[0]);

                        presenceData.smallImageKey = 'play';
                        presenceData.smallImageText = (yield strings).play;
                        
                        presenceData.state = 'Currently watching an ad';
                    } else {
                        //Radio is buffering
                        presenceData.state = document.getElementsByClassName('player__info-wrap flex')[0].innerText;
                    }
                }
            }
            break;
        //Podcast
        //------------------------------------------------------------------------------
        case 'p':
            if(!document.getElementsByClassName('player__animate-icon player__animate-icon--playing')[0].style.display) {
                //Podcast is playing
                //---------------------------------------
                if(!browsingStamp || lastPath != path[1]) browsingStamp = Math.floor(Date.now() / 1000);
                var times = document.getElementsByClassName('player__timing-wrap')[0].innerText.split('\n|\n');
                presenceData.startTimestamp = 0;
                times[0].split(':').reverse().forEach((time, pos) => presenceData.startTimestamp += parseInt(time) * Math.pow(60, pos));
                presenceData.startTimestamp = Math.floor(Date.now() / 1000) - presenceData.startTimestamp;
                presenceData.endTimestamp = 0;
                times[1].split(':').reverse().forEach((time, pos) => presenceData.endTimestamp += 0 + parseInt(time) * Math.pow(60, pos));
                presenceData.endTimestamp = presenceData.startTimestamp + presenceData.endTimestamp;
                lastPath = path[1];

                presenceData.smallImageKey = 'play';
                presenceData.smallImageText = (yield strings).play;

                presenceData.details = document.querySelector('h1').innerText;
                presenceData.state = document.getElementsByClassName('player__song')[0].innerText;
            } else {
                //Podcast is paused
                //---------------------------------------
                browsingStamp = 0;
                lastPath = '';

                presenceData.smallImageKey = 'pause';
                presenceData.smallImageText = (yield strings).pause;

                presenceData.details = document.querySelector('h1').innerText;
                presenceData.state = `${document.getElementById('st-ov-city-text').innerText}, ${document.getElementById('st-ov-country-text').innerText}`;
                var tags = document.getElementsByClassName('station-info-tags__item');
                tags = Object.keys(tags).map(tag => tags[tag]).filter(tag => tag.id.startsWith('st-ov-genre-text') || tag.id.startsWith('st-ov-topic-text'));
                for(var i = 0; i < tags.length; i++) {
                    if(i == 0) {
                        presenceData.state += ` / ${tags[i].innerText}`;
                    } else {
                        presenceData.state += `, ${tags[i].innerText}`;
                    }
                }

                if(!document.getElementsByClassName('player__info-wrap flex')[0].style.display) {
                    var times = document.getElementsByClassName('player__info-wrap flex')[0].innerText.match(/\d+/g);

                    if(times.length > 0) {
                        //Ad is playing
                        presenceData.startTimestamp = Math.floor(Date.now() / 1000);
                        presenceData.endTimestamp = presenceData.startTimestamp + parseInt(times[0]);

                        presenceData.smallImageKey = 'play';
                        presenceData.smallImageText = (yield strings).play;
                        
                        presenceData.state = 'Currently watching an ad';
                    } else {
                        //Radio is buffering
                        presenceData.state = document.getElementsByClassName('player__info-wrap flex')[0].innerText;
                    }
                }
            }
            break;
        //Search
        //------------------------------------------------------------------------------
        case 'search':
            browsingStamp = 0;
            presenceData.smallImageKey = 'search';
            presenceData.smallImageText = (yield strings).search;

            var results = document.querySelector('h1').innerText.match(/\d+/g)[0];
            presenceData.details = new URLSearchParams(window.location.search).get('q');
            presenceData.state = `${results} results`;
            break;
        //Genre
        //Topic
        //------------------------------------------------------------------------------
        case 'genre':
        case 'topic':
            browsingStamp = 0;
            presenceData.smallImageKey = 'reading';
            presenceData.smallImageText = (yield strings).browsing;

            presenceData.details = document.querySelector('h1').innerText;
            break;
        //Country
        //City
        //------------------------------------------------------------------------------
        case 'country':
        case 'city':
            browsingStamp = 0;
            presenceData.smallImageKey = 'reading';
            presenceData.smallImageText = (yield strings).browsing;

            presenceData.details = document.querySelector('h1').innerText;
            break;
        //Local Stations
        //Top 100 Stations
        //------------------------------------------------------------------------------
        case 'local-stations':
        case 'top-stations':
            browsingStamp = 0;
            presenceData.smallImageKey = 'reading';
            presenceData.smallImageText = (yield strings).browsing;

            presenceData.details = document.querySelector('h1').innerText;
            break;
        //My Profile
        //Recently Played
        //My Favorites
        //------------------------------------------------------------------------------
        case 'profile':
        case 'recents':
        case 'favorites':
            browsingStamp = 0;
            presenceData.details = document.title;
            break;
        //Smartphone Apps
        //------------------------------------------------------------------------------
        case 'iphone':
        case 'ipad':
        case 'android':
        case 'windowsphone':
        case 'blackberry':
            browsingStamp = 0;
            presenceData.details = document.title;
            break;
        //Unknown
        //------------------------------------------------------------------------------
        default:
            presence.setTrayTitle();
            presence.setActivity();
            return;
        //------------------------------------------------------------------------------
    }

    presence.setActivity(presenceData);
}));
//-----------------------------------------------------------------------------------------------------------------------------------------------------
presence.on('MediaKeys', key => {
    switch(key) {
        //Play / Pause / Stop
        //------------------------------------------------------------------------------
        case 'pause':
        if(!document.getElementsByClassName('player__animate-icon player__animate-icon--playing')['0'].style.display) {
            if(!document.getElementsByClassName('player__button player__button--stopped')[0].style.display) document.getElementsByClassName('player__button player__button--playing')[0].click();
        } else {
            if(!document.getElementsByClassName('player__button player__button--playing')[0].style.display) document.getElementsByClassName('player__button player__button--stopped')[0].click()
        }
        //Skip
        //------------------------------------------------------------------------------
        case 'nextTrack':
            if(!document.getElementsByClassName('player__button player__button--next')[0].style.display) document.getElementsByClassName('player__button player__button--next')[0].click();
            break;
        //Rewind
        //------------------------------------------------------------------------------
        case 'previousTrack':
            if(!document.getElementsByClassName('player__button player__button--prev')[0].style.display) document.getElementsByClassName('player__button player__button--prev')[0].click();
            break;
        //------------------------------------------------------------------------------
    }
});
//-----------------------------------------------------------------------------------------------------------------------------------------------------