  
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) {
        return value instanceof P ? value : new P(function (resolve) {
            resolve(value);
        });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }

        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }

        function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var _this = this;
var presence = new Presence({
    clientId: "650492842615242765"
}), pages = {
    "/trending": "Trending Page",
    "/lol": "Lol Page",
    "/win": "Win Page",
    "/quizzes": "Quiz Page",
    "/giftguide": "Gift Guide page",
    "/shopping": "Shopping Page",
    "/tvandmovies": "Tv & Movies Page",
    "/celebrity": "Celebrity Page",
    "/newsletters": "Newsletter Page"
};
presence.on("UpdateData", function () { return __awaiter(_this, void 0, void 0, function () {
    var page, title, videoTitle, posttitle, user, postCreated, author;
    return __generator(this, function (_a) {
        page = document.location.pathname, title = document.querySelector("body > div.wt-container > div.global-container.container > div.content > div.news.content-detail-page > article > div.content-title > h1"), videoTitle = document.querySelector("body > div.wt-container > div.video-showcase > div > div.video-showcase__content__title > h1"), posttitle = document.querySelector("#mod-buzz-header-1 > div.buzz-header__hgroup.xs-my2.md-mt0 > h1"), user = document.querySelector("body > main > div > div > div > div.user-info.xs-px2.sm-p0.xs-mb3.md-mb4 > div > div.xs-ml2.xs-flex.xs-flex-column > div > h1");
        if (user && user.textContent != "") {
            presence.setActivity({
                largeImageKey: "logo",
                details: "Shows to a User:",
                state: user.textContent,
                startTimestamp: Math.floor(Date.now() / 1000)
            });
        }
        else if (title && title.textContent != "") {
            postCreated = document.querySelector("body > div.wt-container > div.global-container.container > div.content > div.news.content-detail-page > article > div.content-info.clearfix > div.content-author > time") ? document.querySelector("body > div.wt-container > div.global-container.container > div.content > div.news.content-detail-page > article > div.content-info.clearfix > div.content-author > time").textContent : "Belirsiz Süre", author = document.querySelector("body > div.wt-container > div.global-container.container > div.content > div.news.content-detail-page > article > div.content-info.clearfix > div.content-author > span:nth-child(1) > a") ? document.querySelector("body > div.wt-container > div.global-container.container > div.content > div.news.content-detail-page > article > div.content-info.clearfix > div.content-author > span:nth-child(1) > a").textContent : "Belirsiz";
            presence.setActivity({
                largeImageKey: "logo",
                details: "" + title.textContent,
                state: "Yazar: " + author + " (" + postCreated + ")",
                smallImageText: "Reads a Post:",
                startTimestamp: Math.floor(Date.now() / 1000)
            });
        }
        else {
            presence.setActivity({
                largeImageKey: "logo",
                details: "Show to a Page:",
                state: pages[page] || pages[page.slice(0, -1)] || "Home Page",
                smallImageKey: pages[page] || pages[page.slice(0, -1)] || "NOTHING",
                startTimestamp: Math.floor(Date.now() / 1000)
            });
        }
        return [2 /*return*/];
    });
}); });
