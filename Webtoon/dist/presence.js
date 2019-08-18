var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
let presence = new Presence({
    clientId: "612415911877672971"
}), startedBrowsing = Math.floor(Date.now() / 1000), presenceData = {
    largeImageKey: "webtoon_lg",
    startTimestamp: startedBrowsing
}, strings = presence.getStrings({
    "browsing": "presence.activity.browsing"
}), webtoon, chapter, seriesPage, path = window.location.pathname;
presence.on("UpdateData", () => __awaiter(this, void 0, void 0, function* () {
    if (path.includes('list')) {
        webtoon = document.querySelector('.subj').textContent;
        presenceData.details = 'Looking a webtoon';
        presenceData.state = webtoon;
        delete presenceData.smallImageKey;
    }
    else if (path.includes('viewer')) {
        webtoon = document.querySelector('div.subj_info > a.subj').textContent;
        chapter = document.querySelector('div.subj_info > .subj_episode').textContent + " - " + document.querySelector('.tx').textContent;
        presenceData.details = 'Reading ' + webtoon;
        presenceData.state = chapter;
        delete presenceData.smallImageKey;
    }
    else if (path.includes('dailySchedule')) {
        seriesPage = document.querySelector('ul > li.completed').getAttribute('class').includes('on') ? "completed" : "ongoing";
        presenceData.details = "Looking through the " + seriesPage + " series";
        delete presenceData.smallImageKey;
    }
    else if (path.includes('top')) {
        presenceData.details = "Looking through popular series";
    }
    else if (path.includes('genre')) {
        presenceData.details = "Looking through genres";
        delete presenceData.smallImageKey;
    }
    else if (path.includes('search')) {
        presenceData.details = 'Searching...';
        presenceData.smallImageKey = 'search';
    }
    else if (path.includes('about')) {
        presenceData.details = "Reading the about page";
        delete presenceData.smallImageKey;
    }
    else {
        presenceData.details = (yield strings).browsing;
        delete presenceData.smallImageKey;
    }
    presence.setActivity(presenceData, true);
}));
