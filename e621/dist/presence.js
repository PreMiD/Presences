var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var presence = new Presence({
    clientId: '616738921765667023',
    mediaKeys: false,
}), presenceData = {
    largeImageKey: 'logo',
};
presence.on('UpdateData', () => __awaiter(this, void 0, void 0, function* () {
    if (document.location.pathname == '/') {
        presenceData.details = 'Viewing the homepage';
    }
    else if (document.location.pathname == '/post' || document.location.pathname.startsWith('/post/')) {
        presenceData.details = 'Viewing posts';
        if (document.location.pathname.startsWith('/post/show')) {
            presenceData.details = 'Viewing post';
            presenceData.state = `#${document.location.pathname.split('/post/show/')[1]}`;
            if (document.querySelectorAll('.tag-type-artist a').length > 0) {
                var artists = [];
                Array.from(document.querySelectorAll('.tag-type-artist')).forEach(artistHTML => {
                    if (Array.from(artistHTML.querySelectorAll('a'))[1]) {
                        artists.push(Array.from(artistHTML.querySelectorAll('a'))[1].innerText);
                    }
                });
                presenceData.details = `Viewing #${document.location.pathname.split('/post/show/')[1]}`;
                presenceData.state = 'by ' + artists;
            }
            if (document.querySelector('.sidebar .status-notice div[id^=pool]')) {
                var PoolName = document.querySelector('.sidebar .status-notice div[id^=pool]').querySelector('p').innerText;
                presenceData.details = `Viewing ${PoolName} (#${document.location.pathname.split('/post/show/')[1]})`;
                presenceData.state = 'by ' + artists;
            }
        }
        else if (document.location.pathname.startsWith('/post/popular_by_day')) {
            presenceData.details = 'Viewing posts';
            presenceData.state = 'Popular by Day';
        }
        else if (document.location.pathname.startsWith('/post/popular_by_week')) {
            presenceData.details = 'Viewing posts';
            presenceData.state = 'Popular by Week';
        }
        else if (document.location.pathname.startsWith('/post/popular_by_month')) {
            presenceData.details = 'Viewing posts';
            presenceData.state = 'Popular by Month';
        }
    }
    else if (document.location.pathname.startsWith('/forum')) {
        presenceData.details = 'Viewing the forum';
    }
    else if (document.location.pathname.startsWith('/user/show')) {
        presenceData.details = 'Viewing user';
        var HTMLElement = document.querySelector('#userpage div h2');
        presenceData.state = HTMLElement.innerHTML.split('<span')[0];
    }
    else {
        presenceData.details = `Viewing "${document.title.split(' - e621')[0]}"`;
    }
    presence.setActivity(presenceData);
}));
