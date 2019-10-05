var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const presence = new Presence({
    clientId: '612437291574755349',
    mediaKeys: false
});
console.log('When using the Twitter presence for PreMiD, make sure you have the latest UI update. Twitter classic and any legacy versions before it will not work with this presence.');
var oldUrl, elapsed;
presence.on('UpdateData', () => __awaiter(this, void 0, void 0, function* () {
    var title, info, image = 'twitter';
    const path = window.location.pathname;
    if (oldUrl !== window.location.href) {
        oldUrl = window.location.href;
        elapsed = Math.floor(Date.now() / 1000);
    }
    title = 'Browsing...';
    info = capitalize(path.split('/')[1]);
    if (path.match('/i/')) {
        info = capitalize(path.split('/')[2]);
    }
    if (path.match('/tos')) {
        title = 'Browsing...';
        info = 'Terms of Service';
    }
    if (path.match('/privacy')) {
        title = 'Browsing...';
        info = 'Privacy Policy';
    }
    if (path.match('/settings/')) {
        info = `${capitalize(path.split('/')[1])} for ${path
            .split('/')[2]
            .replace(/[\[{(_)}\]]/g, ' ')}`;
    }
    if (path.match('/search')) {
        title = 'Browsing Search...';
        var selectedList = document.querySelectorAll('.r-bzsno3 > div > span');
        if (selectedList === null)
            return;
        info = stripText(selectedList[1], 'Selected');
    }
    var objHeader = document.querySelector('span.css-901oao.css-16my406.css-bfa6kz.r-jwli3a.r-1qd0xha.r-1vr29t4.r-ad9z0x.r-bcqeeo.r-3s2u2q.r-qvutc0 > span > span');
    if (objHeader) {
        title = 'Browsing Profile...';
        info = `${stripText(objHeader, 'Object Header')} // ${capitalize(path.split('/')[1])}`;
        if (path.match('/with_replies')) {
            title = 'Browsing Profile Tweet/Replies...';
        }
        if (path.match('/media')) {
            title = 'Browsing Profile Media...';
        }
        if (path.match('/likes')) {
            title = 'Browsing Profile Likes...';
        }
    }
    if (objHeader === null && path.match('/status/')) {
        title = 'Browsing Tweet...';
        info = stripText(document.querySelector('div.css-901oao.css-bfa6kz.r-jwli3a.r-1qd0xha.r-a023e6.r-vw2c0b.r-ad9z0x.r-bcqeeo.r-3s2u2q.r-qvutc0 > span > span'), 'Tweet');
    }
    if (path.match('/messages') && objHeader) {
        title = 'Browsing Message...';
        info = stripText(objHeader, 'Object Header');
    }
    var etcHeader = document.querySelector('div.css-1dbjc4n.r-16y2uox.r-1wbh5a2.r-1pi2tsx.r-1777fci > div > h2 > span');
    if (path.match('/moments') && etcHeader) {
        title = 'Browsing Moments...';
        info = capitalize(path.split('/')[1]);
    }
    if (path.match('/lists') && etcHeader) {
        title = 'Browsing Lists...';
        info = capitalize(path.split('/')[1]);
    }
    if (window.location.href.match('tweetdeck.twitter.com/')) {
        var container = document.querySelector('#container > div') ||
            document.createElement('HTMLDivElement');
        title = `Tweetdeck (${container.childElementCount} Columns)`;
        info = undefined;
        image = 'tweetdeck';
        var header = document.querySelector('.mdl-header-title');
        var profile = document.querySelector('.js-action-url > .fullname');
        if (header) {
            info = 'Viewing ' + capitalize(header.textContent);
        }
        if (profile) {
            info = 'Viewing Profile // ' + profile.textContent;
        }
    }
    var data = {
        details: title,
        state: info,
        largeImageKey: image,
        startTimestamp: elapsed
    };
    presence.setActivity(data, true);
}));
function capitalize(text) {
    var ret = '';
    var texts = text.replace(/[\[{(_)}\]]/g, ' ').split(' ');
    texts.map(text => {
        ret += text.charAt(0).toUpperCase() + text.slice(1) + ' ';
    });
    return ret;
}
function stripText(element, id = 'None', log = true) {
    if (element && element.firstChild) {
        return element.firstChild.textContent;
    }
    else {
        if (log)
            console.log('%cTwitter%cERROR%c An error occurred while stripping data off the page. Please contact Alanexei on the PreMiD Discord server, and send him a screenshot of this error. ID: ' +
                id, 'font-weight: 800; padding: 2px 5px; color: white; border-radius: 25px 0 0 25px; background: #596cae;', 'font-weight: 800; padding: 2px 5px; color: white; border-radius: 0 25px 25px 0; background: #ff5050;', 'color: unset;');
        return null;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBLE1BQU0sUUFBUSxHQUFHLElBQUksUUFBUSxDQUFDO0lBQzVCLFFBQVEsRUFBRSxvQkFBb0I7SUFDOUIsU0FBUyxFQUFFLEtBQUs7Q0FDakIsQ0FBQyxDQUFDO0FBRUgsT0FBTyxDQUFDLEdBQUcsQ0FDVCwwS0FBMEssQ0FDM0ssQ0FBQztBQUVGLElBQUksTUFBTSxFQUFFLE9BQU8sQ0FBQztBQUVwQixRQUFRLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxHQUFTLEVBQUU7SUFDbkMsSUFBSSxLQUFLLEVBQ1AsSUFBSSxFQUNKLEtBQUssR0FBRyxTQUFTLENBQUM7SUFFcEIsTUFBTSxJQUFJLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUM7SUFFdEMsSUFBSSxNQUFNLEtBQUssTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUU7UUFDbkMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDO1FBQzlCLE9BQU8sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUMsQ0FBQztLQUN6QztJQUVELEtBQUssR0FBRyxhQUFhLENBQUM7SUFDdEIsSUFBSSxHQUFHLFVBQVUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFFdEMsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxFQUFFO1FBQ3JCLElBQUksR0FBRyxVQUFVLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0tBQ3ZDO0lBRUQsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxFQUFFO1FBQ3RCLEtBQUss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