var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var presence = new Presence({
    clientId: '668173626775830529'
});
var strings = presence.getStrings({
    browsing: 'presence.activity.browsing'
});
var oldUrl, elapsed;
var data = {
    details: undefined,
    state: undefined,
    largeImageKey: 'sololearn',
    smallImageKey: undefined,
    smallImageText: undefined,
    startTimestamp: undefined,
    endTimestamp: undefined
};
presence.on('UpdateData', () => __awaiter(this, void 0, void 0, function* () {
    const static = {
        '/': {
            details: 'Browsing',
            state: 'Homepage'
        },
        '/User/Login': {
            details: 'Logging in...'
        },
        '/User/Register': {
            details: 'Registering...'
        },
        '/User/Edit': {
            details: 'Editing profile...'
        },
        '/Features': {
            details: 'Browsing',
            state: 'Features'
        },
        '/Contact': {
            details: 'Browsing',
            state: 'Contact'
        },
        '/Terms-of-Use': {
            details: 'Browsing',
            state: 'Terms of Use'
        },
        '/faq': {
            details: 'Browsing',
            state: 'FAQ'
        }
    };
    const host = location.host;
    const path = location.pathname.replace(/\/$/, '');
    if (oldUrl !== host) {
        oldUrl = host;
        elapsed = Math.floor(Date.now() / 1000);
    }
    if (elapsed) {
        data.startTimestamp = elapsed;
    }
    if (path in static) {
        data = Object.assign({}, data, static[path]);
    }
    if (path.match('/Certificate')) {
        data.details = 'Viewing Certificate';
    }
    const play = path.match('/Play/(.*)');
    if (play) {
        data.details = 'Learning';
        var course = play[1];
        course = course.replace(/Plus/g, '+');
        data.state = course;
    }
    if (path.match('/Profile')) {
        data.details = 'Viewing Profile';
        const name = getElement('.name');
        const course = getElement('div.course .name');
        if (name) {
            if (course) {
                data.state = `${name} | ${course}`;
            }
            else {
                data.state = name;
            }
        }
    }
    if (path.match('/Course')) {
        data.details = 'Viewing Course';
        const name = getElement('.courseDescription > h1');
        if (name) {
            data.state = name;
        }
    }
    if (path.match('/Courses')) {
        data.details = 'Viewing Courses';
    }
    if (path.match('/Codes')) {
        data.details = 'Viewing Codes';
        const tab = getElement('.tab.active');
        if (tab) {
            data.state = tab;
        }
    }
    if (host.match('code.sololearn.com')) {
        data.details = 'Viewing Code';
        const name = getElement('.codeName');
        if (name) {
            data.state = name;
        }
    }
    if (path.match('/Discuss')) {
        data.details = 'Viewing Discussions';
        const name = getElement('.question .header');
        if (name) {
            data.details = 'Viewing Discussion';
            data.state = name;
        }
        const tab = getElement('.tab.active');
        if (tab) {
            data.state = tab;
        }
    }
    if (path.match('/Leaderboard')) {
        data.details = 'Viewing Leaderboard';
        const type = getElement('.nameTitle');
        if (type) {
            data.state = type;
        }
    }
    if (path.match('/Blog')) {
        data.details = 'Viewing Blog';
        const name = getElement('.articleTitle');
        if (name) {
            data.state = name;
        }
    }
    if (data !== null && data.details !== undefined) {
        if (data.details.match('(Viewing|Browsing)')) {
            data.smallImageKey = 'reading';
            data.smallImageText = (yield strings).browsing;
        }
        presence.setActivity(data);
    }
    else {
        presence.setActivity();
        presence.setTrayTitle();
    }
}));
const getElement = (selector) => {
    const element = document.querySelector(selector);
    if (element) {
        return element.textContent;
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBLElBQUksUUFBUSxHQUFHLElBQUksUUFBUSxDQUFDO0lBQzFCLFFBQVEsRUFBRSxvQkFBb0I7Q0FDL0IsQ0FBQyxDQUFDO0FBQ0gsSUFBSSxPQUFPLEdBQUcsUUFBUSxDQUFDLFVBQVUsQ0FBQztJQUNoQyxRQUFRLEVBQUUsNEJBQTRCO0NBQ3ZDLENBQUMsQ0FBQztBQUVILElBQUksTUFBTSxFQUFFLE9BQU8sQ0FBQztBQUVwQixJQUFJLElBQUksR0FBaUI7SUFDdkIsT0FBTyxFQUFFLFNBQVM7SUFDbEIsS0FBSyxFQUFFLFNBQVM7SUFDaEIsYUFBYSxFQUFFLFdBQVc7SUFDMUIsYUFBYSxFQUFFLFNBQVM7SUFDeEIsY0FBYyxFQUFFLFNBQVM7SUFDekIsY0FBYyxFQUFFLFNBQVM7SUFDekIsWUFBWSxFQUFFLFNBQVM7Q0FDeEIsQ0FBQztBQUVGLFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLEdBQVMsRUFBRTtJQUNuQyxNQUFNLE1BQU0sR0FBRztRQUNiLEdBQUcsRUFBRTtZQUNILE9BQU8sRUFBRSxVQUFVO1lBQ25CLEtBQUssRUFBRSxVQUFVO1NBQ2xCO1FBQ0QsYUFBYSxFQUFFO1lBQ2IsT0FBTyxFQUFFLGVBQWU7U0FDekI7UUFDRCxnQkFBZ0IsRUFBRTtZQUNoQixPQUFPLEVBQUUsZ0JBQWdCO1NBQzFCO1FBQ0QsWUFBWSxFQUFFO1lBQ1osT0FBTyxFQUFFLG9CQUFvQjtTQUM5QjtRQUNELFdBQVcsRUFBRTtZQUNYLE9BQU8sRUFBRSxVQUFVO1lBQ25CLEtBQUssRUFBRSxVQUFVO1NBQ2xCO1FBQ0QsVUFBVSxFQUFFO1lBQ1YsT0FBTyxFQUFFLFVBQVU7WUFDbkIsS0FBSyxFQUFFLFNBQVM7U0FDakI7UUFDRCxlQUFlLEVBQUU7WUFDZixPQUFPLEVBQUUsVUFBVTtZQUNuQixLQUFL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