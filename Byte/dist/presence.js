var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var presence = new Presence({
    clientId: '671199009674756146'
});
var strings = presence.getStrings({
    browse: 'presence.activity.browsing',
    search: 'presence.activity.searching'
});
var oldUrl, elapsed;
const statics = {
    '/': {
        details: 'Browsing'
    },
    '/about/': {
        details: 'Viewing',
        state: 'About'
    },
    '/faq/': {
        details: 'Viewing',
        state: 'Frequently Asked Questions'
    },
    '/terms/': {
        details: 'Viewing',
        state: 'Terms of Service'
    },
    '/tos/': {
        details: 'Viewing',
        state: 'Terms of Service'
    },
    '/privacy/': {
        details: 'Viewing',
        state: 'Privacy'
    },
    '/guidelines/': {
        details: 'Viewing',
        state: 'Guidelines'
    },
    '/contact/': {
        details: 'Viewing',
        state: 'Contact'
    }
};
presence.on('UpdateData', () => __awaiter(this, void 0, void 0, function* () {
    const host = location.host;
    const path = location.pathname.replace(/\/?$/, '/');
    var data = {
        details: undefined,
        state: undefined,
        largeImageKey: 'byte',
        smallImageKey: undefined,
        smallImageText: undefined,
        startTimestamp: undefined,
        endTimestamp: undefined
    };
    if (oldUrl !== path) {
        oldUrl = path;
        elapsed = Math.floor(Date.now() / 1000);
    }
    if (path in statics) {
        data = Object.assign({}, data, statics[path]);
    }
    if (elapsed) {
        data.startTimestamp = elapsed;
    }
    if (host === 'community.byte.co') {
        data.details = 'Browsing Community';
        data.largeImageKey = 'bytecom';
        if (path.match('/categories/') ||
            path.match('/latest/') ||
            path.match('/top/') ||
            path.match('/unread/'))
            data.state = getElement('.active');
        if (path.match('/new/')) {
            data.state = 'Newest';
        }
        if (path.match('/badges/')) {
            data.details = 'Viewing Badges';
            data.state = getElement('.show-badge-details .badge-link');
        }
        if (path.match('/tags/')) {
            data.state = 'Tags';
        }
        if (path.match('/tag/')) {
            data.details = 'Viewing Tag';
            data.state = getElement('.discourse-tag');
        }
        if (path.match('/cakeday/')) {
            data.details = 'Viewing Cakedays';
            data.state = `${getElement('.nav-pills .active')} (${getElement('.anniversaries .nav-pills .active')})`;
        }
        if (path.match('/c/')) {
            data.details = 'Viewing Category';
            data.state = getElement('.selected-name .category-name');
            const tag = getElement('.active');
            if (tag) {
                data.details += `'s ${tag}`;
            }
        }
        if (path.match('/t/')) {
            data.details = 'Viewing Thread';
            data.state = getElement('.fancy-title');
        }
        if (path.match('/u/')) {
            data.details = 'Viewing Users';
            if (document.querySelector('.details')) {
                data.details = 'Viewing User';
                data.state = `${getElement('.username')} (${getElement('.full-name')})`;
                const tag = getElement('.active');
                if (tag) {
                    data.details += `'s ${tag}`;
                }
            }
        }
        if (path.match('/g/')) {
            data.details = 'Viewing Group';
            data.state = `${getElement('.group-info-name')} (${getElement('.group-info-full-name')})`;
            const tag = getElement('.active');
            if (tag) {
                data.details += `'s ${tag}`;
            }
        }
        if (path.match('/search/')) {
            data.details = 'Searching';
            data.smallImageKey = 'search';
            data.smallImageText = (yield strings).search;
            const search = document.querySelector('input');
            data.state = search.value !== '' ? search.value : undefined;
        }
    }
    if (host === 'help.byte.co') {
        data.details = 'Browsing Help';
        data.largeImageKey = 'bytehelp';
        if (path.match('/sections/')) {
            data.details = 'Viewing Section';
            data.state = getElement('h1');
        }
        if (path.match('/articles/')) {
            data.details = 'Viewing Article';
            data.state = getElement('.article-title');
        }
        if (path.match('/requests/new/')) {
            data.details = 'Creating';
            data.state = 'New Request';
        }
    }
    console.log(data);
    if (data && data.details !== undefined) {
        if (data.details.match('(Browsing|Viewing)')) {
            data.smallImageKey = 'reading';
            data.smallImageText = (yield strings).browse;
        }
        presence.setActivity(data);
    }
    else {
        presence.setTrayTitle();
        presence.setActivity();
    }
}));
const getElement = (query) => {
    const element = document.querySelector(query);
    if (element) {
        return element.textContent.replace(/^\s+|\s+$/g, '');
    }
    else
        return undefined;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBLElBQUksUUFBUSxHQUFHLElBQUksUUFBUSxDQUFDO0lBQzFCLFFBQVEsRUFBRSxvQkFBb0I7Q0FDL0IsQ0FBQyxDQUFDO0FBQ0gsSUFBSSxPQUFPLEdBQUcsUUFBUSxDQUFDLFVBQVUsQ0FBQztJQUNoQyxNQUFNLEVBQUUsNEJBQTRCO0lBQ3BDLE1BQU0sRUFBRSw2QkFBNkI7Q0FDdEMsQ0FBQyxDQUFDO0FBRUgsSUFBSSxNQUFNLEVBQUUsT0FBTyxDQUFDO0FBRXBCLE1BQU0sT0FBTyxHQUFHO0lBQ2QsR0FBRyxFQUFFO1FBQ0gsT0FBTyxFQUFFLFVBQVU7S0FDcEI7SUFDRCxTQUFTLEVBQUU7UUFDVCxPQUFPLEVBQUUsU0FBUztRQUNsQixLQUFLLEVBQUUsT0FBTztLQUNmO0lBQ0QsT0FBTyxFQUFFO1FBQ1AsT0FBTyxFQUFFLFNBQVM7UUFDbEIsS0FBSyxFQUFFLDRCQUE0QjtLQUNwQztJQUNELFNBQVMsRUFBRTtRQUNULE9BQU8sRUFBRSxTQUFTO1FBQ2xCLEtBQUssRUFBRSxrQkFBa0I7S0FDMUI7SUFDRCxPQUFPLEVBQUU7UUFDUCxPQUFPLEVBQUUsU0FBUztRQUNsQixLQUFLLEVBQUUsa0JBQWtCO0tBQzFCO0lBQ0QsV0FBVyxFQUFFO1FBQ1gsT0FBTyxFQUFFLFNBQVM7UUFDbEIsS0FBSyxFQUFFLFNBQVM7S0FDakI7SUFDRCxjQUFjLEVBQUU7UUFDZCxPQUFPLEVBQUUsU0FBUztRQUNsQixLQUFLLEVBQUUsWUFBWTtLQUNwQjtJQUNELFdBQVcsRUFBRTtRQUNYLE9BQU8sRUFBRSxTQUFTO1FBQ2xCLEtBQUssRUFBRSxTQUFTO0tBQ2pCO0NBQ0YsQ0FBQztBQUVGLFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLEdBQVMsRUFBRTtJQUNuQyxNQUFNLElBQUksR0FBRyxRQUFRLENB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