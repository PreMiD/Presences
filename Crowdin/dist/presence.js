var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var presence = new Presence({
    clientId: "614200757989670934",
    
}), strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
});
var browsingStamp = Math.floor(Date.now() / 1000);
var translatePageTitle;
var translatingFile, translateProject, translatingLanguage;
var profileName, profileNickname;
var projectsTab;
presence.on("UpdateData", () => __awaiter(this, void 0, void 0, function* () {
    let presenceData = {
        details: "Unknown page",
        largeImageKey: "lg"
    };
    if (document.location.pathname == "/" ||
        !document.location.pathname ||
        document.location.pathname == "/project/premid") {
        translatePageTitle = document.querySelector("#wrap > div.section > div > h1");
        presenceData.details = "Home";
        presenceData.state = translatePageTitle.innerText;
        presenceData.startTimestamp = browsingStamp;
    }
    else if (document.location.pathname.includes("/project/")) {
        translatePageTitle = document.querySelector("#wrap > div.section > div > h1");
        if (document.location.pathname.includes("activity_stream")) {
            presenceData.details = "Viewing activity";
            presenceData.state = translatePageTitle.innerText;
            presenceData.startTimestamp = browsingStamp;
        }
        else if (document.location.pathname.includes("reports")) {
            presenceData.details = "Viewing reports";
            presenceData.state = translatePageTitle.innerText;
            presenceData.startTimestamp = browsingStamp;
        }
        else if (document.location.pathname.includes("discussions")) {
            presenceData.details = "Viewing discussions";
            presenceData.state = translatePageTitle.innerText;
            presenceData.startTimestamp = browsingStamp;
        }
        else if (document.location.pathname.includes("tasks")) {
            presenceData.details = "Viewing tasks";
            presenceData.state = translatePageTitle.innerText;
            presenceData.startTimestamp = browsingStamp;
        }
        else if (document.location.pathname.includes("translators")) {
            presenceData.details = "Viewing translators";
            presenceData.state = translatePageTitle.innerText;
            presenceData.startTimestamp = browsingStamp;
        }
        else {
            presenceData.details = "Home";
            presenceData.state = translatePageTitle.innerText;
            presenceData.startTimestamp = browsingStamp;
        }
    }
    else if (document.location.pathname.includes("/translate")) {
        translatingFile = document.querySelector("#file-menu-item > div > span.file-name");
        translatingLanguage = document.querySelector("#file-language-info > a.btn.mdc-button.open-language-menu > span");
        translateProject = document.querySelector("#project-menu-content > ul > li:nth-child(1) > h3");
        presenceData.details = "Translating " + translatingFile.innerHTML;
        presenceData.state =
            translateProject.innerText + " (" + translatingLanguage.innerHTML + ")";
        presenceData.startTimestamp = browsingStamp;
    }
    else if (document.location.pathname.includes("/profile")) {
        profileName = document.querySelector("#profile-page > div > div > div.profile-left-pane > div > div.profile-page-user.clearfix > div > h3");
        profileNickname = document.querySelector("#profile-page > div > div > div.profile-left-pane > div > div.profile-page-user.clearfix > div > div > span");
        if (document.location.pathname.includes("activity")) {
            presenceData.details = "Viewing activity";
            presenceData.state = profileName.innerText + " - " + profileNickname.innerText;
            presenceData.startTimestamp = browsingStamp;
        }
        else {
            presenceData.details = "Viewing a profile";
            presenceData.state = profileName.innerText + " - " + profileNickname.innerText;
            presenceData.startTimestamp = browsingStamp;
        }
    }
    else if (document.location.pathname.includes("/projects")) {
        projectsTab = document.querySelector("#search_form > div > div > ul > li.active > a");
        presenceData.details = "Exploring projects";
        presenceData.state = projectsTab.innerText;
        presenceData.startTimestamp = browsingStamp;
    }
    presence.setActivity(presenceData);
}));
function getTimestamps(videoTime, videoDuration) {
    var startTime = Date.now();
    var endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
    return [Math.floor(startTime / 1000), endTime];
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBLElBQUksUUFBUSxHQUFHLElBQUksUUFBUSxDQUFDO0lBQzFCLFFBQVEsRUFBRSxvQkFBb0I7SUFDOUIsU0FBUyxFQUFFLEtBQUs7Q0FDaEIsQ0FBQyxFQUNGLE9BQU8sR0FBRyxRQUFRLENBQUMsVUFBVSxDQUFDO0lBQzdCLElBQUksRUFBRSwyQkFBMkI7SUFDakMsS0FBSyxFQUFFLDBCQUEwQjtDQUNqQyxDQUFDLENBQUM7QUFFSixJQUFJLGFBQWEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUMsQ0FBQztBQUVsRCxJQUFJLGtCQUF1QixDQUFDO0FBRTVCLElBQUksZUFBb0IsRUFBRSxnQkFBcUIsRUFBRSxtQkFBd0IsQ0FBQztBQUUxRSxJQUFJLFdBQWdCLEVBQUUsZUFBb0IsQ0FBQztBQUUzQyxJQUFJLFdBQWdCLENBQUM7QUFFckIsUUFBUSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsR0FBUyxFQUFFO0lBQ3BDLElBQUksWUFBWSxHQUFpQjtRQUNoQyxPQUFPLEVBQUUsY0FBYztRQUN2QixhQUFhLEVBQUUsSUFBSTtLQUNuQixDQUFDO0lBRUYsSUFDQyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsSUFBSSxHQUFHO1FBQ2pDLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRO1FBQzNCLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxJQUFJLGlCQUFpQixFQUM5QztRQUNELGtCQUFrQixHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsZ0NBQWdDLENBQUMsQ0FBQztRQUU5RSxZQUFZLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQztRQUM5QixZQUFZLENBQUMsS0FBSyxHQUFHLGtCQUFrQixDQUFDLFNBQVMsQ0FBQztRQUNsRCxZQUFZ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