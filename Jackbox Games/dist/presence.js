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
    clientId: '665519810054062100',
    mediaKeys: false
});
//-----------------------------------------------------------------------------------------------------------------------------------------------------
var language = navigator.language || navigator.userLanguage;//Browser language
var lastPage = '';//Last viewed page
var browsingStamp = 0;//Timestamp when started viewing a page
var alerts = [];

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
    const host = window.location.hostname.replace('www.', '');
    const path = window.location.pathname.split('/').slice(1);
    var presenceData = {
        details: 'Jackbox Games',
        largeImageKey: 'logo_big'
    };

    switch(host) {
        //Jackbox.TV
        //------------------------------------------------------------------------------
        case 'jackbox.tv':
            var page = document.getElementsByClassName('page')[0].id.replace('page-', '');
            var game = '';
            if(lastPage != page) {
                lastPage = page;
                browsingStamp = Date.now();
            }
            switch(page) {
                //Fakin' it
                //---------------------------------------
                case 'fakinit':
                    game = 'Fakin\' it';
                    break;
                //Guesspionage
                //---------------------------------------
                case 'pollposition':
                    game = 'Guesspionage';
                    break;
                //Quiplash
                //---------------------------------------
                case 'quiplash':
                    game = 'Quiplash';
                    break;
                //Tee K.O.
                //---------------------------------------
                case 'awshirt':
                    game = 'Tee K.O.';
                    break;
                //Trivia Murder Party
                //---------------------------------------
                case 'triviadeath':
                    game = 'Trivia Murder Party';
                    break;
                //Sign In
                //---------------------------------------
                case 'signin':
                    break;
                //Unknown
                //---------------------------------------
                default:
                    if(!alerts.includes(page)) {
                        //This part is needed because there are so many Jackbox games to buy and they're adding new ones each year. The id is needed to specify which game is currently being played.
                        alerts.push(page);
                        switch(language) {
                            case 'de':
                                alert(`Dein aktuelles Jackbox Spiel wurde noch nicht zur PreMiD Presence hinzugefügt!\nBitte kontaktiere den Autor dieser Presence (ACertainCoder#9011) mit den Namen deines Spiels zusammen mit der ID "${page}".`);
                                break;
                            case 'en':
                                alert(`Your current jackbox game has not been added to the PreMiD presence yet!\nPlease contact the author of this presence (ACertainCoder#9011) with the name of your game together with the ID "${page}".`);
                                break;
                        }
                    }
                    presence.setTrayTitle();
                    presence.setActivity();
                    return;
            }
            switch(language) {
                case 'de':
                    if(page == 'signin') {
                        presenceData.details = 'Anmeldung';
                    } else {
                        presenceData.details = `Spielt ${game}`;
                        presence.state = `als ${document.getElementById('player').innerText}`;
                    }
                    break;
                case 'en':
                    if(page == 'signin') {
                        presenceData.details = 'Login';
                    } else {
                        presenceData.details = `Playing ${game}`;
                    }
                    break;
            }
            presenceData.startTimestamp = browsingStamp;
            break;
        //Jackbox Games
        //------------------------------------------------------------------------------
        case 'jackboxgames.com':
            if(path[0]) {
                var pages = {
                    'de': {
                        'about': 'Über uns',
                        'games': 'Spiele',
                        'how-to-play': 'Spielanleitung',
                        'blog': 'Blog',
                        'streamers': 'Streamer',
                        'contact': 'Kontakt'
                    },
                    'en': {
                        'about': 'About Us',
                        'games': 'Games',
                        'how-to-play': 'How To Play',
                        'blog': 'Blog',
                        'streamers': 'Streamers',
                        'contact': 'Contact'
                    }
                };
                var heading = document.getElementsByClassName('elementor-heading-title elementor-size-default')[0];
                var page = pages[language][path[0]] ? pages[language][path[0]] : (heading ? heading.innerText.replace(/About\s*/, '') : undefined);
                var game = pages[language][path[0]] ? false : true;
                if(page) {
                    switch(language) {
                        case 'de':
                            if(game) {
                                presenceData.details = `Betrachtet das Spiel "${page}"`;
                            } else {
                                presenceData.details = `Betrachtet die Seite "${page}"`;
                            }
                            break;
                        case 'en':
                            if(game) {
                                presenceData.details = `Viewing the game "${page}"`;
                            } else {
                                presenceData.details = `Viewing the page "${page}"`;
                            }
                            break;
                    }
                    presenceData.startTimestamp = Date.now();
                } else {
                    presence.setTrayTitle();
                    presence.setActivity();
                    return;
                }
            } else {
                presence.setTrayTitle();
                presence.setActivity();
                return;
            }
            break;
    }

    presence.setActivity(presenceData);
}));
//-----------------------------------------------------------------------------------------------------------------------------------------------------