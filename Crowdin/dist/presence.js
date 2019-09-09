var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const presence = new Presence({
    clientId: "614200757989670934",
    mediaKeys: false
});
const stringsPromise = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
});
const PROJECT_PAGE_REGEX = /^\/project\/(?<project>\w+)(\/(?<page>[\w-_]+))?$/;
const startTimestamp = Math.floor(Date.now() / 1000);
presence.on("UpdateData", () => __awaiter(this, void 0, void 0, function* () {
    const { pathname } = window.location;
    const presenceData = {
        largeImageKey: "lg",
        startTimestamp
    };
    let regexResult;
    if (pathname === "/") {
        presenceData.details = "Home";
    }
    else if ((regexResult = pathname.match(PROJECT_PAGE_REGEX)) !== null) {
        const { page } = regexResult.groups;
        const projectNameElement = document.querySelector("#wrap > div.section > div > h1 > span.project-name-text");
        if (projectNameElement !== null) {
            presenceData.details = projectNameElement.innerText;
            presenceData.state = `Viewing ${page ? page.split("_")[0] : "home"}`;
        }
        else {
            const projectNamePreviewElement = document.querySelector("a.title-name.project-name-preview");
            const languageNameElement = document.querySelector("#wrap > div.section > div > h1.language-header");
            presenceData.details = projectNamePreviewElement.innerText;
            presenceData.state = `Viewing files (${languageNameElement.innerText})`;
        }
    }
    else if (pathname.startsWith("/translate/")) {
        const fileNameElement = document.querySelector("#file-menu-item > div > span.file-name");
        const languageNameElement = document.querySelector("#file-language-info > a.btn.mdc-button.open-language-menu > span");
        const projectNameElement = document.querySelector("#project-menu-content > ul > li:nth-child(1) > h3");
        presenceData.details = `${projectNameElement.innerText} (${languageNameElement.innerText})`;
        presenceData.state = `Translating ${fileNameElement.innerText}`;
    }
    else if (pathname.startsWith("/profile")) {
        const usernameElement = document.querySelector("#profile-page > div > div > div.profile-left-pane > div > div.profile-page-user.clearfix > div > h3");
        const nicknameElement = document.querySelector("#profile-page > div > div > div.profile-left-pane > div > div.profile-page-user.clearfix > div > div > span");
        presenceData.details = pathname.endsWith("/activity")
            ? "Viewing activity"
            : "Viewing a profile";
        presenceData.state =
            usernameElement.innerText +
                (nicknameElement ? ` - ${nicknameElement.innerText}` : "");
    }
    else if (pathname.startsWith("/projects")) {
        const hash = window.location.hash;
        presenceData.details = "Exploring projects";
        presenceData.state =
            !hash || hash === "#showcases" ? "Showcases" : "Searching";
    }
    presence.setActivity(presenceData);
}));
