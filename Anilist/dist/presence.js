var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const presence = new Presence({
    clientId: "614220272790274199"
});
const USER_PAGE_REGEX = /^\/user\/(?<user>\w+)\/(?<pageType>\w+)?/;
const SEARCH_PAGE_REGEX = /^\/search\/(?<type>\w+)/;
const startTimestamp = Math.floor(Date.now() / 1000);
presence.on("UpdateData", () => __awaiter(this, void 0, void 0, function* () {
    const { pathname } = window.location;
    const presenceData = {
        largeImageKey: "anilist_lg",
        startTimestamp
    };
    const contentTitleElement = document.querySelector("div.content > h1:first-child");
    const containerTitleElement = document.querySelector("div.container > h1:first-child");
    const forumPostTitleElement = document.querySelector(".forum-thread > h1.title");
    let regexResult;
    if (pathname.includes("home")) {
        const strings = yield presence.getStrings({
            browsing: "presence.activity.browsing"
        });
        presenceData.details = strings.browsing;
        presenceData.state = "Home";
    }
    else if ((regexResult = pathname.match(USER_PAGE_REGEX)) !== null) {
        const { user, pageType } = regexResult.groups;
        presenceData.details = `Viewing ${user}'s ${!pageType ? "profile" : pageType}`;
    }
    else if ((regexResult = pathname.match(SEARCH_PAGE_REGEX)) !== null) {
        const { type } = regexResult.groups;
        const input = document.querySelector("input.el-input__inner");
        presenceData.details = `Searching for an ${type.toLowerCase()}`;
        if (input.value.trim().length > 0) {
            presenceData.state = `'${input.value}'`;
        }
        presenceData.smallImageKey = "search";
        presenceData.smallImageText = "Searching";
    }
    else if (pathname.startsWith("/anime")) {
        presenceData.details = "Looking an anime";
        presenceData.state = contentTitleElement.innerText;
    }
    else if (pathname.startsWith("/manga")) {
        presenceData.details = "Looking an manga";
        presenceData.state = contentTitleElement.innerText;
    }
    else if (pathname.startsWith("/forum")) {
        if (pathname.split("/").length > 3) {
            presenceData.details = "Reading a forum post";
            presenceData.state = `'${forumPostTitleElement.innerText.trim()}'`;
        }
        else {
            presenceData.details = "Browsing the forum";
        }
    }
    else if (pathname.startsWith("/studio")) {
        presenceData.details = "Looking a studio";
        presenceData.state = containerTitleElement.innerText;
    }
    if (!presenceData.details) {
        presence.setActivity();
        presence.setTrayTitle();
    }
    else {
        presence.setActivity(presenceData, true);
    }
}));
