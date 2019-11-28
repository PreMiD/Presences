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
    pause: 'presence.playback.paused'
});
//-----------------------------------------------------------------------------------------------------------------------------------------------------
var language = navigator.language || navigator.userLanguage;//Browser language
var lastPath = '';//Last played radio station or podcast
var browsingStamp = 0;//Timestamp when started listening to a radio station
switch(language) {
    //German
    //---------------------------------------
    case 'de':
    case 'de-CH':
    case 'de-AT':
    case 'de-LU':
    case 'de-LI':
        language = 'de';
        break;
    //English / Unknown
    //---------------------------------------
    case 'en':
    case 'en-US':
    case 'en-EG':
    case 'en-AU':
    case 'en-GB':
    case 'en-CA':
    case 'en-NZ':
    case 'en-IE':
    case 'en-ZA':
    case 'en-JM':
    case 'en-BZ':
    case 'en-TT':
    default:
        language = 'en';
        break;
}

//-----------------------------------------------------------------------------------------------------------------------------------------------------
presence.on('UpdateData', () => __awaiter(this, void 0, void 0, function* () {
    if(!window.playerCallbacks) {
        window.updateCommands('playerCallbacks');
    }
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
            if(!document.getElementsByClassName('player__animate-icon player__animate-icon--playing')['0'].style.display) {
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
                //Radio is stopped / Ad is playing
                //---------------------------------------
                browsingStamp = 0;
                lastPath = '';

                presenceData.smallImageKey = 'pause';
                presenceData.smallImageText = (yield strings).pause;

                presenceData.details = document.querySelector('h1').innerText;
                presenceData.state = window.location.toString();
            }
            break;
        //Podcast
        //------------------------------------------------------------------------------
        case 'p':
            if(!document.getElementsByClassName('player__animate-icon player__animate-icon--playing')['0'].style.display) {
                //Podcast is playing
                //---------------------------------------
                if(!browsingStamp || lastPath != path[1]) browsingStamp = Math.floor(Date.now() / 1000);
                var times = document.getElementsByClassName('player__timing-wrap')['0'].innerText.split('\n|\n');
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
                //Podcast is paused / Ad is playing
                //---------------------------------------
                browsingStamp = 0;
                lastPath = '';

                presenceData.smallImageKey = 'pause';
                presenceData.smallImageText = (yield strings).pause;

                presenceData.details = document.querySelector('h1').innerText;
                presenceData.state = window.location.toString();
            }
            break;
        //Search
        //------------------------------------------------------------------------------
        case 'search':
            browsingStamp = 0;
            presenceData.smallImageKey = 'search';
            switch(language) {
                case 'de':
                    presenceData.smallImageText = 'Sucht';
                    presenceData.details = `Sucht nach "${new URLSearchParams(window.location.search).get('q')}"`;
                    presenceData.state = `Ergebnisse: ${document.getElementsByClassName('headline-large')[0].firstElementChild.innerText}`;
                    break;
                case 'en':
                    presenceData.smallImageText = 'Searching';
                    presenceData.details = `Searching for "${new URLSearchParams(window.location.search).get('q')}"`;
                    presenceData.state = `Results: ${document.getElementsByClassName('headline-large')[0].firstElementChild.innerText}`;
                    break;
            }
            break;
        //Genre
        //------------------------------------------------------------------------------
        case 'genre':
            browsingStamp = 0;
            presenceData.smallImageKey = 'reading';
            switch(language) {
                case 'de':
                    presenceData.smallImageText = 'Stöbert';
                    presenceData.details = 'Durchstöbert Musikrichtungen';
                    if(host != 'radio.net') presenceData.state = `auf ${host}`;
                    break;
                case 'en':
                    presenceData.smallImageText = 'Rummaging';
                    presenceData.details = 'Browsing through genres';
                    if(host != 'radio.net') presenceData.state = `on ${host}`;
                    break;
            }
            if(path.length > 1) {
                switch(language) {
                    case 'de':
                        presenceData.details = `Musikrichtung: ${document.getElementsByClassName('headline-large')[1].lastElementChild.innerText}`;
                        presenceData.state = `Ergebnisse: ${document.getElementsByClassName('headline-large')[1].firstElementChild.innerText}`;
                        break;
                    case 'en':
                        presenceData.details = `Genre: ${document.getElementsByClassName('headline-large')[1].lastElementChild.innerText}`;
                        presenceData.state = `Results: ${document.getElementsByClassName('headline-large')[1].firstElementChild.innerText}`;
                        break;
                }
            }
            break;
        //Topic
        //------------------------------------------------------------------------------
        case 'topic':
            browsingStamp = 0;
            presenceData.smallImageKey = 'reading';
            switch(language) {
                case 'de':
                    presenceData.smallImageText = 'Stöbert';
                    presenceData.details = 'Durchstöbert Themen';
                    if(host != 'radio.net') presenceData.state = `auf ${host}`;
                    break;
                case 'en':
                    presenceData.smallImageText = 'Rummaging';
                    presenceData.details = 'Browsing through topics';
                    if(host != 'radio.net') presenceData.state = `on ${host}`;
                    break;
            }
            if(path.length > 1) {
                switch(language) {
                    case 'de':
                        presenceData.details = `Thema: ${document.getElementsByClassName('headline-large')[1].lastElementChild.innerText}`;
                        presenceData.state = `Ergebnisse: ${document.getElementsByClassName('headline-large')[1].firstElementChild.innerText}`;
                        break;
                    case 'en':
                        presenceData.details = `Topic: ${document.getElementsByClassName('headline-large')[1].lastElementChild.innerText}`;
                        presenceData.state = `Results: ${document.getElementsByClassName('headline-large')[1].firstElementChild.innerText}`;
                        break;
                }
            }
            break;
        //Country
        //------------------------------------------------------------------------------
        case 'country':
            browsingStamp = 0;
            presenceData.smallImageKey = 'reading';
            switch(language) {
                case 'de':
                    presenceData.smallImageText = 'Stöbert';
                    presenceData.details = `Land: ${document.getElementsByClassName('headline-large')[0].lastElementChild.innerText}`;
                    presenceData.state = `Ergebnisse: ${document.getElementsByClassName('headline-large')[0].firstElementChild.innerText}`;
                    break;
                case 'en':
                    presenceData.smallImageText = 'Rummaging';
                    presenceData.details = `Country: ${document.getElementsByClassName('headline-large')[0].lastElementChild.innerText}`;
                    presenceData.state = `Results: ${document.getElementsByClassName('headline-large')[0].firstElementChild.innerText}`;
                    break;
            }
            break;
        //City
        //------------------------------------------------------------------------------
        case 'city':
            browsingStamp = 0;
            presenceData.smallImageKey = 'reading';
            switch(language) {
                case 'de':
                    presenceData.smallImageText = 'Stöbert';
                    presenceData.details = `Stadt: ${document.getElementsByClassName('headline-large')[0].lastElementChild.innerText}`;
                    presenceData.state = `Ergebnisse: ${document.getElementsByClassName('headline-large')[0].firstElementChild.innerText}`;
                    break;
                case 'en':
                    presenceData.smallImageText = 'Rummaging';
                    presenceData.details = `City: ${document.getElementsByClassName('headline-large')[0].lastElementChild.innerText}`;
                    presenceData.state = `Results: ${document.getElementsByClassName('headline-large')[0].firstElementChild.innerText}`;
                    break;
            }
            break;
        //Local Stations
        //------------------------------------------------------------------------------
        case 'local-stations':
            browsingStamp = 0;
            presenceData.smallImageKey = 'reading';
            switch(language) {
                case 'de':
                    presenceData.smallImageText = 'Stöbert';
                    presenceData.details = `Durchstöbert ${document.getElementsByClassName('headline-large')[0].firstElementChild.innerText} lokale Radios`;
                    if(host != 'radio.net') presenceData.state = `auf ${host}`;
                    break;
                case 'en':
                    presenceData.smallImageText = 'Rummaging';
                    presenceData.details = `Browsing through ${document.getElementsByClassName('headline-large')[0].firstElementChild.innerText} local radios`;
                    if(host != 'radio.net') presenceData.state = `on ${host}`;
                    break;
            }
            break;
        //Top 100 Stations
        //------------------------------------------------------------------------------
        case 'top-stations':
            browsingStamp = 0;
            presenceData.smallImageKey = 'reading';
            switch(language) {
                case 'de':
                    presenceData.smallImageText = 'Stöbert';
                    presenceData.details = `Top 100 Radios`;
                    if(host != 'radio.net') presenceData.state = `auf ${host}`;
                    break;
                case 'en':
                    presenceData.smallImageText = 'Rummaging';
                    presenceData.details = `Top 100 radios`;
                    if(host != 'radio.net') presenceData.state = `on ${host}`;
                    break;
            }
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