var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
let presence = new Presence({
    clientId: "614220272790274199"
}), startedBrowsing = Math.floor(Date.now() / 1000), presenceData = {
    largeImageKey: "anilist_lg",
    startTimestamp: startedBrowsing
}, strings = presence.getStrings({
    "browsing": "presence.activity.browsing"
}), path, user, title;
presence.on("UpdateData", () => __awaiter(this, void 0, void 0, function* () {
    path = window.location.pathname;
    if (path.includes('home')) {
        presenceData.details = (yield strings).browsing;
        presenceData.state = "Home";
    }
    else if (path.includes('animelist')) {
        user = document.querySelector('.name').textContent;
        presenceData.details = user + "'s animelist";
        delete presenceData.state, presenceData.smallImageKey;
    }
    else if (path.includes('mangalist')) {
        user = document.querySelector('.name').textContent;
        presenceData.details = user + "'s mangalist";
        delete presenceData.state, presenceData.smallImageKey;
    }
    else if (path.includes('user')) {
        user = document.querySelector('.name').textContent;
        presenceData.details = "Viewing " + user + "'s profile";
        delete presenceData.state, presenceData.smallImageKey;
    }
    else if (path.includes('search')) {
        presenceData.details = "Searching for an anime";
        presenceData.state = "'" + document.querySelector('input.el-input__inner').value + "'";
        presenceData.smallImageKey = "search";
        presenceData.smallImageText = "Searching";
    }
    else if (path.includes('anime')) {
        title = document.querySelector('div.content > h1').textContent.trim();
        presenceData.details = "Looking an anime";
        presenceData.state = title;
        delete presenceData.smallImageKey;
    }
    else if (path.includes('manga')) {
        title = document.querySelector('div.content > h1').textContent.trim();
        presenceData.details = "Looking an manga";
        presenceData.state = title;
        delete presenceData.smallImageKey;
    }
    else if (path.includes('forum')) {
        if (path.split('/').length > 3) {
            presenceData.details = "Reading a forum post";
            presenceData.state = "'" + document.querySelector('h1.title').textContent.trim() + "'";
        }
        else {
            presenceData.details = "Browsing the forum";
            delete presenceData.state;
        }
        delete presenceData.smallImageKey;
    }
    else if (path.includes('studio')) {
        presenceData.details = "Looking a studio";
        presenceData.state = document.querySelector('div.container > h1').textContent;
        delete presenceData.smallImageKey;
    }
    else {
        presenceData.details = "Somewhere unknown";
        delete presenceData.state, presenceData.smallImageKey;
    }
    presence.setActivity(presenceData, true);
}));
