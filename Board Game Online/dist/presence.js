var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var presence = new Presence({
    clientId: '684570342085099546'
});
var strings = presence.getStrings({
    browse: 'presence.activity.browsing'
});
const paths = {
    '/': {
        details: 'Browsing'
    },
    '/forum': {
        details: 'Viewing Page',
        state: 'Forums'
    }
};
const queries = {
    forgot_login: {
        details: 'Forgot Login'
    },
    register: {
        details: 'Registering...'
    },
    newgame: {
        details: 'Creating',
        state: 'New Game'
    },
    joingame: {
        details: 'Joining',
        state: 'New Game'
    },
    shop: {
        details: 'Viewing',
        state: 'Shop'
    },
    donations: {
        details: 'Viewing',
        state: 'Donations'
    },
    info: {
        details: 'Viewing',
        state: 'Game Info'
    },
    recruit: {
        details: 'Viewing',
        state: 'Recruit a Friend'
    },
    terms: {
        details: 'Viewing',
        state: 'Terms of Service'
    },
    privacy: {
        details: 'Viewing',
        state: 'Privacy Policy'
    },
    contact: {
        details: 'Viewing',
        state: 'Contact'
    }
};
presence.on('UpdateData', () => __awaiter(this, void 0, void 0, function* () {
    var _a, _b;
    let data = {
        details: undefined,
        state: undefined,
        largeImageKey: 'boardgameonline',
        smallImageKey: undefined,
        smallImageText: undefined,
        startTimestamp: undefined,
        endTimestamp: undefined
    };
    const host = location.host;
    const path = location.pathname;
    const query = location.search;
    const queryString = query && ((_a = query.split('page=')[1]) === null || _a === void 0 ? void 0 : _a.split('&')[0]);
    if (host === 'www.boardgame-online.com') {
        if (path in paths)
            data = Object.assign(Object.assign({}, data), paths[path]);
        if (queryString && queryString in queries)
            data = Object.assign(Object.assign({}, data), queries[queryString]);
        const header = getElement('.page_wrapper.show > .page_content > h2');
        if (header !== undefined) {
            data.details = 'Viewing';
            data.state = header;
        }
        const profile = getElement('.page_wrapper.show > .page_content > #profile_name_title > .userName');
        if (profile !== undefined) {
            data.details = 'Viewing Profile';
            data.state = profile;
        }
    }
    else {
        const playerCount = (_b = document.querySelector('.rankingTable')) === null || _b === void 0 ? void 0 : _b.childElementCount;
        data.details = 'Playing Game';
        data.state = document.title;
        if (playerCount) {
            data.state = document.title + ` (${playerCount - 1} Players)`;
        }
    }
    if (data.details !== undefined) {
        if (data.details.match('(Browsing|Viewing)')) {
            data.smallImageKey = 'reading';
            data.smallImageText = (yield strings).browse;
        }
        presence.setActivity(data);
    }
    else {
        presence.setActivity();
        presence.setTrayTitle();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMxQixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsQ0FBQztBQUNILElBQUksT0FBTyxHQUFHLFFBQVEsQ0FBQyxVQUFVLENBQUM7SUFDaEMsTUFBTSxFQUFFLDRCQUE0QjtDQUNyQyxDQUFDLENBQUM7QUFFSCxNQUFNLEtBQUssR0FBRztJQUNaLEdBQUcsRUFBRTtRQUNILE9BQU8sRUFBRSxVQUFVO0tBQ3BCO0lBQ0QsUUFBUSxFQUFFO1FBQ1IsT0FBTyxFQUFFLGNBQWM7UUFDdkIsS0FBSyxFQUFFLFFBQVE7S0FDaEI7Q0FDRixDQUFDO0FBRUYsTUFBTSxPQUFPLEdBQUc7SUFDZCxZQUFZLEVBQUU7UUFDWixPQUFPLEVBQUUsY0FBYztLQUN4QjtJQUNELFFBQVEsRUFBRTtRQUNSLE9BQU8sRUFBRSxnQkFBZ0I7S0FDMUI7SUFDRCxPQUFPLEVBQUU7UUFDUCxPQUFPLEVBQUUsVUFBVTtRQUNuQixLQUFLLEVBQUUsVUFBVTtLQUNsQjtJQUNELFFBQVEsRUFBRTtRQUNSLE9BQU8sRUFBRSxTQUFTO1FBQ2xCLEtBQUssRUFBRSxVQUFVO0tBQ2xCO0lBQ0QsSUFBSSxFQUFFO1FBQ0osT0FBTyxFQUFFLFNBQVM7UUFDbEIsS0FBSyxFQUFFLE1BQU07S0FDZDtJQUNELFNBQVMsRUFBRTtRQUNULE9BQU8sRUFBRSxTQUFTO1FBQ2xCLEtBQUssRUFBRSxXQUFXO0tBQ25CO0lBQ0QsSUFBSSxFQUFFO1FBQ0osT0FBTyxFQUFFLFNBQVM7UUFDbEIsS0FBSyxFQUFFLFdBQVc7S0FDbkI7SUFDRCxPQUFPLEVBQUU7UUFDUCxPQUFPLEVBQUUsU0FBUztRQUNsQixLQUFLLEVBQUUsa0JBQWtCO0tBQzFCO0lBQ0QsS0FBSyxFQUFFO1FBQ0wsT0FBTyxF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